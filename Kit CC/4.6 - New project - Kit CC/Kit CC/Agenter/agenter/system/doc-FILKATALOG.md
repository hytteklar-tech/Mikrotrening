# doc-FILKATALOG.md — Komplett filkatalog for Kit CC

> **SSOT for alle filer organisert etter lag.** Referert fra CLAUDE.md.
> Versjon: 1.0.0 | Opprettet: 2026-02-23

---

## Lag 1 — Arbeidsbord (alltid i kontekst, ≤ 4 filer)

| Fil | Formål | Plassering |
|-----|--------|------------|
| `PROJECT-STATE.json` | Prosjektets tilstand og klassifisering | `.ai/` |
| `{N}-{NAVN}-agent.md` | Aktiv fase-agent | `Kit CC/Agenter/agenter/prosess/` |
| `MISSION-BRIEFING-FASE-{N}.md` | Kompakt kontekstpakke for aktiv fase | `.ai/` |
| `PROGRESS-LOG.md` | Append-only handlingslogg (memory-independent) | `.ai/` |
| `MONITOR-ERRORS.json` | Nettleser-feil fanget av Monitor (leses i fase 4/5) | `.ai/` |
| `MONITOR-PROBES.json` | Browser debug probes — AI ↔ nettleser (fase 4/5) | `.ai/` |

**Disse filene gir agenten 100% av konteksten den trenger for å starte arbeid.**

---

## Lag 2 — Skrivebordsskuff (hentes on-demand via NEED_CONTEXT)

### Prosjektfiler
| Fil | Formål | Plassering |
|-----|--------|------------|
| `SESSION-HANDOFF.md` | Overlevering mellom chat-sesjoner | `.ai/` |
| Fase-leveranser | Dokumenter fra forrige faser | `docs/` |

### Agenter
| Fil | Formål | Plassering |
|-----|--------|------------|
| `VEILEDER-agent.md` | Veileder-agent for spørremodus (read-only) | `Kit CC/Agenter/agenter/basis/` |
| `{NAVN}-agent.md` | Basis-agenter (BYGGER, DEBUGGER, etc.) | `Kit CC/Agenter/agenter/basis/` |
| `{NAVN}-ekspert.md` | Ekspert-agenter (30+ spesialister) | `Kit CC/Agenter/agenter/ekspert/` |

### Klassifisering og regler
| Fil | Formål | Plassering |
|-----|--------|------------|
| `KLASSIFISERING-METADATA-SYSTEM.md` | MÅ/BØR/KAN-regler og rammeverk (SSOT for regler) | `Kit CC/Agenter/klassifisering/` |
| `doc-INTENSITY-MATRIX.md` | Intensitetsnivå-detaljer | `Kit CC/Agenter/agenter/system/` |

### Protokoller
| Fil | Formål | Plassering |
|-----|--------|------------|
| `protocol-TASK-COMPLEXITY-ASSESSMENT.md` | Oppgave-kompleksitets-vurdering | `Kit CC/Agenter/agenter/system/` |
| `protocol-VERIFY-BEFORE-MISSING.md` | Obligatorisk søk før "mangler"-konklusjon | `Kit CC/Agenter/agenter/system/` |
| `protocol-BYGGEMODUS.md` | Byggemodus-klassifisering (ai-bestemmer/samarbeid/detaljstyrt) | `Kit CC/Agenter/agenter/system/` |
| `protocol-KONTEKSTBUDSJETT.md` | Kontekstbudsjett-terskler og pause-prosedyre | `Kit CC/Agenter/agenter/system/` |
| `protocol-ERROR-AUTOFIX.md` | Automatisk feilhåndtering via Monitor | `Kit CC/Agenter/agenter/system/` |
| `protocol-PROGRESS-LOG.md` | Handlingslogg-format og triggere | `Kit CC/Agenter/agenter/system/` |
| `protocol-MONITOR-OPPSETT.md` | Monitor oppstartsprotokoll | `Kit CC/Agenter/agenter/system/` |
| `protocol-CRASH-RECOVERY.md` | Krasj-deteksjon og gjenoppretting | `Kit CC/Agenter/agenter/system/` |

---

## Lag 3 — Arkiv (kun ved behov)

| Fil | Formål | Plassering |
|-----|--------|------------|
| `agent-ORCHESTRATOR.md` | Sentral koordinering (fallback) | `Kit CC/Agenter/agenter/system/` |
| `agent-AUTO-CLASSIFIER.md` | Klassifiserer prosjektet (engangs) | `Kit CC/Agenter/agenter/system/` |
| `agent-BROWNFIELD-SCANNER.md` | 25-agents sverm for analyse av eksisterende kode | `Kit CC/Agenter/agenter/system/` |
| `agent-CONTEXT-LOADER.md` | Kontekst-pakking (on-demand) | `Kit CC/Agenter/agenter/system/` |
| `agent-PHASE-GATES.md` | Kvalitetsvalidering (ved fase-overgang) | `Kit CC/Agenter/agenter/system/` |
| `agent-AGENT-PROTOCOL.md` | Kommunikasjonsstandarder (referanse) | `Kit CC/Agenter/agenter/system/` |
| `protocol-SYSTEM-COMMUNICATION.md` | System-kommunikasjon (referanse) | `Kit CC/Agenter/agenter/system/` |
| `protocol-CODE-QUALITY-GATES.md` | Kvalitetskontroll-triggers (referanse) | `Kit CC/Agenter/agenter/system/` |
| `protocol-MODULREGISTRERING.md` | Modulregistrering og "Vis funksjoner"-kommando | `Kit CC/Agenter/agenter/system/` |
| `doc-NAVNEKONVENSJON.md` | Navnekonvensjon for filer | `Kit CC/Agenter/agenter/system/` |
| `CHECKPOINT-HISTORY/` | Lagringspunkter for rollback | `.ai/` |
| `FUNKSJONSOVERSIKT-KOMPLETT.md` | Alle funksjoner forklart (referanse) | `Kit CC/Agenter/klassifisering/` |

---

## Mappestruktur

```
[Prosjektmappe]/
├── CLAUDE.md              ← Startfil (leses automatisk)
├── .ai/                   ← Prosjekttilstand
│   ├── PROJECT-STATE.json
│   ├── PROGRESS-LOG.md
│   ├── SESSION-HANDOFF.md
│   ├── MISSION-BRIEFING-FASE-{N}.md
│   ├── MONITOR-ERRORS.json
│   ├── MONITOR-PROBES.json
│   └── CHECKPOINT-HISTORY/
├── Kit CC/                ← Agentsystemet
│   ├── Agenter/
│   │   ├── agenter/
│   │   │   ├── prosess/   ← Fase-agenter (1-7)
│   │   │   ├── basis/     ← Basis-agenter
│   │   │   ├── ekspert/   ← Ekspert-agenter (30+)
│   │   │   └── system/    ← System-agenter, protokoller, docs
│   │   ├── klassifisering/
│   │   └── maler/
│   └── docs/
├── docs/                  ← Generert prosjekt-dokumentasjon
└── src/                   ← Kildekode
```
