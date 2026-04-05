# Fase 2: Planlegg — Funksjoner, krav og sikkerhet (AI-Instruksjoner)

> **Formål:** Dette dokumentet inneholder alt AI trenger for å produsere konsistent, sikker kode basert på kravspesifikasjonen.

---

## 1. AI-kontekst og regler

AI-kontekstfilen er et dokument som deles med AI ved hver kodesesjon. Den inneholder alt AI trenger for å generere konsistent kode: teknologivalg, kodestandarder, navnekonvensjoner, og forbudte mønstre.

### AI-kontekstfil-struktur

```markdown
# AI-kontekst: [Prosjektnavn]

## Teknologistack (IKKE AVVIK)
- Frontend: Next.js 14 med App Router
- Styling: Tailwind CSS + shadcn/ui
- Database: PostgreSQL med Prisma
- Autentisering: NextAuth.js

## Kodestandarder
- TypeScript strict mode
- Norske kommentarer, engelsk kode
- Server Components som default

## Navnekonvensjoner
| Type | Konvensjon | Eksempel |
|------|------------|----------|
| Komponenter | PascalCase | UserProfile.tsx |
| Funksjoner | camelCase | getUserById |
| Database | snake_case | user_sessions |

## FORBUDTE MØNSTRE
- ❌ `any` type i TypeScript
- ❌ Inline styles
- ❌ console.log i produksjon
- ❌ Hardkodede secrets
```

---

## 2. Sikkerhetskrav som ALLTID gjelder

Du skal ALLTID implementere følgende sikkerhetsprinsipper:

1. **ALDRI** stol på input fra klienten - valider ALT server-side
2. **ALDRI** lagre passord i klartekst - bruk bcrypt med cost 12+
3. **ALDRI** vis tekniske feilmeldinger til brukere
4. **ALDRI** logg sensitive data (passord, tokens, personnummer)
5. **ALLTID** bruk parameteriserte database-spørringer
6. **ALLTID** sjekk at brukeren har tilgang til ressursen de ber om
7. **ALLTID** bruk HTTPS
8. **ALLTID** sett sikre cookie-flagg (HttpOnly, Secure, SameSite)

### Sikkerhetsnivåer

| Nivå | Beskrivelse | Når brukes det |
|------|-------------|----------------|
| **L1** | Standard sikkerhet | De fleste apper, lav-moderat risiko |
| **L2** | Sensitiv data | Personopplysninger, helse, finans |
| **L3** | Kritisk sikkerhet | Bank, offentlig sektor, medisinsk |

### Autentisering

| Krav-ID | Krav | L1 | L2 | L3 |
|---------|------|----|----|-----|
| SEC-A01 | Passord minimum 12 tegn med kompleksitet | 🔴 | 🔴 | 🔴 |
| SEC-A02 | Passord lagres som salted hash (bcrypt/argon2) | 🔴 | 🔴 | 🔴 |
| SEC-A03 | Brute-force beskyttelse (maks 5 forsøk, 15 min lockout) | 🔴 | 🔴 | 🔴 |
| SEC-A04 | Sikker sesjonshåndtering (HTTP-only cookies) | 🔴 | 🔴 | 🔴 |
| SEC-A05 | Sesjons-timeout ved inaktivitet | 🟡 | 🔴 | 🔴 |
| SEC-A06 | Tofaktorautentisering (2FA) | 🟢 | 🟡 | 🔴 |

### Autorisering

| Krav-ID | Krav | L1 | L2 | L3 |
|---------|------|----|----|-----|
| SEC-B01 | Rollebasert tilgangskontroll (RBAC) | 🔴 | 🔴 | 🔴 |
| SEC-B02 | Brukere ser kun egne data (ressurs-eierskap) | 🔴 | 🔴 | 🔴 |
| SEC-B03 | Minste privilegium-prinsipp | 🔴 | 🔴 | 🔴 |
| SEC-B04 | API-endepunkter krever autentisering | 🔴 | 🔴 | 🔴 |
| SEC-B05 | Admin-funksjoner har ekstra bekreftelse | 🟡 | 🔴 | 🔴 |

