import React from 'react';
import { Language } from '../types';
import { translations } from '../constants/translations';
import Logo from './Logo';
import { trackEvent } from '../services/analyticsService';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  showEarnNowButton?: boolean;
  onEarnNowClick?: () => void;
  onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, theme, toggleTheme, showEarnNowButton, onEarnNowClick, onLogoClick }) => {
  const t = translations[language];

  const handleLanguageToggle = () => {
    const newLang = language === Language.EN ? Language.HI : Language.EN;
    onLanguageChange(newLang);
    trackEvent('language_toggle', { language: newLang });
  };
  
  const handleThemeToggle = () => {
      toggleTheme();
      trackEvent('theme_toggle', { theme: theme === 'light' ? 'dark' : 'light' });
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg fixed top-0 w-full z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <button onClick={onLogoClick} aria-label="Go to home page">
          <Logo />
        </button>
        <div className="flex items-center space-x-2">
          {showEarnNowButton && (
            <button
              onClick={onEarnNowClick}
              className="bg-green-500 text-white font-bold text-sm px-3 py-1 rounded-lg hover:bg-green-600 transition-colors animate-pulse-intense"
              aria-label="Earn Now"
            >
              {t.earn_now_button as string}
            </button>
          )}
          <button
            onClick={handleLanguageToggle}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle language"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
            </svg>
          </button>
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.464A1 1 0 106.465 13.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;