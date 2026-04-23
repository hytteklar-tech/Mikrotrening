export { proxy as middleware } from './proxy'

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|OneSignalSDKWorker\\.js|manifest\\.json|push-sw\\.js|api/cron|api/push/subscribe|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
