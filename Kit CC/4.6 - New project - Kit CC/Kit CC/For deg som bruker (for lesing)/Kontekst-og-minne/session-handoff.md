# Session-handoff

> Ved milepæler og sesjonsslutt skrives SESSION-HANDOFF — en overleringsbrev som forteller neste sesjon: hva ble gjort, hvilke beslutninger ble tatt, hva gjenstår, og viktig kontekst.

## Hva gjør den?

SESSION-HANDOFF.md er en lesbar oppsummering av hva som skjedde i en sesjon, skrevet på en måte som gjør det enkelt for neste sesjon å fortsette uten å måtte lese hele PROGRESS-LOG eller PROJECT-STATE.json. Det inneholder:

- **Milepællogg** — Hva ble fullført denne sesjonen
- **Påbegynte oppgaver** — Hva som er halvferdig (og status)
- **Viktige beslutninger** — Valg som påvirker resten av prosjektet
- **Gjenværende arbeid** — Hva gjenstår før neste milepæl
- **Lag 2-ressurser brukt** — Hvilke eksperter/agenter ble konsultert
- **Feilsøking og løsninger** — Problemer som ble møtt og hvordan de løstes

**Resultat:** Neste sesjon kan lese 1-2 siders notat istedenfor å parse hele PROGRESS-LOG.

## Hvorfor er det nyttig?

**Kontekst på mennesker-språk:** Mens PROGRESS-LOG er maskinlesbar, er SESSION-HANDOFF menneskelesbar. Bruker (eller AI) kan skimme den på 2 minutter.

**Raskere oppstart:** Neste sesjon leser SESSION-HANDOFF og vet nøyaktig hvor de skal starte — ingen gjetning.

**Redundans:** Hvis PROGRESS-LOG blir korrupt, kan SESSION-HANDOFF brukes til å rekonstruere nylig arbeid.

**Samarbeid:** Hvis flere agenter eller mennesker jobber på samme prosjekt, ser alle samme milepælhistorikk.

## Hvordan fungerer det?

### Struktur

```markdown
# SESSION-HANDOFF — Fase [N] ([Fasenavn])

**Periode:** [fra tidspunkt] til [til tidspunkt]
**Sesjon-ID:** [unikt ID for denne sesjonen]
**Gjeldende fase:** Fase [N]: [Fasenavn]

## Milepæler fullført denne sesjonen

- [X] Oppgave 1: [Kort beskrivelse] — Fil: [path]
- [X] Oppgave 2: [Kort beskrivelse] — Fil: [path]
- [X] Oppgave 3: [Kort beskrivelse] — Fil: [path]

**Totalt:** 3 av 10 oppgaver ferdig (30% fremdrift)

## Påbegynte oppgaver (ufullstendige)

- [ ] Oppgave 4: [Beskrivelse] — Status: 60% ferdig, gjenstår [hva]
- [ ] Oppgave 5: [Beskrivelse] — Status: Venter på [avhengighet]

## Viktige beslutninger

| Vedtak | Begrunnelse |
|--------|------------|
| Velg TypeScript | Type-sikkerhet og IDE-støtte |
| Bruk React | Best for interaktive UI |
| PostgreSQL for DB | Krav fra fase 3 KRAV-dokument |

## Gjenværende arbeid før neste milepæl

1. Fullstendig oppgave 4 (API-endpoints)
2. Fullstendig oppgave 5 (Database-migrasjoner)
3. Kjør fase-gate for Fase 4

**Estimat:** 3-4 timer

## Lag 2-ressurser brukt

- ✅ Kit CC/Agenter/agenter/ekspert/OWASP-ekspert.md — Sikkerhetskonsultasjon
- ✅ Kit CC/Agenter/agenter/basis/BYGGER-agent.md — Backend-implementasjon
- ✅ Kit CC/Agenter/klassifisering/KLASSIFISERING-METADATA-SYSTEM.md — MÅ-kravsjekk

## Feilsøking og løsninger

| Problem | Løsning | Resultat |
|---------|--------|----------|
| Type-feil i API | Oppdatert TypeScript-config | ✅ Løst |
| Database-tilkobling timeout | Økt timeout fra 5s til 30s | ✅ Løst |

## Notater for neste sesjon

- "Feature A" er pågåande. Se oppgave 4 for detaljer.
- Vi vurderte å bruke Redis, men endte med in-memory cache (se BESLUTNING: Caching-strategi)
- Fase-gate for Fase 4 må kjøres når oppgave 5 er ferdig

---
*Generert: [dato og tid]*
*Skrev: Kit CC — Fase [N]-agent*
```

