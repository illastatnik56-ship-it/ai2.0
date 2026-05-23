'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertTriangle, Flame, Gavel, Share2, Trophy, Zap } from 'lucide-react'
import { leaderboard, plans } from '@/lib/mock-data'

const features = [
  {
    title: 'Regret Timelines',
    description: 'AI генерит токсичные альтернативы твоей жизни на базе решений, привычек и цифровых следов.',
    icon: Flame,
  },
  {
    title: 'Regret Auction',
    description: 'Аватары-версии тебя спорят и роастят в real-time за право захватить твою реальность.',
    icon: Gavel,
  },
  {
    title: 'Viral Meme Engine',
    description: 'Шаринг мем-картинок “Мой я-алкоголик из 2031” в один тап с авто-форматами под соцсети.',
    icon: Share2,
  },
]

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-neutral-950 text-neutral-100">
      <div className="noise pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(130,255,34,0.16),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(255,16,16,0.14),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(130,255,34,0.08),transparent_35%)]" />

      <section className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-20 pt-24 md:px-10 md:pt-32">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex w-fit items-center gap-2 rounded-full border border-lime-400/40 bg-lime-400/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-lime-300">
          <Zap className="h-3.5 w-3.5" /> Жиза 2.0 / RegretMaxx.ai
        </motion.p>

        <h1 className="glitch text-4xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-6xl md:text-8xl">
          А что если <span className="text-red-500">ты всё просрал?</span>
        </h1>

        <p className="max-w-2xl text-lg text-neutral-300 md:text-2xl">
          Узнай, каким бы ты был, если бы постоянно выбирал худшее решение. Это личная симуляция regret-maxxing с чёрным юмором, матом и правдой без фильтра.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/onboarding" className="rounded-xl border border-red-500/60 bg-red-600 px-6 py-4 font-bold text-white shadow-[0_0_25px_rgba(255,0,0,0.35)] transition hover:scale-[1.03]">Начать симуляцию своей хуёвой жизни</Link>
          <Link href="/auction" className="rounded-xl border border-neutral-700 bg-neutral-900 px-6 py-4 font-semibold hover:border-lime-400/50">Открыть Regret Auction</Link>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <div className="mb-6 flex items-center gap-3"><AlertTriangle className="h-5 w-5 text-red-500" /><h2 className="text-2xl font-extrabold uppercase tracking-wide md:text-4xl">Фичи MVP</h2></div>
        <div className="grid gap-5 md:grid-cols-3">{features.map((f) => {const Icon = f.icon; return <article key={f.title} className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6"><Icon className="mb-4 h-6 w-6 text-lime-400" /><h3 className="mb-2 text-xl font-bold">{f.title}</h3><p className="text-neutral-300">{f.description}</p></article>})}</div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <h3 className="mb-4 text-xl font-black uppercase">Leaderboard: Самые ебанутые regrets</h3>
        <div className="grid gap-3 md:grid-cols-3">
          {leaderboard.map((item) => (
            <div key={item.nick} className="rounded-xl border border-neutral-800 bg-black/40 p-4">
              <p className="text-xs uppercase tracking-widest text-neutral-500">{item.nick}</p>
              <p className="mt-2 font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-red-300">Regret score: {item.regretScore}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <h3 className="mb-4 text-xl font-black uppercase"><Trophy className="mr-2 inline h-5 w-5 text-lime-300" />Подписки</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.id} className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
              <p className="text-sm uppercase text-lime-300">{plan.name}</p>
              <p className="text-2xl font-black">{plan.price}</p>
            </div>
          ))}
        </div>
        <Link href="/pricing" className="mt-5 inline-block rounded-lg border border-lime-400/50 bg-lime-400/10 px-4 py-2 font-bold text-lime-300">Смотреть все тарифы</Link>
      </section>

      <footer className="border-t border-neutral-800 bg-black/70 px-6 py-8 text-sm text-neutral-400 md:px-10">Это может сильно нанести на психику. Мы предупреждали.</footer>
    </main>
  )
}
