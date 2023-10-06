# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for backend
COPY package*.json ./

# Install dependencies for backend
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port for Express (usually 4000)
EXPOSE 4000

# Start the Express server
CMD ["npm", "run", "dev"]