### Input-validering og datahåndtering

| Krav-ID | Krav | L1 | L2 | L3 |
|---------|------|----|----|-----|
| SEC-C01 | Server-side input-validering | 🔴 | 🔴 | 🔴 |
| SEC-C02 | Output-encoding for XSS-forebygging | 🔴 | 🔴 | 🔴 |
| SEC-C03 | Parameteriserte spørringer (SQL injection) | 🔴 | 🔴 | 🔴 |
| SEC-C04 | HTTPS alltid (TLS 1.2+) | 🔴 | 🔴 | 🔴 |
| SEC-C05 | Sensitiv data kryptert i database | 🟡 | 🔴 | 🔴 |

### Logging

| Krav-ID | Krav | L1 | L2 | L3 |
|---------|------|----|----|-----|
| SEC-D01 | Logg alle innlogginger (vellykket/feilet) | 🔴 | 🔴 | 🔴 |
| SEC-D02 | Logg tilgangsendringer og admin-handlinger | 🟡 | 🔴 | 🔴 |
| SEC-D03 | Logger inneholder ikke sensitive data | 🔴 | 🔴 | 🔴 |

### Rate Limiting

| Krav-ID | Krav | L1 | L2 | L3 |
|---------|------|----|----|-----|
| SEC-E01 | API rate limiting per bruker/IP | 🟡 | 🔴 | 🔴 |
| SEC-E02 | Innlogging rate limiting | 🔴 | 🔴 | 🔴 |
| SEC-E03 | Passord-reset rate limiting | 🔴 | 🔴 | 🔴 |

---

## 3. Hierarkisk modulregister

Vibekodere har rike visjoner med 20-30 moduler som hver inneholder 5-15 underfunksjoner. Funksjonslisten (F-001, F-002...) er flat og kan ikke fange denne hierarkiske dybden. Du skal derfor opprette et **modulregister**.

### Prosess for modulregister-utvinning

**Steg 1: AI-assistert moduldypgang**

Gå systematisk gjennom appen med brukeren. For HVER modul:

1. Be brukeren beskrive modulen så detaljert som mulig
2. Still oppfølgingsspørsmål for å gå i dybden:
   - "Hva skal skje når brukeren klikker [X]?"
   - "Hvordan skal dette se ut på mobil vs desktop?"
   - "Hva skal skje ved feil? F.eks. hvis brukeren prøver å [Y] uten å [Z]?"
   - "Er det noen begrensninger? Maks antall, filstørrelser, osv?"
   - "Kjenner du noen apper som gjør dette bra? Hva liker du med dem?"
   - "Skal dette integreres med andre moduler? Hvilke?"
3. Grupper relaterte funksjoner til moduler
4. Gi hver modul en ID (M-001, M-002, ...)
5. Bevar hele vikekoderens beskrivelse i per-modul spesifikasjonen — UENDRET

**Steg 2: Strukturer hierarkiet**

For hver modul:
1. Opprett `docs/moduler/M-XXX-[modulnavn].md` med mal fra `Kit CC/Agenter/maler/MODUL-SPEC-MAL.md`
2. Kopier vikekoderens komplette beskrivelse til "Brukerens visjon"-seksjonen — UENDRET
3. Bryt ned til underfunksjoner med akseptansekriterier
4. Identifiser avhengigheter til andre moduler

**Steg 3: Oppdater master-registeret**

Opprett/oppdater `docs/FASE-2/MODULREGISTER.md` med mal fra `Kit CC/Agenter/maler/MODULREGISTER-MAL.md`:
- Legg til modul i oversiktstabellen
- Oppdater avhengighetsdiagrammet
- Marker MVP-moduler
- Oppdater oppsummeringstall

### Kobling til funksjonslisten

Hver underfunksjon i modulregisteret mappes til en F-kode i funksjonslisten:

