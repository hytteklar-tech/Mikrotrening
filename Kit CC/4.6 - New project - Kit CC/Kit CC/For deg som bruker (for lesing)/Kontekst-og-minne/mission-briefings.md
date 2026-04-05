# Mission-briefings

> Ved hver faseovergang genereres en kompakt kontekstpakke (MISSION-BRIEFING) som forteller neste fase: hva er målet, hva gjenstår, hvilke ressurser finnes, og hva er kravene før neste fase.

## Hva gjør den?

MISSION-BRIEFING er et dokument som oppsummerer alt en fase-agent trenger for å starte arbeid. Det inneholder:

- **Oppdrag** — Hva skal denne fasen oppnå (1 setning)
- **Kontekst fra forrige fase** — Hva ble gjort, hvilke beslutninger ble tatt
- **Oppgaver** — MÅ (obligatorisk), BØR (anbefalt), KAN (nice-to-have)
- **Tilgjengelige Lag 2-ressurser** — Eksperter, basis-agenter, tidligere dokumenter (med filstier)
- **Gate-krav** — Hva må være sant før neste fase kan starte
- **Klassifisering** — Prosjekttype, bruker-nivå, byggemodus

**Resultat:** Fase-agenten har 100% av konteksten på 3-4 sider istedenfor å måtte lese hele prosjektet.

## Hvorfor er det nyttig?

**Ikke information overload:** Istedenfor å laste 50 filer, leser agenten 1 kompakt dokument.

**Klart oppdrag:** Fase-agenten vet nøyaktig hvilke oppgaver som er MÅ (gjøre først) vs. KAN (vurder etter tid).

**Rask oppstart:** Neste fase starter 5 minutter etter at forrige er ferdig. Ingen tid bortkastet på å finne informasjon.

**Komprimert kontekst:** MISSION-BRIEFING er maksimalt 30% av sin originalstørrelse — viktig info bevares, utfyllende tekst fjernes.

**Faseoverganger som struktur:** Hver gang en fase avsluttes, genereres MISSION-BRIEFING for neste fase. Dette sikrer at hver fase starter på solid grunn.

## Hvordan fungerer det?

### Struktur (MAL)

