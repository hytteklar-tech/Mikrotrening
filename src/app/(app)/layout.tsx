import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import BottomNav from '@/components/ui/BottomNav'
import Logo from '@/components/ui/Logo'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur border-b border-gray-800/50">
        <div className="max-w-lg mx-auto px-4 py-2 flex justify-end">
          <Logo size={36} />
        </div>
      </header>
      <main className="pb-20 max-w-lg mx-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
