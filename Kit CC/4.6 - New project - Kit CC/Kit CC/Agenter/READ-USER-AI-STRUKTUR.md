# Agent-systemets struktur

> Hvordan nivåene og agentene forholder seg til hverandre

---

## Oversiktsbilde

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BRUKER                                       │
│                    "Hjelp meg bygge en app"                          │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  NIVÅ 0: SYSTEM                                                      │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐                 │
│  │ ORCHESTRATOR│◄─┤CONTEXT-LOADER│  │AUTO-CLASSIF.│                 │
│  │  (hjernen)  │  └──────────────┘  └─────────────┘                 │
│  └──────┬──────┘  ┌──────────────┐  ┌─────────────┐                 │
│         │         │ PHASE-GATES  │  │AGENT-PROTOCOL│                │
│         │         └──────────────┘  └─────────────┘                 │
└─────────┼───────────────────────────────────────────────────────────┘
          │
          │ "Du er i Fase 4, bruk MVP-agent"
          ▼
┌─────────────────────────────────────────────────────────────────────┐
│  NIVÅ 2: PROSESS (én aktiv om gangen)                                │
│                                                                      │
│  ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐                  │
│  │OPPSTART│ → │  KRAV  │ → │ARKITEK.│ → │  MVP   │ → ...            │
│  │ Fase 1 │   │ Fase 2 │   │ Fase 3 │   │ Fase 4 │                  │
│  └────────┘   └────────┘   └────────┘   └───┬────┘                  │
│                                              │                       │
└──────────────────────────────────────────────┼──────────────────────┘
                                               │
          ┌────────────────────────────────────┼────────────────┐
          │                                    │                │
          ▼                                    ▼                ▼
┌─────────────────────┐          ┌─────────────────────────────────────┐
│  NIVÅ 1: BASIS      │          │  NIVÅ 3: EKSPERT                     │
│  (verktøykasse)     │          │  (spesialister)                      │
│                     │          │                                      │
│  ┌────────┐         │          │  ┌────────────┐  ┌────────────┐     │
│  │PLANLEGG│         │          │  │HEMMELIG-   │  │  CI/CD     │     │
│  └────────┘         │          │  │SJEKK       │  │            │     │
│  ┌────────┐         │          │  └────────────┘  └────────────┘     │
│  │ BYGGER │         │          │  ┌────────────┐  ┌────────────┐     │
│  └────────┘         │          │  │SUPPLY-CHAIN│  │    ...     │     │
│  ┌────────┐         │          │  └────────────┘  └────────────┘     │
│  │REVIEWER│         │          │                                      │
│  └────────┘         │          │                                      │
│     ...             │          │                                      │
└─────────────────────┘          └─────────────────────────────────────┘
```

---

## Nivå 0: SYSTEM - Infrastruktur

**Rolle:** Usynlig infrastruktur som får alt til å fungere

| Agent | Rolle | Analogi |
|-------|-------|---------|
| **ORCHESTRATOR** | Bestemmer hvem som skal gjøre hva | Dirigent i orkester |
| **CONTEXT-LOADER** | Husker prosjektet mellom sesjoner | Hukommelse |
| **AUTO-CLASSIFIER** | Bestemmer prosjekttype og krav | Triage-sykepleier |
| **PHASE-GATES** | Stopper hvis kvalitet ikke er god nok | Kvalitetskontroll |
| **AGENT-PROTOCOL** | Regler for hvordan agenter snakker sammen | Grammatikk |

**Når aktiv:** Alltid i bakgrunnen - brukeren ser dem ikke

```
Bruker: "Jeg vil bygge en app"
        ↓
CONTEXT-LOADER: Laster CLAUDE.md, tidligere beslutninger
AUTO-CLASSIFIER: "Dette er et kundevendt prosjekt"
ORCHESTRATOR: "Du er i Fase 1 → aktiverer OPPSTART-agent"
```

---

## Nivå 1: BASIS - Verktøykasse

**Rolle:** Tverrfaglige verktøy som brukes i mange faser

| Agent | Brukes når | Brukes av |
|-------|-----------|-----------|
| **PLANLEGGER** | Ny feature skal designes | Alle prosess-agenter |
| **BYGGER** | Kode skal skrives | MVP, ITERASJON |
| **REVIEWER** | Kode skal kvalitetssjekkes | ITERASJON, KVALITET |
| **SIKKERHETS** | Sikkerhet skal vurderes | MVP, ITERASJON, KVALITET, PUBLISERING |
| **DEBUGGER** | Noe er feil | Alle (ved behov) |
| **DOKUMENTERER** | Docs skal skrives/oppdateres | KVALITET, PUBLISERING |

**Når aktiv:** Når prosess-agent trenger dem

```
MVP-agent jobber...
        ↓
