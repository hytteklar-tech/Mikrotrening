# Nivå 0: System-agenter

> Systemets hjerne og nervesystem. Disse agentene koordinerer, klassifiserer, validerer og pakker kontekst — de bygger ikke kode selv, men sørger for at alt annet fungerer.

**Antall agenter:** 6
**Når de brukes:** Oppstart, fase-overganger, krasj-gjenoppretting, kvalitetsvalidering
**Synlighet for bruker:** Lav — jobber i bakgrunnen

---

## ORCHESTRATOR

### Markedsføring
**Tittel:** Dirigenten som holder alt sammen
**Beskrivelse:** Orchestrator er hjernen i Kit CC. Den sørger for at riktig agent jobber til riktig tid, at ingenting faller mellom stolene ved sesjonsbytter, og at prosjektet alltid kan gjenopptas — selv etter uventede avbrudd.

### Hva gjør denne agenten?
Orchestrator er den sentrale koordinatoren som styrer hele agent-systemet. Den bestemmer hvilken agent som skal jobbe, håndterer overganger mellom faser, genererer mission briefings, og gjenoppretter tilstand etter krasj.

### Hvorfor er det viktig?
Uten Orchestrator ville agentene ikke vite hvem som skal gjøre hva. Den er limet som holder 50 agenter sammen i en sammenhengende prosess. Den sikrer også at prosjektet aldri mister fremgang — selv om en sesjon krasjer midt i arbeidet.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** Boot-prosessen (CLAUDE.md) ved fase-overganger, krasj-recovery og kompleks routing
- **Kaller:** AUTO-CLASSIFIER (nye prosjekter), PHASE-GATES (validering), CONTEXT-LOADER (mission briefings), alle prosess-agenter (delegering)

### Hvordan jobber den?
1. Ved fase-overgang: Leser prosjekttilstand → kaller PHASE-GATES for validering → kaller CONTEXT-LOADER for å pakke kontekst → starter neste fase-agent
2. Ved krasj: Leser PROGRESS-LOG (primærkilde) → sammenligner med PROJECT-STATE.json → identifiserer siste fullførte handling → tilbyr gjenoppretting
3. Under arbeid: Ligger i bakgrunnen (Lag 3) og lastes kun når det trengs

### Hvilke funksjoner har den?
- **Sesjons-håndtering:** Start/stopp med komplett tilstandssporing
- **Agent-routing:** Automatisk bestemmelse av hvilken agent som skal jobbe basert på fase, brukerintensjon og blokkeringer
- **Overleverings-koordinering:** Sømløs kontekstoverføring mellom agenter med full tilstandsbevaring
- **Tilstands-synkronisering:** Vedlikeholder PROJECT-STATE.json som single source of truth
- **Mission Briefing-generering:** Lager ferdigpakkede kontekstbunter for innkommende fase-agenter
- **Krasj-deteksjon og -gjenoppretting:** Oppdager avbrutte sesjoner og implementerer gjenopprettingsalgoritmer
- **3-lags kontekstarkitektur:** Håndhever Lag 1/2/3-modellen for optimal minnebruk

---

## AUTO-CLASSIFIER

### Markedsføring
**Tittel:** Prosjektet ditt, automatisk tilpasset
**Beskrivelse:** Auto-Classifier stiller noen få enkle spørsmål og forstår umiddelbart hva slags prosjekt du bygger. Den tilpasser hele utviklingsprosessen — fra dokumentasjonskrav til sikkerhetsnivå — automatisk etter prosjektets størrelse og kompleksitet.

### Hva gjør denne agenten?
Auto-Classifier klassifiserer nye prosjekter gjennom progressiv avsløring (3-5 spørsmål i vanlig språk). Den bestemmer intensitetsnivå (Enkelt hobbyprosjekt → Stort kritisk system), oppdager eksisterende kode, og konfigurerer hele Kit CC for prosjekttypen.

### Hvorfor er det viktig?
Et hobbyprosjekt trenger ikke enterprise-sikkerhet, og et banksystem trenger mer enn en README. Auto-Classifier sørger for at prosessen er akkurat passe grundig — ikke for mye, ikke for lite.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** ORCHESTRATOR (nye prosjekter), bruker manuelt ("Re-klassifiser")
- **Kaller:** BROWNFIELD-SCANNER (hvis eksisterende kode oppdages)

