# Fase 3: Arkitektur og sikkerhet — Hvordan bygges det trygt?

## Komplett veileder for VIBE-koding prosjektledere

**Versjon:** 2.0
**Sist oppdatert:** Januar 2026
**Målgruppe:** Ikke-tekniske prosjektledere og AI-assistenter

---

## 0. Input fra Fase 2

- Kravspesifikasjon fullført (fra Fase 2: Planlegg)
- Brukerhistorier og akseptkriterier definert
- MVP-definisjon avklart
- Sikkerhetskrav utgitt
- AI-kontekst og regler dokumentert
- Basert på `Kit CC/Agenter/agenter/prosess/2-KRAV-agent.md`

---

## Innholdsfortegnelse

0. [Input fra Fase 2](#0-input-fra-fase-2)

1. [Introduksjon og Oversikt](#1-introduksjon-og-oversikt)
   - 1.1 Hva er Fase 3?
   - 1.2 Hvorfor er denne fasen kritisk?
   - 1.3 Prioriteringssystem
   - 1.4 Hvem leser dette dokumentet?

2. [AI-GENERERT KODE: Sikkerhetsrisiko (KRITISK)](#2-ai-generert-kode-sikkerhetsrisiko-kritisk)
   - 2.1 Problemet med AI-generert kode
   - 2.2 Kjente sårbarheter i vibekoding-verktøy
   - 2.3 Obligatoriske sikkerhetstiltak
   - 2.4 Sjekkliste for AI-kode

3. [Tech Stack-valg](#3-tech-stack-valg)
   - 3.1 Hva er tech stack?
   - 3.2 Kriterier for valg i vibekoding
   - 3.3 Plattformspesifikke anbefalinger
   - 3.4 Beslutningstre
   - 3.5 Dokumentasjon av valg

4. [Arkitektur og Prosjektstruktur](#4-arkitektur-og-prosjektstruktur)
   - 4.1 Systemarkitektur
   - 4.2 Prosjektstruktur per plattform
   - 4.3 C4-modellen
   - 4.4 Arkitekturbeslutningslogg (ADR)

5. [Trusselmodellering](#5-trusselmodellering)
   - 5.1 Forenklet tilnærming (OWASP 4 spørsmål)
   - 5.2 STRIDE-metoden
   - 5.3 DREAD-risikorangering
   - 5.4 LINDDUN for personvern (GDPR)
   - 5.5 OWASP Low-Code/No-Code Top 10
   - 5.6 Data Flow Diagram (DFD)
   - 5.7 Kontinuerlig trusselmodellering
   - 5.8 Trusselbibliotek per app-type

6. [Sikkerhet og Datahåndtering](#6-sikkerhet-og-datahåndtering)
   - 6.1 Autentisering
   - 6.2 Autorisering (RBAC)
   - 6.3 Dataklassifisering og kryptering
   - 6.4 Input-validering
   - 6.5 API-sikkerhet
   - 6.6 GDPR og personvern
   - 6.7 Secrets Management
   - 6.8 Tredjepartstjenester

7. [DevSecOps og CI/CD](#7-devsecops-og-cicd)
   - 7.1 CI/CD-pipeline
   - 7.2 Sikkerhetsskanning
   - 7.3 Supply Chain Security
   - 7.4 SBOM
   - 7.5 Miljøer og deployment
   - 7.6 Overvåking og logging

8. [Governance og Ansvar](#8-governance-og-ansvar)
   - 8.1 Roller og ansvar
   - 8.2 Godkjenningsprosesser
   - 8.3 Eskaleringsrutiner
   - 8.4 Dokumentasjonsvedlikehold

9. [Ikke-funksjonelle Krav](#9-ikke-funksjonelle-krav)
   - 9.1 Ytelse
   - 9.2 Skalerbarhet
   - 9.3 Tilgjengelighet (Accessibility)
   - 9.4 Pålitelighet
   - 9.5 Vedlikeholdbarhet

10. [Leveranser og Maler](#10-leveranser-og-maler)
    - 10.1 Oversikt over leveranser
    - 10.2 Mal: Teknisk Design Dokument (TDD)
    - 10.3 Mal: Trusselmodell
    - 10.4 Mal: SPEC.md
    - 10.5 Mal: ADR
    - 10.6 Komplett sjekkliste

---

# 0. Input fra Fase 2

Før du starter Fase 3, må du ha følgende leveranser fra Fase 2:

## Obligatorisk
- **Kravdokument (PRD)** med:
  - Alle brukerhistorier med akseptkriterier
  - Sikkerhetskrav klassifisert (L1/L2/L3)
  - Prioritert funksjonsliste (MoSCoW)
  - MVP-definisjon med suksesskriterier
  - Brukerflyter (happy + unhappy path)
  - Edge cases og feilhåndtering
  - Ikke-funksjonelle krav (ytelse, skalerbarhet, osv.)
  - Datamodell

- **AI-kontekstfil** med:
  - Teknologistack låst
  - Kodestandarder
  - Navnekonvensjoner
  - Forbudte mønstre

- **Maskinlesbare spesifikasjoner**:
  - API-spesifikasjoner (OpenAPI/Swagger)
  - Komponentspesifikasjoner (hvis relevant)

## Anbefalt
- **Wireframes** for hovedskjermer
- **Oppgavenedbrytning** for første sprint
- **GDPR-sjekkliste** gjennomgått

> **Hva gjøre hvis noe mangler?** Gå tilbake til Fase 2 og fullfør. Fase 3 arkitektur er basert på presise krav fra Fase 2. Ufullstendige krav fører til feil arkitekturvalg.

---

### Automatisk tilpasning og verktøy

- **Intensitetstilpasning:** Prioriteringer og krav tilpasses automatisk basert på prosjektets klassifisering (Enkelt hobbyprosjekt → Stort kritisk system). Hva som er obligatorisk, anbefalt eller valgfritt avhenger av prosjekttypen.
- **Kit CC Monitor:** AI-assistenten bruker Kit CC Monitor (en lokal webserver) for å overvåke nettleserfeil, kjøre debug-probes og vise prosjektstatus i sanntid.
- **Automatisk logging:** All fremdrift logges automatisk til PROGRESS-LOG.md. Du trenger ikke gjøre noe — AI-en håndterer dette.

---

# 1. Introduksjon og Oversikt

## 1.1 Hva er Fase 3?

### Hva dette punktet består av
Fase 3 er overgangen fra "hva skal vi bygge" (Fase 1-2) til "hvordan skal vi bygge det". Her tar du de konkrete tekniske valgene som setter rammene for hele utviklingen.

### Hva problemet er
Feil valg i denne fasen kan bety kostbar ombygging senere. Det er 10-100x dyrere å fikse sikkerhetsproblemer etter lansering enn i designfasen. Mange vibekoding-prosjekter hopper over denne fasen og går rett på koding, noe som fører til kaotisk kode, sikkerhetshull og teknisk gjeld.

### Hva vi oppnår ved å løse det
- Strukturert og vedlikeholdbar kode
- Sikkerhet bygget inn fra starten
- Klare rammer for AI-assistenten
- Redusert risiko for kostbare feil
- Lettere onboarding av nye teammedlemmer

### Hvordan vi går frem
Fase 3 består av følgende hovedaktiviteter:

| # | Aktivitet | Beskrivelse |
|---|-----------|-------------|
| 1 | Forstå AI-kode-risiko | Lær hvorfor AI-generert kode krever ekstra oppmerksomhet |
| 2 | Velge teknologier | Bestem tech stack basert på prosjektets behov |
| 3 | Designe arkitektur | Tegn opp hvordan systemet henger sammen |
| 4 | Gjennomføre trusselmodellering | Identifiser og planlegg for sikkerhetsrisikoer |
| 5 | Planlegge sikkerhet | Definer autentisering, autorisering, kryptering |
| 6 | Sette opp DevSecOps | Automatiser testing og sikkerhetsskanning |
| 7 | Dokumentere alt | Lag dokumenter som guider utviklingen |

---

## 1.2 Hvorfor er denne fasen kritisk?

### Hva dette punktet består av
En forklaring på hvorfor Fase 3 ikke kan hoppes over eller gjøres halvhjertet.

### Hva problemet er
I tradisjonell utvikling har erfarne utviklere intuisjon for gode arkitekturvalg. I vibekoding mangler ofte denne erfaringen, og AI-assistenter kan foreslå løsninger som fungerer teknisk, men som er usikre eller vanskelige å vedlikeholde.

### Hva vi oppnår ved å løse det

| Investering i Fase 3 | Resultat |
|---------------------|----------|
| 2-4 timer planlegging | Sparer 20-40 timer debugging |
| Trusselmodellering | Unngår sikkerhetshendelser |
| Dokumentasjon | AI-assistenten gir bedre hjelp |
| Arkitekturdiagram | Lettere å kommunisere med teamet |

### Hvordan vi går frem
Les gjennom hele dette dokumentet før du starter. Du trenger ikke forstå alt teknisk - fokuser på å forstå **hvorfor** hvert punkt er viktig, så kan AI-assistenten hjelpe deg med **hvordan**.

---

## 1.3 Prioriteringssystem

### Hva dette punktet består av
Et system for å vite hva som er kritisk vs. valgfritt basert på prosjekttype.

### Hva problemet er
Ikke alle prosjekter trenger samme sikkerhetsnivå. Et internt verktøy for deg selv trenger ikke samme rigorøsitet som en kundevendt app med betalingsløsning.

### Hva vi oppnår ved å løse det
Riktig prioritering av innsats - ikke overingeniører enkle prosjekter, ikke underingeniører kritiske.

### Hvordan vi går frem

**Prioriteringsikoner:**
- 🔴 **KRITISK** – Må gjøres, hopp aldri over
- 🟡 **VIKTIG** – Bør gjøres for de fleste prosjekter
- 🟢 **VALGFRITT** – Relevant for større/komplekse prosjekter

**Prosjektkategorier:**

| Kategori | Beskrivelse | Eksempler |
|----------|-------------|-----------|
| **Lite internt** | Verktøy kun for deg selv | Script, personlig dashboard |
| **Internt m/DB** | Intern app med database | Team-verktøy, admin-panel |
| **Kundevendt** | Brukere utenfor organisasjonen | SaaS, mobilapp, nettbutikk |
| **Stor skala** | Mange brukere, sensitiv data | Fintech, helse, enterprise |

---

## 1.4 Hvem leser dette dokumentet?

### Hva dette punktet består av
Klargjøring av de to hovedmålgruppene for dette dokumentet.

### Hva problemet er
Dokumentasjon som prøver å være alt for alle, blir ofte ubrukelig for alle.

### Hva vi oppnår ved å løse det
Dokumentet er skrevet slik at:
1. **Prosjektlederen (mennesket)** forstår hvorfor hvert punkt er viktig og kan ta informerte beslutninger
2. **AI-assistenten** får nok kontekst til å gi sikker og relevant hjelp

### Hvordan vi går frem

**For prosjektlederen:**
- Les forklaringene under "Hva problemet er" og "Hva vi oppnår"
- Bruk sjekklistene aktivt
- Spør AI-assistenten når noe er uklart

**For AI-assistenten:**
- Bruk de tekniske detaljene og malene
- Følg sikkerhetsprinsippene konsekvent
- Varsle prosjektlederen ved usikkerhet

---

# 2. AI-GENERERT KODE: Sikkerhetsrisiko (KRITISK)

## 2.1 Problemet med AI-generert kode

### Hva dette punktet består av
En kritisk advarsel om sikkerhetsrisikoen ved å stole blindt på AI-generert kode.

### Hva problemet er

**Forskning viser alarmerende tall:**
- **45% av AI-generert kode inneholder sikkerhetssårbarheter**
- LLM-er feiler i **86% av tilfellene** mot Cross-Site Scripting (XSS)
- LLM-er feiler i **88% av tilfellene** mot Log Injection
- AI kopierer ofte usikre mønstre fra offentlige repositories

**Hvorfor skjer dette?**
1. AI-modeller er trent på enorme mengder kode fra internett - inkludert usikker kode
2. AI optimerer for "kode som fungerer", ikke "kode som er sikker"
3. AI har ikke kontekst om ditt spesifikke sikkerhetsbehov
4. Populære kode-snippets på internett er ofte ikke sikkerhetsrevidert

### Hva vi oppnår ved å løse det
- Unngår sikkerhetshull som kan føre til datainnbrudd
- Beskytter brukernes data og din virksomhets omdømme
- Reduserer risikoen for kostbare sikkerhetshendelser
- Bygger tillit hos brukere og kunder

### Hvordan vi går frem

**Grunnregel: Aldri stol blindt på AI-generert kode for sikkerhetskritiske funksjoner!**

| Situasjon | Anbefalt handling |
|-----------|-------------------|
| Autentisering/innlogging | Bruk etablerte biblioteker, ALDRI AI-generert fra scratch |
| Databasespørringer | Verifiser at parameteriserte queries brukes |
| Bruker-input håndtering | Sjekk at all input valideres og saniteres |
| Kryptering | Bruk velprøvde biblioteker, aldri "hjemmesnekret" krypto |
| API-nøkler/secrets | Verifiser at disse aldri er hardkodet |

---

## 2.2 Kjente sårbarheter i vibekoding-verktøy

### Hva dette punktet består av
Konkrete eksempler på sikkerhetshull funnet i populære AI-kodeverktøy i 2025.

### Hva problemet er

**Eksempler på sårbarhetstypene som har blitt funnet i AI-kodeverktøy (2025):**

| Verktøy | Sårbarhetstype | Konsekvens |
|---------|---------------|------------|
| Cursor | Kommandoinjeksjon | Angriper kan kjøre vilkårlige kommandoer på utviklerens maskin |
| MCP-implementasjoner | Fil-tilgangsfeil | Vilkårlig fil-lesing/skriving på disk |
| AI-kodeverktøy | DNS-eksfiltrering | Data-eksfiltrering via DNS |
| AI-kodeverktøy | Prompt injection | Ondsinnede instruksjoner lagret i langtidsminne |

> **Merk:** Sjekk alltid OWASP og NVD for oppdaterte CVE-er relevant for dine verktøy.

**Sikkerhetstest av 5 vibekoding-verktøy (desember 2025):**
- 69 sårbarheter totalt funnet
- ~45 klassifisert som "lav-medium"
- Mange klassifisert som "høy"
- ~6 klassifisert som "kritisk"

### Hva vi oppnår ved å løse det
Bevissthet om at verktøyene selv kan være sårbare, ikke bare koden de genererer.

### Hvordan vi går frem
1. Hold vibekoding-verktøy oppdatert til siste versjon
2. Vær varsom med å gi verktøyene tilgang til sensitive filer
3. Kjør vibekoding i isolerte miljøer når mulig
4. Ikke la AI-verktøy ha tilgang til produksjonsdata

---

## 2.3 Obligatoriske sikkerhetstiltak

### Hva dette punktet består av
Konkrete tiltak som MÅ gjennomføres for all AI-generert kode.

### Hva problemet er
Uten systematiske sikkerhetstiltak er det tilfeldig om koden er sikker eller ikke.

### Hva vi oppnår ved å løse det
En systematisk tilnærming som fanger opp de fleste sikkerhetsproblemer før de når produksjon.

### Hvordan vi går frem

**🔴 KRITISK: Disse tiltakene er obligatoriske for all AI-generert kode:**

| Tiltak | Beskrivelse | Verktøy |
|--------|-------------|---------|
| **Manuell sikkerhetskontroll** | Gjennomgå all sikkerhetskritisk kode manuelt | Menneske + AI-review |
| **SAST-skanning** | Automatisk statisk kodeanalyse | Semgrep, SonarQube |
| **Dependency-skanning** | Sjekk for kjente sårbarheter i pakker | Snyk, Dependabot, npm audit |
| **Secret-skanning** | Finn hardkodede hemmeligheter | Gitleaks, Trufflehog |

**Prompt til AI-assistenten ved kodegjennomgang:**

```
Gjennomgå denne koden for sikkerhetsproblemer:

[LIM INN KODE]

Sjekk spesielt for:
1. SQL injection
2. XSS (Cross-Site Scripting)
3. Hardkodede secrets
4. Manglende input-validering
5. Usikker autentisering/autorisering
6. Sensitive data i logger

For hvert problem du finner:
- Beskriv problemet
- Vis hvor i koden det er
- Foreslå konkret fiks
```

---

## 2.4 Sjekkliste for AI-kode

### Hva dette punktet består av
En praktisk sjekkliste å bruke for hver kodebit AI genererer.

### Hva problemet er
Uten en sjekkliste glemmer man lett å sjekke viktige ting.

### Hva vi oppnår ved å løse det
Konsistent kvalitetskontroll av all AI-generert kode.

### Hvordan vi går frem

```markdown
## AI-kode sikkerhet sjekkliste

### Før du bruker AI-generert kode:
- [ ] Forstår jeg hva denne koden gjør?
- [ ] Har jeg bedt AI forklare sikkerhetsvalgene?
- [ ] Er dette en sikkerhetskritisk funksjon? (auth, betaling, persondata)

### For sikkerhetskritiske funksjoner:
- [ ] Bruker koden etablerte biblioteker (ikke hjemmesnekret)?
- [ ] Er input-validering på plass?
- [ ] Er det noen hardkodede secrets?
- [ ] Bruker databasekall parameteriserte queries?
- [ ] Saniteres output for å hindre XSS?

### Før merge/deploy:
- [ ] Har SAST-skanning kjørt uten kritiske funn?
- [ ] Har dependency-skanning kjørt uten kritiske funn?
- [ ] Har secret-skanning kjørt uten funn?
- [ ] Er koden reviewet av et menneske (for kritiske funksjoner)?

### Ved usikkerhet:
- [ ] Har jeg spurt AI om å forklare sikkerhetsvalgene?
- [ ] Bør en erfaren utvikler se på dette?
```

---

# 3. Tech Stack-valg

## 3.1 Hva er tech stack?

### Hva dette punktet består av
En forklaring på hva "tech stack" betyr og hvorfor det er viktig.

### Hva problemet er
Uten forståelse for hva tech stack er, kan man ikke ta informerte valg eller kommunisere effektivt med AI-assistenten.

### Hva vi oppnår ved å løse det
Felles språk mellom prosjektleder og AI-assistent, og bedre beslutningsgrunnlag.

### Hvordan vi går frem

**Tech stack = samlingen av teknologier som brukes for å bygge produktet**

| Lag | Hva det gjør | Analogi | Eksempler |
|-----|--------------|---------|-----------|
| **Frontend** | Det brukeren ser og klikker på | Fasaden på et hus | React, Vue, SwiftUI |
| **Backend** | Serveren som håndterer logikk | Rørleggeren bak veggen | Node.js, Python, Supabase |
| **Database** | Hvor data lagres permanent | Arkivskapet | PostgreSQL, MongoDB |
| **Hosting** | Hvor appen kjører | Tomten huset står på | Vercel, Netlify, AWS |
| **Auth** | Innlogging og tilgangskontroll | Nøkkelkortsystemet | Supabase Auth, Auth0 |

---

## 3.2 Kriterier for valg i vibekoding

### Hva dette punktet består av
Spesifikke kriterier tilpasset AI-assistert utvikling.

### Hva problemet er
Vanlige "beste praksis" for tech stack tar ikke hensyn til vibekoding-konteksten, der AI-assistentens kjennskap til teknologien er kritisk.

### Hva vi oppnår ved å løse det
Teknologivalg som maksimerer effektiviteten av AI-assistenten og minimerer risiko.

### Hvordan vi går frem

**Prioriterte kriterier for vibekoding:**

| Kriterie | Hvorfor viktig | Eksempel |
|----------|----------------|----------|
| **Godt dokumentert** | AI-en kjenner teknologien bedre | Next.js > obskur framework |
| **Innebygd sikkerhet** | Reduserer risikoen for AI-feil | Supabase RLS > manuell auth |
| **Stort community** | Lettere å finne løsninger | React > eksperimentelt rammeverk |
| **Stabil** | Unngå hyppige breaking changes | Etablerte versjoner > bleeding edge |
| **Passende størrelse** | Ikke overingeniør | Supabase for MVP > Kubernetes |

**🔴 Unngå disse i vibekoding:**
- Veldig nye/ustabile teknologier (AI har lite treningsdata)
- Komplekse enterprise-løsninger for enkle prosjekter
- Teknologier som krever mye manuell sikkerhetsimplementering
- Obskure rammeverk med lite dokumentasjon

---

## 3.3 Plattformspesifikke anbefalinger

### Hva dette punktet består av
Konkrete anbefalinger for ulike typer applikasjoner.

### Hva problemet er
Hver plattform har sine egne beste praksis og sikkerhetskrav som må følges.

### Hva vi oppnår ved å løse det
Sikre og velfungerende apper tilpasset plattformens krav.

### Hvordan vi går frem

#### Webapp / SPA

**Anbefalt stack:**
- **Frontend:** Next.js eller Remix (React-basert)
- **Backend:** Supabase eller Firebase
- **Hosting:** Vercel eller Netlify
- **Styling:** Tailwind CSS

**Sikkerhetskrav:**
- HTTPS obligatorisk (automatisk på Vercel/Netlify)
- Content Security Policy (CSP)
- XSS-beskyttelse (innebygd i React)

#### iOS-app

**Anbefalt stack:**
- SwiftUI for UI (moderne, deklarativt)
- MVVM-arkitektur
- Core Data eller SwiftData for lokal lagring

**Plattformkrav:**
- App Transport Security (ATS) – kun HTTPS
- Keychain for sensitiv data
- Privacy Manifest (iOS 17+)

#### Android-app

**Anbefalt stack:**
- Jetpack Compose for UI
- MVVM-arkitektur
- Room for lokal database
- Hilt for dependency injection

**Plattformkrav:**
- Android Keystore for krypteringsnøkler
- Scoped Storage for filtilgang

#### Chrome Extension (Manifest V3)

**Viktig:** Chrome krever nå Manifest V3!

**Arkitektur:**
- Service Worker (erstatter background pages)
- Content Scripts for DOM-interaksjon
- Popup og Options pages

**Sikkerhetskrav:**
- Ingen remote code execution
- Minimal permissions
- Content Security Policy påkrevd

#### Cross-platform mobilapp

| Aspekt | Native (Swift/Kotlin) | Cross-platform (React Native/Flutter) |
|--------|----------------------|---------------------------------------|
| Ytelse | Best | God |
| AI-støtte | God | Utmerket (mer dokumentasjon) |
| Utviklingstid | Lengre | Kortere |

**Anbefaling for vibekoding:** Cross-platform gir raskere iterasjon og bedre AI-støtte.

---

## 3.4 Beslutningstre

### Hva dette punktet består av
Et visuelt beslutningstre for å velge tech stack.

### Hva problemet er
Med mange alternativer er det lett å bli overveldet eller velge feil.

### Hva vi oppnår ved å løse det
Rask og systematisk vei til riktig teknologivalg.

### Hvordan vi går frem

```
START: Hva skal du bygge?
│
├─ Trenger du brukergrensesnitt?
│   ├─ NEI → Script/CLI → Python eller Node.js
│   └─ JA ↓
│
├─ Hvilken plattform?
│   ├─ Web → Next.js + Supabase + Vercel
│   ├─ iOS → SwiftUI + Supabase
│   ├─ Android → Jetpack Compose + Firebase
│   ├─ Begge mobil → React Native + Supabase
│   ├─ Desktop → Tauri (liten) eller Electron (kompleks)
│   └─ Chrome Extension → TypeScript + Manifest V3
│
├─ Trenger du sanntidsdata?
│   ├─ JA → Supabase Realtime eller Firebase
│   └─ NEI → Standard REST API
│
└─ Trenger du betalingsløsning?
    ├─ JA → Stripe (ALDRI bygg egen!)
    └─ NEI → Fortsett uten
```

---

## 3.5 Dokumentasjon av valg

### Hva dette punktet består av
Mal for å dokumentere teknologivalg med begrunnelse.

### Hva problemet er
Uten dokumentasjon glemmer man hvorfor valg ble tatt, og fremtidige beslutninger blir inkonsistente.

### Hva vi oppnår ved å løse det
Sporbarhet, konsistens, og bedre kontekst for AI-assistenten.

### Hvordan vi går frem

```markdown
## Tech Stack for [Prosjektnavn]

### Frontend
- **Teknologi:** [f.eks. Next.js 14]
- **Hvorfor:** [Godt dokumentert, innebygd SSR, god AI-støtte]
- **Alternativ vurdert:** [Remix - valgt bort pga. mindre community]

### Backend
- **Teknologi:** [f.eks. Supabase]
- **Hvorfor:** [PostgreSQL med innebygd auth, realtime, gratis tier]
- **Alternativ vurdert:** [Firebase - valgt bort pga. NoSQL-begrensninger]

### Hosting
- **Teknologi:** [f.eks. Vercel]
- **Hvorfor:** [Sømløs Next.js-integrasjon, automatisk HTTPS]

### Autentisering
- **Teknologi:** [f.eks. Supabase Auth]
- **Hvorfor:** [Integrert med database, støtter OAuth og MFA]

---
Besluttet dato: [YYYY-MM-DD]
Besluttet av: [Navn/rolle]
```

---

# 4. Arkitektur og Prosjektstruktur

## 4.1 Systemarkitektur

### Hva dette punktet består av
Hvordan de ulike delene av systemet er organisert og kommuniserer med hverandre.

### Hva problemet er
Uten klar arkitektur blir koden uorganisert, vanskelig å vedlikeholde, og AI-assistenten gir inkonsistent hjelp.

### Hva vi oppnår ved å løse det
- Klar separasjon av ansvar
- Lettere å feilsøke
- AI-assistenten forstår strukturen
- Lettere å utvide med nye funksjoner

### Hvordan vi går frem

**Tre hovedalternativer:**

#### 1. Monolitt (enkel)
Alt i én applikasjon. Bra for MVP og små prosjekter.

```
┌─────────────────────────────┐
│       Din applikasjon       │
│  ┌───────┐ ┌───────┐ ┌───┐ │
│  │ UI    │ │ Logikk│ │ DB│ │
│  └───────┘ └───────┘ └───┘ │
└─────────────────────────────┘
```
✅ Enkel å starte | ❌ Kan bli rotete

#### 2. Frontend + Backend API (anbefalt for de fleste)

```
┌──────────┐      API       ┌──────────┐     ┌────────┐
│ Frontend │ ◄────────────► │ Backend  │ ◄──►│Database│
│ (React)  │   JSON/REST    │ (Node.js)│     │(Postgres)
└──────────┘                └──────────┘     └────────┘
```
✅ Klar separasjon, skalerbar | ❌ Mer kompleksitet

#### 3. Serverless / Backend-as-a-Service (anbefalt for vibekoding)

```
┌──────────┐                 ┌─────────────────┐
│ Frontend │ ◄─────────────► │ Supabase/Firebase│
│ (React)  │    SDK/API      │ (Auth+DB+Storage)│
└──────────┘                 └─────────────────┘
```
✅ Rask utvikling, innebygd sikkerhet | ❌ Vendor lock-in

**Valg per prosjekttype:**

| Prosjekttype | Anbefalt arkitektur |
|--------------|---------------------|
| MVP/enkel webapp | Serverless (Supabase) |
| Chrome Extension | Frontend-only med storage API |
| Mobilapp | Frontend + BaaS |
| Kompleks webapp | Frontend + egen Backend |

---

## 4.2 Prosjektstruktur per plattform

### Hva dette punktet består av
Konkrete mappestrukturer for ulike plattformer.

### Hva problemet er
Kaotisk filstruktur gjør det umulig å finne ting, og AI-assistenten får ikke konsistent kontekst.

### Hva vi oppnår ved å løse det
Alle vet hvor ting hører hjemme, inkludert AI-assistenten.

### Hvordan vi går frem

#### Next.js / React webapp

```
/my-app
├── /src
│   ├── /app              # App Router (sider)
│   │   ├── /api          # API-ruter
│   │   ├── /(auth)       # Autentiserte sider
│   │   └── page.tsx      # Hjemmeside
│   │
│   ├── /components       # Gjenbrukbare UI-komponenter
│   │   ├── /ui           # Grunnleggende (knapper, inputs)
│   │   └── /features     # Funksjonsspesifikke
│   │
│   ├── /lib              # Hjelpefunksjoner
│   │   ├── /auth         # Autentisering
│   │   ├── /db           # Database
│   │   └── /utils        # Generelle hjelpere
│   │
│   ├── /hooks            # Custom React hooks
│   └── /types            # TypeScript-typer
│
├── /public               # Statiske filer
├── .env.local            # Miljøvariabler (ALDRI commit!)
└── .env.example          # Eksempel (SKAL committes)
```

#### iOS-app (SwiftUI)

```
/MyApp
├── /MyApp
│   ├── /App
│   │   └── MyAppApp.swift       # Entry point
│   ├── /Views                   # SwiftUI views
│   │   ├── /Screens             # Hele skjermer
│   │   └── /Components          # Gjenbrukbare
│   ├── /ViewModels              # MVVM ViewModels
│   ├── /Models                  # Datamodeller
│   ├── /Services                # API, auth
│   └── /Resources               # Assets, lokalisering
├── /MyAppTests                  # Tester
└── /MyAppUITests                # UI-tester
```

#### Chrome Extension (Manifest V3)

```
/my-extension
├── /src
│   ├── manifest.json            # Extension manifest (V3!)
│   ├── /background
│   │   └── service-worker.js    # Service worker
│   ├── /content
│   │   └── content-script.js    # DOM-interaksjon
│   ├── /popup
│   │   ├── popup.html
│   │   └── popup.js
│   ├── /lib                     # Delt kode
│   └── /assets                  # Ikoner
└── /tests
```

---

## 4.3 C4-modellen

### Hva dette punktet består av
En enkel modell for arkitekturdokumentasjon på fire nivåer.

### Hva problemet er
Uten visuelle diagrammer er det vanskelig å kommunisere arkitektur til teamet og stakeholders.

### Hva vi oppnår ved å løse det
Felles forståelse av systemet på riktig detaljnivå for ulike målgrupper.

### Hvordan vi går frem

**For vibekoding: Nivå 1 og 2 er vanligvis tilstrekkelig.**

#### Nivå 1: System Context
Viser systemet i kontekst med brukere og eksterne systemer.

```
┌─────────┐         ┌─────────────────┐         ┌──────────┐
│ Bruker  │ ──────► │  Ditt system    │ ──────► │ Stripe   │
└─────────┘         │  (webapp)       │         │ (betaling)
                    └─────────────────┘         └──────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │ SendGrid     │
                    │ (e-post)     │
                    └──────────────┘
```

#### Nivå 2: Container
Viser hovedkomponentene i systemet.

```
┌─────────────────────────────────────────────────┐
│                  Ditt system                     │
│                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │ Frontend │◄──►│ Backend  │◄──►│ Database │  │
│  │ (React)  │    │ (Node.js)│    │(Postgres)│  │
│  └──────────┘    └──────────┘    └──────────┘  │
│                                                  │
└─────────────────────────────────────────────────┘
```

---

## 4.4 Arkitekturbeslutningslogg (ADR)

### Hva dette punktet består av
Et system for å dokumentere viktige arkitekturvalg med begrunnelse.

### Hva problemet er
Uten ADR glemmer man hvorfor beslutninger ble tatt. Når noen spør "hvorfor bruker vi X?", har ingen svar.

### Hva vi oppnår ved å løse det
- Historikk over beslutninger
- Lettere onboarding
- Unngår å gjenta feilede eksperimenter
- AI-assistenten forstår konteksten

### Hvordan vi går frem

```markdown
# ADR-001: [Tittel på beslutning]

## Status
[Foreslått | Godkjent | Avvist | Erstattet av ADR-XXX]

## Kontekst
[Beskriv situasjonen og problemet som må løses]

## Beslutning
[Beskriv beslutningen som ble tatt]

## Alternativer vurdert
1. [Alternativ 1] - [Fordeler/ulemper]
2. [Alternativ 2] - [Fordeler/ulemper]

## Konsekvenser
**Positive:**
- [Konsekvens]

**Negative:**
- [Konsekvens]

## Dato
[YYYY-MM-DD]
```

**Eksempel:**

```markdown
# ADR-001: Bruk Supabase som backend

## Status
Godkjent

## Kontekst
Vi trenger database, autentisering og API for MVP.
Teamet har begrenset backend-erfaring og vil lansere raskt.

## Beslutning
Vi bruker Supabase som backend-as-a-service.

## Alternativer vurdert
1. Egen Node.js backend - Mer kontroll, men krever mer arbeid
2. Firebase - God, men NoSQL passer ikke våre relasjonelle data

## Konsekvenser
+ Rask utvikling med innebygd auth og realtime
+ Mindre vedlikehold
- Vendor lock-in til Supabase
- Må migrere hvis vi trenger utstøttet funksjonalitet

## Dato
2026-01-15
```

---

# 5. Trusselmodellering

## 5.1 Forenklet tilnærming (OWASP 4 spørsmål)

### Hva dette punktet består av
En enkel metode for trusselmodellering som alle kan bruke, uavhengig av teknisk bakgrunn.

### Hva problemet er
Tradisjonelle trusselmodelleringsmetoder (STRIDE, etc.) er for tekniske for ikke-tekniske prosjektledere, noe som fører til at trusselmodellering hoppes over.

### Hva vi oppnår ved å løse det
Alle prosjekter får en grunnleggende trusselanalyse, selv uten sikkerhetseksperter.

### Hvordan vi går frem

**OWASP Fire-spørsmåls-metoden:**

| # | Spørsmål | Hva du skal tenke på |
|---|----------|---------------------|
| 1 | **Hva bygger vi?** | Beskriv systemet, hvem bruker det, hva slags data håndteres |
| 2 | **Hva kan gå galt?** | Brainstorm alt som kan misbrukes eller feile |
| 3 | **Hva gjør vi med det?** | Velg tiltak for de viktigste truslene |
| 4 | **Gjorde vi en god jobb?** | Verifiser at tiltakene faktisk er implementert |

**Praktisk gjennomføring:**

```markdown
## Trusselmodellering for [Prosjektnavn]

### 1. Hva bygger vi?
- Type app: [webapp/mobilapp/etc.]
- Brukere: [hvem bruker dette?]
- Sensitiv data: [hva slags data håndterer vi?]
- Eksterne systemer: [hva integrerer vi med?]

### 2. Hva kan gå galt?
Brainstorm - list opp ALT som kan misbrukes:
- [ ] Noen later som de er en annen bruker
- [ ] Noen får tilgang til data de ikke skal se
- [ ] Noen sletter eller endrer andres data
- [ ] Systemet blir utilgjengelig
- [ ] Persondata lekker ut
- [ ] [Legg til prosjektspesifikke trusler]

### 3. Hva gjør vi med det?
For hver trussel, velg én:
- **Mitigere:** Implementer beskyttelse
- **Akseptere:** Risikoen er lav nok
- **Overføre:** Forsikring eller tredjeparttjeneste
- **Unngå:** Fjern funksjonaliteten

### 4. Gjorde vi en god jobb?
- [ ] Alle kritiske trusler har tiltak
- [ ] Tiltakene er faktisk implementert
- [ ] Vi har testet at de fungerer
```

---

## 5.2 STRIDE-metoden

### Hva dette punktet består av
Microsofts systematiske metode for å identifisere trusler i seks kategorier.

### Hva problemet er
Uten systematikk glemmer man ofte viktige trusselkategorier.

### Hva vi oppnår ved å løse det
Komplett dekning av alle hovedkategorier av sikkerhetstrusler.

### Hvordan vi går frem

**STRIDE = seks kategorier av trusler:**

| Bokstav | Trussel | På vanlig norsk | Eksempel |
|---------|---------|-----------------|----------|
| **S** | Spoofing | Identitetstyveri | Noen later som de er deg |
| **T** | Tampering | Manipulering | Noen endrer data de ikke burde |
| **R** | Repudiation | Benektelse | "Det var ikke jeg som gjorde det" |
| **I** | Information Disclosure | Datalekkasje | Persondata kommer på avveie |
| **D** | Denial of Service | Tjenestenekt | Systemet blir utilgjengelig |
| **E** | Elevation of Privilege | Rettighetshevning | Vanlig bruker blir admin |

**STRIDE arbeidsark:**

```markdown
## STRIDE for [Komponent/Funksjon]

### S - Spoofing (Identitetstyveri)
Spørsmål: Kan noen late som de er en annen bruker?

- [ ] Krever alle sensitive handlinger innlogging?
- [ ] Er sessions sikre og tidsbegrenset?
- [ ] Finnes MFA/2FA for sensitive operasjoner?

Trusler funnet:
1. [Beskriv trussel] → Tiltak: [Hva gjør vi?]

### T - Tampering (Manipulering)
Spørsmål: Kan noen endre data de ikke burde?

- [ ] Valideres all input fra brukere?
- [ ] Kan brukere endre andres data via URL-manipulering?
- [ ] Er databasespørringer beskyttet mot injection?

Trusler funnet:
1. [Beskriv trussel] → Tiltak: [Hva gjør vi?]

### R - Repudiation (Benektelse)
Spørsmål: Kan vi bevise hvem som gjorde hva?

- [ ] Logges alle kritiske handlinger?
- [ ] Er loggene beskyttet mot manipulering?
- [ ] Inkluderer logger bruker-ID og tidspunkt?

Trusler funnet:
1. [Beskriv trussel] → Tiltak: [Hva gjør vi?]

### I - Information Disclosure (Datalekkasje)
Spørsmål: Kan sensitiv data lekke?

- [ ] Er all data kryptert under transport (HTTPS)?
- [ ] Er sensitiv data kryptert i databasen?
- [ ] Viser feilmeldinger intern informasjon?
- [ ] Returnerer API mer data enn nødvendig?

Trusler funnet:
1. [Beskriv trussel] → Tiltak: [Hva gjør vi?]

### D - Denial of Service (Tjenestenekt)
Spørsmål: Kan noen gjøre systemet utilgjengelig?

- [ ] Er det rate limiting på API-endepunkter?
- [ ] Håndteres store filopplastinger trygt?
- [ ] Er det timeout på langvarige operasjoner?

Trusler funnet:
1. [Beskriv trussel] → Tiltak: [Hva gjør vi?]

### E - Elevation of Privilege (Rettighetshevning)
Spørsmål: Kan noen få tilgang de ikke skal ha?

- [ ] Sjekkes tilgangsnivå for HVER sensitiv operasjon?
- [ ] Er admin-funksjoner isolert og ekstra beskyttet?
- [ ] Kan vanlige brukere manipulere seg til admin-tilgang?

Trusler funnet:
1. [Beskriv trussel] → Tiltak: [Hva gjør vi?]
```

---

## 5.3 DREAD-risikorangering

### Hva dette punktet består av
En metode for å prioritere truslene du har funnet, slik at du vet hva som må fikses først.

### Hva problemet er
Ikke alle trusler er like alvorlige. Uten prioritering bruker man ressurser på feil ting.

### Hva vi oppnår ved å løse det
Fokus på det viktigste først. Kritiske trusler fikses før MVP, mindre kritiske kan vente.

### Hvordan vi går frem

**DREAD = fem dimensjoner, score 1-10 på hver:**

| Dimensjon | Spørsmål | 1 = | 10 = |
|-----------|----------|-----|------|
| **D**amage | Hvor stor skade? | Minimal | Katastrofal |
| **R**eproducibility | Hvor lett å gjenta? | Vanskelig | Enkelt |
| **E**xploitability | Hvor lett å utnytte? | Krever ekspertise | Hvem som helst |
| **A**ffected users | Hvor mange påvirkes? | Én bruker | Alle brukere |
| **D**iscoverability | Hvor lett å oppdage? | Skjult | Åpenbar |

**Kalkulator:**
```
Total risikoscore = (D + R + E + A + D) / 5

Score 1-3:  Lav risiko    → Fiks når du har tid
Score 4-6:  Medium risiko → Fiks før lansering
Score 7-10: Høy risiko    → Fiks umiddelbart
```

**Eksempel:**

| Trussel | D | R | E | A | D | Score | Prioritet |
|---------|---|---|---|---|---|-------|-----------|
| SQL-injection i søkefelt | 9 | 9 | 7 | 10 | 8 | **8.6** | 🔴 KRITISK |
| Manglende rate limiting | 5 | 10 | 9 | 10 | 7 | **8.2** | 🔴 HØY |
| Verbose feilmeldinger | 3 | 10 | 10 | 5 | 9 | **7.4** | 🟡 MEDIUM |

---

## 5.4 LINDDUN for personvern (GDPR)

### Hva dette punktet består av
En metode fokusert på personverntrusler, spesielt relevant for GDPR-compliance.

### Hva problemet er
STRIDE dekker generell sikkerhet, men ikke personvern spesifikt. GDPR krever at personvern bygges inn fra starten ("Privacy by Design").

### Hva vi oppnår ved å løse det
GDPR-compliance og beskyttelse av brukernes personvern.

### Hvordan vi går frem

**LINDDUN = sju personverntrusler:**

| Bokstav | Trussel | Forklaring | Eksempel |
|---------|---------|------------|----------|
| **L** | Linkability | Data kan kobles på tvers | Kombinere kjøpshistorikk med lokasjon |
| **I** | Identifiability | Person kan identifiseres | E-post + alder = identifiserer person |
| **N** | Non-repudiation | Kan ikke benekte handling | Sporbar handlingslogg |
| **D** | Detectability | Kan oppdage at data finnes | Vite at noen har en konto |
| **D** | Disclosure | Utilsiktet dataeksponering | API lekker persondata |
| **U** | Unawareness | Bruker vet ikke hva som samles | Skjult datainnsamling |
| **N** | Non-compliance | Bryter personvernregler | Mangler slettmulighet |

**LINDDUN sjekkliste:**

```markdown
## Personvernanalyse (LINDDUN)

### Datainnsamling
- [ ] Samler vi kun data vi faktisk trenger? (dataminimering)
- [ ] Er formålet med innsamling tydelig definert?
- [ ] Er brukeren informert om hva vi samler?

### Brukerrettigheter (GDPR)
- [ ] Rett til innsyn: Kan bruker se sine data?
- [ ] Rett til sletting: Kan vi slette ALL brukerdata?
- [ ] Rett til portabilitet: Kan bruker eksportere data?
- [ ] Rett til retting: Kan bruker korrigere feil?

### Tekniske tiltak
- [ ] Pseudonymisering der mulig (erstatt navn med ID)
- [ ] Kryptering av persondata
- [ ] Tilgangskontroll (bare de som trenger tilgang)
- [ ] Automatisk sletting av data vi ikke lenger trenger
```

**Når bruke LINDDUN:**
- Prosjektet håndterer persondata
- Brukere er i EU (GDPR)
- Helse-, finans- eller andre sensitive sektorer

---

## 5.5 OWASP Low-Code/No-Code Top 10

### Hva dette punktet består av
De ti største sikkerhetsrisikoene spesifikt for vibekoding og low-code/no-code utvikling.

### Hva problemet er
Vibekoding har unike risikoer som tradisjonelle sikkerhetslister ikke dekker. AI-generert kode og citizen development skaper nye angrepsvektorer.

### Hva vi oppnår ved å løse det
Fokus på de risikoene som er mest relevante for din utviklingsmetodikk.

### Hvordan vi går frem

**OWASP Low-Code/No-Code Top 10:**

| # | Risiko | Forklaring | Tiltak |
|---|--------|------------|--------|
| 1 | **Account Impersonation** | Angriper overtar andres konto | Sterk autentisering, MFA |
| 2 | **Authorization Misuse** | Feil i tilgangskontroll | RBAC, sjekk på server |
| 3 | **Data Leakage** | Sensitiv data lekker ut | Kryptering, dataminimering |
| 4 | **Authentication Issues** | Svak innloggingssikkerhet | Bruk etablerte auth-løsninger |
| 5 | **Security Misconfiguration** | Feil i oppsett | Sikre defaults, reviews |
| 6 | **Injection Handling** | Manglende input-validering | Valider all input |
| 7 | **Data Exposure** | Utilsiktet datatilgang | Minimal data i API-responses |
| 8 | **Access Mismanagement** | For brede tilganger | Principle of Least Privilege |
| 9 | **Integration Vulnerabilities** | Usikre tredjepartstilkoblinger | Vurder alle integrasjoner |
| 10 | **Invisible Sprawl** | Ukontrollerte apper | Governance, oversikt |

**Vibekoding-spesifikk sjekkliste:**

```markdown
## Vibekoding sikkerhetssjekk

### AI-generert kode
- [ ] Er sikkerhetskritisk kode manuelt gjennomgått?
- [ ] Kjører SAST-verktøy på all AI-generert kode?
- [ ] Brukes etablerte biblioteker (ikke AI-generert auth)?

### Tilgangskontroll
- [ ] Er roller og rettigheter klart definert?
- [ ] Sjekkes tilgang på serveren (ikke bare frontend)?
- [ ] Følges "minste tilgang"-prinsippet?

### Integrasjoner
- [ ] Er alle tredjepartsintegrasjoner vurdert?
- [ ] Brukes kun nødvendige API-tilganger?
- [ ] Er API-nøkler sikret og roteres de?

### Oversikt
- [ ] Har vi oversikt over alle apper som er laget?
- [ ] Er det governance-prosess for nye apper?
- [ ] Slettes apper som ikke lenger brukes?
```

---

## 5.6 Data Flow Diagram (DFD)

### Hva dette punktet består av
En visuell fremstilling av hvordan data flyter gjennom systemet, med markering av sikkerhetssoner.

### Hva problemet er
Uten visualisering er det vanskelig å identifisere hvor sikkerhetstiltak trengs mest.

### Hva vi oppnår ved å løse det
Klart bilde av "trust boundaries" - punktene der data krysser fra usikker til sikker sone (og omvendt).

### Hvordan vi går frem

**DFD-symboler:**

```
┌─────────┐
│ Process │  = Prosess som behandler data
└─────────┘

[─────────]  = Ekstern entitet (bruker, eksternt system)

(─────────)  = Datalager (database, fil)

───────────► = Dataflyt

─ ─ ─ ─ ─ ─  = Trust boundary (sikkerhetsgrense)
```

**Eksempel: Webapp med brukerautentisering**

```
                    TRUST BOUNDARY (internett → server)
                    ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
                              │
[Bruker] ──── Innlogging ─────┼────► ┌──────────────┐
                              │      │ Auth Service │
[Angriper?]                   │      └──────────────┘
                              │             │
                              │             ▼
                              │      ┌──────────────┐     ┌─────────────┐
                              │      │ API Server   │────►│ Database    │
                              │      └──────────────┘     │ (kryptert)  │
                              │             │             └─────────────┘
                    ─ ─ ─ ─ ─ ┼ ─ ─ ─ ─ ─ ─│─ ─ ─ ─ ─
                              │             │
                              │             ▼
                              │      [Stripe API]
                              │      (tredjeparttjeneste)
```

**Hvor fokusere trusselmodellering:**
Fokuser på punkter der data krysser trust boundaries:

1. **Bruker → Frontend**: Input-validering, XSS-beskyttelse
2. **Frontend → Backend**: API-sikkerhet, autentisering
3. **Backend → Database**: SQL-injection, tilgangskontroll
4. **Backend → Tredjeparter**: API-nøkler, dataeksponering

---

## 5.7 Kontinuerlig trusselmodellering

### Hva dette punktet består av
Tilnærming der trusselmodellering er en løpende aktivitet, ikke en engangsøvelse.

### Hva problemet er
Tradisjonell trusselmodellering gjøres én gang og blir fort utdatert. Systemet endrer seg, nye funksjoner legges til, men trusselmodellen forblir gammel.

### Hva vi oppnår ved å løse det
Organisasjoner med kontinuerlig trusselmodellering er **2.4x mer sannsynlige** til å oppdage sikkerhetshendelser før alvorlig skade.

### Hvordan vi går frem

**Trigger-basert oppdatering:**

| Trigger | Handling |
|---------|----------|
| Ny funksjon legges til | Mini-STRIDE for funksjonen |
| Ny integrasjon | Vurder tredjepartsrisiko |
| Sikkerhetsvarsel (CVE) | Sjekk om vi er berørt |
| Kvartalsvis | Full gjennomgang av trusselmodell |

**Integrasjon i utviklingsprosessen:**

```markdown
## Trusselmodellering i sprint

### Ved sprint-planlegging
For hver ny user story, still tre spørsmål:
1. Håndterer denne funksjonen sensitiv data?
2. Introduserer den ny input fra brukere?
3. Integrerer den med eksterne systemer?

Hvis ja på noen → Inkluder sikkerhetsvurdering i storyen.

### Ved code review
Sjekk at sikkerhetstiltak fra trusselmodellen er implementert.

### Ved release
Oppdater trusselmodell hvis arkitekturen har endret seg.
```

---

## 5.8 Trusselbibliotek per app-type

### Hva dette punktet består av
Forhåndsdefinerte lister over vanlige trusler for ulike app-typer.

### Hva problemet er
Det er lett å glemme viktige trusler. Et bibliotek sikrer at du dekker de vanligste.

### Hva vi oppnår ved å løse det
Raskere og mer komplett trusselmodellering.

### Hvordan vi går frem

#### Webapp-trusler

| Trussel | Beskrivelse | Tiltak |
|---------|-------------|--------|
| XSS | Injisert JavaScript | Sanitize output, CSP |
| CSRF | Lurt til å gjøre handlinger | CSRF-tokens, SameSite cookies |
| SQL Injection | Manipulerte databasespørringer | Parameteriserte queries |
| Broken Auth | Svak innlogging | Bruk etablerte auth-løsninger |
| Data Exposure | Persondata lekker | Kryptering, minimering |

#### Mobilapp-trusler

| Trussel | Beskrivelse | Tiltak |
|---------|-------------|--------|
| Insecure Storage | Data lagres ukryptert | Keychain/Keystore |
| Insufficient Transport | HTTP i stedet for HTTPS | Certificate pinning |
| Reverse Engineering | App dekompileres | Obfuscation, server-side logikk |
| Session Handling | Tokens utløper ikke | Korte token-levetider |

#### Chrome Extension-trusler

| Trussel | Beskrivelse | Tiltak |
|---------|-------------|--------|
| Overly Broad Permissions | For mye tilgang | Minimal permissions |
| Content Script Injection | Ondsinnet DOM-kode | Streng CSP |
| Storage Exposure | Data i chrome.storage | Krypter sensitive verdier |

#### API-trusler

| Trussel | Beskrivelse | Tiltak |
|---------|-------------|--------|
| Broken Object Auth | Tilgang til andres data | Sjekk eierskap |
| Excessive Data | API returnerer for mye | Filtrer respons |
| No Rate Limiting | API overbelastes | Implementer rate limiting |
| Mass Assignment | Felt som ikke skal endres | Whitelist felt |

---

# 6. Sikkerhet og Datahåndtering

## 6.1 Autentisering

### Hva dette punktet består av
Hvordan systemet bekrefter **hvem** brukeren er.

### Hva problemet er
Dårlig autentisering er en av de vanligste årsakene til datainnbrudd. Hjemmesnekrede løsninger har nesten alltid sikkerhetshull.

### Hva vi oppnår ved å løse det
Sikker identifisering av brukere, og beskyttelse mot kontoovertakelse.

### Hvordan vi går frem

**🔴 KRITISK: Aldri bygg egen autentisering!**

Bruk etablerte løsninger:

| Tjeneste | Passer for | Gratis tier |
|----------|-----------|-------------|
| **Supabase Auth** | Supabase-prosjekter | Ja |
| **Firebase Auth** | Firebase-prosjekter | Ja |
| **Auth0** | Større prosjekter | Begrenset |
| **Clerk** | React/Next.js | Ja |
| **NextAuth.js** | Next.js (selvhostet) | Open source |

**Autentiseringsmetoder rangert:**

| Metode | Sikkerhet | Brukeropplevelse | Anbefalt? |
|--------|-----------|------------------|-----------|
| Passkeys/WebAuthn | ⭐⭐⭐⭐⭐ | Moderne | Ja (fremtiden) |
| OAuth (Google, Apple) | ⭐⭐⭐⭐ | Veldig enkel | Ja |
| Magic Link (e-post) | ⭐⭐⭐⭐ | Enkel | Ja |
| E-post + passord + MFA | ⭐⭐⭐⭐ | Kjent | Ja |
| E-post + passord | ⭐⭐⭐ | Kjent | Kun med 2FA |
| SMS OTP | ⭐⭐ | Kjent | Backup, ikke primær |

**Session-håndtering sjekkliste:**

```markdown
## Sikker session

- [ ] httpOnly cookies (ikke tilgjengelig for JavaScript)
- [ ] secure flag (kun HTTPS)
- [ ] SameSite=Strict eller Lax (CSRF-beskyttelse)
- [ ] Kort session-varighet (15-60 min for sensitive apper)
- [ ] Refresh tokens med rotasjon
- [ ] Automatisk utlogging ved inaktivitet
- [ ] Invalider sessions ved passordendring
```

---

## 6.2 Autorisering (RBAC)

### Hva dette punktet består av
Hvordan systemet bestemmer **hva** en bruker har lov til å gjøre etter de er autentisert.

### Hva problemet er
Manglende eller svak autorisering lar brukere gjøre ting de ikke skal, som å se andres data eller få admin-tilgang.

### Hva vi oppnår ved å løse det
Brukere kan kun gjøre det de har lov til. Sensitive funksjoner er beskyttet.

### Hvordan vi går frem

**Role-Based Access Control (RBAC):**

Definer roller med tilhørende rettigheter:

```markdown
## Rolle-definisjon

### Admin
- Kan: Alt
- Eksempel: Systemadministrator

### Moderator
- Kan: Lese alt, redigere innhold, slette upassende
- Kan ikke: Slette brukere, systeminnstillinger

### Bruker
- Kan: Lese offentlig, lese/redigere/slette EGNE data
- Kan ikke: Se andres private data, moderere

### Gjest (ikke innlogget)
- Kan: Se offentlig innhold
- Kan ikke: Opprette, redigere, slette
```

**Rettighetsmatrise:**

| Ressurs | Gjest | Bruker | Moderator | Admin |
|---------|-------|--------|-----------|-------|
| Se offentlige poster | ✅ | ✅ | ✅ | ✅ |
| Se egne poster | ❌ | ✅ | ✅ | ✅ |
| Opprette post | ❌ | ✅ | ✅ | ✅ |
| Redigere egen post | ❌ | ✅ | ✅ | ✅ |
| Slette egen post | ❌ | ✅ | ✅ | ✅ |
| Redigere andres post | ❌ | ❌ | ✅ | ✅ |
| Administrere brukere | ❌ | ❌ | ❌ | ✅ |

**🔴 KRITISK: Backend-sjekk er obligatorisk!**

Frontend-sjekker er kun for brukeropplevelse. All autorisering MÅ sjekkes på serveren.

```markdown
## Autorisering sjekkliste

- [ ] Sjekk tilgang på HVER API-forespørsel
- [ ] Sjekk at bruker eier ressursen de prøver å endre
- [ ] Logg tilgangsnektelser
- [ ] Audit-logg for sensitive operasjoner
```

---

## 6.3 Dataklassifisering og kryptering

### Hva dette punktet består av
System for å kategorisere data etter sensitivitet og beskytte den deretter.

### Hva problemet er
Uten klassifisering vet man ikke hvilke data som trenger sterkest beskyttelse.

### Hva vi oppnår ved å løse det
Riktig beskyttelsesnivå for ulike typer data. Compliance med GDPR og andre regelverk.

### Hvordan vi går frem

**Dataklassifisering:**

| Nivå | Beskrivelse | Eksempler | Krav |
|------|-------------|-----------|------|
| **Offentlig** | Kan deles fritt | Markedsføring, offentlige profiler | Ingen spesielle |
| **Intern** | Kun autoriserte | Brukerinnhold, dokumenter | Tilgangskontroll |
| **Konfidensiell** | Sensitiv | Persondata, e-post | Kryptering, logging |
| **Strengt konfidensiell** | Svært sensitiv | Passord, betalingsinfo, helse | Sterk kryptering, audit |

**Kryptering:**

| Hva | Hvordan | Verktøy |
|-----|---------|---------|
| Data i transit | HTTPS/TLS | Automatisk på Vercel/Netlify |
| Data i ro | Database-kryptering | Supabase (auto), AWS RDS |
| Passord | Hashing (ikke kryptering!) | bcrypt, Argon2 |
| API-nøkler | Secrets manager | Vercel env, AWS Secrets Manager |
| Lokal lagring (mobil) | Platform keychain | iOS Keychain, Android Keystore |

**Passord-krav:**

```markdown
## Passord-sikkerhet

- [ ] Hash passord med bcrypt (cost 12+) eller Argon2
- [ ] ALDRI logg passord, selv ikke feilede forsøk
- [ ] Minimumslengde 12+ tegn
- [ ] Sjekk mot kompromitterte passord (HaveIBeenPwned)
- [ ] "Glemt passord" med tidsbegrenset token
- [ ] Rate limiting på innloggingsforsøk
```

---

## 6.4 Input-validering

### Hva dette punktet består av
Systematisk validering av all data som kommer fra brukere.

### Hva problemet er
Bruker-input er den vanligste angrepsvektoren. SQL injection, XSS, og andre angrep kommer via input.

### Hva vi oppnår ved å løse det
Beskyttelse mot de vanligste angrepene.

### Hvordan vi går frem

**Grunnregel: Aldri stol på input fra brukeren!**

Alt må valideres: skjemaer, URL-parametere, headers, cookies.

**Vanlige angrep via input:**

| Angrep | Hva skjer | Forsvar |
|--------|-----------|---------|
| SQL Injection | Angriper kjører DB-kommandoer | Parameteriserte queries |
| XSS | Angriper injiserer JavaScript | Output encoding, CSP |
| Path Traversal | Leser filer utenfor tillatt | Whitelist stier |
| Command Injection | Kjører systemkommandoer | Aldri shell med bruker-input |

**Validering per felt:**

```markdown
## Validering sjekkliste per felt

- [ ] Definert forventet datatype (string, number, email)
- [ ] Satt maksimal lengde
- [ ] Whitelist tillatte tegn/verdier
- [ ] Validert format (regex for e-post, telefon)
- [ ] Valider på BÅDE frontend (UX) og backend (sikkerhet)
```

**Anbefalte biblioteker:**

| Plattform | Bibliotek |
|-----------|-----------|
| Node.js | Zod, Joi, Yup |
| Python | Pydantic |
| Swift | Codable + custom |
| Kotlin | kotlinx.serialization |

---

## 6.5 API-sikkerhet

### Hva dette punktet består av
Sikkerhetstiltak spesifikt for API-endepunkter.

### Hva problemet er
API-er er ofte åpne for angrep fordi de er tilgjengelige over internett og behandler sensitiv data.

### Hva vi oppnår ved å løse det
Sikre API-er som beskytter data og tåler misbruk.

### Hvordan vi går frem

**API-sikkerhet sjekkliste:**

```markdown
## API-sikkerhet

- [ ] Autentisering på alle ikke-offentlige endepunkter
- [ ] Autorisering (sjekk at bruker har tilgang)
- [ ] Rate limiting
- [ ] Input-validering på alle parametere
- [ ] Output-filtrering (ikke returner mer enn nødvendig)
- [ ] CORS-konfigurasjon (begrens tillatte origins)
- [ ] Ikke eksponér intern info i feilmeldinger
```

**Rate limiting anbefaling:**

| Endepunkt-type | Anbefalt grense |
|----------------|-----------------|
| Innlogging | 5 forsøk / 15 min |
| Passord-reset | 3 forsøk / time |
| Standard API | 100-1000 / min |
| Søk | 30 / min |
| Filopplasting | 10 / min |

---

## 6.6 GDPR og personvern

### Hva dette punktet består av
Krav og tiltak for å overholde GDPR og beskytte brukernes personvern.

### Hva problemet er
GDPR-brudd kan gi bøter på opptil 4% av global omsetning eller 20 millioner euro. Mer viktig: det er riktig å beskytte brukernes personvern.

### Hva vi oppnår ved å løse det
GDPR-compliance, brukerenes tillit, og unngåelse av bøter.

### Hvordan vi går frem

**Privacy by Design sjekkliste:**

```markdown
## GDPR-sjekkliste

### Datainnsamling
- [ ] Samler vi kun data vi faktisk trenger? (dataminimering)
- [ ] Har vi lovlig grunnlag for hver datatype?
- [ ] Er formålet tydelig definert og kommunisert?

### Brukerrettigheter
- [ ] Rett til innsyn - kan bruker se sine data?
- [ ] Rett til sletting - kan vi slette all brukerdata?
- [ ] Rett til portabilitet - kan vi eksportere data?
- [ ] Rett til retting - kan bruker korrigere data?

### Samtykke
- [ ] Separat samtykke for ulike formål
- [ ] Like lett å trekke tilbake som å gi
- [ ] Ikke forhåndsavkryssede bokser
- [ ] Tjenesten fungerer uten valgfritt samtykke

### Dokumentasjon
- [ ] Personvernerklæring
- [ ] Databehandleravtaler med tredjeparter
- [ ] Oversikt over all persondata vi behandler
```

---

## 6.7 Secrets Management

### Hva dette punktet består av
Håndtering av hemmeligheter: API-nøkler, database-passord, tokens.

### Hva problemet er
Secrets på avveie er en av de vanligste årsakene til sikkerhetshendelser. Hardkodede API-nøkler i kode som committes til GitHub fører til kompromitterte kontoer.

### Hva vi oppnår ved å løse det
Beskyttede hemmeligheter og redusert risiko for kompromittering.

### Hvordan vi går frem

**Secrets-regler:**

```markdown
## Secrets håndtering

ALDRI:
- [ ] Hardkode secrets i koden
- [ ] Commit secrets til git (.env i .gitignore!)
- [ ] Logg secrets
- [ ] Del secrets via e-post/Slack
- [ ] Bruk samme secret i dev og prod

ALLTID:
- [ ] Bruk miljøvariabler
- [ ] Roter secrets regelmessig
- [ ] Forskjellige secrets per miljø
- [ ] Begrens tilgang (need-to-know)
- [ ] Ha en plan for kompromitterte secrets
```

**Verktøy:**

| Kompleksitet | Verktøy |
|--------------|---------|
| Enkel (de fleste) | Vercel/Netlify env variables |
| Medium | Doppler, Infisical |
| Enterprise | AWS Secrets Manager, HashiCorp Vault |

---

## 6.8 Tredjepartstjenester

### Hva dette punktet består av
Vurdering og sikring av integrasjoner med eksterne tjenester.

### Hva problemet er
Tredjepartstjenester kan være en sikkerhetsrisiko. Deres sikkerhetsbrudd blir ditt problem.

### Hva vi oppnår ved å løse det
Kontrollert risiko fra integrasjoner og supply chain.

### Hvordan vi går frem

**Vurdering for hver tjeneste:**

```markdown
## Tredjepartstjeneste: [Navn]

### Generelt
- Formål: [Hva brukes det til?]
- Pålitelighet: [Etablert? Oppetidsgaranti?]
- Vendor lock-in: [Hvor vanskelig å bytte?]

### Sikkerhet
- Sertifiseringer: [SOC2, ISO27001?]
- Datahåndtering: [Hvor lagres data? Kryptert?]
- Breach-historikk: [Har de hatt brudd?]

### Personvern
- GDPR-compliance: [Ja/Nei]
- Databehandleravtale: [DPA tilgjengelig?]
- Dataplassering: [EU eller USA?]
```

**Vanlige tjenester vurdert:**

| Tjeneste | Bruk | Sikkerhet | GDPR |
|----------|------|-----------|------|
| Stripe | Betaling | Høy (PCI DSS) | Ja |
| Supabase | Backend | Høy (SOC2) | Ja (EU-region) |
| Firebase | Backend | Høy | Ja* (*US default) |
| Vercel | Hosting | Høy (SOC2) | Ja |

---

# 7. DevSecOps og CI/CD

## 7.1 CI/CD-pipeline

### Hva dette punktet består av
Automatisert prosess for å teste og publisere kode.

### Hva problemet er
Manuell testing og deployment er treg, feilutsatt, og hopper ofte over sikkerhetskontroller.

### Hva vi oppnår ved å løse det
Automatisk kvalitetssikring på hver kodeendring.

### Hvordan vi går frem

**Enkel pipeline:**

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  Push   │───►│  Build  │───►│  Test   │───►│ Deploy  │
│  code   │    │         │    │         │    │         │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
```

**Utvidet pipeline med sikkerhet:**

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  Push   │───►│ Secret  │───►│  Build  │───►│  Test   │───►│  SAST   │
│  code   │    │  Scan   │    │         │    │ (unit)  │    │         │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
                                                                  │
                                                                  ▼
                                            ┌─────────┐    ┌─────────┐
                                            │ Deploy  │◄───│   SCA   │
                                            │  Prod   │    │         │
                                            └─────────┘    └─────────┘
```

**Plattformer:**

| Plattform | CI/CD | Egnet for |
|-----------|-------|-----------|
| **Vercel** | Auto | Next.js, React |
| **Netlify** | Auto | Static sites |
| **GitHub Actions** | Fleksibel | Alt |

---

## 7.2 Sikkerhetsskanning

### Hva dette punktet består av
Automatiserte verktøy som finner sikkerhetsproblemer i koden.

### Hva problemet er
Mennesker overser sikkerhetsproblemer. Automatisert skanning fanger opp ting vi glemmer.

### Hva vi oppnår ved å løse det
Kontinuerlig sikkerhetskontroll uten manuell innsats.

### Hvordan vi går frem

**Typer sikkerhetsskanning:**

| Type | Hva det gjør | Når | Verktøy |
|------|--------------|-----|---------|
| **Secret Scanning** | Finner hardkodede hemmeligheter | Pre-commit + CI | Gitleaks |
| **SAST** | Analyserer kildekode | Build-fase | Semgrep |
| **SCA** | Skanner avhengigheter | Build-fase | Snyk, Dependabot |
| **DAST** | Tester kjørende app | Etter deploy | OWASP ZAP |

**Prioritert implementering:**

1. 🔴 **Secret scanning** - Fanger API-nøkler før commit
2. 🔴 **SCA / Dependency scanning** - Finner kjente sårbarheter
3. 🟡 **SAST** - Finner kodefeil
4. 🟢 **DAST** - Finner runtime-problemer

**GitHub Actions eksempel:**

```yaml
name: Security

on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Secret scanning
      - name: Gitleaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      # Dependency scanning
      - name: Trivy
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          severity: 'CRITICAL,HIGH'
```

---

## 7.3 Supply Chain Security

### Hva dette punktet består av
Beskyttelse mot angrep gjennom tredjepartspakker og avhengigheter.

### Hva problemet er
Moderne applikasjoner har hundrevis av avhengigheter. Hvis én kompromitteres, er appen din sårbar. (Eksempler: Log4Shell, SolarWinds)

### Hva vi oppnår ved å løse det
Beskyttelse mot en av de raskest voksende angrepsvektorene.

### Hvordan vi går frem

**Supply Chain sjekkliste:**

```markdown
## Ved valg av avhengigheter
- [ ] Er pakken aktivt vedlikeholdt?
- [ ] Hvor mange ukentlige nedlastinger?
- [ ] Har pakken kjente sårbarheter?
- [ ] Er maintaineren pålitelig?

## I utvikling
- [ ] Bruk lock-filer (package-lock.json)
- [ ] Pin eksakte versjoner for kritiske pakker
- [ ] Kjør npm audit regelmessig
- [ ] Aktiver Dependabot for automatiske oppdateringer

## I CI/CD
- [ ] Automatisk SCA-skanning
- [ ] Blokker builds med kritiske sårbarheter
```

---

## 7.4 SBOM

### Hva dette punktet består av
Software Bill of Materials - en komplett liste over alle komponenter i applikasjonen.

### Hva problemet er
Uten SBOM vet man ikke hvilke pakker som brukes, noe som gjør det vanskelig å reagere på sikkerhetsvarsler.

### Hva vi oppnår ved å løse det
Rask identifikasjon av sårbare komponenter når nye CVE-er oppdages.

### Hvordan vi går frem

**Når trenger du SBOM?**

| Prosjekttype | SBOM nødvendig? |
|--------------|-----------------|
| Hobby/MVP | Nei |
| Startup B2C | Sannsynligvis nei |
| B2B SaaS | Økende krav |
| Enterprise/Government | Ja |

**Generere SBOM:**

```bash
# Med Trivy
trivy fs --format cyclonedx --output sbom.json .
```

---

## 7.5 Miljøer og deployment

### Hva dette punktet består av
Separate miljøer for utvikling, testing og produksjon.

### Hva problemet er
Uten separate miljøer tester man på live data, noe som er risikabelt.

### Hva vi oppnår ved å løse det
Sikker testing uten å påvirke ekte brukere.

### Hvordan vi går frem

**Standard miljøer:**

| Miljø | Formål | Data | Tilgang |
|-------|--------|------|---------|
| **Development** | Lokal utvikling | Fake/mock | Utvikler |
| **Staging** | Testing før prod | Anonymisert kopi | Team |
| **Production** | Live | Ekte data | Alle brukere |

**Deployment-strategier:**

| Strategi | Beskrivelse | Risiko |
|----------|-------------|--------|
| **Direct** | Erstatt gammel versjon | Høy (nedetid) |
| **Blue/Green** | Bytt mellom to miljøer | Lav |
| **Feature flags** | Kontroller features separat | Lav |

**For vibekoding MVP:** Direct deployment er OK. Legg til feature flags for viktige funksjoner.

---

## 7.6 Overvåking og logging

### Hva dette punktet består av
Systemer for å oppdage problemer og forstå hva som skjer i produksjon.

### Hva problemet er
Uten overvåking vet du ikke om noe er galt før brukere klager.

### Hva vi oppnår ved å løse det
Proaktiv problemløsning og sikkerhetsoversikt.

### Hvordan vi går frem

**Hva bør overvåkes:**

```markdown
## Overvåking sjekkliste

### Tilgjengelighet
- [ ] Oppetid (uptime monitoring)
- [ ] Responstid
- [ ] Error rate

### Sikkerhet
- [ ] Feilede innloggingsforsøk
- [ ] Uautoriserte API-kall
- [ ] Unormale trafikkmønstre
```

**Verktøy:**

| Formål | Verktøy | Gratis |
|--------|---------|--------|
| Error tracking | Sentry | Ja |
| Uptime | UptimeRobot | Ja |
| Analytics | Plausible | Ja |

**Sikker logging:**

```markdown
## Logging-regler

ALDRI logg:
- Passord
- Kredittkortinfo
- API-nøkler
- Personnummer
- Sensitive personopplysninger

ALLTID logg:
- Innlogging/utlogging (bruker-ID, tidspunkt)
- Autorisasjonsnektelser
- Kritiske operasjoner
- Feil (uten sensitiv data)
```

---

# 8. Governance og Ansvar

## 8.1 Roller og ansvar

### Hva dette punktet består av
Tydelig definering av hvem som har ansvar for hva i sikkerhet og arkitektur.

### Hva problemet er
Uten klare roller blir viktige oppgaver liggende ugjort fordi "noen andre" skal gjøre det.

### Hva vi oppnår ved å løse det
Tydelig ansvarsfordeling og accountability.

### Hvordan vi går frem

**Roller i vibekoding-prosjekt:**

| Rolle | Ansvar | Typisk person |
|-------|--------|---------------|
| **Prosjektleder** | Overordnet ansvar, beslutninger | Deg |
| **AI-assistent** | Kodeimplementering, forslag | Claude/ChatGPT |
| **Sikkerhetsreviewer** | Sjekke kritisk kode | Deg + eventuelt ekspert |
| **Stakeholder** | Godkjenne beslutninger | Deg/oppdragsgiver |

**Ansvar per aktivitet:**

| Aktivitet | Ansvarlig | Godkjenner |
|-----------|-----------|------------|
| Tech stack-valg | Prosjektleder + AI | Prosjektleder |
| Arkitekturbeslutninger | AI (forslag) | Prosjektleder |
| Trusselmodellering | Prosjektleder + AI | Prosjektleder |
| Sikkerhetskode | AI (implementering) | Prosjektleder |
| Produksjons-deploy | Prosjektleder | Prosjektleder |

---

## 8.2 Godkjenningsprosesser

### Hva dette punktet består av
Definerte sjekkpunkter der beslutninger må godkjennes.

### Hva problemet er
Uten godkjenningsprosesser kan kritiske endringer gå i produksjon uten tilstrekkelig vurdering.

### Hva vi oppnår ved å løse det
Kvalitetssikring av viktige beslutninger.

### Hvordan vi går frem

**Godkjenningspunkter:**

| Beslutning | Krever godkjenning fra |
|------------|------------------------|
| Tech stack-valg | Prosjektleder |
| Ny tredjepartsintegrasjon | Prosjektleder |
| Sikkerhetskritisk funksjon | Prosjektleder + eventuelt ekspert |
| Produksjons-deploy | Prosjektleder |
| Endring i databehandling | Prosjektleder + personvernansvarlig |

---

## 8.3 Eskaleringsrutiner

### Hva dette punktet består av
Definerte regler for når man skal søke ekstern hjelp.

### Hva problemet er
Uten klare eskaleringsrutiner risikerer man å ta feil beslutninger på områder man ikke behersker.

### Hva vi oppnår ved å løse det
Riktig kompetanse på riktig tidspunkt.

### Hvordan vi går frem

**Når eskalere til ekspert:**

| Situasjon | Handling |
|-----------|----------|
| Usikker på sikkerhetsimplikasjoner | Konsulter sikkerhetsekspert |
| AI gir motstridende råd | Få second opinion |
| Prosjektet håndterer betalinger | Konsulter fintech-ekspert |
| Sensitive helsedata | Konsulter helsedata-ekspert |
| Uklare GDPR-krav | Konsulter personvern-jurist |

**Røde flagg som krever eskalering:**

- AI-assistenten sier "jeg er ikke sikker på sikkerhetsimplikasjonene"
- Koden håndterer kredittkortdata direkte
- Du implementerer kryptografi fra scratch
- Du er usikker på om løsningen overholder lover/regler

---

## 8.4 Dokumentasjonsvedlikehold

### Hva dette punktet består av
Rutiner for å holde dokumentasjon oppdatert over tid.

### Hva problemet er
Utdatert dokumentasjon er verre enn ingen dokumentasjon fordi den er villedende.

### Hva vi oppnår ved å løse det
Dokumentasjon som alltid reflekterer virkeligheten.

### Hvordan vi går frem

**Vedlikeholdsrutiner:**

| Trigger | Handling |
|---------|----------|
| Ny funksjon | Oppdater SPEC.md, eventuelt trusselmodell |
| Arkitekturendring | Oppdater TDD, lag ny ADR |
| Ny integrasjon | Oppdater tredjepartsoversikt |
| Kvartalsvis | Full gjennomgang av alle dokumenter |
| Sikkerhetshendelse | Oppdater trusselmodell |

**Versjonskontroll:**

```markdown
## Dokumenthistorikk

| Versjon | Dato | Endring | Ansvarlig |
|---------|------|---------|-----------|
| 1.0 | 2026-01-15 | Første versjon | [Navn] |
| 1.1 | 2026-02-01 | La til Stripe-integrasjon | [Navn] |
```

---

# 9. Ikke-funksjonelle Krav

## 9.1 Ytelse

### Hva dette punktet består av
Krav til hvor rask og responsiv applikasjonen skal være.

### Hva problemet er
Trege applikasjoner frustrerer brukere og fører til frafall.

### Hva vi oppnår ved å løse det
God brukeropplevelse og fornøyde brukere.

### Hvordan vi går frem

**Ytelseskrav mal:**

```markdown
## Ytelseskrav

### Responstid
- Sidelast: < 3 sekunder
- API-kall: < 500ms for 95% av forespørsler
- Søk: < 1 sekund

### Kapasitet
- Samtidige brukere: [antall]
- Forespørsler per sekund: [antall]

### Måling
- Verktøy: [Lighthouse, WebPageTest]
- Frekvens: [Ukentlig/Ved release]
```

---

## 9.2 Skalerbarhet

### Hva dette punktet består av
Evne til å håndtere vekst i brukere og data.

### Hva problemet er
Apper som ikke skalerer kollapser ved suksess.

### Hva vi oppnår ved å løse det
System som tåler vekst uten total ombygging.

### Hvordan vi går frem

**Skalerbarhetsvurdering:**

```markdown
## Skalerbarhetsstrategi

### Nåværende kapasitet
- Brukere: [antall]
- Data: [størrelse]

### Forventet vekst
- 6 måneder: [antall brukere]
- 1 år: [antall brukere]

### Skaleringsstrategi
- Vertikal: Større server (enkelt, begrenset)
- Horisontal: Flere servere (komplekst, ubegrenset)

### Flaskehalser identifisert
1. [Komponent] - kan skaleres ved [tiltak]
```

---

## 9.3 Tilgjengelighet (Accessibility)

### Hva dette punktet består av
Krav for at applikasjonen skal være brukbar for personer med funksjonsnedsettelser.

### Hva problemet er
Utilgjengelige apper ekskluderer brukere og kan bryte med lovkrav.

### Hva vi oppnår ved å løse det
Inkluderende produkt som alle kan bruke.

### Hvordan vi går frem

**WCAG-sjekkliste (forenklet):**

```markdown
## Tilgjengelighet (WCAG 2.1 AA)

### Synlighet
- [ ] Tilstrekkelig kontrast (4.5:1 for tekst)
- [ ] Tekst kan forstørres 200% uten funksjonalitetstap
- [ ] Ikke kun farge for å formidle informasjon

### Navigering
- [ ] Fungerer med tastatur alene
- [ ] Fokusindikator er synlig
- [ ] Hoppe-til-innhold lenke

### Skjermleser
- [ ] Alle bilder har alt-tekst
- [ ] Skjemafelt har labels
- [ ] Meningsfull overskriftshierarki

### Testing
- [ ] Test med Lighthouse accessibility audit
- [ ] Test med tastaturnavigering
- [ ] Test med skjermleser (VoiceOver/NVDA)
```

---

## 9.4 Pålitelighet

### Hva dette punktet består av
Krav til oppetid og feilhåndtering.

### Hva problemet er
Upålitelige systemer mister brukernes tillit.

### Hva vi oppnår ved å løse det
System brukerne kan stole på.

### Hvordan vi går frem

**Pålitelighetskrav:**

```markdown
## Pålitelighetskrav

### Oppetid
- Mål: [99.9% = 8.7 timer nedetid/år]
- Planlagt vedlikehold: [Når, varsling]

### Feilhåndtering
- Graceful degradation for ikke-kritiske funksjoner
- Tydelige feilmeldinger til brukere
- Automatisk gjenopprettingsforsøk

### Backup og recovery
- Backup-frekvens: [Daglig]
- Recovery Point Objective: [Hvor mye datatap ok?]
- Recovery Time Objective: [Hvor lang nedetid ok?]
```

---

## 9.5 Vedlikeholdbarhet

### Hva dette punktet består av
Hvor enkelt det er å forstå, endre og utvide koden.

### Hva problemet er
Kode som er vanskelig å vedlikeholde blir stadig dyrere å jobbe med over tid.

### Hva vi oppnår ved å løse det
Kode som forblir håndterbar over tid.

### Hvordan vi går frem

**Vedlikeholdbarhet sjekkliste:**

```markdown
## Vedlikeholdbarhet

### Kodestandard
- [ ] Konsistent navngivning
- [ ] Kommentarer på kompleks logikk
- [ ] TypeScript for typesikkerhet

### Struktur
- [ ] Separasjon av ansvar
- [ ] Ingen sirkulære avhengigheter
- [ ] Testbar kode

### Dokumentasjon
- [ ] README med oppsettinstruksjoner
- [ ] API-dokumentasjon
- [ ] ADR for viktige beslutninger
```

---

# 10. Leveranser og Maler

## 10.1 Oversikt over leveranser

### Hva dette punktet består av
Liste over dokumenter som skal være ferdige når Fase 3 er fullført.

### Hva problemet er
Uten klare leveranser vet man ikke når fasen er ferdig.

### Hva vi oppnår ved å løse det
Tydelige milepæler og kvalitetskrav.

### Hvordan vi går frem

**Obligatoriske leveranser:**

| Leveranse | Beskrivelse | Fil |
|-----------|-------------|-----|
| Teknisk Design Dokument | Hovedspesifikasjon | `TDD.md` |
| Trusselmodell | Identifiserte trusler og tiltak | `THREAT-MODEL.md` |
| SPEC.md | Kortversjon for AI-kontekst | `SPEC.md` |
| Minst én ADR | Dokumentert arkitekturbeslutning | `adr/001-xxx.md` |

**Mappestruktur:**

```
/docs
├── TDD.md                    # Teknisk Design Dokument
├── THREAT-MODEL.md           # Trusselmodell
├── SPEC.md                   # Kort spec for AI
├── /adr                      # Arkitekturbeslutninger
│   ├── 001-database-valg.md
│   └── 002-auth-provider.md
└── /diagrams                 # Visuelle diagrammer
```

---

## 10.2 Mal: Teknisk Design Dokument (TDD)

```markdown
# Teknisk Design Dokument: [Prosjektnavn]

## 1. Dokumentinfo

| Felt | Verdi |
|------|-------|
| Versjon | 1.0 |
| Dato | [YYYY-MM-DD] |
| Forfatter | [Navn] |
| Status | [Utkast/Godkjent] |

## 2. Sammendrag
[2-3 setninger som oppsummerer produktet og viktigste tekniske valg]

## 3. Kontekst

### 3.1 Forretningskontekst
[Kort om hva produktet løser - fra Fase 1]

### 3.2 Krav
[Referanse til kravspesifikasjon fra Fase 2]

### 3.3 Begrensninger
- Budsjett: [Beskrivelse]
- Tidslinje: MVP innen [dato]
- Tekniske begrensninger: [Liste]

## 4. Tech Stack

| Lag | Teknologi | Versjon | Begrunnelse |
|-----|-----------|---------|-------------|
| Frontend | [Next.js] | [14.x] | [Hvorfor] |
| Backend | [Supabase] | [Latest] | [Hvorfor] |
| Database | [PostgreSQL] | [15] | [Hvorfor] |
| Hosting | [Vercel] | N/A | [Hvorfor] |
| Auth | [Supabase Auth] | N/A | [Hvorfor] |

## 5. Systemarkitektur

### 5.1 Arkitekturdiagram
```
[ASCII-diagram]
```

### 5.2 Hovedkomponenter
| Komponent | Ansvar | Teknologi |
|-----------|--------|-----------|
| [Komponent] | [Hva den gjør] | [Tech] |

## 6. Prosjektstruktur
```
/src
├── /app
├── /components
├── /lib
└── /types
```

## 7. Database-design

### 7.1 Tabeller
#### users
| Felt | Type | Beskrivelse |
|------|------|-------------|
| id | UUID | Primærnøkkel |
| email | TEXT | Unik |

## 8. API-design

| Metode | Endepunkt | Beskrivelse | Auth |
|--------|-----------|-------------|------|
| GET | /api/users | Hent brukerliste | Admin |
| POST | /api/posts | Opprett post | User |

## 9. Sikkerhet
Se [THREAT-MODEL.md] for komplett analyse.

### 9.1 Autentisering
[Beskrivelse]

### 9.2 Autorisering
[Roller og rettigheter]

## 10. CI/CD
[Pipeline-beskrivelse]

## 11. Åpne spørsmål
| # | Spørsmål | Eier | Frist |
|---|----------|------|-------|
| 1 | [Spørsmål] | [Navn] | [Dato] |

---
Sist oppdatert: [DATO]
```

---

## 10.3 Mal: Trusselmodell

```markdown
# Trusselmodell: [Prosjektnavn]

## 1. Dokumentinfo
| Felt | Verdi |
|------|-------|
| Versjon | 1.0 |
| Dato | [YYYY-MM-DD] |
| Metode | OWASP 4Q + STRIDE + DREAD |

## 2. OWASP Fire Spørsmål

### Hva bygger vi?
- Type: [webapp/mobilapp/etc.]
- Brukere: [hvem]
- Sensitiv data: [hva]

### Hva kan gå galt?
[Liste over identifiserte trusler]

### Hva gjør vi med det?
[Tiltak per trussel]

### Gjorde vi en god jobb?
[Verifiseringsstatus]

## 3. Assets (verdier)
| Asset | Kritikalitet |
|-------|--------------|
| Brukerdata | Høy |
| Passord-hasher | Kritisk |

## 4. STRIDE-analyse

### S - Spoofing
| ID | Trussel | DREAD | Tiltak | Status |
|----|---------|-------|--------|--------|
| S1 | Session hijacking | 7.2 | HttpOnly cookies | Planlagt |

### T - Tampering
| ID | Trussel | DREAD | Tiltak | Status |
|----|---------|-------|--------|--------|
| T1 | SQL injection | 8.6 | Parameteriserte queries | Planlagt |

[... gjenta for R, I, D, E ...]

## 5. LINDDUN (personvern)
[Hvis relevant for GDPR]

## 6. Risikomatrise

|                        | Lav | Medium | Høy |
|------------------------|-----|--------|-----|
| **Høy sannsynlighet**  |     | S1     | T1  |
| **Medium**             |     |        |     |
| **Lav**                |     |        |     |

## 7. Handlingsplan
| Prioritet | ID | Tiltak | Ansvarlig | Frist |
|-----------|----|--------|-----------|-------|
| 1 (Kritisk) | T1 | Parameteriserte queries | Dev | MVP |

---
Sist oppdatert: [DATO]
```

---

## 10.4 Mal: SPEC.md

```markdown
# SPEC.md - [Prosjektnavn]

## Prosjektbeskrivelse
[1-2 setninger]

## Tech Stack
- Frontend: [Tech]
- Backend: [Tech]
- Database: [Tech]
- Auth: [Tech]
- Hosting: [Tech]

## Hovedfunksjoner
1. [Funksjon 1]
2. [Funksjon 2]
3. [Funksjon 3]

## Datamodell
- User: id, email, name, role
- [Entity 2]: [felt]

## API-endepunkter
- GET /api/[resource] - [beskrivelse]
- POST /api/[resource] - [beskrivelse]

## Sikkerhetskrav
- Autentisering: [metode]
- Autorisering: [roller]
- Kryptering: HTTPS + [database]
- Input-validering: [bibliotek]

## Prosjektstruktur
```
/src
  /app - Next.js app router
  /components - React komponenter
  /lib - Hjelpefunksjoner
```

## Konvensjoner
- Filnavn: kebab-case
- Komponenter: PascalCase
- Funksjoner: camelCase

## Viktige regler
1. Aldri hardkode secrets
2. Alltid valider input på server
3. Bruk TypeScript strict mode
4. [Prosjektspesifikke regler]

---
Oppdatert: [DATO]
```

---

## 10.5 Mal: ADR

```markdown
# ADR-[NNN]: [Tittel]

## Status
[Foreslått | Godkjent | Avvist | Erstattet]

## Kontekst
[Beskriv problemet]

## Beslutning
[Beskriv beslutningen]

## Alternativer vurdert

### Alternativ 1: [Navn]
- Fordeler: [Liste]
- Ulemper: [Liste]

### Alternativ 2: [Navn]
- Fordeler: [Liste]
- Ulemper: [Liste]

## Konsekvenser

### Positive
- [Konsekvens]

### Negative
- [Konsekvens]

---
Dato: [YYYY-MM-DD]
Besluttet av: [Navn]
```

---

## 10.6 Komplett sjekkliste

```markdown
# Fase 3 Komplett Sjekkliste

## AI-sikkerhet (Seksjon 2)
- [ ] Forstått risikoen ved AI-generert kode
- [ ] SAST-skanning konfigurert
- [ ] Secret-skanning konfigurert
- [ ] Prosess for manuell review av sikkerhetskritisk kode

## Tech Stack (Seksjon 3)
- [ ] Tech stack valgt og dokumentert
- [ ] Alternativer vurdert
- [ ] Begrunnelse dokumentert

## Arkitektur (Seksjon 4)
- [ ] Systemarkitektur valgt
- [ ] Arkitekturdiagram laget
- [ ] Prosjektstruktur definert
- [ ] Minst én ADR dokumentert

## Trusselmodellering (Seksjon 5)
- [ ] OWASP 4 spørsmål besvart
- [ ] STRIDE-analyse gjennomført
- [ ] Trusler rangert med DREAD
- [ ] LINDDUN vurdert (hvis GDPR-relevant)
- [ ] DFD med trust boundaries laget
- [ ] Tiltak definert for høy-risiko trusler

## Sikkerhet (Seksjon 6)
- [ ] Auth-løsning valgt (ikke egen implementering!)
- [ ] Roller og rettigheter definert
- [ ] Dataklassifisering gjennomført
- [ ] Krypteringsstrategi definert
- [ ] Input-valideringsstrategi definert
- [ ] GDPR-compliance vurdert
- [ ] Secrets management plan

## DevSecOps (Seksjon 7)
- [ ] CI/CD-pipeline konfigurert
- [ ] Sikkerhetsskanning i pipeline
- [ ] Dependabot/Renovate aktivert
- [ ] .gitignore inkluderer .env-filer

## Governance (Seksjon 8)
- [ ] Roller og ansvar definert
- [ ] Godkjenningsprosesser definert
- [ ] Eskaleringsrutiner definert

## Ikke-funksjonelle krav (Seksjon 9)
- [ ] Ytelseskrav definert
- [ ] Skalerbarhetsvurdering gjort
- [ ] Tilgjengelighetskrav (WCAG) vurdert

## Leveranser (Seksjon 10)
- [ ] TDD.md opprettet og utfylt
- [ ] THREAT-MODEL.md opprettet
- [ ] SPEC.md opprettet
- [ ] Minst én ADR dokumentert

## Kvalitet
- [ ] Dokumentene er forståelige for ikke-tekniske
- [ ] Alle kritiske beslutninger er begrunnet
- [ ] Åpne spørsmål er dokumentert
- [ ] Dokumentene er reviewet

## Godkjenning
- [ ] Stakeholders informert
- [ ] Klart for Fase 4

---

🎉 **Fase 3 er komplett!**

Gå videre til **Fase 4: MVP - Sett opp prosjektet - Første fungerende versjon**

**Før du starter Fase 4:**
1. Sørg for at SPEC.md er tilgjengelig for AI-assistenten
2. Ha TDD og THREAT-MODEL tilgjengelig for referanse
3. Del dokumentene med eventuelle teammedlemmer
```

---

# Vedlegg A: Prompt-maler for AI

## A.1 Tech Stack-valg

```
Jeg skal bygge [type app] med følgende krav:
- [Hovedfunksjonalitet]
- [Målgruppe]
- [Forventet trafikk/brukere]
- [Budsjett: lite/middels/stort]
- [Tidslinje: MVP på X uker]

Foreslå en tech stack som:
1. Er godt dokumentert (du kan hjelpe meg effektivt)
2. Har innebygd sikkerhet
3. Passer prosjektets størrelse
4. Er kostnadseffektiv for startfasen

For hver anbefaling, forklar:
- Hvorfor dette valget
- Alternativer jeg bør vurdere
- Potensielle ulemper
```

## A.2 Arkitekturdesign

```
Jeg bygger [type app] med [tech stack].

Foreslå:
1. Systemarkitektur (hvordan frontend, backend, database kommuniserer)
2. Prosjektstruktur (mapper og filer)
3. Dataflyt for hovedfunksjonene

Krav:
- Hold det enkelt for MVP
- Tydelig separering av ansvar
- Lett å utvide senere
- Følg beste praksis for [plattform]

Lag også et arkitekturdiagram med ASCII-art.
```

## A.3 Trusselmodellering

```
Jeg bygger [type app] med følgende arkitektur:
[Lim inn arkitekturdiagram]

Hovedfunksjoner:
- [Funksjon 1]
- [Funksjon 2]

Sensitiv data vi håndterer:
- [Type data 1]
- [Type data 2]

Gjennomfør en STRIDE-analyse:
1. Identifiser de 5-10 viktigste truslene
2. Ranger dem med DREAD (1-10 per kategori)
3. Foreslå konkrete tiltak for hver trussel
4. Marker hvilke som må fikses før MVP

Presenter i tabellformat.
```

## A.4 Sikkerhetskode-gjennomgang

```
Gjennomgå denne koden for sikkerhetsproblemer:

[LIM INN KODE]

Sjekk spesielt for:
1. SQL injection
2. XSS (Cross-Site Scripting)
3. Hardkodede secrets
4. Manglende input-validering
5. Usikker autentisering/autorisering
6. Sensitive data i logger

For hvert problem:
- Beskriv problemet
- Vis hvor i koden det er
- Foreslå konkret fiks
```

---

# Vedlegg B: Ordliste

| Begrep | Forklaring |
|--------|------------|
| **API** | Application Programming Interface - måte for systemer å snakke sammen |
| **Auth** | Autentisering - bekrefte hvem brukeren er |
| **Backend** | Server-siden, det brukeren ikke ser |
| **CI/CD** | Automatisk testing og publisering av kode |
| **CSRF** | Angrep som lurer bruker til å gjøre handlinger |
| **DFD** | Data Flow Diagram - viser hvordan data flyter |
| **DREAD** | Metode for å rangere trusler etter risiko |
| **Frontend** | Det brukeren ser og interagerer med |
| **GDPR** | EUs personvernlovgiving |
| **MFA/2FA** | Multi-faktor autentisering |
| **MVP** | Minimum Viable Product - enkleste versjon |
| **RBAC** | Role-Based Access Control - tilgang basert på rolle |
| **SAST** | Static Application Security Testing |
| **SCA** | Software Composition Analysis - skanning av avhengigheter |
| **STRIDE** | Metode for å identifisere trusler |
| **Tech Stack** | Samlingen av teknologier som brukes |
| **TDD** | Teknisk Design Dokument |
| **XSS** | Cross-Site Scripting - injisert JavaScript |

---

## 📚 Relaterte filer

### Fase 3-dokumenter:
- **[FASE-3-AI.md](Fase/FASE-3-AI.md)** - AI-instruksjoner for Fase 3
- **[READ-FASE-3-GUIDE.md](Fase/READ-FASE-3-GUIDE.md)** - Prosjektleder-guide for Fase 3

### Fase-navigering:
- **Forrige fase:** [Fase 2: Planlegg](../Fase%202%20-%20Planlegg/FASE-2-KOMPLETT.md)
- **Neste fase:** [Fase 4: MVP](../Fase%204%20-%20MVP/FASE-4-KOMPLETT.md)

### Relevante agenter:
- **[ARKITEKTUR-agent](../Agenter/agenter/prosess/3-ARKITEKTUR-agent.md)** - Hovedansvarlig for Fase 3: Arkitektur og sikkerhet
- **[TRUSSELMODELLERINGS-ekspert](../Agenter/agenter/ekspert/TRUSSELMODELLERINGS-ekspert.md)** - STRIDE-analyse
- **[GDPR-ekspert](../Agenter/agenter/ekspert/GDPR-ekspert.md)** - DPIA og personvern

### Systemdokumenter:
- **[READ-KIT-CC-BRUKERHÅNDBOK.md](../../READ-KIT-CC-BRUKERHÅNDBOK.md)** - Komplett guide til Kit CC
- **[agent-PHASE-GATES.md](../Agenter/agenter/system/agent-PHASE-GATES.md)** - Kvalitetsvalidering mellom faser

---

*Sist oppdatert: Januar 2026*
