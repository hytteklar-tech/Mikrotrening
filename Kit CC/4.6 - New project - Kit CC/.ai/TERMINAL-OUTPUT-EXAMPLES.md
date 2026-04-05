# Terminal Output Examples

> Real-world eksempler på hvordan Kit CC logger til terminal.

---

## EKSEMPEL 1: Nytt Prosjekt (First Time)

```
[14:30:00] 🚀 ORCHESTRATOR: Boot sequence starting
           └─ Kit CC v1.0.0

[14:30:01] 🔍 ORCHESTRATOR: Checking for PROJECT-STATE.json
           └─ File not found - new project detected

[14:30:02] 🔧 ORCHESTRATOR: Activating AUTO-CLASSIFIER
           └─ Starting project classification (7 questions)

[14:30:15] ✅ AUTO-CLASSIFIER: Project classified
           └─ Type: Web Application
           └─ Intensity: STANDARD (score: 16)
           └─ Team size: Small (2-5)

[14:30:16] 💾 ORCHESTRATOR: Created PROJECT-STATE.json
           └─ Session: sess-abc123

[14:30:17] 🚀 ORCHESTRATOR: Session started
           └─ Project: TodoApp
           └─ Phase: 1 (Oppstart)
           └─ Intensity: STANDARD

[14:30:18] 🔧 ORCHESTRATOR: Activating OPPSTART-agent
           └─ Task: Create project vision document

[14:30:25] 📝 OPPSTART-agent: File created
           └─ docs/vision.md (342 lines)

[14:31:00] ✅ OPPSTART-agent: Task completed
           └─ Created project vision
           └─ Duration: 42 seconds

[14:31:01] 🎯 ORCHESTRATOR: Phase 1 progress: 25%
```

---

## EKSEMPEL 2: Fortsetting av Eksisterende Prosjekt

```
[10:00:00] 🚀 ORCHESTRATOR: Boot sequence starting
           └─ Kit CC v1.0.0

[10:00:01] 🔍 ORCHESTRATOR: Loading PROJECT-STATE.json
           └─ Found existing project

[10:00:02] 📖 ORCHESTRATOR: Reading SESSION-HANDOFF.md
           └─ Last session: 2026-02-03 15:30

[10:00:03] ℹ️  ORCHESTRATOR: Welcome back!
           └─ Project: TodoApp
           └─ Phase: 4 (MVP) - 60% complete
           └─ Last active: BYGGER
           └─ Pending: Implement user authentication

[10:00:04] 🔧 ORCHESTRATOR: Activating BYGGER
           └─ Resuming task: Implement user authentication

[10:00:10] ✍️  BYGGER: Write access granted
           └─ File: src/auth.py

[10:05:00] 📝 BYGGER: File created
           └─ src/auth.py (156 lines)

[10:05:30] ✅ BYGGER: Task completed
           └─ Implemented user authentication
           └─ Duration: 5m 20s

[10:05:31] 🔄 BYGGER: Write access transferred
           └─ File: src/auth.py
```

---

## EKSEMPEL 3: Sekvensiell Skrivetilgang

```
[14:30:00] 🔧 ORCHESTRATOR: Activating BYGGER
           └─ Task: Refactor database schema

[14:30:05] ✍️  BYGGER: Write access granted
           └─ File: src/database.py

[14:32:00] 🔧 ORCHESTRATOR: Activating DEBUGGER
           └─ Task: Fix database connection bug

[14:32:05] ⏳ DEBUGGER: Write access queued
           └─ File: src/database.py
           └─ Held by: BYGGER
           └─ Position in queue: 1/1
           └─ Status: Waiting for BYGGER to finish...

[14:37:00] ✅ BYGGER: Task completed
           └─ Refactored database schema
           └─ Duration: 7 minutes

[14:37:01] 🔄 ORCHESTRATOR: Write access transferred
           └─ File: src/database.py
           └─ From: BYGGER
           └─ To: DEBUGGER

[14:37:05] ✍️  DEBUGGER: Write access granted
           └─ File: src/database.py

[14:42:00] ✅ DEBUGGER: Task completed
           └─ Fixed database connection bug
           └─ Duration: 5 minutes

[14:42:01] 🔄 DEBUGGER: Write access released
           └─ File: src/database.py
```

