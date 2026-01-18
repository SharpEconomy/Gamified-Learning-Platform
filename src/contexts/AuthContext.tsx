'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  xp: number
  level: number
  streak: number
  maxStreak: number
}

interface AuthContextType {
  user: User | null
  signIn: (user: User) => void
  signOut: () => void
  isAuthenticated: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('codequest_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const signIn = (user: User) => {
    setUser(user)
    localStorage.setItem('codequest_user', JSON.stringify(user))
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('codequest_user')
  }

  const isAuthenticated = () => {
    return user !== null
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated }}>
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