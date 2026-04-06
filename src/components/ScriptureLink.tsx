import React, { useState, useEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { GoogleGenAI } from "@google/genai";
import { Loader2, X, BookOpen } from 'lucide-react';
import { getGeminiApiKey } from '../lib/api';

interface ScriptureLinkProps {
  reference: string;
  children?: React.ReactNode;
}

export default function ScriptureLink({ reference, children }: ScriptureLinkProps) {
  const [verseText, setVerseText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && !verseText && !isLoading) {
      fetchVerse();
    }
  }, [isOpen]);

  const fetchVerse = async () => {
    setIsLoading(true);
    try {
      const apiKey = getGeminiApiKey();
      if (!apiKey) {
        setVerseText("API key is missing. Please check your environment variables.");
        return;
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide the full text of the following Bible verse(s) in both the King James Version (KJV) and the New International Version (NIV). 
        CRITICAL: Format your response as follows:
        KJV: [verse text]
        NIV: [verse text]
        Only provide the verse texts, no other commentary, no introduction, and no conclusion. If multiple verses are requested, provide them as a single block for each version: ${reference}`,
      });
      setVerseText(response.text || "Verse text not found.");
    } catch (error) {
      console.error("Error fetching verse:", error);
      setVerseText("Error loading verse text.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button className="text-accent hover:text-accent-light underline decoration-dotted cursor-pointer transition-colors inline-flex items-center gap-1 group">
          <span className="font-medium">{children || reference}</span>
          <BookOpen className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="z-[100] w-[90vw] max-w-sm bg-primary text-secondary p-6 rounded-[2rem] shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-200 outline-none"
          sideOffset={8}
          align="center"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
                  {reference} (KJV & NIV)
                </p>
              </div>
              <Popover.Close className="p-1 hover:bg-white/10 rounded-lg transition-colors text-secondary/40 hover:text-secondary">
                <X className="h-4 w-4" />
              </Popover.Close>
            </div>
            
            <div className="min-h-[60px] flex flex-col justify-center">
              {isLoading ? (
                <div className="flex items-center gap-3 py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-accent" />
                  <span className="text-xs text-secondary/60 font-serif italic">Searching the scriptures...</span>
                </div>
              ) : (
                <p className="text-sm font-serif italic leading-relaxed text-secondary/90 whitespace-pre-wrap">
                  "{verseText}"
                </p>
              )}
            </div>
            
            <div className="pt-2 text-center">
              <p className="text-[9px] text-secondary/20 uppercase tracking-widest">Scripture-First Study Guide</p>
            </div>
          </div>
          <Popover.Arrow className="fill-primary" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
