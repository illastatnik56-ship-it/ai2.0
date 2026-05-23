import { NextResponse } from 'next/server'
import { parseWebhookEvent } from '@/lib/stripe'

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('stripe-signature')
    const rawBody = await req.text()
    const event = await parseWebhookEvent(rawBody, signature)

    switch (event.type) {
      case 'checkout.session.completed':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        // TODO: persist subscription state in DB
        break
      default:
        break
    }

    return NextResponse.json({ received: true, eventType: event.type })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook handling failed' },
      { status: 400 },
    )
  }
}
