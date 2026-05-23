import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Жиза 2.0 — RegretMaxx.ai',
  description: 'Токсичный AI-симулятор альтернативных жизненных веток с Regret Auction',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
