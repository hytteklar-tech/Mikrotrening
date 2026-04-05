# Tre byggemodus

> Kit CC har 3 byggemodus: "AI bestemmer", "Samarbeid" og "Detaljstyrt". Du velger hvor mye kontroll du vil ha.

## Hva gjør den?

Byggemodus kontrollerer hvordan agenten skal oppføre seg når den møter beslutninger. Det finnes tre valg:

1. **AI bestemmer** (raskest)
   - Agenten tar alle tekniske og funksjonelle valg selv
   - Du får beskjed om hva som ble gjort, men ikke spurt på forhånd
   - Idealt for folk som vil ha raskt resultat og stoler på agenten

2. **Samarbeid** (balansert)
   - Agenten foreslår viktige valg og ber deg godkjenne
   - Små tekniske valg gjør agenten alene
   - Du har kontroll over det som betyr noe

3. **Detaljstyrt** (fullkontroll)
   - Du godkjenner SVA viktige beslutninger før de gjennomføres
   - Agenten foreslår og venter på ditt ja
   - Maksimal kontroll, men tar lengere tid

Du kan bytte modus underveis med kommandoen "Bytt byggemodus".

## Hvorfor er det nyttig?

Forskjellige personer har forskjellige preferanser:
- **Erfarne kodere** som har en klar idé og vil ha raskt resultat → "AI bestemmer"
- **Folk som vil være involvert** men ikke drukne i detaljer → "Samarbeid"
- **Perfeksjonister** eller folk som jobber med kritiske systemer → "Detaljstyrt"

Med tre modus slipper du å føle deg enten utestengt eller overveldet.

## Hvordan fungerer det?

**Valget gjøres ved oppstart (eller senere):**
Når du starter et prosjekt, spørr systemet: "Hvor mye kontroll vil du ha?" Du velger en av de tre modiene. Agenten lagrer ditt valg i `PROJECT-STATE.json` som `builderMode`.

**Under arbeid, når agenten møter en beslutning:**

| Beslutningstype | AI bestemmer | Samarbeid | Detaljstyrt |
|---|---|---|---|
| Framework (React vs Vue?) | Bestemmer selv | Spør | Spør |
| Mappestruktur | Bestemmer selv | Bestemmer selv | Spør |
| API-design | Bestemmer selv | Spør | Spør |
| Farger/design | Bestemmer selv | Bestemmer selv | Spør |
| Database-skjema | Bestemmer selv | Spør | Spør |
| Sikkerhetstiltak | Bestemmer selv | Spør | Spør |

**Bytte modus:**
Du kan bytte når som helst. Skriv "Bytt byggemodus", og systemet viser gjeldende modus og alternativer. Du velger ny modus, og agenten lagrer det.

## Eksempel

Du starter en e-handels-app med 3 ulike personer:

**Person 1 (erfaren utvikler):** Velger "AI bestemmer"
- Agenten velger automatisk React, PostgreSQL, Stripe for betaling
- Agenten rapporterer: "Jeg har valgt React, PostgeSQL og Stripe. Skal jeg begynne?"
- Person 1: "Go"

**Person 2 (product manager):** Velger "Samarbeid"
- Agenten foreslår React
- Person 2: "Hva med Vue i stedet?"
- Agenten: "Greit, bytter til Vue"
- Agenten velger databasen selv

**Person 3 (sikkerhetsfokusert):** Velger "Detaljstyrt"
- Agenten: "Jeg foreslår React. OK?"
- Person 3: "Ja"
- Agenten: "Jeg foreslår PostgreSQL. OK?"
- Person 3: "Ja"
- Agenten: "Jeg foreslår Stripe for betaling. Men jeg anbefaler også WAF (Web Application Firewall). OK?"
- Person 3: "Ja, og legg til 2FA på adminpanelet"
- Agenten: "Gjort"

## Relaterte features

- **tre-byggemodus** — Denne filen
- **beslutningsklassifisering** — Hvordan beslutninger organiseres
- **de-7-fasene** — Modus påvirker alle faser

---
*Definert i: Kit CC/Features/Autonomi/tre-byggemodus.md*
*Lagt til: 2026-02-17*
*Kategori: Autonomi*
