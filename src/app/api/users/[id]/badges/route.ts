import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    const userBadges = await db.userBadge.findMany({
      where: {
        userId,
      },
      include: {
        badge: true,
      },
      orderBy: {
        unlockedAt: 'desc',
      },
    })

    return NextResponse.json(userBadges)
  } catch (error) {
    console.error('Error fetching user badges:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user badges' },
      { status: 500 }
    )
  }
}