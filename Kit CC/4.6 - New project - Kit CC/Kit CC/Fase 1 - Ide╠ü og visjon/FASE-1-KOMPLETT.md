# Fase 1: Idé og visjon — Hva skal du bygge?

> **Mål:** Etablere et solid fundament før AI skriver én linje kode. Validere at ideen er verdt å bygge — og at den kan bygges trygt med vibe-koding.

> **Målgruppe:** Ikke-tekniske prosjektledere som bruker AI-verktøy til utvikling (vibe-kodere)

> **Leser:** Både mennesker og AI (denne guiden kan deles med AI-assistenten din)

------

## 0. Input fra Fase 0 (Oppstart)

- Prosjektklassifisering påbegynt (klassifiseringsspørsmål fra `Kit CC/Agenter/agenter/system/agent-AUTO-CLASSIFIER.md`)
- Første kontaktpunkt etablert
- Prosjektets intensitetsnivå bestemt

------

## 0. Forutsetninger

Før du starter Fase 1, trenger du:

- **En idé** — du har noe du vil bygge (app, verktøy, tjeneste, nettside, etc.)
- **En grov formening om målgruppen** — hvem skal bruke det du bygger?
- **Vilje til å validere** — du er villig til å bruke litt tid på å sjekke at ideen holder før du koder
- **Tilgang til et AI-verktøy** — Claude Code, Cursor, Windsurf, eller lignende

> **Merk:** Du trenger IKKE teknisk kunnskap. Hele poenget med Kit CC er at AI-agentene hjelper deg gjennom prosessen steg for steg.

------

## Innholdsfortegnelse

