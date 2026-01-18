import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email' },
        { status: 400 }
      )
    }

    const user = {
      id: 'user_' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      xp: 0,
      level: 1,
      streak: 0,
      maxStreak: 0
    }

    return NextResponse.json({
      user: user,
      message: 'Account created successfully!'
    })
  } catch (error) {
    console.error('Sign-in error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}