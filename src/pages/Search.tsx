import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Book, Video, FileText, ChevronRight } from 'lucide-react';
import { useSearch } from '../lib/SearchProvider';

export default function Search() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const { results, performSearch, isSearching } = useSearch();

  useEffect(() => {
    if (queryParam) {
      performSearch(queryParam);
    }
  }, [queryParam]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book': return <Book className="h-5 w-5 text-accent" />;
      case 'video': return <Video className="h-5 w-5 text-red-500" />;
      case 'study': return <FileText className="h-5 w-5 text-blue-500" />;
      default: return <ChevronRight className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <SearchIcon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-serif font-bold text-primary">
            Search Results for "{queryParam}"
          </h1>
        </div>

        {isSearching ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={result.path}
                  className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-accent/10 transition-colors">
                        {getTypeIcon(result.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                          {result.title}
                        </h3>
                        <p className="text-sm text-gray-500 capitalize">
                          {result.type} {result.description ? `• ${result.description}` : ''}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-accent transition-all group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <SearchIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-500">
              Try searching for something else, like "Gospel", "Mystery", or "Stam".
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
