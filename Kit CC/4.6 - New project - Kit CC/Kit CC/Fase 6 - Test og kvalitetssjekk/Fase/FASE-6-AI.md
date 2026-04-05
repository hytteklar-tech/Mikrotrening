# Fase 6: Test, sikkerhet og kvalitetssjekk — Fungerer alt? (AI-Instruksjoner)

> **Din rolle:** Du er ansvarlig for å utføre testing, identifisere sikkerhetsproblemer, og kvalitetssikre AI-generert kode. Følg instruksjonene systematisk og rapporter funn tydelig til prosjektleder.

---

## Hurtigreferanse: Hva skal gjøres når

| Trigger | Handling |
|---------|----------|
| Ny kode er ferdig | Kjør AI-kode gjennomgang (1.1) |
| Før lansering | Kjør OWASP-sjekk (2.1) + Hemmelighetssjekk (2.3) + Dependency scan (2.4) |
| Prosjektleder ber om testing | Start med prioriteringsanalyse basert på prosjekttype |
| Bug rapportert | Kategoriser (P0-P3) og dokumenter |

---

## 1. Validering av AI-generert kode

### 1.1 AI-kode gjennomgang

**Utfør denne analysen på all AI-generert kode:**

```
ANALYSE-PROTOKOLL:

1. SIKKERHETSPROBLEMER - Søk etter:
   □ Hardkodede hemmeligheter (passord, API-nøkler, tokens)
   □ SQL injection sårbarheter (string concatenation i queries)
   □ XSS sårbarheter (uescapet output)
   □ Manglende input-validering
   □ Usikker autentisering/autorisasjon

2. KODEKVALITET - Evaluer:
   □ Lesbarhet og forståelighet
   □ Feilhåndtering implementert?
   □ Edge cases håndtert?
   □ Duplisert kode?
   □ Konsistente mønstre?

3. AVHENGIGHETER - Sjekk:
   □ Utdaterte pakker?
   □ Usikre biblioteker?
   □ Unødvendige dependencies?

4. DOKUMENTASJON:
   □ Er funksjoner dokumentert?
   □ Er kompleks logikk forklart?
```

**Risiko-kategorisering av kode:**

| Risiko | Type kode | Ditt ansvar |
|--------|-----------|-------------|
| **Høy** | Autentisering, betaling, persondata | GRUNDIG gjennomgang, flagg for menneske-review |
| **Medium** | Forretningslogikk, API-er | Standard gjennomgang |
| **Lav** | UI-komponenter, styling | Rask sjekk |

### 1.2 Security-fokusert kodeanalyse

**Når du genererer eller analyserer kode, ALLTID sjekk:**

```javascript
// 🔴 SÅRBAR - Identifiser disse mønstrene:
const query = "SELECT * FROM users WHERE id = " + userId;  // SQL injection
element.innerHTML = userInput;  // XSS
const API_KEY = "sk_live_abc123";  // Hardkodet hemmelighet
if (password === "admin123") { /* ... */ }  // Hardkodet passord

// 🟢 SIKKER - Foreslå disse løsningene:
const query = "SELECT * FROM users WHERE id = $1", [userId];  // Parameterisert
element.textContent = userInput;  // Escaped
const API_KEY = process.env.API_KEY;  // Miljøvariabel
const isValid = await bcrypt.compare(password, hashedPassword);  // Sikker
```

**Security-sjekkliste ved kodegenerering:**

```
AUTENTISERING:
□ Passord hashet med bcrypt (cost 12+) eller argon2
□ Rate limiting på innlogging (maks 5 forsøk/minutt)
□ Session timeout etter inaktivitet
□ Ny session-ID etter innlogging

INPUT HÅNDTERING:
□ All input validert mot forventet format
□ All input sanitert før bruk
□ Parameteriserte database-queries

OUTPUT HÅNDTERING:
□ All output escaped for kontekst (HTML, JS, SQL)
□ Content-Type headers satt korrekt

HEMMELIGHETER:
□ Ingen hardkodede verdier
□ Alle hemmeligheter fra miljøvariabler
□ .env i .gitignore
```

