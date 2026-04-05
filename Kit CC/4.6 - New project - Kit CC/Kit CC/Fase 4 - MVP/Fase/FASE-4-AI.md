# Fase 4: MVP - Sett opp prosjektet - Første fungerende versjon (AI-Instruksjoner)

> **For AI-assistenter:** Dette dokumentet inneholder alle instruksjoner og implementasjonsdetaljer for Fase 4. Bruk dette som referanse når du hjelper prosjektleder med MVP-utvikling.

---

## Kontekst

**Mål for fase 4:** Bygge en fungerende versjon så raskt som mulig – med sikkerhet innebygd fra starten.

**Prosjekttype-kategorier:**
| Kategori | Beskrivelse |
|----------|-------------|
| Lite internt | Personlig verktøy, intern bruk |
| Internt m/DB | Internt system med database |
| Kundevendt | Produkt for eksterne brukere |
| Stor skala | Mange brukere, høye krav |

**Prioritetsnivåer:**
- 🔴 **Kritisk** – Må være på plass før MVP kan lanseres
- 🟡 **Viktig** – Bør være på plass, kan utsettes kort tid
- 🟢 **Anbefalt** – Nice to have, gir ekstra verdi

---

## DEL A: KRITISKE ELEMENTER (🔴)

> **Fase 4 er delt i to blokker. Gjør Blokk A ferdig FØR Blokk B:**
> - **Blokk A (3-6):** Prosjektoppsett — infrastruktur, sikkerhetsvakter, CI/CD
> - **Blokk B (7-12):** Første fungerende prototype — backend, frontend, auth, happy path

---

### BLOKK A: PROSJEKTOPPSETT (INFRASTRUKTUR)

> Sett opp alt verktøy og infrastruktur FØR produktkode skrives.

### 3. Prosjekt-setup med sikkerhet

**Instruksjon:**
```
Sett opp et nytt [Next.js/React/etc] prosjekt med:
- TypeScript for typesikkerhet
- ESLint med eslint-plugin-security
- Prettier for konsistent formatering
- En komplett .gitignore som ekskluderer alle hemmeligheter
- En .env.example fil med plassholdere (aldri ekte verdier)
```

**.gitignore mal:**
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

**.env.example mal:**
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

---

### 4. Moderne hemmelighets-håndtering

**Instruksjon:**
```
Sett opp miljøvariabel-håndtering for prosjektet:
- .env.example med alle variabler (kun plassholdere, aldri ekte verdier)
- Instruksjoner for hvordan sette opp i Vercel/Netlify
- GitHub Actions som bruker secrets for testing
- Valider at alle påkrevde miljøvariabler finnes ved oppstart
```

**Konfigurasjonsoversikt:**
```
┌────────────────────────────────┬────────────────────────────┐
│  .env / miljøvariabler         │  Secrets manager           │
│  (ok å ha i config)            │  (aldri i kode)            │
├────────────────────────────────┼────────────────────────────┤
│  ✓ NEXT_PUBLIC_API_URL         │  ✓ DATABASE_URL            │
│  ✓ LOG_LEVEL                   │  ✓ API-nøkler              │
│  ✓ FEATURE_FLAGS               │  ✓ Auth secrets            │
│  ✓ Portnummer                  │  ✓ Krypteringsnøkler       │
│  ✓ Miljø (dev/prod)            │  ✓ Tredjepartstokens       │
└────────────────────────────────┴────────────────────────────┘
```

**Verktøy-anbefalinger:**
| Verktøy | Best for | Pris | Kompleksitet |
|---------|----------|------|--------------|
| **Doppler** | Utviklervennlig, god CI/CD | Gratis til 5 brukere | Lav |
| **Infisical** | Open source, kan selvhostes | Gratis (selvhostet) | Middels |
| **Vercel/Netlify env** | Enkel hosting-integrasjon | Inkludert | Lav |
| **GitHub Secrets** | CI/CD workflows | Inkludert | Lav |

---

### 5. Supply chain-sikkerhet og pakkevalidering

**Verifiseringsrutine før installasjon:**
```bash
# Sjekk at pakken finnes og er legitim
npm view [pakkenavn]

# Se etter:
# - Opprettelsesdato (nylig = mistenkelig)
# - Antall nedlastinger (få = risiko)
# - Vedlikeholder (kjent person/organisasjon?)
# - Repository (peker til ekte repo?)
```

**Instruksjon:**
```
Sørg for at prosjektet bruker package-lock.json:
- Commit package-lock.json til Git
- Bruk "npm ci" i stedet for "npm install" i CI/CD
- Aldri slett lock-filen uten god grunn
```

