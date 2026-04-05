# Fase 2: Planlegg — Funksjoner, krav og sikkerhet (Prosjektleder-guide)

> **Mål:** Oversette visjonen til konkrete, byggbare krav som AI kan implementere presist.

---

## Innholdsfortegnelse

1. [Hvorfor er denne fasen kritisk?](#1-hvorfor-er-denne-fasen-kritisk)
2. [Spec-Driven Development (SDD)](#2-spec-driven-development-sdd)
3. [Prosjektklassifisering](#3-prosjektklassifisering)
4. [Brukerhistorier med akseptkriterier](#4-brukerhistorier-med-akseptkriterier)
5. [Sikkerhetskrav](#5-sikkerhetskrav)
6. [Funksjonsliste med prioritering](#6-funksjonsliste-med-prioritering)
7. [Modulregister — Hierarkisk funksjonsstruktur](#7-modulregister--hierarkisk-funksjonsstruktur)
8. [MVP-definisjon](#8-mvp-definisjon)
9. [Brukerflyt](#9-brukerflyt)
10. [Edge cases og feilhåndtering](#10-edge-cases-og-feilhåndtering)
11. [Ikke-funksjonelle krav](#11-ikke-funksjonelle-krav)
12. [Datamodell](#12-datamodell)
13. [Wireframes](#13-wireframes)
14. [Personvern (GDPR)](#14-personvern-gdpr)
15. [Plattformspesifikke krav](#15-plattformspesifikke-krav)
16. [Internasjonalisering](#16-internasjonalisering)
17. [Kvalitetssikring](#17-kvalitetssikring)
18. [Leveranser og sjekklister](#18-leveranser-og-sjekklister)
19. [Ordliste](#19-ordliste)

---

## 1. Hvorfor er denne fasen kritisk?

Kravspesifikasjon er spesielt viktig når du bruker AI til å skrive kode (VIBE-koding), sammenlignet med tradisjonell utvikling.

**AI-assistenter fungerer annerledes enn menneskelige utviklere:**
- De tar instruksjoner bokstavelig
- De gjetter når noe er uklart (og gjettingene kan være feil)
- De husker ikke kontekst mellom sesjoner
- De kan ikke "lese mellom linjene"

**Statistikk som viser problemet:**
- 45% av AI-generert kode feiler på sikkerhetstester (Veracode, 2025)
- Utilstrekkelige krav er årsaken til nesten 50% av alle programvarefeil
- GitHub-studie av 2500+ agent-filer viste at de fleste feiler fordi de er "for vage"

**Hva vi oppnår med god kravspesifikasjon:**
- **Presisjon:** AI genererer kode som faktisk gjør det du ønsker
- **Konsistens:** Samme kvalitet og stil gjennom hele prosjektet
- **Færre feil:** Reduserer behovet for omskriving og debugging
- **Tidsbesparelse:** Mindre tid på å korrigere misforståelser
- **Sikkerhet:** Unngår de vanligste sikkerhetsrisikoene

> 💡 **Tips:** Tenk på AI som en ekstremt kompetent, men bokstavelig assistent. Hvis du ber noen "lage en fin knapp", kan et menneske tolke hva "fin" betyr. AI trenger å vite: hvilken farge, størrelse, plassering, hva som skjer når man klikker, osv.

---

## 2. Spec-Driven Development (SDD)

Spec-Driven Development er en metodikk der du skriver detaljerte spesifikasjoner *før* du ber AI om å generere kode. Spesifikasjonen blir "kilden til sannhet" for hele prosjektet.

**Problemet med "trial and error":**
1. Skriv en vag prompt → 2. Få kode → 3. Se at det ikke fungerer → 4. Prøv igjen

Dette fører til:
- Inkonsistent kode (AI løser samme problem forskjellig hver gang)
- Sikkerhetshull (AI glemmer sikkerhet hvis du ikke spør)
- Frustrasjon og tapt tid
- Teknisk gjeld som hoper seg opp

**SDD-arbeidsflyten:**

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  SPECIFY    │ →   │    PLAN     │ →   │    TASKS    │ →   │   EXECUTE   │
│             │     │             │     │             │     │             │
│ Skriv krav  │     │ AI lager    │     │ Del opp i   │     │ AI koder    │
│ og regler   │     │ teknisk     │     │ små         │     │ én oppgave  │
│             │     │ plan        │     │ oppgaver    │     │ om gangen   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
       ↑                                                           │
       └───────────────── FEEDBACK LOOP ───────────────────────────┘
```

| Fase | Hvem gjør det | Hva skjer |
|------|---------------|-----------|
| **Specify** | Du (prosjektleder) | Skriver krav, regler, begrensninger |
| **Plan** | AI (med din godkjenning) | Foreslår teknisk løsning og arkitektur |
| **Tasks** | AI (med din godkjenning) | Bryter ned i små, konkrete oppgaver |
| **Execute** | AI | Skriver kode for én oppgave om gangen |

**Grunnprinsipper:**
1. **Spesifikasjon først, kode etterpå** - Aldri start å kode før spesifikasjonen er klar
2. **Spesifikasjonen er sannheten** - Ved uenighet, stol på spesifikasjonen
3. **Eksplisitt over implisitt** - Skriv ut alt, anta ingenting
4. **Versjonskontroll** - Behandle spesifikasjoner som kode

> 💡 **Tips:** SDD er som å lage en detaljert oppskrift før du begynner å lage mat. Du bestemmer alle ingredienser og steg på forhånd, slik at hvem som helst kan følge oppskriften og få samme resultat.

---

## 3. Prosjektklassifisering

Ikke alle prosjekter trenger samme nivå av grundighet. Velg din prosjekttype:

| Type | Beskrivelse | Eksempler |
|------|-------------|-----------|
| **A: Lite internt verktøy** | Kun for deg/teamet, ingen sensitiv data | Skript, kalkulatorer, interne dashboards |
| **B: Internt system med database** | Bedriftsdata, flere brukere internt | CRM, prosjektstyringsverktøy, rapportsystemer |
| **C: Kundevendt applikasjon** | Eksterne brukere, persondata | Nettbutikk, booking-system, medlemsportal |
| **D: Stor skala / kritisk** | Høy risiko, regulert bransje | Bank, helse, offentlig sektor |

**Hva hver type krever:**

| Element | Type A | Type B | Type C | Type D |
|---------|--------|--------|--------|--------|
| Brukerhistorier | Enkel liste | Strukturert | Komplett | Komplett + review |
| Sikkerhetskrav | Basis | L1 | L2 | L2/L3 |
| MVP-definisjon | Uformell | Dokumentert | Dokumentert | Formelt godkjent |
| GDPR | Ikke nødvendig | Vurder | Påkrevd | Påkrevd + DPO |
| Testing | Manuell | Delvis auto | Automatisert | Automatisert + penetrasjonstest |

**Hvordan velge riktig - svar på disse spørsmålene:**
1. Hvem skal bruke systemet? (Kun meg / Teamet / Kunder / Alle)
2. Hvilke data håndteres? (Ingen sensitiv / Bedriftsdata / Persondata / Helse/finans)
3. Hva skjer hvis det feiler? (Irriterende / Problematisk / Alvorlig / Katastrofalt)
4. Er det regulatoriske krav? (Nei / GDPR / Bransje-spesifikke / Flere)

> 💡 **Tips:** Dette er som å velge forsikringsnivå. En sykkel trenger ikke samme forsikring som en bil. På samme måte trenger en enkel kalkulator ikke samme sikkerhetsnivå som en nettbank.

---

## 4. Brukerhistorier med akseptkriterier

En brukerhistorie beskriver én funksjon fra brukerens perspektiv. Den forteller *hvem* som trenger noe, *hva* de trenger, og *hvorfor* de trenger det. Akseptkriterier definerer eksakt når funksjonen er "ferdig".

**Standardformat:**

```
KRAV-ID: US-XXX
Prioritet: Must Have / Should Have / Could Have / Won't Have

Som [brukerrolle]
vil jeg [handling/funksjon]
slik at [mål/verdi]

Akseptkriterier:
- Gitt [forutsetning], når [handling], så [resultat]

Notater:
- [Tekniske notater, avklaringer, begrensninger]
```

**Eksempel - God brukerhistorie:**

```
KRAV-ID: US-001
Prioritet: Must Have

Som innlogget bruker
vil jeg nullstille passordet mitt via e-post
slik at jeg kan få tilgang til kontoen min hvis jeg glemmer passordet

Akseptkriterier:
- Gitt at jeg er på innloggingssiden, når jeg klikker "Glemt passord",
  så ser jeg et felt for e-postadresse
- Gitt at jeg skriver inn en registrert e-post, når jeg klikker "Send",
  så mottar jeg e-post innen 2 minutter
- Gitt at jeg klikker lenken i e-posten, når det har gått mindre enn 24 timer,
  så kan jeg sette nytt passord
- Gitt at jeg klikker lenken i e-posten, når det har gått mer enn 24 timer,
  så ser jeg melding om at lenken er utløpt

Notater:
- Passordkrav: min 12 tegn, minst én stor bokstav, ett tall, ett spesialtegn
```

**INVEST-sjekklisten:**

| Bokstav | Betydning | Spørsmål å stille |
|---------|-----------|-------------------|
| **I** | Independent | Kan denne bygges uten å vente på andre funksjoner? |
| **N** | Negotiable | Er detaljene fleksible? |
| **V** | Valuable | Gir dette reell verdi for brukeren? |
| **E** | Estimable | Kan vi anslå hvor lang tid dette tar? |
| **S** | Small | Er dette lite nok til å fullføre i én arbeidsøkt? |
| **T** | Testable | Kan vi objektivt si om dette fungerer eller ikke? |

**Definer brukerroller først:**

| Rolle | Beskrivelse | Typiske behov |
|-------|-------------|---------------|
| Gjest | Ikke-innlogget besøkende | Se info, registrere seg |
| Bruker | Innlogget standardbruker | Bruke hovedfunksjonene |
| Premium-bruker | Betalende bruker | Ekstra funksjoner |
| Admin | Administrator | Administrere brukere, se statistikk |

> 💡 **Tips:** En brukerhistorie er som en "mini-bestilling" fra en kunde. Tenk deg at hver funksjon er en rett på en meny. Brukerhistorien beskriver hva retten er, hvem den er for, og nøyaktig hva som må være på tallerkenen for at kunden skal være fornøyd.

---

## 5. Sikkerhetskrav

**Hvorfor dette er kritisk for VIBE-koding:**
- 45% av AI-generert kode feiler på sikkerhetstester
- 40% av GitHub Copilot-genererte programmer har sårbarheter
- De vanligste feilene: manglende tilgangskontroll, hardkodede passord, usanitert input

**AI "glemmer" sikkerhet hvis du ikke spør eksplisitt.**

### Velg sikkerhetsnivå

| Nivå | Beskrivelse | Når brukes det |
|------|-------------|----------------|
| **L1** | Standard sikkerhet | De fleste apper, lav-moderat risiko |
| **L2** | Sensitiv data | Personopplysninger, helse, finans |
| **L3** | Kritisk sikkerhet | Bank, offentlig sektor, medisinsk |

### Hovedkategorier

**A. Autentisering (Hvem er du?)**
- Passord minimum 12 tegn med kompleksitet
- Passord lagres kryptert (aldri klartekst)
- Maks 5 innloggingsforsøk før lockout
- Sikre sesjoner med timeout

**B. Autorisering (Hva kan du gjøre?)**
- Rollebasert tilgangskontroll
- Brukere ser kun egne data
- API-endepunkter krever autentisering

**C. Input-validering**
- Aldri stol på data fra brukerens nettleser
- Beskytt mot XSS og SQL-injection
- HTTPS alltid

**D. Logging**
- Logg alle innlogginger
- Aldri logg sensitive data (passord, personnummer)

> 💡 **Tips:** Sikkerhet er som låser på et hus. Du trenger lås på ytterdøren (autentisering), men også på individuelle rom (autorisering). Du trenger alarm (logging) og kanskje overvåkningskamera (overvåking). Jo mer verdifullt innholdet er, jo bedre sikring trenger du.

---

## 6. Funksjonsliste med prioritering

**MoSCoW-metoden:**

| Prioritet | Betydning | Tommelfingerregel |
|-----------|-----------|-------------------|
| **Must have** | Produktet fungerer ikke uten | Maks 60% av totalt scope |
| **Should have** | Viktig, men kan utsettes til v1.1 | Inntil 20% |
| **Could have** | Ønskelig hvis tid tillater | Inntil 20% |
| **Won't have** | Bevisst utelatt fra denne versjonen | Dokumenter for fremtiden |

**Format:**

```markdown
### Must Have (MVP)
| ID | Funksjon | Beskrivelse | Brukerhistorie | Avhenger av |
|----|----------|-------------|----------------|-------------|
| F-001 | Brukerregistrering | Opprett konto med e-post/passord | US-001 | - |
| F-002 | Innlogging | Logg inn med e-post/passord | US-002 | F-001 |

### Should Have
| ID | Funksjon | Beskrivelse | Brukerhistorie | Avhenger av |
|----|----------|-------------|----------------|-------------|
| F-010 | Passord-reset | Nullstill passord via e-post | US-003 | F-001 |
```

**Test prioriteringen din - for hver "Must Have"-funksjon, spør:**
1. "Kan brukeren oppnå hovedmålet uten denne funksjonen?"
2. "Finnes det en manuell workaround?"
3. "Hva er konsekvensen av å utsette til v1.1?"

> 💡 **Tips:** Prioritering er som å pakke koffert til en tur. Must Have = undertøy og tannbørste. Should Have = ekstra sko. Could Have = ekstra jakke i tilfelle. Won't Have = surfebrettet (denne gangen).

---

## 7. Modulregister — Hierarkisk funksjonsstruktur

Funksjonslisten (seksjon 6) gir deg en flat oversikt over alle funksjoner. Men de fleste apper har en dypere struktur: moduler som inneholder mange underfunksjoner. Modulregisteret fanger denne hierarkiske dybden.

**Hvorfor trenger vi dette i tillegg til funksjonslisten?**

Funksjonslisten sier: "F-005: Feed-innlegg". Men hva *inneholder* et feed-innlegg? Bilder, tekst, tittel, likes, kommentarer, deling, kommentarer på kommentarer, likes av kommentarer, linkforhåndsvisning som Facebook har — dette er én modul med 10+ underfunksjoner. Funksjonslisten kan ikke fange denne dybden.

### Hva er en modul? (Plain language forklaring)

En modul er en samling relaterte funksjoner som utgjør en helhet. Tenk på det som et "rom" i appen din — hvert rom har møbler, belysning, og dekor som hører sammen.

**Analogi - Tenk på appen din som et hus:**
- Moduler er rommene — kjøkken, stue, soverom, bad
- Hver modul har sitt eget formål og sine egne funksjoner
- Kjøkkenet (modulen) inneholder kokeplaten, kjøleskapet, oppvaskmaskinen osv. (underfunksjonene)
- Du kan bygge kjøkkenet ferdig og uavhengig av soverommet
- Men huset er ikke komplett uten alle rommene

**Hvordan moduler relaterer til brukerhistorier og funksjoner:**

En modul *grupperer relaterte brukerhistorier og funksjoner* som henger logisk sammen:
- **Brukerhistorier** beskriver individuelle behov (f.eks. "Som bruker vil jeg kunne like et innlegg")
- **Funksjoner** er små byggeklosser (f.eks. "Like-knapp", "Teller for likes")
- **Moduler** samler alle disse rundt ett tema (f.eks. "Innlegg med interaksjon")

En modul sier: "Her er alt som trengs for at denne delen av appen fungerer som en helhet."

**Typisk antall moduler:**

| Appkompleksitet | Antall moduler | Eksempel |
|-----------------|---|----------|
| **Enkel app** | 3-5 moduler | Todo-app: Oppgaver, Brukerprofil, Innstillinger |
| **Medium app** | 8-15 moduler | Sosial app: Feed, Brukerprofil, Meldinger, Varsler, Søk, etc. |
| **Kompleks app** | 20-30+ moduler | E-handel: Produkt, Handlekurv, Betaling, Leveringssporing, Admin, Analytics, etc. |

**Hvordan bestemme modulegrenser:**

Spør deg selv: "Kunne denne delen av appen leves uten resten?"

| Spørsmål | Betyr hva |
|----------|-----------|
| "Kunne Feed-modulen fungere uten Brukerprofil?" | **Ja** → Begge er separate moduler |
| "Kunne Like-funksjonen fungere uten Feed?" | **Nei** → Like-funksjonen er del av Feed-modulen, ikke egen modul |
| "Kunne Innlogging fungere uten Brukerdata?" | **Nei** → Innlogging og Brukerdata er en modulen (eller delt infrastruktur) |

**Eksempler:**

| Modul | Underfunksjoner |
|-------|-----------------|
| Feed-innlegg | Tekst, bilder, tittel, likes, kommentarer, deling, nestet kommentarer, likes på kommentarer, linkforhåndsvisning, rapportering |
| Brukerprofil | Profilbilde, bio, innstillinger, aktivitetslogg, fargepalett, venner/følgere, blokkering |
| Meldingssystem | Direktemeldinger, gruppechat, filvedlegg, lesebekreftelser, varsler, søk |

### Slik lager du et modulregister

**Steg 1: List alle moduler**

Beskriv appen din modul for modul. For hver modul, fortell AI alt du ser for deg — i dine egne ord. Vær så detaljert du vil.

Eksempel:
> "Feed-innlegg: Innleggene skal inneholde bilder, tekst, tittel, likes, kommentarer, deling. Du skal kunne kommentere på kommentarer og like kommentarer. Når du limer inn en link skal det vises en visuell forhåndsvisning slik Facebook gjør det."

**Steg 2: AI strukturerer og lagrer**

AI tar beskrivelsen din og lager en detaljert modulspesifikasjon (`docs/moduler/M-001-feed-innlegg.md`) som inneholder:
- Hele visjonen din (ordrett)
- Alle underfunksjoner med akseptansekriterier
- Avhengigheter til andre moduler
- Status-sporing for Fase 5

**Steg 3: AI oppdaterer modulregisteret**

AI legger modulen til i master-registeret (`docs/FASE-2/MODULREGISTER.md`) som gir deg oversikt over alle moduler, status, og avhengigheter.

### Din rolle

- Beskriv moduler i dine egne ord — så detaljert som mulig
- Det er normalt å ha 20-30 moduler med mange underfunksjoner
- Du trenger IKKE beskrive teknisk implementasjon — bare hva modulen skal gjøre og se ut
- AI bekrefter tilbake med filsti hver gang noe lagres

### Viktig: Beskrivelsene dine bevares

Når du bruker en hel time på å beskrive en modul i detalj, lagrer AI dette UMIDDELBART i en egen fil. Selv om chatten lukkes, har neste chat-sesjon tilgang til hele beskrivelsen din. Ingenting går tapt.

**Leveranser:**
- `docs/FASE-2/MODULREGISTER.md` — Master-registeret med alle moduler
- `docs/moduler/M-XXX-[navn].md` — Detaljert spesifikasjon per modul

> 💡 **Tips:** Modulregisteret er som en detaljert romplan for huset ditt. Funksjonslisten sier "kjøkken, stue, soverom". Modulregisteret beskriver alt som skal være i hvert rom.

---

## 8. MVP-definisjon

MVP (Minimum Viable Product) er den enkleste versjonen av produktet som gir verdi til brukeren. Det er ikke et "dårlig produkt" - det er et fokusert produkt med færre funksjoner, men der hver funksjon fungerer perfekt.

**Vanlige misforståelser:**
- ❌ "MVP betyr halvferdig" - Feil! MVP betyr færre funksjoner, ikke dårligere kvalitet
- ❌ "Vi trenger alt før lansering" - Feil! Du trenger nok til å teste hypotesen
- ❌ "Vi kan legge til sikkerhet senere" - Farlig feil! Sikkerhet må være der fra dag 1

**MVP-definisjonsmal:**

```markdown
## MVP-definisjon

### Hovedmål
[Én setning som beskriver hva brukeren skal kunne oppnå]

### MVP-funksjoner (kun Must Have)
1. F-001: Brukerregistrering
2. F-002: Innlogging
3. ...

### Bevisst IKKE i MVP (med begrunnelse)
| Funksjon | Hvorfor ikke i MVP | Workaround |
|----------|-------------------|------------|
| Redigere timer | Kan slette og legge inn på nytt | Manuell |

### MVP-suksesskriterier
- [ ] 10 testbrukere kan fullføre hovedoppgaven uten hjelp
- [ ] Gjennomsnittlig tid for hovedoppgaven < 2 minutter
- [ ] Ingen kritiske feil i løpet av 2 ukers testing
```

**"Mom Test":** Kan du forklare MVP-en din til noen uten teknisk bakgrunn på 30 sekunder?

> 💡 **Tips:** MVP er som å åpne en ny restaurant. Du starter ikke med 50 retter på menyen. Du starter med 5 retter som du kan perfekt, får tilbakemeldinger, og utvider menyen basert på hva gjestene faktisk vil ha.

---

## 9. Brukerflyt

Brukerflyt er en steg-for-steg beskrivelse av hvordan en bruker navigerer gjennom applikasjonen for å oppnå et mål.

**Format - Tekstbasert flyt:**

```
FLYT: Registrering og første bruk
Mål: Ny bruker oppretter konto og kommer til dashboard

1. Bruker åpner app → Ser landingsside
2. Klikker "Registrer" → Ser registreringsskjema
3. Fyller inn e-post, passord, bekreft passord
   → FEIL: E-post finnes allerede → Vis "E-post er registrert. Logg inn?"
   → FEIL: Passord for svakt → Vis krav som ikke er oppfylt
4. Klikker "Opprett konto" → Ser "Sjekk e-posten din"
5. Åpner e-post → Klikker bekreftelseslenke
6. Ser "Konto bekreftet" → Automatisk innlogget
7. Ser dashboard med velkomstmelding
```

**Sjekkliste for "Unhappy paths":**

| Scenario | Spørsmål å stille |
|----------|-------------------|
| Ugyldig input | Hva hvis brukeren skriver feil? |
| Nettverksfeil | Hva hvis internett er borte? |
| Timeout | Hva hvis serveren er treg? |
| Avbrytelse | Hva hvis brukeren lukker vinduet midt i? |
| Sesjonsutløp | Hva hvis brukeren er inaktiv for lenge? |

**Hovedflyter du alltid trenger:**
1. Registrering (ny bruker)
2. Innlogging (eksisterende bruker)
3. Passord-reset
4. Hovedfunksjonen (det produktet gjør)
5. Utlogging

> 💡 **Tips:** En brukerflyt er som et veikart. Den viser hovedveien fra A til B, men også alle avkjørsler og hva som skjer hvis du kjører feil.

---

## 10. Edge cases og feilhåndtering

Edge cases er spesielle situasjoner som ikke er hovedscenarioet, men som kan oppstå.

**AI er notorisk dårlig på edge cases:**
- Den fokuserer på "happy path"
- Den glemmer feilhåndtering med mindre du spør
- Feilmeldinger blir generiske eller tekniske

**Kategorier:**

| Kategori | Eksempler | Typisk håndtering |
|----------|-----------|-------------------|
| **Ugyldig input** | Tomt felt, feil format, for langt | Spesifikk feilmelding |
| **Grenser** | Maks filstørrelse, maks antall, tom liste | Tydelig kommunikasjon |
| **Duplikater** | E-post finnes, brukernavn tatt | Foreslå alternativer |
| **Tilstand** | Ikke innlogget, mangler tilgang | Redirect med forklaring |
| **Teknisk** | Nettverksfeil, timeout, server nede | Brukervennlig feilside |

**Prinsipper for gode feilmeldinger:**

| ✅ Gjør | ❌ Ikke gjør |
|---------|-------------|
| Vær spesifikk om hva som er feil | Vis tekniske detaljer |
| Forklar hva brukeren kan gjøre | Vis stack traces |
| Bruk vanlig språk | Bruk teknisk sjargong |
| Gi mulighet til å prøve igjen | La brukeren sitte fast |

> 💡 **Tips:** Edge cases er som "hva-hvis"-scenarier. Et godt system har svar på alle disse spørsmålene - og gir brukeren tydelig beskjed om hva som skjedde og hva de kan gjøre.

---

## 11. Ikke-funksjonelle krav

Krav som handler om *hvordan* systemet gjør det, ikke *hva* det gjør: hastighet, oppetid, tilgjengelighet.

```markdown
### Ytelse
| Krav | Mål | Måling |
|------|-----|--------|
| Sideinnlasting | < 3 sek | Lighthouse |
| API-respons (P95) | < 500 ms | Server-metrikker |

### Oppetid
| Krav | Mål |
|------|-----|
| Tilgjengelighet | 99.5% |
| Maks nedetid/måned | 3.6 timer |

### Tilgjengelighet (a11y)
| Krav | Standard |
|------|----------|
| WCAG-nivå | AA |
| Tastaturnavigasjon | Full støtte |
| Skjermleser | Kompatibel |
```

> 💡 **Tips:** Ikke-funksjonelle krav er som krav til en bil utover "den kjører" - hvor rask, hvor trygg, hvor komfortabel.

---

## 12. Datamodell

En oversikt over alle datatyper i systemet, hvilke felter de har, og hvordan de henger sammen.

```markdown
### User
| Felt | Type | Constraints | Beskrivelse |
|------|------|-------------|-------------|
| id | UUID | PK | Unik ID |
| email | String | Unique | E-postadresse |
| password_hash | String | Not Null | Hashet passord |
| role | Enum | Default: USER | USER, ADMIN |
| created_at | DateTime | Default: now() | Opprettet |

### Relasjoner
- User 1:N Task (én bruker har mange oppgaver)
```

> 💡 **Tips:** Datamodellen er som plantegningen for et hus - den viser alle rom og hvordan de henger sammen.

---

## 13. Wireframes

Enkle skisser som viser layout og elementer på hver skjerm - ikke ferdig design, men struktur.

**ASCII-wireframe eksempel:**
```
┌─────────────────────────────────────┐
│  [Logo]              [Logg inn]     │
├─────────────────────────────────────┤
│  Mine oppgaver          [+ Ny]      │
│  ─────────────────────────────────  │
│  [ ] Kjøpe melk              I dag  │
│  [x] Sende e-post            I går  │
│  [ ] Møte med team        Om 2 dager│
└─────────────────────────────────────┘
```

**Verktøy:** Papir/blyant, Excalidraw, Figma

> 💡 **Tips:** Wireframes er som arkitektskisse før du bygger - viser romfordeling, ikke tapetfarger.

---

## 14. Personvern (GDPR)

**GDPR gjelder hvis du:**
- Samler personopplysninger fra EU/EØS-borgere
- Inkluderer: navn, e-post, IP-adresse, cookies

**Hovedkrav:**

| Krav | Funksjon |
|------|----------|
| Samtykke | Checkbox ved registrering (ikke pre-checked) |
| Innsyn | "Se mine data"-side |
| Sletting | "Slett konto"-funksjon |
| Portabilitet | Eksport til JSON |
| Informasjon | Personvernerklæring |

> 💡 **Tips:** GDPR handler om å gi brukere kontroll over egne data - rett til å se, endre og slette.

---

## 15. Plattformspesifikke krav

**Mobilapp:**
- Sikker lagring (Keychain/Keystore)
- Biometrisk autentisering
- Push-notifikasjoner
- Offline-støtte

**PWA:**
- Web App Manifest
- Service Worker
- Installerbar

> 💡 **Tips:** Som å tilpasse en butikk til forskjellige lokasjoner - samme konsept, men tilpasset lokale forhold.

---

## 16. Internasjonalisering

Støtte for flere språk og lokale formater (dato, tall, valuta).

Hvis du trenger i18n:
- Hold alle tekster i språkfiler (ikke hardkodet)
- Bruk biblioteker som next-intl eller react-i18next
- Vurder formatering: dato, tall, valuta

Hvis du IKKE trenger i18n nå:
- Hold likevel tekster atskilt fra kode
- Gjør det enkelt å legge til senere

> 💡 **Tips:** Som å bygge et hus med strømuttak i alle rom - selv om du ikke trenger dem alle nå, er det mye enklere enn å legge dem inn senere.

---

## 17. Kvalitetssikring

**Spec-kvalitetssjekkliste:**

| Kategori | Sjekk | ✓ |
|----------|-------|---|
| **Komplett** | Alle MVP-funksjoner har brukerhistorier | [ ] |
| **Komplett** | Alle brukerhistorier har akseptkriterier | [ ] |
| **Komplett** | Edge cases er dokumentert | [ ] |
| **Konsistent** | Samme termer brukes overalt | [ ] |
| **Konsistent** | Ingen motstridende krav | [ ] |
| **AI-klar** | Teknologistack er definert | [ ] |
| **Testbar** | Akseptkriterier kan verifiseres | [ ] |
| **Sikker** | Sikkerhetskrav er definert | [ ] |

**Håndtering av spec-drift:**
- Lagre specs i Git sammen med kode
- Spec FØRST, deretter kode
- Aldri endre kode uten å oppdatere spec

> 💡 **Tips:** Spec-drift er som når byggetegninger og ferdig bygg ikke matcher. Du må holde tegningene oppdatert.

---

## 18. Leveranser og sjekklister

### Leveranser fra Fase 2

**1. Kravdokument (PRD)**
- [ ] Alle brukerhistorier med akseptkriterier
- [ ] Sikkerhetskrav med nivå (L1/L2/L3)
- [ ] Prioritert funksjonsliste (MoSCoW)
- [ ] MVP-definisjon med suksesskriterier
- [ ] Brukerflyter (happy + unhappy path)
- [ ] Edge cases og feilhåndtering
- [ ] Ikke-funksjonelle krav
- [ ] Datamodell

**2. AI-kontekstfil**
- [ ] Teknologistack
- [ ] Kodestandarder
- [ ] Navnekonvensjoner
- [ ] Forbudte mønstre

**3. Wireframes**
- [ ] Hovedskjermer skissert
- [ ] Navigasjonsflyt dokumentert

**4. Oppgavenedbrytning**
- [ ] Første sprint planlagt
- [ ] Deloppgaver definert

**5. Modulregister**
- [ ] Alle moduler identifisert og navngitt
- [ ] Per-modul spesifikasjoner opprettet (`docs/moduler/M-*.md`)
- [ ] Master-register opprettet (`docs/FASE-2/MODULREGISTER.md`)
- [ ] Avhengigheter mellom moduler kartlagt
- [ ] MVP-moduler markert

### Komplett sjekkliste før Fase 3

- [ ] Alle MVP-funksjoner har brukerhistorier med krav-ID
- [ ] Brukerhistorier oppfyller INVEST-kriteriene
- [ ] Akseptkriterier er i Given/When/Then-format
- [ ] Sikkerhetsnivå er valgt (L1/L2/L3)
- [ ] Funksjonslisten er prioritert med MoSCoW
- [ ] Must Have utgjør maks 60%
- [ ] MVP er tydelig avgrenset
- [ ] Brukerflyter dekker happy + unhappy path
- [ ] Edge cases er identifisert
- [ ] AI-kontekstfil er komplett
- [ ] GDPR-krav er vurdert
- [ ] Modulregister er komplett med alle moduler
- [ ] Per-modul spesifikasjoner finnes for alle moduler

---

## 19. Ordliste

| Begrep | Forklaring |
|--------|------------|
| **API** | "Dør" som lar systemer snakke sammen |
| **Akseptkriterier** | Krav som må oppfylles for at noe er "ferdig" |
| **Authentication** | Verifisere hvem du er (innlogging) |
| **Authorization** | Verifisere hva du har lov til |
| **Backend** | "Baksiden" - server og database |
| **Brukerhistorie** | Beskrivelse av funksjon fra brukerens perspektiv |
| **Edge case** | Spesiell situasjon utenom normalen |
| **Frontend** | "Forsiden" - det brukeren ser |
| **GDPR** | EUs personvernlovgivning |
| **Happy path** | Når alt går som planlagt |
| **Unhappy path** | Når noe går galt |
| **Modul** | Samling relaterte funksjoner som utgjør en helhet (f.eks. "Feed-innlegg") |
| **Modulregister** | Master-oversikt over alle moduler med status og avhengigheter |
| **MVP** | Minimum Viable Product - enkleste versjon |
| **PRD** | Product Requirements Document |
| **SDD** | Spec-Driven Development |
| **Wireframe** | Enkel skisse av en side |

---

## Hva om noe går galt?

**Hva om MVP-scopet er for stort?**
Gå tilbake til dine Must Have-funksjoner. Slett alt som er "Should have" eller "Could have". MVP skal være minimal – det betyr færre funksjoner, ikke halvferdig arbeid. Test med et mindre scope først.

**Hva om jeg ikke vet hvilke moduler jeg trenger?**
Det er normalt. Start med brukerhistoriene dine og les dem høyt. Hver gang du tenker "en gruppe relaterte funksjoner", lager du en modul. Be AI om å foreslå modulstruktur basert på brukerhistoriene dine. Du kan alltid splittes eller slå sammen senere.

**Hva om kravene endrer seg konstant?**
Freeze Fase 2 her og nå. Si at dette er v1-kravene. Nye idéer som kommer senere, dokumenter som "v2-backlog". Etter lansering kan du iterere.

---

## Neste steg

Når alle leveranser er på plass og sjekklisten er fullført:

> **Si til AI:** "Fase 2 er ferdig. Kjør fase-gate og gå videre til Fase 3."

AI-en vil da kjøre en kvalitetssjekk (fase-gate) og forberede neste fase for deg.

---

**Slutt på Fase 2 - Prosjektleder-guide**

[← Forrige: Fase 1: Idé og visjon](../Fase%201/01-FASE-1-IDE-OG-VISJON.md) | [Neste: Fase 3: Arkitektur og sikkerhet →](../Fase%203/03-FASE-3-TEKNISK-DESIGN.md)
