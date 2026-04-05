# Nivå 2: Prosess-agenter

> Prosjektets ryggrad. Disse 7 agentene følger prosjektet fra idé til produksjon — én agent per fase. De styrer arbeidsflyten, delegerer til basis- og ekspert-agenter, og sikrer at hver fase fullføres med riktig kvalitet.

**Antall agenter:** 7
**Når de brukes:** Hele prosjektets levetid — én aktiv om gangen
**Synlighet for bruker:** Høy — dette er agenten brukeren samhandler med

---

## 1-OPPSTART-agent (Fase 1: Idé og visjon)

### Markedsføring
**Tittel:** Fra vag idé til klar visjon
**Beskrivelse:** Oppstart-agenten tar den uklare ideen din og gjør den til noe konkret. Gjennom strukturerte spørsmål om hvem du bygger for, hva problemet er, og hvorfor det er verdt å løse — får du en solid visjon, risikovurdering og Go/No-Go-beslutning før en eneste linje kode skrives.

### Hva gjør denne agenten?
Koordinerer alle aktiviteter i Fase 1 for å validere prosjektidéen, etablere visjon, kartlegge risiko og klassifisere data. Produserer 9 leveranser som danner grunnlaget for resten av prosjektet.

### Hvorfor er det viktig?
De fleste prosjekter feiler ikke på grunn av dårlig kode, men fordi de løser feil problem. Oppstart-agenten tvinger frem klarhet om hva du bygger, for hvem, og hvorfor — før du investerer tid og penger.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** ORCHESTRATOR (etter klassifisering)
- **Kaller:**
  - Basis: PLANLEGGER-agent (struktur), DOKUMENTERER-agent (dokumentgenerering)
  - Ekspert: PERSONA-ekspert, LEAN-CANVAS-ekspert, KONKURRANSEANALYSE-ekspert, SIKKERHETS-agent
  - System: PHASE-GATES (ved fase-avslutning)

### Hvordan jobber den?
1. Leser mission briefing med klassifiseringsresultat
2. Utfører 22 strukturerte oppgaver (tilpasset intensitetsnivå via MÅ/BØR/KAN)
3. Delegerer til ekspert-agenter for spesialistarbeid (personas, lean canvas, konkurranseanalyse)
4. Gjennomfører to-nivå validering: lokal + formell PHASE-GATES
5. Genererer MISSION-BRIEFING-FASE-2.md for overlevering

### Hvilke funksjoner har den?
- **Problemdefinisjon og visjon:** Formulerer klart hva prosjektet løser og for hvem
- **Persona-kartlegging:** 3-5 personas med attributter via PERSONA-ekspert
- **Brukerreiser:** Tegner user journeys per persona
- **Lean Canvas:** 9-felts forretningsmodell via LEAN-CANVAS-ekspert
- **Konkurranseanalyse:** Markedslandskap og differensieringsstrategi
- **Risikokartlegging:** DREAD-scoring av risikoscenarioer (≥10 risikoer)
- **Dataklassifisering:** SENSITIV/NORMAL/OFFENTLIG per datatype
- **Compliance-krav:** Kartlegging av juridiske krav (GDPR, bransjespesifikke)
- **Go/No-Go-vurdering:** Strukturert beslutning med begrunnelse

### Leveranser
vision.md, personas.md, user-journeys.md, lean-canvas.md, competitive-analysis.md, risk-register.md, data-classification.md, compliance-requirements.md, go-no-go-assessment.md

---

## 2-KRAV-agent (Fase 2: Planlegg)

### Markedsføring
**Tittel:** Visjonen din, brutt ned i byggbare deler
**Beskrivelse:** Krav-agenten oversetter visjonen til konkrete brukerhistorier, wireframes og en moduloversikt. Den definerer hva MVP-en skal inneholde, prioriterer med MoSCoW, og sørger for at alt har målbare akseptansekriterier — slik at du vet nøyaktig hva "ferdig" betyr.