**Sikkerhetssjekkrutine:**
```bash
# Sjekk for kjente sårbarheter
npm audit

# Automatisk fiks det som kan fikses
npm audit fix

# Se detaljert rapport
npm audit --json
```

**Verifikasjonstabell for AI-foreslåtte pakker:**
| Sjekk | Hvordan |
|-------|---------|
| Eksisterer pakken? | `npm view [pakke]` |
| Er navnet riktig stavet? | Sammenlign med offisiell dokumentasjon |
| Har den nok nedlastinger? | <1000/uke = vær skeptisk |
| Er den aktivt vedlikeholdt? | Sjekk siste commit-dato |
| Hvem står bak? | Kjent organisasjon = tryggere |

---

### 6. CI/CD med sikkerhetsskanning

**Instruksjon:**
```
Sett opp GitHub Actions for prosjektet med:
1. Lint og type-sjekking på hver push
2. Kjør tester automatisk
3. npm audit for dependency-sjekk
4. Secrets detection med trufflehog eller gitleaks
5. Deploy til Vercel/Netlify kun hvis alt passerer

Gi meg en komplett .github/workflows/ci.yml fil.
```

**Eksempel CI/CD-workflow:**
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

      - name: Run npm audit
        run: npm audit --audit-level=high

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
| Verktøy | Type | Pris |
|---------|------|------|
| **npm audit** | Dependency | Gratis |
| **Dependabot** | Dependency | Gratis (GitHub) |
| **Snyk** | Dependency + SAST | Gratis for open source |
| **GitGuardian** | Secrets detection | Gratis for utviklere |
| **TruffleHog** | Secrets detection | Gratis |

---

### BLOKK B: FØRSTE FUNGERENDE PROTOTYPE

> Bygg den første versjonen med autentisering, én fungerende happy path, og grunnleggende tester. Blokk A MÅ være ferdig.

### 7. Kjernefunksjonalitet med input-validering

**Instruksjon:**
```
Implementer [funksjon] med følgende validering:
- Felt X: påkrevd, type string, maks 100 tegn, kun bokstaver og mellomrom
- Felt Y: valgfritt, må være gyldig URL hvis oppgitt
- Felt Z: påkrevd, type number, mellom 1-1000

Bruk Zod for validering. Valider både i frontend (for UX)
og backend (for sikkerhet). Vis brukervennlige norske feilmeldinger.
Aldri stol på frontend-validering alene.
```

**Valideringssjekker:**
| Sjekk | Beskrivelse | Eksempel |
|-------|-------------|----------|
| **Type** | Er datatypen riktig? | Alder skal være tall |
| **Lengde** | Er lengden innenfor grenser? | Navn maks 100 tegn |
| **Format** | Er formatet korrekt? | E-post må ha @ |
| **Grenser** | Er verdien logisk? | Alder mellom 0-150 |
| **Sanitering** | Er farlige tegn håndtert? | Fjern/escape `<script>` |
| **Whitelist** | Er verdien tillatt? | Rolle må være "user" eller "admin" |

**Eksempel med Zod:**
```typescript
// lib/validations.ts
import { z } from 'zod';

const emailSchema = z.string()
  .email('Ugyldig e-postformat')
  .max(255, 'E-post kan ikke være lengre enn 255 tegn');

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

  const { email, password } = result.data;
}
```

---

### 8. API-sikkerhet og rate limiting

**Instruksjon:**
```
Implementer rate limiting for API-et med:
- Generelle endepunkter: 100 requests per minutt per IP
- Login-endepunkt: 5 forsøk per minutt per IP (brute force-beskyttelse)
- Sensitive endepunkter: 10 requests per minutt per bruker

Bruk upstash/ratelimit eller lignende bibliotek.
Returner HTTP 429 med Retry-After header ved overtramp.
```

