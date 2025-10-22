
import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { Language } from '../types';
import { translations } from '../constants/translations';

interface TimerProps {
    language: Language;
}

const Timer: React.FC<TimerProps> = ({ language }) => {
  // Start countdown from 15 minutes.
  const { minutes, seconds } = useCountdown(15 * 60); 
  const t = translations[language].timer as { [key: string]: string };

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return (
    // On mobile (default): fixed banner at the bottom.
    // On medium screens and up (md:): becomes an inline-block with its original styling.
    <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white p-3 z-50 md:relative md:inline-block md:mt-8 md:py-4 md:px-8 md:rounded-2xl md:shadow-lg md:shadow-red-500/50 md:dark:shadow-red-800/50 md:bottom-auto md:left-auto md:right-auto md:z-auto">
        {/* On mobile, use flex to align items horizontally */}
        <div className="text-center flex items-center justify-center md:block">
            <h3 className="text-sm font-bold uppercase tracking-wider md:text-lg">{t.offer_ends_in}</h3>
            <div className="text-3xl font-bold font-mono tracking-wider ml-4 md:text-6xl md:mt-1 md:ml-0">
                <span>{formattedMinutes}</span>
                <span className="animate-pulse mx-1 md:mx-2">:</span>
                <span>{formattedSeconds}</span>
            </div>
        </div>
    </div>
  );
};

export default Timer;
