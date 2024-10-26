# Use an official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Rebuild bcrypt to ensure compatibility with the container architecture
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the application files to the container
COPY . .

# Expose the port the app runs on
EXPOSE 5002

# Start the backend server
CMD ["npm", "start"]
