import { getStorageItem, STORAGE_KEYS, DEFAULT_KEYS } from './storage';

/**
 * API Helpers for OpenRouter and Hugging Face
 */

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const chatWithAI = async (messages: Message[]) => {
  const apiKey = getStorageItem(STORAGE_KEYS.OPENROUTER_API_KEY) 
    || process.env.NEXT_PUBLIC_OPENROUTER_KEY 
    || DEFAULT_KEYS.OPENROUTER;
  
  if (!apiKey) {
    throw new Error('OpenRouter API Key is missing. Please add it in settings.');
  }

  const systemMessage: Message = {
    role: 'system',
    content: 'You are a helpful, friendly, and witty AI assistant.'
  };

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : '',
      'X-Title': 'Nexus AI',
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3.3-70b-instruct',
      messages: [systemMessage, ...messages],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error?.message || 'Failed to fetch from OpenRouter');
  }

  return response.json();
};

export const generateImage = async (prompt: string) => {
  const token = getStorageItem(STORAGE_KEYS.HF_TOKEN) || DEFAULT_KEYS.HF;
  
  if (!token) {
    throw new Error('Hugging Face Token is missing. Please add it in settings.');
  }

  const response = await fetch('/api/generate-image', {
    method: 'POST',
    body: JSON.stringify({ prompt, token }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to generate image. Please try again.');
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
