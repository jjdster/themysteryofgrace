import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-secondary py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl font-serif font-bold tracking-wider text-accent-light">
                Grace Library
              </span>
            </div>
            <p className="text-secondary/60 max-w-md leading-relaxed">
              Dedicated to the study and promotion of the Pauline revelation and the Preaching of Jesus Christ according to the Revelation of the Mystery.
            </p>
            <div className="mt-6 text-xs text-accent-light/70 italic leading-relaxed max-w-md">
              *** Please, if any one has any suggestion that might make this site more user friendly or, if you struggle finding what you are looking for or, if you find a typo or I misspeak, I would appreciate hearing from you. ***
              <a href="mailto:jjdster@gmail.com" className="block mt-1 text-accent-light hover:underline not-italic font-bold">jjdster@gmail.com</a>
            </div>
          </div>

          <div>
            <h4 className="text-accent-light font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-secondary/60 hover:text-secondary transition-colors">Home</Link></li>
              <li><Link to="/salvation" className="text-secondary/60 hover:text-secondary transition-colors">Are You Saved?</Link></li>
              <li><Link to="/testimony" className="text-secondary/60 hover:text-secondary transition-colors">Testimony</Link></li>
              <li><Link to="/mystery" className="text-secondary/60 hover:text-secondary transition-colors">The Mystery</Link></li>
              <li><Link to="/videos" className="text-secondary/60 hover:text-secondary transition-colors">Videos</Link></li>
              <li><Link to="/studies" className="text-secondary/60 hover:text-secondary transition-colors">Bible Studies</Link></li>
              <li><Link to="/contact" className="text-secondary/60 hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-accent-light font-bold uppercase tracking-widest text-sm mb-6">Scripture</h4>
            <p className="text-secondary/60 italic text-sm leading-relaxed">
              "To make all men see what is the fellowship of the mystery, which from the beginning of the world hath been hid in God, who created all things by Jesus Christ."
            </p>
            <span className="block mt-2 text-xs font-bold text-accent-light">— Ephesians 3:9</span>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-secondary/40 tracking-widest uppercase font-medium">
          <p>© {new Date().getFullYear()} Grace Library. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
