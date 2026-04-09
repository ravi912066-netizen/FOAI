import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 py-6 bg-background/50">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row px-4 mx-auto max-w-7xl">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Nexus AI. All rights reserved.
        </p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> using Next.js + Antigravity
        </div>
      </div>
    </footer>
  );
}
