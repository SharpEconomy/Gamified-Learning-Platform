'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Award, BookOpen, Target, Zap, Trophy, Flame, Calendar, Lock } from 'lucide-react'

export default function ProfilePage() {
  const { user, signOut, isAuthenticated } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (!isAuthenticated()) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Not Signed In</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Please sign in to view your profile.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const userData = user!

  // Calculate progress to next level (assuming 1000 XP per level)
  const currentLevelXp = (userData.level - 1) * 1000
  const xpToNextLevel = userData.level * 1000
  const xpProgress = ((userData.xp - currentLevelXp) / 1000) * 100

  // Mock badges
  const badges = [
    { id: 1, name: 'First Steps', icon: Target, color: 'bg-green-500', unlocked: true },
    { id: 2, name: 'Quick Learner', icon: Zap, color: 'bg-yellow-500', unlocked: true },
    { id: 3, name: 'Week Warrior', icon: Flame, color: 'bg-orange-500', unlocked: true },
    { id: 4, name: 'Code Master', icon: Award, color: 'bg-purple-500', unlocked: false },
    { id: 5, name: 'Perfect Score', icon: Trophy, color: 'bg-blue-500', unlocked: false }
  ]

  // Mock achievements
  const achievements = [
    { id: 1, title: 'Completed First Course', description: 'Finish your first course', xp: 100, unlocked: true },
    { id: 2, title: '7-Day Streak', description: 'Maintain a 7-day learning streak', xp: 200, unlocked: true },
    { id: 3, title: 'Level 5', description: 'Reach level 5', xp: 300, unlocked: false },
    { id: 4, title: 'Complete 10 Courses', description: 'Finish 10 different courses', xp: 500, unlocked: false },
    { id: 5, title: '1000 XP in One Day', description: 'Earn 1000 XP in a single day', xp: 250, unlocked: false }
  ]

  // Mock completed courses
  const completedCourses = [
    { id: 1, title: 'JavaScript Fundamentals', completedAt: '2024-01-15', xpEarned: 100 },
    { id: 2, title: 'HTML & CSS Basics', completedAt: '2024-01-20', xpEarned: 75 },
    { id: 3, title: 'React Introduction', completedAt: '2024-02-01', xpEarned: 150 }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-purple-200">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="text-2xl bg-purple-600 text-white">
                  {userData.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
                <p className="text-muted-foreground mb-4">{userData.email}</p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <Badge variant="secondary" className="text-lg px-4 py-1">
                    <Award className="w-4 h-4 mr-1" />
                    Level {user?.level}
                  </Badge>
                  <Badge variant="outline" className="text-lg px-4 py-1">
                    <Target className="w-4 h-4 mr-1" />
                    {userData.xp} XP
                  </Badge>
                  <Badge variant="outline" className="text-lg px-4 py-1">
                    <Zap className="w-4 h-4 mr-1" />
                    {userData.tokens} Tokens
                  </Badge>
                </div>
              </div>

              <Button onClick={signOut} variant="outline" className="w-full md:w-auto">
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Level Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Level {userData.level}</span>
                    <span className="text-muted-foreground">
                      {userData.xp}/{userData.level * 1000} XP
                    </span>
                  </div>
                  <Progress value={xpProgress} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {1000 - (userData.xp % 1000)} XP to Level {userData.level + 1}
                </p>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <span className="text-sm">Current Streak</span>
                    </div>
                    <span className="font-semibold">{userData.streak} days</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm">Max Streak</span>
                    </div>
                    <span className="font-semibold">{userData.maxStreak} days</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">Courses Completed</span>
                    </div>
                    <span className="font-semibold">{userData.completedCourses}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Badges</CardTitle>
                <CardDescription>
                  {badges.filter(b => b.unlocked).length} of {badges.length} unlocked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {badges.map((badge) => {
                    const Icon = badge.icon
                    return (
                      <div
                        key={badge.id}
                        className={`flex flex-col items-center p-2 rounded-lg ${
                          badge.unlocked ? 'opacity-100' : 'opacity-40'
                        }`}
                        title={badge.name}
                      >
                        <div className={`w-10 h-10 rounded-full ${badge.color} flex items-center justify-center mb-1`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs text-center leading-tight">{badge.name}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Achievements</CardTitle>
                <CardDescription>
                  {achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        achievement.unlocked
                          ? 'bg-white border-gray-200'
                          : 'bg-gray-50 border-gray-100 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          achievement.unlocked ? 'bg-purple-600' : 'bg-gray-300'
                        }`}
                      >
                        {achievement.unlocked ? (
                          <Award className="w-5 h-5 text-white" />
                        ) : (
                          <Lock className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-purple-600">
                          +{achievement.xp} XP
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Completed Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Completed Courses</CardTitle>
                <CardDescription>
                  {completedCourses.length} courses finished
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {completedCourses.map((course) => (
                    <div
                      key={course.id}
                      className="p-3 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm flex-1">{course.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {course.xpEarned} XP
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>Completed on {course.completedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {completedCourses.length === 0 && (
                  <p className="text-center text-muted-foreground text-sm py-4">
                    No courses completed yet
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Tokens Balance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tokens Balance</CardTitle>
                <CardDescription>
                  Earn tokens by completing courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="text-4xl font-bold text-yellow-500 mb-2">
                    {userData.tokens}
                  </div>
                  <p className="text-sm text-muted-foreground">Tokens Available</p>
                </div>
                <Button className="w-full" variant="outline">
                  Redeem Tokens
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}