import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { bodyParts } from '../../core/constants/exercises';
import { COLORS, SPACING, BORDER_RADIUS } from '../../core/constants/theme';

export default function BodyPartsScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Choose a Body Part</Text>
      {bodyParts.map((part) => (
        <TouchableOpacity
          key={part.id}
          style={styles.card}
          onPress={() => navigation.navigate('ExerciseList', { bodyPart: part.id })}
        >
          <Text style={styles.cardText}>{part.name}</Text>
          <Text style={styles.cardIcon}>{part.icon}</Text>
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
    fontSize: 18,
    fontWeight: '600',
  },
  cardIcon: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
  },
});