### 1.3 Teknisk gjeld-vurdering

**Vurder og scorer (1-5) disse områdene:**

```
1. KODEKVALITET (1-5)
   - Lesbar og forståelig?
   - Duplisert kode?
   - Konsistente mønstre?

2. DOKUMENTASJON (1-5)
   - Funksjoner dokumentert?
   - README oppdatert?

3. AVHENGIGHETER (1-5)
   - Biblioteker oppdaterte?
   - Unødvendige dependencies?

4. TESTBARHET (1-5)
   - Kan koden testes enkelt?
   - Er det tester?

5. VEDLIKEHOLDBARHET (1-5)
   - Hvor vanskelig å endre?
   - Tight coupling?

TOTAL GJELD-SCORE: (sum / 5)

RAPPORTER:
- Topp 3 MÅ fikses før lansering
- Topp 3 bør fikses etter lansering
- Estimert tid for kritisk gjeld
```

---

## 2. Sikkerhetstesting

### 2.1 OWASP Top 10:2025 Sjekk

**For hver kategori, analyser kodebasen og rapporter:**

```
A01: BROKEN ACCESS CONTROL
Sjekk:
□ Kan bruker A få tilgang til bruker B sine data ved å endre ID?
□ Er alle API-endepunkter beskyttet med autentisering?
□ Sjekkes autorisasjon (har brukeren LOV til handlingen)?
□ Er admin-sider beskyttet?

Søk etter kode som:
- Henter ressurser kun basert på ID uten å sjekke eierskap
- Mangler @auth eller middleware på routes

A02: SECURITY MISCONFIGURATION
Sjekk:
□ Debug-modus deaktivert i produksjon?
□ Standard-passord endret?
□ Detaljerte feilmeldinger skjult fra brukere?
□ Security headers satt?

Forventede headers:
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'

A03: SOFTWARE SUPPLY CHAIN
□ Alle dependencies skannet for sårbarheter?
□ Lock-filer brukes (package-lock.json)?
□ CI/CD pipeline sikret?

A04: CRYPTOGRAPHIC FAILURES
□ HTTPS overalt?
□ Passord hashet (bcrypt/argon2)?
□ Sensitiv data kryptert i database?
□ TLS 1.2 eller nyere?

A05: INJECTION
□ Parameteriserte queries brukes?
□ All brukerinput validert?
□ Output escaped for kontekst?

Søk etter:
- String concatenation i SQL/NoSQL queries
- eval(), exec(), eller lignende

A06: INSECURE DESIGN
□ Rate limiting implementert?
□ Kontoer låses etter mislykkede forsøk?
□ Passordgjenoppretting bruker tidsbegrenset token?

A07: AUTHENTICATION FAILURES
□ Svake passord avvises?
□ Ny session-ID etter innlogging?
□ Session timeout?

A08: DATA INTEGRITY FAILURES
□ Data fra eksterne kilder verifiseres?
□ Integritetssjekk på filer?

A09: SECURITY LOGGING FAILURES
□ Innloggingsforsøk logges?
□ Tilgangsfeil logges?
□ Sensitive data IKKE i logger?

A10: SSRF (Server-Side Request Forgery)
□ URL-er serveren henter valideres?
□ Interne IP-adresser blokkeres?
```

**Rapporter i dette formatet:**

| Kategori | Status | Risiko | Funn | Handling |
|----------|--------|--------|------|----------|
| A01 | Sårbar/OK | Kritisk/Høy/Medium/Lav | Beskrivelse | Hva må gjøres |

### 2.2 API Security Sjekk

**For hvert API-endepunkt, utfør:**

