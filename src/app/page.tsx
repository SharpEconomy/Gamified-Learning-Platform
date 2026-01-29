'use client'

import LiveWorldBackground from '@/components/LiveWorldBackground'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useMemo, lazy, Suspense } from 'react'
import { Gamepad2, BookOpen, Zap, Trophy, Code2, ArrowRight, Users, Star, Play, Flame, Award } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

// Lazy load testimonials for better performance
const TestimonialsSection = lazy(() => import('./components/testimonials-section'))

// Import Games Section
import GamesSection from '@/components/GamesSection'

// Static data outside component to prevent re-creation on every render
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
    icon: <BookOpen className="h-8 w-8" aria-hidden="true" />,
    title: 'Interactive Lessons',
    description: 'Write and run code directly in your browser with real-time feedback',
    color: 'text-purple-600'
  },
  {
    icon: <Zap className="h-8 w-8" aria-hidden="true" />,
    title: 'Earn XP & Badges',
    description: 'Level up as you complete lessons and unlock achievement badges',
    color: 'text-amber-600'
  },
  {
    icon: <Trophy className="h-8 w-8" aria-hidden="true" />,
    title: 'Track Progress',
    description: 'Monitor your learning journey with detailed progress analytics',
    color: 'text-pink-600'
  },
  {
    icon: <Code2 className="h-8 w-8" aria-hidden="true" />,
    title: 'Real Challenges',
    description: 'Solve coding problems and build real-world projects',
    color: 'text-cyan-600'
  }
]

