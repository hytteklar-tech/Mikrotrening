# Progress-log

> Append-only handlingslogg som gjør Kit CC memory-independent — neste sesjon vet nøyaktig hva som ble gjort fordi alt er dokumentert i maskinlesbart format.

## Hva gjør den?

PROGRESS-LOG.md er en enkel tekstfil der hver handling logges med et struktu rert format (logfmt). Den er:

- **Append-only** — Bare nye linjer legges til, aldri overskrevet
- **Maskinlesbar** — Format: `ts=HH:MM event=START task=... desc="..."`
- **Memory-independent** — Neste sesjon leser denne filen og vet alt som skjedde før
- **Single source of truth** — Ved konflikt mellom PROJECT-STATE.json og PROGRESS-LOG vinner PROGRESS-LOG

**Resultat:** Selv hvis AI har dårlig hukommelse eller systemet krasjer, kan all tilstand rekonstrueres fra loggen.

## Hvorfor er det nyttig?

**Ingen tapt arbeid:** Hvis en sesjon avbryttes uventet, kan neste sesjon lese PROGRESS-LOG og fortsette nøyaktig hvor forrige stoppet.

**Enkelt format:** Ikke JSON, XML, eller komplisert struktur — bare tekst. Lett å lese med øynene, lett for AI å parse.

**Universelt:** Fungerer på alle plattformer (Claude Code, Cursor, Windsurf, Cline) fordi det bare er en tekstfil.

**Debugging:** Hvis noe gikk galt, kan bruker (eller support) åpne PROGRESS-LOG og se eksakt hvilken rekkefølge ting skjedde.

## Hvordan fungerer det?

### Logfmt-format

Hver linje i PROGRESS-LOG følger dette mønsteret:

```
ts=HH:MM event=EVENTTYPE [nøkkel=verdi] [nøkkel="verdi med mellomrom"]
```

**Regler:**
- `ts` = tidspunkt (HH:MM format, samme som session.startedAt)
- `event` = EventType (alltid lowercase)
- Nøkler er lowercase uten mellomrom
- Verdier med mellomrom omsluttes av `""`
- Én hendelse per linje
- Ingen emojis — ren tekst

### 6 eksplisitte triggere

Append én linje til PROGRESS-LOG **ETTER HVER av disse hendelsene:**

#### 1. FØR oppstart av ny oppgave
```
ts=14:23 event=START task=feature-login desc="Implementer innloggingsside"
```

#### 2. Etter HVER ny/endret fil
```
ts=14:24 event=FILE op=created path="src/pages/login.tsx" desc="React komponent for innlogging"
ts=14:25 event=FILE op=modified path="src/pages/login.tsx" desc="Lagt til validering"
```

#### 3. Etter HVER git commit
```
ts=14:26 event=COMMIT msg="feat: Legg til innloggingsside med validering"
```

#### 4. Etter HVER fullført oppgave
```
ts=14:30 event=DONE task=feature-login output="src/pages/login.tsx"
```

#### 5. Etter HVER brukerbeslutning
```
ts=14:31 event=DECISION what="Velg Next.js fremfor SvelteKit" reason="Best i test for SSR"
```

#### 6. Ved feil
```
ts=14:32 event=ERROR desc="Import-feil i komponenten" fix="Lagt til korrekt stipath"
```

### Eksempel: Klassisk arbeidsflyt

