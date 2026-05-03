import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { Book, Download, ExternalLink, FileText, ChevronLeft, User, Loader2, Search, X, Lock, Shield, BookOpen, Volume2, ArrowLeft, Bookmark } from 'lucide-react';
import ScriptureText from '../components/ScriptureText';
import { SpeakButton } from '../components/SpeakButton';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface BookType {
  id: string;
  title: string;
  filename: string;
  author: string;
  downloadUrl?: string;
  category?: string;
}

const initialBooks: BookType[] = [
  // Scripture
  { id: 'kjv', title: 'King James Bible (1611)', filename: 'KJV_Bible.pdf', author: 'YouVersion (Bible.com)', downloadUrl: 'https://www.bible.com/bible/1/GEN.1.KJV', category: 'Mystery' },
  { id: 'niv', title: 'New International Version (NIV)', filename: 'NIV_Bible', author: 'YouVersion (Bible.com)', downloadUrl: 'https://www.bible.com/bible/111/GEN.1.NIV', category: 'Mystery' },

  // Charles F. Baker
  { id: 'b1', title: 'Real Baptism', filename: 'BakerI01RealBaptism.pdf', author: 'Charles F. Baker', category: 'Theology' },
  { id: 'b2', title: 'Bible Truth', filename: 'BakerI02BibleTruth.pdf', author: 'Charles F. Baker', category: 'Theology' },
  { id: 'b3', title: 'Understanding the Book of Acts', filename: 'BakerI03UnderstandingActs.pdf', author: 'Charles F. Baker', category: 'Prophecy' },
  { id: 'b4', title: 'Understanding the Gospels', filename: 'BakerI04UnderstandingGospels.pdf', author: 'Charles F. Baker', category: 'Prophecy' },
  { id: 'b5', title: 'A Dispensational Theology', filename: 'BakerI05ADispensationalTheology.pdf', author: 'Charles F. Baker', category: 'Theology' },
  { id: 'b6', title: 'Dispensational Synopsis of the New Testament', filename: 'BakerI06DispensationalSynopsisNT.pdf', author: 'Charles F. Baker', category: 'Scholarly' },
  { id: 'b7', title: 'Dispensational Relationships', filename: 'BakerI07DispensationalRelationships.pdf', author: 'Charles F. Baker', category: 'Theology' },
  { id: 'b8', title: 'Understanding Galatians and the Law', filename: 'BakerI08UnderstandingGalandtheLaw.pdf', author: 'Charles F. Baker', category: 'Mystery' },
  { id: 'b9', title: 'Understanding the Body of Christ', filename: 'BakerI09UnderstandingtheBodyofChrist.pdf', author: 'Charles F. Baker', category: 'Mystery' },
  { id: 'b10', title: "God's Clock of the Ages", filename: 'BakerI10GodsClockoftheAges.pdf', author: 'Charles F. Baker', category: 'Prophecy' },
  
  // Harry Bultema
  { id: 'bu1', title: 'Zechariah', filename: 'BulteI01Zechariah.pdf', author: 'Harry Bultema' },
  { id: 'bu2', title: 'Genesis', filename: 'BulteI02Genesis.pdf', author: 'Harry Bultema' },
  { id: 'bu3', title: 'Grace and Truth', filename: 'BulteI03GraceTruth.pdf', author: 'Harry Bultema' },
  { id: 'bu4', title: 'Romans', filename: 'BulteI04Romans.pdf', author: 'Harry Bultema' },
  { id: 'bu5', title: 'The Bible and Baptism', filename: 'BulteI05BibleandBaptism.pdf', author: 'Harry Bultema' },
  { id: 'bu6', title: 'Names of Our Wonderful Lord', filename: 'BulteI06NamesofOurWonderfulLord.pdf', author: 'Harry Bultema' },
  { id: 'bu7', title: 'The Union of the Believer with Christ', filename: 'BulteI07UnionofBelieverwithChrist.pdf', author: 'Harry Bultema' },

  // Cornelius R. Stam
  { id: 's1', title: 'Galatians', filename: 'StamI01Galatians.pdf', author: 'Cornelius R. Stam' },
  { id: 's2', title: 'Thessalonians', filename: 'StamI02Thessalonians.pdf', author: 'Cornelius R. Stam' },
  { id: 's3', title: 'True Spirituality', filename: 'StamI03TrueSpirituality.pdf', author: 'Cornelius R. Stam' },
  { id: 's4', title: 'Two-Fold Purpose of God', filename: 'StamI04TwoFoldPurposeofGod.pdf', author: 'Cornelius R. Stam' },
  { id: 's5', title: 'Man: His Nature and Destiny', filename: 'StamI05ManHisNatureandDestiny.pdf', author: 'Cornelius R. Stam' },
  { id: 's6', title: "Author's Own Choice", filename: 'StamI06AuthorsOwnChoice.pdf', author: 'Cornelius R. Stam' },
  { id: 's7', title: 'Second Corinthians', filename: 'StamI07SecondCorinthians.pdf', author: 'Cornelius R. Stam' },
  { id: 's8', title: 'Our Great Commission', filename: 'StamI08OurGreatCommission.pdf', author: 'Cornelius R. Stam' },
  { id: 's9', title: 'No Other Doctrine', filename: 'StamI09NoOtherDoctrine.pdf', author: 'Cornelius R. Stam' },
  { id: 's10', title: 'First Corinthians', filename: 'StamI10FirstCorinthians.pdf', author: 'Cornelius R. Stam' },
  { id: 's11', title: 'Romans', filename: 'StamI11Romans.pdf', author: 'Cornelius R. Stam' },
  { id: 's12', title: 'Pastoral Epistles', filename: 'StamI12PastoralEpistles.pdf', author: 'Cornelius R. Stam' },
  { id: 's13', title: 'Things That Differ', filename: 'StamI13ThingsThatDiffer.pdf', author: 'Cornelius R. Stam' },
  { id: 's14', title: 'The Present Peril', filename: 'StamI14ThePresentPeril.pdf', author: 'Cornelius R. Stam' },
  { id: 's15', title: 'Moses and Paul', filename: 'StamI15MosesandPaul.pdf', author: 'Cornelius R. Stam' },
  { id: 's16', title: 'Acts Volume 1', filename: 'StamI16ActsVolume1.pdf', author: 'Cornelius R. Stam' },
  { id: 's17', title: 'Acts Volume 2', filename: 'StamI16ActsVolume2.pdf', author: 'Cornelius R. Stam' },
  { id: 's18', title: 'Acts Volume 3', filename: 'StamI18ActsVolume3.PDF', author: 'Cornelius R. Stam' },
  { id: 's19', title: 'Acts Volume 4', filename: 'StamI19ActsVolume4.pdf', author: 'Cornelius R. Stam' },
  { id: 's20', title: 'The Controversy', filename: 'StamI20TheControversy.pdf', author: 'Cornelius R. Stam' },
  { id: 's21', title: 'Satan in Derision', filename: 'StamI21SataninDerision.pdf', author: 'Cornelius R. Stam' },
  { id: 's22', title: 'Colossians', filename: 'StamI22Colossians.pdf', author: 'Cornelius R. Stam' },
  { id: 's23', title: 'Sermon on the Mount vs Grace of God', filename: 'StamI23SermonontheMountvsGraceofGod.pdf', author: 'Cornelius R. Stam' },
  { id: 's24', title: 'His Apostleship and Message', filename: 'StamI24HisApostleshipandMessage.pdf', author: 'Cornelius R. Stam' },
  { id: 's25', title: 'Hebrews: Who Wrote It and Why', filename: 'StamI25HebrewsWhoWroteItandWhy.pdf', author: 'Cornelius R. Stam' },
  { id: 's26', title: "The Lord's Supper", filename: 'StamI26TheLordsSupper.pdf', author: 'Cornelius R. Stam' },

  // Donald G. Campbell
  { id: 'c1', title: 'Dispensational View of the Bible', filename: 'CampbI01DispensationalViewoftheBible.pdf', author: 'Donald G. Campbell' },
  { id: 'c2', title: 'Colossians and Philemon', filename: 'ColossiansandPhilemon.pdf', author: 'Donald G. Campbell' },
  { id: 'c3', title: 'Ephesians', filename: 'CampbI03Ephesians.pdf', author: 'Donald G. Campbell' },
  { id: 'c4', title: 'Marriage and Separation', filename: 'CampbI04MarriageandSeparation.pdf', author: 'Donald G. Campbell' },
  { id: 'c5', title: 'Romans 1-8 Volume 1', filename: 'CampbI05Romans1.8Volume1.pdf', author: 'Donald G. Campbell' },
  { id: 'c6', title: 'Romans 9-16 Volume 2', filename: 'CampbI06Romans9.16Volume2.pdf', author: 'Donald G. Campbell' },
  { id: 'c7', title: 'Sovereignty of God', filename: 'CampbI07SovereigntyofGod.pdf', author: 'Donald G. Campbell' },

  // Fink
  { id: 'f1', title: 'The Mystery', filename: 'FinckI01.pdf', author: 'Joel Fink' },
  { id: 'f2', title: 'Lordship Salvation', filename: 'FinckI02.pdf', author: 'Joel Fink' },
  { id: 'f3', title: 'The Power of God Unto Salvation', filename: 'FinckI03.pdf', author: 'Joel Fink' },
  { id: 'f4', title: 'Common Questions About the Grace Message', filename: 'FinckI04.pdf', author: 'Joel Fink' },

  // Wilson
  { id: 'w1', title: 'So Run That You May Win', filename: 'WilsoI01.pdf', author: 'Roland Wilson' },
  { id: 'w2', title: 'Thematic Preaching', filename: 'WilsoI02.pdf', author: 'Roland Wilson' },
];

