# Kontinuerlig reklassifisering

> Ved hver faseovergang kjøres en mini-klassifisering som sjekker om prosjektets scope har endret seg, og anbefaler oppgradering hvis intensitetsnivået bør økes.

## Hva gjør den?

Prosjekter endrer seg. Det som startet som et lite internt verktøy kan vokse til en kundevendt app. En enkel prototyp kan plutselig trenge betalingsfunksjonalitet og dermed GDPR-compliance. Kontinuerlig reklassifisering fanger opp disse endringene.

Ved hver faseovergang (etter fase 2, 3, 4, 5, 6) kjører systemet en kort mini-klassifisering:

1. **Scope-sjekk** — Hvordan har funksjonene endret seg siden sist?
2. **Dimensjon-påvirkning** — Påvirker endringene noen av de 7 dimensjonene?
3. **Poeng-beregning** — Ny poengsum basert på gjeldende state
4. **Oppgradering-anbefaling** — Hvis ny poengsum er høyere, anbefales oppgradering

Hvis brukeren godtar oppgraderingen, oppdateres `classification.intensityLevel` i PROJECT-STATE.json, og fasene tilpasses (flere kvalitetskontroller, sikkerhetsfunksjoner, osv.).

## Hvorfor er det nyttig?

Uten reklassifisering ville prosessen være låst ved oppstart. Med reklassifisering:

- **Fanger scope-endringer** — Hvis brukeren legger til betalinger underveis, varsles det automatisk
- **Anbefaler sikkerhet** — Hvis prosjektet vokser til å handle sensitiv data, foreslår system ekstra kontroller
- **Respekterer brukers beslutninger** — Oppgradering er anbefaling, ikke tvang. Bruker kan velge å holde seg på lavere nivå hvis ønskelig
- **Dokumenterer endringer** — Alle reklassifiseringer logges i `reclassifications[]` i PROJECT-STATE.json

## Hvordan fungerer det?

**Mini-klassifisering-prosess:**

1. System leser gjeldende funksjoner og scope fra fase-deliverables
2. Sammenligner med original klassifisering (lagret i PROJECT-STATE.json)
3. Stiller 2-3 oppfølgingsspørsmål:
   - "Har bruker lagt til flere integrasjoner?"
   - "Kreves nå betalingsfunksjonalitet?"
   - "Har bruker sensitive data nå?"
4. Beregner ny poengsum
5. Hvis nytt nivå > gjeldende nivå:
   - Viser bruker: "Klassifiseringen anbefaler oppgradering fra X til Y fordi..."
   - Tilbyr: "Ja, oppgrader" eller "Nei, hold gjeldende nivå"
6. Hvis godtatt: Oppdaterer PROJECT-STATE.json og PROGRESS-LOG.md

**Logging:**

```json
"reclassifications": [
  {
    "timestamp": "2026-02-17T14:30:00Z",
    "fromLevel": "STANDARD",
    "toLevel": "ADVANCED",
    "reason": "Betalingsfunksjonalitet lagt til",
    "userDecision": "accepted"
  }
]
```

## Eksempel

**Scenario 1: Oppgradering akseptert**

Bruker starter med "ENKELT HOBBYPROSJEKT" (7 poeng) — en enkel TODO-app.

Ved fase 4 (MVP): Bruker legger til integrasjon med Google Calendar.
- Mini-klassifisering kjører
- Integrationer økes: +3 poeng → 10 poeng
- System: "Du lade til Google Calendar-integrasjon. Det påvirker klassifiseringen. Anbefaler oppgradering til LITE OVERSIKTLIG PROSJEKT for bedre sikkerhetskontroller og API-håndtering. OK?"
- Bruker: "Ja, oppgrader"
- Resultat: Fase 5 får ekstra oppgaver for API-sikkerhet, ratelimiting, error-handling

**Scenario 2: Oppgradering avslått**

Samme bruker ved fase 5: Legger til betalinger via Stripe.
- Mini-klassifisering kjører
- Dimensjon "Datatyper" endres (finansdata): +5 poeng → 15 poeng → VANLIG APP-PROSJEKT
- System: "Du lade til betalinger. Det krever PCI-DSS-compliance og ekstra sikkerhet. Anbefaler oppgradering til VANLIG APP-PROSJEKT?"
- Bruker: "Nei, jeg håndterer det selv"
- Resultat: Nivå forblir LITE OVERSIKTLIG, men systemet logger avslåningen. Bruker ansvarlig for selv å implementere sikkerhetkravene.

## Relaterte features

- `intensitetsnivaaer.md` — De 5 nivåene som systemet klassifiserer i
- `maa-boer-kan.md` — Hvilke funksjoner som blir obligatoriske ved oppgradering
- `funksjonsmatrise.md` — Detaljert oversikt over endringer per oppgradering

---
*Definert i: agent-AUTO-CLASSIFIER.md (CONTINUOUS-RECLASSIFICATION)*
*Lagt til: 2026-02-17*
*Kategori: Klassifisering*
