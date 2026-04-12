import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import app from './firebaseConfig';

const auth = getAuth(app);

export const listenAuthState = (callback) => onAuthStateChanged(auth, callback);

export const loginWithEmail = async (email, password) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
};

export const signupWithEmail = async (email, password) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  return credential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const requestPasswordReset = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

export const getCurrentUser = () => auth.currentUser;

export default auth;