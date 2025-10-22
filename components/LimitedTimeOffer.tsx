import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../constants/translations';

interface LimitedTimeOfferProps {
  language: Language;
}

const LimitedTimeOffer: React.FC<LimitedTimeOfferProps> = ({ language }) => {
  const t = translations[language].landing as { [key: string]: string };
  const [spots, setSpots] = useState(25);

  useEffect(() => {
    if (spots <= 5) return;

    const interval = setInterval(() => {
      setSpots(prev => (prev > 5 ? prev - 1 : prev));
    }, Math.random() * (12000 - 6000) + 6000); // Random interval between 6-12 seconds

    return () => clearInterval(interval);
  }, [spots]);

  const seatsLeftText = t.limited_offer_seats_left.replace('{count}', String(spots));

  return (
    <div className="my-8 max-w-2xl mx-auto">
      <div className="bg-amber-400 text-yellow-900 font-bold text-center p-4 rounded-xl sm:rounded-full flex flex-col sm:flex-row justify-center items-center shadow-lg dark:shadow-amber-500/20 [text-shadow:1px_1px_1px_rgba(255,255,255,0.2)]">
        <span className="mb-2 sm:mb-0">{t.limited_offer_banner_text}</span>
        <span className="sm:ml-4 bg-red-600 text-white text-sm font-bold py-2 px-4 rounded-full animate-bounce whitespace-nowrap">
          {seatsLeftText}
        </span>
      </div>
    </div>
  );
};

export default LimitedTimeOffer;
