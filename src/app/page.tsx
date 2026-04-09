'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatInterface } from '@/components/chatbot/chat-interface';
import { ImageGenerator } from '@/components/image-gen/image-generator';
import { MessageSquare, ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col container mx-auto max-w-6xl px-4 py-4">
      <Tabs defaultValue="chatbot" className="w-full flex-1 flex flex-col">
        {/* Compact tab bar */}
        <div className="flex justify-center mb-4">
          <TabsList className="inline-flex h-11 p-1 bg-muted/30 backdrop-blur-md border border-border/40 rounded-xl gap-1">
            <TabsTrigger 
              value="chatbot" 
              className="rounded-lg px-5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all flex items-center gap-2 font-medium"
            >
              <MessageSquare className="w-4 h-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger 
              value="image-generator" 
              className="rounded-lg px-5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all flex items-center gap-2 font-medium"
            >
              <ImageIcon className="w-4 h-4" />
              Image Gen
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="chatbot" className="flex-1 mt-0 focus-visible:outline-none focus-visible:ring-0">
          <ChatInterface />
        </TabsContent>
        
        <TabsContent value="image-generator" className="flex-1 mt-0 focus-visible:outline-none focus-visible:ring-0">
          <ImageGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
