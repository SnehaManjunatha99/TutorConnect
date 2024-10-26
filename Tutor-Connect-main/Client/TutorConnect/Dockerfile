# Use an official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the required dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Start the frontend development server
CMD ["npm", "run", "dev"]
