# Fase 4: MVP - Sett opp prosjektet - Første fungerende versjon

> **Mål:** Bygge en fungerende versjon så raskt som mulig – med sikkerhet innebygd fra starten.

---

## Om dette dokumentet

**Målgruppe:** Dette dokumentet er skrevet for to lesere:
1. **Ikke-tekniske vibekodere/prosjektledere** som styrer utviklingsprosjekter med AI-verktøy
2. **AI-assistenter** som skal hjelpe med implementasjonen

**Hvordan bruke dokumentet:**
- Les innholdsfortegnelsen for å få oversikt
- Hvert punkt forklarer HVA, HVORFOR, VERDI og HVORDAN
- Bruk sjekklistene for å sikre at ingenting glemmes
- Referer til dette dokumentet når du gir instruksjoner til AI

**Symbolforklaring:**
- 🔴 **Kritisk** – Må være på plass før MVP kan lanseres
- 🟡 **Viktig** – Bør være på plass, kan utsettes kort tid
- 🟢 **Anbefalt** – Nice to have, gir ekstra verdi
- 💡 **Tips** – Praktiske råd og triks
- ⚠️ **Advarsel** – Viktige fallgruver å unngå
- 🤖 **AI-instruksjon** – Konkret tekst du kan gi til AI-assistenten

---

## 0. Input fra Fase 3

- Arkitektur designet (fra Fase 3: Arkitektur og sikkerhet)
- Trusselmodellering fullført
- Tech stack valgt og godkjent
- Sikkerhetstiltak definert
- Data flow diagram utgitt
- Basert på `Kit CC/Agenter/agenter/prosess/3-ARKITEKTUR-agent.md`

---

## Innholdsfortegnelse

