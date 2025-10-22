
import React, { useState, useEffect } from 'react';
import { fakePayouts } from '../constants/payouts';

const RecentPayouts: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [payoutAmount, setPayoutAmount] = useState(1313); // Start with the amount from the image for first load

  useEffect(() => {
    // Start with Arjun N. from Kolkata to match the image on first load
    const arjunIndex = fakePayouts.findIndex(p => p.name === 'Arjun N.');
    if (arjunIndex !== -1) {
        setCurrentIndex(arjunIndex);
    }
    
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % fakePayouts.length);
      // Random amount between 1000 and 2000 for more "realistic" small payouts
      setPayoutAmount(Math.floor(Math.random() * 1001) + 1000);
    }, 3500); // Change every 3.5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentPayout = fakePayouts[currentIndex];

  return (
    <div key={currentIndex} className="bg-[#202637] border-2 border-[#34D399] py-3 px-5 rounded-xl shadow-lg overflow-hidden my-8 max-w-xl mx-auto animate-fade-in">
      <div className="flex items-center space-x-4">
         <div className="w-4 h-4 bg-[#4ade80] rounded-full flex-shrink-0"></div>
        <div className="font-mono text-base text-[#B5CEA8] tracking-wide">
            {currentPayout.name} from {currentPayout.location} just received ₹{payoutAmount.toLocaleString('en-IN')}!
        </div>
      </div>
    </div>
  );
};

export default RecentPayouts;
