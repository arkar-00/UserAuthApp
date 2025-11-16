import React, { useState } from 'react'
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { Control, Controller } from 'react-hook-form'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/features/theme/hooks/useTheme'

interface PasswordInputProps {
  control: Control<any>
  name: string
  placeholder: string
  error?: string
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  control,
  name,
  placeholder,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const { theme } = useTheme()

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? theme.colors.error : theme.colors.border,
            backgroundColor: theme.colors.inputBackground,
          },
        ]}
      >
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.textSecondary}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
          )}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={24}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
      {error && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  iconButton: {
    padding: 12,
  },
  errorText: {
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
})