const testimonials = [
  {
    name: 'Moses',
    role: 'Software Developer',
    location: 'Brooklyn, NY',
    avatar: '👨‍💻',
    content: 'CodeQuest helped reignite my passion for coding after Holiday Hackathon. Since then I have connected with people who share similar interests as I do. It feels like home. Full credits to this platform on landing my first tech job!'
  },
  {
    name: 'Evangelene',
    role: 'Frontend Engineer',
    location: 'Singapore',
    avatar: '👩‍💻',
    content: 'The CodeQuest community feels like a comforting, hot cup of matcha latte on a cold rainy day. It\'s a warm and cozy space to be in despite our diverse backgrounds and beginnings.'
  }
] as Array<{
  name: string
  role: string
  location: string
  content: string
  avatar: string
}>

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Memoize features array to prevent unnecessary re-renders
  const memoizedFeatures = useMemo(() => features, [])

  // Prevent hydration mismatch
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

  return (
  <>
    <LiveWorldBackground />

    <div className="min-h-screen flex flex-col">
      {/* Main Content - Semantically structured */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden" aria-labelledby="hero-heading">
          <div className="container mx-auto px-4">
            <header className="max-w-4xl mx-auto text-center">
              {/* Animated Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-purple-600 mb-8 animate-[bounce_2s_infinite]" aria-live="polite">
                <Flame className="h-4 w-4" aria-hidden="true" />
                <span>The most fun way to learn code</span>
              </div>

              <h1 id="hero-heading" className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
                Start Your Coding{' '}
                <span className="block bg-gradient-to-r from-purple-700 via-pink-700 to-cyan-700 bg-clip-text text-transparent mt-2 animate-[gradient_3s_ease-in-out_infinite]">
                  Journey Today
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-10 leading-relaxed">
                Learn to code through gamified interactive adventures. Complete bite-sized lessons, earn XP, and build real-world projects while having fun!
              </p>

              {/* CTA Buttons - With proper semantics and accessibility */}
              <nav className="flex flex-col sm:flex-row gap-4 justify-center" aria-label="Main navigation">
                <Link href="/courses">
                  <Button
                    size="lg"
                    className="text-base h-14 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105 focus:ring-2 focus:ring-purple-300"
                    aria-label="Explore all available courses and start learning"
                  >
                    <Play className="mr-2 h-5 w-5" aria-hidden="true" />
                    Explore Courses
                  </Button>
                </Link>
                <Link href="/games">
                  <Button
                    size="lg"
                    className="text-base h-14 px-8 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-105 focus:ring-2 focus:ring-orange-300"
                    aria-label="Play interactive games to learn coding"
                  >
                    <Gamepad2 className="mr-2 h-5 w-5" aria-hidden="true" />
                    Play Games
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base h-14 px-8 border-2 border-slate-700 text-slate-800 hover:bg-slate-100 hover:border-slate-800 focus:ring-2 focus:ring-purple-300"
                  onClick={() => handleStartCourse('/courses/javascript/learn')}
                  aria-label="Try a demo lesson to experience CodeQuest"
                >
                  Try Demo Lesson
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </nav>

              {/* Trust Indicators - Semantic dl/dt/dd */}
              <dl className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-slate-600">
                <div className="flex items-center gap-2" role="group">
                  <Users className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Number of active learners</span>
                  <span className="font-semibold text-slate-900">10K+ Learners</span>
                </div>
                <div className="flex items-center gap-2" role="group">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Number of available lessons</span>
                  <span className="font-semibold text-slate-900">100+ Lessons</span>
                </div>
                <div className="flex items-center gap-2" role="group">
                  <Star className="h-4 w-4 text-amber-500" aria-hidden="true" />
                  <span className="sr-only">User rating out of 5</span>
                  <span className="font-semibold text-amber-600">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2" role="group">
                  <Award className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Number of available badges</span>
                  <span className="font-semibold text-slate-900">Badges & XP</span>
                </div>
              </dl>
            </header>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-purple-300/30 bg-white/70 backdrop-blur-sm" aria-labelledby="stats-heading">
          <div className="container mx-auto px-4">
            <h2 id="stats-heading" className="sr-only">Platform Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Lessons', value: '100+', icon: BookOpen, color: 'text-purple-600' },
                { label: 'Exercises', value: '500+', icon: Code2, color: 'text-pink-600' },
                { label: 'Badges', value: '25+', icon: Award, color: 'text-amber-600' },
                { label: 'Projects', value: '20+', icon: Trophy, color: 'text-cyan-600' }
              ].map((stat, index) => (
                <div key={index} className="text-center group" role="group">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-3 border border-purple-400/40 group-hover:border-purple-500/60 transition-all" aria-hidden="true">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - Semantic structure */}
        <section className="py-24" aria-labelledby="features-heading">
          <div className="container mx-auto px-4">
            <header className="text-center mb-16">
              <h2 id="features-heading" className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                Why Choose <span className="bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">CodeQuest</span>?
              </h2>
              <p className="text-lg text-slate-700 max-w-2xl mx-auto">
                Learn programming in a fun way with interactive challenges and rewards
              </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {memoizedFeatures.map((feature, index) => (
                <article key={index} className="text-center group hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm border border-slate-300/50 hover:border-slate-400 hover:shadow-lg">
                  <Card>
                    <CardHeader>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4 border border-purple-400/30 group-hover:scale-110 transition-transform" aria-hidden="true">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl text-slate-900">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-slate-600">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-24 bg-white/70 backdrop-blur-sm border-y border-purple-300/30" aria-labelledby="courses-heading">
          <div className="container mx-auto px-4">
            <header className="text-center mb-16">
              <h2 id="courses-heading" className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                Start Your <span className="bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">Learning Journey</span>
              </h2>
              <p className="text-lg text-slate-700 max-w-2xl mx-auto">
                Choose a course and begin your coding adventure today
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {courses.map((course) => (
                <article
                  key={course.id}
                  className="group cursor-pointer hover:scale-105 transition-all duration-300"
                  role="button"
                  tabIndex={0}
                  aria-label={`${course.title} course with ${course.lessons} lessons and ${course.xp} XP`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleStartCourse(course.link)
                    }
                  }}
                  onClick={() => handleStartCourse(course.link)}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-2 border-slate-300/50 hover:border-slate-500/60 hover:shadow-xl hover:shadow-purple-500/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`p-6 rounded-2xl bg-gradient-to-br ${course.color} text-white shadow-lg group-hover:scale-110 transition-transform`} aria-hidden="true">
                          <span className="text-5xl">{course.icon}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <CardTitle className="text-2xl text-slate-900 mb-2">{course.title}</CardTitle>
                        <CardDescription className="text-base text-slate-600">
                          {course.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <BookOpen className="h-4 w-4" aria-hidden="true" />
                          <span aria-label={`${course.lessons} lessons available`}>{course.lessons} lessons</span>
                        </div>
                        <ArrowRight className="h-5 w-5 text-purple-600 group-hover:translate-x-1 group-hover:text-purple-700 transition-all focus-within:translate-x-1 focus-within:text-purple-700" aria-hidden="true" />
                      </div>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/courses"
                className="inline-flex items-center"
                aria-label="View all available courses"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-700 text-slate-800 hover:bg-slate-100 hover:border-slate-800 px-8 focus:ring-2 focus:ring-purple-300"
                >
                  View All Courses
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Games Section - Interactive Learning Games */}
        <GamesSection />

        {/* Testimonials Section - Lazy loaded with Suspense */}
        <section className="py-24" aria-labelledby="testimonials-heading">
          <div className="container mx-auto px-4">
            <header className="text-center mb-16">
              <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                Loved by <span className="bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">Learners</span> Worldwide
              </h2>
              <p className="text-lg text-slate-700 max-w-2xl mx-auto">
                Join thousands of learners who've transformed their careers
              </p>
            </header>

            <Suspense fallback={
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" aria-busy="true" aria-live="polite" aria-label="Loading testimonials">
                {[1, 2].map((i) => (
                  <Card key={i} className="animate-pulse bg-white/80 backdrop-blur-sm border border-slate-300/50">
                    <CardContent className="h-64" aria-hidden="true"></CardContent>
                  </Card>
                ))}
              </div>
            }>
              <TestimonialsSection testimonials={testimonials} />
            </Suspense>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-purple-700/80 to-pink-700/80 backdrop-blur-sm" aria-labelledby="cta-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-purple-100 px-4 py-2 rounded-full text-sm font-medium border border-white/30 mb-6">
                <Flame className="h-4 w-4" aria-hidden="true" />
                <span>Ready to begin?</span>
              </div>

              <h2 id="cta-heading" className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Join Our <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Adventure</span>
              </h2>

              <p className="text-lg md:text-xl text-purple-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                Start your coding journey today for free. No credit card required. Learn at your own pace, build real projects, and join a supportive community of learners.
              </p>

              <nav className="flex flex-col sm:flex-row gap-4 justify-center" aria-label="Call to action">
                <Link href="/courses">
                  <Button
                    size="lg"
                    className="text-base h-14 px-10 bg-white text-purple-700 hover:bg-purple-50 shadow-xl hover:shadow-2xl transition-all hover:scale-105 focus:ring-2 focus:ring-purple-200"
                    aria-label="Start learning now with free courses"
                  >
                    <Play className="mr-2 h-5 w-5" aria-hidden="true" />
                    Start Learning Now
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base h-14 px-10 border-2 border-white text-white hover:bg-white/10 px-8 focus:ring-2 focus:ring-purple-200"
                    aria-label="Sign up for free account"
                  >
                    Sign Up Free
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
              </nav>

              {/* Social Proof */}
              <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-purple-200">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2" aria-label="Community indicator" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"></div>
                    ))}
                  </div>
                  <span aria-label="10,000 plus learners">Join 10,000+ learners</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-400" aria-hidden="true" />
                  <span className="text-amber-300" aria-label="4.9 out of 5 star rating">4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Sticky footer */}
        <footer className="border-t border-purple-300/30 bg-white/90 backdrop-blur-sm mt-auto">
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg" aria-hidden="true">
                  <Gamepad2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xl font-bold text-slate-900">CodeQuest</span>
                  <span className="block text-xs text-slate-600">Learn to Code Through Adventure</span>
                </div>
              </div>

              <nav className="flex flex-wrap justify-center gap-8 text-sm text-slate-600" aria-label="Footer navigation">
                <Link href="/courses" className="hover:text-purple-700 transition-colors font-medium focus:underline underline-offset-4">
                  Courses
                </Link>
                <Link href="/leaderboard" className="hover:text-purple-700 transition-colors font-medium focus:underline underline-offset-4">
                  Leaderboard
                </Link>
                <Link href="/auth/signin" className="hover:text-purple-700 transition-colors font-medium focus:underline underline-offset-4">
                  Sign In
                </Link>
              </nav>
            </div>

            <div className="mt-8 pt-8 border-t border-purple-300/30 text-center">
              <p className="text-sm text-slate-600">
                © 2024 CodeQuest. All rights reserved. Made with ❤️ for learners everywhere.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  </>
)
}