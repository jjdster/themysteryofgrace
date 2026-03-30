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
      handleFirestoreError(error, OperationType.CREATE, path, false); // Don't throw
    }
  },

  // New session-based logging for "Chain of Reasoning"
  logSessionInteraction: async (sessionId: string, lessonTitle: string, interaction: { type: 'question' | 'quiz' | 'chat', data: any }) => {
    const user = auth.currentUser;
    const path = `study_sessions/${sessionId}`;
    const sessionRef = doc(db, 'study_sessions', sessionId);
    
    const interactionEntry = {
      ...interaction,
      timestamp: new Date().toISOString()
    };

    try {
      // Try to update first, if it fails (doesn't exist), create it
      await updateDoc(sessionRef, {
        lastUpdateTime: serverTimestamp(),
        interactions: arrayUnion(interactionEntry),
        // Update user info in case they logged in mid-session
        userId: user?.uid || null,
        userEmail: user?.email || 'Guest'
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
          handleFirestoreError(err, OperationType.UPDATE, path, false); // Don't throw
        }
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path, false); // Don't throw
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
