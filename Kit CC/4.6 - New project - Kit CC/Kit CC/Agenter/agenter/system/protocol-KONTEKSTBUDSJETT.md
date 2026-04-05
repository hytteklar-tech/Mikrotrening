# protocol-KONTEKSTBUDSJETT.md — SSOT for kontekstbudsjett-håndtering

> **Versjon:** 1.0.0
> **Type:** Protokoll (SSOT — Single Source of Truth)
> **Lag:** 2 (Skrivebordsskuff — lastes on-demand av prosess-agenter)
> **Erstatter:** Dupliserte KONTEKSTBUDSJETT-seksjoner i alle prosess-agenter og CLAUDE.md

---

## FORMÅL

AI-agenter har begrenset kontekstvindu. Denne protokollen sikrer at agenter **pauser og lagrer** før kvaliteten degraderer, slik at neste sesjon kan fortsette nøyaktig der forrige sluttet.

---

## TERSKLER

| Trigger | Terskelverdi | Beskrivelse |
|---------|-------------|-------------|
| Filer | **8 unike filer** lest/skrevet | Teller unike filer (samme fil telles kun én gang) |
| Meldinger | **25 meldinger** | Hver bruker↔AI utveksling teller (spørsmål + svar = 2) |

**Regel:** Når **enten** terskel nås → OBLIGATORISK PAUSE.

---

## TELLEMEKANISME

Agenter kan ikke måle kontekst direkte, men bruker proxy-tellere:

### Filtelling
- Teller = antall **unike** filer som er lest eller skrevet denne sesjonen
- Samme fil telles kun **én gang** selv om den leses flere ganger
- Hver `Edit`, `Write`, `Read` av en fil teller som én
- **Eksempel:** Leser 3 filer, endrer 2 av dem, leser en annen = **4 unike filer**

### Meldingstelling
- Teller = antall bruker↔AI utvekslinger denne sesjonen
- Hver brukertekst som mottas + hver AI-respons = **én melding hver**
- Én runde (bruker spør → AI svarer) = **2 meldinger**

### Praktisk gjennomføring
- Agenten holder **intern telling** og sjekker etter hver handling
- Når enten teller når sin terskelverdi → trigger PAUSE
- Telling **settes til null** ved sesjonstart

---

## PAUSE-PROSEDYRE

### STEG 1 — LAGRE FØRST (rekkefølge er kritisk for atomisitet)

All lagring MÅ fullføres **FØR** noe vises til bruker:

1. **PROGRESS-LOG** (append):
   `ts=HH:MM event=CONTEXT_BUDGET desc="Budsjett nådd — lagring startet"`

2. **SESSION-HANDOFF.md** (oppdater):
   Inkluder neste steg + milepæler fra denne sesjonen

3. **Fase-overgang** (kun hvis alle MÅ-oppgaver for fasen er fullført):
   → Oppdater `currentPhase` til neste fase i PROJECT-STATE.json
   → Generer MISSION-BRIEFING for neste fase (kort versjon — fullstendig genereres ved neste sesjon)

4. **PROJECT-STATE.json** (SIST — dette er "commit"-operasjonen):
   → Alt fullført arbeid + `session.status = "completed"`
   → Bruk atomisk skriving: skriv til `.tmp`, rename til `.json` (se CLAUDE.md → "PROJECT-STATE.json skriving")
   → ⚠️ Hvis rename lykkes → sesjonen er lagret sikkert
   → Hvis rename feiler → neste sesjon ser `session.status="active"` og gjenoppretter fra PROGRESS-LOG

### Konsistens-regler

| Situasjon | Konsekvens |
|-----------|-----------|
| PROJECT-STATE viser `completed` men SESSION-HANDOFF mangler oppdatering | OK — neste sesjon leser PROGRESS-LOG som primærkilde |
| PROJECT-STATE viser `active` mens PROGRESS-LOG har "event=CONTEXT_BUDGET" | Lagringen ble avbrutt — neste sesjon behandler som PAUSE og fullfører lagringen |

### STEG 2 — VIS MELDING (etter at ALL lagring er ferdig)

Vis bruker (tilpass til userLevel — se agent-AGENT-PROTOCOL.md Regel K3):

> "Vi har jobbet en stund nå, og for å sikre best mulig kvalitet anbefaler jeg å starte en ny chat. Alt arbeidet er lagret — ingenting går tapt.
>
> ✅ **Anbefalt: Start en ny chat**
> → Si bare «fortsett» i den nye chatten. Kit CC leser alt og jobber videre.
>
> ⚡ **Alternativt: Fortsett her**
> → Vi kan fortsette, men kvaliteten kan bli lavere jo lenger vi jobber."

---

## PLANLEGGINGSPRINSIPP (Steg 3, Fase 4)

> **Planlegging skal ALDRI begrenses av token-budsjett.**
> Planlegging er essensielt for å oppnå brukerens mål.

Når planlegging (Steg 3 i Fase 4) treffer kontekstgrensen, følg denne **konkrete prosedyren:**

1. **Lagre hver beslutning umiddelbart** — Når bruker svarer Ja/Nei/Prate først i Runde 1, oppdater `plannedTasks[]`/`skippedTasks[]`/`pendingTasks[]` i PROJECT-STATE.json. Ikke vent til slutten.
2. **Lagre planleggingsstatus i SESSION-HANDOFF.md** — Inkluder: hvilken runde vi er i, hvilke oppgaver som er besluttet, hvilke som gjenstår, og nøyaktig hva neste handling er.
3. **Lagre `planningStatus: "in_progress"` + `planningNextTask` i PROJECT-STATE.json** — Slik at neste sesjon vet eksakt hvor den skal fortsette.
4. **Neste sesjon leser SESSION-HANDOFF → finner "PLANLEGGING PÅGÅR" → fortsetter direkte** med neste ubehandlede oppgave. Starter IKKE Steg 3 fra scratch.

> **Fullstendig prosedyre med dataformat:** Se 4-MVP-agent.md → "PLANLEGGINGS-KONTINUITET".
>
> **Resultat:** Planlegging kan strekke seg over vilkårlig mange sesjoner. Hver bruker-beslutning lagres umiddelbart, og neste sesjon trenger bare å lese hva som gjenstår.

---

## VIKTIG

- **ALL lagring (steg 1–4) MÅ være ferdig FØR meldingen vises**
- Hvis meldingen vises men lagring ikke fullførtes → inkonsistent tilstand
- PROGRESS-LOG og SESSION-HANDOFF bør **aldri** feile — kun PROJECT-STATE.json kan teoretisk feile
- Ved feil: PROGRESS-LOG er alltid kilden til sannheten
- **Ikke ignorer denne protokollen.** Kvaliteten på AI-output degraderer merkbart etter ~50% kontekstbruk

---

## HVEM BRUKER DENNE PROTOKOLLEN

| Fil | Hvordan |
|-----|---------|
| CLAUDE.md | Refererer hit fra boot-sekvens og "Viktige regler" |
| Alle 7 prosess-agenter | Refererer hit fra sin siste seksjon |
| agent-ORCHESTRATOR.md | Kan laste ved krasj-recovery for å forstå PAUSE-tilstand |

---

*Versjon: 1.0.0*
*Opprettet: 2026-02-15*
*SSOT for: Kontekstbudsjett-terskler, tellemekanisme, pause-prosedyre, lagring-rekkefølge*