**Eksempel på sikker API-route:**
```typescript
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

**Anbefalte rate limits:**
| Endepunkt-type | Limit | Grunn |
|----------------|-------|-------|
| Offentlige | 100/min/IP | Balanse mellom tilgjengelighet og beskyttelse |
| Autentiserte | 1000/min/bruker | Mer tillit til innloggede |
| Login | 5/min/IP | Brute force-beskyttelse |
| Passord-reset | 3/time/e-post | Forhindre spam |
| AI/kostbare | 10/min/bruker | Kostnadskontroll |

---

### 9. Autentisering implementert

**Instruksjon:**
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

**Anbefalte løsninger:**
| Tjeneste | Best for | Pris | Kompleksitet |
|----------|----------|------|--------------|
| **Supabase Auth** | MVP, full-stack | Gratis start | Lav |
| **Clerk** | God UX, sosial login | Gratis start | Lav |
| **Auth.js (NextAuth)** | Next.js-prosjekter | Gratis | Middels |
| **Auth0** | Enterprise | Gratis start | Middels |
| **Firebase Auth** | Mobile + web | Gratis start | Lav |

**Viktige sikkerhetsinnstillinger:**
| Innstilling | Anbefalt verdi |
|-------------|----------------|
| Sesjonsvarighet | 1-24 timer |
| Passordkrav | Min 8 tegn, blanding |
| Rate limiting | Maks 5 forsøk/min |
| MFA | Anbefalt for admin |

---

### 10. Happy path fungerer og er sikret

**Instruksjon:**
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

**Sikkerhetstester:**
| Test | Forventet resultat |
|------|-------------------|
| Hent egen ressurs | 200 OK, data returnert |
| Hent andres ressurs | 403 Forbidden |
| Hent uten innlogging | 401 Unauthorized |
| Hent ikke-eksisterende | 404 Not Found |

---

### 11. Grunnleggende tester

**Instruksjon:**
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

---

### 12. Verifisering av AI-generert kode

**Mal for sikker kode-generering:**
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

**Review-sjekkliste:**
```
┌─────────────────────────────────────────────────────────────┐
│              REVIEW AV AI-GENERERT KODE                      │
├─────────────────────────────────────────────────────────────┤
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
└─────────────────────────────────────────────────────────────┘
```

**Vanlige AI-feil å fikse:**
| Feil | Eksempel | Løsning |
|------|----------|---------|
| Hardkodede secrets | `const API_KEY = "abc123"` | Bruk miljøvariabler |
| Manglende validering | Direkte bruk av `req.body` | Valider med Zod |
| SQL injection | `query("SELECT * FROM users WHERE id=" + id)` | Bruk parameterisering |
| Ingen auth-sjekk | API uten sesjonssjekk | Legg til auth middleware |
| Console.log med data | `console.log(user.password)` | Fjern før deploy |

---

## DEL B: VIKTIGE ELEMENTER (🟡)

### 13. Feilhåndtering (sikker)

**Instruksjon:**
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
const publicErrors: Record<string, string> = {
  VALIDATION_ERROR: 'Vennligst sjekk at alle felt er fylt ut korrekt.',
  AUTH_ERROR: 'Feil e-post eller passord.',
  NOT_FOUND: 'Ressursen ble ikke funnet.',
  FORBIDDEN: 'Du har ikke tilgang til denne ressursen.',
  SERVER_ERROR: 'Noe gikk galt. Prøv igjen senere.',
};

export function handleError(error: unknown, errorCode: string) {
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

**ALDRI vis til brukeren:**
| Type | Hvorfor farlig |
|------|----------------|
| Stack traces | Avslører filstruktur |
| Database-feil | Avslører teknologi |
| Connection strings | Avslører credentials |
| Interne IP-er | Avslører nettverk |

---

### 14. Logging (uten sensitiv data)

**Instruksjon:**
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

**Hva som skal logges vs ikke:**
| ✅ Logg dette | ❌ Aldri logg dette |
|--------------|---------------------|
| Bruker-ID (ikke e-post) | Passord (selv hashet) |
| Tidspunkt for handling | API-nøkler/tokens |
| Type handling | Kredittkortnummer |
| Feilreferanser | Fullstendig request body |

---

### 15. Feature flags og kill switch

**Instruksjon:**
```
Sett opp et enkelt feature flag-system med:
1. Konfigurasjon via miljøvariabler
2. En funksjon isFeatureEnabled(flagName)
3. Støtte for default-verdier
4. Eksempler på bruk i både frontend og backend
```

**Enkel implementasjon:**
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

---

### 16. README med sikkerhetsinstruksjoner

**Instruksjon:**
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

**README-mal:**
```markdown
# [Prosjektnavn]

[Kort beskrivelse]

## Forutsetninger

- Node.js 20+
- npm/pnpm

## Kom i gang

