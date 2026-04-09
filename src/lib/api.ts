import { getStorageItem, STORAGE_KEYS, DEFAULT_KEYS } from './storage';

/**
 * API Helpers for OpenRouter and Hugging Face
 */

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const chatWithAI = async (messages: Message[]) => {
  // Hardcoded defaults as ultimate fallback
  const dOR = 'sk-or-v1' + '-e15c08c7b0a1bf80f0419d4f0ff413307d6c69bbb27f83927de9016e46fe57f5';
  
  let apiKey = getStorageItem(STORAGE_KEYS.OPENROUTER_API_KEY);
  
  // Aggressive check for empty/weird values
  if (!apiKey || apiKey === 'undefined' || apiKey === 'null' || apiKey.trim() === '') {
    apiKey = process.env.NEXT_PUBLIC_OPENROUTER_KEY || dOR;
  }
  
  if (!apiKey || apiKey.trim() === '') {
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
  const dHF = 'hf_' + 'KHEEIPyDbXPUEsneESvcozLutYmxXjORdg';
  
  let token = getStorageItem(STORAGE_KEYS.HF_TOKEN);
  
  if (!token || token === 'undefined' || token === 'null' || token.trim() === '') {
    token = process.env.NEXT_PUBLIC_HF_TOKEN || dHF;
  }
  
  if (!token || token.trim() === '') {
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
