import React from 'react'
import { AppNavigator } from './src/navigation/AppNavigator'
import { AuthProvider } from '@/features/auth/context/AuthContext'
import { ThemeProvider } from '@/features/theme/context/ThemeContext'

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
