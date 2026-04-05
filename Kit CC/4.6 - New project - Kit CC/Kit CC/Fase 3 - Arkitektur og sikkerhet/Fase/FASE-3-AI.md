# Fase 3: Arkitektur og sikkerhet — Hvordan bygges det trygt? (AI-Instruksjoner)

> **For:** AI-assistent (Claude, ChatGPT, etc.)
> **Formål:** Tekniske krav, maler, sjekklister og regler for fase 3

---

## KRITISKE SIKKERHETSREGLER

### AI-generert kode - Obligatoriske tiltak

**Fakta:**
- 45% av AI-generert kode inneholder sikkerhetssårbarheter
- 86% feilrate mot XSS, 88% mot Log Injection
- AI optimerer for "kode som fungerer", ikke "kode som er sikker"

**ALDRI:**
- Bygg egen autentisering fra scratch
- Generer krypteringsalgoritmer
- Hardkod secrets i koden
- Stol blindt på AI-kode for sikkerhetskritiske funksjoner

**ALLTID:**
- Bruk etablerte biblioteker for auth, krypto, validering
- Parameteriser alle databasespørringer
- Valider all input på server-side
- Kjør SAST/SCA-skanning

### Sikkerhetsskanning - Prioritert

| Prioritet | Type | Verktøy | Når |
|-----------|------|---------|-----|
| 🔴 1 | Secret scanning | Gitleaks | Pre-commit |
| 🔴 2 | Dependency scan | Snyk, Dependabot | Build |
| 🟡 3 | SAST | Semgrep | Build |
| 🟢 4 | DAST | OWASP ZAP | Post-deploy |

---

## TECH STACK ANBEFALINGER

### Webapp/SPA
```
Frontend: Next.js 14+ (React)
Backend: Supabase eller Firebase
Hosting: Vercel eller Netlify
Auth: Supabase Auth / Clerk / Auth0
Styling: Tailwind CSS
```

### iOS
```
UI: SwiftUI
Arkitektur: MVVM
Lagring: SwiftData / Core Data
Sensitive data: Keychain
```

### Android
```
UI: Jetpack Compose
Arkitektur: MVVM
Database: Room
DI: Hilt
Sensitive data: Android Keystore
```

### Chrome Extension (Manifest V3)
```
Service Worker (erstatter background pages)
Content Scripts for DOM
Popup + Options pages
KRAV: Minimal permissions, streng CSP
```

### Beslutningstre
```
Trenger UI?
  NEI → Script/CLI → Python/Node.js
  JA → Hvilken plattform?
    Web → Next.js + Supabase + Vercel
    iOS → SwiftUI + Supabase
    Android → Jetpack Compose + Firebase
    Begge mobil → React Native + Supabase
    Desktop → Tauri (liten) / Electron (kompleks)
    Chrome → TypeScript + Manifest V3
```

---

## PROSJEKTSTRUKTURER

### Next.js / React
```
/src
├── /app              # App Router (sider)
│   ├── /api          # API-ruter
│   ├── /(auth)       # Autentiserte sider
│   └── page.tsx
├── /components
│   ├── /ui           # Grunnleggende
│   └── /features     # Funksjonsspesifikke
├── /lib
│   ├── /auth
│   ├── /db
│   └── /utils
├── /hooks
└── /types
/public
.env.local            # ALDRI commit!
.env.example          # SKAL committes
```

### iOS (SwiftUI)
```
/MyApp
├── /App
│   └── MyAppApp.swift
├── /Views
│   ├── /Screens
│   └── /Components
├── /ViewModels
├── /Models
├── /Services
└── /Resources
/MyAppTests
/MyAppUITests
```

### Chrome Extension
```
/src
├── manifest.json     # V3!
├── /background
│   └── service-worker.js
├── /content
│   └── content-script.js
├── /popup
│   ├── popup.html
│   └── popup.js
├── /lib
└── /assets
/tests
```

---

## STRIDE TRUSSELANALYSE

For hver komponent/funksjon, analyser:

| Kategori | Sjekk | Tiltak |
|----------|-------|--------|
| **S**poofing | Kan noen late som de er en annen? | MFA, sikre sessions |
| **T**ampering | Kan noen endre data de ikke burde? | Input-validering, parameteriserte queries |
| **R**epudiation | Kan vi bevise hvem som gjorde hva? | Logging med bruker-ID og tid |
| **I**nfo Disclosure | Kan sensitiv data lekke? | HTTPS, kryptering, minimal data i respons |
| **D**enial of Service | Kan noen gjøre systemet utilgjengelig? | Rate limiting, timeout |
| **E**levation | Kan noen få tilgang de ikke skal ha? | RBAC, sjekk på HVER operasjon |

