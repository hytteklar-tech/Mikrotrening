# PROJECT-STATE.json - Eksempel

> **Hva er PROJECT-STATE.json?**
> Hjertet av Kit CC. Denne filen holder styr på alt om prosjektet ditt - hvor du er, hva som er gjort, og hva som gjenstår.

**Plassering:** `.ai/PROJECT-STATE.json` (i rot-mappen ved siden av CLAUDE.md)

---

## Eksempel 1: Nytt prosjekt (rett etter klassifisering)

```json
{
  "project_name": "MinTodoApp",
  "created_at": "2026-02-03T10:30:00Z",
  "last_updated": "2026-02-03T10:35:00Z",

  "classification": {
    "level": "MINIMAL",
    "score": 8,
    "confidence": 0.92,
    "classified_at": "2026-02-03T10:30:00Z",
    "answers": {
      "size": 1,
      "users": 1,
      "data": 2,
      "scale": 1,
      "downtime": 1,
      "regulation": 1,
      "integrations": 1
    }
  },

  "current_phase": 1,
  "current_agent": "OPPSTART-agent",
  "completed_phases": [],

  "tasks": {
    "must": [
      "Problemdefinisjon",
      "Visjon",
      "Målgruppe"
    ],
    "should": [],
    "can": [
      "Persona-creation",
      "Lean Canvas"
    ],
    "completed": [],
    "deferred": []
  },

  "deliverables": {
    "created": [],
    "pending": [
      "docs/vision.md"
    ]
  },

  "lastCheckpoint": {
    "timestamp": "2026-02-03T10:35:00Z",
    "agent": "AUTO-CLASSIFIER",
    "summary": "Prosjekt klassifisert som MINIMAL (score 8). Klar for Fase 1."
  },

  "pendingDecisions": [
    { "id": "bk-001", "type": "KAN", "description": "Persona-creation", "phase": 1 },
    { "id": "bk-002", "type": "KAN", "description": "Lean Canvas", "phase": 1 }
  ],

  "phase_history": [],

  "blockers": [],

  "risks": [
    {
      "id": "RISK-001",
      "description": "Ikke testet med ekte brukere ennå",
      "severity": "medium",
      "phase": 1,
      "status": "open"
    }
  ],

  "notes": {
    "latest": "Prosjektet er klassifisert som MINIMAL. Fokus på MVP.",
    "session_count": 1
  }
}
```

---

## Eksempel 2: Etter Fase 3 (arkitektur ferdig)

```json
{
  "project_name": "MinTodoApp",
  "created_at": "2026-02-03T10:30:00Z",
  "last_updated": "2026-02-03T16:45:00Z",

  "classification": {
    "level": "MINIMAL",
    "score": 8,
    "confidence": 0.92,
    "classified_at": "2026-02-03T10:30:00Z"
  },

  "current_phase": 4,
  "current_agent": "MVP-agent",
  "completed_phases": [1, 2, 3],

  "phase_gates": {
    "phase_1": {
      "status": "PASS",
      "completed_at": "2026-02-03T11:00:00Z"
    },
    "phase_2": {
      "status": "PASS",
      "completed_at": "2026-02-03T14:30:00Z"
    },
    "phase_3": {
      "status": "PARTIAL",
      "completed_at": "2026-02-03T16:45:00Z",
      "missing": ["DPIA"],
      "user_approved": true
    }
  },

  "lastCheckpoint": {
    "timestamp": "2026-02-03T16:45:00Z",
    "agent": "ARKITEKTUR-agent",
    "summary": "Fase 3 fullført — Tech stack valgt (React + Vite), database design (localStorage), trusselmodell forenklet."
  },

  "pendingDecisions": [
    { "id": "bk-003", "type": "BØR", "description": "Secrets management", "phase": 4 }
  ],

  "tech_stack": {
    "frontend": "React + Vite",
    "styling": "Tailwind CSS",
    "state": "React useState (no backend)",
    "hosting": "Vercel",
    "database": "None (localStorage)"
  },

  "tasks": {
    "must": [
      "Git setup",
      "CI/CD pipeline",
      "MVP implementation"
    ],
    "should": [
      "Secrets management"
    ],
    "can": [],
    "completed": [
      "Problemdefinisjon",
      "Visjon",
      "Brukerhistorier",
      "Tech stack valg",
      "Database design (N/A)",
      "Trusselmodellering (MINIMAL - simplified)"
    ],
    "deferred": [
      "DPIA (not required for MINIMAL)"
    ]
  },

  "deliverables": {
    "created": [
      "docs/vision.md",
      "docs/krav/user-stories.md",
      "docs/mvp-definisjon.md",
      "docs/teknisk/tech-stack.md"
    ],
    "pending": [
      ".gitignore",
      ".github/workflows/ci.yml",
      "src/App.jsx"
    ]
  },

  "phase_history": [
    {
      "phase": 1,
      "started": "2026-02-03T10:30:00Z",
      "completed": "2026-02-03T11:00:00Z",
      "agent": "OPPSTART-agent",
      "gate_status": "PASS"
    },
    {
      "phase": 2,
      "started": "2026-02-03T11:15:00Z",
      "completed": "2026-02-03T14:30:00Z",
      "agent": "KRAV-agent",
      "gate_status": "PASS"
    },
    {
      "phase": 3,
      "started": "2026-02-03T14:45:00Z",
      "completed": "2026-02-03T16:45:00Z",
      "agent": "ARKITEKTUR-agent",
      "gate_status": "PARTIAL",
      "notes": "DPIA utsatt til senere - bruker godkjente"
    }
  ],

  "blockers": [],

  "risks": [
    {
      "id": "RISK-001",
      "description": "DPIA ikke fullført",
      "severity": "medium",
      "phase": 3,
      "status": "accepted",
      "mitigation": "Vil fullføres i Fase 5"
    }
  ],

  "notes": {
    "latest": "Klar til å starte MVP-utvikling. Tech stack: React + Supabase.",
    "session_count": 3,
    "user_feedback": ["Fornøyd med arkitektur", "Vil prioritere MVP først"]
  }
}
```

