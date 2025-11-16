import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../theme/hooks/useTheme'

interface UserInfoProps {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  value: string
}

export const UserInfo: React.FC<UserInfoProps> = ({ icon, label, value }) => {
  const { theme } = useTheme()

  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={24} color={theme.colors.primary} />
      <View style={styles.infoContent}>
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          {label}
        </Text>
        <Text style={[styles.value, { color: theme.colors.text }]}>
          {value}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoContent: {
    marginLeft: 16,
    flex: 1,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
})
