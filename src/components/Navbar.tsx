import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Mail, Home, Info, Youtube, Heart, User, Video } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Are You Saved?', path: '/salvation', icon: Heart },
    { name: 'Testimony', path: '/testimony', icon: User },
    { name: 'The Mystery', path: '/mystery', icon: Info },
    { name: 'Videos', path: '/videos', icon: Youtube },
    { name: 'Bible Studies', path: '/studies', icon: BookOpen },
    { name: 'Library', path: '/library', icon: BookOpen },
    { name: 'Live Study', path: '/live-study', icon: Video },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="sticky top-0 z-50 bg-primary text-secondary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-serif font-bold tracking-wider text-accent-light">
                Grace Library
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center lg:space-x-4 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[10px] xl:text-xs font-medium tracking-widest uppercase transition-colors hover:text-accent-light whitespace-nowrap ${
                  location.pathname === link.path ? 'text-accent-light' : 'text-secondary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-primary-light transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-3 py-4 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'bg-accent/20 text-accent-light'
                      : 'text-secondary hover:bg-white/5'
                  }`}
                >
                  <link.icon className="mr-3 h-5 w-5" />
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
