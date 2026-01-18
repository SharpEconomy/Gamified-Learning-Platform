'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Gamepad2, Crown, Flame, Target, BookOpen, Sparkles, Trophy, Gem, Users } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center">
            <Gamepad2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
            CodeQuest
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/courses" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            Courses
          </Link>
          <Link href="/leaderboard" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            Leaderboard
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/auth/signin">
            <Button variant="default" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/courses">
            <Button variant="default" size="sm">
              Start Quest
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}