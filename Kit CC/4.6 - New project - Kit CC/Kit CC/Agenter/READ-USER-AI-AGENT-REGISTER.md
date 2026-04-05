# Agent-Register

> Komplett oversikt over alle 50 agenter i Kit CC

---

## Statistikk

| Nivå | Type | Antall | Eksisterende | Nye |
|------|------|--------|--------------|-----|
| 0 | System | 5 | 4 | 1 |
| 1 | Basis | 7 | 0 | 7 |
| 2 | Prosess | 7 | 0 | 7 |
| 3 | Ekspert | **31** | 8 | **23** |
| **Total** | | **50** | **12** | **38** |

> 📊 **Oppdatert basert på research 2026-01-31** - Se RESEARCH-ANALYSE-2026.md for detaljer

---

## NIVÅ 0: System-agenter

*Infrastruktur og orkestrering*

| ID | Navn | Beskrivelse | Status |
|----|------|-------------|--------|
| SYS-001 | **ORCHESTRATOR** | Sentral koordinator, ruter oppgaver, håndterer handoffs | 🔴 Må bygges |
| SYS-002 | **CONTEXT-LOADER** | Laster prosjektkontekst ved session-start | 🟢 Eksisterer |
| SYS-003 | **AUTO-CLASSIFIER** | Klassifiserer prosjekt (minimal→enterprise) | 🟢 Eksisterer |
| SYS-004 | **PHASE-GATES** | Validerer fase-overganger, kvalitetsporter | 🟢 Eksisterer |
| SYS-005 | **AGENT-PROTOCOL** | Kommunikasjonsstandard (referanse) | 🟢 Eksisterer |

---

## NIVÅ 1: Basis-agenter

*Tverrfaglige verktøy som brukes på tvers av faser*

| ID | Navn | Beskrivelse | Faser | Status |
|----|------|-------------|-------|--------|
| BAS-001 | **PLANLEGGER-agent** | PRD, oppgavenedbrytning, strategisk planlegging | Alle | 🔴 Ny |
| BAS-002 | **BYGGER-agent** | Implementerer kode i 3 stages (UI→Funksjon→Sikkerhet) | 4-7 | 🔴 Ny |
| BAS-003 | **REVIEWER-agent** | Code review, kvalitetssjekk | 4-7 | 🔴 Ny |
| BAS-004 | **SIKKERHETS-agent** | Security audit, sårbarhetssjekk, input-validering | Alle | 🔴 Ny |
| BAS-005 | **DEBUGGER-agent** | Feilsøking, bug-fixing, root cause analysis | 4-7 | 🔴 Ny |
| BAS-006 | **DOKUMENTERER-agent** | README, API-docs, teknisk dokumentasjon | Alle | 🔴 Ny |

---

## NIVÅ 2: Prosess-agenter

*Én per fase - koordinerer og kaller eksperter*

| ID | Navn | Fase | Beskrivelse | Status |
|----|------|------|-------------|--------|
| PRO-001 | **OPPSTART-agent** | 1 | Idé, visjon, risikovurdering, dataklassifisering | 🔴 Ny |
| PRO-002 | **KRAV-agent** | 2 | Brukerhistorier, sikkerhetskrav, MVP-definisjon | 🔴 Ny |
| PRO-003 | **ARKITEKTUR-agent** | 3 | Tech stack, database-design, API-design, trusselmodell | 🔴 Ny |
| PRO-004 | **MVP-agent** | 4 | Prosjektoppsett, Git, CI/CD, første prototype | 🔴 Ny |
| PRO-005 | **ITERASJONS-agent** | 5 | Feature-utvikling, code review, brukervalidering | 🔴 Ny |
| PRO-006 | **KVALITETSSIKRINGS-agent** | 6 | E2E-testing, sikkerhetstesting, compliance | 🔴 Ny |
| PRO-007 | **PUBLISERINGS-agent** | 7 | Deploy, monitoring, vedlikehold, IR-plan | 🔴 Ny |

---

## NIVÅ 3: Ekspert-agenter

### Fase 1-eksperter (Idé og visjon)

| ID | Navn | Beskrivelse | Kalles av | Ny? |
|----|------|-------------|-----------|-----|
| EKS-001 | **PERSONA-ekspert** | Jobs-to-be-Done, målgruppeanalyse, personas, brukerreise | OPPSTART-agent | ✅ |
| EKS-002 | **LEAN-CANVAS-ekspert** | Forretningsmodell, kostnadsestimering, verdiforslag | OPPSTART-agent | ✅ |
| EKS-003 | **KONKURRANSEANALYSE-ekspert** | Markedsanalyse, differensiering, blue ocean | OPPSTART-agent | ✅ |

### Fase 2-eksperter (Planlegg)

