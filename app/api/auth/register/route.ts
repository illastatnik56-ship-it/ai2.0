import { NextResponse } from 'next/server'

type RegisterBody = {
  email?: string
  password?: string
  username?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as RegisterBody | null

  if (!body?.email || !body?.password || !body?.username) {
    return NextResponse.json({ error: 'username, email, password are required' }, { status: 400 })
  }

  if (!emailPattern.test(body.email)) {
    return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
  }

  if (body.password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
  }

  return NextResponse.json({
    ok: true,
    user: {
      id: `usr_${Date.now()}`,
      username: body.username,
      email: body.email,
    },
    token: `demo_token_${Math.random().toString(36).slice(2)}`,
  })
}