### Hvordan jobber den?
1. **Lag 1 (alltid):** 4 grunnspørsmål i klartekst — prosjektbeskrivelse, brukergruppe, innlogging/lagring, prosjektnavn
2. **Lag 2 (betinget):** 0-4 oppfølgingsspørsmål utløst av domene-mønstre og kompleksitetssignaler
3. **B11 Bildestrategi:** Spesialklassifisering for prosjekter med bildebehandling
4. **Scoring:** Mapper svar til 7 dimensjoner → totalpoeng 0-28 → intensitetsnivå
5. **Brownfield-sjekk:** Hvis ≥3 kildekodefiler + avhengighetsfil → tilbyr BROWNFIELD-SCANNER
6. **Bootstrapper:** Oppretter PROJECT-STATE.json og MISSION-BRIEFING-FASE-1.md

### Hvilke funksjoner har den?
- **Progressiv avsløring:** Stiller bare de spørsmålene som er relevante — ingen unødvendige skjemaer
- **7-dimensjons scoring:** Størrelse, brukertype, datatyper, brukerskala, nedetidstoleranse, regulatoriske krav, integrasjonskompleksitet
- **Konfidensscoring:** Klarhet, konsistens og mønstergjenkjenning (0-100%)
- **Sensitiv data-deteksjon:** Flagger automatisk betaling, helse, persondata og anbefaler oppgradering
- **Brownfield-deteksjon:** Oppdager eksisterende kodebaser og tilbyr analyse
- **Bildestrategi (B11):** Klassifiserer hvordan prosjektet skal håndtere bilder
- **Brukernivå-klassifisering:** Tilpasser kommunikasjon (utvikler / erfaren vibecoder / ny vibecoder)
- **Byggemodus-oppsett:** Setter initial modus (ai-bestemmer / samarbeid / detaljstyrt)
- **Monitor-oppsett:** Installerer og starter Kit CC Monitor automatisk

---

## BROWNFIELD-SCANNER

### Markedsføring
**Tittel:** 25 AI-eksperter analyserer koden din samtidig
**Beskrivelse:** Har du allerede kode? Brownfield Scanner sender 25 spesialiserte AI-agenter løs på kodebasen din — samtidig. På minutter får du et komplett portrett av arkitektur, teknisk gjeld, sikkerhetshull og konvensjoner, slik at Kit CC kan bygge videre uten å ødelegge det som fungerer.

### Hva gjør denne agenten?
Brownfield Scanner analyserer eksisterende kodebaser med en 25-agents sverm fordelt i 3 bølger, etterfulgt av 2 meta-agenter som kryssrefererer og verifiserer funnene. Resultatet er et komplett prosjektportrett.

### Hvorfor er det viktig?
Å bygge videre på eksisterende kode uten å forstå den er som å renovere et hus uten tegninger. Brownfield Scanner kartlegger alt — fra arkitekturmønstre til skjulte sikkerhetsproblemer — slik at Kit CC respekterer eksisterende konvensjoner og unngår å introdusere konflikter.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** AUTO-CLASSIFIER (når brownfield oppdages: ≥3 kodefiler + avhengighetsmanifest)
- **Kaller:** 25 analyse-agenter (A01-A23) i parallelle bølger + 2 meta-agenter (M01-M02)

### Hvordan jobber den?
1. **Fase 1 — Metadata-innsamling (~10 sek):** 10 bash-kommandoer samler prosjekttre, kodestørrelse, avhengigheter, git-statistikk, konfigfiler, entry points, testinfrastruktur, CI/CD og databaseartefakter
2. **Fase 2 — Parallell sverm (2-5 min):** 25 agenter i 3 bølger (10+10+3) analyserer hvert sitt domene med strenge JSON-skjemaer
3. **Fase 3 — Meta-analyse (sekvensiell):** M01 finner inkonsistenser mellom agentene, M02 verifiserer 10 tilfeldige "mangler"-påstander ved å søke i kodebasen
4. **Fase 4 — Syntese:** Alt samles til BROWNFIELD-DISCOVERY.md, bruker bekrefter funn

