
import { GoogleGenAI } from '@google/genai';

export const askScamExpert = async (prompt: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        systemInstruction: "You are a cybersecurity expert specializing in online scams in India. Your audience is a non-technical user who has just gone through an educational scam simulation. Explain concepts clearly, empathetically, and concisely. Use simple language. Avoid jargon. Frame your answers to empower the user to stay safe online.",
        thinkingConfig: { thinkingBudget: 32768 },
      },
    });

    return response.text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to get a response from the expert. Please check your connection or API key.');
  }
};
