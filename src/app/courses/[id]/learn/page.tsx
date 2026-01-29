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
import { ArrowLeft, Play, CheckCircle, ChevronRight, ChevronLeft, Lightbulb, Trophy, Star, Zap, Award, Download, BookOpen, Medal, Target, Code2 } from 'lucide-react'
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
  type: 'code' | 'mcq' // New property
  content: {
    introduction: string
    explanation: string
    code: string
    challenge: string
    expectedOutput: string
  }
  mcqOptions?: string[] // New property for MCQs
  mcqCorrectAnswer?: string // New property
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

// --- JavaScript Lessons (Mix of Code & MCQ) ---
const javascriptLessons: Lesson[] = [
  { id: 1, title: 'The Console', description: 'Browser debugging', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '5 min', completed: false, type: 'code', content: { introduction: 'JS runs in the browser.', explanation: 'console.log is your main tool.', code: 'console.log("Hello");', challenge: 'Print: "Hello, World"', expectedOutput: 'Hello, World' } },
  { id: 2, title: 'Variables Quiz', description: 'Let vs Const', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '2 min', completed: false, type: 'mcq', content: { introduction: 'Modern JS uses let and const.', explanation: 'const is for constants, let for reassignable.', code: '', challenge: 'Which keyword is used to declare a variable that cannot be reassigned?', expectedOutput: '' }, mcqOptions: ['var', 'let', 'const'], mcqCorrectAnswer: 'const' },
  { id: 3, title: 'Arrow Functions', description: 'Short syntax', difficulty: 'Intermediate', xp: 100, tokens: 8, duration: '15 min', completed: false, type: 'code', content: { introduction: 'Concise function syntax.', explanation: 'const add = (a,b) => a + b', code: 'const double = (x) => x * 2;', challenge: 'Call double(5) and print -> result.', expectedOutput: '10' } },
  { id: 4, title: 'Array Methods Quiz', description: 'Map vs Filter', difficulty: 'Intermediate', xp: 50, tokens: 5, duration: '2 min', completed: false, type: 'mcq', content: { introduction: 'Arrays have helper methods.', explanation: 'map transforms, filter selects.', code: '', challenge: 'Which method creates a NEW array by calling a function on every element?', expectedOutput: '' }, mcqOptions: ['forEach', 'map', 'reduce'], mcqCorrectAnswer: 'map' },
  { id: 5, title: 'Async/Await', description: 'Promises', difficulty: 'Advanced', xp: 150, tokens: 10, duration: '20 min', completed: false, type: 'code', content: { introduction: 'Handle asynchronous operations.', explanation: 'await makes async code look sync.', code: 'async function get() { return "Data"; }', challenge: 'Just print "Async" to pass.', expectedOutput: 'Async' } },
]

// --- Python Lessons ---
const pythonLessons: Lesson[] = [
  { id: 1, title: 'Print Function', description: 'Outputting text', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '5 min', completed: false, type: 'code', content: { introduction: 'Python uses print().', explanation: 'Syntax is very simple.', code: 'print("Hello")', challenge: 'Print: "Python"', expectedOutput: 'Python' } },
  { id: 2, title: 'Syntax Quiz', description: 'Indentation', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '2 min', completed: false, type: 'mcq', content: { introduction: 'Python relies on whitespace.', explanation: 'Blocks are defined by indentation.', code: '', challenge: 'What defines a block of code in Python?', expectedOutput: '' }, mcqOptions: ['Curly Braces {}', 'Indentation', 'Parentheses ()'], mcqCorrectAnswer: 'Indentation' },
  { id: 3, title: 'f-Strings', description: 'Formatted strings', difficulty: 'Beginner', xp: 75, tokens: 6, duration: '10 min', completed: false, type: 'code', content: { introduction: 'Embed variables in strings.', explanation: 'print(f"Hello {name}")', code: 'name = "Hero"\nprint(f"Hi, {name}")', challenge: 'Print "HP: 100" using hp=100.', expectedOutput: 'HP: 100' } },
  { id: 4, title: 'List Comprehension', description: 'Creating lists', difficulty: 'Intermediate', xp: 100, tokens: 8, duration: '15 min', completed: false, type: 'code', content: { introduction: 'Pythonic way to make lists.', explanation: '[x for x in range(3)]', code: '[i*i for i in range(3)]', challenge: 'Create list [0, 1, 2] using range.', expectedOutput: '[0, 1, 2]' } },
  { id: 5, title: 'Data Types Quiz', description: 'Dictionary', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '2 min', completed: false, type: 'mcq', content: { introduction: 'Dictionaries store key-value pairs.', explanation: 'They are like JSON objects.', code: '', challenge: 'Which symbol is used to access dictionary values?', expectedOutput: '' }, mcqOptions: ['Dot (.)', 'Brackets []', 'Parentheses ()'], mcqCorrectAnswer: 'Brackets []' },
]

