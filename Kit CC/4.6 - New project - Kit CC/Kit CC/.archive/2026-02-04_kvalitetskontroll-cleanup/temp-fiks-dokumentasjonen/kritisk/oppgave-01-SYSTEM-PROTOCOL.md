# Oppgave 1: Legg til BØR/KAN-sporingsregler i SYSTEM-PROTOCOL

> **Prioritet:** KRITISK
> **Status:** ⚪ Ikke startet
> **Estimert tid:** 1-1.5 timer
> **Kategori:** Kritisk systemfil

---

## MÅLBESKRIVELSE

Legg til sporingsregler for BØR- og KAN-oppgaver i SYSTEM-PROTOCOL.md. Dette definerer grunnreglene som alle agenter må følge for å spore ALL arbeid, ikke bare MÅ-oppgaver.

**Hvorfor kritisk:** Alle andre agenter følger SYSTEM-PROTOCOL. Hvis denne ikke er riktig, vil alle andre agenter også være feil.

---

## KILDEFIL

```
/mnt/Ongoing work/Agenter/agenter/system/SYSTEM-PROTOCOL.md
```

---

## NÅVÆRENDE TILSTAND

SYSTEM-PROTOCOL definerer STATE-OPPDATERINGS-KONVENSJON som er binær:
- Oppgave fullført → legg til i completedTasks
- Feil oppstod → logg til blockedTasks

**Problem:** Ingen tilstand for:
- "Valgfri men gjennomført" (BØR/KAN som ble utført)
- "Valgfri og bevisst skipet" (BØR/KAN som ble skipet med begrunnelse)
- "Delvis dekket" (arbeid som inngår i en annen leveranse)

---

## ØNSKET TILSTAND

Utvide STATE-OPPDATERINGS-KONVENSJON med:
1. Ny struktur for completedSteps (objekt-array i stedet for string-array)
2. Regler for sporing av BØR/KAN-oppgaver
3. Krav om begrunnelse for skippede BØR-oppgaver
4. Eksempler på riktig og feil sporing

---

## KONKRETE ENDRINGER

### Endring 1: Finn STATE-OPPDATERINGS-KONVENSJON seksjonen

Finn seksjonen som beskriver hvordan agents oppdaterer PROJECT-STATE.json.
Dette er sannsynligvis rundt linje 200-300 i filen.

### Endring 2: Legg til ny underseksjon

**ETTER** eksisterende STATE-OPPDATERINGS-KONVENSJON, legg til:

