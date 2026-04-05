# Trusselmodellering

> Trusselmodellerings-ekspert-agenten kartlegger angripere, angrepsflater, og potensielle sårbarheter ved hjelp av STRIDE-metodikken for å prioritere sikkerhetstiltak.

## Hva gjør den?

Trusselmodellering er en systematisk tilnærming til å identifisere og vurdere sikkerhetsrisikoer i systemet. En dedikert ekspert-agent kartlegger:

1. **Hvem er angripere?** (Trusselaktører)
   - Hackere (random, profit-motiverte)
   - Konkurrenter (se på forretningshemmeligheter)
   - Utilfredse ansatte eller brukere (hevn)
   - Nasjonale aktører (statlig sponsede angrep)

2. **Hvor kan de angripe?** (Angrepsflater)
   - Webgrensesnitt (browser)
   - API-grensesnitt (tredjeparter, mobile)
   - Database (direkte eller via SQL-injection)
   - Infrastruktur (servere, nettverk)
   - Mennesker (phishing, sosial ingeniørkunst)

3. **Hva kan gå galt?** (Trusler)
   - Spoofing av identitet (falsk innlogging)
   - Tampering med data (endre ordre, priser)
   - Repudiation (bruker benekter)
   - Information Disclosure (datalek)
   - Denial of Service (systemet krasjer)
   - Elevation of Privilege (bruker blir admin)

4. **Hvordan prioriterer vi?** (Risikomatrise)
   - Sannsynlighet × Påvirkning = Risiko
   - Kritisk: Høy sannsynlighet + stor påvirkning → Fikses først
   - Høy: Høy sannsynlighet eller stor påvirkning
   - Medium: Lavere kombinasjon
   - Lav: Begge faktorer lave

## Hvorfor er det nyttig?

De fleste sikkerhetstiltak er "ting som kunne skje" — men det er uendelig mange mulige trusler. Trusselmodellering prioriterer:

- **Ressurstildelning:** Fokuserer på de mest sannsynlige og alvorlige truslene
- **Transparency:** Team forstår hvilke risiko de aksepterer
- **Dokumentasjon:** Sikkerhetsbeslutninger er dokumentert og kan forsvares
- **Iterativ forbedring:** Etter å ha implementert tiltak, revurderes trusselbildet

## Hvordan fungerer det?

Trusselmodellerings-ekspert-agenten bruker **STRIDE-metodikken**:

1. **Planlegg systemet**
   - Tegn arkitektur: Bruker → API → Database → Tredjeparter
   - Dokumenter dataflyt: hvor går sensitiv data?

2. **Identiifser trusler** (STRIDE):
   - **S**poofing: Kan noen utgir seg for å være noen annen?
   - **T**ampering: Kan data endres på vei?
   - **R**epudiation: Kan noen benekte at de gjorde noe?
   - **I**nformation Disclosure: Kan sensitiv info lekkes?
   - **D**enial of Service: Kan systemet overbelastes?
   - **E**levation of Privilege: Kan bruker få høyere rettigheter?

3. **Vurder risiko** for hver trusel:
   - Sannsynlighet: Høy / Medium / Lav
   - Påvirkning: Kritisk / Høy / Medium / Lav
   - Risiko = Sannsynlighet × Påvirkning

4. **Prioriter tiltak**
   - Kritisk risiko: Må fikses før launch
   - Høy risiko: Bør fikses i nær fremtid
   - Medium/lav: Kan planlegges

5. **Implementer** og dokument tiltak

## Eksempel

