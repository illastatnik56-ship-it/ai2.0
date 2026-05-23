import Link from 'next/link'

const links = [
  ['Landing', '/'],
  ['Onboarding', '/onboarding'],
  ['Dashboard', '/dashboard'],
  ['Auction', '/auction'],
  ['Pricing', '/pricing'],
  ['Register', '/register'],
] as const

export function Navbar() {
  return (
    <nav className="sticky top-0 z-30 border-b border-neutral-800 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="font-black uppercase tracking-widest text-lime-300">Жиза 2.0</Link>
        <div className="flex flex-wrap gap-2 text-sm">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-md border border-neutral-700 px-3 py-1 hover:border-lime-400/50">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
