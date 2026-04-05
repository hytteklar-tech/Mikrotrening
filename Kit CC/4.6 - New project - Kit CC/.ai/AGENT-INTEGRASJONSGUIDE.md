# Agent-Integrasjonsguide - .ai/ Infrastruktur

**Versjon:** 1.0  
**Dato:** 2026-02-04  
**Målgruppe:** Alle agenter i Kit CC

---

## Oversikt

Denne guiden forklarer hvordan agenter skal bruke .ai/ infrastrukturen for automatisk dokumentasjon og kontekst-bevaring.

---

## .ai/ Struktur

```
.ai/
├── PROJECT-STATE.json          # Prosjekt-state
├── SESSION-HANDOFF.md          # Session til session handoff
├── CONTEXT-SNAPSHOT.md         # Quick snapshot
├── CHECKPOINT-HISTORY/         # Checkpoints for rollback
│   └── checkpoint-YYYY-MM-DD-HH-MM.json
└── LOGS.jsonl                  # Structured logging
```

---

## 1. PROJECT-STATE.json

### Når Bruke:
- **AUTO-CLASSIFIER:** Oppdater ved klassifisering
- **ORCHESTRATOR:** Les ved boot, oppdater ved fase-endring
- **Prosess-agenter:** Oppdater ved fase-slutt

### Hvordan Oppdatere:

```python
import json
from datetime import datetime

# Les state
with open('.ai/PROJECT-STATE.json', 'r') as f:
    state = json.load(f)

# Oppdater state
state['currentPhase'] = 2
state['phaseProgress']['phase1']['status'] = 'completed'
state['phaseProgress']['phase1']['completedAt'] = datetime.now().isoformat()
state['lastActivity'] = datetime.now().isoformat()

# Legg til event i history
state['history']['events'].append({
    'type': 'PHASE_COMPLETE',
    'phase': 1,
    'timestamp': datetime.now().isoformat(),
    'agent': 'OPPSTART-agent',
    'details': 'Fase 1 fullført. Visjon og målgruppe definert.'
})

# Skriv tilbake
with open('.ai/PROJECT-STATE.json', 'w') as f:
    json.dump(state, f, indent=2, ensure_ascii=False)
```

### Viktige Felt:

```json
{
  "projectName": "TodoApp",
  "currentPhase": 1,
  "classification": {
    "intensityLevel": "STANDARD",
    "score": 45
  },
  "phaseProgress": {
    "phase1": {
      "status": "in_progress",
      "mode": "standard",
      "completedSteps": ["define-vision", "target-audience"],
      "startedAt": "2026-02-04T14:00:00Z"
    }
  },
  "history": {
    "events": [...]
  }
}
```

---

## 2. SESSION-HANDOFF.md

### Når Bruke:
- **Alle prosess-agenter:** Oppdater ved fase-slutt
- **ORCHESTRATOR:** Oppdater ved session-shutdown

### Template:

```markdown
# SESSION-HANDOFF

## PROSJEKTSTATUS
**Prosjektnavn:** TodoApp
**Fase:** 2 - Kravspesifikasjon
**Intensitetsnivå:** STANDARD

## HVA BLE GJORT
### Fullførte oppgaver
- [x] Definert brukerhistorier (5 stk)
- [x] Laget wireframes for hovedflyt
- [x] Definert MVP scope

### Filer som ble endret
- docs/FASE-2/brukerhistorier.md
- docs/FASE-2/wireframes/
- docs/FASE-2/mvp-definisjon.md

## NESTE STEG
### Foreslåtte handlinger
1. ARKITEKTUR-agent: Velg tech stack
2. ARKITEKTUR-agent: Design database
3. ARKITEKTUR-agent: Design API

### Pending tasks
- Bestem autentiseringsløsning

## KONTEKST FOR NESTE AGENT
**Siste aktive agent:** KRAV-agent

**Viktig kontekst:**
- Bruker ønsker mobile-first design
- MVP må være klart innen 4 uker
- Prioriter enkelhet over features

**Filer å lese:**
- docs/FASE-2/brukerhistorier.md
- docs/FASE-2/mvp-definisjon.md
```

