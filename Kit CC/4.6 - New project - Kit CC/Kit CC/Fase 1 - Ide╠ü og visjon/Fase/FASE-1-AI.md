# Fase 1: Idé og visjon — Hva skal du bygge? (AI-Instruksjoner)

> **Denne filen er for AI-agenter.** For forklaringer, eksempler og maler, se READ-FASE-1-GUIDE.md

---

## 1. Prosjektklassifisering

**FØRSTE HANDLING:** Still disse spørsmålene til prosjektleder før du starter noe arbeid.

### Klassifiseringsspørsmål

| # | Spørsmål | Alternativer |
|---|----------|--------------|
| K1 | Hvem skal bruke produktet? | A) Kun meg/teamet internt, B) Ansatte i organisasjonen, C) Eksterne kunder/brukere |
| K2 | Hvor mange brukere forventes? | A) <10, B) 10-100, C) 100-1000, D) >1000 |
| K3 | Håndterer systemet sensitiv data? | A) Nei, B) Ja - intern forretningsdata, C) Ja - persondata (GDPR), D) Ja - helse/finans |
| K4 | Er dette en MVP/prototype eller ferdig produkt? | A) MVP/prototype, B) Ferdig produkt |
| K5 | Har du tilgang til teknisk validator? | A) Ja, B) Nei, men kan skaffe, C) Nei |

### Klassifiseringsmatrise

**Basert på svarene, bestem prosjekttype:**

| Hvis... | → Prosjekttype |
|---------|----------------|
| K1=A + K2=A/B + K3=A | **LITE INTERNT** |
| K1=B + K2=B/C + K3=A/B | **INTERNT MED DATA** |
| K1=C + K2=C + K3=A/B/C + K4=A | **KUNDEVENDT MVP** |
| K1=C + K2=D ELLER K3=D | **STOR SKALA** |

**Ved usikkerhet:** Velg den mer konservative (større) prosjekttypen.

---

## 2. Oppgavematrise

**Prioritetskoder:**
- 🔴 **MÅ** = Obligatorisk, ikke start neste fase uten dette
- 🟡 **BØR** = Sterkt anbefalt, hopp over kun med god grunn
- 🟢 **KAN** = Valgfritt, gjør hvis tid/relevans
- ⚫ **IKKE** = Ikke relevant for denne prosjekttypen

| # | Oppgave | Lite internt | Internt m/data | Kundevendt | Stor skala |
|---|---------|--------------|----------------|------------|------------|
| **DEL A: FUNDAMENT** |||||
| 1 | Introduksjon til vibe-koding | 🟢 KAN | 🟡 BØR | 🔴 MÅ | 🔴 MÅ |
| 2 | Egnethetsvurdering | 🟡 BØR | 🔴 MÅ | 🔴 MÅ | 🔴 MÅ |
| 3 | Team og sikkerhetsnett | 🟢 KAN | 🟡 BØR | 🔴 MÅ | 🔴 MÅ |
| 4 | Kommunikasjonskontrakt med AI | 🟡 BØR | 🟡 BØR | 🔴 MÅ | 🔴 MÅ |
| **DEL B: IDÉ OG VALIDERING** |||||
| 5 | Problemdefinisjon | 🟡 BØR | 🔴 MÅ | 🔴 MÅ | 🔴 MÅ |
| 6 | Jobs-to-be-Done (JTBD) | 🟢 KAN | 🟡 BØR | 🔴 MÅ | 🔴 MÅ |
| 7 | Målgruppe & Persona | 🟡 BØR | 🟡 BØR | 🔴 MÅ | 🔴 MÅ |
| 8 | Verdiforslag | 🟢 KAN | 🟡 BØR | 🔴 MÅ | 🔴 MÅ |
| 9 | Idévalidering (intervjuer) | 🟢 KAN | 🟡 BØR | 🔴 MÅ | 🔴 MÅ |
| 10 | Konkurrentanalyse | ⚫ IKKE | 🟢 KAN | 🟡 BØR | 🔴 MÅ |
| **DEL C: FORRETNING OG SCOPE** |||||
| 11 | Lean Canvas | ⚫ IKKE | 🟢 KAN | 🟡 BØR | 🔴 MÅ |
| 12 | Scope-definisjon (MoSCoW) | 🟡 BØR | 🟡 BØR | 🔴 MÅ | 🔴 MÅ |
| 13 | Kostnadsestimering | ⚫ IKKE | 🟢 KAN | 🟡 BØR | 🔴 MÅ |
| **DEL D: TEKNISK OG RISIKO** |||||
| 14 | Teknisk mulighetsvurdering | 🟢 KAN | 🟡 BØR | 🔴 MÅ | 🔴 MÅ |
| 15 | Risikovurdering + AI-risikoer | 🟢 KAN | 🟡 BØR | 🔴 MÅ | 🔴 MÅ |
| 16 | Dataklassifisering | ⚫ IKKE | 🟡 BØR | 🔴 MÅ | 🔴 MÅ |
| 17 | Regulatoriske krav | ⚫ IKKE | 🟢 KAN | 🟡 BØR | 🔴 MÅ |
| **DEL E: MÅL OG DOKUMENTASJON** |||||
| 18 | Suksesskriterier & PMF-mål | 🟢 KAN | 🟡 BØR | 🔴 MÅ | 🔴 MÅ |
| 19 | Dokumentasjonsstrategi (CLAUDE.md) | 🟡 BØR | 🔴 MÅ | 🔴 MÅ | 🔴 MÅ |
| 20 | Exit-strategi og skalering | ⚫ IKKE | 🟢 KAN | 🟡 BØR | 🔴 MÅ |
| **DEL F: BESLUTNING** |||||
| 21 | Go/No-Go beslutning | 🟡 BØR | 🔴 MÅ | 🔴 MÅ | 🔴 MÅ |
| 22 | Leveranser fra Fase 1 | 🟡 BØR | 🔴 MÅ | 🔴 MÅ | 🔴 MÅ |

