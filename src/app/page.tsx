'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Gamepad2, BookOpen, Zap, Trophy, Code2, ArrowRight, Users, Star, Play, Flame, Award } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleStartCourse = (courseLink: string) => {
    if (isAuthenticated()) {
      router.push(courseLink)
    } else {
      router.push('/auth/signin')
    }
  }

  if (!mounted) {
    return null
  }

  const courses = [
    {
      id: 'javascript',
      title: 'JavaScript Mastery',
      description: 'Master JavaScript from basics to advanced concepts',
      icon: '⚔️',
      lessons: 40,
      xp: 4000,
      link: '/courses/javascript/learn',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'python',
      title: 'Python Mastery',
      description: 'Learn Python programming from scratch to building applications',
      icon: '🐍',
      lessons: 35,
      xp: 3500,
      link: '/courses/python/learn',
      color: 'from-green-600 to-emerald-600'
    }
  ]

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'Write and run code directly in your browser with real-time feedback',
      color: 'text-purple-400'
    },
    {
      icon: Zap,
      title: 'Earn XP & Badges',
      description: 'Level up as you complete lessons and unlock achievement badges',
      color: 'text-yellow-400'
    },
    {
      icon: Trophy,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed progress analytics',
      color: 'text-pink-400'
    },
    {
      icon: Code2,
      title: 'Real Challenges',
      description: 'Solve coding problems and build real-world projects',
      color: 'text-cyan-400'
    }
  ]

  const testimonials = [
    {
      name: 'Moses',
      role: 'Software Developer',
      location: 'Brooklyn, NY',
      content: 'CodeQuest helped reignite my passion for coding after Holiday Hackathon. Since then I have connected with people who share similar interests as I do. It feels like home. Full credits to this platform on landing my first tech job!'
    },
    {
      name: 'Evangelene',
      role: 'Frontend Engineer',
      location: 'Singapore',
      content: 'The CodeQuest community feels like a comforting, hot cup of matcha latte on a cold rainy day. It\'s a warm and cozy space to be in despite our diverse backgrounds and beginnings.'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-purple-500/20 blur-xl animate-pulse"
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-32 left-16 w-40 h-40 border-2 border-purple-500/20 rotate-12 animate-[spin_25s_linear_infinite]">
          <div className="w-full h-full border border-purple-400/10 rotate-45"></div>
        </div>

        <div className="absolute top-48 right-24 w-32 h-32 border-2 border-pink-500/20 rotate-[-12deg] animate-[spin_30s_linear_infinite_reverse]">
          <div className="w-full h-full border border-pink-400/10 rotate-45"></div>
        </div>

        <div className="absolute bottom-48 left-24 w-24 h-24 border-2 border-cyan-500/20 rotate-24 animate-[spin_22s_linear_infinite]">
          <div className="w-full h-full border border-cyan-400/10 rotate-45"></div>
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-[pulse_5s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-600/5 rounded-full blur-3xl animate-[pulse_7s_ease-in-out_infinite]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Animated Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30 mb-8 animate-[bounce_2s_infinite]">
                <Flame className="h-4 w-4" />
                <span>The most fun way to learn code</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                Start Your Coding{' '}
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mt-2 animate-[gradient_3s_ease-in-out_infinite]">
                  Journey Today
                </span>
              </h1>

              <p className="text-lg md:text-xl text-purple-200/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                Learn to code through gamified interactive adventures. Complete bite-sized lessons, earn XP, and build real-world projects while having fun!
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/courses">
                  <Button size="lg" className="text-base h-14 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105">
                    <Play className="mr-2 h-5 w-5" />
                    Explore Courses
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base h-14 px-8 border-2 border-purple-500/50 hover:bg-purple-500/10 hover:border-purple-400"
                  onClick={() => handleStartCourse('/courses/javascript/learn')}
                >
                  Try Demo Lesson
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-purple-200/70">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>10K+ Learners</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>100+ Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>Badges & XP</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-purple-500/20 bg-slate-900/60 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Lessons', value: '100+', icon: BookOpen, color: 'text-purple-400' },
                { label: 'Exercises', value: '500+', icon: Code2, color: 'text-pink-400' },
                { label: 'Badges', value: '25+', icon: Award, color: 'text-yellow-400' },
                { label: 'Projects', value: '20+', icon: Trophy, color: 'text-cyan-400' }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center mx-auto mb-3 border border-purple-500/20 group-hover:border-purple-400/40 transition-all">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-purple-200/70 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Why Choose <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">CodeQuest</span>?
              </h2>
              <p className="text-lg text-purple-200/80 max-w-2xl mx-auto">
                Learn programming in a fun way with interactive challenges and rewards
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="text-center group hover:scale-105 transition-all duration-300 bg-slate-900/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/10">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4 border border-purple-500/30 group-hover:scale-110 transition-transform">
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl text-white mb-2">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-purple-200/70">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-24 bg-slate-900/40 backdrop-blur-sm border-y border-purple-500/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Start Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Learning Journey</span>
              </h2>
              <p className="text-lg text-purple-200/80 max-w-2xl mx-auto">
                Choose a course and begin your coding adventure today
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {courses.map((course) => (
                <Card 
                  key={course.id} 
                  onClick={() => handleStartCourse(course.link)}
                  className="group cursor-pointer hover:scale-105 transition-all duration-300 bg-slate-900/60 backdrop-blur-sm border-2 border-purple-500/20 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-500/20"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-6 rounded-2xl bg-gradient-to-br ${course.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <span className="text-5xl">{course.icon}</span>
                      </div>
                      <div className={`px-3 py-1 bg-gradient-to-r ${course.color} border-0 rounded`}>
                        <CardContent className="p-0">
                          <div className="flex items-center gap-2">
                            <Zap className="h-3 w-3 text-white" />
                            <span className="text-white text-xs font-bold">{course.xp} XP</span>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                    <div className="mt-4">
                      <CardTitle className="text-2xl text-white mb-2">{course.title}</CardTitle>
                      <CardDescription className="text-base text-purple-200/70">
                        {course.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-purple-200/70">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-purple-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/courses">
                <Button size="lg" variant="outline" className="border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:text-white hover:border-purple-400 px-8">
                  View All Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Loved by <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Learners</span> Worldwide
              </h2>
              <p className="text-lg text-purple-200/80 max-w-2xl mx-auto">
                Join thousands of learners who've transformed their careers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-slate-900/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/30 hover:scale-[1.02] transition-all">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl">
                        👨‍💻
                      </div>
                      <div>
                        <div className="font-semibold text-white text-lg">{testimonial.name}</div>
                        <div className="text-sm text-purple-200/70">{testimonial.role}</div>
                        <div className="text-xs text-purple-300/60">{testimonial.location}</div>
                      </div>
                    </div>
                    <p className="text-purple-200/80 leading-relaxed">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30 mb-6">
                <Flame className="h-4 w-4" />
                <span>Ready to begin?</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Join the <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Adventure</span>
              </h2>
              
              <p className="text-lg md:text-xl text-purple-200/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Start your coding journey today for free. No credit card required. Learn at your own pace, build real projects, and join a supportive community of learners.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/courses">
                  <Button size="lg" className="text-base h-14 px-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105">
                    <Play className="mr-2 h-5 w-5" />
                    Start Learning Now
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button size="lg" variant="outline" className="text-base h-14 px-10 border-2 border-purple-500/50 hover:bg-purple-500/10 hover:text-white hover:border-purple-400">
                    Sign Up Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-purple-200/70">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-slate-900"></div>
                    ))}
                  </div>
                  <span>Join 10,000+ learners</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-400">4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-purple-500/20 bg-slate-900/80 backdrop-blur-sm mt-auto">
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg">
                  <Gamepad2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xl font-bold text-white">CodeQuest</span>
                  <span className="block text-xs text-purple-200/60">Learn to Code Through Adventure</span>
                </div>
              </div>
              
              <div className="flex gap-8 text-sm text-purple-200/60">
                <Link href="/courses" className="hover:text-white transition-colors font-medium">
                  Courses
                </Link>
                <Link href="/leaderboard" className="hover:text-white transition-colors font-medium">
                  Leaderboard
                </Link>
                <Link href="/auth/signin" className="hover:text-white transition-colors font-medium">
                  Sign In
                </Link>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-purple-500/20 text-center">
              <p className="text-sm text-purple-200/60">
                © 2024 CodeQuest. All rights reserved. Made with ❤️ for learners everywhere.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}