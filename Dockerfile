# ---------- Build stage ----------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- Production stage ----------
FROM nginx:stable-alpine AS production

# Copy built assets into nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Add entrypoint that generates runtime-config.js from env vars at container start
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port; Cloud Run expects 8080 by default
EXPOSE 8080

# Use the custom entrypoint to render runtime config then start nginx
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

