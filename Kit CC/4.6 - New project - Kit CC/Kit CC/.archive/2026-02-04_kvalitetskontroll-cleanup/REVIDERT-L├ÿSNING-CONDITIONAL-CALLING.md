# REVIDERT LØSNING: Conditional Ekspert-calling

**Dato:** 2026-02-04
**Kritisk innsikt fra bruker:** Eksperter kalles CONDITIONAL basert på prosjekt-kontekst

---

## BRUKERENS KORREKTE MODELL

### Eksempel:
- **Prosjekt A (enkel):** 4 eksperter kalles
- **Prosjekt B (kompleks):** 8 eksperter kalles

### Faktorer som bestemmer calling:
1. **Intensity Level** (MINIMAL → GRUNDIG)
2. **Prosjekttype** (klassifisert i Fase 1)
3. **Complexity Score** (7-28 fra AUTO-CLASSIFIER)
4. **Fase** (noen eksperter kun i senere faser)

### Dette er allerede modellert i FUNKSJONS-MATRISE!

**Eksempel fra MVP-agent:**
```
| MVP-03 | Secrets management | MIN=KAN | FOR=MÅ | STD=MÅ | Ekspert: HEMMELIGHETSSJEKK |
| MVP-05 | SAST scanning     | MIN=IKKE | FOR=KAN | STD=BØR | Ekspert: SUPPLY-CHAIN |
```

**Tolkning:**
- MINIMAL-prosjekt: HEMMELIGHETSSJEKK er optional, SUPPLY-CHAIN skipes
- FORENKLET: HEMMELIGHETSSJEKK må kalles, SUPPLY-CHAIN er optional
- STANDARD: Begge må/bør kalles

---

## PROBLEMET (REVIDERT)

**Hva som fungerer:**
✅ FUNKSJONS-MATRISE har conditional logic (MÅ/BØR/KAN/IKKE)
✅ "Eksperter" kolonne viser hvilken ekspert som trengs
✅ GUARDRAILS: "Les PROJECT-STATE.json for intensitetsnivå før start"

**Hva som mangler:**
❌ Operasjonelle instruksjoner i PROSESS-delen:
   - "Gå gjennom FUNKSJONS-MATRISE"
   - "For hver MÅ-oppgave, kall tilhørende ekspert"
   - "For BØR-oppgaver, anbefal ekspert til bruker"

---

## REVIDERTE LØSNINGSFORSLAG

### LØSNING 1: Matrix-Driven Calling (ANBEFALT)

**Score:** 9/10

**Beskrivelse:**
Legg til systematisk workflow i PROSESS-delen som itererer gjennom FUNKSJONS-MATRISE:

```markdown
### Steg 3: Planlegging
1. Les PROJECT-STATE.json → Hent intensitetsnivå (f.eks. "FORENKLET")
2. Gå gjennom FUNKSJONS-MATRISE rad for rad:

   For hver rad:
   a) Sjekk status for valgt intensity:
      - MÅ → Legg til som påkrevd oppgave
      - BØR → Legg til som anbefalt oppgave
      - KAN → Spør bruker om de vil ha den
      - IKKE → Skip denne oppgaven

   b) Hvis oppgave er MÅ/BØR og har ekspert i "Eksperter"-kolonnen:
      - Planlegg calling av ekspert når oppgaven utføres
      - Eksempel: MVP-03 (Secrets) → Kall HEMMELIGHETSSJEKK-ekspert

3. Presenter plan til bruker med eksperter som skal kalles

### Steg 4: Koordinert utførelse
For hver oppgave i prioritert rekkefølge:

1. Sjekk om oppgave har tilhørende ekspert (fra FUNKSJONS-MATRISE)
2. Hvis JA:
   **Kall [EKSPERT-NAVN] for [OPPGAVE-FORMÅL]**
   - Eksempel: "Kall HEMMELIGHETSSJEKK-ekspert for secrets management setup"
   - Forventet leveranse: [fra FUNKSJONS-MATRISE eller oppgave-beskrivelse]
   - Vent på leveranse før du fortsetter

3. Valider ekspert-leveranse
4. Oppdater PROJECT-STATE.json
5. Fortsett til neste oppgave
```

