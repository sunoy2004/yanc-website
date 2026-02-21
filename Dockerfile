# # ---------- Build stage ----------
# FROM node:18-alpine AS builder

# WORKDIR /app
# ARG VITE_BUILD_DATE="${BUILD_DATE}" and --build-arg
# ARG VITE_BUILD_SHA="${SHORT_SHA}"
# ENV VITE_BUILD_DATE=${VITE_BUILD_DATE}
# ENV VITE_BUILD_SHA=${VITE_BUILD_SHA}

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# # ---------- Production stage ----------
# FROM node:18-alpine

# WORKDIR /app

# # Install a lightweight static server
# RUN npm install -g serve

# # Copy built assets
# COPY --from=builder /app/dist ./dist

# # Cloud Run uses port 8080
# EXPOSE 8080

# # Health check endpoint
# HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
#   CMD curl -f http://localhost:8080/ || exit 1

# # Serve static files
# CMD ["serve", "-s", "dist", "-l", "8080"]

# ---------- Build stage ----------
  FROM node:20-alpine AS builder

  WORKDIR /app
  
  # Accept commit SHA from Cloud Build
  ARG VITE_BUILD_SHA
  ENV VITE_BUILD_SHA=$VITE_BUILD_SHA
  
  # Generate build date inside container
  RUN echo "VITE_BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")" >> /tmp/build_env
  
  COPY package*.json ./
  RUN npm install
  
  COPY . .
  
  # Export build date into environment before building
  RUN export $(cat /tmp/build_env) && npm run build
  
  # ---------- Production stage ----------
  FROM node:20-alpine
  
  WORKDIR /app
  
  RUN npm install -g serve
  
  COPY --from=builder /app/dist ./dist
  
  EXPOSE 8080
  
  # Health check endpoint
  HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1
  
  CMD ["serve", "-s", "dist", "-l", "8080"]