# Hvordan prosjektet ditt husker ting

> En enkel forklaring av de tre historikk-systemene i Kit CC.

---

## OVERSIKT

Kit CC bruker tre forskjellige måter å huske hva som skjer i prosjektet ditt. De har ulike formål og utfyller hverandre.

| System | Enkelt forklart | Hva det husker |
|--------|-----------------|----------------|
| **Unified History** | Dagbok | Alt som skjer, automatisk |
| **Checkpoints** | Lagringspunkt | Sikkerhetskopier ved viktige milepæler |
| **Git** | "Angre"-knapp for kode | Alle endringer i koden din |

---

## FOR VIBEKODERE (IKKE-TEKNISK)

### Tenk på det som dette:

**Unified History = Dagbok**
- Skriver automatisk ned alt som skjer
- "I dag klassifiserte vi prosjektet som MINIMAL"
- "Vi fullførte fase 2 og gikk til fase 3"
- Du trenger ikke gjøre noe - det skjer automatisk

**Checkpoints = Lagringspunkt i et spill**
- Som å trykke "Save" i et dataspill
- Hvis noe går galt, kan du "laste" tilbake til lagringspunktet
- Lagres automatisk ved hver fase-overgang
- Du kan også lagre manuelt: "Lagre checkpoint nå"

**Git = "Angre"-knapp for kode**
- Husker alle endringer i koden
- Kan gå tilbake til hvilken som helst tidligere versjon
- Mest nyttig for utviklere

### Når bruker du hva?

| Spørsmål du har | Svar finner du i |
|-----------------|------------------|
| "Hva skjedde i dag?" | Unified History |
| "Kan vi gå tilbake til forrige versjon?" | Checkpoints |
| "Hvilken kode hadde vi før?" | Git |
| "Hvorfor tok vi den beslutningen?" | Unified History |
| "Systemet oppførte seg rart - hva skjedde?" | Unified History |

### Du trenger ikke forstå detaljene!

Alt dette skjer i bakgrunnen. Det viktigste for deg er:

1. **Si "Vis status"** for å se hvor du er i prosjektet
2. **Si "Vis alle checkpoints"** for å se lagringspunkter
3. **Si "Gå tilbake til [dato]"** hvis noe gikk galt

---

## FOR UTVIKLERE (TEKNISK)

### Unified History

Unified History er en event-log i `PROJECT-STATE.json` under `history.events[]`.

**Struktur:**
```json
{
  "history": {
    "events": [
      {
        "id": "evt-class-001",
        "timestamp": "2026-02-03T10:05:00Z",
        "type": "CLASSIFICATION",
        "phase": 0,
        "agent": "CLA",
        "data": { ... }
      }
    ]
  }
}
```

**Event-typer:**
| Type | Trigger | Logget av |
|------|---------|-----------|
| `SESSION_START` | Ny chat-sesjon starter | ORCHESTRATOR |
| `SESSION_END` | Chat-sesjon avsluttes | ORCHESTRATOR |
| `CLASSIFICATION` | Klassifisering (ny/re) | AUTO-CLASSIFIER |
| `GATE_RESULT` | Phase-gate validering | PHASE-GATES |
| `CHECKPOINT` | Checkpoint lagret | ORCHESTRATOR |
| `ERROR` | Feil oppstått | Alle agenter |
| `USER_OVERRIDE` | Bruker overstyrer beslutning | ORCHESTRATOR |
| `REGRESSION` | Kvalitetsregresjon oppdaget | PHASE-GATES |

**Fordeler:**
- Alt på ett sted
- Strukturert og søkbart
- Perfekt for debugging og audit

### Checkpoints

Checkpoints er state-snapshots lagret i `.ai/CHECKPOINT-HISTORY/`.

**Når lagres:**
- Automatisk ved hver fase-overgang (etter PASS gate)
- Manuelt via "Lagre checkpoint"

**Innhold:**
```json
{
  "checkpointId": "chk-phase2-20260203-1100",
  "timestamp": "2026-02-03T11:00:00Z",
  "phase": 2,
  "description": "Fase 2 fullført",
  "projectState": { ... },
  "gitCommitHash": "abc123...",
  "filesModified": ["src/App.jsx", "docs/PRD.md"]
}
```

