import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search as SearchIcon, 
  MessageSquare, 
  HelpCircle, 
  Book, 
  FileText, 
  ChevronRight, 
  Loader2, 
  Sparkles, 
  Send, 
  User, 
  BookOpen, 
  Info,
  PlayCircle,
  X,
  Volume2,
  History,
  Plus,
  ArrowRight,
  Shield,
  Lightbulb,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot, doc, addDoc, serverTimestamp, updateDoc, arrayUnion } from 'firebase/firestore';
import { getGeminiApiKey } from '../lib/api';
import { studyLogger } from '../lib/logger';
import ScriptureText from '../components/ScriptureText';
import { baptismStudyData } from '../data/baptismStudyData';
import { prophecyMysteryData } from '../data/prophecyMysteryData';
import { sevenOnesData } from '../data/sevenOnesData';
import { dualMinistryData } from '../data/dualMinistryData';
import { CUSTOM_STUDY_MATERIALS } from '../data/customStudyMaterials';
import { SpeakButton } from '../components/SpeakButton';

// Shared Data
const libraryBooks = [
  { id: 'b1', title: 'Real Baptism', author: 'Charles F. Baker' },
  { id: 'b2', title: 'Bible Truth', author: 'Charles F. Baker' },
  { id: 'b3', title: 'Understanding the Book of Acts', author: 'Charles F. Baker' },
  { id: 'b4', title: 'Understanding the Gospels', author: 'Charles F. Baker' },
  { id: 'b5', title: 'A Dispensational Theology', author: 'Charles F. Baker' },
  { id: 'b6', title: 'Dispensational Synopsis of the New Testament', author: 'Charles F. Baker' },
  { id: 'b7', title: 'Dispensational Relationships', author: 'Charles F. Baker' },
  { id: 'b8', title: 'Understanding Galatians and the Law', author: 'Charles F. Baker' },
  { id: 'b9', title: 'Understanding the Body of Christ', author: 'Charles F. Baker' },
  { id: 'b10', title: "God's Clock of the Ages", author: 'Charles F. Baker' },
  { id: 'bu1', title: 'Zechariah', author: 'Harry Bultema' },
  { id: 'bu2', title: 'Genesis', author: 'Harry Bultema' },
  { id: 'bu3', title: 'Grace and Truth', author: 'Harry Bultema' },
  { id: 'bu4', title: 'Romans', author: 'Harry Bultema' },
  { id: 'bu5', title: 'The Bible and Baptism', author: 'Harry Bultema' },
  { id: 'bu6', title: 'Names of Our Wonderful Lord', author: 'Harry Bultema' },
  { id: 'bu7', title: 'The Union of the Believer with Christ', author: 'Harry Bultema' },
  { id: 's1', title: 'Galatians', author: 'Cornelius R. Stam' },
  { id: 's2', title: 'Thessalonians', author: 'Cornelius R. Stam' },
  { id: 's3', title: 'True Spirituality', author: 'Cornelius R. Stam' },
  { id: 's4', title: 'Two-Fold Purpose of God', author: 'Cornelius R. Stam' },
  { id: 's5', title: 'Man: His Nature and Destiny', author: 'Cornelius R. Stam' },
  { id: 's6', title: "Author's Own Choice", author: 'Cornelius R. Stam' },
  { id: 's7', title: 'Second Corinthians', author: 'Cornelius R. Stam' },
  { id: 's8', title: 'Our Great Commission', author: 'Cornelius R. Stam' },
  { id: 's9', title: 'No Other Doctrine', author: 'Cornelius R. Stam' },
  { id: 's10', title: 'First Corinthians', author: 'Cornelius R. Stam' },
  { id: 's11', title: 'Romans', author: 'Cornelius R. Stam' },
  { id: 's12', title: 'Pastoral Epistles', author: 'Cornelius R. Stam' },
  { id: 's13', title: 'Things That Differ', author: 'Cornelius R. Stam' },
  { id: 's14', title: 'The Present Peril', author: 'Cornelius R. Stam' },
  { id: 's15', title: 'Moses and Paul', author: 'Cornelius R. Stam' },
  { id: 's16', title: 'Acts Volume 1', author: 'Cornelius R. Stam' },
  { id: 's17', title: 'Acts Volume 2', author: 'Cornelius R. Stam' },
  { id: 's18', title: 'Acts Volume 3', author: 'Cornelius R. Stam' },
  { id: 's19', title: 'Acts Volume 4', author: 'Cornelius R. Stam' },
  { id: 's20', title: 'The Controversy', author: 'Cornelius R. Stam' },
  { id: 's21', title: 'Satan in Derision', author: 'Cornelius R. Stam' },
  { id: 's22', title: 'Colossians', author: 'Cornelius R. Stam' },
  { id: 's23', title: 'Sermon on the Mount vs Grace of God', author: 'Cornelius R. Stam' },
  { id: 's24', title: 'His Apostleship and Message', author: 'Cornelius R. Stam' },
  { id: 's25', title: 'Hebrews: Who Wrote It and Why', author: 'Cornelius R. Stam' },
  { id: 's26', title: "The Lord's Supper", author: 'Cornelius R. Stam' },
  { id: 'c1', title: 'Dispensational View of the Bible', author: 'Donald G. Campbell' },
  { id: 'c2', title: 'Colossians and Philemon', author: 'Donald G. Campbell' },
  { id: 'c3', title: 'Ephesians', author: 'Donald G. Campbell' },
  { id: 'c4', title: 'Marriage and Separation', author: 'Donald G. Campbell' },
  { id: 'c5', title: 'Romans 1-8 Volume 1', author: 'Donald G. Campbell' },
  { id: 'c6', title: 'Romans 9-16 Volume 2', author: 'Donald G. Campbell' },
  { id: 'c7', title: 'Sovereignty of God', author: 'Donald G. Campbell' },
  { id: 'f1', title: 'The Mystery', author: 'Joel Fink' },
  { id: 'f2', title: 'Lordship Salvation', author: 'Joel Fink' },
  { id: 'f3', title: 'The Power of God Unto Salvation', author: 'Joel Fink' },
  { id: 'f4', title: 'Common Questions About the Grace Message', author: 'Joel Fink' },
  { id: 'w1', title: 'So Run That You May Win', author: 'Roland Wilson' },
  { id: 'w2', title: 'Thematic Preaching', author: 'Roland Wilson' },
];

