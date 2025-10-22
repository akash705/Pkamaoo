import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../constants/translations';

interface VisitorsOnlineProps {
  language: Language;
}

const VisitorsOnline: React.FC<VisitorsOnlineProps> = ({ language }) => {
  const t = translations[language].landing as { [key: string]: string };
  const [visitorCount, setVisitorCount] = useState(147);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate the number by -2 to +2
      const fluctuation = Math.floor(Math.random() * 5) - 2;
      setVisitorCount(prevCount => Math.max(120, prevCount + fluctuation)); // Ensure it doesn't drop too low
    }, 2500); // Update every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-8 text-center">
      <div className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 shadow-md">
        <span className="relative flex h-3 w-3 mr-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          <span className="font-bold text-red-500 dark:text-red-400">{visitorCount}</span> {t.visitors_online}
        </p>
      </div>
    </div>
  );
};

export default VisitorsOnline;