### Forutsetninger
0. [Input fra Fase 3](#0-input-fra-fase-3)

### Del A: Grunnleggende forståelse
1. [Hva er MVP-fasen?](#1-hva-er-mvp-fasen)
2. [Vibe-kodingens muligheter og risikoer](#2-vibe-kodingens-muligheter-og-risikoer)

### Del B: Kritiske elementer (🔴)
3. [Prosjekt-setup med sikkerhet](#3--prosjekt-setup-med-sikkerhet)
4. [Moderne hemmelighets-håndtering](#4--moderne-hemmelighets-håndtering)
5. [Supply chain-sikkerhet og pakkevalidering](#5--supply-chain-sikkerhet-og-pakkevalidering)
6. [CI/CD med sikkerhetsskanning](#6--cicd-med-sikkerhetsskanning)
7. [Kjernefunksjonalitet med input-validering](#7--kjernefunksjonalitet-med-input-validering)
8. [API-sikkerhet og rate limiting](#8--api-sikkerhet-og-rate-limiting)
9. [Autentisering implementert](#9--autentisering-implementert)
10. [Happy path fungerer og er sikret](#10--happy-path-fungerer-og-er-sikret)
11. [Grunnleggende tester](#11--grunnleggende-tester)
12. [Verifisering av AI-generert kode](#12--verifisering-av-ai-generert-kode)

### Del C: Viktige elementer (🟡)
13. [Feilhåndtering (sikker)](#13--feilhåndtering-sikker)
14. [Logging (uten sensitiv data)](#14--logging-uten-sensitiv-data)
15. [Feature flags og kill switch](#15--feature-flags-og-kill-switch)
16. [README med sikkerhetsinstruksjoner](#16--readme-med-sikkerhetsinstruksjoner)
17. [Personvern ved bruk av AI-tjenester](#17--personvern-ved-bruk-av-ai-tjenester)
18. [Regulatoriske krav](#18--regulatoriske-krav)

### Del D: Anbefalte elementer (🟢)
19. [Dummy-data](#19--dummy-data)
20. [Rollback-strategi](#20--rollback-strategi)
21. [SBOM – Software Bill of Materials](#21--sbom--software-bill-of-materials)
22. [Zero Trust-prinsipper](#22--zero-trust-prinsipper)

### Del E: Plattformspesifikke hensyn
23. [Web-applikasjoner](#23--web-applikasjoner)
24. [Mobile apper (iOS/Android)](#24--mobile-apper-iosandroid)
25. [Chrome Extensions](#25--chrome-extensions)
26. [Desktop-apper](#26--desktop-apper)

### Del F: Leveranser og kvalitetssikring
27. [MVSP-sjekkliste (Minimum Viable Secure Product)](#27--mvsp-sjekkliste)
28. [Sjekkliste for prosjektleder](#28--sjekkliste-for-prosjektleder)
29. [Leveranser fra Fase 4](#29--leveranser-fra-fase-4)
30. [Suksessmålinger](#30--suksessmålinger)

### Vedlegg
- [A: Ordliste for ikke-tekniske](#vedlegg-a-ordliste-for-ikke-tekniske)
- [B: Ressurser og lenker](#vedlegg-b-ressurser-og-lenker)
- [C: Tidsestimater](#vedlegg-c-tidsestimater)

---

# 0. Input fra Fase 3

Før du starter Fase 4, må du ha følgende leveranser fra Fase 3:

## Obligatorisk
- **Teknisk Design Dokument (TDD.md)** inneholder:
  - Tech stack valgt og dokumentert
  - Systemarkitektur diagrammer
  - Database-design (tabeller, relasjoner)
  - API-design (endepunkter, metoder)
  - Prosjektstruktur definert

- **Trusselmodell (THREAT-MODEL.md)** inneholder:
  - Identifiserte sikkerhetstrusler
  - OWASP/STRIDE/DREAD risikovurdering
  - Mitigation-strategier for hver trussel
  - GDPR-relevantrisikoer

- **SPEC.md** – Kort spesifikasjonsfile for AI-kontekst

## Anbefalt
- **Minst én ADR (Architecture Decision Record)** – Dokumentert valg av teknologier
- **Diagrammer** av systemarkitektur (C4-modellen eller lignende)
- **Secrets-strategi dokumentert** – Hvordan hemmeligheter skal håndteres
- **CI/CD-plan** – Oversikt over automatisering

> **Hva gjøre hvis noe mangler?** Gå tilbake til Fase 3 og fullfør arkitekturdesignen. Fase 4 implementering avhenger av klare tekniske valg fra Fase 3. Å starte koding uten TDD og trusselmodell fører til sikkerhetshull og dyre omskrivinger.

---

### Automatisk tilpasning og verktøy

- **Intensitetstilpasning:** Prioriteringer og krav tilpasses automatisk basert på prosjektets klassifisering (Enkelt hobbyprosjekt → Stort kritisk system). Hva som er obligatorisk, anbefalt eller valgfritt avhenger av prosjekttypen.
- **Kit CC Monitor:** AI-assistenten bruker Kit CC Monitor (en lokal webserver) for å overvåke nettleserfeil, kjøre debug-probes og vise prosjektstatus i sanntid.
- **Automatisk logging:** All fremdrift logges automatisk til PROGRESS-LOG.md. Du trenger ikke gjøre noe — AI-en håndterer dette.

---

# Del A: Grunnleggende forståelse

## 1. Hva er MVP-fasen?

### Hva dette punktet består av

MVP (Minimum Viable Product) er den enkleste versjonen av produktet som fortsatt gir verdi til brukerne. I denne fasen bygger vi en fungerende prototype som:

- Demonstrerer at idéen fungerer i praksis
- Kan testes av ekte brukere for å få tilbakemeldinger
- Har grunnleggende sikkerhet på plass fra starten
- Danner grunnlaget for videre utvikling

### Hva problemet er

Mange starter å bygge uten å tenke på sikkerhet, og ender opp med å måtte gjøre store omskrivinger senere. Andre bruker så lang tid på å gjøre alt "perfekt" at de aldri får lansert. MVP-fasen handler om å finne balansen: bygge raskt, men trygt.

### Hva vi oppnår ved å løse det

| Uten god MVP-prosess | Med god MVP-prosess |
|---------------------|---------------------|
| Sikkerhetshull som må fikses senere (dyrt) | Sikkerhet innebygd fra start (billig) |
| Lang utviklingstid før feedback | Rask feedback fra brukere |
| Usikkerhet om idéen fungerer | Validert konsept |
| Teknisk gjeld fra dag én | Solid fundament å bygge på |

### Hvordan vi går frem

1. **Definer MVP-scope** – Hva er det absolutte minimum?
2. **Sett opp prosjektet riktig** – Med sikkerhet fra dag én
3. **Bygg kjernefunksjonaliteten** – Fokuser på én ting som fungerer
4. **Test med ekte brukere** – Få feedback tidlig
5. **Iterer basert på læring** – Juster kursen

### Annen viktig info

**For investorer:** 70% av investorer krever nå teknisk validering av AI-bygde MVPer før de vurderer finansiering. En godt strukturert MVP med synlig sikkerhetsfokus øker sjansene for finansiering betydelig.

**Tidsramme:** En typisk MVP bør kunne bygges på 2-6 uker avhengig av kompleksitet. Hvis det tar lengre tid, er scopet sannsynligvis for stort.

---

## 2. Vibe-kodingens muligheter og risikoer

### Hva dette punktet består av

"Vibe-koding" er et begrep skapt av AI-forsker Andrej Karpathy i februar 2025. Det beskriver en ny måte å utvikle programvare på der:

- Du beskriver hva du vil ha med naturlig språk
- AI-assistenten genererer koden
- Du veileder og justerer retningen
- Din rolle skifter fra "koder" til "kvalitetssikrer"

### Hva problemet er

Vibe-koding er kraftig, men kommer med betydelige risikoer som mange ikke er klar over:

**Statistikk som bør vekke oppmerksomhet:**

| Funn | Kilde |
|------|-------|
| 45% av vibe-kodet kode har utnyttbare sikkerhetsfeil | Veracode 2025 |
| 20% av AI-anbefalte pakker eksisterer ikke | Socket.dev |
| 66% av utviklere bruker tid på å fikse "nesten riktig" AI-kode | JetBrains 2025 |
| Java-kode fra AI har 70%+ feilrate på sikkerhetstester | Veracode 2025 |

**Vanlige problemer:**
- AI "hallusinerer" pakkenavn som ikke finnes
- Sikkerhetskritisk kode mangler validering
- Utdaterte biblioteker med kjente sårbarheter foreslås
- Hemmeligheter hardkodes direkte i koden

### Hva vi oppnår ved å løse det

Ved å forstå og håndtere risikoene kan du utnytte fordelene:

| Fordel | Forutsetning |
|--------|--------------|
| 90% av utviklere sparer minst 1 time/uke | God prompt-teknikk |
| 20% sparer 8+ timer/uke | Systematisk kvalitetssikring |
| Rask prototyping og eksperimentering | Sikkerhetsfokus fra start |
| Lavere terskel for å bygge | Forståelse av begrensninger |

### Hvordan vi går frem

**Gyllen regel for vibe-koding:**

> "Behandle AI-generert kode som kode fra en junior utvikler –
> den trenger alltid review før den brukes."

**Praktiske tiltak:**

1. **Bruk sikkerhetsfokuserte prompts** – Spesifiser sikkerhetskrav eksplisitt
2. **Verifiser alle pakker** – Sjekk at de faktisk eksisterer
3. **Kjør statisk analyse** – La verktøy finne problemer automatisk
4. **Del opp i små moduler** – Lettere å verifisere
5. **Test sikkerhetskritisk kode ekstra** – Spesielt autentisering og databehandling

### Annen viktig info

**"Productivity tax":** Mange opplever at tiden spart på koding spises opp av debugging. For å unngå dette:
- Vær presis i beskrivelsene til AI
- Be om forklaringer, ikke bare kode
- Test underveis, ikke bare på slutten

**Når du IKKE bør stole på AI alene:**
- Autentisering og tilgangskontroll
- Kryptering og sikker datahåndtering
- Betalingsintegrasjoner
- Behandling av personopplysninger

---

# Del B: Kritiske elementer (🔴)

## 3. 🔴 Prosjekt-setup med sikkerhet

### Hva dette punktet består av

Å sette opp utviklingsmiljøet riktig fra dag én, med verktøy og innstillinger som automatisk hjelper deg unngå vanlige feil og sikkerhetsproblemer.

**Komponenter i et godt setup:**

| Komponent | Hva det gjør | Eksempler |
|-----------|--------------|-----------|
| **Linting** | Finner feil og dårlig praksis automatisk | ESLint, Prettier |
| **Sikkerhetslinting** | Finner sikkerhetsproblemer i koden | eslint-plugin-security |
| **Type-sjekking** | Fanger typefeil før kjøring | TypeScript |
| **Sikre defaults** | Trygge standardinnstillinger | Secure cookies, HTTPS |
| **Versjonskontroll** | Sporer alle endringer | Git + GitHub |
| **Branch-beskyttelse** | Forhindrer direkte push til main | GitHub branch rules |

### Hva problemet er

Uten riktig setup fra starten vil du:
- Manuelt måtte finne feil som verktøy kunne fanget
- Risikere å committe hemmeligheter til Git (skjer oftere enn du tror)
- Bruke inkonsistent kodestil som gjør vedlikehold vanskelig
- Ikke ha historikk over endringer når noe går galt

**Reelle konsekvenser:**
- Hackere har roboter som søker GitHub etter eksponerte API-nøkler 24/7
- Én eksponert AWS-nøkkel kan koste hundretusenvis i løpet av timer
- 110,000+ domener ble kompromittert via eksponerte .env-filer i 2024

### Hva vi oppnår ved å løse det

- ✅ Automatisk oppdagelse av feil før de blir problemer
- ✅ Sikkerhet som "default" – du må aktivt velge å være usikker
- ✅ Konsistent kodebase som er lettere å vedlikeholde
- ✅ Trygghet om at hemmeligheter ikke lekker

### Hvordan vi går frem

**Steg 1: Initialiser prosjektet med riktige verktøy**

🤖 **AI-instruksjon:**
```
Sett opp et nytt [Next.js/React/etc] prosjekt med:
- TypeScript for typesikkerhet
- ESLint med eslint-plugin-security
- Prettier for konsistent formatering
- En komplett .gitignore som ekskluderer alle hemmeligheter
- En .env.example fil med plassholdere (aldri ekte verdier)
```

**Steg 2: Konfigurer .gitignore**

Denne filen forteller Git hvilke filer som ALDRI skal lastes opp:

```gitignore
# Hemmeligheter (KRITISK!)
.env
.env.local
.env.*.local
.env.production
*.pem
*.key
secrets/

# Avhengigheter
node_modules/
vendor/
.venv/
__pycache__/

# Byggefiler
.next/
dist/
build/
out/
*.apk
*.ipa

# IDE og system
.vscode/
.idea/
*.swp
.DS_Store
Thumbs.db

# Logger og cache
*.log
npm-debug.log*
.cache/

# Test-coverage
coverage/
.nyc_output/
```

**Steg 3: Lag .env.example**

```bash
# ===========================================
# KOPIER DENNE TIL .env.local
# Fyll inn ekte verdier (aldri commit .env.local!)
# ===========================================

# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# Autentisering
AUTH_SECRET="generer-med: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Tredjepartstjenester
STRIPE_SECRET_KEY="sk_test_..."
SENDGRID_API_KEY="SG..."

# Feature flags
FEATURE_NEW_CHECKOUT="false"
```

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Moderat | Viktig | Kritisk | Kritisk |

**Vanlige feil å unngå:**
- ❌ Legge API-nøkler direkte i koden
- ❌ Committe .env-filer til Git (selv "bare for testing")
- ❌ Bruke samme hemmeligheter i utvikling og produksjon
- ❌ Hoppe over linting fordi "det tar tid"
- ❌ Kopiere .env.example med ekte verdier

💡 **Tips:** Installer en pre-commit hook som blokkerer commits med hemmeligheter. Be AI-assistenten om å sette dette opp.

---

## 4. 🔴 Moderne hemmelighets-håndtering

### Hva dette punktet består av

Hemmeligheter er sensitive data som systemet ditt trenger for å fungere:
- API-nøkler til tredjepartstjenester
- Databasepassord
- Krypteringsnøkler
- Autentiseringstokens

Moderne hemmelighets-håndtering går utover tradisjonelle .env-filer og inkluderer:
- Sikker lagring med kryptering
- Tilgangskontroll (hvem kan se hva)
- Automatisk rotasjon av nøkler
- Audit-logging (hvem aksesserte når)

### Hva problemet er

**Tradisjonelle .env-filer har begrensninger:**

| Problem | Konsekvens |
|---------|------------|
| Ingen kryptering | Alle med filtilgang ser hemmelighetene |
| Ingen tilgangskontroll | Kan ikke begrense hvem som ser hva |
| Ingen rotasjon | Samme nøkler brukes i årevis |
| Lett å committe ved uhell | Én feil = eksponert for verden |
| Ingen audit trail | Vet ikke hvem som aksesserte |

**Statistikk:**
- 96% av organisasjoner sliter med "secrets sprawl" (hemmeligheter spredt overalt)
- Gjennomsnittlig kostnad for et databrudd: $4.88 millioner (2024)

### Hva vi oppnår ved å løse det

```
┌─────────────────────────────────────────────────────────────┐
│              FORBEDRET HEMMELIGHETS-HÅNDTERING               │
├─────────────────────────────────────────────────────────────┤
│  ✓ Hemmeligheter aldri i kildekode                          │
│  ✓ Kryptert lagring                                          │
│  ✓ Tilgangskontroll per miljø og person                      │
│  ✓ Automatisk rotasjon reduserer risiko                      │
│  ✓ Audit trail for compliance                                │
│  ✓ Enklere onboarding av nye teammedlemmer                  │
└─────────────────────────────────────────────────────────────┘
```

### Hvordan vi går frem

**Anbefalt tilnærming: Hybrid modell**

```
┌─────────────────────────────────────────────────────────────┐
│                    KONFIGURASJON                             │
├─────────────────────────────────────────────────────────────┤
│  .env / miljøvariabler         │  Secrets manager            │
│  (ok å ha i config)            │  (aldri i kode)             │
├────────────────────────────────┼────────────────────────────┤
│  ✓ NEXT_PUBLIC_API_URL         │  ✓ DATABASE_URL             │
│  ✓ LOG_LEVEL                   │  ✓ API-nøkler               │
│  ✓ FEATURE_FLAGS               │  ✓ Auth secrets             │
│  ✓ Portnummer                  │  ✓ Krypteringsnøkler        │
│  ✓ Miljø (dev/prod)            │  ✓ Tredjepartstokens        │
└────────────────────────────────┴────────────────────────────┘
```

**For MVP-fasen (minimum):**

1. Bruk `.env.local` lokalt (aldri commit)
2. Bruk hosting-plattformens miljøvariabler (Vercel, Netlify, etc.)
3. Bruk GitHub Secrets for CI/CD

🤖 **AI-instruksjon:**
```
Sett opp miljøvariabel-håndtering for prosjektet:
- .env.example med alle variabler (kun plassholdere, aldri ekte verdier)
- Instruksjoner for hvordan sette opp i Vercel/Netlify
- GitHub Actions som bruker secrets for testing
- Valider at alle påkrevde miljøvariabler finnes ved oppstart
```

**For skalering (anbefalt for produksjon):**

| Verktøy | Best for | Pris | Kompleksitet |
|---------|----------|------|--------------|
| **Doppler** | Utviklervennlig, god CI/CD | Gratis til 5 brukere | Lav |
| **Infisical** | Open source, kan selvhostes | Gratis (selvhostet) | Middels |
| **HashiCorp Vault** | Enterprise, full kontroll | Gratis (selvhostet) | Høy |
| **Vercel/Netlify env** | Enkel hosting-integrasjon | Inkludert | Lav |
| **GitHub Secrets** | CI/CD workflows | Inkludert | Lav |

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Basis | Viktig | Kritisk | Kritisk |

**Regler for hemmeligheter:**
1. Aldri hardkod i kildekode
2. Aldri logg hemmeligheter
3. Aldri send via e-post eller chat
4. Roter regelmessig (minst årlig)
5. Bruk ulike hemmeligheter per miljø

⚠️ **Advarsel:** Hvis du tror en hemmelighet er eksponert – roter den UMIDDELBART. Ikke vent og se.

---

## 5. 🔴 Supply chain-sikkerhet og pakkevalidering

### Hva dette punktet består av

"Supply chain" i programvare refererer til alle komponentene du bruker som du ikke har skrevet selv:
- npm-pakker (Node.js)
- pip-pakker (Python)
- Maven-avhengigheter (Java)
- Osv.

Supply chain-sikkerhet handler om å sikre at disse komponentene er:
- Ekte (ikke falske kopier)
- Trygge (ingen kjente sårbarheter)
- Oppdaterte (ikke utdaterte med sikkerhetshull)

### Hva problemet er

**"Slopsquatting" – AI-hallusinerte pakker:**

AI-assistenter "hallusinerer" pakkenavn som ikke eksisterer i 20% av tilfellene. Angripere utnytter dette ved å:
1. Observere hvilke falske pakkenavn AI-er foreslår
2. Publisere ondsinnede pakker med disse navnene
3. Vente på at utviklere installerer dem

**Store angrep i 2025:**

| Angrep | Dato | Konsekvens |
|--------|------|------------|
| s1ngularity | August 2025 | Nx build system kompromittert, stjal kryptovaluta og tokens |
| Shai-Hulud | September 2025 | 40+ npm-pakker inkl. @ctrl/tinycolor infisert |
| Shai-Hulud 2.0 | November 2025 | 25,000+ GitHub-repositories påvirket |

**Hva ondsinnede pakker kan gjøre:**
- Stjele miljøvariabler (inkludert hemmeligheter)
- Installere bakdører
- Kryptere filer (ransomware)
- Slette alt på maskinen (destruktiv malware)

### Hva vi oppnår ved å løse det

- ✅ Unngår å installere falske eller ondsinnede pakker
- ✅ Oppdager kjente sårbarheter før de utnyttes
- ✅ Har kontroll over hva som faktisk kjører i produksjon
- ✅ Kan reagere raskt når nye sårbarheter oppdages

### Hvordan vi går frem

**Steg 1: Verifiser pakker FØR installasjon**

Før du kjører `npm install [pakke]`:

```bash
# Sjekk at pakken finnes og er legitim
npm view [pakkenavn]

# Se etter:
# - Opprettelsesdato (nylig = mistenkelig)
# - Antall nedlastinger (få = risiko)
# - Vedlikeholder (kjent person/organisasjon?)
# - Repository (peker til ekte repo?)
```

**Steg 2: Bruk lock-filer**

Lock-filer (`package-lock.json`, `yarn.lock`) låser eksakte versjoner:

🤖 **AI-instruksjon:**
```
Sørg for at prosjektet bruker package-lock.json:
- Commit package-lock.json til Git
- Bruk "npm ci" i stedet for "npm install" i CI/CD
- Aldri slett lock-filen uten god grunn
```

**Steg 3: Kjør sikkerhetssjekker regelmessig**

```bash
# Sjekk for kjente sårbarheter
npm audit

# Automatisk fiks det som kan fikses
npm audit fix

# Se detaljert rapport
npm audit --json
```

**Steg 4: Aktiver automatiske sikkerhetsoppdateringer**

I GitHub: Gå til Settings → Security → Dependabot og aktiver:
- Dependabot alerts (varsler om sårbarheter)
- Dependabot security updates (automatiske PR-er med fiks)

**Steg 5: Vær ekstra forsiktig med AI-foreslåtte pakker**

| Sjekk | Hvordan |
|-------|---------|
| Eksisterer pakken? | `npm view [pakke]` |
| Er navnet riktig stavet? | Sammenlign med offisiell dokumentasjon |
| Har den nok nedlastinger? | <1000/uke = vær skeptisk |
| Er den aktivt vedlikeholdt? | Sjekk siste commit-dato |
| Hvem står bak? | Kjent organisasjon = tryggere |

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Viktig | Kritisk | Kritisk | Kritisk |

⚠️ **Advarsel:** CISA (US Cybersecurity Agency) publiserte i september 2025 et varsel om npm supply chain-angrep og anbefaler:
- Roter alle utvikler-credentials umiddelbart ved mistanke
- Bruk phishing-resistent MFA på alle utviklerkontoer
- Verifiser alle pakker før installasjon

💡 **Tips for prosjektledere:** Når AI foreslår å installere en pakke du ikke har hørt om – be om alternativer fra kjente kilder først.

---

## 6. 🔴 CI/CD med sikkerhetsskanning

### Hva dette punktet består av

**CI/CD forklart enkelt:**
- **CI (Continuous Integration):** Hver gang noen gjør en endring, kjøres automatiske tester og sjekker
- **CD (Continuous Deployment):** Hvis alt er OK, publiseres endringen automatisk

**Sikkerhetsskanning i CI/CD betyr:**
- Koden sjekkes for sikkerhetsproblemer automatisk
- Avhengigheter sjekkes for kjente sårbarheter
- Hemmeligheter som ved uhell er lagt i koden oppdages
- Alt dette skjer FØR koden når produksjon

### Hva problemet er

Uten CI/CD:
- Endringer må testes manuelt (tidkrevende, feilutsatt)
- Sikkerhetsproblemer oppdages først i produksjon (eller aldri)
- "Det funket på min maskin" – men krasjer hos brukerne
- Publisering blir risikabelt og stressende

Uten sikkerhetsskanning:
- Kjente sårbarheter går uoppdaget
- Hardkodede hemmeligheter lekker
- Utdaterte pakker med sikkerhetshull brukes

### Hva vi oppnår ved å løse det

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CI/CD PIPELINE                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   │
│  │  Push   │──▶│  Lint   │──▶│  Test   │──▶│  Scan   │──▶│ Deploy  │   │
│  │  kode   │   │ +Type   │   │         │   │         │   │         │   │
│  └─────────┘   └─────────┘   └────┬────┘   └────┬────┘   └────┬────┘   │
│                                   │             │             │         │
│                              Hvis feil:    Hvis funn:    Hvis ok:       │
│                              Stopp ❌      Vurder ⚠️     Deploy ✅      │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│  SIKKERHETSSKANNING INKLUDERER:                                          │
│  • SAST - Statisk kodeanalyse (finner sårbarheter i koden)              │
│  • Dependency scan - Sjekker pakker for kjente sårbarheter              │
│  • Secrets detection - Finner hardkodede hemmeligheter                  │
│  • License check - Sjekker open source-lisenser                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Hvordan vi går frem

**Enkleste setup (5 minutter):**

1. Push kode til GitHub
2. Koble til Vercel eller Netlify
3. Ferdig – auto-deploy ved hver push til main

**Med sikkerhetsskanning (30 minutter):**

🤖 **AI-instruksjon:**
```
Sett opp GitHub Actions for prosjektet med:
1. Lint og type-sjekking på hver push
2. Kjør tester automatisk
3. npm audit for dependency-sjekk
4. Secrets detection med trufflehog eller gitleaks
5. Deploy til Vercel/Netlify kun hvis alt passerer

Gi meg en komplett .github/workflows/ci.yml fil.
```

**Eksempel på CI/CD-workflow:**

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Test
        run: npm test

      - name: Build
        run: npm run build

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Sjekk for kjente sårbarheter i pakker
      - name: Run npm audit
        run: npm audit --audit-level=high

      # Sjekk for hardkodede hemmeligheter
      - name: Detect secrets
        uses: trufflesecurity/trufflehog@main
        with:
          extra_args: --only-verified

  deploy:
    needs: [quality, security]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

**Verktøy for sikkerhetsskanning:**

| Verktøy | Type | Pris | Kompleksitet |
|---------|------|------|--------------|
| **npm audit** | Dependency | Gratis | Lav |
| **Dependabot** | Dependency | Gratis (GitHub) | Lav |
| **Snyk** | Dependency + SAST | Gratis for open source | Middels |
| **Trivy** | Container + dependency | Gratis | Middels |
| **GitGuardian** | Secrets detection | Gratis for utviklere | Lav |
| **TruffleHog** | Secrets detection | Gratis | Lav |
| **SonarCloud** | SAST + code quality | Gratis for open source | Middels |

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Anbefalt | Viktig | Kritisk | Kritisk |

**Hosting-plattformer med enkel CI/CD:**

| Plattform | Best for | Auto-deploy |
|-----------|----------|-------------|
| **Vercel** | Next.js, React | ✅ Fra GitHub |
| **Netlify** | Statiske sider, JAMstack | ✅ Fra GitHub |
| **Railway** | Full-stack med database | ✅ Fra GitHub |
| **Render** | Backend, databaser | ✅ Fra GitHub |
| **Fly.io** | Containere, edge | Med config |

💡 **Tips:** Start med enkel CI/CD (auto-deploy fra GitHub) og legg til sikkerhetsskanning gradvis. Noe er bedre enn ingenting.

---

## 7. 🔴 Kjernefunksjonalitet med input-validering

### Hva dette punktet består av

**Kjernefunksjonalitet** er de mest essensielle funksjonene – det som må til for at brukeren kan gjøre hovedoppgaven.

**Input-validering** betyr å sjekke at data fra brukere er:
- Riktig type (tall er faktisk tall)
- Innenfor akseptable grenser (alder mellom 0 og 150)
- Riktig format (e-post har @)
- Renset for skadelig innhold (ingen script-kode)

### Hva problemet er

**Uten input-validering er systemet sårbart for:**

| Angrep | Beskrivelse | Konsekvens |
|--------|-------------|------------|
| **SQL Injection** | Ondsinnet SQL-kode i input | Datatyveri, datalekkasje |
| **XSS (Cross-Site Scripting)** | JavaScript i input | Kapring av brukersesjoner |
| **Command Injection** | Systemkommandoer i input | Full servertilgang |
| **Buffer Overflow** | For lange inputs | Systemkrasj, kode-eksekvering |

**Eksempel på SQL Injection:**
```
# Bruker skriver dette i brukernavn-feltet:
admin'; DROP TABLE users; --

# Uten validering kan dette slette hele brukertabellen!
```

### Hva vi oppnår ved å løse det

- ✅ Beskyttelse mot de vanligste angrepene (OWASP Top 10)
- ✅ Stabil applikasjon som ikke krasjer på uventet input
- ✅ Bedre brukeropplevelse med tydelige feilmeldinger
- ✅ Trygghet for at data i databasen er konsistent

### Hvordan vi går frem

**Gyllen regel:**

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   BRUKER ──▶ FRONTEND VALIDERING ──▶ BACKEND VALIDERING     │
│                    │                        │                │
│              For UX: Rask                For sikkerhet:      │
│              feedback til                Kan ikke omgås      │
│              brukeren                                        │
│                                                              │
│   ⚠️ Frontend-validering kan omgås! Backend er OBLIGATORISK │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Valideringssjekker du alltid trenger:**

| Sjekk | Beskrivelse | Eksempel |
|-------|-------------|----------|
| **Type** | Er datatypen riktig? | Alder skal være tall, ikke tekst |
| **Lengde** | Er lengden innenfor grenser? | Navn maks 100 tegn |
| **Format** | Er formatet korrekt? | E-post må ha @ |
| **Grenser** | Er verdien logisk? | Alder mellom 0-150 |
| **Sanitering** | Er farlige tegn håndtert? | Fjern/escape `<script>` |
| **Whitelist** | Er verdien tillatt? | Rolle må være "user" eller "admin" |

🤖 **AI-instruksjon:**
```
Implementer [funksjon] med følgende validering:
- Felt X: påkrevd, type string, maks 100 tegn, kun bokstaver og mellomrom
- Felt Y: valgfritt, må være gyldig URL hvis oppgitt
- Felt Z: påkrevd, type number, mellom 1-1000

Bruk Zod for validering. Valider både i frontend (for UX)
og backend (for sikkerhet). Vis brukervennlige norske feilmeldinger.
Aldri stol på frontend-validering alene.
```

**Eksempel med Zod (anbefalt bibliotek):**

```typescript
// lib/validations.ts
import { z } from 'zod';

// Gjenbrukbar e-post validering
const emailSchema = z.string()
  .email('Ugyldig e-postformat')
  .max(255, 'E-post kan ikke være lengre enn 255 tegn');

// Login-skjema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string()
    .min(8, 'Passord må være minst 8 tegn')
    .max(100, 'Passord kan ikke være lengre enn 100 tegn'),
});

// Bruk i API-route
export async function POST(request: Request) {
  const body = await request.json();

  const result = loginSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: 'Validering feilet', details: result.error.flatten() },
      { status: 400 }
    );
  }

  // Fortsett med validert og typesikker data
  const { email, password } = result.data;
}
```

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Viktig | Kritisk | Kritisk | Kritisk |

**Vanlige feil å unngå:**
- ❌ Stole kun på frontend-validering
- ❌ Bruke blacklist (blokkere kjente farlige ting) i stedet for whitelist (tillate kjente trygge ting)
- ❌ Vise tekniske feilmeldinger til brukeren
- ❌ Glemme å validere data fra "pålitelige" kilder (også andre systemer kan sende feil data)

💡 **Tips:** Be AI-assistenten generere valideringsskjemaer basert på datamodellen din. Gjenbruk skjemaer i både frontend og backend.

---

## 8. 🔴 API-sikkerhet og rate limiting

### Hva dette punktet består av

API (Application Programming Interface) er hvordan frontend snakker med backend, og hvordan systemet ditt snakker med andre systemer.

**API-sikkerhet inkluderer:**
- Autentisering (hvem er du?)
- Autorisasjon (hva har du lov til?)
- Rate limiting (hvor ofte kan du spørre?)
- Input-validering (er forespørselen gyldig?)
- Kryptering (er dataen beskyttet under transport?)

### Hva problemet er

**Uten API-sikkerhet kan angripere:**

| Angrep | Beskrivelse | Konsekvens |
|--------|-------------|------------|
| **Brute force** | Prøve tusenvis av passord | Konto-overtakelse |
| **Credential stuffing** | Bruke lekkede passord | Massiv konto-overtakelse |
| **DDoS** | Oversvømme med forespørsler | Systemet blir utilgjengelig |
| **Data scraping** | Hente ut all data automatisk | Datatyveri |
| **API abuse** | Misbruke betalte tjenester | Store kostnader |

**Eksempel på kostnad:**
- Uten rate limiting kan én angriper generere tusenvis av AI-kall
- Med OpenAI-priser kan dette koste hundretusenvis på timer

### Hva vi oppnår ved å løse det

- ✅ Beskyttelse mot automatiserte angrep
- ✅ Kontroll over ressursbruk og kostnader
- ✅ Stabil ytelse selv under høy last
- ✅ Trygghet for at kun autoriserte brukere har tilgang

### Hvordan vi går frem

**Steg 1: Implementer rate limiting**

Rate limiting begrenser hvor mange forespørsler en bruker/IP kan gjøre:

🤖 **AI-instruksjon:**
```
Implementer rate limiting for API-et med:
- Generelle endepunkter: 100 requests per minutt per IP
- Login-endepunkt: 5 forsøk per minutt per IP (brute force-beskyttelse)
- Sensitive endepunkter: 10 requests per minutt per bruker

Bruk upstash/ratelimit eller lignende bibliotek.
Returner HTTP 429 med Retry-After header ved overtramp.
```

**Steg 2: Sikre alle endepunkter**

```typescript
// Eksempel: Sikker API-route
export async function GET(request: Request) {
  // 1. Rate limiting
  const ip = getClientIP(request);
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return Response.json(
      { error: 'For mange forespørsler. Prøv igjen senere.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  // 2. Autentisering
  const session = await getServerSession();
  if (!session?.user) {
    return Response.json({ error: 'Ikke innlogget' }, { status: 401 });
  }

  // 3. Autorisasjon (eksempel: kun admin)
  if (session.user.role !== 'admin') {
    return Response.json({ error: 'Ingen tilgang' }, { status: 403 });
  }

  // 4. Utfør operasjonen
  // ...
}
```

**Steg 3: Bruk API Gateway (for større prosjekter)**

En API Gateway sentraliserer sikkerhet:

```
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY                             │
├─────────────────────────────────────────────────────────────┤
│  ✓ Rate limiting                                             │
│  ✓ Autentisering                                             │
│  ✓ Logging                                                   │
│  ✓ Caching                                                   │
│  ✓ Transformasjon                                            │
└─────────────────────────────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
      ┌─────────┐    ┌─────────┐    ┌─────────┐
      │  API 1  │    │  API 2  │    │  API 3  │
      └─────────┘    └─────────┘    └─────────┘
```

**Anbefalte rate limits:**

| Endepunkt-type | Limit | Grunn |
|----------------|-------|-------|
| Offentlige | 100/min/IP | Balanse mellom tilgjengelighet og beskyttelse |
| Autentiserte | 1000/min/bruker | Mer tillit til innloggede |
| Login | 5/min/IP | Brute force-beskyttelse |
| Passord-reset | 3/time/e-post | Forhindre spam |
| AI/kostbare | 10/min/bruker | Kostnadskontroll |

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Moderat | Viktig | Kritisk | Kritisk |

**OAuth 2.1 og PKCE:**
For moderne autentisering, bruk OAuth 2.1 med PKCE (Proof Key for Code Exchange). Dette er spesielt viktig for:
- Single Page Applications (SPA)
- Mobile apper
- Apper uten backend

💡 **Tips:** Vercel, Netlify og andre plattformer har innebygd rate limiting. Sjekk om dette er tilstrekkelig før du implementerer egen løsning.

---

## 9. 🔴 Autentisering implementert

### Hva dette punktet består av

Autentisering er systemet som:
- Lar brukere registrere seg
- Verifiserer at brukere er den de utgir seg for (innlogging)
- Håndterer "glemt passord"
- Administrerer sesjoner (holde brukeren innlogget)
- Logger brukere ut

### Hva problemet er

**Å bygge eget autentiseringssystem er ekstremt risikabelt:**

| Område | Kompleksitet |
|--------|--------------|
| Sikker passord-hashing | Må bruke riktig algoritme (bcrypt/argon2) med riktig styrke |
| Brute force-beskyttelse | Må implementere rate limiting og kontolåsing |
| Token-håndtering | JWT må signeres riktig, ha riktig levetid, håndtere refresh |
| "Glemt passord" | Må være sikker mot enumeration og timing-angrep |
| Session-håndtering | Må være sikker mot session hijacking |
| XSS og CSRF | Cookies må ha riktige attributter |

**Konsekvenser av feil:**
- Konto-overtakelse
- Datatyveri
- Juridisk ansvar (GDPR-brudd)
- Omdømmeskade

### Hva vi oppnår ved å løse det

Ved å bruke etablerte løsninger får du:

```
┌─────────────────────────────────────────────────────────────┐
│                AUTENTISERING (outsourcet)                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ Sikker passord-hashing (bcrypt, argon2)                 │
│  ✅ Brute-force beskyttelse (rate limiting)                 │
│  ✅ Token-håndtering (JWT, refresh tokens)                  │
│  ✅ "Glemt passord"-flyt                                    │
│  ✅ E-postverifisering                                      │
│  ✅ Sesjonshåndtering                                       │
│  ✅ OAuth/sosial login (Google, GitHub, etc.)               │
│  ✅ Multi-faktor autentisering (MFA)                        │
│  ✅ CSRF-beskyttelse                                        │
│                                                              │
│  Du slipper å tenke på alt dette!                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Hvordan vi går frem

**Gyllen regel:**

> **Aldri bygg eget autentiseringssystem.**
> Bruk etablerte løsninger som håndterer kompleksiteten for deg.

**Anbefalte løsninger:**

| Tjeneste | Best for | Pris | Kompleksitet |
|----------|----------|------|--------------|
| **Supabase Auth** | MVP, full-stack | Gratis start | Lav |
| **Clerk** | God UX, sosial login | Gratis start | Lav |
| **Auth.js (NextAuth)** | Next.js-prosjekter | Gratis | Middels |
| **Auth0** | Enterprise, komplekse behov | Gratis start | Middels |
| **Firebase Auth** | Mobile + web, Google-økosystem | Gratis start | Lav |

🤖 **AI-instruksjon:**
```
Sett opp autentisering med [Supabase Auth / Clerk / NextAuth] inkludert:
- Registrering med e-post og passord
- Innlogging
- "Glemt passord"-flyt
- Beskyttede routes som krever innlogging
- Sesjonshåndtering med sikre cookies
- Utlogging

Ikke bygg egen auth-løsning. Bruk biblioteket direkte.
```

**Viktige sikkerhetsinnstillinger:**

| Innstilling | Anbefalt verdi | Hvorfor |
|-------------|----------------|---------|
| Sesjonsvarighet | 1-24 timer | Begrens skade ved token-lekkasje |
| Passordkrav | Min 8 tegn, blanding | Vanskeligere å gjette |
| Rate limiting | Maks 5 forsøk/min | Stopp brute-force |
| MFA | Anbefalt for admin | Ekstra sikkerhetslag |

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Enkel/valgfritt | Standard | Robust | Enterprise |

**Passordløs autentisering (2025-trend):**
WebAuthn/passkeys blir stadig mer populært:
- Bruker biometri (fingeravtrykk, ansikt) i stedet for passord
- Nesten umulig å phishe
- Bedre brukeropplevelse

⚠️ **Advarsel:** Selv om du bruker en etablert løsning, må du konfigurere den riktig. Standardinnstillinger er ikke alltid sikre nok.

---

## 10. 🔴 Happy path fungerer og er sikret

### Hva dette punktet består av

**"Happy path"** er hovedscenariet der alt går som planlagt – brukeren gjør det som forventes, og systemet responderer korrekt.

For en oppgave-app:
1. Bruker logger inn ✓
2. Bruker ser sine oppgaver ✓
3. Bruker legger til ny oppgave ✓
4. Oppgaven vises i listen ✓
5. Bruker markerer oppgave som fullført ✓

**"Sikret"** betyr at:
- Bruker A kan IKKE se bruker Bs data
- Uinnlogget bruker redirectes til login
- Alle handlinger sjekkes for autorisasjon
- Input valideres før lagring

### Hva problemet er

**Vanlige sikkerhetsfeil i happy path:**

| Feil | Eksempel | Konsekvens |
|------|----------|------------|
| **Broken access control** | Endre ID i URL gir tilgang til andres data | Datatyveri |
| **Ingen auth-sjekk** | API returnerer data uten å sjekke innlogging | Alle kan hente data |
| **Manglende eiersjekk** | Bruker kan slette andres oppgaver | Dataødeleggelse |

**OWASP Top 10 2021:** "Broken Access Control" er #1 sikkerhetsproblem i webapplikasjoner.

### Hva vi oppnår ved å løse det

- ✅ Brukere kan kun se og endre sine egne data
- ✅ Systemet er forutsigbart og pålitelig
- ✅ Grunnlag for videre utvikling er solid
- ✅ Tidlig brukertest gir verdifull feedback

### Hvordan vi går frem

**Steg 1: Definer happy path**

Skriv ned stegene i hovedflyten:
1. [Første handling brukeren gjør]
2. [Andre handling]
3. [osv.]

**Steg 2: Implementer med sikkerhet**

🤖 **AI-instruksjon:**
```
Implementer API-route for [handling] med:

1. Autentisering: Sjekk at bruker er innlogget
2. Autorisasjon: Sjekk at bruker eier ressursen
3. Validering: Valider all input
4. Handling: Utfør operasjonen
5. Respons: Returner kun relevant data

Returner:
- 401 hvis ikke innlogget
- 403 hvis ikke autorisert (ikke eier)
- 400 hvis validering feiler
- 200/201 hvis suksess
```

**Eksempel på sikker API-route:**

```typescript
// app/api/tasks/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // 1. Autentisering
  const session = await getServerSession();
  if (!session?.user) {
    return Response.json({ error: 'Ikke innlogget' }, { status: 401 });
  }

  // 2. Hent ressursen
  const task = await prisma.task.findUnique({
    where: { id: params.id },
  });

  if (!task) {
    return Response.json({ error: 'Ikke funnet' }, { status: 404 });
  }

  // 3. Autorisasjon - sjekk eierskap
  if (task.userId !== session.user.id) {
    return Response.json({ error: 'Ingen tilgang' }, { status: 403 });
  }

  // 4. Returner data
  return Response.json({ data: task });
}
```

**Steg 3: Test sikkerhet eksplisitt**

| Test | Forventet resultat |
|------|-------------------|
| Hent egen ressurs | 200 OK, data returnert |
| Hent andres ressurs | 403 Forbidden |
| Hent uten innlogging | 401 Unauthorized |
| Hent ikke-eksisterende | 404 Not Found |

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Viktig | Viktig | Kritisk | Kritisk |

💡 **Tips for prosjektledere:** Be alltid om en demonstrasjon av at sikkerhetstestene kjører. "Vis meg at bruker A ikke kan se bruker Bs data."

---

## 11. 🔴 Grunnleggende tester

### Viktig avklaring: Fase 4 vs Fase 6 testing

**Fase 4 inkluderer UTVIKLERTESTING** (enhetstester, integrasjonstester skrevet under utvikling). **Fase 6 er KVALITETSSIKRING** (systematisk testing, sikkerhetstesting, ytelsestesting, tilgjengelighetstesting). Utviklertesting er en del av god kodepraksis; kvalitetssikring er en separat valideringsfase. Fase 4 og Fase 6 er *komplementære*, ikke konkurrerende — testene du skriver her er grunnlaget som Fase 6 bygger videre på.

### Hva dette punktet består av

Automatiske tester er kode som verifiserer at annen kode fungerer som forventet.

**Typer tester:**

| Type | Hva den tester | Eksempel |
|------|----------------|----------|
| **Unit-tester** | Små deler isolert | "Er e-post-validering riktig?" |
| **Integrasjonstester** | At deler fungerer sammen | "Kan bruker logge inn?" |
| **Ende-til-ende** | Hele flyten | "Kan bruker fullføre kjøp?" |

### Hva problemet er

Uten tester:
- Endringer kan ødelegge eksisterende funksjonalitet
- Feil oppdages først av brukere
- Refaktorering blir risikabelt
- Ingen vet om noe fungerer etter oppdateringer

**Med AI-generert kode er testing EKSTRA viktig:**
- AI kan generere kode som ser riktig ut men har subtile feil
- Tester avslører disse feilene automatisk
- 45% av AI-kode har sikkerhetsfeil som tester kan fange

### Hva vi oppnår ved å løse det

- ✅ Feil fanges før de når brukere
- ✅ Endringer kan gjøres uten frykt
- ✅ Dokumentasjon av hvordan systemet skal fungere
- ✅ Raskere utvikling på sikt

### Hvordan vi går frem

**Prioriter sikkerhetstester først:**

| Prioritet | Hva | Hvorfor |
|-----------|-----|---------|
| 1 | Autentisering | Hindrer uautorisert tilgang |
| 2 | Autorisasjon | Hindrer datalekkasje |
| 3 | Input-validering | Hindrer injeksjonsangrep |
| 4 | Happy path | Bekrefter hovedfunksjonalitet |

🤖 **AI-instruksjon:**
```
Skriv tester for [funksjon] med følgende:

1. Happy path - normal bruk fungerer
2. Autentisering - krever innlogging
3. Autorisasjon - bruker kan kun se egne data
4. Validering - ugyldig input avvises
5. Kanttilfeller - hva skjer ved edge cases

Bruk Vitest. Fokuser på sikkerhetskritiske tester.
Gi meg både testene og instruksjoner for å kjøre dem.
```

**Eksempel på sikkerhetstester:**

```typescript
// __tests__/auth.test.ts
import { describe, it, expect } from 'vitest';

describe('Autentisering', () => {
  it('avviser uautentiserte requests', async () => {
    const response = await fetch('/api/tasks');
    expect(response.status).toBe(401);
  });

  it('tillater autentiserte requests', async () => {
    const session = await loginAs('testbruker@example.com');
    const response = await fetch('/api/tasks', {
      headers: { Authorization: `Bearer ${session.token}` },
    });
    expect(response.status).toBe(200);
  });
});

describe('Autorisasjon', () => {
  it('avviser tilgang til andres ressurser', async () => {
    const sessionA = await loginAs('brukerA@example.com');
    const brukerBTask = 'bruker-b-task-id';

    const response = await fetch(`/api/tasks/${brukerBTask}`, {
      headers: { Authorization: `Bearer ${sessionA.token}` },
    });

    expect(response.status).toBe(403);
  });
});
```

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Valgfritt | Anbefalt | Viktig | Kritisk |

**Testdekning:**
- MVP: Minimum 50% dekning på sikkerhetskritisk kode
- Produksjon: 80%+ dekning anbefalt

💡 **Tips:** Kjør tester automatisk i CI/CD slik at du aldri glemmer dem.

---

## 12. 🔴 Verifisering av AI-generert kode

### Hva dette punktet består av

Systematisk gjennomgang av kode generert av AI-assistenter for å fange sikkerhetsproblemer, feil og dårlig praksis.

### Hva problemet er

**AI-generert kode har dokumenterte problemer:**

| Problem | Frekvens | Konsekvens |
|---------|----------|------------|
| Hardkodede hemmeligheter | Vanlig | API-nøkler eksponert |
| Manglende validering | 45% av kode | Injeksjonsangrep mulig |
| Utdaterte mønstre | Vanlig | Kjente sårbarheter |
| Hallusinerte pakker | 20% | Supply chain-angrep |
| Manglende feilhåndtering | Vanlig | Systemkrasj |

**"Productivity tax":**
66% av utviklere bruker tid på å fikse "nesten riktig" AI-kode. Uten systematisk verifisering risikerer du å bruke mer tid på debugging enn du sparte på generering.

### Hva vi oppnår ved å løse det

- ✅ Høyere kodekvalitet
- ✅ Færre sikkerhetsproblemer i produksjon
- ✅ Redusert "productivity tax"
- ✅ Bedre forståelse av egen kodebase

### Hvordan vi går frem

**Steg 1: Bruk sikkerhetsfokuserte prompts**

🤖 **AI-instruksjon (mal for sikker kode):**
```
Implementer [funksjon] med følgende sikkerhetskrav:
- Valider ALL input med Zod (server-side)
- Sjekk autentisering før operasjoner
- Sjekk at bruker eier ressursen (autorisasjon)
- Logg hendelser, men ALDRI sensitive data
- Returner generiske feilmeldinger til klient
- Detaljerte feil kun i server-logger
- Ikke inkluder hardkodede verdier
- Bruk miljøvariabler for all konfigurasjon

Forklar også hva koden gjør og hvilke sikkerhetstiltak som er implementert.
```

**Steg 2: Modulær utvikling**

I stedet for å be AI generere hele appen på én gang:

```
1. Del opp i moduler
   ├── Autentisering
   ├── Database-oppsett
   ├── API-routes
   ├── Frontend-komponenter
   └── Styling

2. For hver modul:
   a) Skriv spesifikasjon
   b) Generer med AI
   c) Review koden
   d) Test modulen
   e) Gå videre til neste

3. Integrer gradvis
```

**Steg 3: Bruk sjekkliste for review**

```
┌─────────────────────────────────────────────────────────────┐
│              REVIEW AV AI-GENERERT KODE                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SIKKERHET                                                   │
│  □ Ingen hardkodede hemmeligheter?                          │
│  □ Input valideres på server-side?                          │
│  □ SQL-queries bruker parameterisering?                     │
│  □ Brukerdata escapes før visning (XSS)?                    │
│  □ Autentisering sjekkes på alle beskyttede routes?         │
│  □ Autorisasjon sjekkes (bruker eier ressursen)?            │
│                                                              │
│  KVALITET                                                    │
│  □ Koden er lesbar og forståelig?                           │
│  □ Feilhåndtering er på plass?                              │
│  □ Ingen unødvendig kompleksitet?                           │
│  □ Dependencies er verifisert (finnes, er trygge)?          │
│                                                              │
│  PERSONVERN                                                  │
│  □ Sensitiv data logges ikke?                               │
│  □ Data lagres kun der nødvendig?                           │
│  □ Brukerdata kan slettes (GDPR)?                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Steg 4: Bruk automatiske verktøy**

| Verktøy | Finner | Når |
|---------|--------|-----|
| ESLint + security plugin | Kodeproblemer | Ved skriving |
| npm audit | Sårbare pakker | Ved install |
| Snyk / SonarCloud | Sikkerhetsfeil | I CI/CD |
| TruffleHog | Hardkodede secrets | I CI/CD |

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Viktig | Kritisk | Kritisk | Kritisk |

**Vanlige AI-feil å se etter:**

| Feil | Eksempel | Løsning |
|------|----------|---------|
| Hardkodede secrets | `const API_KEY = "abc123"` | Bruk miljøvariabler |
| Manglende validering | Direkte bruk av `req.body` | Valider med Zod |
| SQL injection | `query("SELECT * FROM users WHERE id=" + id)` | Bruk parameterisering |
| Ingen auth-sjekk | API uten sesjonssjekk | Legg til auth middleware |
| Console.log med data | `console.log(user.password)` | Fjern før deploy |
| Utdaterte pakker | Gamle versjoner | Oppdater til nyeste |

---

# Del C: Viktige elementer (🟡)

## 13. 🟡 Feilhåndtering (sikker)

### Hva dette punktet består av

Feilhåndtering bestemmer hva systemet gjør når noe går galt:
- Hva brukeren ser
- Hva som logges for feilsøking
- Hvordan systemet oppfører seg

**Sikker feilhåndtering** betyr å:
- Gi nyttig feedback til brukeren
- Ikke avsløre sensitiv informasjon
- Logge detaljer for utviklere

### Hva problemet er

**Dårlig feilmelding (avslører for mye):**
```
Error: Database connection failed at row 47 in file /app/src/db.js
Connection string: postgres://admin:secretpassword@db.example.com:5432/myapp
Stack trace: ...
```

Denne meldingen forteller en angriper:
- Hvilken database du bruker (PostgreSQL)
- Brukernavnet til databasen (admin)
- Passordet (secretpassword)
- Serveradressen (db.example.com)
- Filstrukturen (/app/src/db.js)

### Hva vi oppnår ved å løse det

**God feilmelding (sikker og brukervennlig):**
```
Beklager, noe gikk galt. Prøv igjen om litt.
Hvis problemet vedvarer, kontakt support med referanse: ERR-2024-ABC123
```

- ✅ Brukeren vet at noe gikk galt
- ✅ Har referanse for support
- ✅ Ingen sensitiv info avslørt
- ✅ Utviklere kan finne detaljene i logger

### Hvordan vi går frem

🤖 **AI-instruksjon:**
```
Implementer feilhåndtering for API-et med:

1. Offentlige feilmeldinger - brukervennlige, ingen tekniske detaljer
2. Unik referansekode per feil for support
3. Detaljert logging server-side (aldri til klient)
4. Konsistente HTTP-statuskoder

Sørg for at stack traces, filstier, og database-detaljer
ALDRI vises til brukeren.
```

**Eksempel på implementasjon:**

```typescript
// lib/errors.ts

// Offentlige feilmeldinger (vises til bruker)
const publicErrors: Record<string, string> = {
  VALIDATION_ERROR: 'Vennligst sjekk at alle felt er fylt ut korrekt.',
  AUTH_ERROR: 'Feil e-post eller passord.',
  NOT_FOUND: 'Ressursen ble ikke funnet.',
  FORBIDDEN: 'Du har ikke tilgang til denne ressursen.',
  SERVER_ERROR: 'Noe gikk galt. Prøv igjen senere.',
};

export function handleError(error: unknown, errorCode: string) {
  // Generer unik referanse
  const reference = `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Logg detaljert feil server-side (aldri til klient!)
  console.error({
    reference,
    errorCode,
    error: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString(),
  });

  // Returner sikker melding til klient
  return {
    error: publicErrors[errorCode] || publicErrors.SERVER_ERROR,
    reference,
  };
}
```

**Hva du ALDRI skal vise til brukeren:**

| Type | Eksempel | Hvorfor farlig |
|------|----------|----------------|
| Stack traces | `at line 47 in /app/src...` | Avslører filstruktur |
| Database-feil | `PostgreSQL error: ...` | Avslører teknologi |
| Connection strings | `postgres://user:pass@...` | Avslører credentials |
| Interne IP-er | `192.168.1.100` | Avslører nettverk |
| "E-post ikke funnet" | Forteller at e-post X ikke eksisterer | Bruker-enumeration |

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Moderat | Viktig | Kritisk | Kritisk |

💡 **Tips:** Bruk samme generiske melding for "feil e-post" og "feil passord" for å hindre at angripere kan gjette gyldige e-postadresser.

---

## 14. 🟡 Logging (uten sensitiv data)

### Hva dette punktet består av

Logging er å registrere hva som skjer i systemet:
- Hvem gjorde hva
- Når skjedde det
- Hva var resultatet

### Hva problemet er

**Logging uten tanke på sikkerhet skaper nye problemer:**

| Dårlig logging | Problem |
|----------------|---------|
| `Bruker ole@example.com logget inn med passord "hemmelig123"` | Passord i logger! |
| `Betaling med kort 4111111111111111 fullført` | Kortnummer i logger! |
| Ingen logging | Umulig å feilsøke eller oppdage angrep |

Logger som inneholder sensitive data:
- Er et mål for angripere
- Bryter GDPR og andre regelverk
- Kan føre til massive bøter

### Hva vi oppnår ved å løse det

- ✅ Mulighet til å feilsøke problemer
- ✅ Oppdagelse av sikkerhetshendelser
- ✅ Compliance med GDPR
- ✅ Audit trail for viktige handlinger

### Hvordan vi går frem

**Hva som skal logges vs ikke logges:**

| ✅ Logg dette | ❌ Aldri logg dette |
|--------------|---------------------|
| Bruker-ID (ikke e-post) | Passord (selv hashet) |
| Tidspunkt for handling | API-nøkler/tokens |
| Type handling (login, opprett, slett) | Kredittkortnummer |
| IP-adresse (ved behov) | Personnummer |
| Feilreferanser | Fullstendig request body |
| HTTP-statuskode | Sensitive headers |

🤖 **AI-instruksjon:**
```
Implementer en logging-modul som:
1. Logger hendelser med tidsstempel, bruker-ID, og handling
2. Automatisk maskerer sensitive felt (password, token, secret, apiKey, creditCard)
3. Bruker JSON-format for enkel parsing
4. Har nivåer: info, warn, error
5. ALDRI logger passord, tokens, eller personopplysninger

Gi eksempel på bruk for login, feilet login, og API-kall.
```

**Eksempel på sikker logging:**

```typescript
// lib/logger.ts
type LogLevel = 'info' | 'warn' | 'error';

const SENSITIVE_FIELDS = ['password', 'token', 'secret', 'apiKey', 'creditCard', 'ssn'];

function maskSensitiveData(data?: Record<string, unknown>) {
  if (!data) return data;

  const masked = { ...data };
  for (const key of Object.keys(masked)) {
    if (SENSITIVE_FIELDS.some(field => key.toLowerCase().includes(field))) {
      masked[key] = '***MASKED***';
    }
  }
  return masked;
}

export function log(event: {
  level: LogLevel;
  action: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: event.level,
    action: event.action,
    userId: event.userId,
    metadata: maskSensitiveData(event.metadata),
  }));
}

// Bruk
log({ level: 'info', action: 'user.login', userId: '123' });
log({ level: 'warn', action: 'user.login.failed', metadata: { reason: 'invalid_password' } });
```

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Lav | Moderat | Viktig | Kritisk |

**GDPR og logging:**
- Logger med personopplysninger faller under GDPR
- Du må kunne slette en brukers data fra logger på forespørsel
- Behold logger kun så lenge nødvendig

---

## 15. 🟡 Feature flags og kill switch

### Hva dette punktet består av

**Feature flags** er konfigurasjon som lar deg skru funksjoner av og på uten å deploye ny kode.

**Kill switch** er en spesiell feature flag som umiddelbart deaktiverer en problematisk funksjon.

### Hva problemet er

Uten feature flags:
- Ny funksjonalitet er "alt eller ingenting"
- Feil i ny kode påvirker alle brukere umiddelbart
- Eneste løsning er å rulle tilbake hele deploy-en
- Ingen mulighet for gradvis utrulling eller A/B-testing

### Hva vi oppnår ved å løse det

```
┌─────────────────────────────────────────────────────────────┐
│                   FEATURE FLAGS                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🚀 GRADVIS UTRULLING                                       │
│     Slipp ny funksjon til 10% av brukere først              │
│                                                              │
│  🔬 A/B-TESTING                                             │
│     Test hvilken versjon som fungerer best                  │
│                                                              │
│  🛑 KILL SWITCH                                             │
│     Skru av problematisk funksjon umiddelbart               │
│                                                              │
│  🧪 BETA-TESTING                                            │
│     Gi utvalgte brukere tilgang til nye funksjoner          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Hvordan vi går frem

**Enkel implementasjon for MVP:**

```typescript
// lib/feature-flags.ts

const flags = {
  newCheckout: process.env.FEATURE_NEW_CHECKOUT === 'true',
  darkMode: process.env.FEATURE_DARK_MODE === 'true',
  aiAssistant: process.env.FEATURE_AI_ASSISTANT === 'true',
};

export function isFeatureEnabled(feature: keyof typeof flags): boolean {
  return flags[feature] ?? false;
}

// Bruk i kode
if (isFeatureEnabled('newCheckout')) {
  // Vis ny checkout
} else {
  // Vis gammel checkout
}
```

**For mer avansert bruk:**

| Tjeneste | Best for | Pris |
|----------|----------|------|
| **LaunchDarkly** | Enterprise, avansert targeting | Betalt |
| **Flagsmith** | Open source, selvhostet mulig | Gratis tier |
| **Unleash** | Open source | Gratis (selvhostet) |
| **PostHog** | Kombinert med analytics | Gratis tier |

🤖 **AI-instruksjon:**
```
Sett opp et enkelt feature flag-system med:
1. Konfigurasjon via miljøvariabler
2. En funksjon isFeatureEnabled(flagName)
3. Støtte for default-verdier
4. Eksempler på bruk i både frontend og backend
```

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Valgfritt | Anbefalt | Viktig | Kritisk |

💡 **Tips:** Ha alltid en kill switch for kostbare operasjoner (som AI-kall). Hvis noe går galt, kan du umiddelbart stoppe blødningen.

---

## 16. 🟡 README med sikkerhetsinstruksjoner

### Hva dette punktet består av

README er dokumentasjonen som forklarer:
- Hva prosjektet er
- Hvordan sette det opp
- Hvordan kjøre det
- Viktige sikkerhetshensyn

### Hva problemet er

Uten god README:
- Nye teammedlemmer bruker lang tid på å komme i gang
- Hemmeligheter håndteres feil fordi instruksjoner mangler
- Sikkerhetspraksis følges ikke konsekvent
- Du selv glemmer hvordan prosjektet settes opp

### Hva vi oppnår ved å løse det

- ✅ Rask onboarding av nye teammedlemmer
- ✅ Konsistent sikkerhetspraksis
- ✅ Dokumentert kunnskap som ikke forsvinner
- ✅ Profesjonelt inntrykk (viktig for investorer)

### Hvordan vi går frem

🤖 **AI-instruksjon:**
```
Lag en komplett README.md for prosjektet med:
1. Prosjektbeskrivelse
2. Forutsetninger (Node-versjon etc.)
3. Installasjonsinstruksjoner steg-for-steg
4. Hvordan sette opp miljøvariabler (med .env.example)
5. Hvordan kjøre lokalt
6. Hvordan kjøre tester
7. Sikkerhetsseksjon med viktige advarsler
8. Hvordan rapportere sikkerhetsproblemer

Bruk norsk språk.
```

**Mal for README:**

```markdown
# [Prosjektnavn]

[Kort beskrivelse av hva prosjektet gjør]

## Forutsetninger

- Node.js 20+
- npm/pnpm
- [Database hvis relevant]

## Kom i gang

### 1. Klon prosjektet

```bash
git clone [repo-url]
cd [prosjekt]
```

### 2. Installer avhengigheter

```bash
npm install
```

### 3. Sett opp miljøvariabler

```bash
cp .env.example .env.local
```

Rediger `.env.local` med dine verdier.

**⚠️ VIKTIG:** Aldri commit `.env.local` eller andre filer med hemmeligheter!

### 4. Start utviklingsserver

```bash
npm run dev
```

## Scripts

| Script | Beskrivelse |
|--------|-------------|
| `npm run dev` | Start utviklingsserver |
| `npm run build` | Bygg for produksjon |
| `npm run lint` | Kjør linting |
| `npm test` | Kjør tester |

## Sikkerhet

### Hemmeligheter
- Alle hemmeligheter skal i `.env.local` (lokalt) eller hosting-plattformens miljøvariabler (produksjon)
- Aldri hardkod API-nøkler eller passord i koden

### Rapportere sikkerhetsproblemer
Hvis du oppdager et sikkerhetsproblem, vennligst rapporter det til [security@example.com] i stedet for å opprette en offentlig issue.
```

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Lav | Moderat | Viktig | Kritisk |

⚠️ **Advarsel:** .env.example skal inneholde PLASSHOLDERE, ikke ekte verdier. `DATABASE_URL=your_database_url_here` – ikke faktisk connection string.

---

## 17. 🟡 Personvern ved bruk av AI-tjenester

### Hva dette punktet består av

Når du bruker AI-tjenester (ChatGPT, Claude, Copilot, etc.) sendes data til eksterne servere. Dette inkluderer:
- Kode du ber om hjelp med
- Beskrivelser av funksjonalitet
- Feilmeldinger og logger
- Potensielt sensitiv forretningslogikk

### Hva problemet er

| Risiko | Konsekvens |
|--------|------------|
| Sensitiv kode delt med AI | Forretningshemmeligheter eksponert |
| Persondata i prompts | GDPR-brudd |
| API-nøkler i kodesnutter | Hemmeligheter lekket |
| Treningsdata | Din kode kan brukes til å trene AI |

### Hva vi oppnår ved å løse det

- ✅ Kontroll over hvilke data som deles
- ✅ GDPR-compliance
- ✅ Beskyttelse av forretningshemmeligheter
- ✅ Informerte valg om AI-verktøy

### Hvordan vi går frem

**Regler for AI-bruk:**

| ✅ Trygt å dele | ❌ Aldri del |
|-----------------|-------------|
| Generiske kodeeksempler | API-nøkler og secrets |
| Offentlig dokumentasjon | Persondata (navn, e-post, etc.) |
| Standardmønstre | Forretningskritisk logikk |
| Feilmeldinger (uten sensitive data) | Database-skjemaer med ekte data |

**Beste praksis:**

1. **Bruk bedriftsversjoner** der tilgjengelig (har ofte sterkere personverngarantier)
2. **Sjekk data-policy** for AI-tjenesten du bruker
3. **Anonymiser data** før du deler med AI
4. **Bruk lokale modeller** for sensitiv kode der mulig

🤖 **Når du bruker AI-assistenter:**
```
Før du sender kode til AI:
- Fjern alle hardkodede verdier og secrets
- Erstatt ekte data med placeholder-verdier
- Anonymiser eventuelle personopplysninger
- Vurder om forretningslogikken er sensitiv
```

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Lav | Moderat | Viktig | Kritisk |

**Data Processing Agreements:**
For bedriftsbruk bør du ha DPA (Data Processing Agreement) med AI-leverandører som behandler data på vegne av din organisasjon.

---

## 18. 🟡 Regulatoriske krav

### Hva dette punktet består av

Avhengig av hva applikasjonen din gjør og hvem brukerne er, kan ulike lover og regler gjelde:

| Regulering | Gjelder for | Hovedkrav |
|------------|-------------|-----------|
| **GDPR** | Alle som behandler EU-borgeres data | Samtykke, sletting, minimering |
| **PCI DSS** | Betalingsbehandling | Strenge sikkerhetskrav for kortdata |
| **HIPAA** | Helsedata (USA) | Beskyttelse av helseopplysninger |
| **EU CRA** | Produkter med digitale elementer (fra 2027) | Sikkerhet-by-design, SBOM |

### Hva problemet er

Manglende compliance kan føre til:
- Store bøter (GDPR: opptil 4% av årlig omsetning)
- Juridisk ansvar
- Tap av kundenes tillit
- Tvungen stans av tjenester

### Hva vi oppnår ved å løse det

- ✅ Unngår juridiske problemer
- ✅ Bygger tillit hos kunder
- ✅ Kan selge til regulerte bransjer
- ✅ Forbereder for fremtidige krav

### Hvordan vi går frem

**GDPR-minimumskrav for MVP:**

| Krav | Implementasjon |
|------|----------------|
| Samtykke | Tydelig informasjon og aksept før datainnsamling |
| Rett til sletting | Funksjon for å slette all brukerdata |
| Dataminimering | Samle kun nødvendige data |
| Sikkerhet | Kryptering, tilgangskontroll |
| Personvernerklæring | Publisert og lett tilgjengelig |

🤖 **AI-instruksjon:**
```
Implementer GDPR-støtte for brukerdata:
1. Funksjon for å eksportere all brukerdata (data portability)
2. Funksjon for å slette all brukerdata (right to be forgotten)
3. Logging av samtykke (når og hva brukeren samtykket til)
4. Ikke lagre data lengre enn nødvendig
```

**EU Cyber Resilience Act (CRA):**

Fra 2027 må produkter med digitale elementer som selges i EU:
- Ha sikkerhet bygget inn fra design
- Levere SBOM (Software Bill of Materials)
- Ha rutiner for sårbarhetshåndtering
- Gi sikkerhetsoppdateringer

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Lav | Moderat | Viktig | Kritisk |

💡 **Tips for prosjektledere:** Sjekk alltid med juridisk avdeling eller rådgiver hvilke reguleringer som gjelder for din bransje og målgruppe.

---

# Del D: Anbefalte elementer (🟢)

## 19. 🟢 Dummy-data

### Hva dette punktet består av

Testdata som ser realistisk ut, men ikke inneholder faktisk personinformasjon. Brukes for testing, demonstrasjoner og utvikling.

### Hva problemet er

| Dårlig praksis | Konsekvens |
|----------------|------------|
| Kopiere fra produksjon | GDPR-brudd, personvernrisiko |
| Bruke ekte e-poster | Spam-risiko, forvirring |
| Hardkode testdata | Data spres i kodebasen |

### Hva vi oppnår ved å løse det

- ✅ Realistisk testing uten risiko
- ✅ GDPR-compliance i utviklingsmiljøer
- ✅ Enkel oppsett av testmiljøer
- ✅ Konsistente demo-data

### Hvordan vi går frem

**Regler for dummy-data:**

| ✅ Gjør dette | ❌ Ikke gjør dette |
|--------------|-------------------|
| Bruk faker-biblioteker | Kopier fra produksjon |
| Bruk example.com for e-poster | Bruk ekte e-postadresser |
| Bruk fiktive navn | Bruk navn på ekte personer |
| Bruk reserverte IP-adresser | Bruk ekte IP-adresser |

**Reserverte domener (trygge å bruke):**
- `example.com`, `example.org`, `example.net`
- `test.com`
- `localhost`

🤖 **AI-instruksjon:**
```
Lag et seed-script som oppretter testdata med:
- 10 testbrukere med faker-genererte navn
- E-poster på formatet testbruker1@example.com
- Realistiske men fiktive data
- Norsk locale for faker (nb_NO)
```

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Lav | Moderat | Viktig | Viktig |

---

## 20. 🟢 Rollback-strategi

### Hva dette punktet består av

En plan for hvordan du raskt kan gå tilbake til forrige versjon hvis noe går galt etter en deploy.

### Hva problemet er

Uten rollback-strategi:
- Feil i produksjon forblir der til du klarer å fikse dem
- Brukere opplever nedetid mens du feilsøker
- Stress og panikk ved problemer
- Kan ende med dataloss eller korrupsjon

### Hva vi oppnår ved å løse det

- ✅ Rask recovery fra feil
- ✅ Minimert nedetid
- ✅ Redusert stress ved problemer
- ✅ Trygghet til å deploye oftere

### Hvordan vi går frem

**For Vercel/Netlify (enklest):**
1. Gå til dashboard → Deployments
2. Finn forrige fungerende versjon
3. Klikk "Promote to Production"

**For Git-basert:**
```bash
# Finn forrige fungerende commit
git log --oneline

# Gå tilbake (lag ny commit, ikke skriv om historikk)
git revert HEAD
git push origin main
```

**For database-endringer:**
- Ha alltid backup FØR migrasjoner
- Test migrasjoner i staging først
- Ha down-migrasjon klar

| Strategi | Beskrivelse | Kompleksitet |
|----------|-------------|--------------|
| **Instant rollback** | Platform-støttet | Enkel |
| **Blue-Green** | To identiske miljøer | Middels |
| **Canary** | Gradvis utrulling | Avansert |

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Lav | Moderat | Viktig | Kritisk |

---

## 21. 🟢 SBOM – Software Bill of Materials

### Hva dette punktet består av

SBOM er en komplett liste over alle komponenter (biblioteker, pakker, avhengigheter) som applikasjonen din bruker.

### Hva problemet er

Uten SBOM:
- Vet ikke hva som faktisk kjører i produksjon
- Vanskelig å vurdere om du er påvirket av nye sårbarheter
- Kan ikke svare på compliance-krav
- Mangler oversikt for sikkerhetsvurderinger

### Hva vi oppnår ved å løse det

- ✅ Full oversikt over avhengigheter
- ✅ Rask respons ved nye sårbarheter
- ✅ Oppfyller kommende EU CRA-krav
- ✅ Enklere sikkerhetsvurderinger

### Hvordan vi går frem

**Generer SBOM automatisk i CI/CD:**

```yaml
# .github/workflows/sbom.yml
- name: Generate SBOM
  uses: anchore/sbom-action@v0
  with:
    format: cyclonedx-json
    output-file: sbom.json
```

**Verktøy:**

| Verktøy | Format | Språk |
|---------|--------|-------|
| **Syft** | CycloneDX, SPDX | Alle |
| **CycloneDX** | CycloneDX | Mange |
| **Trivy** | CycloneDX, SPDX | Container, FS |

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Valgfritt | Anbefalt | Viktig | Kritisk |

**EU CRA-krav:** Fra 2027 vil SBOM være påkrevd for produkter med digitale elementer som selges i EU.

---

## 22. 🟢 Zero Trust-prinsipper

### Hva dette punktet består av

Zero Trust er en sikkerhetsmodell basert på "aldri stol på, alltid verifiser":
- Ingen automatisk tillit basert på nettverk eller lokasjon
- Kontinuerlig verifisering av alle tilganger
- Minste privilegium-prinsippet

### Hva problemet er

Tradisjonell sikkerhet stoler på at "innsiden er trygg":
- Én kompromittert maskin gir tilgang til alt
- Interne angrep er vanskelige å oppdage
- VPN gir falsk trygghet

### Hva vi oppnår ved å løse det

- ✅ Begrenset skade ved kompromittering
- ✅ Bedre beskyttelse mot insider-trusler
- ✅ Tydelige tilgangspolicyer
- ✅ Moderne sikkerhetsarkitektur

### Hvordan vi går frem

**Grunnleggende Zero Trust-prinsipper for MVP:**

| Prinsipp | Implementasjon |
|----------|----------------|
| Verifiser alltid | Sjekk autentisering på HVER request |
| Minste privilegium | Gi kun tilgang til det som trengs |
| Anta kompromittering | Logg alt, vær forberedt |
| MFA | Bruk multi-faktor der mulig |

🤖 **AI-instruksjon:**
```
Implementer tilgangskontroll med minste privilegium-prinsippet:
- Definer roller (user, editor, admin)
- Hver rolle har kun nødvendige tilganger
- Sjekk tilgang på hvert API-kall
- Logg alle tilgangsforsøk (både godkjente og avviste)
```

### Annen viktig info

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Lav | Moderat | Viktig | Kritisk |

---

# Del E: Plattformspesifikke hensyn

## 23. 🔧 Web-applikasjoner

### Spesifikke sikkerhetskrav for web

| Område | Anbefaling |
|--------|------------|
| **HTTPS** | Alltid, ingen unntak |
| **CSP** | Content Security Policy for XSS-beskyttelse |
| **CORS** | Konfigurer riktig for API-tilgang |
| **Cookies** | `Secure`, `HttpOnly`, `SameSite=Strict` |
| **Headers** | Sett alle sikkerhetsheaders |

### Anbefalte sikkerhetsheaders

🤖 **AI-instruksjon:**
```
Konfigurer sikkerhetsheaders for Next.js/web-app:
- Strict-Transport-Security (HSTS)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Content-Security-Policy (start med report-only)
```

---

## 24. 🔧 Mobile apper (iOS/Android)

### Spesifikke sikkerhetskrav for mobile

| Område | iOS | Android |
|--------|-----|---------|
| **Nettverkssikkerhet** | ATS påkrevd | Network Security Config |
| **Lagring** | Keychain for secrets | EncryptedSharedPreferences |
| **Certificate pinning** | URLSession | OkHttp |
| **Obfuskering** | Begrenset behov | R8/ProGuard |

### OWASP Mobile Top 10 (2024)

1. Improper Credential Usage
2. Inadequate Supply Chain Security
3. Insecure Authentication/Authorization
4. Insufficient Input/Output Validation
5. Insecure Communication

🤖 **AI-instruksjon for mobile:**
```
Implementer [funksjon] for [iOS/Android/React Native] med:
- Sikker lagring av sensitive data (Keychain/EncryptedSharedPreferences)
- HTTPS med certificate pinning for kritiske endepunkter
- Input-validering på alle brukerdata
- Ingen sensitive data i logger
```

---

## 25. 🔧 Chrome Extensions

### Spesifikke sikkerhetskrav

| Område | Anbefaling |
|--------|------------|
| **Manifest** | Bruk Manifest V3 (påkrevd) |
| **Permissions** | Be kun om det du trenger |
| **CSP** | Streng Content Security Policy |
| **Storage** | `chrome.storage.local`, ikke localStorage |
| **Kommunikasjon** | Bruk message passing |

### Vanlige feil

| Feil | Risiko | Løsning |
|------|--------|---------|
| For brede permissions | Lav brukertillit | Be kun om nødvendige |
| eval() eller innerHTML | XSS | Bruk sikre alternativer |
| Hardkodede API-nøkler | Kan ekstraheres | Bruk backend-proxy |

---

## 26. 🔧 Desktop-apper

### Electron vs Tauri

| Område | Electron | Tauri |
|--------|----------|-------|
| **Sikkerhet** | Krever konfig | Sikrere default |
| **Størrelse** | ~150MB | ~10MB |
| **Oppdateringer** | electron-updater | Innebygd |

### Electron sikkerhets-sjekkliste

```javascript
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,     // ✅ Alltid false
    contextIsolation: true,      // ✅ Alltid true
    enableRemoteModule: false,   // ✅ Alltid false
    sandbox: true,               // ✅ Anbefalt
  }
});
```

---

# Del F: Leveranser og kvalitetssikring

## 27. 📋 MVSP-sjekkliste

**MVSP (Minimum Viable Secure Product)** er en sikkerhetsstandard utviklet av Google, Salesforce, Okta og Slack.

### Sjekkliste for MVP-fasen

#### Forretningskontroller
- [ ] Personvernpolicy publisert og tilgjengelig
- [ ] Kontaktinfo for sikkerhetsrapportering

#### Applikasjonsdesign
- [ ] HTTPS overalt
- [ ] Sikker passordpolicy (min 8 tegn)
- [ ] Sesjonstimeout konfigurert
- [ ] Rate limiting implementert

#### Implementasjon
- [ ] All input valideres server-side
- [ ] Output encodes for å forhindre XSS
- [ ] SQL-queries bruker parameterisering
- [ ] Avhengigheter skannes for sårbarheter
- [ ] Hemmeligheter i miljøvariabler, ikke i kode

#### Drift
- [ ] Logging aktivert (uten sensitiv data)
- [ ] Backup-strategi definert
- [ ] Rollback-mulighet på plass

**Ressurs:** [mvsp.dev](https://mvsp.dev/)

---

## 28. 📋 Sjekkliste for prosjektleder

### Spørsmål å stille teamet/AI

**Før utvikling starter:**
- [ ] Er prosjektsetup gjort med sikre defaults?
- [ ] Er .gitignore konfigurert riktig?
- [ ] Er .env.example på plass (uten ekte verdier)?

**Under utvikling:**
- [ ] Valideres all input på server-side?
- [ ] Brukes etablert auth-løsning (ikke egenbygd)?
- [ ] Er AI-generert kode gjennomgått?
- [ ] Finnes det pakker som AI foreslo som vi bør verifisere?

**Før lansering:**
- [ ] Kjører CI/CD med sikkerhetsskanning?
- [ ] Er det tester for autentisering og autorisasjon?
- [ ] Vis meg at bruker A ikke kan se bruker Bs data
- [ ] Vis meg at API returnerer 401 uten innlogging
- [ ] Er README komplett?

### Red flags å se etter

| Tegn | Mulig problem |
|------|---------------|
| "Vi bygger egen innlogging" | Høy risiko |
| "Vi deaktiverte linting fordi det tok tid" | Kodekvalitet lider |
| API-nøkler i koden | Sikkerhetsbrist |
| Ingen tester | Høy risiko ved endringer |
| "Det funker på min maskin" | Mangler CI/CD |

---

## 29. 📄 Leveranser fra Fase 4

### Fungerende prototype

- [ ] Prosjekt satt opp med linting og type-sjekking
- [ ] Hemmelighets-håndtering på plass
- [ ] CI/CD med automatisk deploy
- [ ] Sikkerhetsskanning aktivert
- [ ] Autentisering fungerer (med etablert løsning)
- [ ] Happy path implementert og testet
- [ ] Input-validering på all brukerinput
- [ ] API-sikkerhet med rate limiting
- [ ] Grunnleggende feilhåndtering
- [ ] Logger uten sensitiv data
- [ ] AI-generert kode verifisert
- [ ] Grunnleggende tester på plass

### Dokumentasjon

- [ ] README med setup-instruksjoner
- [ ] .env.example med alle variabler
- [ ] MVSP-sjekkliste gjennomgått

### Hva du kan gjøre nå

- ✅ Vise prototypen til noen og få feedback
- ✅ Teste hovedflyten selv
- ✅ Begynne å iterere basert på det du lærer
- ✅ Demonstrere for investorer (hvis relevant)

---

## 30. 📊 Suksessmålinger

### Hvordan vite at Fase 4 er vellykket

| Måling | Mål | Hvordan måle |
|--------|-----|--------------|
| Happy path fungerer | 100% | Manuell test |
| Sikkerhetstester passerer | 100% | CI/CD |
| npm audit | 0 high/critical | `npm audit` |
| Secrets i kode | 0 | GitGuardian/TruffleHog |
| Lint-feil | 0 | ESLint |
| Test-dekning (kritisk kode) | >50% | Coverage-rapport |

### Kriterier for å gå videre til Fase 5

**Må være oppfylt:**
- [ ] Hemmeligheter er IKKE i koden
- [ ] All input valideres på server-side
- [ ] Autentisering bruker etablert løsning
- [ ] Bruker A kan ikke se bruker Bs data
- [ ] CI/CD deployer automatisk
- [ ] Grunnleggende tester finnes
- [ ] AI-generert kode er gjennomgått

**Bør være oppfylt:**
- [ ] Sikkerhetsskanning i CI/CD
- [ ] Feilmeldinger avslører ikke tekniske detaljer
- [ ] Logger inneholder ikke sensitiv data
- [ ] README er komplett

---

# Vedlegg

## Vedlegg A: Ordliste for ikke-tekniske

| Begrep | Forklaring |
|--------|------------|
| **API** | Måten programmer snakker med hverandre på |
| **Autentisering** | Verifisere hvem du er (innlogging) |
| **Autorisasjon** | Hva du har lov til å gjøre |
| **CI/CD** | Automatisk testing og publisering |
| **Frontend** | Det brukeren ser (nettsiden) |
| **Backend** | Serveren som behandler data |
| **Endpoint** | En spesifikk URL som API-et lytter på |
| **Token** | Midlertidig "nøkkel" som beviser at du er innlogget |
| **Hash** | Enveiskryptering (kan ikke reverseres) |
| **Injection** | Angrep der ondsinnet kode "injiseres" |
| **XSS** | Angrep der JavaScript kjøres i andres nettleser |
| **CORS** | Regler for hvem som kan kontakte API-et |
| **Rate limiting** | Begrensning på antall forespørsler |
| **SBOM** | Liste over alle komponenter i programvaren |
| **GDPR** | EUs personvernforordning |

## Vedlegg B: Ressurser og lenker

### Dokumentasjon
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Mobile Top 10](https://owasp.org/www-project-mobile-top-10/)
- [MVSP.dev](https://mvsp.dev/)
- [CISA Security Guidelines](https://www.cisa.gov/cybersecurity)

### Verktøy
- [Snyk](https://snyk.io/) - Dependency scanning
- [GitGuardian](https://www.gitguardian.com/) - Secrets detection
- [Doppler](https://www.doppler.com/) - Secrets management
- [Dependabot](https://github.com/dependabot) - Automatiske sikkerhetsoppdateringer

### Auth-løsninger
- [Supabase Auth](https://supabase.com/auth)
- [Clerk](https://clerk.com/)
- [Auth.js](https://authjs.dev/)
- [Auth0](https://auth0.com/)

### Vibe Coding
- [Vibe Coding Best Practices](https://www.upsilonit.com/blog/vibe-coding-mvp-guide)
- [Secure Vibe Coding Guide (CSA)](https://cloudsecurityalliance.org/blog/2025/04/09/secure-vibe-coding-guide)

## Vedlegg C: Tidsestimater

| Prosjekttype | Estimert tid for Fase 4 |
|--------------|------------------------|
| Enkel web-app | 1-2 uker |
| Web-app med database | 2-4 uker |
| Mobile app | 3-6 uker |
| Chrome Extension | 1-2 uker |

*Tid kan reduseres med vibe-koding, men bruk spart tid på verifisering av AI-generert kode.*

---

## 📚 Relaterte filer

### Fase 4-dokumenter:
- **[FASE-4-AI.md](Fase/FASE-4-AI.md)** - AI-instruksjoner for Fase 4
- **[READ-FASE-4-GUIDE.md](Fase/READ-FASE-4-GUIDE.md)** - Prosjektleder-guide for Fase 4

### Fase-navigering:
- **Forrige fase:** [Fase 3: Arkitektur og sikkerhet](../Fase%203%20-%20Arkitektur%20og%20sikkerhet/FASE-3-KOMPLETT.md)
- **Neste fase:** [Fase 5: Bygg funksjonene](../Fase%205%20-%20Bygg%20funksjonene/FASE-5-KOMPLETT.md)

### Relevante agenter:
- **[MVP-agent](../Agenter/agenter/prosess/4-MVP-agent.md)** - Hovedansvarlig for Fase 4: MVP
- **[BYGGER-agent](../Agenter/agenter/basis/BYGGER-agent.md)** - Implementerer kode i 3 stages
- **[SIKKERHETS-agent](../Agenter/agenter/basis/SIKKERHETS-agent.md)** - Security audit

### Systemdokumenter:
- **[READ-KIT-CC-BRUKERHÅNDBOK.md](../../READ-KIT-CC-BRUKERHÅNDBOK.md)** - Komplett guide til Kit CC
- **[agent-PHASE-GATES.md](../Agenter/agenter/system/agent-PHASE-GATES.md)** - Kvalitetsvalidering mellom faser

---

**Dokumentversjon:** 2.0
**Sist oppdatert:** Januar 2026
