
import React from 'react';
import { Language } from '../types';
import Header from './Header';
import Timer from './Timer';
import TestimonialCard from './TestimonialCard';
import ScamForm from './ScamForm';
import { translations } from '../constants/translations';
import { testimonials } from '../constants/testimonials';
import RecentPayouts from './RecentPayouts';
import VisitorsOnline from './VisitorsOnline';
import HowItWorks from './HowItWorks';

interface LandingPageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onFormSubmit: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ language, onLanguageChange, onFormSubmit, theme, toggleTheme }) => {
  const t = translations[language].landing as { [key: string]: string | object };
  const [spots, setSpots] = React.useState(27);

  React.useEffect(() => {
      if (spots <= 5) return;
      
      const interval = setInterval(() => {
          setSpots(prev => (prev > 5 ? prev - 1 : prev));
      }, Math.random() * (15000 - 8000) + 8000); // Random interval between 8-15 seconds
      
      return () => clearInterval(interval);
  }, [spots]);

  return (
    <div className="bg-yellow-50 dark:bg-gray-900 pb-20">
      <Header language={language} onLanguageChange={onLanguageChange} theme={theme} toggleTheme={toggleTheme}/>
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto text-center mt-8">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 dark:text-white leading-tight dark:[text-shadow:0_0_10px_#fde047,0_0_20px_#fde047]">
            {t.headline as string}
          </h2>
          <Timer language={language} />
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">{t.subheadline as string}</p>
        </div>
        
        <VisitorsOnline language={language} />
        
        <RecentPayouts />

        <HowItWorks language={language} />

        <div className="bg-yellow-400 text-yellow-900 font-bold text-center p-3 rounded-md my-8 max-w-3xl mx-auto flex justify-center items-center shadow-lg dark:[text-shadow:1px_1px_2px_rgba(0,0,0,0.2)]">
            <span>{t.limited_offer as string}</span>
            <span className="ml-4 bg-red-600 text-white text-sm font-bold py-1 px-3 rounded-full animate-bounce">
                {spots} {t.spots_left as string}
            </span>
        </div>

        <div className="w-full mx-auto mt-10">
            <h3 className="text-3xl font-bold text-center text-yellow-600 dark:text-yellow-300 mb-6 dark:[text-shadow:0_0_8px_#facc15]">{t.testimonials_title as string}</h3>
            <div className="flex overflow-x-auto space-x-6 pb-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:space-x-0">
                {testimonials.map(testimonial => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} language={language} />
                ))}
            </div>
        </div>

        <div className="max-w-md mx-auto my-10">
          <ScamForm onFormSubmit={onFormSubmit} language={language} />
        </div>

      </main>
      <footer className="text-center py-6 mt-10 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm">
        <div className="container mx-auto px-6">
            <div className="flex justify-center space-x-6 mb-4">
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">{t.footer_terms as string}</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">{t.footer_privacy as string}</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">{t.footer_contact as string}</a>
            </div>
            <p>{t.footer_copyright as string}</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