```
M-001: Feed-innlegg
  ├── F-005: Tekst og bilder i innlegg
  ├── F-006: Like-funksjon
  ├── F-007: Kommentarfelt
  ├── F-008: Deling av innlegg
  └── F-009: Linkforhåndsvisning
```

---

## 4. Persistent lagring av vibekoder-visjon

### KRITISK REGEL

Når vibekoder beskriver en modul i detalj i samtalen:

1. **UMIDDELBART** lagre beskrivelsen til `docs/moduler/M-XXX-[modulnavn].md`
2. Bevar HELE teksten i "Brukerens visjon"-seksjonen — ingenting forkortes eller fjernes
3. Bekreft tilbake til brukeren med filsti:

```
📋 MODUL: opprettet docs/moduler/M-001-feed-innlegg.md
```

### Når vibekoder legger til nye detaljer om en eksisterende modul:

1. Åpne eksisterende modulspesifikasjon
2. Legg til ny informasjon i riktig seksjon
3. Bekreft tilbake:

```
📋 MODUL: oppdatert docs/moduler/M-001-feed-innlegg.md
```

### Når vibekoder beskriver en helt ny modul midt i arbeidet:

1. Opprett ny modulspesifikasjon med neste ledige M-ID
2. Oppdater MODULREGISTER.md
3. Bekreft begge:

```
📋 MODUL: opprettet docs/moduler/M-015-fargepalett.md
📋 MODUL: oppdatert docs/FASE-2/MODULREGISTER.md (ny modul M-015 lagt til)
```

### Denne regelen gjelder i ALLE faser — ikke bare Fase 2

---

## 5. Maskinlesbare spesifikasjoner

Krav skal skrives i strukturert format som AI kan tolke presist.

### Eksempel på maskinlesbar spec

```yaml
endpoint: POST /api/auth/register

input:
  email:
    type: string
    format: email
    required: true
  password:
    type: string
    minLength: 12
    validation:
      - pattern: "[A-Z]"
        message: "Må inneholde stor bokstav"
      - pattern: "[a-z]"
        message: "Må inneholde liten bokstav"
      - pattern: "[0-9]"
        message: "Må inneholde tall"
      - pattern: "[!@#$%^&*]"
        message: "Må inneholde spesialtegn"

output:
  201: { userId: UUID, message: "Opprettet" }
  400: { code: "VALIDATION_ERROR", errors: [] }
  409: { code: "EMAIL_EXISTS", message: "E-post er allerede registrert" }

security:
  - rateLimit: 5/min per IP
  - validation: server-side
```

---

## 6. Oppgavenedbrytning

Store funksjoner skal deles inn i små deloppgaver som AI kan fullføre én om gangen.

### Format

```markdown
## Oppgave: [Funksjonsnavn]

### Deloppgave 1: [Navn] (estimert tid)
Filer: [hvilke filer som berøres]
- Konkret oppgave 1
- Konkret oppgave 2

Akseptkriterier:
- [ ] Kriterium 1
- [ ] Kriterium 2

### Deloppgave 2: [Navn] (estimert tid)
...
```

### Eksempel

```markdown
## Oppgave: Passord-reset

### Deloppgave 1: Database (15 min)
Filer: prisma/schema.prisma
- Legg til PasswordResetToken-modell med felter: id, token, userId, expiresAt, used

Akseptkriterier:
- [ ] Migrering kjører uten feil
- [ ] Token har relasjon til User

### Deloppgave 2: Token-service (30 min)
Filer: src/server/services/password-reset.ts
- Lag createPasswordResetToken(email): genererer token, hasher, lagrer
- Lag validatePasswordResetToken(token): sjekker gyldighet

Akseptkriterier:
- [ ] Token er kryptografisk tilfeldig (crypto.randomBytes)
- [ ] Lagret token er hashet (ikke plaintext)
- [ ] Utløpt token avvises
- [ ] Brukt token avvises

### Deloppgave 3: API-endepunkt (30 min)
Filer: src/app/api/auth/reset-password/route.ts
- POST /api/auth/reset-password/request: mottar e-post, sender reset-lenke
- POST /api/auth/reset-password/confirm: mottar token + nytt passord

Akseptkriterier:
- [ ] Rate limiting: maks 3 forespørsler per time per e-post
- [ ] Generisk respons (avslører ikke om e-post finnes)
- [ ] Validerer passordkrav
```