```markdown
# MISSION-BRIEFING — FASE [N]: [Fasenavn]

**Versjon:** 1.0
**Generert av:** ORCHESTRATOR (ved fase-overgang)
**Gjeldende dato:** 2026-02-17

---

## 🎯 OPPDRAG

En setning som sammenfatter hele fasen:
"Denne fasen skal [konkret leveranse] slik at [bruker-verdi] oppnås."

Eksempler:
- "Fase 4 skal sette opp et funksjonelt MVP slik at vi har en kjørbar prototype."
- "Fase 2 skal definere alle funksjonelle krav og sikkerhetsrammeverk."

---

## 📋 KONTEKST FRA FORRIGE FASE

### Oppsummering (maks 300 ord)
Hva ble gjort i forrige fase? Hva var viktige funn?

**Eksempel:**
"Fase 3 (Arkitektur) fullførte:
- Systemarkitektur (React + Node.js + PostgreSQL)
- Sikkerheitsplan (OWASP Top 10, JWT-autentisering, SQL-injection-beskyttelse)
- Database-schema (Users, Posts, Comments)

Viktige beslutninger:
- TypeScript for typsikkerhet
- PostgreSQL for skalering
- JWT for stateless auth

Gate-status: ✅ GODKJENT for Fase 4"

### Viktige filer fra forrige fase
| Fil | Innhold |
|-----|---------|
| `docs/FASE-3-ARKITEKTUR.md` | Fullstendig arkitektur-dokumentasjon |
| `docs/FASE-3-SIKKERHET.md` | Sikkerhetsplan og trusselmodell |

---

## 📊 OPPGAVER DENNE FASEN

### MÅ (Obligatorisk — gjøre først)
Disse må være ferdig før fasen er fullført.

- [ ] MÅ-1: [Oppgavenavn]
  - Hva: [Kort beskrivelse]
  - Hvorfor: [Hvorfor det er obligatorisk]
  - Inndata: [Hva som finnes fra før]
  - Leveranse: [Hva skal produseres]
  - Kompleksitet: [Liten/Medium/Stor]

- [ ] MÅ-2: [Oppgavenavn]
  - ...

**Eksempel (Fase 4):**
- [ ] MÅ-1: Sett opp Node.js/TypeScript-prosjekt
  - Hva: Initialize package.json, tsconfig, build pipeline
  - Hvorfor: Foundation for all annen kode
  - Inndata: Krav fra Fase 3
  - Leveranse: Kjørbart dev-miljø (`npm run dev`)
  - Kompleksitet: Liten

- [ ] MÅ-2: Implementer JWT-autentisering
  - Hva: Login/logout API + token-refresh
  - Hvorfor: Security-krav fra Fase 3
  - Inndata: OWASP-ekspert, database-schema fra Fase 3
  - Leveranse: API-endpoints for auth
  - Kompleksitet: Medium

### BØR (Anbefalt — prioriter etter MÅ)
Disse gjør prosjektet bedre, men er ikke blokkering.

- [ ] BØR-1: Lag unit-tests for auth
  - Hvorfor: Sikrer korrekthet
  - Kompleksitet: Medium

- [ ] BØR-2: Lag error-handling for API
  - Hvorfor: Bedre brukeropplevelse
  - Kompleksitet: Liten

### KAN (Nice-to-have — gjøres hvis tid)
Disse er fine-tuning, ikke kritiske.

- [ ] KAN-1: Lag request-logging
- [ ] KAN-2: Implementer rate-limiting
- [ ] KAN-3: Lag admin-dashboard for debugging

---

## 🛠️ TILGJENGELIGE RESSURSER (LAG 2)

### Ekspert-agenter
Konsulter disse når du trenger spesialistkompetanse:

| Agent | Når du bruker den | Filsti |
|-------|-------------------|--------|
| OWASP-ekspert | Sikkerhetsspørsmål | `Kit CC/Agenter/agenter/ekspert/OWASP-ekspert.md` |
| CICD-ekspert | Deploy/build-spørsmål | `Kit CC/Agenter/agenter/ekspert/CICD-ekspert.md` |
| DATABASE-ekspert | Database-design | `Kit CC/Agenter/agenter/ekspert/DATABASE-ekspert.md` |

### Basis-agenter
Delegér arbeid til disse når nødvendig:

| Agent | Hva den gjør | Filsti |
|-------|-------------|--------|
| BYGGER-agent | Implementerer kode | `Kit CC/Agenter/agenter/basis/BYGGER-agent.md` |
| DEBUGGER-agent | Feilsøker problemer | `Kit CC/Agenter/agenter/basis/DEBUGGER-agent.md` |
| REVIEWER-agent | Gjennomgår kode | `Kit CC/Agenter/agenter/basis/REVIEWER-agent.md` |

### Dokumentasjon fra tidligere faser
| Dokument | Innhold | Filsti |
|----------|---------|--------|
| FASE-3-ARKITEKTUR.md | Systemarkitektur | `docs/FASE-3-ARKITEKTUR.md` |
| FASE-3-SIKKERHET.md | Sikkerhetsplan | `docs/FASE-3-SIKKERHET.md` |
| KRAVSPESIFIKASJON.md | Funksjonelle krav | `docs/FASE-2-KRAVSPESIFIKASJON.md` |

### Klassifiseringssystem
| Type | Når du bruker den | Filsti |
|------|-------------------|--------|
| Klassifisering | MÅ/BØR/KAN-spørsmål | `Kit CC/Agenter/klassifisering/KLASSIFISERING-METADATA-SYSTEM.md` |

---

## ⛓️ GATE-KRAV (før Fase [N+1] kan starte)

For å flytte til neste fase må ALLE MÅ være true:

- [ ] MÅ: Alle MÅ-oppgaver fra denne fasen ferdig
- [ ] MÅ: Alle unit-tests grønt (90%+ coverage)
- [ ] MÅ: Sikkerhetsgransking fra OWASP-ekspert fullført
- [ ] BØR: Kode-review gjennomgått (se REVIEWER-agent)
- [ ] KAN: Performance-testing (hvis tid)

**Hvis gate feiler:** Rollback, fix problema, prøv igjen. Eller oversty gate med grunn (se `protocol-PHASE-GATES.md`).

---

## 📊 KLASSIFISERING

| Felt | Verdi |
|------|-------|
| **Prosjekttype** | Vanlig app-prosjekt (Score: 15-18) |
| **Bruker-nivå** | Erfaren vibecoder |
| **Byggemodus** | Samarbeid (AI foreslår, bruker godkjenner) |
| **Intensitet** | Medium (15-20 timer total fase) |

(Se `Kit CC/Agenter/klassifisering/KLASSIFISERING-METADATA-SYSTEM.md` for full klassifisering)

---

## 💡 TIPS FÔR DENNE FASEN

- **Tidligst mulig:** Start med MÅ-oppgaver. KAN-oppgaver gjøres hvis tid er igjen.
- **Ekspertenhjelp:** Hvis du sitter fast, les relevant Lag 2-agent (den er listet under "TILGJENGELIGE RESSURSER").
- **Gate-fokus:** Husk gate-kravene — planlegger arbeid slik at all MÅ er ferdig før fase avsluttes.
- **Kontekst-sparing:** Når du trenger mer info, signal `NEED_CONTEXT [filsti]` (se filsti under RESSURSER).

---

## 📍 MILEPÆLER

| Milepæl | Tidspunkt | Status |
|---------|-----------|--------|
| Fase [N-1] avsluttet | 2026-02-17 11:30 | ✅ Ferdig |
| Fase [N] startet | 2026-02-17 12:00 | ⏳ Nå |
| Fase [N] gate-sjekk | 2026-02-17 15:00 | ⏱️ Planlagt |
| Fase [N+1] starter | 2026-02-17 16:00 | ⏱️ Estimert |

---

*Generert: 2026-02-17*
*Av: ORCHESTRATOR (ved fase-overgang)*
*Versjon: FASE-[N]-MISSION-BRIEFING-v1.0*
```

