# Bygge Agenter - Prosjektoversikt

> **Mål:** Bygge et komplett multi-agent system med 50 agenter fordelt på 4 nivåer for Kit CC.

---

## Filnavnkonvensjon

### For dokumentfiler i Agenter/-mappen:
| Prefiks | Betydning | Eksempel |
|---------|-----------|----------|
| `AI-` | Instruksjoner til AI | AI-BYGGEINSTRUKSJONER.md |
| `USER-` | Info for prosjektleder/bruker | USER-STATUS.md |
| `READ-USER-AI-` | Brukes av både mennesker og AI | READ-USER-AI-STRUKTUR.md |
| `READ-` | Les-først dokumenter | READ-KIT-CC-START-HER.md |
| (ingen) | Standard prosjektfiler | README.md |

### For agent-filer i system-mappen:
| Prefiks | Betydning | Eksempel |
|---------|-----------|----------|
| `agent-` | Faktisk agent | agent-ORCHESTRATOR.md |
| `protocol-` | Protokoll-dokumentasjon | protocol-CODE-QUALITY-GATES.md |
| `doc-` | Dokumentasjon/matriser | doc-INTENSITY-MATRIX.md |
| `extension-` | Extensions/tillegg | extension-ORCHESTRATOR-MONITORING.md |

### For agent-filer i andre mapper:
| Suffiks | Mappe | Eksempel |
|---------|-------|----------|
| `-agent.md` | basis/ | BYGGER-agent.md |
| `-agent.md` | prosess/ | 4-MVP-agent.md |
| `-ekspert.md` | ekspert/ | GDPR-ekspert.md |
| `MAL-*.md` | maler/ | MAL-EKSPERT.md |

---

## Prosjektstruktur

```
Agenter/
├── README.md                       # Denne filen - prosjektoversikt
├── AI-BYGGEINSTRUKSJONER.md        # Instruksjoner for AI
├── AI-OPPGAVER.json                # Maskinlesbar oppgaveliste for AI
├── USER-STATUS.md                  # Byggestatus og fremdrift
├── READ-USER-Beskrivelse-av-agenter.md  # Detaljert beskrivelse av agenter
├── READ-USER-AI-STRUKTUR.md             # Hvordan nivåene forholder seg til hverandre
├── READ-USER-AI-BESLUTNINGER.md         # Arkitekturbeslutninger og begrunnelser
├── READ-USER-AI-AGENT-REGISTER.md       # Komplett liste over alle agenter
│
├── maler/                          # Maler for agent-prompts
│   ├── MAL-SYSTEM.md
│   ├── MAL-BASIS.md
│   ├── MAL-PROSESS.md
│   └── MAL-EKSPERT.md
│
├── agenter/                        # Ferdige agent-prompts
│   ├── system/                     # Nivå 0: System-agenter
│   ├── basis/                      # Nivå 1: Basis-agenter
│   ├── prosess/                    # Nivå 2: Prosess-agenter
│   └── ekspert/                    # Nivå 3: Ekspert-agenter
│
├── klassifisering/                 # Metadata og klassifiseringssystem
│   ├── KLASSIFISERING-METADATA-SYSTEM.md
│   └── FUNKSJONSOVERSIKT-KOMPLETT.md
│
└── Arkiv/                          # Arkiverte filer og opplæringsdokumenter
    ├── Opplæring-01-Arkitekturvalg.md
    ├── Opplæring-02-SemanticSearch.md
    ├── Opplæring-03-Vibekoding.md
    ├── Opplæring-04-Ekspert-Funksjoner.md
    ├── Opplæring-05-Klassifiseringssystem.md
    ├── Opplæring-06-Kostnadsanalyse.md
    ├── RESEARCH-ANALYSE-2026.md
    └── Original-research/          # Original research-dokumenter
```

---

## Agentstruktur (50 agenter totalt)

| Nivå | Type | Antall | Rolle |
|------|------|--------|-------|
| 0 | System-agenter | 5 | Infrastruktur og orkestrering |
| 1 | Basis-agenter | 7 | Tverrfaglige verktøy |
| 2 | Prosess-agenter | 7 | Fase-koordinering (én per fase) |
| 3 | Ekspert-agenter | 31 | Spesialistkompetanse |
| | **TOTALT** | **50** | |

**System-hjelpefiler (ikke agenter):** 6 filer (protokoller, dokumentasjon, extensions)

### System-filer (Nivå 0)

