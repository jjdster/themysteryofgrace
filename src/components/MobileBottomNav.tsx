import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, BookOpen, Search, Menu, MessageSquare, Book } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileBottomNavProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export default function MobileBottomNav({ onMenuClick, onSearchClick }: MobileBottomNavProps) {
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Gospel', path: '/gospel', icon: Heart },
    { name: 'Studies', path: '/studies', icon: BookOpen },
    { name: 'Library', path: '/library', icon: Book },
    { name: 'Community', path: '/community', icon: MessageSquare },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-t border-white/10 pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className="flex flex-col items-center justify-center p-2 min-w-[64px] relative"
            >
              <link.icon className={`h-6 w-6 transition-colors ${isActive ? 'text-accent' : 'text-secondary/60'}`} />
              <span className={`text-[10px] mt-1 font-bold tracking-tight transition-colors ${isActive ? 'text-accent' : 'text-secondary/40'}`}>
                {link.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-2 left-0 right-0 h-1 bg-accent rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
        
        <button
          onClick={onSearchClick}
          className="flex flex-col items-center justify-center p-2 min-w-[64px]"
        >
          <Search className="h-6 w-6 text-secondary/60" />
          <span className="text-[10px] mt-1 font-bold tracking-tight text-secondary/40">
            Search
          </span>
        </button>

        <button
          onClick={onMenuClick}
          className="flex flex-col items-center justify-center p-2 min-w-[64px]"
        >
          <Menu className="h-6 w-6 text-secondary/60" />
          <span className="text-[10px] mt-1 font-bold tracking-tight text-secondary/40">
            More
          </span>
        </button>
      </div>
    </div>
  );
}
