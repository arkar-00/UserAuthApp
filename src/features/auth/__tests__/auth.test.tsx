import React from 'react'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { renderHook, act, waitFor } from '@testing-library/react-native'
import { AuthProvider } from '../context/AuthContext'
import { useAuth } from '../hooks/useAuth'

let mockUsers: any = []

jest.mock('../../../shared/services/storage.service', () => ({
  storageService: {
    getUsersDB: jest.fn(async () => mockUsers),
    saveToUsersDB: jest.fn(async (user) => {
      mockUsers.push(user)
    }),
    saveUser: jest.fn(async (user) => {
      // Optionally store current logged-in user
      mockUsers.currentUser = user
    }),
    getUser: jest.fn(async () => mockUsers.currentUser || null),
    removeUser: jest.fn(async () => {
      mockUsers.currentUser = null
    }),
  },
}))

beforeEach(() => {
  mockUsers = []
})

describe('Auth Feature Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('useAuth Hook', () => {
    it('should throw error when used outside AuthProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})

      expect(() => {
        renderHook(() => useAuth())
      }).toThrow('useAuth must be used within AuthProvider')

      consoleSpy.mockRestore()
    })

    it('should initialize with no user and loading false', async () => {
      const wrapper = ({ children }: any) => (
        <AuthProvider>{children}</AuthProvider>
      )
      const { result } = renderHook(() => useAuth(), { wrapper })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.user).toBeNull()
    })
  })

  describe('Signup Functionality', () => {
    it('should signup a new user successfully', async () => {
      const wrapper = ({ children }: any) => (
        <AuthProvider>{children}</AuthProvider>
      )
      const { result } = renderHook(() => useAuth(), { wrapper })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const signupData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      }

      await act(async () => {
        await result.current.signup(signupData)
      })

      expect(result.current.user).toBeTruthy()
      expect(result.current.user?.email).toBe('john@example.com')
      expect(result.current.user?.name).toBe('John Doe')
      expect(result.current.user?.id).toBeTruthy()
    })
  })

  describe('Login Functionality', () => {
    it('should login existing user successfully', async () => {
      const wrapper = ({ children }: any) => (
        <AuthProvider>{children}</AuthProvider>
      )
      const { result } = renderHook(() => useAuth(), { wrapper })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // First create a user
      const signupData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
      }

      await act(async () => {
        await result.current.signup(signupData)
      })

      expect(result.current.user).toBeTruthy()

      // Logout
      await act(async () => {
        await result.current.logout()
      })

      expect(result.current.user).toBeNull()

      // Now login
      const loginData = {
        email: 'jane@example.com',
        password: 'password123',
      }

      await act(async () => {
        await result.current.login(loginData)
      })

      expect(result.current.user).toBeTruthy()
      expect(result.current.user?.email).toBe('jane@example.com')
      expect(result.current.user?.name).toBe('Jane Doe')
    })

    it('should throw error when logging in with non-existent email', async () => {
      const wrapper = ({ children }: any) => (
        <AuthProvider>{children}</AuthProvider>
      )
      const { result } = renderHook(() => useAuth(), { wrapper })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123',
      }

      await expect(
        act(async () => {
          await result.current.login(loginData)
        }),
      ).rejects.toThrow('Invalid credentials')
    })
  })

  describe('Logout Functionality', () => {
    it('should logout user successfully', async () => {
      const wrapper = ({ children }: any) => (
        <AuthProvider>{children}</AuthProvider>
      )
      const { result } = renderHook(() => useAuth(), { wrapper })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Create and login user
      const signupData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      }

      await act(async () => {
        await result.current.signup(signupData)
      })

      expect(result.current.user).toBeTruthy()

      // Logout
      await act(async () => {
        await result.current.logout()
      })

      expect(result.current.user).toBeNull()
    })
  })
})