---

## Eksempel 3: STANDARD-prosjekt midt i Fase 5

```json
{
  "project_name": "KundePortal",
  "created_at": "2026-01-15T09:00:00Z",
  "last_updated": "2026-02-03T14:20:00Z",

  "classification": {
    "level": "STANDARD",
    "score": 16,
    "confidence": 0.88,
    "classified_at": "2026-01-15T09:00:00Z",
    "reclassified": true,
    "reclassification_history": [
      {
        "from": "FORENKLET",
        "to": "STANDARD",
        "reason": "Introduced user authentication and personal data",
        "date": "2026-01-20T10:30:00Z"
      }
    ]
  },

  "current_phase": 5,
  "current_agent": "ITERASJONS-agent",
  "completed_phases": [1, 2, 3, 4],

  "lastCheckpoint": {
    "timestamp": "2026-02-03T14:20:00Z",
    "agent": "BYGGER-agent",
    "summary": "Document upload 70% — filvalidering og thumbnail-generering implementert. Blokkert på filer > 5MB."
  },

  "pendingDecisions": [
    { "id": "bk-010", "type": "BØR", "description": "UI/UX polishing", "phase": 5 },
    { "id": "bk-011", "type": "BØR", "description": "Responsive design", "phase": 5 },
    { "id": "bk-012", "type": "KAN", "description": "Dark mode", "phase": 5 },
    { "id": "bk-013", "type": "KAN", "description": "Animations", "phase": 5 }
  ],

  "tech_stack": {
    "frontend": "Next.js 14",
    "backend": "Next.js API Routes",
    "database": "PostgreSQL (Supabase)",
    "auth": "Supabase Auth",
    "hosting": "Vercel",
    "monitoring": "Sentry"
  },

  "features": {
    "completed": [
      "User registration",
      "Login/Logout",
      "Dashboard",
      "Profile page"
    ],
    "in_progress": [
      "Document upload (70% done)",
      "Search functionality (30% done)"
    ],
    "planned": [
      "Admin panel",
      "Notifications",
      "Export to PDF"
    ]
  },

  "tasks": {
    "must": [
      "Complete document upload",
      "Implement search",
      "Performance optimization"
    ],
    "should": [
      "UI/UX polishing",
      "Responsive design"
    ],
    "can": [
      "Dark mode",
      "Animations"
    ],
    "completed": [
      "... (mange oppgaver fra Fase 1-4)"
    ],
    "deferred": []
  },

  "security": {
    "data_classification": {
      "name": "internal",
      "email": "confidential",
      "documents": "confidential"
    },
    "threat_model_completed": true,
    "owasp_testing": "pending (Fase 6)"
  },

  "phase_history": [
    {
      "phase": 1,
      "started": "2026-01-15T09:00:00Z",
      "completed": "2026-01-15T14:30:00Z",
      "agent": "OPPSTART-agent",
      "gate_status": "PASS"
    },
    {
      "phase": 2,
      "started": "2026-01-16T09:00:00Z",
      "completed": "2026-01-17T16:00:00Z",
      "agent": "KRAV-agent",
      "gate_status": "PASS"
    },
    {
      "phase": 3,
      "started": "2026-01-18T09:00:00Z",
      "completed": "2026-01-22T17:00:00Z",
      "agent": "ARKITEKTUR-agent",
      "gate_status": "PASS"
    },
    {
      "phase": 4,
      "started": "2026-01-23T09:00:00Z",
      "completed": "2026-01-28T18:00:00Z",
      "agent": "MVP-agent",
      "gate_status": "PASS",
      "notes": "MVP testet med 5 brukere - positive tilbakemeldinger"
    }
  ],

  "blockers": [
    {
      "id": "BLOCKER-001",
      "description": "Document upload feiler for filer > 5MB",
      "severity": "high",
      "phase": 5,
      "status": "investigating",
      "assigned_to": "BYGGER-agent",
      "created_at": "2026-02-02T10:00:00Z"
    }
  ],

  "risks": [
    {
      "id": "RISK-001",
      "description": "Supabase free tier kan ikke håndtere forventet trafikk",
      "severity": "medium",
      "phase": 5,
      "status": "monitoring",
      "mitigation": "Planlegger oppgradering til Pro plan før lansering"
    },
    {
      "id": "RISK-002",
      "description": "Tilgjengelighet ikke testet ennå",
      "severity": "low",
      "phase": 6,
      "status": "planned",
      "mitigation": "WCAG-testing planlagt i Fase 6"
    }
  ],

  "notes": {
    "latest": "Jobber med document upload. Performance ser bra ut så langt.",
    "session_count": 15,
    "user_feedback": [
      "UI er intuitiv",
      "Laster for sakte med store filer",
      "Trenger dark mode"
    ],
    "team_notes": "Vurderer å bytte fra localStorage til Supabase for bedre ytelse"
  }
}
```