---

## 3. Oppgavespesifikasjoner

### DEL A: FUNDAMENT

#### Oppgave 1: Introduksjon til vibe-koding
| Felt | Verdi |
|------|-------|
| **Input** | Ingen (kunnskapsoverføring) |
| **Output** | Prosjektleder forstår fordeler/begrensninger |
| **AI-handling** | Forklar konseptet, spør om forståelse |
| **Ferdig når** | Prosjektleder bekrefter forståelse |

#### Oppgave 2: Egnethetsvurdering
| Felt | Verdi |
|------|-------|
| **Input** | Prosjektbeskrivelse (muntlig fra prosjektleder) |
| **Output** | Egnethetscore + anbefaling (VIBEKODE / HYBRID / PROFESJONELL) |
| **AI-handling** | Still 12 spørsmål fra egnethetsskjema, beregn score |
| **Ferdig når** | Score beregnet, anbefaling gitt, prosjektleder aksepterer |
| **Stopp-kriterium** | Hvis anbefaling = PROFESJONELL → Avslutt fase, anbefal utvikler |

#### Oppgave 3: Team og sikkerhetsnett
| Felt | Verdi |
|------|-------|
| **Input** | Prosjektleders nettverk/ressurser |
| **Output** | Definert: Teknisk validator, valideringsplan |
| **AI-handling** | Kartlegg tilgjengelige ressurser, foreslå valideringsplan |
| **Ferdig når** | Minst én teknisk validator identifisert |
| **Advarsel** | Hvis ingen validator → flagg som risiko, anbefal alternativer |

#### Oppgave 4: Kommunikasjonskontrakt med AI
| Felt | Verdi |
|------|-------|
| **Input** | Ingen |
| **Output** | Prosjektleder kjenner prompt-prinsipper og klassifisering |
| **AI-handling** | Gjennomgå 5 C-er, klassifiseringssystem, prompt-maler |
| **Ferdig når** | Prosjektleder har mottatt og forstått prinsippene |

---

### DEL B: IDÉ OG VALIDERING

#### Oppgave 5: Problemdefinisjon
| Felt | Verdi |
|------|-------|
| **Input** | Prosjektleders idébeskrivelse |
| **Output** | Problem-statement i formatet: "[Målgruppe] sliter med [problem] når de prøver å [mål], noe som fører til [konsekvens]" |
| **AI-handling** | Still utdypende spørsmål, formuler statement, valider med prosjektleder |
| **Ferdig når** | Statement godkjent av prosjektleder |
| **Kvalitetskrav** | Spesifikk målgruppe, konkret problem, målbar konsekvens |

