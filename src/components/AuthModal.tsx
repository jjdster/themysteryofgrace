import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Loader2, Eye, EyeOff, Sparkles, ShieldCheck, Info } from 'lucide-react';
import { signInWithGoogle, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, auth } from '../lib/firebase';
import { useAuth } from '../lib/AuthProvider';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { authError, setAuthError } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setAuthError(null);
      setEmail('');
      setPassword('');
      setShowPassword(false);
      setShowResetPassword(false);
      setResetMessage(null);
    }
  }, [isOpen, setAuthError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);
    setResetMessage(null);
    setShowResetPassword(false);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          onClose();
        } catch (signInError: any) {
          if (signInError.code === 'auth/invalid-credential' || signInError.code === 'auth/wrong-password') {
            setAuthError("Incorrect password for this email.");
            setShowResetPassword(true);
          } else {
            setAuthError(signInError.message);
          }
        }
      } else {
        setAuthError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setAuthError("Please enter your email to reset password.");
      return;
    }
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Verification sent. Check your inbox.");
      setShowResetPassword(false);
    } catch (error: any) {
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (error: any) {
      if (error.message?.includes('suspended')) {
        setAuthError("This application's database connection is temporarily suspended. We are working to resolve this. Use the 'Reset Connection' button if you are stuck.");
      } else {
        setAuthError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative border border-white/20"
          >
            {/* Header Ornament */}
            <div className="h-2 bg-gradient-to-r from-accent via-accent-light to-accent"></div>
            
            <button 
              onClick={onClose} 
              className="absolute top-8 right-8 p-3 rounded-full bg-secondary hover:bg-secondary-light transition-colors text-primary/40"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-12">
              <div className="flex flex-col items-center mb-12">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 shadow-inner">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h2 className="text-4xl font-serif font-bold text-primary mb-2">Grace Student Portal</h2>
                <p className="text-primary/40 text-sm font-serif italic">Access the fellowship of the mystery</p>
              </div>
              
              {authError && (
                <motion.div 
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="mb-8 p-6 bg-red-400/5 border border-red-400/20 text-red-600 text-xs font-bold tracking-wider uppercase rounded-2xl flex items-center gap-3"
                >
                  <Info className="h-4 w-4" />
                  {authError}
                </motion.div>
              )}
              
              {resetMessage && (
                <motion.div 
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mb-8 p-6 bg-accent/5 border border-accent/20 text-accent font-bold text-xs tracking-wider uppercase rounded-2xl flex items-center gap-3"
                >
                  <Sparkles className="h-4 w-4" />
                  {resetMessage}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/20 group-focus-within:text-accent transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ecclesia@faith.com"
                    className="w-full pl-16 pr-6 py-5 bg-secondary border border-transparent focus:bg-white focus:border-accent/10 rounded-2xl text-primary font-medium outline-none transition-all"
                    required
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/20 group-focus-within:text-accent transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Credential"
                    className="w-full pl-16 pr-16 py-5 bg-secondary border border-transparent focus:bg-white focus:border-accent/10 rounded-2xl text-primary font-medium outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/20 hover:text-accent"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-secondary py-5 rounded-2xl font-bold tracking-[0.2em] uppercase text-xs hover:bg-primary-light transition-all shadow-xl shadow-primary/20 active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Enter Portal'}
                  </button>
                </div>
                
                {showResetPassword && (
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="w-full text-accent font-bold tracking-widest uppercase text-[10px] py-2 hover:underline"
                  >
                    Request Password Reset
                  </button>
                )}
              </form>

              <div className="my-12 flex items-center gap-6">
                <div className="flex-1 h-px bg-primary/5" />
                <span className="text-primary/20 text-[10px] font-bold tracking-[0.3em]">SECURE PORTAL</span>
                <div className="flex-1 h-px bg-primary/5" />
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full bg-white border border-primary/5 py-5 rounded-2xl font-bold tracking-[0.2em] uppercase text-[10px] text-primary hover:bg-secondary transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-4"
              >
                <div className="w-5 h-5 bg-accent/10 rounded flex items-center justify-center text-accent">
                   <User className="h-4 w-4" />
                </div>
                Sign in with Google
              </button>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.reload();
                  }}
                  className="text-[9px] text-primary/30 uppercase tracking-[0.2em] hover:text-accent font-bold transition-colors"
                >
                  Stuck in a loop? Click here to Reset Connection
                </button>
              </div>
            </div>
            
            <div className="bg-primary p-6 text-center">
              <p className="text-secondary/30 text-[10px] font-bold tracking-widest uppercase">
                Rightly Dividing the Word of Truth
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
