import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';

interface TextToSpeechProps {
  text: string;
  title?: string;
}

export default function TextToSpeech({ text, title }: TextToSpeechProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const u = new SpeechSynthesisUtterance(text);
    u.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    setUtterance(u);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text]);

  const togglePlay = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      if (utterance) {
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
        setIsPaused(false);
      }
    }
  };

  const reset = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
          <Volume2 className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-primary">Listen to Study</h4>
          {title && <p className="text-[10px] text-primary/60 uppercase tracking-widest">{title}</p>}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="p-3 bg-accent text-white rounded-full hover:bg-accent-light transition-all shadow-md"
          title={isSpeaking && !isPaused ? 'Pause' : 'Play'}
        >
          {isSpeaking && !isPaused ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
        </button>
        {isSpeaking && (
          <button
            onClick={reset}
            className="p-3 bg-white text-primary rounded-full hover:bg-gray-100 transition-all border border-gray-200"
            title="Reset"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
