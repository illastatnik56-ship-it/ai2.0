'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import type { Toxicity } from '@/lib/mock-data'

const levels: Toxicity[] = ['Mild Regret', 'Nuclear Regret', 'Full Жиза']

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [toxicity, setToxicity] = useState<Toxicity>('Nuclear Regret')
  const [status, setStatus] = useState('')
  const [done, setDone] = useState(false)

  const progress = useMemo(() => `${(step / 3) * 100}%`, [step])

  const completeOnboarding = async () => {
    setStatus('Отправка данных...')
    const res = await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        toxicity,
        answers: {
          crypto2022: true,
          cheating: false,
          drinking: true,
        },
      }),
    })
    const data = await res.json()
    if (!res.ok) {
      setStatus(`Ошибка: ${data.error}`)
      return
    }
    setDone(true)
    setStatus(`Профиль создан: ${data.profileId}`)
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-black">Onboarding: сбор твоих regret-сигналов</h1>
        <div className="mt-4 h-2 rounded-full bg-neutral-800"><div className="h-2 rounded-full bg-lime-400" style={{ width: progress }} /></div>

        {step === 1 && <section className="mt-8 rounded-2xl border border-neutral-800 p-6"><h2 className="text-xl font-bold">Шаг 1: селфи + доступ к данным</h2><p className="mt-2 text-neutral-300">Загрузи селфи и “разреши” доступ к данным: соцсети, заметки, плейлисты, переписки (симуляция).</p><button className="mt-4 rounded-lg bg-lime-500 px-4 py-2 font-semibold text-black">Upload selfie (placeholder)</button></section>}

        {step === 2 && <section className="mt-8 rounded-2xl border border-neutral-800 p-6"><h2 className="text-xl font-bold">Шаг 2: уровень токсичности</h2><div className="mt-4 grid gap-3 sm:grid-cols-3">{levels.map((l) => <button key={l} onClick={() => setToxicity(l)} className={`rounded-lg border px-3 py-2 ${toxicity === l ? 'border-lime-400 bg-lime-400/20' : 'border-neutral-700'}`}>{l}</button>)}</div></section>}

        {step === 3 && <section className="mt-8 rounded-2xl border border-neutral-800 p-6"><h2 className="text-xl font-bold">Шаг 3: ключевые решения</h2><ul className="mt-3 space-y-2 text-neutral-300"><li>• Бросил бы универ ради крипты в 2022?</li><li>• Изменил бы партнёру, если “никто не узнает”?</li><li>• Начал бы пить, чтобы “снять стресс”?</li></ul><p className="mt-4 text-sm text-neutral-400">Выбранный уровень: {toxicity}</p><button onClick={completeOnboarding} className="mt-4 rounded-lg bg-lime-500 px-4 py-2 font-bold text-black">Завершить onboarding</button>{status && <p className="mt-3 text-sm text-lime-300">{status}</p>}</section>}

        <div className="mt-8 flex gap-3">
          <button disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))} className="rounded-lg border border-neutral-700 px-4 py-2 disabled:opacity-40">Назад</button>
          {step < 3 ? (
            <button onClick={() => setStep((s) => Math.min(3, s + 1))} className="rounded-lg bg-red-600 px-4 py-2 font-semibold">Дальше</button>
          ) : done ? (
            <Link href="/dashboard" className="rounded-lg bg-lime-500 px-4 py-2 font-bold text-black">Войти в regret-дашборд</Link>
          ) : null}
        </div>
      </div>
    </main>
  )
}
