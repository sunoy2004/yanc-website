import content from '@/data/content';

/**
 * Returns the current product version in vYYYY.MM.DD format.
 * Uses content.json lastUpdated (build-time) when available, otherwise footer-build DOM or current date.
 */
export function getProductVersion(): string {
  if (content?.lastUpdated && typeof content.lastUpdated === 'string') {
    const datePart = content.lastUpdated.slice(0, 10);
    if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
      return `v${datePart.replace(/-/g, '.')}`;
    }
  }
  if (typeof document !== 'undefined') {
    try {
      const el = document.querySelector('.footer-build');
      const text = el?.textContent?.trim() ?? '';
      const m = text.match(/v[\d.]+/);
      if (m?.[0]) return m[0];
    } catch {
      // ignore
    }
  }
  return `v${new Date().toISOString().slice(0, 10).replace(/-/g, '.')}`;
}