---

## Feltforklaring

| Felt | Beskrivelse | Når oppdateres |
|------|-------------|----------------|
| `project_name` | Prosjektets navn | Ved oppstart |
| `classification.level` | MIN/FOR/STD/GRU/ENT | Ved klassifisering |
| `classification.score` | 7-28 poeng | Ved klassifisering |
| `current_phase` | Hvilken fase (1-7) | Ved faseovergang |
| `current_agent` | Hvilken agent er aktiv | Ved agent-skifte |
| `lastCheckpoint` | Siste checkpoint (tidsstempel, agent, oppsummering) | Ved hvert agent-bytte (kun ORCHESTRATOR) |
| `pendingDecisions` | Uløste BØR/KAN-valg | Ved agent-bytte (krymper etter hvert som beslutninger tas) |
| `completed_phases` | Array av fullførte faser | Ved PASS i phase-gate |
| `phase_gates` | Status for hver fase-validering | Ved fase-overgang |
| `tasks.must` | Kritiske oppgaver | Ved planlegging |
| `tasks.completed` | Fullførte oppgaver | Løpende |
| `tasks.deferred` | Utsatte oppgaver | Ved SKIP i circuit-breaker |
| `deliverables.created` | Filer som er laget | Løpende |
| `tech_stack` | Valgt teknologi | Fase 3 |
| `features` | Feature-status | Fase 4-5 |
| `phase_history` | Historikk over fullførte faser | Ved fase-overgang |
| `blockers` | Aktive blokkere | Når problemer oppstår |
| `risks` | Identifiserte risikoer | Løpende |
| `notes.latest` | Siste statusoppdatering | Løpende |
| `notes.session_count` | Antall chat-sessions | Løpende |
| `notes.user_feedback` | Tilbakemeldinger fra brukere | Ved testing |

---

## Hvordan brukes dette?

**Automatisk (av systemet):**
- ORCHESTRATOR leser denne filen ved hver oppstart
- CONTEXT-LOADER bruker den til å laste riktig kontekst
- PHASE-GATES oppdaterer den ved fase-overganger
- AUTO-CLASSIFIER oppdaterer ved re-klassifisering

**Manuelt (hvis du vil):**
- Du kan lese den for å se status
- Du kan endre `tasks.deferred` til `tasks.must` hvis du vil prioritere noe
- Du kan legge til notater i `custom_notes` felt

**⚠️ Advarsel:** Ikke endre `classification` eller `current_phase` manuelt uten å vite hva du gjør!

---

## Hvor finner jeg denne filen?

```bash
# Fra prosjekt-roten:
cat .ai/PROJECT-STATE.json

# Eller i en editor:
code .ai/PROJECT-STATE.json
```

---

**Relaterte dokumenter:**
- [READ-KIT-CC-BRUKERHÅNDBOK.md](READ-KIT-CC-BRUKERHÅNDBOK.md) - Komplett guide
- [Agenter/klassifisering/KLASSIFISERING-METADATA-SYSTEM.md](Agenter/klassifisering/KLASSIFISERING-METADATA-SYSTEM.md) - Klassifiseringssystem

**Versjon:** 3.1.0 | **Opprettet:** 3. februar 2026 | **Oppdatert:** 8. februar 2026 (lagt til lastCheckpoint og pendingDecisions)
