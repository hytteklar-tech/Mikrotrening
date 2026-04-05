# Confidence scoring

> Kit CC måler hvor sikker den er på klassifiseringsdataene dine – slik at du vet om du bør re-klassifisere eller om det er greit å fortsette.

## Hva gjør den?

Etter at klassifiseringen er ferdig, beregner systemet en sikkerhetsscore (0–100%) som viser hvor trygg AI-en er på at den har forstått prosjektet ditt riktig. Scoren er basert på tre faktorer:

1. **Klarhet (40% vekt)** – Var svarene dine tydelige og spesifikke, eller vage?
2. **Konsistens (35% vekt)** – Pekte alle svarene dine i samme retning, eller var det selvmotsigelser?
3. **Mønstergjenkjenning (25% vekt)** – Matcher prosjektet ditt kjente mønstre som AI-en har lært fra før?

Målet er at scoren skal være over 70%. Hvis den er lavere, foreslår systemet at du re-klassifiserer eller klargjør noen spørsmål.

## Hvorfor er det nyttig?

Klassifisering er det fundamentet hele prosjektet bygges på. Hvis AI-en har misforstått noe, er det bedre å oppdage det nå enn etter at halvparten av koden er skrevet. Confidence scoring gir deg en indikator på hvor solid grunnlaget er.

Score under 70% betyr ikke at noe er galt – det betyr bare "Vi er ikke helt sikre, kan du klargjøre?" Score over 90% betyr "Vi er veldig sikre – gå videre med selvtillit."

Det gir også håndtak for senere: Hvis prosjektet "avviker" fra det som ble planlagt, kan du se "Klassifiseringen hadde 65% sikkerhet, det var kanskje det" og re-klassifisere med bedre svar.

## Hvordan fungerer det?

**Faktor 1: Klarhet (40% vekt)**

Systemet analyserer hver bruker-svar for spesifisitet:

| Svartype | Klarhet-score | Eksempel |
|---|---|---|
| Veldig spesifikk | 100% | "Nettbutikk for håndlagde sølvsmykker, målgruppe: kvinner 25-45, 500-1000 produkter" |
| Ganske klar | 75% | "Nettbutikk for smykker" |
| Vag | 50% | "En app for å selge ting" |
| Veldig vag | 25% | "Noe på internett" |
| Ingen svar | 0% | (bruker hoppa over spørsmålet) |

Gjennomsnitt av alle svar = Klarhet-score.

**Faktor 2: Konsistens (35% vekt)**

Systemet ser etter selvmotsigelser:

| Scenario | Konsistens-score | Forklaring |
|---|---|---|
| Alt peker samme veg | 100% | "Nettbutikk, e-handel, satser på salg online" → Alle svar handla om e-handel |
| Noen motsigelser | 60% | "Nettbutikk" men også "Vil ikke håndtere betalinger" → Motsigelse |
| Store motsigelser | 20% | "Enkelt hobbyprosjekt" og "1 million brukere" → Motsigelse |

Hvis konsistensen er lav, flagges det.

**Faktor 3: Mønstergjenkjenning (25% vekt)**

Systemet kontrollerer om prosjektet matcher kjente mønstre:

| Prosjektmønster | Gjenkjenning | Tegn |
|---|---|---|
| Klassisk nettbutikk | 100% | "Betaling", "produkter", "handlekurv", "bruker", "lager" → Alle klassiske tegn |
| Blandet/uvanlig | 50% | "Nettbutikk" + "AI-chatbot" + "3D-visning" → Mindre vanlig kombinasjon |
| Helt nytt område | 10% | "Kvantedatamaskiner for molekylmodellering" → Ikke et gjenkjent mønster |

Kjente mønstre får høyere score fordi systemet har mer treningsdata.

**Fase 4: Beregning og presentasjon**

```
Klarhet-score:      85% × 0,40 = 34,0
Konsistens-score:   80% × 0,35 = 28,0
Mønster-score:      90% × 0,25 = 22,5
─────────────────────────────────────
Total:                              84,5%

✅ SIKKERHET: 84,5%
Din klassifisering er solid! Systemet er svært sikker på at det
har forstått prosjektet ditt riktig. Du kan trygt fortsette til
fase 2.
```

## Eksempel

**Scenario 1: Høy sikkerhet (90%)**
```
Bruker sier:
- "Nettbutikk for håndlagde smykker"
- "Målgruppe: Kvinner 25-50 år som liker design"
- "Vi lagrer navn, adresse, betalingskortdata"
- "Vi trenger betaling med Vipps og kort"
- "Lager med 500-1000 produkter, 3-5 varianter hver"
- "Ja, brukere skal kunne lage konto"

Klarhet: 95% (veldig spesifikk)
Konsistens: 95% (alt e-handel)
Mønster: 90% (klassisk nettbutikk)
─────────────────────
TOTAL: 93% ✅

"Utmerket klassifisering! Vi er 93% sikre på at vi forstår
ditt prosjekt. La oss gå videre til Fase 2."
```

**Scenario 2: Medium sikkerhet (68%)**
```
Bruker sier:
- "En app for å dele bilder"
- "For mine venner hovedsakelig"
- "Kanskje noen innlogging senere"
- "Eller kanskje bare åpen for alle"
- "Vil dra inn noen betalt funksjoner kanskje"

Klarhet: 50% (vag)
Konsistens: 60% (innlogging ja/nei, betaling ja/nei – motsigelser)
Mønster: 85% (bildeapp er kjent)
─────────────────────
TOTAL: 68% ⚠️

"Klassifiseringen er på grensen. Vi har noen spørsmål:
1. Er dette en lukket gruppe (bare venner) eller åpen for alle?
2. Skal det være betalinger eller gratis?

Kan du presisere? Da får vi sikkerhet over 80%."
```

**Scenario 3: Lav sikkerhet (42%)**
```
Bruker sier:
- "Jeg vet ikke helt hva jeg vil bygge"
- "Noe med AI kanskje"
- "Eller et spill"
- "Eller en app"
- "Vi får se"

Klarhet: 20% (veldig vag)
Konsistens: 30% (helt uklart hva som er hva)
Mønster: 65% (AI og spill er kjent hver for seg, men sammen?)
─────────────────────
TOTAL: 42% ❌

"Klassifiseringen er usikker (42%). Jeg anbefaler at vi
snakker mer før vi starter:

1. Start med ett klart område – AI, spill, eller app?
2. Hva er målet ditt?
3. Hvem skal bruke det?

La oss re-klassifisere når du er klar. Det tar 5 minutter!"
```

## Relaterte features
- progressiv-klassifisering.md — Klassifiseringen som scoren er basert på
- integrasjonsanalyse.md — Analysen som påvirkes av klassifiserings-sikkerhet
- bildestrategi.md — Bildevalget som påvirkes av prosjektklarhet

---
*Definert i: Kit CC/Agenter/agenter/system/agent-AUTO-CLASSIFIER.md (CONFIDENCE-SCORING)*
*Lagt til: 2026-02-17*
*Kategori: Prosjektoppstart*