#### Oppgave 6: Jobs-to-be-Done (JTBD)
| Felt | Verdi |
|------|-------|
| **Input** | Problemdefinisjon (fra oppgave 5) |
| **Output** | JTBD-statement: "Når jeg [situasjon], vil jeg [motivasjon], slik at jeg [utfall]" + 3 dimensjoner (funksjonell/emosjonell/sosial) |
| **AI-handling** | Utforsk dypere motivasjon bak problemet |
| **Ferdig når** | JTBD formulert med alle 3 dimensjoner |

#### Oppgave 7: Målgruppe & Persona
| Felt | Verdi |
|------|-------|
| **Input** | Problemdefinisjon, JTBD |
| **Output** | Én primærpersona med navn, demografi, mål, frustrasjoner |
| **AI-handling** | Bruk mal fra READ-FASE-1-GUIDE.md, fyll ut basert på dialog |
| **Ferdig når** | Persona godkjent av prosjektleder |
| **Viktig** | Basér på reelle data hvis intervjuer er gjort |

#### Oppgave 8: Verdiforslag
| Felt | Verdi |
|------|-------|
| **Input** | Problemdefinisjon, JTBD, Persona |
| **Output** | Verdiforslag i formatet: "For [målgruppe] som [problem], er [produkt] en [kategori] som [nøkkelfordel]. I motsetning til [alternativer], [produkt] [differensiator]." |
| **AI-handling** | Syntetiser tidligere outputs, formuler verdiforslag |
| **Ferdig når** | Verdiforslag godkjent |
| **Kvalitetskrav** | Konkret, målbar fordel (ikke "spar tid" men "reduser fra 5t til 10min") |

#### Oppgave 9: Idévalidering
| Felt | Verdi |
|------|-------|
| **Input** | Problemdefinisjon, Persona |
| **Output** | Intervjuguide + oppsummering av funn |
| **AI-handling** | Lag intervjuguide med Mom Test-spørsmål, hjelp med oppsummering |
| **Ferdig når** | Minimum intervjuer gjennomført (se tabell under) |
| **Prosjektleder-oppgave** | Gjennomføre intervjuene selv |

**Minimum intervjuer:**
| Prosjekttype | Minimum | Anbefalt |
|--------------|---------|----------|
| Lite internt | 3 | 5 |
| Internt m/data | 5 | 10 |
| Kundevendt | 10 | 20 |
| Stor skala | 20 | 50 |

#### Oppgave 10: Konkurrentanalyse
| Felt | Verdi |
|------|-------|
| **Input** | Problemdefinisjon, Verdiforslag |
| **Output** | Liste over 2-3 konkurrenter med styrker/svakheter + differensieringsposisjon |
| **AI-handling** | Hjelp med research-struktur, analyser funn |
| **Ferdig når** | Konkurrenter kartlagt, differensiering definert |

---

### DEL C: FORRETNING OG SCOPE

#### Oppgave 11: Lean Canvas
| Felt | Verdi |
|------|-------|
| **Input** | Alle outputs fra DEL B |
| **Output** | Utfylt Lean Canvas (9 felter) |
| **AI-handling** | Guid prosjektleder gjennom hvert felt |
| **Ferdig når** | Alle 9 felter utfylt |

#### Oppgave 12: Scope-definisjon (MoSCoW)
| Felt | Verdi |
|------|-------|
| **Input** | Verdiforslag, Lean Canvas |
| **Output** | Prioritert funksjonsliste: Must have / Should have / Could have / Won't have |
| **AI-handling** | Hjelp med å kategorisere, utfordre "must haves" |
| **Ferdig når** | MoSCoW godkjent, Must haves ≤ 3-5 funksjoner |
| **Kvalitetskrav** | 60% innsats på Must, 20% Should, 20% Could |

