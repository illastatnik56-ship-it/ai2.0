import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body?.toxicity || !body?.answers) {
    return NextResponse.json({ error: 'Invalid onboarding payload' }, { status: 400 })
  }

  return NextResponse.json({
    ok: true,
    profileId: `profile_${Date.now()}`,
    message: 'Onboarding data accepted',
  })
}
