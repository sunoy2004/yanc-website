# Deployment Guide

This document explains how to deploy the YANC website to Google Cloud Platform using Cloud Build, Artifact Registry, and Cloud Run.

## Current Setup: Cloud Build + Artifact Registry + Cloud Run

### Architecture Overview

The deployment follows a modern CI/CD pipeline:

```
GitHub Repository → Cloud Build → Artifact Registry → Cloud Run
```

This architecture enables automated deployments when code is pushed to the repository, with Docker images stored in a secure registry before deployment to serverless containers.

### Cloud Build Workflow

The project uses Google Cloud Build for CI/CD instead of GitHub Actions, eliminating the need for service account keys in GitHub secrets and providing tighter integration with GCP services.
## Setting Up the Deployment

### 1. Project Preparation

1. Ensure your code is pushed to a GitHub repository
2. The project includes a `Dockerfile` and `cloudbuild.yaml` for GCP deployment

### 2. GCP Setup

1. Enable required APIs in your GCP project:
   - `cloudbuild.googleapis.com`
   - `run.googleapis.com`
   - `artifactregistry.googleapis.com`
2. Set up IAM permissions for the Cloud Build service account
3. Create a Cloud Build trigger in the GCP Console

### 3. Cloud Build Configuration

1. The Cloud Build trigger should point to your GitHub repository
2. Set the branch pattern to match your deployment branch (typically `main`)
3. Specify the build configuration file as `/cloudbuild.yaml`

### 4. Cloud Run Configuration

1. Cloud Run service will be automatically created/updated by the Cloud Build process
2. Service will be configured for public access (unauthenticated requests)
3. The service will run in the `asia-south1` region

## Project Files Added for GCP Deployment

### 1. Dockerfile

Created a multi-stage Dockerfile optimized for React applications:

```dockerfile
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

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

# Serve static files
CMD ["serve", "-s", "dist", "-l", "8080"]
```

This multi-stage build optimizes the Docker image by separating build dependencies from production runtime, resulting in a smaller, more secure final image.

### 2. cloudbuild.yaml

Created a Cloud Build configuration file:

```yaml
steps:
  # Create Artifact Registry repository if it doesn't exist
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk:slim'
    entrypoint: gcloud
    args:
      - 'artifacts'
      - 'repositories'
      - 'describe'
      - 'cloud-run-source-deploy'
      - '--location=$_LOCATION'
      - '--project=$PROJECT_ID'
    env:
      - 'CLOUDSDK_CORE_PROJECT=$PROJECT_ID'
    # Continue even if repository doesn't exist yet
    allowFailure: true

  # Create repository if it didn't exist
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk:slim'
    entrypoint: gcloud
    args:
      - 'artifacts'
      - 'repositories'
      - 'create'
      - 'cloud-run-source-deploy'
      - '--repository-format=docker'
      - '--location=$_LOCATION'
      - '--project=$PROJECT_ID'
    env:
      - 'CLOUDSDK_CORE_PROJECT=$PROJECT_ID'
    # Only run if the previous step failed (meaning repo doesn't exist)
    waitFor: ['-']
    allowFailure: true

  # Build the Docker image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', '$_LOCATION-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/$REPO_NAME:$COMMIT_SHA', '.']

  # Push the Docker image to Artifact Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', '$_LOCATION-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/$REPO_NAME:$COMMIT_SHA']

  # Deploy to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk:slim'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'website'
      - '--image=$_LOCATION-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/$REPO_NAME:$COMMIT_SHA'
      - '--region=$_LOCATION'
      - '--platform=managed'
      - '--allow-unauthenticated'
      - '--port=8080'
      - '--memory=256Mi'
      - '--cpu=1'
      - '--concurrency=80'
      - '--max-instances=1'
    env:
      - 'CLOUDSDK_CORE_PROJECT=$PROJECT_ID'

# Define substitution variables
substitutions:
  _LOCATION: asia-south1

# Options for logging
options:
  logging: CLOUD_LOGGING_ONLY

# Timeout for the build
timeout: 1200s
```

