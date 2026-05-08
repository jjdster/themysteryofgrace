import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Video, Link as LinkIcon, Search, HelpCircle } from 'lucide-react';

export default function Navigation() {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/study', icon: HelpCircle, label: 'Study' },
    { to: '/library', icon: BookOpen, label: 'Library' },
    { to: '/videos', icon: Video, label: 'Videos' },
    { to: '/search', icon: Search, label: 'Search' },
    { to: '/links', icon: LinkIcon, label: 'Links' },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex sticky top-0 w-full bg-primary text-secondary z-50 px-6 py-4 justify-between items-center border-b border-primary-light/30">
        <NavLink to="/" className="text-xl font-serif font-bold tracking-wider">
          The Mystery of Grace
        </NavLink>
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-accent' : 'hover:text-accent-light'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-primary text-secondary z-50 border-t border-primary-light pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                  isActive ? 'text-accent' : 'text-secondary/70 hover:text-accent-light'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
