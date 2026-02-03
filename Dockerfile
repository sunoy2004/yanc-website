# ---------- Build stage ----------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- Production stage ----------
FROM node:18-alpine

WORKDIR /app

# Install a lightweight static server
RUN npm install -g serve

# Copy built assets
COPY --from=builder /app/dist ./dist

# Cloud Run uses port 8080
EXPOSE 8080

# Serve static files
CMD ["serve", "-s", "dist", "-l", "8080"]