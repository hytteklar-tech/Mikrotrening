# 3-lags-kontekstarkitektur

> Kit CC bruker en 3-lags modell for smart konteksthåndtering: få filer lastet alltid, flere tilgjengelig ved behov, og arkiv for unntakstilfeller.

## Hva gjør den?

Kit CC organiserer alle informasjonskilder i tre lag etter hvor ofte de brukes:

- **Lag 1 — Arbeidsbord** (4 filer, alltid lastet): Prosjektstatus, aktiv agent, missions briefing, progres slogg. Alt en agent trenger for å starte arbeid.
- **Lag 2 — Skrivebordsskuff** (on-demand): Eksperter, basis-agenter, forrige leveranser, klassifiseringssystem, protokoller. Agenten vet hvor de er og leser direkte når nødvendig.
- **Lag 3 — Arkiv** (unntakstilfeller): ORCHESTRATOR, fase-gates, krasj-recovery, historiske logger. Lastes bare ved kompleks routing eller problemer.

**Resultat:** AI starter aldri med mer enn 4 filer. Kontekstkostnaden holdes lav.

## Hvorfor er det nyttig?

**Raskere oppstart:** Istedenfor å laste hele prosjektet (100+ filer), starter agenten med bare 4 filer og tar resten ved behov.

**Mindre forvirring:** Agenten vet nøyaktig hvor relevant info er (listet i mission briefing) — trenger ikke å søke eller "browse" rundt.

**Skalerer:** Store prosjekter får samme rask oppstart som små. Lag-arkitekturen vokser med prosjektet, men startup-kostnaden forblir konstant.

**Gjenoppretting:** Hvis systemet krasjer, kan PROGRESS-LOG rekonstruere tilstand fra siste handling. Ingen tapt arbeid.

## Hvordan fungerer det?

### Lag 1 — Arbeidsbord (≤ 4 filer, alltid i kontekst)

| Fil | Formål |
|-----|--------|
| `PROJECT-STATE.json` | Prosjektets nåværende status, fase, klassifisering |
| Aktiv fase-agent (f.eks. `4-MVP-agent.md`) | Instruksjoner for hva som skal gjøres nå |
| `MISSION-BRIEFING-FASE-{N}.md` | Kompakt kontekstpakke fra forrige fase med alt agenten trenger |
| `PROGRESS-LOG.md` | Append-only handlingslogg — neste sesjon vet nøyaktig hva som ble gjort |

**Disse filene gir agenten 100% av konteksten den trenger for å starte arbeid.**

### Lag 2 — Skrivebordsskuff (hentes on-demand)

Agenten vet disse finnes fordi de er listet i mission briefing (med filsti). Når nødvendig, signalerer agenten `NEED_CONTEXT [filsti]` og leser filen direkte:

- **Ekspert-agenter** (f.eks. `OWASP-ekspert.md`, `CICD-ekspert.md`) — For spesialisthjelp
- **Basis-agenter** (f.eks. `BYGGER-agent.md`, `REVIEWER-agent.md`) — For delegert arbeid
- **Forrige fases leveranser** (i `docs/`) — Detaljer utover mission briefing
- **Klassifiseringssystem** (`KLASSIFISERING-METADATA-SYSTEM.md`) — For MÅ/BØR/KAN-spørsmål
- **Protokoller** (f.eks. `protocol-KONTEKSTBUDSJETT.md`) — Standarder og regler

**Agenten trenger aldri å "browse" — den leser Lag 2-filer direkte fra filstiene i mission briefing.**

### Lag 3 — Arkiv (kun ved unntakstilfeller)

Lastes bare når nødvendig:

- **System-agenter** (`agent-ORCHESTRATOR.md`, `agent-PHASE-GATES.md`) — Ved kompleks routing eller fase-overganger
- **Protokoller for krisehåndtering** — Ved kommunikasjonsproblemer eller krasj-recovery
- **Historiske logger** (`CHECKPOINT-HISTORY/`) — Ved rollback eller audit
- **Fullstendige prosjektdokumenter** — Kun som fallback

**Disse filene lastes ALDRI som standard. De eksisterer som fallback og referanse.**

## Eksempel

En agent i Fase 4 (MVP) trenger sikkerhetshjelp:

```
1. Arbeidsbord er lastet: PROJECT-STATE, 4-MVP-agent, MISSION-BRIEFING-FASE-4, PROGRESS-LOG

2. 4-MVP-agent leser MISSION-BRIEFING og ser:
   "Tilgjengelige ressurser (Lag 2):
    - Kit CC/Agenter/agenter/ekspert/OWASP-ekspert.md (sikkerhet)"

3. Agent signalerer: NEED_CONTEXT Kit CC/Agenter/agenter/ekspert/OWASP-ekspert.md

4. OWASP-ekspert lastes og leser instruksjoner

5. Når ferdig, fortsetter agenten som Fase 4-agent

RESULTAT: Totaltkontekst = 5 filer (4 fra arbeidsbord + 1 ekspert), ikke 100+
```

## Relaterte features

- **kontekstbudsjett** — Etter 8 unike filer eller 25 meldinger trigges PAUSE for å spare kontekst
- **progress-log** — Append-only logg som holder seg ved oppstart uten å måtte laste heile state
- **mission-briefings** — Komprimert kontekstpakke som erstatning for å laste hele prosjektdokumenter
- **crash-recovery** — Bruker PROGRESS-LOG til å rekonstruere tilstand ved krasj

---

*Definert i: CLAUDE.md — HIERARKISK KONTEKSTARKITEKTUR*
*Lagt til: 2026-02-17*
*Kategori: Kontekst og minne*
