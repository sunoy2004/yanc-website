export const GA_MEASUREMENT_ID = "G-LJPM6EWJMT";

export const trackPageView = (path: string) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
};
