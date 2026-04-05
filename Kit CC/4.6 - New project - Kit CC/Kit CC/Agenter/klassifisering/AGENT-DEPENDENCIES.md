# AGENT-DEPENDENCIES v1.0

> Komplett oversikt over agent-avhengigheter i Kit CC.

---

## FORMÅL

Dokumenterer:
- Hvilke agenter som avhenger av hvilke
- Informasjonsflyt mellom agenter
- Kritiske avhengighetskjeder
- Fallback-strategier

---

## AVHENGIGHETS-TYPER

| Type | Symbol | Beskrivelse |
|------|--------|-------------|
| HARD | → | Mottaker KAN IKKE kjøre uten avsender |
| SOFT | ⇢ | Mottaker KAN kjøre, men fungerer bedre med avsender |
| INFO | ⋯> | Mottaker leser informasjon fra avsender |
| SIGNAL | ⟶ | Avsender signaliserer til mottaker |

---

## SYSTEM-AVHENGIGHETER (Nivå 0)

```
┌─────────────────────────────────────────────────────────────────┐
│                     SYSTEM-AGENT AVHENGIGHETER                   │
└─────────────────────────────────────────────────────────────────┘

                    ┌─────────────────┐
                    │   ORCHESTRATOR  │
                    │   (Sentral hub) │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ AUTO-CLASSIFIER │ │ CONTEXT-LOADER  │ │  PHASE-GATES    │
│                 │ │                 │ │                 │
│ → ORCHESTRATOR  │ │ → ORCHESTRATOR  │ │ → ORCHESTRATOR  │
│ ⋯> PROJECT-STATE│ │ ⋯> PROJECT-STATE│ │ ⋯> PROJECT-STATE│
└─────────────────┘ └─────────────────┘ └─────────────────┘
         │                   │                   │
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ AGENT-PROTOCOL  │
                    │ (Referanse)     │
                    │                 │
                    │ ⋯> Alle agenter │
                    └─────────────────┘
```

### Detaljert avhengighetstabell

| Agent | Avhenger av (HARD) | Avhenger av (SOFT) | Leser fra |
|-------|--------------------|--------------------|-----------|
| ORCHESTRATOR | Ingen | PHASE-GATES | PROJECT-STATE, SESSION-HANDOFF |
| AUTO-CLASSIFIER | ORCHESTRATOR | Ingen | PROJECT-STATE |
| CONTEXT-LOADER | ORCHESTRATOR | Ingen | PROJECT-STATE, alle filer |
| PHASE-GATES | ORCHESTRATOR | Ingen | PROJECT-STATE, leveranser |
| AGENT-PROTOCOL | Ingen | Ingen | Ingen (er referanse) |

---

## PROSESS-AVHENGIGHETER (Nivå 2)

```
┌─────────────────────────────────────────────────────────────────┐
│                    PROSESS-AGENT AVHENGIGHETER                   │
└─────────────────────────────────────────────────────────────────┘

ORCHESTRATOR
     │
     │ → (HARD: aktiveringssignal)
     │
     ▼
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ OPPSTART │ → │   KRAV   │ → │ARKITEKTUR│ → │   MVP    │
│  (Fase 1)│    │ (Fase 2) │    │ (Fase 3) │    │ (Fase 4) │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                     │
     ┌───────────────────────────────────────────────┘
     │
     ▼
┌──────────┐    ┌──────────┐    ┌──────────┐
│ITERASJON│ → │  KVALITET │ → │PUBLISERING│
│ (Fase 5) │    │ (Fase 6) │    │ (Fase 7) │
└──────────┘    └──────────┘    └──────────┘
```

### Informasjonsflyt mellom faser

| Fra fase | Til fase | Kritisk informasjon |
|----------|----------|---------------------|
| 1 OPPSTART | 2 KRAV | Personas, visjon, risikoregister |
| 2 KRAV | 3 ARKITEKTUR | User stories, PRD, sikkerhetskrav |
| 3 ARKITEKTUR | 4 MVP | Tech-stack, database-schema, API-design |
| 4 MVP | 5 ITERASJON | Fungerende prototype, test-resultater |
| 5 ITERASJON | 6 KVALITET | Feature-complete kodebase |
| 6 KVALITET | 7 PUBLISERING | Validert kodebase, compliance-docs |

