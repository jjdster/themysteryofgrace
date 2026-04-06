import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Book, Download, ExternalLink, FileText, ChevronLeft, User, Loader2, Search, X, Lock, Shield, BookOpen } from 'lucide-react';
import ScriptureText from '../components/ScriptureText';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface BookType {
  id: string;
  title: string;
  filename: string;
  author: string;
  downloadUrl?: string;
}

const initialBooks: BookType[] = [
  // Scripture
  { id: 'kjv', title: 'King James Bible (1611)', filename: 'KJV_Bible.pdf', author: 'King James Bible' },

  // Charles F. Baker
  { id: 'b1', title: 'Real Baptism', filename: 'BakerI01RealBaptism.pdf', author: 'Charles F. Baker' },
  { id: 'b2', title: 'Bible Truth', filename: 'BakerI02BibleTruth.pdf', author: 'Charles F. Baker' },
  { id: 'b3', title: 'Understanding the Book of Acts', filename: 'BakerI03UnderstandingActs.pdf', author: 'Charles F. Baker' },
  { id: 'b4', title: 'Understanding the Gospels', filename: 'BakerI04UnderstandingGospels.pdf', author: 'Charles F. Baker' },
  { id: 'b5', title: 'A Dispensational Theology', filename: 'BakerI05ADispensationalTheology.pdf', author: 'Charles F. Baker' },
  { id: 'b6', title: 'Dispensational Synopsis of the New Testament', filename: 'BakerI06DispensationalSynopsisNT.pdf', author: 'Charles F. Baker' },
  { id: 'b7', title: 'Dispensational Relationships', filename: 'BakerI07DispensationalRelationships.pdf', author: 'Charles F. Baker' },
  { id: 'b8', title: 'Understanding Galatians and the Law', filename: 'BakerI08UnderstandingGalandtheLaw.pdf', author: 'Charles F. Baker' },
  { id: 'b9', title: 'Understanding the Body of Christ', filename: 'BakerI09UnderstandingtheBodyofChrist.pdf', author: 'Charles F. Baker' },
  { id: 'b10', title: "God's Clock of the Ages", filename: 'BakerI10GodsClockoftheAges.pdf', author: 'Charles F. Baker' },
  
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
  { id: 's17', title: 'Acts Volume 2', filename: 'StamI17ActsVolume2.pdf', author: 'Cornelius R. Stam' },
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
  { id: 'w1', title: 'So Run That You May Win', filename: 'WilsoI01-1.pdf', author: 'Roland Wilson' },
  { id: 'w2', title: 'Thematic Preaching', filename: 'WilsoI02-1.pdf', author: 'Roland Wilson' },
];

const authors = [
  { 
    name: 'King James Bible', 
    description: 'The Authorized Version of the Holy Bible (KJV).',
    count: 1
  },
  { 
    name: 'Charles F. Baker', 
    description: 'Founder of Grace Bible College and author of numerous dispensational works.',
    count: 10
  },
  { 
    name: 'Harry Bultema', 
    description: 'Noted Bible teacher and author of deep scriptural commentaries.',
    count: 7
  },
  { 
    name: 'Cornelius R. Stam', 
    description: 'Prolific author and defender of the Pauline message of grace.',
    count: 26
  },
  { 
    name: 'Donald G. Campbell', 
    description: 'Theologian and author focused on dispensational truth and biblical commentaries.',
    count: 7
  },
  { 
    name: 'Joel Fink', 
    description: 'Theological works and commentaries by Fink.',
    count: 4
  },
  { 
    name: 'Roland Wilson', 
    description: 'Theological works and commentaries by Wilson.',
    count: 2
  }
];

// Configuration for PDF hosting
// Change this to your GitHub Raw URL or Google Cloud Bucket URL
// Example: 'https://raw.githubusercontent.com/jjdster/grace-library-assets/main'
// Using jsDelivr (cdn.jsdelivr.net) ensures PDFs open in the browser instead of downloading.
const PDF_BASE_URL = 'https://cdn.jsdelivr.net/gh/jjdster/grace-library-assets@main'; 

