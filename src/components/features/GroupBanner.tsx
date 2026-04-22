'use client'

import Link from 'next/link'

type Member = {
  userId: string
  name: string
  activeToday: boolean
}

type Props = {
  groupName: string
  members: Member[]
}

function initials(name: string) {
  const parts = name.trim().split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

export default function GroupBanner({ groupName, members }: Props) {
  const sorted = [...members].sort((a, b) => Number(b.activeToday) - Number(a.activeToday))
  const trainedCount = members.filter(m => m.activeToday).length
  const total = members.length

  return (
    <Link href="/group" className="flex items-center gap-3 py-2 group">
      <div className="flex -space-x-2">
        {sorted.map(m => (
          <div
            key={m.userId}
            title={m.name}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 border-gray-950 shrink-0
              ${m.activeToday ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'}`}
          >
            {initials(m.name)}
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-300 flex-1">
        <span className="text-white font-medium">{trainedCount} av {total}</span> i {groupName} har trent
      </p>
      <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}
