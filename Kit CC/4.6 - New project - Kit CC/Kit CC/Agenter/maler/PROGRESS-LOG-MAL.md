# Progress Log Template

> **Formål:** Minutt-for-minutt handlingslogg for crash recovery og kontekstgjenoppretting.
> **Vedlikeholdes av:** Alle agenter (append-only etter HVER handling)
> **Leses av:** ORCHESTRATOR (ved krasj-deteksjon, primærkilde for recovery)
> **Crash-resilient:** Ja — append-only struktur, ingen overskriving

**Filplassering:** `.ai/PROGRESS-LOG.md`

> **v3.3 — Forholdet mellom PROGRESS-LOG og SESSION-HANDOFF:**
> - `PROGRESS-LOG.md` = Minutt-for-minutt handlingslogg (append-only, etter HVER handling)
> - `SESSION-HANDOFF.md` = Fase-overføring og milepælsoversikt (oppdateres ved milepæler/sesjonsslutt)
> - Ved krasj: Les PROGRESS-LOG først (mer detaljert og oppdatert)

---

## Når skal jeg legge til en linje?

**ALLTID append til PROGRESS-LOG.md etter:**

1. **Oppgave startet** → Logging av arbeid
2. **Ny fil opprettet eller vesentlig endret** → Dokumentert for recovery
3. **Git commit** → Ny versjon lagret
4. **Oppgave fullført** → Milepael oppnaadd
5. **Brukerbeslutning** → Dokumentert for sammenheng
6. **Feil oppdaget og haandtert** → Viktig for recovery
7. **Kontekstbudsjett naadd** → Synkronisering med SESSION-HANDOFF.md
8. **Recovery utfoert** → Gjenopprettet fra krasj eller korrupt state
9. **Modus endret** → Endring av byggemodus

---

## Logfmt-format (v2.0)

Hver linje bruker **logfmt**-format: nokler er lowercase uten mellomrom, verdier med mellomrom omsluttes av `"`. En hendelse per linje. Ingen emojis.

### Alle hendelsestyper:

```
ts=HH:MM event=START task=[oppgave-ID] desc="[beskrivelse]"
ts=HH:MM event=FILE op=[created|modified] path="[filsti]" desc="[kort beskrivelse]"
ts=HH:MM event=COMMIT msg="[commit-melding]"
ts=HH:MM event=DONE task=[oppgave-ID] output="[leveranse/fil]"
ts=HH:MM event=DECISION what="[hva ble bestemt]" reason="[begrunnelse]"
ts=HH:MM event=ERROR desc="[beskrivelse]" fix="[losning]"
ts=HH:MM event=CONTEXT_BUDGET files=[antall] messages=[antall]
ts=HH:MM event=RECOVERY action="[handling]" reason="[aarsak]"
ts=HH:MM event=MODE_CHANGE from="[fra]" to="[til]"
```

### Logfmt-regler:
- Nokler er lowercase uten mellomrom
- Verdier med mellomrom omsluttes av `"`
- En hendelse per linje
- Ingen emojis — ren maskinlesbar tekst

---

## Eksempel: En realistisk arbeidssokt

```
# PROGRESS-LOG.md

## SESSION: 2026-02-09 10:00 — [SESSION-ID]

ts=10:00 event=RECOVERY action="session recovered from crash" reason="session.status was active"
ts=10:02 event=FILE op=modified path=".ai/PROJECT-STATE.json" desc="Lest prosjektstatus"
ts=10:05 event=START task=MVP-01 desc="BYGGER — Implementere login-side"
ts=10:15 event=FILE op=created path="src/pages/login.jsx" desc="Basis-struktur"
ts=10:30 event=FILE op=modified path="src/pages/login.jsx" desc="Lagt til form + validering"
ts=10:45 event=COMMIT msg="WIP: Login-side med form validering"
ts=11:00 event=DONE task=MVP-01 output="login-side komplett med auth integration"
ts=11:02 event=DECISION what="Utsetter dark mode til Fase 6" reason="Bruker prioriterer funksjonalitet"
ts=11:05 event=START task=MVP-02 desc="Testing av login-flow"
ts=11:20 event=ERROR desc="Login feiler paa Firefox" fix="Fikset CORS-headers"
ts=11:25 event=COMMIT msg="Fix: CORS-headers for login endpoint"
ts=11:30 event=DONE task=MVP-02 output="Login-side godkjent for demo"
ts=11:32 event=CONTEXT_BUDGET files=9 messages=22

## SESSION: 2026-02-10 14:00 — [SESSION-ID]

ts=14:00 event=START task=MVP-03 desc="Implementere JWT-token refresh"
```

---

## Rotasjonspolicy

**Fil blir for stor naar:** > 500 linjer

