import React, { createContext, useState, useEffect, useCallback } from 'react'
import {
  AuthContextType,
  User,
  LoginFormData,
  SignupFormData,
} from '../types/auth.types'
import { authService } from '../services/auth.service'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      const savedUser = await authService.getCurrentUser()
      setUser(savedUser)
    } catch (error) {
      console.error('Error loading user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = useCallback(async (data: LoginFormData) => {
    const user = await authService.login(data)
    setUser(user)
  }, [])

  const signup = useCallback(async (data: SignupFormData) => {
    const user = await authService.signup(data)
    setUser(user)
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
