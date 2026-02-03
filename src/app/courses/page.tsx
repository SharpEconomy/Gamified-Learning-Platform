"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Star,
  Users,
  Clock,
  Flame,
  Award,
  TrendingUp,
  BookOpen,
  Terminal,
  Zap,
  Sparkles,
  ChevronRight,
  Search,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Heart,
  Share2,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  icon: string;
  category: string;
  color: string;
  description: string;
  level: string;
  lessons: number;
  duration: string;
  students: number;
  rating: number;
  totalXP: number;
  popular?: boolean;
  trending?: boolean;
  instructor?: string;
  lastUpdated?: string;
}

const courses: Course[] = [
  {
    id: "javascript",
    title: "JavaScript Mastery",
    icon: "⚡",
    category: "JavaScript",
    color: "from-amber-500 to-orange-500",
    description:
      "Master JavaScript from basics to advanced concepts including ES6+, Async/Await, and modern patterns.",
    level: "All Levels",
    lessons: 5,
    duration: "4 hours",
    students: 15420,
    rating: 4.9,
    totalXP: 400,
    trending: true,
    instructor: "John Doe",
    lastUpdated: "2 days ago",
  },
  {
    id: "python",
    title: "Python Adventures",
    icon: "🐍",
    category: "Python",
    color: "from-emerald-500 to-teal-500",
    description:
      "Learn Python through fun and engaging challenges from basics to OOP and data structures.",
    level: "All Levels",
    lessons: 5,
    duration: "4.5 hours",
    students: 12850,
    rating: 4.8,
    totalXP: 325,
    popular: true,
    instructor: "Jane Smith",
    lastUpdated: "5 days ago",
  },
  {
    id: "react",
    title: "React Quest",
    icon: "⚛️",
    category: "React",
    color: "from-sky-500 to-cyan-500",
    description:
      "Build modern web applications with React hooks, components, state management, and performance optimization.",
    level: "Intermediate",
    lessons: 4,
    duration: "6 hours",
    students: 9340,
    rating: 4.9,
    totalXP: 400,
    trending: true,
    instructor: "Mike Chen",
    lastUpdated: "1 week ago",
  },
  {
    id: "api",
    title: "API Development",
    icon: "🔗",
    category: "Backend",
    color: "from-violet-500 to-purple-500",
    description:
      "Create and consume REST APIs, handle authentication, validation, and master backend architecture.",
    level: "Advanced",
    lessons: 3,
    duration: "5 hours",
    students: 5420,
    rating: 4.7,
    totalXP: 250,
    instructor: "Sarah Johnson",
    lastUpdated: "3 days ago",
  },
  {
    id: "typescript",
    title: "TypeScript Essentials",
    icon: "📘",
    category: "TypeScript",
    color: "from-blue-500 to-indigo-500",
    description:
      "Master TypeScript for safer, more scalable JavaScript applications with advanced typing techniques.",
    level: "Intermediate",
    lessons: 3,
    duration: "5.5 hours",
    students: 7890,
    rating: 4.8,
    totalXP: 250,
    popular: true,
    instructor: "Alex Turner",
    lastUpdated: "4 days ago",
  },
  {
    id: "nodejs",
    title: "Node.js Fundamentals",
    icon: "🟢",
    category: "Backend",
    color: "from-lime-500 to-green-500",
    description:
      "Build server-side applications with Node.js, Express, real-time features, and microservices architecture.",
    level: "Advanced",
    lessons: 3,
    duration: "6 hours",
    students: 6230,
    rating: 4.6,
    totalXP: 250,
    instructor: "Chris Wilson",
    lastUpdated: "1 week ago",
  },
  {
    id: "web-dev",
    title: "Web Development Bootcamp",
    icon: "🎯",
    category: "Frontend",
    color: "from-rose-500 to-pink-500",
    description:
      "Complete web development journey from HTML basics to modern frameworks and deployment strategies.",
    level: "Beginner",
    lessons: 3,
    duration: "10 hours",
    students: 21340,
    rating: 4.9,
    totalXP: 250,
    popular: true,
    trending: true,
    instructor: "Emma Davis",
    lastUpdated: "2 days ago",
  },
  {
    id: "database",
    title: "Database Mastery",
    icon: "💾",
    category: "Database",
    color: "from-fuchsia-500 to-pink-500",
    description:
      "Learn SQL, MongoDB, PostgreSQL, and database design principles with real-world projects.",
    level: "Intermediate",
    lessons: 3,
    duration: "4.5 hours",
    students: 4890,
    rating: 4.7,
    totalXP: 250,
    instructor: "David Brown",
    lastUpdated: "6 days ago",
  },
];

