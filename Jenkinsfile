pipeline {
    agent any

    tools {
        nodejs 'Node20'
    }

    environment {
        IMAGE_NAME = "devarakondahuzefa/bondlyApp"
        DOCKER_CREDS = credentials('docker-hub')
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/mahammad-devarakonda/Bondly.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build App') {
            steps {
                sh 'npm run build || echo "No build step"'
            }
        }

        stage('Docker Build & Push') {
            steps {
                sh """
                docker build -t $IMAGE_NAME:latest .
                echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin
                docker push $IMAGE_NAME:latest
                """
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker stop node-app || true
                docker rm node-app || true
                docker run -d -p 3000:3000 --name node-app $IMAGE_NAME:latest
                '''
            }
        }
    }
}
