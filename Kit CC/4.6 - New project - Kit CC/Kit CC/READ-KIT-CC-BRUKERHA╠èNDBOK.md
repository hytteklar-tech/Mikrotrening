# Kit CC - Komplett Brukerhåndbok

> **Din komplette guide til å bygge profesjonelle applikasjoner med AI-assistanse**

**Versjon:** 2.0
**Sist oppdatert:** 3. februar 2026
**Målgruppe:** Ikke-tekniske vibekodere som bygger med AI-verktøy

---

## 📖 Innholdsfortegnelse

1. [Hva er Kit CC?](#hva-er-kit-cc)
2. [Grunnleggende konsepter](#grunnleggende-konsepter)
3. [De 4 nivåene av agenter](#de-4-nivåene-av-agenter)
4. [De 7 fasene](#de-7-fasene)
5. [Klassifiseringssystemet](#klassifiseringssystemet)
6. [Hvordan komme i gang](#hvordan-komme-i-gang)
7. [Daglig arbeidsflyt](#daglig-arbeidsflyt)
8. [Beste praksis](#beste-praksis)
9. [Feilsøking](#feilsøking)
10. [Avanserte funksjoner](#avanserte-funksjoner)

---

## 🎯 Hva er Kit CC?

Kit CC (tidligere Prosess A-Å) er et komplett multi-agent system som hjelper ikke-tekniske "vibekodere" med å bygge profesjonelle applikasjoner fra idé til produksjon.

### **Hva gjør Kit CC unikt?**

✅ **50 AI-agenter på 4 nivåer** - Automatisk koordinering og orkestrering
✅ **7-fase utviklingsprosess** - Fra idé til produksjon
✅ **Automatisk klassifisering** - Tilpasser prosessen til prosjektets størrelse
✅ **Sikkerhet på to nivåer** - Security by Design (arkitektur) + Security Validation (implementering)
✅ **Komplett dokumentasjon** - Alt dokumenteres automatisk
✅ **Kontekstbevarelse** - Husker alt mellom sesjoner

### **For hvem er Kit CC?**

- **Vibekodere** som bruker AI-verktøy (Claude Code, Cursor, etc.)
- **Produktledere** som vil bygge MVP-er raskt
- **Gründere** som trenger å validere idéer
- **Småbedrifter** som vil bygge interne verktøy
- **Hobbyutviklere** som vil lære profesjonell utvikling

### **Hva kan du bygge med Kit CC?**

- 📱 Web-applikasjoner (SPA, PWA)
- 🔌 API-er og backend-tjenester
- 🛠️ Interne verktøy og dashboards
- 🎮 Prototyper og MVP-er
- 🏢 Enterprise-applikasjoner (med full compliance)

---

## 🧩 Grunnleggende konsepter

### **De 5 grunnprinsippene**

Kit CC er bygget på 5 kjerneverdier:

#### **1. 7 Faser**
Strukturert utviklingsprosess fra idé til produksjon:
```
Fase 1: Idé og visjon → Fase 2: Planlegg → Fase 3: Arkitektur og sikkerhet →
Fase 4: MVP → Fase 5: Bygg funksjonene → Fase 6: Test, sikkerhet og kvalitetssjekk →
Fase 7: Publiser og vedlikehold
```

#### **2. Agentmaskineri**
50 agenter på 4 nivåer som samarbeider autonomt:
- **Nivå 0:** System (5 agenter) - Infrastruktur
- **Nivå 1:** Basis (7 agenter) - Tverrfaglige verktøy
- **Nivå 2:** Prosess (7 agenter) - Fase-koordinering
- **Nivå 3:** Ekspert (31 agenter) - Spesialistkompetanse

#### **3. Autonomi med Human-in-the-Loop**
AI jobber autonomt, men du har full kontroll:
- AI foreslår - du godkjenner
- AI dokumenterer - du verifiserer
- AI implementerer - du validerer

#### **4. Spesialtilpasning**
Prosjektet tilpasses automatisk basert på størrelse og kompleksitet:
- **Noen enkle spørsmål** klassifiserer prosjektet (progressiv avsløring)
- **Score 7-28** bestemmer prosjekttype
- **MÅ/BØR/KAN/SKAL IKKE** styrer oppgaver

#### **5. Absolutt dokumentasjon**
Alt dokumenteres så komplett at:
- Nye chatter har 100% kontekst
- Fremtidige utviklere forstår alt
- Du kan gjenoppta når som helst

---

## 🎛️ Hvordan aktivere agenter (Automatisk vs Manuell)

Kit CC støtter både **automatisk** og **manuell** aktivering av agenter, tilpasset ulike brukergrupper:

### **For nybegynnere (automatisk aktivering) - Anbefalt**

**Enkle kommandoer - ORCHESTRATOR gjør resten:**
```
Start nytt prosjekt          → ORCHESTRATOR aktiverer riktig agent
Fortsett                     → ORCHESTRATOR gjenopptar fra forrige fase
Jeg vil bygge [idé]          → ORCHESTRATOR velger riktig agent
Vis status                   → ORCHESTRATOR viser fremdrift
Neste steg                   → ORCHESTRATOR foreslår hva du skal gjøre
```

**Hvordan det fungerer:**
1. Du gir en enkel kommando
2. **ORCHESTRATOR** (system-agent) leser PROJECT-STATE.json
3. ORCHESTRATOR velger riktig agent basert på:
   - Hvilken fase du er i
   - Hva du vil gjøre
   - Prosjektets klassifisering
4. Riktig agent aktiveres automatisk
5. Agenten koordinerer alle underordnede agenter

**Fordeler:**
- ✅ Enklere - trenger ikke huske agentnavn
- ✅ Tryggere - ORCHESTRATOR sikrer riktig flyt
- ✅ Raskere - færre kommandoer

---

### **For erfarne brukere (manuell aktivering)**

**Direkte kontroll - du velger selv:**
```
Aktiver OPPSTART-agent       → Start Fase 1 direkte
Aktiver BYGGER-agent         → Implementer kode direkte
Aktiver OWASP-ekspert        → Kjør OWASP-testing direkte
```

**Hvordan det fungerer:**
1. Du spesifiserer nøyaktig hvilken agent du vil bruke
2. Agenten aktiveres direkte (bypass ORCHESTRATOR)
3. Du har full kontroll over prosessen

**Fordeler:**
- ✅ Mer kontroll - du bestemmer nøyaktig
- ✅ Raskere for erfarne - hopper over ORCHESTRATOR
- ✅ Fleksibelt - kan bruke agenter utenfor normal flyt

**Ulemper:**
- ⚠️ Krever kunnskap om agenter
- ⚠️ Kan hoppe over viktige steg
- ⚠️ Mer ansvar for riktig flyt

---

### **Hybrid tilnærming (beste praksis)**

**Kombiner automatisk og manuell etter behov:**
```
# Fase-navigering: Bruk automatisk
Start nytt prosjekt
Fortsett

# Daglige oppgaver: Bruk manuell
Aktiver BYGGER-agent. Implementer auth.
Aktiver DEBUGGER-agent. Fiks bug i login.
```

**Anbefaling:**
- **Nybegynnere:** Bruk kun automatisk de første 2-3 prosjektene
- **Mellombrukere:** Bruk automatisk for faser, manuell for daglige oppgaver
- **Erfarne:** Velg fritt basert på situasjon

---

## 🏗️ De 4 nivåene av agenter

### **Nivå 0: System-agenter (5 stk)**

*Disse jobber automatisk i bakgrunnen - du trenger ikke tenke på dem.*

| Agent | Rolle | Når aktiv |
|-------|-------|-----------|
| **ORCHESTRATOR** | Sentral koordinator - velger riktig agent for hver oppgave | Alltid |
| **AUTO-CLASSIFIER** | Klassifiserer prosjekt (MIN/FOR/STD/GRU/ENT) | Ved oppstart + fase-overganger |
| **CONTEXT-LOADER** | Laster kontekst mellom sesjoner | Ved oppstart |
| **PHASE-GATES** | Validerer kvalitet før fase-overgang | Ved fasebytte |
| **AGENT-PROTOCOL** | Kommunikasjonsstandard mellom agenter | Alltid |

**Du trenger aldri å tenke på disse** - de bare fungerer.

---

### **Nivå 1: Basis-agenter (7 stk)**

*Tverrfaglige verktøy som brukes i mange faser.*

#### **PLANLEGGER-agent**
**Hva den gjør:**
- Lager PRD (Product Requirements Document)
- Bryter ned oppgaver (Work Breakdown Structure)
- Estimerer tidsbruk (AI-modus vs Hybrid-modus)
- Definerer akseptansekriterier

**Når du bruker den:**
- Når du skal planlegge en ny feature
- Når du trenger å strukturere en vag idé
- Når du vil estimere tidsbruk

**Nye funksjoner (v2.0):**
- 🆕 **AI-WBS Generator** - Auto nedbrytning til oppgaver
- 🆕 **Dual-modus estimering** - AI-modus (timer) eller Hybrid-modus (dager)

**Eksempel:**
```
Aktiver PLANLEGGER-agent.
Jeg vil bygge en brukerautentisering med e-post og passord.
Lag PRD og oppgavenedbrytning.
```

---

#### **BYGGER-agent**
**Hva den gjør:**
- Implementerer kode i 3 stages (UI → Funksjon → Sikkerhet)
- Genererer tester automatisk
- Holder PR-er under 400 linjer
- Henter kun relevante filer (smart kontekst)

**Når du bruker den:**
- Når du skal skrive kode
- Når du skal implementere en feature
- Når du skal bygge UI-komponenter

**Nye funksjoner (v2.0):**
- 🆕 **Smart konteksthenting** - Maks 30% av kontekstvindu
- 🆕 **Auto test-generering** - Tester genereres samtidig med kode
- 🆕 **Inkrementell PR-strategi** - PR-er under 400 linjer

**Eksempel:**
```
Aktiver BYGGER-agent.
Implementer brukerautentisering basert på plan.md
```

---

#### **REVIEWER-agent**
**Hva den gjør:**
- Code review med fokus på kvalitet
- Sjekker kodestil og beste praksis
- Identifiserer teknisk gjeld
- Foreslår forbedringer

**Når du bruker den:**
- Før du merger kode
- Når du vil ha feedback på implementasjon
- Når du vil forbedre kodekvalitet

**Eksempel:**
```
Aktiver REVIEWER-agent.
Review autentiseringskoden i src/auth/
```

---

#### **SIKKERHETS-agent**
**Hva den gjør:**
- Security audit av kode
- Identifiserer sårbarheter
- Sjekker input-validering
- Verifiserer auth/authz

**Når du bruker den:**
- I alle faser (sikkerhet er alltid viktig)
- Før deployment
- Ved endringer i sikkerhetskritisk kode

**Eksempel:**
```
Aktiver SIKKERHETS-agent.
Gjennomfør security audit av autentiseringssystemet.
```

---

#### **DEBUGGER-agent**
**Hva den gjør:**
- Finner og fikser bugs
- Root cause analysis
- Systematisk feilsøking
- Foreslår løsninger

**Når du bruker den:**
- Når noe ikke fungerer
- Når du får feilmeldinger
- Når du trenger å forstå et problem

**Eksempel:**
```
Aktiver DEBUGGER-agent.
Brukere får "401 Unauthorized" ved innlogging, men credentials er korrekt.
```

---

#### **DOKUMENTERER-agent**
**Hva den gjør:**
- Skriver README
- Genererer API-dokumentasjon
- Oppdaterer teknisk dokumentasjon
- Lager brukerguider

**Når du bruker den:**
- Etter implementasjon
- Før deployment
- Når dokumentasjon mangler

**Eksempel:**
```
Aktiver DOKUMENTERER-agent.
Oppdater README med ny autentiseringsfunksjonalitet.
```

---

#### **VEILEDER-agent**
**Hva den gjør:**
- Forklarer Kit CC-systemet og dets prosesser
- Gir oppdatert kunnskap om koding og teknologier via automatisk nettsøk
- Hjelper deg forstå prosjektets status og fremdrift
- Bruker sokratisk tilnærming for beslutningsspørsmål

**Når du bruker den:**
- Når du vil forstå hvordan Kit CC fungerer
- Når du trenger hjelp med kodingskonsepter eller teknologier
- Når du lurer på hvor prosjektet ditt står
- Når du trenger veiledning uten å endre noe

**Eksempel:**
```
Velg "Spørre" ved oppstart.
Spør: "Hvordan fungerer Kit CC?"
```

**Viktig:** VEILEDER-agent er read-only — den kan aldri endre, opprette eller slette filer. Aktiveres via boot-gate (steg 0: "Spørre").

---

### **Nivå 2: Prosess-agenter (7 stk)**

*Én agent per fase - disse aktiverer du manuelt.*

| Fase | Agent | Hva den gjør |
|------|-------|--------------|
| **1** | 🌱 **OPPSTART-agent** | Problemdefinisjon, visjon, risiko, klassifisering |
| **2** | 📋 **KRAV-agent** | Brukerhistorier, kravspec, MVP-definisjon |
| **3** | 🏗️ **ARKITEKTUR-agent** | Tech stack, database, API, trusselmodell |
| **4** | 🚀 **MVP-agent** | Git, CI/CD, prosjektoppsett, prototype |
| **5** | 🔄 **ITERASJONS-agent** | Feature-utvikling, polering, brukertest |
| **6** | ✅ **KVALITETSSIKRINGS-agent** | Testing, sikkerhet, compliance |
| **7** | 🌐 **PUBLISERINGS-agent** | Deploy, monitoring, vedlikehold |

**Disse koordinerer alt arbeid i sin fase** - de kaller BASIS- og EKSPERT-agenter automatisk.

---

### **Nivå 3: Ekspert-agenter (31 stk)**

*Spesialister som kalles automatisk når nødvendig.*

#### **Fase 1-3 eksperter (7 stk):**
- **PERSONA-ekspert** - Jobs-to-be-Done, personas, brukerreise
- **LEAN-CANVAS-ekspert** - Forretningsmodell, verdiforslag
- **KONKURRANSEANALYSE-ekspert** - Markedsanalyse, differensiering
- **WIREFRAME-ekspert** - UI-skisser, brukerflyt
- **API-DESIGN-ekspert** - OpenAPI/Swagger, REST-design
- **TRUSSELMODELLERINGS-ekspert** - STRIDE-analyse, DREAD
- **DATAMODELL-ekspert** - ER-diagram, normalisering

#### **Fase 4-5 eksperter (7 stk):**
- **HEMMELIGHETSSJEKK-ekspert** - Secrets-scanning, .env-håndtering
- **CI/CD-ekspert** - GitHub Actions, pipelines
- **SUPPLY-CHAIN-ekspert** - Package-verifisering, SBOM
- **BRUKERTEST-ekspert** - Brukervalidering, usability
- **YTELSE-ekspert** - Lighthouse, Core Web Vitals
- **UI/UX-ekspert** - Polering, micro-interaksjoner
- **REFAKTORING-ekspert** - Teknisk gjeld, kode-duplisering

#### **Fase 6-7 eksperter (8 stk):**
- **OWASP-ekspert** - OWASP Top 10:2025, penetrasjonstesting
- **GDPR-ekspert** - Personvern, DPIA, samtykke
- **TILGJENGELIGHETS-ekspert** - WCAG 2.2 AA, skjermleser
- **CROSS-BROWSER-ekspert** - Safari-quirks, CSS-kompatibilitet
- **LASTTEST-ekspert** - Load testing, k6/Artillery
- **MONITORING-ekspert** - Sentry, logging, alerting
- **INCIDENT-RESPONSE-ekspert** - IR-plan, beredskap
- **BACKUP-ekspert** - 3-2-1-regel, disaster recovery

#### **Research-baserte nye eksperter (8 stk):**
- **AI-GOVERNANCE-ekspert** - Sporing av AI-generert kode (🔴 Høy prioritet)
- **TEST-GENERATOR-ekspert** - Auto generering av tester (🔴 Høy prioritet)
- **SELF-HEALING-TEST-ekspert** - Auto vedlikehold av tester
- **INFRASTRUKTUR-ekspert** - Kubernetes, IaC
- **DESIGN-TIL-KODE-ekspert** - Figma til React/Vue
- **PROMPT-INGENIØR-ekspert** - Prompt-validering
- **MIGRASJON-ekspert** - Dependency-oppgradering
- **SRE-ekspert** - Site Reliability Engineering

**Du trenger IKKE å kalle disse manuelt** - Prosess-agentene gjør det automatisk.

---

## 🚀 De 7 fasene

### **Fase 1: Idé og visjon**

**Formål:** Hva skal du bygge?

**Hva skjer:**
- 🎯 Problemdefinisjon og målgruppekartlegging
- 📊 Risikovurdering og Go/No-Go-beslutning
- 🔐 Dataklassifisering (sensitive data?)
- 📈 Prosjektklassifisering (progressiv avsløring → MIN/FOR/STD/GRU/ENT)

**Leveranser:**
- `docs/vision.md` - Prosjektvisjon og problemdefinisjon
- `docs/personas.md` - Brukergrupper og personas
- `docs/security/risikovurdering.md` - Identifiserte risikoer
- `.ai/PROJECT-STATE.json` - Prosjektklassifisering

**Tidsbruk:**
- Minimal: 30 min - 1 time
- Standard: 2-4 timer
- Enterprise: 1-2 dager

**Kommando:**
```
Aktiver OPPSTART-agent.
Jeg vil bygge [din idé].
```

---

### **Fase 2: Planlegg**

**Formål:** Funksjoner, krav og sikkerhet

**Hva skjer:**
- 📝 Brukerhistorier og akseptansekriterier
- 🔒 Sikkerhetskrav (basert på dataklassifisering)
- 🎨 Wireframes og UI-skisser
- 🎯 MVP-definisjon (MoSCoW: Must/Should/Could/Won't)

**Leveranser:**
- `docs/krav/user-stories.md` - Alle brukerhistorier
- `docs/krav/sikkerhetskrav.md` - Sikkerhetskrav
- `docs/wireframes/` - UI-skisser
- `docs/mvp-definisjon.md` - Hva er MVP?

**Tidsbruk:**
- Minimal: 1-2 timer
- Standard: 4-8 timer
- Enterprise: 2-4 dager

**Kommando:**
```
Aktiver KRAV-agent.
Basert på vision.md, definer krav for [prosjektnavn].
```

---

### **Fase 3: Arkitektur og sikkerhet**

**Formål:** Hvordan bygges det trygt?

**Hva skjer:**
- 🛠️ Tech stack-valg (frontend, backend, database, hosting)
- 🗃️ Database-design og datamodell
- 🔌 API-design (REST/GraphQL)
- 🛡️ Trusselmodellering (STRIDE)
- 🔐 Sikkerhetskontroller

**Leveranser:**
- `docs/teknisk/tech-stack.md` - Valgt teknologi
- `docs/teknisk/database-schema.sql` - Database-design
- `docs/teknisk/api-spec.yaml` - API-spesifikasjon
- `docs/security/trusselmodell.md` - STRIDE-analyse

**Tidsbruk:**
- Minimal: 1-2 timer
- Standard: 4-8 timer
- Enterprise: 3-5 dager

**Kommando:**
```
Aktiver ARKITEKTUR-agent.
Design arkitekturen for [prosjektnavn].
```

---

### **Fase 4: MVP**

**Formål:** Bygge første fungerende versjon

**Hva skjer:**
- 🏗️ Prosjektoppsett (Git, CI/CD, secrets management)
- 💻 Implementering av MVP-features
- 🧪 Automatisk test-generering
- 🔒 Sikker koding fra dag 1
- 🚀 Deploy til staging

**Leveranser:**
- Fungerende kodebase i Git
- CI/CD-pipeline (lint, test, build, deploy)
- Secrets management (.env.example, no hardcoded secrets)
- Deploybar MVP til staging
- Test-suite (unit + integration)

**Tidsbruk:**
- Minimal: 1-2 dager
- Standard: 1-2 uker
- Enterprise: 2-4 uker

**Kommando:**
```
Aktiver MVP-agent.
Bygg MVP basert på teknisk design.
```

---

### **Fase 5: Bygg funksjonene**

**Formål:** Én funksjon om gangen

**Hva skjer:**
- ✨ Implementere gjenstående features
- 🎨 UI/UX-polering og responsivitet
- 🧪 Brukertest og validering
- ⚡ Ytelsesoptimalisering
- 🔧 Refaktoring av teknisk gjeld

**Leveranser:**
- Feature-komplett applikasjon
- Polert UI/UX
- Brukertestrapporter
- Ytelsesrapport (Lighthouse)
- Refaktorert kode

**Tidsbruk:**
- Minimal: 2-4 dager
- Standard: 2-4 uker
- Enterprise: 1-3 måneder

**Kommando:**
```
Aktiver ITERASJONS-agent.
Fullfør [feature] og poler UI.
```

---

### **Fase 6: Test, sikkerhet og kvalitetssjekk**

**Formål:** Fungerer alt?

**Hva skjer:**
- 🧪 E2E-testing (Playwright, Cypress)
- 🔒 OWASP Top 10:2025 testing
- 📊 GDPR-compliance (hvis persondata)
- ♿ Tilgjengelighet (WCAG 2.2 AA)
- 🌐 Cross-browser testing
- 📈 Load testing
- 🤖 AI-governance (hvis AI-generert kode)

**Leveranser:**
- `docs/testing/test-rapport.md` - E2E-testresultater
- `docs/security/owasp-rapport.md` - Sikkerhetstestrapport
- `docs/compliance/gdpr-sjekkliste.md` - GDPR-compliance
- `docs/testing/tilgjengelighetsrapport.md` - WCAG-rapport

**Tidsbruk:**
- Minimal: 1-2 dager
- Standard: 1 uke
- Enterprise: 2-4 uker

**Kommando:**
```
Aktiver KVALITETSSIKRINGS-agent.
Gjennomfør komplett QA for [prosjektnavn].
```

---

### **Fase 7: Publiser og vedlikehold**

**Formål:** Ut i verden

**Hva skjer:**
- 🚀 Deploy til produksjon
- 📊 Monitoring og logging (Sentry, etc.)
- 🚨 Incident Response-plan
- 💾 Backup og disaster recovery
- 📈 SLI/SLO-definisjon
- 🔄 Vedlikeholdsplan

**Leveranser:**
- Live produksjons-URL
- Monitoring-setup (Sentry, logging, alerting)
- `docs/drift/ir-plan.md` - Incident Response-plan
- `docs/drift/backup-plan.md` - Backup-strategi
- `docs/drift/vedlikehold.md` - Vedlikeholdsplan

**Tidsbruk:**
- Minimal: 2-4 timer
- Standard: 1-2 dager
- Enterprise: 1 uke

**Kommando:**
```
Aktiver PUBLISERINGS-agent.
Deploy [prosjektnavn] til produksjon.
```

---

## 🎚️ Klassifiseringssystemet

### **Hvordan fungerer det?**

AUTO-CLASSIFIER bruker **progressiv avsløring** ved prosjektstart — 3 enkle åpningsspørsmål etterfulgt av relevante oppfølgingsspørsmål:

1. **Prosjektstørrelse** - Hvor stort er prosjektet?
2. **Brukertype** - Hvem skal bruke det?
3. **Datatyper** - Hvilke data håndteres?
4. **Brukerskala** - Hvor mange brukere?
5. **Nedetid** - Hvor kritisk er oppetid?
6. **Regulering** - Compliance-krav?
7. **Integrasjoner** - Hvor mange eksterne systemer?

### **Scoring:**
- Hvert spørsmål gir **1-4 poeng**
- Total score: **7-28 poeng**
- Score → Prosjekttype

### **Prosjekttyper:**

| Prosjekttype | Score | Typisk prosjekt | Tidsbruk | Eksempel |
|------|-------|-----------------|----------|----------|
| **Enkelt hobbyprosjekt** | 7-10 | Hobby, læring | Timer-dager | Todo-app, læringsprosjekt |
| **Lite, oversiktlig prosjekt** | 11-14 | Internt verktøy | Uker | Team dashboard, intern CRM |
| **Vanlig app-prosjekt** | 15-18 | Kundevendt app | Uker-måneder | E-handel, booking-system |
| **Viktig prosjekt med sensitive data** | 19-23 | Viktig system | Måneder | Helsetjeneste, fintech |
| **Stort, kritisk system** | 24-28 | Kritisk infrastruktur | Måneder+ | Banking, offentlig sektor |

### **Hva styrer prosjekttypen?**

Basert på prosjekttype får hver oppgave en vurdering:

- 🔴 **MÅ** - Kritisk, må gjøres
- 🟡 **BØR** - Sterkt anbefalt
- 🟢 **KAN** - Valgfritt, anbefalt
- ⛔ **SKAL IKKE** - Overflødlig for dette nivået

**Eksempel:**

| Oppgave | MIN | FOR | STD | GRU | ENT |
|---------|-----|-----|-----|-----|-----|
| OWASP-testing | KAN | BØR | MÅ | MÅ | MÅ |
| GDPR-compliance | IKKE | KAN | BØR | MÅ | MÅ |
| Load testing | IKKE | KAN | BØR | MÅ | MÅ |
| Incident Response-plan | IKKE | KAN | BØR | MÅ | MÅ |

---

## 🏁 Hvordan komme i gang

### **Første gang (nytt prosjekt):**

**Steg 1: Forberedelse**
```bash
# Opprett prosjektmappe
mkdir mitt-prosjekt
cd mitt-prosjekt

# Kopier Agenter-mappen
cp -r /path/til/Agenter ./
```

**Steg 2: Start Kit CC**
```
Åpne Claude Code i prosjektmappen

# Velg modus:
# "Bygge" → Starter byggeprosessen (orchestrator)
# "Spørre" → Starter VEILEDER-agent (read-only, spør om hva som helst)

# For nybegynnere (anbefalt):
Si: "Start nytt prosjekt"
→ ORCHESTRATOR aktiverer AUTO-CLASSIFIER
→ AUTO-CLASSIFIER steller enkle spørsmål (progressiv avsløring)
→ OPPSTART-agent aktiveres automatisk

# For erfarne brukere (manuell):
Aktiver OPPSTART-agent.
Jeg vil bygge [din idé].
```

**Steg 3: Følg agentens veiledning**
OPPSTART-agent vil guide deg gjennom Fase 1 og koordinere alle nødvendige agenter automatisk.

**Steg 4: Gå gjennom fasene**
ORCHESTRATOR vil automatisk foreslå neste fase når du er klar, eller du kan aktivere neste fase manuelt.

---

### **Eksisterende prosjekt (legg til feature):**

**Steg 1: Planlegg**
```
Aktiver PLANLEGGER-agent.
Jeg vil bygge [feature].
Lag PRD og oppgavenedbrytning.
```

**Steg 2: Bygg**
```
Aktiver BYGGER-agent.
Implementer basert på plan.md
```

**Steg 3: Review (automatisk)**
REVIEWER-agent og SIKKERHETS-agent kalles automatisk.

**Steg 4: Deploy**
```
Aktiver PUBLISERINGS-agent.
Deploy [feature] til produksjon.
```

---

## 📅 Daglig arbeidsflyt

### **Scenario 1: Start dagen**

```
# Åpne Claude Code i prosjektmappen
# Si: "Vis status"

CONTEXT-LOADER vil vise:
- Hvilken fase du er i
- Hvilke oppgaver som gjenstår
- Hva som ble gjort sist
- Forslag til neste steg
```

### **Scenario 2: Ny feature**

```
1. Aktiver PLANLEGGER-agent
   → Lag PRD og plan

2. Aktiver BYGGER-agent
   → Implementer feature

3. (Automatisk) REVIEWER-agent
   → Code review

4. (Automatisk) SIKKERHETS-agent
   → Security review

5. Deploy til staging
   → Test

6. Deploy til produksjon
```

### **Scenario 3: Bugfix**

```
1. Aktiver DEBUGGER-agent
   → Diagnostiser problem

2. DEBUGGER-agent fikser
   → Implementer løsning

3. (Automatisk) REVIEWER-agent
   → Verifiser fix

4. Deploy hotfix
```

### **Scenario 4: Avslutt dagen**

```
# Agentene dokumenterer automatisk
# Du kan bare lukke chatten

# Neste gang:
# CONTEXT-LOADER laster alt automatisk
# Fortsett der du slapp
```

---

## 💡 Beste praksis

### **1. Gi alltid kontekst**

❌ **Dårlig:**
```
Aktiver BYGGER-agent.
```

✅ **Bra:**
```
Aktiver BYGGER-agent.
Implementer brukerautentisering basert på plan.md
Tech stack: Next.js + Supabase
```

---

### **2. Referer til eksisterende dokumenter**

✅ **Alltid referér:**
```
Aktiver ARKITEKTUR-agent.
Les vision.md og kravdokumenter før du fortsetter.
```

---

### **3. Vær spesifikk på leveranser**

✅ **Spesifiser sti:**
```
Aktiver SIKKERHETS-agent.
Lagre sikkerhetsrapporten i docs/security/owasp-rapport.md
```

---

### **4. Bruk 3-stage tilnærmingen (BYGGER-agent)**

Når du bygger features:
1. **Stage 1:** UI only (mock data)
2. **Stage 2:** Real functionality
3. **Stage 3:** Testing + Security

Dette forhindrer at du bygger masse funksjonalitet som må kastes.

---

### **5. Ikke skip sikkerhet - To nivåer av sikkerhet**

Kit CC har sikkerhet på **to nivåer** - ikke bare ett:

**Nivå 1: Security by Design (Prosess-nivå)**
- **Fase 1:** Dataklassifisering (hvilke data er sensitive?)
- **Fase 2:** Sikkerhetskrav (hva må beskyttes?)
- **Fase 3:** Trusselmodellering (STRIDE-analyse før koding!)
- Dette er **innbakt** i arkitekturen - fikser design før koding

**Nivå 2: Security Validation (Implementering-nivå)**
- **3-stage bygging:**
  - Stage 1: UI (mock data)
  - Stage 2: Funksjon (backend-logikk)
  - Stage 3: **Sikkerhet** (input-validering, auth, error-handling)
- Dette er **validering** etter implementering - siste sjekk før ferdig

**Hvorfor begge nivåer?**
- **Design-sikkerhet** forhindrer arkitektur-feil (billig å fikse)
- **Implementering-sikkerhet** fanger kode-feil (dyrt å fikse senere)
- Sammen gir de **Defense in Depth**

**Å fikse sikkerhetshull tidlig er 10x billigere enn senere.**

---

### **6. La AUTO-CLASSIFIER gjøre jobben**

Svar ærlig på klassifiseringsspørsmålene. Klassifiseringen styrer:
- Hvilke oppgaver som er MÅ/BØR/KAN
- Hvor mye tid som skal brukes
- Hvilke ekspert-agenter som kalles

---

### **7. Bruk inkrementell PR-strategi**

BYGGER-agent holder PR-er under 400 linjer automatisk.

**Hvorfor?**
- 3x raskere review
- Lettere å forstå
- Færre merge-konflikter
- Enklere rollback

---

## 🐛 Feilsøking

### **Problem: Jeg vet ikke hvilken fase jeg er i**

**Løsning:**
```
Si: "Vis status"

CONTEXT-LOADER vil vise:
- Nåværende fase
- Fullførte oppgaver
- Gjenstående oppgaver
- Forslag til neste steg
```

Eller sjekk hva du har:
- `vision.md` → Fase 1 fullført
- `kravdokumenter` → Fase 2 fullført
- `teknisk-spec.md` → Fase 3 fullført
- Fungerende kode → Fase 4-5
- Testrapporter → Fase 6
- Live URL → Fase 7

---

### **Problem: Agenten gir ikke forventede resultater**

**Løsning:** Gi mer kontekst
```
Aktiver [AGENT].

KONTEKST:
- Prosjekt: [navn]
- Målgruppe: [hvem]
- Tech stack: [hva]

OPPGAVE:
[Beskriv nøyaktig hva du vil]

LEVERANSER:
[Hva forventer du som output]
```

---

### **Problem: Jeg har ikke tid til alle 7 faser**

**Løsning:** Prioriter

**Minimum (for MVP):**
- Fase 1, 4, 7 (visjon → bygg → deploy)

**Anbefalt:**
- Fase 1-4, 6-7 (hopp over iterasjon hvis enkel MVP)

**Ideelt:**
- Alle 7 faser (gir best resultat)

**⚠️ Advarsel:** Å hoppe over sikkerhetsfaser (3, 6) kan koste deg dyrt senere.

---

### **Problem: Feil oppstår gjentatte ganger**

**Løsning:** Circuit-breaker aktiveres automatisk

Etter 3 feil får du 4 valg:
1. **RETRY** - Prøv på nytt
2. **ALTERNATE** - Prøv alternativ løsning
3. **SKIP** - Utsett oppgaven (markeres som DEFERRED)
4. **ABORT** - Avbryt oppgaven

---

### **Problem: Jeg vil gå tilbake til tidligere tilstand**

**Løsning:** Bruk checkpoints
```
Si: "Vis alle checkpoints"

→ Liste over lagringspunkter vises

Si: "Gå tilbake til [checkpoint-navn]"

→ Bekreft rollback

→ Prosjektet tilbakestilles
```

---

## 🚀 Avanserte funksjoner

### **1. Re-klassifisering**

Prosjektet kan oppgraderes underveis:

**Når skjer det?**
- Du introduserer sensitiv data (e-post, passord, personinfo)
- Brukerantall øker betydelig
- Compliance-krav kommer til

**Hva skjer?**
```
AUTO-CLASSIFIER detekterer endring
→ Foreslår oppgradering (MIN → FOR → STD → GRU → ENT)
→ Viser konsekvenser (flere MÅ-oppgaver)
→ Du godkjenner eller avslår
```

---

### **2. Smart konteksthenting (BYGGER-agent)**

BYGGER-agent henter kun relevante filer:

**Hvordan?**
1. Leser `CLAUDE.md` først (veikart)
2. Identifiserer relevante filer
3. Henter kun disse (maks 30% av kontekst)
4. Oppsummerer resten semantisk

**Fordel:** Unngår "context rot" og "lost in the middle".

---

### **3. Automatisk test-generering (TEST-GENERATOR-ekspert)**

Tester genereres automatisk:

**Test-typer:**
- Unit-tester (happy path + edge cases)
- Integration-tester
- E2E-tester fra brukerhistorier
- Mutation testing

**Statistikk:** 40% færre bugs i produksjon.

> 📌 **Planlagt funksjonalitet** — TEST-GENERATOR-ekspert er merket som høy prioritet og under aktivt arbeid. Funksjonaliteten kan variere etter versjon.

---

### **4. AI-governance (AI-GOVERNANCE-ekspert)**

Sporing av AI-generert kode:

**Hva logges:**
```json
{
  "file": "src/components/Button.tsx",
  "ai_generated": true,
  "model": "claude-opus-4.5-20251101",
  "timestamp": "2026-02-01T14:32:00Z",
  "prompt_version": "prompt-button-v2.3",
  "human_review": true,
  "reviewer": "alice@example.com"
}
```

**Hvorfor viktig:** EU AI Act, SOC 2, enterprise-compliance.

> 📌 **Planlagt funksjonalitet** — AI-GOVERNANCE-ekspert er merket som høy prioritet og under aktivt arbeid. Implementasjonen varierer etter Kit CC-versjon og prosjektklassifisering.

---

### **5. Self-healing tests (SELF-HEALING-TEST-ekspert)**

Tester vedlikeholder seg selv:

**Hva skjer:**
- Test feiler pga UI-endring (ikke bug)
- Ekspert analyserer årsak
- Oppdaterer selektorer automatisk
- Tester kjører grønt igjen

**Fordel:** Reduserer flaky tests med 80%.

> 📌 **Planlagt funksjonalitet** — SELF-HEALING-TEST-ekspert er under utvikling. Tilgjengelighet avhenger av Kit CC-versjon og kodebase-type.

---

### **6. Design-til-kode (DESIGN-TIL-KODE-ekspert)**

Konverter Figma til React/Vue:

**Workflow:**
```
1. Last opp Figma-fil eller URL
2. DESIGN-TIL-KODE-ekspert analyserer
3. Genererer React-komponenter
4. Inkluderer Tailwind CSS
5. Respekterer design system
```

> 📌 **Planlagt funksjonalitet** — DESIGN-TIL-KODE-ekspert er under utvikling. Støtte for Figma-integrasjon varierer etter versjon.

---

### **7. PHASE-GATES - Kvalitetsvalidering ved fase-overganger**

PHASE-GATES sikrer at hver fase er fullført før du går videre.

**Hva skjer ved fase-overgang:**

**1. PASS (alle MÅ-oppgaver ferdig)**
```
✅ Alle kritiske oppgaver fullført
→ Checkpoint lagres automatisk
→ Går direkte til neste fase
```

**2. PARTIAL (noen MÅ-oppgaver mangler)**
```
⚠️ AI viser hva som mangler
→ Du får valg:
   A) "Fullfør manglende oppgaver nå" (anbefalt)
   B) "Fortsett likevel" (krever bekreftelse)
   C) "Gå tilbake og fiks"

Hvis du velger B:
→ Manglende oppgaver markeres som DEFERRED
→ Du advares om konsekvenser
→ Checkpoint lagres med PARTIAL-status
```

**3. FAIL (kritiske MÅ-oppgaver mangler)**
```
❌ Kan IKKE gå videre
→ Må fullføre kritiske oppgaver ELLER
→ Re-klassifisere prosjektet (hvis kravene har endret seg)

Eksempel: STANDARD-prosjekt uten trusselmodellering → FAIL
```

**Hva skjer med DEFERRED oppgaver:**
- Lagres i PROJECT-STATE.json
- Huskes til senere faser
- Varsles ved relevant tidspunkt
- Kan omgjøres til MÅ hvis du angrer

**Manuell kontroll:**
```
# Se status for gjeldende fase
Vis fase-status

# Se alle checkpoints
Vis alle checkpoints

# Gå tilbake til forrige checkpoint
Gå tilbake til [checkpoint-navn]
```

**Eksempel-flyt:**

```
Du: "Jeg er ferdig med Fase 3, vil gå til Fase 4"

PHASE-GATES sjekker:
✅ Tech stack valgt
✅ Database designet
⚠️ Trusselmodellering mangler (MÅ for STANDARD)

AI: "Fase 3 er ikke fullført. Mangler:
     - Trusselmodellering (MÅ for STANDARD-prosjekt)

     Valg:
     A) Fullfør trusselmodellering nå (anbefalt)
     B) Fortsett uten (ikke trygt)
     C) Re-klassifiser til lite, oversiktlig prosjekt (hvis ikke kundevendt)"

Du: "A - la oss fullføre det"

AI: "Aktiverer TRUSSELMODELLERINGS-ekspert..."
```

**Fordeler med PHASE-GATES:**
- ✅ Sikrer kvalitet
- ✅ Forhindrer at kritiske ting glemmes
- ✅ Gir kontrollpunkter for rollback
- ✅ Fleksibel (kan utsette ikke-kritisk)

---

## 📚 Viktige filer og deres formål

### **I rot-mappen:**
- `START-HER.md` - Quick start guide
- `CLAUDE.md` - Prosjektprinsipper og oversikt
- `READ-KIT-CC-BRUKERHÅNDBOK.md` - Denne filen

### **I Agenter-mappen:**
- `README.md` - Agentsystem-oversikt
- `USER-AI-STRUKTUR.md` - Hvordan nivåene forholder seg
- `USER-AI-AGENT-REGISTER.md` - Liste over alle 50 agenter
- `USER-STATUS.md` - Byggestatus
- `CLAUDE.md` - Boot-fil (startpunkt)

### **I .ai-mappen (genereres automatisk):**
- `PROJECT-STATE.json` - Prosjektets tilstand
- `SESSION-HANDOFF.md` - Handoff mellom sesjoner
- `SESSION-HANDOFF.md` - Menneskelesbar oversikt (erstatter deprecated CONTEXT-SNAPSHOT.md)
- `CHECKPOINT-HISTORY/` - Lagringspunkter

### **I fasemapper:**
- `FASE-1-KOMPLETT.md` - Gjeldende fasedokument
- (samme for FASE-2 til FASE-7)

---

## 🎯 Neste steg

### **Hvis du er helt ny:**
1. Les [READ-KIT-CC-KOMME-I-GANG.md](READ-KIT-CC-KOMME-I-GANG.md) (pedagogisk guide)
2. Les FASE-1-KOMPLETT.md (forstå Fase 1)
3. Start et enkelt testprosjekt (todo-app)
4. Følg alle 7 faser

### **Hvis du vil starte raskt:**
1. Åpne [READ-KIT-CC-REFERANSE.md](READ-KIT-CC-REFERANSE.md) (quick reference)
2. Aktiver OPPSTART-agent
3. Følg agentens veiledning

### **Hvis du vil forstå systemet grundig:**
1. Les alle fasedokumenter (FASE-1-KOMPLETT.md til FASE-7-KOMPLETT.md)
2. Les [READ-KIT-CC-FUNKSJONSOVERSIKT.md](READ-KIT-CC-FUNKSJONSOVERSIKT.md)
3. Les alle agent-filer i `Agenter/agenter/`
4. Start et reelt prosjekt

---

## 💬 Support og ressurser

### **Dokumentasjon:**
- **Denne håndboken** - Komplett oversikt
- **READ-KIT-CC-KOMME-I-GANG.md** - Pedagogisk guide
- **READ-KIT-CC-REFERANSE.md** - Quick reference
- **READ-KIT-CC-FUNKSJONSOVERSIKT.md** - Alle agentfunksjoner
- **Fase-mapper** (Fase 1-7) - Detaljert om alle faser

### **Agent-dokumentasjon:**
- `Agenter/agenter/system/` - System-agenter
- `Agenter/agenter/basis/` - Basis-agenter
- `Agenter/agenter/prosess/` - Prosess-agenter
- `Agenter/agenter/ekspert/` - Ekspert-agenter

### **Klassifisering og metadata:**
- `Agenter/klassifisering/KLASSIFISERING-METADATA-SYSTEM.md`
- `Agenter/klassifisering/FUNKSJONSOVERSIKT-KOMPLETT.md`

---

**Lykke til med ditt prosjekt! 🚀**

*Kit CC er her for å hjelpe deg bygge tryggere, raskere og bedre. Ta deg tid til å forstå systemet, så vil det betale seg mange ganger over.*

---

**Versjon:** 2.0
**Opprettet:** 3. februar 2026
**Forfatter:** Kit CC Documentation Team
