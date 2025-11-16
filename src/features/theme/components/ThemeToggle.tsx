import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../hooks/useTheme'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme, theme } = useTheme()

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withSpring(isDark ? '180deg' : '0deg') }],
    }
  })

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.card }]}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Animated.View style={animatedStyle}>
        <Ionicons
          name={isDark ? 'moon' : 'sunny'}
          size={24}
          color={theme.colors.primary}
        />
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
})
