import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || '';

if (!apiKey) {
  console.warn('Gemini API key is missing. Please add GEMINI_API_KEY to your .env.local');
}

export const genAI = new GoogleGenerativeAI(apiKey);
