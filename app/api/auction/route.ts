import { NextResponse } from 'next/server'
import { auctionAvatars } from '@/lib/mock-data'

export async function GET() {
  return NextResponse.json({
    ok: true,
    roundId: `auction_${Date.now()}`,
    avatars: auctionAvatars,
    transcript: [
      'Алко-Ты: Выбери меня — хотя бы честно развалишься.',
      'Корп-Ты: Стабильная депрессия лучше хаотичного позора.',
      'OF-Босс: Бабки закрывают 70% драмы, остальное — терапия.',
    ],
  })
}