### Når skrives SESSION-HANDOFF

SESSION-HANDOFF skrives ved:

1. **Kontekstbudsjett nådd** — Når PROGRESS-LOG får `event=CONTEXT_BUDGET`, skrives SESSION-HANDOFF før pause
2. **Fase fullført** — Når en fase er ferdig og systemet skal gå til neste fase
3. **Sesjon avsluttet** — Når bruker sier "stopp" eller "avslutt"
4. **Milepæl nådd** — Hvert 3-4 timer eller ved viktig hendelse

### Innhold-regler

**Hva skal med:**
- Konkrete filstier (ikke vage beskrivelser)
- Antall oppgaver fullført / totalt
- Konkrete valg og begrunnelser
- Feil som oppsto og løsninger
- Kryss av fullførte oppgaver (✅)

**Hva skal IKKE med:**
- Detaljert kode
- Alle detaljer fra PROGRESS-LOG (sammenfatt bare)
- Personlige kommentarer om agentens prestasjon
- Teknisk jargong som bruker ikke forstår

## Eksempel

```markdown
# SESSION-HANDOFF — Fase 4 (MVP)

**Periode:** 09:00 til 11:30 (2.5 timer)
**Sesjon-ID:** sess-2026-02-17-001
**Gjeldende fase:** Fase 4: MVP

## Milepæler fullført denne sesjonen

- [X] Oppsett av prosjekt — Node.js, TypeScript, React-config — Fil: `package.json`, `tsconfig.json`
- [X] Lag hjemmeside — React komponent med styling — Fil: `src/pages/Home.tsx`
- [X] Lag About-side — Statisk innhold — Fil: `src/pages/About.tsx`

**Totalt:** 3 av 8 oppgaver ferdig (37% fremdrift)

## Påbegynte oppgaver (ufullstendige)

- [ ] Autentisering (JWT) — Status: 50% ferdig, gjenstår: token-refresh-logikk
- [ ] Database-tilkobling — Status: Planlagte, starter neste sesjon

## Viktige beslutninger

| Vedtak | Begrunnelse |
|--------|------------|
| TypeScript | Type-sikkerhet, bruker er erfaren |
| React | Eneste frontend-krav |
| PostgreSQL | Skalering + ACID-krav |

## Gjenværende arbeid før Fase 5

1. Fullstendig autentisering (token-refresh)
2. Lag database-tilkobling
3. Migrér test-data
4. Kjør fase-gate test

**Estimat:** 2-3 timer

## Lag 2-ressurser brukt

- ✅ `OWASP-ekspert.md` — JWT-sikkerhet
- ✅ `BYGGER-agent.md` — React-oppsett
- ✅ `KLASSIFISERING-METADATA-SYSTEM.md` — MÅ-kravsjekk

## Feilsøking og løsninger

| Problem | Løsning | Status |
|---------|--------|--------|
| React-import feil | Fikset path i tsconfig | ✅ Løst |
| CSS-konflikt | Bruker CSS Modules | ✅ Løst |

## Notater for neste sesjon

- Autentisering er halvferdig (se oppgave "Autentisering (JWT)"). Token-refresh-logikk gjenstår.
- Husk: Vi skal IKKE bruke Redux (bruker ville ha Context API — se BESLUTNING fra Fase 2)
- Database-tilkobling starter neste sesjon — les `ARCHITECTURE.md` fra Fase 3 først

---
*Generert: 2026-02-17 11:30*
*Skrev: 4-MVP-agent*
```

## Relaterte features

- **progress-log** — Rådata som SESSION-HANDOFF oppsummerer (SESSION-HANDOFF er menneskelesbar versjon)
- **kontekstbudsjett** — SESSION-HANDOFF skrives når kontekstbudsjett nåes
- **3-lags-kontekstarkitektur** — SESSION-HANDOFF er del av Lag 2 (on-demand ressurs for neste sesjon)
- **crash-recovery** — Ved krasj sjekker systemet SESSION-HANDOFF for siste kjente tilstand

---

*Definert i: CLAUDE.md — PROGRESS-LOG PROTOKOLL + SESSION-HANDOFF-MAL.md*
*Lagt til: 2026-02-17*
*Kategori: Kontekst og minne*
