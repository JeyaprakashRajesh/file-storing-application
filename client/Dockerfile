# client/Dockerfile
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Expose the port the app runs on
EXPOSE 5173

# Command to start the Vite app
CMD ["npm", "run", "dev"]
