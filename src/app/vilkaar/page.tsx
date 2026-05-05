import Link from 'next/link'

export const metadata = {
  title: 'Vilkår for bruk — Mikrotrening',
}

export default function VilkaarPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-lg mx-auto space-y-6">
        <div>
          <Link href="/settings" className="text-orange-500 text-sm">← Tilbake</Link>
          <h1 className="text-2xl font-bold mt-4">Vilkår for bruk</h1>
          <p className="text-gray-400 text-sm mt-1">Sist oppdatert: mai 2025</p>
        </div>

        <section className="space-y-2">
          <h2 className="font-semibold text-lg">Om appen</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Mikrotrening er en gratis treningsapp. Appen hjelper deg med å bygge en vane med korte,
            daglige treningsøkter — basert på forskning om mikrotrening.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-lg">Bruk av appen</h2>
          <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside leading-relaxed">
            <li>Appen er beregnet for privatpersoner over 13 år</li>
            <li>Du er ansvarlig for aktiviteten på din konto</li>
            <li>Misbruk, spam eller manipulering av topplisten kan føre til at kontoen stenges</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-lg">Helseforbehold</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Treningsforslagene i appen er ment som generell inspirasjon. Konsulter lege eller
            helsepersonell dersom du er usikker på om trening er riktig for deg.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-lg">Tilgjengelighet</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Vi tilbyr appen gratis og uten garantier for oppetid. Vi kan endre, begrense eller
            avslutte tjenesten med rimelig varsel.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-lg">Kontakt</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Spørsmål kan sendes til{' '}
            <a href="mailto:arild@boaholding.no" className="text-orange-500 underline">arild@boaholding.no</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