```
BOLA-TEST (Broken Object Level Authorization):
1. Identifiser endepunkter med ressurs-ID i URL (f.eks. /api/orders/:id)
2. Sjekk om koden verifiserer at bruker eier ressursen
3. Flagg endepunkter som returnerer data kun basert på ID

EKSEMPEL PÅ SÅRBAR KODE:
app.get('/api/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order); // INGEN SJEKK AV EIERSKAP!
});

EKSEMPEL PÅ SIKKER KODE:
app.get('/api/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Not found' });
  if (order.userId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  res.json(order);
});

SJEKKLISTE FOR HVERT ENDEPUNKT:
□ Kreves autentisering?
□ Sjekkes autorisasjon (eierskap)?
□ Rate limiting implementert?
□ Input valideres?
□ Returneres bare nødvendig data?
□ Paginering med maks grense?
```

### 2.3 Hemmelighetssjekk

**Søk gjennom HELE kodebasen etter:**

```
SØKEMØNSTRE:
- "password", "passwd", "pwd"
- "secret", "api_key", "apikey", "api-key"
- "token", "bearer", "auth"
- "sk_live", "sk_test" (Stripe)
- "AKIA" (AWS)
- Lange strenger som ser ut som nøkler (32+ tegn hex/base64)

RISIKABLE FILER:
- .env (skal IKKE være committet)
- config.json, config.yaml
- .bak, .old filer
- docker-compose.yml (sjekk environment)

SJEKK GIT-HISTORIKK:
- Hemmeligheter som har vært i koden men er fjernet

VED FUNN:
1. KRITISK - Anta at hemmeligheten er kompromittert
2. Rapporter umiddelbart til prosjektleder
3. Anbefal: Roter nøkkel, fjern fra kode, bruk miljøvariabler
```

### 2.4 Dependency Scanning

**Kjør og analyser:**

```bash
# Node.js
npm audit

# Python
pip-audit

# Generell
trivy fs --scanners vuln .
```

**Rapporter i dette formatet:**

```
KRITISKE SÅRBARHETER (fiks umiddelbart):
- [pakke] v[versjon]: [CVE-ID] - [beskrivelse]
  Løsning: npm update [pakke] / pip install [pakke]==[ny-versjon]

HØYE SÅRBARHETER (fiks før lansering):
- ...

MEDIUM/LAVE (planlegg oppdatering):
- ...

UTDATERTE PAKKER:
- ...
```

---

## 3. Funksjonell testing

### 3.1 Testscenario-generering

**Generer testscenarier for hver funksjon:**

```
STRUKTUR FOR HVERT SCENARIO:

Testscenario: [Navn]
Forutsetninger: [Hva må være på plass]
Steg:
1. [Handling]
2. [Handling]
3. [Handling]
Forventet resultat: [Hva skal skje]
Faktisk resultat: □ Pass / □ Fail
Notater: [Observasjoner]

DEKK DISSE KATEGORIENE:

1. POSITIVE TESTER (happy path)
   - Normal bruk som skal fungere

2. NEGATIVE TESTER
   - Ugyldig input
   - Manglende felt
   - Feil format

3. EDGE CASES
   - Grenseverdier (min/max)
   - Tomme verdier
   - Veldig lange verdier (>10.000 tegn)
   - Spesialtegn og unicode (日本語, 🎉)

4. SIKKERHETSTESTER
   - SQL injection forsøk: ' OR '1'='1
   - XSS forsøk: <script>alert('xss')</script>
   - Uautorisert tilgang

5. ROBUSTHET
   - Dobbeltklikk på knapper
   - Tilbake-knapp midt i prosess
   - Treg tilkobling
```

### 3.2 Cross-browser problemer å se etter

**Analyser koden for potensielle problemer:**