---

## BASIS-AVHENGIGHETER (Nivå 1)

```
┌─────────────────────────────────────────────────────────────────┐
│                     BASIS-AGENT AVHENGIGHETER                    │
└─────────────────────────────────────────────────────────────────┘

                    PROSESS-AGENT
                    (Kaller)
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │ BYGGER  │    │DEBUGGER │    │DOKUMEN- │
    │         │    │         │    │ TERER   │
    └─────────┘    └─────────┘    └─────────┘
         │               │               │
         │ ⇢            │ ⇢            │ ⋯>
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │REVIEWER │    │SIKKERHETS│   │PLANLEGGER│
    │         │    │         │    │         │
    └─────────┘    └─────────┘    └─────────┘
```

### Basis-agent avhengighetsmatrise

| Agent | HARD avhengighet | SOFT avhengighet | Kommuniserer med |
|-------|------------------|------------------|------------------|
| BYGGER | PROSESS-agent | REVIEWER, SIKKERHETS | Alle |
| DEBUGGER | PROSESS-agent | BYGGER | BYGGER, REVIEWER |
| DOKUMENTERER | PROSESS-agent | Alle | Alle |
| PLANLEGGER | PROSESS-agent | Ingen | DOKUMENTERER |
| REVIEWER | PROSESS-agent | BYGGER | BYGGER, SIKKERHETS |
| SIKKERHETS | PROSESS-agent | Ingen | BYGGER, REVIEWER |
| VEILEDER | Ingen (read-only) | Ingen | Ingen (kalles av CLAUDE.md boot steg 0) |

---

## SYSTEM-AVHENGIGHETER (Tillegg)

### BROWNFIELD-SCANNER

| Agent | HARD avhengighet | SOFT avhengighet | Kommuniserer med |
|-------|------------------|------------------|------------------|
| BROWNFIELD-SCANNER | AUTO-CLASSIFIER | Ingen | AUTO-CLASSIFIER (kalles fra steg 2) |

---

## EKSPERT-AVHENGIGHETER (Nivå 3)

### Fase 1 eksperter

| Ekspert | Avhenger av | Leverer til |
|---------|-------------|-------------|
| PERSONA-ekspert | OPPSTART-agent | KRAV-agent (via OPPSTART) |
| LEAN-CANVAS-ekspert | OPPSTART-agent, PERSONA | KRAV-agent |
| KONKURRANSEANALYSE-ekspert | OPPSTART-agent, PERSONA | KRAV-agent |

### Fase 3-4 eksperter

| Ekspert | Avhenger av | Leverer til |
|---------|-------------|-------------|
| DATAMODELL-ekspert | ARKITEKTUR-agent | MVP-agent |
| TRUSSELMODELLERINGS-ekspert | ARKITEKTUR-agent, SIKKERHETS | MVP-agent |
| HEMMELIGHETSSJEKK-ekspert | MVP-agent | KVALITETSSIKRINGS-agent |
| CICD-ekspert | MVP-agent | PUBLISERINGS-agent |
| SUPPLY-CHAIN-ekspert | MVP-agent | KVALITETSSIKRINGS-agent |

### Fase 4-5 eksperter (tillegg)

| Ekspert | Avhenger av | Leverer til |
|---------|-------------|-------------|
| CODE-QUALITY-GATE-ekspert | Ingen (selvstendig) | MVP-agent, ITERASJONS-agent |
| TESTSKRIVER-ekspert | BYGGER-agent output | MVP-agent, ITERASJONS-agent, KVALITETSSIKRINGS-agent |
| GORGEOUS-UI-ekspert | MVP-agent (Steg 3B), BYGGER-agent | MVP-agent (MVP-00, MVP-10), ITERASJONS-agent (ITR-10) |

### Fase 6-7 eksperter

| Ekspert | Avhenger av | Leverer til |
|---------|-------------|-------------|
| OWASP-ekspert | KVALITETSSIKRINGS-agent | PUBLISERINGS-agent |
| GDPR-ekspert | KVALITETSSIKRINGS-agent | PUBLISERINGS-agent |
| MONITORING-ekspert | PUBLISERINGS-agent | Produksjon |
| BACKUP-ekspert | PUBLISERINGS-agent | Produksjon |
| SRE-ekspert | PUBLISERINGS-agent | Produksjon (SLI/SLO) |

