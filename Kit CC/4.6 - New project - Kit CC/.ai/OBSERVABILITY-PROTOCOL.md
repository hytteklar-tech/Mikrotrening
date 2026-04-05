# OBSERVABILITY-PROTOCOL v1.0

> Terminal-basert logging og synlighet for Kit CC.
> Structured logging til LOGS.jsonl + real-time terminal output.

---

## FORMÅL

Dette dokumentet definerer:
1. Structured logging til `.ai/LOGS.jsonl` (JSON Lines format)
2. Terminal output format (for bruker)
3. Log-nivåer (DEBUG, INFO, WARN, ERROR, CRITICAL)
4. Integrasjon med ORCHESTRATOR og alle agenter
5. Log rotation og cleanup

**Viktig:** Dette er terminal-first approach. Ingen GUI ennå.

---

## ARKITEKTUR

### To output-kanaler

```
AGENT
  │
  ├─→ LOGS.jsonl (structured, persistent)
  │   └─ For analyse, debugging, audit
  │
  └─→ Terminal (human-readable, real-time)
      └─ For bruker å følge med
```

### Prinsipp: Dual logging

**LOGS.jsonl:**
- Strukturert JSON (én linje per event)
- All informasjon (DEBUG til CRITICAL)
- Persistent (roteres ved 10MB)
- Maskinlesbar

**Terminal:**
- Menneskelesbar
- Kun INFO og høyere (ikke DEBUG)
- Real-time
- Formatert med farger og emojis

---

## 1. LOGS.jsonl FORMAT

### JSON Lines (JSONL)

Hver linje er ett komplett JSON-objekt:

```jsonl
{"timestamp":"2026-02-04T14:30:00.123Z","level":"INFO","agent":"ORCHESTRATOR","message":"Session started","eventType":"SESSION_START"}
{"timestamp":"2026-02-04T14:30:05.456Z","level":"INFO","agent":"BYGGER","message":"Write access granted to BYGGER for src/app.py","eventType":"WRITE_ACCESS_GRANTED"}
{"timestamp":"2026-02-04T14:35:00.789Z","level":"WARN","agent":"DEBUGGER","message":"Task queued - waiting for write access","eventType":"WRITE_ACCESS_QUEUED"}
```

**Hvorfor JSON Lines?**
- Hver linje er selvstendig (kan lese linje for linje)
- Enkel å streame (append-only)
- Lett å parse med `jq` eller Python
- Ingen problem med multithreading (hver write er atomic)

### Log Entry Schema

Se `LOGS-SCHEMA.json` for komplett schema.

**Minimum required felter:**
```json
{
  "timestamp": "2026-02-04T14:30:00.123Z",
  "level": "INFO",
  "agent": "ORCHESTRATOR",
  "message": "Session started"
}
```

**Full entry med context:**
```json
{
  "timestamp": "2026-02-04T14:30:00.123Z",
  "level": "INFO",
  "agent": "ORCHESTRATOR",
  "message": "Session started",
  "eventType": "SESSION_START",
  "context": {
    "sessionId": "sess-abc123",
    "currentPhase": 0,
    "projectName": "TodoApp"
  },
  "data": {
    "intensityLevel": "STANDARD",
    "lastSession": "2026-02-03T10:00:00Z"
  },
  "tags": ["session", "startup"]
}
```

---

## 2. LOG-NIVÅER

### Nivåer og bruk

| Nivå | Bruk | Terminal | LOGS.jsonl |
|------|------|----------|------------|
| **DEBUG** | Detaljert info for debugging | ❌ Nei | ✅ Ja |
| **INFO** | Normal aktivitet | ✅ Ja | ✅ Ja |
| **WARN** | Potensielt problem | ✅ Ja | ✅ Ja |
| **ERROR** | Feil som trenger handling | ✅ Ja | ✅ Ja |
| **CRITICAL** | Kritisk feil (system stop) | ✅ Ja | ✅ Ja |

