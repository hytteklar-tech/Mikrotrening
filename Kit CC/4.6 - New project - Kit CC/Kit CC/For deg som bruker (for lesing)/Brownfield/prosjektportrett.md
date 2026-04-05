# Prosjektportrett

> Komplett dokumentasjon av en eksisterende kodebase, generert av 25-agents-svermen — ditt "røntgenbilde" av hele prosjektet.

## Hva gjør den?

Et prosjektportrett er et samlet dokument (`.ai/BROWNFIELD-DISCOVERY.md`) som beskriver **ALT** som Kit CC trenger å vite om en eksisterende kodebase. Det er ikke bare en liste over filer — det er en dypgående analyse av hvordan koden faktisk fungerer, hvordan den er organisert, hvilke konvensjoner den følger, og hvilke problemer den har.

Portrettet inneholder typisk disse seksjoner:

1. **Prosjektsammendrag** — Navn, type (web app, API, library, etc.), hovedformål
2. **Teknisk stack** — Hvilke språk, rammeverk, biblioteker, verktøy brukes
3. **Arkitekturmønster** — Monorepo? Microservices? MVC? MVVM?
4. **Forretningslogikk** — Hva gjør appen? Hvilke hovedfunksjoner?
5. **Dataflyt** — Hvordan flyter data gjennom systemet? API-er, databasespørringer?
6. **Brukerflyt** — Hva gjør brukeren? Hvilke hovedstier gjennom appen?
7. **API-dokumentasjon** — Hvilke endpoints finnes? Hva gjør de?
8. **Sikkerhet** — Authentication, authorization, validering, encryption
9. **Testtilstand** — Unit tests? Integration tests? Coverage?
10. **Kodekvalitet** — Kompleksitet, maintainability, teknisk gjeld
11. **Avhengigheter** — Eksterne biblioteker, versjonsnummer, sikkerhetsvulnerabiliteter
12. **Git-historikk** — Hvor mange commits? Commits per måned? Aktive utviklere?
13. **Dokumentasjon** — Finnes det README? API-docs? Architecture docs?
14. **Ytelse** — Lastetider? Database-spørringer? Flaskehalser?
15. **Konvensjoner Kit CC MÅ følge** — Navnekonvensjoner, struktur, stil
16. **Anbefalt startfase** — Hvor i Kit CCs prosess bør arbeidet starte?

## Hvorfor er det nyttig?

Når Kit CC skal bygge videre på eksisterende kode, trenger det å vite:

- **Hva som allerede finnes** — For ikke å skrive det på nytt
- **Hvordan det er gjort** — For å følge samme mønster
- **Hvor problemene er** — For å fikse dem mens det bygges
- **Hva som fungerer godt** — For å bevare det som ikke er ødelagt

Uten portrettet ville Kit CC gjette basert på filstruktur og navn. Med portrettet har systemet et fullstendig kart over terrenget — og kan navigere trygt.

**Eksempel:** Hvis Kit CC skulle bygge en ny API-endpoint uten å lese portrettet, kunne det skje sånt:
- Sikkerhetsproblem: Glemme JWT-validering (fordi systemet ikke visste at appen bruker JWT)
- Stilproblem: Bruke camelCase når hele appen bruker snake_case
- Arkitekturproblem: Legge logikken direkte i routeren i stedet for i servicelag

Med portrettet vet Kit CC: "Ah, denne appen bruker JWT-auth, snake_case, og har et godt servicelag. Jeg gjør det samme."

## Hvordan fungerer det?

Portrettet genereres i fase 4 av 25-agents-svermen:

```
[FASE 2 & 3: 23 agenter produserer rådata]
├─ Agent 1-5: Strukturanalyse, tech stack, arkitektur, database, API
├─ Agent 6-14: Frontend, brukerflyt, dataflyt, tester, sikkerhet
├─ Agent 15-23: Feilhåndtering, avhengigheter, CI/CD, kodestil, og mer
└─ Meta-agenter: Kryssreferanse og verifikasjon

        ↓
[FASE 4: Syntese & redigering]
├─ Koordinator leser alle 23 rapporter
├─ Kombinerer informasjonen tematisk
├─ Fjerner duplikater, fikser uenigheter
├─ Skriver lesbart prosa (ikke bare punkt-lister)
└─ Lagrer som BROWNFIELD-DISCOVERY.md (typisk 30-60 KB)

        ↓
RESULTAT: Komplett portrett klart
```

Portrettet lagres som Markdown for lesbarhet, men inneholder også strukturert data (JSON-blokker) slik at Kit CC raskt kan hente spesifikk informasjon når det bygger.

## Eksempel

Her er et forkortet eksempel på hvordan et portrett kan se ut:

```markdown
# Prosjektportrett: MyApp

## Sammendrag
MyApp er en e-handelsplattform bygget som Vue 3 + Node.js monorepo.
Launched 2022, 5 aktive utviklere, 480 commits.

## Teknisk stack
- **Frontend:** Vue 3, Vuex, Vue Router, Axios, Tailwind CSS
- **Backend:** Node.js 18, Express 4.18, PostgreSQL 14
- **Deployment:** Docker, GitHub Actions, AWS ECS
- **Testing:** Jest (80% coverage)

## Arkitektur
Monorepo med to separate apps:
- `/client`: Vue 3 SPA (47 komponenter)
- `/server`: Express API (30 endpoints)
- `/migrations`: Database migrations

## Dataflyt
1. Bruker interagerer med Vue app
2. App sender REST API-kall til `/server`
3. Server validerer JWT-token
4. Server kjører database-spørringer
5. Svar returneres til klient

## Sikkerhet ⚠️
✅ JWT-basert autentisering
✅ HTTPS-only cookies
✅ CORS properly configured
❌ POST /api/users mangler autentisering-sjekk
❌ Ingen rate limiting

## Konvensjoner Kit CC MÅ følge
- Kode: snake_case for variabler, PascalCase for klasser
- API: /api/v1/resource-name (kebab-case)
- Komponenter: Lagret i /client/src/components/[Feature]/[Component].vue
- Tester: Samme path som source, med .test.js suffix

## Anbefalt startfase
**Fase 3 (Arkitektur og sikkerhet)**
Årsak: Sikkerhetsproblemene bør fikses før mer funksjonalitet bygges.
Foreslatt rekkefølge:
1. Legg til autentisering på POST /api/users
2. Implementer rate limiting
3. Refaktorer den store utils-filen (2000+ linjer)
```

Når Kit CC leser dette portrettet, vet det nøyaktig hva det skal gjøre — og hvordan det skal gjøre det på en måte som passer med det som allerede finnes.

## Relaterte features
- **25-agents-sverm** — Generer portrettet
- **brownfield-deteksjon** — Trigger portretter når relevant

---
*Definert i: Kit CC/Agenter/agenter/system/agent-BROWNFIELD-SCANNER.md (FASE 4)*
*Lagt til: 2026-02-17*
*Kategori: Brownfield*