const authorsList = [
  { 
    name: 'YouVersion (Bible.com)', 
    description: 'A clean, digital Bible platform for primary source texts.',
    count: 2
  },
  { 
    name: 'Charles F. Baker', 
    description: 'A foundational voice in dispensational theology.',
    count: 10
  },
  { 
    name: 'Harry Bultema', 
    description: 'Scholar of prophetic and mystery-centered truth.',
    count: 7
  },
  { 
    name: 'Cornelius R. Stam', 
    description: 'Defending the unique apostleship of Paul.',
    count: 26
  },
  { 
    name: 'Donald G. Campbell', 
    description: 'Systematic study of the Pauline Epistles.',
    count: 7
  },
  { 
    name: 'Joel Fink', 
    description: 'Contemporary insights into the message of grace.',
    count: 4
  },
  { 
    name: 'Roland Wilson', 
    description: 'Deep theological explorations of the Word.',
    count: 2
  }
];

const PDF_BASE_URL = '/library'; 
const RESTRICTED_AUTHORS: string[] = [];
const ALLOWED_BUILDER_EMAIL = 'jjdster@gmail.com';

export default function Library() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialAuthor = searchParams.get('author');
  const [activeAuthor, setActiveAuthor] = useState<string | null>(initialAuthor);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserEmail(user?.email || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (activeAuthor) setSearchParams({ author: activeAuthor });
    else setSearchParams({});
  }, [activeAuthor, setSearchParams]);

  const hasBuilderAccess = currentUserEmail === ALLOWED_BUILDER_EMAIL;
  const filteredBooks = initialBooks.filter(book => {
    if (RESTRICTED_AUTHORS.includes(book.author) && !hasBuilderAccess) return false;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAuthor = activeAuthor ? book.author === activeAuthor : true;
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesAuthor && matchesCategory;
  });

  const generalDisplayAuthors = authorsList.filter(a => !RESTRICTED_AUTHORS.includes(a.name));
  const restrictedDisplayAuthors = authorsList.filter(a => RESTRICTED_AUTHORS.includes(a.name));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-secondary-light pb-24"
    >
      {/* Premium Header */}
      <div className="relative bg-primary py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,var(--color-accent)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-accent/50 md:w-16"></div>
              <span className="text-accent-light tracking-[0.3em] font-bold text-xs uppercase">The Collection</span>
              <div className="h-px w-8 bg-accent/50 md:w-16"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 tracking-tight">
              Grace <span className="italic font-normal text-accent-light">Library</span>
            </h1>
            <p className="max-w-3xl mx-auto text-secondary/60 text-lg md:text-xl font-serif italic leading-relaxed">
              "To make all men see what is the fellowship of the mystery, which from the beginning of the world hath been hid in God."
              <span className="block mt-4 text-xs font-bold tracking-widest uppercase opacity-40 not-italic">— Ephesians 3:9</span>
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        {/* Search & Filters Rail */}
        <div className="bg-white rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] p-8 mb-16 border border-primary/5">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30" />
              <input
                type="text"
                placeholder="Search authors, titles, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary/30 border border-transparent focus:border-accent/30 focus:bg-white px-16 py-5 rounded-2xl text-primary placeholder-primary/30 transition-all font-medium"
              />
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {['All', 'Mystery', 'Theology', 'Prophecy', 'Scholarly'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-primary/5 text-primary/60 hover:bg-primary/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!activeAuthor && !searchQuery ? (
            <motion.div
              key="authors-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-24"
            >
              {/* General Authors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {generalDisplayAuthors.map((author, i) => (
                  <motion.div
                    key={author.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setActiveAuthor(author.name)}
                    className="paper-card p-10 cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                        <Bookmark className="h-8 w-8" />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary/30">{author.count} Resources</span>
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                      {author.name}
                    </h3>
                    <p className="text-primary/50 text-sm leading-relaxed mb-8">
                      {author.description}
                    </p>
                    <div className="flex items-center gap-2 text-accent text-xs font-bold tracking-widest uppercase">
                      Expand Collection <ChevronLeft className="h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Scholarly / Restricted Section */}
              {hasBuilderAccess && (
                <div className="pt-24 border-t border-primary/5">
                  <div className="text-center mb-16">
                    <Shield className="h-10 w-10 text-accent mx-auto mb-6 opacity-40" />
                    <h2 className="text-3xl font-serif font-bold text-primary">Advanced Scholarship</h2>
                    <p className="text-primary/40 text-sm italic mt-2">Restricted Archive Access Enabled</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {restrictedDisplayAuthors.map((author, i) => (
                      <motion.div
                        key={author.name}
                        onClick={() => setActiveAuthor(author.name)}
                        className="paper-card p-10 cursor-pointer bg-primary/[0.02] border-accent/20 group"
                      >
                        <Lock className="h-6 w-6 text-accent mb-8 opacity-40 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-2xl font-serif font-bold text-primary mb-2">{author.name}</h3>
                        <p className="text-primary/40 text-xs mb-8">{author.description}</p>
                        <div className="text-accent text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                          Access Archive <ChevronLeft className="h-3 w-3 rotate-180" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="books-list"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                <div>
                  <button
                    onClick={() => { setActiveAuthor(null); setSearchQuery(''); }}
                    className="flex items-center gap-2 text-accent font-bold tracking-widest uppercase text-xs mb-6 hover:-translate-x-1 transition-transform"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to Authors
                  </button>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
                    {activeAuthor || 'Search Results'}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary/30">Showing {filteredBooks.length} Documents</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBooks.map((book, i) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="paper-card p-8 group flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-12">
                      <div className="p-4 bg-secondary group-hover:bg-accent/10 rounded-2xl text-primary/40 group-hover:text-accent transition-all">
                        <FileText className="h-6 w-6" />
                      </div>
                      <SpeakButton text={`${book.title} written by ${book.author}`} size="sm" />
                    </div>
                    
                    <h4 className="text-2xl font-serif font-bold text-primary mb-2 leading-tight group-hover:text-accent transition-colors">
                      {book.title}
                    </h4>
                    <p className="text-primary/40 text-xs font-serif italic mb-10">By {book.author}</p>
                    
                    <div className="mt-auto pt-8 border-t border-primary/5 flex items-center justify-between">
                      <a
                        href={book.downloadUrl || `${PDF_BASE_URL}/${book.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-primary hover:text-accent transition-colors"
                      >
                        Read Document <ChevronLeft className="h-3 w-3 rotate-180" />
                      </a>
                      <a
                        href={book.downloadUrl || `${PDF_BASE_URL}/${book.filename}`}
                        download={book.filename}
                        className="p-2 text-primary/20 hover:text-accent transition-colors"
                        title="Download PDF"
                      >
                        <Download className="h-5 w-5" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredBooks.length === 0 && (
                <div className="text-center py-32 bg-white rounded-[2.5rem] border border-dashed border-primary/10">
                  <Search className="h-16 w-16 text-primary/10 mx-auto mb-6" />
                  <h3 className="text-2xl font-serif font-bold text-primary mb-2">No documents found</h3>
                  <p className="text-primary/40 max-w-xs mx-auto">Your selection did not return any matches. Try a broader search or different author.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
