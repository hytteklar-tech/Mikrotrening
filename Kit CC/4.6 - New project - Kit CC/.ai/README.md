# .ai/ - Kit CC Prosjekttilstand

> Denne mappen inneholder prosjektets tilstand og historikk.
> Oppdateres automatisk av Kit CC agenter.

---

## FILSTRUKTUR

```
.ai/
├── PROJECT-STATE.json       ← Strukturert prosjekttilstand (JSON)
├── SESSION-HANDOFF.md       ← Overlevering mellom sessions
├── CONTEXT-SNAPSHOT.md      ← Menneskelesbar oversikt
├── CHECKPOINT-HISTORY/      ← Lagringspunkter for rollback
│   └── (checkpoint filer opprettes her)
├── LOGS.jsonl              ← Structured logs (opprettes ved bruk)
└── README.md               ← Denne filen
```

---

## FILBESKRIVELSER

### PROJECT-STATE.json
**Formål:** Hovedfil for prosjekttilstand
**Format:** JSON
**Oppdateres av:** ORCHESTRATOR (via STATE-UPDATE-REQUEST)
**Leses av:** Alle agenter

**Inneholder:**
- `classification` - Intensitetsnivå og score
- `currentPhase` - Hvilken fase prosjektet er i (0-7)
- `phaseProgress` - Fremdrift per fase
- `pendingTasks` - Oppgaver som venter
- `completedTasks` - Fullførte oppgaver
- `lastActiveAgent` - Siste agent som jobbet
- `session` - Session status (active/completed)
- `history` - Unified history med alle events
- `agentHealth` - Helse-statistikk for agenter

**Kritisk:** Denne filen MÅ eksistere for at Kit CC skal fungere.

---

### SESSION-HANDOFF.md
**Formål:** Overlevering fra én chat-session til neste
**Format:** Markdown
**Oppdateres av:** ORCHESTRATOR ved shutdown
**Leses av:** ORCHESTRATOR ved boot

**Inneholder:**
- Hva som ble gjort i forrige session
- Filer som ble endret
- Neste steg og forslag
- Åpne spørsmål
- Kontekst for neste agent

**Bruk:** Gjør det mulig å gjenoppta arbeid etter at chat lukkes.

---

### CONTEXT-SNAPSHOT.md
**Formål:** Menneskelesbar oversikt over prosjektet
**Format:** Markdown
**Oppdateres av:** ORCHESTRATOR ved milestones
**Leses av:** Bruker og CONTEXT-LOADER

**Inneholder:**
- Overordnet status (fase, fremdrift, mål)
- Fremdrift per fase (visuell fremgang)
- Siste aktivitet
- Leveranser (dokumenter, kode, tester)
- Blokkerte oppgaver
- Åpne risikoer
- Neste milestones

**Bruk:** Gir rask oversikt uten å måtte parse JSON.

---

### CHECKPOINT-HISTORY/
**Formål:** Lagringspunkter for rollback
**Format:** JSON checkpoint-filer + Git commit hashes
**Oppdateres av:** ORCHESTRATOR ved phase-gates
**Leses av:** ORCHESTRATOR ved rollback

**Inneholder:**
- Checkpoint-filer navngitt: `YYYY-MM-DD-HH-MM-[fase]-[beskrivelse].json`
- Git commit hash for hver checkpoint
- Agent-state og kontekst
- Filiste som ble endret

**Bruk:** Gjør det mulig å rulle tilbake til tidligere tilstand.

---

### LOGS.jsonl (opprettes ved bruk)
**Formål:** Structured logging
**Format:** JSON Lines (hver linje er ett JSON-objekt)
**Oppdateres av:** Alle agenter
**Leses av:** Observability-verktøy, bruker

**Inneholder:**
- Timestamp
- Agent-navn
- Log-nivå (INFO/WARN/ERROR/DEBUG)
- Melding
- Kontekst (fase, task, etc)

**Bruk:** Sporing av alt som skjer i systemet.

---

## GIT OG VERSJONSKONTROLL

### Hva bør commites?

✅ **Alltid commit:**
- `PROJECT-STATE.json` - Prosjekttilstand
- `SESSION-HANDOFF.md` - Session-overlevering
- `CONTEXT-SNAPSHOT.md` - Menneskelesbar oversikt

⚠️ **Vurder å commite:**
- `CHECKPOINT-HISTORY/*` - Hvis du vil ha checkpoints i Git
  (Alternativ: Backupes lokalt, ikke i Git)

❌ **Ikke commit:**
- `LOGS.jsonl` - Blir for stor, lokal logging
- `*.tmp` - Midlertidige filer

### .gitignore anbefaling

```gitignore
# .ai/.gitignore
LOGS.jsonl
*.tmp
```

---

## VEDLIKEHOLD

### Automatisk opprydding
- ORCHESTRATOR sletter gamle checkpoints (>1 måned)
- Arkiverer gamle checkpoints til `CHECKPOINT-ARCHIVE/`
- Logger roteres ved 10MB størrelse

### Manuell opprydding
```bash
# Slett gamle checkpoints manuelt
rm .ai/CHECKPOINT-HISTORY/*.json

# Tøm logger
> .ai/LOGS.jsonl

# Reset tilstand (ADVARSEL: Mister all fremgang!)
rm .ai/PROJECT-STATE.json
# Systemet vil starte klassifisering på nytt
```

---

## SIKKERHET OG PERSONVERN

### Sensitiv data
- `.ai/` kan inneholde prosjektbeskrivelser og beslutninger
- Hvis prosjektet håndterer sensitiv data, vurder å:
  - Ekskludere `.ai/` fra Git (legg til i `.gitignore`)
  - Kryptere `.ai/` mappen
  - Backup lokalt i stedet for remote repository

### Backups
- Ta backup av `.ai/` før store endringer
- Backup før upgrade av Kit CC
- Vurder automatisk backup til sky-lagring

---

## FEILSØKING

### "PROJECT-STATE.json not found"
**Årsak:** Filen mangler eller er slettet
**Løsning:** AUTO-CLASSIFIER vil opprette ny fil ved neste start

### "Corrupted state"
**Årsak:** JSON-feil eller inkonsistent data
**Løsning:** ORCHESTRATOR vil tilby rollback til siste checkpoint

### "Session crashed"
**Årsak:** `session.status = "active"` men session er avsluttet
**Løsning:** ORCHESTRATOR vil oppdage dette og tilby recovery

---

## VERSJONERING

- **Schema versjon:** `3.0.0` (nåværende)
- **Kit CC versjon:** `1.0.0`
- **Format:** JSON Schema basert (se `Kit CC/klassifisering/PROJECT-STATE-SCHEMA.json`)

Ved oppgradering til ny Kit CC-versjon:
- ORCHESTRATOR vil migrere automatisk
- Gamle versjoner backupes til `CHECKPOINT-ARCHIVE/`

---

## REFERANSER

| Dokument | Relativ sti | Beskrivelse |
|----------|-------------|-------------|
| ORCHESTRATOR | `../Kit CC/agenter/system/agent-ORCHESTRATOR.md` | Koordinering |
| SYSTEM-PROTOCOL | `../Kit CC/agenter/system/protocol-SYSTEM-COMMUNICATION.md` | State-locking |
| CLAUDE.md | `../CLAUDE.md` | Boot-instruksjoner |

---

*Opprettet: 2026-02-04*
*Versjon: 1.0*
*Formål: Dokumentasjon av .ai/ struktur*
