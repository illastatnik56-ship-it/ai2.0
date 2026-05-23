'use client'

import { FormEvent, useState } from 'react'
import { Navbar } from '@/components/navbar'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Registration failed')
      setStatus(`Аккаунт создан: ${data.user.username}. Token: ${data.token}`)
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />
      <section className="mx-auto max-w-lg px-6 py-12">
        <h1 className="text-3xl font-black">Регистрация в Жиза 2.0</h1>
        <p className="mt-2 text-neutral-300">Создай аккаунт и подключись к AI-симуляциям.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" className="w-full rounded-lg border border-neutral-700 bg-black/40 px-3 py-2" required />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" className="w-full rounded-lg border border-neutral-700 bg-black/40 px-3 py-2" required />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password (min 8)" className="w-full rounded-lg border border-neutral-700 bg-black/40 px-3 py-2" required minLength={8} />
          <button disabled={loading} className="w-full rounded-lg bg-red-600 px-4 py-2 font-bold disabled:opacity-50">{loading ? 'Создание...' : 'Зарегистрироваться'}</button>
          {status && <p className="text-sm text-lime-300">{status}</p>}
        </form>
      </section>
    </main>
  )
}
