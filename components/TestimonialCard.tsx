

import React, { useMemo } from 'react';
import { Language, Testimonial } from '../types';
import { translations } from '../constants/translations';

interface TestimonialCardProps {
  testimonial: Testimonial;
  language: Language;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, language }) => {
  const t = translations[language].landing as { [key: string]: string };

  const earnedAmount = useMemo(() => {
    const amount = Math.floor(Math.random() * (5500 - 3500 + 1)) + 3500;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-gray-200 dark:border-green-400 flex flex-col h-full relative overflow-hidden flex-shrink-0 w-80 md:w-auto dark:[box-shadow:0_0_10px_#34d399] snap-start">
        <svg className="absolute top-0 left-0 w-24 h-24 text-gray-200 dark:text-gray-700 transform -translate-x-6 -translate-y-6" fill="currentColor" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 0C44.77 0 0 44.77 0 100s44.77 100 100 100S200 155.23 200 100 155.23 0 100 0zM50 125c-8.28 0-15-6.72-15-15s6.72-15 15-15 15 6.72 15 15-6.72 15-15 15zm50 0c-8.28 0-15-6.72-15-15s6.72-15 15-15 15 6.72 15 15-6.72 15-15 15z" opacity="0.1"></path>
            <path fillRule="evenodd" d="M60,50 Q80,20 100,50 T140,50" stroke="none" fill="none"></path>
            <text x="30" y="110" fontFamily="serif" fontSize="120" fill="currentColor">“</text>
        </svg>

      <div className="flex items-center mb-4 z-10">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full mr-4 border-4 border-gray-200 dark:border-green-400"
        />
        <div>
          <h4 className="font-bold text-lg text-gray-800 dark:text-white">{testimonial.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 italic flex-grow mb-4 z-10">"{testimonial.text[language]}"</p>
      <div className="border-t-2 border-dashed border-gray-200 dark:border-gray-600 pt-4 mt-auto z-10">
        <p className="text-sm text-green-600 dark:text-green-300 font-semibold text-center">
            {t.testimonial_earned} <span className="font-bold text-lg bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">{earnedAmount}</span>
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;