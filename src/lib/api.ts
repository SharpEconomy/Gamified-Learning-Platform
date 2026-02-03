// API Utility Functions
// TODO: Replace with actual API calls once backend is connected

// Current mock data that will be replaced by API calls
export const mockCourses = [
  {
    id: "1",
    title: "JavaScript Mastery",
    description: "Master JavaScript from basics to advanced concepts.",
    icon: "⚔️",
    category: "JavaScript",
    difficulty: "Beginner",
    estimated_hours: 40,
    total_xp_reward: 5000,
    lesson_count: 5,
    completed_lessons: 0,
  },
  {
    id: "2",
    title: "Python Adventures",
    description: "Learn Python through fun and engaging challenges.",
    icon: "🐍",
    category: "Python",
    difficulty: "Beginner",
    estimated_hours: 35,
    total_xp_reward: 4000,
    lesson_count: 3,
    completed_lessons: 0,
  },
  {
    id: "3",
    title: "React Quest",
    description: "Build modern user interfaces with React.",
    icon: "✨",
    category: "React",
    difficulty: "Intermediate",
    estimated_hours: 30,
    total_xp_reward: 3000,
    lesson_count: 1,
    completed_lessons: 0,
  },
  {
    id: "4",
    title: "TypeScript Legends",
    description: "Master type-safe JavaScript with TypeScript.",
    icon: "📘",
    category: "TypeScript",
    difficulty: "Advanced",
    estimated_hours: 25,
    total_xp_reward: 2500,
    lesson_count: 1,
    completed_lessons: 0,
  },
];

export const mockUser = {
  id: "user-1",
  name: "Test User",
  email: "test@example.com",
  image: "https://api.dicebear.com/7.x/john.svg?backgroundColor=b6e3f4f",
  total_xp: 1500,
  level: 2,
  current_streak: 3,
  max_streak: 5,
  completed_lessons: 8,
  _count: {
    progress: 8,
    userBadges: 2,
  },
};

export const mockBadges = [
  {
    id: "badge-1",
    name: "First Steps",
    description: "Complete your first lesson",
    icon: "🌟",
    type: "milestone",
    rarity: "common",
  },
  {
    id: "badge-2",
    name: "Coder",
    description: "Complete 10 lessons",
    icon: "💻",
    type: "milestone",
    rarity: "common",
  },
  {
    id: "badge-3",
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    type: "streak",
    rarity: "rare",
  },
  {
    id: "badge-4",
    name: "JavaScript Apprentice",
    description: "Complete JavaScript Mastery course",
    icon: "⚔️",
    type: "skill",
    rarity: "rare",
  },
  {
    id: "badge-5",
    name: "Python Explorer",
    description: "Complete Python Adventures course",
    icon: "🐍",
    type: "skill",
    rarity: "rare",
  },
];

export const mockLeaderboard = [
  {
    rank: 1,
    user_id: "user-2",
    user_name: "Jane Doe",
    avatar_url: "https://api.dicebear.com/7.x/jane.svg?backgroundColor=ffdfbf",
    total_xp: 15000,
    level: 15,
    current_streak: 30,
    user_badges: 5,
  },
  {
    rank: 2,
    user_id: "user-3",
    user_name: "John Smith",
    avatar_url: "https://api.dicebear.com/7.x/john.svg?backgroundColor=c1a1a1",
    total_xp: 5000,
    level: 6,
    current_streak: 7,
    user_badges: 3,
  },
];

// API Functions (TODO: Implement with actual API calls)
export async function getCourses() {
  // TODO: Replace with const response = await fetch('/api/courses')
  const response = { courses: mockCourses };
  return response.courses;
}

export async function getCourseById(id: string) {
  // TODO: const response = await fetch(`/api/courses/${id}`)
  const course = mockCourses.find((c) => c.id === id);
  return course || null;
}

export async function getLessonById(id: string) {
  // TODO: const response = await fetch(`/api/lessons/${id}`)
  return {
    id,
    title: "Sample Lesson",
    description: "A sample lesson description.",
    instructions: "Write your code here!",
    starter_code: "// Your code here\n",
    solution_code: 'console.log("Hello World")',
    xp_reward: 100,
    language: "javascript",
  };
}

export async function getUserProgress(userId: string) {
  // TODO: const response = await fetch(`/api/users/${userId}/progress`)
  return { progress: [] };
}

export async function getBadges() {
  // TODO: const response = await fetch('/api/badges')
  return { badges: mockBadges };
}

export async function getUserBadges(userId: string) {
  // TODO: const response = await fetch(`/api/users/${userId}/badges`)
  return { user_badges: [] };
}

export async function getLeaderboard(limit = 10) {
  // TODO: const response = await fetch(`/api/leaderboard?limit=${limit}`)
  return { leaderboard: mockLeaderboard };
}

export async function executeCode(code: string, language: string) {
  // TODO: const response = await fetch('/api/code/run', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: { code, language }
  // })
  return {
    success: true,
    output: "Hello World\n",
    error: "",
    execution_time: 0.045,
    memory_used: 2048,
  };
}

export async function submitProgress(
  userId: string,
  lessonId: string,
  code: string,
) {
  // TODO: const response = await fetch('/api/progress/submit', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: { userId, lessonId, code }
  // })
  return {
    success: true,
    xp_gained: 100,
    total_xp: mockUser.total_xp,
    leveled_up: false,
    streak: mockUser.current_streak + 1,
    badges_earned: [],
  };
}
