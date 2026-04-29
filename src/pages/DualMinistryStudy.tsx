
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  MessageSquare, 
  ShieldCheck, 
  Users, 
  User, 
  Lock, 
  RotateCcw, 
  Info,
  FileText,
  ArrowRight,
  Lightbulb,
  AlertCircle,
  Download,
  Trophy,
  Home,
  Loader2,
  Maximize2,
  X
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { dualMinistryData, Module, Lesson, Question } from '../data/dualMinistryData';
import ScriptureText from '../components/ScriptureText';
import { DebugPanel } from '../components/DebugPanel';
import { SpeakButton } from '../components/SpeakButton';
import { studyLogger } from '../lib/logger';
import { getGeminiApiKey } from '../lib/api';
import { useAuth } from '../lib/AuthProvider';
import { signInWithGoogle } from '../lib/firebase';
import AuthModal from '../components/AuthModal';

const RESTRICTED_AUTHORS = ['Charles F. Baker', 'Harry Bultema', 'Cornelius R. Stam', 'C.R. Stam'];
const ALLOWED_BUILDER_EMAIL = 'jjdster@gmail.com';

// --- Types ---
type StudyMode = 'solo' | 'group';

// --- Components ---

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const progress = (current / total) * 100;
  return (
    <div className="w-full h-1 bg-primary/10 rounded-full overflow-hidden mb-8">
      <motion.div 
        className="h-full bg-accent"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};

