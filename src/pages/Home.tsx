import { motion } from 'motion/react';
import { ArrowRight, Book, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            "Study to show thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth." — 2 Timothy 2:15
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-8"
          >
            <Link
              to="/salvation"
              className="w-full sm:w-auto px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent-light transition-all flex items-center justify-center group text-center"
            >
              First Things First — Are You Saved?
            </Link>
            <Link
              to="/mystery"
              className="w-full sm:w-auto px-8 py-4 border border-secondary/30 text-secondary rounded-full font-medium hover:bg-secondary/10 transition-all text-center"
            >
              Discover the Mystery
            </Link>
            <Link
              to="/library"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 text-secondary rounded-full font-medium hover:bg-white/20 transition-all flex items-center justify-center text-center"
            >
              <Book className="mr-2 h-4 w-4" />
              Grace Library
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

      {/* A Message to the Body of Christ Section */}
      <section className="py-24 bg-white border-y border-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary/30 p-8 md:p-12 rounded-3xl border border-primary/10 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-serif text-primary mb-8 text-center">A Message to the Body of Christ</h2>
            <div className="prose prose-lg max-w-none text-primary/80 space-y-6 leading-relaxed">
              <p className="font-serif italic text-primary text-xl mb-6">
                To the saints, the members of the Body of Christ:
              </p>
              <p>
                God has blessed us with all spiritual blessings in heavenly places in Christ. Chosen in Him before the foundation of the world, we are saved by grace through faith. By one Spirit we are baptized into one body—the Body of Christ—and sealed unto the day of redemption. Each member is an heir of God and a joint-heir with Christ, guaranteed an eternal future in heaven.
              </p>
              <p>
                Faith, hope, and charity remain, and the greatest of these is charity. In the epistles of Paul we are instructed how to live as children of God through faith in Jesus Christ: <span className="italic">“Those things, which ye have both learned, and received, and heard, and seen in me, do: and the God of peace shall be with you”</span> (Philippians 4:9).
              </p>
              <p>
                The purpose of this website is to focus on the good news entrusted to Paul, by which we are stablished, and to allow the Holy Spirit to shine His light into our hearts that we might believe—not because others believe, but because it is spiritually discerned. It is my prayer, by the grace of God, that we as members of the Body of Christ will be of one mind and heart, encouraging and edifying one another as we look for the blessed hope and the glorious appearing of our great God and Savior, Jesus Christ.
              </p>
              <div className="font-serif italic text-primary pt-4 text-center space-y-2">
                <p>“For whatsoever things were written aforetime were written for our learning, that we through patience and comfort of the scriptures might have hope.</p>
                <p>Now the God of patience and consolation grant you to be likeminded one toward another according to Christ Jesus:</p>
                <p>That ye may with one mind and one mouth glorify God, even the Father of our Lord Jesus Christ.</p>
                <p>Wherefore receive ye one another, as Christ also received us to the glory of God.”</p>
                <p className="not-italic font-sans text-sm font-bold mt-2">— Romans 15:4–7</p>
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
          <cite className="block mt-6 text-accent-light font-medium not-italic">— Romans 11:13</cite>
        </div>
      </section>
    </motion.div>
  );
}
