import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Loader2, Info, MessageSquare, User, BookOpen } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ScriptureText from '../components/ScriptureText';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function LiveStudy() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLatestMessageTop = () => {
    if (scrollContainerRef.current) {
      const messageElements = scrollContainerRef.current.querySelectorAll('.message-item');
      const lastElement = messageElements[messageElements.length - 1] as HTMLElement;
      if (lastElement) {
        lastElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      // If it's a model message and it's just starting, scroll to its top
      if (lastMessage.role === 'model' && lastMessage.text.length < 20) {
        const timer = setTimeout(scrollToLatestMessageTop, 50);
        return () => clearTimeout(timer);
      } else if (lastMessage.role === 'user') {
        scrollToBottom();
      }
    }
  }, [messages]);

  // Initialize Chat
  useEffect(() => {
    const initChat = async () => {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        setError("AI configuration is missing. Please check your environment.");
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      chatRef.current = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are a scholarly guide specializing in 'Grace Library' and the Pauline revelation. CRITICAL: You MUST prioritize and defer to the Scriptures (KJV) first in every response. Your goal is to help the user understand the preaching of Jesus Christ according to the revelation of the mystery (Romans 16:25). Be respectful, insightful, and use scripture to support your points. Keep your answers concise but deep in doctrine.",
        },
      });
    };

    initChat();
  }, []);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);
    setError(null);

    try {
      const result = await chatRef.current.sendMessageStream({
        message: userMessage,
      });

      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of result) {
        const chunkText = chunk.text;
        fullText += chunkText;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', text: fullText };
          return newMessages;
        });
      }
    } catch (err) {
      console.error("Chat error:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-primary pt-24 pb-12 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Chat Area */}
          <div className="flex-grow w-full flex flex-col h-[70vh] lg:h-[80vh]">
            <div className="flex-grow bg-zinc-900/50 rounded-3xl border border-white/5 overflow-hidden flex flex-col shadow-2xl">
              {/* Chat Header */}
              <div className="px-6 py-4 border-bottom border-white/5 bg-black/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-secondary font-serif font-bold">Scholarly Dialogue</h2>
                    <p className="text-[10px] text-secondary/40 uppercase tracking-widest font-bold">According to the Mystery</p>
                  </div>
                </div>
              </div>

              {/* Messages List */}
              <div 
                ref={scrollContainerRef}
                className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 relative"
              >
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center px-8">
                    <BookOpen className="h-12 w-12 text-secondary/10 mb-4" />
                    <h3 className="text-secondary/60 font-serif text-xl mb-2">Begin Your Study</h3>
                    <p className="text-secondary/30 text-sm max-w-xs">
                      Ask a question about the Dispensation of Grace or the Pauline revelation to start the dialogue.
                    </p>
                  </div>
                )}
                
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`message-item flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border ${
                        msg.role === 'user' 
                          ? 'bg-accent/10 border-accent/20 text-accent' 
                          : 'bg-zinc-800 border-white/5 text-secondary/60'
                      }`}>
                        {msg.role === 'user' ? <User className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                      </div>
                      <div className={`max-w-[80%] p-4 rounded-2xl font-serif leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-accent text-white rounded-tr-none'
                          : 'bg-white/5 text-secondary/80 rounded-tl-none italic'
                      }`}>
                        {msg.text ? <ScriptureText text={msg.text} /> : (isLoading && i === messages.length - 1 ? (
                          <div className="flex gap-1 py-1">
                            <span className="w-1.5 h-1.5 bg-secondary/40 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-secondary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1.5 h-1.5 bg-secondary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                          </div>
                        ) : null)}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 bg-black/20 border-top border-white/5">
                <form onSubmit={handleSend} className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about the Revelation of the Mystery..."
                    className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-6 py-4 pr-16 text-secondary focus:outline-none focus:border-accent/50 transition-colors font-serif italic"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-accent text-white rounded-xl hover:bg-accent-light transition-all disabled:opacity-50 disabled:hover:bg-accent"
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  </button>
                </form>
                {error && (
                  <p className="mt-2 text-red-400 text-xs text-center">{error}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
            <div className="bg-zinc-900/50 rounded-3xl p-8 border border-white/5 shadow-xl">
              <div className="flex items-center gap-3 mb-6 text-accent">
                <Info className="h-6 w-6" />
                <h2 className="text-xl font-serif text-secondary">Study Guide</h2>
              </div>
              <p className="text-secondary/60 text-sm leading-relaxed mb-6">
                This interactive dialogue is powered by an AI scholarly guide specialized in the Pauline revelation. 
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Focus Areas</h4>
                  <ul className="space-y-2 text-[10px] text-secondary/40 font-medium uppercase tracking-wider">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full" />
                      Dispensation of Grace
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full" />
                      The Mystery (Rom 16:25)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full" />
                      Pauline Epistles
                    </li>
                  </ul>
                </div>
                <p className="text-[10px] text-secondary/30 italic leading-relaxed">
                  <ScriptureText text='"Now to him that is of power to stablish you according to my gospel, and the preaching of Jesus Christ, according to the revelation of the mystery..." — Romans 16:25' />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
