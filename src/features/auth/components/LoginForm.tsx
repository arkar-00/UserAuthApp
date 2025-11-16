import React, { useState } from 'react'
import { StyleSheet, Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../utils/validation.schemas'
import { LoginFormData } from '../types/auth.types'
import { useAuth } from '../hooks/useAuth'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { PasswordInput } from '@/shared/components/PasswordInput'
import { Input } from '@/shared/components/Input'
import { Button } from '@/shared/components/Button'

interface LoginFormProps {
  onNavigateToSignup: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onNavigateToSignup }) => {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true)
      await login(data)
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Animated.View
      entering={FadeInDown.duration(600).delay(200)}
      style={styles.form}
    >
      <Input
        control={control}
        name="email"
        placeholder="Email"
        keyboardType="email-address"
        error={errors.email?.message}
      />

      <PasswordInput
        control={control}
        name="password"
        placeholder="Password"
        error={errors.password?.message}
      />

      <Button
        title="Login"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />

      <Button
        title="Don't have an account? Sign Up"
        onPress={onNavigateToSignup}
        variant="secondary"
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
})
