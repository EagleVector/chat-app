# Using the latest node.js image as base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy all files from the current directory to /app
COPY . /app

# Install dependencies
RUN npm install

# Command to build the application
RUN npm run build

# Ignore the node_modules folder
COPY .dockerignore /app/.dockerignore

# Run the command to start the application
CMD ["npm", "run", "start"]