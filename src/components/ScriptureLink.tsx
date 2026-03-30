import React, { useState, useEffect } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { GoogleGenAI } from "@google/genai";
import { Loader2 } from 'lucide-react';
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
        contents: `Provide the full text of the following Bible verse(s) in the King James Version (KJV). CRITICAL: Only provide the verse text, no other commentary, no introduction, and no conclusion. If multiple verses are requested, provide them as a single block of text: ${reference}`,
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
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root open={isOpen} onOpenChange={setIsOpen}>
        <Tooltip.Trigger asChild>
          <span className="text-accent hover:text-accent-light underline decoration-dotted cursor-help transition-colors">
            {children || reference}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 max-w-xs bg-primary text-secondary p-4 rounded-xl shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-200"
            sideOffset={5}
          >
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
                {reference} (KJV)
              </p>
              {isLoading ? (
                <div className="flex items-center gap-2 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-accent" />
                  <span className="text-xs text-secondary/60">Searching the scriptures...</span>
                </div>
              ) : (
                <p className="text-sm font-serif italic leading-relaxed">
                  "{verseText}"
                </p>
              )}
            </div>
            <Tooltip.Arrow className="fill-primary" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
