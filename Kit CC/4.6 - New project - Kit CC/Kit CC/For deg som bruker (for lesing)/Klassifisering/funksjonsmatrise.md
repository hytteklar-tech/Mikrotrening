# Funksjonsmatrise

> Hver agent har en funksjonsmatrise som viser hvilke funksjoner som er aktive ved hvert intensitetsnivå, samt teknologistakk-indikatorer for avhengigheter.

## Hva gjør den?

Funksjonsmatrisen er den konkrete oversikten over hvilke oppgaver, deliverables og funksjoner som er aktive for hver kombinasjon av intensitetsnivå og fase. Den er den "detaljerte meny" som fase-agenter bruker når de planlegger arbeid.

Hver agent har en matrise som viser:

1. **Funksjonsnavn** — Hva oppgaven heter
2. **Intensitetsnivå** — Hvilke nivåer (Enkelt-Lite-Vanlig-Viktig-Kritisk) inkluderer denne
3. **MÅ/BØR/KAN** — Prioritet ved det nivået
4. **Stack-indikator** — Teknologiavhengighet:
   - ⚪ Agnostisk (fungerer med alle stackvalg)
   - 🟢 Supabase-spesifikk
   - 🟣 Vercel-spesifikk
   - 🔵 Enterprise (AWS/GCP/Azure)
5. **Estimat** — Omtrentlig tid/innsats

## Hvorfor er det nyttig?

- **Kjappere planlegging** — Fase-agenten ser på matrisen i stedet for å måtte resonnere ut fra klassifisering
- **Stack-valg påvirker planen** — Hvis bruker velger Vercel, aktiveres Vercel-spesifikke oppgaver; hvis AWS, andre oppgaver
- **Transparans** — Bruker ser nøyaktig hvilke oppgaver som venter, basert på deres klassifisering
- **Rask oppgradering** — Når reklassifisering skjer, kan agenten bare hoppe til nytt nivå i matrisen
- **Reduserer feil** — Agenten "glemmer" ikke oppgaver — de er alle i matrisen

## Hvordan fungerer det?

**Matrise-format (eksempel fra MVP-agent fase 4):**

| Funksjon | Enkelt | Lite | Vanlig | Viktig | Kritisk | Stack | Estimat |
|----------|--------|------|--------|--------|---------|-------|---------|
| Prosjekt-setup (git + package manager) | MÅ | MÅ | MÅ | MÅ | MÅ | ⚪ | 1 time |
| Database-skjema (initial) | MÅ | MÅ | MÅ | MÅ | MÅ | 🟢🔵 | 2 timer |
| API-setup (REST eller GraphQL) | KAN | BØR | MÅ | MÅ | MÅ | ⚪ | 2-4 timer |
| Autentisering (basis) | BØR | MÅ | MÅ | MÅ | MÅ | 🟢 | 2 timer |
| Autentisering (2FA) | KAN | KAN | BØR | MÅ | MÅ | 🟢 | 3 timer |
| Første API-endpoint | MÅ | MÅ | MÅ | MÅ | MÅ | ⚪ | 1-2 timer |
| Error-handling framework | KAN | BØR | BØR | MÅ | MÅ | ⚪ | 2 timer |
| Logging-setup | KAN | KAN | BØR | MÅ | MÅ | 🔵 | 1 time |
| Testing-framework | KAN | KAN | BØR | MÅ | MÅ | ⚪ | 1-2 timer |
| First test | KAN | KAN | BØR | MÅ | MÅ | ⚪ | 1 time |
| Environment-variables | BØR | MÅ | MÅ | MÅ | MÅ | ⚪ | 30 min |
| Dev-server setup | MÅ | MÅ | MÅ | MÅ | MÅ | 🟣🔵 | 1 time |
| Database-migrering | KAN | BØR | MÅ | MÅ | MÅ | 🟢🔵 | 1-2 timer |

**Stack-indikatorer forklart:**

- **⚪ Agnostisk** — Samme oppgave uavhengig av database/deploy-valg. Eksempel: "Prosjekt-setup"
- **🟢 Supabase** — Spesifikk for Supabase-databasen. Eksempel: "Row-level security (RLS) setup"
- **🟣 Vercel** — Spesifikk for Vercel-deployment. Eksempel: "Vercel environment variables"
- **🔵 Enterprise** — For AWS/GCP/Azure-stack. Eksempel: "AWS RDS provisioning", "Cloud Run deployment"

**Hvordan agenter bruker matrisen:**

1. Fase-agenten leser `classification.intensityLevel` fra PROJECT-STATE.json
2. Slår opp nivå i funksjonsmatrisen
3. Filterer funksjonene som er MÅ for det nivået
4. Organiserer arbeidet, starter med MÅ-funksjonene
5. Presenterer BØR-funksjoner som anbefalinger ("Skal jeg gjøre X også?")
6. Nevner KAN-funksjoner bare hvis bruker spør om mer

## Eksempel

**Scenario: ENKELT HOBBYPROSJEKT går gjennom fase 4 (MVP)**

Agenten leser matrisen og ser denne liste for nivå "Enkelt":

Obligatorisk (MÅ):
1. Prosjekt-setup
2. Database-skjema (initial)
3. Første API-endpoint
4. Dev-server setup
5. Environment-variables

Anbefalt (BØR):
- Autentisering (basis)

Valgfritt (KAN):
- API setup (GraphQL)
- Error-handling framework
- Testing-framework
- Logging

Agenten: "OK, jeg skal gjøre 5 obligatoriske oppgaver. Skal jeg også sette opp autentisering nå, eller venter vi til fase 5?"

---

**Scenario: Samme bruker oppgraderes til VANLIG APP-PROSJEKT (legger til betalinger)**

Matrisen oppdateres. Nå er listen:

Obligatorisk (MÅ):
1. Prosjekt-setup ✅ (allerede gjort)
2. Database-skjema ✅ (allerede gjort)
3. API-setup (REST) ← NY: Må gjøre
4. Autentisering (basis) ← Oppgradert fra BØR til MÅ
5. Første API-endpoint ✅ (allerede gjort)
6. Error-handling framework ← NY
7. Logging-setup ← Oppgradert fra KAN til BØR
8. Testing-framework ← Oppgradert fra KAN til BØR
9. Dev-server setup ✅ (allerede gjort)
10. Database-migrering

Agenten: "Oppgraderingen betyr 5 nye oppgaver. Noen er migrert fra BØR til MÅ. Vi må gjøre disse før faseovergang til fase 5."

## Relaterte features

- `intensitetsnivaaer.md` — De 5 nivåene
- `maa-boer-kan.md` — Prioriteringssystemet (MÅ/BØR/KAN)
- `kontinuerlig-reklassifisering.md` — Hvordan nivåer oppgraderes (og matrise oppdateres)

---
*Definert i: KLASSIFISERING-METADATA-SYSTEM.md, alle fase-agent-filer*
*Lagt til: 2026-02-17*
*Kategori: Klassifisering*
