import { db, auth } from './firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null, shouldThrow = true) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  if (shouldThrow) {
    throw new Error(JSON.stringify(errInfo));
  }
}

// --- Logging Utility ---
export const studyLogger = {
  getLogs: () => JSON.parse(localStorage.getItem('study_logs') || '[]'),
  clearLogs: () => localStorage.removeItem('study_logs'),
  
  saveLocal: (lessonTitle: string, interaction: { type: 'question' | 'quiz' | 'chat', data: any }) => {
    try {
      const logs = studyLogger.getLogs();
      logs.push({
        lessonTitle,
        type: interaction.type,
        data: interaction.data,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('study_logs', JSON.stringify(logs.slice(-100))); // Keep last 100
    } catch (e) {
      console.warn("Storage error:", e);
    }
  },

  // Legacy log method for simple events
  log: async (lessonTitle: string, interaction: { type: 'question' | 'quiz' | 'chat', data: any }) => {
    const user = auth.currentUser;
    const path = 'study_logs';

    // 1. Always save locally first
    studyLogger.saveLocal(lessonTitle, interaction);

    // 2. Send to Webhook
    const webhookUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          type: interaction.type,
          timestamp: new Date().toISOString(),
          userEmail: user?.email || 'Guest',
          lessonTitle,
          data: interaction.data
        })
      }).catch(() => {});
    }

    // 3. Optional Firestore save
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
      handleFirestoreError(error, OperationType.CREATE, path, false);
    }
  },

  logSessionInteraction: async (sessionId: string, lessonTitle: string, interaction: { type: 'question' | 'quiz' | 'chat', data: any }) => {
    const user = auth.currentUser;
    const path = `study_sessions/${sessionId}`;
    const sessionRef = doc(db, 'study_sessions', sessionId);
    
    // 1. Save locally
    studyLogger.saveLocal(`${lessonTitle} (Session: ${sessionId})`, interaction);

    const interactionEntry = {
      ...interaction,
      timestamp: new Date().toISOString()
    };

    // 2. Webhook
    const webhookUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          sessionId,
          type: interaction.type,
          timestamp: interactionEntry.timestamp,
          userEmail: user?.email || 'Guest',
          lessonTitle,
          data: interaction.data
        })
      }).catch(() => {});
    }

    // 3. Firestore
    try {
      await updateDoc(sessionRef, {
        lastUpdateTime: serverTimestamp(),
        interactions: arrayUnion(interactionEntry),
        userId: user?.uid || null,
        userEmail: user?.email || 'Guest'
      }).catch(async (err) => {
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
          handleFirestoreError(err, OperationType.UPDATE, path, false);
        }
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path, false);
    }
  },

  download: () => {
    const logs = studyLogger.getLogs();
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `study_history_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  }
};
