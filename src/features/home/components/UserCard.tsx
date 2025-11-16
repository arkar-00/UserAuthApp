import React from 'react'
import { View, StyleSheet } from 'react-native'
import { UserInfo } from './UserInfo'
import { useTheme } from '../../theme/hooks/useTheme'
import { User } from '../../auth/types/auth.types'
import Animated, { FadeInDown } from 'react-native-reanimated'

interface UserCardProps {
  user: User
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { theme } = useTheme()

  return (
    <Animated.View
      entering={FadeInDown.duration(600).delay(200)}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadow,
        },
      ]}
    >
      <UserInfo icon="person-outline" label="Name" value={user.name} />

      <View
        style={[styles.divider, { backgroundColor: theme.colors.border }]}
      />

      <UserInfo icon="mail-outline" label="Email" value={user.email} />

      <View
        style={[styles.divider, { backgroundColor: theme.colors.border }]}
      />

      <UserInfo icon="key-outline" label="User ID" value={user.id} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 32,
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
})
