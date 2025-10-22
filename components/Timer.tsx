import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { Language } from '../types';
import { translations } from '../constants/translations';

interface TimerProps {
    language: Language;
}

const Timer: React.FC<TimerProps> = ({ language }) => {
  const { minutes, seconds } = useCountdown(15 * 60);
  const t = translations[language].timer as { [key: string]: string };

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return (
    // Mobile First: Sticky footer with a horizontal layout
    // Desktop: Becomes a relative, centered block with a vertical layout
    <div className="fixed bottom-0 left-0 w-full bg-red-600 text-white p-3 flex items-center justify-center gap-x-4 shadow-[0_-5px_25px_rgba(239,68,68,0.5)] z-50 md:relative md:w-auto md:inline-flex md:flex-col md:mt-6 md:rounded-2xl md:px-4 md:py-2 md:shadow-[0_0_25px_rgba(239,68,68,0.7)]">
      <h3 className="font-bold text-base md:text-sm md:-mb-1">{t.offer_ends_in}</h3>
      <div className="text-3xl font-bold font-mono tracking-wider md:text-4xl">
        <span>{formattedMinutes}</span>
        <span className="animate-pulse mx-1">:</span>
        <span>{formattedSeconds}</span>
      </div>
    </div>
  );
};

export default Timer;