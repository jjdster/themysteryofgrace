import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Send, Heart, AlertCircle, CheckCircle2 } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { db, collection } from '../lib/firebase';
import { addDoc, serverTimestamp } from 'firebase/firestore';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  parentId?: string | null;
  replyToName?: string | null;
}

export default function CommentModal({ isOpen, onClose, parentId, replyToName }: CommentModalProps) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('General');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Moderate with Gemini
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('Gemini API key is missing. Please check your environment configuration.');
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the following comment for its attitude. 
        The standard is: "expressed in an attitude of love and concern rather than berating and condemning".
        Comment: "${comment}"
        
        Return a JSON object with:
        - "status": "approved" if it meets the standard, "flagged" if it is berating, condemning, or lacks love/concern.
        - "attitude": A brief explanation of why you chose this status.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              status: { type: Type.STRING, enum: ["approved", "flagged"] },
              attitude: { type: Type.STRING }
            },
            required: ["status", "attitude"]
          }
        }
      });

      let moderation;
      try {
        moderation = JSON.parse(response.text || '{}');
      } catch (parseErr) {
        console.error('AI Response Parse Error:', response.text);
        throw new Error('Failed to parse moderation response');
      }

      // 2. Write directly to Firestore
      const collectionName = moderation.status === 'approved' ? 'comments' : 'flagged_comments';
      await addDoc(collection(db, collectionName), {
        authorName: name || 'Anonymous',
        text: comment,
        category: category,
        status: moderation.status,
        attitude: moderation.attitude,
        createdAt: serverTimestamp(),
        parentId: parentId || null
      });

      // 3. Send to Google Docs Webhook if configured
      const webhookUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      if (webhookUrl) {
        try {
          fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
              type: 'comment',
              timestamp: new Date().toISOString(),
              userEmail: name || 'Anonymous',
              data: {
                comment: comment,
                status: moderation.status,
                attitude: moderation.attitude,
                parentId: parentId || null
              }
            })
          }).catch(e => console.error("Webhook error:", e));
        } catch (e) {
          console.error("Webhook error:", e);
        }
      }

      // 4. Send email via backend if flagged
      if (moderation.status === 'flagged') {
        const emailResponse = await fetch('/api/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            authorName: name || 'Anonymous',
            text: comment,
            attitude: moderation.attitude
          })
        });
        
        if (!emailResponse.ok) {
          console.warn('Failed to send moderation email, but comment was saved.');
        }
      }

      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setName('');
        setComment('');
      }, 3000);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'An error occurred while submitting your comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-primary/10"
        >
          <div className="bg-primary p-6 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-6 w-6 text-accent" />
              <h2 className="text-xl font-serif font-bold">
                {replyToName ? `Reply to ${replyToName}` : 'Contribute Your Thoughts'}
              </h2>
            </div>
            <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-serif font-bold text-primary mb-2">Thank You</h3>
                <p className="text-primary/70">
                  Your contribution has been received. We appreciate your heart for the Body of Christ.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-primary/70 mb-2 uppercase tracking-widest">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Anonymous"
                    className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary/70 mb-2 uppercase tracking-widest">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all bg-white"
                  >
                    {['General', 'Theology', 'Fellowship', 'Prayer', 'Questions'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary/70 mb-2 uppercase tracking-widest">
                    Your Reaction or Thought
                  </label>
                  <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Express your thoughts in an attitude of love and concern..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                <div className="bg-secondary/30 p-4 rounded-xl flex items-start space-x-3">
                  <Heart className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <p className="text-xs text-primary/70 italic leading-relaxed">
                    "Endeavouring to keep the unity of the Spirit in the bond of peace." We encourage all contributions to be expressed with love and concern for the edification of the Body.
                  </p>
                </div>

                {error && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Submit Contribution</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
