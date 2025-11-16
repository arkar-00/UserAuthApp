import React from 'react'
import { TextInput, StyleSheet, View, Text } from 'react-native'
import { Control, Controller } from 'react-hook-form'
import { useTheme } from '../../features/theme/hooks/useTheme'

interface InputProps {
  control: Control<any>
  name: string
  placeholder: string
  secureTextEntry?: boolean
  error?: string
  keyboardType?: 'default' | 'email-address'
}

export const Input: React.FC<InputProps> = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  error,
  keyboardType = 'default',
}) => {
  const { theme } = useTheme()

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              {
                borderColor: error ? theme.colors.error : theme.colors.border,
                backgroundColor: theme.colors.inputBackground,
                color: theme.colors.text,
              },
            ]}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textSecondary}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize="none"
          />
        )}
      />
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
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
})
