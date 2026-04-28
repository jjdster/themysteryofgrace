import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { Mic, MicOff, Volume2, VolumeX, Loader2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MODEL = "gemini-2.0-flash-exp";

export default function VoiceAssistant() {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioWorkletNodeRef = useRef<AudioWorkletNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioQueueRef = useRef<Int16Array[]>([]);
  const isPlayingRef = useRef(false);

  const systemInstruction = `
    You are a scholarly Bible assistant focused on the "Preaching of Jesus Christ according to the Revelation of the Mystery" (Romans 16:25).
    CRITICAL: You MUST prioritize and defer to the Scriptures (King James Bible and New International Version) as your original and primary sources for answering any inquiries. 
    Your purpose is to answer questions not with tradition or denomination bias, but with the Scriptures rightly divided (2 Timothy 2:15).
    
    Key principles for your responses:
    1. DEFER TO SCRIPTURE FIRST. Use the King James Bible and the New International Version as the ultimate authority.
    2. Distinguish between God's program for Israel (Prophecy) and His current program for the Body of Christ (the Mystery revealed to Paul).
    3. Emphasize the Dispensation of the Grace of God.
    4. Recognize Paul as the unique "Apostle of the Gentiles" (Romans 11:13).
    5. Focus on the good news entrusted to Paul, by which we are stablished.
    6. Always apply the principle of "rightly dividing the Word of Truth" (2 Timothy 2:15).
    7. Be encouraging, edifying, and scholarly.
    8. If a question is outside the scope of the Scriptures or the Pauline revelation, gently guide the user back to the core message of grace.
  `;

  const playNextInQueue = useCallback(async () => {
    if (isPlayingRef.current || audioQueueRef.current.length === 0 || !audioContextRef.current) return;

    isPlayingRef.current = true;
    const chunk = audioQueueRef.current.shift()!;
    
    // Convert Int16Array to Float32Array for Web Audio API
    const float32Data = new Float32Array(chunk.length);
    for (let i = 0; i < chunk.length; i++) {
      float32Data[i] = chunk[i] / 32768.0;
    }

    const audioBuffer = audioContextRef.current.createBuffer(1, float32Data.length, 24000);
    audioBuffer.getChannelData(0).set(float32Data);

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);
    
    source.onended = () => {
      isPlayingRef.current = false;
      if (audioQueueRef.current.length > 0) {
        playNextInQueue();
      } else {
        setIsSpeaking(false);
      }
    };

    source.start();
    setIsSpeaking(true);
  }, []);

  const stopAssistant = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsActive(false);
    setIsListening(false);
    setIsSpeaking(false);
    setIsConnecting(false);
    audioQueueRef.current = [];
    isPlayingRef.current = false;
  }, []);

  const startAssistant = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // 1. Setup Audio Context
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      // 2. Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // 3. Initialize AI
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const sessionPromise = ai.live.connect({
        model: MODEL,
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction,
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } },
          },
        },
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            setIsListening(true);
            
            // Setup audio processing
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const processor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            source.connect(processor);
            processor.connect(audioContextRef.current!.destination);
            
            processor.onaudioprocess = (e) => {
              if (!isActive) return;
              const inputData = e.inputBuffer.getChannelData(0);
              // Convert Float32 to Int16 for Gemini
              const int16Data = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16Data[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
              }
              
              // Send to Gemini
              const base64Data = btoa(String.fromCharCode(...new Uint8Array(int16Data.buffer)));
              sessionPromise.then(session => {
                session.sendRealtimeInput({
                  audio: { data: base64Data, mimeType: 'audio/pcm;rate=24000' }
                });
              });
            };
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn?.parts) {
              for (const part of message.serverContent.modelTurn.parts) {
                if (part.inlineData?.data) {
                  const binaryString = atob(part.inlineData.data);
                  const bytes = new Uint8Array(binaryString.length);
                  for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                  }
                  const int16Array = new Int16Array(bytes.buffer);
                  audioQueueRef.current.push(int16Array);
                  playNextInQueue();
                }
              }
            }
            if (message.serverContent?.interrupted) {
              audioQueueRef.current = [];
              isPlayingRef.current = false;
              setIsSpeaking(false);
            }
          },
          onclose: () => stopAssistant(),
          onerror: (err) => {
            console.error("Live API Error:", err);
            setError("A connection error occurred. Please try again.");
            stopAssistant();
          }
        }
      });

      sessionRef.current = await sessionPromise;

    } catch (err: any) {
      console.error("Failed to start voice assistant:", err);
      setError(err.message || "Could not access microphone or connect to AI.");
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    return () => stopAssistant();
  }, [stopAssistant]);

  return (
    <div className={isActive ? "fixed inset-0 z-50 bg-secondary/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto" : "w-full max-w-md mx-auto"}>
      <motion.div 
        layout
        initial={false}
        className={`bg-white rounded-3xl p-8 shadow-2xl border border-primary/10 relative overflow-hidden transition-all duration-500 ${isActive ? 'w-full max-w-3xl min-h-[60vh] flex flex-col justify-center' : 'w-full'}`}
      >
        {/* Background Animation */}
        <AnimatePresence>
          {isActive && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-accent pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className={`mb-6 p-4 bg-primary/5 rounded-full transition-all duration-500 ${isActive ? 'scale-125' : ''}`}>
            <Mic className={`text-primary transition-all duration-500 ${isActive ? 'h-16 w-16' : 'h-10 w-10'}`} />
          </div>
          
          <h3 className={`font-serif text-primary mb-2 transition-all duration-500 ${isActive ? 'text-4xl' : 'text-2xl'}`}>Voice Bible Study</h3>
          <p className={`text-primary/60 mb-8 transition-all duration-500 ${isActive ? 'text-lg max-w-xl' : 'text-sm'}`}>
            Ask questions about the Mystery and the Dispensation of Grace audibly.
          </p>

          <div className="relative mb-8">
            {/* Pulse Effect */}
            <AnimatePresence>
              {(isListening || isSpeaking) && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                  className={`absolute inset-0 rounded-full ${isSpeaking ? 'bg-accent' : 'bg-primary'}`}
                />
              )}
            </AnimatePresence>

            <button
              onClick={isActive ? stopAssistant : startAssistant}
              disabled={isConnecting}
              className={`relative z-10 rounded-full flex items-center justify-center transition-all shadow-lg ${
                isActive 
                  ? 'bg-accent text-white hover:bg-accent-light w-32 h-32' 
                  : 'bg-primary text-secondary hover:bg-primary-light w-24 h-24'
              } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isConnecting ? (
                <Loader2 className={`animate-spin ${isActive ? 'h-14 w-14' : 'h-10 w-10'}`} />
              ) : isActive ? (
                <MicOff className={`h-14 w-14`} />
              ) : (
                <Mic className={`h-10 w-10`} />
              )}
            </button>
          </div>

          <div className="space-y-2 mb-4">
            <AnimatePresence mode="wait">
              {isConnecting && (
                <motion.p 
                  key="connecting"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`text-primary/40 font-medium uppercase tracking-widest ${isActive ? 'text-sm' : 'text-xs'}`}
                >
                  Establishing Connection...
                </motion.p>
              )}
              {isListening && !isSpeaking && (
                <motion.p 
                  key="listening"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`text-primary font-medium uppercase tracking-widest flex items-center justify-center ${isActive ? 'text-sm' : 'text-xs'}`}
                >
                  <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
                  Listening
                </motion.p>
              )}
              {isSpeaking && (
                <motion.p 
                  key="speaking"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`text-accent font-medium uppercase tracking-widest flex items-center justify-center ${isActive ? 'text-sm' : 'text-xs'}`}
                >
                  <Volume2 className="h-4 w-4 mr-2 animate-bounce" />
                  AI Responding
                </motion.p>
              )}
              {!isActive && !isConnecting && (
                <motion.p 
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`text-primary/40 font-medium uppercase tracking-widest ${isActive ? 'text-sm' : 'text-xs'}`}
                >
                  Tap to Start Voice Study
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {error && (
            <p className="text-red-500 text-xs mt-4 bg-red-50 p-2 rounded-lg border border-red-100">
              {error}
            </p>
          )}

          {isActive && (
            <button 
              onClick={stopAssistant}
              className="mt-12 text-primary/40 hover:text-primary text-xs uppercase tracking-widest font-bold transition-colors"
            >
              Minimize Guide
            </button>
          )}
        </div>
      </motion.div>
      
      {!isActive && (
        <p className="text-center text-primary/40 text-[10px] mt-4 uppercase tracking-tighter">
          Powered by Gemini 2.0 Flash Experimental • Pauline Revelation Context
        </p>
      )}
    </div>
  );
}
