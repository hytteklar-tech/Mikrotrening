# Fase 5: Bygg funksjonene — Én funksjon om gangen

Du har en fungerende prototype fra Fase 4. Nå handler det om å bygge ut produktet systematisk, iterere basert på feedback, og kontinuerlig validere at du bygger riktig ting. Denne fasen er der mesteparten av utviklingsarbeidet skjer.

**Din rolle som prosjektleder:** Du styrer retningen, prioriterer, og sikrer kvalitet – AI-assistenten gjør kodingen. Du trenger ikke forstå hver kodelinje, men du må forstå hva som bygges og hvorfor. Viktigst: Du er kvalitetskontrollen som sikrer at AI-en ikke introduserer feil, sikkerhetshull eller teknisk gjeld.

**AI-assistentens rolle:** AI-en er din kodende samarbeidspartner – tenk på den som en svært produktiv, men uerfaren juniorutvikler. Den skriver kode raskt, men trenger tydelige instruksjoner og konstant tilsyn. Alt den produserer må verifiseres.

---

## 0. Input fra Fase 4

- Prosjekt-setup fullført (fra Fase 4: MVP)
- MVP fungerer (happy path fungerer)
- Dev-miljø konfigurert
- CI/CD pipline på plass
- Grunnleggende tester skrevet
- Basert på `Kit CC/Agenter/agenter/prosess/4-MVP-agent.md`

---

## Fase 5 sin tre-lags modell: Feature-loopen

Fase 5 er den mest arbeidskrevende fasen — det er her produktet virkelig bygges ut. Arbeidet er organisert i tre lag:

### Ytre loop: Iterere over alle moduler i MODULREGISTER

MODULREGISTER.md (opprettet i Fase 2) er master-listen over alle funksjoner som skal bygges. AI-assistenten jobber seg gjennom registeret modul for modul, i prioritert rekkefølge. Must Have-moduler bygges først, deretter Should Have, og til slutt Could Have (hvis tid tillater).

```
MODULREGISTER.md
├── M-001: Brukerregistrering     ✅ Ferdig
├── M-002: Innlogging             ✅ Ferdig
├── M-003: Dashboard              ← Nåværende modul
├── M-004: Profilredigering       ⏳ Neste
├── M-005: Rapporter              ⏳ Planlagt
└── ...
```

### Midtre syklus: Per modul — Bygg, Test, Poler, Godkjenn

For hver modul gjennomføres en komplett syklus:

| Steg | Hva skjer | Hvem |
|------|-----------|------|
| **Bygg** | AI implementerer modulens funksjoner | AI-assistent |
| **Test** | Verifiser at akseptkriteriene er oppfylt | Du + AI |
| **Poler** | Finjuster UI, feilmeldinger, edge cases | AI-assistent |
| **Godkjenn** | Du bekrefter at modulen er ferdig | Du (prosjektleder) |

Modulen markeres som "Ferdig" i MODULREGISTER.md, og neste modul starter.

### Indre loop: Per delfunksjon innen en modul

Større moduler har flere delfunksjoner. Disse bygges én om gangen i mikro-iterasjoner (se seksjon 4 nedenfor). Eksempel for modul "Dashboard":

1. Hent og vis brukerdata
2. Legg til filtrering
3. Legg til sortering
4. Legg til paginering

### Kontekststrategi

**AI jobber med EN modul om gangen.** Dette er viktig fordi:
- AI-assistenten har begrenset kontekstvindu
- Fokus på én modul gir bedre kodekvalitet
- Feil isoleres til én modul og sprer seg ikke
- Modulen kan testes fullstendig før neste starter

> **For ikke-tekniske:** Tenk på det som å bygge et hus rom for rom. Du bygger ikke alle vegger samtidig — du ferdigstiller ett rom (modul), sjekker at alt er i orden, og går videre til neste. MODULREGISTER er tegningen som viser hvilke rom som skal bygges og i hvilken rekkefølge.

---

### Automatisk tilpasning og verktøy

- **Intensitetstilpasning:** Prioriteringer og krav tilpasses automatisk basert på prosjektets klassifisering (Enkelt hobbyprosjekt → Stort kritisk system). Hva som er obligatorisk, anbefalt eller valgfritt avhenger av prosjekttypen.
- **Kit CC Monitor:** AI-assistenten bruker Kit CC Monitor (en lokal webserver) for å overvåke nettleserfeil, kjøre debug-probes og vise prosjektstatus i sanntid.
- **Automatisk logging:** All fremdrift logges automatisk til PROGRESS-LOG.md. Du trenger ikke gjøre noe — AI-en håndterer dette.

---

## Innholdsfortegnelse