```
TRUSSELMODELLERING RAPPORT
===========================
Prosjekt: Bankingapp
Dato: 2026-02-17
Metodikk: STRIDE

SYSTEMARKITEKTUR:
  [Bruker] → [App] → [API] → [Database] → [Bankintegrasjon]

─────────────────────────────────────────────────────────────

TRUSLER OG RISIKOMATRISE:

1. SPOOFING (Falsk identitet)

   T1.1: Hacker utgir seg for bruker ved innlogging
   ├─ Sannsynlighet: HØYT (svake passord vanlig)
   ├─ Påvirkning: KRITISK (full kontotilgang)
   ├─ Risiko: KRITISK *** FIKSES FØRST ***
   └─ Tiltak:
      • Tvinge sterke passord (minimum 12 tegn)
      • To-faktors autentisering (2FA)
      • Rate-limiting på innlogging (max 5 forsøk)
      • Varsle ved innlogging fra ny enhet

   T1.2: API-autentisering mangler → angriper kalles API direkte
   ├─ Sannsynlighet: MEDIUM (API-nøkkel kunne lekkes)
   ├─ Påvirkning: KRITISK (full datatilgang)
   ├─ Risiko: KRITISK
   └─ Tiltak:
      • Alle API-kall krever gyldig token
      • Tokens utløper etter 1 time
      • Implementer API rate-limiting
      • Logg alle API-kall for audit

─────────────────────────────────────────────────────────────

2. TAMPERING (Datamanipulasjon)

   T2.1: Hacker endrer ordrebeløp fra $10 til $0,01
   ├─ Sannsynlighet: HØYT (ingen validering på klientsiden)
   ├─ Påvirkning: KRITISK (finansiell tap)
   ├─ Risiko: KRITISK
   └─ Tiltak:
      • Valider all kunde-input på serveren (ikke klienten)
      • Beløp skal beregnes på serveren, ikke sendes fra klient
      • Logg alle ordreendringer for audit
      • Implementer digitale signaturer på finansielle transaksjoner

   T2.2: Man-in-the-middle (MITM) angrep, data endres under overføring
   ├─ Sannsynlighet: LAV (hvis HTTPS brukes)
   ├─ Påvirkning: KRITISK (datamanipulasjon)
   ├─ Risiko: MEDIUM
   └─ Tiltak:
      • Påtvinge HTTPS overalt (ikke HTTP)
      • Implementer Certificate Pinning i mobil-app
      • HSTS headers (Strict-Transport-Security)

─────────────────────────────────────────────────────────────

3. REPUDIATION (Benektelse)

   T3.1: Bruker benekter at de gjorde en transaksjon
   ├─ Sannsynlighet: MEDIUM
   ├─ Påvirkning: HØYT (juridisk problem)
   ├─ Risiko: HØYT
   └─ Tiltak:
      • Logg ALLE transaksjoner (bruker, tid, beløp, bekreftelse)
      • Send e-postbekreftelse etter hver transaksjon
      • Implementer digitale signaturer
      • Oppbevar loggene sikker i 7 år (juridisk krav)

─────────────────────────────────────────────────────────────

4. INFORMATION DISCLOSURE (Datalek)

   T4.1: Database blir hacket, alle passord lekkes
   ├─ Sannsynlighet: MEDIUM (databaser er mål)
   ├─ Påvirkning: KRITISK (alle brukerkontoer kompromittert)
   ├─ Risiko: KRITISK
   └─ Tiltak:
      • Krypter sensitiv data i databasen
      • Hash passord med bcrypt/Argon2 (aldri klarform)
      • Krypter kredittkort-tall (kun 4 siste siffer synlig)
      • Implementer backup-kryptering
      • Begrenset database-tilgang (alleen hva som trengs)

   T4.2: Datalek via API, angriper henter alle brukerkonto
   ├─ Sannsynlighet: HØYT (svak autorisasjonskontroll)
   ├─ Påvirkning: KRITISK
   ├─ Risiko: KRITISK
   └─ Tiltak:
      • Implementer rolle-basert tilgangskontroll (RBAC)
      • Bruker kan bare se sin egen data
      • Admin kan bare se sitt eget domene
      • Logg all datahenting (audit trail)

─────────────────────────────────────────────────────────────

5. DENIAL OF SERVICE (Systemkrasj)

   T5.1: DDoS-angrep overbelaster serveren
   ├─ Sannsynlighet: MEDIUM (DDoS-verktøy lett tilgjengelig)
   ├─ Påvirkning: HØYT (systemet nede)
   ├─ Risiko: HØYT
   └─ Tiltak:
      • Bruk DDoS-beskyttelse (Cloudflare, AWS Shield)
      • Rate-limiting på API
      • Load-balancing over flere servere
      • Auto-scaling hvis trafikkøkt

   T5.2: Angriper laster enormt datasett, krasjer database
   ├─ Sannsynlighet: MEDIUM
   ├─ Påvirkning: HØYT
   ├─ Risiko: HØYT
   └─ Tiltak:
      • Paginering (max 100 resultater per kall)
      • Spørring timeout (max 30 sekunder)
      • Bruke indekser for rask database-søk
      • Caching (Redis)

─────────────────────────────────────────────────────────────

6. ELEVATION OF PRIVILEGE (Rettighetsøkning)

   T6.1: Bruker endrer sitt eget rolle fra USER til ADMIN
   ├─ Sannsynlighet: HØYT (hvis JWT ikke valideres på server)
   ├─ Påvirkning: KRITISK (full systemkontroll)
   ├─ Risiko: KRITISK
   └─ Tiltak:
      • Roller lagres på serveren, ikke i token
      • Validér rolle-krav for hver admin-operasjon
      • Logg alle privilegium-endringer
      • 2FA for admin-operasjoner

   T6.2: Angriper bruker SQL-injection, får admin-tilgang
   ├─ Sannsynlighet: HØYT (om prepared statements ikke brukes)
   ├─ Påvirkning: KRITISK
   ├─ Risiko: KRITISK
   └─ Tiltak:
      • Bruke parameteriserte spørringer
      • Input-validering og sanering
      • Least Privilege prinsipp (database-bruker bare det den trenger)

─────────────────────────────────────────────────────────────

RISIKOSAMMENDRAG:

Kritisk (FIKSES FØRSTE):
  ✓ T1.1: Spoofing ved innlogging
  ✓ T1.2: API-autentisering
  ✓ T2.1: Ordremanipulasjon
  ✓ T4.1: Database-hack + passordlek
  ✓ T4.2: API-datalek
  ✓ T6.1: Rettighetsøkning via JWT
  ✓ T6.2: SQL-injection → admin

Høy (FIKSES SNART):
  • T2.2: MITM-angrep
  • T3.1: Transaksjonsbenektelse
  • T5.1: DDoS-angrep
  • T5.2: Database-overbelastning

Medium/Lav: (PLANLEGG SENERE)
  • Mindre trusler

PRIORITERING:

Fase 1 (MVP): Kritiske trusler
  - 2FA-implementering
  - API-autentisering
  - Passord-hashing
  - Database-kryptering

Fase 2 (Release): Høye trusler
  - HTTPS + HSTS
  - Transaksjonslogging
  - DDoS-beskyttelse

Fase 3 (Later): Medium/lave trusler
  - Avansert rate-limiting
  - Metrics og monitoring

NESTE SKRITT:
1. Implementer 2FA på innlogging
2. Revisjon av API-autentisering
3. Sjekk passord-hashing-algoritme
```

## Relaterte features

- **OWASP-sikkerhet** — Sjekker mot OWASP Top 10 sårbarheter
- **Hemmelighetssjekk** — Sikrer at hemmeligheter ikke lekkes
- **GDPR-compliance** — Vurderer persondata-risiko
- **Automatisk sikkerhetsoppgradering** — Oppgraderer basert på truselbildet

---

*Definert i: Kit CC/Agenter/agenter/ekspert/TRUSSELMODELLERINGS-ekspert.md*
*Lagt til: 2026-02-17*
*Kategori: Sikkerhet*
