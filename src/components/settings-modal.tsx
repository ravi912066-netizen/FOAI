'use client';

import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, ShieldCheck, Trash2 } from 'lucide-react';
import { STORAGE_KEYS, getStorageItem, setStorageItem, clearAllSettings, DEFAULT_KEYS } from '@/lib/storage';

export function SettingsModal() {
  const [openRouterKey, setOpenRouterKey] = useState('');
  const [hfToken, setHfToken] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOpenRouterKey(getStorageItem(STORAGE_KEYS.OPENROUTER_API_KEY));
      setHfToken(getStorageItem(STORAGE_KEYS.HF_TOKEN));
      setSaved(false);
    }
  }, [isOpen]);

  const handleSave = () => {
    setStorageItem(STORAGE_KEYS.OPENROUTER_API_KEY, openRouterKey);
    setStorageItem(STORAGE_KEYS.HF_TOKEN, hfToken);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setIsOpen(false);
    }, 1500);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all API keys and settings?')) {
      clearAllSettings();
      setOpenRouterKey('');
      setHfToken('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your API keys. They are stored securely in your browser's local storage.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="openrouter">OpenRouter API Key</Label>
            <Input
              id="openrouter"
              type="password"
              placeholder={`Default: ${DEFAULT_KEYS.OPENROUTER.slice(0, 8)}...`}
              value={openRouterKey}
              onChange={(e) => setOpenRouterKey(e.target.value)}
              className="bg-muted/50"
            />
            {!openRouterKey && (
              <p className="text-[10px] text-muted-foreground/60 italic">
                Using built-in developer key
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="huggingface">Hugging Face Token</Label>
            <Input
              id="huggingface"
              type="password"
              placeholder={`Default: ${DEFAULT_KEYS.HF.slice(0, 8)}...`}
              value={hfToken}
              onChange={(e) => setHfToken(e.target.value)}
              className="bg-muted/50"
            />
            {!hfToken && (
              <p className="text-[10px] text-muted-foreground/60 italic">
                Using built-in developer token
              </p>
            )}
          </div>
          {saved && (
            <div className="flex items-center gap-2 text-sm text-green-500 animate-in fade-in slide-in-from-bottom-1">
              <ShieldCheck className="w-4 h-4" />
              Keys saved securely in browser
            </div>
          )}
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="destructive" onClick={handleClear} className="sm:mr-auto">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Keys
          </Button>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
