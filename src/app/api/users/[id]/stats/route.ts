import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        image: true,
        xp: true,
        level: true,
        streak: true,
        maxStreak: true,
        createdAt: true,
        lastActivity: true,
        _count: {
          select: {
            progress: true,
            userBadges: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate additional stats
    const completedLessons = await db.userProgress.count({
      where: {
        userId,
        isCompleted: true,
      },
    });

    const totalAttempts = await db.userProgress.aggregate({
      where: {
        userId,
      },
      _sum: {
        attempts: true,
      },
    });

    // XP progress to next level
    const XP_PER_LEVEL = 1000;
    const xpInCurrentLevel = user.xp % XP_PER_LEVEL;
    const progressPercentage = (xpInCurrentLevel / XP_PER_LEVEL) * 100;

    const stats = {
      ...user,
      completedLessons,
      totalAttempts: totalAttempts._sum.attempts || 0,
      xpToNextLevel: XP_PER_LEVEL - xpInCurrentLevel,
      levelProgress: progressPercentage,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch user stats" },
      { status: 500 },
    );
  }
}
