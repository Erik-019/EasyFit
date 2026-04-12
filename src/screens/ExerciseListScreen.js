import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { bodyParts, getExercisesByBodyPart } from '../data/exercises';
import { COLORS, SPACING, BORDER_RADIUS } from '../shared/theme';

export default function ExerciseListScreen({ navigation, route }) {
  const { bodyPart } = route.params || {};
  const exercises = bodyPart ? getExercisesByBodyPart(bodyPart) : [];
  const partName = bodyParts.find((part) => part.id === bodyPart)?.name || 'Exercises';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{partName} Exercises</Text>
      {exercises.map((exercise) => (
        <TouchableOpacity
          key={exercise.id}
          style={styles.card}
          onPress={() => navigation.navigate('ExerciseDetail', { id: exercise.id })}
        >
          <Text style={styles.cardText}>{exercise.name}</Text>
          <Text style={styles.cardChevron}>View</Text>
        </TouchableOpacity>
      ))}
      {!exercises.length && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No exercises found.</Text>
        </View>
      )}
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
  emptyState: {
    paddingVertical: SPACING.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
});
