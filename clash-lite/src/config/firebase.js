import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
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
    signInAnonymously(auth).catch(console.error);
    onAuthStateChanged(auth, onUserChange);
  }
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
