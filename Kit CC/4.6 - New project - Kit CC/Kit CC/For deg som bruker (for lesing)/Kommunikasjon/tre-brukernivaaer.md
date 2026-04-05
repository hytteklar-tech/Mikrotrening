# Tre brukernivåer

> Kit CC tilpasser kommunikasjonen automatisk til 3 brukernivåer: Utvikler (teknisk), Erfaren vibecoder (balansert), Ny vibecoder (enkelt).

## Hva gjør den?

Ikke alle brukere av Kit CC snakker samme "språk". En erfaren utvikler vil være irritert over å få forklaringer på enkle konsepter. En nybegynner vil være forvirret av teknisk sjargong. Tre brukernivåer løser dette ved å tilpasse alle meldinger, feilmeldinger og forklaringer til brukerens nivå.

De 3 nivåene er:

1. **Utvikler** — Teknisk språk, kodedetaljer, antagelse om faglig innsikt
2. **Erfaren vibecoder** — Balansert, forklarer viktige konsepter, noe faglig innsikt
3. **Ny vibecoder** — Enkelt språk, ingen teknisk sjargong, bruker analogier

## Hvorfor er det nyttig?

- **Raske iterasjoner** — Erfarne brukere få direkte instruksjoner uten filleord
- **Inkluderende** — Nybegynnere får opplysende forklaringer i språk de forstår
- **Redusert frustrasjon** — "Hvorfor forklarer AI meg REST-API når jeg vet det allerede?"
- **Bedre læring** — Nybegynnere får gradvis intro til konsepter, ikke dump av informasjon
- **Fleksibel** — Bruker kan bytte nivå når som helst ("Bytt til Utvikler")

## Hvordan fungerer det?

**Nivåene er lagret i PROJECT-STATE.json:**

```json
"classification": {
  "userLevel": "erfaren-vibecoder"  // Standardvalg
}
```

**Valg av nivå:**

- **Ved oppstart** — System spør: "Hva er ditt nivå? (1) Utvikler (2) Erfaren vibecoder (3) Ny vibecoder"
- **Senere bytte** — Bruker sier "Bytt til [nivå]" og systemet oppdaterer klassifiseringen

**Eksempler på tilpassning:**

### Scenario: Feil ved npm install

**UTVIKLER:**
```
❌ npm ERR! code EACCES
npm ERR! syscall open
npm ERR! path /usr/local/lib/node_modules/package/package.json
npm ERR! errno -13
npm ERR! Error: EACCES: permission denied

Fix: sudo chown -R $(whoami) /usr/local/lib/node_modules
Eller: bruk nvm (https://github.com/nvm-sh/nvm)
```

**ERFAREN VIBECODER:**
```
❌ npm install feilet — Ingen tilgang til system-biblioteker

Problem: npm prøver å installere i /usr/local/lib som krever admin-rettigheter

Løsning (enklest):
1. Installer nvm: https://github.com/nvm-sh/nvm
2. Start ny terminal
3. Kjør npm install på nytt

Eller hvis du vet hva du gjør: sudo chown -R $(whoami) /usr/local/lib/node_modules
```

**NY VIBECODER:**
```
❌ npm install feilet — Kan ikke installere pakker

Enkelt sagt: npm sin "pakkelager" ligger på et sted på datoren som vi ikke har tilgang til.

Løsning — Installer "Node Version Manager" (nvm). Det er et lite verktøy som håndterer dette for deg:
1. Kopier denne kommandoen i terminalen din:
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

2. Lukk terminalen og åpne den på nytt

3. Kjør npm install på nytt — nå skal det fungere!

Hvis det fortsatt feiler, la meg vite.
```

### Scenario: Forklar REST API

**UTVIKLER:**
```
RESTful endpoints for resources:
- GET /api/users/:id — Fetch user resource
- POST /api/users — Create resource
- PUT /api/users/:id — Replace resource
- PATCH /api/users/:id — Partial update
- DELETE /api/users/:id — Delete resource

Use HTTP status codes: 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found), 500 (Server Error)
```

