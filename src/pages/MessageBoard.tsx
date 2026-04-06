import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Quote, Reply, PlusCircle, Trash2 } from 'lucide-react';
import { db, collection, onSnapshot, query, orderBy, handleFirestoreError, OperationType, deleteDoc, doc } from '../lib/firebase';
import CommentModal from '../components/CommentModal';
import { useAuth } from '../lib/AuthProvider';

export default function MessageBoard() {
  const { user } = useAuth();
  const isAdmin = user?.email === 'jjdster@gmail.com';

  const [comments, setComments] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<{id: string, name: string} | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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

  const handleDelete = async (id: string) => {
    try {
      setDeleteError(null);
      await deleteDoc(doc(db, 'comments', id));
      setDeletingId(null);
    } catch (error) {
      console.error("Error deleting comment:", error);
      setDeleteError("Failed to delete comment. Please try again.");
      setTimeout(() => setDeleteError(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-light py-24 px-4 sm:px-6 lg:px-8">
      {deleteError && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
          <span className="text-sm font-bold">{deleteError}</span>
          <button onClick={() => setDeleteError(null)} className="hover:opacity-70">
            <PlusCircle className="h-4 w-4 rotate-45" />
          </button>
        </div>
      )}
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
                className="bg-white p-6 sm:p-8 rounded-3xl border border-primary/5 shadow-sm relative"
              >
                {isAdmin && (
                  <div className="absolute top-6 right-6 flex items-center gap-2">
                    {deletingId === post.id ? (
                      <div className="flex items-center gap-2 bg-red-50 p-2 rounded-xl border border-red-100">
                        <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Confirm?</span>
                        <button 
                          onClick={() => handleDelete(post.id)}
                          className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                        <button 
                          onClick={() => setDeletingId(null)}
                          className="px-3 py-1 bg-gray-200 text-gray-600 text-[10px] font-bold rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setDeletingId(post.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete post"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                )}
                <div className="flex justify-between items-start mb-4 pr-8">
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
                        {isAdmin && (
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            {deletingId === reply.id ? (
                              <div className="flex items-center gap-2 bg-red-50 p-1.5 rounded-lg border border-red-100">
                                <button 
                                  onClick={() => handleDelete(reply.id)}
                                  className="px-2 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded hover:bg-red-600 transition-colors"
                                >
                                  Delete
                                </button>
                                <button 
                                  onClick={() => setDeletingId(null)}
                                  className="px-2 py-0.5 bg-gray-200 text-gray-600 text-[9px] font-bold rounded hover:bg-gray-300 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => setDeletingId(reply.id)}
                                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                title="Delete reply"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-2 pr-6">
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
