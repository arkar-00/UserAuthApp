import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '../../features/auth/types/auth.types'

const USER_KEY = '@user'
const USERS_DB_KEY = '@users_db'

export const storageService = {
  async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
    } catch (error) {
      console.error('Error saving user:', error)
      throw error
    }
  },

  async getUser(): Promise<User | null> {
    try {
      const user = await AsyncStorage.getItem(USER_KEY)
      return user ? JSON.parse(user) : null
    } catch (error) {
      console.error('Error getting user:', error)
      return null
    }
  },

  async removeUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_KEY)
    } catch (error) {
      console.error('Error removing user:', error)
      throw error
    }
  },

  async getUsersDB(): Promise<User[]> {
    try {
      const users = await AsyncStorage.getItem(USERS_DB_KEY)
      return users ? JSON.parse(users) : []
    } catch (error) {
      console.error('Error getting users DB:', error)
      return []
    }
  },

  async saveToUsersDB(user: User): Promise<void> {
    try {
      const users = await this.getUsersDB()
      users.push(user)
      await AsyncStorage.setItem(USERS_DB_KEY, JSON.stringify(users))
    } catch (error) {
      console.error('Error saving to users DB:', error)
      throw error
    }
  },
}
