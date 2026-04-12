import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Link as LinkIcon, X } from 'lucide-react';
import ScriptureText from '../components/ScriptureText';

export default function Links() {
  const [showNavTip, setShowNavTip] = useState(false);
  const links = [
    {
      title: "Grace School of the Bible",
      url: "https://www.graceschoolofthebible.org",
      description: "A comprehensive Bible study program focused on the Pauline revelation."
    },
    {
      title: "Berean Bible Society",
      url: "https://www.bereanbiblesociety.org",
      description: "Dedicated to the study and promotion of the Mystery revealed to Paul."
    },
    {
      title: "Grace Ambassadors",
      url: "https://graceambassadors.com",
      description: "Excellent resources for rightly dividing the Word of Truth."
    },
    {
      title: "Forgotten Truths",
      url: "http://www.forgottentruths.com",
      description: "Teaching the Mystery that was kept secret since the world began."
    },
    {
      title: "King James Bible (KJV)",
      url: "https://www.bible.com/bible/1/GEN.1.KJV",
      description: "The Authorized Version of the Holy Bible, our primary source for scripture study."
    },
    {
      title: "New International Version (NIV)",
      url: "https://www.bible.com/bible/111/GEN.1.NIV",
      description: "A modern English translation of the Bible, used alongside the KJV in our studies."
    },
    {
      title: "Parsons Publishing Company",
      url: "https://www.parsonspublishingcompany.com",
      description: "Providing literature and resources dedicated to the preaching of Jesus Christ according to the revelation of the Mystery."
    }
  ];

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
                <p className="text-sm font-bold">Opening External Link</p>
                <p className="text-xs opacity-90">External sites cannot show our header. To return, simply close the new tab or click back to this tab.</p>
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
          Helpful Links
        </motion.h1>
        <p className="text-secondary/60 max-w-2xl mx-auto px-4">
          Resources and ministries that focus on the Preaching of Jesus Christ according to the Revelation of the Mystery.
        </p>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid gap-8">
          {links.map((link, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-primary/5 hover:border-accent/30 transition-all group"
            >
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-accent/10 rounded-2xl text-accent shrink-0">
                  <LinkIcon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-primary/70 leading-relaxed mb-6 text-lg">
                    <ScriptureText text={link.description} />
                  </p>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setShowNavTip(true);
                      setTimeout(() => setShowNavTip(false), 8000);
                    }}
                    className="inline-flex items-center text-accent font-bold hover:text-accent-light transition-colors"
                  >
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-white rounded-3xl border border-dashed border-primary/20 text-center">
          <h3 className="text-xl font-serif text-primary mb-4">Know of a great resource?</h3>
          <p className="text-primary/60 mb-6">We are always looking for more resources that rightly divide the Word of Truth.</p>
          <a 
            href="mailto:jjdster@gmail.com" 
            className="inline-flex items-center px-8 py-3 bg-primary text-secondary rounded-full font-medium hover:bg-accent transition-all"
          >
            Suggest a Link
          </a>
        </div>
      </div>
    </motion.div>
  );
}
