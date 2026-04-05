# 25-agents-sverm

> Kit CCs mest avanserte analysefunksjon — 25 spesialiserte AI-agenter som analyserer en eksisterende kodebase parallelt.

## Hva gjør den?

Når du bekrefter at Kit CC skal analysere eksisterende kode, starter svermen — en koordinert innsats av 25 ulike AI-agenter som hver gjør sitt arbeid samtidig. Hver agent har sitt spesialområde: noen analyserer kodestruktur, noen dykker ned i sikkerhet, andre kartlegger dataflyt, og så videre.

Prosessen kjører i 4 faser:

**Fase 1: Metadata-samling (≈10 sekunder)**
- Bash-skript samler info: antall filer, mappestruktur, filstørrelser, språk, avhengigheter
- Resultatet blir en "atlas" som alle agentene bruker som referanse

**Fase 2: Kjerneanalyse (tre bølger)**
- **Bølge 1 (5 agenter):** Prosjektstruktur, teknologi-stack, arkitektur, database, API
- **Bølge 2 (9 agenter):** Frontend, brukerflyt, dataflyt, tester, sikkerhet, feilhåndtering, avhengigheter, CI/CD, kodestil
- **Bølge 3 (9 agenter):** Dokumentasjon, miljø, integrasjoner, cross-cutting concerns, kodekvalitet, git-historikk, ytelse

**Fase 3: Meta-analyse (2 agenter)**
- Kryssreferansesjekk — sikrer at agentenes funn er konsistente
- Verifikasjonssjekk — bekrefter at alle områder er dekket

**Fase 4: Syntese (1 koordinator)**
- Alle resultater kombineres til et enhetlig "prosjektportrett"
- Lagres i `.ai/BROWNFIELD-DISCOVERY.md`

## Hvorfor er det nyttig?

En manuell analyse av en eksisterende kodebase tar timer eller dager. En enkelt AI-agent ville gjort mange feil og mistet detaljer. 25 agenter, hver med sitt fokus, gir deg:

1. **Fart** — Parallell analyse på minutter i stedet for timer
2. **Dybde** — Hver agent dykker ned i sitt område med ekspertise
3. **Konsistens** — Meta-agenter sikrer at resultatene henger sammen
4. **Detaljrikdom** — 25 perspektiver fanger detaljer en enkelt agent ville misset
5. **Tillit** — Resultatet er dokumentert og verifisert

Uten svermen måtte du selv kartlegge all denne informasjonen manuelt — eller Kit CC ville bare gjette basert på filnavn og enkle mønstre.

## Hvordan fungerer det?

Svermen koordineres av `agent-BROWNFIELD-SCANNER.md`. Her er flytdiagrammet:

```
BRUKER: "Ja, analyser koden"
        ↓
[FASE 1: Metadata-samling]
├─ Bash-script: find, wc -l, grep-telly, package.json parsing
├─ Utdata: METADATA.json (~2KB)
└─ Alle agenter mottar dette som referanse

        ↓
[FASE 2: Kjerneanalyse]
├─ BØLGE 1 (sekvensiell): 5 agenter starter (struktur, tech stack, ...)
├─ BØLGE 2 (parallell): 9 agenter starter når bølge 1 er ferdig
├─ BØLGE 3 (parallell): 9 agenter starter når bølge 2 er ferdig
└─ Hver agent: Les kode → Analyser → Skriv JSON-rapport
   (Rapporter lagres i .ai/BROWNFIELD-REPORTS/ per agent)

        ↓
[FASE 3: Meta-analyse]
├─ Kryssreferanseagent: Les alle 23 rapporter → Sjekk konsistens
├─ Verifikasjonsagent: Sikrer at alle områder er dekket
└─ Kjør på nytt hvis konflikter oppsto

        ↓
[FASE 4: Syntese]
├─ Koordinator: Kombinerer alle rapporter
├─ Redigerer for lesbarhet og sammenheng
└─ Lagrer som BROWNFIELD-DISCOVERY.md

        ↓
RESULTAT: Komplett prosjektportrett klart for Kit CC
```

## Eksempel

La oss si du analyserer en Vue 3 + Node.js-app med PostgreSQL. Svermen gjør sånt:

**Agent 1 (Struktur):**
- Finner at mappen er organisert som: `/client` (Vue), `/server` (Node.js), `/migrations` (DB)
- Konklusjon: "Monorepo med frontend/backend split"

**Agent 7 (Frontend):**
- Leser `client/src/components` — finner 47 Vue-komponenter
- Leser `client/src/router` — finner Vue Router config
- Konklusjon: "Vue 3 app med 47 komponenter, client-side routing"

**Agent 15 (Sikkerhet):**
- Leser `server/auth.js` — finner JWT-implementasjon
- Leser `server/api/users.js` — sjekker autentisering på endpoints
- Konklusjon: "JWT-basert auth, ikke alle endpoints er sikret" ⚠️

**Agent 20 (Ytelse):**
- Teller linjer per fil — finner at én fil har 2000+ linjer
- Leser git-historikk — finner at denne filen endres ofte
- Konklusjon: "Denne filen er en hotspot og burde refaktoreres"

Etter fase 3 kryssreferanse ser verifikasjonsagenten: "Agent 15 fant et sikkerhetsproblem. Agent 9 (som analyserte API) burde ha vurdert dette." Det blir lagt til i rapporten.

Fase 4 kombinerer alt til en samlet rapport som sier:
- Prosjektet er en Vue 3 + Node.js monorepo
- Det har 47 Vue-komponenter, 30 API-endpoints
- Sikkerhet: JWT-auth, men ikke alle endpoints er sikret
- Kodekvalitet: Generelt god, men én fil må refaktoreres
- Ytelse: Rimelig, men kunne forbedres
- Git: 480 commits, aktiv utvikling

## Relaterte features
- **brownfield-deteksjon** — Oppdager når en brownfield-analyse skal kjøres
- **prosjektportrett** — Sluttresultatet av analysen

---
*Definert i: Kit CC/Agenter/agenter/system/agent-BROWNFIELD-SCANNER.md*
*Lagt til: 2026-02-17*
*Kategori: Brownfield*