### Oppdatering:

```bash
# Append til SESSION-HANDOFF.md
echo "
## UPDATE: $(date +%Y-%m-%d\ %H:%M)
**Agent:** KRAV-agent
**Action:** Fase 2 fullført
**Next:** Handoff til ARKITEKTUR-agent
" >> .ai/SESSION-HANDOFF.md
```

---

## 3. LOGS.jsonl

### Når Bruke:
- **Alle agenter:** Logg viktige events

### Format:

```jsonl
{"timestamp":"2026-02-04T14:30:00Z","level":"INFO","agent":"KRAV-agent","message":"Starter kravspesifikasjon","eventType":"PHASE_START"}
{"timestamp":"2026-02-04T14:35:00Z","level":"INFO","agent":"WIREFRAME-ekspert","message":"5 wireframes opprettet","eventType":"TASK_COMPLETE"}
{"timestamp":"2026-02-04T14:40:00Z","level":"WARN","agent":"KRAV-agent","message":"MVP scope er ambisiøst for timeline","eventType":"WARNING"}
{"timestamp":"2026-02-04T14:45:00Z","level":"INFO","agent":"KRAV-agent","message":"Fase 2 fullført","eventType":"PHASE_COMPLETE"}
```

### Python-eksempel:

```python
import json
from datetime import datetime

def log_event(level, agent, message, event_type, **kwargs):
    log_entry = {
        'timestamp': datetime.now().isoformat() + 'Z',
        'level': level,
        'agent': agent,
        'message': message,
        'eventType': event_type,
        **kwargs
    }
    
    with open('.ai/LOGS.jsonl', 'a') as f:
        f.write(json.dumps(log_entry, ensure_ascii=False) + '\n')

# Bruk:
log_event('INFO', 'KRAV-agent', 'Starter kravspesifikasjon', 'PHASE_START')
log_event('INFO', 'WIREFRAME-ekspert', '5 wireframes opprettet', 'TASK_COMPLETE', count=5)
```

---

## 4. CHECKPOINT-HISTORY/

### Når Bruke:
- **ORCHESTRATOR:** Opprett checkpoint ved hver fase-slutt
- **Prosess-agenter:** Opprett checkpoint ved kritiske punkter

### Opprette Checkpoint:

```python
import json
import shutil
from datetime import datetime

def create_checkpoint(phase, agent, description):
    timestamp = datetime.now().strftime('%Y-%m-%d-%H-%M-%S')
    checkpoint_name = f"checkpoint-phase{phase}-{timestamp}.json"
    
    # Kopier PROJECT-STATE.json
    checkpoint = {
        'createdAt': datetime.now().isoformat(),
        'phase': phase,
        'agent': agent,
        'description': description,
        'projectState': json.load(open('.ai/PROJECT-STATE.json')),
        'files': []  # Liste over viktige filer
    }
    
    with open(f'.ai/CHECKPOINT-HISTORY/{checkpoint_name}', 'w') as f:
        json.dump(checkpoint, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Checkpoint opprettet: {checkpoint_name}")

# Bruk:
create_checkpoint(2, 'KRAV-agent', 'Fase 2 fullført - krav definert')
```

---

## 5. CONTEXT-SNAPSHOT.md

### Når Bruke:
- **ORCHESTRATOR:** Oppdater hver time
- **Prosess-agenter:** Oppdater ved store endringer

### Quick Update:

```bash
cat > .ai/CONTEXT-SNAPSHOT.md << EOF
# CONTEXT SNAPSHOT

**Tidspunkt:** $(date)
**Fase:** 2 - Kravspesifikasjon
**Aktiv agent:** KRAV-agent

## Quick Facts
- **Prosjekt:** TodoApp
- **Status:** In progress
- **Neste:** Design database
- **Blokkere:** Ingen

## Siste 3 Events
1. [14:45] KRAV-agent: Fase 2 fullført
2. [14:40] WIREFRAME-ekspert: 5 wireframes laget
3. [14:30] KRAV-agent: Startet kravspesifikasjon
