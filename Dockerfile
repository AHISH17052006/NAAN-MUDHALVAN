# Stage 1 – Build the React app
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build
COPY . .
RUN npm run build   # This creates the /app/dist folder

# Stage 2 – Serve using NGINX
FROM nginx:alpine

# Copy built files from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config if you have one (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port (optional, good for documentation)
EXPOSE 3000

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
