import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import BottomNav from '@/components/ui/BottomNav'
import Logo from '@/components/ui/Logo'
import OneSignalProvider from '@/components/ui/OneSignalProvider'
import PostHogBootstrap from '@/components/providers/PostHogBootstrap'
import PostHogAppOpened from '@/components/providers/PostHogAppOpened'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  // proxy.ts har allerede verifisert brukeren (og satt disse headerne) for enhver
  // request som når hit — unngår et nytt getUser()-nettverkskall for samme request.
  const headerList = await headers()
  const userId = headerList.get('x-user-id')
  const userEmail = headerList.get('x-user-email')

  if (!userId) redirect('/login')

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
      <PostHogBootstrap userId={userId} email={userEmail ?? undefined} />
      <PostHogAppOpened />
    </div>
  )
}
