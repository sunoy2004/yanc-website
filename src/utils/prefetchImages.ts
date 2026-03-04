export function prefetchImages(urls: string[]) {
  const uniqueUrls = [...new Set(urls)].filter(Boolean);

  uniqueUrls.forEach((url) => {
    try {
      const img = new Image();
      img.decoding = "async";
      img.loading = "eager";
      img.src = url;
    } catch {
      // Ignore prefetch errors – this is a best-effort optimization.
    }
  });
}

