import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Mail, Home, Info, Youtube, Heart, User, Video, HelpCircle, ChevronDown, Search as SearchIcon, LogIn, LogOut, Shield } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../lib/AuthProvider';
import { signInWithGoogle, signOut } from '../lib/firebase';

export default function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAdmin = user?.email === 'jjdster@gmail.com';

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'The Gospel', path: '/gospel', icon: Heart },
    { 
      name: 'The Mystery', 
      path: '/mystery', 
      icon: Info,
      dropdown: [
        { name: 'The Mystery Revealed (Rom 16:25)', path: '/mystery' },
        { name: 'The Apostle of the Gentiles (Acts 9:15-16)', path: '/mystery' },
        { name: 'The Dispensation of Grace (Eph 3:1-2)', path: '/mystery' }
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
        { name: 'Law vs. Grace (Rom 6:14)', path: '/studies' }
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
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
                    onMouseEnter={() => setOpenDropdown(link.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={`flex items-center px-4 py-2 rounded-full text-[10px] xl:text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap ${
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
                  onClick={() => signInWithGoogle()}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary hover:bg-accent-light text-[10px] xl:text-xs font-bold tracking-widest uppercase transition-all"
                >
                  <LogIn className="h-3 w-3" />
                  Sign In
                </button>
              )}
            </div>
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
                        onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
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
                        <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openDropdown === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-black/20 rounded-md mt-1"
                          >
                            {link.dropdown.map((item) => (
                              item.external ? (
                                <a
                                  key={item.name}
                                  href={item.path}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block px-11 py-3 text-sm text-secondary hover:text-accent-light"
                                >
                                  {item.name}
                                </a>
                              ) : (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  className="block px-11 py-3 text-sm text-secondary hover:text-accent-light"
                                >
                                  {item.name}
                                </Link>
                              )
                            ))}
                            <Link
                              to={link.path}
                              className="block px-11 py-3 text-sm text-accent-light font-bold"
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

              {/* Mobile Auth Button */}
              <div className="pt-4 pb-2 border-t border-white/10 mt-4">
                {user ? (
                  <div className="space-y-4">
                    <div className="px-3 flex items-center gap-3">
                      {user.photoURL && <img src={user.photoURL} alt="" className="h-8 w-8 rounded-full" />}
                      <div>
                        <p className="text-sm font-bold text-secondary">{user.displayName}</p>
                        <p className="text-[10px] text-secondary/60 uppercase tracking-widest">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center px-3 py-4 rounded-md text-base font-medium text-red-400 hover:bg-white/5"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => signInWithGoogle()}
                    className="w-full flex items-center px-3 py-4 rounded-md text-base font-medium text-accent-light hover:bg-white/5"
                  >
                    <LogIn className="mr-3 h-5 w-5" />
                    Sign In with Google
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
