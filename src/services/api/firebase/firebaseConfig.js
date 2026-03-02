import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseApiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "easyfit-edd8e.firebaseapp.com",
  projectId: "easyfit-edd8e",
  storageBucket: "easyfit-edd8e.firebasestorage.app",
  messagingSenderId: "601126388529",
  appId: "1:601126388529:web:ac7bfb1976d87ff70ce610",
  measurementId: "G-XLKRP1BYJC"
};

if (!firebaseConfig.apiKey) {
  throw new Error("Firebase apiKey is missing. Set EXPO_PUBLIC_FIREBASE_API_KEY in your .env file.");
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export default app;