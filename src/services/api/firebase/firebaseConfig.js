import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDXJsyNm7R04WkEo_P4EcIRM4-z3Lp_4bo",
  authDomain: "easyfit-edd8e.firebaseapp.com",
  projectId: "easyfit-edd8e",
  storageBucket: "easyfit-edd8e.firebasestorage.app",
  messagingSenderId: "601126388529",
  appId: "1:601126388529:web:ac7bfb1976d87ff70ce610",
  measurementId: "G-XLKRP1BYJC"
};

if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes("...")) {
  throw new Error("Firebase apiKey is not set correctly. Replace placeholder apiKey in firebaseConfig.js.");
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export default app;