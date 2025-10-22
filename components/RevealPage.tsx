import React from 'react';
import { Language } from '../types';
import Header from './Header';
import ScamExpertChat from './ScamExpertChat';
import { translations } from '../constants/translations';

interface RevealPageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onReset: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const TacticCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{title}</h4>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
);

const StatCard: React.FC<{ stat: string; description: string }> = ({ stat, description }) => (
    <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-6 rounded-lg text-center">
        <p className="text-3xl font-extrabold text-red-600 dark:text-red-400">{stat}</p>
        <p className="text-gray-700 dark:text-gray-300 mt-2">{description}</p>
    </div>
);


const RevealPage: React.FC<RevealPageProps> = ({ language, onLanguageChange, onReset, theme, toggleTheme }) => {
  const t = translations[language].reveal as { [key:string]: string };

  const handleShare = () => {
    const text = language === Language.HI
      ? 'मैंने अभी-अभी इस ऑनलाइन स्कैम सिमुलेशन का अनुभव किया है। यह बहुत शिक्षाप्रद है! आपको भी इसे आज़माना चाहिए और देखना चाहिए कि क्या आप झांसे में आते हैं:'
      : 'I just experienced this online scam simulation. It\'s super educational! You should try it and see if you fall for it:';
    const url = window.location.href; 
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`;
    window.open(shareUrl, '_blank');
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <Header language={language} onLanguageChange={onLanguageChange} theme={theme} toggleTheme={toggleTheme}/>
      <main className="container mx-auto px-4 pt-28 pb-12">
        <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-800 p-8 rounded-xl shadow-lg text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-4xl font-extrabold text-green-500 dark:text-green-400">{t.congratulations}</h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">{t.main_message}</p>
        </div>

        <div className="max-w-4xl mx-auto mt-10">
            <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">{t.explanation_title}</h3>
            <div className="space-y-6">
                <TacticCard title={t.tactic1_title} description={t.tactic1_desc} />
                <TacticCard title={t.tactic2_title} description={t.tactic2_desc} />
                <TacticCard title={t.tactic3_title} description={t.tactic3_desc} />
            </div>
             <div className="mt-6 bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500 text-blue-800 dark:text-blue-300 p-4 rounded-md" role="alert">
                <p className="font-bold">{t.important_note}</p>
            </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12">
            <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">{t.stats_title}</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <StatCard stat={t.stat1} description={t.stat1_desc}/>
                <StatCard stat={t.stat2} description={t.stat2_desc}/>
            </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12 text-center bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-8 rounded-lg">
             <h3 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-2">{t.share_title}</h3>
             <p className="text-green-700 dark:text-green-400 mb-6">{t.share_desc}</p>
             <button onClick={handleShare} className="bg-green-600 text-white font-bold text-lg py-3 px-8 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md">
                {t.share_button}
            </button>
        </div>
        
        <div className="max-w-4xl mx-auto mt-12">
            <ScamExpertChat language={language} />
        </div>

        <div className="text-center mt-12">
            <button onClick={onReset} className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline">
                {t.reset_button}
            </button>
        </div>

      </main>
      <footer className="text-center py-6 mt-10 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; 2025 PaisaKamaoo. Spreading Awareness, Not Malware.</p>
      </footer>
    </div>
  );
};

export default RevealPage;