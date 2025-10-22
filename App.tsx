
import React, { useState, useCallback, useEffect } from 'react';
import { Language } from './types';
import LandingPage from './components/LandingPage';
import RevealPage from './components/RevealPage';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.HI);
  const [page, setPage] = useState<'landing' | 'reveal'>('landing');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  const handleFormSubmit = useCallback(() => {
    setPage('reveal');
  }, []);

  const handleReset = useCallback(() => {
    setPage('landing');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  return (
    <div className="bg-yellow-50 dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-white transition-colors duration-300">
      {page === 'landing' ? (
        <LandingPage
          language={language}
          onLanguageChange={handleLanguageChange}
          onFormSubmit={handleFormSubmit}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      ) : (
        <RevealPage 
          language={language} 
          onLanguageChange={handleLanguageChange}
          onReset={handleReset}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
    </div>
  );
};

export default App;
