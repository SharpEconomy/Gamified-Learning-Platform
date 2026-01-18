'use client'
import { useAuth } from '@/contexts/AuthContext'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, Play, CheckCircle, ChevronRight, ChevronLeft, Lightbulb, Trophy, Star, Zap, Award, Download, BookOpen, Medal, Target } from 'lucide-react'
import { useTheme } from 'next-themes'

interface Badge {
  id: string
  name: string
  icon: string
  description: string
  color: string
}

interface Lesson {
  id: number
  title: string
  description: string
  difficulty: string
  xp: number
  tokens: number
  duration: string
  completed: boolean
  content: {
    introduction: string
    explanation: string
    code: string
    challenge: string
    expectedOutput: string
  }
}

interface Course {
  id: string
  title: string
  icon: string
  category: string
  color: string
  description: string
  lessons: Lesson[]
  totalXP: number
  totalTokens: number
}

const badges: Badge[] = [
  { id: 'first-steps', name: 'First Steps', icon: '👣', description: 'Complete your first lesson', color: 'bg-green-500' },
  { id: 'quick-learner', name: 'Quick Learner', icon: '⚡', description: 'Complete 3 lessons in one session', color: 'bg-yellow-500' },
  { id: 'code-warrior', name: 'Code Warrior', icon: '⚔️', description: 'Complete 5 lessons', color: 'bg-orange-500' },
  { id: 'halfway', name: 'Halfway There', icon: '🎯', description: 'Complete 50% of a course', color: 'bg-blue-500' },
  { id: 'dedicated', name: 'Dedicated', icon: '🔥', description: 'Complete 10 lessons', color: 'bg-purple-500' },
  { id: 'master', name: 'Course Master', icon: '👑', description: 'Complete entire course', color: 'bg-gradient-to-r from-purple-600 to-pink-600' },
  { id: 'perfectionist', name: 'Perfectionist', icon: '⭐', description: 'Complete course with 100% correct answers', color: 'bg-gradient-to-r from-yellow-400 to-orange-500' },
  { id: 'streak-5', name: '5 Day Streak', icon: '🔥', description: 'Complete 5 lessons 5 days in a row', color: 'bg-red-500' },
  { id: 'all-correct', name: 'All Correct', icon: '💎', description: 'Get 10 lessons correct in a row', color: 'bg-gradient-to-r from-purple-600 to-pink-600' },
]

