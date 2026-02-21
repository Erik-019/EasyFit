import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';
import { getExerciseById } from '../../core/constants/exercises';
import { COLORS, SPACING, BORDER_RADIUS } from '../../core/constants/theme';

export default function ExerciseDetailScreen({ route }) {
  const { id } = route.params || {};
  const exercise = id ? getExerciseById(id) : null;

  if (!exercise) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Exercise not found.</Text>
      </View>
    );
  }

  const handleOpenVideo = () => {
    if (exercise.videoUrl) {
      Linking.openURL(exercise.videoUrl);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>

      <Text style={styles.sectionTitle}>Target Muscles</Text>
      <View style={styles.tagsContainer}>
        {exercise.targetMuscles.map((muscle) => (
          <View key={muscle} style={styles.tag}>
            <Text style={styles.tagText}>{muscle}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Instructions</Text>
      {exercise.instructions.map((step, index) => (
        <View key={`${exercise.id}-step-${index}`} style={styles.listItem}>
          <Text style={styles.listIndex}>{index + 1}.</Text>
          <Text style={styles.listText}>{step}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Beginner Tips</Text>
      {exercise.tips.map((tip, index) => (
        <View key={`${exercise.id}-tip-${index}`} style={styles.listItem}>
          <Text style={styles.listBullet}>-</Text>
          <Text style={styles.listText}>{tip}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Common Mistakes</Text>
      {exercise.commonMistakes.map((mistake, index) => (
        <View key={`${exercise.id}-mistake-${index}`} style={styles.listItem}>
          <Text style={styles.listBullet}>-</Text>
          <Text style={styles.listText}>{mistake}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.videoButton} onPress={handleOpenVideo}>
        <Text style={styles.videoButtonText}>Open YouTube Tutorial</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '700',
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  tagText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  listIndex: {
    color: COLORS.primary,
    fontWeight: '700',
    marginRight: SPACING.sm,
    width: 18,
  },
  listBullet: {
    color: COLORS.primary,
    fontWeight: '700',
    marginRight: SPACING.sm,
    width: 18,
  },
  listText: {
    color: COLORS.white,
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
  videoButton: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  videoButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
