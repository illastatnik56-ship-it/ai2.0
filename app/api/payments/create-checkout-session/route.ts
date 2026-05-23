import { NextResponse } from 'next/server'
import { isBillingPlan, PRICE_LOOKUP } from '@/lib/plans'
import { createStripeCheckoutSession } from '@/lib/stripe'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    const planId = body?.planId as string | undefined
    const customerEmail = body?.email as string | undefined

    if (!planId || !isBillingPlan(planId)) {
      return NextResponse.json({ error: 'Invalid planId' }, { status: 400 })
    }

    const priceId = PRICE_LOOKUP[planId]
    if (!priceId) {
      return NextResponse.json({ error: `Missing price id for ${planId}` }, { status: 500 })
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const session = await createStripeCheckoutSession({
      priceId,
      customerEmail,
      successUrl: `${origin}/pricing?checkout=success`,
      cancelUrl: `${origin}/pricing?checkout=cancel`,
    })

    return NextResponse.json({ ok: true, checkoutUrl: session.url, sessionId: session.id })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout creation failed' },
      { status: 500 },
    )
  }
}
