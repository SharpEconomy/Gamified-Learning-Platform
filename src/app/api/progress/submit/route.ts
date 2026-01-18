import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// XP and Level System Configuration
const XP_PER_LEVEL = 1000
const LEVEL_CAP = 100

/**
 * Calculate level from total XP
 */
function calculateLevelFromXP(xp: number): number {
  return Math.min(Math.floor(xp / XP_PER_LEVEL) + 1, LEVEL_CAP)
}

/**
 * Update user gamification stats after completing a lesson
 */
async function updateUserStats(userId: string, xpGained: number) {
  const user = await db.user.findUnique({
    where: { id: userId },
  })

  if (!user) throw new Error('User not found')

  const newXP = user.xp + xpGained
  const newLevel = calculateLevelFromXP(newXP)
  const leveledUp = newLevel > user.level

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: {
      xp: newXP,
      level: newLevel,
      lastActivity: new Date(),
    },
  })

  return { user: updatedUser, leveledUp, newLevel }
}

/**
 * Update streak - called when user completes a lesson
 */
async function updateStreak(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
  })

  if (!user) throw new Error('User not found')

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const lastActivity = user.lastActivity ? new Date(user.lastActivity) : null
  lastActivity?.setHours(0, 0, 0, 0)

  const daysSinceLastActivity = lastActivity
    ? Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))
    : 1

  let newStreak = 1
  let newMaxStreak = user.maxStreak

  if (daysSinceLastActivity <= 1) {
    // Active within last 2 days (consecutive)
    newStreak = user.streak + 1
    newMaxStreak = Math.max(newStreak, user.maxStreak)
  } else if (daysSinceLastActivity > 1) {
    // Streak broken, start fresh
    newStreak = 1
  }

  await db.user.update({
    where: { id: userId },
    data: {
      streak: newStreak,
      maxStreak: newMaxStreak,
      lastActivity: new Date(),
    },
  })

  return { streak: newStreak, maxStreak: newMaxStreak }
}

/**
 * Check and unlock badges for user
 */
async function checkAndUnlockBadges(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      userBadges: {
        select: {
          badgeId: true,
        },
      },
    },
  })

  if (!user) return []

  const unlockedBadgeIds = new Set(user.userBadges.map(ub => ub.badgeId))
  const newlyUnlockedBadges: any[] = []

  // Get all badges user hasn't unlocked yet
  const availableBadges = await db.badge.findMany({
    where: {
      id: {
        notIn: Array.from(unlockedBadgeIds),
      },
    },
  })

  for (const badge of availableBadges) {
    let shouldUnlock = false

    switch (badge.requirementType) {
      case 'xp':
        shouldUnlock = user.xp >= badge.requirementValue
        break
      case 'level':
        shouldUnlock = user.level >= badge.requirementValue
        break
      case 'streak':
        shouldUnlock = user.streak >= badge.requirementValue
        break
      case 'lessons':
        const completedLessons = await db.userProgress.count({
          where: {
            userId,
            isCompleted: true,
          },
        })
        shouldUnlock = completedLessons >= badge.requirementValue
        break
      case 'courses':
        const completedCourses = await db.userProgress.groupBy({
          by: ['courseId'],
          where: {
            userId,
            isCompleted: true,
          },
        })
        shouldUnlock = completedCourses.length >= badge.requirementValue
        break
    }

    if (shouldUnlock) {
      await db.userBadge.create({
        data: {
          userId,
          badgeId: badge.id,
        },
      })
      newlyUnlockedBadges.push(badge)
    }
  }

  return newlyUnlockedBadges
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, lessonId, code, isFirstTry = false } = body

    if (!userId || !lessonId) {
      return NextResponse.json(
        { error: 'userId and lessonId are required' },
        { status: 400 }
      )
    }

    // Get lesson details
    const lesson = await db.lesson.findUnique({
      where: { id: lessonId },
      include: { course: true },
    })

    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      )
    }

    // Check if lesson is locked (requires previous lesson)
    if (lesson.requiresLessonId) {
      const previousProgress = await db.userProgress.findUnique({
        where: {
          userId_lessonId: {
            userId,
            lessonId: lesson.requiresLessonId,
          },
        },
      })

      if (!previousProgress || !previousProgress.isCompleted) {
        return NextResponse.json(
          { error: 'Complete previous lesson first to unlock this one' },
          { status: 403 }
        )
      }
    }

    // Create or update progress
    const existingProgress = await db.userProgress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
    })

    let progress

    if (existingProgress) {
      // Update existing progress
      progress = await db.userProgress.update({
        where: {
          userId_lessonId: {
            userId,
            lessonId,
          },
        },
        data: {
          code: code || existingProgress.code,
          attempts: existingProgress.attempts + 1,
          isCompleted: true,
          completedAt: new Date(),
        },
      })
    } else {
      // Create new progress entry
      progress = await db.userProgress.create({
        data: {
          userId,
          lessonId,
          courseId: lesson.courseId,
          code,
          attempts: 1,
          isCompleted: true,
          completedAt: new Date(),
        },
      })
    }

    // Update user stats (XP, level)
    const xpGained = lesson.xpReward
    const { user: updatedUser, leveledUp, newLevel } = await updateUserStats(
      userId,
      xpGained
    )

    // Update streak
    const streakUpdate = await updateStreak(userId)

    // Check for badge unlocks
    const newlyUnlockedBadges = await checkAndUnlockBadges(userId)

    return NextResponse.json({
      success: true,
      progress,
      xpGained,
      newXp: updatedUser.xp,
      newLevel: updatedUser.level,
      leveledUp,
      streak: streakUpdate.streak,
      newlyUnlockedBadges,
    })
  } catch (error) {
    console.error('Error submitting progress:', error)
    return NextResponse.json(
      { error: 'Failed to submit progress' },
      { status: 500 }
    )
  }
}