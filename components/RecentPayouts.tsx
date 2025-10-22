
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../constants/translations';
import { fakePayouts } from '../constants/payouts';

interface RecentPayoutsProps {
  language: Language;
}

const RecentPayouts: React.FC<RecentPayoutsProps> = ({ language }) => {
  const t = translations[language].landing as { [key: string]: string };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [payoutAmount, setPayoutAmount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % fakePayouts.length);
      // Random amount between 1000 and 5000
      setPayoutAmount(Math.floor(Math.random() * 4001) + 1000);
    }, 3500); // Change every 3.5 seconds

    setPayoutAmount(Math.floor(Math.random() * 4001) + 1000); // initial amount
    return () => clearInterval(interval);
  }, []);

  const currentPayout = fakePayouts[currentIndex];

  return (
    <div key={currentIndex} className="bg-gray-800/10 dark:bg-gray-800 border-2 border-gray-200 dark:border-green-500 text-gray-800 dark:text-white py-2 px-4 rounded-lg shadow-lg overflow-hidden my-8 max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center space-x-3">
         <div className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full flex-shrink-0">
             <div className="w-full h-full bg-green-500 dark:bg-green-400 rounded-full animate-ping"></div>
         </div>
        <p className="font-semibold text-sm hidden sm:block">{t.recent_payouts}</p>
        <div className="flex-grow text-center sm:text-right font-mono text-sm text-lime-600 dark:text-lime-300">
            {currentPayout.name} from {currentPayout.location} just received ₹{payoutAmount.toLocaleString('en-IN')}!
        </div>
      </div>
    </div>
  );
};

export default RecentPayouts;
