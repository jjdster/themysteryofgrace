import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  type: 'book' | 'study' | 'video' | 'page';
  path: string;
  description?: string;
}

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isSearching: boolean;
  performSearch: (q: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  // Mock index for demonstration - in a real app, this could be fetched or generated
  const searchIndex: SearchResult[] = [
    { id: 'h1', title: 'Home', type: 'page', path: '/' },
    { id: 'g1', title: 'The Gospel', type: 'page', path: '/gospel' },
    { id: 'm1', title: 'The Mystery', type: 'page', path: '/mystery' },
    { id: 'v1', title: 'Videos', type: 'page', path: '/videos' },
    { id: 's1', title: 'Bible Studies', type: 'page', path: '/studies' },
    { id: 'l1', title: 'Library', type: 'page', path: '/library' },
    { id: 'sc1', title: 'Study Center', type: 'page', path: '/study-center' },
    { id: 'b1', title: 'Water Baptism Study', type: 'study', path: '/baptism-study' },
    { id: 'b2', title: 'Prophecy vs. Mystery', type: 'study', path: '/prophecy-mystery-study' },
    { id: 'b3', title: 'The New Body', type: 'study', path: '/new-body-study' },
    // Books from Library (subset)
    { id: 'lb1', title: 'Things That Differ', type: 'book', path: '/library', description: 'C.R. Stam' },
    { id: 'lb2', title: 'The Two-Fold Purpose of God', type: 'book', path: '/library', description: 'C.R. Stam' },
    { id: 'lb3', title: 'So Run That You May Win', type: 'book', path: '/library', description: 'Roland Wilson' },
  ];

  const performSearch = (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const filtered = searchIndex.filter(item => 
      item.title.toLowerCase().includes(q.toLowerCase()) || 
      item.description?.toLowerCase().includes(q.toLowerCase())
    );
    
    setResults(filtered);
    setIsSearching(false);
    
    if (location.pathname !== '/search') {
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <SearchContext.Provider value={{ query, setQuery, results, isSearching, performSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
