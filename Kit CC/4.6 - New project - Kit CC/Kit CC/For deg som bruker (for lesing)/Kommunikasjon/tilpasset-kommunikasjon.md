# Tilpasset kommunikasjon

> All brukervendt tekst tilpasses automatisk basert på brukernivå: statusmeldinger, feilmeldinger, forslag og veikart skrives i riktig stil.

## Hva gjør den?

Tilpasset kommunikasjon betyr at Kit CC ikke har én "standard måte" å snakke på. Hver melding sjekker `classification.userLevel` fra PROJECT-STATE.json og formaterer teksten deretter.

Eksempler på tekst som tilpasses:

- **Statusmeldinger** — "Fase 2 er ferdig" blir forklart anderledes avhengig av nivå
- **Feilmeldinger** — "npm ERR!" blir presentert som teknisk detalj (Utvikler) eller problem-løsning (Ny vibecoder)
- **Forslag til neste steg** — "Implementer autentisering" får både praktisk veiledning og teknisk detalj
- **Veikart** — De 7 fasene presenteres som detaljert plan (Utvikler) eller oversikt med analogier (Ny vibecoder)
- **Teknisk konsept-forklaringer** — Samme konsept får ulike forklaringer basert på nivå
- **Lenkemateriale** — "Se dokumentasjon" linkes direktt (Utvikler) eller med introduksjonstekst (Ny vibecoder)

## Hvorfor er det nyttig?

- **Effektiv kommunikasjon** — Hver bruker får akkurat det de trenger, ikke mer og ikke mindre
- **Mindre "noise"** — Erfarne brukere unngår lange forklaringer; nybegynnere unngår kryptisk sjargong
- **Konsistent opplevelse** — System snakker samme "dialekt" gjennom hele prosessen
- **Tillit** — Brukeren føler at systemet forstår deres nivå og respekterer deres tid

## Hvordan fungerer det?

**Algoritme (hver melding sjekker):**

1. Les `classification.userLevel` fra PROJECT-STATE.json
2. Les "brukernivå-variant" av meldingen fra agentens template
3. Bytt ut sjargong/detalj basert på nivå
4. Vis melding til bruker

**Eksempel: Meldings-template i fase-agent**

```markdown
# Status melding

## UTVIKLER
Database-migrering #3 fullført.
Schema: users (ADDED: email_verified, last_login)
Migration time: 240ms
Run `npm run migrate:status` for detaljer.

## ERFAREN_VIBECODER
Database-migrering #3 fullført.
Vi lade til to nye felt i users-tabellen: email_verified og last_login.
Migreringen tok 240 millisekunder.

## NY_VIBECODER
Databasen ble oppdatert!
Vi lade til et felt som husker om e-posten din er verifisert, og et felt som husker når du sist var pålogget.
Alt gikk fort (under et sekund).
```

**Sjargong-erstatninger (eksempler):**

| Konsept | Utvikler | Erfaren vibecoder | Ny vibecoder |
|---------|----------|-------------------|--------------|
| REST API | RESTful endpoints | Kommunikasjonsspråk | Måten serveren snakker med nettleseren |
| State management | Redux/Context/Zustand | Plass å huske data | Hvor appen husker ting |
| Database migration | Schema version [N] | Oppdatering av tabeller | Endring av hvordan data lagres |
| Deployment | CI/CD pipeline | Automatisk publisering | Setter programmet på internett |
| CORS error | CORS policy: no 'Access-Control-Allow-Origin' | Nettleseren blokkerte forespørsel | Sikkerhetskontroll på serveren |
| TypeScript | Type-safe | Feil oppdages før kjøring | Systemet sjekker at du bruker data riktig |
| async/await | Promise-based control flow | Venter på svar fra server | Systemet venter før det gjør neste ting |

**Eksempel: Feilmelding-tilpasning**

