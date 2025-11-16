import React, { useState } from 'react'
import { StyleSheet, Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema } from '../utils/validation.schemas'
import { SignupFormData } from '../types/auth.types'
import { useAuth } from '../hooks/useAuth'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Input } from '@/shared/components/Input'
import { PasswordInput } from '@/shared/components/PasswordInput'
import { Button } from '@/shared/components/Button'

interface SignupFormProps {
  onNavigateToLogin: () => void
}

export const SignupForm: React.FC<SignupFormProps> = ({
  onNavigateToLogin,
}) => {
  const { signup } = useAuth()
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true)
      await signup(data)
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message || 'Unable to create account')
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
        name="name"
        placeholder="Full Name"
        error={errors.name?.message}
      />

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
        placeholder="Password (min 6 characters)"
        error={errors.password?.message}
      />

      <Button
        title="Sign Up"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />

      <Button
        title="Already have an account? Login"
        onPress={onNavigateToLogin}
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
