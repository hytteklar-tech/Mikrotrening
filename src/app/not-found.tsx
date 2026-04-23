import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <p className="text-6xl">🤷</p>
        <h1 className="text-2xl font-bold">Siden finnes ikke</h1>
        <p className="text-gray-400 text-sm">Adressen du prøvde å åpne eksisterer ikke.</p>
        <Link href="/" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl px-6 py-3 transition">
          Til forsiden
        </Link>
      </div>
    </div>
  )
}