#### Oppgave 13: Kostnadsestimering
| Felt | Verdi |
|------|-------|
| **Input** | Tekniske valg, Scope |
| **Output** | Budsjett: engangskostnader + månedlige kostnader + tidskostnader |
| **AI-handling** | Guid gjennom kostnadskategorier, hjelp med estimering |
| **Ferdig når** | Budsjett laget, break-even beregnet (for kundevendt) |

---

### DEL D: TEKNISK OG RISIKO

#### Oppgave 14: Teknisk mulighetsvurdering
| Felt | Verdi |
|------|-------|
| **Input** | Scope, Prosjekttype |
| **Output** | Teknologivalg (frontend/backend/db/hosting) + integrasjonsliste + kompetansegap |
| **AI-handling** | Anbefal stack basert på prosjekttype, identifiser gap |
| **Ferdig når** | Stack valgt, gap identifisert med plan |
| **Anbefalinger** | Frontend: React/Next.js, Backend: Node/Python, DB: Supabase/PostgreSQL, Auth: Clerk/Auth0, Betaling: Stripe |

#### Oppgave 15: Risikovurdering
| Felt | Verdi |
|------|-------|
| **Input** | Alle tidligere outputs |
| **Output** | Risikoregister med tiltak + Pre-mortem analyse |
| **AI-handling** | Guid gjennom risikokategorier, inkluder AI-spesifikke risikoer |
| **Ferdig når** | Risikoregister komplett med tiltak |

**AI-spesifikke risikoer (MÅ inkluderes):**
1. Sikkerhetssårbarheter (45% av AI-kode)
2. Hallusinasjoner
3. Utdaterte biblioteker
4. Hardkodede hemmeligheter
5. Inkonsistent arkitektur
6. Tap av kontekst
7. Overtillit
8. Teknisk gjeld

#### Oppgave 16: Dataklassifisering
| Felt | Verdi |
|------|-------|
| **Input** | Scope, Funksjonsliste |
| **Output** | Dataoversikt med klassifisering (Offentlig/Intern/Konfidensiell/Strengt konf) |
| **AI-handling** | Kartlegg datatyper, klassifiser, definer håndteringsregler |
| **Ferdig når** | Alle datatyper klassifisert |

#### Oppgave 17: Regulatoriske krav
| Felt | Verdi |
|------|-------|
| **Input** | Dataklassifisering, Målgruppe |
| **Output** | Sjekkliste over relevante regelverk med tiltak |
| **AI-handling** | Sjekk GDPR, PCI DSS, WCAG, Cyber Resilience Act, bransjekrav |
| **Ferdig når** | Relevante regelverk identifisert med tiltak |

---

### DEL E: MÅL OG DOKUMENTASJON

#### Oppgave 18: Suksesskriterier
| Felt | Verdi |
|------|-------|
| **Input** | Verdiforslag, Scope |
| **Output** | Målbare suksesskriterier (bruker/forretning/teknisk) + PMF-mål |
| **AI-handling** | Definer konkrete, målbare mål |
| **Ferdig når** | Minst 3 målbare suksesskriterier definert |
| **For kundevendt** | Inkluder PMF-mål: 40% "veldig skuffet"-terskel |

#### Oppgave 19: Dokumentasjonsstrategi
| Felt | Verdi |
|------|-------|
| **Input** | Tekniske valg, Scope |
| **Output** | CLAUDE.md-fil opprettet for prosjektet |
| **AI-handling** | Lag CLAUDE.md med prosjektinfo, stack, konvensjoner |
| **Ferdig når** | CLAUDE.md opprettet og godkjent |

#### Oppgave 20: Exit-strategi
| Felt | Verdi |
|------|-------|
| **Input** | Alle tidligere outputs |
| **Output** | Definerte terskler for skalering + teknisk gjeld-budsjett |
| **AI-handling** | Definer når prosjektet trenger profesjonell hjelp |
| **Ferdig når** | Terskler definert |

---

### DEL F: BESLUTNING

#### Oppgave 21: Go/No-Go beslutning
| Felt | Verdi |
|------|-------|
| **Input** | Alle outputs fra fase 1 |
| **Output** | Beslutning: GO / RECYCLE / HOLD / KILL |
| **AI-handling** | Kjør gjennom 7 knock-out kriterier + 9 scoring-kriterier |
| **Ferdig når** | Beslutning tatt og dokumentert |

