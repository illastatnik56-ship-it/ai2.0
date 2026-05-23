'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { timelineCards, type Toxicity } from '@/lib/mock-data'

const filters: Toxicity[] = ['Mild Regret', 'Nuclear Regret', 'Full Жиза']

export default function DashboardPage() {
  const [filter, setFilter] = useState<Toxicity | 'All'>('All')

  const visibleCards = useMemo(
    () => (filter === 'All' ? timelineCards : timelineCards.filter((card) => card.toxicity === filter)),
    [filter],
  )

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <h1 className="text-3xl font-black">Твои Regret Timelines</h1>
        <p className="mt-2 text-neutral-300">Выбери ветку и проживи 5 минут в этой реальности (демо-режим).</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={() => setFilter('All')} className={`rounded-lg border px-3 py-1.5 ${filter === 'All' ? 'border-lime-400 text-lime-300' : 'border-neutral-700'}`}>All</button>
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-lg border px-3 py-1.5 ${filter === f ? 'border-lime-400 text-lime-300' : 'border-neutral-700'}`}>{f}</button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {visibleCards.map((card) => (
            <article key={card.id} className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4">
              <div className="mb-3 flex aspect-[4/5] items-center justify-center rounded-xl border border-dashed border-neutral-700 bg-black/40 px-2 text-center text-xs text-neutral-500">
                AI IMAGE PLACEHOLDER / {card.imagePrompt}
              </div>
              <h2 className="text-lg font-bold">{card.title}</h2>
              <p className="mt-2 text-sm text-neutral-300">{card.summary}</p>
              <p className="mt-1 text-xs text-neutral-500">{card.vibe}</p>
              <button className="mt-4 w-full rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold">Прожить 5 минут в этой ветке (AR + text sim)</button>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/auction" className="rounded-xl border border-lime-400/50 bg-lime-400/10 px-5 py-3 font-bold text-lime-300">Открыть Regret Auction Room</Link>
          <button className="rounded-xl border border-red-500/60 bg-red-600/30 px-5 py-3 font-bold">Сгенерить мем-картинку (demo)</button>
        </div>
      </section>
    </main>
  )
}
