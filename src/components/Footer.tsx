import { Link } from 'react-router-dom';
import { Mail, Quote, BookOpen } from 'lucide-react';
import ScriptureText from './ScriptureText';

export default function Footer() {
  return (
    <footer className="relative bg-primary text-secondary overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Brand & Mission section */}
          <div className="md:col-span-12 lg:col-span-5">
            <Link to="/" className="inline-block group mb-8">
              <span className="text-3xl font-serif font-bold tracking-tight text-white group-hover:text-accent-light transition-colors">
                The Mystery <span className="italic font-normal text-accent-light">of Grace</span>
              </span>
            </Link>
            <p className="text-secondary/50 text-lg leading-relaxed max-w-lg mb-8 font-serif italic">
              Dedicated to the study and promotion of the Pauline revelation and the Preaching of Jesus Christ according to the Revelation of the Mystery.
            </p>
            <div className="space-y-4">
              <p className="text-xs font-bold tracking-widest uppercase text-accent-light opacity-80">Suggestions & Correspondence</p>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 luxury-glow">
                <p className="text-sm text-secondary/60 leading-relaxed mb-4">
                  If you have suggestions to make this site more accessible or notice any errors, your correspondence is appreciated.
                </p>
                <a href="mailto:jjdster@gmail.com" className="inline-flex items-center gap-2 text-accent-light hover:text-white transition-all font-bold tracking-wider">
                  <Mail className="h-4 w-4" />
                  jjdster@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links section */}
          <div className="md:col-span-6 lg:col-span-3">
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-8 border-b border-white/10 pb-4">Directory</h4>
            <div className="grid grid-cols-1 gap-y-4">
              <Link to="/gospel" className="text-secondary/50 hover:text-white hover:translate-x-1 transition-all text-sm font-medium inline-block">The Gospel of Grace</Link>
              <Link to="/mystery" className="text-secondary/50 hover:text-white hover:translate-x-1 transition-all text-sm font-medium inline-block">The Mystery Revealed</Link>
              <Link to="/library" className="text-secondary/50 hover:text-white hover:translate-x-1 transition-all text-sm font-medium inline-block">Grace Library</Link>
              <Link to="/studies" className="text-secondary/50 hover:text-white hover:translate-x-1 transition-all text-sm font-medium inline-block">Bible Studies</Link>
              <Link to="/videos" className="text-secondary/50 hover:text-white hover:translate-x-1 transition-all text-sm font-medium inline-block">Video Archive</Link>
            </div>
          </div>

          {/* Scripture focus section */}
          <div className="md:col-span-6 lg:col-span-4">
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-8 border-b border-white/10 pb-4">Foundational Truth</h4>
            <div className="relative p-8 rounded-3xl bg-accent/5 border border-accent/10">
              <Quote className="absolute top-4 left-4 h-8 w-8 text-accent/10" />
              <p className="text-secondary/70 italic font-serif text-lg leading-relaxed mb-6 pt-4">
                "Study to show thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth."
              </p>
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent-light text-[10px] font-bold tracking-[0.2em] uppercase">
                2 Timothy 2:15
              </span>
            </div>
          </div>
        </div>

        {/* Legal & Bottom Rail */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-secondary/30 text-[10px] font-bold tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} The Mystery of Grace Library
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-secondary/30 hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-colors">Privacy</a>
            <a href="#" className="text-secondary/30 hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-colors">Terms</a>
            <Link to="/contact" className="text-secondary/30 hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
