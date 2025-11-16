import React from 'react'
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  ViewStyle,
  StatusBar,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../../features/theme/hooks/useTheme'

interface ScreenWrapperProps {
  children: React.ReactNode
  scrollable?: boolean
  keyboardAvoiding?: boolean
  contentContainerStyle?: ViewStyle
  style?: ViewStyle
  showStatusBar?: boolean
  useSafeArea?: boolean // NEW: Enable safe area
  edges?: ('top' | 'right' | 'bottom' | 'left')[] // NEW: Which edges to protect
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scrollable = true,
  keyboardAvoiding = true,
  contentContainerStyle,
  style,
  showStatusBar = true,
  useSafeArea = true, // Enable safe area by default
  edges = ['top', 'bottom'], // Protect top and bottom by default
}) => {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()

  // Content (scrollable or not)
  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, contentContainerStyle]}>{children}</View>
  )

  // Keyboard avoiding wrapper (if enabled)
  const keyboardContent = keyboardAvoiding ? (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  )

  // Safe area wrapper (if enabled)
  const safeContent = useSafeArea ? (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
        style,
      ]}
      edges={edges}
    >
      {keyboardContent}
    </SafeAreaView>
  ) : (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
        style,
      ]}
    >
      {keyboardContent}
    </View>
  )

  return (
    <>
      {showStatusBar && (
        <StatusBar
          barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
      )}
      {safeContent}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  content: {
    flex: 1,
    padding: 24,
  },
})