const filterOptions = [
  { id: "all", label: "All Courses", icon: BookOpen, count: courses.length },
  {
    id: "beginner",
    label: "Beginner",
    icon: Sparkles,
    count: courses.filter((c) => c.level === "Beginner").length,
  },
  {
    id: "intermediate",
    label: "Intermediate",
    icon: TrendingUp,
    count: courses.filter((c) => c.level === "Intermediate").length,
  },
  {
    id: "advanced",
    label: "Advanced",
    icon: Award,
    count: courses.filter((c) => c.level === "Advanced").length,
  },
  {
    id: "popular",
    label: "Popular",
    icon: Flame,
    count: courses.filter((c) => c.popular || c.trending).length,
  },
];

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredCourses = courses.filter((course) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "popular") return course.popular || course.trending;
    return course.level.toLowerCase() === activeFilter;
  });

  const stats = [
    {
      icon: BookOpen,
      label: "Courses",
      value: courses.length,
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Users,
      label: "Students",
      value: "82K+",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Star,
      label: "Rating",
      value: "4.8",
      color: "from-yellow-500 to-amber-500",
    },
    {
      icon: Award,
      label: "Certificates",
      value: "15K+",
      color: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-amber-500/20">
                CQ
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-gray-900 dark:text-white">
                  CodeQuest
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Level Up Your Skills
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl w-80">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 w-full placeholder:text-gray-400"
                />
              </div>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Heart className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-rose-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8 border border-white/10 hover:bg-white/15 transition-colors cursor-pointer">
              <Zap className="h-4 w-4 text-amber-400" />
              <span className="bg-gradient-to-r from-amber-200 to-rose-200 bg-clip-text text-transparent font-semibold">
                New courses added weekly!
              </span>
              <ChevronRight className="h-4 w-4 text-gray-300" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Discover Your Next
              <span className="block bg-gradient-to-r from-amber-200 via-rose-200 to-emerald-200 bg-clip-text text-transparent mt-2">
                Coding Adventure
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Choose from {courses.length}+ expertly crafted courses with
              interactive lessons, real-world projects, and earn rewards as you
              learn.
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
              {[
                { icon: Users, label: "82,000+", sub: "Students" },
                { icon: Star, label: "4.8", sub: "Avg Rating" },
                { icon: Award, label: "15,000+", sub: "Certificates" },
                { icon: CheckCircle2, label: "100%", sub: "Completion Rate" },
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <div
                    className={`p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors`}
                  >
                    <stat.icon className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-white">
                      {stat.label}
                    </span>
                    <span className="text-xs text-gray-500">{stat.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="currentColor"
              className="text-slate-50 dark:text-gray-950"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Available Courses
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredCourses.length} course
                {filteredCourses.length !== 1 ? "s" : ""} available
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-xl gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 max-w-4xl mx-auto">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-200 relative ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-slate-900 to-gray-900 dark:from-slate-100 dark:to-gray-100 text-white dark:text-gray-900 shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <filter.icon className="h-4 w-4" />
                <span>{filter.label}</span>
                <Badge
                  variant="secondary"
                  className={`ml-1 text-xs px-2 py-0.5 ${
                    activeFilter === filter.id
                      ? "bg-white/20 text-white dark:bg-gray-800/20 dark:text-gray-900"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {filter.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course, index) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}/learn`}
              className="group"
            >
              <Card
                className="relative overflow-hidden h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border-2 border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 bg-white dark:bg-gray-900 rounded-2xl"
                onMouseEnter={() => setHoveredCard(course.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient Header */}
                <div
                  className={`h-32 bg-gradient-to-br ${course.color} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {course.icon}
                    </div>
                    <div className="flex gap-2">
                      {course.trending && (
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-md text-xs font-medium px-2.5 py-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      {course.popular && (
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-md text-xs font-medium px-2.5 py-1">
                          <Flame className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-300 border-0 text-xs font-medium px-3 py-1 shadow-sm"
                    >
                      {course.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-5">
                  {/* Instructor & Level */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white text-xs font-bold">
                        {course.instructor
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {course.instructor}
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500">
                          {course.lastUpdated}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs font-medium border-2 ${
                        course.level === "Beginner"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
                          : course.level === "Intermediate"
                            ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"
                            : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800"
                      }`}
                    >
                      {course.level}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-gray-900 dark:group-hover:from-slate-100 dark:group-hover:to-gray-100 group-hover:bg-clip-text transition-all line-clamp-1">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem]">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <Terminal className="h-3.5 w-3.5 mx-auto mb-1 text-gray-500 dark:text-gray-400" />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {course.lessons}
                      </span>
                      <span className="block text-[10px] text-gray-400 dark:text-gray-500">
                        lessons
                      </span>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <Clock className="h-3.5 w-3.5 mx-auto mb-1 text-gray-500 dark:text-gray-400" />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {course.duration}
                      </span>
                      <span className="block text-[10px] text-gray-400 dark:text-gray-500">
                        duration
                      </span>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <Star className="h-3.5 w-3.5 mx-auto mb-1 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {course.rating}
                      </span>
                      <span className="block text-[10px] text-gray-400 dark:text-gray-500">
                        rating
                      </span>
                    </div>
                  </div>

                  {/* Students & XP */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {(course.students / 1000).toFixed(1)}K students
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 text-sm font-bold bg-gradient-to-r ${course.color} bg-clip-text text-transparent`}
                    >
                      <Zap className="h-4 w-4" />
                      {course.totalXP} XP
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div
                    className={`absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-gradient-to-r ${course.color} flex items-center justify-center text-white shadow-lg transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300`}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try selecting a different filter
            </p>
            <Button
              onClick={() => setActiveFilter("all")}
              className="rounded-xl"
            >
              View All Courses
            </Button>
          </div>
        )}
      </div>

      {/* Success Stories & Learning Paths */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 mt-16">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-rose-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10">
              <Award className="h-4 w-4 text-amber-400" />
              <span>Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              From Student to
              <span className="block bg-gradient-to-r from-amber-200 via-rose-200 to-emerald-200 bg-clip-text text-transparent mt-2">
                Professional Developer
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              See how our graduates transformed their careers with CodeQuest
            </p>
          </div>

          {/* Success Stories */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                name: "Sarah Chen",
                role: "Software Engineer at Google",
                image: "👩‍💻",
                story:
                  "From complete beginner to landing my dream job at Google. CodeQuest gave me the hands-on experience I needed.",
                courses: 12,
                xp: 4500,
                time: "8 months",
              },
              {
                name: "Marcus Johnson",
                role: "Full-Stack Developer at Stripe",
                image: "👨‍💻",
                story:
                  "The project-based learning approach helped me build a portfolio that impressed recruiters.",
                courses: 8,
                xp: 3200,
                time: "6 months",
              },
              {
                name: "Elena Rodriguez",
                role: "Frontend Lead at Airbnb",
                image: "👩‍🎨",
                story:
                  "CodeQuest filled the gaps in my knowledge and gave me the confidence to lead major projects.",
                courses: 15,
                xp: 5800,
                time: "10 months",
              },
            ].map((story, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center text-3xl shadow-lg">
                    {story.image}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {story.name}
                    </h3>
                    <p className="text-amber-400 text-sm font-medium">
                      {story.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  "{story.story}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-xs text-gray-400">
                    <span className="text-white font-semibold">
                      {story.courses}
                    </span>{" "}
                    courses
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="text-white font-semibold">
                      {story.xp} XP
                    </span>{" "}
                    earned
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="text-white font-semibold">
                      {story.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Learning Paths */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Choose Your Learning Path
              </h3>
              <p className="text-gray-400">
                Structured curriculum designed to take you from beginner to pro
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  name: "Frontend Mastery",
                  icon: "🎨",
                  color: "from-rose-500 to-pink-500",
                  courses: 6,
                  duration: "12 weeks",
                  level: "Beginner → Pro",
                },
                {
                  name: "Backend Engineer",
                  icon: "⚙️",
                  color: "from-emerald-500 to-teal-500",
                  courses: 5,
                  duration: "10 weeks",
                  level: "Beginner → Pro",
                },
                {
                  name: "Full-Stack Dev",
                  icon: "🚀",
                  color: "from-amber-500 to-orange-500",
                  courses: 10,
                  duration: "20 weeks",
                  level: "Beginner → Pro",
                },
                {
                  name: "Data Science",
                  icon: "📊",
                  color: "from-violet-500 to-purple-500",
                  courses: 7,
                  duration: "14 weeks",
                  level: "Beginner → Pro",
                },
              ].map((path, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {path.icon}
                  </div>
                  <h4 className="text-white font-bold mb-2">{path.name}</h4>
                  <div className="space-y-1 text-xs text-gray-400">
                    <div className="flex justify-between">
                      <span>Courses</span>
                      <span className="text-gray-300">{path.courses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration</span>
                      <span className="text-gray-300">{path.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Level</span>
                      <span className="text-gray-300">{path.level}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-amber-400 font-medium group-hover:underline">
                      View Path →
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { label: "Hired Students", value: "12,000+", icon: Users },
              { label: "Avg Salary Increase", value: "65%", icon: TrendingUp },
              { label: "Company Partners", value: "500+", icon: Award },
              { label: "Career Success Rate", value: "94%", icon: Star },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-amber-400" />
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  CQ
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white text-lg">
                    CodeQuest
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Level Up Your Skills
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mb-4">
                Learn coding through interactive courses, real-world projects,
                and earn rewards as you progress.
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span>© 2024 CodeQuest</span>
                <span>•</span>
                <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">
                  Privacy
                </span>
                <span>•</span>
                <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">
                  Terms
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Courses
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">
                  JavaScript
                </li>
                <li className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">
                  Python
                </li>
                <li className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">
                  React
                </li>
                <li className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">
                  Backend
                </li>
                <li className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">
                  Database
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">
                  About Us
                </li>
                <li className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">
                  Contact
                </li>
                <li className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">
                  Careers
                </li>
                <li className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">
                  Blog
                </li>
                <li className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">
                  Support
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Made with ❤️ for developers worldwide
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    English
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
