'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Medal, Crown, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface LeaderboardEntry {
  rank: number
  name: string
  xp: number
  level: number
  badges: number
  avatar: string
}

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching leaderboard data
    setTimeout(() => {
      setLeaderboardData([
        { rank: 1, name: 'Alex Chen', xp: 15600, level: 15, badges: 32, avatar: '🥇' },
        { rank: 2, name: 'Sarah Johnson', xp: 14200, level: 14, badges: 28, avatar: '🥈' },
        { rank: 3, name: 'Michael Park', xp: 12800, level: 12, badges: 25, avatar: '🥉' },
        { rank: 4, name: 'Emily Davis', xp: 11500, level: 11, badges: 22, avatar: '⭐' },
        { rank: 5, name: 'David Kim', xp: 10200, level: 10, badges: 20, avatar: '⭐' },
        { rank: 6, name: 'Lisa Thompson', xp: 9500, level: 9, badges: 18, avatar: '⭐' },
        { rank: 7, name: 'James Wilson', xp: 8800, level: 8, badges: 16, avatar: '⭐' },
        { rank: 8, name: 'Sophie Brown', xp: 7900, level: 7, badges: 15, avatar: '⭐' },
        { rank: 9, name: 'Chris Martinez', xp: 6800, level: 6, badges: 14, avatar: '⭐' },
        { rank: 10, name: 'Anna White', xp: 5900, level: 5, badges: 12, avatar: '⭐' },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  const getRankClass = (rank: number) => {
    if (rank === 1) return 'from-yellow-500 to-orange-500'
    if (rank === 2) return 'from-gray-400 to-gray-500'
    if (rank === 3) return 'from-orange-400 to-orange-500'
    return 'from-purple-500 to-pink-500'
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl animate-pulse"
              style={{
                width: `${Math.random() * 150 + 30}px`,
                height: `${Math.random() * 150 + 30}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/50 to-indigo-950/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        {/* Header */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm text-yellow-300 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30 mb-6 animate-[bounce_2s_infinite]">
                <Trophy className="h-4 w-4" />
                <span>Top Learners</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
                <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Global Leaderboard
                </span>
              </h1>

              <p className="text-lg md:text-xl text-pink-200/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                See who's dominating the coding challenges and climbing the ranks!
              </p>
            </div>
          </div>
        </section>

        {/* Leaderboard Table */}
        <section className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-sm border-2 border-purple-500/20 shadow-2xl shadow-purple-500/20">
              <CardHeader className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-purple-500/30 pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-3xl text-white">
                    <div className="flex items-center gap-3">
                      <Trophy className="h-8 w-8 text-yellow-400" />
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        Rankings
                      </span>
                    </div>
                  </CardTitle>
                  <div className="text-sm text-purple-200/70">
                    Updated: {new Date().toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="py-16 text-center">
                    <div className="animate-spin text-4xl">⏳</div>
                    <p className="text-purple-200/70 mt-4">Loading rankings...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-purple-500/30">
                          <th className="text-left py-4 px-6 text-sm font-semibold text-purple-200">Rank</th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-purple-200">Learner</th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-purple-200">Level</th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-purple-200">XP</th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-purple-200">Badges</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboardData.map((entry, index) => (
                          <tr
                            key={entry.rank}
                            className={`border-b border-purple-500/10 hover:bg-purple-500/10 transition-all ${
                              index === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10' : ''
                            }`}
                          >
                            <td className="py-4 px-6">
                              <div className={`flex items-center gap-3`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${entry.rank <= 3 ? 'bg-gradient-to-br ' + getRankClass(entry.rank) + ' text-white shadow-lg' : 'bg-purple-500/20 text-purple-300'}`}>
                                  {getRankIcon(entry.rank)}
                                </div>
                                {entry.rank <= 3 && (
                                  <Crown className="h-5 w-5 text-yellow-400" />
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-lg text-white shadow">
                                  👤
                                </div>
                                <div>
                                  <div className="font-semibold text-white">{entry.name}</div>
                                  <div className="text-xs text-purple-200/60">Level {entry.level}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                                entry.level >= 15 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
                                entry.level >= 10 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                                'bg-purple-500/20 text-purple-300'
                              }`}>
                                {entry.level}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-yellow-400" />
                                <span className="text-2xl font-bold text-white">{entry.xp.toLocaleString()}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{entry.badges}</span>
                                <span className="text-sm text-purple-200/70">badges</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-purple-500/20 bg-indigo-950/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <div className="text-lg font-bold text-white">CodeQuest</div>
                <div className="text-sm text-purple-200/60">Learn to Code Through Adventure</div>
              </div>
              <div className="flex gap-6 text-sm text-purple-200/60 justify-center md:justify-end">
                <Link href="/" className="hover:text-white transition-colors font-medium">
                  Home
                </Link>
                <Link href="/courses" className="hover:text-white transition-colors font-medium">
                  Courses
                </Link>
                <Link href="/auth/signin" className="hover:text-white transition-colors font-medium">
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