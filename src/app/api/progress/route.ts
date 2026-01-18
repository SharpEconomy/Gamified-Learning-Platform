import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const courseId = searchParams.get('courseId')
    const lessonId = searchParams.get('lessonId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    const where: any = { userId }
    if (courseId) where.courseId = courseId
    if (lessonId) where.lessonId = lessonId

    const progress = await db.userProgress.findMany({
      where,
      include: {
        lesson: true,
        course: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}