### DREAD Risikorangering
```
Score = (Damage + Reproducibility + Exploitability + Affected + Discoverability) / 5

1-3:  Lav    → Fiks når tid
4-6:  Medium → Fiks før lansering
7-10: Høy    → Fiks UMIDDELBART
```

---

## AUTENTISERING & AUTORISERING

### Godkjente auth-løsninger
| Tjeneste | Bruk |
|----------|------|
| Supabase Auth | Supabase-prosjekter |
| Firebase Auth | Firebase-prosjekter |
| Clerk | React/Next.js |
| Auth0 | Større prosjekter |
| NextAuth.js | Selvhostet Next.js |

### Session-krav
```
- httpOnly cookies
- secure flag (kun HTTPS)
- SameSite=Strict/Lax
- Kort varighet (15-60 min for sensitiv app)
- Refresh token med rotasjon
- Invalider ved passordendring
```

### RBAC-sjekkliste
```
- [ ] Roller definert (Admin, Moderator, User, Guest)
- [ ] Rettighetsmatrise dokumentert
- [ ] Sjekk på HVER API-forespørsel (BACKEND!)
- [ ] Sjekk at bruker eier ressursen
- [ ] Logg tilgangsnektelser
```

---

## INPUT-VALIDERING

### Biblioteker
| Plattform | Bibliotek |
|-----------|-----------|
| Node.js | Zod, Joi, Yup |
| Python | Pydantic |
| Swift | Codable + custom |
| Kotlin | kotlinx.serialization |

### Per felt
```
- [ ] Definert datatype
- [ ] Maks lengde
- [ ] Whitelist tegn/verdier
- [ ] Format-validering (regex)
- [ ] Validering på BACKEND (ikke bare frontend)
```

---

## API-SIKKERHET

### Rate limiting
| Endepunkt | Grense |
|-----------|--------|
| Innlogging | 5/15min |
| Passord-reset | 3/time |
| Standard API | 100-1000/min |
| Søk | 30/min |
| Filopplasting | 10/min |

### Sjekkliste
```
- [ ] Auth på alle ikke-offentlige endepunkter
- [ ] Autorisering (bruker har tilgang)
- [ ] Rate limiting
- [ ] Input-validering
- [ ] Output-filtrering (ikke mer enn nødvendig)
- [ ] CORS begrenset
- [ ] Ingen intern info i feilmeldinger
```

---

## SECRETS MANAGEMENT

**ALDRI:**
- Hardkode i kode
- Commit til git
- Logg secrets
- Del via e-post/Slack
- Samme secret i dev/prod

**ALLTID:**
- Bruk miljøvariabler
- Roter regelmessig
- Forskjellige per miljø
- Need-to-know tilgang

**Verktøy:**
- Enkel: Vercel/Netlify env variables
- Medium: Doppler, Infisical
- Enterprise: AWS Secrets Manager, HashiCorp Vault

---

## CI/CD PIPELINE

```
Push → Secret Scan → Build → Test → SAST → SCA → Deploy
```

### GitHub Actions eksempel
```yaml
name: Security
on: [push, pull_request]
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Gitleaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - name: Trivy
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          severity: 'CRITICAL,HIGH'
```

---

## MALER

### SPEC.md
```markdown
# SPEC.md - [Prosjektnavn]

## Prosjektbeskrivelse
[1-2 setninger]

## Tech Stack
- Frontend: [Tech]
- Backend: [Tech]
- Database: [Tech]
- Auth: [Tech]
- Hosting: [Tech]

## Hovedfunksjoner
1. [Funksjon]
2. [Funksjon]

## Datamodell
- User: id, email, name, role
- [Entity]: [felt]

## API-endepunkter
- GET /api/[resource] - [beskrivelse]
- POST /api/[resource] - [beskrivelse]

## Sikkerhetskrav
- Autentisering: [metode]
- Autorisering: [roller]
- Input-validering: [bibliotek]

## Prosjektstruktur
/src
  /app - Next.js app router
  /components - React komponenter
  /lib - Hjelpefunksjoner

## Konvensjoner
- Filnavn: kebab-case
- Komponenter: PascalCase
- Funksjoner: camelCase

## Viktige regler
1. Aldri hardkode secrets
2. Alltid valider input på server
3. Bruk TypeScript strict mode
```

### ADR (Arkitekturbeslutningslogg)
```markdown
# ADR-[NNN]: [Tittel]

## Status
[Foreslått | Godkjent | Avvist | Erstattet]

## Kontekst
[Problemet som må løses]

## Beslutning
[Hva vi bestemte]

## Alternativer vurdert
### Alternativ 1: [Navn]
- Fordeler: [Liste]
- Ulemper: [Liste]

## Konsekvenser
### Positive
- [Konsekvens]
### Negative
- [Konsekvens]

---
Dato: [YYYY-MM-DD]
```

