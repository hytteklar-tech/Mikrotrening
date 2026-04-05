# Kontekstbudsjett

> Automatisk pausering når AI har lastet 8 unike filer eller utvekslet 25 meldinger — for å holde konteksten frisk og sikre at neste sesjon starter rask.

## Hva gjør den?

Kontekstbudsjett er en grense som trigges når AI's kontekstvindu blir halv-fullt. Ved triggering:

1. **All tilstand lagres**: PROGRESS-LOG → SESSION-HANDOFF → PROJECT-STATE.json (atomisk skriving)
2. **Bruker informeres**: "Du har nådd kontekstgrensen. Jeg anbefaler å starte ny sesjon — all arbeid er lagret."
3. **Systemet pauser**: Agenten stopper arbeid og venter på brukers svar
4. **Gjenoppretting ved ny sesjon**: Boot-sekvensen sjekker PROGRESS-LOG, finne "kontekstbudsjett-pause"-event, og fortsetter nøyaktig der forrige sluttet

**Resultat:** Uendelig lange prosjekter kjøres i korte sesjoner uten å miste kontekst.

## Hvorfor er det nyttig?

**Holder agenten skarp:** Hver sesjon starter frisk (4 filer), ikke sliten (90+ filer). Kvaliteten på arbeidet holdes konstant.

**Forhindrer dårlige avgjørelser:** Når konteksten blir dårlig, blir også avgjørelsene dårlig. Pause sikrer at AI alltid arbeider med klart hode.

**Trivielt for bruker:** Bruker merker bare at systemet sier "ny sesjon anbefales". Alt som ble gjort er lagret. Bruker åpner en ny chat og fortsetter der de slapp.

**Fungerer på alle plattformer:** Claude Code, Cursor, Windsurf, Cline — alle har samme konteksttaking, samme grense.

## Hvordan fungerer det?

### Teller

Systemet teller to ting:

- **Unike filer**: Samme fil telles kun én gang (hvis du leser `PROJECT-STATE.json` tre ganger, teller det som 1)
- **Meldinger**: Hver brukermelding + hver AI-svar = 1 melding. Eksempel: 3 brukerrunder = 6 meldinger

### Grenser

| Metrikk | Grense | Tilsvarer |
|---------|--------|-----------|
| Unike filer | 8 | Ca. 20-30 KB kontekstkostnaden per fil |
| Meldinger | 25 | Ca. 12-13 bruker-AI dialogrunder |

**Trigges når ENTEN grense nåes** (8 filer ELLER 25 meldinger, hva som kommer først).

### Lagringsprosess

Når grensen trigges:

```
1. Append til PROGRESS-LOG.md:
   ts=HH:MM event=CONTEXT_BUDGET reason="[files|messages]" count=[N]

2. Generer/oppdater SESSION-HANDOFF.md:
   - Hva som ble gjort denne sesjonen
   - Påbegynte oppgaver (og deres status)
   - Viktige beslutninger
   - Filsti for Lag 2-ressurser brukt

3. Oppdater PROJECT-STATE.json:
   - session.status = "completed"
   - session.endedAt = nåværende tidspunkt (ISO 8601)
   - completedTasks[], completedSteps[], pendingTasks[]

   Bruk atomisk skriving:
   a) Kopier PROJECT-STATE.json → PROJECT-STATE.json.prev (backup)
   b) Skriv ny versjon til PROJECT-STATE.json.tmp
   c) Rename .tmp → .json (atomisk)
```

### Gjenoppretting ved ny sesjon

Boot-sekvensen kjøres:

```
1. Les PROJECT-STATE.json
2. Sjekk: session.status = "active"?
   JA → Sjekk PROGRESS-LOG siste 10 linjer
        HVIS siste event = "CONTEXT_BUDGET" →
           ✅ KONTEKSTBUDSJETT-PAUSE (ikke krasj!)
           Sett session.status = "completed"
           Vis kort status og fortsett arbeid
        HVIS annet event →
           ⚠️ EKTE KRASJ — starta gjenopprettingsalgoritmen
```

## Eksempel

**Sesjon 1:**
- AI lastet: PROJECT-STATE, 4-MVP-agent, MISSION-BRIEFING-FASE-4, PROGRESS-LOG (4 filer)
- Lager feature A (lastet 2 eksperter = 6 filer totalt)
- Skriver tests (lastet klassifiseringssystem = 7 filer)
- Lager feature B (lastet enda en ekspert = 8 filer) ← **GRENSE NÅDD**
- AI: "Kontekstbudsjett nådd. Anbefaler ny sesjon. Alt arbeid lagret!"
- PROGRESS-LOG får: `ts=14:25 event=CONTEXT_BUDGET reason="files" count=8`
- SESSION-HANDOFF oppdateres med fremgang
- PROJECT-STATE får: `session.status = "completed"`

**Bruker:** Åpner ny chat, sier "Fortsett"

**Sesjon 2:**
- Boot-sekvensen kjøres
- Les PROJECT-STATE → session.status = "completed"
- Sjekk PROGRESS-LOG → siste event er CONTEXT_BUDGET
- ✅ PAUSE-gjenoppretting (ikke krasj)
- Sett session.status = "active"
- Les SESSION-HANDOFF: "Feature A og B laget. Gjenstår: Feature C, tests for B"
- Arbeidsbord lastes på nytt: 4 filer (frisk kontekst!)
- AI: "Velkommen tilbake. Vi stoppet på feature B-tests. Neste er feature C."
- **Totalt arbeid:** 2 sesjoner × 25 meldinger = 50 meldinger mulig, men pause ved 25
- **Kontekstkvalitet:** Konstant høy (starter hver sesjon med 4 filer)

## Relaterte features

- **3-lags-kontekstarkitektur** — Arbeidsbord (Lag 1) har 4 filer; grensen sikrer vi aldri stikker til Lag 3
- **progress-log** — Registrerer CONTEXT_BUDGET-event slik at gjenoppretting vet at dette var en pause, ikke krasj
- **session-handoff** — Lagres når kontekstbudsjett nåes, slik at neste sesjon vet nøyaktig hvor man stoppet
- **crash-recovery** — Skiller mellom "kontekstbudsjett-pause" og "ekte krasj" basert på PROGRESS-LOG

---

*Definert i: Kit CC/Agenter/agenter/system/protocol-KONTEKSTBUDSJETT.md*
*Lagt til: 2026-02-17*
*Kategori: Kontekst og minne*
