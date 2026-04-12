import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { exercises } from '../data/exercises';
import { COLORS, SPACING, BORDER_RADIUS } from '../shared/theme';
import { getCurrentUser } from '../services/firebase/authService';
import { getFavoriteExerciseIds, removeFavorite } from '../services/firebase/favoritesService';

export default function FavoritesScreen({ navigation }) {
	const [loading, setLoading] = useState(true);
	const [favoriteExercises, setFavoriteExercises] = useState([]);
	const [error, setError] = useState('');
	const [removingId, setRemovingId] = useState('');

	const loadFavorites = useCallback(async () => {
		const user = getCurrentUser();

		if (!user?.uid) {
			setFavoriteExercises([]);
			setLoading(false);
			return;
		}

		setLoading(true);
		setError('');

		try {
			const favoriteIds = await getFavoriteExerciseIds(user.uid);
			const favoriteSet = new Set(favoriteIds);
			const mappedExercises = exercises.filter((exercise) => favoriteSet.has(exercise.id));
			setFavoriteExercises(mappedExercises);
		} catch (loadError) {
			setError(loadError?.message || 'Failed to load favorites.');
		} finally {
			setLoading(false);
		}
	}, []);

	useFocusEffect(
		useCallback(() => {
			loadFavorites();
		}, [loadFavorites])
	);

	const handleRemoveFavorite = async (exerciseId) => {
		const user = getCurrentUser();
		if (!user?.uid || removingId) {
			return;
		}

		setRemovingId(exerciseId);
		setError('');

		try {
			await removeFavorite(user.uid, exerciseId);
			setFavoriteExercises((currentExercises) =>
				currentExercises.filter((exercise) => exercise.id !== exerciseId)
			);
		} catch (removeError) {
			setError(removeError?.message || 'Failed to remove favorite.');
		} finally {
			setRemovingId('');
		}
	};

	if (loading) {
		return (
			<View style={styles.centeredContainer}>
				<ActivityIndicator color={COLORS.primary} />
			</View>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>My Favorites</Text>

			{error ? <Text style={styles.errorText}>{error}</Text> : null}

			{favoriteExercises.length === 0 ? (
				<View style={styles.emptyState}>
					<Text style={styles.emptyText}>You haven't added favorites yet.</Text>
				</View>
			) : (
				favoriteExercises.map((exercise) => (
					<View key={exercise.id} style={styles.card}>
						<TouchableOpacity
							style={styles.cardMain}
							onPress={() => navigation.navigate('ExerciseDetail', { id: exercise.id })}
						>
							<Text style={styles.cardText}>{exercise.name}</Text>
							<Text style={styles.cardView}>View</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.deleteButton, removingId === exercise.id && styles.deleteButtonDisabled]}
							onPress={() => handleRemoveFavorite(exercise.id)}
							disabled={removingId === exercise.id}
						>
							<Text style={styles.deleteButtonText}>
								{removingId === exercise.id ? 'Deleting...' : 'Delete'}
							</Text>
						</TouchableOpacity>
					</View>
				))
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
	centeredContainer: {
		flex: 1,
		backgroundColor: COLORS.background,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		color: COLORS.white,
		fontSize: 24,
		fontWeight: '800',
		marginBottom: SPACING.lg,
	},
	errorText: {
		color: COLORS.error,
		marginBottom: SPACING.md,
	},
	card: {
		backgroundColor: COLORS.surface,
		borderWidth: 1,
		borderColor: COLORS.border,
		borderRadius: BORDER_RADIUS.lg,
		marginBottom: SPACING.md,
		overflow: 'hidden',
	},
	cardMain: {
		paddingVertical: SPACING.lg,
		paddingHorizontal: SPACING.lg,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	cardText: {
		color: COLORS.white,
		fontSize: 17,
		fontWeight: '600',
		flex: 1,
		marginRight: SPACING.md,
	},
	cardView: {
		color: COLORS.primary,
		fontSize: 14,
		fontWeight: '700',
	},
	deleteButton: {
		borderTopWidth: 1,
		borderTopColor: COLORS.border,
		paddingVertical: SPACING.md,
		alignItems: 'center',
		backgroundColor: COLORS.primary,
	},
	deleteButtonDisabled: {
		opacity: 0.6,
	},
	deleteButtonText: {
		color: COLORS.white,
		fontSize: 14,
		fontWeight: '700',
	},
	emptyState: {
		marginTop: SPACING.lg,
		paddingVertical: SPACING.xl,
		borderRadius: BORDER_RADIUS.lg,
		borderWidth: 1,
		borderColor: COLORS.border,
		backgroundColor: COLORS.surface,
		alignItems: 'center',
	},
	emptyText: {
		color: COLORS.textSecondary,
		fontSize: 16,
		fontWeight: '600',
	},
});
