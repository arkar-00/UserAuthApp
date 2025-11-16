import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Button } from '../../../shared/components/Button'
import { UserCard } from '../components/UserCard'
import { ThemeToggle } from '../../theme/components/ThemeToggle'
import { useAuth } from '../../auth/hooks/useAuth'
import { useTheme } from '../../theme/hooks/useTheme'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { ScreenWrapper } from '@/shared/components/ScreenWrapper'
import LottieView from 'lottie-react-native'

const { width: SCEEEN_WIDTH } = Dimensions.get('window')
const EMOJI_WIDTH = SCEEEN_WIDTH / 2

export const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth()
  const { theme } = useTheme()
  const animationRef = useRef<LottieView>(null)

  useEffect(() => {
    animationRef.current?.play()
  }, [])

  if (!user) return null

  return (
    <ScreenWrapper>
      <View style={styles.themeToggleContainer}>
        <ThemeToggle />
      </View>

      <Animated.View
        entering={FadeIn.duration(800)}
        style={styles.welcomeSection}
      >
        <LottieView
          style={styles.emoji}
          ref={animationRef}
          source={require('../assets/lotties/welcome.json')}
        />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Welcome!
        </Text>
        <Text
          style={[styles.welcomeText, { color: theme.colors.textSecondary }]}
        >
          You're successfully logged in
        </Text>
      </Animated.View>

      <UserCard user={user} />

      <Animated.View
        entering={FadeInDown.duration(600).delay(400)}
        style={styles.buttonContainer}
      >
        <Button title="Logout" onPress={logout} />
      </Animated.View>
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
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    width: EMOJI_WIDTH,
    height: EMOJI_WIDTH,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
})
