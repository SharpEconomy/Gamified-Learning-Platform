'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
  xp: number
  level: number
  streak: number
  maxStreak: number
  completedCourses: number
  tokens: number
  avatar?: string
  password?: string
  emailVerified?: Date
  image?: string
  lastActivity?: Date
  createdAt?: Date
  updatedAt?: Date
}

interface AuthContextType {
  user: User | null
  isAuthenticated: () => boolean
  isAdmin: () => boolean
  signIn: (email: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const isAuthenticated = () => {
    return user !== null
  }

  const isAdmin = () => {
    return user?.email === 'shivta6200@gmail.com'
  }

  const signIn = async (email: string) => {
    try {
      setError(null)
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      const userData: User = {
        id: data.user.id,
        name: data.user.name || email.split('@')[0],
        email: data.user.email,
        role: data.user.role,
        xp: data.user.xp,
        level: data.user.level,
        streak: data.user.streak,
        maxStreak: data.user.maxStreak,
        completedCourses: data.user.completedCourses || 0,
        tokens: data.user.tokens || 0
      }

      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
      throw err
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setError(null)
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed')
      }

      const userData: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        xp: data.user.xp,
        level: data.user.level,
        streak: data.user.streak,
        maxStreak: data.user.maxStreak,
        completedCourses: data.user.completedCourses || 0,
        tokens: data.user.tokens || 0
      }

      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
      throw err
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, signIn, signUp, signOut, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}