Automates the build, packaging, and deployment process from source code to running service.

## Conflicting Files Removed

To ensure a clean deployment process, the following files were removed as they conflicted with the GCP deployment strategy:

- `netlify.toml` - Netlify deployment configuration (not needed for GCP)
- `render.yaml` - Render deployment configuration (not needed for GCP)
- `.github/workflows/ci.yml` - GitHub Actions workflow (replaced by Cloud Build)

## GCP Platform Changes

### 1. Enabled APIs

The following APIs were enabled on the GCP project:
- `cloudbuild.googleapis.com` - Enables Cloud Build service
- `run.googleapis.com` - Enables Cloud Run service
- `artifactregistry.googleapis.com` - Enables Artifact Registry service

### 2. IAM Permissions Setup

The Cloud Build service account was granted necessary permissions:
- `roles/run.developer` - Permission to deploy and manage Cloud Run services
- `roles/artifactregistry.writer` - Permission to push images to Artifact Registry

### 3. Cloud Build Trigger Configuration

A trigger was configured in Cloud Build console to automatically execute builds when code is pushed to the main branch.

## Why This Approach Was Chosen

### Cloud Build over GitHub Actions
- **Reason**: Eliminated need for service account keys in GitHub secrets
- **Tradeoff**: Increased reliance on GCP ecosystem but improved security
- **Benefit**: Tighter integration with GCP services and native authentication

### Artifact Registry over Docker Hub
- **Reason**: Native integration with Cloud Run and GCP security model
- **Tradeoff**: Vendor lock-in but simplified security management
- **Benefit**: Private, secure image storage with GCP IAM controls

### Cloud Run over Compute Engine
- **Reason**: Serverless approach reduces operational overhead
- **Tradeoff**: Less control over infrastructure but automatic scaling
- **Benefit**: Pay-per-use pricing model, automatic scaling, high availability

### Multi-stage Docker Build
- **Reason**: Optimized image size and security posture
- **Tradeoff**: More complex Dockerfile but better performance
- **Benefit**: Faster deployments, smaller attack surface, reduced costs

## Free Tier Considerations

The deployment is optimized for GCP's free tier:
- Memory: 256MB (within free tier limits)
- CPU: 1 (minimum required)
- Max instances: 1 (to stay within free tier)
- Concurrency: 80 (optimized for performance)
## Testing the Build Process

Before deploying, you can test the build process locally:

```bash
npm run build
```

This will create a `dist` folder with the production-ready build.

## Deployment Process

1. **Code Commit**: Developer pushes code to the GitHub repository
2. **Cloud Build Trigger**: Push event triggers Cloud Build pipeline
3. **Docker Build**: Cloud Build creates a Docker image from the source code
4. **Image Storage**: Built image is pushed to Artifact Registry
5. **Service Deployment**: Cloud Run pulls the image and deploys the service
6. **Public Access**: Service is configured to allow unauthenticated requests

## Troubleshooting

### Common Issues

1. **"Forbidden" Error**: Ensure Cloud Run service allows unauthenticated requests
2. **Docker Push Failure**: Verify Artifact Registry repository exists and IAM permissions are correct
3. **Build Failures**: Check Cloud Build logs in GCP Console
4. **Permission Errors**: Confirm Cloud Build service account has required roles

### Build Failures
- Check that all dependencies are in `package.json`
- Verify environment variables are properly set
- Review the build logs in Cloud Build console

### Deployment Issues
- Confirm that the build command produces output in the correct directory
- Check redirect rules if using client-side routing
- Verify that all assets are properly referenced

## Security Considerations

- Never commit actual API keys or secrets to the repository
- Use environment variables for sensitive data
- Regularly update dependencies to patch security vulnerabilities
- Follow the principle of least privilege for service accounts
- Store Docker images in private Artifact Registry instead of public registries

## Future Enhancements

Potential improvements to consider:
- Custom domain setup
- SSL certificate configuration
- Environment-specific deployment branches (dev/staging/prod)
- Performance monitoring and alerting