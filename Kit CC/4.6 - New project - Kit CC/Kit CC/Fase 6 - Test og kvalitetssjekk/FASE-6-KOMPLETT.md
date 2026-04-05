# Fase 6: Test, sikkerhet og kvalitetssjekk — Fungerer alt?

> **Mål:** Finne og fikse problemer før brukerne gjør det. Verifisere at produktet er sikkert, stabilt, og klart for lansering – med spesielt fokus på utfordringene som følger med AI-generert kode.

[← Forrige: Fase 5](./05-FASE-5-UTVIKLING-OG-ITERASJON.md) | [Tilbake til oversikt](./00-OVERSIKT.md) | [Neste: Fase 7 →](./07-FASE-7-LANSERING-OG-DRIFT.md)

---

## 0. Input fra Fase 5

- Alle funksjoner implementert og integrert (fra Fase 5: Bygg funksjonene)
- Feature flags og kontrollert utrulling på plass
- Brukervalidering gjennomført
- Teknisk gjeld dokumentert
- UI/UX polert
- Ytelsesoptimalisering gjennomført
- Basert på `Kit CC/Agenter/agenter/prosess/5-ITERASJONS-agent.md`

---

## Om dette dokumentet

**Hvem er dette for?**
- **Ikke-tekniske vibekodere** som leder prosjekter med AI-assistert utvikling
- **AI-assistenter** som hjelper med testing og kvalitetssikring
- **Tekniske ressurser** som utfører spesialiserte tester

**Hvordan bruke dokumentet:**
- Hvert punkt forklarer HVA, HVORFOR, VERDI og HVORDAN
- 🤖 **AI-prompt** bokser gir deg ferdige prompts å bruke med din AI-assistent
- 📋 **Sjekklister** kan kopieres direkte inn i prosjektverktøy
- 🎯 **Prioriteringsguiden** hjelper deg velge hva som er relevant for ditt prosjekt

---

### Automatisk tilpasning og verktøy

- **Intensitetstilpasning:** Prioriteringer og krav tilpasses automatisk basert på prosjektets klassifisering (Enkelt hobbyprosjekt → Stort kritisk system). Hva som er obligatorisk, anbefalt eller valgfritt avhenger av prosjekttypen.
- **Kit CC Monitor:** AI-assistenten bruker Kit CC Monitor (en lokal webserver) for å overvåke nettleserfeil, kjøre debug-probes og vise prosjektstatus i sanntid.
- **Automatisk logging:** All fremdrift logges automatisk til PROGRESS-LOG.md. Du trenger ikke gjøre noe — AI-en håndterer dette.

---

## Innholdsfortegnelse