| #  | Tema                                                         | Type      |
|----|--------------------------------------------------------------|-----------|
| 1  | [Gullreglene for AI-assistert utvikling](#1-gullreglene-for-ai-assistert-utvikling) | NY        |
| 2  | [AI som "junior utvikler" – den rette mentaliteten](#2-ai-som-junior-utvikler--den-rette-mentaliteten) | NY        |
| 3  | [Effektiv AI-kommunikasjon og prompt-strategi](#3-effektiv-ai-kommunikasjon-og-prompt-strategi) | NY        |
| 4  | [Mikro-iterasjon med AI](#4-mikro-iterasjon-med-ai) | NY        |
| 5  | [Iterasjonssyklus og sprint-struktur](#5-iterasjonssyklus-og-sprint-struktur) | NY        |
| 6  | [Test-Driven Development (TDD) med AI](#6-test-driven-development-tdd-med-ai) | NY        |
| 7  | [Kodegjennomgang (Code Review)](#7-kodegjennomgang-code-review) | NY        |
| 8  | [Håndtering av AI-hallusinasjoner og feil](#8-håndtering-av-ai-hallusinasjoner-og-feil) | NY        |
| 9  | [Versjonskontroll og checkpoint-strategi](#9-versjonskontroll-og-checkpoint-strategi) | NY        |
| 10 | [Arkitekturbevaring og konsistens](#10-arkitekturbevaring-og-konsistens) | NY        |
| 11 | [Teknisk gjeld-håndtering (inkl. AI-spesifikk gjeld)](#11-teknisk-gjeld-håndtering-inkl-ai-spesifikk-gjeld) | NY        |
| 12 | [SAST og CI/CD-pipeline](#12-sast-og-cicd-pipeline) | NY        |
| 13 | [Fullføre MVP-funksjoner med sikkerhet](#13-fullføre-mvp-funksjoner-med-sikkerhet) | NY        |
| 14 | [Feilhåndtering (komplett)](#14-feilhåndtering-komplett) | NY        |
| 15 | [Feature flags og kontrollert utrulling](#15-feature-flags-og-kontrollert-utrulling) | NY        |
| 16 | [Løpende brukervalidering](#16-løpende-brukervalidering) | NY        |
| 17 | [Polert UI/UX](#17-polert-uiux) | NY        |
| 18 | [Loading og tomme tilstander](#18-loading-og-tomme-tilstander) | NY        |
| 19 | [Ytelsesoptimalisering](#19-ytelsesoptimalisering) | NY        |
| 20 | [Plattformspesifikke valideringer](#20-plattformspesifikke-valideringer) | NY        |
| 21 | [Dokumentasjon underveis (inkl. AI-beslutninger)](#21-dokumentasjon-underveis-inkl-ai-beslutninger) | NY        |
| 22 | [Observabilitet og logging](#22-observabilitet-og-logging) | NY        |
| 23 | [Prosjektleder-dashboard og metrikker](#23-prosjektleder-dashboard-og-metrikker) | NY        |
| 24 | [Sekundære funksjoner](#24-sekundære-funksjoner) | NY        |
| 25 | [Eksport/import](#25-eksportimport) | NY        |
| 26 | [Leveranse fra Fase 5](#26-leveranse-fra-fase-5) | NY        |

---

# Del A: Grunnleggende prinsipper

---

## 1. Gullreglene for AI-assistert utvikling

### Hva dette punktet består av
Fem ufravikelige prinsipper som styrer all interaksjon med AI under utviklingen. Disse reglene er destillert fra tusenvis av timer med AI-assistert utvikling og forskning fra 2024-2026.

### Hva problemet er
Uten klare grunnregler blir AI-assistert utvikling kaotisk. Utviklere og prosjektledere faller i vanlige feller: de stoler blindt på AI-output, gir vage instruksjoner, eller lar uverifisert kode hope seg opp. Resultat: sikkerhetshull, teknisk gjeld, og produkter som må skrives om.

### Hva vi oppnår ved å løse det
- Konsistent kvalitet på tvers av hele prosjektet
- Færre kritiske feil som oppdages sent
- Raskere utvikling fordi du unngår omarbeid
- Bedre samarbeid mellom deg og AI-en

### Hvordan vi går frem

**De fem gullreglene:**

| # | Regel | Forklaring |
|---|-------|------------|
| 1 | **Aldri stol blindt** | All AI-generert kode er uverifisert inntil du har testet den |
| 2 | **Små steg** | Be om én ting om gangen, ikke hele funksjoner på én gang |
| 3 | **Kontekst er alt** | Jo mer kontekst du gir, jo bedre output får du |
| 4 | **Sikkerhet først** | Inkluder alltid sikkerhetskrav i promptene dine |
| 5 | **Dokumenter underveis** | Skriv ned hva du ba om og hva du fikk |

**For AI-assistenten:** Når du mottar en forespørsel, følg disse prinsippene:
- Spør om klargjøring hvis forespørselen er vag
- Foreslå å dele opp store oppgaver i mindre deler
- Påpek potensielle sikkerhetshensyn proaktivt
- Forklar hva koden gjør i enkle termer

### Viktig tilleggsinformasjon
Forskning viser at 84% av utviklere bruker AI-verktøy, men bare de som følger strukturerte arbeidsflyter ser konsistent kvalitetsforbedring. Disse reglene er ikke valgfrie – de er fundamentet alt annet bygger på.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Kritisk | Kritisk | Kritisk | Kritisk |

---

## 2. AI som "junior utvikler" – den rette mentaliteten

### Hva dette punktet består av
En mental modell for hvordan du skal forholde deg til AI-assistenten. Tenk på AI-en som en ekstremt produktiv, men uerfaren juniorutvikler som trenger veiledning, tilsyn og code review.

### Hva problemet er
Mange behandler AI som en "magisk boks" som produserer perfekt kode. Virkeligheten er annerledes:
- 62% av AI-generert kode inneholder design-feil eller sikkerhetshull
- AI skriver kode med full overbevisning – inkludert feil og tull
- AI vil ikke fortelle deg at noe er galt med mindre du spør direkte
- AI mangler arkitektonisk dømmekraft og langsiktig tenkning

### Hva vi oppnår ved å løse det
- Realistiske forventninger = mindre frustrasjon
- Færre feil som slipper gjennom til produksjon
- Bedre utnyttelse av AI-ens styrker
- Tryggere produkter for sluttbrukerne

### Hvordan vi går frem

**Behandle AI-output som du ville behandlet arbeid fra en junior:**

| Situasjon | Junior utvikler | AI-assistent |
|-----------|-----------------|--------------|
| Får oppgave | Trenger klare krav | Trenger klare prompts |
| Leverer kode | Du gjør code review | Du gjør code review |
| Gjør feil | Du veileder og korrigerer | Du gir feedback og ber om ny versjon |
| Tar snarveier | Du påpeker og ber om forbedring | Du påpeker og ber om forbedring |
| Vet ikke svaret | Innrømmer det (forhåpentligvis) | Later som den vet (hallusinerer) |

**Eksempel på dialog:**
```
❌ Dårlig tilnærming:
"Lag en innloggingsfunksjon."
[Aksepterer koden uten gjennomgang]

✅ God tilnærming:
"Lag en innloggingsfunksjon med følgende krav:
- Bruk sikker passord-hashing (bcrypt)
- Implementer rate limiting
- Logg alle innloggingsforsøk
- Returner generiske feilmeldinger (ikke avslør om e-post finnes)

Etter at du har skrevet koden, forklar hvilke sikkerhetstiltak du har implementert."
[Gjennomgår koden kritisk før aksept]
```

**For AI-assistenten:** Når du genererer kode:
- Vær åpen om begrensninger og usikkerhet
- Foreslå at prosjektleder verifiserer kritiske deler
- Påpek hvis du gjør antakelser
- Tilby å forklare logikken steg for steg

### Viktig tilleggsinformasjon
Simon Willison, en anerkjent utvikler, beskriver AI som "over-confident and prone to mistakes." Dette er ikke en kritikk – det er en observasjon som bør forme hvordan vi jobber. AI er et kraftig verktøy, men et verktøy krever en kompetent operatør.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Viktig | Viktig | Kritisk | Kritisk |

---

# Del B: Kommunikasjon og arbeidsflyt

---

## 3. Effektiv AI-kommunikasjon og prompt-strategi

### Hva dette punktet består av
Systematiske teknikker for å kommunisere med AI-assistenten på en måte som gir konsekvent høy kvalitet på output. Dette inkluderer prompt-strukturer, kontekstgiving, og sikkerhetsfokuserte formuleringer.

### Hva problemet er
Vage prompts gir vag og ofte feil kode. Forskning viser:
- Uten sikkerhetsinstruksjoner produserer AI usikker kode i opptil 40% av tilfellene
- Manglende kontekst fører til kode som ikke passer med eksisterende arkitektur
- Upresise krav gir kode som teknisk fungerer, men ikke løser det faktiske problemet

### Hva vi oppnår ved å løse det
- Drastisk reduksjon i omarbeid og korrigeringer
- Kode som faktisk passer inn i prosjektet
- Innebygd sikkerhet fra starten
- Mer forutsigbare resultater

### Hvordan vi går frem

**Prompt-strukturen KSKSE:**

| Element | Betydning | Eksempel |
|---------|-----------|----------|
| **K**ontekst | Bakgrunn AI-en trenger | "Vi bygger en oppgave-app med React og Supabase" |
| **S**pesifikasjon | Nøyaktig hva du vil ha | "Lag en funksjon som henter brukerens oppgaver" |
| **K**rav | Spesifikke betingelser | "Må håndtere feil, bruke TypeScript, og cache resultatet" |
| **S**ikkerhet | Sikkerhetsrelaterte instrukser | "Verifiser at brukeren har tilgang til oppgavene" |
| **E**ksempler | Vis hva du mener | "Output skal se slik ut: { tasks: [...], error: null }" |

**Sikkerhets-boostere (legg alltid til minst én):**
```
"Bruk sikre kodingspraksiser for [området]"
"Valider all input før bruk"
"Ikke eksponer sensitiv informasjon i feilmeldinger"
"Bruk parameteriserte spørringer for database-kall"
"Implementer tilgangskontroll på dette endepunktet"
```

**Eksempel på komplett prompt:**
```
KONTEKST:
Vi bygger en oppgaveliste-app med Next.js og Supabase.
Brukere kan ha mange prosjekter, og hvert prosjekt har oppgaver.
Vi bruker TypeScript og følger REST-konvensjoner.

SPESIFIKASJON:
Lag en API-rute som lar brukeren slette en oppgave.

KRAV:
- Endepunkt: DELETE /api/tasks/[id]
- Returner 204 ved suksess, 404 hvis ikke funnet
- Håndter database-feil gracefully
- Logg slettingen for audit trail

SIKKERHET:
- Verifiser at brukeren eier oppgaven før sletting
- Bruk parameterisert spørring
- Ikke avslør om oppgaven finnes for andre brukere

EKSEMPEL PÅ RESPONS:
Suksess: 204 No Content
Feil: { "error": "Kunne ikke slette oppgaven" }
```

**For AI-assistenten:** Når du mottar en prompt:
1. Sjekk om alle KSKSE-elementene er til stede
2. Spør etter manglende elementer før du genererer kode
3. Oppsummer din forståelse før du begynner
4. Implementer alle sikkerhetskrav eksplisitt

### Viktig tilleggsinformasjon
Studier viser at utviklere som bruker strukturerte prompts får 3x færre sikkerhetsfeil i AI-generert kode. Tiden du bruker på å skrive gode prompts, sparer du mangedobbelt i debugging og omarbeid.

**Prompt-mal du kan kopiere:**
```
KONTEKST:
[Beskriv prosjektet og relevant bakgrunn]

SPESIFIKASJON:
[Hva skal lages/endres?]

KRAV:
- [Krav 1]
- [Krav 2]
- [Krav 3]

SIKKERHET:
- [Sikkerhetskrav 1]
- [Sikkerhetskrav 2]

EKSEMPEL:
[Vis forventet input/output hvis relevant]
```

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Moderat | Viktig | Kritisk | Kritisk |

---

## 4. Mikro-iterasjon med AI

### Hva dette punktet består av
En arbeidsmetodikk der du deler opp arbeidet i svært små, håndterbare enheter og itererer med AI på hver enhet. I stedet for å be om "hele funksjonen", ber du om én liten del, verifiserer den, og går videre.

### Hva problemet er
Å be AI om store, monolittiske outputs fører til:
- Feil som gjemmer seg i kompleks kode
- Kode som er vanskelig å debugge
- "All or nothing"-situasjoner der du må forkaste alt
- AI som "koder deg inn i et hjørne" med ikke-modulær kode
- Opphopning av teknisk gjeld

### Hva vi oppnår ved å løse det
- Feil oppdages umiddelbart, ikke etter 500 linjer
- Enklere å rulle tilbake én liten endring
- Bedre kontroll og oversikt
- Kode som er naturlig modulær
- Raskere total utviklingstid (paradoksalt nok)

### Hvordan vi går frem

**Mikro-iterasjon i praksis:**

```
❌ Dårlig: "Lag et komplett brukerregistreringssystem med e-postverifisering"

✅ Godt: Del opp i mikro-oppgaver:
1. "Lag et skjema for brukerregistrering med felt for e-post og passord"
   → Verifiser at skjemaet vises korrekt

2. "Legg til validering på e-post-feltet"
   → Test med gyldige og ugyldige e-poster

3. "Legg til validering på passord-feltet (min 8 tegn, må ha tall)"
   → Test med ulike passord

4. "Lag en API-rute som mottar registreringsdataene"
   → Test at data mottas korrekt

5. "Legg til passord-hashing i API-ruten"
   → Verifiser at passord aldri lagres i klartekst

6. "Legg til bruker-opprettelse i databasen"
   → Test at bruker lagres

7. "Lag funksjon for å generere verifiseringstoken"
   → Test at tokens er unike og sikre

8. "Implementer e-post-sending med verifiseringslenke"
   → Test at e-post sendes

9. "Lag verifiseringsside som aktiverer kontoen"
   → Test hele flyten
```

**Sjekkliste etter hver mikro-iterasjon:**
- [ ] Fungerer den nye koden isolert?
- [ ] Fungerer den sammen med eksisterende kode?
- [ ] Er det noen åpenbare feil eller sikkerhetshull?
- [ ] Forstår jeg hva koden gjør?
- [ ] Har jeg committet endringen?

**Dialog-eksempel:**
```
Du: "La oss starte med punkt 1: Lag registreringsskjemaet."

AI: [Genererer skjema-kode]

Du: "Bra. Nå tester jeg... Skjemaet vises. La oss gå videre til
e-post-validering. Legg til validering som sjekker at det er
en gyldig e-postadresse."

AI: [Legger til validering]

Du: "Testet med 'test@test.com' - fungerer. Testet med 'ugyldig' -
viser feilmelding. Commit gjort. Neste: passord-validering."
```

**For AI-assistenten:** Ved store forespørsler:
1. Foreslå å dele opp i mindre deler
2. Presenter en nummerert plan for prosjektleder
3. Vent på godkjenning før du genererer kode
4. Etter hver del, spør om du skal fortsette

### Viktig tilleggsinformasjon
Dette kan føles tregere i starten, men data viser at mikro-iterasjon faktisk er raskere totalt sett. Grunnen er enkel: du unngår de enorme tidsslukene som oppstår når du må feilsøke 500 linjer for å finne én feil, eller når du må forkaste alt og starte på nytt.

**Tommelfingerregel:** Hvis du ikke kan verifisere resultatet på under 2 minutter, er oppgaven for stor.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Moderat | Viktig | Kritisk | Kritisk |

---

## 5. Iterasjonssyklus og sprint-struktur

### Hva dette punktet består av
En strukturert måte å dele opp utviklingsarbeidet i håndterbare biter på makronivå. I stedet for å prøve å bygge alt på én gang, jobber du i korte sykluser (sprinter) der du planlegger, bygger, tester og evaluerer.

### Hva problemet er
Uten struktur på høyere nivå blir vibekoding kaotisk. Du risikerer:
- Å hoppe mellom halvferdige funksjoner
- Å miste oversikt over hva som er gjort og hva som gjenstår
- Å aldri faktisk bli ferdig med noe
- Scope creep (stadig flere "bare én ting til")

### Hva vi oppnår ved å løse det
- Målbare fremskritt hver uke/sprint
- Klar oversikt for alle involverte
- Regelmessige leveranser som kan testes
- Realistisk planlegging basert på faktisk hastighet

### Hvordan vi går frem

**Anbefalt struktur for vibekoding:**

| Sprint-lengde | Passer for |
|---------------|------------|
| 1 uke | Små prosjekter, rask eksperimentering |
| 2 uker | De fleste prosjekter (anbefalt standard) |
| 3-4 uker | Komplekse prosjekter med mange avhengigheter |

**Hver sprint inneholder:**

**1. Sprint-planlegging (dag 1, maks 1 time)**
```
Gjøremål:
- Velg 3-5 brukerhistorier fra backlog
- Diskuter med AI-assistenten hva som trengs
- Estimer kompleksitet (liten/medium/stor)
- Legg til 25% buffer for AI-review og debugging
```

**2. Utvikling (dag 2 til nest siste dag)**
```
Daglig rutine:
□ Morgen: Status fra forrige dag, dagens mål
□ Formiddag: Mikro-iterasjon på dagens oppgave
□ Lunsj: Pause (viktig for perspektiv!)
□ Ettermiddag: Fortsett + code review av dagens arbeid
□ Slutt: Commit, oppdater status, planlegg neste dag
```

**3. Review og demo (siste dag)**
```
Aktiviteter:
- Vis frem hva som er bygget
- Samle feedback fra interessenter
- Dokumenter hva som fungerte og ikke
- Planlegg forbedringer til neste sprint
```

**Eksempel på dialog med AI-assistenten ved sprintstart:**
```
"Vi starter sprint 3. Denne uken skal vi implementere:
1. Brukerregistrering med e-postverifisering
2. Passord-reset-funksjon
3. Profilside med redigeringsmulighet

La oss bryte ned brukerregistrering i mikro-oppgaver først.
Foreslå en oppdeling med estimat for hver del."
```

**Sprint-estimering med AI:**

| Kompleksitet | Typisk varighet | Med AI-review-buffer |
|--------------|-----------------|---------------------|
| Liten | 2-4 timer | 3-5 timer |
| Medium | 1-2 dager | 1.5-2.5 dager |
| Stor | 3-5 dager | 4-6 dager |

**For AI-assistenten:** Ved sprintplanlegging:
- Hjelp med å bryte ned brukerhistorier
- Gi realistiske estimater (heller for høye enn for lave)
- Identifiser avhengigheter mellom oppgaver
- Foreslå rekkefølge basert på risiko (vanskeligst først)

### Viktig tilleggsinformasjon
Hold sprint-planleggingen kort – det er bedre å starte og justere underveis enn å planlegge perfekt. Forskning viser at daglig kodeintegrering reduserer integrasjonsproblemer med 75%.

**Viktig:** AI-estimater er ofte for optimistiske. Legg alltid til 25% buffer for review, debugging og uforutsette problemer.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Moderat | Viktig | Kritisk | Kritisk |

---

# Del C: Kvalitetssikring under utvikling

---

## 6. Test-Driven Development (TDD) med AI

### Hva dette punktet består av
En utviklingsmetodikk der du skriver tester FØR du skriver selve koden. Med AI betyr dette at du ber AI-en lage tester først, og deretter kode som får testene til å passere.

### Hva problemet er
Uten TDD i AI-assistert utvikling:
- AI genererer kode uten klare suksesskriterier
- Du vet ikke om koden faktisk fungerer før du tester manuelt
- Feil oppdages sent og er dyre å fikse
- AI får ingen tydelig tilbakemelding på hva som er "riktig"

### Hva vi oppnår ved å løse det
- Klare suksesskriterier FØR koding starter
- Automatisk verifisering av at koden fungerer
- AI kan iterere til testene passerer
- Færre regresjoner (ting som sluttet å fungere)
- Høyere tillit til at produktet faktisk virker

### Hvordan vi går frem

**TDD-syklusen med AI:**

```
1. 🔴 RØD: Skriv en test som feiler
   "Lag en test for en funksjon som validerer norske
   telefonnumre. Testen skal sjekke gyldige formater
   som +47 12345678 og 12345678."

2. 🟢 GRØNN: Skriv kode som får testen til å passere
   "Nå lag funksjonen som får denne testen til å passere.
   Ikke gjør mer enn nødvendig for å passere testen."

3. 🔵 REFAKTORER: Forbedre koden uten å endre oppførsel
   "Refaktorer funksjonen for bedre lesbarhet, men
   sørg for at testen fortsatt passerer."

4. 🔁 GJENTA: Legg til flere tester og utvid funksjonalitet
```

**Eksempel på TDD-dialog:**
```
Du: "Vi skal lage validering for norske telefonnumre.
Start med å skrive tester for følgende tilfeller:
- Gyldig: '+47 12345678', '12345678', '+4712345678'
- Ugyldig: '1234', 'abcdefgh', '+46 12345678'"

AI: [Skriver tester]

Du: "Kjør testene og bekreft at de feiler (vi har jo ikke
laget funksjonen ennå)."

AI: "Alle tester feiler som forventet."

Du: "Bra. Nå lag funksjonen som får alle testene til å passere."

AI: [Skriver funksjon]

Du: "Kjør testene igjen."

AI: "Alle 6 tester passerer."

Du: "Utmerket. Er det flere edge cases vi bør teste?"

AI: "Ja, vi bør teste: tomme strenger, null-verdier,
nummer med bindestrek (12-34-56-78), og svært lange numre."

Du: "Legg til tester for de og kjør igjen."
```

**Hva slags tester trengs:**

| Test-type | Hva den tester | Når bruke |
|-----------|----------------|-----------|
| **Unit-tester** | Én funksjon isolert | Alltid |
| **Integrasjonstester** | Flere deler sammen | Når deler snakker sammen |
| **E2E-tester** | Hele flyten som bruker | For kritiske brukerreiser |

**For AI-assistenten:** Ved TDD:
1. Alltid tilby å skrive tester først
2. Generer tester som dekker normale cases, edge cases, og feil-cases
3. Kjør testene og rapporter resultater
4. Iterer til alle tester passerer
5. Foreslå flere tester proaktivt

### Viktig tilleggsinformasjon
TDD er spesielt effektivt med AI fordi:
- AI er god på å generere mange test-cases
- Testene gir AI klare kriterier å jobbe mot
- Du kan raskt iterere til alt passerer
- Det tvinger deg til å tenke gjennom kravene først

**Minimum testdekning:**
- 100% for sikkerhetskritisk kode (autentisering, autorisasjon, betalinger)
- 80% for forretningslogikk
- 60% for UI-komponenter

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Moderat | Viktig | Kritisk | Kritisk |

---

## 7. Kodegjennomgang (Code Review)

### Hva dette punktet består av
At du systematisk gjennomgår all kode AI-assistenten har generert før den blir en del av produktet. Dette er din viktigste kvalitetskontroll.

### Hva problemet er
Forskning viser at AI-generert kode har spesifikke problemer:
- 8x høyere kodeduplisering enn menneskeskrevet kode
- 62% inneholder design-feil eller sikkerhetssårbarheter
- AI "later som den vet" – den skriver feil med full overbevisning
- Subtile feil er vanskelige å oppdage uten systematisk gjennomgang

### Hva vi oppnår ved å løse det
- Fanger feil før de blir problemer i produksjon
- Sikrer at koden følger prosjektets standarder
- Lærer deg å forstå hva som bygges
- Bygger tillit til produktets kvalitet

### Hvordan vi går frem

**Sjekkliste for code review:**

**Funksjonalitet:**
- [ ] Gjør koden det den skal?
- [ ] Er alle krav fra prompten oppfylt?
- [ ] Fungerer edge cases (tomme verdier, ekstreme verdier)?
- [ ] Hva skjer hvis noe feiler?

**Sikkerhet (KRITISK for AI-kode):**
- [ ] Er det hardkodede hemmeligheter (API-nøkler, passord)?
- [ ] Valideres all brukerinput før bruk?
- [ ] Er det SQL-injection sårbarheter? (Bruk parameteriserte spørringer)
- [ ] Er det XSS-sårbarheter? (Escapes brukerinnhold?)
- [ ] Er tilgangskontroll på plass?
- [ ] Eksponeres sensitiv informasjon i feilmeldinger?

**Kodekvalitet:**
- [ ] Er koden forståelig? (Kan du forklare hva den gjør?)
- [ ] Er det unødvendig duplisering?
- [ ] Følger den etablerte mønstre i prosjektet?
- [ ] Er variabelnavn og funksjoner forståelige?

**AI-spesifikke ting å se etter:**
- [ ] Brukes utdaterte biblioteker eller API-er?
- [ ] Er det "dead code" (kode som aldri kjøres)?
- [ ] Er det over-kompliserte løsninger på enkle problemer?
- [ ] Er det copy-paste-kode som burde vært en felles funksjon?

**Hvordan gjøre code review med AI:**

```
"Jeg vil at du gjennomgår koden du nettopp skrev for
brukerautentisering. Se på den med friske øyne og:
1. Finn potensielle sikkerhetsproblemer
2. Identifiser kodeduplisering
3. Foreslå forbedringer
4. Sjekk at feilhåndtering er komplett

Start med sikkerhetsproblemer – det er viktigst."
```

**For ekstra grundig gjennomgang (Adversarial review):**
```
"Tenk deg at du er en sikkerhetskonsulent som skal
finne sårbarheter i denne applikasjonen. Prøv å
'hacke' autentiseringskoden – hvilke svakheter finner du?"
```

**Review-frekvens:**

| Situasjon | Når gjøre review |
|-----------|-----------------|
| Ny funksjon | Før merge til hovedkode |
| Sikkerhetsrelatert kode | Umiddelbart etter generering |
| Stor endring | Før og etter |
| Daglig arbeid | Ved slutten av dagen |

**For AI-assistenten:** Etter å ha generert kode:
1. Tilby å gjøre en selv-review
2. Påpek potensielle svakheter proaktivt
3. Foreslå forbedringer du ser
4. Vær ærlig om usikkerhet

### Viktig tilleggsinformasjon
Ikke vær redd for å stille "dumme" spørsmål om koden. Hvis du ikke forstår hva den gjør, er det enten:
1. For komplisert (bør forenkles)
2. Dårlig forklart (bør dokumenteres bedre)

Begge deler bør fikses.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Moderat | Viktig | Kritisk | Kritisk |

---

## 8. Håndtering av AI-hallusinasjoner og feil

### Hva dette punktet består av
Strategier for å oppdage, forstå og håndtere tilfeller der AI-assistenten genererer feil, oppdiktet informasjon, eller utdaterte løsninger.

### Hva problemet er
AI-"hallusinasjoner" er når AI-en:
- Refererer til biblioteker eller funksjoner som ikke eksisterer
- Bruker utdaterte API-er eller syntaks
- Hevder at koden gjør noe den ikke gjør
- Oppfinner feilmeldinger eller dokumentasjon

Dette er spesielt farlig fordi AI presenterer alt med samme overbevisning – enten det er riktig eller fullstendig oppspinn.

### Hva vi oppnår ved å løse det
- Unngår timer med debugging av ikke-eksisterende problemer
- Bygger ikke på utdaterte eller sårbare biblioteker
- Sparer tid og frustrasjon
- Høyere tillit til sluttproduktet

### Hvordan vi går frem

**Vanlige AI-hallusinasjoner å se etter:**

| Type | Eksempel | Hvordan oppdage |
|------|----------|-----------------|
| **Oppdiktede funksjoner** | `user.validateEmail()` som ikke finnes | Prøv å kjøre koden |
| **Utdaterte API-er** | Gammel syntaks for et bibliotek | Sjekk bibliotekets dokumentasjon |
| **Falske biblioteker** | `import magic-validator` som ikke eksisterer | Søk etter biblioteket |
| **Feil versjon** | Kode for React 17 når du bruker 18 | Sjekk kompatibilitet |
| **Overdreven optimisme** | "Dette er 100% sikkert" | Vær skeptisk til absolutte påstander |

**Verifiseringsrutine:**

```
For hver kode-blokk AI genererer:

1. KJØR KODEN
   → Fungerer den i det hele tatt?

2. SJEKK AVHENGIGHETER
   "Hvilke biblioteker bruker denne koden?
   Er alle på nyeste stabile versjon?"

3. VERIFISER PÅSTANDER
   → Hvis AI hevder at noe er "best practice",
     søk det opp

4. TEST EDGE CASES
   → Hva skjer med tomme verdier, lange tekster,
     spesialtegn?

5. SPØR KRITISK
   "Er du sikker på at [påstand]? Kan du vise
   meg dokumentasjon som bekrefter dette?"
```

**Dialog for å fange hallusinasjoner:**
```
Du: "Du brukte 'validateEmail' fra 'email-utils' biblioteket.
Er du sikker på at dette biblioteket eksisterer og har denne funksjonen?"

AI: [Enten bekrefter med lenke, eller innrømmer usikkerhet]

Du: "Vennligst bruk et etablert bibliotek som 'validator.js'
i stedet, og vis meg den oppdaterte koden."
```

**Røde flagg som bør utløse ekstra sjekk:**
- AI sier "dette er standard måten"
- AI refererer til spesifikke versjonsnumre
- AI bruker biblioteker du aldri har hørt om
- Koden ser "for enkel ut" for et komplekst problem
- AI er ekstremt sikker på noe

**For AI-assistenten:** For å redusere hallusinasjoner:
1. Si "jeg er usikker" når du faktisk er usikker
2. Anbefal at prosjektleder verifiserer biblioteker
3. Nevn hvis du bruker eldre kunnskap
4. Tilby alternativer når du ikke er sikker

### Viktig tilleggsinformasjon
Hallusinasjoner er ikke en feil i AI-en – det er et grunnleggende trekk ved hvordan språkmodeller fungerer. De "fyller inn" sannsynlige svar, og noen ganger er det sannsynlige feil. Din jobb er å være filteret som fanger dette.

**Tommelfingerregel:** Hvis AI er 100% sikker på noe du ikke kan verifisere umiddelbart, vær ekstra skeptisk.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Viktig | Viktig | Kritisk | Kritisk |

---

## 9. Versjonskontroll og checkpoint-strategi

### Hva dette punktet består av
Systematisk bruk av Git for å lagre arbeid, lage sikkerhetsnettt, og kunne rulle tilbake når AI introduserer feil.

### Hva problemet er
Uten god versjonskontroll ved AI-assistert utvikling:
- Feil kode blandes med god kode
- Vanskelig å finne når og hvor noe gikk galt
- Ingen måte å "angre" en dårlig AI-generert endring
- Store, uoversiktlige commits som er umulige å forstå

### Hva vi oppnår ved å løse det
- Trygt sikkerhetsnett: du kan alltid gå tilbake
- Enkel debugging: "denne feilen kom etter commit X"
- Ryddig historikk som dokumenterer utviklingen
- Mulighet til å eksperimentere uten risiko

### Hvordan vi går frem

**Commit-strategi for vibekoding:**

```
ALDRI:
❌ Én stor commit på slutten av dagen
❌ "Diverse endringer" som commit-melding
❌ Blande flere funksjoner i én commit

ALLTID:
✅ Commit etter hver vellykket mikro-iterasjon
✅ Beskrivende commit-meldinger
✅ Én logisk endring per commit
```

**Checkpoint-rutine:**

| Hendelse | Aksjon |
|----------|--------|
| Før du starter ny funksjon | Lag en branch |
| Etter vellykket mikro-iterasjon | Commit |
| Før eksperimentering | Commit først |
| Etter code review | Commit + merge |
| Ved usikkerhet | Commit det som fungerer |

**Commit-meldinger som fungerer:**

```
✅ Gode meldinger:
"Legg til e-post-validering i registreringsskjema"
"Fiks: Passord-reset sender nå faktisk e-post"
"Refaktorer: Flytt valideringslogikk til egen funksjon"

❌ Dårlige meldinger:
"Diverse fikser"
"Oppdateringer"
"AI-generert kode"
"WIP"
```

**Branch-strategi:**

```
main (produksjon)
  └── develop (utvikling)
       ├── feature/bruker-registrering
       ├── feature/passord-reset
       └── fix/login-feil
```

**Dialog med AI for versjonskontroll:**
```
"Før vi gjør denne endringen, la meg committe
det som fungerer. [Gjør commit]

Ok, nå kan vi eksperimentere med den nye løsningen.
Hvis det ikke fungerer, kan vi enkelt gå tilbake."
```

**Når du må rulle tilbake:**
```
# Se historikk
git log --oneline

# Gå tilbake til en spesifikk commit
git checkout [commit-hash]

# Eller angre siste commit (behold endringene)
git reset --soft HEAD~1
```

**For AI-assistenten:** Ved versjonskontroll:
1. Minn prosjektleder på å committe før store endringer
2. Foreslå passende commit-meldinger
3. Anbefal branches for eksperimentering
4. Hjelp med å forstå git-kommandoer

### Viktig tilleggsinformasjon
"Clean git state makes it easier to isolate AI-introduced bugs and rollback cleanly." Aldri la uncommitted endringer hope seg opp – det er oppskrift på katastrofe.

**Tommelfingerregel:** Hvis du tenker "dette burde jeg kanskje committe", så bør du committe.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Moderat | Viktig | Kritisk | Kritisk |

---

# Del D: Arkitektur og teknisk helse

---

## 10. Arkitekturbevaring og konsistens

### Hva dette punktet består av
Å sikre at AI-generert kode følger prosjektets etablerte arkitektur, mønstre og konvensjoner – og ikke gradvis bryter ned strukturen.

### Hva problemet er
AI-generert kode er "highly functional but systematically lacking in architectural judgment" (Ox Security). Over tid fører dette til:
- **Architectural drift**: Subtile endringer som bryter sikkerhets-invarianter
- Inkonsistente mønstre (samme ting gjøres på 5 forskjellige måter)
- Økende kompleksitet som gjør endringer vanskeligere
- Brudd på "separation of concerns" (ting havner på feil sted)

### Hva vi oppnår ved å løse det
- Kode som er enkel å forstå og vedlikeholde
- Konsistent brukeropplevelse (fordi koden er konsistent)
- Nye funksjoner er enkle å legge til
- Færre "rare bugs" som kommer fra inkonsistens

### Hvordan vi går frem

**Dokumenter arkitekturen tydelig:**

```markdown
# Arkitektur-guide for [Prosjektnavn]

## Mappestruktur
/src
  /components    → Gjenbrukbare UI-komponenter
  /pages         → Side-komponenter
  /hooks         → Custom React hooks
  /utils         → Hjelpefunksjoner
  /services      → API-kall og ekstern kommunikasjon
  /types         → TypeScript-typer

## Konvensjoner
- Komponenter: PascalCase (UserProfile.tsx)
- Funksjoner: camelCase (getUserById)
- Konstanter: UPPER_SNAKE_CASE (MAX_RETRIES)
- Filer: kebab-case (user-profile.tsx)

## Mønstre vi bruker
- State management: Zustand
- Styling: Tailwind CSS
- API-kall: React Query
- Forms: React Hook Form + Zod
```

**Inkluder arkitektur i prompts:**

```
"Vi følger denne strukturen i prosjektet:
- API-kall gjøres alltid via /services
- Komponenter bruker props, ikke direkte API-kall
- All validering bruker Zod-schemas
- Feil håndteres med ErrorBoundary

Lag en ny funksjon for å hente brukerdata som følger
disse mønstrene."
```

**Arkitektur-review sjekkliste:**

| Sjekk | Spørsmål |
|-------|----------|
| Plassering | Er koden i riktig mappe/fil? |
| Navngivning | Følger den konvensjonene våre? |
| Avhengigheter | Importerer den fra riktige steder? |
| Mønstre | Bruker den etablerte mønstre? |
| Ansvar | Gjør den bare én ting? |

**Periodisk arkitektur-sjekk:**
```
"Gjennomgå de siste 10 filene vi har laget:
1. Følger de mappestrukturen?
2. Er navngivning konsistent?
3. Bruker alle samme mønstre for [X]?
4. Er det noen som avviker og bør refaktoreres?"
```

**For AI-assistenten:** Ved arkitekturbevaring:
1. Les og forstå prosjektets arkitektur-guide
2. Spør om arkitektur hvis det er uklart
3. Følg etablerte mønstre konsekvent
4. Påpek hvis en forespørsel bryter med arkitekturen
5. Foreslå refaktorering hvis du ser inkonsistens

### Viktig tilleggsinformasjon
Arkitektur-konsistens er enklere å opprettholde enn å reparere. En time brukt på å dokumentere arkitekturen i starten sparer ti timer med refaktorering senere.

**Viktig regel:** Hvis AI foreslår en løsning som ikke følger etablerte mønstre, spør hvorfor før du aksepterer.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Lav | Moderat | Viktig | Kritisk |

---

## 11. Teknisk gjeld-håndtering (inkl. AI-spesifikk gjeld)

### Hva dette punktet består av
Å identifisere, dokumentere og systematisk betale ned teknisk gjeld – med spesielt fokus på den unike gjelden som AI-generert kode skaper.

### Hva problemet er
Teknisk gjeld er kode som fungerer, men som er skrevet på en rask/dårlig måte og vil skape problemer senere. AI-generert kode har spesielle problemer:
- 8x høyere kodeduplisering
- "I don't think I have ever seen so much technical debt being created in such a short period of time" (industrikritiker)
- AI-gjeld akkumulerer eksponentielt ("compounds")
- 40% av IT-budsjetter kan gå til å håndtere teknisk gjeld

### Hva vi oppnår ved å løse det
- Kode som er enkel å endre og utvide
- Færre bugs fra "rare code paths"
- Raskere utvikling over tid (i stedet for tregere)
- Lavere vedlikeholdskostnader

### Hvordan vi går frem

**Vanlige kilder til teknisk gjeld i vibekoding:**

| Kilde | Beskrivelse | AI-spesifikk |
|-------|-------------|--------------|
| Kodeduplisering | Samme kode flere steder | Ja, 8x høyere med AI |
| Copy-paste | Kopiert kode i stedet for funksjoner | Ja, AI elsker dette |
| Dead code | Kode som aldri kjøres | Ja, "backward compatibility" |
| Hardkodede verdier | Verdier som burde vært konfigurerbare | Ja, vanlig |
| Manglende tester | Kode uten tests | Ja, ofte hoppet over |
| TODO-kommentarer | Ting som skulle fikses "senere" | Ja, mange |
| Over-kompleksitet | For avansert løsning på enkelt problem | Ja, AI viser seg fram |

**Strategi: Allokér 20% av hver sprint til gjeldshåndtering**

| Aktivitet | Andel av sprint |
|-----------|-----------------|
| Ny funksjonalitet | 80% |
| Teknisk gjeld | 20% |

**Identifiser AI-spesifikk gjeld:**

```
"Gjennomgå kodebasen og finn AI-typiske problemer:
1. Steder der samme logikk er duplisert
2. Funksjoner som er blitt for lange (>50 linjer)
3. Kode som aldri kalles ('dead code')
4. TODO-kommentarer som ikke er løst
5. Steder der vi tok snarveier
6. Manglende tester for kritisk funksjonalitet
7. Hardkodede verdier som burde vært config

Prioriter etter: Sikkerhet > Funksjonalitet > Lesbarhet"
```

**Teknisk gjeld-logg:**

| Problem | Type | Risiko | Estimat | Prioritet |
|---------|------|--------|---------|-----------|
| Duplisert validering | AI-typisk | Medium | 2 timer | Denne sprint |
| Dead code i auth | AI-typisk | Lav | 1 time | Denne sprint |
| Mangler tester for login | Standard | Høy | 4 timer | Neste sprint |
| Hardkodet API-URL | Standard | Lav | 30 min | Når tid |
| Funksjon med 200 linjer | AI-typisk | Medium | 3 timer | Neste sprint |

**"Tech Debt Friday"-rutine:**
```
Hver fredag (eller tilsvarende):
1. Gå gjennom gjeld-loggen
2. Velg 2-3 poster å håndtere
3. Refaktorer med AI-hjelp
4. Kjør alle tester for å verifisere
5. Commit og oppdater loggen
```

**For AI-assistenten:** Ved gjeldshåndtering:
1. Hjelp med å identifisere gjeld proaktivt
2. Foreslå refaktorering når du ser duplisering
3. Advarer når løsninger er for komplekse
4. Hjelp med å skrive tester for utestet kode
5. Påpek "dead code" du oppdager

### Viktig tilleggsinformasjon
Teknisk gjeld er som ekte gjeld: litt er OK, mye er farlig, og ignorert gjeld vokser. Med AI-generert kode er risikoen høyere fordi gjelden akkumuleres raskere.

**Tommelfingerregel:** Hvis du tenker "dette kan vi fikse senere", skriv det ned i gjeld-loggen umiddelbart.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Moderat | Viktig | Viktig | Kritisk |

---

## 12. SAST og CI/CD-pipeline

### Hva dette punktet består av
- **SAST** (Static Application Security Testing): Automatiske verktøy som skanner koden og finner sikkerhetsproblemer
- **CI/CD** (Continuous Integration/Continuous Deployment): Automatisk bygging, testing og utrulling av kode

### Hva problemet er
Mennesker overser ting – spesielt i kode de selv har fått AI til å skrive. Uten automatisering:
- Sikkerhetsfeil slipper gjennom
- Tester glemmes
- Kode som ikke kompilerer blir merget
- "Det fungerte på min maskin"-problemer

### Hva vi oppnår ved å løse det
- Automatisk sikkerhetsskanning på all kode
- Tester kjører ved hver endring
- Umiddelbar feedback hvis noe er galt
- Tryggere leveranser
- 75% reduksjon i integrasjonsproblemer (forskning)

### Hvordan vi går frem

**Hva SAST-verktøy finner:**
- Hardkodede hemmeligheter (API-nøkler i koden)
- Vanlige sikkerhetsfeil (SQL-injection, XSS)
- Usikre avhengigheter (biblioteker med kjente sårbarheter)
- Dårlige sikkerhetspraksiser

**Minimum oppsett (gratis på GitHub):**

| Verktøy | Hva det gjør | Kost |
|---------|--------------|------|
| Dependabot | Varsler om usikre avhengigheter | Gratis |
| GitHub Actions | Kjører tester automatisk | Gratis (2000 min/mnd) |
| Branch protection | Krever at tester passerer | Gratis |
| CodeQL | Finner sikkerhetssårbarheter | Gratis |

**Enkel CI/CD for vibekodere:**

```
"Sett opp en enkel CI/CD-pipeline som:
1. Kjører automatiske tester når kode pushes
2. Sjekker for sikkerhetsproblemer med Dependabot
3. Kjører linting for å fange stilfeil
4. Bygger appen automatisk
5. Varsler meg hvis noe feiler

Bruk GitHub Actions og forklar hva hver del gjør
i enkle termer."
```

**Eksempel GitHub Actions workflow:**

```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Run linter
        run: npm run lint
      - name: Build
        run: npm run build
```

**For AI-assistenten:** Ved CI/CD-oppsett:
1. Forklar hver del i enkle termer
2. Start med minimum (tester + lint)
3. Legg til mer gradvis
4. Hjelp med å fikse feilende builds
5. Foreslå forbedringer over tid

### Viktig tilleggsinformasjon
Start enkelt. Én test som kjører automatisk er bedre enn null tester. Du kan alltid legge til mer senere.

**Bonus:** Forskning viser at team som bruker CI/CD har 40% kortere release-sykluser og færre produksjonsfeil.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Valgfritt | Anbefalt | Viktig | Kritisk |

---

# Del E: Funksjonalitet og sikkerhet

---

## 13. Fullføre MVP-funksjoner med sikkerhet

### Hva dette punktet består av
Å implementere alle funksjonene som ble definert som "må ha" i kravspesifikasjonen – ikke bare den enkle versjonen, men full funksjonalitet med sikkerhet innebygd fra starten.

### Hva problemet er
MVP-en fra Fase 4 beviste at konseptet fungerer. Men en prototype er ikke et produkt:
- Prototyper tar snarveier med sikkerhet
- Edge cases håndteres ikke
- Feilhåndtering mangler ofte
- "Happy path" fungerer, men lite annet

### Hva vi oppnår ved å løse det
- Et produkt som faktisk kan brukes av ekte mennesker
- Sikkerhet som er bygget inn, ikke boltet på
- Robust håndtering av alle situasjoner
- Tillit fra brukerne

### Hvordan vi går frem

**For hver funksjon, sikre at:**

- [ ] Kjernelogikken fungerer som forventet
- [ ] Input valideres (hva skjer hvis brukeren skriver noe rart?)
- [ ] Tilgangskontroll er på plass (hvem kan gjøre hva?)
- [ ] Edge cases håndteres (tomme felt, for lange tekster, spesialtegn)
- [ ] Feilmeldinger er brukervennlige (og ikke avslører sensitiv info)
- [ ] Det finnes tester for normale cases og edge cases
- [ ] Sikkerhetskrav fra kravspekken er oppfylt

**Eksempel på systematisk gjennomgang:**

```
Funksjon: Legg til oppgave i oppgaveliste

✅ Kjernefunksjon: Bruker kan skrive oppgave og lagre
✅ Validering: Maks 500 tegn, kan ikke være tom, saniteres for XSS
✅ Tilgang: Bare innlogget bruker kan legge til i egen liste
✅ Edge cases: Hva hvis bruker har 1000 oppgaver allerede?
✅ Feilmelding: "Kunne ikke lagre oppgaven. Prøv igjen."
✅ Sikkerhet: Parameterisert database-spørring
✅ Test: Automatisk test for opprettelse, validering og tilgang
```

**Dialog med AI-assistenten:**

```
"Vi har implementert grunnleggende oppgave-opprettelse.
Nå trenger jeg at du fullføres den med:

VALIDERING:
- Maks 500 tegn
- Ikke tillat tomme oppgaver
- Sanitér input for XSS

SIKKERHET:
- Verifiser at brukeren er logget inn
- Verifiser at brukeren eier listen
- Bruk parameterisert spørring

EDGE CASES:
- Håndter hvis bruker allerede har 1000 oppgaver
- Håndter hvis databasen er treg/nede

FEILHÅNDTERING:
- Brukervennlige feilmeldinger
- Ikke avslør tekniske detaljer

TESTER:
- Test normal opprettelse
- Test med ugyldig input
- Test uten innlogging
- Test for andres lister"
```

**For AI-assistenten:** Ved funksjonsutvikling:
1. Spør om alle sikkerhetskrav er definert
2. Foreslå edge cases som bør håndteres
3. Implementer validering som standard
4. Tilby å skrive tester sammen med koden
5. Påpek hvis noe mangler fra sjekklisten

### Viktig tilleggsinformasjon
Hold deg til MVP-listen. Det er fristende å legge til "bare én ting til", men det er scope creep. Fullført MVP først, utvidelser etterpå.

**Sikkerhetsmotto:** "Sikkerhet er ikke en funksjon – det er en egenskap ved alle funksjoner."

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Viktig | Viktig | Kritisk | Kritisk |

---

## 14. Feilhåndtering (komplett)

### Hva dette punktet består av
At appen håndterer alle måter ting kan gå galt på – ikke bare "happy path", men også nettverksfeil, ugyldige data, timeout, og andre problemer.

### Hva problemet er
Brukere *vil* oppleve feil. Uten god feilhåndtering:
- Appen henger eller krasjer
- Brukere ser "Error: 500" uten forklaring
- Data kan gå tapt
- Brukere mister tillit til produktet

### Hva vi oppnår ved å løse det
- Profesjonelt produkt som håndterer problemer gracefully
- Brukere forstår hva som gikk galt og hva de kan gjøre
- Data bevares selv ved feil
- Enklere feilsøking for deg

### Hvordan vi går frem

**Typer feil som må håndteres:**

| Feiltype | Eksempel | Brukermelding | Teknisk handling |
|----------|----------|---------------|------------------|
| Nettverksfeil | Server svarer ikke | "Kunne ikke koble til. Sjekk internett." | Tilby retry |
| Valideringsfeil | Ugyldig e-post | "Vennligst skriv en gyldig e-postadresse" | Vis ved felt |
| Autorisasjonsfeil | Ikke tilgang | "Du har ikke tilgang til dette innholdet" | Redirect til login |
| Serverfeil | Database nede | "Noe gikk galt. Vi jobber med saken." | Logg detaljer |
| Tredjepartsfeil | Betalingstjeneste nede | "Betalingen kunne ikke fullføres nå" | Fallback/retry |
| Timeout | Treg respons | "Dette tar lenger tid enn vanlig..." | Vis progress, tilby avbryt |

**For hver funksjon, tenk gjennom:**

```
Funksjon: Lagre brukerdata

Hva kan gå galt?
❌ Nettverket er nede
   → Vis feilmelding, bevar data lokalt, tilby retry

❌ Serveren svarer tregt
   → Vis loading, timeout etter 30 sek, tilby retry

❌ Dataene er ugyldige
   → Vis hva som må fikses, marker felt

❌ Brukeren har ikke tilgang
   → Redirect til login, bevar URL for retur

❌ Databasen er full
   → Logg feilen, vis generisk melding, varsle admin

❌ Duplikat data
   → Forklar problemet, foreslå løsning
```

**Feilmeldings-prinsippet:**

```
❌ Dårlig: "Error: 500 Internal Server Error"
❌ Dårlig: "Feil: null pointer exception at line 234"
❌ Dårlig: "Noe gikk galt"

✅ Bra: "Vi kunne ikke lagre endringene dine. Sjekk
       internettforbindelsen og prøv igjen."

✅ Enda bedre: "Vi kunne ikke lagre endringene dine.
              Sjekk internettforbindelsen og prøv igjen.
              [Prøv igjen] [Kontakt support]"
```

**Dialog med AI:**

```
"Gå gjennom lagringsfunksjonen og implementer
feilhåndtering for alle scenarioer:

1. Bruker skal alltid få forståelig melding
2. Bruker skal alltid ha en handling de kan gjøre
3. Logg tekniske detaljer for feilsøking (aldri vis til bruker)
4. Bevar brukerens data hvis mulig
5. Implementer retry-logikk der det gir mening"
```

**For AI-assistenten:** Ved feilhåndtering:
1. Identifiser alle mulige feilscenarioer
2. Skriv brukervennlige meldinger
3. Implementer logging for alle feil
4. Aldri eksponer tekniske detaljer til brukere
5. Tilby alltid en vei videre for brukeren

### Viktig tilleggsinformasjon
Tenk på feilmeldinger som en samtale med brukeren. "Feil: 500" er ikke en samtale. "Vi kunne ikke lagre endringene dine. Prøv igjen om litt." er en samtale.

**Tommelfingerregel:** Hvis brukeren ser feilen og ikke vet hva de skal gjøre, er feilmeldingen for dårlig.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Moderat | Viktig | Kritisk | Kritisk |

---

## 15. Feature flags og kontrollert utrulling

### Hva dette punktet består av
Feature flags (også kalt feature toggles) lar deg skru funksjoner av og på uten å deploye ny kode. Du kan rulle ut nye funksjoner gradvis til en liten gruppe først.

### Hva problemet er
Uten feature flags:
- Nye funksjoner går live for alle samtidig
- Hvis noe er galt, må du rulle tilbake hele deployen
- Ingen mulighet til å teste i produksjon med ekte brukere
- A/B-testing er vanskelig eller umulig

### Hva vi oppnår ved å løse det
- Tryggere lanseringer (test med 5% først)
- Raskt skru av noe som ikke fungerer
- A/B-testing av ulike varianter
- Gradvis utrulling reduserer risiko
- 40% kortere release-syklus (forskning)

### Hvordan vi går frem

**Hvorfor bruke feature flags:**

| Scenario | Uten flags | Med flags |
|----------|------------|-----------|
| Ny funksjon | Går live for alle | Ruller ut til 5%, så 25%, så alle |
| Bug oppdaget | Ruller tilbake deploy | Skrur av flagget (sekunder) |
| A/B-test | Komplisert oppsett | Variant A vs B med ett klikk |
| Beta-testere | Egen versjon | Samme app, flagg aktivert |

**Eksempel på gradvis utrulling:**

```
Dag 1: Ny betalingsløsning → 5% av brukerne
       ✓ Overvåk feil og ytelse

Dag 3: Ingen problemer → 25% av brukerne
       ✓ Sjekk konverteringsrate

Dag 5: Fortsatt bra → 50% av brukerne
       ✓ Sammenlign med gammel løsning

Dag 7: Alt OK → 100% av brukerne
       ✓ Fjern flagget fra koden
```

**Dialog med AI:**

```
"Sett opp feature flags for den nye kommentarfunksjonen.
Jeg vil kunne:
1. Skru den av/på for alle brukere
2. Aktivere den bare for beta-testere først
3. Gradvis rulle ut til flere brukere
4. Ha en fallback til gammel funksjon hvis noe går galt

Bruk [LaunchDarkly/Flagsmith/egen løsning]."
```

**Navnekonvensjon for feature flags:**

| Prefix | Betydning | Levetid | Eksempel |
|--------|-----------|---------|----------|
| `temp_` | Midlertidig, skal fjernes | Dager/uker | `temp_new_checkout` |
| `exp_` | Eksperiment/A-B-test | Uker | `exp_blue_button` |
| `release_` | Gradvis utrulling | Uker | `release_comments_v2` |
| `ops_` | Drifts-toggle | Permanent | `ops_maintenance_mode` |

**Verktøy:**

| Verktøy | Pris | Best for |
|---------|------|----------|
| LaunchDarkly | $$ | Stor skala, enterprise |
| Flagsmith | Gratis/$ | Mellomstore prosjekter |
| Unleash | Gratis | Self-hosted |
| Egen løsning | Gratis | Små prosjekter |

**For AI-assistenten:** Ved feature flags:
1. Foreslå enkel løsning først (kan skaleres senere)
2. Implementer fallback til eksisterende funksjon
3. Legg til logging for flag-bruk
4. Minn om å rydde opp gamle flags
5. Dokumenter hvilke flags som finnes

### Viktig tilleggsinformasjon
Husk å rydde opp gamle feature flags! De blir teknisk gjeld hvis de blir liggende. Lag en rutine for å fjerne flags etter full utrulling.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Valgfritt | Moderat | Viktig | Kritisk |

---

# Del F: Brukeropplevelse

---

## 16. Løpende brukervalidering

### Hva dette punktet består av
Å teste produktet med ekte brukere *underveis* i utviklingen, ikke bare på slutten. Få feedback tidlig og ofte slik at du kan justere kursen.

### Hva problemet er
Uten løpende validering:
- Du bygger noe brukerne ikke vil ha
- Problemer oppdages sent, når de er dyre å fikse
- Du antar at din intuisjon er riktig (den er ofte feil)
- Produktet blir "perfekt" for deg, ikke for brukerne

### Hva vi oppnår ved å løse det
- Bygger det brukerne faktisk trenger
- Fanger misforståelser tidlig
- Reduserer omarbeid dramatisk
- Høyere brukertilfredshet

### Hvordan vi går frem

**Ulike metoder for validering:**

| Metode | Beskrivelse | Når bruke | Innsats |
|--------|-------------|-----------|---------|
| **Uformell demo** | Vis produktet til noen | Etter hver sprint | Lav |
| **Brukertesting** | Observer mens de bruker | Etter større funksjoner | Medium |
| **A/B-testing** | Test to varianter | Når usikker på design | Medium-høy |
| **Beta-testing** | Lengre test med gruppe | Før lansering | Høy |

**Uformell demo (minimum du bør gjøre):**

```
Slik gjør du det:
1. Finn noen i målgruppen (kollega, venn, kunde)
2. Vis dem produktet
3. Be dem utføre hovedoppgaven UTEN hjelp fra deg
4. Observer hvor de stopper opp eller blir forvirret
5. Still åpne spørsmål:
   - "Hva tenker du nå?"
   - "Hva forventet du skulle skje?"
   - "Hva ville du gjort videre?"
6. Skriv ned observasjoner umiddelbart
```

**A/B-testing (for viktige beslutninger):**

```
Når du er usikker på hvilken løsning som fungerer best:

Dialog med AI:
"Vi er usikre på om checkout-knappen bør være grønn
eller blå. Kan du sette opp enkel A/B-testing der
50% ser grønn knapp og 50% ser blå?

Vi trenger å måle:
- Hvor mange som klikker på knappen
- Hvor mange som fullfører kjøpet
- Gjennomsnittlig tid til kjøp"
```

**Hva du ser etter under testing:**

| Observasjon | Betyr ofte |
|-------------|------------|
| Bruker nøler | Uklar instruksjon/design |
| Bruker klikker feil sted | Misleading UI |
| Bruker spør "hva nå?" | Manglende veiledning |
| Bruker sukker | Frustrasjon, for mange steg |
| Bruker sier "ah!" | Noe som overrasket (positivt eller negativt) |

**For AI-assistenten:** Ved brukervalidering:
1. Hjelp med å sette opp A/B-tester
2. Foreslå metrikker å måle
3. Lag enkle analyse-dashboards
4. Hjelp med å tolke resultater
5. Foreslå forbedringer basert på data

### Viktig tilleggsinformasjon
**Viktig innsikt:** Observer hva folk *gjør*, ikke bare hva de *sier*. Folk sier ofte at noe er greit, men handlingene deres avslører forvirring eller frustrasjon.

**Tommelfingerregel:** 5 brukertester avdekker ~85% av brukervennlighetsproblemer.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Moderat | Viktig | Kritisk | Kritisk |

---

## 17. Polert UI/UX

### Hva dette punktet består av
Å forbedre utseende og brukeropplevelse fra "fungerer" til "fungerer og føles bra". Design, farger, spacing, animasjoner og generell polish.

### Hva problemet er
Uten polish:
- Produktet ser amatørmessig ut
- Brukere får mindre tillit til funksjonaliteten
- Inkonsistent design forvirrer
- Dårlig førsteinntrykk kan ødelegge alt

### Hva vi oppnår ved å løse det
- Profesjonelt førsteinntrykk
- Økt tillit fra brukere
- Bedre brukervennlighet
- Høyere konvertering og engasjement

### Hvordan vi går frem

**Sjekkliste for polert UI:**

**Konsistens:**
- [ ] Samme farger brukes konsekvent (primær, sekundær, feil, suksess)
- [ ] Samme fonter og størrelser overalt
- [ ] Samme spacing (margin, padding) mellom elementer
- [ ] Samme knapp-stiler for samme type handlinger

**Responsivitet:**
- [ ] Fungerer på mobil (320px bredde)
- [ ] Fungerer på tablet (768px)
- [ ] Fungerer på desktop (1200px+)
- [ ] Ingen horisontalt scroll der det ikke skal være

**Feedback:**
- [ ] Knapper reagerer på hover (visuell endring)
- [ ] Klikkbare elementer har cursor: pointer
- [ ] Loading-indikatorer der ting tar tid
- [ ] Suksess- og feilmeldinger er tydelige

**Lesbarhet:**
- [ ] Tekst har god kontrast mot bakgrunn
- [ ] Fontstørrelse er stor nok (min 16px for brødtekst)
- [ ] Linjelengde er ikke for lang (maks 70 tegn)
- [ ] Nok whitespace til at ting "puster"

**Dialog med AI:**

```
"Gjør en gjennomgang av UI-en og:
1. Sørg for at alle knapper har samme stil
2. Legg til hover-effekter der det mangler
3. Sjekk at spacing er konsistent (bruk 4/8/16/24/32px)
4. Test at alt fungerer på mobilskjerm
5. Forbedre kontrast der tekst er vanskelig å lese
6. Fjern eventuelle layout-hopp når innhold lastes

Bruk vårt designsystem [Tailwind/Shadcn/etc]."
```

**Bruk designsystem:**

| Verktøy | Type | Best for |
|---------|------|----------|
| Tailwind CSS | Utility-first CSS | All utvikling |
| Shadcn/ui | React-komponenter | React-prosjekter |
| Material UI | React-komponenter | Google-stil |
| Chakra UI | React-komponenter | Fleksibel |

**For AI-assistenten:** Ved UI-polish:
1. Foreslå konsistente designvalg
2. Påpek inkonsistens proaktivt
3. Test responsivitet i ulike størrelser
4. Sjekk kontrast mot WCAG-standarder
5. Optimaliser for ytelse (bildekomprimmering etc.)

### Viktig tilleggsinformasjon
"Polert" betyr ikke "fancy". Enkel og ren er ofte bedre enn komplisert og flashy. Apple er et godt eksempel – enkelheten er poleringen.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Lav | Moderat | Viktig | Kritisk |

---

## 18. Loading og tomme tilstander

### Hva dette punktet består av
Hva brukeren ser mens data lastes, og hva de ser når det ikke finnes data å vise.

### Hva problemet er
Uten tydelige tilstander:
- Bruker vet ikke om appen laster eller har krasjet
- Tom skjerm = forvirring og frustrasjon
- Bruker prøver å klikke flere ganger
- Dårlig opplevelse som reduserer tillit

### Hva vi oppnår ved å løse det
- Bruker vet alltid hva som skjer
- Bedre opplevelse selv ved treg respons
- Redusert frustrasjon og support-henvendelser
- Profesjonelt inntrykk

### Hvordan vi går frem

**Tre tilstander hver skjerm må håndtere:**

| Tilstand | Hva bruker ser | Eksempel |
|----------|----------------|----------|
| **Laster** | Indikator på aktivitet | Spinner, skeleton, progressbar |
| **Tom** | Hjelpsom melding + handling | "Ingen oppgaver ennå. [Opprett din første!]" |
| **Feil** | Forklaring + mulighet for retry | "Kunne ikke laste. [Prøv igjen]" |

**God vs dårlig tom tilstand:**

```
❌ Dårlig: Bare en tom hvit skjerm
❌ Dårlig: "Ingen data"

✅ Bra: "Du har ingen prosjekter ennå"

✅ Enda bedre: "Du har ingen prosjekter ennå.
              Prosjekter hjelper deg organisere oppgavene dine.
              [Opprett ditt første prosjekt]"
```

**Loading-best practices:**

| Ventetid | Anbefalt indikator |
|----------|--------------------|
| < 200ms | Ingen (føles instant) |
| 200ms - 1s | Liten spinner |
| 1s - 3s | Skeleton loading |
| > 3s | Progress bar med tekst |

**Skeleton loading-eksempel:**

```
"Implementer skeleton loading for listen som viser:
- Grå bokser der tekst kommer
- Grå sirkler der bilder kommer
- Subtil pulserende animasjon
- Erstatt med ekte innhold når lastet"
```

**Dialog med AI:**

```
"Gå gjennom alle skjermer som viser data og
sørg for at hver har:
1. En loading-tilstand med skeleton eller spinner
2. En tom tilstand med hjelpsom melding og CTA
3. En feil-tilstand med retry-mulighet

Sørg for at det ikke er noen layout-hopp
når tilstanden endres."
```

**For AI-assistenten:** Ved tilstands-håndtering:
1. Implementer alle tre tilstander for hver dataskjerm
2. Bruk skeleton loading der mulig
3. Skriv hjelpsomme tomme tilstander
4. Inkluder alltid en handling brukeren kan ta
5. Test at layout er stabilt mellom tilstander

### Viktig tilleggsinformasjon
En god tomme tilstand er en markedsføringsmulighet. I stedet for "Ingen data", kan du forklare verdien av å legge til data.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Lav | Moderat | Viktig | Kritisk |

---

## 19. Ytelsesoptimalisering

### Hva dette punktet består av
Å gjøre produktet raskere – kortere lastetider, raskere respons på brukerhandlinger, mer effektiv bruk av ressurser.

### Hva problemet er
Trege apper frustrerer brukere og koster penger:
- 1 sekund forsinkelse = 7% lavere konvertering
- 53% forlater mobilsider som tar >3 sekunder
- Treg app = brukere antar at noe er galt

### Hva vi oppnår ved å løse det
- Bedre brukeropplevelse
- Høyere konvertering
- Bedre SEO (Google prioriterer raske sider)
- Lavere hosting-kostnader

### Hvordan vi går frem

**MÅL FØR DU OPTIMALISERER:**

```
"Kjør Lighthouse-analyse på hovedsidene og
identifiser de 3 største ytelsesproblemene.
For hver, forklar hva problemet er og foreslå løsning."
```

**Vanlige optimaliseringer:**

| Teknikk | Hva det gjør | Når bruke |
|---------|--------------|-----------|
| **Lazy loading** | Laster innhold bare når det trengs | Bilder, komponenter under "folden" |
| **Caching** | Husker data i stedet for å hente på nytt | API-responser, beregninger |
| **Bildekomprimering** | Mindre bilder = raskere lasting | Alle bilder |
| **Code splitting** | Laster bare koden som trengs | Store apps |
| **Database-indeksering** | Raskere oppslag i database | Ofte brukte spørringer |

**Ytelses-budsjett:**

| Metrikk | Mål | Akseptabelt | Kritisk |
|---------|-----|-------------|---------|
| Første innlasting | < 2s | < 4s | > 6s |
| Tid til interaktiv | < 3s | < 5s | > 8s |
| Største bilde | < 200KB | < 500KB | > 1MB |
| Total sidestørrelse | < 1MB | < 3MB | > 5MB |

**Dialog med AI:**

```
"Analyser ytelsen til appen vår:
1. Kjør Lighthouse og rapporter scores
2. Identifiser de 3 største problemene
3. Foreslå konkrete løsninger for hver
4. Prioriter etter impact/effort

Start med det som gir mest forbedring
for minst arbeid."
```

**For AI-assistenten:** Ved ytelsesoptimalisering:
1. Kjør målinger før endringer
2. Fokuser på største forbedringer først
3. Mål igjen etter hver optimalisering
4. Ikke over-optimaliser (diminishing returns)
5. Dokumenter hva som ble gjort og resultatet

### Viktig tilleggsinformasjon
**Viktig:** Ikke optimaliser for tidlig. Mål først, identifiser faktiske flaskehalser, så optimaliser. Prematur optimalisering er roten til alt ondt.

**Tommelfingerregel:** 80% av ytelsesproblemene kommer fra 20% av koden. Finn de 20%.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Lav | Moderat | Viktig | Kritisk |

---

# Del G: Plattform og dokumentasjon

---

## 20. Plattformspesifikke valideringer

### Hva dette punktet består av
Ulike plattformer (iOS, Android, web, Chrome Extension) har ulike krav og retningslinjer som må følges for at appen skal godkjennes og fungere godt.

### Hva problemet er
Uten plattform-validering:
- App Store avviser appen din
- Google Play suspenderer utviklerkontoen
- Chrome Web Store fjerner extension
- Appen ser/oppfører seg feil på plattformen

### Hva vi oppnår ved å løse det
- Godkjent av app stores første gang
- Profesjonell opplevelse på hver plattform
- Færre klager fra brukere
- Følger plattformens konvensjoner

### Hvordan vi går frem

**iOS-apper:**

| Krav | Sjekk | Status |
|------|-------|--------|
| Human Interface Guidelines | Navigasjon, layout, ikoner | [ ] |
| TestFlight | Beta-testing satt opp | [ ] |
| Skjermstørrelser | iPhone SE til Pro Max | [ ] |
| Mørk modus | Støttes | [ ] |
| Private APIer | Ingen brukes | [ ] |
| Tilgjengelighet | VoiceOver fungerer | [ ] |

**Android-apper:**

| Krav | Sjekk | Status |
|------|-------|--------|
| Material Design | Følger retningslinjer | [ ] |
| Android versjoner | Fungerer på 10+ | [ ] |
| Skjermtettheter | ldpi til xxxhdpi | [ ] |
| Tilbake-knapp | Fungerer korrekt | [ ] |
| Permissions | Forklares tydelig | [ ] |

**Chrome Extensions:**

| Krav | Sjekk | Status |
|------|-------|--------|
| Manifest V3 | Brukes (V2 utfaset) | [ ] |
| Permissions | Minimale, forklart | [ ] |
| Incognito | Håndteres hvis relevant | [ ] |
| CSP | Content Security Policy korrekt | [ ] |

**Webapper:**

| Krav | Sjekk | Status |
|------|-------|--------|
| Nettlesere | Chrome, Firefox, Safari, Edge | [ ] |
| Responsivt | Mobil, tablet, desktop | [ ] |
| Tilgjengelighet | Keyboard, skjermleser | [ ] |
| HTTPS | Brukes overalt | [ ] |
| SEO | Meta tags, strukturerte data | [ ] |

**Dialog med AI:**

```
"Vi bygger en iOS-app. Gå gjennom koden og
sjekk at vi følger Apples Human Interface Guidelines.

Spesielt se på:
- Navigasjonsmønstre
- Fargebruk og kontrast
- Håndtering av ulike skjermstørrelser
- Tilgjengelighet for VoiceOver
- Mørk modus-støtte"
```

**For AI-assistenten:** Ved plattform-validering:
1. Kjenn retningslinjene for hver plattform
2. Sjekk kode mot plattform-krav
3. Påpek potensielle problemer proaktivt
4. Foreslå plattform-spesifikke forbedringer
5. Hold deg oppdatert på endringer i retningslinjer

### Viktig tilleggsinformasjon
App Store og Google Play har strenge krav. Én feil kan føre til avvisning og uker med forsinkelse. Test grundig på faktiske enheter, ikke bare simulator.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Varierer | Varierer | Kritisk | Kritisk |

---

## 21. Dokumentasjon underveis (inkl. AI-beslutninger)

### Hva dette punktet består av
Å skrive ned viktige beslutninger, hvordan ting fungerer, og hvordan sette opp prosjektet – underveis, ikke på slutten. Spesielt viktig: dokumenter AI-relaterte beslutninger.

### Hva problemet er
Uten dokumentasjon:
- Om 6 måneder husker ingen hvorfor ting ble gjort slik
- Nye teammedlemmer bruker uker på å forstå prosjektet
- Gjentatte spørsmål om samme ting
- Kan ikke reprodusere vellykkede AI-prompts

### Hva vi oppnår ved å løse det
- Raskere onboarding av nye folk
- Svar på vanlige spørsmål finnes
- Beslutninger kan forsvares og forstås
- Vellykkede AI-mønstre kan gjenbrukes

### Hvordan vi går frem

**Minimum dokumentasjon:**

**1. README.md (hvordan komme i gang):**

```markdown
# Prosjektnavn

## Kort beskrivelse
En setning om hva prosjektet gjør.

## Kom i gang
1. Installer avhengigheter: `npm install`
2. Kopier `.env.example` til `.env` og fyll inn verdier
3. Start utviklingsserver: `npm run dev`

## Viktige kommandoer
- `npm test` - Kjør tester
- `npm run build` - Bygg for produksjon
- `npm run lint` - Sjekk kodestil

## Mappestruktur
/src
  /components - Gjenbrukbare UI-komponenter
  /pages - Side-komponenter
  /services - API-kall
  /utils - Hjelpefunksjoner
```

**2. ADR (Architecture Decision Records):**

```markdown
# ADR-001: Valg av database

## Kontekst
Vi trenger en database for brukerdata og innhold.
Vurderte alternativer: PostgreSQL, MySQL, MongoDB.

## Beslutning
Vi bruker PostgreSQL fordi:
- Sterk ACID-compliance
- God støtte for JSON-data
- Gratis hosting på Supabase

## Konsekvenser
- Trenger hosted database-tjeneste
- Må håndtere migreringer
- Gir oss Supabase Auth "gratis"
```

**3. AI-prompt-logg (NYTT, viktig for vibekoding):**

```markdown
# AI-prompt-logg

## Autentisering (Sprint 2)

### Vellykket prompt for login-funksjon:
Prompt: "Lag en sikker login-funksjon som:
- Bruker bcrypt for passord-verifisering
- Implementer rate limiting (5 forsøk per 15 min)
- Logger alle forsøk med timestamp og IP
- Returnerer generisk feilmelding (ikke avslør om e-post finnes)"

Resultat: Fungerte godt, brukes som mal.

### Mislykket prompt (lærdom):
Prompt: "Lag en login-funksjon"
Problem: Fikk usikker kode uten rate limiting.
Lærdom: Alltid spesifiser sikkerhetskrav.
```

**Dialog med AI:**

```
"Opprett en ADR for beslutningen om å bruke
Stripe for betalinger. Inkluder:
- Kontekst: Hvorfor vi trenger betalingsløsning
- Alternativer vi vurderte (Stripe, PayPal, Vipps)
- Hvorfor vi valgte Stripe
- Konsekvenser av valget"
```

**For AI-assistenten:** Ved dokumentasjon:
1. Foreslå dokumentasjon proaktivt
2. Skriv i klart, enkelt språk
3. Inkluder kodeeksempler der relevant
4. Hold dokumentasjonen oppdatert
5. Logg vellykkede og mislykkede prompts

### Viktig tilleggsinformasjon
Dokumentasjon som skrives underveis tar 10 minutter. Dokumentasjon som skrives i ettertid tar timer (fordi du har glemt detaljene).

**Tommelfingerregel:** Hvis du tenkte "hvorfor gjør vi det slik?" når du tok beslutningen, skriv ned svaret.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Lav | Moderat | Viktig | Kritisk |

---

## 22. Observabilitet og logging

### Hva dette punktet består av
Å kunne se hva som skjer inne i applikasjonen din – hvilke feil oppstår, hvor lang tid ting tar, og hva brukerne faktisk gjør.

### Hva problemet er
Uten observabilitet:
- Feil skjer uten at du vet det
- Ytelsesproblemer er usynlige til brukere klager
- "Det fungerer på min maskin" uten bevis
- Feilsøking er gjetting

### Hva vi oppnår ved å løse det
- Oppdager problemer før brukerne
- Forstår hvordan appen faktisk brukes
- Raskere feilsøking med faktiske data
- Kan bevise at ting fungerer

### Hvordan vi går frem

**Tre søyler for observabilitet:**

| Søyle | Hva det er | Eksempel |
|-------|------------|----------|
| **Logging** | Tekstmeldinger om hendelser | "Bruker 123 logget inn kl 14:32" |
| **Metrikker** | Tall som måler ytelse | "Responstid: 234ms, Feilrate: 0.1%" |
| **Tracing** | Følge en forespørsel gjennom systemet | "Request X tok 2s: 1.5s database, 0.5s API" |

**Minimum logging du trenger:**

| Hva | Hvorfor | Eksempel |
|-----|---------|----------|
| Feil | Feilsøking | Error + stack trace |
| Autentisering | Sikkerhet | Login-forsøk, logouts |
| Viktige handlinger | Audit trail | Opprett, slett, endre |
| Responstider | Ytelse | API-kall varighet |
| Advarsler | Tidlig oppdagelse | Uvanlige mønstre |

**Dialog med AI:**

```
"Sett opp logging som fanger:
1. Alle feil med full feilmelding og stack trace
2. Når brukere logger inn/ut
3. Viktige handlinger (opprett, slett, endre)
4. Responstider for API-kall
5. Advarsler om uvanlig oppførsel

Bruk [Sentry/LogRocket/winston] og forklar oppsettet."
```

**Hva du bør overvåke:**

| Metrikk | Normalt | Advarsel | Kritisk |
|---------|---------|----------|---------|
| Feilrate | < 0.1% | 0.1-1% | > 1% |
| Responstid (p95) | < 500ms | 500ms-2s | > 2s |
| CPU-bruk | < 50% | 50-80% | > 80% |
| Minne-bruk | < 60% | 60-85% | > 85% |

**Verktøy:**

| Verktøy | Type | Pris |
|---------|------|------|
| Sentry | Feil-tracking | Gratis tier |
| LogRocket | Brukeropplevelse | Gratis tier |
| Grafana | Metrikker/dashboard | Gratis |
| Datadog | Alt-i-ett | $$ |

**For AI-assistenten:** Ved logging-oppsett:
1. Foreslå hva som bør logges
2. Implementer strukturert logging
3. Sørg for at sensitiv data ikke logges
4. Sett opp alerting for kritiske feil
5. Forklar hvordan man leser loggene

### Viktig tilleggsinformasjon
"Shift-left observability" betyr å innføre overvåking tidlig, ikke først ved lansering. Da fanger du problemer før de treffer brukerne.

**Advarsel:** Aldri logg sensitiv data som passord, betalingsinformasjon eller personlig identifiserbar informasjon.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Lav | Moderat | Viktig | Kritisk |

---

## 23. Prosjektleder-dashboard og metrikker

### Hva dette punktet består av
En oversikt over hvordan prosjektet ligger an – uten å måtte dykke ned i tekniske detaljer. Nøkkeltall som gir deg kontroll.

### Hva problemet er
Uten dashboard:
- Du vet ikke om prosjektet er på sporet
- Problemer oppdages sent
- Vanskelig å kommunisere status til stakeholders
- Beslutninger tas på magefølelse, ikke data

### Hva vi oppnår ved å løse det
- Oversikt over prosjektets helse
- Tidlig varsel om problemer
- Datadriven beslutningstaking
- Enkel kommunikasjon til stakeholders

### Hvordan vi går frem

**Nøkkelmetrikker for prosjektleder:**

| Metrikk | Hva det måler | Bra | Advarsel |
|---------|---------------|-----|----------|
| **Sprint velocity** | Fullførte oppgaver per sprint | Stabil/økende | Synkende |
| **Bug-rate** | Nye feil per funksjon | Synkende | Økende |
| **Test coverage** | Prosent kode med tester | > 70% | < 50% |
| **Åpne issues** | Uløste problemer | Håndterbart | Voksende |
| **Lead time** | Tid fra idé til produksjon | Kortere | Lengre |
| **DORA-metrikker** | Deploy-frekvens, lead time, MTTR | Se nedenfor | Se nedenfor |

**DORA-metrikker (DevOps Research and Assessment):**

| Metrikk | Elite | Høy | Medium | Lav |
|---------|-------|-----|--------|-----|
| Deploy-frekvens | Flere per dag | Per dag-uke | Per uke-måned | Per måned+ |
| Lead time | < 1 time | 1 dag-1 uke | 1 uke-1 måned | 1-6 måneder |
| MTTR (tid til recovery) | < 1 time | < 1 dag | < 1 uke | 1 uke+ |
| Feilrate | 0-15% | 15-30% | 16-30% | 46-60% |

**Enkelt dashboard i GitHub:**

| Sted | Hva du ser |
|------|-----------|
| Issues | Bugs og oppgaver |
| Projects | Kanban-board for sprint |
| Insights | Commits og aktivitet |
| Actions | CI/CD-status |

**Dialog med AI:**

```
"Sett opp et enkelt dashboard som viser:
1. Antall fullførte vs planlagte oppgaver denne sprinten
2. Antall åpne bugs (kritiske vs normale)
3. Test coverage prosent
4. Siste vellykkede deploy-dato
5. Feilrate siste 24 timer

Bruk [GitHub/Notion/egendefinert] og oppdater automatisk."
```

**For AI-assistenten:** Ved dashboard-oppsett:
1. Start med de viktigste metrikker (5-7 stk)
2. Gjør det enkelt å forstå (visuelle indikatorer)
3. Automatiser datainnhenting der mulig
4. Sett opp varsler for kritiske endringer
5. Forklar hva hver metrikk betyr

### Viktig tilleggsinformasjon
Et godt dashboard svarer på: "Er vi på sporet?" Du skal kunne se på det i 30 sekunder og vite om noe trenger oppmerksomhet.

**Tips:** Start enkelt. Få metrikker som faktisk brukes er bedre enn mange som ignoreres.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Lav | Moderat | Viktig | Kritisk |

---

# Del H: Utvidelser

---

## 24. Sekundære funksjoner

### Hva dette punktet består av
Funksjonene som ble markert som "bør ha" eller "kan ha" i kravspesifikasjonen. Nice-to-have som forbedrer produktet, men ikke er essensielle for MVP.

### Hva problemet er
Uten struktur på sekundære funksjoner:
- Scope creep (legger til for mye)
- Feil prioritering (fancy funksjoner før basics)
- Uendelig "nice to have"-liste
- Ressurser brukes på feil ting

### Hva vi oppnår ved å løse det
- Tydelig prioritering av hva som kommer etter MVP
- Fornuftig ressursbruk
- Brukerfeedback styrer hva som lages
- Produktet vokser kontrollert

### Hvordan vi går frem

**Eksempler på sekundære funksjoner:**
- Sortering og filtrering
- Tema-valg (lys/mørk modus)
- Tastatursnarmveier
- Avanserte innstillinger
- Integrasjoner med andre tjenester
- Eksport til ulike formater

**Prioriteringsmatrise:**

| | Høy impact | Lav impact |
|---|------------|-----------|
| **Lav effort** | ✅ Gjør først | Vurder |
| **Høy effort** | Planlegg | ❌ Vurder å droppe |

**Prioriteringsspørsmål:**
1. Hva spør brukerne mest om?
2. Hva gir mest verdi for minst innsats?
3. Hva støtter hovedfunksjonaliteten?
4. Hva differensierer oss fra konkurrentene?

**Dialog med AI:**

```
"Her er listen over sekundære funksjoner vi vurderer:
[Liste]

For hver, gi et estimat på effort (liten/medium/stor)
og impact (liten/medium/stor). Foreslå prioritering
basert på dette."
```

**For AI-assistenten:** Ved sekundære funksjoner:
1. Minn om at MVP bør fullføres først
2. Hjelp med å estimere effort
3. Foreslå enkle varianter av komplekse funksjoner
4. Påpek hvis noe vil skape mye vedlikeholdskostnad
5. Foreslå å vente på brukerdata før prioritering

### Viktig tilleggsinformasjon
Hver funksjon har vedlikeholdskostnad. Det er ikke bare "tid til å bygge" – det er også "tid til å vedlikeholde i all evighet". Vær selektiv.

**Tommelfingerregel:** Hvis du ikke har brukerdata som støtter funksjonen, vent.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Lav | Moderat | Varierer | Varierer |

---

## 25. Eksport/import

### Hva dette punktet består av
Muligheten for brukere å få ut sine data (eksport) eller hente inn data fra andre kilder (import).

### Hva problemet er
Uten eksport/import:
- Brukere føler seg "låst inne"
- GDPR-krav kan ikke oppfylles
- Vanskelig å bytte fra/til andre systemer
- Redusert tillit fra brukere

### Hva vi oppnår ved å løse det
- GDPR-compliance (data portability)
- Brukere føler seg trygge
- Enklere onboarding (importer fra annet system)
- Konkurransefortrinn (vi holder ikke data som gissel)

### Hvordan vi går frem

**Vanlige formater:**

| Format | Best for | Kompleksitet |
|--------|----------|--------------|
| CSV | Enkle tabeller, Excel-import | Lav |
| JSON | Tekniske brukere, full data | Lav |
| PDF | Rapporter, print | Medium |
| XML | Legacy-systemer | Medium |

**GDPR-krav for eksport:**
- Bruker skal kunne eksportere alle sine data
- Format skal være maskinlesbart (JSON, CSV)
- Eksport skal være gratis
- Skal leveres innen 30 dager (helst umiddelbart)

**Dialog med AI:**

```
"Implementer eksport-funksjonalitet som:
1. Eksporterer alle brukerens data til JSON
2. Inkluderer metadata (opprettet, endret)
3. Ekskluderer passord og interne ID-er
4. Genererer nedlastbar fil
5. Logger at eksport ble gjort (for audit)"
```

**Import-sikkerhet (VIKTIG):**

| Risiko | Tiltak |
|--------|--------|
| Ondsinnet data | Valider alt grundig |
| Overskriving | Be om bekreftelse |
| Store filer | Sett størrelsesbegrensning |
| Feil format | Gi tydelig feilmelding |

**For AI-assistenten:** Ved eksport/import:
1. Valider all importert data grundig
2. Inkluder tydelig status/progress
3. Håndter feil gracefully
4. Logg alle eksport/import-handlinger
5. Sørg for at personlig data er med i eksport (GDPR)

### Viktig tilleggsinformasjon
Import er en sikkerhetsrisiko – du tar inn data fra ukjent kilde. Valider alt grundig, og vær forsiktig med hva du tillater.

**Viktighet per prosjektkategori:**

| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Lav | Moderat | Viktig (GDPR) | Kritisk |

---

# Del I: Avslutning

---

## 26. Leveranse fra Fase 5

### Hva dette punktet består av
En konkret liste over hva som skal være på plass når Fase 5 er fullført. Dette er "exit criteria" – du går ikke videre til Fase 6 før dette er sjekket av.

### Hva problemet er
Uten klare leveransekrav:
- Uklart når fasen er "ferdig"
- Ting glemmes
- Kvalitet varierer
- Vanskelig å kommunisere status

### Hva vi oppnår ved å løse det
- Klar definisjon av "ferdig"
- Ingenting viktig glemmes
- Konsistent kvalitet
- Tydelig milestone for alle involverte

### Leveransesjekkliste

**Feature-komplett applikasjon:**

| Krav | Sjekket |
|------|---------|
| Alle MVP-funksjoner implementert og testet | [ ] |
| Sikkerhet innebygd i alle funksjoner | [ ] |
| Komplett feilhåndtering | [ ] |
| Polert brukergrensesnitt | [ ] |
| Gode loading/tomme tilstander | [ ] |
| Responsivt design (mobil + desktop) | [ ] |

**Kvalitetssikring:**

| Krav | Sjekket |
|------|---------|
| Code review gjennomført på all kode | [ ] |
| AI-hallusinasjoner sjekket og verifisert | [ ] |
| SAST-verktøy kjører i CI/CD-pipeline | [ ] |
| Bruker-feedback innhentet og adressert | [ ] |
| Teknisk gjeld dokumentert og under kontroll | [ ] |
| Arkitektur er konsistent | [ ] |

**Infrastruktur:**

| Krav | Sjekket |
|------|---------|
| CI/CD-pipeline satt opp og fungerer | [ ] |
| Feature flags på plass (hvis relevant) | [ ] |
| Logging og observabilitet implementert | [ ] |
| Dokumentasjon oppdatert | [ ] |
| AI-prompt-logg dokumentert | [ ] |

**Testdekning:**

| Krav | Sjekket |
|------|---------|
| Tester for all kritisk funksjonalitet | [ ] |
| Tester for sikkerhetskritiske deler | [ ] |
| Automatiske tester kjører ved hver endring | [ ] |
| Test coverage > 70% for kritisk kode | [ ] |

**Versjonskontroll:**

| Krav | Sjekket |
|------|---------|
| Alle endringer committet | [ ] |
| Commit-historikk er ryddig og forståelig | [ ] |
| Ingen ucommitted endringer | [ ] |
| Branches er ryddet opp | [ ] |

**Prosjektleder-signoff:**

| Krav | Sjekket |
|------|---------|
| Jeg forstår hva som er bygget | [ ] |
| Jeg har sett produktet i aksjon | [ ] |
| Dokumentasjonen er forståelig | [ ] |
| Risikofaktorer er dokumentert | [ ] |
| Klar for Fase 6 | [ ] |

---

## Neste steg

Klar for **Fase 6: Test, sikkerhet og kvalitetssjekk**

I Fase 6 gjør du grundig testing, sikkerhetsgjennomgang og kvalitetssikring før lansering. Alt som ble bygget i Fase 5 skal nå stress-testes, sikkerhetssjekkes, og klargjøres for ekte brukere.

---

## Ordliste

| Begrep | Forklaring |
|--------|------------|
| **A/B-testing** | Teste to varianter for å se hvilken fungerer best |
| **ADR** | Architecture Decision Record – dokumentasjon av viktige beslutninger |
| **CI/CD** | Continuous Integration/Continuous Deployment – automatisk testing og utrulling |
| **Edge case** | Uvanlig eller ekstrem situasjon som må håndteres |
| **Feature flag** | Brytere som lar deg skru funksjoner av/på |
| **Hallusinasjon** | Når AI genererer oppdiktet eller feil informasjon |
| **MVP** | Minimum Viable Product – enkleste versjon som gir verdi |
| **Prompt** | Instruksjonen du gir til AI-assistenten |
| **Refaktorering** | Forbedre kode uten å endre funksjonalitet |
| **SAST** | Static Application Security Testing – automatisk sikkerhetsskanning |
| **Scope creep** | Når prosjektet vokser utover opprinnelig plan |
| **Sprint** | Kort utviklingssyklus (vanligvis 1-2 uker) |
| **TDD** | Test-Driven Development – skriv tester først, så kode |
| **Teknisk gjeld** | Snarveier i kode som må "betales tilbake" senere |

---

## 📚 Relaterte filer

### Fase 5-dokumenter:
- **[FASE-5-AI.md](Fase/FASE-5-AI.md)** - AI-instruksjoner for Fase 5
- **[READ-FASE-5-GUIDE.md](Fase/READ-FASE-5-GUIDE.md)** - Prosjektleder-guide for Fase 5

### Fase-navigering:
- **Forrige fase:** [Fase 4: MVP](../Fase%204%20-%20MVP/FASE-4-KOMPLETT.md)
- **Neste fase:** [Fase 6: Test, sikkerhet og kvalitetssjekk](../Fase%206%20-%20Test%20og%20kvalitetssjekk/FASE-6-KOMPLETT.md)

### Relevante agenter:
- **[ITERASJONS-agent](../Agenter/agenter/prosess/5-ITERASJONS-agent.md)** - Hovedansvarlig for Fase 5: Bygg funksjonene
- **[BYGGER-agent](../Agenter/agenter/basis/BYGGER-agent.md)** - Implementerer features
- **[REVIEWER-agent](../Agenter/agenter/basis/REVIEWER-agent.md)** - Code review

### Systemdokumenter:
- **[READ-KIT-CC-BRUKERHÅNDBOK.md](../../READ-KIT-CC-BRUKERHÅNDBOK.md)** - Komplett guide til Kit CC

---

*Dette dokumentet er versjon 2.0 av Fase 5, oppdatert med beste praksis for AI-assistert utvikling per januar 2026.*