**Rollback-prosess:**
1. Finn checkpoint: `history.events` med type `CHECKPOINT`
2. Last checkpoint-fil fra `.ai/CHECKPOINT-HISTORY/`
3. Gjenopprett `PROJECT-STATE.json`
4. Git reset til `gitCommitHash` (om ønsket)
5. Verifiser konsistens

### Git

Standard Git versjonskontroll for koden.

**Integrasjon med systemet:**
- ORCHESTRATOR committer ved fase-overgang
- Commit-meldinger følger format: `[Phase X] Beskrivelse`
- Checkpoint inkluderer `gitCommitHash` for synkronisering

**Anbefalte branching-strategi (for større prosjekter):**
```
main                    ← Produksjonsklar kode
└── develop             ← Aktiv utvikling
    └── feature/[navn]  ← Individuelle features
```

### Synkronisering mellom systemene

```
FASE-OVERGANG
    │
    ▼
PHASE-GATES: Validering → PASS
    │
    ├──► Git commit: "Phase 2 complete"
    │
    ├──► Checkpoint lagres med gitCommitHash
    │
    └──► Unified History: GATE_RESULT + CHECKPOINT events
```

**Ved rollback:**
```
BRUKER: "Gå tilbake til fase 2"
    │
    ▼
1. Finn checkpoint i history.events
2. Last checkpoint-fil
3. Gjenopprett PROJECT-STATE.json
4. (Valgfritt) git checkout [hash]
5. Logg USER_OVERRIDE event
```

---

## SAMMENLIGNING

| Aspekt | Unified History | Checkpoints | Git |
|--------|-----------------|-------------|-----|
| **Hva lagres** | Events/hendelser | Full tilstand | Kode-endringer |
| **Granularitet** | Høy (hver handling) | Middels (milepæler) | Høy (commits) |
| **Formål** | Audit/debugging | Recovery/rollback | Versjonskontroll |
| **Størrelse** | Liten (JSON events) | Medium (state + filer) | Variabel |
| **Rollback** | Nei (kun lesing) | Ja (full state) | Ja (kun kode) |
| **Brukersynlighet** | Via "Vis status" | Via "Vis checkpoints" | Via git log |

---

## PRAKTISKE EKSEMPLER

### Eksempel 1: Noe gikk galt i fase 4

**Situasjon:** Du bygget noe i fase 4, men det funker ikke.

**Løsning:**
```
Du: "Vis alle checkpoints"
System: "Du har checkpoints fra:
         - Fase 3 (2026-02-03 14:30)
         - Fase 2 (2026-02-03 11:00)"

Du: "Gå tilbake til fase 3"
System: "Sikker? Dette vil gjenopprette tilstanden fra 14:30.
         Kode skrevet etter dette kan gå tapt."

Du: "Ja"
System: "Rollback fullført. Du er nå i fase 3."
```

### Eksempel 2: Forstå hva som skjedde

**Situasjon:** Du lurer på hvorfor prosjektet ble klassifisert som STANDARD.

**Løsning:**
```
Du: "Vis klassifiseringshistorikk"
System: "Klassifiseringer:
         1. 2026-02-03 10:05 - MINIMAL (score 8)
         2. 2026-02-03 14:15 - STANDARD (score 16)
            Årsak: Sensitiv data detektert (personopplysninger)"
```

### Eksempel 3: Se hva som endret seg

**Situasjon:** Du vil vite hva som ble gjort mellom to checkpoints.

**Løsning:**
```
Du: "Sammenlign checkpoint fase 2 og fase 3"
System: "Endringer mellom fase 2 og fase 3:
         - Ny fil: src/components/LoginForm.jsx
         - Endret: src/App.jsx (added routing)
         - Klassifisering endret: MINIMAL → STANDARD
         - 3 tasks fullført"
```

---

## VEDLIKEHOLD

### Automatisk opprydding

- Checkpoints eldre enn 30 dager arkiveres
- Arkiverte checkpoints flyttes til `.ai/CHECKPOINT-ARCHIVE/`
- Maks 10 aktive checkpoints beholdes

### Manuell opprydding

```
Du: "Slett checkpoint fra 2026-01-15"
System: "Sikker? Dette kan ikke angres."
Du: "Ja"
System: "Checkpoint slettet."
```

---

*Versjon: 1.0.0*
*Opprettet: 2026-02-03*
*Formål: Forklare historikk-systemene for både vibekodere og utviklere*
