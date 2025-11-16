import { storageService } from '../../../shared/services/storage.service'
import { User, LoginFormData, SignupFormData } from '../types/auth.types'

export const authService = {
  async login(data: LoginFormData): Promise<User> {
    const users = await storageService.getUsersDB()
    const foundUser = users.find((u) => u.email === data.email)

    if (!foundUser) {
      throw new Error(
        'Invalid credentials. Please check your email or sign up.',
      )
    }

    await storageService.saveUser(foundUser)
    return foundUser
  },

  async signup(data: SignupFormData): Promise<User> {
    const users = await storageService.getUsersDB()

    if (users.some((u) => u.email === data.email)) {
      throw new Error('Email already exists. Please login instead.')
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
    }

    await storageService.saveToUsersDB(newUser)
    await storageService.saveUser(newUser)
    return newUser
  },

  async logout(): Promise<void> {
    await storageService.removeUser()
  },

  async getCurrentUser(): Promise<User | null> {
    return await storageService.getUser()
  },
}
