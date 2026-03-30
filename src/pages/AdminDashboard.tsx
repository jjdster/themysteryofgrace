import React, { useEffect, useState } from 'react';
import { db, auth, OperationType, handleFirestoreError } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { useAuth } from '../lib/AuthProvider';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Shield, Clock, User, BookOpen, MessageSquare, CheckCircle, Download, AlertCircle, Loader2 } from 'lucide-react';

interface StudyLog {
  id: string;
  userId: string;
  userEmail: string;
  lessonTitle: string;
  type: 'question' | 'quiz' | 'chat';
  data: any;
  timestamp: Timestamp;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<StudyLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user?.email === 'jjdster@gmail.com';

  useEffect(() => {
    if (!isAdmin) return;

    const path = 'study_logs';
    const q = query(collection(db, path), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newLogs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StudyLog[];
      setLogs(newLogs);
      setLoading(false);
    }, (err) => {
      try {
        handleFirestoreError(err, OperationType.LIST, path);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [isAdmin]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-light">
        <p className="text-primary/60">Please sign in to access the dashboard.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-light">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-red-100">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-serif font-bold text-primary mb-2">Access Denied</h1>
          <p className="text-primary/60">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  const downloadCSV = () => {
    const headers = ['Date', 'User', 'Lesson', 'Type', 'Details'];
    const rows = logs.map(log => [
      log.timestamp?.toDate().toLocaleString() || 'N/A',
      log.userEmail || log.userId,
      log.lessonTitle,
      log.type,
      JSON.stringify(log.data).replace(/"/g, '""')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `study_logs_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  return (
    <div className="min-h-screen bg-secondary-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-accent mb-2">
              <Shield className="h-5 w-5" />
              <span className="text-xs font-mono uppercase tracking-widest font-bold">Admin Dashboard</span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-primary tracking-tight">Study Interaction Logs</h1>
          </div>
          
          <button 
            onClick={downloadCSV}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-secondary rounded-xl font-bold hover:bg-primary-light transition-all shadow-lg shadow-primary/10"
          >
            <Download className="h-5 w-5" />
            Export to CSV
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-2xl mb-8 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Database Error</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid gap-6">
            {logs.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl text-center border border-primary/5">
                <p className="text-primary/40 italic">No logs found yet.</p>
              </div>
            ) : (
              logs.map((log) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={log.id} 
                  className="bg-white p-6 rounded-3xl border border-primary/5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${
                            log.type === 'quiz' ? 'bg-green-50 text-green-600' : 
                            log.type === 'question' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                          }`}>
                            {log.type === 'quiz' ? <CheckCircle className="h-5 w-5" /> : 
                             log.type === 'question' ? <MessageSquare className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                          </div>
                          <div>
                            <h3 className="font-serif font-bold text-primary">{log.lessonTitle}</h3>
                            <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-primary/40">
                              <span className="flex items-center gap-1"><User className="h-3 w-3" /> {log.userEmail || 'Anonymous'}</span>
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {log.timestamp?.toDate().toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-secondary-light/30 p-4 rounded-2xl">
                        {log.type === 'quiz' ? (
                          <div className="space-y-2">
                            <p className="text-sm font-bold text-primary/80">{log.data.question}</p>
                            <div className="flex items-center gap-4 text-xs">
                              <span className="text-primary/60">Selected: <span className={log.data.isCorrect ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{log.data.selected}</span></span>
                              {!log.data.isCorrect && <span className="text-green-600 font-bold">Correct: {log.data.correct}</span>}
                            </div>
                          </div>
                        ) : log.type === 'question' ? (
                          <div className="space-y-3">
                            <p className="text-sm font-bold text-primary/80">Q: {log.data.userQuestion}</p>
                            {log.data.aiResponse ? (
                              <div className="text-xs text-primary/60 italic leading-relaxed markdown-body">
                                <ReactMarkdown>
                                  {log.data.aiResponse.substring(0, 300) + (log.data.aiResponse.length > 300 ? '...' : '')}
                                </ReactMarkdown>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-[10px] text-accent font-bold uppercase tracking-widest animate-pulse">
                                <Loader2 className="h-3 w-3 animate-spin" />
                                Response Pending...
                              </div>
                            )}
                          </div>
                        ) : (
                          <pre className="text-[10px] font-mono text-primary/60 overflow-x-auto">
                            {JSON.stringify(log.data, null, 2)}
                          </pre>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