// --- React Lessons ---
const reactLessons: Lesson[] = [
  { id: 1, title: 'JSX Intro', description: 'HTML in JS', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '5 min', completed: false, type: 'code', content: { introduction: 'React uses JSX.', explanation: 'return <h1>Hello</h1>', code: 'const Header = () => <h1>Hi</h1>;', challenge: 'Create a component returning <div>Hello</div>.', expectedOutput: '<div>Hello</div>' } },
  { id: 2, title: 'Props Quiz', description: 'Data Flow', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '2 min', completed: false, type: 'mcq', content: { introduction: 'Props pass data down.', explanation: 'Function App(props)', code: '', challenge: 'Props flow in which direction?', expectedOutput: '' }, mcqOptions: ['Upwards', 'Downwards', 'Sideways'], mcqCorrectAnswer: 'Downwards' },
  { id: 3, title: 'useState', description: 'Component state', difficulty: 'Intermediate', xp: 100, tokens: 8, duration: '15 min', completed: false, type: 'code', content: { introduction: 'Manage internal state.', explanation: 'const [count, setCount] = useState(0)', code: 'const [count, setCount] = useState(0);\nsetCount(1);\nconsole.log(count);', challenge: 'Simulate setting state to 5 and print.', expectedOutput: '5' } },
  { id: 4, title: 'useEffect', description: 'Side effects', difficulty: 'Advanced', xp: 150, tokens: 10, duration: '20 min', completed: false, type: 'code', content: { introduction: 'Handle API calls/subs.', explanation: 'useEffect(() => { ... }, [])', code: 'useEffect(() => {\n  console.log("Mounted");\n}, []);', challenge: 'Print "Effect Ran" inside a use effect.', expectedOutput: 'Effect Ran' } },
]

// --- API Lessons ---
const apiLessons: Lesson[] = [
  { id: 1, title: 'HTTP Methods', description: 'GET vs POST', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '5 min', completed: false, type: 'mcq', content: { introduction: 'APIs use HTTP verbs.', explanation: 'GET retrieves, POST creates.', code: '', challenge: 'Which method is used to UPDATE existing data?', expectedOutput: '' }, mcqOptions: ['POST', 'PUT', 'DELETE'], mcqCorrectAnswer: 'PUT' },
  { id: 2, title: 'Status Codes', description: 'Server responses', difficulty: 'Beginner', xp: 75, tokens: 6, duration: '10 min', completed: false, type: 'code', content: { introduction: 'Numbers indicating result.', explanation: '200 OK, 404 Not Found, 500 Error', code: 'Status: 200 OK', challenge: 'Return code for "Not Found".', expectedOutput: '404' } },
  { id: 3, title: 'JSON Data', description: 'Data format', difficulty: 'Beginner', xp: 75, tokens: 6, duration: '10 min', completed: false, type: 'code', content: { introduction: 'JavaScript Object Notation.', explanation: '{"key": "value"}', code: '{ "id": 1, "name": "Dev" }', challenge: 'Create JSON for a product with name "Laptop".', expectedOutput: '{"name": "Laptop"}' } },
]

// --- TypeScript Lessons ---
const tsLessons: Lesson[] = [
  { id: 1, title: 'Basic Types', description: 'String, Number', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '5 min', completed: false, type: 'code', content: { introduction: 'Explicitly define types.', explanation: 'let id: number = 5;', code: 'let isActive: boolean = true;', challenge: 'Define a variable score as number.', expectedOutput: 'number' } },
  { id: 2, title: 'Interfaces Quiz', description: 'Defining shapes', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '2 min', completed: false, type: 'mcq', content: { introduction: 'Interfaces define object structures.', explanation: 'interface User { id: number }', code: '', challenge: 'Which keyword is used to define an interface?', expectedOutput: '' }, mcqOptions: ['class', 'interface', 'type'], mcqCorrectAnswer: 'interface' },
  { id: 3, title: 'Union Types', description: 'Multiple types', difficulty: 'Intermediate', xp: 100, tokens: 8, duration: '15 min', completed: false, type: 'code', content: { introduction: 'Allow multiple types.', explanation: 'let id: string | number;', code: 'let value: string | number;', challenge: 'Define a variable status that can be string or boolean.', expectedOutput: 'string | boolean' } },
]

