import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import AppNavigator from './src/core/navigation/AppNavigator';
import './src/services/api/firebase/firebaseConfig';
import { testFirestoreConnection } from './src/services/api/firebase/firebaseConnectionTest';

export default function App() {
  useEffect(() => {
    const runConnectionTest = async () => {
      try {
        const result = await testFirestoreConnection();
        console.log('Firestore connection success:', result);
      } catch (error) {
        console.log('Firestore connection failed:', error?.message || error);
      }
    };

    runConnectionTest();
  }, []);

  return <AppNavigator />;
}
