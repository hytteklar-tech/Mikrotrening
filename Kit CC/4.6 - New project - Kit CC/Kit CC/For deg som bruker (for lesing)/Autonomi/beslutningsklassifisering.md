# Beslutningsklassifisering

> Alle beslutninger klassifiseres i 3 typer: Tekniske, Funksjonelle og Operasjonelle. Hver type håndteres forskjellig avhengig av byggemodus.

## Hva gjør den?

Når agenten bygger prosjektet ditt, møter den hundrevis av små og store beslutninger. For å håndtere dem riktig, klassifiserer systemet alle beslutninger i 3 kategorier:

1. **Tekniske beslutninger** — Backend-valg, arkitektur, koding
   - Eksempler: Framework (React vs Vue), database (SQL vs NoSQL), språk (Python vs Node)
   - Påvirker: Hvordan koden skrives, ytelse, vedlikehold
   - Standard: Agenten har ekspertise her

2. **Funksjonelle beslutninger** — Hva appen skal gjøre, UX-valg
   - Eksempler: Skal brukere kunne se andre sine profiler? (ja/nei), Hvilke farger? (blå/grønn)
   - Påvirker: Brukeropplevelsen, hva appen kan gjøre
   - Standard: Du bør være involvert — det er DINE ønsker

3. **Operasjonelle beslutninger** — Hvordan appen kjøres i produksjon
   - Eksempler: Hvor skal den kjøres (AWS/Azure/egen server)? Hvor ofte backups?
   - Påvirker: Kostnad, sikkerhet, vedlikehold
   - Standard: Avhenger av prosjekttype

## Hvorfor er det nyttig?

Ved å klassifisere beslutninger, kan systemet behandle dem riktig:
- **Tekniske valg** kan agenten ofte ta alene (den har AI-kraft)
- **Funksjonelle valg** burde du styrer (du vet best hva brukerne dine trenger)
- **Operasjonelle valg** avhenger av kontekst (is it a hobby? enterprise?)

Dette sikrer at du blir involvert når det betyr noe, men ikke overbyrdet med små tekniske detaljer.

## Hvordan fungerer det?

**Klassifisering av beslutninger:**
Når agenten møter en beslutning, klassifiserer den den automatisk:
- **Teknisk?** → Handler om kode/infrastruktur?
- **Funksjonell?** → Handler om hva appen gjør?
- **Operasjonell?** → Handler om drift/miljø?

**Byggemodus bestemmer hvordan å håndtere:**

| Klassifisering | AI bestemmer | Samarbeid | Detaljstyrt |
|---|---|---|---|
| **Teknisk** | Bestemmer selv | Bestemmer selv* | Spør deg |
| **Funksjonell** | Bestemmer selv | Spør deg | Spør deg |
| **Operasjonell** | Avhenger av prosjekttype | Avhenger av prosjekttype | Spør deg |

*I "Samarbeid"-modus: Hvis en teknisk beslutning påvirker ytelse eller sikkerhet, spør agenten deg.

**Eksempel på klassifisering:**

```
BESLUTNING: Skal jeg bruke React eller Vue?
→ KLASSIFISERING: Teknisk (framework-valg)
→ Byggemodus "AI bestemmer": Agenten velger React
→ Byggemodus "Samarbeid": Agenten velger React, rapporterer
→ Byggemodus "Detaljstyrt": Agenten spør: "React eller Vue?"

BESLUTNING: Skal brukere kunne dele innlegg?
→ KLASSIFISERING: Funksjonell (feature)
→ Byggemodus "AI bestemmer": Agenten legger til feature
→ Byggemodus "Samarbeid": Agenten spør: "Dele-funksjon. OK?"
→ Byggemodus "Detaljstyrt": Agenten spør: "Dele-funksjon. OK?"

BESLUTNING: Hvor skal appen kjøres?
→ KLASSIFISERING: Operasjonell (deployment)
→ Byggemodus "AI bestemmer": Avhenger av prosjekttype
  - Hobbyprosjekt: Velg gratis tier (Vercel)
  - Enterprise: Spør deg
→ Byggemodus "Samarbeid": Foreslå Vercel, vår til godkjenning
→ Byggemodus "Detaljstyrt": Spør: "AWS, Azure eller lokal server?"
```

## Eksempel

Du bygger en blogg-app. Her er 3 beslutninger og hvordan de håndteres i "Samarbeid"-modus:

**Beslutning 1: Teknisk — Database**
- Agenten: "Jeg velger PostgreSQL for maksimal kompatibilitet."
- Du: "OK" (ikke spurt fordi det er teknisk og Samarbeid-modus)

**Beslutning 2: Funksjonell — Kommentarer**
- Agenten: "Skal innlegg tillate kommentarer fra besøkende eller bare innloggede brukere?"
- Du: "Bare innloggede"
- Agenten: "Gjort"

**Beslutning 3: Operasjonell — Backup**
- Agenten: "Jeg anbefaler daglig backup til S3 (koster ~$1/mnd). OK?"
- Du: "Ja, men ta backup hver time i stedet"
- Agenten: "Gjort"

## Relaterte features

- **tre-byggemodus** — Modus bestemmer hvordan beslutninger håndteres
- **de-7-fasene** — Klassifisering brukes gjennom hele prosessen

---
*Definert i: Kit CC/Features/Autonomi/beslutningsklassifisering.md*
*Lagt til: 2026-02-17*
*Kategori: Autonomi*
