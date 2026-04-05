# Hva er Kit CC?

> Et multi-agent AI-system med 50+ spesialiserte agenter som tar et programvareprosjekt fra idé til produksjon gjennom 7 strukturerte faser.

---

## DEL 1: Hva Kit CC gjør ved oppstart

Når du starter Kit CC i et prosjekt, skjer følgende automatisk:

### 1. Modusvalg
Kit CC spor: "Bygge eller Spørre?" Bygge starter full prosess. Spørre gir read-only veiledning uten å endre noe.

### 2. Prosjektdeteksjon
- **Nytt prosjekt?** → Starter klassifisering (3-5 spørsmål)
- **Eksisterende Kit CC-prosjekt?** → Leser tilstand og fortsetter der du slapp
- **Eksisterende kode uten Kit CC?** → Tilbyr å analysere med 25-agents sverm (brownfield-scanning)

### 3. Klassifisering (AUTO-CLASSIFIER)
Stiller 3 åpningsspørsmål i vanlig språk, deretter 0-4 oppfølgingsspørsmål basert på svarene. Bak kulissene scorer den prosjektet på 7 dimensjoner (størrelse, brukertype, data, skala, nedetid, regulering, integrasjoner) og gir en totalpoeng 7-28 som bestemmer intensitetsnivå.

**Skjulte ting som skjer under klassifisering:**
- Integrasjonsanalyse — utleder automatisk hvilke tjenester du trenger (Stripe, Supabase, etc.) fra ordene du bruker
- Bildestrategi — vurderer om prosjektet trenger bilder og foreslår løsning
- Confidence scoring — måler hvor sikker den er på klassifiseringen (0-100%)
- Automatisk sikkerhetsoppgradering — nevner du betaling eller helse, oppgraderes sikkerhetskravene automatisk

### 4. Monitor-oppsett
Starter et visuelt dashboard i nettleseren som viser fase, fremdrift og logger i sanntid.

### 5. Byggemodus
Spør om du vil ha: ai-bestemmer / samarbeid / detaljstyrt.

---

## DEL 2: Hva som skjer i hver fase

### Fase 1: Idé og visjon
**Hva Kit CC gjør:** Definerer problemet, kartlegger målgruppe (personas), lager brukerreiser, risikokart og Go/No-Go-vurdering.
**Eksperter som kan kalles:** Persona-ekspert, Lean Canvas-ekspert, Konkurranseanalyse-ekspert.
**Leveranser:** vision.md, personas.md, user-journeys.md, lean-canvas.md, risk-register.md.