// --- Node.js Lessons ---
const nodeLessons: Lesson[] = [
  { id: 1, title: 'File System', description: 'Reading files', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '5 min', completed: false, type: 'code', content: { introduction: 'Use fs module.', explanation: 'fs.readFile(path, callback)', code: 'const fs = require("fs");\nfs.readFileSync("data.txt");', challenge: 'Import -> http module.', expectedOutput: "const http = require('http')" } },
  { id: 2, title: 'NPM Quiz', description: 'Package Manager', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '2 min', completed: false, type: 'mcq', content: { introduction: 'Node Package Manager.', explanation: 'Install dependencies.', code: '', challenge: 'What does npm stand for?', expectedOutput: '' }, mcqOptions: ['Node Package Manager', 'New Program Mode', 'Network Protocol Module'], mcqCorrectAnswer: 'Node Package Manager' },
  { id: 3, title: 'Events', description: 'EventEmitter', difficulty: 'Advanced', xp: 150, tokens: 10, duration: '20 min', completed: false, type: 'code', content: { introduction: 'Asynchronous event-driven architecture.', explanation: 'emitter.on("event", callback)', code: 'const EventEmitter = require("events");', challenge: 'Emit an event named "start".', expectedOutput: 'emit("start")' } },
]

// --- Web Dev Lessons ---
const webDevLessons: Lesson[] = [
  { id: 1, title: 'HTML Basics', description: 'Structure', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '5 min', completed: false, type: 'code', content: { introduction: 'HyperText Markup Language.', explanation: '<div>, <h1>, <p>', code: '<h1>Hello World</h1>', challenge: 'Create a paragraph <p>Text</p>.', expectedOutput: '<p>Text</p>' } },
  { id: 2, title: 'CSS Quiz', description: 'Box Model', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '2 min', completed: false, type: 'mcq', content: { introduction: 'Elements are boxes.', explanation: 'margin outside, padding inside.', code: '', challenge: 'Which property adds space INSIDE the border?', expectedOutput: '' }, mcqOptions: ['margin', 'padding', 'border'], mcqCorrectAnswer: 'padding' },
  { id: 3, title: 'Flexbox', description: 'Layout', difficulty: 'Intermediate', xp: 100, tokens: 8, duration: '15 min', completed: false, type: 'code', content: { introduction: '1D layout system.', explanation: 'display: flex;', code: 'div { display: flex; }', challenge: 'Make items align to center.', expectedOutput: 'align-items: center;' } },
]

// --- Database Lessons ---
const dbLessons: Lesson[] = [
  { id: 1, title: 'SELECT', description: 'Reading data', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '5 min', completed: false, type: 'code', content: { introduction: 'Retrieve rows from table.', explanation: 'SELECT * FROM table', code: 'SELECT * FROM users;', challenge: 'Select name from users table.', expectedOutput: 'SELECT name FROM users;' } },
  { id: 2, title: 'SQL Quiz', description: 'Deleting data', difficulty: 'Beginner', xp: 50, tokens: 5, duration: '2 min', completed: false, type: 'mcq', content: { introduction: 'Remove rows from tables.', explanation: 'Be careful with WHERE clause!', code: '', challenge: 'Which command removes a table entirely from the database?', expectedOutput: '' }, mcqOptions: ['DELETE FROM table', 'DROP TABLE table', 'TRUNCATE TABLE table'], mcqCorrectAnswer: 'DROP TABLE table' },
  { id: 3, title: 'INSERT', description: 'Adding data', difficulty: 'Beginner', xp: 75, tokens: 6, duration: '10 min', completed: false, type: 'code', content: { introduction: 'Add new rows.', explanation: 'INSERT INTO table (cols) VALUES (vals)', code: 'INSERT INTO users (name) VALUES ("John");', challenge: 'Insert "Alice" into users.', expectedOutput: "INSERT INTO users VALUES ('Alice');" } },
]

