import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { getBeginnerExercises } from '../data/exercises';
import { COLORS, SPACING, BORDER_RADIUS } from '../shared/theme';

export default function BeginnerExercisesScreen({ navigation }) {
  const beginnerExercises = getBeginnerExercises();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Beginner Workout</Text>
      {beginnerExercises.map((exercise) => (
        <TouchableOpacity
          key={exercise.id}
          style={styles.card}
          onPress={() => navigation.navigate('ExerciseDetail', { id: exercise.id })}
        >
          <Text style={styles.cardText}>{exercise.name}</Text>
          <Text style={styles.cardChevron}>View</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    marginRight: SPACING.sm,
  },
  cardChevron: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});
