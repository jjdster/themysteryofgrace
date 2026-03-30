import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Book, FileText, User, ChevronRight, Loader2, Sparkles, X, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { baptismStudyData } from '../data/baptismStudyData';
import { prophecyMysteryData } from '../data/prophecyMysteryData';
import ScriptureText from '../components/ScriptureText';

// Book list from Library.tsx (should ideally be in a shared data file)
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

interface SearchResult {
  type: 'book' | 'lesson' | 'author';
  title: string;
  subtitle: string;
  content?: string;
  link: string;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setError(null);
    setAiResponse(null);

    // 1. Local Search (Metadata & Study Data)
    const localResults: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search Library
    libraryBooks.forEach(book => {
      if (book.title.toLowerCase().includes(lowerQuery) || book.author.toLowerCase().includes(lowerQuery)) {
        localResults.push({
          type: 'book',
          title: book.title,
          subtitle: book.author,
          link: '/library'
        });
      }
    });

    // Search Study Data
    const allStudies = [...baptismStudyData, ...prophecyMysteryData];
    allStudies.forEach(module => {
      module.lessons.forEach(lesson => {
        const inTitle = lesson.title.toLowerCase().includes(lowerQuery);
        const inSummary = lesson.summary.toLowerCase().includes(lowerQuery);
        const inExcerpt = lesson.sourceText.excerpt.toLowerCase().includes(lowerQuery);
        
        if (inTitle || inSummary || inExcerpt) {
          localResults.push({
            type: 'lesson',
            title: lesson.title,
            subtitle: `${module.title} • ${lesson.sourceText.author}`,
            content: inSummary ? lesson.summary.substring(0, 150) + '...' : lesson.sourceText.excerpt.substring(0, 150) + '...',
            link: module.id === 'meaning' || module.id === 'israel' || module.id === 'body' || module.id === 'practical' ? '/baptism-study' : '/prophecy-mystery-study'
          });
        }
      });
    });

    setResults(localResults);
    setIsSearching(false);

    // 2. AI Search (Contextual)
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-3-flash-preview";
      
      const systemInstruction = `You are a theological research assistant for "The Mystery of Grace" website. 
      Your goal is to help users find information within the Grace Library and Bible Studies.
      
      LIBRARY CONTEXT:
      The library contains books by Charles F. Baker, Harry Bultema, Cornelius R. Stam, Donald G. Campbell, Joel Fink, and Roland Wilson.
      Key themes: Dispensationalism, Right Division, The Mystery, Pauline Revelation, Grace.
      
      STUDY DATA CONTEXT:
      We have detailed studies on Baptism (Identification) and Prophecy vs Mystery.
      
      TASK:
      Based on the user's query, identify which books or lessons are most relevant. 
      If the query is about a specific topic (e.g., "water baptism", "the mystery", "acts"), explain what our resources say about it.
      Be concise but informative. Use Scripture references where appropriate.
      If you don't have specific content from a book, mention the book title and author as a resource to check.`;

      const response = await ai.models.generateContent({
        model,
        contents: `User Query: "${query}"`,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      setAiResponse(response.text);
    } catch (err: any) {
      console.error("AI Search Error:", err);
      // Don't set error state for AI failure, just log it
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-secondary-light py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">Search the Library</h1>
          <p className="text-primary/60 font-light">Search across books, authors, and detailed Bible studies.</p>
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-primary/30" />
            <input
              type="text"
              placeholder="Search for topics, books, or authors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-16 pr-24 py-6 bg-white rounded-3xl border border-primary/10 shadow-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-xl text-primary"
            />
            <button
              type="submit"
              disabled={isSearching || !query.trim()}
              className="absolute right-4 top-1/2 -translate-y-1/2 px-6 py-3 bg-primary text-secondary rounded-2xl font-bold hover:bg-primary-light transition-colors disabled:opacity-50"
            >
              {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Search'}
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-primary/40 uppercase tracking-widest">
            Powered by AI to search book content and study summaries
          </p>
        </form>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* AI Insights Section */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="wait">
              {isAiLoading ? (
                <motion.div
                  key="ai-loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-8 rounded-3xl border border-accent/20 shadow-lg"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <Sparkles className="h-6 w-6 text-accent animate-pulse" />
                    <h2 className="text-xl font-serif font-bold text-primary">AI Researching...</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-secondary-light rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-secondary-light rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-secondary-light rounded w-5/6 animate-pulse"></div>
                  </div>
                </motion.div>
              ) : aiResponse ? (
                <motion.div
                  key="ai-response"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-8 rounded-3xl border border-accent/20 shadow-lg relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Sparkles className="h-24 w-24 text-accent" />
                  </div>
                  <div className="flex items-center space-x-3 mb-6">
                    <Sparkles className="h-6 w-6 text-accent" />
                    <h2 className="text-xl font-serif font-bold text-primary">AI Library Insights</h2>
                  </div>
                  <div className="prose prose-primary max-w-none text-primary/80 leading-relaxed">
                    <ScriptureText text={aiResponse} />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Direct Matches */}
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-primary flex items-center">
                <FileText className="mr-3 h-6 w-6 text-accent" />
                Direct Matches
              </h2>
              
              {results.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {results.map((result, idx) => (
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
                          {result.content && (
                            <p className="text-xs text-primary/40 mt-2 line-clamp-1 italic">{result.content}</p>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-primary/20 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              ) : query && !isSearching ? (
                <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-primary/10">
                  <p className="text-primary/40">No direct matches found for "{query}"</p>
                </div>
              ) : null}
            </div>
          </div>

          {/* Sidebar / Quick Links */}
          <div className="space-y-8">
            <div className="bg-primary p-8 rounded-3xl text-secondary shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Book className="h-16 w-16" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">Library Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/library" className="text-secondary/70 hover:text-accent-light transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Browse All Books
                  </Link>
                </li>
                <li>
                  <Link to="/studies" className="text-secondary/70 hover:text-accent-light transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Bible Studies
                  </Link>
                </li>
                <li>
                  <Link to="/mystery" className="text-secondary/70 hover:text-accent-light transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    The Mystery Revealed
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-primary mb-4 flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-accent" />
                Search Tips
              </h3>
              <ul className="text-sm text-primary/60 space-y-3 font-light">
                <li>• Search for specific authors like "Stam" or "Baker"</li>
                <li>• Search for topics like "Baptism", "Acts", or "Law"</li>
                <li>• Use the AI Insights to find connections between different resources</li>
                <li>• The search covers book titles, authors, and detailed study summaries</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
