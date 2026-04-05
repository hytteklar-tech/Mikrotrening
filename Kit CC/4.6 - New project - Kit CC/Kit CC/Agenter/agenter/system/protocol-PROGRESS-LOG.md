# protocol-PROGRESS-LOG.md — Handlingslogg-protokoll

> **SSOT for PROGRESS-LOG format og triggere.** Referert fra CLAUDE.md og alle prosess-agenter.
> Versjon: 1.0.0 | Opprettet: 2026-02-23

---

## FORMÅL

`.ai/PROGRESS-LOG.md` er en append-only handlingslogg som gjør Kit CC **memory-independent**. Agenter trenger ikke å huske hva som ble gjort — neste sesjon leser loggen og fortsetter nøyaktig der forrige sluttet.

**Kjerneprinsipp:** Logging er en del av arbeidsflyten, ikke noe agenten må huske å gjøre separat. Tenk på PROGRESS-LOG som auto-save i et spill — du lagrer etter hvert fullført mål, aldri etter 2 timer.

---

## FORMAT: LOGFMT

Alle entries bruker logfmt-format:
- Nøkler er lowercase uten mellomrom
- Verdier med mellomrom omsluttes av `"`
- Én hendelse per linje
- Ingen emojis — ren maskinlesbar tekst

**Eksempel:**
```
ts=14:32 event=START task=F3.1 session=abc123 desc="Implementer login-side"
ts=14:45 event=FILE op=created path="src/pages/login.tsx" desc="Login-komponent"
ts=14:47 event=COMMIT msg="feat: add login page"
ts=14:47 event=DONE task=F3.1 output="src/pages/login.tsx"
```

---

## EKSPLISITTE TRIGGERE

Append én linje til `.ai/PROGRESS-LOG.md` **ETTER HVER av disse hendelsene:**

| # | Trigger | Format |
|---|---------|--------|
| 1 | FØR oppstart av ny oppgave | `ts=HH:MM event=START task=[oppgave-ID] session=[sessionId] desc="[beskrivelse]"` |
| 2 | Etter HVER ny/endret fil | `ts=HH:MM event=FILE op=[created\|modified] path="[filsti]" desc="[kort beskrivelse]"` |
| 3 | Etter HVER git commit | `ts=HH:MM event=COMMIT msg="[commit-melding]"` |
| 4 | Etter HVER fullført oppgave | `ts=HH:MM event=DONE task=[oppgave-ID] output="[leveranse/fil]"` |
| 5 | Etter HVER brukerbeslutning | `ts=HH:MM event=DECISION what="[hva ble bestemt]" reason="[begrunnelse]"` |
| 6 | Ved feil | `ts=HH:MM event=ERROR desc="[beskrivelse]" fix="[løsning]"` |
| 7 | Ved kontekstbudsjett | `ts=HH:MM event=CONTEXT_BUDGET files=[antall] messages=[antall]` |
| 8 | Ved gjenoppretting | `ts=HH:MM event=RECOVERY action="[handling]" reason="[årsak]"` |
| 9 | Ved modusbytte | `ts=HH:MM event=MODE_CHANGE from="[fra]" to="[til]"` |
| 10 | Ved automatisk feilretting | `ts=HH:MM event=ERROR_AUTOFIX errors_found=[antall] fixed=[antall]` |

**Merk:**
- `session`-felt inkluderes KUN i `START`-events (for sesjon-korrelering)
- **IKKE oppdater for:** Lesing av filer, spørsmål til bruker, intern koordinering

---

## ARBEIDSSYKLUS MED INNEBYGD LOGGING

```
For HVER oppgave:
  1. Append PROGRESS-LOG: ts=HH:MM event=START task=[id] session=[sessionId] desc="[oppgave]"
  2. Utfør oppgaven (kode, filer, etc.)
  3. Git commit med beskrivende melding
  4. Append PROGRESS-LOG: ts=HH:MM event=COMMIT msg="[melding]"
     + ts=HH:MM event=DONE task=[id] output="[leveranse]"
  5. Etter 3 fullførte oppgaver → oppdater PROJECT-STATE.json
  6. Neste oppgave
```

---

## FORHOLD MELLOM LOGGFILER

| Fil | Frekvens | Kostnad | Formål |
|-----|----------|---------|--------|
| `PROGRESS-LOG.md` | Etter HVER handling | Lav (1 linje append) | Minutt-for-minutt historikk |
| `PROJECT-STATE.json` | Etter 3 oppgaver / sesjonsslutt | Høy (les+skriv JSON) | Strukturert tilstand |
| `SESSION-HANDOFF.md` | Ved milepæler / sesjonsslutt | Medium | Fase-overføring |

**Prioritetsrekkefølge ved uenighet:** PROGRESS-LOG > SESSION-HANDOFF > PROJECT-STATE

---

## EMOJI-REGEL

- Emojis brukes KUN i brukervendt output (f.eks. "Vis status"-kommandoer, velkomstsvar, pausemeldinger)
- PROGRESS-LOG bruker ALLTID ren logfmt uten emojis
- Samme gjelder PROJECT-STATE.json og SESSION-HANDOFF.md — disse er maskinlesbare data-filer

---

## KONTEKSTBUDSJETT-INTEGRASJON

PROGRESS-LOG er primærkilde for kontekstbudsjett-deteksjon:
- Ved boot sjekkes siste 10 linjer for `event=CONTEXT_BUDGET`
- Hvis funnet → kontekstbudsjett-pause (ikke krasj)
- Fullstendig kontekstbudsjett-protokoll: se `protocol-KONTEKSTBUDSJETT.md`
