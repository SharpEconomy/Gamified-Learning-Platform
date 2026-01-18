export interface UserProgress {
  courseId: string
  completedLessons: string[]
  xpEarned: number
}

export function getUserProgress(): UserProgress[] {
  if (typeof window === 'undefined') return []
  
  try {
    const progress = localStorage.getItem('codequest_progress')
    return progress ? JSON.parse(progress) : []
  } catch {
    return []
  }
}

export function saveUserProgress(progress: UserProgress[]): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('codequest_progress', JSON.stringify(progress))
  } catch (error) {
    console.error('Failed to save progress:', error)
  }
}

export function updateCourseProgress(courseId: string, lessonId: string, xpEarned: number): void {
  const progress = getUserProgress()
  const courseProgress = progress.find(p => p.courseId === courseId)
  
  if (!courseProgress) {
    progress.push({
      courseId,
      completedLessons: [lessonId],
      xpEarned
    })
  } else {
    if (!courseProgress.completedLessons.includes(lessonId)) {
      courseProgress.completedLessons.push(lessonId)
    }
    courseProgress.xpEarned += xpEarned
  }
  
  saveUserProgress(progress)
}

export function getCourseProgress(courseId: string): { completedLessons: string[], xpEarned: number } {
  const progress = getUserProgress()
  const courseProgress = progress.find(p => p.courseId === courseId)
  return courseProgress || { completedLessons: [], xpEarned: 0 }
}