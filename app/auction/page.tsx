'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { auctionAvatars } from '@/lib/mock-data'

type AuctionPayload = {
  roundId: string
  avatars: { name: string; roast: string; deal: string }[]
  transcript: string[]
}

export default function AuctionPage() {
  const [data, setData] = useState<AuctionPayload | null>(null)
  const [error, setError] = useState('')

  const loadAuction = async () => {
    setError('')
    const res = await fetch('/api/auction')
    const json = await res.json()
    if (!res.ok) {
      setError(json.error || 'Failed to load auction')
      return
    }
    setData(json)
  }

  const avatars = data?.avatars ?? auctionAvatars

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <h1 className="text-3xl font-black">Regret Auction Room</h1>
        <p className="mt-2 text-neutral-300">Альтернативные версии тебя спорят в реальном времени за контроль над твоей жизнью.</p>
        <button onClick={loadAuction} className="mt-4 rounded-lg bg-lime-500 px-4 py-2 font-bold text-black">Запустить live auction</button>
        {data?.roundId && <p className="mt-2 text-sm text-lime-300">Round: {data.roundId}</p>}
        {error && <p className="mt-2 text-sm text-red-300">{error}</p>}

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {avatars.map((avatar) => (
            <article key={avatar.name} className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
              <div className="mb-3 flex aspect-square items-center justify-center rounded-xl border border-dashed border-red-400/50 bg-black/30 text-xs text-red-200">
                3D AVATAR PLACEHOLDER
              </div>
              <h2 className="font-extrabold">{avatar.name}</h2>
              <p className="mt-2 text-sm text-neutral-200">“{avatar.roast}”</p>
              <p className="mt-2 text-xs text-lime-300">Deal: {avatar.deal}</p>
              <button className="mt-4 rounded-lg border border-red-400 px-3 py-2 text-sm">Принять сделку этой ветки</button>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-neutral-700 bg-black/50 p-5">
          <h3 className="font-bold">Live transcript</h3>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300">
            {(data?.transcript ?? [
              'Алко-Ты: Выбери меня — хотя бы честно развалишься.',
              'Корп-Ты: Стабильная депрессия лучше хаотичного позора.',
              'OF-Босс: Бабки закрывают 70% драмы, остальное — терапия.',
            ]).map((line) => (
              <li key={line}>• {line}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