### Utvikler
```
❌ ENOENT: no such file or directory, open '/app/src/config.json'
   at Object.openSync (fs.js:476:3)
   at readFileSync (fs.js:375:41)
   at loadConfig (src/config.loader.ts:12:15)

Fix: Create src/config.json with required env vars, or set NODE_ENV=production
```

### Erfaren vibecoder
```
❌ config.json-filen finnes ikke

Problem: Programmet prøver å lese en config-fil som mangler.

Løsning: Lag filen src/config.json med de nødvendige innstillingene.
Eller: Sett NODE_ENV=production hvis du vil bruke miljøvariabler i stedet.
```

### Ny vibecoder
```
❌ Filen som programmet trenger finnes ikke

Problemet er at programmet leter etter en instruksjonsfil som ikke er der.

Du kan fikse det på to måter:

1. Lag filen selv: Jeg kan lage den for deg
2. Bruk miljøvariabler: Jeg sier til systemet å bruke innstillingene fra miljøet i stedet

Hva vil du gjøre?
```

**Eksempel: Veikart-presentasjon**

### Utvikler
```
Prosjekt-roadmap (VANLIG APP-PROSJEKT):

Fase 1 (Idé) — 2h
├─ Scope definisjoner
├─ Arkitektur-skisse (monolith vs. microservices)
└─ Tech-stack evaluering

Fase 2 (Planlegg) — 8h
├─ Feature specification (user stories)
├─ Database schema design
├─ API contract definition
├─ Security threat model

[... fullstendig detalj ...]
```

### Erfaren vibecoder
```
Her er veikarten for prosjektet ditt (4-6 uker):

Fase 1: Planlegging (uke 1)
Hva skal vi bygge? Hvilke teknologier? Tegn opp arkitekturen.

Fase 2: Fundament (uke 1-2)
Databasen og APIet. Sikkerhet.

Fase 3: MVP (uke 2-3)
Første fungerende versjon. Innlogging og første funksjon.

[... balansert detalj ...]
```

### Ny vibecoder
```
Her er veikarten for prosjektet ditt:

Uke 1: Planlegging
Vi snakker om idéen din og tegner opp hva systemet skal gjøre.

Uke 2: Grunnmur
Vi setter opp databasen (hvor dataene lagres) og grunnlaget for appen.

Uke 3-4: Første versjon som fungerer
Du får innlogging og den første funksjonen til å fungere.

[... forenklet, med analogier ...]
```

## Eksempel

**Bruker starter prosjekt som "Ny vibecoder":**

1. System mottar alle instruksjoner fra AUTO-CLASSIFIER
2. AUTO-CLASSIFIER returnerer klassifisering i "enkel språk"
3. Fase-agenten sjekker `classification.userLevel = "ny-vibecoder"`
4. Alle meldinger formateres enkelt (ingen sjargong, forklaringer, analogier)
5. Feil løses med veiledning, ikke dump av stack traces

**Etter 4 uker sier bruker "Bytt til Erfaren vibecoder":**

1. PROJECT-STATE.json oppdateres: `userLevel = "erfaren-vibecoder"`
2. Alle nye meldinger formateres balansert
3. Teknisk detalj inkluderes, men som supplering ikke hovedfokus
4. System antar litt faglig innsikt (bruker vet hva "database" er)

**Bruker lærer raskt og sier "Bytt til Utvikler" etter 2 måneder:**

1. PROJECT-STATE.json oppdateres: `userLevel = "utvikler"`
2. System snakker nå fullt ut teknisk språk
3. Feil vises som stack traces
4. Dokumentasjons-links går rett til referanse, ikke tutorials

## Relaterte features

- `tre-brukernivaaer.md` — De 3 nivåene som defineres
- `brukerkommandoer.md` — "Bytt til [nivå]" kommando
- protocol-SYSTEM-COMMUNICATION.md (Lag 2) — Fullstendig template-library

---
*Definert i: protocol-SYSTEM-COMMUNICATION.md, alle fase-agent-filer*
*Lagt til: 2026-02-17*
*Kategori: Kommunikasjon*
