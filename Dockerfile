# Stage 1: Build React app
FROM node:18 AS builder
WORKDIR /app

# Install dependencies and build React app
COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


# Stage 2: Serve the build using Node.js (or alternatively NGINX)
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
COPY --from=builder /app /app

# Install only server dependencies
RUN npm install --omit=dev

# Expose port and start server
EXPOSE 3000
CMD ["node", "server.js"]
