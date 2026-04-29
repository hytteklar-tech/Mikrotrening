import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default async function JoinPage({ params }: { params: Promise<{ code: string }> }) {
  const { code: rawCode } = await params
  const code = rawCode.toUpperCase()
  const supabase = await createClient()

  const { data: group } = await supabase
    .from('groups')
    .select('id, name')
    .eq('invite_code', code)
    .single()

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <div className="w-full max-w-sm text-center space-y-4">
          <p className="text-4xl">❌</p>
          <h1 className="text-xl font-bold text-white">Ugyldig invitasjon</h1>
          <p className="text-gray-300 text-sm">Koden finnes ikke. Sjekk at du har riktig lenke.</p>
          <Link href="/login" className="block bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl py-3 transition text-center">
            Gå til innlogging
          </Link>
        </div>
      </div>
    )
  }

  // Already logged in → join directly and go to group
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    await supabase
      .from('group_members')
      .insert({ group_id: group.id, user_id: user.id })
    // Ignore duplicate error (23505)
    // Set as primary group if user has none
    const { data: userData } = await supabase
      .from('users')
      .select('primary_group_id')
      .eq('id', user.id)
      .single()
    if (!userData?.primary_group_id) {
      await supabase.from('users').update({ primary_group_id: group.id }).eq('id', user.id)
    }
    redirect('/group')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Logo size={64} />
          </div>
          <div className="space-y-1">
            <p className="text-orange-400 text-sm font-semibold uppercase tracking-wide">Du er invitert</p>
            <h1 className="text-2xl font-bold text-white">Bli med i</h1>
            <p className="text-3xl font-bold text-orange-400">{group.name}</p>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Tren sammen, hold hverandre i gang og se hvem som trener mest.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href={`/login?invite=${code}`}
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl py-4 text-center text-lg transition"
          >
            Bli med i gruppen →
          </Link>
          <p className="text-center text-gray-300 text-xs">
            Du oppretter en gratis konto hvis du ikke har en fra før.
          </p>
        </div>
      </div>
    </div>
  )
}
