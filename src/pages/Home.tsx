import { motion } from 'framer-motion';
import { ArrowRight, Book, Shield, Users, BookOpen, MessageSquare, Quote, Smartphone, Share, PlusSquare, Compass, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScriptureText from '../components/ScriptureText';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen selection:bg-accent/30"
    >
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80"
            alt="Vast Library"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            <span className="inline-block text-accent-light font-sans font-bold tracking-[0.4em] uppercase text-sm mb-6 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
              Preserving the Truth
            </span>
            <h1 className="text-5xl md:text-8xl font-serif text-white mb-4 leading-[0.9] tracking-tight">
              The Mystery <br />
              <span className="italic text-accent-light">of Grace</span>
            </h1>
            <div className="ornament my-8" />
            <p className="text-xl md:text-2xl text-secondary/80 font-serif italic max-w-2xl mx-auto leading-relaxed">
              "To make all men see what is the fellowship of the mystery, which from the beginning of the world hath been hid in God..."
            </p>
            <p className="mt-4 text-accent-light font-bold tracking-widest text-xs uppercase">— Ephesians 3:9</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            <Link
              to="/studies"
              className="px-8 py-4 bg-accent text-primary rounded-full font-bold hover:bg-accent-light transition-all flex items-center gap-2 shadow-[0_10px_40px_rgba(184,134,11,0.3)] hover:-translate-y-1"
            >
              Start Bible Study
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/library"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold hover:bg-white/20 transition-all flex items-center gap-2 hover:-translate-y-1"
            >
              Browse Library
              <BookOpen className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Main Features Grid */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Study Center Card */}
            <motion.div variants={itemVariants} className="lg:col-span-2 group">
              <Link to="/study-center" className="paper-card block h-full relative group overflow-hidden">
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                <div className="p-8 md:p-12 flex flex-col h-full">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Search className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-primary mb-4 leading-tight">
                    AI-Powered <br />
                    Study Center
                  </h3>
                  <p className="text-primary/60 leading-relaxed mb-8 flex-grow">
                    Harness the power of AI grounded in sound Pauline doctrine. Ask questions, explore difficult passages, and get immediate answers with scriptural references from the works of grace scholars.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-bold tracking-widest text-xs uppercase group-hover:gap-4 transition-all">
                    Open Study Center <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Gospel Card */}
            <motion.div variants={itemVariants}>
              <Link to="/gospel" className="paper-card block h-full bg-primary text-secondary relative group">
                <div className="p-8 md:p-12 flex flex-col h-full">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-accent-light mb-8">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold mb-4">
                    The Gospel <br />
                    of Grace
                  </h3>
                  <p className="text-secondary/60 leading-relaxed mb-8">
                    Understand the simple but profound truth of salvation through faith alone in the finished work of Christ.
                  </p>
                  <div className="flex items-center gap-2 text-accent-light font-bold tracking-widest text-xs uppercase">
                    Read the Good News <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Mystery Deep Dive */}
            <motion.div variants={itemVariants}>
              <Link to="/mystery" className="paper-card block h-full relative group">
                <div className="p-8 md:p-12 flex flex-col h-full">
                  <div className="w-16 h-16 bg-accent/5 rounded-2xl flex items-center justify-center text-accent mb-8">
                    <Compass className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-primary mb-4">
                    The Revealed <br />
                    Mystery
                  </h3>
                  <p className="text-primary/60 leading-relaxed mb-8">
                    Explore the truth kept secret since the world began but now made manifest to the Body of Christ.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-bold tracking-widest text-xs uppercase">
                    Explore Depth <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Content Cards */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                <Link to="/videos" className="paper-card p-8 flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                    <PlusSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Video Archives</h4>
                    <p className="text-sm text-primary/40">Watch foundational messages</p>
                  </div>
                </Link>
                <Link to="/community" className="paper-card p-8 flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Community Board</h4>
                    <p className="text-sm text-primary/40">Discuss and grow with others</p>
                  </div>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-24 bg-white border-y border-primary/5 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Quote className="h-12 w-12 text-accent/20 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
              A Message to the <br />
              <span className="italic">Body of Christ</span>
            </h2>
          </motion.div>

          <div className="prose prose-lg max-w-none text-primary/70 space-y-8 font-serif italic text-lg leading-[1.8] text-center border-l-2 border-accent/20 pl-8 md:pl-16 relative">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />
            <p>
              "To the saints, the members of the Body of Christ: God has blessed us with all spiritual blessings in heavenly places in Christ. Chosen in Him before the foundation of the world, we are saved by grace through faith. By one Spirit we are baptized into one body—the Body of Christ—and sealed unto the day of redemption."
            </p>
            <p>
              "The purpose of this website is to focus on the good news entrusted to Paul, by which we are <Link to="/mystery#grammar-deep-dive" className="text-accent underline underline-offset-4 font-bold not-italic">stablished</Link>, and to allow the Holy Spirit to shine His light into our hearts that we might believe—not because others believe, but because it is spiritually discerned."
            </p>
            <div className="not-italic font-sans pt-8">
              <p className="text-sm font-bold tracking-[0.3em] uppercase text-primary mb-2">Unity & Charity</p>
              <p className="text-xs text-primary/40 leading-relaxed max-w-lg mx-auto">
                Endeavouring to keep the unity of the Spirit in the bond of peace. Let us encourage and edify one another as we look for the blessed hope.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Add to Home Screen Instructions */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="paper-card bg-primary text-secondary p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Install the <br />Mobile Experience</h2>
                <p className="text-secondary/60 text-lg mb-8">
                  Get instant access to the Grace Library by adding this site to your home screen. It works just like a native app on your phone or tablet.
                </p>
                <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase">
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">1</div>
                  Open in Safari
                </div>
                <div className="w-[1px] h-8 bg-white/20 ml-4 my-2" />
                <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-accent-light">
                  <div className="w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center text-accent">2</div>
                  Tap Share icon
                </div>
                <div className="w-[1px] h-8 bg-white/20 ml-4 my-2" />
                <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase">
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">3</div>
                  Add to Home Screen
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/5] bg-secondary/10 rounded-[40px] border border-white/10 p-4 relative">
                  <div className="w-full h-full bg-primary/40 rounded-[32px] border border-white/5 overflow-hidden flex items-center justify-center">
                    <Smartphone className="h-24 w-24 text-accent/20 rotate-12" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent rounded-3xl -rotate-12 flex items-center justify-center shadow-2xl">
                  <Book className="h-12 w-12 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Quote Section */}
      <section className="py-32 bg-primary text-secondary overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <BookOpen className="h-[500px] w-[500px] absolute -top-20 -left-20 rotate-12" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <blockquote className="text-3xl md:text-5xl font-serif italic mb-10 leading-tight">
            "For I speak to you Gentiles, inasmuch as I am the apostle of the Gentiles, I magnify mine office."
          </blockquote>
          <div className="ornament my-10 opacity-30" />
          <cite className="block text-accent-light font-bold tracking-[0.3em] uppercase text-sm not-italic opacity-80">— Romans 11:13</cite>
        </div>
      </section>
    </motion.div>
  );
}
