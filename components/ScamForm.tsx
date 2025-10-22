
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../constants/translations';
import { trackEvent } from '../services/analyticsService';

interface ScamFormProps {
  onFormSubmit: () => void;
  language: Language;
}

const ScamForm: React.FC<ScamFormProps> = ({ onFormSubmit, language }) => {
  const [formData, setFormData] = useState({ name: '', age: '', email: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const t = translations[language].landing as { [key: string]: string };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Track the form submission event before proceeding.
    // We are NOT sending any formData to analytics to protect user privacy.
    trackEvent('form_submit', { language });

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      onFormSubmit();
    }, 2000);
  };

  return (
    <div className="bg-[#1e293b] p-6 md:p-8 rounded-2xl shadow-2xl border-2 border-green-500/30 relative shadow-[0_0_25px_rgba(52,211,153,0.5)]">
       <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {t.verified_partner}
      </div>
      <h3 className="text-2xl font-extrabold text-center text-white mb-6 pt-2">{t.form_title}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t.name_placeholder}
          required
          className="w-full px-4 py-3 bg-[#334155] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder={t.age_placeholder}
          required
          className="w-full px-4 py-3 bg-[#334155] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={t.phone_placeholder}
          required
          className="w-full px-4 py-3 bg-[#334155] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t.email_placeholder}
          className="w-full px-4 py-3 bg-[#334155] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
        />
        <div>
            <p className="text-xs text-center text-gray-400 my-4">
                {t.whatsapp_otp_message}
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-400 to-lime-500 text-white font-bold text-xl py-4 rounded-lg hover:from-green-500 hover:to-lime-600 transition-all shadow-lg hover:shadow-green-500/50 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{t.form_processing}</span>
                </div>
              ) : (
                t.submit_button
              )}
            </button>
        </div>
      </form>
    </div>
  );
};

export default ScamForm;