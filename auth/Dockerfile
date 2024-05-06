# Using the latest node.js image as base image
FROM --platform=linux/arm64 node:lts-alpine3.19

# Set the working directory inside the container
WORKDIR /app

# Copy all files from the current directory to /app
COPY . /app

# Install dependencies
RUN npm install

# Ignore the node_modules folder
COPY .dockerignore /app/.dockerignore

# Run the command to start the application
CMD ["npm", "run", "start"]