| Fil | Formål |
|-----|--------|
| agent-ORCHESTRATOR.md | Sentral koordinering |
| agent-AGENT-PROTOCOL.md | Kommunikasjonsstandarder for Nivå 1-3 |
| agent-AUTO-CLASSIFIER.md | Prosjektklassifisering |
| agent-CONTEXT-LOADER.md | Kontekst-lasting |
| agent-PHASE-GATES.md | Kvalitetsvalidering |
| **protocol-SYSTEM-COMMUNICATION.md** | Kommunikasjon mellom system-agenter (Nivå 0) |
| **doc-INTENSITY-MATRIX.md** | Samlet oversikt over nivå-påvirkning |

---

## 4-lags arkitektur

```
BRUKER
   │
   ▼
┌─────────────────────────────────────────┐
│  NIVÅ 0: SYSTEM                         │
│  ORCHESTRATOR koordinerer alt           │
│  → Bestemmer hvilken agent som brukes   │
└─────────────────────────────────────────┘
   │
   ▼
┌─────────────────────────────────────────┐
│  NIVÅ 2: PROSESS                        │
│  Én prosess-agent per fase (1-7)        │
│  → Koordinerer arbeidet i sin fase      │
└─────────────────────────────────────────┘
   │
   ├──────────────────┬───────────────────┐
   ▼                  ▼                   ▼
┌──────────┐    ┌──────────┐       ┌──────────┐
│ NIVÅ 1:  │    │ NIVÅ 3:  │       │ NIVÅ 3:  │
│ BASIS    │    │ EKSPERT  │       │ EKSPERT  │
│ (verktøy)│    │ (spesialist)     │ (spesialist)
└──────────┘    └──────────┘       └──────────┘
```

---

## Nøkkelfiler

### For AI
| Fil | Formål |
|-----|--------|
| `AI-OPPGAVER.json` | Maskinlesbar oppgaveliste - AI leser denne |
| `AI-BYGGEINSTRUKSJONER.md` | Instruksjoner for hvordan AI skal bygge agenter |

### For prosjektleder (USER)
| Fil | Formål |
|-----|--------|
| `USER-STATUS.md` | Byggestatus og fremdrift |
| `READ-USER-Beskrivelse-av-agenter.md` | Detaljert beskrivelse av agenter |

### For begge (USER-AI)
| Fil | Formål |
|-----|--------|
| `READ-USER-AI-STRUKTUR.md` | Hvordan nivåene og agentene forholder seg |
| `READ-USER-AI-BESLUTNINGER.md` | Arkitekturbeslutninger og begrunnelser |
| `READ-USER-AI-AGENT-REGISTER.md` | Komplett oversikt over alle 50 agenter |

### Opplæring (Arkiv)
| Fil | Emne |
|-----|------|
| `Opplæring-01-Arkitekturvalg.md` | Hub-and-spoke vs Mesh vs Hybrid |
| `Opplæring-02-SemanticSearch.md` | Semantisk søk i kodebaser |
| `Opplæring-03-Vibekoding.md` | Vibekoding-trenden og tilpasninger |
| `Opplæring-04-Ekspert-Funksjoner.md` | De 52 nye ekspert-funksjonene |
| `Opplæring-05-Klassifiseringssystem.md` | Hvordan klassifisering fungerer |
| `Opplæring-06-Kostnadsanalyse.md` | Kostnader og gratis verktøy |

---

## Kom i gang

### For å forstå strukturen
```
Les: READ-USER-AI-STRUKTUR.md
```

### For å bygge agenter
```
Les: AI-BYGGEINSTRUKSJONER.md
```

### For å se status
```
Les: USER-STATUS.md
```

### For å se oppgavelisten
```
Les: AI-OPPGAVER.json
```

### For bakgrunnsmateriale
```
Les: Arkiv/Opplæring-*.md
```

---

## Arbeidsflyt for AI

```
1. Les AI-OPPGAVER.json → Finn neste agent som skal bygges
2. Les relevant MAL-[TYPE].md → Forstå strukturen
3. Les AI-BYGGEINSTRUKSJONER.md → Følg instruksjonene
4. Bygg agent → Lagre i riktig mappe under agenter/
5. Oppdater AI-OPPGAVER.json → Marker som ferdig
6. Oppdater USER-STATUS.md → Logg fremgang
7. Gjenta til alle agenter er bygd
```

---

*Versjon: 3.1.0*
*Opprettet: 2026-01-31*
*Oppdatert: 2026-02-05 (READ-prefix på USER-AI filer)*
