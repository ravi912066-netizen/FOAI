/**
 * Utility for managing API keys and settings in localStorage
 */

export const STORAGE_KEYS = {
  OPENROUTER_API_KEY: 'nexus_ai_openrouter_key',
  HF_TOKEN: 'nexus_ai_hf_token',
  CHAT_HISTORY: 'nexus_ai_chat_history',
  IMAGE_GALLERY: 'nexus_ai_image_gallery',
};

// Default keys are loaded from environment variables (set in .env.local or Vercel dashboard)
export const DEFAULT_KEYS = {
  OPENROUTER: '',
  HF: '',
};

export const getStorageItem = (key: string, defaultValue: string = ''): string => {
  if (typeof window === 'undefined') return defaultValue;
  return localStorage.getItem(key) || defaultValue;
};

export const setStorageItem = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, value);
};

export const removeStorageItem = (key: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
};

export const clearAllSettings = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.OPENROUTER_API_KEY);
  localStorage.removeItem(STORAGE_KEYS.HF_TOKEN);
};
