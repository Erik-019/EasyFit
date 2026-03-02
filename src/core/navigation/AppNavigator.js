import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Text, View } from 'react-native';

import HomeScreen from '../../features/home/HomeScreen';
import BeginnerExercisesScreen from '../../features/beginnerExercises/BeginnerExercisesScreen';
import BodyPartsScreen from '../../features/bodyParts/BodyPartsScreen';
import ExerciseListScreen from '../../features/exerciseList/ExerciseListScreen';
import ExerciseDetailScreen from '../../features/exerciseDetail/ExerciseDetailScreen';
import LoginScreen from '../../features/auth/LoginScreen';
import FavoritesScreen from '../../features/favorites/FavoritesScreen';
import { COLORS } from '../constants/theme';
import { listenAuthState, logoutUser } from '../../services/api/firebase/authService';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [authStateResolved, setAuthStateResolved] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = listenAuthState((nextUser) => {
      setUser(nextUser);
      setAuthStateResolved(true);
    });

    return unsubscribe;
  }, []);

  if (!authStateResolved) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? 'Home' : 'Login'}
        screenOptions={({ navigation, route }) => ({
          headerStyle: { backgroundColor: COLORS.black },
          headerTintColor: COLORS.white,
          headerTitleStyle: { fontWeight: '700' },
          headerBackVisible: false,
          headerLeft:
            route.name === 'Home'
              ? undefined
              : () => (
                  <Pressable
                    onPress={() => navigation.goBack()}
                    style={{ paddingHorizontal: 6, paddingVertical: 4 }}
                    hitSlop={8}
                  >
                    <Text style={{ color: COLORS.white, fontWeight: '700' }}>{'< Back'}</Text>
                  </Pressable>
                ),
          headerRight:
            route.name === 'Home' && user
              ? () => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Pressable
                      onPress={() => navigation.navigate('Favorites')}
                      style={{ paddingHorizontal: 6, paddingVertical: 4, marginRight: 6 }}
                      hitSlop={8}
                    >
                      <Text style={{ color: COLORS.white, fontWeight: '700' }}>Favorites</Text>
                    </Pressable>
                    <Pressable
                      onPress={logoutUser}
                      style={{ paddingHorizontal: 6, paddingVertical: 4 }}
                      hitSlop={8}
                    >
                      <Text style={{ color: COLORS.white, fontWeight: '700' }}>Logout</Text>
                    </Pressable>
                  </View>
                )
              : undefined,
        })}
      >
        {!user ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login', headerLeft: () => null }}
          />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'EasyFit' }} />
            <Stack.Screen
              name="BeginnerWorkout"
              component={BeginnerExercisesScreen}
              options={{ title: 'Beginner Workout' }}
            />
            <Stack.Screen name="BodyParts" component={BodyPartsScreen} options={{ title: 'Body Parts' }} />
            <Stack.Screen
              name="ExerciseList"
              component={ExerciseListScreen}
              options={{ title: 'Exercises' }}
            />
            <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} options={{ title: 'Exercise' }} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'My Favorites' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
