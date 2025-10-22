
import { useState, useEffect } from 'react';

export const useCountdown = (initialSeconds: number) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const intervalId = setInterval(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return { minutes, seconds };
};
