import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../core/constants/theme';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../../assets/gym.jpg')}
      style={styles.background}
      resizeMode="cover"
      blurRadius={3}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>EasyFit</Text>
          <Text style={styles.subtitle}>Simple workouts for beginners</Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('BeginnerWorkout')}
          >
            <Text style={styles.primaryButtonText}>Beginner Workout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('BodyParts')}
          >
            <Text style={styles.secondaryButtonText}>Browse by Body Parts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: 1,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: SPACING.lg,
    backgroundColor: 'transparent',
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginTop: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
});
