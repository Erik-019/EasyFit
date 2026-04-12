import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { loginWithEmail, requestPasswordReset, signupWithEmail } from '../services/firebase/authService';
import { COLORS, SPACING, BORDER_RADIUS } from '../shared/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const isValid = useMemo(() => {
    return email.trim().length > 0 && password.trim().length >= 6;
  }, [email, password]);

  const handleSubmit = async () => {
    if (!isValid || loading) {
      return;
    }

    setLoading(true);
    setError('');
    setInfo('');

    try {
      const normalizedEmail = email.trim().toLowerCase();
      if (mode === 'login') {
        await loginWithEmail(normalizedEmail, password);
      } else {
        await signupWithEmail(normalizedEmail, password);
      }
    } catch (submitError) {
      setError(submitError?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError('Enter your email first to reset password.');
      setInfo('');
      return;
    }

    setLoading(true);
    setError('');
    setInfo('');

    try {
      await requestPasswordReset(normalizedEmail);
      setInfo('Password reset email sent. Please check your inbox.');
    } catch (resetError) {
      setError(resetError?.message || 'Failed to send password reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EasyFit Login</Text>
      <Text style={styles.subtitle}>Welcome to EasyFit — your fitness journey starts here</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.textLight}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password (min 6 chars)"
        placeholderTextColor={COLORS.textLight}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword} disabled={loading}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {info ? <Text style={styles.infoText}>{info}</Text> : null}

      <TouchableOpacity
        style={[styles.primaryButton, (!isValid || loading) && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!isValid || loading}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.primaryButtonText}>{mode === 'login' ? 'Login' : 'Create Account'}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => {
          setMode((currentMode) => (currentMode === 'login' ? 'signup' : 'login'));
          setError('');
          setInfo('');
        }}
        disabled={loading}
      >
        <Text style={styles.secondaryButtonText}>
          {mode === 'login' ? 'Need an account?' : 'Already have an account?'}
        </Text>
        <Text style={styles.secondaryActionText}>
          {mode === 'login' ? 'Tap here to Sign up' : 'Tap here to Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    color: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.md,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  errorText: {
    color: COLORS.error,
    marginBottom: SPACING.md,
  },
  infoText: {
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  disabledButton: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    marginTop: SPACING.md,
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  secondaryButtonText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryActionText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '800',
    marginTop: SPACING.xs,
    textDecorationLine: 'underline',
  },
});