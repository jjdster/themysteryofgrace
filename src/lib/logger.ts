import { db, auth } from './firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

// --- Logging Utility ---
export const studyLogger = {
  // Legacy log method for simple events
  log: async (lessonTitle: string, interaction: { type: 'question' | 'quiz' | 'chat', data: any }) => {
    const user = auth.currentUser;
    const path = 'study_logs';
    try {
      await addDoc(collection(db, path), {
        userId: user?.uid || null,
        userEmail: user?.email || 'Guest',
        lessonTitle,
        type: interaction.type,
        data: interaction.data,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("Remote log failed:", error);
    }
  },

  // New session-based logging for "Chain of Reasoning"
  logSessionInteraction: async (sessionId: string, lessonTitle: string, interaction: { type: 'question' | 'quiz' | 'chat', data: any }) => {
    const user = auth.currentUser;
    const sessionRef = doc(db, 'study_sessions', sessionId);
    
    const interactionEntry = {
      ...interaction,
      timestamp: new Date().toISOString()
    };

    try {
      // Try to update first, if it fails (doesn't exist), create it
      await updateDoc(sessionRef, {
        lastUpdateTime: serverTimestamp(),
        interactions: arrayUnion(interactionEntry)
      }).catch(async (err) => {
        // If document doesn't exist, create it
        if (err.code === 'not-found') {
          await setDoc(sessionRef, {
            userId: user?.uid || null,
            userEmail: user?.email || 'Guest',
            lessonTitle,
            startTime: serverTimestamp(),
            lastUpdateTime: serverTimestamp(),
            interactions: [interactionEntry]
          });
        } else {
          throw err;
        }
      });
    } catch (error) {
      console.error("Session log failed:", error);
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
