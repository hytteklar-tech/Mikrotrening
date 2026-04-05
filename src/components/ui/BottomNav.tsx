'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Hjem', icon: '🏠' },
  { href: '/workouts', label: 'Trening', icon: '💪' },
  { href: '/test', label: 'Tester', icon: '📏' },
  { href: '/statistikk', label: 'Stats', icon: '📊' },
  { href: '/group', label: 'Gruppe', icon: '👥' },
  { href: '/settings', label: 'Meg', icon: '⚙️' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
      <div className="max-w-lg mx-auto flex">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex-1 flex flex-col items-center py-3 text-xs transition ${
              pathname === link.href ? 'text-orange-500' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="text-xl">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