### Eksempler

**DEBUG:**
```json
{"level":"DEBUG","agent":"CONTEXT-LOADER","message":"Loading document: docs/prd.md","context":{"fileSize":4523}}
```

**INFO:**
```json
{"level":"INFO","agent":"BYGGER","message":"Created file: src/app.py","context":{"file":"src/app.py","lines":45}}
```

**WARN:**
```json
{"level":"WARN","agent":"ORCHESTRATOR","message":"Agent DEBUGGER queued - waiting for BYGGER to finish writing","context":{"waitingAgent":"DEBUGGER","activeWriter":"BYGGER","file":"database.py"}}
```

**ERROR:**
```json
{"level":"ERROR","agent":"DEBUGGER","message":"Write access denied - BYGGER is currently writing","eventType":"WRITE_ACCESS_DENIED","error":{"type":"WriteConflict","code":"ERR_WRITE_BUSY"}}
```

**CRITICAL:**
```json
{"level":"CRITICAL","agent":"ORCHESTRATOR","message":"PROJECT-STATE.json is corrupt - cannot continue","error":{"type":"StateCorruption","code":"ERR_STATE_CORRUPT","stack":"..."}}
```

---

## 3. TERMINAL OUTPUT FORMAT

### Prinsipper

- **Lesbar:** Menneskelesbar format
- **Kompakt:** Ikke overvelde bruker
- **Informativ:** Viktig info synlig
- **Farger:** Nivå-baserte farger (INFO=blå, WARN=gul, ERROR=rød)
- **Emojis:** For rask visuell scanning

### Format

```
[HH:MM:SS] EMOJI AGENT: Message
           └─ Context info (hvis relevant)
```

### Eksempler

**INFO:**
```
[14:30:00] 🚀 ORCHESTRATOR: Session started
           └─ Project: TodoApp | Phase: 0 | Intensity: STANDARD

[14:30:05] ✍️  BYGGER: Write access granted
           └─ File: src/app.py
```

**WARN:**
```
[14:35:00] ⚠️  ORCHESTRATOR: Agent queued for write access
           └─ DEBUGGER waiting for BYGGER to finish database.py
```

**ERROR:**
```
[14:40:00] ❌ DEBUGGER: Write access denied
           └─ File: database.py currently being written by BYGGER
```

**CRITICAL:**
```
[14:45:00] 🔴 ORCHESTRATOR: CRITICAL ERROR - System stopped
           └─ PROJECT-STATE.json is corrupt
           └─ Action required: Rollback to checkpoint or reset
```

### Emoji mapping

| Nivå | Emoji | Farger (ANSI) |
|------|-------|---------------|
| DEBUG | 🔍 | Gray |
| INFO | ℹ️ / 🚀 / ✍️ / ✅ | Blue |
| WARN | ⚠️  | Yellow |
| ERROR | ❌ | Red |
| CRITICAL | 🔴 | Red + Bold |

**Context-specific emojis:**
- 🚀 Session start
- ✍️  Write access granted
- 🔄 Write access transferred
- ✅ Task completed
- 📝 File created
- 🔧 Agent activated
- 🎯 Phase change
- 💾 Checkpoint saved

---

## 4. INTEGRASJON MED ORCHESTRATOR

### Logging i hver operasjon

