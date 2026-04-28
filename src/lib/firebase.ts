import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { getFirestore, collection, onSnapshot, query, where, orderBy, doc, getDoc, getDocFromServer, deleteDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const config = firebaseConfig as any;
const app = initializeApp(config);
console.log("Firebase initialized with project:", config.projectId);
console.log("Using Firestore database:", config.firestoreDatabaseId || "(default)");
export const db = getFirestore(app, config.firestoreDatabaseId);
export const auth = getAuth(app);

export { 
  collection, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  doc,
  deleteDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  try {
    return await signInWithPopup(auth, provider);
  } catch (error: any) {
    if (error.code === 'auth/unauthorized-domain') {
      const currentDomain = window.location.hostname;
      throw new Error(`This domain (${currentDomain}) is not authorized for Google Sign-In. Please add it to your Firebase Console under Authentication -> Settings -> Authorized domains.`);
    }
    throw error;
  }
};
export const signOut = () => firebaseSignOut(auth);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
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

export function handleFirestoreError(error: any, operationType: OperationType, path: string | null) {
  // Silence offline errors to prevent user confusion
  if (error?.message?.includes('offline') || error?.message?.includes('unreachable')) {
    console.warn(`Firestore is currently offline or unreachable for ${operationType} on ${path}. This is expected in some environments.`);
    return;
  }
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
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// --- Initialization ---
// The app will function in offline/local mode if Firebase is unreachable.
// No active connection test to avoid intentional "offline" errors in restricted environments.
