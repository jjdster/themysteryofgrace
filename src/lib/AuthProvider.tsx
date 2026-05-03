import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { XCircle } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: string | null;
  setAuthError: (error: string | null) => void;
  clearAuthState: () => void;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  authError: null,
  setAuthError: () => {},
  clearAuthState: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSuspended, setIsSuspended] = useState(false);

  const clearAuthState = () => {
    localStorage.clear();
    sessionStorage.clear();
    try {
      auth.signOut();
    } catch (e) {
      console.warn("Sign out failed during reset:", e);
    }
    window.location.reload();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error("Auth state change error:", error);
      if (error.message?.includes('suspended')) {
        setIsSuspended(true);
        setAuthError("The technical connection to the database has been restricted (suspended). Please contact support or try again later.");
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, authError, setAuthError, clearAuthState }}>
      {isSuspended && (
        <div className="fixed inset-0 z-[200] bg-primary flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white p-10 rounded-3xl shadow-2xl border-2 border-accent/20">
            <XCircle className="h-16 w-16 text-accent mx-auto mb-6" />
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">Connection Restricted</h2>
            <p className="text-primary/60 mb-8 leading-relaxed italic">
              "To make all men see what is the fellowship of the mystery..."
            </p>
            <p className="text-sm text-primary/80 mb-8">
              We are experiencing a temporary restriction with the database connection (API Key Suspended). 
              This is an infrastructure issue currently being addressed.
            </p>
            <button 
              onClick={clearAuthState}
              className="w-full py-4 bg-primary text-secondary rounded-2xl font-bold uppercase tracking-widest hover:bg-primary-light transition-all shadow-xl"
            >
              Reset App Connection
            </button>
          </div>
        </div>
      )}
      {authError && !isSuspended && (
        <div className="fixed top-4 right-4 z-[100] bg-red-900/90 border border-red-500 text-white px-4 py-3 rounded-md shadow-lg flex items-start max-w-md">
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
