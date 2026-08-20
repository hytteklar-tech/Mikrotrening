'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

export default function GroupManager({ groups, membersWithStatus, userId, primaryGroupId: initialPrimaryGroupId, initialCode }: {
  groups: any[]
  membersWithStatus: any[]
  userId: string
  primaryGroupId: string | null
  initialCode?: string
}) {
  const [joinCode, setJoinCode] = useState(initialCode?.toUpperCase() ?? '')
  const [newGroupName, setNewGroupName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [primaryGroupId, setPrimaryGroupId] = useState(initialPrimaryGroupId)
  const [copiedGroupId, setCopiedGroupId] = useState<string | null>(null)
  const [appLinkCopied, setAppLinkCopied] = useState(false)
  const joinSectionRef = useRef<HTMLDivElement>(null)
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const appLinkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    return () => {
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current)
      if (appLinkTimerRef.current) clearTimeout(appLinkTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (initialCode && joinSectionRef.current) {
      joinSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [initialCode])

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
      try { await navigator.share({ title: 'Mikrotrening', text }) } catch {}
    } else {
      navigator.clipboard.writeText(text)
      setCopiedGroupId(group.id)
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current)
      copiedTimerRef.current = setTimeout(() => setCopiedGroupId(null), 2000)
    }
  }

  async function shareApp() {
    const url = 'https://app.mikrotrening.no'
    const text = 'Prøv Mikrotrening — 30 sekunder om dagen er nok til å bygge en treningsvane 💪'
    if (navigator.share) {
      try { await navigator.share({ title: 'Mikrotrening', text, url }) } catch {}
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`)
      setAppLinkCopied(true)
      if (appLinkTimerRef.current) clearTimeout(appLinkTimerRef.current)
      appLinkTimerRef.current = setTimeout(() => setAppLinkCopied(false), 2000)
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
          <Card key={group.id}>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{group.name}</h3>
                  {group.id === primaryGroupId
                    ? <Badge variant="outline" className="border-primary/40 text-primary bg-primary/20">I fokus</Badge>
                    : groups.length > 1 && (
                      <Button
                        onClick={() => setFocusGroup(group.id)}
                        variant="ghost"
                        size="xs"
                      >
                        Sett som fokus
                      </Button>
                    )
                  }
                </div>
              </div>

              <div className="flex items-center justify-between bg-muted rounded-xl px-3 py-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Invitasjonskode</p>
                  <span className="text-lg font-mono font-bold tracking-widest">{group.invite_code}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(group.invite_code)
                      setCopiedGroupId(group.id)
                      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current)
                      copiedTimerRef.current = setTimeout(() => setCopiedGroupId(null), 2000)
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    {copiedGroupId === group.id ? '✓ Kopiert' : 'Kopier'}
                  </Button>
                  <Button
                    onClick={() => shareGroup(group)}
                    variant="outline"
                    size="sm"
                    className="border-primary/40 text-primary hover:bg-primary/10"
                  >
                    Del 📲
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {members.map((m: any) => (
                  <div key={m.user_id} className="flex items-center justify-between">
                    <span className="text-sm">{m.users?.display_name ?? 'Ukjent'}{m.isMe ? ' (meg)' : ''}</span>
                    {m.activeToday
                      ? <Badge className="bg-green-500/20 text-green-400 border-transparent">✅ Trent i dag</Badge>
                      : <Badge variant="secondary">💤 Ikke trent i dag</Badge>
                    }
                  </div>
                ))}
              </div>

              {(canLeave || isAlone) && (
                <div className="flex justify-end">
                  {isAlone && (
                    <Button
                      onClick={() => deleteGroup(group.id)}
                      disabled={loading}
                      variant="ghost"
                      size="xs"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      Slett gruppe
                    </Button>
                  )}
                  {canLeave && (
                    <Button
                      onClick={() => leaveGroup(group.id)}
                      disabled={loading}
                      variant="ghost"
                      size="xs"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      Meld deg ut
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}

      <a
        href="/leaderboard"
        className="flex items-center justify-between bg-card rounded-xl ring-1 ring-foreground/10 px-4 py-4 hover:bg-muted/50 transition"
      >
        <div>
          <p className="text-sm font-semibold">Toppliste</p>
          <p className="text-xs text-muted-foreground">Se hvem som trener mest</p>
        </div>
        <span className="text-xl">🏆</span>
      </a>

      <button
        onClick={shareApp}
        className="w-full flex items-center justify-between bg-card rounded-xl ring-1 ring-foreground/10 px-4 py-4 hover:bg-muted/50 transition text-left"
      >
        <div>
          <p className="text-sm font-semibold">Inviter en venn til appen</p>
          <p className="text-xs text-muted-foreground">{appLinkCopied ? 'Kopiert! ✓' : 'Del Mikrotrening med noen du kjenner'}</p>
        </div>
        <span className="text-xl">🤝</span>
      </button>

      <div ref={joinSectionRef}>
        <Card className={initialCode ? 'ring-2 ring-primary' : ''}>
          <CardContent className="space-y-3">
            <p className="text-sm font-semibold">Bli med i gruppe</p>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Invitasjonskode"
                value={joinCode}
                onChange={e => setJoinCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="flex-1 tracking-widest"
              />
              <Button
                onClick={joinGroup}
                disabled={loading || joinCode.length < 6}
              >
                Bli med
              </Button>
            </div>
            {error && <p className="text-destructive text-xs">{error}</p>}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="space-y-3">
          <p className="text-sm font-semibold">Opprett ny gruppe</p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Gruppenavn"
              value={newGroupName}
              onChange={e => setNewGroupName(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={createGroup}
              disabled={loading || !newGroupName.trim()}
            >
              Opprett
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
