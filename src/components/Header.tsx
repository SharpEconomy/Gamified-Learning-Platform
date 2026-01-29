'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Gamepad2, Trophy, Zap, Menu, X, User, LogOut, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/components/theme-provider'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { user, signOut } = useAuth()
  const { theme, setTheme } = useTheme()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = () => {
    signOut()
    window.location.href = '/'
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const navLinks = [
    { href: '/', label: 'Home', icon: Gamepad2 },
    { href: '/courses', label: 'Courses', icon: Trophy },
    { href: '/leaderboard', label: 'Leaderboard', icon: Zap },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-shadow">
              <Gamepad2 className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">CodeQuest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="ghost" className="gap-2">
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle - Desktop */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hidden sm:flex hover:bg-purple-500/10 focus:ring-2 focus:ring-yellow-200"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-purple-600" />
                )}
              </Button>
            )}

            {user ? (
              // Logged In State
              <>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <User className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium">{user.name}</span>
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white ml-2">
                      Lvl {user.level}
                    </Badge>
                  </div>
                  <Link href="/profile">
                    <Button variant="outline" size="sm" className="border-purple-500/30 hover:bg-purple-500/10">
                      Profile
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSignOut}
                    className="hover:bg-red-500/10 hover:text-red-400"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              // Logged Out State
              <>
                <div className="hidden sm:flex items-center gap-2">
                  <Link href="/auth/signin">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Sign Up
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Start Learning
                    </Button>
                  </Link>
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {/* Mobile Theme Toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  className="w-full justify-start gap-2"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="h-4 w-4 text-yellow-400" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 text-purple-600" />
                      Dark Mode
                    </>
                  )}
                </Button>
              )}

              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              ))}

              {user ? (
                // Mobile Logged In State
                <div className="pt-2 border-t space-y-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <User className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium">{user.name}</span>
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white ml-2">
                      Lvl {user.level}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="flex-1">
                        Profile
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleSignOut()
                        setMobileMenuOpen(false)
                      }}
                      className="flex-1 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              ) : (
                // Mobile Logged Out State
                <div className="pt-2 border-t space-y-2">
                  <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                      Sign Up
                    </Button>
                  </Link>
                  <Link href="/courses" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                      Start Learning
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  )
}