```python
def orchestrator_operation():
    """
    Eksempel på hvordan ORCHESTRATOR logger.
    """

    # 1. Start logging
    log_info(
        agent="ORCHESTRATOR",
        message="Starting operation",
        event_type="OPERATION_START",
        context={"operation": "agent_handoff"}
    )

    try:
        # 2. Utfør operasjon
        result = perform_operation()

        # 3. Success logging
        log_info(
            agent="ORCHESTRATOR",
            message="Operation completed successfully",
            event_type="OPERATION_COMPLETE",
            context={"operation": "agent_handoff"},
            data={"result": result},
            duration=calculate_duration()
        )

    except Exception as e:
        # 4. Error logging
        log_error(
            agent="ORCHESTRATOR",
            message=f"Operation failed: {str(e)}",
            event_type="OPERATION_FAILED",
            error={
                "type": type(e).__name__,
                "code": "ERR_OPERATION_FAILED",
                "stack": traceback.format_exc()
            }
        )
        raise


def log_info(agent, message, event_type=None, context=None, data=None, duration=None):
    """
    Log INFO level event til både LOGS.jsonl og terminal.
    """

    # 1. Structured log til LOGS.jsonl
    log_entry = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "level": "INFO",
        "agent": agent,
        "message": message,
    }

    if event_type:
        log_entry["eventType"] = event_type
    if context:
        log_entry["context"] = context
    if data:
        log_entry["data"] = data
    if duration:
        log_entry["duration"] = duration

    # Append to LOGS.jsonl (atomic write)
    with open(".ai/LOGS.jsonl", "a") as f:
        f.write(json.dumps(log_entry) + "\n")

    # 2. Terminal output (human-readable)
    terminal_output(log_entry)


def terminal_output(log_entry):
    """
    Format og print til terminal.
    """

    level = log_entry["level"]
    agent = log_entry["agent"]
    message = log_entry["message"]
    context = log_entry.get("context", {})

    # Timestamp
    timestamp = datetime.now().strftime("%H:%M:%S")

    # Emoji basert på nivå og event type
    emoji = get_emoji(level, log_entry.get("eventType"))

    # Farger (ANSI escape codes)
    color = get_color(level)
    reset = "\033[0m"

    # Print main line
    print(f"[{timestamp}] {emoji} {color}{agent}{reset}: {message}")

    # Print context (hvis relevant)
    if context:
        for key, value in context.items():
            print(f"           └─ {key}: {value}")
```

---

## 5. EVENT-TYPER

### Standard event-typer

| Event Type | Level | Agent | Beskrivelse |
|------------|-------|-------|-------------|
| `SESSION_START` | INFO | ORCHESTRATOR | Session startet |
| `SESSION_END` | INFO | ORCHESTRATOR | Session avsluttet |
| `AGENT_ACTIVATED` | INFO | ORCHESTRATOR | Agent aktivert |
| `AGENT_HANDOFF` | INFO | ORCHESTRATOR | Handoff mellom agenter |
| `PHASE_CHANGE` | INFO | ORCHESTRATOR | Fase-overgang |
| `TASK_STARTED` | INFO | Any agent | Task startet |
| `TASK_COMPLETED` | INFO | Any agent | Task fullført |
| `TASK_FAILED` | ERROR | Any agent | Task feilet |
| `FILE_CREATED` | INFO | Any agent | Fil opprettet |
| `FILE_MODIFIED` | INFO | Any agent | Fil endret |
| `WRITE_ACCESS_GRANTED` | INFO | ORCHESTRATOR | Skrivetilgang tildelt |
| `WRITE_ACCESS_QUEUED` | WARN | ORCHESTRATOR | Agent i kø for skrivetilgang |
| `WRITE_ACCESS_TRANSFERRED` | INFO | ORCHESTRATOR | Skrivetilgang overført |
| `CHECKPOINT_SAVED` | INFO | ORCHESTRATOR | Checkpoint lagret |
| `GATE_PASSED` | INFO | PHASE-GATES | Gate passert |
| `GATE_FAILED` | WARN | PHASE-GATES | Gate feilet |
| `ERROR` | ERROR | Any agent | Generell feil |
| `CRITICAL_ERROR` | CRITICAL | Any agent | Kritisk feil |

---

## 6. LOG ROTATION

### Automatisk rotation