```markdown
### Sporing av BØR- og KAN-oppgaver

**VIKTIG:** Alle oppgaver som faktisk utføres SKAL spores, uavhengig av intensitetsnivå (MÅ/BØR/KAN).
Oppgaver som er BØR eller KAN ved gjeldende nivå og som SKIPPES skal også dokumenteres.

#### Ny completedSteps-struktur

Fra versjon 3.0 støtter completedSteps både enkel format (bakoverkompatibilitet) og utvidet format:

**Enkel format (kun for MÅ-oppgaver):**
```json
"completedSteps": [
  "ARK-01-tech-stack-decision",
  "ARK-02-database-schema"
]
```

**Utvidet format (ANBEFALT for alle oppgaver):**
```json
"completedSteps": [
  {
    "id": "ARK-01",
    "name": "Tech stack-valg",
    "requirement": "MÅ",
    "status": "completed",
    "deliverable": "tech-stack-decision.md",
    "timestamp": "2026-02-03T14:30:00Z"
  },
  {
    "id": "ARK-07",
    "name": "DREAD-rangering",
    "requirement": "BØR",
    "status": "completed",
    "deliverable": "threat-model-stride.md",
    "note": "Inkludert som del av STRIDE-analysen",
    "timestamp": "2026-02-03T15:45:00Z"
  }
]
```

#### Felter i utvidet format

| Felt | Påkrevd | Type | Beskrivelse |
|------|---------|------|-------------|
| `id` | Ja | string | Oppgave-ID (f.eks. "ARK-07") |
| `name` | Ja | string | Menneskelesbart navn |
| `requirement` | Ja | "MÅ" \| "BØR" \| "KAN" | Krav ved gjeldende intensitetsnivå |
| `status` | Ja | "completed" \| "partial" | Status (partial = delvis dekket i annen leveranse) |
| `deliverable` | Nei | string | Filnavn for leveranse |
| `note` | Nei | string | Ekstra kontekst (påkrevd ved partial) |
| `timestamp` | Nei | ISO 8601 | Når oppgaven ble fullført |

#### Skippede oppgaver (ny array)

Legg til `skippedSteps` i PROJECT-STATE.json for oppgaver som bevisst ble skipet:

```json
"skippedSteps": [
  {
    "id": "OPP-08",
    "name": "Markedskonkurrenter",
    "requirement": "BØR",
    "reason": "Intern dashboard uten direkte konkurrenter i markedet",
    "timestamp": "2026-02-01T10:00:00Z"
  }
]
```

**Viktig:** En skipet BØR-oppgave MED begrunnelse er like bra som en utført BØR-oppgave.
Poenget er å dokumentere beslutningen, ikke å gjøre alt arbeid.

#### Sporingsregler for agenter

1. **MÅ-oppgaver:**
   - SKAL alltid utføres (med mindre blokkert)
   - SKAL alltid spores i completedSteps
   - Hvis blokkert: Dokumenter i blockedTasks

2. **BØR-oppgaver:**
   - SKAL tilbys til bruker (med mindre hurtigspor)
   - Hvis utført: Legg til i completedSteps med requirement: "BØR"
   - Hvis skipet: Legg til i skippedSteps med begrunnelse
   - Hvis delvis dekket: Legg til i completedSteps med status: "partial" og note

3. **KAN-oppgaver:**
   - KAN tilbys til bruker som valg
   - Hvis bruker valgte ja: Legg til i completedSteps med requirement: "KAN"
   - Hvis bruker valgte nei: Legg til i skippedSteps med reason: "Bruker valgte nei"
   - Hvis ikke tilbudt: Ingen sporing nødvendig

4. **Hurtigspor-modus:**
   - Agent tar beslutninger autonomt
   - MEN: Alle beslutninger SKAL dokumenteres
   - BØR-oppgaver som naturlig inngår i MÅ-arbeid: Inkluder og dokumenter
   - BØR-oppgaver som ikke passer: Skip og dokumenter begrunnelse
   - KAN-oppgaver: Skip med reason: "Hurtigspor-modus"

#### Eksempel: Komplett fase-sporing

```json
{
  "phaseProgress": {
    "phase3": {
      "status": "completed",
      "mode": "fast-track",
      "completedSteps": [
        {
          "id": "ARK-01",
          "name": "Tech stack-valg",
          "requirement": "MÅ",
          "status": "completed",
          "deliverable": "tech-stack-decision.md"
        },
        {
          "id": "ARK-07",
          "name": "DREAD-rangering",
          "requirement": "BØR",
          "status": "completed",
          "deliverable": "threat-model-stride.md",
          "note": "Inkludert i STRIDE-analysen"
        }
      ],
      "skippedSteps": [
        {
          "id": "ARK-09",
          "name": "Ekstern trusselmodell-review",
          "requirement": "KAN",
          "reason": "Hurtigspor-modus — intern review tilstrekkelig for MVP"
        }
      ]
    }
  }
}
```

#### Verifisering ved handoff

Når en agent fullfører en fase, skal den verifisere:

1. ✅ Alle MÅ-oppgaver er i completedSteps eller blockedTasks
2. ✅ Alle BØR-oppgaver er enten i completedSteps eller skippedSteps
3. ✅ Alle skippedSteps har begrunnelse (reason-felt)
4. ✅ Alle completedSteps med status: "partial" har note-felt
5. ✅ Ingen oppgaver mangler sporing

Hvis noen av disse feiler, skal agenten:
- Stoppe før handoff
- Spørre bruker om manglende beslutninger
- Oppdatere PROJECT-STATE.json
- Deretter fortsette med handoff

---

## PLASSERING I FILEN

1. Les SYSTEM-PROTOCOL.md og finn STATE-OPPDATERINGS-KONVENSJON seksjonen
2. Legg til den nye undersekningen "Sporing av BØR- og KAN-oppgaver" ETTER eksisterende konvensjoner
3. Plasser den FØR eventuell "Eskalering" eller "Feilhåndtering" seksjon
4. Oppdater innholdsfortegnelsen hvis filen har en

---

## VERIFISERING

Etter endring, sjekk at:

1. ✅ Ny seksjon "Sporing av BØR- og KAN-oppgaver" finnes
2. ✅ completedSteps-struktur er dokumentert (både enkel og utvidet)
3. ✅ skippedSteps er dokumentert
4. ✅ Sporingsregler for MÅ/BØR/KAN er definert
5. ✅ Hurtigspor-regler er inkludert
6. ✅ Eksempel på komplett sporing finnes
7. ✅ Verifiserings-sjekkliste er inkludert
8. ✅ Ingen ødelagte markdown-lenker
9. ✅ Ingen stavefeil

Test-spørsmål:
- Hvis en agent utfører en BØR-oppgave, hva skal den gjøre? (Svar: Legg til i completedSteps med requirement: "BØR")
- Hvis en agent skipper en BØR-oppgave, hva skal den gjøre? (Svar: Legg til i skippedSteps med begrunnelse)
- Er hurtigspor en unnskyldning for å ikke spore? (Svar: NEI, alle beslutninger skal dokumenteres)

---

## AVHENGIGHETER

**Må gjøres før:**
- Ingen (dette er første oppgave)

**Må gjøres etter denne:**
- Oppgave 2 (INTENSITY-MATRIX) - bruker reglene herfra
- Oppgave 3-11 (ORCHESTRATOR, PHASE-GATES, fase-agenter) - implementerer reglene herfra

---

## NOTATER

- Dette er den mest kritiske endringen i hele prosjektet
- Alle andre agenter avhenger av at denne er riktig
- Bruk god tid på å sikre at alt er korrekt
- Les gjennom flere ganger før du markerer som ferdig

---

## STATUS OPPDATERINGER

### [Dato] - [Session]
**Status:** ⚪ → 🟡 (startet)
**Tid brukt:** [X minutter]
**Notater:**
- [Hva ble gjort]
- [Eventuelle problemer]

### [Dato] - [Session]
**Status:** 🟡 → 🟢 (ferdig)
**Total tid:** [X timer]
**Notater:**
- [Verifisering OK]
- [Neste steg: Oppgave 2]

---

**Opprettet:** 2026-02-04
**Sist oppdatert:** 2026-02-04 (ikke startet)
