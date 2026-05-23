export type BillingPlan = 'free' | 'standard' | 'pro'

export const PRICE_LOOKUP: Record<BillingPlan, string> = {
  free: process.env.STRIPE_PRICE_FREE || '',
  standard: process.env.STRIPE_PRICE_STANDARD || '',
  pro: process.env.STRIPE_PRICE_PRO || '',
}

export function isBillingPlan(value: string): value is BillingPlan {
  return value === 'free' || value === 'standard' || value === 'pro'
}
