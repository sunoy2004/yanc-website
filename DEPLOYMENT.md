# Deployment Guide

This document explains how to deploy the YANC website to different platforms using CI/CD pipelines.

## Current Setup: GitHub Actions + Render

### GitHub Actions Workflow

The project includes a GitHub Actions workflow located at `.github/workflows/ci.yml` that:

1. Runs on every push to the `main` branch and on pull requests
2. Performs testing, linting, type checking, and building
3. Deploys to Render only if all tests pass
4. Uses multiple Node.js versions for compatibility testing

### Render Configuration

The project includes a `render.yaml` file that defines the deployment configuration for Render:

- Builds the project using `npm install && npm run build`
- Publishes the `dist` folder as a static site
- Sets up routing to handle client-side routing

## Setting Up the Deployment

### 1. Connect to GitHub

1. Push your code to a GitHub repository
2. Make sure the `.github/workflows/ci.yml` file is present

### 2. Connect to Render

1. Create an account on [Render](https://render.com)
2. Create a new "Static Site" or "Web Service" 
3. Connect to your GitHub repository
4. Render will automatically detect the `render.yaml` configuration
5. Set the build command to: `npm install && npm run build`
6. Set the publish directory to: `dist`

### 3. Environment Variables (if needed)

If you need environment variables for your deployment:

1. In Render dashboard, go to your service settings
2. Add environment variables under the "Environment" section
3. For local development, copy `.env.example` to `.env` and add your values

## Alternative Deployment Options

The project structure allows for easy migration to other deployment platforms:

### Vercel
1. Connect your GitHub repository to Vercel
2. Set build command to `npm run build`
3. Set output directory to `dist`
4. Configure environment variables in Vercel dashboard

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command to `npm run build`
3. Set publish directory to `dist`
4. Configure redirects in `netlify.toml`

### AWS Amplify
1. Connect your GitHub repository to AWS Amplify
2. Set build command to `npm run build`
3. Set base directory to `/`
4. Set artifact directory to `dist`

### Cloudflare Pages
1. Connect your GitHub repository to Cloudflare Pages
2. Set build command to `npm run build`
3. Set build output directory to `dist`

## Testing the Build Process

Before deploying, you can test the build process locally:

```bash
npm run build
```

This will create a `dist` folder with the production-ready build.

## File Structure for Future Migration

The current setup maintains flexibility for future platform changes:

- `render.yaml` - Render-specific configuration (can be removed if switching platforms)
- `.github/workflows/ci.yml` - GitHub Actions workflow (platform-agnostic CI/CD)
- `netlify.toml` - Netlify-specific configuration (already present)
- Standard build scripts in `package.json` work across platforms

## Troubleshooting

### Build Failures
- Check that all dependencies are in `package.json`
- Verify environment variables are properly set
- Review the build logs in GitHub Actions or Render dashboard

### Deployment Issues
- Confirm that the build command produces output in the correct directory
- Check redirect rules if using client-side routing
- Verify that all assets are properly referenced

## Security Considerations

- Never commit actual API keys or secrets to the repository
- Use environment variables for sensitive data
- Regularly update dependencies to patch security vulnerabilities
- Review the GitHub Actions workflow for security best practices