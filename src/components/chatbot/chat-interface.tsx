'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User, Loader2, Sparkles, Download as DownloadIcon } from 'lucide-react';
import { chatWithAI, Message } from '@/lib/api';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const downloadMessage = (content: string, index: number) => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `nexus-chat-response-${index}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithAI([...messages, userMessage]);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.choices[0].message.content,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto" style={{ height: 'calc(100vh - 130px)', minHeight: '500px' }}>
      <Card className="h-full glass-card flex flex-col overflow-hidden glow-primary">
        {/* Messages area - scrollable */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 lg:p-5 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Welcome to Nexus Chat</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto mt-2">
                    I'm your intelligent companion. Ask me anything or start a conversation.
                  </p>
                </div>
              </div>
            )}
            
            <AnimatePresence mode="popLayout">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "flex items-start gap-3",
                    message.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <Avatar className={cn(
                    "w-8 h-8 md:w-10 md:h-10 border shadow-sm",
                    message.role === 'user' ? "border-primary/20" : "border-border"
                  )}>
                    {message.role === 'user' ? (
                      <>
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          <User className="w-4 h-4 md:w-5 md:h-5" />
                        </AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-muted text-muted-foreground">
                          <Bot className="w-4 h-4 md:w-5 md:h-5" />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div className={cn(
                    "relative group max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-2.5 text-sm md:text-base shadow-sm select-text cursor-text",
                    message.role === 'user' 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-muted/80 backdrop-blur-sm border border-border/50 text-foreground rounded-tl-none font-medium"
                  )}>
                    <div className="whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                    {message.role === 'assistant' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadMessage(message.content, index)}
                        className="absolute -right-10 top-0 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-primary z-10"
                        title="Download as .txt"
                      >
                        <DownloadIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-start gap-3"
              >
                <Avatar className="w-8 h-8 md:w-10 md:h-10 border border-border">
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    <Bot className="w-4 h-4 md:w-5 md:h-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted/80 backdrop-blur-sm border border-border/50 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                  <div className="flex gap-1.5 h-6 items-center">
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </motion.div>
            )}
        </div>

        <div className="p-4 border-t border-border/40 bg-background/40 backdrop-blur-md">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2 max-w-4xl mx-auto"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 bg-muted/50 border-border/50 focus-visible:ring-primary/20 h-11 rounded-xl"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              size="icon"
              className="h-11 w-11 rounded-xl shrink-0 shadow-lg shadow-primary/20"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