### Trusselmodell
```markdown
# Trusselmodell: [Prosjektnavn]

## Dokumentinfo
| Felt | Verdi |
|------|-------|
| Versjon | 1.0 |
| Dato | [YYYY-MM-DD] |
| Metode | STRIDE + DREAD |

## Assets
| Asset | Kritikalitet |
|-------|--------------|
| Brukerdata | Høy |
| Passord-hasher | Kritisk |

## STRIDE-analyse

### S - Spoofing
| ID | Trussel | DREAD | Tiltak | Status |
|----|---------|-------|--------|--------|
| S1 | [Trussel] | [Score] | [Tiltak] | [Status] |

[Gjenta for T, R, I, D, E]

## Handlingsplan
| Prioritet | ID | Tiltak | Ansvarlig | Frist |
|-----------|----|--------|-----------|-------|
| 1 | [ID] | [Tiltak] | [Hvem] | [Når] |
```

### TDD (Teknisk Design Dokument)
```markdown
# TDD: [Prosjektnavn]

## Dokumentinfo
| Felt | Verdi |
|------|-------|
| Versjon | 1.0 |
| Dato | [YYYY-MM-DD] |
| Status | [Utkast/Godkjent] |

## Sammendrag
[2-3 setninger]

## Tech Stack
| Lag | Teknologi | Versjon | Begrunnelse |
|-----|-----------|---------|-------------|
| Frontend | [Tech] | [Ver] | [Hvorfor] |
| Backend | [Tech] | [Ver] | [Hvorfor] |

## Systemarkitektur
[ASCII-diagram]

## Database-design
### users
| Felt | Type | Beskrivelse |
|------|------|-------------|
| id | UUID | Primærnøkkel |

## API-design
| Metode | Endepunkt | Beskrivelse | Auth |
|--------|-----------|-------------|------|
| GET | /api/users | Hent brukere | Admin |

## Sikkerhet
Se THREAT-MODEL.md
```

---

## GDPR SJEKKLISTE

```
### Datainnsamling
- [ ] Kun nødvendig data (dataminimering)
- [ ] Lovlig grunnlag for hver datatype
- [ ] Formål tydelig definert

### Brukerrettigheter
- [ ] Rett til innsyn
- [ ] Rett til sletting (all data)
- [ ] Rett til portabilitet (eksport)
- [ ] Rett til retting

### Samtykke
- [ ] Separat samtykke per formål
- [ ] Like lett å trekke tilbake
- [ ] Ingen forhåndsavkryssede bokser
```

---

## LOGGING

**ALDRI logg:**
- Passord
- Kredittkortinfo
- API-nøkler
- Personnummer
- Sensitive personopplysninger

**ALLTID logg:**
- Innlogging/utlogging (bruker-ID, tid)
- Autorisasjonsnektelser
- Kritiske operasjoner
- Feil (uten sensitiv data)

---

## ORDLISTE

| Begrep | Forklaring |
|--------|------------|
| API | Interface for systemkommunikasjon |
| Auth | Autentisering - bekrefte identitet |
| CSRF | Angrep som lurer bruker til handlinger |
| DREAD | Metode for trusselrangering |
| GDPR | EUs personvernlov |
| MFA/2FA | Multi-faktor autentisering |
| RBAC | Tilgang basert på rolle |
| SAST | Statisk kodeanalyse |
| SCA | Skanning av avhengigheter |
| STRIDE | Metode for trusselidentifisering |
| XSS | Injisert JavaScript-angrep |

---

## KOMPLETT SJEKKLISTE

```
## AI-sikkerhet
- [ ] SAST-skanning konfigurert
- [ ] Secret-skanning konfigurert
- [ ] Manuell review av sikkerhetskritisk kode

## Tech Stack
- [ ] Valgt og dokumentert
- [ ] Begrunnelse dokumentert

## Arkitektur
- [ ] Diagram laget
- [ ] Prosjektstruktur definert
- [ ] Minst én ADR

## Trusselmodellering
- [ ] STRIDE gjennomført
- [ ] DREAD rangering
- [ ] Tiltak for høy-risiko

## Sikkerhet
- [ ] Auth-løsning valgt (etablert!)
- [ ] RBAC definert
- [ ] Input-validering strategi
- [ ] Secrets management plan

## DevSecOps
- [ ] CI/CD konfigurert
- [ ] Sikkerhetsskanning i pipeline
- [ ] .gitignore inkluderer .env

## Leveranser
- [ ] TDD.md
- [ ] THREAT-MODEL.md
- [ ] SPEC.md
- [ ] ADR
```

---

*Versjon 1.0 - Januar 2026*
