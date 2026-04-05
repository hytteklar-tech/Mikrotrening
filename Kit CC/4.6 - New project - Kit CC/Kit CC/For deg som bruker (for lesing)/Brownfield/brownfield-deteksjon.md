# Brownfield-deteksjon

> Automatisk oppdagelse av eksisterende kode når Kit CC legges til et etablert prosjekt.

## Hva gjør den?

Brownfield-deteksjon kjører automatisk når Kit CC startes for første gang på et prosjekt. Systemet analyserer prosjektmappen og ser etter tegn på eksisterende kode — typisk i mapper som `src/`, `app/`, `lib/`, `source/` eller lignende.

Deteksjonen ser spesifikt etter **kildekodefiler**: JavaScript, TypeScript, Python, Java, Go, Rust, C++, Swift, Kotlin, C#, PHP, Ruby, og andre programmeringsspråk. Den ekskluderer automatisk konfigurasjonsfiler (JSON, YAML, TOML), dokumentasjon (Markdown), og andre hjelpefiler.

Hvis systemet finner **3 eller flere kildekodefiler**, gjenkjenner det at dette er et "brownfield"-prosjekt (eksisterende kode) i motsetning til "greenfield" (tomt prosjekt). Du får da spørsmålet:

> **"Jeg ser at det finnes kode her. Vil du at jeg analyserer den først?"**

## Hvorfor er det nyttig?

Mange prosjekter som bruker Kit CC er ikke helt tomme fra start. De kan ha:
- En eksisterende backend eller frontend
- Gamle prototyper som skal refaktoreres
- En delvis ferdig løsning som skal fullføres
- Kode som skal integreres med Kit CCs prosess

Uten deteksjon ville Kit CC bare startet med klassifisering av prosjektet, og ignorert all den eksisterende koden. Det ville føre til konflikter, inkonsistente konvensjoner, og masse unødvendig omskriving.

Med deteksjon tilbyr systemet automatisk å analysere den eksisterende koden først — slik at Kit CC kan tilpasse seg til det som allerede finnes, i stedet for å ignorere det.

## Hvordan fungerer det?

Deteksjonen kjører som del av boot-sekvensen (steg 2 — NYTT PROSJEKT):

1. **Mapping av prosjektmappen** — Ligg gjennom alle undermapper i prosjektroten
2. **Tellinger** — Teller kildekodefiler per filtype og mappe
3. **Terskeljekk** — Hvis ≥3 kildekodefiler finnes: flagg som brownfield
4. **Brukervalg** — Spør bruker:
   - "Ja, analyser koden først" → Kjør 25-agents-svermen (agent-BROWNFIELD-SCANNER.md)
   - "Nei, start som normalt" → Kjør standard klassifisering (agent-AUTO-CLASSIFIER.md)

Hvis brukeren velger "ja", blir resultatet lagret i `.ai/BROWNFIELD-DISCOVERY.md` — et komplett portrett av koden. Denne informasjonen brukes så til å tilpasse Kit CCs fase 1-3 til konvensjonene i den eksisterende koden.

## Eksempel

Du har et prosjekt der:
```
myapp/
├── src/
│   ├── main.js
│   ├── utils.js
│   └── api.js
├── tests/
│   └── main.test.js
├── package.json
├── README.md
└── .gitignore
```

Deteksjonen finner 3 kildekodefiler (`.js` filer). Den ignorerer `package.json`, `README.md`, og `.gitignore` (ikke programmerkode). Systemet sier:

> **"Jeg ser at det finnes kode her (3 JavaScript-filer). Vil du at jeg analyserer den først?"**

Hvis du svarer "ja", kjører 25-agenter-svernen en full analyse og produserer `BROWNFIELD-DISCOVERY.md` som forklarer:
- At dette er et Node.js-prosjekt
- At koden bruker vanlig JavaScript (ikke TypeScript)
- At det finnes tester
- Hvilke konvensjoner som er brukt
- Hva Kit CC bør respektere når det bygger videre

## Relaterte features
- **25-agents-sverm** — Den fullstendige analysen som kjører hvis brownfield oppdages
- **prosjektportrett** — Resultatet av analysen
- **AUTO-CLASSIFIER** — Klassifiseringssystemet som tilpasses basert på brownfield-resultater

---
*Definert i: Kit CC/Agenter/agenter/system/agent-AUTO-CLASSIFIER.md (BROWNFIELD-DETEKSJON), CLAUDE.md (steg 2)*
*Lagt til: 2026-02-17*
*Kategori: Brownfield*
