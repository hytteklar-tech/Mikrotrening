# Crash-recovery

> Hvis en sesjon krasjer uventet, rekonstrueres all tilstand fra PROGRESS-LOG. Bruker ser nøyaktig hva som var underveis og får valg: prøv igjen, hopp over, rull tilbake, eller avslutt trygt.

## Hva gjør den?

Crash-recovery er et automatisk system som kjøres når en sesjon blir avbrutt. Det:

1. **Detekterer krasj** — SESSION-STATUS er "active" men PROGRESS-LOG viser ikke kontekstbudsjett-pause
2. **Rekonstruerer tilstand** — Les PROGRESS-LOG for siste handlinger, sjekk completedSteps og pendingTasks
3. **Informerer bruker** — Vis hva som var underveis (kort format, uten teknikk)
4. **Tilbyr valg** — Prøv igjen, hopp over, rull tilbake, eller avslutt trygt
5. **Fortsetter** — Gjennoppretter konteksten og fortsetter fra der det stoppet

**Resultat:** Aldri tapt arbeid. Bruker kontrollerer hva som skal skje videre.

## Hvorfor er det nyttig?

**Ingen panikk:** Hvis noe går galt (nettverksfeil, browser-krasj, strømbrudd), er alt likevel lagret.

**Bruker-kontroll:** Bruker avgjør hva som skal gjøres — vi tvinger ikke noe gjenoppretting som kanskje ikke var riktig.

**Transparent:** Bruker ser nøyaktig hvilke oppgaver som ble fullført, hvilke som ble avbrutt, og kan velge.

**Prøv igjen uten duplisering:** Hvis en oppgave ble avbrutt halvveis, kan bruker valge "prøv igjen" uten å måtte gjøre hele oppgaven fra start.

## Hvordan fungerer det?

### Deteksjon (Boot-sekvens, Steg 1B)

```
1. Les PROJECT-STATE.json
2. Sjekk: Finnes filen?
   NEI → Nytt prosjekt (gå til steg 2)
   JA → Fortsett

3. Sjekk: Er JSON gyldig?
   NEI → Korrupt! (se nedenfor)
   JA → Fortsett

4. Sjekk: session.status fra PROJECT-STATE?
   "completed" → Normal start (gå til steg 3)
   "active" → Kan være PAUSE eller KRASJ (se nedenfor)
```

### Sjekk: PAUSE eller KRASJ?

Hvis `session.status = "active"`:

```
1. Les PROGRESS-LOG siste 10 linjer
2. Sjekk: Inneholder "event=CONTEXT_BUDGET"?

   JA → ✅ KONTEKSTBUDSJETT-PAUSE (IKKE krasj!)
        • Sett session.status = "completed"
        • Oppdater SESSION-HANDOFF (hvis ikke gjort)
        • Gå til steg 3 — fortsett normalt, uten velkomstmelding

   NEI → ⚠️ EKTE KRASJ
        → Kjør gjenopprettingsalgoritmen (se nedenfor)
```

### Gjenopprettingsalgoritmen

```
1. Les session.lastSignificantAction fra PROJECT-STATE
2. Les completedSteps[] og completedTasks[] — disse er bekreftet ferdig
3. Les pendingTasks[] — disse var planlagte men ikke startet
4. Les SESSION-HANDOFF.md (hvis finnes) for milepællogg
5. Ved konflikt mellom filer: PROGRESS-LOG vinner alltid

6. Rekonstruer status:
   ├─ Hvis completedSteps inneholder siste planlagte oppgave:
   │   → Oppgaven ble fullført før krasj. Prøv neste oppgave.
   ├─ Hvis session.lastSignificantAction viser pågående arbeid:
   │   → Oppgaven ble avbrutt halvveis. Vis bruker og tilby valg.
   └─ Hvis ingen lastSignificantAction:
       → Sesjonen krasjet før noe arbeid startet.
           Gå direkte til steg 3 (normal gjenoppretting).

7. Generer kort status-rapport for bruker (maks 150 ord):
   "Sesjon krasjet. Hva som ble gjort før krasj:
    • ✅ Feature A (fullført)
    • ✅ Feature B (fullført)
    • ⚠️ Feature C (avbrutt 60% gjort)

    Valg:
    1. Prøv Feature C igjen
    2. Hopp over Feature C nå, ta opp senere
    3. Rull tilbake til før Feature C startet
    4. Avslutt og lagr alt"
```

### Brukerens valg

#### 1. Prøv igjen
```
• Les PROGRESS-LOG og sette session.lastSignificantAction tilbake til BEFORE Feature C
• Slett all delvis arbeid fra Feature C (git reset --hard [commit før C startet])
• Kjør Feature C på nytt fra bunn
• Gå til steg 4 (last arbeidsbord, fortsett)
```

#### 2. Hopp over nå, ta opp senere
```
• Marker Feature C som utsatt i PROJECT-STATE.json (legg til i deferredTasks[])
• Slett all delvis arbeid fra Feature C
• Gå til neste oppgave (Feature D)
```

