import React from 'react';
import { Volume2, Square, Pause, Play } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { motion } from 'framer-motion';

interface SpeakButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SpeakButton: React.FC<SpeakButtonProps> = ({ text, className = '', size = 'md' }) => {
  const { speak, stop, pause, resume, isSpeaking, isPaused } = useTextToSpeech();

  const iconSize = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5';
  const padding = size === 'sm' ? 'p-1.5' : size === 'lg' ? 'p-3' : 'p-2';

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      speak(text);
    }
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    stop();
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className={`${padding} rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors flex items-center justify-center`}
        title={isSpeaking ? (isPaused ? "Resume" : "Pause") : "Listen"}
      >
        {isSpeaking ? (
          isPaused ? <Play className={iconSize} /> : <Pause className={iconSize} />
        ) : (
          <Volume2 className={iconSize} />
        )}
      </motion.button>
      
      {isSpeaking && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStop}
          className={`${padding} rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors flex items-center justify-center`}
          title="Stop"
        >
          <Square className={iconSize} />
        </motion.button>
      )}
    </div>
  );
};
