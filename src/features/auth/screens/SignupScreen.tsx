import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/types'
import { SignupForm } from '../components/SignupForm'
import { ThemeToggle } from '../../theme/components/ThemeToggle'
import { useTheme } from '../../theme/hooks/useTheme'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { ScreenWrapper } from '@/shared/components/ScreenWrapper'
import LottieView from 'lottie-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { width: SCEEEN_WIDTH } = Dimensions.get('window')
const EMOJI_WIDTH = SCEEEN_WIDTH / 3.5

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Signup'
>

interface Props {
  navigation: SignupScreenNavigationProp
}

export const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme()
  const animationRef = useRef<LottieView>(null)
  const insets = useSafeAreaInsets()

  useEffect(() => {
    animationRef.current?.play()
  }, [])

  return (
    <ScreenWrapper>
      <View style={styles.themeToggleContainer}>
        <ThemeToggle />
      </View>

      <Animated.View
        entering={FadeInUp.duration(600)}
        style={[styles.header, { marginTop: insets.top }]}
      >
        <LottieView
          style={styles.emoji}
          ref={animationRef}
          source={require('../assets/lotties/sign-up.json')}
        />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Create Account
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Sign up to get started
        </Text>
      </Animated.View>
      <SignupForm onNavigateToLogin={() => navigation.navigate('Login')} />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  themeToggleContainer: {
    position: 'absolute',
    top: 20,
    right: 24,
    zIndex: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  emoji: {
    width: EMOJI_WIDTH,
    height: EMOJI_WIDTH,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
})
