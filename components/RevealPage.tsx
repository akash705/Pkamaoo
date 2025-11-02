

import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import Header from './Header';
import { translations } from '../constants/translations';
import { trackEvent } from '../services/analyticsService';
import scamFlowDiagram from './scam-flow-diagram.png';

interface RevealPageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onReset: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onLogoClick: () => void;
  userAge: number | null;
}

const DataWarningCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-xl shadow-2xl border-2 border-red-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
            <h3 className="text-2xl font-black text-white mb-4 flex items-center">
                <span className="text-3xl mr-3">⚠️</span>
                <span dangerouslySetInnerHTML={{ __html: title }} />
            </h3>
            <p className="text-white text-lg font-semibold leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    </div>
);

const TacticCard: React.FC<{ title: string; description: string; isWarning?: boolean }> = ({ title, description, isWarning = false }) => (
    <div className={`p-6 rounded-lg shadow-lg border-l-4 ${
        isWarning
            ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500 border-2 border-l-orange-500'
            : 'bg-white dark:bg-gray-800 border-yellow-500'
    }`}>
        <h4 className={`text-xl font-bold mb-3 flex items-center ${
            isWarning ? 'text-orange-800 dark:text-orange-200' : 'text-gray-800 dark:text-gray-100'
        }`}>
            {isWarning && <span className="text-2xl mr-2">🚨</span>}
            <span dangerouslySetInnerHTML={{ __html: title }} />
        </h4>
        <p className={`leading-relaxed ${
            isWarning ? 'text-orange-700 dark:text-orange-300 font-medium' : 'text-gray-600 dark:text-gray-300'
        }`} dangerouslySetInnerHTML={{ __html: description }} />
    </div>
);

const StatCard: React.FC<{ stat: string; description: string }> = ({ stat, description }) => (
    <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 p-6 rounded-lg text-center shadow-lg">
        <p className="text-4xl font-black text-red-600 dark:text-red-400 mb-2">{stat}</p>
        <p className="text-gray-800 dark:text-gray-200 font-semibold" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
);


