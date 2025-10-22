// This is a simple wrapper for Google Analytics events.
// It checks if the gtag function exists before trying to send an event.
// This prevents errors if Google Analytics fails to load or is blocked.

// Define the gtag function on the window object for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

/**
 * Tracks a custom event using Google Analytics.
 * @param eventName - The name of the event to track (e.g., 'form_submit').
 * @param eventParams - An optional object of key-value pairs to send with the event.
 */
export const trackEvent = (
  eventName: string,
  eventParams?: { [key: string]: any }
): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  } else {
    console.warn(`Analytics not available. Event not tracked: ${eventName}`);
  }
};
