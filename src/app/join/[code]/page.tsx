import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import CopyButton from '@/components/ui/CopyButton'

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
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Logo size={64} />
          </div>
          <div className="space-y-1">
            <p className="text-orange-400 text-sm font-semibold uppercase tracking-wide">Du er invitert</p>
            <h1 className="text-2xl font-bold text-white">Bli med i</h1>
            <p className="text-3xl font-bold text-orange-400">{group.name}</p>
          </div>
        </div>

        {/* For existing users with the PWA */}
        <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
          <p className="text-white font-semibold text-sm">Har du Mikrotrening på hjemskjermen?</p>
          <p className="text-gray-300 text-xs leading-relaxed">
            Åpne appen → trykk <span className="text-white font-medium">Gruppe</span> → skriv inn koden under «Bli med i gruppe»
          </p>
          <div className="flex items-center gap-2">
            <span className="flex-1 bg-gray-700 text-white text-center font-mono text-xl font-bold rounded-xl py-3 tracking-widest">
              {code}
            </span>
            <CopyButton code={code} />
          </div>
        </div>

        {/* For new users */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-gray-500 text-xs">eller</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>
          <Link
            href={`/login?invite=${code}`}
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl py-4 text-center text-lg transition"
          >
            Logg inn / opprett konto →
          </Link>
          <p className="text-center text-gray-400 text-xs">
            Gratis konto hvis du ikke har en fra før.
          </p>
        </div>
      </div>
    </div>
  )
}