// JavaScript Mastery - 10 Lessons
const javascriptLessons: Lesson[] = [
  { id: 1, title: 'Hello World', description: 'Your first JavaScript program', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '10 min', completed: false, content: { introduction: 'Welcome to JavaScript! Let\'s start with "Hello World" program.', explanation: 'In JavaScript, we use `console.log()` to print messages to the console. This is the most basic and essential debugging tool in JavaScript.', code: '// Your first JavaScript program\nconsole.log("Hello, World!");', challenge: 'Modify the code to print "Hello, CodeQuest!"', expectedOutput: 'Hello, CodeQuest!' } },
  { id: 2, title: 'Variables', description: 'Store data with variables', difficulty: 'Beginner', xp: 75, tokens: 6, duration: '15 min', completed: false, content: { introduction: 'Learn to store data in variables.', explanation: 'Variables hold values for later use.', code: 'let name = "Hero";\nlet gold = 50;\nconsole.log(name, gold);', challenge: 'Print the name and gold variables', expectedOutput: 'Hero\n50' } },
  { id: 3, title: 'Data Types', description: 'Understanding JavaScript data types', difficulty: 'Beginner', xp: 75, tokens: 6, duration: '15 min', completed: false, content: { introduction: 'Numbers, strings, booleans, and more.', explanation: 'JavaScript has primitive and reference types.', code: 'let num = 42;\nlet str = "Hello";\nlet bool = true;', challenge: 'Print each variable on a new line', expectedOutput: '42\nHello\ntrue' } },
  { id: 4, title: 'Operators', description: 'Math and comparison operators', difficulty: 'Beginner', xp: 75, tokens: 6, duration: '15 min', completed: false, content: { introduction: '+, -, *, /, ===, !==, &&, ||', explanation: 'Operators allow you to manipulate values.', code: 'let x = 10;\nlet y = 5;\nconsole.log(x + y);\nconsole.log(x > y);', challenge: 'Add console.log to print 15 (the sum of x and y)', expectedOutput: '15' } },
  { id: 5, title: 'Strings', description: 'Working with text strings', difficulty: 'Beginner', xp: 75, tokens: 6, duration: '15 min', completed: false, content: { introduction: 'Concatenation, length, indexing.', explanation: 'Strings are immutable sequences of characters.', code: 'let text = "Hello";\nconsole.log(text.length);', challenge: 'Print the length of text variable', expectedOutput: '5' } },
  { id: 6, title: 'Arrays', description: 'Lists of values', difficulty: 'Beginner', xp: 75, tokens: 6, duration: '15 min', completed: false, content: { introduction: 'Arrays store multiple values.', explanation: 'Use [] to create arrays.', code: 'let arr = [1, 2, 3];\narr.push(4);', challenge: 'Print the array using console.log(arr)', expectedOutput: '[1, 2, 3, 4]' } },
  { id: 7, title: 'Objects', description: 'Key-value pairs', difficulty: 'Beginner', xp: 75, tokens: 6, duration: '15 min', completed: false, content: { introduction: 'Objects store related data.', explanation: 'Use {} for objects.', code: 'let player = { name: "Hero", hp: 100 };\nconsole.log(player.name);', challenge: 'Print player.name', expectedOutput: 'Hero' } },
  { id: 8, title: 'Conditionals', description: 'if/else statements', difficulty: 'Beginner', xp: 75, tokens: 6, duration: '15 min', completed: false, content: { introduction: 'Make decisions in your code.', explanation: 'if checks conditions.', code: 'let level = 5;\nif (level > 3) console.log("Strong!");', challenge: 'Change level to 10 so it prints "Strong!"', expectedOutput: 'Strong!' } },
  { id: 9, title: 'Loops', description: 'Repeating code', difficulty: 'Beginner', xp: 75, tokens: 6, duration: '15 min', completed: false, content: { introduction: 'for loops repeat code.', explanation: 'Loop while condition is true.', code: 'for (let i = 0; i < 5; i++) {\n  console.log(i);\n}', challenge: 'Print numbers from 10 down to 6 (one per line)', expectedOutput: '10\n9\n8\n7\n6' } },
  { id: 10, title: 'Functions Basics', description: 'Create reusable code blocks', difficulty: 'Beginner', xp: 75, tokens: 6, duration: '15 min', completed: false, content: { introduction: 'Functions perform tasks.', explanation: 'function defines reusable code.', code: 'function greet(name) {\n  return "Hello " + name;\n}', challenge: 'Call greet() with your name and print result', expectedOutput: 'Hello, [Your Name]' } },
]

// Python Adventures - 5 Lessons
const pythonLessons: Lesson[] = [
  { id: 1, title: 'Hello World', description: 'Your first Python program', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '10 min', completed: false, content: { introduction: 'Welcome to Python!', explanation: 'Use print() to output text.', code: 'print("Hello, World!");', challenge: 'Modify to print "Hello, CodeQuest!"', expectedOutput: 'Hello, CodeQuest!' } },
  { id: 2, title: 'Variables', description: 'Store data', difficulty: 'Beginner', xp: 75, tokens: 6, duration: '15 min', completed: false, content: { introduction: 'Python stores data in variables.', explanation: 'No type declarations needed.', code: 'name = "Hero"\ngold = 50', challenge: 'Create a variable named score with value 100 and print it', expectedOutput: '100' } },
  { id: 3, title: 'Data Types', description: 'int, float, str, bool', difficulty: 'Beginner', xp: 75, tokens: 6, duration: '15 min', completed: false, content: { introduction: 'Different data types.', explanation: 'Python is dynamically typed.', code: 'age = 25\nprice = 19.99\nis_active = True', challenge: 'Print all three variables on separate lines', expectedOutput: '25\n19.99\nTrue' } },
  { id: 4, title: 'Strings', description: 'Working with text', difficulty: 'Beginner', xp: 75, tokens: 6, duration: '15 min', completed: false, content: { introduction: 'String methods.', explanation: 'len(), upper(), lower().', code: 'text = "Hello"\nprint(len(text))', challenge: 'Print the text variable in uppercase', expectedOutput: 'HELLO' } },
  { id: 5, title: 'Lists', description: 'Python arrays', difficulty: 'Beginner', xp: 75, tokens: 6, duration: '15 min', completed: false, content: { introduction: 'Lists store multiple items.', explanation: 'append(), indexing.', code: 'items = [1, 2, 3]', challenge: 'Print the list with double brackets [[1, 2, 3]]', expectedOutput: '[[1, 2, 3]]' } },
]

