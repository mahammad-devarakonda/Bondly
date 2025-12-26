pipeline {
    agent any

    tools { 
        nodejs 'NodeJS-20' 
    }

    environment {
        // App settings
        SERVER_IMAGE = "devarakondahuzefa/bondly-server"
        CLIENT_IMAGE = "devarakondahuzefa/bondly-client"
        DOCKER_CREDS = credentials('docker-hub')
        
        // EC2 settings
        EC2_SSH_KEY = credentials('ec2-ssh-key') 
        EC2_USER = "ubuntu"
        EC2_IP = credentials('ec2-server-ip')

        // Secrets (Make sure these are set in Jenkins Credentials)
        DB_CONNECTION_STRING = credentials('db-connection-string') 
        JWT_SECRET = credentials('jwt-secret')
        SEND_EMAIL_API_KEY = credentials('send-email-api-key')
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "===================================== Stage: Checkout Code ================================================="
                git branch: 'main', url: 'https://github.com/mahammad-devarakonda/Bondly.git'
                echo "Checkout Completed"
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "===================================== Stage: Install Dependencies ============================================"
                
                dir('server') {
                    echo "Installing Server dependencies..."
                    sh 'npm install'
                    echo "Server dependencies installed"
                }

                dir('client') {
                    echo "Installing Client dependencies..."
                    sh 'npm install'
                    echo "Client dependencies installed"
                }

                echo "All dependencies installed"
            }
        }

   
        stage('Test Docker') {
            steps {
                sh 'docker ps'
            }
        }


        stage('Build Docker Images') {
            steps {
                echo "===================================== Stage: Build Docker Images ========================================"
                script {
                    echo "Building Server Image..."
                    sh "docker build -t $SERVER_IMAGE:latest ./server"
                    echo "Server Image Built"

                    echo "Building Client Image..."
                    sh "docker build -t $CLIENT_IMAGE:latest ./client"
                    echo "Client Image Built"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "===================================== Stage: Push Docker Images to Hub ========================================"
                script {
                    echo "Logging in to Docker Hub..."
                    sh "echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin"
                    echo "Docker Hub Login Successful"

                    echo "Pushing Server Image..."
                    sh "docker push $SERVER_IMAGE:latest"
                    echo "Server Image Pushed"

                    echo "Pushing Client Image..."
                    sh "docker push $CLIENT_IMAGE:latest"
                    echo "Client Image Pushed"
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo "====================================== Stage: Deploy to EC2 =============================================="
                script {
                    def remoteCommand = """
                        set -e

                        echo 'Stopping existing containers...'
                        docker stop bondly-server || true
                        docker rm bondly-server || true
                        docker stop bondly-client || true
                        docker rm bondly-client || true
                        docker stop bondly-redis || true
                        docker rm bondly-redis || true
                        echo 'Existing containers stopped'

                        echo 'Pulling latest images...'
                        docker pull ${SERVER_IMAGE}:latest
                        docker pull ${CLIENT_IMAGE}:latest
                        docker pull redis:alpine
                        echo 'Latest images pulled'

                        echo 'Creating network if not exists...'
                        docker network create bondly-net || true
                        echo 'Network ready'

                        echo 'Running Redis container...'
                        docker run -d --name bondly-redis --network bondly-net -p 6379:6379 redis:alpine
                        echo 'Redis container started'

                        echo 'Running Server container...'
                        docker run -d --name bondly-server --network bondly-net \
                        -e PORT=5000 \
                        -e DB_CONNECTION_STRING="${DB_CONNECTION_STRING}" \
                        -e JWT_SECRET="${JWT_SECRET}" \
                        -e SEND_EMAIL_API_KEY="${SEND_EMAIL_API_KEY}" \
                        -e REDIS_HOST="bondly-redis" \
                        -e REDIS_PORT=6379 \
                        -e CLIENT_URL="http://${EC2_IP}:3000" \
                        -p 5000:5000 ${SERVER_IMAGE}:latest
                        echo 'Server container started'

                        echo 'Running Client container...'
                        docker run -d --name bondly-client --network bondly-net -p 3000:80 ${CLIENT_IMAGE}:latest
                        echo 'Client container started'

                        echo 'Deployment completed successfully!'
                    """

                    echo "Connecting to EC2..."
                    sshagent(['ec2-ssh-key']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_IP} '${remoteCommand}'
                        """
                    }
                }
            }
        }

    }
}
