import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

let auth, db;

try {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (e) {
  console.error('Firebase not configured. Game will run in offline mode.');
}

export { auth, db };

// Firebase helper functions
export const initializeFirebaseAuth = (onUserChange) => {
  if (auth) {
    onAuthStateChanged(auth, onUserChange);
  } else {
    onUserChange(null);
  }
};

export const signUpWithEmail = async (email, password) => {
  if (!auth) throw new Error('Firebase not configured');
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmail = async (email, password) => {
  if (!auth) throw new Error('Firebase not configured');
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  if (!auth) throw new Error('Firebase not configured');
  return signOut(auth);
};

export const saveBattleResult = async (user, result, difficulty) => {
  if (db && user) {
    try {
      await addDoc(collection(db, 'battles'), {
        uid: user.uid,
        result: result,
        difficulty: difficulty,
        timestamp: new Date(),
      });
    } catch (e) {
      console.error('Error saving battle result:', e);
    }
  }
};