---

## EKSEMPEL 4: Parallell Lesing + Sekvensiell Skriving (SUPERVISOR-MODE)

```
[14:30:00] 🔧 ORCHESTRATOR: Activating BYGGER
           └─ Task: Update frontend components
           └─ Mode: SUPERVISOR (parallel analysis)

[14:30:05] ✍️  BYGGER: Write access granted
           └─ File: src/components.tsx

[14:30:10] 🔧 ORCHESTRATOR: Spawning READ-only reviewers
           └─ FRONTEND-agent (code review)
           └─ YTELSE-agent (performance analysis)
           └─ SIKKERHETS-agent (security review)

[14:30:15] 🔍 FRONTEND-agent: Analysis started
           └─ Reading: src/components.tsx (READ-only)

[14:30:16] 🔍 YTELSE-agent: Analysis started
           └─ Reading: src/components.tsx (READ-only)

[14:30:17] 🔍 SIKKERHETS-agent: Analysis started
           └─ Reading: src/components.tsx (READ-only)

[14:32:00] 📝 BYGGER: Updating components
           └─ File: src/components.tsx (WRITE)
           └─ Parallel readers still analyzing...

[14:33:00] ✅ FRONTEND-agent: Review complete
           └─ Found: 2 code quality issues
           └─ Recommendations: 3

[14:33:10] ✅ YTELSE-agent: Analysis complete
           └─ Found: 1 performance optimization
           └─ Recommendations: 2

[14:33:15] ✅ SIKKERHETS-agent: Review complete
           └─ Found: 0 security issues
           └─ Recommendations: 1

[14:35:00] ✅ BYGGER: Task completed
           └─ Updated frontend components
           └─ Duration: 5 minutes

[14:35:01] 🔄 BYGGER: Write access released
           └─ File: src/components.tsx
           └─ All reviewers notified
```

---

## EKSEMPEL 5: Agent Krasj Recovery

```
[14:30:00] ✍️  BYGGER: Write access granted
           └─ File: src/app.py

[14:35:00] 📝 BYGGER: Writing changes
           └─ File: src/app.py
           └─ Progress: 65% complete

[14:45:00] ❌ BYGGER: Agent crashed
           └─ Error: Unexpected system error
           └─ Write access: HELD (incomplete)

[14:45:01] ⚠️  ORCHESTRATOR: Agent failure detected
           └─ Agent: BYGGER
           └─ Status: Crashed
           └─ File with write access: src/app.py
           └─ Action: Detecting next in queue...

[14:45:02] 🔍 ORCHESTRATOR: Analyzing incomplete writes
           └─ File: src/app.py
           └─ Last write: 14:45:00
           └─ Status: Incomplete (65% done)

[14:45:03] ⏳ ORCHESTRATOR: Checking queue
           └─ Next agent waiting: DEBUGGER
           └─ Queued task: Fix app errors

[14:45:04] 🔄 ORCHESTRATOR: Write access transferred
           └─ From: BYGGER (crashed)
           └─ To: DEBUGGER
           └─ File: src/app.py
           └─ Note: Previous write was incomplete

[14:45:05] ✍️  DEBUGGER: Write access granted
           └─ File: src/app.py
           └─ Warning: Previous session incomplete

[14:45:30] ℹ️  DEBUGGER: Reviewing previous work
           └─ Found incomplete changes in src/app.py
           └─ Reverting to last stable state (14:35:00)

[14:46:00] ✅ DEBUGGER: Checkpoint restored
           └─ src/app.py restored from backup
           └─ Ready to continue

[14:50:00] ✅ DEBUGGER: Task completed
           └─ Fixed app errors
           └─ Duration: 5 minutes

[14:50:01] 🔄 DEBUGGER: Write access released
           └─ File: src/app.py
```