**Fordeler:**
✅ Respekterer intensity-level automatically
✅ Skalerer til alle prosjekttyper (A med 4 eksperter, B med 8)
✅ Ingen hardkodet logic - alt styres av FUNKSJONS-MATRISE
✅ Tydelig når ekspert kalles (knytt til konkret oppgave)
✅ Enkel å vedlikeholde (endre matrise, ikke agent-kode)

**Ulemper:**
❌ Avhenger av at FUNKSJONS-MATRISE er korrekt og komplett
❌ Krever at alle PROSESS-agenter følger samme workflow
❌ Litt mer kompleks enn hardkodede instruksjoner

---

### LØSNING 2: Hybrid Matrix + Kritiske Eksplisitte

**Score:** 8/10

**Beskrivelse:**
Kombiner Matrix-Driven (Løsning 1) med eksplisitte instruksjoner for KRITISKE eksperter:

```markdown
### Steg 3: Planlegging
1. Les PROJECT-STATE.json → Hent intensitetsnivå
2. **KRITISKE EKSPERTER (alltid sjekk):**
   - Hvis systemet håndterer persondata → Kall GDPR-ekspert
   - Hvis auth implementeres → Kall SIKKERHETS-agent
   - Hvis payment flows → Kall PAYMENT-SECURITY-ekspert

3. Gå gjennom FUNKSJONS-MATRISE for alle andre eksperter (se Løsning 1)

### Steg 4: Koordinert utførelse
1. **Start med KRITISKE eksperter** (hvis relevant for prosjekt)
2. Deretter følg FUNKSJONS-MATRISE systematisk
```

**Fordeler:**
✅ Sikrer at kritiske eksperter ikke glemmes
✅ Balanse mellom eksplisitt (kritiske) og fleksibel (matrise)
✅ Tydelig prioritering

**Ulemper:**
❌ Litt redundans (kritiske kan også være i matrise)
❌ Definere "kritisk" kan være subjektivt

---

### LØSNING 3: Intensity-Aware Checklist

**Score:** 7/10

**Beskrivelse:**
Lag pre-genererte checklister per intensity-level:

```markdown
### MINIMAL-PROSJEKT CHECKLIST:
- [ ] Git setup (ingen ekspert)
- [ ] Basic auth (SIKKERHETS-agent)
- [ ] MVP implementation (BYGGER-agent)

### FORENKLET-PROSJEKT CHECKLIST:
- [ ] Git setup (ingen ekspert)
- [ ] Secrets management (HEMMELIGHETSSJEKK-ekspert) ← MÅ
- [ ] Basic auth (SIKKERHETS-agent)
- [ ] CI/CD pipeline (CI/CD-ekspert) ← BØR
- [ ] MVP implementation (BYGGER-agent)

### STANDARD-PROSJEKT CHECKLIST:
- [ ] Git setup (ingen ekspert)
- [ ] Secrets management (HEMMELIGHETSSJEKK-ekspert) ← MÅ
- [ ] SAST scanning (SUPPLY-CHAIN-ekspert) ← BØR
- [ ] CI/CD pipeline (CI/CD-ekspert) ← MÅ
- [ ] Auth + GDPR (SIKKERHETS + GDPR) ← MÅ
- [ ] Testing (TEST-GENERATOR-ekspert) ← MÅ
- [ ] MVP implementation (BYGGER-agent)
```

**Fordeler:**
✅ Veldig eksplisitt - ingen tolkning nødvendig
✅ Lett å følge for AI
✅ Kan pre-valideres av mennesker

