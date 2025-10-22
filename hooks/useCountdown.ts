
import { useState, useEffect } from 'react';

// A key for storing the expiration time in local storage.
const STORAGE_KEY = 'paisaKamaooOfferExpiry';

// A helper function to get the initial state.
// It tries to read from localStorage first, and if not present,
// it sets a new expiration time.
const getInitialSeconds = (initialDuration: number): number => {
    try {
        const storedExpiry = localStorage.getItem(STORAGE_KEY);
        if (storedExpiry) {
            const expiryTime = parseInt(storedExpiry, 10);
            const remainingTime = Math.round((expiryTime - Date.now()) / 1000);
            // Return remaining time, but not less than 0.
            return Math.max(0, remainingTime);
        }

        // If no expiry is stored, create a new one.
        const newExpiryTime = Date.now() + initialDuration * 1000;
        localStorage.setItem(STORAGE_KEY, String(newExpiryTime));
        return initialDuration;

    } catch (error) {
        // In case localStorage is disabled (e.g., private browsing),
        // just return the initial duration without persistence.
        console.error("Could not access localStorage:", error);
        return initialDuration;
    }
};


export const useCountdown = (initialSeconds: number) => {
  // Initialize the state using our helper function. This only runs once.
  const [secondsLeft, setSecondsLeft] = useState(() => getInitialSeconds(initialSeconds));

  useEffect(() => {
    // If the timer has run out, do nothing.
    if (secondsLeft <= 0) {
        return;
    }

    // Set up the interval to tick down every second.
    const intervalId = setInterval(() => {
      setSecondsLeft(prevSeconds => prevSeconds - 1);
    }, 1000);

    // Clean up the interval when the component unmounts or secondsLeft changes.
    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  // Calculate minutes and seconds for display.
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return { minutes, seconds };
};
