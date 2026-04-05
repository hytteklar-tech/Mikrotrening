# Handoff-Protokoll - Kit CC

**Versjon:** 2.0
**Dato:** 2026-02-08
**Formål:** Definere hvordan ORCHESTRATOR koordinerer overlevering mellom faser og agenter

> **KJERNEPRINSIPP:** Kun ORCHESTRATOR skriver til SESSION-HANDOFF.md og checkpoint-felter i PROJECT-STATE.json. Prosess-agenter signaliserer TASK_COMPLETE — ORCHESTRATOR håndterer all handoff-dokumentasjon.

---

## Oversikt

Handoff-protokollen sikrer smidig overgang mellom faser uten tap av kontekst eller informasjon. Den bygger på **orkestratorstyrt progressiv checkpoint** — ORCHESTRATOR oppdaterer PROJECT-STATE.json ved hvert agent-bytte, og skriver SESSION-HANDOFF.md kun ved session-avslutning.

### Crash-resiliens

Siden PROJECT-STATE.json oppdateres ved HVERT agent-bytte (som skjer hver 5-20 minutter), er worst-case datatap begrenset til arbeidet til siste agent. Ved neste session-start kan ORCHESTRATOR gjenoppta fra `lastCheckpoint`.

---

## Handoff-Prinsipper

### 1. Sentralisert Dokumentasjonsansvar
- **Kun ORCHESTRATOR** skriver checkpoint-data og SESSION-HANDOFF.md
- Prosess-agenter signaliserer TASK_COMPLETE med sin output
- ORCHESTRATOR samler og dokumenterer — ingen distribuert inkonsistens

### 2. Progressiv Checkpoint ved Agent-Bytte
- PROJECT-STATE.json oppdateres ved hvert agent-bytte (ikke hvert beslutningspunkt)
- Felter som oppdateres: `lastCheckpoint`, `completedTasks[]`, `pendingDecisions[]`, `phaseProgress`
- Append-only mønster: `completedTasks[]` vokser, `pendingDecisions[]` krymper

### 3. Validering Før Overlevering
- Kjør PHASE-GATES sjekk
- Bekreft alle exit criteria er oppfylt
- Valider BØR/KAN-sporing

---

## Handoff-Prosess

### Steg 1: Agent signaliserer fullført arbeid
```
PROSESS-AGENT signaliserer TASK_COMPLETE
    └─ Oppgir: hva ble gjort, filer endret, eventuelle blokkere
    └─ Prosess-agenten skriver IKKE til SESSION-HANDOFF.md
```

### Steg 2: ORCHESTRATOR kjører progressiv checkpoint
```
ORCHESTRATOR mottar TASK_COMPLETE
    │
    ├─ 1. Oppdater completedTasks[] med fullført oppgave
    ├─ 2. Oppdater lastCheckpoint:
    │      { "timestamp": "...", "agent": "AGENT-NAVN", "summary": "..." }
    ├─ 3. Oppdater pendingDecisions[] (fjern løste, legg til nye)
    ├─ 4. Oppdater phaseProgress for nåværende fase
    └─ 5. Lagre PROJECT-STATE.json
```

### Steg 3: Gate-sjekk (ved fasebytte)
```
HVIS agent-bytte er et fasebytte:
    │
    ├─ Valider BØR/KAN-sporing:
    │   ├─ Alle MÅ-oppgaver fullført eller blokkert
    │   ├─ Alle skippedSteps har begrunnelse
    │   └─ completedSteps inneholder alle utførte oppgaver
    │
    └─ Kall PHASE-GATES for nåværende fase:
        ├─ PASS → Fortsett til steg 4
        └─ FAIL → Presenter mangler, foreslå handling
```

### Steg 4: Aktiver neste agent
```
ORCHESTRATOR:
    │
    ├─ Velg neste agent basert på fase + pending tasks + brukerens intensjon
    ├─ Presenter handoff-melding til bruker
    └─ Aktiver neste agent med kontekst
```

---

## Handoff-Melding (intern)

Når ORCHESTRATOR overleverer mellom agenter:

```markdown
---HANDOFF---
Fra: [AGENT-NAVN]
Til: [NESTE-AGENT]
Kontekst:
  - Fullført: [liste over fullførte oppgaver]
  - Relevant: [nøkkelinformasjon neste agent trenger]
  - Filer endret: [liste]
  - Filer å lese: [prioritert liste]
Anbefaling: [konkret neste steg]
---END-HANDOFF---
```

**Merk:** Denne meldingen genereres av ORCHESTRATOR — ikke av prosess-agenten.

---

## SESSION-HANDOFF.md — Kun ved session-avslutning

SESSION-HANDOFF.md er en **menneskelesbar sesjonsoppsummering** for neste session. Den skrives **kun av ORCHESTRATOR** ved:
- Session-shutdown (bruker avslutter)
- Naturlig pause
- Circuit-breaker ABORT

PROJECT-STATE.json er den **strukturerte tilstanden** som alltid er oppdatert (ved hvert agent-bytte).

### Forskjellen:
| Fil | Hva | Hvem skriver | Når |
|-----|-----|--------------|-----|
| `PROJECT-STATE.json` | Strukturert tilstand | ORCHESTRATOR | Ved hvert agent-bytte |
| `SESSION-HANDOFF.md` | Lesbar oppsummering | ORCHESTRATOR | Ved session-avslutning |