"Nå skal vi bygge auth-systemet"
        ↓
MVP-agent → kaller BYGGER-agent
        ↓
BYGGER-agent bygger i 3 stages: UI → Funksjon → Sikkerhet
        ↓
MVP-agent → kaller SIKKERHETS-agent for review
        ↓
Tilbake til MVP-agent
```

---

## Nivå 2: PROSESS - Fase-koordinatorer

**Rolle:** Én agent per fase som koordinerer alt arbeid i den fasen

| Agent | Fase | Ansvar |
|-------|------|--------|
| **OPPSTART** | 1 | Idé, visjon, risikovurdering, Go/No-Go |
| **KRAV** | 2 | Brukerhistorier, sikkerhetskrav, MVP-definisjon |
| **ARKITEKTUR** | 3 | Tech stack, database, API, trusselmodell |
| **MVP** | 4 | Prosjektoppsett, Git, CI/CD, første prototype |
| **ITERASJON** | 5 | Feature-utvikling, polering, brukervalidering |
| **KVALITETSSIKRING** | 6 | Testing, sikkerhet, compliance, tilgjengelighet |
| **PUBLISERING** | 7 | Deploy, monitoring, vedlikehold |

**Regel:** Kun ÉN prosess-agent aktiv om gangen

```
Fase 4 er aktiv
        ↓
MVP-agent koordinerer:
├── Kaller BYGGER-agent for implementering
├── Kaller HEMMELIGHETSSJEKK-ekspert for secrets
├── Kaller CICD-ekspert for pipeline
├── Kaller SIKKERHETS-agent for review
└── Når ferdig → PHASE-GATES validerer → Fase 5
```

---

## Nivå 3: EKSPERT - Spesialister

**Rolle:** Dyp ekspertise på et smalt område - kalles ved behov

### Hvordan eksperter organiseres

```
PROSESS-AGENT (koordinator)
        │
        ├── Kaller BASIS-agenter (generelle verktøy)
        │   └── BYGGER, REVIEWER, SIKKERHETS, etc.
        │
        └── Kaller EKSPERT-agenter (spesialister)
            └── OWASP, GDPR, HEMMELIGHETSSJEKK, etc.
```

### Ekspert-agenter per fase

| Fase | Prosess-agent | Kaller disse eksperter |
|------|---------------|------------------------|
| 1 | OPPSTART | PERSONA, LEAN-CANVAS, KONKURRANSEANALYSE |
| 2 | KRAV | WIREFRAME, API-DESIGN |
| 3 | ARKITEKTUR | TRUSSELMODELLERING, DATAMODELL, API-DESIGN |
| 4 | MVP | HEMMELIGHETSSJEKK, CI/CD, SUPPLY-CHAIN, TEST-GENERATOR, INFRASTRUKTUR, DESIGN-TIL-KODE |
| 5 | ITERASJON | BRUKERTEST, YTELSE, UI/UX, REFAKTORING, TEST-GENERATOR, SELF-HEALING-TEST, DESIGN-TIL-KODE, MIGRASJON |
| 6 | KVALITETSSIKRING | OWASP, GDPR, TILGJENGELIGHET, CROSS-BROWSER, LASTTEST, YTELSE, AI-GOVERNANCE, TEST-GENERATOR, SELF-HEALING-TEST |
| 7 | PUBLISERING | CI/CD, MONITORING, INCIDENT-RESPONSE, BACKUP, REFAKTORING, INFRASTRUKTUR, MIGRASJON, SRE |

---

## Kommunikasjonsflyt

### Vertikal kommunikasjon (opp/ned)

```
ORCHESTRATOR (bestemmer retning)
      │
      ▼
PROSESS-AGENT (koordinerer fasen)
      │
      ├──▶ BASIS-AGENT (utfører arbeid)
      │         │
      │         └──▶ Returnerer resultat
      │
      └──▶ EKSPERT-AGENT (spesialist-arbeid)
                │
                └──▶ Returnerer resultat
```

### Horisontal kommunikasjon (mellom agenter på samme nivå)

**Generelt:** Agenter på samme nivå kommuniserer IKKE direkte

```
❌ BYGGER-agent → REVIEWER-agent (direkte)
✅ BYGGER-agent → PROSESS-agent → REVIEWER-agent (via koordinator)
```

**Unntak:** BASIS-agenter kan referere til hverandres output

```
BYGGER-agent: "Jeg har bygd auth-systemet"
REVIEWER-agent: "Jeg reviewer koden BYGGER lagde"
        ↑
        └── Begge koordinert av PROSESS-agent
