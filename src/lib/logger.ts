import { db, auth, OperationType, handleFirestoreError } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// --- Logging Utility ---
export const studyLogger = {
  log: async (lessonTitle: string, interaction: { type: 'question' | 'quiz' | 'chat', data: any }) => {
    // 1. Local Storage Logging (Immediate fallback)
    const logs = JSON.parse(localStorage.getItem('study_logs') || '[]');
    const logEntry = {
      timestamp: new Date().toISOString(),
      lesson: lessonTitle,
      ...interaction
    };
    logs.push(logEntry);
    localStorage.setItem('study_logs', JSON.stringify(logs));

    // 2. Remote Logging to Firestore
    const user = auth.currentUser;
    const path = 'study_logs';
    try {
      await addDoc(collection(db, path), {
        userId: user?.uid || null,
        userEmail: user?.email || 'Guest', // For admin convenience
        lessonTitle,
        type: interaction.type,
        data: interaction.data,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      // We don't use handleFirestoreError here to avoid crashing the UI for guests
      // if there's a temporary network/permission issue, but we log it.
      console.error("Remote log failed:", error);
    }
  },
  getLogs: () => JSON.parse(localStorage.getItem('study_logs') || '[]'),
  clearLogs: () => localStorage.removeItem('study_logs'),
  download: () => {
    const logs = studyLogger.getLogs();
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `study_logs_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  }
};