| #                                | Tema                                                         | Prioritet   | Type      |
| -------------------------------- | ------------------------------------------------------------ | ----------- | --------- |
| **DEL A: VIBE-KODING FUNDAMENT** |                                                              |             |           |
| 1                                | [Introduksjon til Vibe-koding](#1-introduksjon-til-vibe-koding) | 🔴 Kritisk   | NY        |
| 2                                | [Egnethetsvurdering](#2-egnethetsvurdering-er-dette-prosjektet-egnet-for-vibe-koding) | 🔴 Kritisk   | NY        |
| 3                                | [Team og Sikkerhetsnett](#3-team-og-sikkerhetsnett)          | 🔴 Kritisk   | NY        |
| 4                                | [Kommunikasjonskontrakt med AI](#4-kommunikasjonskontrakt-med-ai) | 🔴 Kritisk   | NY        |
| **DEL B: IDÉ OG VALIDERING**     |                                                              |             |           |
| 5                                | [Problemdefinisjon](#5-problemdefinisjon)                    | 🔴 Kritisk   | Forbedret |
| 6                                | [Jobs-to-be-Done (JTBD)](#6-jobs-to-be-done-jtbd)            | 🔴 Kritisk   | Original  |
| 7                                | [Målgruppe & Persona](#7-målgruppe--persona)                 | 🔴 Kritisk   | Original  |
| 8                                | [Verdiforslag](#8-verdiforslag)                              | 🔴 Kritisk   | Original  |
| 9                                | [Idévalidering](#9-idévalidering)                            | 🔴 Kritisk   | Forbedret |
| 10                               | [Konkurrentanalyse](#10-konkurrentanalyse)                   | 🟡 Viktig    | Original  |
| **DEL C: FORRETNING OG SCOPE**   |                                                              |             |           |
| 11                               | [Lean Canvas](#11-lean-canvas)                               | 🟡 Viktig    | Original  |
| 12                               | [Scope-definisjon (MoSCoW)](#12-scope-definisjon-moscow)     | 🟡 Viktig    | Original  |
| 13                               | [Kostnadsestimering](#13-kostnadsestimering-inkludert-ai-verktøy) | 🟡 Viktig    | NY        |
| **DEL D: TEKNISK OG RISIKO**     |                                                              |             |           |
| 14                               | [Teknisk Mulighetsvurdering](#14-teknisk-mulighetsvurdering) | 🔴 Kritisk   | Forbedret |
| 15                               | [Risikovurdering & AI-spesifikke Risikoer](#15-risikovurdering--ai-spesifikke-risikoer) | 🔴 Kritisk   | Forbedret |
| 16                               | [Dataklassifisering](#16-dataklassifisering)                 | 🟡 Viktig    | Original  |
| 17                               | [Regulatoriske Krav](#17-regulatoriske-krav)                 | 🟡 Viktig    | Original  |
| **DEL E: MÅL OG DOKUMENTASJON**  |                                                              |             |           |
| 18                               | [Suksesskriterier & PMF-mål](#18-suksesskriterier--pmf-mål)  | 🔴 Kritisk   | Original  |
| 19                               | [Dokumentasjonsstrategi for AI](#19-dokumentasjonsstrategi-for-ai) | 🔴 Kritisk   | NY        |
| 20                               | [Exit-strategi og Skalering](#20-exit-strategi-og-skalering) | 🟡 Viktig    | NY        |
| **DEL F: BESLUTNING**            |                                                              |             |           |
| 21                               | [Go/No-Go Beslutning](#21-gono-go-beslutning)                | 🔴 Kritisk   | Forbedret |
| 22                               | [Leveranser fra Fase 1](#22-leveranser-fra-fase-1)           | 📄 Output    | Forbedret |
| **VEDLEGG**                      |                                                              |             |           |
| A                                | [Alle Maler](#vedlegg-a-alle-maler)                          | 📄 Referanse |           |
| B                                | [Ordliste](#vedlegg-b-ordliste)                              | 📄 Referanse | NY        |
| C                                | [Ressurser](#vedlegg-c-ressurser-og-referanser)              | 📄 Referanse |           |

------

## Forventet tidsbruk

| Prosjekttype         | Anbefalt tid på Fase 1 | Eksempel                           |
| -------------------- | ---------------------- | ---------------------------------- |
| Lite internt verktøy | 1-3 dager              | Enkel kalkulator, intern dashboard |
| Internt m/database   | 1-2 uker               | CRM-lite, timeregistrering         |
| Kundevendt produkt   | 2-4 uker               | SaaS-MVP, kundeportal              |
| Stor skala           | 1-3 måneder            | Plattform, komplekst system        |

> **Tommelfingerregel:** Investering i grundig Fase 1 sparer 5-20x i utviklingstid senere. Dette gjelder SPESIELT for vibe-koding, der feil retning betyr bortkastet AI-tid og frustrasjon.

------

### Automatisk tilpasning og verktøy

- **Intensitetstilpasning:** Prioriteringer og krav tilpasses automatisk basert på prosjektets klassifisering (Enkelt hobbyprosjekt → Stort kritisk system). Hva som er obligatorisk, anbefalt eller valgfritt avhenger av prosjekttypen.
- **Kit CC Monitor:** AI-assistenten bruker Kit CC Monitor (en lokal webserver) for å overvåke nettleserfeil, kjøre debug-probes og vise prosjektstatus i sanntid.
- **Automatisk logging:** All fremdrift logges automatisk til PROGRESS-LOG.md. Du trenger ikke gjøre noe — AI-en håndterer dette.

------

# DEL A: VIBE-KODING FUNDAMENT

------

## 1. Introduksjon til Vibe-koding

### Hva dette punktet består av

En grunnleggende forståelse av hva vibe-koding er, hvordan det fungerer, hvilke fordeler og begrensninger det har, og hva som skiller det fra tradisjonell utvikling.

### Hva er problemet (hvorfor dette er viktig)

Mange starter vibe-koding uten å forstå hva det faktisk innebærer. Dette fører til:

- Urealistiske forventninger ("AI kan fikse alt!")
- Undervurdering av risikoer (45% av AI-generert kode har sikkerhetssårbarheter)
- Feil prosjektvalg (noen prosjekter bør IKKE vibekodes)
- Frustrasjon når ting går galt

### Hva vi oppnår ved å forstå dette (verdi)

- Realistiske forventninger fra dag én
- Bedre beslutninger om hva som kan og ikke kan vibekodes
- Færre overraskelser underveis
- Tryggere prosjektgjennomføring

### Hvordan vi går frem

#### Hva er vibe-koding?

Vibe-koding er en utviklingsmetode der du bruker naturlig språk til å instruere AI-verktøy (som Claude, Cursor, GitHub Copilot) til å generere kode. I stedet for å skrive kode selv, beskriver du HVA du vil ha, og AI skriver HVORDAN.

**Eksempel på vibe-koding:**

```
Du: "Lag en funksjon som tar en liste med tall og returnerer
gjennomsnittet, men ignorer tall under 0"

AI: [genererer koden]
```

#### Fordeler med vibe-koding

| Fordel              | Beskrivelse                                        |
| ------------------- | -------------------------------------------------- |
| **Hastighet**       | Prototyper på timer, ikke uker                     |
| **Tilgjengelighet** | Ikke-tekniske kan bygge software                   |
| **Iterasjon**       | Rask testing av ideer                              |
| **Læring**          | Se hvordan kode fungerer mens du bygger            |
| **Kostnad**         | Lavere oppstartskostnad enn tradisjonell utvikling |

#### Begrensninger med vibe-koding

| Begrensning               | Konsekvens                     | Tiltak                                          |
| ------------------------- | ------------------------------ | ----------------------------------------------- |
| **Sikkerhetssårbarheter** | 45% av AI-kode har hull        | Alltid manuell review av sikkerhetskritisk kode |
| **Hallusinasjoner**       | AI kan lyve om at noe fungerer | Test ALT selv, stol aldri blindt                |
| **Utdaterte mønstre**     | AI er trent på gammel kode     | Spesifiser moderne biblioteker eksplisitt       |
| **Konteksttap**           | AI glemmer over lange samtaler | Bruk dokumentasjonsfiler (CLAUDE.md)            |
| **Teknisk gjeld**         | Rask kode ≠ god kode           | Planlegg for refaktorering                      |

#### Hva vibe-koding IKKE er

- ❌ En erstatning for å forstå hva du bygger
- ❌ En måte å hoppe over testing
- ❌ Egnet for alle typer prosjekter
- ❌ Risikofritt
- ❌ En grunn til å droppe sikkerhetshensyn

### Annen viktig info

**Statistikk du bør kjenne til:**

- 45% av AI-generert kode inneholder sikkerhetssårbarheter (Veracode 2025)
- 85% av AI-prosjekter feiler på pilotstadiet (Gartner)
- Prosjekter under 50 000 linjer kode er best egnet for vibe-koding

**Hvem bør lese denne guiden?**

- Ikke-tekniske grundere som vil bygge MVP
- Prosjektledere som leder vibe-koding-prosjekter
- Fageksperter som vil automatisere prosesser
- Alle som vurderer AI-assistert utvikling

------

## 2. Egnethetsvurdering: Er dette prosjektet egnet for vibe-koding?

### Hva dette punktet består av

En strukturert vurdering av om ditt spesifikke prosjekt bør bygges med vibe-koding, eller om du trenger profesjonelle utviklere.

### Hva er problemet (hvorfor dette er viktig)

Ikke alle prosjekter er egnet for vibe-koding. Å starte feil prosjekt med feil metode fører til:

- Bortkastet tid og penger
- Sikkerhetsproblemer som oppdages for sent
- Produkter som ikke kan skaleres
- Juridiske problemer (compliance-brudd)

### Hva vi oppnår ved å gjøre dette (verdi)

- Unngår å starte prosjekter som vil feile
- Vet når vi trenger profesjonell hjelp
- Realistisk forventningssetting
- Riktig ressursallokering fra start

### Hvordan vi går frem

#### Steg 1: Egnethetsscore (obligatorisk)

Svar på følgende spørsmål med JA eller NEI:

**Grønne flagg (egnet for vibe-koding):**

| #    | Spørsmål                                                     | Svar |
| ---- | ------------------------------------------------------------ | ---- |
| 1    | Er dette en MVP eller prototype?                             |      |
| 2    | Er hovedfunksjonaliteten standard (CRUD, skjemaer, visninger)? |      |
| 3    | Er prosjektet under 50 000 linjer kode (estimert)?           |      |
| 4    | Kan du beskrive funksjonene i vanlig språk?                  |      |
| 5    | Er det OK om produktet har noe teknisk gjeld?                |      |
| 6    | Har du tid til å lære underveis?                             |      |

**Røde flagg (krever forsiktighet eller profesjonelle):**

| #    | Spørsmål                                            | Svar |
| ---- | --------------------------------------------------- | ---- |
| 7    | Håndterer systemet betalinger direkte?              |      |
| 8    | Lagrer systemet sensitive helseopplysninger?        |      |
| 9    | Er det strengt regulert (bank, helse, forsikring)?  |      |
| 10   | Må systemet håndtere tusenvis av samtidige brukere? |      |
| 11   | Er sikkerhetsfeil potensielt katastrofale?          |      |
| 12   | Kreves det sertifiseringer (ISO, SOC2, etc.)?       |      |

**Scoring:**

- 5-6 grønne JA + 0-1 røde JA = ✅ **Godt egnet** for vibe-koding
- 3-4 grønne JA + 2-3 røde JA = ⚠️ **Egnet med forbehold** — trenger teknisk støtte
- 0-2 grønne JA + 4+ røde JA = 🛑 **Ikke egnet** — bruk profesjonelle utviklere

#### Steg 2: Prosjektkategori

Plasser prosjektet ditt i en kategori:

| Kategori                      | Egnethet     | Eksempler                                   | Anbefaling                   |
| ----------------------------- | ------------ | ------------------------------------------- | ---------------------------- |
| **Intern verktøy (lite)**     | ✅ Ideell     | Dashboard, kalkulator, enkel automatisering | Vibekode fritt               |
| **Intern verktøy (med data)** | ✅ God        | CRM-lite, timeregistrering, inventar        | Vibekode med review          |
| **Kundevendt MVP**            | ⚠️ Moderat    | Landing page, enkel SaaS, portal            | Vibekode + sikkerhetshjelp   |
| **Kundevendt produkt**        | ⚠️ Forsiktig  | Full SaaS, e-handel, booking                | Hybrid (vibekode + utvikler) |
| **Regulert system**           | 🛑 Ikke egnet | Bank, helse, forsikring                     | Profesjonell utvikling       |
| **Sikkerhetskritisk**         | 🛑 Ikke egnet | Autentisering, betaling                     | Profesjonell utvikling       |

#### Steg 3: Beslutning

Basert på scoring og kategori, ta en av følgende beslutninger:

| Beslutning                | Betydning                              | Neste steg                             |
| ------------------------- | -------------------------------------- | -------------------------------------- |
| ✅ **VIBEKODE**            | Prosjektet er godt egnet               | Fortsett til punkt 3                   |
| ⚠️ **VIBEKODE MED STØTTE** | Egnet, men trenger teknisk hjelp       | Finn teknisk partner (punkt 3)         |
| 🔄 **HYBRID**              | Deler kan vibekodes, deler må utvikles | Definer hva som vibekodes vs. utvikles |
| 🛑 **PROFESJONELL**        | Ikke egnet for vibe-koding             | Engasjer utviklingsbyrå/team           |

### Annen viktig info

**Når du er usikker:** Hvis du er i tvil, velg det mer konservative alternativet. Det er bedre å ha unødvendig støtte enn å oppdage problemer for sent.

**Du kan endre underveis:** Denne vurderingen er et utgangspunkt. Hvis prosjektet vokser eller endrer karakter, gjør vurderingen på nytt.

------

## 3. Team og Sikkerhetsnett

### Hva dette punktet består av

En plan for hvem som skal gjøre hva i prosjektet, og spesielt: hvem skal validere at AI-generert kode er trygg og korrekt.

### Hva er problemet (hvorfor dette er viktig)

AI-generert kode MÅ valideres av noen. Uten et sikkerhetsnett risikerer du:

- Sikkerhetshull som ingen oppdager
- Bugs som koster mer å fikse senere
- Ingen som kan hjelpe når ting går galt
- Juridisk ansvar hvis noe går feil

> **Skrekkeksempel:** SaaStr's CEO brukte Replit AI til å bygge en app. AI-en løy om at tester passerte, ignorerte kodefrys-kommandoer, og slettet til slutt hele produksjonsdatabasen. Måneder med data var borte over natten.

### Hva vi oppnår ved å planlegge dette (verdi)

- Vet hvem som har ansvar for hva
- Har noen å spørre når ting går galt
- Sikkerhetskritisk kode blir alltid sjekket
- Reduserer risiko betydelig

### Hvordan vi går frem

#### Steg 1: Definer roller

| Rolle                   | Ansvar                                      | Hvem i ditt prosjekt? |
| ----------------------- | ------------------------------------------- | --------------------- |
| **Prosjektleder (deg)** | Retning, prioritering, kommunikasjon med AI |                       |
| **Teknisk validator**   | Sjekker kode, spesielt sikkerhet            |                       |
| **Tester**              | Verifiserer at ting fungerer                |                       |
| **Domeneekspert**       | Bekrefter at forretningslogikk er riktig    |                       |

#### Steg 2: Finn teknisk validator

**Alternativer for teknisk validering:**

| Alternativ                  | Kostnad    | Egnet for         | Fordeler              | Ulemper                |
| --------------------------- | ---------- | ----------------- | --------------------- | ---------------------- |
| **Teknisk venn/bekjent**    | Gratis-lav | Små prosjekter    | Billig, tilgjengelig  | Begrenset tid          |
| **Frilanser (på kontrakt)** | Moderat    | MVP-er            | Fleksibel, ekspertise | Må finne riktig person |
| **Utviklingsbyrå (støtte)** | Høy        | Kundevendt        | Full støtte           | Kostbart               |
| **AI code review-verktøy**  | Lav        | Alle              | Automatisk, rask      | Fanger ikke alt        |
| **Sikkerhetskonsulent**     | Høy        | Sikkerhetskritisk | Ekspert               | Kun sikkerhet          |

**Minimum krav til teknisk validator:**

-  Kan lese og forstå kode i prosjektets språk
-  Forstår grunnleggende sikkerhet (autentisering, SQL injection, XSS)
-  Tilgjengelig for spørsmål underveis
-  Kan gjøre code review før lansering

#### Steg 3: Definer valideringsplan

**Hva skal valideres og av hvem:**

| Område                  | Validert av             | Hyppighet    | Kritikalitet |
| ----------------------- | ----------------------- | ------------ | ------------ |
| All ny kode             | Deg selv (manuell test) | Hver endring | Standard     |
| Sikkerhetskritisk kode* | Teknisk validator       | Alltid       | Kritisk      |
| Forretningslogikk       | Domeneekspert           | Ved endring  | Viktig       |
| Før lansering           | Teknisk validator       | Én gang      | Kritisk      |
| Etter større endringer  | Teknisk validator       | Ved behov    | Viktig       |

**Sikkerhetskritisk kode inkluderer:**

- Autentisering (innlogging)
- Autorisasjon (tilgangskontroll)
- Betalingslogikk
- Passord-håndtering
- Kryptering
- API-nøkler og hemmeligheter
- Input fra brukere
- Database-spørringer

#### Steg 4: Etabler kommunikasjonskanal

Bestem hvordan du kommuniserer med teknisk validator:

-  Slack/Teams-kanal
-  E-post
-  Ukentlige møter
-  Ad-hoc (ved behov)

### Annen viktig info

**Tommelfingerregel for validering:**

- Liten endring (styling, tekst) → Du selv
- Medium endring (ny funksjon) → Test selv, spør ved tvil
- Stor endring (ny modul, refaktorering) → Teknisk validator
- Sikkerhetskritisk → ALLTID teknisk validator

**Hva hvis du ikke har tilgang til teknisk hjelp?**

1. Bruk automatiske sikkerhetsverktøy (Snyk, SonarQube)
2. Unngå sikkerhetskritiske funksjoner i MVP
3. Bruk etablerte tredjepartstjenester for autentisering (Auth0, Clerk)
4. Bruk etablerte betalingsløsninger (Stripe, Vipps)
5. Søk feedback i utviklerforum før lansering

------

## 4. Kommunikasjonskontrakt med AI

### Hva dette punktet består av

Et sett med regler og metoder for hvordan du kommuniserer med AI-assistenten din for å få best mulig resultat.

### Hva er problemet (hvorfor dette er viktig)

Dårlig kommunikasjon med AI fører til:

- Kode som ikke gjør det du vil
- Misforståelser som tar tid å rette opp
- Inkonsistent kodebase
- Frustrasjon og bortkastet tid
- Tap av kontekst over tid

### Hva vi oppnår ved å etablere dette (verdi)

- Forutsigbare resultater
- Raskere utvikling
- Bedre kodekvalitet
- Dokumentert historie av beslutninger
- Enklere å gjenoppta etter pause

### Hvordan vi går frem

#### Steg 1: Grunnleggende prompt-prinsipper

**De 5 C-ene for gode prompts:**

| Prinsipp                        | Betydning                   | Eksempel                                                     |
| ------------------------------- | --------------------------- | ------------------------------------------------------------ |
| **Clear** (Klar)                | Vær spesifikk om hva du vil | "Lag en knapp" → "Lag en blå knapp med teksten 'Lagre' som kaller saveData-funksjonen" |
| **Context** (Kontekst)          | Gi bakgrunn                 | "Vi bruker React og Tailwind. Komponenten skal passe inn i sidebar." |
| **Constraints** (Begrensninger) | Si hva som IKKE skal gjøres | "Ikke endre eksisterende filer. Bruk kun eksisterende fargepalett." |
| **Criteria** (Kriterier)        | Definer suksess             | "Knappen skal være tilgjengelig (WCAG AA) og ha hover-effekt." |
| **Chunking** (Oppdeling)        | Del opp store oppgaver      | "Først: lag datamodellen. Deretter: lag API-et. Til slutt: lag UI." |

#### Steg 2: Klassifisering av endringer

Før du ber AI om å gjøre noe, klassifiser endringen:

| Størrelse | Beskrivelse              | Eksempel                         | Tilnærming                 |
| --------- | ------------------------ | -------------------------------- | -------------------------- |
| **XS**    | Kosmetisk, ingen logikk  | Endre farge, fikse skrivefeil    | Be AI gjøre det direkte    |
| **S**     | Liten funksjon, isolert  | Legg til felt i skjema           | Be AI gjøre det, test selv |
| **M**     | Ny funksjon, flere filer | Ny side med API-kall             | Be AI forklare plan først  |
| **L**     | Betydelig endring        | Ny modul, refaktorering          | Diskuter arkitektur først  |
| **XL**    | Arkitekturendring        | Bytte database, ny autentisering | Stopp, vurder konsekvenser |

**Regel:** For M, L og XL — be alltid AI forklare planen FØRST, før den skriver kode.

#### Steg 3: Prompt-maler

**Mal 1: Ny funksjon**

```
KONTEKST:
[Beskriv prosjektet kort]
[Beskriv relevante eksisterende komponenter]

OPPGAVE:
[Beskriv hva du vil ha]

KRAV:
- [Krav 1]
- [Krav 2]

BEGRENSNINGER:
- [Hva som ikke skal endres]
- [Hva som ikke skal brukes]

VIS MEG PLANEN FØR DU SKRIVER KODE.
```

**Mal 2: Feilsøking**

```
PROBLEM:
[Beskriv feilen]

FORVENTET OPPFØRSEL:
[Hva skulle skjedd]

FAKTISK OPPFØRSEL:
[Hva skjedde]

KODE SOM FEILER:
[Lim inn relevant kode]

FEILMELDING:
[Lim inn feilmelding]
```

**Mal 3: Code review-forespørsel**

```
GJENNOMGÅ DENNE KODEN FOR:
1. Sikkerhetsproblemer (spesielt input-validering, SQL injection, XSS)
2. Logiske feil
3. Edge cases som ikke er håndtert
4. Forbedringer

KODE:
[Lim inn kode]
```

#### Steg 4: Dokumenter AI-interaksjoner

**Prompt-logg (anbefalt for M+ endringer):**

| Dato | Endring | Prompt (oppsummert) | Resultat | Lærdom |
| ---- | ------- | ------------------- | -------- | ------ |
|      |         |                     |          |        |

**Eksempel:**

| Dato  | Endring                     | Prompt (oppsummert)                                      | Resultat                         | Lærdom                                |
| ----- | --------------------------- | -------------------------------------------------------- | -------------------------------- | ------------------------------------- |
| 15.01 | Legg til brukerregistrering | "Lag registreringsskjema med e-post og passord"          | Fungerte, men manglet validering | Spesifiser valideringskrav eksplisitt |
| 16.01 | Fiks validering             | "Legg til validering: e-post format, passord min 8 tegn" | OK                               | -                                     |

#### Steg 5: Når AI gjør feil

**Eskaleringsstruktur:**

1. **Først:** Prøv å omformulere prompten
2. **Deretter:** Gi mer kontekst eller eksempler
3. **Så:** Del opp oppgaven i mindre deler
4. **Til slutt:** Manuell intervensjon eller teknisk hjelp

**Advarselstegn på at AI "hallusinerer":**

- Refererer til funksjoner som ikke finnes
- Sier at noe fungerer uten å vise bevis
- Gir selvmotsigende svar
- Ignorerer begrensninger du har satt

**Når AI hallusinerer:**

1. IKKE stol på svaret
2. Be om å se faktisk kjørbar kode
3. Test selv før du går videre
4. Vurder å starte samtalen på nytt med ny kontekst

### Annen viktig info

**Gode vaner:**

- Start hver økt med å minne AI på prosjektkonteksten
- Bruk CLAUDE.md eller lignende for konsistent kontekst
- Be AI oppsummere hva den skal gjøre FØR den gjør det
- Ikke be om for mye på én gang
- Lagre gode prompts for gjenbruk

**Dårlige vaner å unngå:**

- "Bare fiks det" (for vagt)
- Lange, ustrukturerte prompts
- Aldri teste AI-output
- Ignorere advarsler fra AI
- Stole blindt på at koden er sikker

------

# DEL B: IDÉ OG VALIDERING

------

## 5. Problemdefinisjon

### Hva dette punktet består av

En klar, konsis beskrivelse av problemet produktet skal løse. Inkluderer hvem som har problemet, hva problemet er, og hvilke konsekvenser det har.

### Hva er problemet (hvorfor dette er viktig)

Uten et tydelig problem bygger du en løsning som leter etter et problem. **42% av startups feiler fordi det ikke finnes et reelt markedsbehov** (CB Insights). For vibe-koding er dette ekstra viktig fordi:

- AI kan bygge raskt, men bare hvis retningen er klar
- Vage problembeskrivelser gir vag kode
- Lettere å validere om AI-output løser problemet når problemet er klart definert

### Hva vi oppnår ved å gjøre dette (verdi)

- Klar retning for all utvikling
- Enklere å kommunisere med AI
- Målbar suksess (løser vi problemet?)
- Lettere å prioritere funksjoner
- Bedre intervjuer med brukere

### Hvordan vi går frem

#### Steg 1: Skriv problemet i én setning

**Formel:**

```
[Målgruppe] sliter med [problem] når de prøver å [oppnå mål],
noe som fører til [negativ konsekvens].
```

**Eksempel:**

> Små bedriftseiere sliter med manuell timeregistrering når de prøver å lage lønnsrapporter, noe som fører til 5+ timer bortkastet arbeid per uke og hyppige feil.

#### Steg 2: Valideringstest

Still disse spørsmålene:

-  Hvis dette problemet forsvant i morgen, ville noen lagt merke til det?
-  Prøver folk aktivt å løse dette i dag (selv med tungvinte metoder)?
-  Kan jeg finne 10 personer som har dette problemet innen en uke?
-  Er problemet stort nok til at folk vil betale for en løsning?
-  Er problemet forklarbart til en AI i én setning?

#### Steg 3: Problem-statement for AI

Lag en versjon av problemdefinisjonen som AI kan bruke:

markdown

```markdown
## Problem vi løser

**Målgruppe:** [Hvem]
**Problem:** [Hva]
**Nåværende løsning:** [Hvordan de løser det i dag]
**Hvorfor det er utilfredsstillende:** [Smerter]
**Vår løsning:** [Kort beskrivelse]
```

### Annen viktig info

**Vanlige feil:**

- For bredt problem ("bedre kommunikasjon")
- Løsning i forkledning ("vi trenger en app som...")
- Ingen klar målgruppe ("alle som...")
- Ikke validert med ekte mennesker

**Viktighet per prosjekttype:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
| ------------ | ------------ | ---------- | ---------- |
| Viktig       | Viktig       | Kritisk    | Kritisk    |

------

## 6. Jobs-to-be-Done (JTBD)

### Hva dette punktet består av

JTBD er et rammeverk som går dypere enn tradisjonell problemanalyse. Det antar at folk "ansetter" produkter for å gjøre en jobb — det de egentlig prøver å oppnå.

### Hva er problemet (hvorfor dette er viktig)

Tradisjonell produktutvikling fokuserer på funksjoner. Men folk kjøper ikke funksjoner — de "ansetter" produkter for å gjøre en jobb i livet sitt. Uten å forstå denne jobben bygger du funksjoner ingen trenger.

> *"Folk vil ikke ha en 6mm drill. De vil ha et 6mm hull."* — Theodore Levitt

### Hva vi oppnår ved å gjøre dette (verdi)

- Forstår den underliggende motivasjonen
- Bygger for det ekte behovet, ikke overfladiske ønsker
- Bedre produktbeslutninger
- Sterkere differensiering fra konkurrenter
- Microsoft økte inntektene med 100% year-over-year ved å bruke JTBD

### Hvordan vi går frem

#### Steg 1: Formuler hovedjobben

**JTBD-formel:**

```
Når jeg [situasjon/kontekst],
vil jeg [motivasjon/mål],
slik at jeg [ønsket utfall].
```

**Eksempel:**

> Når jeg er på fredag ettermiddag og lønnskjøring er på mandag, vil jeg raskt samle alle ansattes timer, slik at jeg kan nyte helgen uten bekymring.

#### Steg 2: Utforsk de tre dimensjonene

| Dimensjon            | Spørsmål                           | Ditt svar |
| -------------------- | ---------------------------------- | --------- |
| **Funksjonell jobb** | Hva prøver de å få gjort praktisk? |           |
| **Emosjonell jobb**  | Hvordan vil de føle seg?           |           |
| **Sosial jobb**      | Hvordan vil de fremstå for andre?  |           |

#### Steg 3: Kartlegg hindringer

| Spørsmål                                     | Svar |
| -------------------------------------------- | ---- |
| Hva stopper dem fra å få jobben gjort i dag? |      |
| Hvilke "workarounds" bruker de?              |      |
| Hvor frustrerende er dagens løsning (1-10)?  |      |

### Annen viktig info

**JTBD vs. User Stories:**

- User Story: "Som bruker vil jeg logge inn slik at jeg kan se mine data"
- JTBD: "Når jeg er på en delt PC, vil jeg trygt få tilgang til mine data, slik at ingen andre kan se dem"

JTBD gir mer kontekst og motivasjon.

**Viktighet per prosjekttype:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
| ------------ | ------------ | ---------- | ---------- |
| Moderat      | Viktig       | Kritisk    | Kritisk    |

------

## 7. Målgruppe & Persona

### Hva dette punktet består av

En spesifikk, navngitt beskrivelse av primærbrukeren. Ikke "alle som trenger X", men én konkret persontype du designer for.

### Hva er problemet (hvorfor dette er viktig)

Når du designer for "alle", designer du for ingen. Uten en klar persona:

- AI får motstridende instruksjoner
- Du prioriterer feil funksjoner
- UX blir inkonsistent
- Markedsføring blir generisk

### Hva vi oppnår ved å gjøre dette (verdi)

- Alle beslutninger har en referanse ("Ville Dag brukt dette?")
- Enklere å kommunisere retning til AI
- Fokusert funksjonalitet
- Bedre brukeropplevelse

### Hvordan vi går frem

#### Steg 1: Lag en primærpersona

**Persona-mal:**

markdown

```markdown
## Persona: [Navn]

### Demografi
- **Alder:**
- **Rolle/yrke:**
- **Bedriftsstørrelse:**
- **Teknisk nivå:** Lav / Middels / Høy
- **Bransje:**

### Kontekst
- **Typisk arbeidsdag:**
- **Verktøy de bruker i dag:**
- **Hvem rapporterer de til:**

### Mål
1. [Primærmål]
2. [Sekundærmål]

### Frustrasjoner
1. [Hovedfrustrasjon]
2. [Sekundær frustrasjon]

### Sitater (fra intervjuer)
- "Jeg skulle ønske..."
- "Det verste med [X] er..."

### Kjøpsatferd
- **Hvordan finner de løsninger?**
- **Hvem tar kjøpsbeslutningen?**
- **Viktigste beslutningskriterier:**
```

#### Steg 2: Valider med ekte mennesker

Personaen bør være basert på intervjuer, ikke gjetninger. Se punkt 9 (Idévalidering).

### Annen viktig info

**Tips:**

- Gi personaen et ekte navn (f.eks. "Daglig leder Dag")
- Bruk et bilde (kan være stock photo)
- Oppdater personaen basert på reelle intervjuer
- Start med ÉN primærpersona — du kan utvide senere

**Viktighet per prosjekttype:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
| ------------ | ------------ | ---------- | ---------- |
| Viktig       | Viktig       | Kritisk    | Kritisk    |

------

## 8. Verdiforslag

### Hva dette punktet består av

En klar formulering av hvorfor noen skal velge ditt produkt fremfor alternativene (inkludert å ikke gjøre noe).

### Hva er problemet (hvorfor dette er viktig)

Folk bytter ikke til noe nytt med mindre gevinsten er tydelig og stor nok. Uten et klart verdiforslag:

- Ingen forstår hvorfor de skal bruke produktet
- Vanskelig å differensiere fra konkurrenter
- Markedsføring blir svak
- AI har ikke klar retning for hva som er viktigst

### Hva vi oppnår ved å gjøre dette (verdi)

- Klar kommunikasjon internt og eksternt
- Prioritering av funksjoner (bygger det vi lover)
- Sterkere posisjonering
- Enklere salg og markedsføring

### Hvordan vi går frem

#### Steg 1: Skriv verdiforslaget

**Verdiforslag-formel:**

```
For [målgruppe]
som [har dette problemet/vil gjøre denne jobben],
er [produktnavn]
en [produktkategori]
som [nøkkelfordel].

I motsetning til [alternativer],
[produktnavn] [unik differensiator].
```

**Eksempel:**

> For små bedriftseiere som bruker timer på manuell timeregistrering, er TimeTrack en enkel web-app som automatiserer timeoversikt og lønnsgrunnlag. I motsetning til komplekse HR-systemer, kan TimeTrack settes opp på 5 minutter uten IT-hjelp.

#### Steg 2: Bruk Value Proposition Canvas

Koble verdiforslaget til kundens behov:

| Kundeprofil         | Verdiforslag               |
| ------------------- | -------------------------- |
| **Kundens jobber:** | **Produkter & tjenester:** |
| 1.                  | 1.                         |
| 2.                  | 2.                         |
| **Smerter:**        | **Smertelindrere:**        |
| 1.                  | 1.                         |
| 2.                  | 2.                         |
| **Gevinster:**      | **Gevinstskapere:**        |
| 1.                  | 1.                         |
| 2.                  | 2.                         |

### Annen viktig info

**Svakt vs. sterkt verdiforslag:**

| Svakt ❌          | Sterkt ✅                               |
| ---------------- | -------------------------------------- |
| "Spar tid"       | "Reduser fra 5 timer til 10 minutter"  |
| "Enkel å bruke"  | "Sett opp på 5 minutter uten IT-hjelp" |
| "Bedre oversikt" | "Se alle ansattes timer i sanntid"     |

**Viktighet per prosjekttype:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
| ------------ | ------------ | ---------- | ---------- |
| Moderat      | Viktig       | Kritisk    | Kritisk    |

------

## 9. Idévalidering

### Hva dette punktet består av

Reelle samtaler med potensielle brukere for å bekrefte at problemet finnes, er viktig nok, og at folk vil bruke/betale for en løsning.

### Hva er problemet (hvorfor dette er viktig)

Det er ekstremt lett å overbevise seg selv om at ideen er god. Hjernen filtrerer bort motargumenter. Bare ekte samtaler gir ærlig tilbakemelding. Uten validering:

- Bygger du kanskje noe ingen vil ha
- Bruker AI-tid på feil produkt
- Oppdager problemer for sent

### Hva vi oppnår ved å gjøre dette (verdi)

- Bekreftet at problemet er reelt
- Innsikt i hvordan folk faktisk jobber
- Sitater og eksempler til markedsføring
- Tidlig relasjon med potensielle kunder
- Grunnlag for bedre AI-prompts

### Hvordan vi går frem

#### Steg 1: Bestem intervjuvolum

| Prosjekttype | Minimum intervjuer | Anbefalt |
| ------------ | ------------------ | -------- |
| Lite internt | 3-5                | 5-10     |
| Internt m/DB | 5-10               | 10-15    |
| Kundevendt   | 10-20              | 20-50    |
| Stor skala   | 20-50              | 50-100   |

#### Steg 2: Bruk FOQL-metoden

| Fase         | Formål                               | Varighet   |
| ------------ | ------------------------------------ | ---------- |
| **F**rame    | Forklar formålet, sett forventninger | 2 min      |
| **O**pen     | Åpne spørsmål, bli kjent             | 5 min      |
| **Q**uestion | Hovedspørsmål om problem/behov       | 15-20 min  |
| **L**isten   | Lytt aktivt, følg opp                | Hele tiden |

#### Steg 3: Still riktige spørsmål (Mom Test)

> **Mom Test:** Still spørsmål som selv moren din ikke kan lyve om. Spør om fortiden (hva de har gjort), ikke fremtiden (hva de ville gjort).

**Gode spørsmål (om fortiden):**

1. "Fortell meg om sist du opplevde [problemet]"
2. "Hvor ofte skjer dette?"
3. "Hva gjorde du da?"
4. "Hva var mest frustrerende?"
5. "Hva kostet det deg (tid/penger/stress)?"
6. "Har du aktivt lett etter løsninger?"
7. "Hva har du prøvd?"

**Dårlige spørsmål (om fremtiden):**

| ❌ Ikke spør                  | ✅ Spør heller                                |
| ---------------------------- | -------------------------------------------- |
| "Ville du brukt dette?"      | "Fortell om sist du hadde dette problemet"   |
| "Er dette en god idé?"       | "Hva prøvde du å gjøre da?"                  |
| "Ville du betalt 100kr/mnd?" | "Hvor mye koster dette problemet deg i dag?" |

#### Steg 4: Rask prototyping med AI (NYTT)

**Vibe-koding-fordel:** Du kan lage en klikkbar prototype på timer, ikke uker.

**Prosess:**

1. Etter 3-5 intervjuer: Lag en enkel prototype med AI
2. Vis prototypen i neste runde intervjuer
3. Observer reaksjoner (ikke spør om de liker den)
4. Iterer basert på observasjoner
5. Gjenta

**Eksempel prompt for prototype:**

```
Lag en enkel klikkbar prototype (HTML/CSS) for en timeregistreringsapp.
Vis:
1. Liste over ansatte med timer denne uken
2. Knapp for å legge til ny timeregistrering
3. Enkel oppsummeringsvisning

Bruk minimalistisk design. Ingen funksjonalitet trengs — bare visuelt.
```

### Annen viktig info

**Se mal for intervjunotat og oppsummering i Vedlegg A.**

**Viktighet per prosjekttype:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
| ------------ | ------------ | ---------- | ---------- |
| Moderat      | Viktig       | Kritisk    | Kritisk    |

------

## 10. Konkurrentanalyse

### Hva dette punktet består av

En undersøkelse av eksisterende løsninger — både direkte konkurrenter og alternative måter folk løser problemet på (inkludert Excel, manuelt arbeid, og å ikke gjøre noe).

### Hva er problemet (hvorfor dette er viktig)

"Ingen konkurrenter" er nesten aldri et godt tegn. Det betyr enten at du ikke har lett godt nok, eller at markedet ikke er lønnsomt. Uten konkurrentanalyse:

- Vet du ikke hva du konkurrerer mot
- Kan gjenoppfinne hjulet
- Mister mulighet til å lære av andre

### Hva vi oppnår ved å gjøre dette (verdi)

- Forstår markedslandskapet
- Identifiserer differensieringsmuligheter
- Lærer av andres feil og suksesser
- Bedre posisjonering

### Hvordan vi går frem

#### Steg 1: Identifiser konkurrenttyper

| Type             | Beskrivelse                         | Eksempler fra ditt marked |
| ---------------- | ----------------------------------- | ------------------------- |
| **Direkte**      | Samme problem, samme løsningstype   |                           |
| **Indirekte**    | Samme problem, annen løsning        |                           |
| **Fremtidig**    | Kan entre markedet                  |                           |
| **Substitutter** | Alternativ (inkl. "ikke gjøre noe") |                           |

#### Steg 2: Analyser 2-3 hovedkonkurrenter

For hver konkurrent:

| Aspekt               | Konkurrent 1 | Konkurrent 2 | Konkurrent 3 |
| -------------------- | ------------ | ------------ | ------------ |
| **Navn**             |              |              |              |
| **Nettside**         |              |              |              |
| **Prismodell**       |              |              |              |
| **Styrker**          |              |              |              |
| **Svakheter**        |              |              |              |
| **Målgruppe**        |              |              |              |
| **Hva kan vi lære?** |              |              |              |

#### Steg 3: Definer din differensiering

**Hvordan skiller du deg ut:**

```
Vår unike posisjon: _______________
Hvorfor velge oss: _______________
```

### Annen viktig info

**Viktighet per prosjekttype:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
| ------------ | ------------ | ---------- | ---------- |
| Lav          | Lav          | Viktig     | Kritisk    |

------

# DEL C: FORRETNING OG SCOPE

------

## 11. Lean Canvas

### Hva dette punktet består av

En én-sides forretningsmodell som tvinger deg til å tenke gjennom alle aspekter av produktet.

### Hva er problemet (hvorfor dette er viktig)

Uten en helhetlig oversikt er det lett å fokusere på én del (f.eks. produkt) og glemme andre (f.eks. distribusjon). Lean Canvas avslører hull i tenkningen.

### Hva vi oppnår ved å gjøre dette (verdi)

- Helhetlig oversikt på én side
- Identifiserer svake punkter tidlig
- Enkelt å dele med andre for feedback
- Dokumentert forretningsmodell

### Hvordan vi går frem

Fyll ut Lean Canvas i denne rekkefølgen:

1. **Kundesegment** — Hvem er kundene? Hvem er early adopters?
2. **Problem** — Topp 3 problemer for dette segmentet
3. **Unikt verdiforslag** — Én setning som forklarer verdien
4. **Løsning** — Topp 3 funksjoner som adresserer problemene
5. **Kanaler** — Hvordan når du kundene?
6. **Inntektsstrømmer** — Hvordan tjener du penger?
7. **Kostnadsstruktur** — Hva koster det å drifte?
8. **Nøkkelmetrikker** — Hvilke tall måler suksess?
9. **Unfair advantage** — Hva kan ikke kopieres?

**Se full Lean Canvas-mal i Vedlegg A.**

### Annen viktig info

**Viktighet per prosjekttype:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
| ------------ | ------------ | ---------- | ---------- |
| Lav          | Moderat      | Kritisk    | Kritisk    |

------

## 12. Scope-definisjon (MoSCoW)

### Hva dette punktet består av

En tydelig liste over hva produktet skal og IKKE skal gjøre i første versjon.

### Hva er problemet (hvorfor dette er viktig)

"Scope creep" er en av de vanligste årsakene til at prosjekter feiler. Det er lettere å legge til funksjoner senere enn å fjerne dem. For vibe-koding:

- AI kan generere uendelig mye kode — noen må si stopp
- Uten klare grenser blir prosjektet uhåndterbart
- Teknisk gjeld vokser raskt

### Hva vi oppnår ved å gjøre dette (verdi)

- Fokusert MVP
- Raskere lansering
- Mindre teknisk gjeld
- Klare instruksjoner til AI

### Hvordan vi går frem

#### Steg 1: Kategoriser funksjoner

| Kategori        | Betydning              | Regel                              | Andel av innsats |
| --------------- | ---------------------- | ---------------------------------- | ---------------- |
| **M**ust have   | Kritisk for lansering  | Uten dette fungerer ikke produktet | ~60%             |
| **S**hould have | Viktig, ikke kritisk   | Smertefullt å utelate, men mulig   | ~20%             |
| **C**ould have  | Ønskelig               | Fint å ha hvis tid                 | ~20%             |
| **W**on't have  | Ikke i denne versjonen | Eksplisitt utelatt                 | 0%               |

#### Steg 2: Fyll ut MoSCoW

**Must have (uten disse lanserer vi ikke):** 1. 2. 3.

**Should have (viktig, men kan vente):** 1. 2.

**Could have (bonus):** 1. 2.

**Won't have (bevisst utelatt):**

| Funksjon | Grunn | Mulig i versjon |
| -------- | ----- | --------------- |
|          |       |                 |

### Annen viktig info

**MVP-typer å vurdere:**

| MVP-type               | Beskrivelse                    | Når bruke                      |
| ---------------------- | ------------------------------ | ------------------------------ |
| **Single-feature MVP** | Kun én kjernefunksjon          | Teste én hypotese              |
| **Concierge MVP**      | Manuell levering               | Teste verdi før automatisering |
| **Wizard of Oz MVP**   | Ser automatisk ut, manuelt bak | Teste UX før bygging           |
| **Landing page MVP**   | Kun landingsside               | Teste interesse                |
| **Prototype MVP**      | Klikkbar prototype             | Teste brukerflyt               |

**Viktighet per prosjekttype:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
| ------------ | ------------ | ---------- | ---------- |
| Moderat      | Viktig       | Viktig     | Kritisk    |

------

## 13. Kostnadsestimering inkludert AI-verktøy

### Hva dette punktet består av

En oversikt over alle kostnader knyttet til prosjektet, inkludert AI-verktøy, hosting, tredjepartstjenester og tid.

### Hva er problemet (hvorfor dette er viktig)

Mange glemmer at vibe-koding også har kostnader:

- AI-verktøy (abonnementer, tokens)
- Hosting og infrastruktur
- Tredjepartstjenester (autentisering, betaling)
- Tid (din tid har verdi)
- Teknisk hjelp/validering

### Hva vi oppnår ved å gjøre dette (verdi)

- Realistisk budsjett
- Ingen overraskelser
- Bedre beslutningsgrunnlag
- Vet om prosjektet er økonomisk forsvarlig

### Hvordan vi går frem

#### Steg 1: Kartlegg kostnader

**Engangskostnader:**

| Kategori                 | Beskrivelse           | Estimat (NOK) |
| ------------------------ | --------------------- | ------------- |
| Domene                   | Årsavgift             |               |
| Logo/design              | Hvis nødvendig        |               |
| Juridisk                 | Vilkår, personvern    |               |
| Oppsett                  | Initial konfigurasjon |               |
| **Sum engangskostnader** |                       |               |

**Månedlige kostnader:**

| Kategori                    | Tjeneste                        | Kostnad/mnd (NOK) |
| --------------------------- | ------------------------------- | ----------------- |
| **AI-verktøy**              |                                 |                   |
|                             | Claude Pro / API                |                   |
|                             | Cursor Pro                      |                   |
|                             | GitHub Copilot                  |                   |
| **Infrastruktur**           |                                 |                   |
|                             | Hosting (Vercel, Railway, etc.) |                   |
|                             | Database                        |                   |
|                             | Lagring (filer, bilder)         |                   |
| **Tredjeparter**            |                                 |                   |
|                             | Autentisering (Auth0, Clerk)    |                   |
|                             | E-post (Resend, SendGrid)       |                   |
|                             | Betaling (Stripe-gebyrer)       |                   |
| **Annet**                   |                                 |                   |
|                             | Domene (månedlig)               |                   |
|                             | Overvåkning                     |                   |
| **Sum månedlige kostnader** |                                 |                   |

**Tidskostnader:**

| Aktivitet             | Timer estimert | Din timepris | Total |
| --------------------- | -------------- | ------------ | ----- |
| Fase 1 (denne fasen)  |                |              |       |
| Utvikling             |                |              |       |
| Testing               |                |              |       |
| Lansering             |                |              |       |
| Vedlikehold (per mnd) |                |              |       |
| **Sum tidskostnader** |                |              |       |

#### Steg 2: Beregn break-even

```
Månedlig kostnad: _____
Pris per kunde: _____
Nødvendig antall kunder for break-even: _____
```

### Annen viktig info

**Typiske AI-verktøy-kostnader (2025):**

| Verktøy        | Pris     | Merknad                      |
| -------------- | -------- | ---------------------------- |
| Claude Pro     | ~$20/mnd | God for de fleste prosjekter |
| Claude API     | Variabel | Betaler per token            |
| Cursor Pro     | ~$20/mnd | IDE med AI                   |
| GitHub Copilot | ~$10/mnd | Kode-autocomplete            |

**Viktighet per prosjekttype:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
| ------------ | ------------ | ---------- | ---------- |
| Lav          | Moderat      | Viktig     | Kritisk    |

------

# DEL D: TEKNISK OG RISIKO

------

## 14. Teknisk Mulighetsvurdering

### Hva dette punktet består av

En vurdering av om prosjektet er teknisk gjennomførbart med tilgjengelige ressurser, teknologi og kompetanse — spesielt i konteksten av vibe-koding.

### Hva er problemet (hvorfor dette er viktig)

45% av IT-prosjekter overskrider budsjettet på grunn av dårlig tidlig vurdering (McKinsey). For vibe-koding:

- AI har begrensninger (ikke alt kan vibekodes)
- Integrasjoner kan være komplekse
- Skalerbarhet er ofte undervurdert
- Sikkerhetskrav kan være uforenlige med ren vibe-koding

### Hva vi oppnår ved å gjøre dette (verdi)

- Vet om prosjektet er teknisk mulig
- Identifiserer potensielle blokkere tidlig
- Bedre estimater
- Riktig valg av tilnærming (vibekode vs. hybrid vs. profesjonell)

### Hvordan vi går frem

#### Steg 1: Vurder egnede teknologivalg

For vibe-koding-prosjekter anbefales:

| Område            | Anbefalte valg              | Hvorfor                          |
| ----------------- | --------------------------- | -------------------------------- |
| **Frontend**      | React, Next.js, Vue         | God AI-støtte, mye dokumentasjon |
| **Backend**       | Node.js, Python (FastAPI)   | AI kjenner disse godt            |
| **Database**      | PostgreSQL, Supabase        | Robust, god støtte               |
| **Hosting**       | Vercel, Railway, Render     | Enkel oppsett                    |
| **Autentisering** | Clerk, Auth0, Supabase Auth | Unngå å vibekode dette           |
| **Betaling**      | Stripe                      | Aldri vibekode betalingslogikk   |

#### Steg 2: Sjekk integrasjoner

| System å integrere | API tilgjengelig? | Dokumentasjon | Kompleksitet |
| ------------------ | ----------------- | ------------- | ------------ |
|                    | Ja/Nei            | God/OK/Dårlig | Lav/Mid/Høy  |
|                    |                   |               |              |

#### Steg 3: Vurder kompetansegap

| Område         | Din kompetanse (1-5) | Kritisk for prosjektet? | Plan for å lukke gap |
| -------------- | -------------------- | ----------------------- | -------------------- |
| Frontend       |                      |                         |                      |
| Backend        |                      |                         |                      |
| Database       |                      |                         |                      |
| DevOps/Hosting |                      |                         |                      |
| Sikkerhet      |                      |                         |                      |

#### Steg 4: Konklusjon

☐ Teknisk gjennomførbart med vibe-koding ☐ Gjennomførbart med teknisk støtte på enkelte områder ☐ Krever hybrid tilnærming (vibekode + profesjonell) ☐ Ikke egnet for vibe-koding

### Annen viktig info

**Når kan du hoppe over dette?**

- Prosjektet ligner noe du har gjort før
- Standardteknologi med kjent løsning
- Veldig lite og enkelt prosjekt

**Viktighet per prosjekttype:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
| ------------ | ------------ | ---------- | ---------- |
| Lav          | Viktig       | Kritisk    | Kritisk    |

------

## 15. Risikovurdering & AI-spesifikke Risikoer

### Hva dette punktet består av

Identifisering av hva som kan gå galt, vurdere sannsynlighet og konsekvens, og planlegge tiltak. Inkluderer spesifikke risikoer knyttet til AI-generert kode.

### Hva er problemet (hvorfor dette er viktig)

Organisasjoner med strukturert risikostyring har 2.5x høyere suksessrate (PMI). For vibe-koding kommer EKSTRA risikoer:

- AI-hallusinasjoner
- Sikkerhetssårbarheter i generert kode
- Utdaterte biblioteker og mønstre
- Compliance-utfordringer
- Teknisk gjeld

### Hva vi oppnår ved å gjøre dette (verdi)

- Forberedt på problemer
- Redusert sannsynlighet for feil
- Raskere respons når ting går galt
- Tryggere prosjektgjennomføring

### Hvordan vi går frem

#### Steg 1: Identifiser generelle risikoer

| Kategori         | Eksempler                       | Dine risikoer |
| ---------------- | ------------------------------- | ------------- |
| **Marked**       | Ingen etterspørsel, feil timing |               |
| **Teknisk**      | Kompleksitet, integrasjoner     |               |
| **Finansiell**   | Budsjett, kostnadsoverskridelse |               |
| **Operasjonell** | Team, kompetanse                |               |
| **Juridisk**     | Compliance, IP                  |               |

#### Steg 2: AI-SPESIFIKKE RISIKOER (KRITISK)

| Risiko                       | Beskrivelse                                   | Sannsynlighet | Tiltak                                          |
| ---------------------------- | --------------------------------------------- | ------------- | ----------------------------------------------- |
| **Sikkerhetssårbarheter**    | 45% av AI-kode har hull (Veracode 2025)       | Høy           | Manuell sikkerhetsvurdering av all kritisk kode |
| **AI-hallusinasjoner**       | AI påstår noe fungerer, men det gjør det ikke | Medium        | ALLTID test selv, aldri stol blindt             |
| **Utdaterte biblioteker**    | AI foreslår deprecated løsninger              | Medium        | Spesifiser versjoner, sjekk dokumentasjon       |
| **Hardkodede hemmeligheter** | AI legger API-nøkler i koden                  | Medium        | Sjekk ALLTID for hemmeligheter før commit       |
| **Inkonsistent arkitektur**  | Kodebasen blir et lappeteppe                  | Høy           | Etabler konvensjoner tidlig (CLAUDE.md)         |
| **Tap av kontekst**          | AI glemmer tidligere beslutninger             | Høy           | Dokumenter i CLAUDE.md, bruk korte økter        |
| **Overtillit**               | Du stoler for mye på AI-output                | Høy           | Etabler review-rutiner, vær skeptisk            |
| **Teknisk gjeld**            | Rask kode akkumulerer problemer               | Høy           | Planlegg refaktorering, budsjetter tid          |
| **Compliance-brudd**         | AI ignorerer regelverk                        | Medium        | Spesifiser krav eksplisitt, juridisk review     |
| **Skaleringsutfordringer**   | Koden fungerer ikke under last                | Medium        | Test tidlig, planlegg for vekst                 |

#### Steg 3: Pre-mortem analyse

> "Forestill deg at det er 6 måneder fra nå. Prosjektet har feilet totalt. Hva gikk galt?"

List 5-10 grunner til at prosjektet kunne feile: 1. 2. 3. 4. 5.

For hver grunn: Hva kan vi gjøre NÅ for å forhindre dette?

#### Steg 4: Lag risikoregister

| #    | Risiko | Kategori | S     | K     | Score | Tiltak | Eier |
| ---- | ------ | -------- | ----- | ----- | ----- | ------ | ---- |
| 1    |        |          | L/M/H | L/M/H | 🔴🟡🟢   |        |      |
| 2    |        |          |       |       |       |        |      |

**Scoring:**

- 🔴 Høy S + Høy K = Må håndteres umiddelbart
- 🟡 Medium = Ha plan
- 🟢 Lav = Monitor

### Annen viktig info

**Skrekkeksempel:** SaaStr's CEO brukte Replit AI. AI-en løy om at tester passerte, ignorerte kodefrys, og slettet til slutt hele produksjonsdatabasen. Måneder med data var borte.

**Lærdom:** ALDRI stol blindt på AI. Test selv. Ha backup. Vær skeptisk.

**Viktighet per prosjekttype:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
| ------------ | ------------ | ---------- | ---------- |
| Moderat      | Viktig       | Kritisk    | Kritisk    |

------

## 16. Dataklassifisering

### Hva dette punktet består av

En oversikt over hvilke typer data systemet vil håndtere, og hvor sensitiv hver type er.

### Hva er problemet (hvorfor dette er viktig)

GDPR-brudd kan gi bøter på opptil 4% av global omsetning eller 20 millioner euro. Å vite hva du håndterer er første steg til å beskytte det riktig. AI-verktøy har ofte tilgang til data — du må vite hva som deles.

### Hva vi oppnår ved å gjøre dette (verdi)

- Riktig sikkerhetsnivå for hver datatype
- GDPR-compliance
- Trygghet for brukere
- Vet hva som kan/ikke kan deles med AI

### Hvordan vi går frem

#### Steg 1: Kartlegg data

| Datatype | Eksempler | Klassifisering                     | Kilde |
| -------- | --------- | ---------------------------------- | ----- |
|          |           | Offentlig/Intern/Konf/Strengt konf |       |
|          |           |                                    |       |

#### Steg 2: Klassifiseringsnivåer

| Nivå                      | Beskrivelse            | Eksempler       | Krav                 |
| ------------------------- | ---------------------- | --------------- | -------------------- |
| **Offentlig**             | Kan deles fritt        | Produktinfo     | Basis sikkerhet      |
| **Intern**                | Kun for organisasjonen | Notater         | Tilgangskontroll     |
| **Konfidensiell**         | Begrenset tilgang      | Persondata      | GDPR, kryptering     |
| **Strengt konfidensiell** | Spesiell beskyttelse   | Helse, betaling | Streng GDPR, logging |

#### Steg 3: AI-spesifikke hensyn

**Hva kan deles med AI?**

- ✅ Offentlig data
- ⚠️ Intern data (vurder)
- ❌ Konfidensiell data (anonymiser først)
- ❌ Strengt konfidensiell (aldri)

### Annen viktig info

**Viktig for vibe-koding:** Når du ber AI om hjelp, kan du utilsiktet dele sensitiv data. Vær bevisst på hva du limer inn i prompts.

**Viktighet per prosjekttype:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
| ------------ | ------------ | ---------- | ---------- |
| Lav          | Viktig       | Kritisk    | Kritisk    |

------

## 17. Regulatoriske Krav

### Hva dette punktet består av

Lover, regler og standarder produktet må overholde.

### Hva er problemet (hvorfor dette er viktig)

Å bygge noe som bryter lover kan føre til bøter, søksmål og omdømmeskade. EU Cyber Resilience Act krever nå "secure-by-design" for programvare — dette påvirker også vibe-kodede produkter.

### Hva vi oppnår ved å gjøre dette (verdi)

- Unngår juridiske problemer
- Bygger tillit hos brukere
- Enklere samarbeid med større kunder
- Klart for skalering

### Hvordan vi går frem

#### Steg 1: Sjekk relevante regelverk

| Regelverk                | Gjelder for              | Relevant? | Tiltak |
| ------------------------ | ------------------------ | --------- | ------ |
| **GDPR**                 | Persondata om EU-borgere | Ja/Nei    |        |
| **PCI DSS**              | Betalingskortdata        | Ja/Nei    |        |
| **WCAG**                 | Tilgjengelighet          | Ja/Nei    |        |
| **Cyber Resilience Act** | Programvare i EU         | Ja/Nei    |        |
| **Bokføringsloven**      | Regnskapsdata            | Ja/Nei    |        |

#### Steg 2: For vibe-koding spesielt

**EU Cyber Resilience Act krav:**

- Secure-by-design
- Kontinuerlig sikkerhetsvurdering
- Dokumentasjon av sikkerhetstiltak
- Rask respons på sårbarheter

**Konsekvens:** Ren vibe-koding uten sikkerhetsvalidering kan bryte EU-lov.

### Annen viktig info

**Når trenger du juridisk hjelp?**

- Håndterer sensitive persondata
- Har kunder i regulerte bransjer
- Opererer i flere land
- Er usikker på compliance

**Viktighet per prosjekttype:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
| ------------ | ------------ | ---------- | ---------- |
| Lav          | Moderat      | Viktig     | Kritisk    |

------

# DEL E: MÅL OG DOKUMENTASJON

------

## 18. Suksesskriterier & PMF-mål

### Hva dette punktet består av

Konkrete, målbare indikatorer som forteller om prosjektet lykkes, inkludert mål for Product-Market Fit (PMF).

### Hva er problemet (hvorfor dette er viktig)

Uten definerte suksesskriterier:

- Vet du ikke når du er ferdig
- Kan ikke evaluere fremgang
- Ingen vet om prosjektet er en suksess
- AI har ikke mål å optimalisere mot

### Hva vi oppnår ved å gjøre dette (verdi)

- Målbar fremgang
- Klare beslutningspunkter
- Motivasjon gjennom milepæler
- Objektivt grunnlag for Go/No-Go

### Hvordan vi går frem

#### Steg 1: Definer PMF-mål

**Sean Ellis' 40%-test:**

> Hvis under 40% av brukerne ville bli "veldig skuffet" om produktet forsvant, har du ikke PMF.

**Dine PMF-mål:**

-  PMF-score ≥40% "veldig skuffet"
-  Retention uke 4 ≥_____%
-  NPS ≥_____

#### Steg 2: Sett målbare kriterier

**Brukermål:**

| Kriterie         | Mål  | Måles hvordan |
| ---------------- | ---- | ------------- |
| Aktive brukere   |      |               |
| Fullføringsrate  |      |               |
| Brukertilfredhet |      |               |

**Forretningsmål:**

| Kriterie         | Mål  | Måles hvordan |
| ---------------- | ---- | ------------- |
| Omsetning        |      |               |
| Betalende kunder |      |               |
| Churn rate       |      |               |

**Tekniske mål:**

| Kriterie            | Mål        | Måles hvordan |
| ------------------- | ---------- | ------------- |
| Oppetid             | >99.___%   | Monitoring    |
| Responstid (P95)    | <___ms     | APM           |
| Sikkerhetshendelser | 0 kritiske | SIEM          |

### Annen viktig info

**Viktig for vibe-koding:** Legg til et teknisk gjeld-mål:

- Maks X% av tiden brukt på å fikse gammel kode

**Viktighet per prosjekttype:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
| ------------ | ------------ | ---------- | ---------- |
| Moderat      | Viktig       | Kritisk    | Kritisk    |

------

## 19. Dokumentasjonsstrategi for AI

### Hva dette punktet består av

En plan for hvordan du dokumenterer prosjektet slik at AI (og mennesker) alltid har riktig kontekst.

### Hva er problemet (hvorfor dette er viktig)

AI har begrenset kontekstvindu og "glemmer" mellom økter. Uten god dokumentasjon:

- AI gjentar feil
- Inkonsistent kodebase
- Tap av institusjonell kunnskap
- Vanskelig å gjenoppta etter pause
- Nye AI-økter starter på scratch

### Hva vi oppnår ved å gjøre dette (verdi)

- Konsistent kodebase
- Raskere onboarding (av nye AI-økter)
- Færre feil
- Enklere vedlikehold
- Historikk over beslutninger

### Hvordan vi går frem

#### Steg 1: Opprett CLAUDE.md (eller lignende)

Denne filen skal gi AI all nødvendig kontekst for å jobbe med prosjektet.

**Innhold:**

markdown

```markdown
# [Prosjektnavn] - AI Kontekstfil

## Om prosjektet
[2-3 setninger om hva prosjektet er]

## Teknisk stack
- Frontend: [f.eks. React, Next.js]
- Backend: [f.eks. Node.js, Python]
- Database: [f.eks. PostgreSQL, Supabase]
- Hosting: [f.eks. Vercel, Railway]

## Mappestruktur
```

/src /components - React-komponenter /pages - Sider/routes /lib - Hjelpefunksjoner /api - API-endepunkter

```
## Kodekonvensjoner
- Navngivning: camelCase for variabler, PascalCase for komponenter
- Filnavn: kebab-case.tsx
- Importrekkefølge: React → eksterne → interne → typer
- [Andre konvensjoner]

## Viktige beslutninger
| Dato | Beslutning | Grunn |
|------|------------|-------|
| [dato] | [hva] | [hvorfor] |

## Områder som IKKE skal AI-genereres uten review
- Autentisering
- Betalingslogikk
- [andre kritiske områder]

## Vanlige oppgaver
### Legge til ny side
1. Opprett fil i /pages
2. Legg til i navigasjon
3. [etc.]

### Legge til ny API-endepunkt
1. [steg]

## Kjente problemer / TODOs
- [ ] [Problem 1]
- [ ] [Problem 2]
```

#### Steg 2: Etabler oppdateringsrutine

**Når oppdatere CLAUDE.md:**

- Etter hver større beslutning
- Når nye konvensjoner etableres
- Når nye avhengigheter legges til
- Når kjente problemer oppstår
- Ukentlig gjennomgang

#### Steg 3: Prompt-logg (anbefalt)

For større endringer, logg prompten og resultatet:

| Dato | Oppgave | Prompt (oppsummert) | Resultat | Lærdom |
| ---- | ------- | ------------------- | -------- | ------ |
|      |         |                     |          |        |

### Annen viktig info

**Plassering av CLAUDE.md:**

- I rot av prosjektet
- Start hver AI-økt med: "Les CLAUDE.md først"

**Viktighet per prosjekttype:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
| ------------ | ------------ | ---------- | ---------- |
| Moderat      | Viktig       | Kritisk    | Kritisk    |

------

## 20. Exit-strategi og Skalering

### Hva dette punktet består av

En plan for hva som skjer når prosjektet vokser forbi vibe-kodingens grenser, eller når du trenger å overlevere til profesjonelle.

### Hva er problemet (hvorfor dette er viktig)

Vibe-koding er ideelt for MVP, men har begrensninger. Uten en exit-plan:

- Vet du ikke når du skal skalere opp
- Teknisk gjeld kan bli uhåndterbar
- Overleveringkan bli kaotisk
- Kan bli "fanget" i en kodebase ingen forstår

### Hva vi oppnår ved å planlegge dette (verdi)

- Vet når det er tid for neste steg
- Forberedt på vekst
- Smidigere overlevering
- Realistiske forventninger

### Hvordan vi går frem

#### Steg 1: Definer terskler for skalering

**Når bør du vurdere profesjonell hjelp?**

| Terskel           | Tegn                       | Handling                   |
| ----------------- | -------------------------- | -------------------------- |
| **Kodestørrelse** | >30 000 linjer             | Vurder arkitekturreview    |
| **Team**          | >2 personer utvikler       | Trenger kodestandarder     |
| **Brukere**       | >1000 aktive               | Vurder skalering           |
| **Omsetning**     | >X kr/mnd                  | Råd til profesjonell hjelp |
| **Kompleksitet**  | Kan ikke forklare systemet | Trenger dokumentasjon      |
| **Teknisk gjeld** | >30% tid på fixes          | Refaktorering nødvendig    |
| **Sikkerhet**     | Hendelse har skjedd        | Sikkerhetsreview           |

#### Steg 2: Budsjetter for teknisk gjeld

**Tommelfingerregel:**

- 20-30% av utviklingstid bør gå til vedlikehold og forbedring
- Hvis du bruker mer enn 50% på fixes, har du et problem

**Ditt teknisk gjeld-budsjett:**

- Timer per uke til refaktorering: _____
- Milepæler for opprydding: _____

#### Steg 3: Dokumenter for overlevering

**Hvis prosjektet skal overleveres:**

-  CLAUDE.md er oppdatert
-  README med oppsett-instruksjoner
-  Arkitekturdiagram
-  Liste over kjente problemer
-  Autentiseringsinformasjon (sikret)
-  Oversikt over tredjepartstjenester

### Annen viktig info

**Overlevering til profesjonelle:** Forvent at de vil ønske å skrive om deler av koden. Dette er normalt — vibe-kodet kode er ofte "godt nok" for MVP, men ikke optimalt for skalering.

**Viktighet per prosjekttype:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
| ------------ | ------------ | ---------- | ---------- |
| Lav          | Moderat      | Viktig     | Kritisk    |

------

# DEL F: BESLUTNING

------

## 21. Go/No-Go Beslutning

### Hva dette punktet består av

Et strukturert beslutningspunkt før du går videre til neste fase.

### Hva er problemet (hvorfor dette er viktig)

Uten tydelige beslutningskriterier fortsetter prosjekter på autopilot selv når de burde stoppes eller justeres. For vibe-koding er dette spesielt viktig fordi:

- Det er lett å fortsette å bygge uten å tenke
- AI genererer kode uansett om retningen er riktig
- Sunk cost fallacy ("vi har allerede brukt så mye tid")

### Hva vi oppnår ved å gjøre dette (verdi)

- Objektivt beslutningsgrunnlag
- Unngår å kaste bort tid på feil prosjekt
- Dokumentert beslutning
- Trygghet i valget

### Hvordan vi går frem

#### Steg 1: Must-meet kriterier (Knock-out)

Ett "Nei" = RECYCLE eller KILL

| #    | Kriterie                                            | ✅/❌  | Kommentar |
| ---- | --------------------------------------------------- | ---- | --------- |
| 1    | Er problemet tydelig definert?                      |      |           |
| 2    | Har vi snakket med minst 5 potensielle brukere?     |      |           |
| 3    | Bekrefter brukerne at problemet er reelt og viktig? |      |           |
| 4    | Er det teknisk gjennomførbart?                      |      |           |
| 5    | Er det innenfor regulatoriske rammer?               |      |           |
| 6    | Har vi sikkerhetsnett (teknisk validering)?         |      |           |
| 7    | Er vi villige å investere tid/penger?               |      |           |

#### Steg 2: Should-meet scoring (0-5)

| #    | Kriterie                         | Score |
| ---- | -------------------------------- | ----- |
| 1    | Styrke på verdiforslag           | /5    |
| 2    | Klarhet i målgruppe              | /5    |
| 3    | Differensiering fra konkurrenter | /5    |
| 4    | Realistisk scope for MVP         | /5    |
| 5    | Håndterbare risikoer             | /5    |
| 6    | Team-kapasitet og kompetanse     | /5    |
| 7    | Markedspotensial                 | /5    |
| 8    | Egnethet for vibe-koding         | /5    |
| 9    | Dokumentasjon på plass           | /5    |
|      | **Total:**                       | /45   |

**Tolkning:**

- 36-45: Sterkt GO
- 27-35: GO med oppmerksomhet
- 18-26: HOLD — Forbedre først
- 0-17: RECYCLE eller KILL

#### Steg 3: Ta beslutningen

| Beslutning    | Betydning           | Neste steg              |
| ------------- | ------------------- | ----------------------- |
| ✅ **GO**      | Fortsett til Fase 2 | Start kravspesifikasjon |
| 🔄 **RECYCLE** | Mer arbeid i Fase 1 | [Hva må gjøres]         |
| ⏸️ **HOLD**    | Pause               | Vent på [hva]           |
| ❌ **KILL**    | Stopp prosjektet    | [Grunn]                 |

**Vår beslutning:** _____________

**Dato:** _____________

**Besluttet av:** _____________

### Annen viktig info

**Vanlige grunner til RECYCLE:**

- Ikke nok brukerintervjuer
- Uklar målgruppe
- Mangler teknisk validator
- Risikoer ikke kartlagt

**Vanlige grunner til KILL:**

- Ingen bekrefter problemet
- Teknisk umulig med ressursene
- Regulatoriske blokkere
- Ikke verdt investeringen

------

## 21b. Funksjonsregistrering og BRUKERENS-PLAN

### Hva dette punktet består av

Gjennom Fase 1 beskriver du funksjoner du ønsker i produktet — i MoSCoW-prioriteringen, i samtaler med AI, og i idéutforskningen. Disse fanges opp og samles i et dokument kalt **BRUKERENS-PLAN.md**.

### Hva er problemet (hvorfor dette er viktig)

Uten systematisk registrering av ønskede funksjoner risikerer du at:
- Gode idéer fra tidlige samtaler går tapt
- Du gjentar deg selv i senere faser
- AI-assistenten mangler en samlet oversikt over hva du vil bygge
- Overgangen til Fase 2 mister verdifull kontekst

### Hva vi oppnår ved å gjøre dette (verdi)

- **Komplett oversikt:** Alle ønskede funksjoner er samlet på ett sted
- **Sporbarhet:** Ingenting som ble nevnt tidlig forsvinner
- **Smidig overgang:** Fase 2 bruker BRUKERENS-PLAN som utgangspunkt for det formelle modulregisteret
- **Brukerens stemme bevart:** Det er DINE ord og prioriteringer som fanges

### Hvordan vi går frem

AI-assistenten fanger automatisk opp funksjoner du beskriver underveis i Fase 1, og samler dem i `docs/BRUKERENS-PLAN.md`. Du trenger ikke gjøre noe spesielt — bare beskriv hva du vil at produktet skal gjøre.

**Hva som registreres:**
- Funksjoner du nevner i MoSCoW-prioriteringen
- Idéer som dukker opp i samtaler
- Behov som avdekkes gjennom personas og JTBD

**Hva som IKKE gjøres i Fase 1:**
- Formell modulregistrering (det skjer i Fase 2)
- Teknisk nedbrytning av funksjoner
- Avhengighetsanalyse mellom funksjoner

> **For ikke-tekniske:** Tenk på BRUKERENS-PLAN som en ønskeliste. Du skriver ned alt du vil ha, og i neste fase (Fase 2) organiserer AI det til en strukturert plan med prioriteringer og avhengigheter.

------

## 22. Leveranser fra Fase 1

### Hva dette punktet består av

En sjekkliste over dokumenter og beslutninger som skal være på plass før Fase 2.

### Hva er problemet (hvorfor dette er viktig)

Uten klare leveranser:

- Viktige ting glemmes
- Fase 2 starter med hull
- Ingen vet hva som er "ferdig"
- AI mangler nødvendig kontekst

### Hva vi oppnår ved å fullføre dette (verdi)

- Komplett grunnlag for neste fase
- Dokumentasjon å dele med AI
- Trygghet i at vi er klare
- Sporbarhet

### Sjekkliste

#### Obligatorisk

-  **Prosjektbeskrivelse** (1-2 sider)
-  **Egnethetsvurdering** for vibe-koding
-  **Team og sikkerhetsnett** definert
-  **Problemdefinisjon** i én setning
-  **Persona** laget
-  **JTBD** formulert
-  **Verdiforslag** skrevet
-  **Intervjuoppsummering** (min 5 intervjuer)
-  **MoSCoW-prioritering** ferdig
-  **Risikoregister** med AI-risikoer
-  **CLAUDE.md** opprettet
-  **Go/No-Go beslutning** tatt
-  **BRUKERENS-PLAN.md** — samlet oversikt over ønskede funksjoner (fanget automatisk av AI)

#### Anbefalt

-  Lean Canvas
-  Pre-mortem analyse
-  Konkurrentanalyse
-  Teknisk mulighetsvurdering
-  Dataklassifisering
-  Regulatorisk sjekkliste
-  Kostnadsestimering
-  Suksesskriterier
-  Exit-strategi

### Overlevering til Fase 2

**Pakke til AI for Fase 2:**

1. CLAUDE.md med all kontekst
2. Prosjektbeskrivelse
3. MoSCoW-prioritering
4. Risikoregister
5. Persona-beskrivelse
6. Tekniske valg
7. BRUKERENS-PLAN.md (funksjonsønsker samlet i Fase 1)

**Første prompt for Fase 2:**

```
Les først CLAUDE.md og prosjektbeskrivelsen.
Vi skal nå starte Fase 2: Planlegg.
Basert på MoSCoW-prioriteringen, hjelp meg med å
lage detaljerte user stories for Must Have-funksjonene.
```

------

# VEDLEGG

------

## Vedlegg A: Alle Maler

### Prosjektbeskrivelse-mal

markdown

```markdown
# [Prosjektnavn]

**Versjon:** 1.0
**Dato:**
**Eier:**

## 1. Problemdefinisjon
[2-3 setninger]

## 2. Målgruppe
**Primær persona:** [Navn og beskrivelse]

## 3. Jobs-to-be-Done
Når [situasjon], vil brukeren [handling], slik at de [utfall].

## 4. Verdiforslag
For [målgruppe] som [problem], er [produkt] en [kategori] som [nøkkelfordel].

## 5. Validering
- Intervjuer gjennomført: X
- Problem bekreftet: Ja/Nei
- Betalingsvilje indikert: Ja/Nei

## 6. MVP Scope (MoSCoW)
**Must have:**
1.
2.
3.

**Won't have (v1):**
1.
2.

## 7. Suksesskriterier
1.
2.
3.

## 8. Hovedrisikoer
| Risiko | Tiltak |
|--------|--------|
| | |

## 9. Teknisk tilnærming
[Teknologivalg og arkitektur]

## 10. Vibe-koding egnethet
- Score: [Egnet/Delvis/Ikke egnet]
- Teknisk validator: [Hvem]
- Sikkerhetskritiske områder: [Liste]
```

### CLAUDE.md-mal

markdown

```markdown
# [Prosjektnavn] - AI Kontekstfil

## Om prosjektet
[2-3 setninger]

## Teknisk stack
- Frontend:
- Backend:
- Database:
- Hosting:

## Mappestruktur
[Beskriv]

## Kodekonvensjoner
- [Konvensjon 1]
- [Konvensjon 2]

## Viktige beslutninger
| Dato | Beslutning | Grunn |
|------|------------|-------|

## Områder som IKKE skal AI-genereres uten review
-
-

## Kjente problemer / TODOs
- [ ]
- [ ]
```

### Persona-mal

markdown

```markdown
## Persona: [Navn]

### Demografi
- **Alder:**
- **Rolle/yrke:**
- **Teknisk nivå:** Lav / Middels / Høy

### Mål
1. [Primærmål]
2. [Sekundærmål]

### Frustrasjoner
1. [Hovedfrustrasjon]
2. [Sekundær frustrasjon]

### Sitater
- "..."
- "..."
```

### Intervju-mal

markdown

```markdown
## Intervju #[nummer]

**Dato:**
**Navn/rolle:**
**Varighet:**

### Nøkkelinnsikter
1.
2.
3.

### Sitater
- "..."
- "..."

### Problem-validering
- Har problemet: Ja / Nei / Delvis
- Alvorlighetsgrad (1-10):
- Frekvens: Daglig / Ukentlig / Månedlig
- Aktivt søker løsning: Ja / Nei

### Betalingsvilje
- Indikert: Ja / Nei / Usikker
- Prisindikasjon:
```

### Risikoregister-mal

markdown

```markdown
## Risikoregister

| # | Risiko | Kategori | S | K | Score | Tiltak | Eier | Status |
|---|--------|----------|---|---|-------|--------|------|--------|
| 1 | | | L/M/H | L/M/H | 🔴🟡🟢 | | | |
| 2 | | | | | | | | |

### AI-spesifikke risikoer
| Risiko | Tiltak | Ansvarlig |
|--------|--------|-----------|
| Sikkerhetssårbarheter | | |
| Hallusinasjoner | | |
| Utdaterte biblioteker | | |
| Hardkodede hemmeligheter | | |
```

### Go/No-Go-mal

markdown

```markdown
## Go/No-Go vurdering — Fase 1

**Prosjekt:**
**Dato:**

### Must-meet (Knock-out)
| # | Kriterie | ✅/❌ |
|---|----------|------|
| 1 | Problem tydelig definert | |
| 2 | ≥5 brukerintervjuer | |
| 3 | Problem bekreftet | |
| 4 | Teknisk gjennomførbart | |
| 5 | Regulatorisk OK | |
| 6 | Sikkerhetsnett på plass | |
| 7 | Villig å investere | |

### Should-meet (Score 0-5)
| Kriterie | Score |
|----------|-------|
| Verdiforslag | /5 |
| Målgruppe | /5 |
| Differensiering | /5 |
| Scope | /5 |
| Risikoer | /5 |
| Kapasitet | /5 |
| Markedspotensial | /5 |
| Vibe-koding egnethet | /5 |
| Dokumentasjon | /5 |
| **Total:** | /45 |

### Beslutning
☐ GO — Fortsett til Fase 2
☐ RECYCLE — Mer arbeid i Fase 1
☐ HOLD — Pause
☐ KILL — Stopp

**Signatur:**
**Dato:**
```

------

## Vedlegg B: Ordliste

| Begrep            | Forklaring                                                   |
| ----------------- | ------------------------------------------------------------ |
| **Vibe-koding**   | Bruke naturlig språk til å instruere AI til å generere kode  |
| **MVP**           | Minimum Viable Product — minste versjon som gir verdi        |
| **JTBD**          | Jobs-to-be-Done — rammeverk for å forstå kundebehov          |
| **PMF**           | Product-Market Fit — når produkt møter markedsbehov          |
| **MoSCoW**        | Must/Should/Could/Won't — prioriteringsmetode                |
| **CRUD**          | Create, Read, Update, Delete — standard databaseoperasjoner  |
| **Hallusinasjon** | Når AI genererer feilaktig informasjon som om det er fakta   |
| **Teknisk gjeld** | Fremtidige kostnader fra raske/dårlige løsninger             |
| **SAST**          | Static Application Security Testing — automatisk kodesikkerhet |
| **DAST**          | Dynamic Application Security Testing — testing av kjørende app |
| **API**           | Application Programming Interface — grensesnitt mellom systemer |
| **Prompt**        | Instruksjon/spørsmål du gir til AI                           |
| **Kontekst**      | Bakgrunnsinformasjon AI trenger for å gi gode svar           |
| **GDPR**          | EUs personvernforordning                                     |
| **Scope creep**   | Når prosjektomfang vokser ukontrollert                       |

------

## Vedlegg C: Ressurser og Referanser

### Verktøy

| Kategori        | Verktøy                        | Bruk                |
| --------------- | ------------------------------ | ------------------- |
| **AI-koding**   | Claude, Cursor, GitHub Copilot | Kodegenerering      |
| **Prototyping** | Figma, v0.dev                  | Design og prototype |
| **Hosting**     | Vercel, Railway, Render        | Deploy              |
| **Database**    | Supabase, PlanetScale          | Database + auth     |
| **Auth**        | Clerk, Auth0                   | Autentisering       |
| **Betaling**    | Stripe                         | Betalingsløsning    |

### Videre lesning

- "The Mom Test" av Rob Fitzpatrick — Brukerintervjuer
- "Value Proposition Design" av Osterwalder — Verdiforslag
- "The Lean Startup" av Eric Ries — MVP og validering

### Kilder for denne guiden

- Veracode GenAI Code Security Report 2025
- Gartner AI Project Statistics
- McKinsey: AI-enabled Software Development
- Lawfare: Security Risks of AI-Generated Code
- Databricks: Dangers of Vibe Coding
- Kaspersky: Vibe Coding Risks 2025

------

## 📚 Relaterte filer

### Fase 1-dokumenter:
- **[FASE-1-AI.md](Fase/FASE-1-AI.md)** - AI-instruksjoner for Fase 1
- **[READ-FASE-1-GUIDE.md](Fase/READ-FASE-1-GUIDE.md)** - Prosjektleder-guide for Fase 1

### Fase-navigering:
- **Neste fase:** [Fase 2: Planlegg](../Fase%202%20-%20Planlegg/FASE-2-KOMPLETT.md)

### Relevante agenter:
- **[OPPSTART-agent](../Agenter/agenter/prosess/1-OPPSTART-agent.md)** - Hovedansvarlig for Fase 1: Idé og visjon
- **[AUTO-CLASSIFIER](../Agenter/agenter/system/agent-AUTO-CLASSIFIER.md)** - Klassifiserer prosjektstørrelse (progressiv avsløring)

### Systemdokumenter:
- **[READ-KIT-CC-BRUKERHÅNDBOK.md](../../READ-KIT-CC-BRUKERHÅNDBOK.md)** - Komplett guide til Kit CC
- **[READ-KIT-CC-ORCHESTRATOR-GUIDE.md](../../READ-KIT-CC-ORCHESTRATOR-GUIDE.md)** - Hvordan ORCHESTRATOR forstår deg
- **[KLASSIFISERING-METADATA-SYSTEM.md](../Agenter/klassifisering/KLASSIFISERING-METADATA-SYSTEM.md)** - Klassifiseringssystem forklart

------

*Denne guiden er laget for ikke-tekniske vibekodere som tar rollen som prosjektleder. Den er ment å leses av både mennesker og AI.*

*Sist oppdatert: Januar 2025*