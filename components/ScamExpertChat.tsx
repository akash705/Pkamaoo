
import React, { useState } from 'react';
import { askScamExpert } from '../services/geminiService';
import { Language } from '../types';
import { translations } from '../constants/translations';

interface ScamExpertChatProps {
    language: Language;
}

const ScamExpertChat: React.FC<ScamExpertChatProps> = ({ language }) => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const t_reveal = translations[language].reveal as { [key: string]: string };
    const t_chat = translations[language].chat as { [key: string]: string };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError(null);
        setResponse('');

        try {
            const result = await askScamExpert(prompt);
            setResponse(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : t_chat.error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-blue-600">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t_reveal.expert_chat_title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{t_reveal.expert_chat_desc}</p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={t_chat.placeholder}
                    className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors"
                    disabled={isLoading}
                >
                    {isLoading ? t_chat.thinking : t_chat.submit_button}
                </button>
            </form>

            {isLoading && (
                <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
                    <p className="mt-2">{t_chat.thinking}</p>
                </div>
            )}
            
            {error && (
                <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 rounded-md">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {response && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 border dark:border-gray-600 rounded-md">
                   <pre className="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300">{response}</pre>
                </div>
            )}
        </div>
    );
};

export default ScamExpertChat;