```

---

## Ansvarsfordeling

### Hvem bestemmer HVA som skal gjøres?

| Nivå | Bestemmer |
|------|-----------|
| **Bruker** | Overordnet mål ("bygg en app") |
| **ORCHESTRATOR** | Hvilken fase/prosess-agent |
| **PROSESS-agent** | Hvilke oppgaver i fasen, hvilke agenter trengs |
| **BASIS/EKSPERT** | Hvordan oppgaven utføres |

### Hvem bestemmer HVORDAN det gjøres?

| Agent-type | Frihet |
|------------|--------|
| **PROSESS** | Følger fase-oppgaver, men velger rekkefølge |
| **BASIS** | Følger beste praksis for sin disiplin |
| **EKSPERT** | Full frihet innen sitt ekspertområde |

---

## Eksempel: Komplett flyt

**Bruker:** "Jeg vil bygge en todo-app med innlogging"

```
1. ORCHESTRATOR
   └── "Nytt prosjekt → start i Fase 1"

2. CONTEXT-LOADER
   └── Laster CLAUDE.md (hvis finnes)

3. AUTO-CLASSIFIER
   └── Stiller spørsmål → "Kundevendt MVP"

4. OPPSTART-agent (Fase 1)
   ├── Kaller PERSONA-ekspert → lager persona
   ├── Kaller LEAN-CANVAS-ekspert → forretningsmodell
   └── Gjennomfører Go/No-Go → "GO"

5. PHASE-GATES
   └── Validerer Fase 1 komplett → åpner Fase 2

6. KRAV-agent (Fase 2)
   ├── Lager brukerhistorier
   ├── Kaller WIREFRAME-ekspert → UI-skisser
   └── Definerer MVP (MoSCoW)

7. PHASE-GATES → Fase 3

8. ARKITEKTUR-agent (Fase 3)
   ├── Velger stack: Next.js + Supabase
   ├── Kaller DATAMODELL-ekspert → database-design
   ├── Kaller TRUSSELMODELLERINGS-ekspert → STRIDE
   └── Dokumenterer i teknisk-spec.md

9. PHASE-GATES → Fase 4

10. MVP-agent (Fase 4)
    ├── Setter opp prosjekt
    ├── Kaller CICD-ekspert → GitHub Actions
    ├── Kaller HEMMELIGHETSSJEKK-ekspert → .env-oppsett
    ├── Kaller BYGGER-agent → bygger auth
    │   └── BYGGER: UI → Funksjon → Sikkerhet
    ├── Kaller SIKKERHETS-agent → review
    └── Deployer til staging

11. PHASE-GATES → Fase 5

... og så videre til Fase 7 og lansering
```

---

## Sikkerhetsstruktur

### Hierarkiet for sikkerhet

```
SIKKERHETS-agent (BAS-004) - Generalist, daglig bruk
└── Kaller eksperter ved behov:
    ├── OWASP-ekspert (EKS-015) - OWASP Top 10 testing
    ├── HEMMELIGHETSSJEKK-ekspert (EKS-008) - Secrets scanning
    ├── TRUSSELMODELLERINGS-ekspert (EKS-006) - STRIDE/DREAD
    └── SUPPLY-CHAIN-ekspert (EKS-010) - Dependencies

KVALITETSSIKRINGS-agent (PRO-006) - Compliance-koordinering
└── Kaller compliance-eksperter:
    ├── GDPR-ekspert (EKS-016) - Personvern
    └── TILGJENGELIGHETS-ekspert (EKS-017) - WCAG
```

**Viktig:** GDPR og Tilgjengelighet er **compliance**, ikke sikkerhet. De koordineres av KVALITETSSIKRINGS-agent, ikke SIKKERHETS-agent.

---

## Oppsummering

| Nivå | Antall | Rolle | Analogi |
|------|--------|-------|---------|
| **0: System** | 5 | Infrastruktur, koordinering | Operativsystem |
| **1: Basis** | 7 | Generelle verktøy | Verktøykasse |
| **2: Prosess** | 7 | Fase-koordinering | Prosjektleder |
| **3: Ekspert** | 31 | Spesialistkompetanse | Konsulenter |

**Hovedprinsipp:**
- Prosess-agenter **koordinerer**
- Basis-agenter **utfører** generelt arbeid
- Ekspert-agenter **utfører** spesialist-arbeid
- System-agenter **muliggjør** alt

---

*Sist oppdatert: 2026-01-31*
