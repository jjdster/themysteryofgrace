import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Mail, Home, Info, Youtube, Heart, User, Video, HelpCircle, ChevronDown, Search as SearchIcon, LogIn, LogOut, Shield, MessageSquare, Smartphone } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../lib/AuthProvider';
import { signOut } from '../lib/firebase';
import { useSearch } from '../lib/SearchProvider';
import AuthModal from './AuthModal';
import MobileBottomNav from './MobileBottomNav';

export default function Navbar() {
  const { user, setAuthError } = useAuth();
  const { performSearch } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = user?.email === 'jjdster@gmail.com';

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'The Gospel', path: '/gospel', icon: Heart },
    { 
      name: 'The Mystery', 
      path: '/mystery', 
      icon: Info,
      dropdown: [
        { name: 'The Mystery Revealed (Rom 16:25)', path: '/mystery#revealed' },
        { name: 'The Apostle of the Gentiles (Acts 9:15-16)', path: '/mystery#apostle' },
        { name: 'The Dispensation of Grace (Eph 3:1-2)', path: '/mystery#dispensation' }
      ]
    },
    { name: 'Videos', path: '/videos', icon: Youtube },
    { 
      name: 'Bible Studies', 
      path: '/studies', 
      icon: BookOpen,
      dropdown: [
        { name: 'Water Baptism Study (Acts 8:36-38)', path: '/baptism-study' },
        { name: 'Prophecy vs. Mystery (Rom 16:25)', path: '/prophecy-mystery-study' },
        { name: 'The New Body (1 Cor 15:42-44)', path: '/new-body-study' },
        { name: 'Law vs. Grace (Rom 6:14)', path: '/law-grace-study' }
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
    { name: 'Community', path: '/community', icon: MessageSquare },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  if (isAdmin) {
    navLinks.splice(navLinks.length - 1, 0, { name: 'Admin', path: '/admin', icon: Shield });
  }

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchModalOpen]);

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
    <nav className="sticky top-0 z-50 bg-primary text-secondary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between space-y-3 lg:space-y-0">
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl lg:text-3xl font-serif font-bold tracking-wider text-[#ffcc00] text-center">
              The Mystery of Grace
            </span>
          </Link>

          {/* Desktop Links & Search */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {/* Search Bar Desktop */}
            <div className="w-64">
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-full py-1.5 pl-9 pr-4 text-xs text-secondary placeholder-secondary/50 focus:outline-none focus:bg-white/20 focus:border-accent transition-all"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-secondary/50 group-focus-within:text-accent transition-colors" />
                <button type="submit" className="hidden">Search</button>
              </form>
            </div>

            {navLinks.map((link) => (
              <div key={link.name} className="relative flex flex-col items-center group">
                {link.dropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={`flex items-center px-2 py-1 rounded-full text-[10px] xl:text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap ${
                        location.pathname === link.path 
                          ? 'bg-blue-900 text-white border border-white/20' 
                          : 'text-secondary hover:text-accent-light'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {openDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-primary border border-white/10 rounded-xl shadow-2xl py-2 z-50"
                        >
                          {link.dropdown.map((item) => (
                            item.external ? (
                              <a
                                key={item.name}
                                href={item.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-3 text-sm text-secondary hover:bg-white/5 hover:text-accent-light transition-colors"
                              >
                                {item.name}
                              </a>
                            ) : (
                              <Link
                                key={item.name}
                                to={item.path}
                                className="block px-4 py-3 text-sm text-secondary hover:bg-white/5 hover:text-accent-light transition-colors"
                              >
                                {item.name}
                              </Link>
                            )
                          ))}
                          <div className="border-t border-white/10 my-1"></div>
                          <Link
                            to={link.path}
                            className="block px-4 py-3 text-sm text-accent-light hover:bg-white/5 transition-colors font-bold"
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
                    className={`text-[10px] xl:text-xs font-bold tracking-widest uppercase transition-colors hover:text-accent-light whitespace-nowrap ${
                      location.pathname === link.path ? 'text-accent-light' : 'text-secondary'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Auth Button */}
            <div className="ml-4 pl-4 border-l border-white/10">
              {user ? (
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-secondary hover:bg-white/20 text-[10px] xl:text-xs font-bold tracking-widest uppercase transition-all"
                >
                  <LogOut className="h-3 w-3" />
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary hover:bg-accent-light text-[10px] xl:text-xs font-bold tracking-widest uppercase transition-all"
                >
                  <LogIn className="h-3 w-3" />
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Header Icons */}
        <div className="lg:hidden absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <SearchIcon className="h-5 w-5 text-secondary" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="lg:hidden fixed inset-0 z-[60] bg-primary overflow-y-auto"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-primary z-10">
              <span className="text-accent font-serif font-bold italic">Menu</span>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-white/10">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                        className={`w-full flex items-center justify-between px-3 py-4 rounded-xl text-lg font-medium ${
                          location.pathname === link.path
                            ? 'bg-accent/10 text-accent-light border border-accent/20'
                            : 'text-secondary hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center">
                          <link.icon className="mr-4 h-6 w-6 text-accent" />
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
                            className="overflow-hidden bg-black/20 rounded-xl mt-2 ml-4"
                          >
                            {link.dropdown.map((item) => (
                              item.external ? (
                                <a
                                  key={item.name}
                                  href={item.path}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block px-10 py-3.5 text-sm md:text-base text-secondary/80 hover:text-accent-light"
                                >
                                  {item.name}
                                </a>
                              ) : (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  className="block px-10 py-3.5 text-sm md:text-base text-secondary/80 hover:text-accent-light"
                                >
                                  {item.name}
                                </Link>
                              )
                            ))}
                            <Link
                              to={link.path}
                              className="block px-10 py-4 text-sm font-bold text-accent-light border-t border-white/5"
                            >
                              View All {link.name}
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={`flex items-center px-3 py-4 rounded-xl text-lg font-medium ${
                        location.pathname === link.path
                          ? 'bg-accent/10 text-accent-light border border-accent/20'
                          : 'text-secondary hover:bg-white/5'
                      }`}
                    >
                      <link.icon className="mr-4 h-6 w-6 text-accent" />
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Auth Button */}
              <div className="pt-8 pb-4 border-t border-white/10 mt-8">
                {user ? (
                  <div className="space-y-6">
                    <div className="px-3 flex items-center gap-4 py-2">
                      <div className="h-12 w-12 rounded-full border-2 border-accent p-0.5 overflow-hidden">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt="" className="h-full w-full rounded-full object-cover" />
                        ) : (
                          <div className="h-full w-full bg-accent/20 rounded-full flex items-center justify-center text-accent">
                            <User className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-lg font-bold text-secondary">{user.displayName || 'Grace Student'}</p>
                        <p className="text-xs text-secondary/60 font-mono tracking-widest">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center px-4 py-4 rounded-xl text-lg font-medium text-red-400 bg-red-400/5 hover:bg-red-400/10 transition-colors"
                    >
                      <LogOut className="mr-4 h-6 w-6" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="w-full flex items-center px-4 py-4 rounded-xl text-lg font-bold text-primary bg-accent hover:bg-accent-light transition-all shadow-lg"
                  >
                    <LogIn className="mr-4 h-6 w-6" />
                    Sign In to Community
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Search Modal */}
      <AnimatePresence>
        {isSearchModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-xl flex flex-col p-4 md:p-8"
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setIsSearchModalOpen(false)} className="p-3 rounded-full bg-white/10 text-secondary hover:bg-white/20 transition-all">
                <X className="h-8 w-8" />
              </button>
            </div>
            <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center">
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#ffcc00] mb-12 text-center">Global Search</h2>
              <form onSubmit={handleSearch} className="relative group">
                <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-8 w-8 text-secondary/30 group-focus-within:text-accent transition-colors" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Enter keywords, books, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border-b-2 border-white/20 px-20 py-8 text-2xl md:text-4xl font-serif text-secondary placeholder-secondary/20 focus:outline-none focus:border-accent transition-all"
                />
                <button 
                  type="submit" 
                  disabled={!searchQuery.trim()}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-accent text-white rounded-2xl disabled:opacity-50 shadow-xl"
                >
                  <ChevronDown className="h-8 w-8 -rotate-90" />
                </button>
              </form>
              <div className="mt-12 flex flex-wrap justify-center gap-4">
                {['Baptism', 'The Mystery', 'Pauline Revelation', 'Prophecy', 'The Body of Christ'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      searchInputRef.current?.focus();
                    }}
                    className="px-6 py-2 bg-white/5 rounded-full text-secondary/60 hover:text-accent hover:bg-white/10 transition-all text-sm font-medium border border-white/10"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileBottomNav onMenuClick={() => setIsOpen(true)} onSearchClick={() => setIsSearchModalOpen(true)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  );
}