**Knock-out kriterier (ett NEI = RECYCLE/KILL):**
1. Er problemet tydelig definert?
2. Har vi snakket med minst 5 potensielle brukere?
3. Bekrefter brukerne at problemet er reelt?
4. Er det teknisk gjennomførbart?
5. Er det innenfor regulatoriske rammer?
6. Har vi sikkerhetsnett?
7. Er vi villige å investere?

**Scoring (0-5 per kriterie, sum /45):**
- 36-45: Sterkt GO
- 27-35: GO med oppmerksomhet
- 18-26: HOLD
- 0-17: RECYCLE/KILL

#### Oppgave 22: Leveranser fra Fase 1
| Felt | Verdi |
|------|-------|
| **Input** | Alle outputs |
| **Output** | Komplett leveransepakke til Fase 2 |
| **AI-handling** | Kompiler alle dokumenter, verifiser komplett |
| **Ferdig når** | Sjekkliste fullført |

**Obligatorisk leveranseliste:**
- [ ] Prosjektbeskrivelse
- [ ] Egnethetsvurdering
- [ ] Team/sikkerhetsnett
- [ ] Problemdefinisjon
- [ ] Persona
- [ ] JTBD
- [ ] Verdiforslag
- [ ] Intervjuoppsummering
- [ ] MoSCoW-prioritering
- [ ] Risikoregister
- [ ] CLAUDE.md
- [ ] Go/No-Go beslutning

---

## 4. Avhengigheter og rekkefølge

```
OPPSTART
    │
    ▼
┌─────────────────────────────────────┐
│  Klassifisering (K1-K5)             │
│  → Bestemmer prosjekttype           │
│  → Bestemmer hvilke oppgaver        │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  DEL A: Fundament (1-4)             │
│  Sekvensielt: 1 → 2 → 3 → 4         │
│  STOPP hvis oppg 2 = PROFESJONELL   │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  DEL B: Idé og validering (5-10)    │
│  5 → 6 → 7 → 8 (sekvensielt)        │
│  9 kan parallelliseres med 6-8      │
│  10 etter 5 og 8                    │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  DEL C: Forretning (11-13)          │
│  11 og 12 kan parallelliseres       │
│  13 etter 12 og 14                  │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  DEL D: Teknisk og risiko (14-17)   │
│  14 → 15 (sekvensielt)              │
│  16 og 17 kan parallelliseres       │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  DEL E: Mål og dokumentasjon (18-20)│
│  18, 19, 20 kan parallelliseres     │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  DEL F: Beslutning (21-22)          │
│  21 → 22 (sekvensielt)              │
│  Krever alle MÅ-oppgaver fullført   │
└─────────────────────────────────────┘
    │
    ▼
FASE 2
```

---

## 5. Agentkommandoer

### Start fase 1
```
LES: FASE-1-AI.md
UTFØR: Klassifisering (K1-K5)
BESTEM: Prosjekttype
FILTRER: Oppgaveliste basert på matrise
START: Oppgave 1 (eller første MÅ-oppgave)
```

### Ved hver oppgave
```
SJEKK: Er oppgaven MÅ/BØR/KAN for denne prosjekttypen?
HVIS MÅ/BØR:
  UTFØR: Oppgaven
  VERIFISER: Output oppfyller krav
  DOKUMENTER: Output
  FORTSETT: Neste oppgave
HVIS KAN:
  SPØR: Prosjektleder om den skal utføres
HVIS IKKE:
  HOPP OVER
```

### Ved Go/No-Go
```
SAMLE: Alle outputs
KJØR: Knock-out kriterier
HVIS noen NEI:
  RETURNER: RECYCLE med begrunnelse
ELLERS:
  KJØR: Scoring
  RETURNER: Beslutning basert på score
```

---

## 6. Referanser

- **Maler og eksempler:** Se READ-FASE-1-GUIDE.md, Vedlegg A
- **Ordliste:** Se READ-FASE-1-GUIDE.md, Vedlegg B
- **Ressurser:** Se READ-FASE-1-GUIDE.md, Vedlegg C
