import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Quote, Reply, PlusCircle } from 'lucide-react';
import { db, collection, onSnapshot, query, orderBy, handleFirestoreError, OperationType } from '../lib/firebase';
import CommentModal from '../components/CommentModal';

export default function MessageBoard() {
  const [comments, setComments] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<{id: string, name: string} | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.GET, 'comments'));
    
    return () => unsubscribe();
  }, []);

  const topLevelComments = comments.filter(c => !c.parentId);
  const getReplies = (parentId: string) => comments.filter(c => c.parentId === parentId).reverse(); // chronological for replies

  const handleReply = (id: string, name: string) => {
    setReplyingTo({ id, name });
    setIsModalOpen(true);
  };

  const handleNewPost = () => {
    setReplyingTo(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-secondary-light py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">Community Board</h1>
            <p className="text-primary/70 italic">Fellowship and discuss with the Body of Christ.</p>
          </div>
          <button 
            onClick={handleNewPost} 
            className="px-6 py-3 bg-accent text-white rounded-full font-bold hover:bg-accent-light transition-all flex items-center gap-2 shadow-md"
          >
            <PlusCircle className="h-5 w-5" />
            New Topic
          </button>
        </div>

        <div className="space-y-8">
          {topLevelComments.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-primary/5 shadow-sm">
              <MessageSquare className="h-12 w-12 text-primary/20 mx-auto mb-4" />
              <p className="text-primary/60 italic text-lg">No topics yet.</p>
              <p className="text-primary/50 mt-2">Be the first to start a discussion!</p>
            </div>
          ) : (
            topLevelComments.map(post => (
              <motion.div 
                key={post.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-primary/5 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-serif font-bold text-primary text-lg">{post.authorName}</span>
                  <span className="text-xs text-primary/40">
                    {post.createdAt ? new Date(post.createdAt?.toDate?.() || post.createdAt).toLocaleDateString() : 'Just now'}
                  </span>
                </div>
                <p className="text-primary/80 mb-6 leading-relaxed whitespace-pre-wrap">
                  {post.text}
                </p>
                <button 
                  onClick={() => handleReply(post.id, post.authorName)} 
                  className="text-accent text-sm font-bold flex items-center gap-1 hover:underline"
                >
                  <Reply className="h-4 w-4" /> Reply
                </button>

                {/* Replies */}
                {getReplies(post.id).length > 0 && (
                  <div className="mt-6 pt-6 border-t border-primary/5 space-y-6 pl-4 sm:pl-8 border-l-2 border-accent/20">
                    {getReplies(post.id).map(reply => (
                      <div key={reply.id} className="bg-secondary-light/30 p-4 rounded-2xl relative">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-serif font-bold text-primary text-sm">{reply.authorName}</span>
                          <span className="text-xs text-primary/40">
                            {reply.createdAt ? new Date(reply.createdAt?.toDate?.() || reply.createdAt).toLocaleDateString() : 'Just now'}
                          </span>
                        </div>
                        <p className="text-primary/70 text-sm leading-relaxed whitespace-pre-wrap">
                          {reply.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
      <CommentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        parentId={replyingTo?.id}
        replyToName={replyingTo?.name}
      />
    </div>
  );
}