---

## Fase-Overganger

### Fase 0 → Fase 1
**Fra:** AUTO-CLASSIFIER
**Til:** OPPSTART-agent
**Overleverer:** Intensitetsnivå, klassifisering

### Fase 1 → Fase 2
**Fra:** OPPSTART-agent
**Til:** KRAV-agent
**Overleverer:** Visjon, målgruppe, business case

### Fase 2 → Fase 3
**Fra:** KRAV-agent
**Til:** ARKITEKTUR-agent
**Overleverer:** Krav, wireframes, MVP-definisjon

### Fase 3 → Fase 4
**Fra:** ARKITEKTUR-agent
**Til:** MVP-agent
**Overleverer:** Tech stack, database design, API design

### Fase 4 → Fase 5
**Fra:** MVP-agent
**Til:** ITERASJONS-agent
**Overleverer:** Fungerende MVP, CI/CD pipeline, tests

### Fase 5 → Fase 6
**Fra:** ITERASJONS-agent
**Til:** KVALITETSSIKRINGS-agent
**Overleverer:** Feature-komplett app, all funksjonalitet

### Fase 6 → Fase 7
**Fra:** KVALITETSSIKRINGS-agent
**Til:** PUBLISERINGS-agent
**Overleverer:** Testet app, sikkerhet validert, compliance OK

---

## PHASE-GATES Integrasjon

Før fase-handoff kan skje:

```python
# Pseudo-kode
def kan_handoff(fase):
    gate_result = PHASE_GATES.validate(fase)

    if not gate_result.passed:
        return False, gate_result.issues

    return True, None
```

Hvis PHASE-GATES feiler:
1. Fiks issues
2. Kjør PHASE-GATES igjen
3. Først når PASS → handoff

---

## Feilhåndtering

### Hvis Agent Krasjer Midt i Arbeid

1. **PROJECT-STATE.json er allerede oppdatert** til siste agent-bytte
2. Neste session leser `lastCheckpoint` og gjenopptar derfra
3. Worst-case tap: arbeidet til siste agent (5-20 minutter)

### Hvis Neste Fase Ikke Kan Starte

1. **Manglende informasjon**
   - ORCHESTRATOR eskalerer til bruker
   - Oppdater pendingDecisions[] med hva som mangler
   - Re-handoff når informasjon er tilgjengelig

2. **Blokkere oppdaget**
   - Logg i PROJECT-STATE.json (pendingTasks[] med status awaiting_user_input)
   - Varsle bruker
   - Løs blokkere før fortsettelse

3. **Kvalitet ikke OK**
   - Returner til forrige fase
   - REVIEWER-agent evaluerer
   - Fix issues
   - Re-handoff

---

## Automatisering

```python
# ORCHESTRATOR progressiv checkpoint ved agent-bytte
class CheckpointManager:
    def on_agent_complete(self, agent, result):
        # 1. Oppdater completedTasks
        self.state["completedTasks"].append({
            "id": result.task_id,
            "description": result.description,
            "completedAt": datetime.now().isoformat()
        })

        # 2. Oppdater lastCheckpoint
        self.state["lastCheckpoint"] = {
            "timestamp": datetime.now().isoformat(),
            "agent": agent.name,
            "summary": result.summary
        }

        # 3. Oppdater pendingDecisions
        self.state["pendingDecisions"] = [
            d for d in self.state["pendingDecisions"]
            if d["id"] not in result.resolved_decisions
        ]

        # 4. Lagre PROJECT-STATE.json
        self.save_state()

        # 5. Velg neste agent
        return self.select_next_agent()
```

---

## Eksempel: Komplett Handoff med Progressiv Checkpoint

```
[FASE 3: ARKITEKTUR] → [FASE 4: MVP]

1. ARKITEKTUR-agent signaliserer TASK_COMPLETE
   └─ "Tech stack valgt, database designet, API komplett"

2. ORCHESTRATOR kjører PROGRESSIV CHECKPOINT:
   └─ completedTasks[] += "Arkitektur komplett"
   └─ lastCheckpoint = { agent: "ARKITEKTUR", summary: "Fase 3 fullført" }
   └─ pendingDecisions[] -= løste beslutninger
   └─ PROJECT-STATE.json lagret ✓

3. ORCHESTRATOR kjører PHASE-GATES:
   └─ Validerer exit criteria for Fase 3
   └─ PASS ✓

4. ORCHESTRATOR oppdaterer fasetilstand:
   └─ phaseProgress.phase3.status = "completed"
   └─ currentPhase = 4

5. ORCHESTRATOR aktiverer MVP-agent:
   └─ Genererer HANDOFF-melding med kontekst
   └─ MVP-agent leser SESSION-HANDOFF.md + PROJECT-STATE.json
   └─ MVP-agent starter Fase 4

✅ Handoff Komplett
   └─ Alle data persistert i PROJECT-STATE.json
   └─ Ved crash: neste session gjenopptar fra lastCheckpoint
```

---

*Protokoll versjon: 2.0*
*Sist oppdatert: 2026-02-08*
*Endret fra v1.0: Sentralisert dokumentasjonsansvar til ORCHESTRATOR. Lagt til progressiv checkpoint. Fjernet instruksjoner om at agenter skriver til SESSION-HANDOFF.md.*