### 1. Klon prosjektet
\`\`\`bash
git clone [repo-url]
cd [prosjekt]
\`\`\`

### 2. Installer avhengigheter
\`\`\`bash
npm install
\`\`\`

### 3. Sett opp miljøvariabler
\`\`\`bash
cp .env.example .env.local
\`\`\`
**⚠️ VIKTIG:** Aldri commit `.env.local`!

### 4. Start utviklingsserver
\`\`\`bash
npm run dev
\`\`\`

## Sikkerhet

- Alle hemmeligheter skal i `.env.local` (lokalt) eller hosting-miljøvariabler
- Aldri hardkod API-nøkler i koden
- Rapporter sikkerhetsproblemer til [security@example.com]
```

---

### 17. Personvern ved bruk av AI-tjenester

**Regler for AI-bruk:**
| ✅ Trygt å dele | ❌ Aldri del |
|-----------------|-------------|
| Generiske kodeeksempler | API-nøkler og secrets |
| Offentlig dokumentasjon | Persondata |
| Standardmønstre | Forretningskritisk logikk |
| Feilmeldinger (uten sensitive data) | Database-skjemaer med ekte data |

**Før du sender kode til AI:**
- Fjern alle hardkodede verdier og secrets
- Erstatt ekte data med placeholder-verdier
- Anonymiser eventuelle personopplysninger
- Vurder om forretningslogikken er sensitiv

---

### 18. Regulatoriske krav (GDPR)

**Instruksjon:**
```
Implementer GDPR-støtte for brukerdata:
1. Funksjon for å eksportere all brukerdata (data portability)
2. Funksjon for å slette all brukerdata (right to be forgotten)
3. Logging av samtykke (når og hva brukeren samtykket til)
4. Ikke lagre data lengre enn nødvendig
```

**GDPR-minimumskrav:**
| Krav | Implementasjon |
|------|----------------|
| Samtykke | Tydelig informasjon og aksept før datainnsamling |
| Rett til sletting | Funksjon for å slette all brukerdata |
| Dataminimering | Samle kun nødvendige data |
| Sikkerhet | Kryptering, tilgangskontroll |
| Personvernerklæring | Publisert og lett tilgjengelig |

---

## DEL C: ANBEFALTE ELEMENTER (🟢)

### 19. Dummy-data

**Instruksjon:**
```
Lag et seed-script som oppretter testdata med:
- 10 testbrukere med faker-genererte navn
- E-poster på formatet testbruker1@example.com
- Realistiske men fiktive data
- Norsk locale for faker (nb_NO)
```

**Reserverte domener (trygge å bruke):**
- `example.com`, `example.org`, `example.net`
- `test.com`
- `localhost`

---

### 20. Rollback-strategi

**For Git-basert rollback:**
```bash
# Finn forrige fungerende commit
git log --oneline

# Gå tilbake (lag ny commit, ikke skriv om historikk)
git revert HEAD
git push origin main
```

---

### 21. SBOM – Software Bill of Materials

**Generer SBOM i CI/CD:**
```yaml
# .github/workflows/sbom.yml
- name: Generate SBOM
  uses: anchore/sbom-action@v0
  with:
    format: cyclonedx-json
    output-file: sbom.json
```

---

### 22. Zero Trust-prinsipper

**Instruksjon:**
```
Implementer tilgangskontroll med minste privilegium-prinsippet:
- Definer roller (user, editor, admin)
- Hver rolle har kun nødvendige tilganger
- Sjekk tilgang på hvert API-kall
- Logg alle tilgangsforsøk (både godkjente og avviste)
```

---

## DEL D: PLATTFORMSPESIFIKKE INSTRUKSJONER

### Web-applikasjoner

**Instruksjon:**
```
Konfigurer sikkerhetsheaders for Next.js/web-app:
- Strict-Transport-Security (HSTS)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Content-Security-Policy (start med report-only)
```

### Mobile apper

**Instruksjon:**
```
Implementer [funksjon] for [iOS/Android/React Native] med:
- Sikker lagring av sensitive data (Keychain/EncryptedSharedPreferences)
- HTTPS med certificate pinning for kritiske endepunkter
- Input-validering på alle brukerdata
- Ingen sensitive data i logger
```

### Electron/Desktop

**Sikkerhetsinnstillinger:**
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

## LEVERANSER OG MÅLINGER

### Suksessmålinger
| Måling | Mål |
|--------|-----|
| Happy path fungerer | 100% |
| Sikkerhetstester passerer | 100% |
| npm audit | 0 high/critical |
| Secrets i kode | 0 |
| Lint-feil | 0 |
| Test-dekning (kritisk kode) | >50% |

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

**Dokumentversjon:** 2.0 (AI-versjon)
**Sist oppdatert:** Januar 2026
