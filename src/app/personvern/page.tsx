import Link from 'next/link'

export const metadata = {
  title: 'Personvernerklæring — Mikrotrening',
}

export default function PersonvernPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-lg mx-auto space-y-6">
        <div>
          <Link href="/settings" className="text-orange-500 text-sm">← Tilbake</Link>
          <h1 className="text-2xl font-bold mt-4">Personvernerklæring</h1>
          <p className="text-gray-400 text-sm mt-1">Sist oppdatert: mai 2025</p>
        </div>

        <section className="space-y-2">
          <h2 className="font-semibold text-lg">Hvem vi er</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Mikrotrening er en treningsapp tilgjengelig på mikrotrening.no. Appen er laget for å hjelpe deg
            med å holde en jevn treningsvane gjennom korte, daglige mikroøkter.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-lg">Data vi samler inn</h2>
          <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside leading-relaxed">
            <li>E-postadresse — brukes til innlogging</li>
            <li>Visningsnavn — vises på toppliste og i appen</li>
            <li>Treningslogger — dato, treningspakke og varighet per økt</li>
            <li>Push-innstillinger — tidspunkt for påminnelser og enhetsidentifikator</li>
            <li>Gruppemedlemskap — hvilken gruppe du er med i</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-lg">Hvordan vi bruker dataene</h2>
          <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside leading-relaxed">
            <li>Vise din treningshistorikk, streak og statistikk</li>
            <li>Sende daglige push-påminnelser på tidspunkt du velger</li>
            <li>Vise gruppemedlemmer og toppliste</li>
          </ul>
          <p className="text-gray-300 text-sm leading-relaxed">
            Vi selger ikke data til tredjeparter og bruker ikke dataene til reklame.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-lg">Tredjepartstjenester</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            For å drive appen bruker vi følgende tjenester:
          </p>
          <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside leading-relaxed">
            <li><span className="text-white font-medium">Supabase</span> — database og innlogging (EU/US)</li>
            <li><span className="text-white font-medium">Vercel</span> — hosting (US)</li>
            <li><span className="text-white font-medium">OneSignal</span> — push-varsler (US)</li>
            <li><span className="text-white font-medium">Sentry</span> — feilsporing (US)</li>
          </ul>
          <p className="text-gray-300 text-sm leading-relaxed">
            Alle leverandører er GDPR-kompatible og håndterer data i henhold til sine egne personvernerklæringer.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-lg">Dine rettigheter</h2>
          <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside leading-relaxed">
            <li><span className="text-white font-medium">Innsyn</span> — du kan be om en kopi av dine data</li>
            <li><span className="text-white font-medium">Sletting</span> — du kan slette kontoen og alle data direkte i appen under Meg → Slett konto</li>
            <li><span className="text-white font-medium">Retting</span> — du kan endre visningsnavnet ditt i appen</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-lg">Kontakt</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Spørsmål om personvern kan sendes til{' '}
            <a href="mailto:arild@boaholding.no" className="text-orange-500 underline">arild@boaholding.no</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
