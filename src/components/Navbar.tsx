import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Mail, Home, Info, Youtube, Heart, User, Video, HelpCircle, ChevronDown, Search as SearchIcon, LogIn, LogOut, Shield, MessageSquare, Smartphone, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../lib/AuthProvider';
import { signOut } from '../lib/firebase';
import { useSearch } from '../lib/SearchProvider';
import AuthModal from './AuthModal';
import MobileBottomNav from './MobileBottomNav';

export default function Navbar() {
  const { user } = useAuth();
  const { performSearch } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = user?.email === 'jjdster@gmail.com';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'The Gospel', path: '/gospel', icon: Heart },
    { 
      name: 'The Mystery', 
      path: '/mystery', 
      icon: Info,
      dropdown: [
        { name: 'The Mystery Revealed', path: '/mystery#revealed' },
        { name: 'The Apostle of the Gentiles', path: '/mystery#apostle' },
        { name: 'The Dispensation of Grace', path: '/mystery#dispensation' }
      ]
    },
    { name: 'Videos', path: '/videos', icon: Youtube },
    { 
      name: 'Bible Studies', 
      path: '/studies', 
      icon: BookOpen,
      dropdown: [
        { name: 'Water Baptism Study', path: '/baptism-study' },
        { name: 'Prophecy vs. Mystery', path: '/prophecy-mystery-study' },
        { name: 'The New Body', path: '/new-body-study' },
        { name: 'Law vs. Grace', path: '/law-grace-study' }
      ]
    },
    { name: 'Library', path: '/library', icon: BookOpen },
    { name: 'Study Center', path: '/study-center', icon: SearchIcon },
    { 
      name: 'Links', 
      path: '/links', 
      icon: BookOpen,
      dropdown: [
        { name: 'Grace School of the Bible', path: 'https://www.graceschoolofthebible.org', external: true },
        { name: 'Berean Bible Society', path: 'https://www.bereanbiblesociety.org', external: true },
        { name: 'Grace Ambassadors', path: 'https://graceambassadors.com', external: true },
        { name: 'Forgotten Truths', path: 'http://www.forgottentruths.com', external: true },
        { name: 'Parsons Publishing Company', path: 'https://www.parsonspublishingcompany.com', external: true },
        { name: 'Les Feldick Ministries', path: 'https://www.lesfeldick.org/index.html', external: true }
      ]
    },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  if (isAdmin) {
    navLinks.splice(navLinks.length - 1, 0, { name: 'Admin', path: '/admin', icon: Shield });
  }

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
      setSearchQuery('');
      setIsOpen(false);
      setIsSearchModalOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-primary/95 backdrop-blur-md py-3 shadow-xl' 
        : 'bg-primary py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <span className="text-xl md:text-3xl font-serif font-bold tracking-tight text-white group-hover:text-accent-light transition-colors">
              The Mystery <span className="italic font-normal text-accent-light">of Grace</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative px-1 xl:px-2">
                {link.dropdown ? (
                  <div 
                    className="relative py-2"
                    onMouseEnter={() => setOpenDropdown(link.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={`flex items-center px-3 py-2 rounded-full text-[10px] xl:text-xs font-bold tracking-[0.2em] uppercase transition-all ${
                        location.pathname === link.path 
                          ? 'text-accent-light bg-white/5' 
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {openDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] py-3 z-50 border border-primary/5 luxury-glow"
                        >
                          {link.dropdown.map((item) => (
                            item.external ? (
                              <a
                                key={item.name}
                                href={item.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-6 py-3 text-sm text-primary/70 hover:bg-secondary/50 hover:text-accent font-medium transition-colors"
                              >
                                {item.name}
                              </a>
                            ) : (
                              <Link
                                key={item.name}
                                to={item.path}
                                className="block px-6 py-3 text-sm text-primary/70 hover:bg-secondary/50 hover:text-accent font-medium transition-colors"
                              >
                                {item.name}
                              </Link>
                            )
                          ))}
                          <div className="border-t border-primary/5 my-2 mx-6"></div>
                          <Link
                            to={link.path}
                            className="block px-6 py-3 text-sm text-accent font-bold hover:bg-secondary/50 transition-colors"
                          >
                            View All {link.name}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`block px-3 py-4 text-[10px] xl:text-xs font-bold tracking-[0.2em] uppercase transition-all ${
                      location.pathname === link.path 
                        ? 'text-accent-light' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            <div className="flex items-center gap-1 ml-2 pl-4 border-l border-white/10">
              <button 
                onClick={() => setIsSearchModalOpen(true)}
                className="p-3 text-white/50 hover:text-accent-light transition-colors"
              >
                <SearchIcon className="h-4 w-4" />
              </button>
              

            </div>
          </div>

          {/* Mobile Navigation Interface */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 text-white/70"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-white"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-out */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="lg:hidden fixed inset-0 z-[60] bg-primary overflow-y-auto"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-primary z-10">
              <span className="text-accent font-serif font-bold italic text-xl">Directory</span>
              <button onClick={() => setIsOpen(false)} className="p-3 rounded-full bg-white/5 hover:bg-white/10">
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            
            <div className="px-6 py-8 space-y-3">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl text-lg font-medium transition-all ${
                          location.pathname === link.path
                            ? 'bg-accent/10 text-accent border border-accent/20'
                            : 'text-white/80 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center">
                          <link.icon className="mr-4 h-6 w-6 text-accent-light" />
                          {link.name}
                        </div>
                        <ChevronDown className={`h-5 w-5 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openDropdown === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-black/20 rounded-2xl mt-1 space-y-1"
                          >
                            {link.dropdown.map((item) => (
                              <div key={item.name}>
                                {item.external ? (
                                  <a
                                    href={item.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-14 py-4 text-sm text-white/60 active:text-accent-light hover:text-white"
                                  >
                                    {item.name}
                                  </a>
                                ) : (
                                  <Link
                                    to={item.path}
                                    className="block px-14 py-4 text-sm text-white/60 active:text-accent-light hover:text-white"
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`flex items-center p-4 rounded-2xl text-lg font-medium transition-all ${
                        location.pathname === link.path
                          ? 'bg-accent/10 text-accent border border-accent/20'
                          : 'text-white/80 hover:bg-white/5'
                      }`}
                    >
                      <link.icon className="mr-4 h-6 w-6 text-accent-light" />
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-8 mt-8 border-t border-white/10">

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Search Interface */}
      <AnimatePresence>
        {isSearchModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/98 backdrop-blur-2xl flex flex-col p-6"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsSearchModalOpen(false)} className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-all text-white">
                <X className="h-8 w-8" />
              </button>
            </div>
            <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center">
              <span className="text-accent underline underline-offset-8 decoration-accent/30 font-serif italic text-xl block text-center mb-12">Search the Library</span>
              <form onSubmit={handleSearch} className="relative group">
                <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-8 w-8 text-white/20 group-focus-within:text-accent transition-colors" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Enter Scripture, Keyword, or Author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-white/10 px-20 py-8 text-3xl md:text-5xl font-serif text-white placeholder-white/10 focus:outline-none focus:border-accent transition-all"
                  autoFocus
                />
                <button 
                  type="submit" 
                  disabled={!searchQuery.trim()}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-6 text-accent disabled:opacity-30"
                >
                  <ArrowRight className="h-10 w-10" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileBottomNav onMenuClick={() => setIsOpen(true)} onSearchClick={() => setIsSearchModalOpen(true)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  );
}
