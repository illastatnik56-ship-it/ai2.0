'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { plans, type PlanId } from '@/lib/mock-data'

export default function PricingPage() {
  const [selected, setSelected] = useState<PlanId>('standard')
  const [checkoutStatus, setCheckoutStatus] = useState('')
  const [email, setEmail] = useState('')

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <h1 className="text-3xl font-black">Подписки: Free / Standard / Pro</h1>
        <p className="mt-2 text-neutral-300">Freemium-модель для вирусного масштаба + жирные фичи для power users.</p>
        <div className="mt-4 rounded-xl border border-neutral-700 bg-black/40 p-4">
          <label className="mb-2 block text-sm text-neutral-300">Email для Stripe checkout</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="w-full rounded-lg border border-neutral-700 bg-black/40 px-3 py-2" />
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`rounded-2xl border p-6 transition ${selected === plan.id ? 'border-lime-400 bg-lime-500/10' : 'border-neutral-800 bg-neutral-900/40'}`}
            >
              <h2 className="text-xl font-bold">{plan.name}</h2>
              <p className="mt-2 text-3xl font-black text-lime-300">{plan.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-300">
                {plan.features.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
              <button
                onClick={async () => {
                  setSelected(plan.id)
                  setCheckoutStatus('')
                  const res = await fetch('/api/payments/create-checkout-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ planId: plan.id, email }),
                  })
                  const data = await res.json()
                  if (res.ok && data.checkoutUrl) {
                    setCheckoutStatus(`Stripe session created: ${data.sessionId}`)
                    window.location.href = data.checkoutUrl
                  } else {
                    setCheckoutStatus(`Fallback demo checkout: ${data.error ?? 'Unknown error'}`)
                  }
                }}
                className="mt-6 w-full rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-500"
              >
                {plan.cta}
              </button>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-neutral-700 bg-black/50 p-4 text-sm text-neutral-300">
          Текущий выбранный план: <span className="font-bold text-lime-300 uppercase">{selected}</span>.
          Checkout в MVP симулируется, без реального списания.
          {checkoutStatus && <p className="mt-2 text-lime-300">{checkoutStatus}</p>}
        </div>
      </section>
    </main>
  )
}
