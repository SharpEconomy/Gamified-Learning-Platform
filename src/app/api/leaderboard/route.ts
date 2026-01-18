import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    const leaderboard = await db.user.findMany({
      take: limit,
      orderBy: [
        { xp: 'desc' },
        { level: 'desc' },
        { createdAt: 'asc' },
      ],
      select: {
        id: true,
        name: true,
        image: true,
        xp: true,
        level: true,
        streak: true,
      },
    })

    // Add rank to each user
    const rankedLeaderboard = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1,
    }))

    return NextResponse.json(rankedLeaderboard)
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}