### Hva gjør denne agenten?
Oversetter prosjektvisjon og personas fra Fase 1 til konkrete, prioriterte krav med akseptansekriterier. Definerer MVP-omfang, designer wireframes, API-arkitektur og datamodell, og oppretter modulregisteret.

### Hvorfor er det viktig?
Uten klare krav bygger man i blinde. Krav-agenten sørger for at alle er enige om hva som skal bygges, i hvilken rekkefølge, og hva som er godt nok — før utviklingen starter.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** ORCHESTRATOR (etter Fase 1)
- **Kaller:**
  - Basis: PLANLEGGER-agent (struktur og prioritering), DOKUMENTERER-agent (PRD-generering), SIKKERHETS-agent (sikkerhetskrav)
  - Ekspert: WIREFRAME-ekspert (UI-mockups), API-DESIGN-ekspert (API-spesifikasjon)
  - System: PHASE-GATES (ved fase-avslutning)

### Hvordan jobber den?
1. Leser mission briefing med visjon, personas og risikoer
2. Skriver 10+ brukerhistorier med akseptansekriterier
3. Prioriterer med MoSCoW (Must/Should/Could/Won't)
4. Definerer MVP-grense
5. Oppretter MODULREGISTER.md med alle moduler og avhengigheter
6. Designer wireframes, API-spec og datamodell
7. Genererer komplett PRD (Product Requirements Document)

### Hvilke funksjoner har den?
- **Brukerhistorier:** 10+ historier i "Som [persona] vil jeg [funksjon] så at [nytte]"-format med akseptansekriterier
- **MoSCoW-prioritering:** Must/Should/Could/Won't-kategorisering
- **MVP-definisjon:** Klar avgrensning av hva som er inne og ute
- **Wireframes:** Low-fidelity UI-skisser via WIREFRAME-ekspert
- **API-arkitektur:** Endepunktsspesifikasjoner via API-DESIGN-ekspert
- **Datamodell:** Logisk og fysisk databasemodell
- **Modulregister:** Hierarkisk oversikt over alle moduler med metadata, status og avhengigheter
- **Modul-spesifikasjoner:** Per-modul filer (M-XXX-[navn].md) med brukervisjon og underfunksjoner
- **Integrasjonskartlegging:** Identifiserer integrasjonsbehov fra AUTO-CLASSIFIER
- **10-punkts klarspråksmal:** For presentasjon av hver funksjon (Hva, Hvorfor, Fordeler, Ulemper osv.)
- **Monitor-integrasjon:** Synkroniserer backlog til Kit CC Monitor

### Leveranser
PRD.md, user-stories.md, moscow-prioritization.md, mvp-definition.md, wireframes.md, user-flows.md, api-spec.md, data-model.md, security-requirements.md, MODULREGISTER.md, docs/moduler/M-*.md, integrations.md

---

## 3-ARKITEKTUR-agent (Fase 3: Arkitektur og sikkerhet)

### Markedsføring
**Tittel:** Trygg arkitektur fra dag én
**Beskrivelse:** Arkitektur-agenten designer den tekniske grunnmuren — tech stack, databaseskjema, API-sikkerhet og trusselmodell. Alt velges med dokumenterte avveininger, slik at du vet hvorfor hver beslutning ble tatt.

### Hva gjør denne agenten?
Oversetter krav fra Fase 2 til detaljert, sikker og skalerbar teknisk arkitektur. Designer trusselmodeller med STRIDE/DREAD og velger sikkerhetskontroller for hver trussel.

### Hvorfor er det viktig?
Arkitekturbeslutninger er dyre å endre senere. Denne agenten sørger for at de viktigste valgene — tech stack, database, API-design, sikkerhet — gjøres grundig én gang, med dokumenterte begrunnelser.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** ORCHESTRATOR (etter Fase 2)
- **Kaller:**
  - Basis: PLANLEGGER-agent (struktur), SIKKERHETS-agent (trusseldesign), DOKUMENTERER-agent (diagrammer)
  - Ekspert: TRUSSELMODELLERINGS-ekspert (STRIDE/DREAD), DATAMODELL-ekspert (DB-design), API-DESIGN-ekspert (API-sikkerhet)
  - System: PHASE-GATES (ved fase-avslutning)

### Hvordan jobber den?
1. Leser mission briefing med krav, brukerhistorier og MVP-definisjon
2. Velger tech stack med dokumenterte avveininger (sikkerhet vs. ytelse vs. kompleksitet)
3. Designer logisk og fysisk datamodell
4. Designer API-arkitektur med sikkerhetslag
5. Utfører STRIDE-trusselmodellering med DREAD-scoring
6. Designer sikkerhetskontroller per trussel
7. Lager C4-arkitekturdiagrammer
8. Mapper integrasjoner til konkrete leverandører

### Hvilke funksjoner har den?
- **Tech stack-valg:** Dokumenterte avveininger for hvert teknologivalg
- **Datamodell:** Logisk normalisering + fysisk SQL-skjema
- **API-arkitektur:** Design med sikkerhetslag og endepunktspesifikasjoner
- **STRIDE-trusselmodellering:** Systematisk trusselidentifikasjon (Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege)
- **DREAD-risikovurdering:** Scoring av hver trussel (Damage, Reproducibility, Exploitability, Affected Users, Discoverability)
- **Sikkerhetskontroller:** Mitigeringsstrategier for hver identifisert trussel
- **C4-diagrammer:** Arkitekturvisualisering på flere nivåer
- **Sone-klassifisering:** GREEN/YELLOW/RED for human-in-the-loop beslutninger
- **Leverandør-mapping:** Kobler integrasjonsbehov til konkrete leverandører (Supabase, Vercel, GitHub osv.)

### Leveranser
tech-stack-decision.md, database-schema.sql, data-model-logical.md, api-architecture.md, threat-model-stride.md, threat-risk-rating.md, security-controls.md, architecture-diagram.md, c4-model.md

---

## 4-MVP-agent (Fase 4: MVP — Sett opp prosjektet)

### Markedsføring
**Tittel:** Fra tegning til fungerende prototype
**Beskrivelse:** MVP-agenten setter opp hele utviklingsmiljøet — Git, CI/CD, hemmeligheter, testing — og leverer den første fungerende versjonen. Den er Kit CC sin mest detaljerte agent, med granulær kvalitetsvurdering for hver oppgave.

### Hva gjør denne agenten?
Etablerer et profesjonelt utviklingsmiljø og leverer første fungerende MVP-prototype. Setter opp Git, CI/CD, hemmelighetsbehandling og integrasjoner. Kit CC sin mest komplekse agent med granulær oppgavekvalitetsvurdering.

### Hvorfor er det viktig?
Et godt oppsett sparer hundrevis av timer senere. MVP-agenten sikrer at prosjektet starter med riktig mappestruktur, automatiserte tester, CI/CD, og sikre hemmeligheter — ikke noe du må bolte på etterpå.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** ORCHESTRATOR (etter Fase 3)
- **Kaller:**
  - Basis: BYGGER-agent (implementer MVP), SIKKERHETS-agent (hemmeligheter), REVIEWER-agent (kode-review)
  - Ekspert: HEMMELIGHETSSJEKK-ekspert, CICD-ekspert, SUPPLY-CHAIN-ekspert, TEST-GENERATOR-ekspert, INFRASTRUKTUR-ekspert, DESIGN-TIL-KODE-ekspert, CODE-QUALITY-GATE-ekspert
  - System: PHASE-GATES (ved fase-avslutning)

### Hvordan jobber den?
1. Leser mission briefing med tech stack, arkitektur og sikkerhetskontroller
2. Setter opp Git med korrekt struktur og .gitignore
3. Konfigurerer hemmelighetsbehandling (.env.example)
4. Setter opp CI/CD-pipeline (lint, test, bygg, deploy)
5. Implementerer første MVP-prototype
6. Utfører granulær BØR/KAN-valg med 10-punkts klarspråksmal
7. Kjører integrasjons-gate med 11 integrasjonskategorier
8. Bytter Monitor til proxy-modus etter MVP-01

### Hvilke funksjoner har den?
- **Git-oppsett:** Repository-struktur, .gitignore, branching-strategi
- **Hemmelighetsbehandling:** .env.example-mal, ingen hardkodede hemmeligheter
- **CI/CD-pipeline:** Automatisert lint → test → bygg → deploy
- **Sikkerhetsskanning:** SAST og avhengighetssjekker integrert
- **MVP-prototype:** Første fungerende versjon med MVP-funksjoner
- **Testinfrastruktur:** Unit + integrasjonstester fra start
- **Oppgavekvalitetsvurdering:** Sone-klassifisering (GREEN/YELLOW/RED) + kompleksitetsscoring (0-10) for hver oppgave
- **Granulær BØR/KAN-valg:** Presenterer valgfrie oppgaver individuelt med 10-punkts mal (Hva, Hvorfor, Fordeler, Ulemper, Innhold, Hvem utfører, Kostnad, Tid, Anbefaling, Beslutning)
- **Integrasjons-gate:** 11 kategorier (Bilder, GitHub, Supabase, Vercel, Maps, Context7, Figma, Stripe, E-post, Egendefinert, Monitor)
- **Dev-server pordhåndtering:** Allokerer unike porter, detekterer rammeverk, starter server
- **Monitor proxy-modus:** Bytter fra standalone til proxy etter MVP-01

### Leveranser
Git-repository med all konfigurasjon, .env.example, CI/CD-pipeline, første MVP-implementasjon, testsuite, integrasjonsoppsett, devServer-konfigurasjon

---

## 5-ITERASJONS-agent (Fase 5: Bygg funksjonene)

### Markedsføring
**Tittel:** Feature-fabrikken som bygger alt
**Beskrivelse:** Iterasjons-agenten er arbeidshesten i Kit CC. Den tar modulregisteret og bygger funksjon etter funksjon i en strukturert loop — implementer, test, poler, få godkjenning — gjenta til alt er ferdig. Scope creep fanges opp og parkeres automatisk.

### Hva gjør denne agenten?
Implementerer alle MVP-funksjoner i en feature-loop med tre nivåer av nesting. Dette er hovedfasen for bygging, der funksjoner utvikles iterativt med modul-for-modul-fullføring og brukergodkjenning.

### Hvorfor er det viktig?
Komplekse prosjekter har mange funksjoner som avhenger av hverandre. Iterasjons-agenten holder orden på alt — hvilke moduler som er ferdige, hvilke som er under arbeid, og hvilke som er blokkert — slik at ingenting glemmes.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** ORCHESTRATOR (etter Fase 4)
- **Kaller:**
  - Basis: PLANLEGGER-agent (sprint-planlegging), BYGGER-agent (implementasjon), REVIEWER-agent (kode-review), SIKKERHETS-agent, DEBUGGER-agent, DOKUMENTERER-agent
  - Ekspert: BRUKERTEST-ekspert, YTELSE-ekspert, UIUX-ekspert, REFAKTORING-ekspert, TEST-GENERATOR-ekspert, SELF-HEALING-TEST-ekspert, DESIGN-TIL-KODE-ekspert, MIGRASJON-ekspert, CODE-QUALITY-GATE-ekspert
  - System: PHASE-GATES (ved fase-avslutning)

### Hvordan jobber den?
Tre-nivå nesting:
1. **Ytre loop (modul-nivå):** Velg neste modul → bygg → test → valider → bruker godkjenner ("Go"/"Mer arbeid"/"Blokkert")
2. **Midtre syklus (per modul):** Implementer → Test → Fiks bugs → Polér → Brukergodkjenning
3. **Indre loop (per underfunksjon):** Implementer → Skriv tester → Kode-review → Commit (ÉN underfunksjon per iterasjon)

### Hvilke funksjoner har den?
- **Feature-loop:** Strukturert iterasjon gjennom alle moduler i MODULREGISTER
- **Tre-nivå nesting:** Ytre (modul), midtre (syklus), indre (underfunksjon) — grundig og kontrollert
- **Loop-statusvisning:** Visuell fremdrift med symboler (ferdig/bygger/venter/blokkert/nåværende)
- **Velkomstbriefing:** Obligatorisk introduksjon som forklarer feature-loop-modellen
- **Modul-godkjenning:** Ingen modul markeres "Done" uten eksplisitt brukergodkjenning
- **"Parkér idé"-mekanisme:** Fanger opp scope creep og parkerer ideer for andre moduler
- **Byggemodus-håndtering:** ai-bestemmer / samarbeid / detaljstyrt per modulvalg
- **Brukervalidering:** Via BRUKERTEST-ekspert for hver modul
- **Ytelsesoptimalisering:** YTELSE-ekspert kalles når Lighthouse faller
- **UI/UX-polering:** DESIGN-TIL-KODE-ekspert for piksel-perfekt implementasjon
- **Refactoring og teknisk gjeld:** Kontinuerlig via REFAKTORING-ekspert
- **Kontekstbudsjett-reset:** Lagrer og resetter automatisk etter hver modul

### Leveranser
Alle MVP-moduler implementert og testet, sprint-planer, brukervaliideringsrapporter, kode-review-logg, ytelsesrapport, feature-completion, oppdatert MODULREGISTER (alle moduler Done/Blocked), testsuite (>70% dekning)

---

## 6-KVALITETSSIKRINGS-agent (Fase 6: Test, sikkerhet og kvalitetssjekk)

### Markedsføring
**Tittel:** Grundig testing før lansering
**Beskrivelse:** Kvalitetssikrings-agenten kjører 12 forskjellige kvalitetssjekker — fra OWASP-sikkerhetstesting til tilgjengelighet og lasttesting. Ingenting slipper ut i produksjon uten å ha bestått alle kritiske tester.

### Hva gjør denne agenten?
Utfører omfattende E2E-testing, sikkerhetstesting, compliance-validering og ytelsesrevisjoner før produksjonslansering. Dette er QA-fasen.

### Hvorfor er det viktig?
Bugs i produksjon er 10-100x dyrere å fikse enn i testing. Denne agenten finner problemer systematisk — fra sikkerhetshull til tilgjengelighetsbrudd — før brukerne gjør det.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** ORCHESTRATOR (etter Fase 5)
- **Kaller:**
  - Basis: DOKUMENTERER-agent (rapporter), SIKKERHETS-agent (sikkerhetsreview), DEBUGGER-agent (feilsøking)
  - Ekspert: OWASP-ekspert, HEMMELIGHETSSJEKK-ekspert, GDPR-ekspert, TILGJENGELIGHETS-ekspert, CROSS-BROWSER-ekspert, LASTTEST-ekspert, YTELSE-ekspert, AI-GOVERNANCE-ekspert, TEST-GENERATOR-ekspert, SELF-HEALING-TEST-ekspert
  - System: PHASE-GATES (ved fase-avslutning)

### Hvordan jobber den?
1. Kjører 12-oppgavematrisen med detaljerte valideringskriterier
2. Klassifiserer alle funn som Critical/High/Medium/Low
3. Alle CRITICAL og HIGH krever utbedringsplan før Fase 7
4. To-nivå validering: lokal + formell PHASE-GATES

### Hvilke funksjoner har den?
- **E2E-testing:** Alle kritiske brukerflyter testet (100% bestått påkrevd)
- **OWASP Top 10:2025:** Komplett sikkerhetstesting av alle 10 kategorier
- **Hemmelighetssjekk:** Gitleaks-skanning — ingen eksponerte credentials
- **GDPR-compliance:** Personvern, samtykke, datalagring, rettigheter, DPA
- **WCAG 2.2 AA tilgjengelighet:** Semantisk HTML, ARIA, tastaturnavigasjon, kontrast
- **Cross-browser-testing:** Chrome, Firefox, Safari, Edge, mobil (iPhone, Android)
- **Last-/stresstesting:** Baseline, stress til bristepunkt, responstider
- **Lighthouse-ytelse:** Performance >80, Best Practices >90, Accessibility >90, SEO >90
- **Regresjonstesting:** Full testsuite etter hver bugfix
- **AI-governance-audit:** Bias, forklarbarhet, fallback (hvis AI brukes)
- **Self-healing testvedlikehold:** Identifiserer og fikser ustabile tester
- **Funnsklassifisering:** Critical/High/Medium/Low med krav om utbedringsplan for Critical og High

### Leveranser
e2e-test-results.md, owasp-findings.md, owasp-remediation-plan.md, secrets-scan-report.md, gdpr-compliance-audit.md, wcag-accessibility-report.md, cross-browser-report.md, load-test-report.md, performance-final-report.md, bug-triage.md, qa-sign-off.md

---

## 7-PUBLISERINGS-agent (Fase 7: Publiser og vedlikehold)

### Markedsføring
**Tittel:** Trygg lansering med alt på plass
**Beskrivelse:** Publiserings-agenten tar prosjektet til produksjon — med automatisert deploy, overvåking, backup, hendelseshåndtering og rollback-plan. Du lanserer ikke bare — du lanserer med et sikkerhetsnett.

### Hva gjør denne agenten?
Deployer applikasjonen til produksjon, etablerer overvåking og varsling, og forbereder hendelseshåndteringsprosedyrer. Den siste fasen.

### Hvorfor er det viktig?
En god lansering handler ikke bare om å trykke "deploy". Det handler om å ha overvåking som fanger problemer umiddelbart, backup som beskytter data, og en rollback-plan som lar deg gå tilbake hvis noe går galt.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** ORCHESTRATOR (etter Fase 6)
- **Kaller:**
  - Basis: SIKKERHETS-agent, DOKUMENTERER-agent, DEBUGGER-agent
  - Ekspert: CICD-ekspert, INFRASTRUKTUR-ekspert, MONITORING-ekspert, INCIDENT-RESPONSE-ekspert, BACKUP-ekspert, REFAKTORING-ekspert, MIGRASJON-ekspert, SRE-ekspert
  - System: PHASE-GATES (ved fase-avslutning)

### Hvordan jobber den?
1. Setter opp CI/CD deploy-pipeline
2. Konfigurerer produksjonsinfrastruktur (sikker, skalerbar)
3. Implementerer hemmelighetsbehandling i produksjon
4. Setter opp overvåking og varsling (Sentry, dashboards)
5. Etablerer backup og disaster recovery (3-2-1 strategi)
6. Skriver hendelseshåndteringsplan og runbooks
7. Definerer SLI/SLO
8. Kjører post-deployment validering
9. Tester rollback-prosedyre
10. Dokumenterer alt i operasjonsguide

### Hvilke funksjoner har den?
- **CI/CD deploy-pipeline:** Automatisert bygg → test → deploy
- **Produksjonsinfrastruktur:** Sikker, skalerbar (Vercel/Supabase anbefalt)
- **Hemmelighetsbehandling:** Miljøvariabler, ingen hardkodede hemmeligheter
- **Overvåking og varsling:** Sanntids-dashboards, feilsporing (Sentry), varsler på kritiske metrikker
- **Backup og disaster recovery:** 3-2-1 strategi, RTO/RPO dokumentert, testede recovery-prosedyrer
- **Hendelseshåndteringsplan:** Dokumenterte prosedyrer for incident handling
- **SLI/SLO-definisjon:** Tjenestenivåmål for tilgjengelighet, ytelse, feilrate
- **Post-deployment validering:** Tester etter deploy for å verifisere produksjonstilstand
- **Operasjonsguide og runbooks:** Dokumentasjon for daglig drift
- **Rollback-prosedyre:** Testet og dokumentert tilbakerulling
- **Prosjekt-komplett briefing:** Genererer MISSION-BRIEFING-PROSJEKT-KOMPLETT.md for vedlikehold

### Leveranser
deployment-plan.md, infrastructure-setup.md, secrets-management.md, monitoring-alerting-setup.md, post-deployment-validation.md, backup-disaster-recovery-plan.md, incident-response-plan.md, sli-slo-definition.md, operations-guide.md, runbooks.md, rollback-procedure.md
