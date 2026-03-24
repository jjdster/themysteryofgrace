import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Mic, MicOff, Video, VideoOff, Play, Square, Loader2, Info, MessageSquare } from 'lucide-react';
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";

// Audio configuration
const SAMPLE_RATE = 16000;

export default function LiveStudy() {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [transcription, setTranscription] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioWorkletNodeRef = useRef<AudioWorkletNode | null>(null);
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const videoIntervalRef = useRef<number | null>(null);

  // Initialize Audio Context and Worklet
  const initAudio = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext({ sampleRate: SAMPLE_RATE });
      
      // Create a simple audio worklet for capturing microphone data
      const blob = new Blob([`
        class AudioProcessor extends AudioWorkletProcessor {
          process(inputs, outputs, parameters) {
            const input = inputs[0];
            if (input.length > 0) {
              const channelData = input[0];
              // Convert Float32 to Int16
              const int16Data = new Int16Array(channelData.length);
              for (let i = 0; i < channelData.length; i++) {
                int16Data[i] = Math.max(-1, Math.min(1, channelData[i])) * 0x7FFF;
              }
              this.port.postMessage(int16Data.buffer, [int16Data.buffer]);
            }
            return true;
          }
        }
        registerProcessor('audio-processor', AudioProcessor);
      `], { type: 'application/javascript' });
      
      const url = URL.createObjectURL(blob);
      await audioContextRef.current.audioWorklet.addModule(url);
      audioWorkletNodeRef.current = new AudioWorkletNode(audioContextRef.current, 'audio-processor');
    }
  };

  const startSession = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // 1. Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { width: 640, height: 480, frameRate: 15 }
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;

      // 2. Initialize Audio
      await initAudio();

      // 3. Connect to Gemini Live API
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const sessionPromise = ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-12-2025",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: "You are a scholarly guide specializing in 'The Mystery of Grace' and the Pauline revelation. Your goal is to help the user understand the preaching of Jesus Christ according to the revelation of the mystery (Romans 16:25). Be respectful, insightful, and use scripture (KJV preferred) to support your points. You can see the user and hear them in real-time. If they show you a Bible verse or a book, try to read it and comment on it.",
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            console.log("Live session opened");
            setIsConnecting(false);
            setIsActive(true);

            // Start streaming audio
            if (audioContextRef.current && audioWorkletNodeRef.current && streamRef.current) {
              const source = audioContextRef.current.createMediaStreamSource(streamRef.current);
              source.connect(audioWorkletNodeRef.current);
              
              audioWorkletNodeRef.current.port.onmessage = (event) => {
                if (sessionRef.current && !isMuted) {
                  const base64Data = btoa(String.fromCharCode(...new Uint8Array(event.data)));
                  sessionRef.current.sendRealtimeInput({
                    audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
                  });
                }
              };
            }

            // Start streaming video frames
            videoIntervalRef.current = window.setInterval(() => {
              if (sessionRef.current && videoRef.current && canvasRef.current && !isVideoOff) {
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                if (context) {
                  context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                  const base64Data = canvas.toDataURL('image/jpeg', 0.5).split(',')[1];
                  sessionRef.current.sendRealtimeInput({
                    video: { data: base64Data, mimeType: 'image/jpeg' }
                  });
                }
              }
            }, 500); // Send frame every 500ms
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle audio output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
              const binaryString = atob(base64Audio);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }
              const int16Data = new Int16Array(bytes.buffer);
              const float32Data = new Float32Array(int16Data.length);
              for (let i = 0; i < int16Data.length; i++) {
                float32Data[i] = int16Data[i] / 0x7FFF;
              }

              const audioBuffer = audioContextRef.current.createBuffer(1, float32Data.length, SAMPLE_RATE);
              audioBuffer.getChannelData(0).set(float32Data);
              const source = audioContextRef.current.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(audioContextRef.current.destination);
              source.start();
            }

            // Handle transcription
            if (message.serverContent?.modelTurn?.parts?.[0]?.text) {
              setTranscription(prev => [...prev, `AI: ${message.serverContent?.modelTurn?.parts?.[0]?.text}`].slice(-5));
            }
          },
          onclose: () => {
            stopSession();
          },
          onerror: (err) => {
            console.error("Live session error:", err);
            setError("Connection error. Please try again.");
            stopSession();
          }
        }
      });

      sessionRef.current = await sessionPromise;

    } catch (err) {
      console.error("Failed to start session:", err);
      setError("Could not access camera/microphone or connect to service.");
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (videoIntervalRef.current) clearInterval(videoIntervalRef.current);
    if (sessionRef.current) sessionRef.current.close();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioWorkletNodeRef.current) audioWorkletNodeRef.current.disconnect();
    
    sessionRef.current = null;
    streamRef.current = null;
    setIsActive(false);
    setIsConnecting(false);
    setTranscription([]);
  };

  useEffect(() => {
    return () => stopSession();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-primary pt-24 pb-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Video Area */}
          <div className="flex-grow w-full">
            <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-secondary/10">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : 'block'}`}
              />
              
              {isVideoOff && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                  <VideoOff className="h-24 w-24 text-secondary/20" />
                </div>
              )}

              {/* Overlay Controls */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full transition-colors ${isMuted ? 'bg-red-500 text-white' : 'hover:bg-white/10 text-white'}`}
                >
                  {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </button>
                
                <button 
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-3 rounded-full transition-colors ${isVideoOff ? 'bg-red-500 text-white' : 'hover:bg-white/10 text-white'}`}
                >
                  {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
                </button>

                <div className="w-px h-8 bg-white/20 mx-2" />

                {!isActive ? (
                  <button 
                    onClick={startSession}
                    disabled={isConnecting}
                    className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full font-bold hover:bg-accent-light transition-all disabled:opacity-50"
                  >
                    {isConnecting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Play className="h-5 w-5" />}
                    {isConnecting ? 'Connecting...' : 'Start Session'}
                  </button>
                ) : (
                  <button 
                    onClick={stopSession}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-all"
                  >
                    <Square className="h-5 w-5" />
                    End Session
                  </button>
                )}
              </div>

              {/* Status Indicator */}
              {isActive && (
                <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  LIVE
                </div>
              )}
            </div>

            {/* Transcription / Subtitles */}
            <div className="mt-6 bg-zinc-900/50 rounded-2xl p-6 border border-white/5 min-h-[120px]">
              <div className="flex items-center gap-2 text-secondary/40 text-xs font-bold uppercase tracking-widest mb-4">
                <MessageSquare className="h-4 w-4" />
                Live Conversation
              </div>
              <div className="space-y-2">
                {transcription.length === 0 ? (
                  <p className="text-secondary/20 italic">Start a session to begin the conversation...</p>
                ) : (
                  transcription.map((line, i) => (
                    <motion.p 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-secondary/80 font-serif italic"
                    >
                      {line}
                    </motion.p>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
            <div className="bg-zinc-900/50 rounded-3xl p-8 border border-white/5">
              <div className="flex items-center gap-3 mb-6 text-accent">
                <Info className="h-6 w-6" />
                <h2 className="text-xl font-serif text-secondary">Live Study</h2>
              </div>
              <p className="text-secondary/60 text-sm leading-relaxed mb-6">
                Experience a real-time, face-to-face conversation with our AI scholarly guide. 
                Discuss the "Mystery of Grace," ask questions about the Pauline revelation, or even show your Bible to the camera for joint study.
              </p>
              <ul className="space-y-4 text-xs text-secondary/40 font-medium uppercase tracking-wider">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Real-time Voice & Video
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Scripture-focused Guidance
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Interactive Bible Study
                </li>
              </ul>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Hidden canvas for frame capture */}
      <canvas ref={canvasRef} width="640" height="480" className="hidden" />
    </motion.div>
  );
}
