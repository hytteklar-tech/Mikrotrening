# Arkitekturbeslutninger

> Dokumentasjon av viktige beslutninger tatt under design av agent-systemet

---

## Oversikt over beslutninger

| # | Beslutning | Resultat | Dato |
|---|------------|----------|------|
| 1 | Persona + Lean Canvas | Behold separat | 2026-01-31 |
| 2 | PCI-DSS-agent | Ikke nødvendig | 2026-01-31 |
| 3 | Ytelse + Lasttest | Behold separat | 2026-01-31 |
| 4 | Sikkerhets-hierarki | Behold nåværende | 2026-01-31 |
| 5 | GDPR + Tilgjengelighet plassering | Under KVALITETSSIKRINGS-agent | 2026-01-31 |

---

## Beslutning 1: PERSONA-ekspert + LEAN-CANVAS-ekspert

### Spørsmål
Skal vi slå sammen PERSONA-ekspert og LEAN-CANVAS-ekspert til én FORRETNINGS-ekspert?

### Vurdering

**Hva de gjør:**

| Agent | Fokus | Kompetanse |
|-------|-------|------------|
| PERSONA | Hvem er brukeren? | JTBD, brukerreiser, empati, psykologi |
| LEAN-CANVAS | Hvordan tjene penger? | Forretningsmodell, kostnader, kanaler, revenue |

**Fordeler ved å slå sammen:**
- Færre agenter, enklere system
- Naturlig flyt: Persona → verdiforslag → forretningsmodell
- Kontekst bevart mellom stegene

**Ulemper ved å slå sammen:**
- Bred kompetanse: Én agent må mestre både empati/psykologi OG økonomi/forretning
- Prompt-lengde: Mer kompleks prompt = lavere kvalitet på hver del
- Ulike tidspunkt: Persona trengs tidlig, forretningsmodell kan komme senere

### Beslutning: ✅ Behold separat

**Begrunnelse:** Dette er to distinkte disipliner. En god UX-researcher tenker annerledes enn en forretningsutvikler. Ved å holde dem separate får vi "ekspert-kvalitet" på begge områder.

---

## Beslutning 2: PCI-DSS-ekspert

### Spørsmål
Trenger vi en dedikert PCI-DSS-ekspert for betalingsløsninger?

### Vurdering

**Hva PCI-DSS dekker:**
- 12 krav med 300+ sider dokumentasjon
- Nettverkssikkerhet, kryptering, tilgangskontroll, overvåking

**Med Stripe/Klarna/Vipps:**

| Betalingsløsning | PCI-DSS nivå | Hva du må gjøre |
|------------------|--------------|-----------------|
| Stripe Checkout / Payment Links | SAQ A (enkleste) | Nesten ingenting |
| Stripe Elements | SAQ A-EP | Minimalt |
| Egen betalingsside | SAQ D (full compliance) | 300+ krav |

**Stripe håndterer for deg:**
- Kortdata berører aldri din server
- Kryptering, tokenisering, fraud detection
- PCI-sertifisering

**Ditt ansvar (dekkes av eksisterende agenter):**
- HTTPS ✅ (SIKKERHETS-agent)
- Ikke logg kortdata ✅ (HEMMELIGHETSSJEKK-ekspert)
- Hold biblioteker oppdatert ✅ (SUPPLY-CHAIN-ekspert)

### Beslutning: ✅ Ikke nødvendig

**Begrunnelse:** For vibe-coding-prosjekter anbefales Stripe/Payment Links som håndterer PCI-DSS for deg. Kun hvis du selv lagrer kortdata trengs dette - og da bør du uansett ha profesjonell hjelp.

---

## Beslutning 3: YTELSE-ekspert + LASTTEST-ekspert

### Spørsmål
Skal vi slå sammen YTELSE-ekspert og LASTTEST-ekspert til én YTELSE-OG-SKALERING-ekspert?

### Vurdering

**Hva de gjør:**

| Agent | Fokus | Verktøy |
|-------|-------|---------|
| YTELSE | Hvor rask er appen? | Lighthouse, Core Web Vitals, bundle size |
| LASTTEST | Hvor mange brukere tåler den? | k6, Artillery, JMeter |

**Fordeler ved å slå sammen:**
- Relatert domene: Begge handler om "er appen rask nok?"
- Naturlig progresjon: Først optimalisér, så test kapasitet
- Færre agenter