```
ts=09:00 event=START task=setup desc="Oppsett av Fase 4 (MVP)"
ts=09:05 event=FILE op=created path="package.json" desc="Initialisert Node-prosjekt"
ts=09:06 event=FILE op=created path="src/index.ts" desc="Hovedfil"
ts=09:10 event=COMMIT msg="init: Basiskonfigurasjon av prosjekt"

ts=09:15 event=START task=feature-auth desc="Implementer autentisering"
ts=09:16 event=FILE op=created path="src/auth.ts" desc="Auth-logikk"
ts=09:20 event=FILE op=modified path="src/auth.ts" desc="Lagt til JWT-support"
ts=09:21 event=COMMIT msg="feat: Legg til JWT-basert autentisering"
ts=09:25 event=DONE task=feature-auth output="src/auth.ts"

ts=09:30 event=DECISION what="Bruk PostgreSQL" reason="Krav fra fase 3"

ts=09:45 event=START task=feature-database desc="Database-tilkobling"
ts=09:50 event=FILE op=created path="src/db.ts" desc="PostgreSQL-tilkobling"
ts=09:55 event=COMMIT msg="feat: Konfigurer PostgreSQL"
ts=10:00 event=DONE task=feature-database output="src/db.ts"

ts=10:05 event=CONTEXT_BUDGET reason="files" count=8
```

### Gjenoppretting ved krasj

**Scenarie:** Sesjon 1 krasjer. Sesjon 2 starter.

```
Sesjon 2 boot-sekvens:
1. Les PROJECT-STATE.json → session.status = "active"
2. Les PROGRESS-LOG siste 10 linjer
3. Sjekk: Inneholder "event=CONTEXT_BUDGET"?
   JA → PAUSE (ikke krasj) → Sett session.status = "completed" → Fortsett
   NEI → EKTE KRASJ → Starta gjenopprettingsalgoritmen:
        - Les session.lastSignificantAction
        - Les completedSteps og pendingTasks
        - Vis bruker hva som var underveis
        - Tilby: prøv igjen / hopp over / rull tilbak / avslutt trygt
```

## Eksempel

**PROGRESS-LOG for en miniprotsjekt-sesjon:**

```
ts=09:00 event=START task=phase-4-setup desc="Oppsett av MVP-fase"
ts=09:02 event=FILE op=created path=".ai/PROJECT-STATE.json" desc="Initialisert prosjektstatus"
ts=09:03 event=FILE op=created path="package.json" desc="Node dependencies"
ts=09:05 event=FILE op=created path="tsconfig.json" desc="TypeScript config"
ts=09:07 event=COMMIT msg="init: Basiskonfigurasjon MVP"
ts=09:10 event=DONE task=phase-4-setup output=".ai/PROJECT-STATE.json"

ts=09:15 event=DECISION what="Bruk React" reason="Best frontend framework for prototyping"

ts=09:20 event=START task=feature-homepage desc="Lag hjemmeside"
ts=09:21 event=FILE op=created path="src/pages/Home.tsx" desc="Hjemmeside komponent"
ts=09:25 event=FILE op=modified path="src/pages/Home.tsx" desc="Lagt til styling"
ts=09:30 event=COMMIT msg="feat: Lag hjemmeside"
ts=09:32 event=DONE task=feature-homepage output="src/pages/Home.tsx"

ts=09:35 event=START task=feature-about desc="Lag About-side"
ts=09:36 event=FILE op=created path="src/pages/About.tsx" desc="About-side"
ts=09:40 event=COMMIT msg="feat: Lag About-side"
ts=09:42 event=DONE task=feature-about output="src/pages/About.tsx"

ts=09:50 event=CONTEXT_BUDGET reason="messages" count=25
```

**Neste sesjon leser denne loggen og vet:**
- Fase 4 er startet
- Hjemmeside og About-side er ferdig
- React ble valgt
- 2 av 10 tasks fullført

## Relaterte features

- **3-lags-kontekstarkitektur** — PROGRESS-LOG er del av Lag 1 (Arbeidsbord), alltid tilgjengelig
- **kontekstbudsjett** — Registrerer CONTEXT_BUDGET-event når grensen nåes
- **crash-recovery** — Bruker PROGRESS-LOG til å skille mellom "pause" og "ekte krasj"
- **session-handoff** — Skrevet basert på PROGRESS-LOG-data når sesjon avsluttes

---

*Definert i: CLAUDE.md — PROGRESS-LOG PROTOKOLL (v1.0)*
*Lagt til: 2026-02-17*
*Kategori: Kontekst og minne*