const RESTRICTED_AUTHORS: string[] = [];
const ALLOWED_BUILDER_EMAIL = 'jjdster@gmail.com';

const faqsList = [
  {
    question: "What does it mean to 'rightly divide' the Word of Truth?",
    answer: "Rightly dividing the Word of Truth (2 Timothy 2:15) means recognizing the distinctions in God's dealings with mankind throughout history. Specifically, it involves distinguishing between God's program for the nation of Israel (Prophecy) and His current program for the Body of Christ (the Mystery revealed to Paul)."
  },
  {
    question: "Why is the Apostle Paul's ministry unique?",
    answer: "Paul was specifically chosen by the ascended Lord Jesus Christ to be the 'Apostle of the Gentiles' (Romans 11:13). To him was committed the 'Dispensation of the Grace of God' and the revelation of the 'Mystery' which had been kept secret since the world began."
  },
  {
    question: "Are we under the Law today?",
    answer: "No. Romans 6:14 explicitly states, 'for ye are not under the law, but under grace.' The Law was a schoolmaster to bring Israel to Christ, but now that faith has come, we are no longer under a schoolmaster (Galatians 3:24-25)."
  },
  {
    question: "In the Gospel of the Grace of God, what role does baptism have?",
    answer: "In the current Dispensation of Grace, there is 'one baptism' (Ephesians 4:5), which is the spiritual baptism by which the Holy Spirit places the believer into the Body of Christ (1 Corinthians 12:13). While water baptism was a requirement in God's program for Israel, Paul states that 'Christ sent me not to baptize, but to preach the gospel' (1 Corinthians 1:17), emphasizing that our salvation is by grace through faith alone, without ritual works.",
    videoUrl: "https://www.youtube.com/@markjjd"
  }
];

