'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, BookOpen, Clock, Users, Star } from 'lucide-react'

const courses = [
  {
    id: 'javascript',
    title: 'JavaScript Mastery',
    description: 'Master JavaScript from basics to advanced concepts including ES6+ features',
    icon: '⚔️',
    color: 'from-purple-600 to-pink-600',
    level: 'Beginner to Advanced',
    lessons: 10,
    duration: '20 hours',
    students: 15420,
    rating: 4.9,
    reviews: 342,
    xp: 4000,
    topics: ['Variables', 'Functions', 'Objects', 'Arrays', 'DOM', 'Async/Await', 'ES6+']
  },
  {
    id: 'python',
    title: 'Python Mastery',
    description: 'Learn Python programming from scratch to building real applications',
    icon: '🐍',
    color: 'from-green-600 to-emerald-600',
    level: 'Beginner to Intermediate',
    lessons: 10,
    duration: '18 hours',
    students: 12350,
    rating: 4.8,
    reviews: 289,
    xp: 3500,
    topics: ['Variables', 'Control Flow', 'Functions', 'OOP', 'File Handling', 'APIs']
  },
  {
    id: 'react',
    title: 'React Quest',
    description: 'Build modern web applications with React hooks and components',
    icon: '⚛️',
    color: 'from-blue-600 to-cyan-600',
    level: 'Intermediate to Advanced',
    lessons: 25,
    duration: '25 hours',
    students: 9870,
    rating: 4.7,
    reviews: 198,
    xp: 5000,
    topics: ['Components', 'Hooks', 'State', 'Effects', 'Context', 'Performance']
  },
  {
    id: 'typescript',
    title: 'TypeScript Legends',
    description: 'Master type-safe JavaScript with TypeScript',
    icon: '💎',
    color: 'from-indigo-600 to-purple-600',
    level: 'Intermediate to Advanced',
    lessons: 20,
    duration: '22 hours',
    students: 8230,
    rating: 4.6,
    reviews: 165,
    xp: 4500,
    topics: ['Types', 'Interfaces', 'Generics', 'Decorators', 'Advanced Types']
  },
  {
    id: 'api',
    title: 'API Development',
    description: 'Build and consume RESTful APIs with modern best practices',
    icon: '🔌',
    color: 'from-orange-600 to-red-600',
    level: 'Intermediate to Advanced',
    lessons: 20,
    duration: '20 hours',
    students: 6540,
    rating: 4.5,
    reviews: 142,
    xp: 4200,
    topics: ['REST', 'Endpoints', 'Authentication', 'Testing', 'Documentation']
  }
]

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState('all')

  const filteredCourses = activeTab === 'all'
    ? courses
    : courses.filter(course => {
        if (activeTab === 'beginner') return course.level.includes('Beginner')
        if (activeTab === 'advanced') return course.level.includes('Advanced')
        return true
      })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">
              Choose Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Learning Path</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Master programming through interactive lessons and hands-on coding challenges
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-xl transition-all border-2 hover:border-primary/30">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${course.color} text-white`}>
                    <span className="text-4xl">{course.icon}</span>
                  </div>
                  <Badge>{course.level}</Badge>
                </div>
                <CardTitle className="text-2xl mt-4">{course.title}</CardTitle>
                <CardDescription className="text-base">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {course.topics.slice(0, 4).map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  {course.topics.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{course.topics.length - 4} more
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-4 text-center pt-4 border-t">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-sm font-semibold text-primary">
                      <BookOpen className="h-3 w-3" />
                      <span>{course.lessons}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Lessons</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-sm font-semibold text-primary">
                      <Clock className="h-3 w-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-sm font-semibold text-primary">
                      <Users className="h-3 w-3" />
                      <span>{(course.students / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Students</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-sm font-semibold text-yellow-500">
                      <Star className="h-3 w-3" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Course Rewards</span>
                    <span className="font-semibold">{course.xp} XP</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>

                <Link href={`/courses/${course.id}/learn`} className="block">
                  <Button className="w-full group-hover:scale-105 transition-transform" size="lg">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}