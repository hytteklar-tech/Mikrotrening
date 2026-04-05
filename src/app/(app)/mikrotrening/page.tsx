export default function MikrotreningPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-6 pb-28 space-y-8">

      {/* Hero */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white leading-tight">
          Mikrotrening: Små doser, store resultater
        </h1>
        <p className="text-gray-400 leading-relaxed">
          Du trenger ikke en time på treningssenteret for å bygge en sterkere kropp. Forskningen
          er klar: korte, intense treningsøkter spredd utover dagen — det forskere kaller{' '}
          <em className="text-orange-400">«exercise snacks»</em> — gir overraskende store resultater.
        </p>
      </div>

      {/* Hva er mikrotrening */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Hva er mikrotrening?</h2>
        <p className="text-gray-400 leading-relaxed">
          Mikrotrening er korte økter på ett til ti minutter, flere ganger i løpet av dagen.
          Styrkeøvelser som push-ups, knebøy, planken eller utfall — gjort i stua, på kontoret
          eller i hagen. I stedet for én lang økt, sprer du treningen utover dagen i håndterbare doser.
        </p>
      </section>

      {/* Forskning */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Hva sier forskningen?</h2>

        <div className="bg-gray-800 rounded-2xl p-4 space-y-1">
          <p className="text-orange-400 font-semibold text-sm">Nature Medicine</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Tre korte økter på bare ett til to minutter per dag ga <strong className="text-white">48–49 % lavere risiko</strong> for hjerte- og karsykdom. Nesten en halvering — fra under fem minutter daglig innsats.
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-4 space-y-1">
          <p className="text-orange-400 font-semibold text-sm">NTNU</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Mikrotrening med høy intensitet kan forlenge livet med{' '}
            <strong className="text-white">ti til fjorten år</strong>. Forskerne mener de
            offisielle treningsrådene er utdaterte — langt kortere økter gir stor helseeffekt.
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-4 space-y-1">
          <p className="text-orange-400 font-semibold text-sm">
            Scandinavian Journal of Medicine &amp; Science in Sports (2025)
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            En systematisk gjennomgang bekrefter at exercise snacks forbedrer kondisjon,
            blodtrykk, blodsukkerkontroll og kroppssammensetning. Korte, intense økter stimulerer
            frigjøring av veksthormon og IGF-1 — hormoner som fremmer muskelvekst og styrke.
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-4 space-y-1">
          <p className="text-orange-400 font-semibold text-sm">JAMA Oncology</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            4,5 minutter med intens aktivitet daglig ga{' '}
            <strong className="text-white">31–32 % lavere kreftrisiko</strong>.
          </p>
        </div>
      </section>

      {/* Hvorfor fungerer det */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Hvorfor det fungerer</h2>
        <p className="text-gray-400 leading-relaxed">
          Kroppen responderer på belastning, ikke på klokken. Ti push-ups med god teknikk og
          skikkelig intensitet sender et tydelig signal til musklene: bli sterkere. Gjør du det
          flere ganger om dagen, akkumulerer signalene seg.
        </p>
        <p className="text-gray-400 leading-relaxed">
          Atferdsforskning viser at korte økter øker sjansen for at folk faktisk trener — og
          fortsetter over tid. Etterlevelsesgraden ligger på rundt{' '}
          <strong className="text-white">91 prosent</strong>. Ingen reisetid, ingen garderobe,
          ingen timeplan. Bare noen minutter med innsats, spredd utover dagen.
        </p>
      </section>

      {/* Kom i gang */}
      <section className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-5 space-y-3">
        <h2 className="text-lg font-semibold text-white">Kom i gang</h2>
        <p className="text-gray-300 leading-relaxed">
          Velg to til tre øvelser. Gjør dem i fem minutter, tre ganger om dagen. Det er femten
          minutter totalt — men effekten tilsvarer langt mer.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Den viktigste faktoren er ikke hvor hardt du trener i en enkelt økt. Det er at du gjør
          det <strong className="text-white">hver dag</strong>. Mikrotrening fungerer fordi
          terskelen er lav nok til at du faktisk gjennomfører. Du bygger ikke bare muskler — du
          bygger en vane.
        </p>
        <p className="text-orange-400 font-semibold">
          Reis deg opp. Gjør ti knebøy. Det tar tredve sekunder. Det er nok til å starte.
        </p>
      </section>
    </div>
  )
}
