'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function GroupManager({ groups, membersWithStatus, userId, primaryGroupId: initialPrimaryGroupId }: {
  groups: any[]
  membersWithStatus: any[]
  userId: string
  primaryGroupId: string | null
}) {
  const [joinCode, setJoinCode] = useState('')
  const [newGroupName, setNewGroupName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [primaryGroupId, setPrimaryGroupId] = useState(initialPrimaryGroupId)
  const [copiedGroupId, setCopiedGroupId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  async function deleteGroup(groupId: string) {
    setLoading(true)
    await supabase.from('group_members').delete().eq('group_id', groupId).eq('user_id', userId)
    await supabase.from('groups').delete().eq('id', groupId)
    setLoading(false)
    router.refresh()
  }

  async function leaveGroup(groupId: string) {
    if (!confirm('Er du sikker på at du vil melde deg ut av gruppen?')) return
    setLoading(true)
    await supabase.from('group_members').delete().eq('group_id', groupId).eq('user_id', userId)
    if (primaryGroupId === groupId) {
      await supabase.from('users').update({ primary_group_id: null }).eq('id', userId)
      setPrimaryGroupId(null)
    }
    setLoading(false)
    router.refresh()
  }

  async function shareGroup(group: any) {
    const url = `${window.location.origin}/join/${group.invite_code}`
    const text = `Bli med i gruppen «${group.name}» på Mikrotrening:\n${url}`
    if (navigator.share) {
      navigator.share({ title: 'Mikrotrening', text })
    } else {
      navigator.clipboard.writeText(text)
      setCopiedGroupId(group.id)
      setTimeout(() => setCopiedGroupId(null), 2000)
    }
  }

  async function setFocusGroup(groupId: string) {
    setPrimaryGroupId(groupId)
    await supabase.from('users').update({ primary_group_id: groupId }).eq('id', userId)
    router.refresh()
  }

  async function createGroup() {
    if (!newGroupName.trim()) return
    setLoading(true)
    const { data: group } = await supabase
      .from('groups')
      .insert({ name: newGroupName.trim(), created_by: userId })
      .select()
      .single()
    if (group) {
      await supabase.from('group_members').insert({ group_id: group.id, user_id: userId })
    }
    setNewGroupName('')
    setLoading(false)
    router.refresh()
  }

  async function joinGroup() {
    if (!joinCode.trim()) return
    setLoading(true)
    setError('')

    const { data: group, error: groupError } = await supabase
      .from('groups')
      .select('id')
      .eq('invite_code', joinCode.trim().toUpperCase())
      .single()

    if (groupError || !group) {
      setError('Fant ingen gruppe med den koden.')
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('group_members')
      .insert({ group_id: group.id, user_id: userId })

    if (insertError) {
      console.error('[joinGroup] code:', insertError.code, insertError.message)
      if (insertError.code === '23505') {
        // Already a member — just refresh to show the group
        setJoinCode('')
        setLoading(false)
        router.refresh()
        return
      }
      if (insertError.code === '23503') {
        // FK violation — user row missing in public.users, needs to complete onboarding
        setError('Profilen din er ikke fullført. Logg ut og logg inn på nytt.')
        setLoading(false)
        return
      }
      setError(`Kunne ikke melde deg inn. Prøv igjen. (${insertError.code})`)
      setLoading(false)
      return
    }

    setJoinCode('')
    setLoading(false)
    router.refresh()
  }

  return (
    <div className="space-y-4">
      {groups.map((group: any) => {
        const members = membersWithStatus.filter((m: any) => m.group_id === group.id)
        const isAlone = members.length === 1 && members[0]?.user_id === userId
        const canLeave = members.some((m: any) => m.user_id === userId) && !isAlone
        return (
          <div key={group.id} className="bg-gray-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{group.name}</h3>
                {group.id === primaryGroupId
                  ? <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">I fokus</span>
                  : groups.length > 1 && (
                    <button
                      onClick={() => setFocusGroup(group.id)}
                      className="text-xs text-gray-300 hover:text-white transition"
                    >
                      Sett som fokus
                    </button>
                  )
                }
              </div>
              <button
                onClick={() => shareGroup(group)}
                className="text-sm bg-gray-700 text-orange-400 px-4 py-2 rounded-xl font-semibold transition"
              >
                {copiedGroupId === group.id ? 'Kopiert! ✓' : 'Del invite 📲'}
              </button>
            </div>

            <div className="space-y-2">
              {members.map((m: any) => (
                <div key={m.user_id} className="flex items-center justify-between">
                  <span className="text-sm">{m.users?.display_name ?? 'Ukjent'}{m.isMe ? ' (meg)' : ''}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${m.activeToday ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-300'}`}>
                    {m.activeToday ? '✅ Trent i dag' : '💤 Ikke trent i dag'}
                  </span>
                </div>
              ))}
            </div>

            {(canLeave || isAlone) && (
              <div className="flex justify-end">
                {isAlone && (
                  <button
                    onClick={() => deleteGroup(group.id)}
                    disabled={loading}
                    className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50 transition"
                  >
                    Slett gruppe
                  </button>
                )}
                {canLeave && (
                  <button
                    onClick={() => leaveGroup(group.id)}
                    disabled={loading}
                    className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50 transition"
                  >
                    Meld deg ut
                  </button>
                )}
              </div>
            )}
          </div>
        )
      })}

      <a
        href="/leaderboard"
        className="flex items-center justify-between bg-gray-800 rounded-2xl p-4 hover:bg-gray-700 transition"
      >
        <div>
          <p className="text-sm font-semibold text-white">Toppliste</p>
          <p className="text-xs text-gray-300">Se hvem som trener mest</p>
        </div>
        <span className="text-xl">🏆</span>
      </a>

      <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
        <p className="text-sm font-semibold text-white">Bli med i gruppe</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Invitasjonskode"
            value={joinCode}
            onChange={e => setJoinCode(e.target.value.toUpperCase())}
            maxLength={6}
            className="flex-1 bg-gray-700 text-white rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 tracking-widest"
          />
          <button
            onClick={joinGroup}
            disabled={loading || joinCode.length < 6}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl px-4 py-2 text-sm font-semibold"
          >
            Bli med
          </button>
        </div>
        {error && <p className="text-red-400 text-xs">{error}</p>}
      </div>

      <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
        <p className="text-sm font-semibold text-white">Opprett ny gruppe</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Gruppenavn"
            value={newGroupName}
            onChange={e => setNewGroupName(e.target.value)}
            className="flex-1 bg-gray-700 text-white rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={createGroup}
            disabled={loading || !newGroupName.trim()}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl px-4 py-2 text-sm font-semibold"
          >
            Opprett
          </button>
        </div>
      </div>
    </div>
  )
}
