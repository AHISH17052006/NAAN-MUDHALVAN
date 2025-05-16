# Stage 1 – Build the React app
FROM node:18 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build   # This creates the /app/dist folder

# Stage 2 – Serve using NGINX
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# Install only server dependencies
RUN npm install --omit=dev

# Expose port and start server
EXPOSE 3000
CMD ["node", "server.js"]
