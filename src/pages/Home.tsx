import { motion } from 'framer-motion';
import { ArrowRight, Book, Shield, Users, BookOpen, MessageSquare, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScriptureText from '../components/ScriptureText';

// Force sync commit: show vs shew update
export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="An Open Bible"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-7xl font-serif text-white mb-2 leading-tight">
              The Preaching of Jesus Christ
            </h1>
            <h2 className="text-3xl md:text-6xl font-serif text-white mb-4">
              According to
            </h2>
            <p className="text-[#ffcc00] italic font-serif text-4xl md:text-7xl mb-6">
              the Revelation of the Mystery
            </p>
            <span className="block text-xl md:text-2xl font-sans font-bold tracking-[0.3em] text-white/80 uppercase">
              <ScriptureText text="ROMANS 16:25" />
            </span>
            <Link 
              to="/mystery#grammar-deep-dive" 
              className="inline-flex items-center mt-4 text-accent-light hover:text-white transition-colors text-sm font-medium tracking-widest uppercase group"
            >
              <BookOpen className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Explore the Grammatical Depth
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-white mb-12 font-serif italic max-w-3xl mx-auto leading-relaxed"
          >
            <p>
              <ScriptureText text='"Study to show thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth." — 2 Timothy 2:15' />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6"
          >
            <Link
              to="/gospel"
              className="w-full sm:w-auto px-10 py-4 bg-accent text-white rounded-full font-bold hover:bg-accent-light transition-all text-center shadow-lg"
            >
              The Gospel of Grace
            </Link>
            <Link
              to="/study-center"
              className="w-full sm:w-auto px-10 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all text-center"
            >
              Study Center
            </Link>
            <Link
              to="/community"
              className="w-full sm:w-auto px-10 py-4 bg-white text-primary rounded-full font-bold hover:bg-white/90 transition-all flex items-center justify-center text-center shadow-lg"
            >
              <MessageSquare className="mr-2 h-5 w-5 text-accent" />
              Community
            </Link>
            <Link
              to="/library"
              className="w-full sm:w-auto px-10 py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-bold hover:bg-white/30 transition-all flex items-center justify-center text-center"
            >
              <Book className="mr-2 h-5 w-5" />
              Grace Library
            </Link>
          </motion.div>
        </div>
      </section>

      {/* A Message to the Body of Christ Section */}
      <section className="py-24 bg-white border-y border-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary/30 p-8 md:p-12 rounded-3xl border border-primary/10 shadow-sm">
            <div className="prose prose-lg max-w-none text-primary/80 space-y-6 leading-relaxed">
              <div className="font-serif italic text-primary text-xl mb-8 border-b border-primary/10 pb-6 text-center">
                <p>“I therefore, the prisoner of the Lord, beseech you that ye walk worthy of the vocation wherewith ye are called, 2 With all lowliness and meekness, with longsuffering, forbearing one another in love; 3 Endeavouring to keep the unity of the Spirit in the bond of peace.”</p>
                <p className="not-italic font-sans text-sm font-bold mt-2">— <ScriptureText text="Ephesians 4:1–3" /></p>
              </div>

              <p>
                To the saints, the members of the Body of Christ: God has blessed us with all spiritual blessings in heavenly places in Christ. Chosen in Him before the foundation of the world, we are saved by grace through faith. By one Spirit we are baptized into one body—the Body of Christ—and sealed unto the day of redemption. Each member is an heir of God and a joint-heir with Christ, guaranteed an eternal future in heaven.
              </p>
              <p>
                Faith, hope, and charity remain, and the greatest of these is charity. In the epistles of Paul we are instructed how to live as children of God through faith in Jesus Christ: “Those things, which ye have both learned, and received, and heard, and seen in me, do: and the God of peace shall be with you” (<ScriptureText text="Philippians 4:9" />).
              </p>
              <p>
                The purpose of this website is to focus on the good news entrusted to Paul, by which we are <Link to="/mystery#grammar-deep-dive" className="text-accent hover:underline font-bold">stablished</Link>, and to allow the Holy Spirit to shine His light into our hearts that we might believe—not because others believe, but because it is spiritually discerned. It is my prayer, by the grace of God, that we as members of the Body of Christ will be of one mind and heart, encouraging and edifying one another as we look for the blessed hope and the glorious appearing of our great God and Savior, Jesus Christ.
              </p>
              <div className="font-serif italic text-primary pt-4 text-center space-y-2">
                <p>“For whatsoever things were written aforetime were written for our learning… that we may with one mind and one mouth glorify God… Wherefore receive ye one another, as Christ also received us to the glory of God.”</p>
                <p className="not-italic font-sans text-sm font-bold mt-2">— <ScriptureText text="Romans 15:4–7" /></p>
              </div>
              
              <div className="mt-12 pt-8 border-t border-primary/10 text-center italic text-primary/90">
                <p className="mb-4 text-lg">
                  *** Please, if any one has any suggestion that might make this site more user friendly or, if you struggle finding what you are looking for or, if you find a typo or I misspeak, I would appreciate hearing from you. ***
                </p>
                <a href="mailto:jjdster@gmail.com" className="text-accent font-bold hover:underline not-italic">
                  jjdster@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-primary text-secondary text-center">
        <div className="max-w-3xl mx-auto px-4">
          <blockquote className="text-2xl md:text-3xl font-serif italic leading-relaxed">
            "For I speak to you Gentiles, inasmuch as I am the apostle of the Gentiles, I magnify mine office."
          </blockquote>
          <cite className="block mt-6 text-accent-light font-medium not-italic">— <ScriptureText text="Romans 11:13" /></cite>
        </div>
      </section>
    </motion.div>
  );
}