---

## EKSEMPEL 6: Phase Gate Validation

```
[16:00:00] 🎯 ORCHESTRATOR: Phase 2 complete
           └─ All tasks finished
           └─ Running PHASE-GATES validation...

[16:00:05] 🔍 PHASE-GATES: Validating deliverables
           └─ Checking: docs/prd.md
           └─ Checking: docs/user-stories.md
           └─ Checking: docs/requirements.md

[16:00:10] ✅ PHASE-GATES: Artifacts check passed
           └─ Score: 40/40

[16:00:12] ✅ PHASE-GATES: Quality check passed
           └─ Score: 28/30

[16:00:15] ✅ PHASE-GATES: Security check passed
           └─ Score: 25/30

[16:00:16] ✅ PHASE-GATES: GATE PASSED
           └─ Total score: 93/100 (threshold: 70)
           └─ Phase 2 → Phase 3 approved

[16:00:17] 💾 ORCHESTRATOR: Checkpoint saved
           └─ Phase2-complete-93pts
           └─ Git commit: abc123def

[16:00:18] 🎯 ORCHESTRATOR: Phase changed
           └─ From: Phase 2 (Krav)
           └─ To: Phase 3 (Arkitektur)

[16:00:20] 🔧 ORCHESTRATOR: Activating ARKITEKTUR-agent
           └─ Starting Phase 3 tasks
```

---

## EKSEMPEL 7: Error og Recovery

```
[14:30:00] 🔧 ORCHESTRATOR: Activating BYGGER
           └─ Task: Implement payment processing

[14:30:10] ⚠️  TASK-CLASSIFICATION: WARNING
           └─ Task classified as RED ZONE (payment)
           └─ AI autonomous execution STOPPED
           └─ Human leadership required

[14:30:11] ⚠️  USER INPUT REQUIRED
           └─ Payment processing is RED ZONE (security critical)
           └─ This task requires human leadership
           └─ Options:
               A) I will lead, AI assists
               B) Skip this task for now
               C) Reclassify as lower risk
           └─ Choose (A/B/C):

[14:30:30] ℹ️  ORCHESTRATOR: User chose: A (human-led)
           └─ Switching to assisted mode
           └─ AI will suggest, human approves

[14:31:00] ℹ️  BYGGER: Suggesting implementation approach
           └─ Option 1: Stripe integration
           └─ Option 2: PayPal integration
           └─ Option 3: Custom payment gateway

[14:31:30] ℹ️  USER INPUT REQUIRED
           └─ Which payment approach?
           └─ Choose (1/2/3):
```

---

## EKSEMPEL 8: Supervisor Mode (Parallel Agents)

```
[15:00:00] 🔧 ORCHESTRATOR: Activating ARKITEKTUR-agent
           └─ Task: Architecture review
           └─ Mode: SUPERVISOR (parallel analysis)

[15:00:05] ✍️  ARKITEKTUR-agent: Write access granted
           └─ File: docs/architecture.md

[15:00:10] 🔧 ORCHESTRATOR: Spawning READ-only experts
           └─ SIKKERHETS-agent (security analysis)
           └─ YTELSE-agent (performance analysis)
           └─ VEDLIKEHOLD-agent (maintainability analysis)

[15:00:15] 🔍 SIKKERHETS-agent: Analysis started
           └─ Reading: docs/architecture.md (READ-only)

[15:00:16] 🔍 YTELSE-agent: Analysis started
           └─ Reading: docs/architecture.md (READ-only)

[15:00:17] 🔍 VEDLIKEHOLD-agent: Analysis started
           └─ Reading: docs/architecture.md (READ-only)

[15:02:00] ✅ SIKKERHETS-agent: Analysis complete
           └─ Found: 2 security concerns
           └─ Recommendations: 3

[15:02:10] ✅ YTELSE-agent: Analysis complete
           └─ Found: 1 performance bottleneck
           └─ Recommendations: 2

[15:02:15] ✅ VEDLIKEHOLD-agent: Analysis complete
           └─ Found: 0 maintainability issues
           └─ Recommendations: 1

[15:02:20] 🎯 ORCHESTRATOR: Aggregating analyses
           └─ Total findings: 3
           └─ Total recommendations: 6

[15:02:30] 📝 ARKITEKTUR-agent: Updating architecture
           └─ Incorporating expert feedback
           └─ File: docs/architecture.md (WRITE)

[15:05:00] ✅ ARKITEKTUR-agent: Task completed
           └─ Architecture review complete
           └─ Duration: 5 minutes

[15:05:01] 🔄 ARKITEKTUR-agent: Write access transferred
           └─ File: docs/architecture.md
```

