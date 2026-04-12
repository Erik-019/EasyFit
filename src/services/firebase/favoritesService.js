import { collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import db from './firestoreService';

const userFavoritesCollection = (uid) => collection(db, 'users', uid, 'favorites');
const favoriteDoc = (uid, exerciseId) => doc(db, 'users', uid, 'favorites', exerciseId);

export const addFavorite = async (uid, exerciseId) => {
  await setDoc(favoriteDoc(uid, exerciseId), {
    exerciseId,
    createdAt: serverTimestamp(),
  });
};

export const removeFavorite = async (uid, exerciseId) => {
  await deleteDoc(favoriteDoc(uid, exerciseId));
};

export const isFavorite = async (uid, exerciseId) => {
  const snapshot = await getDoc(favoriteDoc(uid, exerciseId));
  return snapshot.exists();
};

export const getFavoriteExerciseIds = async (uid) => {
  const snapshot = await getDocs(userFavoritesCollection(uid));
  return snapshot.docs.map((document) => document.id);
};