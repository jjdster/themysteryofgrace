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

interface StudySession {
  id: string;
  userId: string;
  userEmail: string;
  lessonTitle: string;
  startTime: Timestamp;
  lastUpdateTime: Timestamp;
  interactions: {
    type: 'question' | 'quiz' | 'chat';
    data: any;
    timestamp: string;
  }[];
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<StudyLog[]>([]);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [viewMode, setViewMode] = useState<'logs' | 'sessions'>('sessions');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user?.email === 'jjdster@gmail.com';

  useEffect(() => {
    if (!isAdmin) return;

    const logsPath = 'study_logs';
    const sessionsPath = 'study_sessions';
    
    const logsQuery = query(collection(db, logsPath), orderBy('timestamp', 'desc'));
    const sessionsQuery = query(collection(db, sessionsPath), orderBy('lastUpdateTime', 'desc'));

    const unsubscribeLogs = onSnapshot(logsQuery, (snapshot) => {
      const newLogs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StudyLog[];
      setLogs(newLogs);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, logsPath);
    });

    const unsubscribeSessions = onSnapshot(sessionsQuery, (snapshot) => {
      const newSessions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StudySession[];
      setSessions(newSessions);
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, sessionsPath);
      setLoading(false);
    });

    return () => {
      unsubscribeLogs();
      unsubscribeSessions();
    };
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
    const isSessions = viewMode === 'sessions';
    const headers = isSessions 
      ? ['Start Date', 'Last Update', 'User', 'Lesson', 'Interactions Count', 'Full Transcript']
      : ['Date', 'User', 'Lesson', 'Type', 'Details'];

    const rows = isSessions 
      ? sessions.map(session => [
          session.startTime?.toDate().toLocaleString() || 'N/A',
          session.lastUpdateTime?.toDate().toLocaleString() || 'N/A',
          session.userEmail || session.userId,
          session.lessonTitle,
          session.interactions.length.toString(),
          session.interactions.map(i => {
            const time = new Date(i.timestamp).toLocaleTimeString();
            if (i.type === 'question') {
              return `[${time}] Q: ${i.data.userQuestion} | A: ${i.data.aiResponse || 'Pending'}`;
            }
            return `[${time}] ${i.type}: ${JSON.stringify(i.data)}`;
          }).join(' || ').replace(/"/g, '""')
        ])
      : logs.map(log => [
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
    link.setAttribute('download', `study_${viewMode}_export_${new Date().toISOString().split('T')[0]}.csv`);
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
          
          <div className="flex items-center gap-4">
            <div className="flex bg-white p-1 rounded-xl border border-primary/10 shadow-sm">
              <button 
                onClick={() => setViewMode('sessions')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'sessions' ? 'bg-primary text-secondary' : 'text-primary/60 hover:bg-primary/5'
                }`}
              >
                Sessions
              </button>
              <button 
                onClick={() => setViewMode('logs')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'logs' ? 'bg-primary text-secondary' : 'text-primary/60 hover:bg-primary/5'
                }`}
              >
                Raw Logs
              </button>
            </div>
            <button 
              onClick={downloadCSV}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-secondary rounded-xl font-bold hover:bg-primary-light transition-all shadow-lg shadow-primary/10"
            >
              <Download className="h-5 w-5" />
              Export to CSV
            </button>
          </div>
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
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-12 w-12 text-accent animate-spin mb-4" />
            <p className="text-primary/60 font-serif italic">Gathering insights...</p>
          </div>
        ) : viewMode === 'sessions' ? (
          <div className="grid gap-8">
            {sessions.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl text-center border border-primary/5">
                <p className="text-primary/40 italic">No sessions found yet.</p>
              </div>
            ) : (
              sessions.map((session, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={session.id}
                  className="bg-white rounded-3xl border border-primary/10 shadow-xl overflow-hidden"
                >
                  <div className="p-6 bg-primary text-secondary flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-bold">{session.lessonTitle}</h3>
                        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-secondary/60 mt-1">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {session.userEmail}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Started: {session.startTime?.toDate().toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest">
                        {session.interactions.length} Interactions
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6 bg-secondary-light/30">
                    {session.interactions.map((interaction, i) => (
                      <div key={i} className="relative pl-8 border-l-2 border-primary/5 last:border-0 pb-6 last:pb-0">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-primary/10" />
                        
                        <div className="flex items-center gap-2 mb-3">
                          {interaction.type === 'question' ? (
                            <MessageSquare className="h-3 w-3 text-accent" />
                          ) : interaction.type === 'quiz' ? (
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          ) : (
                            <Clock className="h-3 w-3 text-primary/40" />
                          )}
                          <span className="text-[10px] uppercase tracking-widest font-bold text-primary/40">
                            {interaction.type} • {new Date(interaction.timestamp).toLocaleTimeString()}
                          </span>
                        </div>

                        {interaction.type === 'question' ? (
                          <div className="space-y-4">
                            <div className="bg-white p-4 rounded-2xl border border-primary/5 shadow-sm">
                              <p className="text-sm font-bold text-primary/80 mb-1">Question:</p>
                              <p className="text-sm text-primary/70">{interaction.data.userQuestion}</p>
                            </div>
                            {interaction.data.aiResponse ? (
                              <div className="bg-accent/5 p-4 rounded-2xl border border-accent/10 shadow-sm">
                                <p className="text-sm font-bold text-accent mb-1">AI Response:</p>
                                <div className="text-sm text-primary/80 leading-relaxed markdown-body italic">
                                  <ReactMarkdown>{interaction.data.aiResponse}</ReactMarkdown>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-[10px] text-accent font-bold uppercase tracking-widest animate-pulse px-4">
                                <Loader2 className="h-3 w-3 animate-spin" />
                                Response Pending...
                              </div>
                            )}
                          </div>
                        ) : interaction.type === 'quiz' ? (
                          <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100">
                            <p className="text-sm font-bold text-green-800 mb-2">Quiz Results</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div>
                                <p className="text-[10px] uppercase text-green-600 font-bold">Score</p>
                                <p className="text-lg font-serif font-bold text-green-900">{Math.round(interaction.data.score)}%</p>
                              </div>
                              <div>
                                <p className="text-[10px] uppercase text-green-600 font-bold">Correct</p>
                                <p className="text-lg font-serif font-bold text-green-900">{interaction.data.correct}/{interaction.data.total}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <pre className="text-[10px] font-mono text-primary/60 overflow-x-auto p-4 bg-white rounded-xl border border-primary/5">
                            {JSON.stringify(interaction.data, null, 2)}
                          </pre>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
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
