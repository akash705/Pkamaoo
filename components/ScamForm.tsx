
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../constants/translations';

interface ScamFormProps {
  onFormSubmit: () => void;
  language: Language;
}

const ScamForm: React.FC<ScamFormProps> = ({ onFormSubmit, language }) => {
  const [formData, setFormData] = useState({ name: '', age: '', email: '', phone: '' });
  const t = translations[language].landing as { [key: string]: string };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl border-4 border-green-500 relative dark:[animation:input-glow_1.5s_infinite_alternate]">
       <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {t.verified_partner}
      </div>
      <h3 className="text-2xl font-extrabold text-center text-gray-800 dark:text-white mb-4 pt-2">{t.form_title}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t.name_placeholder}
          required
          className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder={t.age_placeholder}
          required
          className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t.email_placeholder}
          required
          className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={t.phone_placeholder}
          required
          className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-2">
                {t.whatsapp_otp_message}
            </p>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-lime-500 text-white font-bold text-xl py-4 rounded-lg hover:from-green-500 hover:to-lime-600 transition-all shadow-lg dark:animate-pulse-intense"
            >
              {t.submit_button}
            </button>
        </div>
      </form>
    </div>
  );
};

export default ScamForm;
