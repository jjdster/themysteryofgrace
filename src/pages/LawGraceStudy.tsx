
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
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
  RotateCcw, 
  Info,
  FileText,
  ArrowRight,
  Lightbulb,
  AlertCircle,
  Trophy,
  Home,
  Loader2,
  Maximize2,
  X
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { lawGraceStudyData } from '../data/lawGraceStudyData';
import { Module, Lesson, Question } from '../data/baptismStudyData';
import ScriptureText from '../components/ScriptureText';
import { DebugPanel } from '../components/DebugPanel';
import { SpeakButton } from '../components/SpeakButton';
import { studyLogger } from '../lib/logger';
import { getGeminiApiKey } from '../lib/api';
import { useAuth } from '../lib/AuthProvider';
import { signInWithGoogle } from '../lib/firebase';
import { LogIn } from 'lucide-react';
import AuthModal from '../components/AuthModal';

const RESTRICTED_AUTHORS = ['Charles F. Baker', 'Harry Bultema', 'Cornelius R. Stam', 'C.R. Stam'];
const ALLOWED_BUILDER_EMAIL = 'jjdster@gmail.com';

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
  const [messages, setMessages] = useState<{ role: 'user' | 'guide'; text: string }[]>([
    { role: 'guide', text: `Hello! I'm your study guide for this lesson on "${lesson.title}". What questions do you have about the distinctions between Law and Grace?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isEnlarged]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);
    setInput('');

    try {
      await studyLogger.logSessionInteraction(sessionId, lesson.title, {
        type: 'question',
        data: {
          userQuestion: userMessage,
          status: 'pending'
        }
      });

      const apiKey = getGeminiApiKey();
      if (!apiKey) {
        setMessages(prev => [...prev, { role: 'guide', text: "API key is missing. Please check your environment variables." }]);
        return;
      }
      const ai = new GoogleGenAI({ apiKey });
      
      const history = messages.map(m => `${m.role === 'user' ? 'USER' : 'GUIDE'}: ${m.text}`).join('\n');
      
      const prompt = `
        You are an interactive, scripture-first study guide for a lesson titled "${lesson.title}".
        CRITICAL: You MUST prioritize and defer to the Scriptures (King James Bible and New International Version) as your original and primary sources for answering any inquiries.
        Your goal is to help the user understand the biblical distinction between Law (God's program for Israel) and Grace (God's program for the Body of Christ) based ONLY on the provided scriptures and source material, always applying the principle of 'rightly dividing the Word of Truth' (2 Timothy 2:15).
        
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
        7. MAINTAIN CONTEXT. Refer back to previous parts of the conversation if relevant.
        8. Always apply the principle of "rightly dividing the Word of Truth" (2 Timothy 2:15).
        
        CONVERSATION HISTORY:
        ${history}
        
        USER QUESTION: ${userMessage}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const guideResponse = response.text || "I'm sorry, I couldn't generate a response.";
      setMessages(prev => [...prev, { role: 'guide', text: guideResponse }]);
      
      studyLogger.logSessionInteraction(sessionId, lesson.title, {
        type: 'question',
        data: {
          userQuestion: userMessage,
          aiResponse: guideResponse,
          status: 'completed'
        }
      });
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'guide', text: "I'm having trouble connecting right now. Please try again in a moment." }]);
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
            {isLeaderMode && (
              <span className="text-[10px] uppercase tracking-widest bg-accent/20 text-accent px-2 py-1 rounded-full border border-accent/30">
                Leader Mode
              </span>
            )}
            <button 
              onClick={() => setIsEnlarged(!isEnlarged)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-secondary/60 hover:text-secondary"
              title={isEnlarged ? "Minimize" : "Enlarge to Full Page"}
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
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                          h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-md font-bold mb-2">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                          ul: ({ children }) => <ul className="list-disc pl-4 mb-4">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal pl-4 mb-4">{children}</ol>,
                          li: ({ children }) => <li className="mb-1">{children}</li>,
                          blockquote: ({ children }) => <blockquote className="border-l-4 border-accent/20 pl-4 italic mb-4">{children}</blockquote>,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                    <SpeakButton text={msg.text} size="sm" className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
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
              onChange={(e) => {
                setInput(e.target.value);
                if (!isEnlarged && e.target.value.length > 0) setIsEnlarged(true);
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              onFocus={() => !isEnlarged && setIsEnlarged(true)}
              placeholder="Ask a question about this lesson..."
              className="w-full pl-4 pr-12 py-3 bg-secondary-light/50 border border-primary/10 rounded-xl text-sm focus:outline-none focus:border-accent transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors disabled:opacity-50"
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
  questions, 
  onComplete,
  sessionId,
  isLastLesson
}: { 
  lesson: Lesson;
  questions: Question[]; 
  onComplete: (score: number) => void;
  sessionId: string;
  isLastLesson?: boolean;
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const getEncouragingRemark = (scorePercent: number) => {
    if (scorePercent === 100) return "Excellent work! You are rightly dividing the word of truth.";
    if (scorePercent >= 80) return "Great job! You have a strong understanding of Law and Grace.";
    if (scorePercent >= 60) return "Good effort! Review the purpose of the Law to sharpen your understanding.";
    return "Don't be discouraged! These are foundational truths. Review the scriptures and try again.";
  };

  const currentQuestion = questions[currentIdx];

  const handleNext = () => {
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(s => s + 1);
    }
    
    studyLogger.logSessionInteraction(sessionId, lesson.title, {
      type: 'quiz',
      data: {
        question: currentQuestion.question,
        selected: currentQuestion.options[selectedOption!],
        correct: currentQuestion.options[currentQuestion.correctAnswer],
        isCorrect
      }
    });

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const finalScore = (score / questions.length) * 100;
    return (
      <div className="text-center p-8 bg-white rounded-3xl border border-primary/10 shadow-sm">
        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
          finalScore === 100 ? 'bg-green-100 text-green-600' : 'bg-accent/10 text-accent'
        }`}>
          {finalScore === 100 ? <ShieldCheck className="h-10 w-10" /> : <AlertCircle className="h-10 w-10" />}
        </div>
        <h2 className="text-3xl font-serif font-bold text-primary mb-2">
          {finalScore === 100 ? 'Mastery Achieved!' : 'Keep Studying'}
        </h2>
        <p className="text-primary/60 mb-2">
          You scored {score} out of {questions.length} correct.
        </p>
        <p className="text-accent font-medium italic mb-8 text-sm px-4">
          "{getEncouragingRemark(finalScore)}"
        </p>
        <button 
          onClick={() => onComplete(finalScore)}
          className="px-8 py-3 bg-primary text-secondary rounded-xl font-bold hover:bg-primary-light transition-colors"
        >
          {finalScore === 100 
            ? (isLastLesson ? 'Complete Study' : 'Continue to Next Lesson') 
            : 'Review and Retry'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-primary/10 shadow-sm p-8">
      <div className="flex items-center justify-between mb-8">
        <span className="text-[10px] uppercase tracking-widest font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
          Question {currentIdx + 1} of {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div key={i} className={`w-8 h-1 rounded-full ${i <= currentIdx ? 'bg-accent' : 'bg-primary/10'}`} />
          ))}
        </div>
      </div>

      <h3 className="text-xl font-serif font-bold text-primary mb-8 leading-tight">
        {currentQuestion.question}
      </h3>

      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, i) => (
          <button
            key={i}
            onClick={() => !showFeedback && setSelectedOption(i)}
            disabled={showFeedback}
            className={`w-full p-4 rounded-xl text-left text-sm transition-all border ${
              selectedOption === i 
                ? 'border-accent bg-accent/5 text-accent font-medium' 
                : 'border-primary/10 hover:border-accent/30 text-primary/70'
            } ${showFeedback && i === currentQuestion.correctAnswer ? 'border-green-500 bg-green-50 text-green-700' : ''}
              ${showFeedback && selectedOption === i && i !== currentQuestion.correctAnswer ? 'border-red-500 bg-red-50 text-red-700' : ''}
            `}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {showFeedback && i === currentQuestion.correctAnswer && <CheckCircle2 className="h-4 w-4" />}
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl mb-8 text-sm ${
              selectedOption === currentQuestion.correctAnswer ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
          >
            <div className="flex gap-3">
              <Info className="h-5 w-5 flex-shrink-0" />
              <p>{currentQuestion.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showFeedback ? (
        <button 
          onClick={() => setShowFeedback(true)}
          disabled={selectedOption === null}
          className="w-full py-4 bg-primary text-secondary rounded-xl font-bold hover:bg-primary-light transition-colors disabled:opacity-50"
        >
          Check Answer
        </button>
      ) : (
        <button 
          onClick={handleNext}
          className="w-full py-4 bg-accent text-white rounded-xl font-bold hover:bg-accent/90 transition-colors"
        >
          {currentIdx < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>
      )}
    </div>
  );
};

// --- Main Page ---

export default function LawGraceStudy() {
  const { user, setAuthError } = useAuth();
  const navigate = useNavigate();
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [sessionId, setSessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  const [isLeaderMode, setIsLeaderMode] = useState(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const handleSignIn = () => {
    setIsAuthModalOpen(true);
  };
  const [studyMode, setStudyMode] = useState<'solo' | 'group'>('solo');
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isMastered, setIsMastered] = useState(false);
  const [isStudyComplete, setIsStudyComplete] = useState(false);
  const [dismissedAuthPrompt, setDismissedAuthPrompt] = useState(false);

  const hasBuilderAccess = user?.email === ALLOWED_BUILDER_EMAIL;

  const visibleStudyData = lawGraceStudyData.map(module => ({
    ...module,
    lessons: module.lessons.filter(lesson => 
      hasBuilderAccess || !RESTRICTED_AUTHORS.includes(lesson.sourceText.author)
    )
  })).filter(module => module.lessons.length > 0);

  const currentModule = visibleStudyData[currentModuleIdx];
  const currentLesson = currentModule?.lessons[currentLessonIdx];

  useLayoutEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };
    scrollToTop();
    const timer = setTimeout(scrollToTop, 10);
    return () => clearTimeout(timer);
  }, [currentModuleIdx, currentLessonIdx, showQuiz, isStudyComplete]);

  const nextLesson = () => {
    setSessionId(`session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
    
    if (currentLessonIdx < currentModule.lessons.length - 1) {
      setCurrentLessonIdx(currentLessonIdx + 1);
      setIsMastered(false);
      setShowQuiz(false);
    } else if (currentModuleIdx < visibleStudyData.length - 1) {
      setCurrentModuleIdx(currentModuleIdx + 1);
      setCurrentLessonIdx(0);
      setIsMastered(false);
      setShowQuiz(false);
    } else {
      setIsStudyComplete(true);
    }
  };

  const handleQuizComplete = (score: number) => {
    setShowQuiz(false);
    if (score === 100) {
      setIsMastered(true);
      if (!completedModules.includes(currentModule.id)) {
        setCompletedModules(prev => [...prev, currentModule.id]);
      }
      nextLesson();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  if (isStudyComplete) {
    return (
      <div className="min-h-screen bg-secondary-light flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-primary/5"
        >
          <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Trophy className="h-12 w-12 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Study Complete!</h1>
          <p className="text-xl text-primary/60 mb-12 leading-relaxed">
            You have successfully completed the study on <span className="text-accent font-bold">Law and Grace</span>. 
            Understanding these distinctions is foundational to rightly dividing the word of truth.
          </p>
          
          <Link to="/baptism-study" className="block bg-secondary-light/50 p-8 rounded-3xl mb-12 text-left hover:bg-secondary-light transition-colors group">
            <h3 className="text-sm font-bold text-primary/40 uppercase tracking-widest mb-4">Suggested Next Lesson</h3>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-serif font-bold text-primary group-hover:text-accent transition-colors">The Biblical View of Water Baptism</h4>
                <p className="text-sm text-primary/60">Explore the meaning of baptism as identification in the Body of Christ.</p>
              </div>
              <div className="p-3 bg-primary text-secondary rounded-full group-hover:bg-accent transition-colors">
                <ChevronRight className="h-6 w-6" />
              </div>
            </div>
          </Link>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/studies')}
              className="px-10 py-4 bg-primary text-secondary rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-light transition-all"
            >
              <Home className="h-5 w-5" />
              Back to Bible Studies
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-light">
      {/* Header */}
      <div className="bg-white border-b border-primary/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-accent mb-2">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold">Scripture-First Study</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary tracking-tight">
              Law and Grace
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-secondary-light p-1 rounded-xl border border-primary/10">
              <button 
                onClick={() => setStudyMode('solo')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  studyMode === 'solo' ? 'bg-white shadow-sm text-accent' : 'text-primary/40 hover:text-primary/60'
                }`}
              >
                <User className="h-4 w-4" />
                Solo
              </button>
              <button 
                onClick={() => setStudyMode('group')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  studyMode === 'group' ? 'bg-white shadow-sm text-accent' : 'text-primary/40 hover:text-primary/60'
                }`}
              >
                <Users className="h-4 w-4" />
                Group
              </button>
            </div>
            
            <button 
              onClick={() => setIsLeaderMode(!isLeaderMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                isLeaderMode 
                  ? 'bg-accent/10 border-accent text-accent' 
                  : 'bg-white border-primary/10 text-primary/40 hover:border-accent/30'
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              Leader Mode
            </button>

            <button 
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-primary/10 bg-white text-primary/40 hover:text-accent hover:border-accent/30 transition-all"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="h-4 w-4" />
              Fullscreen
            </button>

            <button 
              onClick={() => navigate('/studies')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-primary/10 bg-white text-primary/40 hover:text-red-500 hover:border-red-200 transition-all"
              title="Exit Study"
            >
              <X className="h-4 w-4" />
              Exit
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-primary/40 mb-6">Study Modules</h3>
              <div className="space-y-2">
                {visibleStudyData.map((mod, idx) => (
                  <div 
                    key={mod.id}
                    className={`relative p-4 rounded-2xl border transition-all ${
                      idx === currentModuleIdx 
                        ? 'bg-white border-accent shadow-sm' 
                        : completedModules.includes(mod.id)
                          ? 'bg-green-50/50 border-green-100 opacity-80'
                          : 'bg-transparent border-transparent opacity-40 grayscale pointer-events-none'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        idx === currentModuleIdx ? 'bg-accent text-white' : 'bg-primary/10 text-primary/40'
                      }`}>
                        {completedModules.includes(mod.id) ? <CheckCircle2 className="h-3 w-3" /> : idx + 1}
                      </div>
                      <span className={`text-sm font-serif font-bold ${idx === currentModuleIdx ? 'text-primary' : 'text-primary/60'}`}>
                        {mod.title}
                      </span>
                    </div>
                    {idx === currentModuleIdx && (
                      <motion.div 
                        layoutId="active-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r-full"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-primary rounded-3xl text-secondary shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <Lightbulb className="h-8 w-8 text-accent mb-4" />
                <h4 className="font-serif font-bold mb-2">Study Tip</h4>
                <p className="text-xs text-secondary/70 leading-relaxed font-light">
                  The Law was a schoolmaster. Grace is the teacher. Understanding the transition is key to your spiritual freedom.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-6">
            <ProgressBar current={currentModuleIdx + 1} total={visibleStudyData.length} />
            
            <AnimatePresence mode="wait">
              {!showQuiz ? (
                <motion.div
                  key={`lesson-${currentModuleIdx}-${currentLessonIdx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  {/* Lesson Header */}
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-accent mb-2 block">
                      Module {currentModuleIdx + 1} • Lesson {currentLessonIdx + 1}
                    </span>
                    <h2 className="text-4xl font-serif font-bold text-primary mb-4 tracking-tight">
                      {currentLesson.title}
                    </h2>
                    <p className="text-lg text-primary/60 font-light leading-relaxed">
                      {currentModule.description}
                    </p>
                  </div>

                  {/* Scripture Section */}
                  <div className="space-y-6">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-primary/40 uppercase tracking-widest">
                      <BookOpen className="h-4 w-4" />
                      Scripture Focus
                    </h3>
                    <div className="space-y-4">
                      {currentLesson.scripture.map((s, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm relative group">
                          <div className="absolute top-0 left-0 w-1 h-full bg-accent/20 group-hover:bg-accent transition-colors rounded-l-3xl" />
                          <span className="text-xs font-mono font-bold text-accent mb-3 block">{s.reference}</span>
                          <p className="text-xl font-serif italic text-primary leading-relaxed">
                            "{s.text}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Source Text Section */}
                  <div className="space-y-6">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-primary/40 uppercase tracking-widest">
                      <Info className="h-4 w-4" />
                      Source Insight
                    </h3>
                    <div className="bg-secondary-light/50 p-8 rounded-3xl border border-primary/10 italic relative group">
                      <p className="text-primary/70 leading-relaxed mb-4 font-light">
                        "{currentLesson.sourceText.excerpt}"
                      </p>
                      <div className="flex items-center justify-between">
                        <SpeakButton text={currentLesson.sourceText.excerpt} size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-center gap-2 text-xs font-bold text-primary/40">
                          <span>— {currentLesson.sourceText.author},</span>
                          <span className="italic">{currentLesson.sourceText.book}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comprehensive Summary Section */}
                  <div className="space-y-6">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-primary/40 uppercase tracking-widest">
                      <FileText className="h-4 w-4" />
                      Comprehensive Summary
                    </h3>
                    <div className="bg-white p-10 rounded-[2.5rem] border border-primary/5 shadow-xl shadow-primary/5 relative group">
                      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <SpeakButton text={currentLesson.summary} size="md" />
                      </div>
                      <div className="prose prose-lg max-w-none">
                        {currentLesson.summary.split('\n\n').map((paragraph, idx) => (
                          <p key={idx} className="text-primary/80 leading-relaxed mb-6 font-light">
                            <ScriptureText text={paragraph} />
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Key Ideas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentLesson.keyIdeas.map((idea, i) => (
                      <div key={i} className="flex gap-3 p-4 bg-white rounded-2xl border border-primary/5 shadow-sm">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                        <p className="text-sm text-primary/70 leading-snug">{idea}</p>
                      </div>
                    ))}
                  </div>

                  {/* Reflection */}
                  <div className="p-8 bg-accent/5 rounded-3xl border border-accent/10">
                    <h4 className="text-accent font-bold mb-3 flex items-center gap-2">
                      <RotateCcw className="h-5 w-5" />
                      Reflection
                    </h4>
                    <p className="text-primary/80 leading-relaxed italic">
                      {currentLesson.reflectionPrompt}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-8 border-t border-primary/10">
                    <button 
                      onClick={() => {}} 
                      disabled={currentModuleIdx === 0 && currentLessonIdx === 0}
                      className="flex items-center gap-2 text-primary/40 hover:text-accent transition-colors disabled:opacity-0"
                    >
                      <ChevronLeft className="h-5 w-5" />
                      Previous
                    </button>
                    
                    {!isMastered ? (
                      <button 
                        onClick={() => setShowQuiz(true)}
                        className="px-10 py-4 bg-accent text-white rounded-2xl font-bold shadow-lg shadow-accent/20 hover:bg-accent/90 transition-all flex items-center gap-2"
                      >
                        Take Mastery Quiz
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    ) : (
                      <button 
                        onClick={nextLesson}
                        className="px-10 py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all flex items-center gap-2"
                      >
                        {currentModuleIdx === visibleStudyData.length - 1 && currentLessonIdx === currentModule.lessons.length - 1 
                          ? 'Complete Study' 
                          : 'Next Lesson'}
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="quiz-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Quiz 
                    lesson={currentLesson}
                    questions={currentLesson.questions} 
                    onComplete={handleQuizComplete}
                    sessionId={sessionId}
                    isLastLesson={currentModuleIdx === visibleStudyData.length - 1 && currentLessonIdx === currentModule.lessons.length - 1}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* AI Guide Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-8">
              <AIGuide lesson={currentLesson} isLeaderMode={isLeaderMode} sessionId={sessionId} />
            </div>
          </div>

        </div>
      </div>
      <DebugPanel />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}
