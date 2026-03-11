# YANC Website

Modern, fast, and content-driven frontend for **Yet Another Networking Club (YANC)** — built with **React + Vite + TypeScript + Tailwind** and deployed to **Google Cloud Run** via **Cloud Build**.

## Live links
- **Cloud Run (GCP)**: `https://yanc-website-1095720168864.asia-south1.run.app`

## What’s inside

- **Vite + React (SWC)** for fast dev/build
- **Tailwind CSS + shadcn/ui** for a clean, consistent UI system
- **Rich hero + animations** (incl. 3D carousel)
- **Build-time CMS injection**: CMS content is fetched during the Docker build and written to `src/data/content.json` so the app can import it statically

## Quick start (local development)

### Prerequisites

- Node.js 18+
- npm

### Install & run

```sh
npm install
npm run dev
```

Dev server runs at `http://localhost:8080`.

> API proxy: Vite proxies `/api/*` to `http://localhost:3001` (see `vite.config.ts`).

## Build-time CMS injection (how content.json is generated)

This project fetches CMS content at build time using `scripts/fetchCMS.js` and writes it to:

- `src/data/content.json`

The script reads the CMS base URL from:

- `CMS_BASE_URL` (preferred)
- `VITE_CMS_BASE_URL` (fallback)

If the CMS URL is missing, the script logs a warning and keeps the existing `src/data/content.json`.

## Production build

```sh
npm run build
```

Outputs the static site to `dist/`.

## Deployment (Google Cloud Run + Cloud Build)

Cloud Build builds and deploys a Docker image. The important flow is:

CMS update  
↓  
Cloud Build trigger  
↓  
`docker build` (installs deps, runs `fetchCMS.js`, runs Vite build)  
↓  
push image to Artifact Registry  
↓  
deploy to Cloud Run

### Cloud Build variables

`cloudbuild.yaml` defines a substitution used during the Docker build:

- `_CMS_URL` → passed as `--build-arg CMS_BASE_URL=${_CMS_URL}`

Default CMS URL:

- `https://yanc-cms-bk-1095720168864.asia-south1.run.app`

## Tech stack

- Vite
- React + TypeScript
- Tailwind CSS
- shadcn/ui
- Nginx (serving the built SPA in production)

## Repo scripts (common)

```sh
npm run dev
npm run build
npm run preview
```