// --- Course Data ---
const coursesData: Record<string, Course> = {
  'javascript': { id: 'javascript', title: 'JavaScript Mastery', icon: '⚡', category: 'JavaScript', color: 'from-purple-600 to-pink-600', description: 'Master JS ES6+, DOM, and Async concepts', totalXP: 400, totalTokens: 33, lessons: javascriptLessons },
  'python': { id: 'python', title: 'Python Adventures', icon: '🐍', category: 'Python', color: 'from-green-600 to-emerald-600', description: 'Learn Python logic and data structures', totalXP: 325, totalTokens: 29, lessons: pythonLessons },
  'react': { id: 'react', title: 'React Quest', icon: '⚛️', category: 'React', color: 'from-cyan-500 to-blue-500', description: 'Build modern apps with Hooks & Components', totalXP: 400, totalTokens: 33, lessons: reactLessons },
  'api': { id: 'api', title: 'API Development', icon: '🔗', category: 'Backend', color: 'from-purple-500 to-pink-500', description: 'Create REST APIs and manage requests', totalXP: 250, totalTokens: 22, lessons: apiLessons },
  'typescript': { id: 'typescript', title: 'TypeScript Essentials', icon: '📘', category: 'TypeScript', color: 'from-sky-500 to-indigo-500', description: 'Master type-safe JavaScript development', totalXP: 250, totalTokens: 23, lessons: tsLessons },
  'nodejs': { id: 'nodejs', title: 'Node.js Fundamentals', icon: '🟢', category: 'Backend', color: 'from-green-600 to-lime-500', description: 'Server-side JS with Express and Modules', totalXP: 250, totalTokens: 25, lessons: nodeLessons },
  'web-dev': { id: 'web-dev', title: 'Web Development Bootcamp', icon: '🎯', category: 'Frontend', color: 'from-rose-500 to-red-500', description: 'HTML, CSS and Layouts from scratch', totalXP: 250, totalTokens: 23, lessons: webDevLessons },
  'database': { id: 'database', title: 'Database Mastery', icon: '💾', category: 'Database', color: 'from-violet-500 to-purple-600', description: 'SQL queries, joins, and design', totalXP: 250, totalTokens: 23, lessons: dbLessons },
}