| #  | Tema                                                         | Prioritet   |
|----|--------------------------------------------------------------|-------------|
| 1  | [Viktige prinsipper for VIBE-testing](#1-viktige-prinsipper-for-vibe-testing) | 🔴 Kritisk   |
| 2  | [Entry-kriterier](#2-entry-kriterier) | 🔴 Kritisk   |
| 3  | [Prioriteringsguide](#3-prioriteringsguide) | 🟡 Viktig    |
| 4  | [AI-kode gjennomgang](#4-ai-kode-gjennomgang) | 🔴 Kritisk   |
| 5  | [Security-fokusert prompt-iterasjon](#5-security-fokusert-prompt-iterasjon) | 🔴 Kritisk   |
| 6  | [Teknisk gjeld-vurdering](#6-teknisk-gjeld-vurdering) | 🟡 Viktig    |
| 7  | [OWASP Top 10 (2025) sikkerhetstest](#7-owasp-top-10-2025-sikkerhetstest) | 🔴 Kritisk   |
| 8  | [OWASP API Security Top 10](#8-owasp-api-security-top-10) | 🟡 Viktig    |
| 9  | [Hemmelighetssjekk](#9-hemmelighetssjekk) | 🔴 Kritisk   |
| 10 | [Dependency Scanning (SCA)](#10-dependency-scanning-sca) | 🟡 Viktig    |
| 11 | [DAST – Dynamisk sikkerhetsskanning](#11-dast--dynamisk-sikkerhetsskanning) | 🟡 Viktig    |
| 12 | [Penetrasjonstesting](#12-penetrasjonstesting) | 🟢 Valgfritt |
| 13 | [Manuell testing av brukerflyter](#13-manuell-testing-av-brukerflyter) | 🔴 Kritisk   |
| 14 | [Cross-browser/device testing](#14-cross-browserdevice-testing) | 🟡 Viktig    |
| 15 | [Automatiserte E2E-tester](#15-automatiserte-e2e-tester) | 🟡 Viktig    |
| 16 | [AI-assistert testing (Vibe Testing)](#16-ai-assistert-testing-vibe-testing) | 🟡 Viktig    |
| 17 | [Ytelsestesting (Core Web Vitals)](#17-ytelsestesting-core-web-vitals) | 🟡 Viktig    |
| 18 | [Load testing](#18-load-testing) | 🟢 Valgfritt |
| 19 | [Chaos Engineering](#19-chaos-engineering) | 🟢 Valgfritt |
| 20 | [Tilgjengelighetstest (WCAG 2.2)](#20-tilgjengelighetstest-wcag-22) | 🟡 Viktig    |
| 21 | [Brukertesting](#21-brukertesting) | 🟡 Viktig    |
| 22 | [Visuell regresjonstesting](#22-visuell-regresjonstesting) | 🟢 Valgfritt |
| 23 | [Compliance og plattformkrav](#23-compliance-og-plattformkrav) | 🟡 Viktig    |
| 24 | [GDPR og personverntesting](#61-gdpr-og-personverntesting) | 🟡 Viktig    |
| 25 | [Plattform-spesifikke krav](#62-plattform-spesifikke-krav) | 🟡 Viktig    |
| 26 | [SOC 2 Compliance](#63-soc-2-compliance) | 🟢 Valgfritt |
| 27 | [Bug-håndtering](#71-bug-håndtering) | 🔴 Kritisk   |
| 28 | [Kvalitets-KPIer og målinger](#72-kvalitets-kpier-og-målinger) | 🟡 Viktig    |
| 29 | [AI Governance og sporbarhet](#73-ai-governance-og-sporbarhet) | 🟡 Viktig    |
| 30 | [Exit-kriterier og leveranser](#74-exit-kriterier-og-leveranser) | 🔴 Kritisk   |
| 31 | [Verktøyoversikt](#81-verktøyoversikt) | 🟡 Viktig    |
| 32 | [AI-prompt bibliotek](#82-ai-prompt-bibliotek) | 🟢 Valgfritt |

---

# Del A: Grunnlag og forberedelse

## 0.1 Viktige prinsipper for VIBE-testing

### Avklaring: Fase 6 bygger på Fase 4, erstatter den ikke

**Fase 6 bygger på utviklertestene fra Fase 4-5**, men fokuserer på systematisk kvalitetsvalidering: sikkerhetstesting (OWASP), personvern (GDPR), tilgjengelighet (WCAG), ytelse og cross-browser kompatibilitet. **Fase 6 erstatter IKKE testene fra Fase 4** — den utvider og verifiserer dem. Mens utviklerne skrev enhetstester og integrasjonstester under utvikling, fokuserer Fase 6 på sluttvalidering av hele systemet før lansering.

### Hva dette punktet består av

VIBE-koding (Vibes-Based Coding) betyr å bruke AI til å generere kode basert på naturlig språk. Dette skaper unike utfordringer for testing som tradisjonelle QA-prosesser ikke dekker.

**Tre grunnprinsipper for VIBE-testing:**

| Prinsipp | Forklaring |
|----------|------------|
| **1. AI-kode er "untrusted by default"** | All AI-generert kode må behandles som potensielt usikker inntil den er verifisert |
| **2. Testing viser at feil finnes, ikke at de er fraværende** | Du kan aldri teste deg til et perfekt produkt, men du kan dramatisk redusere risiko |
| **3. Human oversight er ikke-forhandlbart** | AI er en assistent, ikke en erstatning for menneskelig vurdering |

### Hva problemet er

Forskning viser at:
- **45%** av AI-generert kode inneholder sikkerhetssårbarheter
- AI-verktøy som Lovable hadde 170 av 1645 apper med kritiske sikkerhetshull
- "Vibe coding hangover" – senior utviklere rapporterer "development hell" når de skal vedlikeholde AI-kode
- "Two steps back pattern" – å fikse én bug i AI-kode skaper ofte nye bugs

### Hva vi oppnår ved å løse det

- **Redusert risiko** for sikkerhetshendelser og datalekkasjer
- **Høyere kvalitet** på sluttproduktet
- **Mindre teknisk gjeld** som må håndteres senere
- **Trygghet** for at produktet er klart for brukere

### Hvordan vi går frem

**Som prosjektleder (ikke-teknisk):**
1. Forstå at AI-generert kode krever ekstra validering
2. Alloker tid i prosjektplanen for testing (minimum 20% av total tid)
3. Sørg for at noen med teknisk kompetanse gjennomgår kritisk kode
4. Bruk AI til å hjelpe med testing – "vibe testing"

**Som AI-assistent:**
1. Generer alltid tester sammen med kode
2. Identifiser potensielle sikkerhetsproblemer proaktivt
3. Foreslå edge cases og feilscenarier
4. Vær ærlig om begrensninger og usikkerhet

> 🤖 **AI-prompt for prosjektoppstart:**
> ```
> Jeg er prosjektleder for et VIBE-kodingsprosjekt. Vi har nå ferdig
> utviklet [beskriv produktet]. Hjelp meg lage en testplan som tar
> høyde for at mesteparten av koden er AI-generert. Inkluder:
> 1. Kritiske områder som må testes ekstra nøye
> 2. Estimert tidsbruk for hver testaktivitet
> 3. Hvilke tester jeg kan gjøre selv vs. trenger teknisk hjelp til
> ```

---

## 0.2 Entry-kriterier

### Hva dette punktet består av

Entry-kriterier er forutsetninger som MÅ være på plass før du starter Fase 6. Å starte testing uten disse på plass fører til bortkastet tid og upålitelige resultater.

### Hva problemet er

Mange prosjekter hopper inn i testing for tidlig, noe som fører til:
- Testing av uferdige funksjoner (må testes på nytt)
- Ustabilt testmiljø gir falske feilmeldinger
- Manglende testdata gjør det umulig å teste realistiske scenarier

### Hva vi oppnår ved å løse det

- **Effektiv testing** – ingen bortkastet tid på å teste ting som ikke er klare
- **Pålitelige resultater** – testresultater du kan stole på
- **Klar kommunikasjon** – alle vet når testing faktisk kan starte

### Hvordan vi går frem

**Sjekkliste – Bekreft før du starter Fase 6:**

| # | Kriterie | Hva det betyr i praksis | Status |
|---|----------|-------------------------|--------|
| 1 | **Kodefullført** | Alle planlagte funksjoner er implementert. Ingen "kommer snart". | ☐ |
| 2 | **Testmiljø klart** | En versjon av appen som speiler produksjon, men som er trygg å eksperimentere med | ☐ |
| 3 | **Testdata tilgjengelig** | Realistiske (men ikke ekte) brukerdata å teste med | ☐ |
| 4 | **Grunnleggende tester passerer** | AI-assistenten bekrefter at basisfunksjonalitet virker | ☐ |
| 5 | **Dokumentasjon fra Fase 5** | Oversikt over hva som er bygget og hvordan | ☐ |
| 6 | **AI-kode er dokumentert** | Logg over hvilke deler som er AI-generert | ☐ |

> 🤖 **AI-prompt for å verifisere entry-kriterier:**
> ```
> Gå gjennom prosjektet vårt og bekreft følgende entry-kriterier
> for Fase 6:
>
> 1. Er alle planlagte funksjoner implementert? List opp status.
> 2. Fungerer testmiljøet? Kjør en enkel test.
> 3. Har vi testdata? Beskriv hva som finnes.
> 4. Passerer grunnleggende tester? Kjør dem og rapporter.
> 5. Er dokumentasjonen oppdatert?
> 6. Hvilke deler av koden er AI-generert?
>
> Gi meg en tydelig JA/NEI for hvert punkt med forklaring.
> ```

### Annen viktig info

**Hva hvis et kriterie ikke er oppfylt?**
- Gå tilbake til Fase 5 og fullfør det som mangler
- Ikke start testing med "vi fikser det underveis" – det fungerer aldri

---

## 0.3 Prioriteringsguide

### Hva dette punktet består av

Ikke alle prosjekter trenger alle tester. Denne guiden hjelper deg velge riktig testnivå basert på prosjektets størrelse, risiko og målgruppe.

### Hva problemet er

- For lite testing = Bugs og sikkerhetshull når brukerne
- For mye testing = Bortkastet tid og forsinkelser
- Feil prioritering = Kritiske ting testes ikke, trivielle ting testes grundig

### Hva vi oppnår ved å løse det

- **Riktig ressursbruk** – test det som faktisk betyr noe
- **Raskere lansering** – ikke test mer enn nødvendig
- **Lavere risiko** – kritiske ting får mest oppmerksomhet

### Hvordan vi går frem

**Steg 1: Identifiser din prosjektkategori**

| Kategori | Beskrivelse | Eksempler |
|----------|-------------|-----------|
| **A: Lite internt** | Verktøy for eget bruk, ingen sensitive data | Personlig todo-app, hobby-prosjekt |
| **B: Internt m/data** | Internt verktøy med database/brukerdata | Intern dashboard, team-verktøy |
| **C: Kundevendt** | Produkt for eksterne brukere | SaaS-app, nettbutikk, kunde-portal |
| **D: Stor skala** | Mange brukere, sensitive data, høye krav | Fintech, helse, enterprise |

**Steg 2: Bruk prioriteringsmatrisen**

| Testaktivitet | A: Lite | B: Internt | C: Kunde | D: Stor |
|---------------|---------|------------|----------|---------|
| **AI-kode gjennomgang** | Moderat | Viktig | Kritisk | Kritisk |
| **Security prompting** | Lav | Viktig | Kritisk | Kritisk |
| **OWASP Top 10** | Enkel | Viktig | Kritisk | Kritisk |
| **API Security** | Lav | Moderat | Kritisk | Kritisk |
| **Hemmelighetssjekk** | Viktig | Kritisk | Kritisk | Kritisk |
| **Dependency Scan** | Viktig | Kritisk | Kritisk | Kritisk |
| **DAST scanning** | Nei | Moderat | Viktig | Kritisk |
| **Penetrasjonstest** | Nei | Valgfritt | Anbefalt | Kritisk |
| **Manuell testing** | Moderat | Viktig | Kritisk | Kritisk |
| **Cross-browser** | Lav | Moderat | Kritisk | Kritisk |
| **E2E-automatisering** | Nei | Valgfritt | Anbefalt | Kritisk |
| **AI-assistert testing** | Lav | Moderat | Viktig | Kritisk |
| **Ytelsestest** | Lav | Moderat | Viktig | Kritisk |
| **Load testing** | Nei | Lav | Moderat | Kritisk |
| **Chaos engineering** | Nei | Nei | Valgfritt | Anbefalt |
| **Tilgjengelighet** | Lav | Moderat | Viktig | Kritisk |
| **Brukertesting** | Lav | Moderat | Viktig | Kritisk |
| **Visuell regresjon** | Nei | Valgfritt | Anbefalt | Kritisk |
| **GDPR-testing** | Nei | Moderat | Kritisk | Kritisk |
| **Plattformkrav** | N/A | N/A | Kritisk | Kritisk |
| **SOC 2** | Nei | Nei | Valgfritt | Anbefalt |

**Forklaring av prioritetsnivåer:**
- **Kritisk** = Må gjøres før lansering, ingen unntak
- **Viktig** = Bør gjøres, unntak kun med dokumentert risikoaksept
- **Anbefalt** = Gjør hvis tid og ressurser tillater
- **Moderat** = Vurder basert på spesifikke forhold
- **Lav** = Valgfritt, men kan gi verdi
- **Nei** = Ikke nødvendig for denne kategorien

> 🤖 **AI-prompt for prioritering:**
> ```
> Mitt prosjekt er: [beskriv prosjektet]
>
> Basert på følgende kriterier, hvilken kategori tilhører prosjektet?
> - Hvem er brukerne? (meg selv / internt team / eksterne kunder)
> - Hvilke data håndteres? (ingen sensitive / noe sensitiv / svært sensitiv)
> - Hvor mange brukere forventes? (få / moderat / mange)
> - Er det regulatoriske krav? (nei / noen / strenge)
>
> Gi meg en prioritert liste over hvilke tester jeg MÅ gjøre, BØR gjøre,
> og KAN vurdere.
> ```

---

# Del B: Validering av AI-generert kode

## 1.1 AI-kode gjennomgang

### Hva dette punktet består av

En systematisk gjennomgang av all AI-generert kode for å sikre at den er forståelig, sikker, og vedlikeholdbar. Dette er den viktigste nye aktiviteten for VIBE-kodingsprosjekter.

### Hva problemet er

**Simon Willison (anerkjent utvikler) sier:**
> "Hvis en LLM skrev hver linje av koden din, men du har gjennomgått, testet, og forstått alt – er det ikke vibe coding. Det er å bruke en LLM som skriveassistent."

Problemet med å akseptere AI-kode uten gjennomgang:
- **Sikkerhetshull:** AI genererer ofte usikker kode (hardkodede passord, SQL injection, XSS)
- **Teknisk gjeld:** Kode som fungerer, men er vanskelig å vedlikeholde
- **Skjulte avhengigheter:** AI bruker ofte utdaterte eller usikre biblioteker
- **Manglende feilhåndtering:** AI glemmer ofte edge cases

### Hva vi oppnår ved å løse det

- **Forståelse:** Du (eller teamet) forstår faktisk hva koden gjør
- **Sikkerhet:** Sikkerhetshull fanges før lansering
- **Vedlikeholdbarhet:** Koden kan endres og forbedres senere
- **Eierskap:** Teamet kan ta ansvar for koden

### Hvordan vi går frem

**For prosjektleder (ikke-teknisk):**

Du trenger ikke forstå hver linje kode, men du må sikre at noen gjør det.

1. **Kategoriser koden etter risiko:**

| Risiko | Type kode | Hvem bør gjennomgå |
|--------|-----------|-------------------|
| Høy | Autentisering, betaling, persondata | Erfaren utvikler |
| Medium | Forretningslogikk, API-er | Teknisk ressurs |
| Lav | UI-komponenter, styling | Kan gjennomgås med AI |

2. **Bruk AI til å forklare koden:**

> 🤖 **AI-prompt for kodeforklaring:**
> ```
> Forklar denne koden på en måte som en ikke-teknisk person kan forstå:
>
> [lim inn koden]
>
> Spesifikt vil jeg vite:
> 1. Hva gjør denne koden i enkle ord?
> 2. Hvilke data håndterer den?
> 3. Er det noen sikkerhetsrisikoer jeg bør være klar over?
> 4. Hva kan gå galt hvis denne koden feiler?
> ```

3. **Still kritiske spørsmål:**

> 🤖 **AI-prompt for kritisk gjennomgang:**
> ```
> Gjennomgå denne AI-genererte koden kritisk:
>
> [lim inn koden]
>
> Svar på:
> 1. Er det hardkodede hemmeligheter (passord, API-nøkler)?
> 2. Er brukerinput validert og sanitert?
> 3. Er det SQL injection eller XSS-sårbarheter?
> 4. Håndteres feil på en god måte?
> 5. Er det utdaterte eller usikre avhengigheter?
> 6. Hva mangler som burde vært der?
>
> For hvert problem, vis hvor i koden det er og hvordan det bør fikses.
> ```

**Sjekkliste for AI-kode gjennomgang:**

```
☐ All høyrisiko-kode er gjennomgått av menneske med teknisk kompetanse
☐ Koden er forklart og dokumentert
☐ Ingen hardkodede hemmeligheter funnet
☐ Input-validering er på plass
☐ Feilhåndtering er implementert
☐ Avhengigheter er oppdaterte og sikre
☐ Koden følger prosjektets kodestandard
```

### Annen viktig info

**Når skal du være ekstra skeptisk til AI-kode?**
- Kode som håndterer innlogging eller autentisering
- Kode som håndterer betaling eller penger
- Kode som håndterer personlige data
- Kode som kommuniserer med eksterne systemer
- Kode som ble generert med vage eller uklare prompts

---

## 1.2 Security-fokusert prompt-iterasjon

### Hva dette punktet består av

En teknikk for å dramatisk forbedre sikkerheten i AI-generert kode ved å bruke spesifikke prompts som eksplisitt ber om sikker kode.

### Hva problemet er

Standard AI-prompts som "lag en innloggingsfunksjon" produserer ofte usikker kode fordi:
- AI optimaliserer for "fungerer" ikke "sikker"
- AI bruker eksempler fra internett som ofte er usikre
- AI mangler kontekst om sikkerhetskrav
- AI tar snarveier for å gi kort, lesbar kode

### Hva vi oppnår ved å løse det

Forskning viser at security-fokuserte prompts kan:
- Redusere sårbarheter med **50-70%**
- Fange problemer før koden i det hele tatt er skrevet
- Spare tid på sikkerhetstesting senere
- Lære deg å tenke mer sikkerhetsbevisst

### Hvordan vi går frem

**Tre-stegs prompt-teknikk:**

**Steg 1: Generer med sikkerhetskrav**

Dårlig prompt:
```
Lag en innloggingsfunksjon
```

God prompt:
```
Lag en sikker innloggingsfunksjon som:
- Hasher passord med bcrypt eller argon2 (IKKE md5 eller sha1)
- Beskytter mot brute force med rate limiting
- Validerer og saniterer all input
- Bruker parameteriserte queries (aldri string concatenation)
- Logger mislykkede innloggingsforsøk
- Ikke avslører om brukernavn eksisterer
- Bruker HTTPS og sikre cookies
```

**Steg 2: Be om sikkerhetsreview**

> 🤖 **AI-prompt for security review:**
> ```
> Analyser denne koden for sikkerhetssårbarheter:
>
> [lim inn koden]
>
> Sjekk spesifikt for:
> 1. OWASP Top 10 sårbarheter
> 2. Hardkodede hemmeligheter
> 3. Input validation mangler
> 4. SQL/NoSQL injection
> 5. XSS (Cross-Site Scripting)
> 6. Usikker autentisering/autorisasjon
> 7. Sensitive data eksponering
> 8. Manglende feilhåndtering
>
> For hvert problem funnet:
> - Vis den sårbare koden
> - Forklar risikoen
> - Vis den sikre versjonen
> ```

**Steg 3: Iterer til sikkert**

> 🤖 **AI-prompt for sikkerhetsforbedring:**
> ```
> Du fant følgende sikkerhetsproblemer i koden:
> [liste over problemer]
>
> Generer en ny versjon av koden som fikser ALLE disse problemene.
> Behold all funksjonalitet, men gjør den sikker.
>
> Etter du har generert ny kode, analyser den på nytt og bekreft
> at alle problemer er løst.
> ```

**Beste praksis for sikre prompts:**

| Område | Inkluder i prompt |
|--------|-------------------|
| Autentisering | "bruk bcrypt/argon2, implementer rate limiting" |
| Database | "bruk parameteriserte queries, aldri string concat" |
| Input | "valider og saniter all brukerinput" |
| Output | "escape all output, bruk Content Security Policy" |
| Feilhåndtering | "gi generiske feilmeldinger, logg detaljer sikkert" |
| Hemmeligheter | "bruk miljøvariabler, aldri hardkod" |

### Annen viktig info

**Security-prompt mal du kan gjenbruke:**

```
Lag [funksjon/komponent] som følger disse sikkerhetskravene:

AUTENTISERING:
- [ ] Passord hashet med bcrypt (cost factor 12+) eller argon2
- [ ] Rate limiting på innlogging (maks 5 forsøk per minutt)
- [ ] Session timeout etter inaktivitet

INPUT HÅNDTERING:
- [ ] All input validert mot forventet format
- [ ] All input sanitert før bruk
- [ ] Parameteriserte database-queries

OUTPUT HÅNDTERING:
- [ ] All output escaped for kontekst (HTML, JS, SQL)
- [ ] Content-Type headers satt korrekt

FEILHÅNDTERING:
- [ ] Generiske feilmeldinger til bruker
- [ ] Detaljerte feil logget (uten sensitive data)
- [ ] Graceful degradering ved feil

HEMMELIGHETER:
- [ ] Ingen hardkodede verdier
- [ ] Alle hemmeligheter fra miljøvariabler
```

---

## 1.3 Teknisk gjeld-vurdering

### Hva dette punktet består av

En vurdering av hvor mye "gjeld" AI-koden har pådratt seg – altså kode som fungerer nå, men som vil skape problemer senere.

### Hva problemet er

AI-generert kode akkumulerer teknisk gjeld raskt fordi:
- AI prioriterer "fungerer" over "vedlikeholdbart"
- AI kopierer mønstre fra utdaterte eksempler
- AI lager ofte "one-off" løsninger istedenfor gjenbrukbar kode
- AI dokumenterer sjelden koden sin
- "Two steps back pattern": Fikse én bug introduserer nye

**Konsekvenser av teknisk gjeld:**
- Endringer blir vanskeligere og dyrere over tid
- Bugs blir vanskeligere å finne og fikse
- Onboarding av nye utviklere tar lengre tid
- Produktet blir ustabilt

### Hva vi oppnår ved å løse det

- **Forutsigbarhet:** Vet hva du går inn i før lansering
- **Planlegging:** Kan budsjettere tid for å betale ned gjeld
- **Langsiktighet:** Produktet forblir vedlikeholdbart

### Hvordan vi går frem

**For prosjektleder (ikke-teknisk):**

Du trenger ikke forstå teknisk gjeld i detalj, men du må:
1. Vite at det eksisterer og må håndteres
2. Få en vurdering fra AI eller teknisk ressurs
3. Planlegge tid for å adressere kritisk gjeld

> 🤖 **AI-prompt for teknisk gjeld-vurdering:**
> ```
> Analyser dette prosjektet for teknisk gjeld:
>
> [beskriv prosjektet eller lim inn kodestruktur]
>
> Vurder og scorer (1-5) følgende områder:
>
> 1. KODEKVALITET
>    - Er koden lesbar og forståelig?
>    - Er det duplisert kode som burde vært gjenbrukt?
>    - Følger koden konsistente mønstre?
>
> 2. DOKUMENTASJON
>    - Er funksjoner og komponenter dokumentert?
>    - Finnes det README eller arkitekturdokumentasjon?
>
> 3. AVHENGIGHETER
>    - Er biblioteker oppdaterte?
>    - Er det unødvendige avhengigheter?
>    - Er det utdaterte eller usikre pakker?
>
> 4. TESTBARHET
>    - Kan koden testes enkelt?
>    - Er det tester på plass?
>
> 5. VEDLIKEHOLDBARHET
>    - Hvor vanskelig er det å gjøre endringer?
>    - Er det tight coupling mellom komponenter?
>
> Gi meg:
> - Total gjeld-score (1-5)
> - Topp 3 ting som MÅ fikses før lansering
> - Topp 3 ting som bør fikses etter lansering
> - Estimert tid for å adressere kritisk gjeld
> ```

**Kategorisering av teknisk gjeld:**

| Kategori | Beskrivelse | Handling |
|----------|-------------|----------|
| **Kritisk** | Vil forårsake problemer snart | Fiks før lansering |
| **Høy** | Vil bremse videre utvikling | Planlegg fiks innen 30 dager |
| **Medium** | Irriterende, men håndterbart | Backlog for fremtidig sprint |
| **Lav** | Nice to fix | Vurder ved anledning |

### Annen viktig info

**Akseptabel teknisk gjeld for lansering:**
- Kategori C/D prosjekter: Kun kritisk gjeld må fikses
- Kategori A/B prosjekter: Kritisk + høy bør vurderes
- All kritisk gjeld må dokumenteres med plan for å fikse

---

# Del C: Sikkerhetstesting

## 2.1 OWASP Top 10 (2025) Sikkerhetstest

### Hva dette punktet består av

OWASP (Open Web Application Security Project) publiserer en liste over de ti vanligste og farligste sikkerhetssårbarhetene. Dette er industristandarden for hva du MÅ sjekke.

### Hva problemet er

Disse ti sårbarhetene utgjør **over 90%** av alle sikkerhetsangrep på webapplikasjoner. Hvis du ikke tester for dem, er det nesten garantert at appen din har minst én av dem.

### Hva vi oppnår ved å løse det

- **Beskyttelse** mot de vanligste angrepene
- **Compliance** med sikkerhetsstandarder
- **Troverdighet** hos brukere og kunder
- **Redusert risiko** for datalekkasjer og nedetid

### Hvordan vi går frem

**OWASP Top 10:2025 oversikt:**

| # | Sårbarhet | Hva det betyr | Konsekvens |
|---|-----------|---------------|------------|
| A01 | **Broken Access Control** | Brukere kan gjøre ting de ikke skal | Datatyveri, uautoriserte handlinger |
| A02 | **Security Misconfiguration** | Feil innstillinger, standardpassord | Full systemkompromittering |
| A03 | **Software Supply Chain** | Usikre avhengigheter | Malware, bakdører i koden |
| A04 | **Cryptographic Failures** | Data ikke kryptert riktig | Datalekkasje |
| A05 | **Injection** | Ondsinnet input kjøres | Database tømmes, system overtas |
| A06 | **Insecure Design** | Grunnleggende designfeil | Varig sårbarhet |
| A07 | **Authentication Failures** | Svak innlogging | Kontoer overtas |
| A08 | **Data Integrity Failures** | Stole på uverifisert data | Manipulasjon |
| A09 | **Security Logging Failures** | Manglende logging | Angrep oppdages ikke |
| A10 | **Server-Side Request Forgery** | Server lures til å gjøre requests | Intern nettverkstilgang |

**For prosjektleder (ikke-teknisk):**

Du kan bruke AI til å gjennomføre en OWASP-sjekk:

> 🤖 **AI-prompt for OWASP-sjekk:**
> ```
> Gjennomfør en OWASP Top 10:2025 sikkerhetssjekk av prosjektet.
>
> For hver av de 10 kategoriene:
> 1. Forklar hva sårbarheten betyr i enkle ord
> 2. Sjekk om prosjektet vårt er sårbart
> 3. Hvis sårbart: Vis konkret hvor og hvordan fikse det
> 4. Hvis ikke sårbart: Forklar hvorfor vi er beskyttet
>
> Gi meg en tabell med:
> - Kategori
> - Status (Sårbar/Beskyttet/Delvis)
> - Risiko (Kritisk/Høy/Medium/Lav)
> - Handling (hva må gjøres)
> ```

**Detaljert sjekkliste for hver kategori:**

#### A01: Broken Access Control
```
[ ] Kan en vanlig bruker få tilgang til admin-sider?
[ ] Kan en bruker se en annen brukers data ved å endre ID i URL?
[ ] Er alle API-endepunkter beskyttet med autentisering?
[ ] Sjekker systemet at brukeren HAR LOV til å gjøre handlingen?
```

#### A02: Security Misconfiguration
```
[ ] Er debug-modus deaktivert i produksjon?
[ ] Er standard-passord endret?
[ ] Vises detaljerte feilmeldinger til brukere? (skal ikke)
[ ] Er unødvendige funksjoner/porter deaktivert?
[ ] Er security headers satt?
```

#### A03: Software Supply Chain
```
[ ] Er alle avhengigheter skannet for sårbarheter?
[ ] Brukes lock-filer (package-lock.json)?
[ ] Er CI/CD pipeline sikret?
```

#### A04: Cryptographic Failures
```
[ ] Brukes HTTPS overalt?
[ ] Er passord hashet (bcrypt/argon2)?
[ ] Er sensitiv data kryptert i databasen?
[ ] Brukes TLS 1.2 eller nyere?
```

#### A05: Injection
```
[ ] Brukes parameteriserte queries (prepared statements)?
[ ] Er all brukerinput validert?
[ ] Er output escaped for kontekst (HTML, JS)?
```

#### A06: Insecure Design
```
[ ] Er rate limiting implementert?
[ ] Låses kontoer etter mislykkede innloggingsforsøk?
[ ] Er passordgjenoppretting sikker (tidsbegrenset token)?
```

#### A07: Authentication Failures
```
[ ] Avvises svake passord?
[ ] Lages ny session-ID etter innlogging?
[ ] Er det session timeout?
[ ] Er MFA tilgjengelig (for sensitive apper)?
```

#### A08: Data Integrity Failures
```
[ ] Verifiseres data som kommer fra eksterne kilder?
[ ] Er det integritetssjekk på filer og pakker?
```

#### A09: Security Logging Failures
```
[ ] Logges innloggingsforsøk?
[ ] Logges tilgangsfeil?
[ ] Er sensitive data IKKE i logger?
[ ] Er det varsling på mistenkelig aktivitet?
```

#### A10: Server-Side Request Forgery (SSRF)
```
[ ] Valideres URL-er som serveren skal hente?
[ ] Blokkeres interne IP-adresser?
```

### Annen viktig info

**Minimum for lansering (alle prosjekter):**
- A01, A03, A04, A05, A07 må være adressert
- Andre kan vurderes basert på risiko

**For tekniske ressurser – test-kommandoer:**

```bash
# Sjekk security headers
curl -I https://din-app.no | grep -E "X-Content-Type|X-Frame|Strict-Transport|Content-Security"

# Forventede headers:
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# Strict-Transport-Security: max-age=31536000
# Content-Security-Policy: default-src 'self'
```

---

## 2.2 OWASP API Security Top 10

### Hva dette punktet består av

Hvis produktet ditt har API-er (programmeringsgrensesnitt som appen bruker for å kommunisere), gjelder en egen sikkerhetsliste spesifikt for API-er.

### Hva problemet er

API-er er ofte "bakdøren" som angripere bruker fordi:
- De er designet for å gi tilgang til data
- De er ofte dårligere beskyttet enn brukergrensesnittet
- Feil i API-er kan gi tilgang til ALLE brukeres data
- AI-generert kode glemmer ofte API-sikkerhet

**Den vanligste API-sårbarheten (BOLA):**

Broken Object Level Authorization betyr at bruker A kan få tilgang til bruker B sine data bare ved å endre en ID i URL-en.

Eksempel:
- Bruker A sin URL: `api.no/orders/123`
- Bruker A endrer til: `api.no/orders/456`
- Hvis 456 er bruker B sin ordre, og A får se den = BOLA

### Hva vi oppnår ved å løse det

- **Dataintegritet:** Brukere ser kun sine egne data
- **Tillit:** Kundene stoler på at dataene deres er trygge
- **Compliance:** Overholdelse av personvernregler

### Hvordan vi går frem

> 🤖 **AI-prompt for API-sikkerhetssjekk:**
> ```
> Analyser alle API-endepunktene i prosjektet for sikkerhetssårbarheter.
>
> For hvert endepunkt, sjekk:
>
> 1. BOLA (Broken Object Level Authorization)
>    - Kan en bruker få tilgang til andre brukeres ressurser?
>    - Sjekkes eierskap før data returneres?
>
> 2. AUTENTISERING
>    - Kreves gyldig token/session?
>    - Valideres token korrekt?
>
> 3. RATE LIMITING
>    - Er det begrensning på antall requests?
>    - Hva skjer ved for mange requests?
>
> 4. INPUT VALIDERING
>    - Valideres all input?
>    - Hva skjer med uventet input?
>
> 5. DATA EKSPONERING
>    - Returneres mer data enn nødvendig?
>    - Er sensitive felt filtrert bort?
>
> Gi meg en tabell over alle endepunkter med status og anbefalinger.
> ```

**API Security sjekkliste:**

```
☐ BOLA-test utført på alle endepunkter
☐ Rate limiting implementert
☐ JWT/token valideres korrekt (signatur + utløp)
☐ Ingen sensitive data i URL-parametere
☐ Input validering på alle endepunkter
☐ HTTPS påkrevd
☐ API-versjonering implementert
☐ Paginering med maks grense (forhindrer data dump)
☐ Feilmeldinger avslører ikke intern info
```

**Eksempel på sårbar vs sikker kode:**

```javascript
// 🔴 SÅRBAR - Ingen sjekk av eierskap
app.get('/api/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order); // Hvem som helst kan se hvem som helst sin ordre!
});

// 🟢 SIKKER - Sjekker at brukeren eier ressursen
app.get('/api/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Not found' });
  }
  if (order.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  res.json(order);
});
```

### Annen viktig info

**Prioritering etter prosjekttype:**

| Prosjekttype | API Security prioritet |
|--------------|------------------------|
| Ingen API | Ikke relevant |
| Internt API | Moderat |
| Kundevendt API | Kritisk |
| Offentlig API | Kritisk++ |

---

## 2.3 Hemmelighetssjekk

### Hva dette punktet består av

En grundig gjennomgang for å sikre at ingen API-nøkler, passord, tokens, eller andre hemmeligheter er lagret i koden eller versjonskontrollhistorikken.

### Hva problemet er

**Dette er kanskje den vanligste feilen i AI-generert kode.**

- AI viser ofte eksempler med hardkodede nøkler
- Utviklere glemmer å fjerne test-hemmeligheter
- Git-historikken husker alt – selv slettede hemmeligheter
- Hackere har automatiske verktøy som skanner GitHub kontinuerlig
- En lekket API-nøkkel kan bli misbrukt **innen minutter**

**Konsekvenser:**
- Kryptovaluta-wallets tømmes
- Sky-ressurser spinnes opp (du får regningen)
- Databaser eksporteres
- Kontoer overtas

### Hva vi oppnår ved å løse det

- **Sikkerhet:** Ingen uautorisert tilgang via lekkede nøkler
- **Kostnadskontroll:** Ingen uventede sky-regninger
- **Compliance:** Overholder sikkerhetsstandarder

### Hvordan vi går frem

**For prosjektleder (ikke-teknisk):**

> 🤖 **AI-prompt for hemmelighetssjekk:**
> ```
> Gjennomfør en komplett hemmelighetssjekk av prosjektet.
>
> Søk etter og rapporter:
>
> 1. ÅPENBARE HEMMELIGHETER
>    - Passord i kode
>    - API-nøkler
>    - Tokens
>    - Connection strings
>
> 2. VANLIGE MØNSTRE
>    - "password", "secret", "api_key", "token"
>    - "sk_live" (Stripe), "AKIA" (AWS)
>    - Base64-encodede strenger som kan være hemmeligheter
>
> 3. RISIKABLE FILER
>    - .env filer som er committed
>    - config.json med sensitive verdier
>    - Backup-filer (.bak, .old)
>
> 4. GIT-HISTORIKK
>    - Hemmeligheter som har vært i koden men er fjernet
>
> For hvert funn:
> - Hvor er det funnet
> - Hva type hemmelighet det er
> - Hvor kritisk det er
> - Hva som må gjøres
> ```

**Vanlige gjemmesteder for hemmeligheter:**

| Sted | Risiko | Hva å se etter |
|------|--------|----------------|
| Direkte i kode | Høy | `const API_KEY = "abc123"` |
| Konfigurasjonsfiler | Høy | .json, .yaml, .env som er committed |
| Git-historikk | Høy | Selv om det er slettet, er det i historikken |
| Kommentarer | Medium | `// TODO: Fjern før prod: apikey=...` |
| Feilmeldinger | Medium | Stack traces som viser connection strings |
| Docker-images | Høy | Hemmeligheter bakt inn i image |
| CI/CD logs | Medium | Ukrypterte hemmeligheter i build-logger |

**Hva gjør du hvis du finner en hemmelighet?**

⚠️ **KRITISK:** Hvis en hemmelighet har vært i git-historikken, anta at den er kompromittert.

```
1. ROTER HEMMELIGHETEN UMIDDELBART
   - Generer en ny nøkkel/passord hos tjenesteleverandøren

2. DEAKTIVER DEN GAMLE
   - Gå til tjenesten (Stripe, AWS, etc.) og revoke/deaktiver

3. FJERN FRA KODE
   - Flytt til miljøvariabler (.env som IKKE committes)
   - Oppdater koden til å lese fra miljøvariabler

4. VURDER Å RENSE GIT-HISTORIKK
   - Bruk BFG Repo-Cleaner hvis nøkkelen må fjernes helt
```

**Riktig måte å håndtere hemmeligheter:**

```javascript
// 🔴 FEIL - Hardkodet
const stripe = new Stripe('sk_live_abc123...');

// 🟢 RIKTIG - Fra miljøvariabel
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
```

**Verktøy for automatisk skanning:**

| Verktøy | Beskrivelse | Pris |
|---------|-------------|------|
| gitleaks | Rask, CI/CD-vennlig | Gratis |
| trufflehog | Skanner git-historikk | Gratis |
| GitHub Secret Scanning | Automatisk varsling | Gratis |
| GitGuardian | Enterprise-løsning | Betalt |

### Annen viktig info

**Sjekkliste før lansering:**

```
☐ Hemmelighetssjekk kjørt på kodebasen
☐ Hemmelighetssjekk kjørt på git-historikk
☐ Alle hemmeligheter er i miljøvariabler (ikke i kode)
☐ .env er i .gitignore
☐ Hvis hemmeligheter ble funnet: rotert og deaktivert
```

---

## 2.4 Dependency Scanning (SCA)

### Hva dette punktet består av

Software Composition Analysis (SCA) skanner alle eksterne pakker og biblioteker prosjektet bruker for kjente sårbarheter.

### Hva problemet er

**Supply chain-angrep er nå #3 på OWASP Top 10** fordi:
- 90% av moderne apper bruker open source-komponenter
- AI velger ofte populære men utdaterte pakker
- Én sårbar pakke kan kompromittere hele appen
- Angripere publiserer aktivt malware-pakker med lignende navn

**Virkelige eksempler:**
- Log4Shell (2021): Én sårbarhet påvirket millioner av systemer
- Event-stream (2018): Populær npm-pakke ble kapret for å stjele Bitcoin
- Colors.js (2022): Utvikler saboterte egen populære pakke

### Hva vi oppnår ved å løse det

- **Beskyttelse** mot kjente sårbarheter
- **Oversikt** over hva som faktisk er i kodebasen
- **Compliance** for SBOM-krav (Software Bill of Materials)
- **Proaktivitet** – oppdages før angripere utnytter

### Hvordan vi går frem

**For prosjektleder (ikke-teknisk):**

> 🤖 **AI-prompt for dependency-sjekk:**
> ```
> Gjennomfør en komplett avhengighetsanalyse:
>
> 1. List alle eksterne pakker/biblioteker som brukes
> 2. Sjekk hver pakke for kjente sårbarheter
> 3. Identifiser utdaterte pakker
> 4. Finn pakker som ikke lenger vedlikeholdes
>
> Presenter resultatet som:
>
> KRITISKE SÅRBARHETER (må fikses umiddelbart):
> - Pakke: versjon - sårbarhet - anbefalt handling
>
> HØYE SÅRBARHETER (fiks før lansering):
> - ...
>
> MEDIUM/LAVE (planlegg oppdatering):
> - ...
>
> UTDATERTE PAKKER (vurder oppdatering):
> - ...
> ```

**Handlingsmatrise:**

| Alvorlighet | Beskrivelse | Handling | Tidsfrist |
|-------------|-------------|----------|-----------|
| **Critical** | Aktivt utnyttet eller triviell å utnytte | Fiks umiddelbart | Før lansering |
| **High** | Alvorlig sårbarhet | Fiks snarest | Før lansering |
| **Medium** | Moderat risiko | Planlegg fiks | Innen 30 dager |
| **Low** | Lav risiko | Vurder | Ved anledning |

**For tekniske ressurser – kommandoer:**

```bash
# Node.js / npm
npm audit
npm audit fix  # Automatisk fiks (vær forsiktig)

# Python
pip-audit

# Generell skanning med Trivy
trivy fs --scanners vuln .

# Generer SBOM
syft . -o json > sbom.json
```

**Hva er en SBOM?**

Software Bill of Materials er en komplett liste over alle komponenter i appen. Dette blir stadig viktigere fordi:
- EU krever SBOM for mange sektorer
- Gir rask respons ved nye sårbarheter ("er vi påvirket av X?")
- Sikrer lisens-compliance

### Annen viktig info

**Sjekkliste:**

```
☐ Dependency scan kjørt
☐ Alle kritiske sårbarheter fikset
☐ Alle høye sårbarheter fikset (eller dokumentert akseptert risiko)
☐ SBOM generert og lagret
☐ Plan for regelmessig skanning etter lansering
```

---

## 2.5 DAST – Dynamisk sikkerhetsskanning

### Hva dette punktet består av

Dynamic Application Security Testing (DAST) tester den kjørende applikasjonen ved å simulere angrep utenfra, akkurat som en ekte hacker ville gjort.

### Hva problemet er

DAST finner problemer som ikke synes i koden:
- Feil i serveroppsett
- Manglende security headers
- Misconfigurations som bare vises i kjørende app
- Problemer med hvordan komponenter samhandler

### Hva vi oppnår ved å løse det

- **Realistisk testing** – tester slik angripere faktisk angriper
- **Færre false positives** enn statisk analyse
- **Finner konfigurasjonsfeil** som kodeskanning ikke ser

### Hvordan vi går frem

**For prosjektleder (ikke-teknisk):**

DAST krever typisk teknisk kompetanse, men du kan:

1. **Bestille DAST som tjeneste:** Mange selskaper tilbyr automatisert DAST-skanning
2. **Be teknisk ressurs kjøre OWASP ZAP:** Gratis og godt verktøy
3. **Bruke online tjenester:** Noen tilbyr gratis grunnleggende skanning

> 🤖 **AI-prompt for å forberede DAST:**
> ```
> Jeg skal gjennomføre en DAST-skanning av applikasjonen.
>
> 1. Hva må være på plass før skanning?
> 2. Hvilke URL-er og endepunkter bør inkluderes?
> 3. Trenger vi test-brukere med ulike roller?
> 4. Hva slags rapport bør jeg be om?
> 5. Hvordan tolker jeg resultatene?
> ```

**Verktøy:**

| Verktøy | Beskrivelse | Pris | Hvem kan bruke |
|---------|-------------|------|----------------|
| OWASP ZAP | Mest brukte gratis | Gratis | Teknisk |
| Burp Suite | Industri-standard | Community gratis | Teknisk |
| Detectify | Automatisert | Betalt | Ikke-teknisk |

**Prioritering:**

| Prosjekttype | DAST prioritet |
|--------------|----------------|
| Lite internt | Nei |
| Internt m/data | Moderat |
| Kundevendt | Viktig |
| Stor skala | Kritisk |

### Annen viktig info

**Når DAST gir mest verdi:**
- Etter at appen er deployet til testmiljø
- Før produksjons-lansering
- Etter større endringer

---

## 2.6 Penetrasjonstesting

### Hva dette punktet består av

Et simulert angrep utført av sikkerhetseksperter som tenker kreativt som en angriper, utover systematiske sjekklister.

### Hva problemet er

Automatiske verktøy finner bare kjente sårbarhetsmønstre. Ekte angripere:
- Kombinerer små svakheter til større angrep
- Finner logiske feil som verktøy ikke ser
- Tenker kreativt om hvordan systemet kan misbrukes
- Utnytter menneskelige faktorer

### Hva vi oppnår ved å løse det

- **Dybdetesting** som verktøy ikke kan gjøre
- **Realistisk risikovurdering** fra erfarne eksperter
- **Troverdighet** mot kunder og partnere
- **Compliance** for noen bransjer (finans, helse)

### Hvordan vi går frem

**For prosjektleder:**

Penetrasjonstesting er typisk en tjeneste du kjøper fra spesialiserte firmaer.

**Når trenger du profesjonell pentest?**

| Situasjon | Anbefaling |
|-----------|------------|
| Hobby/internt prosjekt | Ikke nødvendig |
| Kundevendt uten sensitive data | Valgfritt |
| Kundevendt med brukerdata | Anbefalt |
| Betaling, finans, helse | Kritisk |
| Enterprise/B2B | Ofte påkrevd av kunder |

**Kostnad:** NOK 50.000 - 500.000+ avhengig av omfang

**DIY "lett" penetrasjonstesting:**

Selv om du ikke er sikkerhetsekspert, kan du tenke som en angriper:

> 🤖 **AI-prompt for angriper-tankegang:**
> ```
> Tenk som en angriper som vil hacke applikasjonen vår.
>
> 1. REKOGNOSERING
>    - Hva kan en angriper lære om systemet utenfra?
>    - Hvilke teknologier brukes (kan ses i HTML, headers)?
>    - Finnes det feilmeldinger som avslører info?
>
> 2. FÅ TILGANG
>    - Finnes det standard-passord som ikke er endret?
>    - Kan innlogging omgås på noen måte?
>    - Er det API-endepunkter uten autentisering?
>
> 3. ESKALERING
>    - Hvis jeg er vanlig bruker, kan jeg bli admin?
>    - Kan jeg se andres data?
>    - Kan jeg gjøre ting jeg ikke skal?
>
> 4. DATAUTHENTING
>    - Kan jeg eksportere mer data enn jeg skal?
>    - Finnes det backup-filer som er tilgjengelige?
>
> Gi meg 5 konkrete ting å teste basert på vår app.
> ```

### Annen viktig info

**Før profesjonell pentest:**
- Definer scope tydelig (hva skal testes)
- Gi nødvendig tilgang (test-kontoer, dokumentasjon)
- Avklar tidspunkt (ikke under lansering)
- Avklar hva som skjer ved kritiske funn

---

# Del D: Funksjonell testing

## 3.1 Manuell testing av brukerflyter

### Hva dette punktet består av

Systematisk gjennomgang av alle måtene brukere kan bruke produktet på, steg for steg, for å verifisere at alt fungerer som forventet.

### Hva problemet er

- Automatiske tester fanger ikke alt
- AI-generert kode har ofte subtile bugs i brukerflyter
- Edge cases og uvanlige scenarioer testes sjelden automatisk
- Brukeropplevelse kan bare vurderes av mennesker

### Hva vi oppnår ved å løse det

- **Fungerende produkt** fra brukerens perspektiv
- **God brukeropplevelse** uten frustrerende bugs
- **Færre support-henvendelser** etter lansering
- **Tillit** fra brukerne

### Hvordan vi går frem

**For prosjektleder (ikke-teknisk):**

Manuell testing er noe du kan (og bør) gjøre selv!

**Steg 1: List alle brukerflyter**

> 🤖 **AI-prompt for å identifisere brukerflyter:**
> ```
> List alle måtene en bruker kan bruke [appnavn] på.
>
> Kategoriser i:
>
> 1. HAPPY PATH (normal bruk)
>    - Hovedoppgaven brukeren kommer for
>    - Vanlige scenarioer
>
> 2. ALTERNATIVE FLYTER
>    - Andre veier til samme mål
>    - Valgfrie funksjoner
>
> 3. FEILSCENARIER
>    - Hva skjer når ting går galt
>    - Feilmeldinger og recovery
>
> 4. EDGE CASES
>    - Uvanlige situasjoner
>    - Grenseverdier (tomme felt, lange tekster, etc.)
>
> For hver flyt, gi meg steg-for-steg instruksjoner for testing.
> ```

**Steg 2: Test systematisk**

**Test-skript mal:**

```markdown
## Testscenario: [Navn på scenario]

**Forutsetninger:**
- Bruker er [innlogget/utlogget]
- [Andre forutsetninger]

**Steg:**
1. Gå til [side/URL]
2. [Handling]
3. [Handling]

**Forventet resultat:**
- [Hva skal skje]
- [Hva skal vises]

**Faktisk resultat:**
☐ Pass / ☐ Fail

**Notater:**
[Observasjoner, skjermbilder]
```

**Steg 3: Test som om du vil ødelegge**

```
Spørsmål å stille under testing:

☐ Hva skjer hvis jeg klikker tilbake midt i en prosess?
☐ Hva om jeg åpner to faner og gjør samme handling?
☐ Hva om jeg klikker knappen to ganger raskt (double-click)?
☐ Hva om jeg lukker nettleseren midt i en operasjon?
☐ Hva om jeg skriver ekstremt mye tekst? (>10.000 tegn)
☐ Hva om jeg laster opp en veldig stor fil? (>100MB)
☐ Hva om jeg bruker emojis og spesialtegn? (日本語, 🎉)
☐ Hva skjer ved treg tilkobling? (bruk nettleserens throttling)
☐ Hva om jeg ikke fyller ut påkrevde felt?
☐ Hva om jeg bruker feil format (tekst i tallfelt, etc.)?
```

**Eksempel: Innlogging testmatrise**

| Scenario | E-post | Passord | Forventet | Status |
|----------|--------|---------|-----------|--------|
| Gyldig innlogging | ✓ Gyldig | ✓ Riktig | Dashboard | ☐ |
| Feil passord | ✓ Gyldig | ✗ Feil | "Feil passord" | ☐ |
| Ukjent e-post | ✗ Ukjent | ✓ Whatever | Generisk feil | ☐ |
| Tom e-post | Tom | Whatever | Validering | ☐ |
| Ugyldig format | "abc" | Whatever | Validering | ☐ |
| Lang e-post | 200+ tegn | Whatever | Håndteres | ☐ |
| Med mellomrom | " test@test.no " | Riktig | Trimmes/fungerer | ☐ |

### Annen viktig info

**Tips for effektiv manuell testing:**
- Test i korte økter (30-60 min) for å holde fokus
- Ta skjermbilder av alt som ser feil ut
- Noter steg nøyaktig så bugs kan reproduseres
- Test på din minst tekniske venn/kollega også

---

## 3.2 Cross-browser/device testing

### Hva dette punktet består av

Verifisere at produktet fungerer og ser bra ut i ulike nettlesere og på ulike enheter (desktop, mobil, nettbrett).

### Hva problemet er

- Nettlesere tolker kode ulikt
- Safari (spesielt iOS) er beryktet for bugs
- Mobil har touch, liten skjerm, annen oppførsel
- AI-generert kode testes ofte bare i én nettleser

### Hva vi oppnår ved å løse det

- **Alle brukere** får en god opplevelse
- **Færre klager** fra brukere med "feil" nettleser
- **Profesjonelt inntrykk** som bygger tillit

### Hvordan vi går frem

**Minimum testmatrise:**

| Enhet | Nettleser | Markedsandel | Prioritet | Status |
|-------|-----------|--------------|-----------|--------|
| Desktop | Chrome | ~65% | Kritisk | ☐ |
| Desktop | Safari | ~18% | Høy | ☐ |
| Desktop | Firefox | ~3% | Medium | ☐ |
| Desktop | Edge | ~5% | Lav | ☐ |
| iPhone | Safari | ~27% mobil | Kritisk | ☐ |
| Android | Chrome | ~63% mobil | Kritisk | ☐ |
| iPad | Safari | Varierer | Medium | ☐ |

**Vanlige problemer å se etter:**

```
LAYOUT:
☐ Ser layouten riktig ut?
☐ Er tekst lesbar (ikke for liten)?
☐ Overlapper elementer?
☐ Fungerer responsivt design?

FUNKSJONALITET:
☐ Fungerer alle knapper?
☐ Fungerer skjemaer?
☐ Fungerer navigasjon/menyer?
☐ Fungerer modaler/popups?

SAFARI-SPESIFIKKE PROBLEMER:
☐ position: fixed fungerer?
☐ 100vh tar ikke høyde for adressefeltet
☐ Dato/tid inputs fungerer?
☐ Video autoplay (krever muted)?
☐ localStorage i privat modus (fungerer ikke)?

MOBIL-SPESIFIKKE:
☐ Touch-targets store nok (min 44x44px)?
☐ Zoomer det ved input focus?
☐ Fungerer swipe/gestures?
☐ Tastatur skjuler ikke innhold?
```

**Verktøy:**

| Verktøy | Beskrivelse | Pris |
|---------|-------------|------|
| Chrome DevTools | Simulerer enheter | Gratis |
| BrowserStack | Ekte enheter i sky | Betalt |
| LambdaTest | Cross-browser | Free tier |
| Dine egne enheter | Mest pålitelig | Har du allerede |

> 🤖 **AI-prompt for cross-browser sjekk:**
> ```
> Analyser koden vår for potensielle cross-browser problemer.
>
> Se spesifikt etter:
> 1. CSS som kan oppføre seg ulikt (flexbox, grid, position)
> 2. JavaScript APIs som ikke støttes overalt
> 3. Safari/iOS-spesifikke known issues
> 4. Touch vs mouse interaksjoner
>
> Gi meg en liste over potensielle problemer og hvordan teste dem.
> ```

### Annen viktig info

**Prioritering basert på målgruppe:**
- Sjekk analytics for å se hvilke nettlesere brukerne dine faktisk bruker
- B2B = ofte mer desktop/Chrome
- B2C = mer mobil, mer variasjon

---

## 3.3 Automatiserte E2E-tester

### Hva dette punktet består av

Ende-til-ende-tester som kjører automatisk og simulerer ekte brukere som går gjennom hele flyten – fra innlogging til fullført handling.

### Hva problemet er

- Manuell testing er tidkrevende og må gjentas
- Mennesker glemmer ting og tester inkonsistent
- Ved hver endring risikerer du å ødelegge noe som fungerte
- AI-generert kode endres ofte, så regresjoner er vanlige

### Hva vi oppnår ved å løse det

- **Rask tilbakemelding** – vet umiddelbart om noe er ødelagt
- **Konsistent testing** – samme tester hver gang
- **Trygghet ved endringer** – tør å gjøre forbedringer
- **Tidsbesparelse** over tid

### Hvordan vi går frem

**For prosjektleder (ikke-teknisk):**

E2E-tester krever teknisk kompetanse å sette opp, men:
- Du kan definere HVA som skal testes
- AI kan hjelpe med å skrive testene
- Flere low-code verktøy finnes

**Hva bør dekkes med E2E:**

```
Prioriterte flyter (må ha E2E):
1. ☐ Registrering → Verifisering → Første innlogging
2. ☐ Innlogging → Hovedhandling → Utlogging
3. ☐ Kritiske transaksjoner (kjøp, sending, etc.)
4. ☐ Passordnullstilling

Nice to have:
5. ☐ Profilredigering
6. ☐ Sekundære funksjoner
```

> 🤖 **AI-prompt for å generere E2E-tester:**
> ```
> Generer Playwright E2E-tester for følgende brukerflyter:
>
> 1. Bruker registrerer seg med e-post og passord
> 2. Bruker logger inn
> 3. Bruker [hovedfunksjonen i appen]
> 4. Bruker logger ut
>
> For hver test:
> - Gi den et beskrivende navn
> - Inkluder assertions for å verifisere at det fungerer
> - Håndter eventuelle feil gracefully
>
> Bruk best practices:
> - Vent på elementer før interaksjon
> - Bruk data-testid attributter for selectors
> - Isoler tester fra hverandre
> ```

**Verktøy (2025):**

| Verktøy | Beskrivelse | Anbefaling |
|---------|-------------|------------|
| **Playwright** | Microsoft, raskest, moderne | ⭐ Anbefalt |
| **Cypress** | Populært, god developer experience | Anbefalt |
| **Selenium** | Eldre, men solid | For spesielle behov |

**Code coverage mål:**

| Nivå | Coverage | Vurdering |
|------|----------|-----------|
| Akseptabelt | 60% | Minimum |
| Bra | 75% | Anbefalt mål |
| Utmerket | 90%+ | For kritiske systemer |

### Annen viktig info

**Prioritering:**

| Prosjekttype | E2E prioritet |
|--------------|---------------|
| Lite internt | Valgfritt |
| Internt m/data | Anbefalt for kritiske flyter |
| Kundevendt | Anbefalt |
| Stor skala | Kritisk |

---

## 3.4 AI-assistert testing (Vibe Testing)

### Hva dette punktet består av

"Vibe Testing" er det nye paradigmet hvor AI brukes til å generere, vedlikeholde og kjøre tester. Dette er spesielt relevant for VIBE-kodingsprosjekter.

### Hva problemet er

Tradisjonell testing:
- Tar lang tid å skrive tester manuelt
- Tester blir ofte utdaterte når UI endres ("flaky tests")
- Krever teknisk kompetanse
- Dekker sjelden alle edge cases

### Hva vi oppnår ved å løse det

- **Raskere testgenerering** – 40% raskere enn manuelt
- **Selvhelbredende tester** – AI oppdaterer tester automatisk når UI endres
- **Bedre dekning** – AI foreslår edge cases mennesker overser
- **Tilgjengelig** – ikke-tekniske kan også bidra

### Hvordan vi går frem

**For prosjektleder (ikke-teknisk):**

Du kan bruke AI direkte for testing!

**Teknikk 1: Generer testscenarier**

> 🤖 **AI-prompt for testscenario-generering:**
> ```
> Generer omfattende testscenarier for [funksjon/feature].
>
> Inkluder:
> 1. POSITIVE TESTER (happy path)
>    - Normal bruk som skal fungere
>
> 2. NEGATIVE TESTER
>    - Ugyldig input
>    - Manglende felt
>    - Feil format
>
> 3. EDGE CASES
>    - Grenseverdier (min/max)
>    - Tomme verdier
>    - Veldig lange verdier
>    - Spesialtegn og unicode
>
> 4. SIKKERHETSTESTER
>    - SQL injection forsøk
>    - XSS forsøk
>    - Uautorisert tilgang
>
> 5. YTELSES-SCENARIER
>    - Mange samtidige requests
>    - Store datamengder
>
> Presenter som en tabell med: Scenario | Input | Forventet resultat
> ```

**Teknikk 2: La AI kjøre tester for deg**

> 🤖 **AI-prompt for test-kjøring:**
> ```
> Kjør følgende tester mot applikasjonen og rapporter resultatene:
>
> [liste over tester fra forrige prompt]
>
> For hver test:
> 1. Utfør testen
> 2. Noter faktisk resultat
> 3. Sammenlign med forventet
> 4. Marker som PASS eller FAIL
> 5. Ved FAIL: Ta skjermbilde og beskriv problemet
>
> Gi meg en oppsummering:
> - Totalt testet: X
> - Passert: X
> - Feilet: X
> - Kritiske funn: [liste]
> ```

**Teknikk 3: Be AI finne bugs**

> 🤖 **AI-prompt for bug-jakt:**
> ```
> Jeg vil at du skal prøve å ødelegge applikasjonen vår.
>
> Prøv alt du kan for å:
> - Få feilmeldinger
> - Få uventet oppførsel
> - Finne inkonsistenser
> - Finne sikkerhetshull
>
> Vær kreativ og ondsinnet (i testsammenheng).
>
> Rapporter alle funn med:
> - Hva du gjorde
> - Hva som skjedde
> - Hvorfor det er et problem
> - Alvorlighetsgrad (Kritisk/Høy/Medium/Lav)
> ```

**AI-testing verktøy:**

| Verktøy | Beskrivelse | Beste for |
|---------|-------------|-----------|
| **Applitools** | Visual AI testing | UI-endringer |
| **Testim** | ML-powered selvhelbredende | Flaky tester |
| **mabl** | Low-code AI automation | Ikke-tekniske |
| **Katalon** | Enterprise AI testing | Store team |

### Annen viktig info

**Tips for effektiv vibe testing:**
- Vær spesifikk i prompts – vage prompts gir vage tester
- Verifiser at AI faktisk testet det du ba om
- Kombiner AI-testing med manuell verifisering av kritiske funn
- Dokumenter hva AI testet for sporbarhet

---

# Del E: Ytelse og skalerbarhet

## 4.1 Ytelsestesting (Core Web Vitals)

### Hva dette punktet består av

Måle hvor raskt produktet laster og responderer. Core Web Vitals er Googles offisielle ytelsesmålinger som påvirker SEO og brukeropplevelse.

### Hva problemet er

- Trege nettsider mister brukere (53% forlater hvis >3s lastetid)
- Google nedprioriterer trege sider i søk
- AI-generert kode er ofte ikke optimalisert for ytelse
- Dårlig ytelse gir frustrasjon og dårlig omdømme

### Hva vi oppnår ved å løse det

- **Bedre brukeropplevelse** – fornøyde brukere
- **Høyere konvertering** – flere fullfører handlinger
- **Bedre SEO** – høyere rangering i Google
- **Lavere bounce rate** – brukere blir værende

### Hvordan vi går frem

**Core Web Vitals (2025):**

| Metrikk | Hva det måler | Bra | Middels | Dårlig |
|---------|---------------|-----|---------|--------|
| **LCP** | Tid til hovedinnhold vises | < 2.5s | 2.5-4s | > 4s |
| **INP** | Responstid på interaksjoner | < 200ms | 200-500ms | > 500ms |
| **CLS** | Visuell stabilitet (hopping) | < 0.1 | 0.1-0.25 | > 0.25 |

**For prosjektleder (ikke-teknisk):**

1. **Kjør Lighthouse i Chrome:**
   - Åpne siden i Chrome
   - Høyreklikk → Inspect → Lighthouse
   - Klikk "Generate report"

2. **Tolkning av Lighthouse-score:**

| Score | Vurdering | Handling |
|-------|-----------|----------|
| 90-100 | Bra ✅ | Vedlikehold |
| 70-89 | OK 🟡 | Forbedre gradvis |
| 50-69 | Trenger arbeid 🟠 | Prioriter |
| 0-49 | Dårlig 🔴 | Må fikses |

> 🤖 **AI-prompt for ytelsesanalyse:**
> ```
> Analyser applikasjonen for ytelsesproblemer.
>
> Se etter:
> 1. BILDER
>    - Er bilder komprimert?
>    - Brukes moderne formater (WebP)?
>    - Er lazy loading implementert?
>
> 2. JAVASCRIPT
>    - Er bundle-størrelsen rimelig?
>    - Brukes code splitting?
>    - Er det render-blocking scripts?
>
> 3. CSS
>    - Er det render-blocking CSS?
>    - Brukes critical CSS?
>
> 4. CACHING
>    - Er cache-headers satt?
>    - Brukes CDN?
>
> 5. SERVER
>    - Hva er TTFB (Time to First Byte)?
>    - Er det trege API-kall?
>
> Gi meg en prioritert liste over forbedringer med estimert impact.
> ```

**Vanlige problemer og løsninger:**

| Problem | Løsning |
|---------|---------|
| Store bilder | Komprimering, WebP, lazy loading |
| Stor JavaScript | Code splitting, tree shaking |
| Render-blocking CSS | Critical CSS, async loading |
| Mange HTTP-requests | Bundling, HTTP/2 |
| Ingen caching | Cache-Control headers |
| Treg server | CDN, database optimalisering |

### Annen viktig info

**Minimum mål for lansering:**

| Prosjekttype | Lighthouse mål |
|--------------|----------------|
| Alle | > 50 (ikke dårlig) |
| Kundevendt | > 70 (akseptabelt) |
| E-commerce | > 80 (bra) |

---

## 4.2 Load testing

### Hva dette punktet består av

Teste hvordan systemet oppfører seg under høy belastning – mange samtidige brukere.

### Hva problemet er

- Systemet fungerer fint med én bruker, men krasjer med 100
- Lancering/markedsføring kan gi trafikktopper
- Uten load testing vet du ikke kapasiteten
- Nedetid ved lansering gir dårlig førsteinntrykk

### Hva vi oppnår ved å løse det

- **Vet kapasiteten** – hvor mange brukere tåler systemet?
- **Forutsigbarhet** – hva skjer når grensen nås?
- **Skaleringsplan** – vet når du må skalere opp

### Hvordan vi går frem

**For prosjektleder (ikke-teknisk):**

Load testing er teknisk, men du bør:
1. Definere forventet trafikk (hvor mange brukere?)
2. Be teknisk ressurs kjøre testen
3. Forstå resultatene

> 🤖 **AI-prompt for load test-planlegging:**
> ```
> Hjelp meg planlegge load testing for applikasjonen.
>
> Bakgrunn:
> - Forventet antall brukere: [tall]
> - Trafikktopper: [beskrivelse]
> - Kritiske endepunkter: [liste]
>
> Spørsmål:
> 1. Hvilke scenarioer bør testes?
> 2. Hvilke metrikker bør måles?
> 3. Hva er akseptable grenseverdier?
> 4. Hvordan tolke resultatene?
> ```

**Viktige spørsmål å besvare:**

| Spørsmål | Hvorfor viktig |
|----------|----------------|
| Hvor mange samtidige brukere? | Kapasitetsplanlegging |
| Hva er responstiden under last? | Brukeropplevelse |
| Hvor er flaskehalsen? | Vite hva som må optimaliseres |
| Hva skjer ved overbelastning? | Graceful degradering vs. krasj |

**Prioritering:**

| Prosjekttype | Load testing |
|--------------|--------------|
| Lite internt | Ikke nødvendig |
| Internt m/data | Lav prioritet |
| Kundevendt | Moderat |
| Stor skala/lansering | Kritisk |

### Annen viktig info

**Verktøy:**
- k6 (gratis, moderne)
- Artillery (enkelt å starte)
- JMeter (kraftig, GUI)

---

## 4.3 Chaos Engineering

### Hva dette punktet består av

Simulere feil i systemet for å teste robusthet. "Hva skjer når X går galt?"

### Hva problemet er

I produksjon vil ting gå galt:
- Servere krasjer
- Nettverk er ustabilt
- Databaser blir utilgjengelige
- Eksterne tjenester har nedetid

Hvis du ikke har testet for dette, vet du ikke hvordan systemet reagerer.

### Hva vi oppnår ved å løse det

- **Robusthet** – systemet håndterer feil gracefully
- **Forberedelse** – vet hva som skjer før det skjer i prod
- **Tillit** – kan stole på systemet under press

### Hvordan vi går frem

**For prosjektleder (ikke-teknisk):**

Chaos engineering er avansert og primært relevant for store, distribuerte systemer. For de fleste VIBE-prosjekter er det tilstrekkelig å:

1. Stille spørsmålet: "Hva skjer hvis X feiler?"
2. Dokumentere forventet oppførsel
3. Teste manuelt noen scenarier

> 🤖 **AI-prompt for enkel chaos-vurdering:**
> ```
> Analyser applikasjonen for robusthet.
>
> For hver av disse feil-scenarioene:
> 1. Database blir utilgjengelig
> 2. Ekstern API (f.eks. betaling) timeuter
> 3. Server restart midt i en operasjon
> 4. Brukerens nettforbindelse forsvinner
>
> Beskriv:
> - Hva skjer i vår app?
> - Er det graceful håndtering?
> - Mister brukeren data?
> - Får brukeren en forståelig feilmelding?
> ```

**Prioritering:**

| Prosjekttype | Chaos engineering |
|--------------|-------------------|
| Lite internt | Ikke relevant |
| Internt m/data | Ikke relevant |
| Kundevendt | Valgfritt |
| Stor skala/kritisk | Anbefalt |

---

# Del F: Tilgjengelighet og brukeropplevelse

## 5.1 Tilgjengelighetstest (WCAG 2.2)

### Hva dette punktet består av

Verifisere at produktet kan brukes av mennesker med funksjonsnedsettelser – synshemmede, bevegelseshemmede, kognitive utfordringer, etc.

### Hva problemet er

- 15-20% av befolkningen har en form for funksjonsnedsettelse
- Tilgjengelighet er lovpålagt i Norge og EU
- AI-generert kode ignorerer ofte tilgjengelighet
- Utilgjengelige apper ekskluderer brukere

**Juridisk kontekst:**
- **EU:** European Accessibility Act (EAA) trådte i kraft juni 2025
- **Norge:** Likestillings- og diskrimineringsloven krever universell utforming
- **Konsekvenser:** Bøter, søksmål, omdømmeskade

### Hva vi oppnår ved å løse det

- **Inkludering** – alle kan bruke produktet
- **Compliance** – overholder lovkrav
- **Bedre UX** – tilgjengelighet forbedrer opplevelsen for alle
- **Større marked** – flere potensielle brukere

### Hvordan vi går frem

**WCAG 2.2 hovedprinsipper (POUR):**

| Prinsipp | Spørsmål | Eksempler |
|----------|----------|-----------|
| **Perceivable** | Kan innholdet oppfattes? | Alt-tekst, kontrast, undertekster |
| **Operable** | Kan det brukes uten mus? | Tastaturnavigasjon, nok tid |
| **Understandable** | Er det forståelig? | Klart språk, konsistent navigasjon |
| **Robust** | Fungerer det med hjelpemidler? | Semantisk HTML, ARIA |

**Rask tilgjengelighetssjekk (kan gjøres av ikke-tekniske):**

```
TASTATUR:
☐ Kan jeg navigere med Tab-tasten alene?
☐ Ser jeg hvor fokus er (synlig fokusindikator)?
☐ Kan jeg aktivere alle knapper/lenker med Enter?
☐ Kan jeg lukke modaler med Escape?

VISUELT:
☐ Er tekst lesbar (minimum 16px)?
☐ Er kontrasten god nok? (test med verktøy)
☐ Fungerer siden om jeg zoomer til 200%?
☐ Er lenker synlig forskjellige fra vanlig tekst?

INNHOLD:
☐ Har alle bilder beskrivende alt-tekst?
☐ Er skjemafelter koblet til labels?
☐ Er feilmeldinger klare og hjelpfulle?
☐ Er språket satt i HTML (<html lang="no">)?

INTERAKSJON:
☐ Er klikkbare elementer minst 24x24 piksler?
☐ Finnes alternativ til drag-and-drop?
☐ Har video undertekster?
```

> 🤖 **AI-prompt for tilgjengelighetssjekk:**
> ```
> Gjennomfør en WCAG 2.2 AA tilgjengelighetssjekk.
>
> Analyser:
> 1. Semantisk HTML – brukes riktige elementer?
> 2. ARIA – er det brukt korrekt der nødvendig?
> 3. Fargekontrast – oppfyller alle tekst/bakgrunn 4.5:1?
> 4. Tastaturnavigasjon – kan alt nås med tastatur?
> 5. Skjemaer – er labels og feilmeldinger korrekte?
> 6. Bilder – har alle meningsfylte bilder alt-tekst?
> 7. Fokusindikatorer – er de synlige?
>
> For hvert problem:
> - Hva er problemet
> - Hvor i koden
> - Hvorfor det bryter WCAG
> - Hvordan fikse det
> ```

**Verktøy:**

| Verktøy | Beskrivelse | Pris |
|---------|-------------|------|
| axe DevTools | Chrome extension | Gratis |
| WAVE | Web-basert | Gratis |
| Lighthouse | Innebygd i Chrome | Gratis |
| VoiceOver | Mac skjermleser | Gratis |
| NVDA | Windows skjermleser | Gratis |

### Annen viktig info

**WCAG 2.2 nye krav å være obs på:**

| Krav | Beskrivelse |
|------|-------------|
| Focus Not Obscured | Fokusert element må være synlig (ikke skjult) |
| Target Size | Klikkbare elementer minst 24x24px |
| Dragging Movements | Alternativ til drag-and-drop |

---

## 5.2 Brukertesting

### Hva dette punktet består av

La ekte mennesker prøve produktet uten instruksjoner, og observer hva som skjer.

### Hva problemet er

- Du er for nær produktet til å se problemer
- Utviklere og prosjektledere er ikke representative brukere
- Antagelser om hva som er intuitivt er ofte feil
- AI-generert UI følger ofte mønstre som ikke er brukervennlige

### Hva vi oppnår ved å løse det

- **Reell tilbakemelding** fra faktiske brukere
- **Funn av problemer** du aldri ville sett selv
- **Validering** av at produktet løser et problem
- **Prioritering** av hva som faktisk betyr noe

### Hvordan vi går frem

**Hvorfor 5 brukere er nok:**

Forskning viser at 5 brukere finner ca. 85% av brukervennlighetsproblemer. Flere gir diminishing returns.

**Steg-for-steg gjennomføring:**

**1. FORBERED (30 min)**
```
☐ Definer 3-5 oppgaver brukeren skal utføre
☐ Sett opp skjermopptak (med tillatelse)
☐ Forbered spørsmål til etterpå
☐ Finn 3-5 testpersoner (helst fra målgruppen)
```

**2. INTRODUSER (2 min)**
Si til brukeren:
- "Tenk høyt mens du bruker produktet"
- "Det er produktet som testes, ikke deg"
- "Det finnes ingen feil svar"
- "Si fra hvis noe er forvirrende"

**3. OBSERVER (15-20 min)**
```
VIKTIG: IKKE HJELP!

Observer og noter:
☐ Hvor nøler de?
☐ Hva klikker de på først?
☐ Uttrykker de frustrasjon?
☐ Sier de noe overraskende?
☐ Prøver de noe du ikke forventet?
```

**4. SPØR ETTERPÅ (5 min)**
- "Hva var mest forvirrende?"
- "Var det noe du savnet?"
- "Ville du brukt dette produktet?"
- "Hvem tror du dette er laget for?"

**5. ANALYSER**
- Finn mønstre på tvers av brukere
- Prioriter problemer etter alvorlighet
- Dokumenter for teamet

**Observasjons-mal:**

| Deltaker | Oppgave | Fullført | Tid | Problemer/Observasjoner |
|----------|---------|----------|-----|-------------------------|
| 1 | Registrering | ✓ | 2 min | Lette etter "Registrer"-knapp |
| 1 | Hovedhandling | ✓ | 1 min | OK |
| 2 | Registrering | ✗ | 3 min | Ga opp, forsto ikke feilmelding |

### Annen viktig info

**Tips:**
- Observer hva folk GJØR, ikke bare hva de SIER
- Folk sier ofte "det er greit" men oppførselen viser frustrasjon
- Unngå ledende spørsmål ("Syntes du ikke menyen var fin?")
- Test tidlig – jo tidligere du finner problemer, jo billigere å fikse

---

## 5.3 Visuell regresjonstesting

### Hva dette punktet består av

Automatisk sammenligning av hvordan UI ser ut før og etter endringer, for å fange utilsiktede visuelle endringer.

### Hva problemet er

- CSS-endringer har ofte uventede sideeffekter
- "Jeg fikset bare den knappen" → halve siden ser annerledes ut
- Manuell visuell sjekk er tidkrevende og upålitelig
- AI-generert kode endre ofte styling på uventede måter

### Hva vi oppnår ved å løse det

- **Fanger CSS-regresjoner** automatisk
- **Trygghet** ved styling-endringer
- **Konsistent UI** over tid

### Hvordan vi går frem

**For prosjektleder (ikke-teknisk):**

Visuell regresjonstesting krever teknisk oppsett. Vurder:
- Er det mange UI-endringer?
- Er visuell konsistens viktig?
- Har teamet kapasitet til å sette opp?

**Verktøy:**

| Verktøy | Beskrivelse | Pris |
|---------|-------------|------|
| Percy | BrowserStack, populært | Betalt |
| Applitools | Visual AI | Betalt |
| Chromatic | Storybook-fokusert | Free tier |
| BackstopJS | Open source | Gratis |

**Prioritering:**

| Prosjekttype | Visuell regresjon |
|--------------|-------------------|
| Lite internt | Ikke nødvendig |
| Internt m/data | Valgfritt |
| Kundevendt | Anbefalt |
| Stor skala | Kritisk |

---

# Del G: Compliance og plattformkrav

## 6.1 GDPR og personverntesting

### Hva dette punktet består av

Verifisere at produktet overholder GDPR og andre personvernregler.

### Hva problemet er

GDPR-brudd kan koste:
- Opptil **EUR 20 millioner** eller
- **4% av årlig global omsetning**

Vanlige feil i AI-genererte apper:
- Persondata samles uten samtykke
- Ingen mulighet for brukere å slette data
- Manglende personvernerklæring
- Cookies settes uten samtykke

### Hva vi oppnår ved å løse det

- **Compliance** – unngår bøter og søksmål
- **Tillit** – brukere stoler på at data håndteres riktig
- **Omdømme** – unngår negativ oppmerksomhet

### Hvordan vi går frem

**GDPR sjekkliste:**

```
SAMTYKKE:
☐ Samtykke er eksplisitt (ikke pre-avkrysset)
☐ Bruker kan velge hvilke typer samtykke
☐ Samtykke kan trekkes tilbake like enkelt som det gis
☐ Samtykke-valg logges med tidsstempel
☐ Tjenesten fungerer uten valgfritt samtykke

BRUKERRETTIGHETER:
☐ Bruker kan se sine data (data access)
☐ Bruker kan laste ned sine data (data portability)
☐ Bruker kan slette sin konto og data
☐ Sletting skjer faktisk (ikke bare "soft delete")
☐ Sletting skjer innen rimelig tid (30 dager)

INFORMASJON:
☐ Personvernerklæring er tilgjengelig
☐ Det er klart hvilke data som samles
☐ Det er klart hvorfor data samles
☐ Det er klart hvem som har tilgang til data

TEKNISK:
☐ Cookie-banner fungerer og respekteres
☐ Tracking startes ikke før samtykke
☐ Data krypteres i transit og rest
☐ Tilgang til persondata er begrenset
```

> 🤖 **AI-prompt for GDPR-sjekk:**
> ```
> Analyser applikasjonen for GDPR-compliance.
>
> Sjekk:
> 1. DATAINNSAMLING
>    - Hvilke persondata samles?
>    - Er det lovlig grunnlag for hver type data?
>    - Samles det mer data enn nødvendig?
>
> 2. SAMTYKKE
>    - Hvordan innhentes samtykke?
>    - Kan samtykke trekkes tilbake?
>    - Fungerer tjenesten uten samtykke?
>
> 3. BRUKERRETTIGHETER
>    - Kan bruker se sine data?
>    - Kan bruker slette sine data?
>    - Kan bruker eksportere sine data?
>
> 4. SIKKERHET
>    - Er persondata kryptert?
>    - Hvem har tilgang?
>
> Gi meg en compliance-rapport med eventuelle mangler.
> ```

### Annen viktig info

**Prioritering:**

| Prosjekttype | GDPR prioritet |
|--------------|----------------|
| Ingen brukerdata | Ikke relevant |
| Anonym bruk | Lav |
| Brukerkontoer | Kritisk |
| Sensitive data | Kritisk++ |

---

## 6.2 Plattform-spesifikke krav

### Hva dette punktet består av

Hvis du lanserer på App Store, Play Store, eller andre plattformer, må du oppfylle deres spesifikke krav for å bli godkjent.

### Hva problemet er

- Plattformer har strenge og ofte oppdaterte krav
- Avvisning betyr forsinkelse (ofte 1-2 uker for ny review)
- ~25% av iOS-apper avvises ved første innsending
- AI vet ikke alltid om de nyeste plattformkravene

### Hva vi oppnår ved å løse det

- **Godkjenning** første gang
- **Raskere lansering** uten forsinkelser
- **Compliance** med plattformregler

### Hvordan vi går frem

**iOS App Store sjekkliste:**

```
TEKNISK:
☐ Bygget med nyeste Xcode og SDK
☐ Testet på ekte iOS-enhet (ikke bare simulator)
☐ TestFlight beta-testing gjennomført
☐ App krasjer ikke

INNHOLD:
☐ Ingen placeholder-innhold
☐ Alle funksjoner fungerer
☐ Demo-konto tilgjengelig for review

PERSONVERN:
☐ Personvernerklæring tilgjengelig
☐ Privacy labels utfylt korrekt
☐ Account deletion fungerer i appen
```

**Android Play Store sjekkliste:**

```
TEKNISK:
☐ Target riktig Android API-nivå
☐ Testet på ulike Android-enheter
☐ Data safety section utfylt

TESTING (for personlige utviklerkontoer):
☐ Minimum 12 testere
☐ 14 dagers sammenhengende testing
☐ Fysisk Android-enhet verifisert
```

**Chrome Extensions sjekkliste:**

```
☐ Manifest V3 brukes
☐ Privacy policy på plass
☐ Minimum nødvendige permissions
☐ Ingen eval() eller inline scripts
```

**PWA sjekkliste:**

```
☐ Web App Manifest komplett
☐ Service Worker fungerer
☐ HTTPS brukes
☐ Offline-funksjonalitet fungerer
☐ Add to Home Screen fungerer
```

### Annen viktig info

**Tips:** Les alltid oppdaterte retningslinjer fra plattformen før innsending – de endres ofte.

---

## 6.3 SOC 2 Compliance

### Hva dette punktet består av

SOC 2 er en sikkerhetsstandard ofte krevd av bedriftskunder. Viser at du håndterer data profesjonelt og sikkert.

### Hva problemet er

- Mange B2B-kunder krever SOC 2 før de kjøper
- Uten SOC 2 kan du miste enterprise-salg
- Prosessen tar tid, så det er lurt å starte tidlig

### Hva vi oppnår ved å løse det

- **Åpner dører** til enterprise-kunder
- **Tillit** fra sikkerhetskritiske kunder
- **Differensiering** fra konkurrenter

### Hvordan vi går frem

**SOC 2 er primært relevant for:**
- B2B SaaS-produkter
- Enterprise-salg
- Håndtering av kundedata

**Grunnleggende sjekkliste:**

```
☐ Tilgangskontroll dokumentert
☐ Logging av sikkerhetshendelser
☐ Incident response prosedyre
☐ Change management prosess
☐ Kryptering av data
☐ Backup og recovery testet
```

**Prioritering:**

| Prosjekttype | SOC 2 |
|--------------|-------|
| B2C | Sjelden nødvendig |
| B2B SMB | Valgfritt |
| B2B Enterprise | Ofte påkrevd |

---

# Del H: Kvalitetsstyring og governance

## 7.1 Bug-håndtering

### Hva dette punktet består av

Et system for å kategorisere, prioritere og håndtere bugs som oppdages under testing.

### Hva problemet er

- Uten struktur blir bugs glemt eller nedprioritert feil
- Kritiske bugs kan glippe gjennom
- Vanskelig å vite når produktet faktisk er klart

### Hva vi oppnår ved å løse det

- **Oversikt** over alle kjente problemer
- **Riktig prioritering** av hva som fikses først
- **Klare lanseringskriterier** – når er vi ferdige?

### Hvordan vi går frem

**Bug-kategorisering:**

| Kategori | Beskrivelse | Handling | Eksempel |
|----------|-------------|----------|----------|
| **P0 – Kritisk** | App krasjer, data tap, sikkerhetshull | Fiks UMIDDELBART | Passord vises i klartekst |
| **P1 – Høy** | Hovedfunksjon fungerer ikke | Fiks før lansering | Kan ikke logge inn |
| **P2 – Medium** | Mindre funksjon fungerer ikke | Planlegg fiks | Filter fungerer ikke |
| **P3 – Lav** | Kosmetisk, minor UX | Backlog | Feil skrifttype på én side |

**Bug-rapport mal:**

```markdown
## Bug: [Kort, beskrivende tittel]

**Prioritet:** P0 / P1 / P2 / P3

**Miljø:**
- Nettleser: [f.eks. Chrome 120]
- Enhet: [f.eks. iPhone 14]
- URL: [hvor problemet oppstår]

**Steg for å reprodusere:**
1. Gå til [side]
2. Gjør [handling]
3. Observerer [symptom]

**Forventet resultat:**
[Hva skulle skjedd]

**Faktisk resultat:**
[Hva skjedde faktisk]

**Skjermbilde/Video:**
[legg ved]

**Feilmelding (hvis relevant):**
[kopier feilmelding]
```

**Lanseringskriterier:**

```
☐ NULL P0-bugs (kritiske)
☐ NULL P1-bugs (høy prioritet)
☐ P2-bugs vurdert og dokumentert
☐ Alle bugs registrert i tracking-system
```

### Annen viktig info

> 🤖 **AI-prompt for bug-rapport:**
> ```
> Jeg har funnet følgende problem:
> [beskrivelse]
>
> Hjelp meg lage en komplett bug-rapport med:
> 1. Kategorisering (P0-P3)
> 2. Tydelige steg for å reprodusere
> 3. Forventet vs faktisk oppførsel
> 4. Mulig årsak (hvis du kan identifisere)
> 5. Forslag til løsning
> ```

---

## 7.2 Kvalitets-KPIer og målinger

### Hva dette punktet består av

Kvantitative mål for kvaliteten på produktet og testprosessen.

### Hva problemet er

- Uten målinger er kvalitet subjektivt
- Vanskelig å vite om testing er "god nok"
- Ingen baseline for forbedring over tid

### Hva vi oppnår ved å løse det

- **Objektive kriterier** for kvalitet
- **Sporing** av forbedring over tid
- **Kommunikasjon** med stakeholders om status

### Hvordan vi går frem

**Viktige KPIer:**

| KPI | Formel | Mål | Hva det betyr |
|-----|--------|-----|---------------|
| **Code Coverage** | Testet kode / Total kode | > 60% | Hvor mye kode som har tester |
| **Defect Removal Efficiency** | Bugs i QA / Totale bugs | > 95% | Hvor mange bugs vi finner før lansering |
| **Defect Leakage** | Prod-bugs / Totale bugs | < 5% | Bugs som slipper gjennom til prod |

**Code Coverage standarder:**

| Nivå | Coverage | Beskrivelse |
|------|----------|-------------|
| Minimum | 60% | Akseptabelt for de fleste |
| Anbefalt | 75% | God dekning |
| Optimal | 90%+ | For kritiske systemer |

**Merk:** 100% coverage betyr ikke bug-fri. Fokuser på kritiske paths, ikke tall.

### Annen viktig info

> 🤖 **AI-prompt for kvalitetsstatus:**
> ```
> Generer en kvalitetsrapport for prosjektet.
>
> Inkluder:
> 1. Test coverage status
> 2. Antall bugs funnet (fordelt på prioritet)
> 3. Antall bugs fikset vs. åpne
> 4. Områder med lav testdekning
> 5. Anbefaling: Klar for lansering eller ikke?
> ```

---

## 7.3 AI Governance og sporbarhet

### Hva dette punktet består av

Dokumentasjon og sporbarhet for AI-bruk i prosjektet – hva som er AI-generert, hvilke prompts som ble brukt, og hvem som har gjennomgått koden.

### Hva problemet er

- Uten dokumentasjon vet ingen hva som er AI-generert
- Vanskelig å feilsøke AI-kode uten å vite konteksten
- Compliance-krav kan kreve dokumentasjon av AI-bruk
- "Vibe coding hangover" – umulig å vedlikeholde udokumentert AI-kode

### Hva vi oppnår ved å løse det

- **Sporbarhet** – vet hva som er AI-generert
- **Vedlikeholdbarhet** – kan forstå og endre koden senere
- **Compliance** – dokumentasjon for eventuelle krav
- **Ansvar** – tydelig hvem som har godkjent koden

### Hvordan vi går frem

**AI-bruk logg mal:**

```markdown
## AI-bruk logg

### [Dato] - [Komponent/funksjon]

**AI-verktøy brukt:** [Claude/GPT/Copilot/annet]

**Prompt brukt:**
[Lim inn hele prompten]

**Generert kode:**
[Referanse til fil(er)]

**Gjennomgang:**
- Gjennomgått av: [navn]
- Dato: [dato]
- Status: Godkjent / Godkjent med endringer / Avvist

**Endringer gjort etter AI-generering:**
[Beskrivelse av manuelle endringer]

**Kjente begrensninger:**
[Eventuelle problemer eller teknisk gjeld]
```

**Sjekkliste for AI governance:**

```
☐ All AI-generert kode er markert/dokumentert
☐ Prompts er lagret for viktig kode
☐ All kritisk kode er gjennomgått av menneske
☐ Endringer etter AI-generering er dokumentert
☐ Kjente begrensninger er notert
```

> 🤖 **AI-prompt for å dokumentere AI-bruk:**
> ```
> Lag en dokumentasjonspost for AI-kode:
>
> Kode: [lim inn koden]
> Prompt som ble brukt: [din prompt]
>
> Generer:
> 1. Kort beskrivelse av hva koden gjør
> 2. Eventuelle begrensninger eller problemer
> 3. Forslag til fremtidig forbedring
> 4. Avhengigheter av andre deler av systemet
> ```

---

## 7.4 Exit-kriterier og leveranser

### Hva dette punktet består av

Definerte kriterier som MÅ være oppfylt før prosjektet kan gå videre til Fase 7 (lansering).

### Hva problemet er

- Uten klare kriterier er "ferdig" subjektivt
- Press for å lansere kan føre til at ting hoppes over
- Bugs og sikkerhetshull slipper gjennom

### Hva vi oppnår ved å løse det

- **Kvalitetsgaranti** – vet at minimumskrav er oppfylt
- **Dokumentasjon** – bevis på at testing er gjort
- **Trygghet** – kan lansere med god samvittighet

### Hvordan vi går frem

**Exit-kriterier for Fase 6:**

| Kriterie | Mål | Obligatorisk? |
|----------|-----|---------------|
| P0/P1 bugs | 0 | JA |
| AI-kode gjennomgått | 100% kritisk kode | JA |
| OWASP Top 10 | Bestått | JA |
| Hemmelighetssjekk | Bestått | JA |
| Dependency scan | Ingen kritiske | JA |
| Manuell testing | Hovedflyter OK | JA |
| Code coverage | > 60% | Anbefalt |
| Lighthouse score | > 70 | Anbefalt |
| WCAG 2.2 | Ingen kritiske | Anbefalt |
| Brukertesting | Gjennomført | Anbefalt |
| Cross-browser | Testet | Kategori C/D |
| GDPR | Compliant | Hvis persondata |
| Plattformkrav | Oppfylt | Hvis app store |

**Leveranser fra Fase 6:**

**1. Testrapport**

```markdown
# Testrapport: [Prosjektnavn]
**Dato:** [dato]
**Versjon:** [versjon]

## Sammendrag
- Totalt testet: X scenarioer
- Passert: Y
- Feilet: Z

## Sikkerhetstesting
| Test | Status | Kommentar |
|------|--------|-----------|
| OWASP Top 10 | ✓ | |
| Hemmelighetssjekk | ✓ | |
| Dependency scan | ✓ | 2 medium fikset |

## Funksjonell testing
| Område | Tester | Pass | Fail |
|--------|--------|------|------|
| Autentisering | 10 | 10 | 0 |
| Hovedfunksjon | 15 | 15 | 0 |

## Ytelse
- Lighthouse: 85
- LCP: 2.1s
- INP: 150ms

## Tilgjengelighet
- axe: 0 kritiske
- Tastaturnavigasjon: OK

## AI-kode status
- AI-generert kode gjennomgått: 100%
- Dokumentert: JA

## Konklusjon
☐ Klar for lansering
☐ Klar med forbehold (se noter)
☐ Ikke klar - krever [X]
```

**2. Sikkerhetsrapport**

```
☐ OWASP Top 10:2025 gjennomgått - rapport vedlagt
☐ API Security sjekk - rapport vedlagt
☐ Hemmelighetssjekk-resultat - ingen funn
☐ Dependency scan - ingen kritiske/høye
☐ DAST-rapport (hvis gjennomført)
☐ Penetrasjonstest-rapport (hvis gjennomført)
☐ Kjente gjenværende risikoer dokumentert
```

**3. AI Governance rapport**

```
☐ Liste over AI-generert kode
☐ Gjennomgangsstatus for all kritisk kode
☐ Prompts dokumentert for viktig kode
☐ Kjent teknisk gjeld dokumentert
```

---

# Del I: Verktøy og ressurser

## 8.1 Verktøyoversikt

### Sikkerhetstesting

| Kategori | Verktøy | Pris | Hvem kan bruke |
|----------|---------|------|----------------|
| OWASP-sjekk | OWASP ZAP | Gratis | Teknisk |
| Hemmeligheter | gitleaks, trufflehog | Gratis | Teknisk |
| Dependencies | npm audit, Snyk | Gratis | Begge |
| DAST | OWASP ZAP, Burp Suite | Gratis/Betalt | Teknisk |

### Funksjonell testing

| Kategori | Verktøy | Pris | Hvem kan bruke |
|----------|---------|------|----------------|
| E2E | Playwright, Cypress | Gratis | Teknisk |
| Cross-browser | BrowserStack, LambdaTest | Betalt | Begge |
| AI-testing | Testim, Applitools | Betalt | Begge |

### Ytelse

| Kategori | Verktøy | Pris | Hvem kan bruke |
|----------|---------|------|----------------|
| Frontend | Lighthouse | Gratis | Ikke-teknisk |
| Load | k6, Artillery | Gratis | Teknisk |

### Tilgjengelighet

| Kategori | Verktøy | Pris | Hvem kan bruke |
|----------|---------|------|----------------|
| Automatisk | axe DevTools, WAVE | Gratis | Ikke-teknisk |
| Skjermleser | VoiceOver, NVDA | Gratis | Ikke-teknisk |

---

## 8.2 AI-prompt bibliotek

### Testing og validering

**Generell testplan:**
```
Lag en komplett testplan for [prosjekt/funksjon].

Inkluder:
1. Hvilke typer tester som trengs
2. Prioritering av tester
3. Estimert tidsbruk
4. Hva jeg kan gjøre selv vs. trenger hjelp til
```

**Bug-jakt:**
```
Prøv å finne bugs i [funksjon].

Test:
- Normal bruk (happy path)
- Ugyldig input
- Edge cases (tomme felt, lange verdier, spesialtegn)
- Samtidige operasjoner
- Feilscenarier (nettverk, timeout)

Rapporter alle funn med steg for å reprodusere.
```

**Sikkerhetssjekk:**
```
Gjennomfør en sikkerhetssjekk av [kode/funksjon].

Sjekk for:
- OWASP Top 10 sårbarheter
- Hardkodede hemmeligheter
- Input validering
- Output encoding
- Autentisering/autorisasjon

For hvert problem: vis hvor, forklar risiko, vis løsning.
```

**AI-kode gjennomgang:**
```
Gjennomgå denne AI-genererte koden:

[kode]

Evaluer:
1. Fungerer koden som forventet?
2. Er det sikkerhetsproblemer?
3. Er koden vedlikeholdbar?
4. Mangler det feilhåndtering?
5. Er det unødvendig kompleksitet?

Foreslå forbedringer.
```

### Rapportering

**Statusrapport:**
```
Generer en teststatus-rapport:

Prosjekt: [navn]
Fase: Fase 6 - Testing

Inkluder:
1. Hva er testet
2. Hva gjenstår
3. Funn (bugs, sikkerhet)
4. Blokkere
5. Anbefaling for videre
```

**Lanserings-readiness:**
```
Vurder om prosjektet er klart for lansering.

Gå gjennom:
1. Er alle kritiske tester gjennomført?
2. Er alle P0/P1 bugs fikset?
3. Er sikkerhetssjekker bestått?
4. Er dokumentasjonen komplett?
5. Er det kjente risikoer?

Gi en tydelig JA/NEI med begrunnelse.
```

---

## Sjekkliste før Fase 7

### Minimum (alle prosjekter)
```
☐ AI-kode gjennomgang av kritisk kode
☐ OWASP Top 10 grunnleggende sjekk
☐ Hemmelighetssjekk gjennomført
☐ Dependency scan uten kritiske funn
☐ Manuell testing av hovedflyter
☐ Alle P0 og P1 bugs fikset
```

### Anbefalt (kundevendte apper)
```
☐ Alt over +
☐ Full OWASP-gjennomgang
☐ Cross-browser testing
☐ Ytelsestest (Lighthouse > 70)
☐ Tilgjengelighetstest
☐ Brukertesting (3-5 personer)
☐ GDPR-compliance verifisert
☐ Plattformkrav oppfylt (hvis relevant)
```

### Optimal (stor skala)
```
☐ Alt over +
☐ DAST-skanning
☐ Profesjonell penetrasjonstesting
☐ Load testing
☐ E2E-automatisering
☐ Visuell regresjonstesting
☐ AI governance dokumentasjon
```

---

## 📚 Relaterte filer

### Fase 6-dokumenter:
- **[FASE-6-AI.md](Fase/FASE-6-AI.md)** - AI-instruksjoner for Fase 6
- **[READ-FASE-6-GUIDE.md](Fase/READ-FASE-6-GUIDE.md)** - Prosjektleder-guide for Fase 6

### Fase-navigering:
- **Forrige fase:** [Fase 5: Bygg funksjonene](../Fase%205%20-%20Bygg%20funksjonene/FASE-5-KOMPLETT.md)
- **Neste fase:** [Fase 7: Publiser og vedlikehold](../Fase%207%20-%20Publiser%20og%20vedlikehold/FASE-7-KOMPLETT.md)

### Relevante agenter:
- **[KVALITETSSIKRINGS-agent](../Agenter/agenter/prosess/6-KVALITETSSIKRINGS-agent.md)** - Hovedansvarlig for Fase 6: Test, sikkerhet og kvalitetssjekk
- **[OWASP-ekspert](../Agenter/agenter/ekspert/OWASP-ekspert.md)** - Sikkerhetstest (OWASP Top 10)
- **[TILGJENGELIGHETS-ekspert](../Agenter/agenter/ekspert/TILGJENGELIGHETS-ekspert.md)** - WCAG-testing

### Systemdokumenter:
- **[READ-KIT-CC-BRUKERHÅNDBOK.md](../../READ-KIT-CC-BRUKERHÅNDBOK.md)** - Komplett guide til Kit CC
- **[agent-PHASE-GATES.md](../Agenter/agenter/system/agent-PHASE-GATES.md)** - Kvalitetsvalidering

---
