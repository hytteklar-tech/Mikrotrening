'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ACTIVE = '#e85c00'
const INACTIVE = '#aaa'

function IconHjem() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1v-9.5z" />
      <path d="M9 21v-9h6v9" />
    </svg>
  )
}

function IconTrening() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="10.5" width="2" height="3" rx="0.5" />
      <rect x="5" y="8.5" width="2" height="7" rx="0.5" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <rect x="17" y="8.5" width="2" height="7" rx="0.5" />
      <rect x="19" y="10.5" width="2" height="3" rx="0.5" />
    </svg>
  )
}

function IconTester() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.83 2.83 0 014 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      <line x1="14" y1="6" x2="18" y2="10" />
    </svg>
  )
}

function IconStats() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="12" y1="20" x2="12" y2="6" />
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  )
}

function IconGruppe() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}

function IconMeg() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  )
}

const links = [
  { href: '/', label: 'Hjem', Icon: IconHjem },
  { href: '/workouts', label: 'Trening', Icon: IconTrening },
  { href: '/test', label: 'Tester', Icon: IconTester },
  { href: '/statistikk', label: 'Stats', Icon: IconStats },
  { href: '/group', label: 'Gruppe', Icon: IconGruppe },
  { href: '/settings', label: 'Meg', Icon: IconMeg },
]

export default function BottomNav() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <nav
      className="shrink-0 border-t border-gray-800 pb-[env(safe-area-inset-bottom)]"
      style={{ backgroundColor: '#111' }}
    >
      <div className="max-w-lg mx-auto flex">
        {links.map(({ href, label, Icon }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center py-3 gap-1 touch-manipulation transition-colors"
              style={{ color: active ? ACTIVE : INACTIVE }}
            >
              <Icon />
              <span style={{ fontSize: '11px', lineHeight: 1 }}>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