const RESTRICTED_AUTHORS = ['Charles F. Baker', 'Harry Bultema', 'Cornelius R. Stam', 'C.R. Stam'];
const ALLOWED_BUILDER_EMAIL = 'jjdster@gmail.com';

export default function Library() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialAuthor = searchParams.get('author');
  const [activeAuthor, setActiveAuthor] = useState<string | null>(initialAuthor);
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<BookType[]>(initialBooks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserEmail(user?.email || null);
      setLoading(false);
    });

    // Handle initial author from query param
    setActiveAuthor(initialAuthor);

    // Firebase is disconnected. We'll just use the initialBooks.
    setBooks(initialBooks);
    
    return () => unsubscribe();
  }, [initialAuthor]);

  // Update URL when activeAuthor changes
  useEffect(() => {
    if (activeAuthor) {
      setSearchParams({ author: activeAuthor });
    } else {
      setSearchParams({});
    }
  }, [activeAuthor, setSearchParams]);

  const hasBuilderAccess = currentUserEmail === ALLOWED_BUILDER_EMAIL;

  const generalAuthors = authors.filter(author => !RESTRICTED_AUTHORS.includes(author.name));
  const scholarlyAuthors = authors.filter(author => RESTRICTED_AUTHORS.includes(author.name));

  const filteredBooks = books.filter(book => {
    // Hide restricted books if not builder
    if (RESTRICTED_AUTHORS.includes(book.author) && !hasBuilderAccess) {
      return false;
    }

    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAuthor = activeAuthor ? book.author === activeAuthor : true;
    return matchesSearch && matchesAuthor;
  });

  if (loading && !activeAuthor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-light">
        <Loader2 className="h-12 w-12 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-secondary-light py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 tracking-tight">
            Grace Library
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl text-primary/70 max-w-3xl mx-auto font-light leading-relaxed">
            <ScriptureText text="As we search these writings, may the God of all grace direct our hearts and minds, protecting us from error and direct us into His truth. May He give us a spirit of wisdom and revelation in the knowledge of Him." />
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12 relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
            <input
              type="text"
              placeholder="Search books or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl border border-primary/10 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary-light rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-primary/40" />
              </button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {(!activeAuthor && !searchQuery) ? (
            <motion.div
              key="author-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {generalAuthors.map((author) => (
                  <button
                    key={author.name}
                    onClick={() => setActiveAuthor(author.name)}
                    className="group relative bg-white p-10 rounded-3xl border border-primary/10 shadow-md hover:shadow-2xl hover:border-accent/30 transition-all duration-500 text-left overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <User className="h-32 w-32 text-primary" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                        <User className="h-6 w-6" />
                      </div>
                      <h2 className="text-3xl font-serif font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                        {author.name}
                      </h2>
                      <p className="text-primary/60 font-light leading-relaxed mb-6">
                        {author.description}
                      </p>
                      <div className="flex items-center text-accent font-medium">
                        <span>View {author.count} Books</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <ChevronLeft className="h-5 w-5 ml-2 rotate-180" />
                        </motion.div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {hasBuilderAccess && (
                <div className="max-w-4xl mx-auto pt-12 border-t border-primary/5">
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center space-x-3 mb-4">
                      <div className="h-px w-12 bg-accent/30"></div>
                      <Shield className="h-5 w-5 text-accent" />
                      <div className="h-px w-12 bg-accent/30"></div>
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-primary">Scholarly Resources</h2>
                    <p className="text-primary/50 text-sm mt-2">Restricted access materials for authorized builders</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {scholarlyAuthors.map((author) => (
                      <button
                        key={author.name}
                        onClick={() => setActiveAuthor(author.name)}
                        className="group relative bg-white/50 p-8 rounded-3xl border border-primary/10 shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-500 text-left overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                          <BookOpen className="h-24 w-24 text-primary" />
                        </div>
                        
                        <div className="relative z-10">
                          <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-4 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                            <Shield className="h-5 w-5" />
                          </div>
                          <h3 className="text-2xl font-serif font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                            {author.name}
                          </h3>
                          <p className="text-primary/60 text-sm font-light leading-relaxed mb-4 line-clamp-2">
                            {author.description}
                          </p>
                          <div className="flex items-center text-accent text-sm font-medium">
                            Access Collection
                            <ChevronLeft className="h-4 w-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="book-list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-12">
                <button
                  onClick={() => {
                    setActiveAuthor(null);
                    setSearchQuery('');
                  }}
                  className="flex items-center text-primary/60 hover:text-accent transition-colors group"
                >
                  <ChevronLeft className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                  {searchQuery && !activeAuthor ? 'Clear Search' : 'Back to Authors'}
                </button>
                <div className="text-right">
                  <h2 className="text-2xl font-serif font-bold text-primary">
                    {activeAuthor || (searchQuery ? 'Search Results' : '')}
                  </h2>
                  <p className="text-sm text-primary/40 uppercase tracking-widest">
                    {filteredBooks.length} {filteredBooks.length === 1 ? 'Resource' : 'Resources'} Available
                  </p>
                </div>
              </div>

              {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBooks.map((book, index) => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden border border-primary/10 hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="p-8 h-full flex flex-col">
                        <div className="flex items-start justify-between mb-6">
                          <div className="p-3 bg-accent/10 rounded-lg text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                            <Book className="h-6 w-6" />
                          </div>
                          <span className="text-xs font-mono text-primary/40 uppercase tracking-widest">
                            PDF Resource
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                          {book.title}
                        </h3>
                        <p className="text-primary/60 text-sm mb-8 font-light italic">
                          By {book.author}
                        </p>
                        
                        <div className="mt-auto flex items-center space-x-4">
                          <a
                            href={book.downloadUrl || (PDF_BASE_URL.startsWith('http') ? `${PDF_BASE_URL}/${book.filename}` : `${PDF_BASE_URL}/${book.filename}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-primary text-secondary text-sm font-medium rounded-md hover:bg-primary-light transition-colors duration-200"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Read Online
                          </a>
                          <a
                            href={book.downloadUrl || (PDF_BASE_URL.startsWith('http') ? `${PDF_BASE_URL}/${book.filename}` : `${PDF_BASE_URL}/${book.filename}`)}
                            download={book.filename}
                            className="inline-flex items-center justify-center p-2 text-primary/60 hover:text-accent hover:bg-accent/5 rounded-md transition-all duration-200"
                            title="Download PDF"
                          >
                            <Download className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-primary/20">
                  <Search className="h-12 w-12 text-primary/20 mx-auto mb-4" />
                  <h3 className="text-xl font-serif font-bold text-primary mb-2">No books found</h3>
                  <p className="text-primary/60">Try adjusting your search terms or browse by author.</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-6 text-accent font-medium hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-20 p-8 bg-primary rounded-2xl text-secondary text-center shadow-2xl relative overflow-hidden">
          {!hasBuilderAccess && (
            <div className="mb-8 p-4 bg-accent/10 border border-accent/20 rounded-xl inline-flex items-center gap-3 text-accent">
              <Lock className="h-5 w-5" />
              <span className="text-sm font-medium">Some scholarly resources are restricted to site builders.</span>
            </div>
          )}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-[-10%] left-[-5%] w-64 h-64 rounded-full bg-accent blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 rounded-full bg-accent blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <FileText className="h-12 w-12 mx-auto mb-6 text-accent-light opacity-80" />
            <h2 className="text-2xl font-serif font-bold mb-4">Study to Show Thyself Approved</h2>
            <p className="max-w-2xl mx-auto text-secondary/80 font-light leading-relaxed mb-8">
              <ScriptureText text='"Study to show thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth."' />
              <br />
              <span className="italic opacity-60">— <ScriptureText text="2 Timothy 2:15" /></span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
