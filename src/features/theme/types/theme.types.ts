export type ThemeMode = 'light' | 'dark'

export interface ThemeColors {
  primary: string
  background: string
  card: string
  text: string
  textSecondary: string
  border: string
  error: string
  success: string
  inputBackground: string
  shadow: string
}

export interface Theme {
  mode: ThemeMode
  colors: ThemeColors
}

export interface ThemeContextType {
  theme: Theme
  isDark: boolean
  toggleTheme: () => void
  setTheme: (mode: ThemeMode) => void
}