#### 3. Rull tilbake
```
• Les .ai/CHECKPOINT-HISTORY/ for tidligere stabile tilstander
• Bruker velger checkpoint (f.eks. "før Feature C")
• Kjør rollback (se ROLLBACK-PROTOCOL.md, Lag 3)
• Gå til steg 4 (last arbeidsbord, fortsett fra checkpoint)
```

#### 4. Avslutt og lagr alt
```
• Sett session.status = "completed"
• Generer SESSION-HANDOFF basert på PROGRESS-LOG
• Lagr PROJECT-STATE.json atomisk (.prev + .tmp → .json)
• Vis: "All arbeid lagret. Prøv igjen neste sesjon."
```

### Atomisk skriving (forhindrer korrupt state)

All skriving til PROJECT-STATE.json bruker atomisk pattern:

```
1. Kopier eksisterende .ai/PROJECT-STATE.json → .ai/PROJECT-STATE.json.prev (backup)
2. Skriv ny versjon til .ai/PROJECT-STATE.json.tmp
3. Rename .ai/PROJECT-STATE.json.tmp → .ai/PROJECT-STATE.json (atomisk)

Hvis steg 3 feiler:
  • .prev blir ikke påvirket
  • .tmp blir liggennde (ignoreres ved neste oppstart)
  • PROGRESS-LOG.md er fortsatt intakt
  → Neste sesjon kan rekonstruere fra PROGRESS-LOG eller .prev
```

### Håndtering av korrupt PROJECT-STATE.json

```
Hvis .ai/PROJECT-STATE.json er korrupt (ugyldig JSON):
  1. Opprett backup: kopier → .ai/PROJECT-STATE.json.prev
  2. Les .ai/PROGRESS-LOG.md for rekonstruksjon
  3. Hvis PROGRESS-LOG også mangler eller er tom:
     → Spør bruker: "Prosjektet ser korrupt ut. Vil du starte på nytt?"
     → Hvis JA: Gå til steg 2 (NYTT PROSJEKT)
     → Hvis NEI: Behold .prev-backup og be bruker kontakte support
  4. Rekonstruer PROJECT-STATE.json fra PROGRESS-LOG
  5. Gå til steg 3 (GJENOPPTA)
```

## Eksempel

**Sesjon 1 — Kjøring:**
```
ts=09:00 event=START task=feature-login desc="Login-side"
ts=09:10 event=FILE op=created path="src/pages/Login.tsx"
ts=09:15 event=FILE op=modified path="src/pages/Login.tsx" desc="Validering"
ts=09:20 → KRASJ! (nettverksfeil, bruker lukker browser, whatever)
```

**PROJECT-STATE.json ved krasj:**
```json
{
  "session": {
    "status": "active",
    "startedAt": "2026-02-17T09:00:00Z",
    "lastSignificantAction": "Arbeider på feature-login (Login-side) — ca. 60% ferdig"
  },
  "completedTasks": ["feature-auth"],
  "pendingTasks": ["feature-login", "feature-dashboard"]
}
```

**Sesjon 2 — Oppstart:**
```
Boot-sekvens, steg 1B:
1. Les PROJECT-STATE.json → session.status = "active"
2. Les PROGRESS-LOG siste 10 linjer → IKKE "event=CONTEXT_BUDGET"
3. ⚠️ EKTE KRASJ OPPDAGET

Gjenopprettingsalgoritmen:
1. Les lastSignificantAction: "Arbeider på feature-login ... 60% ferdig"
2. Les completedTasks: ["feature-auth"] — dette var ferdig
3. Les pendingTasks: ["feature-login", "feature-dashboard"]

Status-rapport til bruker:
"Sesjon krasjet! Her er hva som skjedde før:
 ✅ Autentisering (feature-auth) — FULLFØRT
 ⚠️ Login-side (feature-login) — AVBRUTT (ca. 60% gjort)

 Hva vil du gjøre?
 1. Prøv Login-siden igjen
 2. Hopp over Login nå, ta opp senere
 3. Rull tilbake til før Login startet
 4. Avslutt og lagr alt"

Bruker velger: 1. Prøv igjen
→ Systemet kjører feature-login på nytt fra start
→ Gå til steg 4 (last arbeidsbord, fortsett)
```

## Relaterte features

- **progress-log** — Rådata som crash-recovery bruker til rekonstruksjon
- **kontekstbudsjett** — Skiller "krasj" fra "planlagt pause" via PROGRESS-LOG
- **session-handoff** — Lagres som backup når krasj oppdages
- **3-lags-kontekstarkitektur** — Arbeidsbord (Lag 1) kan alltid gjenopprettes fra PROGRESS-LOG

---

*Definert i: CLAUDE.md — Boot-sekvens, steg 1B (KRASJ-SJEKK)*
*Lagt til: 2026-02-17*
*Kategori: Kontekst og minne*
