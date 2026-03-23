export const GA_MEASUREMENT_ID = "G-LJPM6EWJMT";

export const trackPageView = (path: string, title?: string) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title ?? undefined,
      page_location: typeof window !== "undefined" ? window.location.href : undefined,
    });
  }
};
