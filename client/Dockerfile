FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build the project (stays production-ready)
RUN npm run build

EXPOSE 5173

# Start Vite in host mode
CMD ["npm", "run", "dev", "--", "--host"]
