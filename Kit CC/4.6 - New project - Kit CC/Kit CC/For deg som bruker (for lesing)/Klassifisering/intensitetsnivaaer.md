# Intensitetsnivåer

> Kit CC klassifiserer alle prosjekter i 5 intensitetsnivåer basert på 7 dimensjoner, som bestemmer hvilke funksjoner som er obligatoriske, anbefalte eller valgfrie.

## Hva gjør den?

Intensitetsnivåer er Kit CC's måte å tilpasse prosessen til prosjektets virkelighet. Et enkelt hobbyprosjekt trenger ikke samme sikkerhetskontroller, dokumentasjon eller testdekning som et kritisk banksystem. Systemet scorer automatisk prosjektet på 7 dimensjoner og plasserer det i ett av 5 nivåer.

De 5 nivåene er:
1. **Enkelt hobbyprosjekt** (7-10 poeng) — Liten, personal, læring, prototyper
2. **Lite oversiktlig prosjekt** (11-14 poeng) — Små team, interne verktøy, begrenset brukergruppe
3. **Vanlig app-prosjekt** (15-18 poeng) — Kundevendte apper, moderate krav, standard infrastruktur
4. **Viktig prosjekt med sensitive data** (19-23 poeng) — Persondata, betalinger, kritisk for virksomheten
5. **Stort kritisk system** (24-28 poeng) — Infrastruktur, tusenvis av brukere, regulering, høy tilgjengelighet

## Hvorfor er det nyttig?

Uten tilpasning ville prosessen enten være for tung for små prosjekter eller for lett for kritiske systemer. Intensitetsnivåer lar Kit CC:

- **Spare tid** — Hobbyprosjekter hopper over sikkerhetskontroller de ikke trenger
- **Sikre kvalitet** — Kritiske systemer får ekstra oppmerksomhet på test og sikkerhet
- **Anbefale riktig stackvalg** — Et liten prosjekt får Supabase + Vercel (enkelt), et kritisk får Enterprise-alternativer
- **Dimensionere dokumentasjon** — Hobbyprosjekter får minimal docs, kritiske systemer får fullt arkitektur-dokument
- **Veilede bruker** — System-faser tilpasses, oppgaver prioriteres anderledes

## Hvordan fungerer det?

Klassifiseringen skjer ved oppstart via AUTO-CLASSIFIER. Systemet stiller 5-8 spørsmål (progressiv avsløring):

**Dimensjon 1: Prosjektstørrelse**
- Hvor mange funksjoner har prosjektet? (1-3 enkel → 20+ kompleks)

**Dimensjon 2: Brukertype**
- Er det internt (team) eller kundevendt (publikum)?

**Dimensjon 3: Datatyper**
- Behandles persondata, finansdata, eller sensitiv forretningsinformasjon?

**Dimensjon 4: Brukerskala**
- Hvor mange aktive brukere på samme tid? (10 vs. 10 000)

**Dimensjon 5: Nedetidstoleranse**
- Hvor er det alvorlig hvis systemet er nede? (Timer vs. minutter)

**Dimensjon 6: Regulatoriske krav**
- Er det GDPR, PCI-DSS, HIPAA, eller liknende?

**Dimensjon 7: Integrasjoner**
- Kreves integrasjoner med kritisk tredjepars-infrastruktur?

Basert på svarene scorer systemet prosjektet (7-28 poeng) og plasserer det i ett av 5 nivåer. Ved hver faseovergang kjøres en mini-klassifisering (se `kontinuerlig-reklassifisering.md`) som sjekker om prosjektet bør oppgraderes.

## Eksempel

**Bruker bygger en "Hjemmesidegenerator for små bedrifter":**
- 8 funksjoner (skjema, innlegg, brukere) → 2 poeng
- Kundevendt, små bedrifter → 3 poeng
- Navn, e-post (GDPR-relevant) → 3 poeng
- 50-200 aktive brukere per bedrift → 2 poeng
- Nedetid er irriterende men ikke kritisk → 1 poeng
- GDPR men ikke PCI-DSS → 2 poeng
- Integrasjoner: E-postleverandør, analytics → 2 poeng
- **Total: 15 poeng → VANLIG APP-PROSJEKT**

Resultat: Standard sikkerhetskontroller, kundevendt dokumentasjon, automatisert testing, Supabase + Vercel stack, 5 faser fullstendig.

**Kontrast: Bruker bygger en "Kaffe-tidskjema for sitt eget leilighetsblokk":**
- 3 funksjoner → 1 poeng
- Internt (10 naboer) → 1 poeng
- Ingen sensitiv data → 0 poeng
- 10 aktive brukere → 1 poeng
- Nedetid: Ikke kritisk → 0 poeng
- Ingen regulering → 0 poeng
- Ingen integrasjoner → 0 poeng
- **Total: 3 poeng → (under minimumsscore, settes til 7 = ENKELT HOBBYPROSJEKT)**

Resultat: Minimal sikkerhetskontroll, ingen dokumentasjon, manuell testing, enkle stack-anbefalinger, 3 faser (gjennom rask).

## Relaterte features

- `kontinuerlig-reklassifisering.md` — Mini-klassifisering ved faseoverganger
- `maa-boer-kan.md` — Hvordan nivåer påvirker funksjoner (MÅ/BØR/KAN)
- `funksjonsmatrise.md` — Detaljert oversikt over funksjonene per nivå

---
*Definert i: KLASSIFISERING-METADATA-SYSTEM.md, agent-AUTO-CLASSIFIER.md*
*Lagt til: 2026-02-17*
*Kategori: Klassifisering*