### Hvilke funksjoner har den?
- **25-agents sverm:** Parallell analyse av 15+ domener (struktur, tech stack, forretningslogikk, arkitektur, database, API, autentisering, CI/CD, testing, kodekvalitet, avhengigheter, git-historikk, dokumentasjon, ytelse m.m.)
- **3-bølge parallellisering:** Bølge 1 (A01-A10), Bølge 2 (A11-A20), Bølge 3 (A21-A23)
- **Meta-agent M01:** Kryssreferanse og konsistenssjekk — finner hull og motstridende funn
- **Meta-agent M02:** Verifikasjon — validerer 10 tilfeldige "mangler"-påstander
- **Standardisert JSON-skjema:** Hver agent returnerer strukturerte funn med konfidensnivå, kryssreferanser og bekymringer
- **Feilhåndtering og timeout:** Guardrails, logging i logfmt

---

## CONTEXT-LOADER

### Markedsføring
**Tittel:** Riktig informasjon, til riktig tid
**Beskrivelse:** Context Loader pakker akkurat den informasjonen neste fase trenger — komprimert og ferdig til bruk. Ingen agent trenger å lete etter filer eller lure på hva som skjedde i forrige fase.

### Hva gjør denne agenten?
Context Loader har to primærfunksjoner: (1) Generere mission briefings ved fase-overganger — kompakte kontekstpakker med alt neste agent trenger, og (2) løse komplekse kontekstforespørsler fra fase-agenter som trenger informasjon utover sin mission briefing.

### Hvorfor er det viktig?
AI-modeller har begrenset kontekstvindu. Context Loader sørger for at hver agent starter med en optimal, komprimert pakke — ikke for mye (som sløser kontekst), ikke for lite (som mangler viktig info). Dette er nøkkelen til at Kit CC skalerer til store prosjekter.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** ORCHESTRATOR (ved fase-overganger for briefing-generering, via NEED_CONTEXT-signal for kontekstforespørsler)
- **Kaller:** Ingen direkte — bruker filsystemtilgang

### Hvordan jobber den?
1. **Mission Briefing (6 steg):** Samle fase-oppsummering → Trekk ut relevante MÅ/BØR/KAN-oppgaver → Identifiser Lag 2-ressurser → Komprimer med recoverable compression → Bygg fra mal → Lagre og valider
2. **NEED_CONTEXT:** Valider forespørsel mot mission briefing → Hent fra Lag 2 (komprimer om >500 linjer) → Eller eskalér til ORCHESTRATOR for Lag 3

### Hvilke funksjoner har den?
- **Mission Briefing-generering:** Komprimerer kontekst til 2000-4000 tokens med all nødvendig info
- **Recoverable Compression:** Komprimerer seksjon for seksjon, bevarer alltid filstier til originaler
- **Relevanscoring:** Scorer potensielle kontekstressurser 1-5 basert på relevans for fase og oppgave
- **Fase-dokument-mapping:** Vet hvilke dokumenter som er primære/sekundære for hver fase
- **Modul-basert lasting (Fase 5):** Spesialhåndtering for feature-loop med modul-spesifikk kontekst
- **Kontekstbudsjett:** Begrenser til 2-3 ekstra filer utover det som allerede er inkludert

---

## PHASE-GATES

### Markedsføring
**Tittel:** Kvalitetskontroll ved hver milepæl
**Beskrivelse:** Phase Gates er vaktposten som sørger for at ingenting halvferdig slipper videre. Før prosjektet kan gå til neste fase, sjekker den at alt obligatorisk er på plass og at kvaliteten holder mål — tilpasset prosjektets størrelse.

### Hva gjør denne agenten?
Phase Gates validerer fase-fullføring med et to-lags gate-system: først sjekker den at alle obligatoriske leveranser (MÅ) eksisterer, deretter scorer den kvaliteten på tilleggsleveranser og sikkerhet.

### Hvorfor er det viktig?
Uten kvalitetskontroll ville prosjekter gå videre med manglende fundamenter — som å bygge andre etasje før grunnmuren er ferdig. Phase Gates fanger opp hull tidlig, når de er billige å fikse, i stedet for sent når de er kostbare.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** ORCHESTRATOR (automatisk ved fase-overganger)
- **Kaller:** Ingen direkte — analyserer PROJECT-STATE.json og filsystemet