```
CSS:
□ Flexbox uten fallback?
□ Grid uten fallback?
□ CSS variabler uten fallback?
□ position: fixed på iOS?
□ 100vh på mobil (tar ikke høyde for adressefelt)?

JAVASCRIPT:
□ Optional chaining (?.) uten polyfill?
□ Nullish coalescing (??) uten polyfill?
□ fetch() uten polyfill for eldre nettlesere?
□ Promises uten polyfill?

SAFARI-SPESIFIKKE:
□ Date parsing - Safari krever spesifikt format
□ localStorage i privat modus feiler
□ Video autoplay krever muted
□ Touch events vs mouse events

MOBIL:
□ Touch targets minst 44x44px?
□ Input zoom på iOS (font-size < 16px)?
□ Keyboard visibility håndtering?
```

### 3.3 AI-assistert bug-jakt

**Når du tester en funksjon, prøv å ødelegge den:**

```
DESTRUKTIV TESTING:

1. INPUT-ANGREP
   - Ekstremt lang tekst (10.000+ tegn)
   - Spesialtegn: <>'";&|\`${}[]
   - Unicode: 日本語, emoji 🎉, RTL عربى
   - Null bytes: %00
   - SQL: ' OR '1'='1'; DROP TABLE users; --
   - Script tags: <script>alert(1)</script>

2. TIMING-ANGREP
   - Dobbeltklikk raskt
   - Klikk mens noe laster
   - Trykk tilbake midt i operasjon
   - Lukk fanen/vinduet midt i

3. STATE-ANGREP
   - Åpne to faner, gjør samme handling
   - Manipuler URL-parametere
   - Endre data via DevTools
   - Slett cookies midt i session

4. RESSURS-ANGREP
   - Veldig stor fil (100MB+)
   - Feil filtype
   - Korrupt fil
   - Tom fil

RAPPORTER ALLE FUNN:
- Hva du gjorde
- Hva som skjedde
- Forventet oppførsel
- Alvorlighetsgrad (P0-P3)
```

---

## 4. Ytelse og tilgjengelighet

### 4.1 Ytelsesanalyse

**Identifiser ytelsesproblemer:**

```
BILDER:
□ Er bilder komprimert?
□ Brukes WebP/AVIF?
□ Lazy loading implementert?
□ Responsive images (srcset)?

JAVASCRIPT:
□ Bundle-størrelse rimelig (<200KB gzipped)?
□ Code splitting brukes?
□ Tree shaking fungerer?
□ Render-blocking scripts?

CSS:
□ Critical CSS inlinet?
□ Ubrukt CSS fjernet?

CACHING:
□ Cache-Control headers satt?
□ Service worker for caching?

NETTVERK:
□ Antall HTTP requests rimelig?
□ TTFB akseptabel (<600ms)?
□ Trege API-kall identifisert?
```

### 4.2 WCAG 2.2 AA Sjekk

**Analyser for tilgjengelighet:**

```
SEMANTISK HTML:
□ Riktige elementer brukes (<nav>, <main>, <article>)?
□ Heading-hierarki korrekt (h1→h2→h3)?
□ Lists er <ul>/<ol>, ikke <div>?

TASTATUR:
□ Alle interaktive elementer nås med Tab?
□ Fokusrekkefølge logisk?
□ Fokusindikator synlig?
□ Ingen tastaturfeller?

BILDER OG MEDIA:
□ Alle meningsfulle bilder har alt-tekst?
□ Dekorative bilder har alt=""?
□ Video har undertekster?

SKJEMAER:
□ Alle inputs har synlige labels?
□ Labels er koblet til inputs (for/id)?
□ Feilmeldinger er beskrivende?
□ Påkrevde felt er markert?

FARGER:
□ Kontrast minst 4.5:1 for tekst?
□ Informasjon formidles ikke kun med farge?

WCAG 2.2 NYE KRAV:
□ Focus Not Obscured - fokusert element synlig?
□ Target Size - klikkbare elementer minst 24x24px?
□ Dragging Movements - alternativ til drag-and-drop?

ARIA:
□ ARIA brukes kun når nødvendig?
□ ARIA-attributter er korrekte?
□ aria-live for dynamisk innhold?
```

---

## 5. Bug-håndtering

### 5.1 Bug-kategorisering

