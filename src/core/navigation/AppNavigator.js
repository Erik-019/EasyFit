import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../features/home/HomeScreen';
import BeginnerExercisesScreen from '../../features/beginnerExercises/BeginnerExercisesScreen';
import BodyPartsScreen from '../../features/bodyParts/BodyPartsScreen';
import ExerciseListScreen from '../../features/exerciseList/ExerciseListScreen';
import ExerciseDetailScreen from '../../features/exerciseDetail/ExerciseDetailScreen';
import { COLORS } from '../constants/theme';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.black },
          headerTintColor: COLORS.white,
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'EasyFit' }} />
        <Stack.Screen
          name="BeginnerWorkout"
          component={BeginnerExercisesScreen}
          options={{ title: 'Beginner Workout' }}
        />
        <Stack.Screen name="BodyParts" component={BodyPartsScreen} options={{ title: 'Body Parts' }} />
        <Stack.Screen name="ExerciseList" component={ExerciseListScreen} options={{ title: 'Exercises' }} />
        <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} options={{ title: 'Exercise' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