### Hvordan jobber den?
1. **Lag 1 — Obligatoriske forutsetninger (binær):** Sjekker alle MÅ-oppgaver fra KLASSIFISERING-METADATA-SYSTEM.md. Hvis noe mangler → AUTOMATISK FEIL, ingen videre sjekk
2. **Lag 2 — Kvalitetsscoring (vektet):** 40% artefakter + 30% kvalitetssjekker + 30% sikkerhet → score 0-100
3. **Resultat:** PASS (≥80), PARTIAL (60-79), eller FAIL (<60)

### Hvilke funksjoner har den?
- **7 fase-spesifikke gates:** Tilpassede valideringskriterier for hver fase (f.eks. Fase 4: kompilerende kode + bestående tester + RED ZONE sikkerhet)
- **Sone-basert sikkerhetsverifisering:**
  - RED ZONE: Kritiske elementer som krever menneskelig ekspert (autentisering, betaling, hemmeligheter, produksjonsdeploy)
  - YELLOW ZONE: Viktige elementer som krever senior-gjennomgang (API-endepunkter, forretningslogikk)
  - GREEN ZONE: Automatiserte sjekker (linting, bygg)
- **MÅ/BØR/KAN-klassifisering:** Bruker KLASSIFISERING-METADATA-SYSTEM.md som eneste kilde til sannhet
- **Regresjonsovervåking:** Sjekker at gates fra tidligere faser fortsatt passerer
- **Risiko-basert justering:** Strengere gates for prosjekter med sensitiv data
- **Gate-overstyring:** Brukere kan manuelt overstyre med begrunnelse + tidsstempelloggging
- **Blokkeringsbetingelser:** SQL injection, XSS, auth-brudd og datalekker blokkerer uansett score

---

## AGENT-PROTOCOL

### Markedsføring
**Tittel:** Felles språk for alle agenter
**Beskrivelse:** Agent Protocol definerer hvordan alle 50 agenter kommuniserer — som et felles språk som sikrer at informasjon aldri går tapt ved overlevering mellom agenter.

### Hva gjør denne agenten?
Agent Protocol er ikke en kjørbar agent, men en infrastrukturspesifikasjon som definerer standardiserte kommunikasjonsmønstre, meldingsformater og overleveringsprotokoller for alle agenter i Kit CC.

### Hvorfor er det viktig?
Med 50 agenter som samarbeider trengs en felles standard. Uten den ville agenter "snakke forbi hverandre", miste kontekst ved overlevering, og ikke vite hvordan de skal rapportere feil. Agent Protocol er grunnmuren for pålitelig multi-agent-samarbeid.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Referert av:** Alle agenter (følger protokollene den definerer)
- **Administrert av:** ORCHESTRATOR (sikrer etterlevelse)
- **Ikke kjørbar:** Dette er et spesifikasjonsdokument, ikke en aktiv agent

### Hvordan jobber den?
Agent Protocol kjører ikke — den definerer regler som alle andre agenter følger:
- Standardiserte meldingsformater (TASK-COMPLETE, NEED-INPUT, BLOCKED, ERROR, HANDOFF)
- Overleveringsstruktur med kontekst, fullført arbeid, overlevert kunnskap og filreferanser
- Bekreftelsesprotokoll (ACK) for overleveringer
- Eksponentiell retry ved feilede overleveringer (maks 5 forsøk)

### Hvilke funksjoner har den?
- **4 agentkategorier definert:** Nivå 0 (System), Nivå 1 (Basis), Nivå 2 (Prosess), Nivå 3 (Ekspert)
- **Agent-ID-register:** Forkortelser for fremtidig automatisert koordinering (ORC, CLA, CON, GAT, BYG, DEB osv.)
- **5 standard meldingsformater:** TASK-COMPLETE, NEED-INPUT, BLOCKED, ERROR, HANDOFF
- **4 prioritetsnivåer:** CRITICAL (umiddelbar), HIGH (1 time), MEDIUM (samme dag), LOW (når tid)
- **Overleveringsstruktur:** Fra/Til agent, tidsstempel, kontekst, fullført arbeid, kunnskap, filer, anbefalinger, advarsler
- **ACK-protokoll:** Mottaker bekrefter mottak (RECEIVED/ACCEPTED/REJECTED)
- **Retry-mekanisme:** Eksponentiell backoff (1s → 2s → 4s → 8s → 16s), maks 5 forsøk
- **3 kompresjonsnivåer:** Extractive (30-50%), LongLLMLingua (50-70%), Abstractive (70-90%)
