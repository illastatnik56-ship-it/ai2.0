import { NextResponse } from 'next/server'

const allowedPlans = new Set(['free', 'standard', 'pro'])

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const planId = body?.planId

  if (!planId || !allowedPlans.has(planId)) {
    return NextResponse.json({ error: 'Unknown plan' }, { status: 400 })
  }

  return NextResponse.json({
    ok: true,
    status: 'simulated',
    planId,
    checkoutId: `chk_${Date.now()}`,
    message: 'Demo checkout completed. No real charge processed.',
  })
}
