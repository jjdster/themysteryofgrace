import { motion } from 'motion/react';
import { Play, FileText, Clock, ChevronRight } from 'lucide-react';

export default function BibleStudies() {
  const lessons = [
    {
      title: "Prophecy vs. Mystery",
      category: "Foundational",
      duration: "45 mins",
      description: "Learn to distinguish between God's earthly kingdom program and His heavenly body program.",
      status: "Available",
    },
    {
      title: "Law vs. Grace",
      category: "Doctrine",
      duration: "50 mins",
      description: "Understanding why we are not under the law, but under grace, and what that means for our daily walk.",
      status: "Available",
    },
    {
      title: "The Dual Ministry of Christ",
      category: "Advanced",
      duration: "60 mins",
      description: "Exploring Christ's earthly ministry to the circumcision vs. His heavenly ministry to the uncircumcision.",
      status: "Coming Soon",
    },
    {
      title: "The Seven Ones of Ephesians",
      category: "Foundational",
      duration: "40 mins",
      description: "A deep dive into the unity of the Spirit in the bond of peace.",
      status: "Coming Soon",
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-secondary min-h-screen pb-20"
    >
      <header className="bg-primary py-24 text-center">
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
                  {lesson.title}
                </h3>
                <p className="text-primary/70 mb-8 leading-relaxed">
                  {lesson.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                {lesson.status === "Available" ? (
                  <button className="flex items-center text-primary font-bold hover:text-accent transition-colors">
                    <Play className="h-5 w-5 mr-2 fill-current" />
                    Start Lesson
                  </button>
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

        {/* Study Tools Section */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-primary">Study Resources</h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Online Bible', 'Greek Lexicon', 'Pauline Timeline', 'Theological Library'].map((tool) => (
              <a 
                key={tool} 
                href={tool === 'Theological Library' ? '/library' : '#'}
                className="p-6 bg-primary text-secondary rounded-2xl flex items-center justify-between cursor-pointer hover:bg-accent transition-colors"
              >
                <span className="font-medium tracking-wide">{tool}</span>
                <ChevronRight className="h-5 w-5" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