**Ulemper ved å slå sammen:**
- Ulik timing: Ytelse sjekkes kontinuerlig, lasttest før lansering
- Ulike verktøy: Lighthouse vs k6 - helt forskjellige
- Ulik ekspertise: Frontend-optimalisering vs. infrastruktur/backend

### Beslutning: ✅ Behold separat

**Begrunnelse:**
- YTELSE = frontend-fokus (bilder, JS, CSS, Core Web Vitals)
- LASTTEST = backend-fokus (database, API, servere, skalering)

Dette er to forskjellige spesialiteter. En frontend-utvikler og en DevOps-ingeniør tenker annerledes.

---

## Beslutning 4: Sikkerhets-hierarki

### Spørsmål
Skal vi slå sammen SIKKERHETS-agent (basis) med de spesialiserte sikkerhetsekspertene (OWASP, HEMMELIGHETSSJEKK, etc.)?

### Vurdering

**Nåværende struktur:**
```
SIKKERHETS-agent (BAS-004) - Generalist
├── OWASP-ekspert (EKS-015) - Web-sårbarheter
├── HEMMELIGHETSSJEKK-ekspert (EKS-008) - Secrets scanning
├── TRUSSELMODELLERINGS-ekspert (EKS-006) - STRIDE/DREAD
└── SUPPLY-CHAIN-ekspert (EKS-010) - Dependencies
```

**Fordeler ved hierarkiet:**
- Rask daglig sjekk: Basis-agenten gjør 80% av jobben raskt
- Dyp ekspertise: Spesialister kalles kun når nødvendig
- Skalerer: Kan legge til nye eksperter uten å endre basis

**Ulemper:**
- Overlapp mellom SIKKERHETS-agent og OWASP-ekspert
- Handoff-kostnad
- Flere agenter å vedlikeholde

### Beslutning: ✅ Behold hierarkiet

**Begrunnelse:**

Klargjøring av roller:

| Agent | Gjør | Gjør IKKE |
|-------|------|-----------|
| SIKKERHETS-agent | Rask sjekk, input-validering, auth-mønster, kaller eksperter | Full OWASP-test, git-historikk-scanning |
| OWASP-ekspert | Full OWASP Top 10, penetrasjonstesting | Daglig code review |
| HEMMELIGHETSSJEKK | Dypskanning av secrets, git-historikk | Generell sikkerhetsvurdering |

---

## Beslutning 5: GDPR og Tilgjengelighet plassering

### Spørsmål
Hører GDPR-ekspert og TILGJENGELIGHETS-ekspert under SIKKERHETS-agent?

### Vurdering

| Agent | Type | Under SIKKERHETS-agent? |
|-------|------|------------------------|
| GDPR-ekspert | Personvern/compliance | ❌ Nei - er lovkrav, ikke sikkerhet |
| TILGJENGELIGHETS-ekspert | Universell utforming | ❌ Nei - er UX/lovkrav, ikke sikkerhet |

**Sammenligning:**

| Domene | SIKKERHETS-agent | GDPR | Tilgjengelighet |
|--------|------------------|------|-----------------|
| Fokus | Beskytte mot angrep | Beskytte persondata | Inkludere alle brukere |
| Trussel | Hackere | Datatilsyn/bøter | Ekskludering/søksmål |
| Kompetanse | Pentesting, OWASP | Juss, personvern | UX, WCAG, a11y |

### Beslutning: ✅ Under KVALITETSSIKRINGS-agent

**Begrunnelse:** GDPR og Tilgjengelighet er **compliance**, ikke **sikkerhet**. De koordineres av KVALITETSSIKRINGS-agent sammen med andre "før lansering"-sjekker.

```
KVALITETSSIKRINGS-agent (PRO-006)
├── Sikkerhet → kaller OWASP, HEMMELIGHETSSJEKK
├── Personvern → kaller GDPR-ekspert
├── Tilgjengelighet → kaller TILGJENGELIGHETS-ekspert
└── Testing → kaller CROSS-BROWSER, LASTTEST
```

---

## Fremtidige beslutninger

Disse temaene kan kreve beslutning senere:

| Tema | Potensielt spørsmål |
|------|---------------------|
| UI/UX-utvidelse | Trenger vi DESIGN-SYSTEM-ekspert eller ANIMASJON-ekspert? |
| Enterprise-funksjoner | Når trenger vi PCI-DSS, SOC2, HIPAA-eksperter? |
| Konsolidering | Skal noen eksperter slås sammen etter erfaring? |

---

*Sist oppdatert: 2026-01-31*