const AIGuide = ({ 
  lesson, 
  isLeaderMode,
  sessionId
}: { 
  lesson: Lesson; 
  isLeaderMode: boolean;
  sessionId: string;
}) => {
  const [input, setInput] = useState('');
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);

  // Initialize chat session
  useEffect(() => {
    const initChat = async () => {
      try {
        const apiKey = getGeminiApiKey();
        if (!apiKey) {
          setMessages([{ role: 'model', text: "I'm sorry, I couldn't find an API key. Please check your environment settings." }]);
          return;
        }
        
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `
          You are an interactive, scripture-first study guide for a lesson titled "${lesson.title}".
          CRITICAL: You MUST prioritize and defer to the Scriptures (King James Bible and New International Version) as your original and primary sources for answering any inquiries. 
          Your goal is to help the user understand the biblical view of the Dual Ministry of Jesus Christ (Messiah to Israel vs. Head to the Body) based ONLY on the provided scriptures and source material, always applying the principle of 'rightly dividing the Word of Truth' (2 Timothy 2:15).
          
          CLARIFICATION ON DOCTRINE:
          Understand that the 'New Testament' (as a book division) contains both the program for Israel and the revelation of the mystery. 
          CRITICAL: Do NOT say that the New Testament reveals spiritual baptism. Instead, recognize that spiritual baptism (placing the believer into a heavenly/celestial position) is strictly revealed in the REVELATION OF THE MYSTERY as preached by the apostle Paul.
          
          SCRIPTURES:
          ${lesson.scripture.map(s => `${s.reference}: ${s.text}`).join('\n')}
          
          SOURCE MATERIAL:
          Book: ${lesson.sourceText.book} by ${lesson.sourceText.author}
          Excerpt: ${lesson.sourceText.excerpt}
          Summary: ${lesson.summary}
          
          GUIDELINES:
          1. DEFER TO SCRIPTURE FIRST. Use the King James Bible and the New International Version as the ultimate authority.
          2. Stay tightly scoped to the chosen source material and scriptures.
          3. Do not answer from general AI memory if the source text or scripture provides an answer.
          4. If a concept is not supported by the selected sources, say so clearly.
          5. Be educational, encouraging, and clear.
          6. ${isLeaderMode ? "You are in LEADER MODE. Provide additional facilitator notes and deeper theological insights for a small group setting." : "You are in SOLO MODE. Focus on helping the individual student grasp the core concepts."}
          7. Always apply the principle of "rightly dividing the Word of Truth" (2 Timothy 2:15).
        `;

        chatSessionRef.current = ai.chats.create({
          model: "gemini-3-flash-preview",
          config: {
            systemInstruction,
          },
        });

        // Add initial greeting
        setMessages([{ 
          role: 'model', 
          text: `Hello! I'm your study guide for "${lesson.title}". How can I help you understand the dual ministry of Christ today?` 
        }]);
      } catch (error) {
        console.error("Chat Init Error:", error);
        setMessages([{ role: 'model', text: "I'm having trouble connecting to the study guide. Please try refreshing the page." }]);
      }
    };

    initChat();
  }, [lesson.id, isLeaderMode]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isEnlarged]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !chatSessionRef.current) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Log the question
      await studyLogger.logSessionInteraction(sessionId, lesson.title, {
        type: 'question',
        data: {
          userQuestion: userMessage,
          status: 'pending'
        }
      });

      // Create a placeholder for the model response
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      const result = await chatSessionRef.current.sendMessageStream({ message: userMessage });
      
      let fullResponse = '';
      for await (const chunk of result) {
        const chunkText = chunk.text;
        fullResponse += chunkText;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', text: fullResponse };
          return newMessages;
        });
      }

      // Log the full interaction
      studyLogger.logSessionInteraction(sessionId, lesson.title, {
        type: 'question',
        data: {
          userQuestion: userMessage,
          aiResponse: fullResponse,
          status: 'completed'
        }
      });
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMsg = newMessages[newMessages.length - 1];
        if (lastMsg && lastMsg.role === 'model' && lastMsg.text === '') {
          newMessages[newMessages.length - 1] = { role: 'model', text: "I'm having trouble connecting right now. Please check your internet or try again in a moment." };
        } else {
          newMessages.push({ role: 'model', text: "I encountered an error while responding. Please try again." });
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${isEnlarged ? 'fixed inset-0 z-50 bg-secondary/95 backdrop-blur-md p-4 md:p-12 flex items-center justify-center' : 'w-full'}`}>
      <motion.div 
        layout
        className={`bg-white rounded-2xl border border-primary/10 shadow-xl overflow-hidden flex flex-col transition-all duration-500 ${isEnlarged ? 'w-full max-w-5xl h-[85vh]' : 'h-[500px] w-full'}`}
      >
        <div className="p-4 bg-primary text-secondary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-accent" />
            <span className="font-serif font-bold">Interactive Guide</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsEnlarged(!isEnlarged)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-secondary/60 hover:text-secondary"
            >
              {isEnlarged ? <ChevronLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5 rotate-45" />}
            </button>
          </div>
        </div>
        
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-secondary-light/30">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed relative group ${
                msg.role === 'user' 
                  ? 'bg-accent text-white rounded-tr-none' 
                  : 'bg-white border border-primary/10 text-primary rounded-tl-none shadow-sm'
              }`}>
                {msg.role === 'user' ? (
                  <ScriptureText text={msg.text} />
                ) : (
                  <>
                    <div className="markdown-body">
                      {msg.text ? (
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p className="mb-4 last:mb-0">
                                {React.Children.map(children, child => {
                                  if (typeof child === 'string') {
                                    return <ScriptureText text={child} />;
                                  }
                                  return child;
                                })}
                              </p>
                            ),
                            h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-md font-bold mb-2">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                            ul: ({ children }) => <ul className="list-disc pl-4 mb-4">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 mb-4">{children}</ol>,
                            li: ({ children }) => (
                              <li className="mb-1">
                                {React.Children.map(children, child => {
                                  if (typeof child === 'string') {
                                    return <ScriptureText text={child} />;
                                  }
                                  return child;
                                })}
                              </li>
                            ),
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      ) : (
                        <div className="flex gap-1 py-2">
                          <div className="w-1.5 h-1.5 bg-accent/20 rounded-full animate-pulse" />
                          <div className="w-1.5 h-1.5 bg-accent/20 rounded-full animate-pulse [animation-delay:0.2s]" />
                          <div className="w-1.5 h-1.5 bg-accent/20 rounded-full animate-pulse [animation-delay:0.4s]" />
                        </div>
                      )}
                    </div>
                    {msg.text && <SpeakButton text={msg.text} size="sm" className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </>
                )}
              </div>
            </div>
          ))}
          {isLoading && !messages[messages.length - 1]?.text && (
            <div className="flex justify-start">
              <div className="bg-white border border-primary/10 p-4 rounded-2xl rounded-tl-none shadow-sm">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-primary/10 bg-white">
          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="w-full pl-4 pr-12 py-3 bg-secondary-light/50 border border-primary/10 rounded-xl text-sm focus:outline-none focus:border-accent"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-accent hover:bg-accent/10 rounded-lg disabled:opacity-50"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Quiz = ({ 
  lesson,
  onComplete,
  sessionId
}: { 
  lesson: Lesson; 
  onComplete: (score: number) => void;
  sessionId: string;
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = lesson.questions[currentIdx];

  const handleNext = () => {
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) setScore(s => s + 1);
    
    studyLogger.logSessionInteraction(sessionId, lesson.title, {
      type: 'quiz',
      data: {
        question: currentQuestion.question,
        isCorrect
      }
    });

    if (currentIdx < lesson.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const finalScore = (score / lesson.questions.length) * 100;
    return (
      <div className="text-center p-8 bg-white rounded-3xl border border-primary/10 shadow-sm">
        <Trophy className="h-12 w-12 text-accent mx-auto mb-6" />
        <h2 className="text-3xl font-serif font-bold text-primary mb-2">Lesson Complete!</h2>
        <p className="text-primary/60 mb-8">You scored {score} out of {lesson.questions.length}.</p>
        <button 
          onClick={() => onComplete(finalScore)}
          className="px-8 py-3 bg-primary text-secondary rounded-xl font-bold hover:bg-primary-light transition-colors"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-primary/10 shadow-sm p-8">
      <h3 className="text-xl font-serif font-bold text-primary mb-8">{currentQuestion.question}</h3>
      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, i) => (
          <button
            key={i}
            onClick={() => !showFeedback && setSelectedOption(i)}
            className={`w-full p-4 rounded-xl text-left text-sm transition-all border ${
              selectedOption === i ? 'border-accent bg-accent/5 text-accent' : 'border-primary/10 text-primary/70'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <button 
        onClick={handleNext}
        disabled={selectedOption === null}
        className="w-full py-4 bg-primary text-secondary rounded-xl font-bold hover:bg-primary-light transition-colors disabled:opacity-50"
      >
        {currentIdx < lesson.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
      </button>
    </div>
  );
};

export default function DualMinistryStudy() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isStudyComplete, setIsStudyComplete] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const currentModule = dualMinistryData[currentModuleIdx];
  const currentLesson = currentModule?.lessons[currentLessonIdx];

  const nextLesson = () => {
    if (currentLessonIdx < currentModule.lessons.length - 1) {
      setCurrentLessonIdx(currentLessonIdx + 1);
      setShowQuiz(false);
    } else if (currentModuleIdx < dualMinistryData.length - 1) {
      setCurrentModuleIdx(currentModuleIdx + 1);
      setCurrentLessonIdx(0);
      setShowQuiz(false);
    } else {
      setIsStudyComplete(true);
    }
  };

  if (isStudyComplete) {
    return (
      <div className="min-h-screen bg-secondary-light flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl">
          <Trophy className="h-16 w-16 text-accent mx-auto mb-8" />
          <h1 className="text-4xl font-serif font-bold text-primary mb-6">Study Complete!</h1>
          <p className="text-xl text-primary/60 mb-12">You have completed "The Dual Ministry of Christ".</p>
          <button onClick={() => navigate('/studies')} className="px-10 py-4 bg-primary text-secondary rounded-2xl font-bold">
            Back to Bible Studies
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-light">
      <div className="bg-white border-b border-primary/10 py-8 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">The Dual Ministry of Christ</h1>
            <p className="text-accent font-bold text-sm uppercase tracking-widest mt-1">{currentModule.title}</p>
          </div>
          <button onClick={() => navigate('/studies')} className="p-2 hover:bg-secondary rounded-full transition-colors">
            <X className="h-6 w-6 text-primary/40" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <div className="space-y-2">
              {dualMinistryData.map((mod, idx) => (
                <div key={mod.id} className={`p-4 rounded-xl border transition-all ${idx === currentModuleIdx ? 'bg-white border-accent shadow-sm' : 'opacity-40'}`}>
                  <span className="text-xs font-bold text-accent block mb-1">Module {idx + 1}</span>
                  <span className="text-sm font-serif font-bold text-primary">{mod.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              {!showQuiz ? (
                <motion.div key="lesson" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                  <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm">
                    <h2 className="text-2xl font-serif font-bold text-primary mb-6">{currentLesson.title}</h2>
                    <div className="space-y-6">
                      {currentLesson.scripture.map((s, i) => (
                        <div key={i} className="pl-4 border-l-4 border-accent/20">
                          <p className="text-primary/80 italic mb-2">"{s.text}"</p>
                          <p className="text-xs font-bold text-accent uppercase tracking-widest">— {s.reference}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-secondary-light/50 p-8 rounded-3xl border border-primary/10 italic relative group">
                    <p className="text-primary/70 leading-relaxed mb-4">"{currentLesson.sourceText.excerpt}"</p>
                    <div className="flex items-center justify-between">
                      <SpeakButton text={currentLesson.sourceText.excerpt} size="sm" />
                      <span className="text-xs font-bold text-primary/40">— {currentLesson.sourceText.author}</span>
                    </div>
                  </div>

                  <div className="bg-white p-10 rounded-[2.5rem] border border-primary/5 shadow-xl relative group">
                    <div className="absolute top-6 right-6">
                      <SpeakButton text={currentLesson.summary} size="md" />
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <ScriptureText text={currentLesson.summary} />
                    </div>
                  </div>

                  <button onClick={() => setShowQuiz(true)} className="w-full py-4 bg-accent text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-accent-light transition-all">
                    Take Lesson Quiz
                  </button>
                </motion.div>
              ) : (
                <motion.div key="quiz" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                  <Quiz lesson={currentLesson} onComplete={nextLesson} sessionId={sessionId} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-3">
            <AIGuide key={sessionId} lesson={currentLesson} isLeaderMode={false} sessionId={sessionId} />
          </div>
        </div>
      </div>
      <DebugPanel />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}
