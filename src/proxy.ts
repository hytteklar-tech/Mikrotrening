import { NextResponse, type NextRequest } from 'next/server'

// TEST: returner alltid next() for å bekrefte at proxy.ts kjøres
export async function proxy(request: NextRequest) {
  const res = NextResponse.next()
  res.headers.set('x-proxy-test', 'running')
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