---

## KRITISKE AVHENGIGHETSKJEDER

### Kjede 1: Sikkerhetskritisk

```
SIKKERHETS-agent
      │
      ▼
TRUSSELMODELLERINGS-ekspert
      │
      ▼
HEMMELIGHETSSJEKK-ekspert
      │
      ▼
OWASP-ekspert
      │
      ▼
Produksjon
```

**Konsekvens ved brudd:** Sikkerhetssårbarheter i produksjon

### Kjede 2: Datakritisk

```
DATAMODELL-ekspert
      │
      ▼
BYGGER-agent (database-migrering)
      │
      ▼
GDPR-ekspert
      │
      ▼
BACKUP-ekspert
      │
      ▼
Produksjon
```

**Konsekvens ved brudd:** Datatap eller compliance-brudd

### Kjede 3: Deploy-kritisk

```
BYGGER-agent
      │
      ▼
TEST-GENERATOR-ekspert
      │
      ▼
CICD-ekspert
      │
      ▼
MONITORING-ekspert
      │
      ▼
Produksjon
```

**Konsekvens ved brudd:** Ustabil deployment

---

## FALLBACK-STRATEGIER

### Når avhengighet feiler

| Avhengighet-type | Strategi |
|------------------|----------|
| HARD | STOPP - Kan ikke fortsette uten |
| SOFT | FORTSETT med advarsel |
| INFO | FORTSETT - bruk default/cache |
| SIGNAL | RETRY med backoff |

### Spesifikke fallbacks

| Mangler | Fallback |
|---------|----------|
| PERSONA-ekspert | OPPSTART-agent lager forenklet persona |
| TRUSSELMODELLERINGS-ekspert | SIKKERHETS-agent gjør basis STRIDE |
| CICD-ekspert | Manuell deployment |
| MONITORING-ekspert | Basis logging |

---

## AVHENGIGHETS-VALIDERING

### Før fase-start

```
1. Identifiser alle HARD avhengigheter for fasen
2. Verifiser at alle er tilgjengelige
3. HVIS mangler:
   └─ Vis manglende avhengigheter
   └─ Foreslå løsning
   └─ STOPP til løst

4. Identifiser alle SOFT avhengigheter
5. Logg advarsler for manglende
6. Fortsett
```

### Eksempel-output

```markdown
## AVHENGIGHETSSJEKK - FASE 4

HARD AVHENGIGHETER:
✓ ARKITEKTUR-agent output tilgjengelig
✓ tech-stack-decision.md eksisterer
✓ database-schema.sql eksisterer
✓ api-architecture.md eksisterer

SOFT AVHENGIGHETER:
✓ REVIEWER-agent tilgjengelig
⚠ CICD-ekspert: Krever GitHub Actions setup

INFO AVHENGIGHETER:
✓ PROJECT-STATE.json lesbar
✓ SESSION-HANDOFF.md lesbar

RESULTAT: KLAR TIL START (1 advarsel)
```

---

## SIRKULÆR AVHENGIGHETS-SJEKK

### Forbudte sykluser

```
❌ Agent A → Agent B → Agent A (direkte syklus)
❌ Fase N → Fase N-1 (tilbakegående fasehopp)
❌ EKSPERT → PROSESS → EKSPERT (hierarki-brudd)
```

### Tillatte mønstre

```
✓ PROSESS → BASIS → EKSPERT (nedover)
✓ EKSPERT → (info) → EKSPERT (info-flyt, ikke kall)
✓ Fase N → (rollback) → Fase N-1 (eksplisitt rollback)
```

---

## VERSJONSKONTROLL

| Felt | Verdi |
|------|-------|
| Versjon | 1.0.0 |
| Opprettet | 2026-02-05 |
| Sist oppdatert | 2026-02-05 |

---

*Relatert:*
- `CALLING-REGISTRY.md` - Hvem kaller hvem
- `ARCHITECTURE-DIAGRAM.md` - Visuell arkitektur
- `../agenter/system/agent-ORCHESTRATOR.md` - Koordinering