```
LOGS.jsonl vokser kontinuerlig.
Ved 10MB størrelse:
  1. Rename: LOGS.jsonl → LOGS-2026-02-04-14-30-00.jsonl
  2. Opprett ny: LOGS.jsonl
  3. Flytt gammel til: CHECKPOINT-HISTORY/logs/

Ved > 30 dager gamle logs:
  1. Komprimer: LOGS-2026-01-05.jsonl → LOGS-2026-01-05.jsonl.gz
  2. Flytt til: CHECKPOINT-HISTORY/logs/archive/

Ved > 90 dager:
  1. Slett eller backup til ekstern lagring
```

### Implementering

```python
def rotate_logs_if_needed():
    """
    Sjekk LOGS.jsonl størrelse og rotér hvis nødvendig.
    Kjøres av ORCHESTRATOR heartbeat (hvert 60 sek).
    """

    log_file = ".ai/LOGS.jsonl"
    max_size = 10 * 1024 * 1024  # 10 MB

    if not os.path.exists(log_file):
        return

    size = os.path.getsize(log_file)

    if size > max_size:
        # Rotate
        timestamp = datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
        rotated_name = f"LOGS-{timestamp}.jsonl"
        rotated_path = f".ai/CHECKPOINT-HISTORY/logs/{rotated_name}"

        # Ensure directory exists
        os.makedirs(".ai/CHECKPOINT-HISTORY/logs", exist_ok=True)

        # Rename
        os.rename(log_file, rotated_path)

        # Log rotation event
        log_info(
            agent="ORCHESTRATOR",
            message=f"Logs rotated to {rotated_name}",
            event_type="LOGS_ROTATED",
            data={"size": size, "rotatedTo": rotated_name}
        )
```

---

## 7. SØKING OG ANALYSE

### Med jq (kommandolinje)

```bash
# Vis alle ERROR events
jq 'select(.level=="ERROR")' .ai/LOGS.jsonl

# Vis alle events fra BYGGER
jq 'select(.agent=="BYGGER")' .ai/LOGS.jsonl

# Vis alle skrivetilgang-events
jq 'select(.eventType | startswith("WRITE_ACCESS"))' .ai/LOGS.jsonl

# Count events per agent
jq -r '.agent' .ai/LOGS.jsonl | sort | uniq -c

# Vis siste 10 events
tail -n 10 .ai/LOGS.jsonl | jq .

# Vis events fra siste time
jq --arg ts "$(date -u -d '1 hour ago' '+%Y-%m-%dT%H:%M:%S')" \
   'select(.timestamp > $ts)' .ai/LOGS.jsonl
```

### Med Python

```python
import json

def analyze_logs(log_file=".ai/LOGS.jsonl"):
    """Analyser logs og generer rapport."""

    events = []
    with open(log_file) as f:
        for line in f:
            events.append(json.loads(line))

    # Count by level
    level_counts = {}
    for event in events:
        level = event["level"]
        level_counts[level] = level_counts.get(level, 0) + 1

    # Count by agent
    agent_counts = {}
    for event in events:
        agent = event["agent"]
        agent_counts[agent] = agent_counts.get(agent, 0) + 1

    # Find errors
    errors = [e for e in events if e["level"] in ["ERROR", "CRITICAL"]]

    return {
        "total_events": len(events),
        "level_counts": level_counts,
        "agent_counts": agent_counts,
        "errors": errors
    }
```

---

## 8. GUARDRAILS

### ✅ ALLTID

- Log til LOGS.jsonl FØR operasjon (for audit trail)
- Bruk riktig log-nivå (ikke alt som INFO)
- Inkluder context (sessionId, file, taskId)
- Bruk event-typer for kategorisering
- Terminal output for INFO og høyere (ikke DEBUG)

### ❌ ALDRI

- Log sensitiv data (passord, tokens, PII)
- Log lange stack traces til terminal (kun LOGS.jsonl)
- Overveld terminal med DEBUG messages
- Log i tight loops (aggreger først)
- Ignorer logging failures (fallback til stderr)

