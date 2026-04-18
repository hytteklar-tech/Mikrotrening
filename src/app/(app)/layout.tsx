import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import BottomNav from '@/components/ui/BottomNav'
import Logo from '@/components/ui/Logo'
import OneSignalProvider from '@/components/ui/OneSignalProvider'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="h-dvh flex flex-col bg-gray-950 text-white">
      <header className="shrink-0 bg-gray-950/90 backdrop-blur border-b border-gray-800/50">
        <div className="max-w-lg mx-auto px-4 py-2 flex justify-end">
          <Logo size={36} />
        </div>
      </header>
      <main className="flex-1 overflow-y-auto w-full max-w-lg mx-auto">
        {children}
      </main>
      <BottomNav />
      <OneSignalProvider />
    </div>
  )
}
