import React, { createContext, useState, useEffect, useCallback } from 'react'
import { useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeContextType, Theme, ThemeMode } from '../types/theme.types'
import { lightTheme, darkTheme } from '../constants/theme'

const THEME_KEY = '@theme_mode'

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme()
  const [theme, setThemeState] = useState<Theme>(
    systemColorScheme === 'dark' ? darkTheme : lightTheme,
  )

  useEffect(() => {
    loadTheme()
  }, [])

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY)
      if (savedTheme) {
        setThemeState(savedTheme === 'dark' ? darkTheme : lightTheme)
      }
    } catch (error) {
      console.error('Error loading theme:', error)
    }
  }

  const setTheme = useCallback(async (mode: ThemeMode) => {
    try {
      const newTheme = mode === 'dark' ? darkTheme : lightTheme
      setThemeState(newTheme)
      await AsyncStorage.setItem(THEME_KEY, mode)
    } catch (error) {
      console.error('Error saving theme:', error)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const newMode = theme.mode === 'light' ? 'dark' : 'light'
    setTheme(newMode)
  }, [theme.mode, setTheme])

  const value: ThemeContextType = {
    theme,
    isDark: theme.mode === 'dark',
    toggleTheme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
