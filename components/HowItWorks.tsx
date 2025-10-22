
import React from 'react';
import { Language, TranslationTree } from '../types';
import { translations } from '../constants/translations';

interface HowItWorksProps {
  language: Language;
}

const Step: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center max-w-xs">
    <div className="flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-gray-800 border-2 border-green-500 dark:border-green-400 rounded-full mb-4">
      {icon}
    </div>
    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h4>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const Arrow: React.FC = () => (
    <div className="text-green-500 dark:text-green-400 rotate-90 md:rotate-0 my-4 md:my-0 mx-auto md:mx-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
    </div>
);


const HowItWorks: React.FC<HowItWorksProps> = ({ language }) => {
  // Fix: Cast `translations[language].landing` to `TranslationTree` to safely access the nested `how_it_works` property.
  const t = (translations[language].landing as TranslationTree).how_it_works as { [key: string]: string };

  const iconClasses = "h-10 w-10 text-green-600 dark:text-green-400";

  return (
    <div className="my-16 text-center">
      <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-10 dark:[text-shadow:0_0_8px_#facc15]">{t.title}</h3>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
        <Step
          icon={<svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
          title={t.step1_title}
          description={t.step1_desc}
        />
        <Arrow />
        <Step
          icon={<svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
          title={t.step2_title}
          description={t.step2_desc}
        />
        <Arrow />
        <Step
          icon={<svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
          title={t.step3_title}
          description={t.step3_desc}
        />
      </div>
    </div>
  );
};

export default HowItWorks;