**Ulemper:**
❌ Mye redundans (4-5 checklister per PROSESS-agent)
❌ Vedlikehold-mareritt hvis eksperter endres
❌ Mindre fleksibel for edge cases

---

## ANBEFALING: LØSNING 1 (Matrix-Driven)

### Hvorfor?
1. **Respekterer conditional logic** - korrekt modell fra bruker
2. **Skalerer perfekt** - Prosjekt A (4 eksperter) og B (8 eksperter) håndteres automatisk
3. **Single source of truth** - FUNKSJONS-MATRISE styrer alt
4. **Vedlikeholdbart** - Endre matrise, ikke agent-kode

### Konkret implementering:

#### 1. Oppdater PROSESS-agenter (MVP, ITERASJON, QA, etc.)

**I "Steg 3: Planlegging":**
```markdown
### Steg 3: Planlegging
1. Les PROJECT-STATE.json → Hent `intensityLevel` (f.eks. "FORENKLET")

2. **Iterer gjennom FUNKSJONS-MATRISE:**
   For hver rad (MVP-01 til MVP-14):

   a) Sjekk status for valgt intensity:
      ```
      intensityColumn = intensityLevel  // "FOR" for FORENKLET
      status = row[intensityColumn]      // "MÅ", "BØR", "KAN", eller "IKKE"
      ```

   b) Filtrer oppgaver:
      - MÅ → Påkrevd oppgave (legg til i plan)
      - BØR → Anbefalt oppgave (legg til i plan)
      - KAN → Spør bruker: "Vil du ha [oppgave]?"
      - IKKE → Skip (ikke legg til i plan)

   c) Hvis oppgave er MÅ/BØR og har ekspert i "Eksperter"-kolonnen:
      - Merk at ekspert skal kalles når oppgave utføres
      - Eksempel: MVP-03 har "HEMMELIGHETSSJEKK" → Plan calling

3. Presenter plan til bruker:
   ```
   Basert på FORENKLET-intensity:
   - MÅ-oppgaver: [liste med 5 oppgaver]
   - BØR-oppgaver: [liste med 3 oppgaver]
   - Eksperter som kalles: HEMMELIGHETSSJEKK, CI/CD, SIKKERHETS
   ```
```

**I "Steg 4: Koordinert utførelse":**
```markdown
### Steg 4: Koordinert utførelse
For hver oppgave i prioritert rekkefølge:

1. Les oppgave-metadata fra FUNKSJONS-MATRISE
   - ID (f.eks. MVP-03)
   - Funksjon (f.eks. "Secrets management")
   - Ekspert (f.eks. "HEMMELIGHETSSJEKK")

2. **Hvis oppgave har ekspert:**
   ```
   Kall [EKSPERT-NAVN] for [FUNKSJON]

   Eksempel:
   "Kall HEMMELIGHETSSJEKK-ekspert for secrets management setup"

   Forventet leveranse: docs/FASE-4/secrets-setup.md
   ```

   Vent på ekspert-leveranse før du fortsetter.

3. **Hvis oppgave ikke har ekspert:**
   - Utfør oppgave direkte (eller via basis-agent som BYGGER)

4. Valider leveranse mot akseptansekriterier
5. Oppdater PROJECT-STATE.json
6. Fortsett til neste oppgave
```

---

#### 2. Definer calling-format i AGENT-PROTOCOL

**Legg til ny seksjon:**
```markdown
## EKSPERT-AGENT CALLING (Conditional)

### Når kalles ekspert-agenter?

Ekspert-agenter kalles CONDITIONAL basert på:
1. **Intensity Level** (MINIMAL → GRUNDIG)
2. **FUNKSJONS-MATRISE** (MÅ/BØR/KAN/IKKE)
3. **Prosjekttype** (klassifisert i Fase 1)

### Calling-prosess:

**Steg 1: PROSESS-agent itererer gjennom FUNKSJONS-MATRISE**
- Filtrerer oppgaver basert på intensity
- Identifiserer hvilke eksperter som trengs

**Steg 2: Når oppgave med ekspert utføres**
```
Kall [EKSPERT-NAVN] for [FORMÅL]