**ERFAREN VIBECODER:**
```
REST API bruker standard HTTP-metoder for å håndtere data:

GET /api/users/123    → "Hent bruker nummer 123"
POST /api/users       → "Lag en ny bruker"
PUT /api/users/123    → "Erstatt bruker 123 helt"
PATCH /api/users/123  → "Oppdater noe på bruker 123"
DELETE /api/users/123 → "Slett bruker 123"

Systemet returnerer status-koder som sier om det gikk bra:
- 200 = Fungerte
- 404 = Fant ikke (brukeren finnes ikke)
- 500 = Noe på serveren gikk galt
```

**NY VIBECODER:**
```
REST API er sånn serveren din snakker med klientene (nettleseren, mobilappen, osv.)

Tenk på det som en restaurant:
- GET = "Kan jeg få menyen?" (hent informasjon)
- POST = "Jeg bestiller det" (lag noe nytt)
- PUT = "Jeg endrer hele bestillingen" (endre hele tingsen)
- PATCH = "Kan jeg bytte ut salattypen?" (endre litt)
- DELETE = "Jeg vil ikke ha denne retten" (fjern noe)

Serveren sier deretter: "OK" (200) eller "Vi har ikke det" (404) eller "Noe gikk galt" (500).

Du trenger ikke forstå alt nå — vi viser deg steg for steg.
```

### Scenario: Feil i koden

**UTVIKLER:**
```
❌ TypeError: Cannot read property 'map' of undefined
   at getUsersList (src/api/users.ts:42)

Issue: `users` is undefined. Check your database query return value.
Add type safety: const users: User[] = await db.getUsers() ?? []
```

**ERFAREN VIBECODER:**
```
❌ TypeError: Cannot read property 'map' of undefined (linje 42 i src/api/users.ts)

Problem: Variabelen `users` er tom/null når koden prøver å bruke `.map()` på den.

Løsning: Sjekk at database-spørringen returnerer faktiske data. Du kan også legge til en "sikker fallback":
users = users || []  // Hvis users er tom, bruk tom liste
```

**NY VIBECODER:**
```
❌ En feil i koden din på linje 42

En variabel kalt `users` er tom (tomt), og koden prøver å løpe gjennom den som om den hadde data.

Enkelt sagt: Det er som å si "for hver person i rommet, gi dem kaffe", men rommet er tomt!

Løsning: Sjekk at dataene dine faktisk kommer fra databasen før du bruker dem. Vi kan legge til en sjekk:
```
if (users && users.length > 0) {
  // Nå vet vi at det finnes data
}
```

Hvis du bruker en mer moderne måte: users = users || []

Skal jeg fikse det for deg?
```

## Eksempel

**Bruker velger "Ny vibecoder" ved oppstart:**

Alle meldinger fra Kit CC formateres på enkel nivå:
- "REST API" → "Kommunikasjonsspråk mellom nettleseren og serveren"
- "Relasjonell database" → "Tabell-basert oppbevaring (som Excel-ark)"
- "Deployment" → "Publisering på internett"
- Feil får hele kontekst og løsninger, ikke bare kodenavn

**Bruker sier "Bytt til Utvikler" etter 2 uker:**

`classification.userLevel` oppdateres til "utvikler" i PROJECT-STATE.json

Neste melding fra systemet:
- Forklaring blir teknisk
- Feilmeldinger viser full stack trace
- Agenter antar faglig innsikt

**Bruker sier "Bytt til Erfaren vibecoder" senere:**

Melding-stil blir balansert — teknisk nok til å være effektiv, men med enkle forklaringer på nye konsepter.

## Relaterte features

- `tilpasset-kommunikasjon.md` — Hvordan all tekst tilpasses (statusmeldinger, feilmeldinger, osv.)
- `brukerkommandoer.md` — "Bytt til [nivå]" kommando
- protocol-SYSTEM-COMMUNICATION.md (Lag 2) — Fullstendig dokumentasjon av nivåer

---
*Definert i: protocol-SYSTEM-COMMUNICATION.md, PROJECT-STATE.json (classification.userLevel)*
*Lagt til: 2026-02-17*
*Kategori: Kommunikasjon*