### ⏸️ VURDER

- Ved høy-frekvens events: Aggreger (f.eks. "100 files processed")
- Ved lange operasjoner: Log start + end (ikke hver sub-step til terminal)
- Ved sensitive operasjoner: Redact data men log event

---

## 9. INTEGRASJON MED UNIFIED HISTORY

### Forskjell: LOGS.jsonl vs PROJECT-STATE.json history

**LOGS.jsonl:**
- ALL aktivitet (DEBUG til CRITICAL)
- Detaljert, høy-frekvens
- Midlertidig (roteres)
- For debugging og analyse

**PROJECT-STATE.json history:**
- KUN viktige milestones (CHECKPOINT, GATE_RESULT, etc)
- High-level, lav-frekvens
- Persistent (ikke roteres)
- For rollback og status

**Eksempel:**
```
LOGS.jsonl:
- Agent started reading file (DEBUG)
- File read completed (INFO)
- Agent started writing file (DEBUG)
- File write completed (INFO)
- Write access transferred (INFO)

PROJECT-STATE.json history:
- Task completed: "Implement authentication" (INFO)
```

---

## 10. EKSEMPEL: FULL LOGGING FLYT

```
[14:30:00] 🚀 ORCHESTRATOR: Session started
           └─ Project: TodoApp | Phase: 4 | SessionId: sess-abc123

[14:30:05] 🔧 ORCHESTRATOR: Agent activated
           └─ Agent: BYGGER | Task: Implement login function

[14:30:06] ✍️  BYGGER: Write access granted
           └─ File: src/app.py

[14:30:10] 📝 BYGGER: File created
           └─ File: src/app.py | Lines: 45

[14:32:00] ✅ BYGGER: Task completed
           └─ Task: Implement login function | Duration: 1m 54s

[14:32:01] 🔄 BYGGER: Write access transferred
           └─ File: src/app.py

[14:32:05] 🔧 ORCHESTRATOR: Agent activated
           └─ Agent: DEBUGGER | Task: Test login function

[14:32:10] ❌ DEBUGGER: Test failed
           └─ Test: test_login_with_invalid_credentials
           └─ Error: AssertionError: Expected 401, got 500

[14:32:15] ⚠️  ORCHESTRATOR: Circuit breaker activated
           └─ Agent: DEBUGGER | Failures: 3 | Action required
```

**Samtidig i LOGS.jsonl:**
```jsonl
{"timestamp":"2026-02-04T14:30:00.123Z","level":"INFO","agent":"ORCHESTRATOR","message":"Session started","eventType":"SESSION_START","context":{"sessionId":"sess-abc123","currentPhase":4,"projectName":"TodoApp"}}
{"timestamp":"2026-02-04T14:30:05.456Z","level":"INFO","agent":"ORCHESTRATOR","message":"Agent activated","eventType":"AGENT_ACTIVATED","context":{"agent":"BYGGER","task":"Implement login function"}}
{"timestamp":"2026-02-04T14:30:06.789Z","level":"INFO","agent":"BYGGER","message":"Write access granted","eventType":"WRITE_ACCESS_GRANTED","context":{"file":"src/app.py"}}
...
```

---

*Versjon: 1.1.0*
*Opprettet: 2026-02-04*
*Sist oppdatert: 2026-02-08*
*Formål: Terminal-basert observability for Kit CC*
*Bygger på: Unified history i PROJECT-STATE.json*

**Endringer i v1.1.0:**
- Fjernet alle file-locking referanser
- Introdusert "sekvensiell skrivetilgang" (sequential write access) konsept
- ORCHESTRATOR kontrollerer hvilken agent som har skrivetilgang på et gitt tidspunkt
- Ingen lock-filer, ingen lease-utløp, ingen deadlock-deteksjon
- Kun én agent skriver av gangen; alle andre kan lese fritt