| ID | Navn | Beskrivelse | Kalles av | Ny? |
|----|------|-------------|-----------|-----|
| EKS-004 | **WIREFRAME-ekspert** | UI-skisser, brukerflyt, low-fidelity prototyper | KRAV-agent | |
| EKS-005 | **API-DESIGN-ekspert** | OpenAPI/Swagger, REST-design, maskinlesbare specs | KRAV-agent, ARKITEKTUR-agent | ✅ |

### Fase 3-eksperter (Arkitektur og sikkerhet)

| ID | Navn | Beskrivelse | Kalles av | Ny? |
|----|------|-------------|-----------|-----|
| EKS-006 | **TRUSSELMODELLERINGS-ekspert** | STRIDE-analyse, DREAD-rangering, attack surfaces | ARKITEKTUR-agent | |
| EKS-007 | **DATAMODELL-ekspert** | ER-diagram, normalisering, RLS, indeksering | ARKITEKTUR-agent | ✅ |

### Fase 4-eksperter (MVP/Prototype)

| ID | Navn | Beskrivelse | Kalles av | Ny? |
|----|------|-------------|-----------|-----|
| EKS-008 | **HEMMELIGHETSSJEKK-ekspert** | Secrets-scanning, .env-håndtering, git-historikk | MVP-agent, KVALITETSSIKRINGS-agent | |
| EKS-009 | **CICD-ekspert** | GitHub Actions, pipelines, automatisering | MVP-agent, PUBLISERINGS-agent | ✅ |
| EKS-010 | **SUPPLY-CHAIN-ekspert** | Package-verifisering, lockfiles, SBOM, typosquatting | MVP-agent | ✅ |

### Fase 5-eksperter (Bygg funksjonene)

| ID | Navn | Beskrivelse | Kalles av | Ny? |
|----|------|-------------|-----------|-----|
| EKS-011 | **BRUKERTEST-ekspert** | Brukervalidering, feedback-analyse, usability | ITERASJONS-agent | |
| EKS-012 | **YTELSE-ekspert** | Lighthouse, Core Web Vitals, optimalisering | ITERASJONS-agent, KVALITETSSIKRINGS-agent | |
| EKS-013 | **UI/UX-ekspert** | Polering, loading states, responsivitet, micro-interaksjoner | ITERASJONS-agent | ✅ |
| EKS-014 | **REFAKTORING-ekspert** | Teknisk gjeld, kode-duplisering, arkitektur-rot | ITERASJONS-agent, PUBLISERINGS-agent | ✅ |

### Fase 6-eksperter (Test og kvalitetssjekk)

| ID | Navn | Beskrivelse | Kalles av | Ny? |
|----|------|-------------|-----------|-----|
| EKS-015 | **OWASP-ekspert** | OWASP Top 10:2025, penetrasjonstesting, sårbarheter | KVALITETSSIKRINGS-agent | |
| EKS-016 | **GDPR-ekspert** | Personvernforordningen, DPIA, samtykke, sletting | KVALITETSSIKRINGS-agent | |
| EKS-017 | **TILGJENGELIGHETS-ekspert** | WCAG 2.2 AA, skjermleser, tastaturnavigasjon | KVALITETSSIKRINGS-agent | |
| EKS-018 | **CROSS-BROWSER-ekspert** | Safari-quirks, CSS-kompatibilitet, polyfills | KVALITETSSIKRINGS-agent | ✅ |
| EKS-019 | **LASTTEST-ekspert** | Load testing, stress testing, k6/Artillery | KVALITETSSIKRINGS-agent | ✅ |

### Fase 7-eksperter (Publiser og vedlikehold)

| ID | Navn | Beskrivelse | Kalles av | Ny? |
|----|------|-------------|-----------|-----|
| EKS-020 | **MONITORING-ekspert** | Sentry, logging, SLI/SLO, golden signals, alerting | PUBLISERINGS-agent | ✅ |
| EKS-021 | **INCIDENT-RESPONSE-ekspert** | IR-plan, eskalering, post-mortem, beredskap | PUBLISERINGS-agent | ✅ |
| EKS-022 | **BACKUP-ekspert** | 3-2-1-regel, disaster recovery, gjenoppretting | PUBLISERINGS-agent | ✅ |

### Research-baserte eksperter (Nye 2026)

> Lagt til basert på research av optimale agenter for vibe-coding og profesjonelle utviklingsprosjekter

