import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Loader2, Eye, EyeOff } from 'lucide-react';
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
      // Try to create the user first
      await createUserWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        // If user exists, try to sign them in
        try {
          await signInWithEmailAndPassword(auth, email, password);
          onClose();
        } catch (signInError: any) {
          if (signInError.code === 'auth/invalid-credential' || signInError.code === 'auth/wrong-password') {
            setAuthError("Incorrect password for this email. Please try again or reset your password.");
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
      setAuthError("Please enter your email address to reset your password.");
      return;
    }
    setIsLoading(true);
    setAuthError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Password reset email sent! Please check your inbox.");
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
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative border border-gray-100">
              <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Sign In or Sign Up</h2>
              
              {authError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                  {authError}
                </div>
              )}
              
              {resetMessage && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
                  {resetMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@provider.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent outline-none text-gray-900"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent outline-none text-gray-900"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-accent text-white py-2.5 rounded-lg font-bold hover:bg-accent-light transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Continue'}
                </button>
                
                {showResetPassword && (
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    disabled={isLoading}
                    className="w-full bg-secondary-light text-primary py-2.5 rounded-lg font-bold hover:bg-primary/5 transition-colors text-sm"
                  >
                    Reset Password
                  </button>
                )}
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-gray-400 text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full border border-gray-300 py-2.5 rounded-lg font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-700"
              >
                <User className="h-5 w-5" />
                Continue with Google
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
