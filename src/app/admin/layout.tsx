import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect('/')
  }

  return (
    <div className="min-h-dvh bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center gap-4">
        <span className="font-bold text-orange-500">Admin</span>
        <nav className="flex gap-4 text-sm">
          <a href="/admin/feedback" className="text-gray-300 hover:text-white">Tilbakemeldinger</a>
          <a href="/admin/push" className="text-gray-300 hover:text-white">Send push</a>
        </nav>
      </header>
      <main className="max-w-2xl mx-auto p-4">
        {children}
      </main>
    </div>
  )
}
