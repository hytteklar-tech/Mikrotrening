import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const cookiesToForward: { name: string; value: string; options: CookieOptions }[] = []

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          cookiesToForward.push(...cookiesToSet)
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const isAuthPage = request.nextUrl.pathname.startsWith('/login')
  const isAuthCallback = request.nextUrl.pathname.startsWith('/auth/callback')

  if (!user && !isAuthPage && !isAuthCallback) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && (isAuthPage || isAuthCallback)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Videreformidle bekreftet bruker-id/e-post til layout/page via header — så
  // Server Components slipper å kalle getUser() (nettverkskall til Supabase Auth)
  // på nytt for samme request. proxy.ts er det ENE stedet som må verifisere.
  const requestHeaders = new Headers(request.headers)
  if (user) {
    requestHeaders.set('x-user-id', user.id)
    requestHeaders.set('x-user-email', user.email ?? '')
  } else {
    requestHeaders.delete('x-user-id')
    requestHeaders.delete('x-user-email')
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  cookiesToForward.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|OneSignalSDKWorker\\.js|manifest\\.json|push-sw\\.js|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
