export type Toxicity = 'Mild Regret' | 'Nuclear Regret' | 'Full Жиза'
export type PlanId = 'free' | 'standard' | 'pro'

export type TimelineCard = {
  id: string
  title: string
  imagePrompt: string
  summary: string
  vibe: string
  toxicity: Toxicity
}

export const timelineCards: TimelineCard[] = [
  {
    id: 't1',
    title: '2029 — Алкоголик в балконной студии',
    imagePrompt: 'flux://alt-self-alcoholic-neon-rain',
    summary: 'Бросил всё ради “перезагрузки”, теперь живёшь от созвона до срыва.',
    vibe: 'Холодный неон + пустой холодильник + кредиты',
    toxicity: 'Full Жиза',
  },
  {
    id: 't2',
    title: '2030 — OnlyFans Миллионер',
    imagePrompt: 'replicate://alt-self-onlyfans-mogul',
    summary: 'Продал приватность, купил виллу и экзистенциальную пустоту.',
    vibe: 'Люкс-хаос + PR-скандалы + тревога 24/7',
    toxicity: 'Nuclear Regret',
  },
  {
    id: 't3',
    title: '2028 — Депрессивный корпоративный раб',
    imagePrompt: 'grok://alt-self-corp-drone',
    summary: 'Стабильность есть, смысла нет. Кофеин вместо личности.',
    vibe: 'Open space + KPI + бессонница',
    toxicity: 'Mild Regret',
  },
  {
    id: 't4',
    title: '2031 — Brainrot Инфлюенсер',
    imagePrompt: 'flux://alt-self-brainrot-influencer',
    summary: 'Набрал аудиторию на кринже, потерял себя в контент-помойке.',
    vibe: 'Reels до 4 утра + допаминовые качели',
    toxicity: 'Full Жиза',
  },
]

export const auctionAvatars = [
  { name: 'Алко-Ты 2029', roast: 'Ты даже собственный будильник игноришь, а мечты — тем более.', deal: 'Отдаёшь контроль на 7 дней: я разрулю честно и грязно.' },
  { name: 'OF-Босс 2030', roast: 'Мораль? Милый, это был premium-план и ты его не потянул.', deal: 'Я делаю деньги, ты терпишь кринж-PR и хайп-скандалы.' },
  { name: 'Корп-Ты 2028', roast: 'Я продаю 12 часов в день и всё ещё продуктивнее твоих “планов”.', deal: 'Стабильная зарплата в обмен на душу и сон.' },
  { name: 'Brainrot-Ты 2031', roast: 'Ты хотел глубину, но утонул в шортсах.', deal: 'Контент каждый день. Личность — опционально.' },
]

export const leaderboard = [
  { nick: 'anon_cryptobro', regretScore: 999, title: 'Продал квартиру ради мемкоина на ATH' },
  { nick: 'anon_deadinside', regretScore: 954, title: 'Вернулся к бывшей 4 раза за год' },
  { nick: 'anon_nightowl', regretScore: 910, title: 'Уволился, чтобы стать трейдером без опыта' },
]

export const plans: { id: PlanId; name: string; price: string; features: string[]; cta: string }[] = [
  { id: 'free', name: 'Free', price: '0₽', features: ['3 timelines / day', '1 auction / week', 'Watermark на meme cards'], cta: 'Начать бесплатно' },
  { id: 'standard', name: 'Standard', price: '1490₽/мес', features: ['Unlimited timelines', 'Daily auction room', 'HD meme export', 'Extended roast dialogs'], cta: 'Выбрать Standard' },
  { id: 'pro', name: 'Pro', price: '3990₽/мес', features: ['Priority generation', 'Voice/3D avatars', 'AR simulation beta', 'Team/friend roast mode'], cta: 'Забрать Pro' },
]
