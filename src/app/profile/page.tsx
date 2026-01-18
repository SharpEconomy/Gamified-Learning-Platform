'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge as ShadcnBadge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Award, 
  Trophy, 
  Star, 
  Flame, 
  Target, 
  Zap, 
  Clock, 
  BookOpen,
  Shield,
  LogOut,
  ArrowRight,
  ChevronRight
} from 'lucide-react'

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlocked: boolean
  unlockedAt?: Date
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, signOut, isAuthenticated } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [badges, setBadges] = useState<Badge[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated()) {
      router.push('/auth/signin')
      return
    }

    const allBadges: Badge[] = [
      { id: 'first_lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '👣', rarity: 'common', unlocked: true },
      { id: 'streak_7', name: 'Week Warrior', description: '7-day learning streak', icon: '🔥', rarity: 'rare', unlocked: true },
      { id: 'complete_js', name: 'JavaScript Master', description: 'Complete JavaScript course', icon: '⚔️', rarity: 'epic', unlocked: user?.xp ? user.xp >= 4000 : false, unlockedAt: user?.xp && user.xp >= 4000 ? new Date() : undefined },
      { id: 'complete_py', name: 'Python Master', description: 'Complete Python course', icon: '🐍', rarity: 'epic', unlocked: user?.xp ? user.xp >= 3500 : false },
      { id: 'complete_react', name: 'React Master', description: 'Complete React course', icon: '⚛️', rarity: 'epic', unlocked: false },
      { id: 'streak_30', name: 'Month Champion', description: '30-day learning streak', icon: '🏆', rarity: 'legendary', unlocked: false },
      { id: 'xp_5000', name: 'XP Hunter', description: 'Earn 5,000 XP', icon: '⭐', rarity: 'rare', unlocked: user?.xp ? user.xp >= 5000 : false },
      { id: 'xp_10000', name: 'XP Legend', description: 'Earn 10,000 XP', icon: '💎', rarity: 'legendary', unlocked: false },
      { id: 'fast_learner', name: 'Speed Demon', description: 'Complete 10 lessons in a day', icon: '⚡', rarity: 'rare', unlocked: false },
      { id: 'all_courses', name: 'Knowledge Seeker', description: 'Complete all courses', icon: '📚', rarity: 'legendary', unlocked: false },
    ]

    setBadges(allBadges)
    setLoading(false)
  }, [mounted, isAuthenticated, user])

  const handleSignOut = () => {
    signOut()
    router.push('/')
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'from-gray-500 to-gray-600'
      case 'rare':
        return 'from-blue-500 to-purple-600'
      case 'epic':
        return 'from-purple-500 to-pink-600'
      case 'legendary':
        return 'from-yellow-500 to-orange-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-500/30'
      case 'rare':
        return 'border-blue-500/30'
      case 'epic':
        return 'border-purple-500/30'
      case 'legendary':
        return 'border-yellow-500/30'
      default:
        return 'border-gray-500/30'
    }
  }

  const xpToNextLevel = user?.level ? ((user.level + 1) * 1000) - user.xp : 1000
  const progressToNextLevel = user?.level ? ((user.xp % 1000) / 10) : 0
  const unlockedBadges = badges.filter(b => b.unlocked).length
  const totalBadges = badges.length

  if (!mounted) {
    return null
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>

        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-purple-500/20 blur-xl animate-pulse"
              style={{
                width: `${Math.random() * 100 + 30}px`,
                height: `${Math.random() * 100 + 30}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/50 to-indigo-950/80"></div>
      </div>

      <div className="relative z-10 flex flex-col">
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Link href="/">
                <Button variant="outline" className="mb-6 border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  Back to Home
                </Button>
              </Link>

              <Card className="bg-slate-900/60 backdrop-blur-sm border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10"></div>
                <CardContent className="relative p-8">
                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-6xl shadow-2xl shadow-purple-500/30">
                        👤
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="text-sm text-purple-200/60 mb-1">User ID</div>
                        <div className="flex items-center gap-2">
                          <code className="px-3 py-1 bg-purple-500/20 rounded-md text-purple-300 text-sm font-mono">
                            {user.id}
                          </code>
                          <Button variant="ghost" size="sm" className="h-8 w-8 text-purple-300 hover:text-purple-100 hover:bg-purple-500/20">
                            <Target className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-purple-200/60 mb-1">Name</div>
                        <div className="text-3xl font-bold text-white">{user.name}</div>
                      </div>

                      <div>
                        <div className="text-sm text-purple-200/60 mb-1">Email</div>
                        <div className="flex items-center gap-2">
                          <div className="text-lg text-white">{user.email}</div>
                          <ShadcnBadge className="bg-green-500/20 text-green-300 border border-green-500/30">Verified</ShadcnBadge>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link href="/courses">
                        <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                          <BookOpen className="mr-2 h-4 w-4" />
                          My Courses
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        onClick={handleSignOut}
                        className="flex-1 border-red-500/30 text-red-300 hover:bg-red-500/10 hover:border-red-400"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-slate-900/60 backdrop-blur-sm border border-purple-500/20 hover:scale-105 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-sm text-purple-200/70 mb-2">Current Level</div>
                    <div className="text-5xl font-bold text-white mb-2">{user.level}</div>
                    <Progress value={progressToNextLevel} className="h-2 mb-4" />
                    <div className="text-xs text-purple-300/60">
                      {xpToNextLevel} XP to next level
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/60 backdrop-blur-sm border border-yellow-500/20 hover:scale-105 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-500/30">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-sm text-purple-200/70 mb-2">Total XP</div>
                    <div className="text-5xl font-bold text-white mb-2">{user.xp.toLocaleString()}</div>
                    <div className="text-xs text-purple-300/60">
                      {user.xp >= 10000 ? '🎉 XP Legend!' : 'Keep earning!'}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/60 backdrop-blur-sm border border-green-500/20 hover:scale-105 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                      <Flame className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-sm text-purple-200/70 mb-2">Current Streak</div>
                    <div className="text-5xl font-bold text-white mb-2">{user.streak} days</div>
                    <div className="text-xs text-purple-300/60">
                      Best: {user.maxStreak} days
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Card className="bg-slate-900/60 backdrop-blur-sm border border-purple-500/20">
                <CardHeader className="border-b border-purple-500/30 pb-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl text-white">
                      <div className="flex items-center gap-3">
                        <Award className="h-8 w-8 text-yellow-400" />
                        Achievement Badges
                      </div>
                    </CardTitle>
                    <ShadcnBadge className="bg-purple-500/20 text-purple-300">
                      {unlockedBadges} / {totalBadges}
                    </ShadcnBadge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {badges.map((badge) => (
                      <Card
                        key={badge.id}
                        className={`group hover:scale-105 transition-all ${
                          badge.unlocked
                            ? 'bg-slate-800/50 border-2 ' + getRarityBorder(badge.rarity)
                            : 'bg-slate-900/30 border border-slate-700/30 opacity-50'
                        }`}
                      >
                        <CardContent className="p-4 text-center">
                          <div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 text-4xl ${
                              badge.unlocked
                                ? 'bg-gradient-to-br ' + getRarityColor(badge.rarity) + ' shadow-lg'
                                : 'bg-slate-700/50'
                            }`}
                          >
                            {badge.unlocked ? (
                              badge.icon
                            ) : (
                              <Shield className="h-8 w-8 text-slate-500" />
                            )}
                          </div>
                          <div className={`font-semibold mb-1 ${
                            badge.unlocked ? 'text-white' : 'text-slate-500'
                          }`}>
                            {badge.name}
                          </div>
                          <div className={`text-xs ${
                            badge.unlocked ? 'text-purple-200/70' : 'text-slate-500'
                          }`}>
                            {badge.description}
                          </div>
                          {badge.unlocked && (
                            <ShadcnBadge
                              className={`text-[10px] px-2 py-0.5 mt-2 ${getRarityColor(badge.rarity)} text-white border-0`}
                            >
                              {badge.rarity.toUpperCase()}
                            </ShadcnBadge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Continue Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-lg text-purple-200/80 mb-8">
                Keep learning to unlock more badges and reach new levels!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/courses">
                  <Button size="lg" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Continue Learning
                  </Button>
                </Link>
                <Link href="/leaderboard">
                  <Button size="lg" variant="outline" className="flex-1 border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400">
                    <Trophy className="mr-2 h-5 w-5" />
                    View Leaderboard
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-purple-500/20 bg-slate-900/80 backdrop-blur-sm mt-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-purple-200/60">
              <div>© 2024 CodeQuest. All rights reserved.</div>
              <div className="flex gap-6">
                <Link href="/courses" className="hover:text-white transition-colors">
                  Courses
                </Link>
                <Link href="/leaderboard" className="hover:text-white transition-colors">
                  Leaderboard
                </Link>
                <Link href="/auth/signin" className="hover:text-white transition-colors">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}