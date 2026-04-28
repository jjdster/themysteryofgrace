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
  Volume2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { getGeminiApiKey } from '../lib/api';
import { studyLogger } from '../lib/logger';
import ScriptureText from '../components/ScriptureText';
import { baptismStudyData } from '../data/baptismStudyData';
import { prophecyMysteryData } from '../data/prophecyMysteryData';
import { sevenOnesData } from '../data/sevenOnesData';
import { dualMinistryData } from '../data/dualMinistryData';
import { CUSTOM_STUDY_MATERIALS } from '../data/customStudyMaterials';
import { DebugPanel } from '../components/DebugPanel';
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

const RESTRICTED_AUTHORS = ['Charles F. Baker', 'Harry Bultema', 'Cornelius R. Stam', 'C.R. Stam'];
const ALLOWED_BUILDER_EMAIL = 'jjdster@gmail.com';

const faqs = [
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
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

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
  const [fullScreenMessage, setFullScreenMessage] = useState<string | null>(null);
  const [sessionId] = useState(() => `study_session_${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dialogueSectionRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserEmail(user?.email || null);
    });
    return () => unsubscribe();
  }, []);

  const hasBuilderAccess = currentUserEmail === ALLOWED_BUILDER_EMAIL;

  const customContext = CUSTOM_STUDY_MATERIALS.map(m => `TITLE: ${m.title}\nCONTENT: ${m.content}`).join('\n\n---\n\n');

  // Initialize Chat for Dialogue
  useEffect(() => {
    const initChat = async () => {
      const apiKey = getGeminiApiKey();
      if (!apiKey) return;

      const ai = new GoogleGenAI({ apiKey });
      chatRef.current = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are a scholarly guide specializing in 'Grace Library' and the Pauline revelation. CRITICAL: You MUST prioritize and defer to the Scriptures (King James Bible and New International Version) as your original and primary sources. Your goal is to help the user understand the preaching of Jesus Christ according to the revelation of the mystery (Romans 16:25), applying 'rightly dividing the Word of Truth' (2 Timothy 2:15). 
          Specifically, recognize the distinction between God's earthly program (Terrestrial) and His heavenly program for the Body of Christ (Mystery/Celestial). Understand that while current terrestrial bodies are corruptible, resurrected terrestrial bodies (for the earthly kingdom) are incorruptible yet remain terrestrial. Distinguish these from celestial bodies, which are 'from heaven' (2 Cor 5:2) and a present possession (2 Cor 5:1). Clarify that to 'rise' (1 Thess 4:16) refers to the resurrection—standing erect being clothed with this body from heaven. Recognize that the entire event occurs in an 'atomos' (1 Cor 15:52)—an indivisible moment—meaning that while there is a logical order, no earthly time is consumed in the transition. 
          
          ADDITIONAL RESOURCES: You also have access to the following custom study materials which you should research and refer to when relevant:
          ${customContext}
          
          FORMATTING: When enumerating points or aspects of your response, you MUST start a new paragraph for each point to ensure clarity. Be respectful, insightful, and deep in doctrine.`,
        },
      });
    };
    initChat();
  }, [customContext]);

  useEffect(() => {
    if (activeTab === 'dialogue' && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      // If the AI just started responding or a new message was added
      // Scroll the window to the top of the dialogue section
      dialogueSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Also scroll the internal chat container to the top as requested
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [messages, activeTab]);

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
        const systemInstruction = `You are a theological research assistant. CRITICAL: You MUST prioritize and defer to the Scriptures (King James Bible and New International Version) as your original and primary sources, always applying the principle of 'rightly dividing the Word of Truth' (2 Timothy 2:15). 
        Recognize the distinction between God's earthly program (Terrestrial) and His heavenly program for the Body of Christ (Celestial). 
        Understand that while current terrestrial bodies are corruptible, resurrected terrestrial bodies are incorruptible. Distinguish these from the celestial body which is a present possession in the heavens (2 Cor 5:1).
        Recognize that 'rising' in resurrection refers to standing erect in that new body, and that the entire event (resurrection and catching away) occurs in an 'atomos' (1 Cor 15:52)—an indivisible moment—consuming no earthly time.
        
        ADDITIONAL RESOURCES: You also have access to the following custom study materials which you should research and refer to when relevant:
        ${customContext}
        
        FORMATTING: When enumerating points or aspects of your response, you MUST start a new paragraph for each point to ensure clarity.
        LIBRARY CONTEXT: Books by ${hasBuilderAccess ? 'Charles F. Baker, Harry Bultema, Cornelius R. Stam, ' : ''}Donald G. Campbell, Joel Fink, and Roland Wilson. 
        TASK: Based on the user's query, identify which books or lessons are most relevant. Be concise. Use Scripture references.`;
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
    if (!dialogueInput.trim() || isDialogueLoading || !chatRef.current) return;

    const userMessage = dialogueInput.trim();
    setDialogueInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsDialogueLoading(true);
    setDialogueError(null);

    try {
      const result = await chatRef.current.sendMessageStream({ message: userMessage });
      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of result) {
        fullText += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', text: fullText };
          return newMessages;
        });
      }

      setFullScreenMessage(fullText);

      studyLogger.logSessionInteraction(sessionId, "Study Center Dialogue", {
        type: 'chat',
        data: { userMessage, aiResponse: fullText }
      });
    } catch (err) {
      console.error("Dialogue error:", err);
      setDialogueError("Failed to send message. Please try again.");
    } finally {
      setIsDialogueLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-secondary min-h-screen pb-20"
    >
      <header className="bg-primary py-24 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-serif text-secondary mb-4"
        >
          Study Center
        </motion.h1>
        <p className="text-accent-light tracking-[0.2em] uppercase text-sm font-medium">
          Search • Dialogue • Understanding
        </p>
      </header>

      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'search', label: 'Search Library', icon: SearchIcon },
            { id: 'dialogue', label: 'Scholarly Dialogue', icon: MessageSquare },
            { id: 'faq', label: 'Common Questions', icon: HelpCircle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all shadow-md ${
                activeTab === tab.id 
                  ? 'bg-accent text-white scale-105' 
                  : 'bg-white text-primary/60 hover:bg-secondary-light'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'search' && (
            <motion.div
              key="search-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSearch} className="relative">
                  <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-primary/30" />
                  <input
                    type="text"
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-28 md:pl-16 md:pr-32 py-4 md:py-6 bg-white rounded-2xl md:rounded-3xl border border-primary/10 shadow-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-lg md:text-xl text-primary"
                  />
                  <button
                    type="submit"
                    disabled={isSearching || !searchQuery.trim()}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 px-4 md:px-6 py-2 md:py-3 bg-primary text-secondary rounded-xl md:rounded-2xl font-bold hover:bg-primary-light transition-colors disabled:opacity-50 text-sm md:text-base"
                  >
                    {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Search'}
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  {isSearchAiLoading ? (
                    <div className="bg-white p-8 rounded-3xl border border-accent/20 shadow-lg animate-pulse">
                      <div className="flex items-center space-x-3 mb-6">
                        <Sparkles className="h-6 w-6 text-accent" />
                        <div className="h-6 bg-secondary-light rounded w-48"></div>
                      </div>
                      <div className="space-y-4">
                        <div className="h-4 bg-secondary-light rounded w-3/4"></div>
                        <div className="h-4 bg-secondary-light rounded w-full"></div>
                      </div>
                    </div>
                  ) : searchAiResponse ? (
                    <div className="bg-white p-8 rounded-3xl border border-accent/20 shadow-lg relative overflow-hidden">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <Sparkles className="h-6 w-6 text-accent" />
                          <h2 className="text-xl font-serif font-bold text-primary">AI Library Insights</h2>
                        </div>
                        <SpeakButton text={searchAiResponse} size="md" />
                      </div>
                      <div className="prose prose-primary max-w-none text-primary/80 leading-relaxed whitespace-pre-wrap">
                        <ScriptureText text={searchAiResponse} />
                      </div>
                    </div>
                  ) : null}

                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-bold text-primary flex items-center">
                      <FileText className="mr-3 h-6 w-6 text-accent" />
                      Direct Matches
                    </h2>
                    {searchResults.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4">
                        {searchResults.map((result, idx) => (
                          <Link
                            key={idx}
                            to={result.link}
                            className="group bg-white p-6 rounded-2xl border border-primary/5 shadow-sm hover:shadow-md hover:border-accent/30 transition-all flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="p-3 bg-secondary-light rounded-xl text-primary/40 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                                {result.type === 'book' ? <Book className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                              </div>
                              <div>
                                <h3 className="font-bold text-primary group-hover:text-accent transition-colors">{result.title}</h3>
                                <p className="text-sm text-primary/50">{result.subtitle}</p>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-primary/20 group-hover:text-accent transition-all" />
                          </Link>
                        ))}
                      </div>
                    ) : searchQuery && !isSearching ? (
                      <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-primary/10">
                        <p className="text-primary/40">No direct matches found for "{searchQuery}"</p>
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white/50 rounded-3xl border border-dashed border-primary/10">
                        <p className="text-primary/40 italic">Enter a query above to search the library and studies.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-primary p-8 rounded-3xl text-secondary shadow-xl">
                    <h3 className="text-xl font-serif font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-3 text-sm">
                      <li><Link to="/library" className="text-secondary/70 hover:text-accent-light flex items-center"><ChevronRight className="h-4 w-4 mr-2" />Browse Library</Link></li>
                      <li><Link to="/baptism-study" className="text-secondary/70 hover:text-accent-light flex items-center"><ChevronRight className="h-4 w-4 mr-2" />Baptism Study</Link></li>
                      <li><Link to="/prophecy-mystery-study" className="text-secondary/70 hover:text-accent-light flex items-center"><ChevronRight className="h-4 w-4 mr-2" />Prophecy vs Mystery</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'dialogue' && (
            <motion.div
              key="dialogue-tab"
              ref={dialogueSectionRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-zinc-900/50 rounded-3xl border border-white/5 overflow-hidden flex flex-col h-[60vh] shadow-2xl">
                <div className="px-6 py-4 border-b border-white/5 bg-black/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-accent" />
                    <h2 className="text-secondary font-serif font-bold">Scholarly Dialogue</h2>
                  </div>
                </div>

                <div 
                  ref={chatContainerRef}
                  className="flex-grow overflow-y-auto p-6 space-y-6"
                >
                  {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center px-8">
                      <BookOpen className="h-12 w-12 text-secondary/10 mb-4" />
                      <h3 className="text-secondary/60 font-serif text-xl mb-2">Begin Your Study</h3>
                      <p className="text-secondary/30 text-sm max-w-xs">Ask a question about the Dispensation of Grace or the Pauline revelation.</p>
                    </div>
                  )}
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${msg.role === 'user' ? 'bg-accent/10 border-accent/20 text-accent' : 'bg-zinc-800 border-white/5 text-secondary/60'}`}>
                        {msg.role === 'user' ? <User className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                      </div>
                      <div 
                        onClick={() => msg.role === 'model' && setFullScreenMessage(msg.text)}
                        className={`max-w-[80%] p-4 rounded-2xl font-serif text-lg whitespace-pre-wrap cursor-pointer transition-all ${
                          msg.role === 'user' 
                            ? 'bg-accent text-white rounded-tr-none' 
                            : 'bg-white/5 text-secondary/80 rounded-tl-none italic hover:bg-white/10'
                        }`}
                      >
                        <ScriptureText 
                          text={msg.text} 
                          linkClassName={msg.role === 'user' ? 'text-white underline font-bold' : 'text-accent-light hover:text-white underline decoration-dotted transition-colors'}
                        />
                        {msg.role === 'model' && (
                          <div className="flex items-center justify-between mt-2">
                          <div className="text-[10px] text-secondary/20 flex items-center gap-1">
                            <Sparkles className="h-2 w-2" /> Click to expand full screen
                          </div>
                          <SpeakButton text={msg.text} size="sm" className="bg-white/5 rounded-lg p-1" />
                        </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-6 bg-black/20 border-t border-white/5">
                  <form onSubmit={handleDialogueSend} className="relative">
                    <input
                      type="text"
                      value={dialogueInput}
                      onChange={(e) => setDialogueInput(e.target.value)}
                      placeholder="Ask about the Revelation of the Mystery..."
                      className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-6 py-4 pr-16 text-secondary focus:outline-none focus:border-accent/50 transition-colors font-serif italic text-lg"
                    />
                    <button
                      type="submit"
                      disabled={isDialogueLoading || !dialogueInput.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-accent text-white rounded-xl hover:bg-accent-light transition-all disabled:opacity-50"
                    >
                      {isDialogueLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    </button>
                  </form>
                  {dialogueError && <p className="mt-2 text-red-400 text-xs text-center">{dialogueError}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'faq' && (
            <motion.div
              key="faq-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 shadow-lg border border-primary/5 hover:border-accent/30 transition-all">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-accent/10 rounded-2xl text-accent shrink-0">
                      <HelpCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-primary mb-4">{faq.question}</h3>
                      <div className="flex items-start space-x-3">
                        <MessageSquare className="h-5 w-5 text-primary/30 mt-1 shrink-0" />
                        <div className="space-y-4">
                          <p className="text-primary/70 leading-relaxed text-lg"><ScriptureText text={faq.answer} /></p>
                          {faq.videoUrl && (
                            <a href={faq.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-full text-sm font-medium hover:bg-accent-light transition-colors shadow-sm">
                              <PlayCircle className="mr-2 h-4 w-4" />View Video
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-12 p-8 bg-white rounded-3xl border border-dashed border-primary/20 text-center">
                <h3 className="text-xl font-serif text-primary mb-2">Still Seeking Answers?</h3>
                <p className="text-primary/60 mb-6">Use the Scholarly Dialogue tab for a personalized study session.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Full Screen Dialogue Modal */}
      <AnimatePresence>
        {fullScreenMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col p-6 md:p-12 overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto w-full">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-accent" />
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-secondary">Scholarly Insight</h2>
                </div>
                <div className="flex items-center gap-4">
                  <SpeakButton text={fullScreenMessage} size="lg" className="bg-white/10 rounded-full" />
                  <button 
                    onClick={() => setFullScreenMessage(null)}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                  >
                    <X className="h-8 w-8" />
                  </button>
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                <div className="text-xl md:text-2xl font-serif text-secondary/90 leading-relaxed whitespace-pre-wrap">
                  <ScriptureText text={fullScreenMessage} />
                </div>
              </div>
              <div className="mt-12 flex justify-center">
                <button 
                  onClick={() => setFullScreenMessage(null)}
                  className="px-8 py-4 bg-accent text-white rounded-2xl font-bold hover:bg-accent-light transition-all shadow-xl"
                >
                  Close Insight
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DebugPanel />
    </motion.div>
  );
}
