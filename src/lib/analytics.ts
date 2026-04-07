export const GA_MEASUREMENT_ID = "G-Q063W7BFLV";

const isProduction = process.env.NODE_ENV === "production";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function canTrack() {
  return isProduction && typeof window !== "undefined" && typeof window.gtag === "function";
}

export function pageview(url: string) {
  if (!canTrack()) {
    return;
  }

  window.gtag?.("event", "page_view", {
    page_path: url,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(eventName: string, params: Record<string, string | number | boolean> = {}) {
  if (!canTrack()) {
    return;
  }

  window.gtag?.("event", eventName, params);
}
