import { motion } from 'motion/react';
import { ArrowRight, Book, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-secondary mb-6 leading-tight"
          >
            The Preaching of Jesus Christ According to <br />
            <span className="text-accent-light italic text-3xl md:text-5xl">the Revelation of the Mystery</span>
            <span className="block text-xl md:text-2xl mt-4 font-sans font-light tracking-widest opacity-60 uppercase">Romans 16:25</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-secondary/80 mb-10 font-light tracking-wide max-w-2xl mx-auto"
          >
            "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth." — 2 Timothy 2:15
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/salvation"
              className="px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent-light transition-all flex items-center justify-center group"
            >
              First Things First — Are You Saved?
            </Link>
            <Link
              to="/mystery"
              className="px-8 py-4 border border-secondary/30 text-secondary rounded-full font-medium hover:bg-secondary/10 transition-all"
            >
              Discover the Mystery
            </Link>
            <Link
              to="/library"
              className="px-8 py-4 bg-white/10 text-secondary rounded-full font-medium hover:bg-white/20 transition-all flex items-center justify-center"
            >
              <Book className="mr-2 h-4 w-4" />
              Theological Library
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Interactive Project Message */}
      <section className="py-6 bg-primary/5 border-b border-primary/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg text-primary/70 font-serif italic">
            This site is an interactive project and is alive and morphing with your help.  Please be patient and feel free to make suggestions and comments.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 bg-secondary">
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
                className="p-8 rounded-2xl bg-white border border-primary/5 shadow-sm hover:shadow-xl transition-all"
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

      {/* Statement of Purpose Section */}
      <section className="py-24 bg-white border-y border-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary/30 p-8 md:p-12 rounded-3xl border border-primary/10 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-serif text-primary mb-8 text-center">Statement of Purpose</h2>
            <div className="prose prose-lg max-w-none text-primary/80 space-y-6 leading-relaxed">
              <p>
                This site is dedicated to teaching the whole counsel of God and answering questions from Scripture concerning the sovereignty of God, salvation, sanctification, the Revelation of the Mystery, ecclesiology, and eschatology.
              </p>
              <p>
                It follows a dispensational hermeneutic based on the revelation given to the Apostle Paul concerning the Church, which is His Body—the Body of Christ.
              </p>
              <p>
                Paul alone was chosen, called, and sent to the Gentiles by the resurrected, ascended, and glorified Lord Jesus Christ (Acts 26:15–18).
              </p>
              <p>
                While I have no desire to argue with those who may disagree (Romans 14:22; 1 Corinthians 1:1–4), I welcome correction if I speak inaccurately or unclearly, seeking always to speak the truth in love (2 Timothy 2:15). I encourage you to seek the truth declared by the Word of God (John 13:13).
              </p>
              <p className="font-serif italic text-primary pt-4">
                It is my prayer that every person who visits this site will submit their will to God, asking Him to reveal Himself and His truth, so that we might all grow to know Him better.
              </p>
              
              <div className="mt-12 pt-8 border-t border-primary/10 text-center italic text-primary/60">
                <p className="mb-4">
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
          <cite className="block mt-6 text-accent-light font-medium not-italic">— Romans 11:13</cite>
        </div>
      </section>
    </motion.div>
  );
}
