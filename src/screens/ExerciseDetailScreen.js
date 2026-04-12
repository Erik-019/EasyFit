import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getExerciseById } from '../data/exercises';
import { COLORS, SPACING, BORDER_RADIUS } from '../shared/theme';
import { getCurrentUser } from '../services/firebase/authService';
import { addFavorite, isFavorite, removeFavorite } from '../services/firebase/favoritesService';

export default function ExerciseDetailScreen({ route }) {
  const { id } = route.params || {};
  const exercise = id ? getExerciseById(id) : null;
  const [favoriteLoading, setFavoriteLoading] = useState(true);
  const [submittingFavorite, setSubmittingFavorite] = useState(false);
  const [favoriteSelected, setFavoriteSelected] = useState(false);
  const [favoriteError, setFavoriteError] = useState('');

  const loadFavoriteState = useCallback(async () => {
    if (!id) {
      setFavoriteLoading(false);
      return;
    }

    const user = getCurrentUser();
    if (!user?.uid) {
      setFavoriteSelected(false);
      setFavoriteLoading(false);
      return;
    }

    setFavoriteLoading(true);
    setFavoriteError('');
    try {
      const selected = await isFavorite(user.uid, id);
      setFavoriteSelected(selected);
    } catch (loadError) {
      setFavoriteError(loadError?.message || 'Failed to load favorite status.');
    } finally {
      setFavoriteLoading(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      loadFavoriteState();
    }, [loadFavoriteState])
  );

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

  const handleToggleFavorite = async () => {
    const user = getCurrentUser();
    if (!user?.uid || submittingFavorite) {
      return;
    }

    setSubmittingFavorite(true);
    setFavoriteError('');

    try {
      if (favoriteSelected) {
        await removeFavorite(user.uid, exercise.id);
        setFavoriteSelected(false);
      } else {
        await addFavorite(user.uid, exercise.id);
        setFavoriteSelected(true);
      }
    } catch (toggleError) {
      setFavoriteError(toggleError?.message || 'Failed to update favorite.');
    } finally {
      setSubmittingFavorite(false);
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

      {favoriteError ? <Text style={styles.errorText}>{favoriteError}</Text> : null}

      <TouchableOpacity
        style={[styles.favoriteButton, favoriteSelected && styles.favoriteButtonSelected]}
        onPress={handleToggleFavorite}
        disabled={submittingFavorite || favoriteLoading}
      >
        {favoriteLoading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.favoriteButtonText}>
            {favoriteSelected ? 'Remove from Favorites' : 'Add to Favorites'}
          </Text>
        )}
      </TouchableOpacity>

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
  errorText: {
    color: COLORS.error,
    marginTop: SPACING.md,
  },
  favoriteButton: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  favoriteButtonSelected: {
    backgroundColor: COLORS.primary,
  },
  favoriteButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
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
