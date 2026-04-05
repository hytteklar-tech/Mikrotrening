# Kit CC - Komplett Funksjonsoversikt

> **Alle funksjoner i alle 50 agenter - din komplette referanse**

**Versjon:** 2.1
**Sist oppdatert:** 9. februar 2026

---

## 📖 Innholdsfortegnelse

1. [Nivå 0: System-agenter (5)](#nivå-0-system-agenter)
2. [Nivå 1: Basis-agenter (7)](#nivå-1-basis-agenter)
3. [Nivå 2: Prosess-agenter (7)](#nivå-2-prosess-agenter)
4. [Nivå 3: Ekspert-agenter (31)](#nivå-3-ekspert-agenter)
5. [Funksjonskategorier](#funksjonskategorier)
6. [Funksjoner per prosjekttype](#funksjoner-per-prosjekttype)

---

## 🔧 Nivå 0: System-agenter

*Disse jobber automatisk i bakgrunnen - du trenger ikke tenke på dem.*

### **ORCHESTRATOR**

**Rolle:** Sentral koordinator for hele agentsystemet

**Kjerneansvar:**
1. **Session-håndtering** - Boot og shutdown av sessions
2. **Agent-valg** - Velger riktig agent basert på kontekst
3. **Handoff-koordinering** - Sømløs overgang mellom agenter
4. **State-synkronisering** - Holder PROJECT-STATE.json oppdatert
5. **Gate-validering** - Delegerer til PHASE-GATES

**Hovedfunksjoner:**

#### FUNC-001: BOOT-SEKVENS
- **Hva:** Starter systemet ved ny session
- **Når:** Automatisk ved oppstart
- **Output:** Riktig agent aktivert basert på tilstand
- **Intensitet:** Alle nivåer
- **Kategori:** Infrastruktur

#### FUNC-002: AGENT-ROUTING
- **Hva:** Velger riktig agent for hver oppgave
- **Når:** Ved ny oppgave
- **Output:** Aktivert agent + kontekst
- **Intensitet:** Alle nivåer
- **Kategori:** Infrastruktur

#### FUNC-003: HANDOFF-COORDINATION
- **Hva:** Koordinerer overlevering mellom agenter
- **Når:** Ved agent-bytte
- **Output:** Komplett kontekstoverføring
- **Intensitet:** Alle nivåer
- **Kategori:** Infrastruktur

#### FUNC-004: STATE-SYNC
- **Hva:** Synkroniserer PROJECT-STATE.json
- **Når:** Ved milestones
- **Output:** Oppdatert tilstandsfil
- **Intensitet:** Alle nivåer
- **Kategori:** Infrastruktur

#### FUNC-005: ERROR-ESCALATION
- **Hva:** Håndterer feil og eskalerer til circuit-breaker
- **Når:** Ved feil
- **Output:** Brukervalg (RETRY/ALTERNATE/SKIP/ABORT)
- **Intensitet:** Alle nivåer
- **Kategori:** Infrastruktur

---

### **AUTO-CLASSIFIER**

**Rolle:** Klassifiserer prosjekter til riktig prosjekttype

**Kjerneansvar:**
1. Klassifisere nye prosjekter (progressiv avsløring)
2. Re-klassifisere ved endringer
3. Detektere sensitive datatyper
4. Foreslå oppgradering ved behov

**Hovedfunksjoner:**

#### FUNC-010: INITIAL-CLASSIFICATION
- **Hva:** Klassifiserer nytt prosjekt med progressiv avsløring (3 åpningsspørsmål + betingede oppfølgingsspørsmål)
- **Når:** Ved nytt prosjekt (første gang)
- **Output:** Prosjekttype + confidence-score
- **Intensitet:** Alle nivåer
- **Kategori:** Infrastruktur
- **Åpningsspørsmål (alltid stilt):**
  1. Prosjektstørrelse (1-4 poeng)
  2. Brukertype (1-4 poeng)
  3. Datatyper (1-4 poeng)
- **Betingede oppfølgingsspørsmål (avhengig av svar):**
  4. Brukerskala (1-4 poeng)
  5. Nedetid-konsekvens (1-4 poeng)
  6. Regulering (1-4 poeng)
  7. Integrasjoner (1-4 poeng)

#### FUNC-011: CONTINUOUS-RECLASSIFICATION
- **Hva:** Re-evaluerer klassifisering ved fase-overganger
- **Når:** Ved overgang til ny fase
- **Output:** Bekreftelse eller oppgraderingsforslag
- **Intensitet:** FOR, STD, GRU, ENT
- **Kategori:** Prosess

#### FUNC-012: SENSITIVE-DATA-DETECTION
- **Hva:** Detekterer sensitive datatyper (e-post, passord, personinfo)
- **Når:** Ved kravspesifikasjon eller datamodellering
- **Output:** Advarsel + oppgraderingsforslag
- **Intensitet:** Alle nivåer
- **Kategori:** Sikkerhet

#### FUNC-013: AUTOMATIC-UPGRADE
- **Hva:** Foreslår automatisk oppgradering ved sensitiv data
- **Når:** Ved deteksjon av: PII, helseinformasjon, finansdata
- **Output:** Upgrade-forslag med begrunnelse
- **Intensitet:** MIN → FOR/STD, FOR → STD/GRU
- **Kategori:** Sikkerhet

---

### **CONTEXT-LOADER**

**Rolle:** Laster prosjektkontekst ved session-start

**Hovedfunksjoner:**

#### FUNC-020: SESSION-BOOTSTRAP
- **Hva:** Laster PROJECT-STATE.json og SESSION-HANDOFF.md
- **Når:** Ved oppstart av ny session
- **Output:** Komplett kontekst lastet
- **Intensitet:** Alle nivåer
- **Kategori:** Infrastruktur

#### FUNC-021: SMART-CONTEXT-LOADING
- **Hva:** Henter kun relevante filer (maks 30% kontekst)
- **Når:** Ved oppstart + ved behov
- **Output:** Optimalisert kontekstvindu
- **Intensitet:** STD, GRU, ENT (store prosjekter)
- **Kategori:** Verktøy

#### FUNC-022: SEMANTIC-COMPRESSION
- **Hva:** Oppsummerer eldre kontekst semantisk
- **Når:** Ved lange sessions
- **Output:** Komprimert kontekst
- **Intensitet:** GRU, ENT
- **Kategori:** Verktøy

---

### **PHASE-GATES**

**Rolle:** Validerer kvalitet ved fase-overganger

**Hovedfunksjoner:**

#### FUNC-030: GATE-VALIDATION
- **Hva:** Validerer at alle MÅ-oppgaver er fullført
- **Når:** Ved forespørsel om fase-overgang
- **Output:** PASS / PARTIAL / FAIL + mangler-liste
- **Intensitet:** Alle nivåer (strengere for høyere nivå)
- **Kategori:** Prosess

#### FUNC-031: CHECKPOINT-CREATION
- **Hva:** Lager checkpoint ved godkjent gate
- **Når:** Ved PASS eller PARTIAL (med bruker-godkjenning)
- **Output:** Checkpoint i `.ai/CHECKPOINT-HISTORY/`
- **Intensitet:** FOR, STD, GRU, ENT
- **Kategori:** Infrastruktur

#### FUNC-032: ROLLBACK-SUPPORT
- **Hva:** Gjør det mulig å gå tilbake til tidligere checkpoint
- **Når:** Ved brukerforespørsel
- **Output:** Tilbakestilt PROJECT-STATE.json
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Verktøy

---

### **AGENT-PROTOCOL**

**Rolle:** Definerer kommunikasjonsstandard mellom agenter

**Hovedfunksjoner:**

#### FUNC-040: MESSAGE-FORMAT
- **Hva:** Standardisert format for meldinger mellom agenter
- **Når:** Alltid ved agent-kommunikasjon
- **Output:** Strukturerte meldinger
- **Intensitet:** Alle nivåer
- **Kategori:** Infrastruktur

#### FUNC-041: HANDOFF-PROTOCOL
- **Hva:** Standard for overlevering mellom agenter
- **Når:** Ved handoff
- **Output:** SESSION-HANDOFF.md
- **Intensitet:** Alle nivåer
- **Kategori:** Infrastruktur

---

## 🛠️ Nivå 1: Basis-agenter

*Tverrfaglige verktøy som brukes i mange faser.*

### **PLANLEGGER-agent**

**Rolle:** PRD, oppgavenedbrytning og estimering

**Hovedfunksjoner:**

#### FUNC-100: AI-WBS-GENERATOR 🆕
- **Hva:** Automatisk nedbrytning til Work Breakdown Structure
- **Når:** Ved ny feature eller vag beskrivelse
- **Input:** Én setning eller kort beskrivelse
- **Output:** Epic → Feature → Task hierarki i `plan.md`
- **Intensitet:** Alle nivåer
- **Kategori:** Verktøy
- **Ny i v2.0:** Ja

#### FUNC-101: DUAL-MODE-ESTIMERING 🆕
- **Hva:** Estimater tilpasset utviklingsmetode
- **Når:** Ved oppgavenedbrytning
- **Output:**
  - **AI-modus:** Timer (15min - 8t)
  - **Hybrid-modus:** Dager (2t - 3d)
  - **Tre-punkt:** Optimistisk / Realistisk / Pessimistisk
- **Intensitet:** FOR, STD, GRU, ENT
- **Kategori:** Verktøy
- **Ny i v2.0:** Ja

#### FUNC-102: PRD-GENERERING
- **Hva:** Lager Product Requirements Document
- **Når:** Ved ny feature
- **Output:** `docs/prd/[feature].md` med:
  - Problemdefinisjon
  - Brukerhistorier
  - Akseptansekriterier
  - MVP-definisjon (MoSCoW)
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Prosess

#### FUNC-103: ACCEPTANCE-CRITERIA
- **Hva:** Definerer målbare akseptansekriterier
- **Når:** Ved PRD-generering
- **Output:** Testbare kriterier per user story
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Prosess

#### FUNC-104: DEPENDENCY-MAPPING
- **Hva:** Identifiserer avhengigheter mellom oppgaver
- **Når:** Ved WBS-generering
- **Output:** Avhengighetsgraf + kritisk sti
- **Intensitet:** GRU, ENT
- **Kategori:** Prosess

---

### **BYGGER-agent**

**Rolle:** Kodeimplementering med innebygd kvalitet og sikkerhet

**Hovedfunksjoner:**

#### FUNC-110: SMART-CONTEXT-FETCHING 🆕
- **Hva:** Henter kun relevante filer (maks 30% kontekst)
- **Når:** Ved kodeimplementering
- **Hvordan:**
  1. Leser CLAUDE.md (veikart)
  2. Identifiserer relevante filer
  3. Henter kun disse
  4. Oppsummerer resten semantisk
- **Intensitet:** STD, GRU, ENT (store kodebaser)
- **Kategori:** Verktøy
- **Ny i v2.0:** Ja

#### FUNC-111: AUTO-TEST-GENERATION 🆕
- **Hva:** Genererer tester samtidig med kode
- **Når:** Under implementering
- **Output:**
  - Happy path tests
  - Edge case tests
  - Error handling tests
  - Integration tests
- **Intensitet:** FOR, STD, GRU, ENT
- **Kategori:** Verktøy
- **Statistikk:** 40% færre bugs i produksjon
- **Ny i v2.0:** Ja

#### FUNC-112: INCREMENTAL-PR-STRATEGY 🆕
- **Hva:** Holder PR-er under 400 linjer
- **Når:** Ved implementering av større features
- **Output:** Flere små PR-er i stedet for én stor
- **Fordel:** 3x raskere review-sykluser
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Prosess
- **Ny i v2.0:** Ja

#### FUNC-113: 3-STAGE-IMPLEMENTATION
- **Hva:** Bygger i 3 stages for å unngå sløsing
- **Når:** Ved feature-implementering
- **Stages:**
  1. **Stage 1: UI** - Frontend-skall med mock data
  2. **Stage 2: Funksjon** - Backend-logikk og integrasjon
  3. **Stage 3: Sikkerhet** - Input-validering, auth, error-handling
- **Intensitet:** Alle nivåer
- **Kategori:** Prosess

#### FUNC-114: TWO-STEP-SELF-REFLECTION
- **Hva:** AI reviewer egen kode som sikkerhetsekspert
- **Når:** Etter implementering, før commit
- **Output:** Sikkerhetssjekkliste + forbedringsforslag
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Sikkerhet

---

### **REVIEWER-agent**

**Rolle:** Code review med fokus på kvalitet

**Hovedfunksjoner:**

#### FUNC-120: CODE-QUALITY-REVIEW
- **Hva:** Review av kodekvalitet og best practices
- **Når:** Før merge
- **Sjekker:**
  - Kodestil og konsistens
  - DRY-prinsipper
  - SOLID-prinsipper
  - Navnekonvensjoner
- **Intensitet:** FOR, STD, GRU, ENT
- **Kategori:** Prosess

#### FUNC-121: TECHNICAL-DEBT-DETECTION
- **Hva:** Identifiserer teknisk gjeld
- **Når:** Ved code review
- **Output:** Liste over teknisk gjeld + prioritering
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Prosess

#### FUNC-122: PERFORMANCE-HINTS
- **Hva:** Foreslår ytelsesoptimaliseringer
- **Når:** Ved review
- **Output:** Performance-tips (N+1 queries, re-renders, etc.)
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Verktøy

---

### **SIKKERHETS-agent**

**Rolle:** Security audit og sårbarhetssjekk

**Hovedfunksjoner:**

#### FUNC-130: INPUT-VALIDATION-CHECK
- **Hva:** Verifiserer at all bruker-input valideres
- **Når:** Ved review av kode som tar input
- **Sjekker:**
  - XSS-beskyttelse
  - SQL injection-beskyttelse
  - Command injection-beskyttelse
- **Intensitet:** Alle nivåer
- **Kategori:** Sikkerhet

#### FUNC-131: AUTH-AUTHZ-REVIEW
- **Hva:** Review av autentisering og autorisasjon
- **Når:** Ved implementering av auth/authz
- **Sjekker:**
  - Broken Access Control
  - Privilege escalation
  - Session management
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Sikkerhet

#### FUNC-132: SECRET-DETECTION
- **Hva:** Finner hardkodede secrets i kode
- **Når:** Ved commit (pre-commit hook)
- **Output:** Liste over lekkede secrets + remediation
- **Intensitet:** Alle nivåer
- **Kategori:** Sikkerhet

#### FUNC-133: DEPENDENCY-VULN-SCAN
- **Hva:** Skanner dependencies for kjente sårbarheter
- **Når:** Ved `npm install` / `pip install`
- **Output:** Sårbarhetsrapport + fix-forslag
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Sikkerhet

---

### **DEBUGGER-agent**

**Rolle:** Feilsøking og bugfixing

**Hovedfunksjoner:**

#### FUNC-140: ROOT-CAUSE-ANALYSIS
- **Hva:** Systematisk feilsøking for å finne årsak
- **Når:** Ved bug
- **Metode:**
  - Reproduser problemet
  - Isoler komponenter
  - Identifiser root cause
  - Verifiser fix
- **Intensitet:** Alle nivåer
- **Kategori:** Verktøy

#### FUNC-141: STACK-TRACE-ANALYSIS
- **Hva:** Analyserer stack traces og feilmeldinger
- **Når:** Ved exception/error
- **Output:** Forklaring + løsningsforslag
- **Intensitet:** Alle nivåer
- **Kategori:** Verktøy

#### FUNC-142: DEBUGGING-INSTRUMENTATION
- **Hva:** Legger til logging/debugging-kode
- **Når:** Ved komplekse bugs
- **Output:** Debug-kode + analyse av output
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Verktøy

---

### **DOKUMENTERER-agent**

**Rolle:** Dokumentasjon og brukerguider

**Hovedfunksjoner:**

#### FUNC-150: README-GENERATION
- **Hva:** Genererer komplett README.md
- **Når:** Ved prosjektstart + ved store endringer
- **Innhold:**
  - Prosjektbeskrivelse
  - Installasjonsinstruksjoner
  - Brukseksempler
  - API-dokumentasjon
- **Intensitet:** Alle nivåer
- **Kategori:** Prosess

#### FUNC-151: API-DOCS-GENERATION
- **Hva:** Genererer API-dokumentasjon
- **Når:** Ved API-implementering
- **Output:** OpenAPI/Swagger-spec
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Prosess

#### FUNC-152: CODE-COMMENTS
- **Hva:** Legger til nyttige kode-kommentarer
- **Når:** Ved kompleks kode
- **Output:** JSDoc/TSDoc/Docstrings
- **Intensitet:** FOR, STD, GRU, ENT
- **Kategori:** Verktøy

---

### **VEILEDER-agent**

**Rolle:** Read-only veileder for spørremodus — forklaring, veiledning og kunnskapsdeling

**Hovedfunksjoner:**

#### FUNC-160: KIT-CC-VEILEDNING
- **Hva:** Forklarer Kit CC-systemet og dets prosesser
- **Når:** Bruker velger "Spørre" ved oppstart
- **Output:** Forklaringer med kilder fra Kit CC-dokumentasjon
- **Intensitet:** Alle nivåer
- **Kategori:** Verktøy

#### FUNC-161: PROSJEKT-INNSIKT
- **Hva:** Leser prosjektstatus og gir oppdatering om fremdrift
- **Når:** Bruker spør om prosjektstatus
- **Output:** Oppsummering basert på PROJECT-STATE.json og PROGRESS-LOG.md
- **Intensitet:** Alle nivåer
- **Kategori:** Verktøy

#### FUNC-162: PROAKTIVT-NETTSØK
- **Hva:** Søker automatisk på nett ved teknologispørsmål som kan være utdatert
- **Når:** Spørsmål om versjonsnumre, "nyeste", rammeverk som oppdateres hyppig
- **Output:** Oppdatert informasjon med kilde-URL
- **Intensitet:** Alle nivåer
- **Kategori:** Verktøy

#### FUNC-163: SOKRATISK-VEILEDNING
- **Hva:** Stiller oppfølgingsspørsmål ved beslutningsspørsmål i stedet for å svare direkte
- **Når:** Bruker spør "bør jeg...", "er det best å...", "hva anbefaler du..."
- **Output:** Alternativer med fordeler og ulemper
- **Intensitet:** Alle nivåer
- **Kategori:** Verktøy

---

## 🎯 Nivå 2: Prosess-agenter

*Én agent per fase - koordinerer alt arbeid i sin fase.*

### **OPPSTART-agent (Fase 1)**

**Rolle:** Problemdefinisjon, visjon og klassifisering

**Hovedfunksjoner:**

#### FUNC-200: PROBLEM-DEFINITION
- **Hva:** Definerer problemet som skal løses
- **Når:** Ved prosjektstart
- **Output:** `docs/vision.md` med:
  - Problemstilling
  - Målgruppe
  - Verdiforslag
- **Intensitet:** Alle nivåer
- **Kategori:** Prosess

#### FUNC-201: PERSONA-CREATION
- **Hva:** Lager personas og brukerreiser (kaller PERSONA-ekspert)
- **Når:** Etter problemdefinisjon
- **Output:** `docs/personas.md`
- **Intensitet:** FOR, STD, GRU, ENT
- **Kategori:** Prosess

#### FUNC-202: RISK-ASSESSMENT
- **Hva:** Identifiserer og prioriterer risikoer
- **Når:** I Fase 1
- **Output:** `docs/security/risikovurdering.md`
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Sikkerhet

#### FUNC-203: DATA-CLASSIFICATION
- **Hva:** Klassifiserer datatyper (offentlig/intern/konfidensiell/sensitiv)
- **Når:** Ved prosjektstart
- **Output:** Dataklassifiseringstabell
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Sikkerhet

#### FUNC-204: GO-NO-GO-DECISION
- **Hva:** Anbefaler Go eller No-Go basert på risiko/verdi
- **Når:** Ved slutten av Fase 1
- **Output:** Anbefaling + begrunnelse
- **Intensitet:** GRU, ENT
- **Kategori:** Prosess

---

### **KRAV-agent (Fase 2)**

**Rolle:** Brukerhistorier, kravspec og MVP-definisjon

**Hovedfunksjoner:**

#### FUNC-210: USER-STORIES
- **Hva:** Lager brukerhistorier med akseptansekriterier
- **Når:** I Fase 2
- **Output:** `docs/krav/user-stories.md`
- **Format:** "Som [rolle] vil jeg [handling] slik at [verdi]"
- **Intensitet:** Alle nivåer
- **Kategori:** Prosess

#### FUNC-211: SECURITY-REQUIREMENTS
- **Hva:** Definerer sikkerhetskrav basert på dataklassifisering
- **Når:** Etter dataklassifisering
- **Output:** `docs/krav/sikkerhetskrav.md`
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Sikkerhet

#### FUNC-212: WIREFRAMES
- **Hva:** Lager UI-skisser (kaller WIREFRAME-ekspert)
- **Når:** Ved UI-krav
- **Output:** `docs/wireframes/` (low-fidelity)
- **Intensitet:** FOR, STD, GRU, ENT
- **Kategori:** Prosess

#### FUNC-213: MVP-DEFINITION
- **Hva:** Definerer MVP med MoSCoW-prioritering
- **Når:** Ved slutten av Fase 2
- **Output:** `docs/mvp-definisjon.md`
- **MoSCoW:** Must / Should / Could / Won't
- **Intensitet:** Alle nivåer
- **Kategori:** Prosess

---

### **ARKITEKTUR-agent (Fase 3)**

**Rolle:** Tech stack, database, API og sikkerhet

**Hovedfunksjoner:**

#### FUNC-220: TECH-STACK-SELECTION
- **Hva:** Velger teknologi basert på krav
- **Når:** I Fase 3
- **Output:** `docs/teknisk/tech-stack.md`
- **Vurderinger:** Frontend, Backend, Database, Hosting, CI/CD
- **Intensitet:** Alle nivåer
- **Kategori:** Prosess

#### FUNC-221: DATABASE-DESIGN
- **Hva:** Designer database-schema (kaller DATAMODELL-ekspert)
- **Når:** Etter tech stack
- **Output:** `docs/teknisk/database-schema.sql` + ER-diagram
- **Intensitet:** Alle nivåer
- **Kategori:** Prosess

#### FUNC-222: API-DESIGN
- **Hva:** Designer API (kaller API-DESIGN-ekspert)
- **Når:** Ved API-behov
- **Output:** `docs/teknisk/api-spec.yaml` (OpenAPI)
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Prosess

#### FUNC-223: THREAT-MODELING
- **Hva:** STRIDE-trusselmodellering (kaller TRUSSELMODELLERINGS-ekspert)
- **Når:** Etter arkitektur-design
- **Output:** `docs/security/trusselmodell.md`
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Sikkerhet

#### FUNC-224: SECURITY-CONTROLS
- **Hva:** Definerer sikkerhetskontroller
- **Når:** Etter trusselmodellering
- **Output:** `docs/security/controls.md`
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Sikkerhet

---

### **MVP-agent (Fase 4)**

**Rolle:** Prosjektoppsett, Git, CI/CD og prototype

**Hovedfunksjoner:**

#### FUNC-230: GIT-SETUP
- **Hva:** Oppretter Git-repo med struktur
- **Når:** Ved prosjektstart (Fase 4)
- **Output:**
  - `.gitignore`
  - `.env.example`
  - Pre-commit hooks (secrets-scanning)
- **Intensitet:** Alle nivåer
- **Kategori:** Prosess

#### FUNC-231: CI-CD-PIPELINE
- **Hva:** Setter opp CI/CD (kaller CI/CD-ekspert)
- **Når:** Etter Git-setup
- **Output:** GitHub Actions / GitLab CI pipeline
- **Stages:** Lint → Test → Build → Deploy
- **Intensitet:** FOR, STD, GRU, ENT
- **Kategori:** Prosess

#### FUNC-232: SECRETS-MANAGEMENT
- **Hva:** Konfigurerer secrets-håndtering (kaller HEMMELIGHETSSJEKK-ekspert)
- **Når:** Ved Git-setup
- **Output:** Pre-commit hooks + `.env`-håndtering
- **Intensitet:** Alle nivåer
- **Kategori:** Sikkerhet

#### FUNC-233: MVP-IMPLEMENTATION
- **Hva:** Implementerer MVP-features (kaller BYGGER-agent)
- **Når:** Etter infrastruktur-setup
- **Output:** Fungerende MVP
- **Intensitet:** Alle nivåer
- **Kategori:** Prosess

#### FUNC-234: DEPLOYMENT-SETUP
- **Hva:** Setter opp staging/prod-miljøer (kaller INFRASTRUKTUR-ekspert)
- **Når:** Ved MVP-ferdigstillelse
- **Output:** Deploybare miljøer
- **Intensitet:** FOR, STD, GRU, ENT
- **Kategori:** Prosess

---

### **ITERASJONS-agent (Fase 5)**

**Rolle:** Feature-utvikling, polering og brukertest

**Hovedfunksjoner:**

#### FUNC-240: FEATURE-COMPLETION
- **Hva:** Fullfører gjenstående features
- **Når:** Etter MVP
- **Output:** Feature-komplett applikasjon
- **Intensitet:** Alle nivåer
- **Kategori:** Prosess

#### FUNC-241: UI-UX-POLISHING
- **Hva:** Polerer UI/UX (kaller UI/UX-ekspert)
- **Når:** Når funksjonalitet er på plass
- **Output:** Polert grensesnitt med micro-interaksjoner
- **Intensitet:** FOR, STD, GRU, ENT
- **Kategori:** Prosess

#### FUNC-242: USER-TESTING
- **Hva:** Gjennomfører brukertest (kaller BRUKERTEST-ekspert)
- **Når:** Med feature-komplett app
- **Output:** Brukertestrapport + feedback
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Prosess

#### FUNC-243: PERFORMANCE-OPTIMIZATION
- **Hva:** Optimaliserer ytelse (kaller YTELSE-ekspert)
- **Når:** Ved ytelsesutfordringer
- **Output:** Ytelsesrapport (Lighthouse) + optimaliseringer
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Verktøy

#### FUNC-244: REFACTORING
- **Hva:** Refaktorerer teknisk gjeld (kaller REFAKTORING-ekspert)
- **Når:** Ved behov
- **Output:** Renere kodebase
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Prosess

---

### **KVALITETSSIKRINGS-agent (Fase 6)**

**Rolle:** Testing, sikkerhet og compliance

**Hovedfunksjoner:**

#### FUNC-250: E2E-TESTING
- **Hva:** E2E-testing (kaller TEST-GENERATOR-ekspert)
- **Når:** Med feature-komplett app
- **Output:** E2E-test-suite (Playwright/Cypress)
- **Intensitet:** FOR, STD, GRU, ENT
- **Kategori:** Prosess

#### FUNC-251: OWASP-TESTING
- **Hva:** OWASP Top 10:2025 testing (kaller OWASP-ekspert)
- **Når:** Før produksjon
- **Output:** `docs/security/owasp-rapport.md`
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Sikkerhet

#### FUNC-252: GDPR-COMPLIANCE
- **Hva:** GDPR-sjekk (kaller GDPR-ekspert)
- **Når:** Med persondata
- **Output:** `docs/compliance/gdpr-sjekkliste.md`
- **Intensitet:** STD (hvis EU-brukere), GRU, ENT
- **Kategori:** Compliance

#### FUNC-253: ACCESSIBILITY-TESTING
- **Hva:** WCAG 2.2 AA testing (kaller TILGJENGELIGHETS-ekspert)
- **Når:** Med UI-komplett app
- **Output:** `docs/testing/tilgjengelighetsrapport.md`
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Compliance

#### FUNC-254: LOAD-TESTING
- **Hva:** Load/stress testing (kaller LASTTEST-ekspert)
- **Når:** Før produksjon
- **Output:** Lasttest-rapport (k6/Artillery)
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Prosess

#### FUNC-255: AI-GOVERNANCE-AUDIT
- **Hva:** Audit av AI-generert kode (kaller AI-GOVERNANCE-ekspert)
- **Når:** Ved enterprise/compliance-krav
- **Output:** AI-governance-rapport + attestasjon
- **Intensitet:** GRU, ENT
- **Kategori:** Compliance

---

### **PUBLISERINGS-agent (Fase 7)**

**Rolle:** Deploy, monitoring og vedlikehold

**Hovedfunksjoner:**

#### FUNC-260: PRODUCTION-DEPLOYMENT
- **Hva:** Deploy til produksjon
- **Når:** Etter QA godkjenning
- **Output:** Live produksjons-URL
- **Intensitet:** Alle nivåer
- **Kategori:** Prosess

#### FUNC-261: MONITORING-SETUP
- **Hva:** Setter opp monitoring (kaller MONITORING-ekspert)
- **Når:** Ved produksjonsdeploy
- **Output:** Sentry/Logging/Alerting konfigurert
- **Intensitet:** FOR, STD, GRU, ENT
- **Kategori:** Prosess

#### FUNC-262: INCIDENT-RESPONSE-PLAN
- **Hva:** Lager IR-plan (kaller INCIDENT-RESPONSE-ekspert)
- **Når:** Før produksjon
- **Output:** `docs/drift/ir-plan.md`
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Prosess

#### FUNC-263: BACKUP-STRATEGY
- **Hva:** Definerer backup-strategi (kaller BACKUP-ekspert)
- **Når:** Ved produksjon
- **Output:** `docs/drift/backup-plan.md` (3-2-1-regel)
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Sikkerhet

#### FUNC-264: SLI-SLO-DEFINITION
- **Hva:** Definerer SLI/SLO (kaller SRE-ekspert)
- **Når:** Ved enterprise-systemer
- **Output:** SLI/SLO-dokumentasjon + error budgets
- **Intensitet:** GRU, ENT
- **Kategori:** Prosess

---

## 🔬 Nivå 3: Ekspert-agenter (utvalg)

*Spesialister som kalles automatisk - her er nøkkelfunksjonene.*

### **OWASP-ekspert**

**Hovedfunksjoner:**

#### FUNC-300: OWASP-TOP-10-TESTING
- **Hva:** Systematisk testing mot OWASP Top 10:2025
- **Kategorier testet:**
  1. Broken Access Control
  2. Cryptographic Failures
  3. Injection
  4. Insecure Design
  5. Security Misconfiguration
  6. Vulnerable Components
  7. Authentication Failures
  8. Software/Data Integrity Failures
  9. Logging/Monitoring Failures
  10. SSRF (Server-Side Request Forgery)
- **Output:** Sårbarhetsrapport med CVSS-score
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Sikkerhet

---

### **GDPR-ekspert**

**Hovedfunksjoner:**

#### FUNC-310: DATA-INVENTORY
- **Hva:** Kartlegger alle personopplysninger
- **Output:** Tabell med datatype, formål, lagring, oppbevaring, LJRBP
- **Intensitet:** STD (hvis persondata), GRU, ENT
- **Kategori:** Compliance

#### FUNC-311: DPIA
- **Hva:** Data Protection Impact Assessment
- **Når:** Ved høy risiko for personvern
- **Output:** DPIA-rapport
- **Intensitet:** GRU, ENT
- **Kategori:** Compliance

---

### **AI-GOVERNANCE-ekspert**

**Hovedfunksjoner:**

#### FUNC-320: PROMPT-TRACEABILITY 🆕
- **Hva:** Logger alle AI-prompts med metadata
- **Output:** `.ai-metadata/` med prompt-historikk
- **Metadata:** Model, timestamp, prompt-hash, confidence, reviewer
- **Intensitet:** GRU, ENT
- **Kategori:** Compliance
- **Ny i v2.0:** Ja

#### FUNC-321: AI-CODE-TAGGING 🆕
- **Hva:** Tagger kode med opprinnelse (AI/Human/Hybrid)
- **Output:** Metadata i kode-kommentarer
- **Intensitet:** GRU, ENT
- **Kategori:** Compliance
- **Ny i v2.0:** Ja

---

### **TEST-GENERATOR-ekspert**

**Hovedfunksjoner:**

#### FUNC-330: UNIT-TEST-GENERATION 🆕
- **Hva:** Auto-generering av unit-tester fra kode
- **Metode:** AST-analyse + branch coverage
- **Output:** Test-filer med > 80% coverage
- **Intensitet:** FOR, STD, GRU, ENT
- **Kategori:** Verktøy
- **Ny i v2.0:** Ja

#### FUNC-331: E2E-TEST-FROM-USER-STORIES 🆕
- **Hva:** Genererer E2E-tester fra brukerhistorier
- **Input:** User stories med akseptansekriterier
- **Output:** Playwright/Cypress-tester
- **Intensitet:** STD, GRU, ENT
- **Kategori:** Verktøy
- **Ny i v2.0:** Ja

---

### **SELF-HEALING-TEST-ekspert**

**Hovedfunksjoner:**

#### FUNC-340: AUTO-TEST-MAINTENANCE 🆕
- **Hva:** Automatisk vedlikehold av testsuiter
- **Når:** Test feiler pga UI-endring (ikke bug)
- **Output:** Oppdaterte selektorer + grønne tester
- **Statistikk:** Reduserer flaky tests med 80%
- **Intensitet:** GRU, ENT
- **Kategori:** Verktøy
- **Ny i v2.0:** Ja

---

## 📊 Funksjonskategorier

### **Infrastruktur** (Alltid på)
- FUNC-001 til FUNC-005 (ORCHESTRATOR)
- FUNC-010 til FUNC-013 (AUTO-CLASSIFIER)
- FUNC-020 til FUNC-022 (CONTEXT-LOADER)
- FUNC-030 til FUNC-032 (PHASE-GATES)
- FUNC-040 til FUNC-041 (AGENT-PROTOCOL)

**Total:** 13 funksjoner
**Brukervalg:** ❌ Nei (automatisk)

---

### **Prosess** (Koster tid/ressurser)
- Alle PRD, WBS, MVP-definisjon funksjoner
- Testing, deployment, compliance
- DPIA, trusselmodellering

**Total:** ~25 funksjoner
**Brukervalg:** ✅ Ja (styres av prosjekttype)

---

### **Verktøy** (Avhenger av tech stack)
- Smart kontekst, test-generering
- Monitoring, CI/CD
- Performance-optimalisering

**Total:** ~15 funksjoner
**Brukervalg:** ⚡ Auto / 🔘 Velg (basert på stack)

---

### **Sikkerhet** (Kritisk)
- Input-validering, auth/authz
- OWASP-testing, secrets-scanning
- Trusselmodellering

**Total:** ~20 funksjoner
**Brukervalg:** ⚡ Auto (MÅ på høyere nivå)

---

### **Compliance** (Regulatorisk)
- GDPR, tilgjengelighet
- AI-governance
- DPIA

**Total:** ~10 funksjoner
**Brukervalg:** ⚡ Auto (ved persondata/AI)

---

## 🎚️ Funksjoner per prosjekttype

### **Enkelt hobbyprosjekt (Score 7-10)**

| Funksjon | Status |
|----------|--------|
| FUNC-001 til FUNC-005 (ORCHESTRATOR) | 🔴 MÅ |
| FUNC-010 (INITIAL-CLASSIFICATION) | 🔴 MÅ |
| FUNC-100 (AI-WBS-GENERATOR) | 🟢 KAN |
| FUNC-113 (3-STAGE-IMPLEMENTATION) | 🔴 MÅ |
| FUNC-200 (PROBLEM-DEFINITION) | 🔴 MÅ |
| FUNC-210 (USER-STORIES) | 🔴 MÅ |
| FUNC-220 (TECH-STACK-SELECTION) | 🔴 MÅ |
| FUNC-230 (GIT-SETUP) | 🔴 MÅ |
| FUNC-233 (MVP-IMPLEMENTATION) | 🔴 MÅ |
| FUNC-260 (PRODUCTION-DEPLOYMENT) | 🔴 MÅ |
| OWASP-testing | 🟢 KAN |
| GDPR-compliance | ⛔ SKAL IKKE |
| Load testing | ⛔ SKAL IKKE |

**Fokus:** Bare det nødvendige for å få MVP til å fungere.

---

### **Lite, oversiktlig prosjekt (Score 11-14)**

| Funksjon | Status |
|----------|--------|
| Alle Enkelt hobbyprosjekt-funksjoner | 🔴 MÅ |
| FUNC-101 (DUAL-MODE-ESTIMERING) | 🟡 BØR |
| FUNC-111 (AUTO-TEST-GENERATION) | 🟡 BØR |
| FUNC-201 (PERSONA-CREATION) | 🟡 BØR |
| FUNC-212 (WIREFRAMES) | 🟡 BØR |
| FUNC-231 (CI-CD-PIPELINE) | 🟡 BØR |
| FUNC-250 (E2E-TESTING) | 🟡 BØR |
| FUNC-261 (MONITORING-SETUP) | 🟡 BØR |
| OWASP-testing | 🟡 BØR |
| GDPR-compliance | 🟢 KAN |

**Fokus:** Best practices for interne verktøy.

---

### **Vanlig app-prosjekt (Score 15-18)**

| Funksjon | Status |
|----------|--------|
| Alle Lite, oversiktlig-funksjoner | 🔴 MÅ / 🟡 BØR |
| FUNC-102 (PRD-GENERERING) | 🔴 MÅ |
| FUNC-110 (SMART-CONTEXT-FETCHING) | 🟡 BØR |
| FUNC-112 (INCREMENTAL-PR-STRATEGY) | 🔴 MÅ |
| FUNC-202 (RISK-ASSESSMENT) | 🔴 MÅ |
| FUNC-203 (DATA-CLASSIFICATION) | 🔴 MÅ |
| FUNC-223 (THREAT-MODELING) | 🔴 MÅ |
| FUNC-251 (OWASP-TESTING) | 🔴 MÅ |
| FUNC-252 (GDPR-COMPLIANCE) | 🟡 BØR (hvis persondata) |
| FUNC-253 (ACCESSIBILITY-TESTING) | 🟡 BØR |
| FUNC-262 (INCIDENT-RESPONSE-PLAN) | 🟡 BØR |

**Fokus:** Profesjonell kvalitet for kundevendte apper.

---

### **Viktig prosjekt med sensitive data (Score 19-23)**

| Funksjon | Status |
|----------|--------|
| Alle Vanlig app-prosjekt-funksjoner | 🔴 MÅ |
| FUNC-104 (DEPENDENCY-MAPPING) | 🔴 MÅ |
| FUNC-114 (TWO-STEP-SELF-REFLECTION) | 🔴 MÅ |
| FUNC-204 (GO-NO-GO-DECISION) | 🟡 BØR |
| FUNC-242 (USER-TESTING) | 🔴 MÅ |
| FUNC-243 (PERFORMANCE-OPTIMIZATION) | 🔴 MÅ |
| FUNC-254 (LOAD-TESTING) | 🔴 MÅ |
| FUNC-255 (AI-GOVERNANCE-AUDIT) | 🟡 BØR (hvis AI-kode) |
| FUNC-263 (BACKUP-STRATEGY) | 🔴 MÅ |
| FUNC-264 (SLI-SLO-DEFINITION) | 🟡 BØR |
| FUNC-311 (DPIA) | 🔴 MÅ (ved høy risiko) |
| FUNC-340 (AUTO-TEST-MAINTENANCE) | 🟡 BØR |

**Fokus:** Kritiske systemer med sensitive data.

---

### **Stort, kritisk system (Score 24-28)**

| Funksjon | Status |
|----------|--------|
| Alle Viktig prosjekt-funksjoner | 🔴 MÅ |
| FUNC-204 (GO-NO-GO-DECISION) | 🔴 MÅ |
| FUNC-255 (AI-GOVERNANCE-AUDIT) | 🔴 MÅ |
| FUNC-264 (SLI-SLO-DEFINITION) | 🔴 MÅ |
| FUNC-311 (DPIA) | 🔴 MÅ |
| FUNC-320 (PROMPT-TRACEABILITY) | 🔴 MÅ |
| FUNC-321 (AI-CODE-TAGGING) | 🔴 MÅ |
| FUNC-340 (AUTO-TEST-MAINTENANCE) | 🔴 MÅ |
| Full compliance (GDPR, SOC 2, ISO 42001) | 🔴 MÅ |
| Kontinuerlig sikkerhetsg audit | 🔴 MÅ |

**Fokus:** Enterprise-grade compliance og sikkerhet.

---

## 🆕 Nye funksjoner i v2.0

| Funksjon | Agent | Prioritet | Hvorfor viktig |
|----------|-------|-----------|----------------|
| **AI-WBS Generator** | PLANLEGGER | 🟡 Medium | Auto oppgavenedbrytning |
| **Dual-modus estimering** | PLANLEGGER | 🟡 Medium | AI-modus vs Hybrid |
| **Smart konteksthenting** | BYGGER | 🔴 Høy | Unngår context rot |
| **Auto test-generering** | BYGGER | 🔴 Høy | 40% færre bugs |
| **Inkrementell PR-strategi** | BYGGER | 🟡 Medium | 3x raskere review |
| **Prompt-traceability** | AI-GOVERNANCE | 🔴 Høy | EU AI Act compliance |
| **AI-kode-tagging** | AI-GOVERNANCE | 🔴 Høy | Enterprise-compliance |
| **Unit-test-generation** | TEST-GENERATOR | 🔴 Høy | 80%+ coverage |
| **E2E fra user stories** | TEST-GENERATOR | 🟡 Medium | Auto E2E-tester |
| **Auto test-maintenance** | SELF-HEALING-TEST | 🟢 Lav | 80% færre flaky tests |

---

## 📚 Ressurser

- **[READ-KIT-CC-BRUKERHÅNDBOK.md](READ-KIT-CC-BRUKERHÅNDBOK.md)** - Komplett guide
- **[READ-KIT-CC-KOMME-I-GANG.md](READ-KIT-CC-KOMME-I-GANG.md)** - For nybegynnere
- **[Agenter/klassifisering/FUNKSJONSOVERSIKT-KOMPLETT.md](Agenter/klassifisering/FUNKSJONSOVERSIKT-KOMPLETT.md)** - Metadata-system

---

**Sist oppdatert:** 9. februar 2026
**Versjon:** 2.1