**Tommelfingelregel:** Maks 1 time per deloppgave.

---

## 7. Brukerhistorie-format

```
KRAV-ID: US-XXX
Prioritet: Must Have / Should Have / Could Have / Won't Have

Som [brukerrolle]
vil jeg [handling/funksjon]
slik at [mål/verdi]

Akseptkriterier:
- Gitt [forutsetning], når [handling], så [resultat]
- Gitt [forutsetning], når [handling], så [resultat]

Notater:
- [Tekniske notater, avklaringer, begrensninger]
```

---

## 8. Feilmeldinger

### Prinsipper

| ✅ Gjør | ❌ Ikke gjør |
|---------|-------------|
| Vær spesifikk om hva som er feil | Vis tekniske detaljer |
| Forklar hva brukeren kan gjøre | Vis stack traces |
| Bruk vanlig språk | Bruk teknisk sjargong |
| Gi mulighet til å prøve igjen | La brukeren sitte fast |
| Logg detaljer server-side | Vis database-feil til bruker |

### Sikkerhetshensyn

| Situasjon | ❌ Usikker | ✅ Sikker |
|-----------|-----------|----------|
| Feil innlogging | "Feil passord for ola@example.com" | "Feil e-post eller passord" |
| Bruker finnes ikke | "Ingen bruker med denne e-posten" | "Feil e-post eller passord" |
| Passord-reset | "E-post sendt til ola@example.com" | "Hvis e-posten er registrert, vil du motta en lenke" |

---

## 9. Leveranser AI skal produsere

### Kravdokument (PRD)
- [ ] Alle brukerhistorier med akseptkriterier
- [ ] Sikkerhetskrav med nivå (L1/L2/L3)
- [ ] Prioritert funksjonsliste (MoSCoW)
- [ ] MVP-definisjon med suksesskriterier
- [ ] Brukerflyter (happy + unhappy path)
- [ ] Edge cases og feilhåndtering
- [ ] Ikke-funksjonelle krav
- [ ] Datamodell

### AI-kontekstfil
- [ ] Teknologistack
- [ ] Kodestandarder
- [ ] Navnekonvensjoner
- [ ] Forbudte mønstre
- [ ] Sikkerhetsprinsipper

### Maskinlesbare specs
- [ ] API-spesifikasjoner (YAML/JSON)
- [ ] Komponent-spesifikasjoner (valgfritt)

### Modulregister
- [ ] `docs/FASE-2/MODULREGISTER.md` — Master-register over alle moduler
- [ ] `docs/moduler/M-*.md` — Per-modul spesifikasjoner (én fil per modul)
- [ ] Alle moduler har underfunksjoner med akseptansekriterier
- [ ] Avhengigheter mellom moduler kartlagt
- [ ] MVP-moduler markert

### Oppgavenedbrytning
- [ ] Første sprint/iterasjon planlagt
- [ ] Deloppgaver definert med akseptkriterier

---

## 10. Spec-validering

Før utvikling, valider specs:

```
Gitt denne spesifikasjonen, identifiser:
1. Manglende informasjon
2. Tvetydige krav
3. Potensielle sikkerhetshull
4. Inkonsistens mellom seksjoner
5. Edge cases som ikke er dekket
```

---

## 11. OWASP Top 10 - Vanligste sårbarheter

| # | Sårbarhet | Hvordan unngå |
|---|-----------|---------------|
| 1 | Broken Access Control | Sjekk tilgang på hver forespørsel |
| 2 | Cryptographic Failures | Bruk moderne kryptering, HTTPS |
| 3 | Injection | Valider og sanitér all input |
| 4 | Insecure Design | Tenk sikkerhet fra starten |
| 5 | Security Misconfiguration | Følg beste praksis |

---

**Slutt på AI-instruksjoner for Fase 2**
