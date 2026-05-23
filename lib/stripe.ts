const STRIPE_API_BASE = 'https://api.stripe.com/v1'

function getStripeSecret() {
  const secret = process.env.STRIPE_SECRET_KEY
  if (!secret) {
    throw new Error('Missing STRIPE_SECRET_KEY')
  }
  return secret
}

export async function createStripeCheckoutSession(params: {
  priceId: string
  customerEmail?: string
  successUrl: string
  cancelUrl: string
}) {
  const body = new URLSearchParams()
  body.set('mode', 'subscription')
  body.set('success_url', params.successUrl)
  body.set('cancel_url', params.cancelUrl)
  body.set('line_items[0][price]', params.priceId)
  body.set('line_items[0][quantity]', '1')
  if (params.customerEmail) body.set('customer_email', params.customerEmail)

  const res = await fetch(`${STRIPE_API_BASE}/checkout/sessions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getStripeSecret()}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data?.error?.message || 'Stripe checkout session error')
  }
  return data as { id: string; url?: string }
}

export async function parseWebhookEvent(rawBody: string, signature: string | null) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    throw new Error('Missing STRIPE_WEBHOOK_SECRET')
  }

  // NOTE: in production use official Stripe SDK to verify signatures.
  // Here we provide a strict placeholder guard + payload parse for demo/repo completeness.
  if (!signature || !signature.includes('t=')) {
    throw new Error('Invalid Stripe signature header')
  }

  return JSON.parse(rawBody) as {
    id: string
    type: string
    data?: { object?: Record<string, unknown> }
  }
}