interface SearchResult {
  type: 'book' | 'lesson' | 'author';
  title: string;
  subtitle: string;
  content?: string;
  link: string;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function StudyCenter() {
  const [activeTab, setActiveTab] = useState<'search' | 'dialogue' | 'faq'>('search');
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchAiResponse, setSearchAiResponse] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchAiLoading, setIsSearchAiLoading] = useState(false);

  // Dialogue State
  const [messages, setMessages] = useState<Message[]>([]);
  const [dialogueInput, setDialogueInput] = useState('');
  const [isDialogueLoading, setIsDialogueLoading] = useState(false);
  const [dialogueError, setDialogueError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [fullScreenMessage, setFullScreenMessage] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState(() => `study_session_${Date.now()}`);
  const [dialogueThreads, setDialogueThreads] = useState<any[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [isThreadsLoading, setIsThreadsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const hasBuilderAccess = currentUser?.email === ALLOWED_BUILDER_EMAIL;

  const customContext = CUSTOM_STUDY_MATERIALS.map(m => `TITLE: ${m.title}\nCONTENT: ${m.content}`).join('\n\n---\n\n');

  const initChat = async (history: Message[] = []) => {
    if (chatRef.current) return true;
    if (isInitializing) return false;
    
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      setDialogueError("Gemini API key is missing. Please check your environment settings.");
      return false;
    }

    try {
      setIsInitializing(true);
      const ai = new GoogleGenAI({ apiKey });
      const geminiHistory = history.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      chatRef.current = ai.chats.create({
        model: "gemini-3-flash-preview",
        history: geminiHistory,
        config: {
          systemInstruction: `You are a scholarly guide specializing in 'Grace Library' and the Pauline revelation. CRITICAL: You MUST prioritize and defer to the Scriptures (King James Bible and New International Version) as your original and primary sources. Your goal is to help the user understand the preaching of Jesus Christ according to the revelation of the mystery (Romans 16:25), applying 'rightly dividing the Word of Truth' (2 Timothy 2:15). 
          
          FORMATTING: When enumerating points or aspects of your response, you MUST start a new paragraph for each point. Be respectful, insightful, and deep in doctrine.`,
        },
      });
      return true;
    } catch (err) {
      console.error("Chat Init Error:", err);
      setDialogueError("Failed to initialize study guide.");
      return false;
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    initChat(messages);
  }, [customContext]);

  // Fetch threads for logged in user
  useEffect(() => {
    if (!currentUser) {
      setDialogueThreads([]);
      setActiveThreadId(null);
      setMessages([]);
      return;
    }

    setIsThreadsLoading(true);
    const q = query(
      collection(db, 'dialogue_threads'),
      where('userId', '==', currentUser.uid),
      orderBy('lastMessageAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const threads = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDialogueThreads(threads);
      setIsThreadsLoading(false);
    }, (error) => {
      console.error("Fetch threads error:", error);
      setIsThreadsLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    if (!activeThreadId) return;
    const thread = dialogueThreads.find(t => t.id === activeThreadId);
    if (thread) {
      setMessages(thread.messages || []);
    }
  }, [activeThreadId, dialogueThreads]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchAiResponse(null);

    const localResults: SearchResult[] = [];
    const lowerQuery = searchQuery.toLowerCase();

    libraryBooks.forEach(book => {
      if (RESTRICTED_AUTHORS.includes(book.author) && !hasBuilderAccess) return;
      if (book.title.toLowerCase().includes(lowerQuery) || book.author.toLowerCase().includes(lowerQuery)) {
        localResults.push({ type: 'book', title: book.title, subtitle: book.author, link: '/library' });
      }
    });

    const allStudies = [...baptismStudyData, ...prophecyMysteryData, ...sevenOnesData, ...dualMinistryData];
    allStudies.forEach(module => {
      module.lessons.forEach(lesson => {
        if (lesson.title.toLowerCase().includes(lowerQuery) || lesson.summary.toLowerCase().includes(lowerQuery)) {
          let link = '/baptism-study';
          if (module.id.includes('prophecy')) link = '/prophecy-mystery-study';
          if (module.id.includes('seven-ones')) link = '/seven-ones-study';
          if (module.id.includes('dual')) link = '/dual-ministry-study';
          
          localResults.push({
            type: 'lesson',
            title: lesson.title,
            subtitle: `${module.title} • ${lesson.sourceText.author}`,
            content: lesson.summary.substring(0, 100) + '...',
            link
          });
        }
      });
    });

    setSearchResults(localResults);
    setIsSearching(false);

    setIsSearchAiLoading(true);
    try {
      const apiKey = getGeminiApiKey();
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const model = "gemini-3-flash-preview";
        const systemInstruction = `You are a theological research assistant specializing in the Dispensation of the Grace of God. Identify relevant resources from the Grace Library for the query.`;
        const response = await ai.models.generateContent({
          model,
          contents: `User Query: "${searchQuery}"`,
          config: { systemInstruction, temperature: 0.7 }
        });
        setSearchAiResponse(response.text);
      }
    } catch (err) {
      console.error("AI Search Error:", err);
    } finally {
      setIsSearchAiLoading(false);
    }
  };

  const handleDialogueSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!dialogueInput.trim() || isDialogueLoading) return;

    if (!chatRef.current) {
      const success = await initChat(messages);
      if (!success) return;
    }

    const userMessage = dialogueInput.trim();
    setDialogueInput('');
    const newUserMessage: Message = { role: 'user', text: userMessage };
    setMessages(prev => [...prev, newUserMessage]);
    setIsDialogueLoading(true);

    try {
      const result = await chatRef.current.sendMessageStream({ message: userMessage });
      let fullText = '';
      const newModelMessage: Message = { role: 'model', text: '' };
      setMessages(prev => [...prev, newModelMessage]);

      for await (const chunk of result) {
        if (chunk.text) {
          fullText += chunk.text;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { role: 'model', text: fullText };
            return newMessages;
          });
        }
      }
      
      if (!fullText) {
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { role: 'model', text: "I'm sorry, I couldn't generate an answer due to an unexpected block. Could you rephrase your question?" };
            return newMessages;
          });
      }

      setFullScreenMessage(fullText);

      if (currentUser) {
        if (!activeThreadId) {
          const newThread = {
            userId: currentUser.uid,
            userEmail: currentUser.email,
            title: userMessage.substring(0, 40) + (userMessage.length > 40 ? '...' : ''),
            createdAt: serverTimestamp(),
            lastMessageAt: serverTimestamp(),
            messages: [...messages, newUserMessage, { role: 'model', text: fullText }]
          };
          const docRef = await addDoc(collection(db, 'dialogue_threads'), newThread);
          setActiveThreadId(docRef.id);
        } else {
          const threadRef = doc(db, 'dialogue_threads', activeThreadId);
          await updateDoc(threadRef, {
            lastMessageAt: serverTimestamp(),
            messages: arrayUnion(newUserMessage, { role: 'model', text: fullText })
          });
        }
      }
    } catch (err) {
      console.error("Dialogue error:", err);
      setDialogueError("Failed to send message.");
    } finally {
      setIsDialogueLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-secondary-light min-h-screen pb-20"
    >
      <header className="relative bg-primary pt-32 pb-48 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[160px] translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">AI Study <span className="text-accent-light italic">Center</span></h1>
          <p className="text-secondary/50 text-xl font-serif italic tracking-wide max-w-2xl mx-auto">
            Interactive research, scholarly dialogue, and foundational understanding.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 -mt-24 relative z-20">
        {/* Tab Interface */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.15)] p-4 mb-12 border border-primary/5 flex flex-wrap justify-center gap-2">
          {[
            { id: 'search', label: 'Research Library', icon: SearchIcon },
            { id: 'dialogue', label: 'Scholarly Dialogue', icon: MessageSquare },
            { id: 'faq', label: 'Foundational FAQ', icon: HelpCircle }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-8 py-4 rounded-2xl text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' 
                  : 'text-primary/40 hover:bg-secondary'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-3" />
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSearch} className="relative group">
                  <SearchIcon className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-primary/20 group-focus-within:text-accent transition-colors" />
                  <input
                    type="text"
                    placeholder="Search the Dispensation of Grace..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-primary/5 shadow-2xl rounded-[2rem] px-20 py-8 text-xl text-primary focus:outline-none focus:border-accent/30 transition-all"
                  />
                  <button 
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-5 bg-primary text-white rounded-2xl hover:bg-primary-light shadow-xl transition-all"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-10">
                  {isSearchAiLoading ? (
                    <div className="paper-card p-12 bg-white/50 animate-pulse">
                      <div className="h-8 bg-primary/5 rounded w-1/3 mb-8"></div>
                      <div className="space-y-4">
                        <div className="h-4 bg-primary/5 rounded w-full"></div>
                        <div className="h-4 bg-primary/5 rounded w-5/6"></div>
                        <div className="h-4 bg-primary/5 rounded w-4/5"></div>
                      </div>
                    </div>
                  ) : searchAiResponse && (
                    <div className="paper-card p-12 overflow-hidden relative">
                      <div className="absolute top-0 right-0 p-8">
                        <Sparkles className="h-8 w-8 text-accent opacity-20" />
                      </div>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-accent/5 rounded-xl text-accent">
                          <Lightbulb className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-primary">Scholarly Overview</h2>
                      </div>
                      <div className="prose prose-primary max-w-none text-primary/70 leading-relaxed font-serif text-lg">
                        <ScriptureText text={searchAiResponse} />
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="flex items-center gap-4 px-4">
                      <div className="h-px flex-1 bg-primary/10"></div>
                      <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary/30">Direct Library Matches</span>
                      <div className="h-px flex-1 bg-primary/10"></div>
                    </div>
                    
                    {searchResults.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4">
                        {searchResults.map((res, i) => (
                          <Link
                            key={i}
                            to={res.link}
                            className="paper-card p-6 flex items-center justify-between group hover:border-accent/30"
                          >
                            <div className="flex items-center gap-6">
                              <div className="p-4 bg-secondary group-hover:bg-accent/5 rounded-xl text-primary/20 group-hover:text-accent transition-all">
                                {res.type === 'book' ? <Book className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                              </div>
                              <div>
                                <h4 className="font-bold text-primary group-hover:text-accent transition-colors">{res.title}</h4>
                                <span className="text-[10px] font-bold tracking-widest uppercase text-primary/30">{res.subtitle}</span>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-primary/10 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>
                    ) : searchQuery && !isSearching && (
                      <div className="text-center py-20 bg-secondary rounded-[2rem] border border-dashed border-primary/10">
                        <p className="text-primary/40 font-serif italic text-lg">No direct matches found in our indices.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-primary p-10 rounded-[2.5rem] text-secondary shadow-2xl relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 p-8 opacity-10">
                      <BookOpen className="h-32 w-32" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-8 text-accent-light">Study Tools</h3>
                    <div className="space-y-6">
                      <Link to="/library" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <span className="text-sm font-bold tracking-wide uppercase">Full Library</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link to="/baptism-study" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <span className="text-sm font-bold tracking-wide uppercase">Baptism Core</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link to="/videos" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <span className="text-sm font-bold tracking-wide uppercase">Video Archive</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'dialogue' && (
            <motion.div
              key="dialogue"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[80vh]"
            >
              {/* Dialogue History Sidebar */}
              <div className="lg:col-span-1 hidden lg:flex flex-col gap-4 h-full">
                <button
                  onClick={() => { setActiveThreadId(null); setMessages([]); }}
                  className="w-full bg-accent text-white p-6 rounded-[1.5rem] font-bold tracking-widest uppercase text-xs shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <Plus className="h-4 w-4" /> New Study Session
                </button>
                <div className="flex-1 bg-white rounded-[2rem] border border-primary/5 shadow-xl p-6 overflow-hidden flex flex-col">
                  <div className="flex items-center gap-2 mb-6 px-2">
                    <History className="h-4 w-4 text-accent" />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary/40">History</span>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {dialogueThreads.map(thread => (
                      <button
                        key={thread.id}
                        onClick={() => setActiveThreadId(thread.id)}
                        className={`w-full text-left p-4 rounded-xl transition-all ${
                          activeThreadId === thread.id 
                            ? 'bg-primary text-white' 
                            : 'hover:bg-secondary text-primary/60'
                        }`}
                      >
                        <p className="text-xs font-bold truncate mb-1">{thread.title}</p>
                        <p className={`text-[8px] font-mono tracking-widest ${activeThreadId === thread.id ? 'opacity-50' : 'text-primary/20'}`}>
                          {new Date(thread.lastMessageAt?.seconds * 1000).toLocaleDateString()}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-3 flex flex-col bg-white rounded-[2.5rem] shadow-2xl border border-primary/5 overflow-hidden h-full relative">
                <div className="px-10 py-6 border-b border-primary/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                    <h3 className="font-serif font-bold text-primary italic">Counselor Mode</h3>
                  </div>
                  {isDialogueLoading && <Loader2 className="h-4 w-4 text-accent animate-spin" />}
                </div>

                <div 
                  className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar"
                >
                  {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center px-12">
                      <div className="ornament mb-8 text-primary/20"></div>
                      <h4 className="text-3xl font-serif text-primary/20 italic mb-4">Awaiting Inquiry</h4>
                      <p className="text-primary/30 text-sm font-serif max-w-sm">"Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you."</p>
                    </div>
                  )}
                  {messages.map((msg, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] group relative ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block px-8 py-6 rounded-[2rem] text-lg font-serif leading-relaxed ${
                          msg.role === 'user' 
                            ? 'bg-primary text-white rounded-tr-none' 
                            : 'bg-secondary text-primary/80 rounded-tl-none italic'
                        }`}>
                          <ScriptureText text={msg.text} />
                        </div>
                        <div className={`flex items-center gap-4 mt-2 px-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                          <span className="text-[10px] font-bold tracking-widest uppercase opacity-20">{msg.role === 'user' ? 'Student' : 'Counselor'}</span>
                          {msg.role === 'model' && <SpeakButton text={msg.text} size="sm" />}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={chatContainerRef} />
                </div>

                <div className="p-8 bg-secondary/30 border-t border-primary/5">
                  <form onSubmit={handleDialogueSend} className="relative">
                    <input
                      type="text"
                      value={dialogueInput}
                      onChange={(e) => setDialogueInput(e.target.value)}
                      placeholder="Ex: 'What is the revelation of the mystery?'"
                      className="w-full bg-white border border-primary/10 rounded-[1.5rem] px-8 py-6 pr-20 text-primary shadow-inner focus:outline-none focus:border-accent/30 transition-all font-serif italic text-lg"
                    />
                    <button
                      type="submit"
                      disabled={!dialogueInput.trim() || isDialogueLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-4 text-accent hover:bg-accent/5 rounded-xl disabled:opacity-20"
                    >
                      <ArrowRight className="h-8 w-8" />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'faq' && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              {faqsList.map((faq, i) => (
                <div key={i} className="paper-card p-12 hover:shadow-2xl transition-all group">
                  <div className="flex gap-8">
                    <div className="shrink-0">
                      <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-accent group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <HelpCircle className="h-7 w-7" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-serif font-bold text-primary mb-6 leading-tight">{faq.question}</h3>
                      <div className="relative p-8 bg-secondary/30 rounded-[1.5rem] border border-primary/5 italic font-serif text-lg text-primary/70 leading-relaxed overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                          <BookOpen className="h-24 w-24" />
                        </div>
                        <ScriptureText text={faq.answer} />
                        {faq.videoUrl && (
                          <div className="mt-8">
                            <a href={faq.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-3 bg-white text-primary text-[10px] font-bold tracking-[0.2em] uppercase rounded-full shadow-lg hover:text-accent transition-colors">
                              <PlayCircle className="h-4 w-4" /> Watch Lesson
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full Screen View Modal */}
      <AnimatePresence>
        {fullScreenMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary flex items-center justify-center p-6 md:p-24"
          >
            <div className="max-w-4xl w-full h-full flex flex-col">
              <div className="flex justify-between items-center mb-16 border-b border-white/10 pb-8">
                <span className="text-accent-light text-xs font-bold tracking-[0.4em] uppercase">Deep Study Mode</span>
                <button 
                  onClick={() => setFullScreenMessage(null)}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-8 text-center md:text-left">
                <div className="prose prose-invert max-w-none font-serif text-2xl md:text-4xl text-secondary/90 italic leading-[1.6]">
                  <ScriptureText text={fullScreenMessage} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