| ID | Navn | Beskrivelse | Kalles av | Prioritet |
|----|------|-------------|-----------|-----------|
| EKS-023 | **AI-GOVERNANCE-ekspert** | AI-generert kode dokumentasjon, prompt-sporing, compliance | KVALITETSSIKRINGS-agent | 🔴 Høy |
| EKS-024 | **TEST-GENERATOR-ekspert** | Automatisk generering av unit/E2E-tester | MVP, ITERASJONS, KVALITETS-agent | 🔴 Høy |
| EKS-025 | **SELF-HEALING-TEST-ekspert** | Automatisk vedlikehold av testsuiter | ITERASJONS, KVALITETS-agent | 🟡 Medium |
| EKS-026 | **INFRASTRUKTUR-ekspert** | Kubernetes, cloud-native, IaC | MVP, PUBLISERINGS-agent | 🟡 Medium |
| EKS-027 | **DESIGN-TIL-KODE-ekspert** | Figma til React/Vue, design systems | MVP, ITERASJONS-agent | 🟡 Medium |
| EKS-028 | **PROMPT-INGENIØR-ekspert** | Prompt-validering, forbedring, bibliotek | Alle prosess-agenter | 🟢 Lav |
| EKS-029 | **MIGRASJON-ekspert** | Dependency-oppgradering, versjonsmigrering | ITERASJONS, PUBLISERINGS-agent | 🟢 Lav |
| EKS-030 | **SRE-ekspert** | Site Reliability, SLI/SLO, error budgets | PUBLISERINGS-agent | 🟢 Lav |

---

## Avhengighetsmatrise

### Hvem kaller hvem?

```
ORCHESTRATOR (SYS-001)
├── Alle prosess-agenter
├── Alle basis-agenter
└── CONTEXT-LOADER, AUTO-CLASSIFIER, PHASE-GATES

OPPSTART-agent (PRO-001)
├── PERSONA-ekspert (EKS-001)
├── LEAN-CANVAS-ekspert (EKS-002)
└── KONKURRANSEANALYSE-ekspert (EKS-003)

KRAV-agent (PRO-002)
├── PLANLEGGER-agent (BAS-001)
├── WIREFRAME-ekspert (EKS-004)
└── API-DESIGN-ekspert (EKS-005)

ARKITEKTUR-agent (PRO-003)
├── TRUSSELMODELLERINGS-ekspert (EKS-006)
├── DATAMODELL-ekspert (EKS-007)
└── API-DESIGN-ekspert (EKS-005)

MVP-agent (PRO-004)
├── BYGGER-agent (BAS-002)
├── SIKKERHETS-agent (BAS-004)
├── HEMMELIGHETSSJEKK-ekspert (EKS-008)
├── CICD-ekspert (EKS-009)
└── SUPPLY-CHAIN-ekspert (EKS-010)

ITERASJONS-agent (PRO-005)
├── PLANLEGGER-agent (BAS-001)
├── BYGGER-agent (BAS-002)
├── REVIEWER-agent (BAS-003)
├── SIKKERHETS-agent (BAS-004)
├── BRUKERTEST-ekspert (EKS-011)
├── YTELSE-ekspert (EKS-012)
├── UI/UX-ekspert (EKS-013)
└── REFAKTORING-ekspert (EKS-014)

KVALITETSSIKRINGS-agent (PRO-006)
├── DOKUMENTERER-agent (BAS-006)
├── OWASP-ekspert (EKS-015)
├── HEMMELIGHETSSJEKK-ekspert (EKS-008)
├── GDPR-ekspert (EKS-016)
├── TILGJENGELIGHETS-ekspert (EKS-017)
├── CROSS-BROWSER-ekspert (EKS-018)
├── LASTTEST-ekspert (EKS-019)
└── YTELSE-ekspert (EKS-012)

PUBLISERINGS-agent (PRO-007)
├── SIKKERHETS-agent (BAS-004)
├── DOKUMENTERER-agent (BAS-006)
├── CICD-ekspert (EKS-009)
├── MONITORING-ekspert (EKS-020)
├── INCIDENT-RESPONSE-ekspert (EKS-021)
├── BACKUP-ekspert (EKS-022)
└── REFAKTORING-ekspert (EKS-014)
```

---

## Byggerekkefølge

| Prioritet | Fase | Agenter | Estimert tid |
|-----------|------|---------|--------------|
| 1 | Fundament | SYS-001, SYS-005 | 2.5 timer |
| 2 | System-lag | SYS-002, SYS-003, SYS-004 | 3 timer (review) |
| 3 | Basis-lag | BAS-001 til BAS-006 | 9 timer |
| 4 | Prosess-lag | PRO-001 til PRO-007 | 16 timer |
| 5 | Ekspert (F1-3) | EKS-001 til EKS-007 | 8 timer |
| 6 | Ekspert (F4-5) | EKS-008 til EKS-014 | 9 timer |
| 7 | Ekspert (F6-7) | EKS-015 til EKS-022 | 10 timer |
| **8** | **Research (Høy)** | EKS-023, EKS-024 | 3 timer |
| **9** | **Research (Medium)** | EKS-025, EKS-026, EKS-027 | 4.5 timer |
| **10** | **Research (Lav)** | EKS-028, EKS-029, EKS-030 | 4.5 timer |

**Total estimert tid:** ~72 timer (oppdatert fra research)

---

## Tegnforklaring

| Symbol | Betydning |
|--------|-----------|
| 🟢 | Eksisterer (trenger review) |
| 🟡 | Under arbeid |
| 🔴 | Ikke startet |
| ✅ | Ny agent (planlagt) |

---

*Sist oppdatert: 2026-01-31 (Research-oppdatering v2.0)*