**Bruk denne matrisen:**

| Prioritet | Beskrivelse | Handling | Eksempler |
|-----------|-------------|----------|-----------|
| **P0** | App krasjer, datatap, sikkerhetshull | Fiks UMIDDELBART | Passord i klartekst, BOLA, SQL injection |
| **P1** | Hovedfunksjon fungerer ikke | Fiks før lansering | Kan ikke logge inn, betaling feiler |
| **P2** | Sekundær funksjon fungerer ikke | Planlegg fiks | Filter fungerer ikke, søk gir feil |
| **P3** | Kosmetisk, minor UX | Backlog | Feil font, alignment off |

### 5.2 Bug-rapport format

```markdown
## Bug: [Kort tittel]

**Prioritet:** P0 / P1 / P2 / P3
**Kategori:** Sikkerhet / Funksjonell / Ytelse / UI

**Miljø:**
- Nettleser:
- Enhet:
- URL:

**Steg for å reprodusere:**
1.
2.
3.

**Forventet resultat:**


**Faktisk resultat:**


**Mulig årsak:**


**Forslag til løsning:**


**Bevis:** [Skjermbilde/video/feilmelding]
```

---

## 6. Rapportering til prosjektleder

### 6.1 Statusrapport-format

```markdown
# Teststatus: [Prosjektnavn]
**Dato:** [dato]
**Versjon:** [versjon]

## Sammendrag
🟢/🟡/🔴 KLAR FOR LANSERING: [JA/MED FORBEHOLD/NEI]

## Sikkerhetsstatus
| Test | Status | Kritiske funn |
|------|--------|---------------|
| OWASP Top 10 | ✓/✗ | |
| Hemmelighetssjekk | ✓/✗ | |
| Dependency scan | ✓/✗ | |
| API Security | ✓/✗ | |

## Bug-status
| Prioritet | Funnet | Fikset | Åpne |
|-----------|--------|--------|------|
| P0 | | | |
| P1 | | | |
| P2 | | | |

## Blokkere for lansering
1.
2.

## Anbefalinger
1.
2.
```

### 6.2 Exit-kriterier sjekkliste

**Bekreft før du rapporterer klar for Fase 7:**

```
OBLIGATORISK (alle prosjekter):
□ 0 P0-bugs
□ 0 P1-bugs
□ AI-kode gjennomgått (100% kritisk kode)
□ OWASP Top 10 sjekk bestått
□ Hemmelighetssjekk bestått
□ Dependency scan - ingen kritiske
□ Hovedflyter manuelt testet

ANBEFALT (kundevendte):
□ Code coverage > 60%
□ Lighthouse > 70
□ WCAG - ingen kritiske brudd
□ Cross-browser testet
□ GDPR-compliance verifisert

STOR SKALA:
□ DAST gjennomført
□ Load testing gjennomført
□ E2E-tester på plass
```

---

## 7. AI Governance dokumentasjon

**Dokumenter all AI-generert kode:**

```markdown
## AI-bruk logg: [Komponent/funksjon]

**Dato:**
**AI-verktøy:** Claude/GPT/Copilot
**Prompt brukt:**
[Hele prompten]

**Generert kode:** [fil-referanse]

**Gjennomgang:**
- Gjennomgått av: [AI/menneske]
- Sikkerhetsproblemer funnet: [ja/nei]
- Endringer gjort: [beskrivelse]

**Kjente begrensninger:**
-

**Status:** Godkjent / Godkjent med endringer / Krever menneske-review
```

---

## Hurtigkommandoer

**For teknisk utførelse:**

```bash
# Hemmelighetssjekk
gitleaks detect --source .
trufflehog filesystem .

# Dependency scan
npm audit
pip-audit
trivy fs --scanners vuln .

# Security headers
curl -I https://app.no | grep -E "X-Content-Type|X-Frame|Strict-Transport|Content-Security"

# Generer SBOM
syft . -o json > sbom.json
```
