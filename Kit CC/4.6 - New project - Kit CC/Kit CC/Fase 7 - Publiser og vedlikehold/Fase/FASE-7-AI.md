# Fase 7: Publiser og vedlikehold — Ut i verden (AI-Instruksjoner)

> **Formål:** Dette dokumentet inneholder alle tekniske implementeringsdetaljer, prompts og konfigurasjoner AI-assistenten trenger for å hjelpe med Fase 7.

---

## Innholdsfortegnelse

1. [Del A: Forberedelse til Lansering](#del-a-forberedelse-til-lansering)
2. [Del B: Deployment](#del-b-deployment)
3. [Del C: Overvåking og Observability](#del-c-overvåking-og-observability)
4. [Del D: Sikkerhet og Beredskap](#del-d-sikkerhet-og-beredskap)
5. [Del E: Vedlikehold og Langsiktig Drift](#del-e-vedlikehold-og-langsiktig-drift)

---

# Del A: Forberedelse til Lansering

---

## 1. Sikker hosting-konfigurasjon 🔴

### Hosting-plattformer

| Plattform    | Best for                 | Automatisk HTTPS | Pris        |
| ------------ | ------------------------ | ---------------- | ----------- |
| **Vercel**   | Next.js, React           | Ja               | Gratis tier |
| **Netlify**  | Statiske sider, JAMstack | Ja               | Gratis tier |
| **Railway**  | Full-stack med database  | Ja               | Fra $5/mnd  |
| **Render**   | Alt-i-ett                | Ja               | Gratis tier |
| **Supabase** | Backend + database       | Ja               | Gratis tier |

### Prompt: Security Headers

```
PROMPT TIL AI:
"Legg til security headers i prosjektet mitt. Jeg trenger:
- Strict-Transport-Security for å tvinge HTTPS
- X-Content-Type-Options satt til nosniff
- X-Frame-Options satt til DENY
- Content-Security-Policy tilpasset min app
- Referrer-Policy satt til strict-origin-when-cross-origin

Vis meg hvordan dette konfigureres for [din plattform, f.eks. Vercel/Next.js]"
```

### Prompt: CORS-konfigurasjon

```
PROMPT TIL AI:
"Konfigurer CORS for API-et mitt slik at kun følgende domener får tilgang:
- https://mittdomene.no (produksjon)
- https://www.mittdomene.no (produksjon med www)
- http://localhost:3000 (kun i utviklingsmodus)

Blokker alle andre domener fra å kalle API-et."
```

### Verifisering
Test konfigurasjonen på [securityheaders.com](https://securityheaders.com)

| Rating | Betydning | Handling                |
| ------ | --------- | ----------------------- |
| A+     | Utmerket  | Alt er bra              |
| A/B    | Bra       | Små forbedringer mulig  |
| C/D    | Middels   | Mangler viktige headers |
| F      | Dårlig    | Kritisk arbeid kreves   |

---

## 2. Miljøvariabler og hemmeligheter 🔴

### Prompt: Finn hemmeligheter

```
PROMPT TIL AI:
"Søk gjennom hele kodebasen og finn alle steder hvor det ser ut som
hemmeligheter er hardkodet. Se etter:
- API-nøkler (strenger som starter med sk_, pk_, api_, key_)
- Database connection strings
- Passord eller tokens
- Webhook URLs med hemmeligheter

List opp alle funn med filnavn og linjenummer."
```

### Plattform-spesifikk konfigurasjon

| Plattform    | Hvor du finner det                       |
| ------------ | ---------------------------------------- |
| **Vercel**   | Project Settings → Environment Variables |
| **Netlify**  | Site settings → Environment variables    |
| **Railway**  | Variables-fanen i prosjektet             |
| **Render**   | Environment i dashboard                  |
| **Supabase** | Settings → API (for Supabase-nøkler)     |

### Prompt: Erstatt hardkodede verdier

```
PROMPT TIL AI:
"Erstatt alle hardkodede hemmeligheter med miljøvariabler.

I stedet for:
const apiKey = "sk_live_abc123xyz"

Skal det være:
const apiKey = process.env.STRIPE_API_KEY

Gjør dette for alle hemmeligheter vi fant i forrige steg."
```

### Prompt: .env.example

```
PROMPT TIL AI:
"Lag en .env.example fil som viser hvilke miljøvariabler prosjektet
trenger, men uten faktiske verdier. Dette hjelper andre (og fremtidig
meg) å forstå hva som må konfigureres.

Eksempel format:
DATABASE_URL=postgresql://user:password@host:port/database
STRIPE_API_KEY=sk_live_your_key_here
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32"
```

### Prompt: Sikre .gitignore

```
PROMPT TIL AI:
"Sjekk at .gitignore inkluderer alle .env-filer:
.env
.env.local
.env.development
.env.production

Hvis ikke, legg dem til."
```

### Generere sikre hemmeligheter
- Linux/Mac: `openssl rand -base64 32`
- Node.js: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

---

## 3. Staging-miljø 🔴

### Prompt: Sett opp staging

```
PROMPT TIL AI:
"Hjelp meg sette opp et staging-miljø i [din plattform].
Jeg trenger:
- Egen URL for staging (f.eks. staging.mittdomene.no)
- Separate miljøvariabler for staging
- Automatisk deploy til staging fra develop-branch"
```

### Miljøvariabel-separasjon

| Variabel     | Produksjon          | Staging                   |
| ------------ | ------------------- | ------------------------- |
| DATABASE_URL | prod-db.example.com | staging-db.example.com    |
| STRIPE_KEY   | sk_live_...         | sk_test_...               |
| API_URL      | api.mittdomene.no   | api-staging.mittdomene.no |

### Prompt: Test-prosedyre

```
PROMPT TIL AI:
"Lag en sjekkliste jeg kan følge for å teste i staging før jeg
deployer til produksjon. Inkluder:
- Kritiske brukerflyter å teste
- Hva jeg skal se etter i logger
- Ytelsessjekker
- Sikkerhetskontroller"
```

---

## 4. Sikkerhetsskanning av AI-generert kode 🔴

### Prompt: Aktiver GitHub Security

```
PROMPT TIL AI:
"Aktiver følgende GitHub security features for repositoryet mitt:
- Dependabot alerts (varsler om sårbare avhengigheter)
- Dependabot security updates (automatiske oppdateringer)
- Code scanning med CodeQL (SAST)

Vis meg steg-for-steg hvordan jeg gjør dette i GitHub-innstillingene."
```

### Prompt: CI/CD sikkerhet

```
PROMPT TIL AI:
"Legg til følgende sikkerhetssjekker i GitHub Actions workflow:
- npm audit for JavaScript/Node.js avhengigheter
- CodeQL-analyse for koden
- Secrets scanning for å fange hardkodede hemmeligheter

Deploy skal stoppe hvis kritiske sårbarheter finnes."
```

### Prompt: Manuell sikkerhetsgjennomgang

```
PROMPT TIL AI:
"Gjennomgå følgende kode for sikkerhetsproblemer:
[lim inn koden]

Se spesielt etter:
- SQL injection
- XSS-sårbarheter
- Manglende input-validering
- Usikker håndtering av hemmeligheter
- Manglende rate limiting
- Feil i autentisering/autorisasjon"
```

### Verktøy for sikkerhetsskanning

| Verktøy       | Type                     | Pris                  | Best for          |
| ------------- | ------------------------ | --------------------- | ----------------- |
| GitHub CodeQL | SAST                     | Gratis (public repos) | Alle              |
| Snyk          | SAST + Dependencies      | Gratis tier           | JavaScript/Node   |
| SonarCloud    | Kodekvalitet + sikkerhet | Gratis tier           | Større prosjekter |
| npm audit     | Dependencies             | Gratis                | Node.js           |

### Responstider for sårbarheter

| Alvorlighet | Responstid | Handling                         |
| ----------- | ---------- | -------------------------------- |
| Kritisk     | Samme dag  | Stopp deploy, fiks umiddelbart   |
| Høy         | 1-2 dager  | Prioriter fiks før neste release |
| Medium      | 1 uke      | Planlegg fiks i neste sprint     |
| Lav         | 1 måned    | Legg i backlog                   |

---

# Del B: Deployment

---

## 5. Produksjons-deploy via CI/CD 🔴

### CI/CD-løsninger

| Løsning                | Best for       | Kompleksitet |
| ---------------------- | -------------- | ------------ |
| **Vercel** (innebygd)  | Next.js, React | Veldig enkel |
| **Netlify** (innebygd) | Statiske sider | Veldig enkel |
| **GitHub Actions**     | Alt            | Moderat      |
| **Railway** (innebygd) | Full-stack     | Enkel        |

### Prompt: Automatisk deploy

```
PROMPT TIL AI:
"Sett opp automatisk deploy til [Vercel/Netlify/Railway] slik at:
1. Hver push til 'main'-branch deployer til produksjon
2. Hver push til andre branches lager en preview
3. Deploy stopper hvis build feiler
4. Tester kjøres før deploy"
```

### Prompt: Pre-deploy sjekker

```
PROMPT TIL AI:
"Lag en GitHub Actions workflow som kjører før deploy:
- Linting (sjekk kodeformatering)
- Typesjekking (hvis TypeScript)
- Enhetstester
- Sikkerhetsaudit av avhengigheter

Deploy skal bare skje hvis alle sjekker passerer."
```

### Deploy-prosess dokumentasjon

```
DEPLOY-PROSESS:
1. Utvikler pusher kode til GitHub
2. GitHub Actions kjører automatisk:
   - [ ] Installerer avhengigheter
   - [ ] Kjører linting
   - [ ] Kjører tester
   - [ ] Kjører sikkerhetsaudit
3. Hvis alt passerer: Deploy til staging
4. Manuell godkjenning for produksjon (valgfritt)
5. Deploy til produksjon
6. Smoke tests kjører automatisk
```

---

## 6. Deployment-strategier 🟡

### Prompt: Preview deployments

```
PROMPT TIL AI:
"Forklar hvordan jeg bruker Vercel preview deployments for å:
1. Teste endringer før de går til produksjon
2. Dele preview-URL med andre for tilbakemelding
3. Sammenligne preview med nåværende produksjon"
```

### Prompt: Feature flags

```
PROMPT TIL AI:
"Implementer enkle feature flags i prosjektet mitt. Jeg vil kunne:
1. Skjule nye funksjoner for de fleste brukere
2. Aktivere funksjoner for spesifikke brukere (f.eks. meg selv)
3. Gradvis rulle ut til flere brukere
4. Raskt deaktivere en funksjon hvis noe går galt

Foreslå en enkel løsning som ikke krever eksternt verktøy."
```

### Prompt: Canary deployment

```
PROMPT TIL AI:
"Forklar hvordan jeg setter opp canary deployment i [Vercel/Cloudflare]:
1. Start med 5% av trafikken til ny versjon
2. Overvåk feilrater
3. Øk gradvis til 25%, 50%, 100%
4. Rull tilbake automatisk hvis feilraten øker"
```

### Blue-Green deployment

```
HVORDAN DET FUNGERER:
1. Blue kjører nåværende versjon
2. Deploy ny versjon til Green
3. Test Green grundig
4. Bytt trafikk fra Blue til Green
5. Blue blir backup for rask rollback
```

---

## 7. Verifisering av produksjon 🔴

### Prompt: Smoke test-sjekkliste

```
PROMPT TIL AI:
"Lag en smoke test-sjekkliste for applikasjonen min. Inkluder:
1. Grunnleggende sideinnlasting
2. Autentisering (hvis relevant)
3. Hovedfunksjoner brukerne bruker mest
4. Integrasjoner med tredjeparter
5. Database-operasjoner

For hver test, spesifiser:
- Hva som testes
- Forventet resultat
- Hvordan verifisere"
```

### Eksempel smoke test-sjekkliste

| Test            | URL/Handling         | Forventet                | ✓    |
| --------------- | -------------------- | ------------------------ | ---- |
| Forside laster  | /                    | 200 OK, innhold vises    | ☐    |
| Login fungerer  | /login → credentials | Redirect til dashboard   | ☐    |
| API health      | /api/health          | 200 OK, {"status": "ok"} | ☐    |
| Database        | Opprett test-entry   | Lagret og hentet OK      | ☐    |
| Betaling (test) | Stripe test-kort     | Vellykket transaksjon    | ☐    |
| E-post          | Trigger test-mail    | Mottas innen 1 minutt    | ☐    |

### Prompt: Automatiserte smoke tests

```
PROMPT TIL AI:
"Lag et enkelt smoke test-script som:
1. Sjekker at hovedsidene returnerer 200 OK
2. Sjekker at API-endepunkter responderer
3. Kjører automatisk etter hver deploy
4. Sender varsel hvis noe feiler

Bruk [fetch/axios] og output resultatene i et lesbart format."
```

### Prompt: Sjekk logger

```
PROMPT TIL AI:
"Vis meg hvordan jeg sjekker logger etter deploy i [Vercel/Netlify]:
1. Hvor finner jeg loggene?
2. Hva bør jeg se etter?
3. Hvordan filtrerer jeg på feil?
4. Hvordan setter jeg opp varsler for nye feil?"
```

### Hva du ser etter i logger

| Loggtype      | Bra tegn           | Dårlig tegn        |
| ------------- | ------------------ | ------------------ |
| HTTP-koder    | 200, 201, 301, 302 | 500, 502, 503, 504 |
| Responstid    | < 500ms            | > 2000ms           |
| Feilmeldinger | Ingen nye          | Nye stack traces   |
| Database      | Tilkoblet OK       | Connection errors  |

---

# Del C: Overvåking og Observability

---

## 8. Sikkerhetslogging 🔴

### Hva som skal logges

| Hendelse                | Logg? | Prioritet |
| ----------------------- | ----- | --------- |
| Vellykket innlogging    | Ja    | Høy       |
| Mislykket innlogging    | Ja    | Høy       |
| Utlogging               | Ja    | Medium    |
| Passordendring          | Ja    | Høy       |
| Passord nullstilt       | Ja    | Høy       |
| Brukerrolle endret      | Ja    | Kritisk   |
| Tilgang nektet          | Ja    | Høy       |
| Admin-handlinger        | Ja    | Kritisk   |
| Sensitiv data aksessert | Ja    | Høy       |
| API-feil                | Ja    | Medium    |
| Normale sidevisninger   | Nei   | -         |

### Prompt: Implementer logging

```
PROMPT TIL AI:
"Implementer sikkerhetslogging i applikasjonen. For hver logginngang:
- Tidsstempel (ISO 8601)
- Hendelsestype (login_success, login_failed, etc.)
- Bruker-ID (hvis tilgjengelig)
- IP-adresse
- User agent (nettleserinfo)
- Ekstra detaljer (f.eks. 'feil passord, forsøk 3 av 5')

VIKTIG: Logg ALDRI passord, personnummer, kredittkort, eller API-nøkler!"
```

### Logtjenester

| Tjeneste    | Gratis tier | Oppbevaring | Best for        |
| ----------- | ----------- | ----------- | --------------- |
| Vercel Logs | Ja          | 1 time      | Vercel-brukere  |
| Logtail     | 1GB/mnd     | 3 dager     | Enkelt oppsett  |
| Papertrail  | 100MB/mnd   | 2 dager     | Enkel           |
| Axiom       | 500GB/mnd   | 30 dager    | God gratis tier |

### Prompt: Sentralisert logging

```
PROMPT TIL AI:
"Integrer [Logtail/Axiom] i prosjektet mitt slik at alle logger
sendes dit i stedet for console.log. Vis oppsett steg-for-steg."
```

### Loggformat (strukturert JSON)

```json
{
  "timestamp": "2025-01-31T14:30:45.123Z",
  "level": "warn",
  "event": "login_failed",
  "userId": "user_123",
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "details": {
    "reason": "invalid_password",
    "attemptNumber": 3,
    "maxAttempts": 5
  }
}
```

### Hva du ALDRI skal logge

```
❌ Passord (heller ikke hashed)
❌ Kredittkort/bankkontonummer
❌ Personnummer
❌ Helseopplysninger
❌ API-nøkler eller tokens
❌ Session-hemmeligheter
```

---

## 9. Feilovervåking 🟡

### Verktøy

| Verktøy       | Gratis tier     | Fordel                     | Ulempe              |
| ------------- | --------------- | -------------------------- | ------------------- |
| **Sentry**    | 5K events/mnd   | Populært, godt dokumentert | Begrenset gratis    |
| **Bugsnag**   | 7.5K events/mnd | Bra for mobile             | Færre integrasjoner |
| **Rollbar**   | 5K events/mnd   | Enkel                      | Mindre community    |
| **LogRocket** | 1K sessions/mnd | Session replay             | Kun frontend        |

### Prompt: Integrer Sentry

```
PROMPT TIL AI:
"Sett opp Sentry i [Next.js/React/Node]-prosjektet mitt:
1. Installer nødvendige pakker
2. Konfigurer for både frontend og backend
3. Sørg for at sensitiv data IKKE sendes
4. Sett opp korrekt environment (development vs production)
5. Vis hvordan jeg tester at det fungerer"
```

### Sentry-konfigurasjon eksempel

```javascript
// sentry.config.js
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,

  // Kun i produksjon
  enabled: process.env.NODE_ENV === 'production',

  // Sample rate (spar på kvoten)
  tracesSampleRate: 0.1, // 10% av transaksjoner

  // Fjern sensitiv data
  beforeSend(event) {
    if (event.request?.cookies) {
      delete event.request.cookies;
    }
    return event;
  },
});
```

### Prompt: Konfigurer varsler

```
PROMPT TIL AI:
"Konfigurer Sentry-varsler slik at:
1. Kritiske feil sender e-post umiddelbart
2. Nye feiltyper varsles på Slack
3. Høyfrekvente feil (>10 på 1 time) eskaleres
4. Daglig oppsummering sendes på e-post"
```

### Triage-rutine

| Frekvens/alvorlighet        | Responstid  | Handling             |
| --------------------------- | ----------- | -------------------- |
| > 100 brukere/time, kritisk | Umiddelbart | Dropp alt, fiks nå   |
| > 10 brukere/dag, høy       | Samme dag   | Prioriter i dag      |
| < 10 brukere/dag, medium    | Innen 1 uke | Planlegg fiks        |
| Sjelden, lav                | Backlog     | Vurder ved anledning |

---

## 10. Oppetidsovervåking 🟡

### Tjenester

| Tjeneste          | Gratis tier | Intervall | Varsling      |
| ----------------- | ----------- | --------- | ------------- |
| **UptimeRobot**   | 50 monitors | 5 min     | E-post, Slack |
| **Better Uptime** | 10 monitors | 3 min     | E-post, SMS   |
| **Freshping**     | 50 monitors | 1 min     | E-post, Slack |

### Oppsett (UptimeRobot eksempel)

```
1. Gå til uptimerobot.com og registrer deg
2. Klikk "Add New Monitor"
3. Type: HTTP(s)
4. Friendly Name: "Min App - Forside"
5. URL: https://dinapp.no
6. Monitoring Interval: 5 minutter
7. Alert Contacts: Din e-post
```

### Hva du bør overvåke

| Hva                    | URL         | Hvorfor                       |
| ---------------------- | ----------- | ----------------------------- |
| Forside                | /           | Grunnleggende tilgjengelighet |
| API health             | /api/health | Backend fungerer              |
| Innlogging             | /login      | Auth-system oppe              |
| Database-avhengig side | /dashboard  | Full stack fungerer           |

### Prompt: Health-endepunkt

```
PROMPT TIL AI:
"Lag et /api/health endepunkt som:
1. Returnerer 200 OK hvis alt er bra
2. Sjekker database-tilkobling
3. Sjekker eventuelle kritiske tredjepartstjenester
4. Returnerer 503 Service Unavailable hvis noe er galt
5. Inkluderer responstid for hver sjekk"
```

### Eksempel health-respons

```json
{
  "status": "healthy",
  "timestamp": "2025-01-31T14:30:00Z",
  "checks": {
    "database": { "status": "ok", "responseTime": 23 },
    "stripe": { "status": "ok", "responseTime": 156 },
    "email": { "status": "ok", "responseTime": 89 }
  }
}
```

---

## 11. De fire gyllene signalene 🟡

### Signal 1: Latency (Forsinkelse)

```
PROMPT TIL AI:
"Implementer latency-måling i applikasjonen:
1. Mål responstid for alle API-kall
2. Skill mellom vellykkede og mislykkede requests
3. Bruk percentiler (p50, p95, p99) ikke bare gjennomsnitt
4. Logg til [overvåkingsverktøy]"
```

| Percentil    | Betydning             | Mål      |
| ------------ | --------------------- | -------- |
| p50 (median) | Halvparten er raskere | < 200ms  |
| p95          | 95% er raskere        | < 500ms  |
| p99          | 99% er raskere        | < 1000ms |

### Signal 2: Traffic (Trafikk)

```
PROMPT TIL AI:
"Sett opp trafikk-overvåking som viser:
1. Requests per sekund/minutt
2. Fordeling over tid (når er rush?)
3. Trafikk per endepunkt
4. Trend over dager/uker"
```

### Signal 3: Errors (Feil)

```
PROMPT TIL AI:
"Implementer error rate-måling:
1. Tell 4xx-feil (klientfeil)
2. Tell 5xx-feil (serverfeil)
3. Beregn feilrate (feil / totalt)
4. Varsle hvis feilrate > 1%"
```

| Feilrate | Vurdering    | Handling            |
| -------- | ------------ | ------------------- |
| < 0.1%   | Utmerket     | Ingen               |
| 0.1-1%   | Akseptabelt  | Overvåk             |
| 1-5%     | Problematisk | Undersøk            |
| > 5%     | Kritisk      | Umiddelbar handling |

### Signal 4: Saturation (Metning)

```
PROMPT TIL AI:
"Overvåk ressursbruk:
1. CPU-bruk på serveren
2. Minnebruk
3. Database-tilkoblinger (hvor mange av maks?)
4. Varsel når > 80% av noen ressurs"
```

---

## 12. SLI/SLO-rammeverk 🟡

### Prompt: Definer SLI-er

```
PROMPT TIL AI:
"Hjelp meg definere SLI-er for applikasjonen min:

For en [type app, f.eks. e-handelsside] trenger jeg målinger for:
1. Tilgjengelighet (er siden oppe?)
2. Latency (hvor raskt responderer vi?)
3. Korrekthet (fungerer funksjonene riktig?)

For hver, definer nøyaktig hva vi måler og hvordan."
```

### Eksempel SLI-er

| SLI             | Definisjon                 | Måles hvordan                                 |
| --------------- | -------------------------- | --------------------------------------------- |
| Tilgjengelighet | % av requests som får svar | (vellykkede requests / totale requests) × 100 |
| Latency         | % av requests under 500ms  | (requests < 500ms / totale requests) × 100    |
| Feilrate        | % av requests som feiler   | (5xx-feil / totale requests) × 100            |

### Eksempel SLO-er

| SLI             | SLO     | Måleperiode |
| --------------- | ------- | ----------- |
| Tilgjengelighet | 99.9%   | Per måned   |
| Latency (p95)   | < 500ms | Per måned   |
| Feilrate        | < 0.1%  | Per måned   |

### Error budget beregning

```
EKSEMPEL:
SLO for tilgjengelighet: 99.9%
Error budget: 0.1%

Per måned (30 dager):
0.1% av 30 dager = 43.2 minutter tillatt nedetid

Hvis du har brukt 30 minutter nedetid, har du 13.2 minutter igjen.
```

### Prompt: SLO-varsler

```
PROMPT TIL AI:
"Sett opp varsler basert på SLO-ene mine:
1. Varsel når vi nærmer oss error budget (50% brukt)
2. Kritisk varsel når error budget er brukt opp
3. Varsel når latency p95 overskrider 500ms i 5 minutter
4. Varsel når feilrate > 1% i 5 minutter"
```

---

## 13. Analytics og brukerdata 🟡

### GDPR-vennlige analytics-verktøy

| Verktøy              | Cookie-samtykke? | Pris              | Kompleksitet |
| -------------------- | ---------------- | ----------------- | ------------ |
| **Vercel Analytics** | Nei              | Inkludert         | Veldig enkel |
| **Plausible**        | Nei              | Fra $9/mnd        | Enkel        |
| **Fathom**           | Nei              | Fra $14/mnd       | Enkel        |
| **Umami**            | Nei              | Gratis (selvhost) | Moderat      |
| **PostHog**          | Valgfritt        | Gratis tier       | Avansert     |

### Prompt: Implementer analytics

```
PROMPT TIL AI:
"Sett opp [Vercel Analytics/Plausible] i prosjektet:
1. Installer nødvendige pakker
2. Legg til på alle sider
3. Verifiser at data samles inn
4. Vis meg hvordan jeg ser dataene"
```

### Vercel Analytics (enklest)

```bash
npm install @vercel/analytics
```

```jsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Prompt: Event tracking

```
PROMPT TIL AI:
"Implementer event tracking for følgende handlinger:
1. Bruker registrerer seg (signup_started, signup_completed)
2. Bruker logger inn
3. Bruker bruker hovedfunksjon
4. Bruker fullfører betaling (hvis relevant)
5. Bruker får feil

Vis meg hvordan jeg tracker disse eventene."
```

---

## 14. Kostnadsovervåking 🟢

### Kostnadskilder

| Tjeneste         | Type kostnad          | Hvor sjekke       |
| ---------------- | --------------------- | ----------------- |
| Vercel/Netlify   | Båndbredde, functions | Dashboard → Usage |
| Supabase         | Database, storage     | Dashboard → Usage |
| OpenAI/Anthropic | API-kall              | Dashboard → Usage |
| Stripe           | Transaksjonsgebyr     | Dashboard         |
| Domene           | Årlig                 | Registrar         |

### Prompt: Kostnadsvarsler

```
PROMPT TIL AI:
"Vis meg hvordan jeg setter opp kostnadsvarsler for:
1. [Vercel/Netlify] - varsel ved 80% av gratis tier
2. [OpenAI/Anthropic] - varsel ved $10, $50, $100 bruk
3. [Supabase] - varsel ved 80% av gratis tier"
```

### Prompt: Rate limiting

```
PROMPT TIL AI:
"Implementer rate limiting for AI-API-kall i applikasjonen:
1. Maks X kall per bruker per time
2. Maks Y kall totalt per dag
3. Graceful degradering når grense nås
4. Logging av bruk per bruker"
```

---

# Del D: Sikkerhet og Beredskap

---

## 15. Backup-rutiner 🔴

### 3-2-1-regelen

| Regel         | Forklaring                      |
| ------------- | ------------------------------- |
| **3** kopier  | Original + 2 backups            |
| **2** medier  | F.eks. database + cloud storage |
| **1** offsite | Minst én kopi et annet sted     |

### Plattform-backup

| Plattform           | Backup-løsning                          |
| ------------------- | --------------------------------------- |
| **Supabase**        | Automatisk daglig (Pro), manuell (Free) |
| **PlanetScale**     | Automatisk                              |
| **Railway**         | Manuell/cron job                        |
| **Vercel Postgres** | Point-in-time recovery                  |

### Prompt: Aktiver backup

```
PROMPT TIL AI:
"Vis meg hvordan jeg aktiverer automatisk backup for [din database]:
1. Hvor ofte bør backup kjøre?
2. Hvor lenge skal backups beholdes?
3. Hvordan verifiserer jeg at backup fungerer?
4. Hvordan gjenoppretter jeg fra backup?"
```

### Prompt: Test gjenoppretting

```
PROMPT TIL AI:
"Lag en prosedyre for å teste backup-gjenoppretting:
1. Hvordan laster jeg ned en backup?
2. Hvordan gjenoppretter jeg til et testmiljø?
3. Hvordan verifiserer jeg at alle data er intakte?

Jeg vil gjøre dette månedlig uten å påvirke produksjon."
```

---

## 16. Incident Response-plan 🟡

### Alvorlighetsnivåer

| Nivå        | Beskrivelse                    | Eksempler                          | Responstid       |
| ----------- | ------------------------------ | ---------------------------------- | ---------------- |
| **Kritisk** | Alt nede eller sikkerhetsbrudd | Data lekket, total nedetid         | Umiddelbart      |
| **Høy**     | Hovedfunksjon nede             | Innlogging feiler, betaling feiler | < 1 time         |
| **Medium**  | Delfunksjon nede               | Eksport virker ikke                | < 4 timer        |
| **Lav**     | Mindre feil                    | Skrivefeil, styling                | Neste arbeidsdag |

### Prompt: Scenarioøvelse

```
PROMPT TIL AI:
"Hjelp meg tenke gjennom hvordan jeg ville håndtert:
1. Database er slettet ved en feil
2. API-nøkkel er lekket på GitHub
3. Brukere rapporterer at de ser andres data
4. Nettstedet er nede og jeg vet ikke hvorfor

For hvert scenario, gå gjennom incident response-prosedyren."
```

---

## 17. Automatisk rollback 🟡

### Rollback-metoder

| Plattform   | Rollback-metode                                       |
| ----------- | ----------------------------------------------------- |
| **Vercel**  | Dashboard → Deployments → ... → Promote to Production |
| **Netlify** | Deploys → velg tidligere → Publish deploy             |
| **Railway** | Deployments → Rollback                                |

### Prompt: Månedlig rollback-test

```
PROMPT TIL AI:
"Lag et månedlig rollback-test script:
1. Deploy en testversjon
2. Verifiser at den kjører
3. Rull tilbake til forrige versjon
4. Verifiser at rollback fungerte
5. Logg resultat"
```

### Prompt: Automatisk rollback i CI/CD

```
PROMPT TIL AI:
"Implementer automatisk rollback i GitHub Actions:
1. Etter deploy, kjør smoke tests
2. Hvis smoke tests feiler, rull automatisk tilbake
3. Send varsel om at rollback skjedde
4. Logg detaljert feilinformasjon"
```

---

# Del E: Vedlikehold og Langsiktig Drift

---

## 18. Vedlikeholdsplan 🟢

### Prompt: Aktiver Dependabot

```
PROMPT TIL AI:
"Aktiver Dependabot i GitHub-repoet mitt for å:
1. Varsle om sikkerhetssårbarheter i avhengigheter
2. Automatisk opprette pull requests for sikkerhetsoppdateringer
3. Kjøre ukentlig sjekk av alle avhengigheter"
```

### Dependabot-konfigurasjon

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

### Prompt: Håndter oppdateringer

```
PROMPT TIL AI:
"Jeg trenger å oppdatere [bibliotek] fra versjon X til Y.
1. Hva er breaking changes mellom versjonene?
2. Hva må jeg endre i koden min?
3. Hvordan tester jeg at alt fortsatt fungerer?
4. Er det noe jeg bør være spesielt oppmerksom på?"
```

---

## 19. Håndtering av teknisk gjeld 🟡

### Prompt: Identifiser teknisk gjeld

```
PROMPT TIL AI:
"Analyser kodebasen og identifiser teknisk gjeld:
1. Finn duplisert kode som bør refaktoreres
2. Finn inkonsistente navnekonvensjoner
3. Finn komplekse funksjoner som bør brytes opp
4. Finn manglende feilhåndtering
5. Finn manglende eller utdatert dokumentasjon

Ranger funnene etter alvorlighet og gi konkrete forslag til forbedring."
```

### Tech debt budget

| Prosjektfase    | Tech debt-tid |
| --------------- | ------------- |
| MVP/Prototype   | 5%            |
| Aktiv utvikling | 15%           |
| Vedlikehold     | 20%           |

### Prompt: Refaktorer gradvis

```
PROMPT TIL AI:
"Jeg vil refaktorere [spesifikk del av koden].
1. Forklar nåværende kode i enkle termer
2. Foreslå en bedre struktur
3. Gjennomfør refaktoreringen steg for steg
4. Vis meg tester som bekrefter at funksjonaliteten er bevart"
```

---

## 20. Day 2-operasjoner for AI-generert kode 🟡

### Prompt: Debugging-strategi

```
PROMPT TIL AI:
"Det er en bug i applikasjonen: [beskriv symptomet]

1. Forklar meg først hva den relevante koden gjør, steg for steg
2. Identifiser mulige årsaker til buggen
3. Foreslå debugging-steg for å isolere problemet
4. Når vi finner årsaken, fiks den og forklar hvorfor fiksen fungerer"
```

### Prompt: Kontekstbevaring

```
PROMPT TIL AI (ved start av ny sesjon):
"Les gjennom følgende filer for å forstå prosjektet:
1. README.md
2. AI-CONTEXT.md
3. [hovedfil for funksjonalitet vi jobber med]

Oppsummer din forståelse før vi begynner."
```

### Prompt: Dokumenter mens du går

```
PROMPT TIL AI:
"For koden vi nettopp skrev/endret:
1. Legg til kommentarer som forklarer HVORFOR (ikke bare hva)
2. Oppdater AI-CONTEXT.md med nye beslutninger
3. Skriv eller oppdater relevante tester"
```

---

## 21. Changelog og versjonering 🟢

### Semantic Versioning

| Versjon       | Når økes         | Eksempel      |
| ------------- | ---------------- | ------------- |
| MAJOR (1.x.x) | Breaking changes | 1.0.0 → 2.0.0 |
| MINOR (x.1.x) | Nye funksjoner   | 1.0.0 → 1.1.0 |
| PATCH (x.x.1) | Bugfixes         | 1.0.0 → 1.0.1 |

### Prompt: Oppdater changelog

```
PROMPT TIL AI:
"Ved hver endring vi gjør, hjelp meg oppdatere CHANGELOG.md:
1. Kategoriser endringen (Added/Changed/Fixed/Security)
2. Skriv brukervendt beskrivelse (hva brukeren opplever)
3. Hold det kort og konsist"
```

### Prompt: What's New-komponent

```
PROMPT TIL AI:
"Lag en What's New-komponent som viser de siste endringene til brukerne:
1. Vis kun brukerrelevante endringer (ikke tekniske detaljer)
2. Formater det visuelt tiltalende
3. La brukere se tidligere oppdateringer
4. Marker nye funksjoner de ikke har sett"
```

---

## 22. Compliance og regulatoriske krav 🟡

### Prompt: GDPR datasubjektrettigheter

```
PROMPT TIL AI:
"Implementer GDPR datasubjektrettigheter i applikasjonen:
1. 'Se mine data'-funksjon (data export)
2. 'Slett mine data'-funksjon (data deletion)
3. 'Last ned mine data'-funksjon (data portability)

Sørg for at disse faktisk sletter/eksporterer ALL brukerdata fra alle tabeller."
```

---

*Sist oppdatert: Januar 2025*
*Versjon: 2.0.0*