export default function CourseLearnPage() {
  const params = useParams()
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
  const [selectedOption, setSelectedOption] = useState<string | null>(null) // For MCQ

  const course = coursesData[courseId] || coursesData['javascript']
  const currentLesson = course.lessons[currentLessonIndex]
  const progress = ((completedLessons.size / course.lessons.length) * 100)
  const courseCompleted = completedLessons.size === course.lessons.length

  useEffect(() => {
    setMounted(true)
    if (currentLesson) {
      setUserCode(currentLesson.content.code)
      setSelectedOption(null) // Reset MCQ selection on lesson change
    }
    const savedData = localStorage.getItem(`course_${courseId}_progress`)
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        setCompletedLessons(new Set(data.completedLessons || []))
        setTotalXP(data.totalXP || 0)
        setTotalTokens(data.totalTokens || 0)
        setEarnedBadges(new Set(data.earnedBadges || []))
      } catch (e) { console.error("Failed to load progress", e) }
    }
  }, [courseId, currentLessonIndex])

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
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin text-4xl">⏳</div></div>
  }

  const checkBadgeEarned = (newXP: number, consecutiveCorrect: number) => {
    const newBadges: string[] = []
    if (consecutiveCorrect === 1) newBadges.push('first-steps')
    else if (consecutiveCorrect >= 3) newBadges.push('quick-learner')
    if (progress >= 50 && !newBadges.includes('halfway')) newBadges.push('halfway')
    if (progress === 100 && !newBadges.includes('master')) newBadges.push('master')
    if (newBadges.length > 0) setEarnedBadges(prev => new Set([...prev, ...newBadges]))
    return newBadges
  }

  const runCode = async () => {
    setIsRunning(true)
    setOutput('')
    await new Promise(resolve => setTimeout(resolve, 600))

    try {
      let isCorrect = false
      let resultText = ""

      // --- MCQ Logic ---
      if (currentLesson.type === 'mcq') {
        if (!selectedOption) {
          setOutput('⚠️ Please select an option.')
          setIsRunning(false)
          return
        }
        isCorrect = selectedOption === currentLesson.mcqCorrectAnswer
        resultText = selectedOption
      } 
      // --- Code Logic ---
      else {
        const category = course.category
        let userOutput = ""
        const code = userCode.trim()

        if (category === 'Database' || category === 'SQL') {
            if (code.toLowerCase().includes('select')) userOutput = "Rows Retrieved"
            else if (code.toLowerCase().includes('insert')) userOutput = "Row Inserted"
            else userOutput = code
        } 
        else if (category === 'React' || category === 'TypeScript' || category === 'Node.js' || category === 'API') {
            if (code.includes('console.log')) {
               const match = code.match(/console\.log\((.*?)\)/);
               if (match) userOutput = match[1].replace(/['"]/g, '')
            } else {
               userOutput = code.split('\n')[0].trim()
            }
        }
        else if (category === 'Frontend' || category === 'Web Dev') {
            if (code.includes('color:')) userOutput = code.match(/color:\s*([^;]+)/)?.[1] || code
            else if (code.includes('margin:')) userOutput = code.match(/margin:\s*([^;]+)/)?.[1] || code
            else if (code.includes('<')) {
                const match = code.match(/<(\w+)>(.*?)<\/\1>/) || code.match(/<(\w+)>/)
                if (match) userOutput = match[0]
            }
        }
        else {
            const isPython = category === 'Python'
            const lines = userCode.split('\n').filter(line => {
                const trimmed = line.trim()
                if (isPython) return trimmed.includes('print(') && !trimmed.startsWith('#')
                return trimmed.includes('console.log')
            })

            if (lines.length > 0) {
                const outputs = lines.map(line => {
                    const match = line.match(/["']([^"']+)["']/)
                    if (match) return match[1]
                    return "Executed"
                })
                userOutput = outputs.join('\n')
            } else {
                userOutput = code
            }
        }

        const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '').replace(/[;'"]/g, '').replace(/>/g, '')
        const expected = normalize(currentLesson.content.expectedOutput)
        const actual = normalize(userOutput)
        isCorrect = actual === expected || actual.includes(expected) || expected.includes(actual)
        resultText = userOutput
      }

      // --- Validation & Reward ---
      if (isCorrect && !completedLessons.has(currentLesson.id)) {
        setEarningsAnimation({ xp: currentLesson.xp, tokens: currentLesson.tokens })
        setTotalXP(prev => prev + currentLesson.xp)
        setTotalTokens(prev => prev + currentLesson.tokens)
        setCompletedLessons(prev => new Set([...prev, currentLesson.id]))
        checkBadgeEarned(totalXP + currentLesson.xp, completedLessons.size + 1)
        setTimeout(() => setEarningsAnimation(null), 2000)
        setOutput(`✅ Correct! \n${resultText}`)
      } else if (!isCorrect) {
        setOutput(`❌ Incorrect.\n\n${currentLesson.type === 'mcq' ? `Expected: ${currentLesson.mcqCorrectAnswer}` : `Expected: ${currentLesson.content.expectedOutput}`}`)
      } else if (completedLessons.has(currentLesson.id)) {
        setOutput('✅ Already completed! Move to the next lesson.')
      } else {
        setOutput('Output detected, but does not match challenge exactly.')
      }
    } catch (error: any) {
      setOutput('Error: ' + error.message)
    }

    setIsRunning(false)
  }

  const nextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) setCurrentLessonIndex(currentLessonIndex + 1)
  }

  const previousLesson = () => {
    if (currentLessonIndex > 0) setCurrentLessonIndex(currentLessonIndex - 1)
  }

  const generateCertificate = () => setShowCertificate(true)

  const downloadCertificate = () => {
    const earnedBadgesList = Array.from(earnedBadges).map(badgeId => {
      const badge = badges.find(b => b.id === badgeId)
      return badge ? `${badge.name} (${badge.description})` : ''
    }).filter(Boolean)

    const certificateText = `Certificate of Completion: ${course.title} - ${totalXP} XP`
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
      {earningsAnimation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-6 rounded-2xl shadow-2xl text-center">
            <Trophy className="h-12 w-12 mx-auto mb-2" />
            <div className="text-2xl font-bold mb-1">Challenge Complete!</div>
            <div className="flex items-center gap-4 justify-center">
              <div className="flex items-center gap-2"><Star className="h-5 w-5 text-yellow-300" /><span className="font-semibold">+{earningsAnimation.xp} XP</span></div>
              <div className="flex items-center gap-2"><Zap className="h-5 w-5 text-yellow-300" /><span className="font-semibold">+{earningsAnimation.tokens} Tokens</span></div>
            </div>
          </div>
        </div>
      )}

      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white text-black max-w-2xl w-full rounded-lg p-8 relative">
            <button onClick={() => setShowCertificate(false)} className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl">✕</button>
            <div className="border-8 border-purple-600 p-8 text-center">
              <h1 className="text-4xl font-bold mb-2">Certificate of Completion</h1>
              <p className="text-lg mb-6">This certifies that</p>
              <div className="text-3xl font-bold mb-6 text-purple-600">Student</div>
              <p className="text-lg mb-4">has successfully completed</p>
              <h2 className="text-2xl font-bold mb-6">{course.title}</h2>
              <div className="grid grid-cols-2 gap-4 mb-6 text-left">
                <div><div className="font-semibold">Total XP:</div><div className="text-2xl font-bold text-purple-600">{totalXP}</div></div>
                <div><div className="font-semibold">Tokens:</div><div className="text-2xl font-bold text-purple-600">{totalTokens}</div></div>
                <div><div className="font-semibold">Lessons:</div><div className="text-2xl font-bold text-purple-600">{completedLessons.size}/{course.lessons.length}</div></div>
              </div>
            </div>
            <div className="mt-6 flex gap-4 justify-center">
              <Button onClick={downloadCertificate} className="gap-2"><Download className="h-4 w-4" />Download</Button>
              <Button variant="outline" onClick={() => setShowCertificate(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      <nav className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/courses"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${course.color} text-white flex items-center justify-center text-sm`}>{course.icon}</div>
              <span className="font-semibold">{course.title}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm"><Star className="h-4 w-4 text-yellow-500" /><span className="font-semibold">{totalXP} XP</span></div>
            <div className="flex items-center gap-2 text-sm"><Zap className="h-4 w-4 text-yellow-500" /><span className="font-semibold">{totalTokens} Tokens</span></div>
            <Button onClick={() => setShowCertificate(true)} variant="outline" className="gap-2"><Award className="h-4 w-4" />Badges ({earnedBadges.size})</Button>
            {courseCompleted && <Button onClick={generateCertificate} className="gap-2"><Award className="h-4 w-4" />Get Certificate</Button>}
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
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{currentLesson.title}</span>
                    </CardTitle>
                    <CardDescription className="mt-2">{currentLesson.description}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={currentLesson.difficulty === 'Beginner' ? 'default' : 'secondary'}>{currentLesson.difficulty}</Badge>
                    <Badge variant={currentLesson.type === 'mcq' ? 'outline' : 'default'} className="text-xs">
                      {currentLesson.type === 'mcq' ? 'Quiz' : <Code2 className="w-3 h-3" />}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm"><Trophy className="h-4 w-4 text-yellow-500" /><span>{currentLesson.xp} XP</span></div>
                  <div className="flex items-center gap-2 text-sm text-purple-600"><Zap className="h-4 w-4" /><span className="font-semibold">{currentLesson.tokens} Tokens</span></div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><Star className="h-4 w-4" /><span>{currentLesson.duration}</span></div>
                  {completedLessons.has(currentLesson.id) && <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-yellow-500" />Challenge</h3>
                  <div className="bg-muted/50 rounded-lg p-4 border"><p className="text-base mb-4">{currentLesson.content.challenge}</p></div>
                </div>

                {/* --- CODE EDITOR UI --- */}
                {currentLesson.type === 'code' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Your Code ({course.category})</h3>
                    <div className={`rounded-lg border ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
                      <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} className="w-full h-64 p-4 font-mono text-sm resize-none focus:outline-none bg-transparent" spellCheck={false} />
                      <div className="flex items-center justify-between px-4 py-2 border-t">
                        <span className="text-xs text-muted-foreground">{course.category}</span>
                        <Button onClick={runCode} disabled={isRunning} className="gap-2"><Play className="h-4 w-4" />{isRunning ? 'Running...' : 'Submit Code'}</Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- MCQ UI --- */}
                {currentLesson.type === 'mcq' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Select the Correct Answer</h3>
                    <div className="grid gap-3">
                      {currentLesson.mcqOptions?.map((option, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setSelectedOption(option)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-3
                            ${selectedOption === option 
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-200' 
                              : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                            }`}
                        >
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0
                            ${selectedOption === option 
                              ? 'bg-purple-600 border-purple-600 text-white' 
                              : 'border-gray-300'
                            }`}>
                            {selectedOption === option && <CheckCircle className="w-4 h-4" />}
                          </div>
                          <span className="font-medium">{option}</span>
                        </div>
                      ))}
                    </div>
                    <Button onClick={runCode} disabled={isRunning || !selectedOption} className="w-full mt-6 gap-2" size="lg">
                      <Play className="h-4 w-4" />{isRunning ? 'Checking...' : 'Submit Answer'}
                    </Button>
                  </div>
                )}

                {output && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Output</h3>
                    <div className={`rounded-lg border p-4 font-mono text-sm ${output.startsWith('❌') ? 'bg-red-50 border-red-500' : output.startsWith('✅') ? 'bg-green-50 border-green-500' : theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
                      <pre className="whitespace-pre-wrap">{output}</pre>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline" onClick={previousLesson} disabled={currentLessonIndex === 0} className="gap-2"><ChevronLeft className="h-4 w-4" />Previous</Button>
                  <Button onClick={nextLesson} disabled={currentLessonIndex === course.lessons.length - 1 || !completedLessons.has(currentLesson.id)} className="gap-2">Next Lesson<ChevronRight className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Your Progress</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2"><span>{completedLessons.size} of {course.lessons.length} lessons</span><span className="font-semibold">{Math.round(progress)}%</span></div>
                  <Progress value={progress} />
                </div>
                {courseCompleted && <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg text-center"><Award className="h-8 w-8 mx-auto mb-2" /><div className="font-bold text-lg">Course Completed!</div><div className="text-sm opacity-90">Click "Get Certificate" above</div></div>}
                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div><div className="text-2xl font-bold text-yellow-500">{totalXP}</div><div className="text-xs text-muted-foreground">Total XP</div></div>
                    <div><div className="text-2xl font-bold text-purple-600">{totalTokens}</div><div className="text-xs text-muted-foreground">Total Tokens</div></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Badges Earned</CardTitle></CardHeader>
              <CardContent>
                {earnedBadges.size === 0 ? <p className="text-center text-muted-foreground py-8">Complete challenges to earn badges!</p> : <div className="flex flex-wrap gap-4">{Array.from(earnedBadges).map(badgeId => {
                  const badge = badges.find(b => b.id === badgeId)
                  return badge ? <div key={badge.id} className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 hover:scale-105 transition-transform ${badge.color}`}><div className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.color}`}><span className="text-2xl">{badge.icon}</span></div><div className="text-left"><div className="font-semibold">{badge.name}</div><div className="text-xs text-muted-foreground">{badge.description}</div></div></div> : null
                })}</div>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>All Lessons</CardTitle></CardHeader>
              <CardContent><ScrollArea className="h-[400px]"><div className="space-y-2">{course.lessons.map((lesson, index) => (
                <button key={lesson.id} onClick={() => setCurrentLessonIndex(index)} className={`w-full text-left p-3 rounded-lg border transition-colors ${index === currentLessonIndex ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1"><div className="font-medium text-sm mb-1">{index + 1}. {lesson.title}</div><div className="flex items-center gap-2 text-xs text-muted-foreground"><span>{lesson.difficulty}</span><span>•</span><span className="text-yellow-600">{lesson.xp} XP</span><span>•</span><span className="text-purple-600">{lesson.tokens} Tokens</span></div></div>
                    {completedLessons.has(lesson.id) && <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />}
                  </div>
                </button>
              ))}</div></ScrollArea></CardContent>
            </Card>
          </div>
        </div>
      </div>

      <footer className="mt-auto border-t bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center"><BookOpen className="h-4 w-4" /></div><span className="text-sm font-semibold">CodeQuest</span></div>
            <p className="text-sm text-muted-foreground">© 2024 CodeQuest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}