import React from 'react';
import { Language } from '../types';
import { translations } from '../constants/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, theme, toggleTheme }) => {
  const t = translations[language];

  const LanguageButton: React.FC<{ lang: Language; label: string }> = ({ lang, label }) => (
    <button
      onClick={() => onLanguageChange(lang)}
      className={`px-3 py-1 text-sm rounded-md transition-colors ${
        language === lang
          ? 'bg-green-500 text-white font-bold'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg fixed top-0 w-full z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white tracking-wider">{t.appName as string}</h1>
        <div className="flex items-center space-x-2">
          <LanguageButton lang={Language.EN} label={t.lang_en as string} />
          <LanguageButton lang={Language.HI} label={t.lang_hi as string} />
          <button
            onClick={toggleTheme}
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
