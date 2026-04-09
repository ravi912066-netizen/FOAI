'use client';

import React from 'react';
import { SettingsModal } from './settings-modal';
import { Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between px-4 mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 glow-primary">
            <Zap className="w-5 h-5 text-primary fill-primary/30" />
          </div>
          <div className="flex flex-col leading-none">
            <h1 className="text-lg font-bold tracking-tight gradient-text">
              Nexus AI
            </h1>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70 leading-none">
              Chat & Create
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary/80">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            AI Online
          </div>
          <SettingsModal />
        </nav>
      </div>
    </header>
  );
}