**Handling:**
1. Behold **siste 200 linjer** i `.ai/PROGRESS-LOG.md`
2. Arkiver resten til `.ai/archive/PROGRESS-LOG-[YYYYMMDD-HHMMSS].md`
3. Legg til separatorlinje paa toppen av ny PROGRESS-LOG:
   ```
   # PROGRESS-LOG.md (komprimert)

   > Arkivert: Eldre logger i `.ai/archive/`
   ```

---

## Sessionsseparator

Naar en ny session starter, legg til denne paa toppen av loggen:

```
## SESSION: YYYY-MM-DD HH:MM — [SESSION-ID]

```

**SESSION-ID:** Generer kort UUID eller bruk session timestamp.

---

## Crash Recovery — Hvordan brukes loggen

**Ved krasj-deteksjon (session.status = "active"):**

1. **Les siste 10 linjer** i PROGRESS-LOG.md (PRIMAERKILDE)
2. **Finn siste event=DONE eller event=START** — dette er siste kjente tilstand
3. **Les SESSION-HANDOFF.md** for kontekst og milepaler (backup)
4. **Ved uenighet:** PROGRESS-LOG er autoritativ (mer oppdatert)
5. **Estimer datatap:** Basert paa tid siden siste event=DONE eller event=COMMIT

### Eksempel recovery-sekvens:

```
Les PROGRESS-LOG siste 10 linjer:
ts=14:32 event=START task=MVP-05 desc="BYGGER — Teste checkout-flow"
ts=14:35 event=FILE op=created path="src/components/Checkout.jsx"
ts=14:50 event=ERROR desc="Payment API timeout" fix="Retry-logikk lagt til"
ts=14:52 event=FILE op=modified path="src/components/Checkout.jsx"
ts=15:00 event=START task=MVP-06 desc="Full checkout testing"
[SESSION STOPPED HERE]

-> KONKLUSJON: Checkout komponenten var under testing, men ikke committet
-> ANBEFALING: Test manuelt, deretter commit hvis OK
-> DATATAP: Minimal — max 15 minutter arbeid
```

---

## Regler for append

1. **En linje per handling** — ikke kombiner flere triggere paa en linje
2. **Alltid HH:MM-format** — 24-timers format
3. **Kort beskrivelse** — maks 1 setning per linje
4. **Filstier maa vaere relative** — f.eks. `src/pages/login.jsx`, ikke fullstendige stier
5. **Ingen sletting eller overskriving** — append-only alltid
6. **Ingen emojis** — PROGRESS-LOG er maskinlesbar data

---

## Integrasjon med andre filer

| Fil | Forhold |
|-----|---------|
| `.ai/SESSION-HANDOFF.md` | Oppdateres mindre hyppig (per milepael); PROGRESS-LOG er mer granulaer |
| `.ai/PROJECT-STATE.json` | Strukturert tilstand; PROGRESS-LOG er mer detaljert timeline |
| `docs/FASE-X/` | Dokumentasjon for avgjorelser; PROGRESS-LOG logger naar de ble gjort |

---

## Tips for lesing av loggen

**Finn siste handling av type X:**
```bash
grep "event=DONE" .ai/PROGRESS-LOG.md | tail -5
```

**Finn alle feil i dag:**
```bash
grep "event=ERROR" .ai/PROGRESS-LOG.md
```

**Tell commits denne sesjonen:**
```bash
grep "event=COMMIT" .ai/PROGRESS-LOG.md | wc -l
```

---

## Template ferdig

Denne malen er klar for bruk. For hver ny session:
1. Legg til `## SESSION: [date] [time] — [ID]` paa toppen
2. Append nye linjer i logfmt-format etter hver handling
3. Ved crash: Les siste 10 linjer forst

---

## DEPRECATED (v1.0 emoji-format)

> Tidligere versjon brukte emoji-basert format. Dette er erstattet av logfmt i v2.0.
> Beholdt her kun som referanse for migrering av eldre logger.

```
Gammelt format (v1.0):
- HH:MM [EMOJI] [TRIGGER]: [AGENT] — [beskrivelse]

Eksempler:
- 10:15 ⏳ STARTET: BYGGER — Implementere login-page
- 10:42 ✅ FULLFORT: BYGGER -> src/pages/login.jsx (komplett)
- 10:43 📄 FIL: opprettet docs/FASE-3/auth-plan.md
- 10:45 💾 COMMIT: "Implementert JWT authentication"
- 11:02 🔧 BESLUTNING: Bruker godkjente auth-design
- 11:15 ❌ FEIL: Import-feil i auth.py -> Fikset path
- 11:30 ⚠️ KONTEKST: Budsjett naadd (8 filer lest/skrevet)
- 14:20 📋 MODUL: M-005 komplettert (5/5 underfunksjoner)
```
