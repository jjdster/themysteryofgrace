import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Mail, Home, Info, Youtube, Heart, User, Video, HelpCircle, ChevronDown, Search as SearchIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Are You Saved?', path: '/salvation', icon: Heart },
    { name: 'Testimony', path: '/testimony', icon: User },
    { name: 'The Mystery', path: '/mystery', icon: Info },
    { name: 'Videos', path: '/videos', icon: Youtube },
    { name: 'Bible Studies', path: '/studies', icon: BookOpen },
    { name: 'Just Asking', path: '/asking', icon: HelpCircle },
    { name: 'Library', path: '/library', icon: BookOpen },
    { name: 'Search', path: '/search', icon: SearchIcon },
    { name: 'Live Study', path: '/live-study', icon: Video },
    { 
      name: 'Links', 
      path: '/links', 
      icon: BookOpen,
      dropdown: [
        { name: 'Grace School of the Bible', path: 'https://www.graceschoolofthebible.org', external: true },
        { name: 'Berean Bible Society', path: 'https://www.bereanbiblesociety.org', external: true },
        { name: 'Grace Ambassadors', path: 'https://graceambassadors.com', external: true },
        { name: 'Forgotten Truths', path: 'http://www.forgottentruths.com', external: true },
        { name: 'Parsons Publishing Company', path: 'https://www.parsonspublishingcompany.com', external: true }
      ]
    },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  useEffect(() => {
    setIsOpen(false);
    setIsLinksOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLinksOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-primary text-secondary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col items-center space-y-4">
          <Link to="/" className="flex items-center">
            <span className="text-2xl md:text-3xl font-serif font-bold tracking-wider text-[#ffcc00] text-center">
              The Mystery of Grace
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center lg:space-x-4 xl:space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative flex flex-col items-center group">
                {link.dropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsLinksOpen(true)}
                    onMouseLeave={() => setIsLinksOpen(false)}
                  >
                    <button
                      className={`flex items-center px-4 py-2 rounded-full text-[10px] xl:text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap ${
                        location.pathname === link.path 
                          ? 'bg-blue-900 text-white border border-white/20' 
                          : 'text-secondary hover:text-accent-light'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${isLinksOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isLinksOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-primary border border-white/10 rounded-xl shadow-2xl py-2 z-50"
                        >
                          {link.dropdown.map((item) => (
                            <a
                              key={item.name}
                              href={item.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-3 text-sm text-secondary hover:bg-white/5 hover:text-accent-light transition-colors"
                            >
                              {item.name}
                            </a>
                          ))}
                          <div className="border-t border-white/10 my-1"></div>
                          <Link
                            to={link.path}
                            className="block px-4 py-3 text-sm text-accent-light hover:bg-white/5 transition-colors font-bold"
                          >
                            View All Links
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`text-[10px] xl:text-xs font-bold tracking-widest uppercase transition-colors hover:text-accent-light whitespace-nowrap ${
                      location.pathname === link.path ? 'text-accent-light' : 'text-secondary'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button - Absolute positioned for accessibility */}
        <div className="lg:hidden absolute top-6 right-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-primary-light transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
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
                <div key={link.name}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => setIsLinksOpen(!isLinksOpen)}
                        className={`w-full flex items-center justify-between px-3 py-4 rounded-md text-base font-medium ${
                          location.pathname === link.path
                            ? 'bg-accent/20 text-accent-light'
                            : 'text-secondary hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center">
                          <link.icon className="mr-3 h-5 w-5" />
                          {link.name}
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isLinksOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isLinksOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-black/20 rounded-md mt-1"
                          >
                            {link.dropdown.map((item) => (
                              <a
                                key={item.name}
                                href={item.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-11 py-3 text-sm text-secondary hover:text-accent-light"
                              >
                                {item.name}
                              </a>
                            ))}
                            <Link
                              to={link.path}
                              className="block px-11 py-3 text-sm text-accent-light font-bold"
                            >
                              View All Links
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
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
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
