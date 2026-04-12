import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Play, FileText, Clock, ChevronRight, Book, Shield, Users, ExternalLink, X } from 'lucide-react';
import ScriptureText from '../components/ScriptureText';
import { DebugPanel } from '../components/DebugPanel';
import { useAuth } from '../lib/AuthProvider';

const ALLOWED_BUILDER_EMAIL = 'jjdster@gmail.com';

export default function BibleStudies() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNavTip, setShowNavTip] = useState(false);
  const hasBuilderAccess = user?.email === ALLOWED_BUILDER_EMAIL;

  const lessons = [
    {
      title: "Water Baptism Study Guide",
      category: "Interactive",
      duration: "Self-Paced",
      description: "A scripture-first, AI-guided study on the biblical view of baptism, focusing on identification and dispensational truth.",
      status: "Available",
      path: "/baptism-study"
    },
    {
      title: "Prophecy vs. Mystery",
      category: "Interactive",
      duration: "Self-Paced",
      description: "Learn to distinguish between God's earthly kingdom program and His heavenly body program through this AI-guided study.",
      status: "Available",
      path: "/prophecy-mystery-study",
      restricted: true
    },
    {
      title: "Law vs. Grace",
      category: "Doctrine",
      duration: "50 mins",
      description: "Understanding why we are not under the law, but under grace, and what that means for our daily walk.",
      status: "Available",
      path: "/law-grace-study"
    },
    {
      title: "The Dual Ministry of Christ",
      category: "Advanced",
      duration: "60 mins",
      description: "Exploring Christ's earthly ministry to the circumcision vs. His heavenly ministry to the uncircumcision.",
      status: "Available",
      path: "/dual-ministry-study"
    },
    {
      title: "The Seven Ones of Ephesians",
      category: "Foundational",
      duration: "40 mins",
      description: "A deep dive into the unity of the Spirit in the bond of peace.",
      status: "Available",
      path: "/seven-ones-study"
    },
  ].filter(lesson => !lesson.restricted || hasBuilderAccess);

  const handleStartStudy = (path: string) => {
    // Attempt to enter fullscreen on user interaction
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {
        // Ignore errors, as some browsers/environments might block this
      });
    }
    navigate(path);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-secondary min-h-screen pb-20"
    >
      <header className="bg-primary py-24 text-center">
        <AnimatePresence>
          {showNavTip && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-accent text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-md border border-white/20"
            >
              <div className="p-2 bg-white/20 rounded-lg">
                <ExternalLink className="h-5 w-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold">Opening Bible in New Tab</p>
                <p className="text-xs opacity-90">External sites like Bible.com cannot show our header. To return, simply close the new tab or click back to this tab.</p>
              </div>
              <button onClick={() => setShowNavTip(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-serif text-secondary mb-4"
        >
          Bible Studies
        </motion.h1>
        <p className="text-secondary/60 max-w-2xl mx-auto px-4">
          Deepen your understanding of the Pauline revelation through our structured lessons and resources.
        </p>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid md:grid-cols-2 gap-8">
          {lessons.map((lesson, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-primary/5 flex flex-col justify-between group hover:border-accent/30 transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-primary/5 text-accent text-xs font-bold uppercase tracking-widest rounded-full">
                    {lesson.category}
                  </span>
                  <div className="flex items-center text-primary/40 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {lesson.duration}
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                  <ScriptureText text={lesson.title} />
                </h3>
                <p className="text-primary/70 mb-8 leading-relaxed">
                  <ScriptureText text={lesson.description} />
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                {lesson.status === "Available" ? (
                  lesson.path ? (
                    <button 
                      onClick={() => handleStartStudy(lesson.path!)} 
                      className="flex items-center text-primary font-bold hover:text-accent transition-colors"
                    >
                      <Play className="h-5 w-5 mr-2 fill-current" />
                      Start Lesson
                    </button>
                  ) : (
                    <button className="flex items-center text-primary font-bold hover:text-accent transition-colors">
                      <Play className="h-5 w-5 mr-2 fill-current" />
                      Start Lesson
                    </button>
                  )
                ) : (
                  <span className="text-primary/30 font-medium italic">Coming Soon</span>
                )}
                <button className="p-2 rounded-full bg-secondary text-primary hover:bg-accent hover:text-white transition-all">
                  <FileText className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overview Section */}
        <section className="mt-24 py-16 bg-white rounded-3xl border border-primary/5 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4">The Dispensation of Grace</h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: "Prophecy vs. Mystery",
                  desc: "Understanding the distinction between God's plan for the Earth (Prophecy) and His plan for the Body of Christ (Mystery).",
                  icon: Book,
                },
                {
                  title: "Pauline Revelation",
                  desc: "The unique message given to the Apostle Paul for us today, the Gentiles, in this present age of grace.",
                  icon: Shield,
                },
                {
                  title: "The Body of Christ",
                  desc: "How we are joined together into one body, where there is neither Jew nor Gentile, but all are one in Christ.",
                  icon: Users,
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="p-8 rounded-2xl bg-secondary/30 border border-primary/5 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                    <feature.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-4">{feature.title}</h3>
                  <p className="text-primary/70 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Study Tools Section */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-primary">Study Resources</h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Online Bible (KJV)', url: 'https://www.bible.com/bible/1/GEN.1.KJV' },
              { name: 'Online Bible (NIV)', url: 'https://www.bible.com/bible/111/GEN.1.NIV' },
              { name: 'Greek Lexicon', url: 'https://www.blueletterbible.org/lang/lexicon/lexicon.cfm' },
              { name: 'Grace Library', url: '/library' }
            ].map((tool) => (
              <Link 
                key={tool.name} 
                to={tool.url.startsWith('/') ? tool.url : '#'}
                onClick={(e) => {
                  if (!tool.url.startsWith('/')) {
                    e.preventDefault();
                    setShowNavTip(true);
                    setTimeout(() => setShowNavTip(false), 8000);
                    window.open(tool.url, '_blank');
                  }
                }}
                className="p-6 bg-primary text-secondary rounded-2xl flex items-center justify-between cursor-pointer hover:bg-accent transition-colors"
              >
                <span className="font-medium tracking-wide">{tool.name}</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </section>
      </div>
      <DebugPanel />
    </motion.div>
  );
}
