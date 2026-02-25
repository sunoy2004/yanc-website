// Returns the CMS base URL (no trailing slash) with runtime fallbacks
export function getCmsBaseUrl(): string {
  const envVar =
    (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_CMS_BASE_URL || import.meta.env.VITE_CMS_API_URL || import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL))
    || '';

  if (envVar && typeof envVar === 'string' && envVar.trim() !== '') {
    return envVar.replace(/\/$/, '');
  }

  // Runtime detection for hosted frontends — maps frontend host to backend
  if (typeof window !== 'undefined' && window.location && window.location.hostname) {
    const host = window.location.hostname;
    if (host.includes('website-1095720168864.asia-south1.run.app')) {
      return 'https://ynac-cms-bk-1095720168864.asia-south1.run.app';
    }
    if (host.includes('ynac-cms-bk-1095720168864.asia-south1.run.app')) {
      return 'https://ynac-cms-bk-1095720168864.asia-south1.run.app';
    }
  }

  // Fallback to local dev
  return 'http://localhost:3001';
}

