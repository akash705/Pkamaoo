require('dotenv').config();
const express = require('express');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Secure API endpoint to proxy requests to Gemini
app.post('/api/ask-expert', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  if (!process.env.API_KEY) {
    return res.status(500).json({ error: 'API key not configured on the server.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        systemInstruction: "You are a cybersecurity expert specializing in online scams in India. Your audience is a non-technical user who has just gone through an educational scam simulation. Explain concepts clearly, empathetically, and concisely. Use simple language. Avoid jargon. Frame your answers to empower the user to stay safe online.",
        thinkingConfig: { thinkingBudget: 32768 },
      },
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to get a response from the expert.' });
  }
});

// Serve the React app for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
