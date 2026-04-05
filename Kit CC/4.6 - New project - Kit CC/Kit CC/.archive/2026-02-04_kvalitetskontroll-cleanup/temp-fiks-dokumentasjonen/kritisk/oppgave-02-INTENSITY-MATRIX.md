# Oppgave 2: Legg til sporingsprotokoll steg 4-6 i INTENSITY-MATRIX

> **Prioritet:** KRITISK
> **Status:** ⚪ Ikke startet
> **Estimert tid:** 1-1.5 timer
> **Kategori:** Kritisk systemfil

---

## MÅLBESKRIVELSE

Utvid INTENSITY-MATRIX.md med steg 4-6 i filtreringsprotokollen som beskriver hvordan agenter skal spore beslutninger om BØR/KAN-oppgaver.

**Hvorfor kritisk:** INTENSITY-MATRIX styrer hvordan agenter filtrerer oppgaver basert på intensitetsnivå. Uten sporings-steg vil agenter filtrere riktig, men ikke dokumentere beslutningene.

---

## KILDEFIL

```
/mnt/Ongoing work/Agenter/agenter/system/INTENSITY-MATRIX.md
```

---

## NÅVÆRENDE TILSTAND

INTENSITY-MATRIX definerer filtreringsprotokoll (linje ~279-323):
```
1. Agent leser intensityLevel fra PROJECT-STATE.json
2. Agent slår opp i INTENSITY-MATRIX.md
3. Agent filtrerer sine funksjoner:
   - MÅ → Kjøres alltid
   - BØR → Kjøres med mindre bruker eksplisitt skipper
   - KAN → Tilbys til bruker som valg
   - ❌ → Skjules helt
```

**Problem:** Steg 4 mangler. Ingen instruksjon om å spore resultatet av filtreringen.

---

## ØNSKET TILSTAND

Legg til steg 4-6 som beskriver:
1. Hvordan BØR-oppgaver presenteres og registreres
2. Hvordan KAN-oppgaver tilbys og registreres
3. Hvordan alle oppgaver oppdateres i PROJECT-STATE.json
4. At hurtigspor ikke fritar fra sporing

---

## KONKRETE ENDRINGER

### Finn filtreringsprotokoll-seksjonen

Finn seksjonen som beskriver de 3 stegene over (trolig rundt linje 279-323).

### Legg til steg 4-6

**ETTER** steg 3, legg til:

```markdown
4. **Agent presenterer BØR-oppgaver til bruker og registrerer valg**
   - I normal modus: Spør bruker "Denne oppgaven er anbefalt. Vil du inkludere den?"
   - I hurtigspor: Agent inkluderer BØR-oppgaver som naturlig inngår i MÅ-arbeid
   - Registrer i PROJECT-STATE.json:
     - Hvis ja/inkludert: Legg til i completedSteps med requirement: "BØR"
     - Hvis nei/skipet: Legg til i skippedSteps med begrunnelse

5. **Agent tilbyr KAN-oppgaver og registrerer valg**
   - I normal modus: Presenter som valgfritt: "Denne oppgaven kan forbedre kvaliteten. Vil du inkludere den?"
   - I hurtigspor: Skip KAN-oppgaver med reason: "Hurtigspor-modus"
   - Registrer i PROJECT-STATE.json:
     - Hvis ja: Legg til i completedSteps med requirement: "KAN"
     - Hvis nei: Legg til i skippedSteps med reason
     - Hvis ikke tilbudt: Ingen sporing

6. **Agent oppdaterer PROJECT-STATE.json med ALLE oppgaver**
   - MÅ → status: completed (eller blocked med begrunnelse)
   - BØR → status: completed | skipped (med begrunnelse)
   - KAN → status: completed | skipped | not_offered
   - ❌ → Ikke inkludert i sporing

   **VIKTIG:** Hurtigspor-modus fritar IKKE fra sporing.
   Selv i hurtigspor skal agenten dokumentere hvilke BØR/KAN
   som ble inkludert eller ekskludert, og hvorfor.
```

### Legg til eksempel på hurtigspor-sporing

**ETTER** steg 6, legg til:

```markdown
#### Eksempel: Hurtigspor-sporing

Selv i hurtigspor skal alle beslutninger dokumenteres:

```json
"completedSteps": [
  {
    "id": "ARK-01",
    "requirement": "MÅ",
    "status": "completed",
    "deliverable": "tech-stack-decision.md"
  },
  {
    "id": "ARK-07",
    "requirement": "BØR",
    "status": "completed",
    "deliverable": "threat-model-stride.md",
    "note": "Inkludert i STRIDE-leveranse — naturlig del av MÅ-arbeid"
  }
],
"skippedSteps": [
  {
    "id": "ARK-09",
    "requirement": "KAN",
    "reason": "Hurtigspor — ekstern review ikke nødvendig for MVP"
  }
]
```

**Merk:** Selv om agenten tok beslutningen autonomt i hurtigspor, er begrunnelsene dokumentert.
```

---

## PLASSERING I FILEN

1. Finn filtreringsprotokoll-seksjonen (trolig rundt linje 279-323)
2. Legg til steg 4-6 rett etter steg 3
3. Legg til eksempel på hurtigspor-sporing etter steg 6
4. Oppdater eventuell innholdsfortegnelse

---

## VERIFISERING

Etter endring, sjekk at:

1. ✅ Steg 4-6 er lagt til etter steg 3
2. ✅ Steg 4 beskriver BØR-presentasjon og registrering
3. ✅ Steg 5 beskriver KAN-tilbud og registrering
4. ✅ Steg 6 beskriver oppdatering av PROJECT-STATE.json
5. ✅ Hurtigspor-eksempel er inkludert
6. ✅ Det er klart at hurtigspor IKKE fritar fra sporing
7. ✅ Ingen ødelagte markdown-lenker

Test-spørsmål:
- Hvor mange steg er det nå i filtreringsprotokollen? (Svar: 6)
- Kan en agent i hurtigspor skippe BØR uten å dokumentere? (Svar: NEI)
- Hvor registreres skippede BØR-oppgaver? (Svar: I skippedSteps med begrunnelse)

---

## AVHENGIGHETER

**Må gjøres før:**
- ✅ Oppgave 1 (SYSTEM-PROTOCOL) - definerer completedSteps og skippedSteps struktur

**Må gjøres etter denne:**
- Oppgave 3 (ORCHESTRATOR) - validerer at agenter følger sporingsreglene
- Oppgave 4-11 (PHASE-GATES, fase-agenter) - implementerer sporingsreglene

---

## STATUS OPPDATERINGER

### [Dato] - [Session]
**Status:** ⚪ → 🟢
**Tid brukt:** [X timer]
**Notater:**
- [Endringer gjort]
- [Verifisering OK]

---

**Opprettet:** 2026-02-04
**Sist oppdatert:** 2026-02-04 (ikke startet)