---

## EKSEMPEL 9: Session Crash Recovery

```
[NEW SESSION - 2026-02-05 09:00:00]

[09:00:00] 🚀 ORCHESTRATOR: Boot sequence starting
           └─ Kit CC v1.1.0

[09:00:01] 🔍 ORCHESTRATOR: Loading PROJECT-STATE.json

[09:00:02] ⚠️  ORCHESTRATOR: PREVIOUS SESSION CRASHED
           └─ Last session: 2026-02-04 16:30
           └─ Status: active (not properly closed)
           └─ Last heartbeat: 2026-02-04 16:35 (17 hours ago)

[09:00:03] 🔍 ORCHESTRATOR: Checking session state

[09:00:04] ⚠️  ORCHESTRATOR: Incomplete write sessions detected
           └─ src/app.py (held by BYGGER, write started 16:30)
           └─ src/database.py (held by DEBUGGER, write started 16:25)

[09:00:05] 🔄 ORCHESTRATOR: Recovering write sessions
           └─ Reason: Previous session heartbeat > 1 hour ago
           └─ Releasing: src/app.py
           └─ Releasing: src/database.py
           └─ Action: Resetting write access state

[09:00:06] ✅ ORCHESTRATOR: Session state recovered
           └─ Write access reset: 2 files
           └─ System ready to continue

[09:00:07] 📖 ORCHESTRATOR: Reading SESSION-HANDOFF.md
           └─ Last work: Implementing user authentication

[09:00:08] ℹ️  ORCHESTRATOR: Recovery complete
           └─ Project: TodoApp
           └─ Phase: 4 (MVP) - 75% complete
           └─ Ready to continue

[09:00:09] ⚠️  ORCHESTRATOR: Recommendation
           └─ Review last work (may be incomplete due to crash)
           └─ Files with incomplete writes: app.py, database.py
           └─ Consider checkpoint rollback if needed

[09:00:10] ⚠️  USER INPUT REQUIRED
           └─ Previous session crashed. What to do?
           └─ Options:
               A) Continue from last state
               B) View crash details
               C) Rollback to last checkpoint
           └─ Choose (A/B/C):
```

---

## EKSEMPEL 10: Complete Session (Kompakt)

```
[10:00:00] 🚀 SESSION START | TodoApp | Phase 4 | STANDARD
[10:00:05] 🔧 BYGGER activated → Implement authentication
[10:00:10] ✍️  Write access: src/auth.py → BYGGER
[10:05:00] 📝 Created: src/auth.py (156 lines)
[10:05:30] ✅ BYGGER completed (5m 20s)
[10:05:31] 🔄 Write access transferred: src/auth.py
[10:05:35] 🎯 Phase 4: 85% complete
[10:05:40] 🔧 REVIEWER activated → Code review
[10:08:00] ✅ REVIEWER: No issues found
[10:08:05] 💾 Checkpoint saved: phase4-auth-complete
[10:08:10] 🏁 SESSION END | Duration: 8m 10s | 1 task completed
```

---

*Opprettet: 2026-02-04*
*Versjon: 1.1.0*
*Formål: Terminal output eksempler for Kit CC*