Eksempel:
"Kall GDPR-ekspert for persondata-vurdering"
```

**Steg 3: ORCHESTRATOR (implicit)**
- Ser calling-instruksjon i PROSESS-agent respons
- Aktiverer EKSPERT-agent
- Returnerer leveranse til PROSESS-agent

**Steg 4: PROSESS-agent validerer**
- Sjekker at forventet leveranse eksisterer
- Oppdaterer PROJECT-STATE.json
- Fortsetter workflow
```

---

#### 3. Eksempel: MVP-agent med conditional calling

**FUNKSJONS-MATRISE (uendret):**
```
| MVP-03 | Secrets | KAN | MÅ | MÅ | HEMMELIGHETSSJEKK |
| MVP-05 | SAST   | IKKE | KAN | BØR | SUPPLY-CHAIN |
```

**PROSESS-delen (ny):**
```markdown
### Steg 3: Planlegging
1. Les PROJECT-STATE.json → intensityLevel = "FORENKLET"
2. Iterer FUNKSJONS-MATRISE:

   MVP-03 (Secrets): FOR=MÅ → Legg til i plan → Ekspert: HEMMELIGHETSSJEKK
   MVP-05 (SAST): FOR=KAN → Spør bruker → Ekspert: SUPPLY-CHAIN

3. Presenter plan:
   - MÅ: Git, Secrets (HEMMELIGHETSSJEKK), Auth, MVP
   - KAN: SAST (SUPPLY-CHAIN) - vil du ha denne?

### Steg 4: Koordinert utførelse
...
Oppgave MVP-03 (Secrets management):
  **Kall HEMMELIGHETSSJEKK-ekspert for secrets setup**
  - Forventet: docs/FASE-4/secrets-setup.md
  - Vent på leveranse
  - Valider og fortsett
...
```

---

## ESTIMERT INNSATS

| Oppgave | Estimat |
|---------|---------|
| Definer calling-format i AGENT-PROTOCOL | 30 min |
| Oppdater MVP-agent PROSESS-del | 45 min |
| Oppdater 5-7 andre PROSESS-agenter | 3-4 timer |
| Test med MINIMAL vs GRUNDIG prosjekt | 1 time |
| **TOTALT** | **5-6 timer** |

---

## SVAR PÅ BRUKERENS OPPRINNELIGE SPØRSMÅL

### Er connections til ekspertagenter AKTIVE?

**Svar:** ⚠️ **DELVIS - Men med riktig design!**

**Hva som fungerer (brilliantly):**
✅ FUNKSJONS-MATRISE har conditional logic (MÅ/BØR/KAN/IKKE per intensity)
✅ "Eksperter" kolonne viser hvilken ekspert som trengs
✅ Designet støtter Prosjekt A (4 eksperter) vs B (8 eksperter) perfekt

**Hva som mangler:**
❌ Operasjonelle instruksjoner i PROSESS-delen
❌ "Iterer gjennom FUNKSJONS-MATRISE" workflow
❌ "Kall ekspert når oppgave utføres" instruksjon

**Konklusjon:**
Design er PERFEKT, men implementering (operasjonelle instruksjoner) mangler.

---

## NESTE STEG

1. ✅ Denne reviderte analysen er ferdig
2. ⏸️ Bruker godkjenner Løsning 1 (Matrix-Driven)
3. ⏸️ Implementer i AGENT-PROTOCOL
4. ⏸️ Oppdater MVP-agent med matrix-iteration
5. ⏸️ Oppdater andre PROSESS-agenter
6. ⏸️ Test med MINIMAL vs GRUNDIG prosjekt

---

*Versjon: 2.0.0 - Revidert med conditional calling-modell*
*Takk til bruker for kritisk innsikt!*
