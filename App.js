import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './src/app/navigation/AppNavigator';
import './src/services/firebase/firebaseConfig';

export default function App() {
  return <AppNavigator />;
}