### Fase 2: Planlegg
**Hva Kit CC gjør:** Oversetter visjonen til konkrete brukerhistorier med akseptansekriterier. Definerer MVP-grense. Prioriterer med MoSCoW (Must/Should/Could/Won't). Oppretter modulregister med alle funksjoner.
**Eksperter som kan kalles:** Wireframe-ekspert, API-Design-ekspert.
**Leveranser:** PRD.md, brukerhistorier, modulregister, wireframes, API-spec, datamodell.

### Fase 3: Arkitektur og sikkerhet
**Hva Kit CC gjør:** Velger tech stack med dokumenterte avveininger. Designer datamodell og API. Kjører trusselmodellering (STRIDE/DREAD). Planlegger sikkerhetskontroller.
**Eksperter som kan kalles:** Trusselmodellerings-ekspert, Datamodell-ekspert, API-Design-ekspert.
**Leveranser:** tech-stack-decision.md, database-schema.sql, threat-model.md, security-controls.md.

### Fase 4: MVP
**Hva Kit CC gjør:** Setter opp Git, CI/CD, hemmelighetsbehandling, testinfrastruktur. Bygger første fungerende versjon. Starter Monitor i proxy-modus.
**Eksperter som kan kalles:** CICD-ekspert, Infrastruktur-ekspert, Hemmelighetssjekk-ekspert, Supply-Chain-ekspert.
**Leveranser:** Kjørbar app, CI/CD-pipeline, testsuite, .env-oppsett.

### Fase 5: Bygg funksjonene (feature-loop)
**Hva Kit CC gjør:** Tar modulregisteret og bygger en funksjon om gangen i en strukturert loop: Bygg → Test → Poler → Godkjenn → Neste. Brukeren styrer med "Go", "Mer arbeid" eller "Blokkert". Scope creep fanges opp og parkeres.
**Eksperter som kan kalles:** UX-ekspert, Ytelse-ekspert, Design-til-kode-ekspert, Refaktoring-ekspert, Brukertest-ekspert.
**Leveranser:** Alle funksjoner implementert og testet.

### Fase 6: Kvalitetssikring
**Hva Kit CC gjør:** Kjører 12 kvalitetssjekker — E2E-tester, OWASP Top 10, GDPR-compliance, WCAG tilgjengelighet, cross-browser-testing, lasttesting, Lighthouse-ytelse, hemmelighetssjekk, regresjonstesting.
**Eksperter som kan kalles:** OWASP-ekspert, GDPR-ekspert, Tilgjengelighets-ekspert, Cross-browser-ekspert, Lasttest-ekspert.
**Leveranser:** Testrapporter, utbedringsplaner, QA sign-off.

### Fase 7: Publiser og vedlikehold
**Hva Kit CC gjør:** Deployer til produksjon, setter opp overvåking og varsling, backup, hendelseshåndteringsplan, rollback-prosedyre, operasjonsguide.
**Eksperter som kan kalles:** CICD-ekspert, Monitoring-ekspert, Incident-Response-ekspert, Backup-ekspert, SRE-ekspert.
**Leveranser:** Deployment-plan, monitoring-setup, disaster-recovery-plan, operations-guide.

---

## DEL 3: Skjulte funksjoner

Ting Kit CC gjør som du kanskje ikke vet om:

### Automatisk tilpasning
- **MÅ/BØR/KAN-systemet** — Hver funksjon klassifiseres som obligatorisk, anbefalt eller valgfri basert på prosjektets intensitetsnivå. Et hobbyprosjekt slipper GDPR-analyse, et enterprise-system krever det.
- **Kontinuerlig reklassifisering** — Ved hver faseovergang sjekker Kit CC om prosjektet har vokst og anbefaler oppgradering.
- **Automatisk sikkerhetsoppgradering** — Nevner du betaling, helse eller persondata, oppgraderes sikkerhetskravene automatisk.

### Hukommelse og kontinuitet
- **Progress-log** — Alt logges i maskinlesbart format. Ny sesjon vet nøyaktig hva som ble gjørt.
- **Session-handoff** — Ved sesjonsslutt skrives et overleringsbrev til neste sesjon.
- **Crash-recovery** — Krasjer sesjonen? Neste sesjon oppdager det, viser hva som ble avbrutt, og tilbyr: prøv igjen / hopp over / rull tilbake / avslutt trygt.
- **Checkpoints** — Hvert faseslutt lagrer et checkpoint du kan rulle tilbake til.

### Kvalitetskontroll
- **Fase-gates** — Automatiske kontrollpunkter mellom fasene. MÅ-krav blokkerer overgang om de ikke er oppfylt.
- **Regresjonsovervåking** — Sjekker at endringer i fase 5 ikke bryter sikkerhetskrav fra fase 3.
- **Søk-før-mangel** — Agenten MÅ søke i prosjektet før den konkluderer at noe mangler (hindrer AI-hallusinasjoner).
- **Oppgavekompleksitet** — Scorer oppgaver 0-10 og varsler hvis en oppgave er mye vanskeligere enn resten av prosjektet.

### Brukeropplevelse
- **Tre brukernivåer** — Tilpasser kommunikasjon: Utvikler (teknisk), Erfaren vibecoder (balansert), Ny vibecoder (enkelt med analogier).
- **Beslutningsklassifisering** — Alle valg klassifiseres som tekniske, funksjonelle eller operasjonelle — og håndteres ulikt basert på byggemodus.
- **Brukerens plan bevares** — Din opprinnelige beskrivelse lagres ordrett i `docs/BRUKERENS-PLAN.md` og brukes som primærkilde gjennom hele prosjektet.
- **Dump ideer** — Si nye ideer når som helst. De fanges opp og parkeres for riktig modul.

### Konteksthåndtering
- **3-lags arkitektur** — AI starter med maks 4 filer (Lag 1). Alt annet hentes on-demand (Lag 2) eller bare ved faseoverganger (Lag 3). Holder AI-en rask og fokusert.
- **Kontekstbudsjett** — Pauser automatisk etter 8 filer eller 25 meldinger. Alt lagres. Start ny chat og si "Fortsett".
- **Mission briefings** — Ved faseovergang genereres en komprimert kontekstpakke (30% av original) med alt neste fase trenger.

---

## DEL 4: Hovedprinsipper

### En agent i koden — aldri flere
Kun en agent har skrivetilgang om gangen. Ingen parallelle skrivinger. Dette forhindrer konflikter og holder koden konsistent.

### Kit CC dokumenterer selv
Agentene genererer krav, arkitektur, tester og operasjonsguider. Men **be den jevnlig om å dokumentere** — spesielt mellom sesjoner. Si: "Dokumenter det vi har gjørt."

### Alt skal føles automatisk
Klassifisering, sikkerhetskrav, faseoverganger, kvalitetssjekker, kontekstbudsjett — alt skjer automatisk i bakgrunnen. Du fokuserer på hva du vil bygge, Kit CC håndterer prosessen.

### Append-only logging
PROGRESS-LOG.md er den ultimate sannheten. Den skrives bare til, aldri overskrevet. Ved konflikt mellom filer: PROGRESS-LOG vinner.

### Atomisk skriving
PROJECT-STATE.json skrives alltid via backup → temp → rename. Selv om strømmen går midt i lagring, er data trygt.

### Federated governance
Klassifiseringssystemet eier reglene. Faseagentene eier sine oppgaver. PHASE-GATES validerer. Ved konflikt: SSOT (KLASSIFISERING-METADATA-SYSTEM.md) vinner.

---

## DEL 5: Agentene — hvem er hvem

### Orchestratoren (den du "prater med")

Du snakker egentlig med **faseagenten** for den aktive fasen. Men bak kulissene koordinerer **ORCHESTRATOR** alt — den bestemmer hvilken agent som jobber, håndterer faseoverganger, og gjenoppretter etter krasj. Du ser den aldri direkte, men den holder alt sammen.

### Nivå 0: Systemagenter (6 stk) — Usynlig infrastruktur

Disse jobber i bakgrunnen. Du trenger aldri å tenke på dem.

| Agent | Rolle |
|-------|-------|
| **ORCHESTRATOR** | Dirigenten. Koordinerer alt, håndterer faseoverganger, crash-recovery |
| **AUTO-CLASSIFIER** | Klassifiserer prosjektet ditt ved oppstart (3-5 spørsmål) |
| **BROWNFIELD-SCANNER** | Analyserer eksisterende kode med 25-agents sverm |
| **CONTEXT-LOADER** | Pakker riktig kontekst til riktig agent |
| **PHASE-GATES** | Kvalitetskontroll mellom fasene |
| **AGENT-PROTOCOL** | Felles kommunikasjonsspråk for alle agenter |

### Nivå 2: Faseagenter (7 stk) — De du samhandler med

En aktiv om gangen. Dette er agenten som snakker med deg og styrer arbeidet i gjeldende fase.

| Fase | Agent | Hovedoppgave |
|------|-------|-------------|
| 1 | **OPPSTART** | Visjon, personas, risikovurdering |
| 2 | **KRAV** | Brukerhistorier, modulregister, wireframes |
| 3 | **ARKITEKTUR** | Tech stack, datamodell, trusselmodell |
| 4 | **MVP** | Prosjektoppsett, første fungerende versjon |
| 5 | **ITERASJON** | Feature-loop — bygg en funksjon om gangen |
| 6 | **KVALITETSSIKRING** | 12 kvalitetssjekker for testing og sikkerhet |
| 7 | **PUBLISERING** | Deploy, overvåking, vedlikehold |

### Nivå 1: Basisagenter (7 stk) — Verktøyene

Disse kalles av faseagentene når de trenger hjelp. Du kan også kalle dem direkte ("Bytt til DEBUGGER-agent").

| Agent | Verktøy for |
|-------|-----------|
| **BYGGER** | Skriver kode (UI → Funksjonalitet → Sikkerhet) |
| **DEBUGGER** | Feilsøking (Reproduser → Isoler → Analyser → Fiks → Forhindre) |
| **REVIEWER** | Kode-review (sikkerhet + kvalitet + ytelse + arkitektur) |
| **TESTSKRIVER** | Skriver og kjører tester |
| **DOKUMENTERER** | Genererer docs, API-spec, diagrammer |
| **PLANLEGGER** | Bryter ned vage ideer til konkrete oppgaver |
| **SIKKERHETS-AGENT** | Trusselmodellering, hemmelighetssjekk, compliance |

**VEILEDER** (8. basisagent) — Read-only rådgiver i "Spørre"-modus.

### Nivå 3: Ekspertagenter (33 stk) — Spesialister ved behov

Disse kalles bare inn når det trengs. Du trenger aldri å tenke på dem — faseagentene vet når de skal brukes.

**Sikkerhet og compliance:**
OWASP, GDPR, Trusselmodellering, Hemmelighetssjekk, AI-Governance, Supply-Chain

**Arkitektur og infrastruktur:**
API-Design, Datamodell, Infrastruktur, CI/CD, Monitoring, SRE, Backup

**Testing og kvalitet:**
Test-Generator, Self-Healing-Test, Lasttest, Ytelse, Cross-Browser, Code-Quality-Gate, Refaktoring

**Design og UX:**
Wireframe, Design-til-Kode, UI/UX, Gorgeous-UI

**Business og analyse:**
Persona, Lean Canvas, Konkurranseanalyse, Brukertest

**Spesialtilfeller:**
Tilgjengelighet (WCAG), Incident-Response, Migrasjon, Prompt-Ingeniør

---

## DEL 6: Brukervennlige kommandoer

| Kommando | Hva den gjør |
|----------|-------------|
| **Vis status** | Full oversikt: fase, fremdrift, neste steg, monitor-URL |
| **Neste steg** | Hva bør jeg gjøre nå? |
| **Bytt byggemodus** | Endre mellom ai-bestemmer / samarbeid / detaljstyrt |
| **Bytt til [nivå]** | Endre kommunikasjonsstil (utvikler/erfaren/ny vibecoder) |
| **Re-klassifiser** | Kjør klassifisering på nytt |
| **Vis alle checkpoints** | Se tilgjengelige lagringspunkter |
| **Gå tilbake til [dato]** | Rull tilbake prosjektet |
| **Oversty gate [Fase-N]: [årsak]** | Hopp over kvalitetssjekk med begrunnelse |
| **Bytt til [agent-navn]** | Snakk direkte med en spesifikk agent |

---

## DEL 7: Hva Kit CC IKKE gjør

- Pusher kode uten din tillatelse
- Endrer filer i Kit CC-mappen
- Hopper over faser uten å spørre
- Kjører parallelle skrive-agenter
- Fortsetter etter krasj uten å informere deg
- Glemmer hva som er gjørt (alt logges)

---

*Kit CC v3.5.0 — Bygd av Øyvind Daniel Paulsen - oyvind.daniel@gmail.com - 917 45 075*
