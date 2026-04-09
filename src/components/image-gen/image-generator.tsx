'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Download, Image as ImageIcon, Send, History, ExternalLink, Sparkles } from 'lucide-react';
import { generateImage } from '@/lib/api';
import { STORAGE_KEYS, getStorageItem, setStorageItem } from '@/lib/storage';
import { motion, AnimatePresence } from 'framer-motion';

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedGallery = getStorageItem(STORAGE_KEYS.IMAGE_GALLERY);
    if (savedGallery) {
      try {
        setGallery(JSON.parse(savedGallery));
      } catch (e) {
        console.error("Failed to parse gallery", e);
      }
    }
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setError(null);
    try {
      const imageUrl = await generateImage(prompt.trim());
      setCurrentImage(imageUrl);
      
      const newGallery = [imageUrl, ...gallery].slice(0, 5);
      setGallery(newGallery);
      setStorageItem(STORAGE_KEYS.IMAGE_GALLERY, JSON.stringify(newGallery));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!currentImage) return;
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `nexus-ai-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 space-y-8 pb-12">
      <Card className="glass-card overflow-hidden border-border/40">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
              <ImageIcon className="w-5 h-5 text-primary" />
            </div>
            <CardTitle>Image Creation</CardTitle>
          </div>
          <CardDescription>
            Transform your ideas into high-quality images using FLUX.1.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A futuristic city with flying neon cars, digital art style..."
              disabled={isGenerating}
              className="bg-muted/50 border-border/50 h-12 rounded-xl"
            />
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !prompt.trim()}
              className="h-12 px-8 rounded-xl shrink-0 shadow-lg shadow-primary/20"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm"
              >
                {error}
              </motion.div>
            )}

            {currentImage ? (
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group rounded-2xl overflow-hidden aspect-square md:aspect-video bg-muted/30 border border-border/40 shadow-2xl"
                >
                  <img 
                    src={currentImage} 
                    alt={prompt} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
                <div className="flex items-center justify-between p-4 glass-panel bg-primary/5 border-primary/10">
                  <div className="flex-1 pr-4">
                    <p className="text-sm font-medium line-clamp-2 text-foreground/80">{prompt}</p>
                  </div>
                  <Button 
                    size="lg" 
                    variant="default" 
                    onClick={handleDownload}
                    className="rounded-xl shadow-lg shadow-primary/20 shrink-0"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Image
                  </Button>
                </div>
              </div>
            ) : isGenerating ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-square md:aspect-video rounded-2xl bg-muted/30 border border-dashed border-border/40 flex flex-col items-center justify-center space-y-4"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                  <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse" />
                </div>
                <p className="text-muted-foreground animate-pulse text-sm font-medium">Imagining your prompt...</p>
              </motion.div>
            ) : (
              <div className="relative aspect-square md:aspect-video rounded-2xl bg-muted/10 border border-dashed border-border/40 flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="w-12 h-12 mb-3 stroke-[1.5] opacity-20" />
                <p className="text-sm font-medium px-6 text-center">Your generated image will appear here</p>
              </div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {gallery.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">History</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {gallery.map((url, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-square rounded-xl overflow-hidden border border-border/40 group cursor-pointer"
                onClick={() => setCurrentImage(url)}
              >
                <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
