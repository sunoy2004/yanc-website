# DEPLOYMENT GUIDE

This document gives clear, repeatable steps to deploy the YANC site to common static hosts and contains CI recommendations.

## Build (local)

1. Install dependencies:

```bash
npm ci
```

2. Build production assets:

```bash
npm run build
```

3. Preview the production build locally:

```bash
npm run preview
# opens at http://localhost:4173 by default (Vite preview)
```

## Netlify

1. Connect your GitHub repository to Netlify.
2. Set the build command to:

```
npm ci && npm run build
```

3. Set the publish directory to:

```
dist
```

4. Add environment variables in Netlify UI:
 - VITE_API_BASE_URL
 - VITE_OPENAI_API_KEY (if used)

5. Optional: add `netlify.toml` to repository for redirects, security headers, and headers caching.

6. Deploy from Netlify web UI or enable automatic deploys on push to `main`.

## Render

1. Create a new Static Site on Render.
2. Link the repository and set the build command:

```
npm ci && npm run build
```

3. Set publish directory to `dist`.
4. Add environment variables in Render UI.

## GitHub Actions (CI/CD)

# Deployment Guide

This document explains how to deploy the YANC website to Google Cloud Platform using Cloud Build and Cloud Run.

## Current Setup: Dockerfile-based continuous deploy

On each push to your chosen branch, a GCP trigger finds the **Dockerfile** in the repo (at repo root: **`Dockerfile`**), builds it, and deploys the resulting image to Cloud Run. No `cloudbuild.yaml` is required for this flow.

### Architecture

```
Git push → GCP trigger → build /Dockerfile → Artifact Registry → Cloud Run
```

Automated deployments run when code is pushed; the trigger is configured to use the **Dockerfile** as the build source.

### Build flow

The trigger is set to **Build type: Dockerfile** and **Dockerfile path: `Dockerfile`**, so Cloud Build builds the repository’s Dockerfile and deploys to Cloud Run. You can also use the optional `cloudbuild.yaml` for a custom pipeline.
## Setting Up the Deployment

### 1. Project Preparation

1. Ensure your code is pushed to a GitHub repository
2. The project includes a **`Dockerfile`** at the repo root. The GCP trigger is configured to build this Dockerfile on push. An optional **`cloudbuild.yaml`** is available for custom pipelines.

### 2. GCP Setup

1. Enable required APIs in your GCP project:
   - `cloudbuild.googleapis.com`
   - `run.googleapis.com`
   - `artifactregistry.googleapis.com`
2. Grant the Cloud Build service account:
   - `roles/run.developer` (deploy to Cloud Run)
   - `roles/artifactregistry.writer` (push images)
   - `roles/iam.serviceAccountUser` (act as runtime service account)
3. Create a Cloud Build trigger for **Git continuous deploy** (see below).

### 3. GCP–Git continuous deploy (trigger uses Dockerfile)

Set up the trigger so that on each push, GCP finds the **Dockerfile** in the repo and builds it, then deploys to Cloud Run.

**Option A – From Cloud Run (recommended)**

1. In **Cloud Console** go to **Cloud Run** → **Create service** (or **Connect to repo** on an existing service).
2. Choose **Cloud Build** and connect your GitHub repo (GitHub Cloud Build app). Select your repo and click **Next**.
3. **Build configuration**:
   - **Branch**: e.g. `^main$` (regex for the branch to deploy on push).
   - **Build type**: **Dockerfile**.
   - **Source location**: `Dockerfile` (path to the Dockerfile; use `Dockerfile` for repo root so GCP uses `/Dockerfile`). This path is also the Docker build context (repo root).
4. Click **Save**, then finish **Configure** (region, service name, allow unauthenticated, etc.) and **Create**.  
   On every push to the selected branch, the trigger will find the Dockerfile, build it, and deploy to Cloud Run.

**Option B – From Cloud Build (trigger only)**

1. Go to **Cloud Build** → **Triggers** → **Create trigger**.
2. Connect the repo, set **Event** to “Push to a branch”, **Branch** e.g. `^main$`.
3. **Configuration**: choose **Dockerfile** (not “Cloud Build configuration file”).
   - **Dockerfile path**: `Dockerfile` (repo root).
   - **Build context**: leave default or set to repo root so the trigger builds from the Dockerfile.
4. Enable **Deploy to Cloud Run** and select region and service name. Save.  
   Pushes to the branch will build the Dockerfile and deploy.

**Result**

- When you push changes to the configured branch, the GCP trigger runs, locates **`/Dockerfile`** (or `Dockerfile` at repo root), builds that image, and deploys it to Cloud Run. No `cloudbuild.yaml` is required for this flow.

### 4. Alternative: Cloud Build config file

- If you prefer a custom pipeline (e.g. ensure Artifact Registry repo, custom tags, substitutions), use a trigger with **Configuration** = **Cloud Build configuration file (YAML)** and path **`cloudbuild.yaml`**. The repo includes a **`cloudbuild.yaml`** that builds the same **Dockerfile**, pushes to Artifact Registry, and deploys to Cloud Run.

### 5. Cloud Run configuration

1. Cloud Run service is created/updated by each successful build.
2. Service allows unauthenticated access (public site).
3. Default region is `asia-south1` (override with `_LOCATION`).
4. **Environment variables** (e.g. `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_BASE_URL`): set in **Cloud Run** → your service → **Edit & deploy new revision** → **Variables & secrets** so the container’s `docker-entrypoint.sh` can inject them into `runtime-config.js`.

## Project Files Added for GCP Deployment

### 1. Dockerfile

The repo’s **Dockerfile** is a multi-stage build:

- **Build stage**: Node 18 Alpine; `npm install --legacy-peer-deps` and `npm run build` (runs `prebuild`/`fetchCMS.js` when env vars are set).
- **Production stage**: Nginx Alpine; serves the built files from `dist`, with a custom **nginx.conf** for SPA fallback and port 8080.
- **docker-entrypoint.sh** runs at container start: writes `runtime-config.js` from env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_BASE_URL`) and starts nginx on `$PORT` (default 8080), so the same image works locally and on Cloud Run.

### 2. cloudbuild.yaml

The repo root contains **`cloudbuild.yaml`**, which:

1. Ensures the Artifact Registry repository exists (creates it if missing)
2. Builds the Docker image with the repo’s **Dockerfile**
3. Pushes the image to Artifact Registry (tagged with `SHORT_SHA` and `latest`)
4. Deploys to Cloud Run in the configured region

Substitution variables (defaults in the file; override in the trigger):

- `_LOCATION`: GCP region (default `asia-south1`)
- `_REPO_NAME`: Artifact Registry repo (default `cloud-run-source-deploy`)
- `_SERVICE_NAME`: Cloud Run service name (default `yanc-website`)

GitHub-connected triggers automatically provide `PROJECT_ID`, `SHORT_SHA`, `COMMIT_SHA`, `REPO_NAME`, `BRANCH_NAME`.

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