### Komprimering (≤ 30% av original)

MISSION-BRIEFING opprettes ved:

1. **ORCHESTRATOR leser forrige fases fullstendige dokumenter** (Fase N-1)
2. **Komprimering:**
   - Behold alle beslutninger, filstier, MÅ/BØR/KAN-oppgaver
   - Fjern utfyllende forklaringer (behold 1-2 setninger max per punkt)
   - Fjern eksempler som ikke er nødvendige
   - Behold gate-krav (kritisk)
3. **Kontroll:** Original 100 linjer → Komprimert 25-30 linjer (30% av original)
4. **Lagring:** `.ai/MISSION-BRIEFING-FASE-{N}.md`

### Når opprettes MISSION-BRIEFING

```
1. Fase [N] avsluttes (gate-validering passert)
2. ORCHESTRATOR kjøres (Lag 3, kun ved fase-overgang)
3. ORCHESTRATOR leser:
   - SESSION-HANDOFF fra Fase N
   - Fullstendige dokumenter fra Fase N (docs/FASE-N-*.md)
   - Klassifiseringssystem
4. ORCHESTRATOR genererer:
   - MISSION-BRIEFING-FASE-{N+1}.md (komprimert kontekstpakke)
5. Lagres i .ai/
6. PROJECT-STATE.json oppdateres: currentPhase = N+1
7. Neste sesjon leser nye MISSION-BRIEFING når den starter Fase N+1
```

## Eksempel

**Original dokumentasjon fra Fase 3 (200 linjer):**
```
# Fase 3: Arkitektur og Sikkerhet (FULLSTENDIG)

## Systemarkitektur
React frontend vil kommunisere med Node.js-backend via REST API.
Database er PostgreSQL. Vi vil bruke JWT for autentisering.
Systemet skal skalere til 10,000 simultane brukere.
[... 50 linjer detaljer om hvert lag ...]
```

**Komprimert MISSION-BRIEFING for Fase 4 (50 linjer):**
```
# MISSION-BRIEFING — FASE 4: MVP

## OPPDRAG
"Fase 4 skal sette opp et funksjonelt MVP slik at vi har en kjørbar prototype."

## KONTEKST FRA FORRIGE FASE
Fase 3 fullførte:
- Arkitektur: React + Node.js + PostgreSQL
- Sikkerhet: JWT-auth, OWASP Top 10-sikkerhet
- Database-schema: Users, Posts, Comments

Gate-status: ✅ GODKJENT

## OPPGAVER — MÅ
- [ ] MÅ-1: Sett opp Node.js/TypeScript-prosjekt
- [ ] MÅ-2: Implementer JWT-autentisering
- [ ] MÅ-3: Lag React-hjemmeside
[...]

## RESSURSER (LAG 2)
- OWASP-ekspert.md — Sikkerhet
- DATABASE-ekspert.md — Database
- Fase 3 dokumenter: docs/FASE-3-ARKITEKTUR.md
[...]
```

## Relaterte features

- **3-lags-kontekstarkitektur** — MISSION-BRIEFING er den komprimerte Lag 2-versjonen av fullstendig dokumentasjon
- **agent-ORCHESTRATOR** — Genererer MISSION-BRIEFING ved fase-overganger
- **phase-gates** — MISSION-BRIEFING inneholder gate-krav som må oppfylles før neste fase
- **kontekstbudsjett** — MISSION-BRIEFING holdes kort (≤30% av original) for å spare kontekstbudsjett

---

*Definert i: CLAUDE.md — Steg 5 (VED FASE-OVERGANG) + MISSION-BRIEFING-MAL.md*
*Lagt til: 2026-02-17*
*Kategori: Kontekst og minne*