const coursesData: Record<string, Course> = {
  '1': {
    id: '1',
    title: 'JavaScript Mastery',
    icon: '⚔️',
    category: 'JavaScript',
    color: 'from-purple-600 to-pink-600',
    description: 'Master JavaScript from basics to advanced concepts',
    totalXP: 750,
    totalTokens: 60,
    lessons: javascriptLessons
  },
  '2': {
    id: '2',
    title: 'Python Adventures',
    icon: '🐍',
    category: 'Python',
    color: 'from-green-600 to-emerald-600',
    description: 'Learn Python through fun and engaging challenges',
    totalXP: 450,
    totalTokens: 30,
    lessons: pythonLessons
  }
}

export default function CourseLearnPage() {
  const params = useParams()
  //  const router = useRouter()
  const { theme } = useTheme()
  const { isAuthenticated } = useAuth()
  const courseId = params.id as string

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [userCode, setUserCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set())
  const [totalXP, setTotalXP] = useState(0)
  const [totalTokens, setTotalTokens] = useState(0)
  const [earnedBadges, setEarnedBadges] = useState<Set<string>>(new Set())
  const [showCertificate, setShowCertificate] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [earningsAnimation, setEarningsAnimation] = useState<{ xp: number; tokens: number } | null>(null)

  const course = coursesData[courseId] || coursesData['1']
  const currentLesson = course.lessons[currentLessonIndex]
  const progress = ((completedLessons.size / course.lessons.length) * 100)
  const courseCompleted = completedLessons.size === course.lessons.length

  useEffect(() => {
    setMounted(true)
    if (currentLesson) {
      setUserCode(currentLesson.content.code)
    }
    const savedData = localStorage.getItem(`course_${courseId}_progress`)
    if (savedData) {
      const data = JSON.parse(savedData)
      setCompletedLessons(new Set(data.completedLessons || []))
      setTotalXP(data.totalXP || 0)
      setTotalTokens(data.totalTokens || 0)
      setEarnedBadges(new Set(data.earnedBadges || []))
    }
  }, [courseId])

  useEffect(() => {
    const progressData = {
      completedLessons: Array.from(completedLessons),
      totalXP,
      totalTokens,
      earnedBadges: Array.from(earnedBadges)
    }
    localStorage.setItem(`course_${courseId}_progress`, JSON.stringify(progressData))
  }, [completedLessons, totalXP, totalTokens, earnedBadges, courseId])

  if (!mounted || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    )
  }

  const checkBadgeEarned = (newXP: number, consecutiveCorrect: number) => {
    const newBadges: string[] = []
    
    if (consecutiveCorrect === 1) {
      newBadges.push('first-steps')
    } else if (consecutiveCorrect >= 3) {
      newBadges.push('quick-learner')
    } else if (consecutiveCorrect >= 5) {
      newBadges.push('code-warrior')
    }
    
    if (progress >= 50 && !newBadges.includes('halfway')) {
      newBadges.push('halfway')
    }
    
    if (progress === 100 && !newBadges.includes('master')) {
      newBadges.push('master')
    }
    
    if (newBadges.length > 0) {
      setEarnedBadges(prev => new Set([...prev, ...newBadges]))
    }
    
    return newBadges
  }

  const runCode = async () => {
    setIsRunning(true)
    setOutput('')
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      const lines = userCode.split('\n').filter(line => {
        const trimmed = line.trim()
        return trimmed.startsWith('console.log') || 
               trimmed.startsWith('print') ||
               (trimmed.includes('print(') && !trimmed.startsWith('#'))
      })

      if (lines.length > 0) {
        const outputs = lines.map(line => {
          const match = line.match(/["']([^"']+)["']/)
          const fStringMatch = line.match(/\{([^}]+)\}/)
          const numberMatch = line.match(/\b(\d+)\b/)
          
          if (match) return match[1]
          if (fStringMatch) {
            const varName = fStringMatch[1]
            const varValue = userCode.match(new RegExp(`${varName}\\s*=\\s*["']?([^"'\n]+)["']?`))
            return varValue ? varValue[1] : varName
          }
          if (numberMatch) return numberMatch[1]
          return line
        }).filter(Boolean)

        const userOutput = outputs.join('\n')
        setOutput(userOutput)
        
        // Check if output matches expected answer
        const isCorrect = userOutput.trim().toLowerCase() === currentLesson.content.expectedOutput.toLowerCase()
        
        if (isCorrect && !completedLessons.has(currentLesson.id)) {
          setEarningsAnimation({
            xp: currentLesson.xp,
            tokens: currentLesson.tokens
          })
          setTotalXP(prev => prev + currentLesson.xp)
          setTotalTokens(prev => prev + currentLesson.tokens)
          setCompletedLessons(prev => new Set([...prev, currentLesson.id]))
          checkBadgeEarned(totalXP + currentLesson.xp, completedLessons.size + 1)
          
          setTimeout(() => setEarningsAnimation(null), 2000)
        } else if (!isCorrect) {
          setOutput(`❌ Incorrect! Expected: ${currentLesson.content.expectedOutput}`)
        } else if (completedLessons.has(currentLesson.id)) {
          setOutput('✅ Already completed! Try next lesson.')
        } else {
          setOutput('No output. Add console.log() or print() statements.')
        }
      } else {
        setOutput('No output. Add console.log() or print() statements to see results.')
      }
    } catch (error: any) {
      setOutput('Error: ' + error.message)
    }

    setIsRunning(false)
  }

  const nextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
    }
  }

  const previousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
    }
  }

  const generateCertificate = () => {
    setShowCertificate(true)
  }

  const downloadCertificate = () => {
    const earnedBadgesList = Array.from(earnedBadges).map(badgeId => {
      const badge = badges.find(b => b.id === badgeId)
      return badge ? `${badge.name} (${badge.description})` : ''
    }).filter(Boolean)

    const certificateText = `
╔════════════════════════════════════════════════════╗
║                                                              ║
║                    CERTIFICATE OF COMPLETION                       ║
║                                                              ║
║  This certifies that                                           ║
║                                                              ║
║                    Student                                      ║
║                                                              ║
║  has successfully completed to                                 ║
║                                                              ║
║                  ${course.title}                    ║
║                                                              ║
║  Total XP Earned: ${totalXP}                                           ║
║  Tokens Earned: ${totalTokens}                                              ║
║  Lessons Completed: ${completedLessons.size}/${course.lessons.length}                   ║
║  Badges Earned: ${earnedBadgesList.join(', ')}                ║
║                                                              ║
║  Completion Date: ${new Date().toLocaleDateString()}                      ║
║                                                              ║
║  Certificate ID: CQ-${courseId.toUpperCase()}-${Date.now()}           ║
║                                                              ║
╚══════════════════════════════════════════════════╝
      `

    const blob = new Blob([certificateText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${course.title.replace(/\s+/g, '-')}-Certificate.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900/5 via-background to-background">
      {/* Earnings Animation */}
      {earningsAnimation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-6 rounded-2xl shadow-2xl text-center">
            <Trophy className="h-12 w-12 mx-auto mb-2" />
            <div className="text-2xl font-bold mb-1">Challenge Complete!</div>
            <div className="flex items-center gap-4 justify-center">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-300" />
                <span className="font-semibold">+{earningsAnimation.xp} XP</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-300" />
                <span className="font-semibold">+{earningsAnimation.tokens} Tokens</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white text-black max-w-2xl w-full rounded-lg p-8 relative">
            <button 
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
            
            <div className="border-8 border-purple-600 p-8 text-center">
              <h1 className="text-4xl font-bold mb-2">Certificate of Completion</h1>
              <p className="text-lg mb-6">This certifies that</p>
              
              <div className="text-3xl font-bold mb-6 text-purple-600">Student</div>
              
              <p className="text-lg mb-4">has successfully completed</p>
              
              <h2 className="text-2xl font-bold mb-6">{course.title}</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6 text-left">
                <div>
                  <div className="font-semibold">Total XP Earned:</div>
                  <div className="text-2xl font-bold text-purple-600">{totalXP}</div>
                </div>
                <div>
                  <div className="font-semibold">Tokens Earned:</div>
                  <div className="text-2xl font-bold text-purple-600">{totalTokens}</div>
                </div>
                <div>
                  <div className="font-semibold">Lessons Completed:</div>
                  <div className="text-2xl font-bold text-purple-600">{completedLessons.size}/{course.lessons.length}</div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                Completion Date: {new Date().toLocaleDateString()}
              </div>
              
              <div className="text-xs text-gray-500 mb-4">
                Certificate ID: CQ-{courseId.toUpperCase()}-{Date.now()}
              </div>
              
              <div className="mt-4 mb-2">
                <div className="font-semibold mb-2">Badges Earned:</div>
                <div className="flex flex-wrap gap-3">
                  {Array.from(earnedBadges).map(badgeId => {
                    const badge = badges.find(b => b.id === badgeId)
                    return badge ? (
                      <div key={badge.id} className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 hover:scale-105 transition-transform ${badge.color}`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.color}`}>
                          <span className="text-2xl">{badge.icon}</span>
                        </div>
                        <div className="text-left">
                          <div className="font-semibold">{badge.name}</div>
                          <div className="text-xs text-muted-foreground">{badge.description}</div>
                        </div>
                      </div>
                    ) : null
                  })}
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded">
                  <Award className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4 justify-center">
              <Button onClick={downloadCertificate} className="gap-2">
                <Download className="h-4 w-4" />
                Download Certificate
              </Button>
              <Button variant="outline" onClick={() => setShowCertificate(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/courses">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${course.color} text-white flex items-center justify-center text-sm`}>
                {course.icon}
              </div>
              <span className="font-semibold">{course.title}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold">{totalXP} XP</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold">{totalTokens} Tokens</span>
            </div>
            <div className="relative">
              <Button onClick={() => setShowCertificate(true)} variant="outline" className="gap-2">
                <Award className="h-4 w-4" />
                Badges ({earnedBadges.size})
              </Button>
            </div>
            {courseCompleted && (
              <Button onClick={generateCertificate} className="gap-2">
                <Award className="h-4 w-4" />
                Get Certificate
              </Button>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <span>Lesson {currentLessonIndex + 1}:</span>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {currentLesson.title}
                      </span>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {currentLesson.description}
                    </CardDescription>
                  </div>
                  <Badge variant={currentLesson.difficulty === 'Beginner' ? 'default' : 'secondary'}>
                    {currentLesson.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span>{currentLesson.xp} XP</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-purple-600">
                    <Zap className="h-4 w-4" />
                    <span className="font-semibold">{currentLesson.tokens} Tokens</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4" />
                    <span>{currentLesson.duration}</span>
                  </div>
                  {completedLessons.has(currentLesson.id) && (
                    <Badge className="bg-green-500">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Challenge
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4 border">
                    <p className="text-base mb-4">{currentLesson.content.challenge}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Your Code</h3>
                  <div className={`rounded-lg border ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full h-64 p-4 font-mono text-sm resize-none focus:outline-none bg-transparent"
                      spellCheck={false}
                    />
                    <div className="flex items-center justify-between px-4 py-2 border-t">
                      <span className="text-xs text-muted-foreground">{course.category}</span>
                      <Button onClick={runCode} disabled={isRunning} className="gap-2">
                        <Play className="h-4 w-4" />
                        {isRunning ? 'Running...' : 'Submit Answer'}
                      </Button>
                    </div>
                  </div>
                </div>

                {output && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Output</h3>
                    <div className={`rounded-lg border p-4 font-mono text-sm ${output.startsWith('❌') ? 'bg-red-50 border-red-500' : output.startsWith('✅') ? 'bg-green-50 border-green-500' : theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
                      <pre className="whitespace-pre-wrap">{output}</pre>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={previousLesson}
                    disabled={currentLessonIndex === 0}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={nextLesson}
                    disabled={currentLessonIndex === course.lessons.length - 1 || !completedLessons.has(currentLesson.id)}
                    className="gap-2"
                  >
                    Next Lesson
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{completedLessons.size} of {course.lessons.length} lessons</span>
                    <span className="font-semibold">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
                {courseCompleted && (
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg text-center">
                    <Award className="h-8 w-8 mx-auto mb-2" />
                    <div className="font-bold text-lg">Course Completed!</div>
                    <div className="text-sm opacity-90">Click "Get Certificate" above</div>
                  </div>
                )}
                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-yellow-500">{totalXP}</div>
                      <div className="text-xs text-muted-foreground">Total XP</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{totalTokens}</div>
                      <div className="text-xs text-muted-foreground">Total Tokens</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badges Earned</CardTitle>
              </CardHeader>
              <CardContent>
                {earnedBadges.size === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Complete challenges correctly to earn badges!
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    {Array.from(earnedBadges).map(badgeId => {
                      const badge = badges.find(b => b.id === badgeId)
                      return badge ? (
                        <div key={badge.id} className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 hover:scale-105 transition-transform ${badge.color}`}>
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.color}`}>
                            <span className="text-2xl">{badge.icon}</span>
                          </div>
                          <div className="text-left">
                            <div className="font-semibold">{badge.name}</div>
                            <div className="text-xs text-muted-foreground">{badge.description}</div>
                          </div>
                        </div>
                      ) : null
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {course.lessons.map((lesson, index) => (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLessonIndex(index)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          index === currentLessonIndex
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="font-medium text-sm mb-1">
                              {index + 1}. {lesson.title}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{lesson.difficulty}</span>
                              <span>•</span>
                              <span className="text-yellow-600">{lesson.xp} XP</span>
                              <span>•</span>
                              <span className="text-purple-600">{lesson.tokens} Tokens</span>
                            </div>
                          </div>
                          {completedLessons.has(lesson.id) && (
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold">CodeQuest</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CodeQuest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}