const RevealPage: React.FC<RevealPageProps> = ({ language, onLanguageChange, onReset, theme, toggleTheme, onLogoClick, userAge }) => {
  const t = translations[language].reveal as { [key:string]: string };
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Determine if user is mature (40+) or young (under 30)
  const isMatureUser = userAge !== null && userAge >= 40;
  const isYoungUser = userAge !== null && userAge < 30;

  // Track when the reveal page is viewed
  useEffect(() => {
    trackEvent('page_view_reveal');
  }, []);

  const handleShare = () => {
    trackEvent('share_button_click', { language, userAge });
    const text = language === Language.HI
      ? 'सरल कार्य करके पैसे कमाएं! आसान तरीकों से घर बैठे कमाई करें:'
      : 'Earn money by doing simple tasks! Easy ways to make money from home:';
    const url = window.location.href;
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`;
    window.open(shareUrl, '_blank');
  }

  const openModal = () => {
    setIsModalOpen(true);
    trackEvent('scam_diagram_viewed', { language });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <Header language={language} onLanguageChange={onLanguageChange} theme={theme} toggleTheme={toggleTheme} onLogoClick={onLogoClick}/>
      <main className="container mx-auto px-4 pt-28 pb-12">
        <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-800 p-8 rounded-xl shadow-lg text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-4xl font-extrabold text-green-500 dark:text-green-400">{t.congratulations}</h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: t.main_message }} />
        </div>

        {/* Age-based Data Warning Section */}
        <div className="max-w-4xl mx-auto mt-8">
            <DataWarningCard
                title={isMatureUser ? t.mature_data_warning_title : isYoungUser ? t.young_data_warning_title : t.mature_data_warning_title}
                description={isMatureUser ? t.mature_data_warning_desc : isYoungUser ? t.young_data_warning_desc : t.mature_data_warning_desc}
            />
        </div>

        {/* Scam Flow Diagram Thumbnail */}
        <div className="max-w-4xl mx-auto mt-8 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="text-center mb-4">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {language === Language.HI ? '🔍 स्कैम कैसे काम करता है - डायग्राम देखें' : '🔍 How Scams Work - View Diagram'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === Language.HI ? 'बड़ा करके देखने के लिए क्लिक करें' : 'Click to view full size'}
              </p>
            </div>
            <div
              onClick={openModal}
              className="relative cursor-pointer group overflow-hidden rounded-lg"
            >
              <img
                src={scamFlowDiagram}
                alt="Scam Flow Diagram showing how scammers operate"
                className="w-full h-96 object-cover object-top rounded-lg shadow-md transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="bg-white bg-opacity-90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-10">
            <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
                {isMatureUser ? t.mature_explanation_title : isYoungUser ? t.young_explanation_title : t.mature_explanation_title}
            </h3>
            <div className="space-y-6">
                <TacticCard
                    title={isMatureUser ? t.mature_tactic1_title : isYoungUser ? t.young_tactic1_title : t.mature_tactic1_title}
                    description={isMatureUser ? t.mature_tactic1_desc : isYoungUser ? t.young_tactic1_desc : t.mature_tactic1_desc}
                    isWarning={true}
                />
                <TacticCard
                    title={isMatureUser ? t.mature_tactic2_title : isYoungUser ? t.young_tactic2_title : t.mature_tactic2_title}
                    description={isMatureUser ? t.mature_tactic2_desc : isYoungUser ? t.young_tactic2_desc : t.mature_tactic2_desc}
                    isWarning={true}
                />
                <TacticCard
                    title={isMatureUser ? t.mature_tactic3_title : isYoungUser ? t.young_tactic3_title : t.mature_tactic3_title}
                    description={isMatureUser ? t.mature_tactic3_desc : isYoungUser ? t.young_tactic3_desc : t.mature_tactic3_desc}
                    isWarning={true}
                />
            </div>
             <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-400 dark:border-blue-600 text-blue-800 dark:text-blue-200 p-6 rounded-lg shadow-lg" role="alert">
                <p className="font-bold text-lg flex items-center">
                    <span className="text-2xl mr-2">ℹ️</span>
                    <span dangerouslySetInnerHTML={{ __html: t.important_note }} />
                </p>
            </div>
        </div>

        {/* Government Resources Section */}
        <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 border-2 border-blue-300 dark:border-blue-700 p-8 rounded-xl shadow-lg text-center">
                <h3 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center justify-center">
                    <span className="text-4xl mr-3">🏛️</span>
                    <span dangerouslySetInnerHTML={{ __html: t.govt_resources_title }} />
                </h3>
                <p className="text-blue-700 dark:text-blue-400 mb-8 text-lg font-medium" dangerouslySetInnerHTML={{ __html: t.govt_resources_desc }} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <a
                        href="https://cybercrime.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('government_link_click', { portal: 'cybercrime', language })}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 flex items-center justify-center no-underline"
                    >
                        <span dangerouslySetInnerHTML={{ __html: t.govt_cybercrime_portal }} />
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>

                    <a
                        href="https://i4c.mha.gov.in/ncrp.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('government_link_click', { portal: 'ncrp', language })}
                        className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-lg py-4 px-6 rounded-xl hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-red-500/50 flex items-center justify-center no-underline"
                    >
                        <span dangerouslySetInnerHTML={{ __html: t.govt_ncrp_portal }} />
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>

                    <a
                        href="https://www.csk.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('government_link_click', { portal: 'cyber_swachhta', language })}
                        className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-lg py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-green-500/50 flex items-center justify-center no-underline"
                    >
                        <span dangerouslySetInnerHTML={{ __html: t.govt_cyber_swachhta }} />
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>

                    <a
                        href="https://www.sancharsaathi.gov.in/sfc"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('government_link_click', { portal: 'sanchar_saathi', language })}
                        className="bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold text-lg py-4 px-6 rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/50 flex items-center justify-center no-underline"
                    >
                        <span dangerouslySetInnerHTML={{ __html: t.govt_sanchar_saathi }} />
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>

                    <a
                        href="https://i4c.mha.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('government_link_click', { portal: 'i4c', language })}
                        className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold text-lg py-4 px-6 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 flex items-center justify-center no-underline md:col-span-2 lg:col-span-1"
                    >
                        <span dangerouslySetInnerHTML={{ __html: t.govt_i4c_portal }} />
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12">
            <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">{t.stats_title}</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <StatCard stat={t.stat1} description={t.stat1_desc}/>
                <StatCard stat={t.stat2} description={t.stat2_desc}/>
            </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12 text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 border-2 border-green-300 dark:border-green-700 p-8 rounded-xl shadow-lg">
             <h3 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-4 flex items-center justify-center">
                <span className="text-4xl mr-3">🛡️</span>
                <span dangerouslySetInnerHTML={{ __html: t.share_title }} />
             </h3>
             <p className="text-green-700 dark:text-green-400 mb-6 text-lg font-medium" dangerouslySetInnerHTML={{ __html: t.share_desc }} />
             <button onClick={handleShare} className="bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold text-xl py-4 px-10 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-green-500/50">
                <span dangerouslySetInnerHTML={{ __html: t.share_button }} />
            </button>
        </div>

        <div className="max-w-4xl mx-auto mt-12">
            {/* <ScamExpertChat language={language} /> */}
        </div>

        <div className="text-center mt-12">
            <button onClick={onReset} className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline">
                {t.reset_button}
            </button>
        </div>

      </main>
      <footer className="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm py-6 text-center">
        <p>&copy; 2025 PaisaKamaoo. Spreading Awareness, Not Malware.</p>
      </footer>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75" onClick={closeModal}>
          <div className="relative max-w-6xl max-h-full bg-white dark:bg-gray-800 rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {language === Language.HI ? 'स्कैम कैसे काम करता है' : 'How Scams Work'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <img
                src={scamFlowDiagram}
                alt="Scam Flow Diagram showing how scammers operate"
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            </div>
            <div className="p-4 border-t dark:border-gray-700 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === Language.HI
                  ? 'ESC दबाएं या बाहर क्लिक करें बंद करने के लिए'
                  : 'Press ESC or click outside to close'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevealPage;
