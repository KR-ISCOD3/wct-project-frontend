# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the Vite dev server port
EXPOSE 5173

# Set environment to development
ENV NODE_ENV=development

# Start Vite development server
CMD ["npm", "run", "dev", "--", "--host"]
