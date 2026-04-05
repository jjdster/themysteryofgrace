import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { XCircle } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: string | null;
  setAuthError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  authError: null,
  setAuthError: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, authError, setAuthError }}>
      {authError && (
        <div className="fixed top-4 right-4 z-50 bg-red-900/90 border border-red-500 text-white px-4 py-3 rounded-md shadow-lg flex items-start max-w-md">
          <XCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-bold mb-1">Authentication Error</h3>
            <p className="text-xs text-red-200">{authError}</p>
          </div>
          <button onClick={() => setAuthError(null)} className="ml-3 text-red-400 hover:text-white">
            <XCircle className="h-4 w-4" />
          </button>
        </div>
      )}
      {!loading && children}
    </AuthContext.Provider>
  );
};
