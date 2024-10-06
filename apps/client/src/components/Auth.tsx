'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabase/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      alert('Login successful!')
    } catch (error) {
      alert((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      alert('Sign up successful!')
    } catch (error) {
      alert((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <Input
        type='email'
        placeholder='Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        type='password'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin} disabled={isLoading}>
        Login
      </Button>
      <Button onClick={handleSignUp} disabled={isLoading}>
        Sign Up
      </Button>
    </div>
  )
}

export default Auth
