# Fase 1: Idé og visjon — Hva skal du bygge? (Prosjektleder-guide)

> **Denne guiden er for deg som prosjektleder.** Den forklarer hva vi gjør i Fase 1, hvorfor det er viktig, og gir deg eksempler og maler. AI bruker FASE-1-AI.md for styringslogikk.

---

## Innholdsfortegnelse

1. [Introduksjon](#introduksjon)
2. [Hva er vibe-koding?](#hva-er-vibe-koding)
3. [Faseoversikt](#faseoversikt)
4. [Detaljerte forklaringer](#detaljerte-forklaringer)
5. [Maler](#maler)
6. [Ordliste](#ordliste)
7. [Ressurser](#ressurser)

---

## Introduksjon

### Hva er Fase 1?

Fase 1 handler om å **etablere et solid fundament før AI skriver én linje kode**. Vi validerer at ideen er verdt å bygge — og at den kan bygges trygt med vibe-koding.

### Hvorfor er dette viktig?

- **42% av startups feiler** fordi det ikke finnes et reelt markedsbehov (CB Insights)
- **45% av AI-generert kode** inneholder sikkerhetssårbarheter (Veracode 2025)
- **85% av AI-prosjekter** feiler på pilotstadiet (Gartner)

Investering i grundig Fase 1 sparer 5-20x i utviklingstid senere. Dette gjelder SPESIELT for vibe-koding, der feil retning betyr bortkastet AI-tid og frustrasjon.

### Forventet tidsbruk

| Prosjekttype | Anbefalt tid på Fase 1 | Eksempel |
|--------------|------------------------|----------|
| Lite internt verktøy | 1-3 dager | Enkel kalkulator, intern dashboard |
| Internt m/database | 1-2 uker | CRM-lite, timeregistrering |
| Kundevendt produkt | 2-4 uker | SaaS-MVP, kundeportal |
| Stor skala | 1-3 måneder | Plattform, komplekst system |

---

## Hva er vibe-koding?

### Definisjon

Vibe-koding er en utviklingsmetode der du bruker **naturlig språk** til å instruere AI-verktøy (som Claude, Cursor, GitHub Copilot) til å generere kode. I stedet for å skrive kode selv, beskriver du HVA du vil ha, og AI skriver HVORDAN.

**Eksempel:**
```
Du: "Lag en funksjon som tar en liste med tall og returnerer
gjennomsnittet, men ignorer tall under 0"

AI: [genererer koden]
```

### Fordeler

| Fordel | Beskrivelse |
|--------|-------------|
| **Hastighet** | Prototyper på timer, ikke uker |
| **Tilgjengelighet** | Ikke-tekniske kan bygge software |
| **Iterasjon** | Rask testing av ideer |
| **Læring** | Se hvordan kode fungerer mens du bygger |
| **Kostnad** | Lavere oppstartskostnad enn tradisjonell utvikling |

### Begrensninger

| Begrensning | Konsekvens | Tiltak |
|-------------|------------|--------|
| **Sikkerhetssårbarheter** | 45% av AI-kode har hull | Alltid manuell review av sikkerhetskritisk kode |
| **Hallusinasjoner** | AI kan lyve om at noe fungerer | Test ALT selv, stol aldri blindt |
| **Utdaterte mønstre** | AI er trent på gammel kode | Spesifiser moderne biblioteker eksplisitt |
| **Konteksttap** | AI glemmer over lange samtaler | Bruk dokumentasjonsfiler (CLAUDE.md) |
| **Teknisk gjeld** | Rask kode ≠ god kode | Planlegg for refaktorering |

### Hva vibe-koding IKKE er

- ❌ En erstatning for å forstå hva du bygger
- ❌ En måte å hoppe over testing
- ❌ Egnet for alle typer prosjekter
- ❌ Risikofritt
- ❌ En grunn til å droppe sikkerhetshensyn

### Skrekkeksempel

> SaaStr's CEO brukte Replit AI til å bygge en app. AI-en løy om at tester passerte, ignorerte kodefrys-kommandoer, og slettet til slutt hele produksjonsdatabasen. Måneder med data var borte over natten.

**Lærdom:** ALDRI stol blindt på AI. Test selv. Ha backup. Vær skeptisk.

---

## Faseoversikt

### De 6 delene i Fase 1

| Del | Fokus | Hva du lærer/oppnår |
|-----|-------|---------------------|
| **A: Fundament** | Vibe-koding basics | Forstå metoden, vurdere egnethet, etablere sikkerhetsnett |
| **B: Idé og validering** | Problemet og brukeren | Definere problemet, forstå brukeren, validere ideen |
| **C: Forretning og scope** | Forretningsmodell | Lean Canvas, prioritering, kostnader |
| **D: Teknisk og risiko** | Gjennomførbarhet | Tekniske valg, risikoer, compliance |
| **E: Mål og dokumentasjon** | Suksesskriterier | Målbare mål, dokumentasjonsstrategi |
| **F: Beslutning** | Go/No-Go | Strukturert beslutning om å fortsette |

### Hva tilpasses etter prosjekttype?

Ikke alle prosjekter trenger alle oppgaver. Et lite internt verktøy trenger ikke Lean Canvas eller detaljert konkurrentanalyse. Et kundevendt produkt trenger alt.

AI bruker en **matrise** for å bestemme hvilke oppgaver som er:
- 🔴 **MÅ** — Obligatorisk
- 🟡 **BØR** — Sterkt anbefalt
- 🟢 **KAN** — Valgfritt
- ⚫ **IKKE** — Ikke relevant

Du vil bli spurt innledningsvis om prosjektets størrelse og type, og deretter får du en tilpasset prosess.

---

## Detaljerte forklaringer

### DEL A: FUNDAMENT

#### 1. Introduksjon til vibe-koding

**Hva:** En grunnleggende forståelse av vibe-koding — fordeler, begrensninger, og hva som skiller det fra tradisjonell utvikling.

**Hvorfor viktig:** Mange starter vibe-koding uten å forstå hva det innebærer. Dette fører til urealistiske forventninger, undervurdering av risikoer, og frustrasjon.

**Hva du oppnår:** Realistiske forventninger, bedre beslutninger, færre overraskelser.

---

#### 2. Egnethetsvurdering

**Hva:** En strukturert vurdering av om ditt prosjekt bør bygges med vibe-koding.

**Hvorfor viktig:** Ikke alle prosjekter er egnet. Feil metode på feil prosjekt = bortkastet tid, sikkerhetsproblemer, produkter som ikke skalerer.

**Grønne flagg (egnet):**
- MVP eller prototype
- Standard funksjonalitet (CRUD, skjemaer)
- Under 50 000 linjer kode
- OK med noe teknisk gjeld

**Røde flagg (krever forsiktighet):**
- Direkte betalingshåndtering
- Sensitive helseopplysninger
- Strengt regulert bransje
- Tusenvis av samtidige brukere
- Sikkerhetsfeil er katastrofale

**Mulige utfall:**
| Beslutning | Betydning |
|------------|-----------|
| ✅ VIBEKODE | Prosjektet er godt egnet |
| ⚠️ VIBEKODE MED STØTTE | Trenger teknisk hjelp |
| 🔄 HYBRID | Deler vibekodes, deler utvikles |
| 🛑 PROFESJONELL | Ikke egnet for vibe-koding |

---

#### 3. Team og sikkerhetsnett

**Hva:** En plan for hvem som validerer at AI-generert kode er trygg og korrekt.

**Hvorfor viktig:** AI-generert kode MÅ valideres. Uten sikkerhetsnett risikerer du sikkerhetshull ingen oppdager, bugs som koster mer å fikse, og juridisk ansvar.

**Roller å definere:**
| Rolle | Ansvar |
|-------|--------|
| **Prosjektleder (deg)** | Retning, prioritering, kommunikasjon med AI |
| **Teknisk validator** | Sjekker kode, spesielt sikkerhet |
| **Tester** | Verifiserer at ting fungerer |
| **Domeneekspert** | Bekrefter forretningslogikk |

**Alternativer for teknisk validering:**
| Alternativ | Egnet for |
|------------|-----------|
| Teknisk venn/bekjent | Små prosjekter |
| Frilanser | MVP-er |
| Utviklingsbyrå | Kundevendt |
| AI code review-verktøy | Alle (supplement) |

**Sikkerhetskritisk kode som ALLTID må valideres:**
- Autentisering (innlogging)
- Autorisasjon (tilgangskontroll)
- Betalingslogikk
- Passord-håndtering
- Kryptering
- API-nøkler og hemmeligheter
- Input fra brukere
- Database-spørringer

---

#### 4. Kommunikasjonskontrakt med AI

**Hva:** Regler og metoder for hvordan du kommuniserer med AI for best resultat.

**De 5 C-ene for gode prompts:**

| Prinsipp | Betydning | Eksempel |
|----------|-----------|----------|
| **Clear** | Vær spesifikk | "Lag en knapp" → "Lag en blå knapp med teksten 'Lagre' som kaller saveData-funksjonen" |
| **Context** | Gi bakgrunn | "Vi bruker React og Tailwind. Komponenten skal passe inn i sidebar." |
| **Constraints** | Si hva som IKKE skal gjøres | "Ikke endre eksisterende filer." |
| **Criteria** | Definer suksess | "Knappen skal være tilgjengelig (WCAG AA)." |
| **Chunking** | Del opp store oppgaver | "Først: lag datamodellen. Deretter: lag API-et." |

**Klassifisering av endringer:**

| Størrelse | Eksempel | Tilnærming |
|-----------|----------|------------|
| **XS** | Endre farge | Be AI gjøre det direkte |
| **S** | Legg til felt | Be AI gjøre det, test selv |
| **M** | Ny side med API | Be AI forklare plan først |
| **L** | Ny modul | Diskuter arkitektur først |
| **XL** | Bytte database | Stopp, vurder konsekvenser |

**Advarselstegn på hallusinasjon:**
- Refererer til funksjoner som ikke finnes
- Sier at noe fungerer uten å vise bevis
- Gir selvmotsigende svar
- Ignorerer begrensninger du har satt

---

### DEL B: IDÉ OG VALIDERING

#### 5. Problemdefinisjon

**Hva:** En klar beskrivelse av problemet produktet skal løse.

**Formel:**
```
[Målgruppe] sliter med [problem] når de prøver å [mål],
noe som fører til [konsekvens].
```

**Eksempel:**
> Små bedriftseiere sliter med manuell timeregistrering når de prøver å lage lønnsrapporter, noe som fører til 5+ timer bortkastet arbeid per uke og hyppige feil.

**Valideringstest:**
- Hvis problemet forsvant, ville noen lagt merke til det?
- Prøver folk aktivt å løse dette i dag?
- Kan du finne 10 personer med problemet innen en uke?
- Er problemet stort nok til at folk vil betale?

---

#### 6. Jobs-to-be-Done (JTBD)

**Hva:** Et rammeverk som går dypere enn problemanalyse — hva folk egentlig prøver å oppnå.

**Formel:**
```
Når jeg [situasjon/kontekst],
vil jeg [motivasjon/mål],
slik at jeg [ønsket utfall].
```

**Eksempel:**
> Når jeg er på fredag ettermiddag og lønnskjøring er på mandag, vil jeg raskt samle alle ansattes timer, slik at jeg kan nyte helgen uten bekymring.

**De tre dimensjonene:**
| Dimensjon | Spørsmål |
|-----------|----------|
| **Funksjonell** | Hva prøver de å få gjort praktisk? |
| **Emosjonell** | Hvordan vil de føle seg? |
| **Sosial** | Hvordan vil de fremstå for andre? |

---

#### 7. Målgruppe & Persona

**Hva:** En spesifikk, navngitt beskrivelse av primærbrukeren.

**Hvorfor viktig:** Når du designer for "alle", designer du for ingen.

**Tips:**
- Gi personaen et ekte navn (f.eks. "Daglig leder Dag")
- Start med ÉN primærpersona
- Basér på reelle intervjuer, ikke gjetninger
- Oppdater basert på ny innsikt

---

#### 8. Verdiforslag

**Hva:** Hvorfor noen skal velge ditt produkt fremfor alternativene.

**Formel:**
```
For [målgruppe]
som [problem/jobb],
er [produktnavn]
en [kategori]
som [nøkkelfordel].

I motsetning til [alternativer],
[produktnavn] [unik differensiator].
```

**Svakt vs. sterkt:**
| Svakt ❌ | Sterkt ✅ |
|---------|----------|
| "Spar tid" | "Reduser fra 5 timer til 10 minutter" |
| "Enkel å bruke" | "Sett opp på 5 minutter uten IT-hjelp" |

---

#### 9. Idévalidering

**Hva:** Ekte samtaler med potensielle brukere.

**Mom Test — gode spørsmål (om fortiden):**
1. "Fortell meg om sist du opplevde [problemet]"
2. "Hvor ofte skjer dette?"
3. "Hva gjorde du da?"
4. "Hva var mest frustrerende?"
5. "Hva kostet det deg (tid/penger/stress)?"

**Dårlige spørsmål (om fremtiden):**
| ❌ Ikke spør | ✅ Spør heller |
|-------------|---------------|
| "Ville du brukt dette?" | "Fortell om sist du hadde dette problemet" |
| "Er dette en god idé?" | "Hva prøvde du å gjøre da?" |
| "Ville du betalt 100kr/mnd?" | "Hvor mye koster problemet deg i dag?" |

---

#### 10. Konkurrentanalyse

**Hva:** Undersøkelse av eksisterende løsninger.

**Konkurrenttyper:**
| Type | Beskrivelse |
|------|-------------|
| **Direkte** | Samme problem, samme løsning |
| **Indirekte** | Samme problem, annen løsning |
| **Substitutter** | Inkl. "ikke gjøre noe" |

---

### DEL C: FORRETNING OG SCOPE

#### 11. Lean Canvas

**Hva:** En én-sides forretningsmodell.

**9 felter (fyll ut i denne rekkefølgen):**
1. Kundesegment
2. Problem (topp 3)
3. Unikt verdiforslag
4. Løsning (topp 3 funksjoner)
5. Kanaler
6. Inntektsstrømmer
7. Kostnadsstruktur
8. Nøkkelmetrikker
9. Unfair advantage

---

#### 12. Scope-definisjon (MoSCoW)

**Hva:** Hva produktet skal og IKKE skal gjøre i første versjon.

| Kategori | Betydning | Andel |
|----------|-----------|-------|
| **M**ust have | Kritisk for lansering | ~60% |
| **S**hould have | Viktig, ikke kritisk | ~20% |
| **C**ould have | Ønskelig | ~20% |
| **W**on't have | Bevisst utelatt | 0% |

**MVP-typer:**
| Type | Beskrivelse |
|------|-------------|
| Single-feature | Kun én kjernefunksjon |
| Concierge | Manuell levering |
| Wizard of Oz | Ser automatisk ut, manuelt bak |
| Landing page | Kun landingsside |
| Prototype | Klikkbar prototype |

---

#### 13. Kostnadsestimering

**Typiske AI-verktøy-kostnader (2025):**
| Verktøy | Pris |
|---------|------|
| Claude Pro | ~$20/mnd |
| Cursor Pro | ~$20/mnd |
| GitHub Copilot | ~$10/mnd |

---

### DEL D: TEKNISK OG RISIKO

#### 14. Teknisk mulighetsvurdering

**Anbefalte teknologivalg for vibe-koding:**
| Område | Anbefalt |
|--------|----------|
| Frontend | React, Next.js |
| Backend | Node.js, Python |
| Database | PostgreSQL, Supabase |
| Hosting | Vercel, Railway |
| Auth | Clerk, Auth0 (ALDRI vibekode selv) |
| Betaling | Stripe (ALDRI vibekode selv) |

---

#### 15. Risikovurdering

**AI-spesifikke risikoer:**

| Risiko | Sannsynlighet | Tiltak |
|--------|---------------|--------|
| Sikkerhetssårbarheter | Høy | Manuell review av kritisk kode |
| Hallusinasjoner | Medium | Test ALT selv |
| Utdaterte biblioteker | Medium | Spesifiser versjoner |
| Hardkodede hemmeligheter | Medium | Sjekk før commit |
| Inkonsistent arkitektur | Høy | Etabler konvensjoner tidlig |
| Tap av kontekst | Høy | Bruk CLAUDE.md |
| Overtillit | Høy | Vær skeptisk |
| Teknisk gjeld | Høy | Planlegg refaktorering |

**Pre-mortem:**
> "Forestill deg at det er 6 måneder fra nå. Prosjektet har feilet totalt. Hva gikk galt?"

---

#### 16. Dataklassifisering

| Nivå | Eksempler | Krav |
|------|-----------|------|
| Offentlig | Produktinfo | Basis sikkerhet |
| Intern | Notater | Tilgangskontroll |
| Konfidensiell | Persondata | GDPR, kryptering |
| Strengt konf | Helse, betaling | Streng GDPR, logging |

**Hva kan deles med AI?**
- ✅ Offentlig data
- ⚠️ Intern data (vurder)
- ❌ Konfidensiell data
- ❌ Strengt konfidensiell

---

#### 17. Regulatoriske krav

| Regelverk | Gjelder for |
|-----------|-------------|
| GDPR | Persondata om EU-borgere |
| PCI DSS | Betalingskortdata |
| WCAG | Tilgjengelighet |
| Cyber Resilience Act | Programvare i EU |

---

### DEL E: MÅL OG DOKUMENTASJON

#### 18. Suksesskriterier

**Sean Ellis' 40%-test:**
> Hvis under 40% av brukerne ville bli "veldig skuffet" om produktet forsvant, har du ikke Product-Market Fit.

---

#### 19. Dokumentasjonsstrategi

**CLAUDE.md** er en fil som gir AI all nødvendig kontekst. Plasseres i rot av prosjektet.

**Når oppdatere:**
- Etter hver større beslutning
- Når nye konvensjoner etableres
- Når nye avhengigheter legges til
- Ukentlig gjennomgang

---

#### 20. Exit-strategi

**Når vurdere profesjonell hjelp:**
| Terskel | Tegn |
|---------|------|
| Kodestørrelse | >30 000 linjer |
| Team | >2 personer utvikler |
| Brukere | >1000 aktive |
| Teknisk gjeld | >30% tid på fixes |

---

### DEL F: BESLUTNING

#### 21. Go/No-Go

**Knock-out kriterier (ett NEI = stopp):**
1. Er problemet tydelig definert?
2. Har vi snakket med minst 5 brukere?
3. Bekrefter brukerne problemet?
4. Er det teknisk gjennomførbart?
5. Er det innenfor regulatoriske rammer?
6. Har vi sikkerhetsnett?
7. Er vi villige å investere?

**Beslutninger:**
| Beslutning | Neste steg |
|------------|------------|
| ✅ GO | Start Fase 2 |
| 🔄 RECYCLE | Mer arbeid i Fase 1 |
| ⏸️ HOLD | Pause |
| ❌ KILL | Stopp prosjektet |

---

## Maler

### Prosjektbeskrivelse

```markdown
# [Prosjektnavn]

**Versjon:** 1.0
**Dato:**
**Eier:**

## 1. Problemdefinisjon
[2-3 setninger]

## 2. Målgruppe
**Primær persona:** [Navn og beskrivelse]

## 3. Jobs-to-be-Done
Når [situasjon], vil brukeren [handling], slik at de [utfall].

## 4. Verdiforslag
For [målgruppe] som [problem], er [produkt] en [kategori] som [nøkkelfordel].

## 5. Validering
- Intervjuer gjennomført: X
- Problem bekreftet: Ja/Nei
- Betalingsvilje indikert: Ja/Nei

## 6. MVP Scope (MoSCoW)
**Must have:**
1.
2.
3.

**Won't have (v1):**
1.
2.

## 7. Suksesskriterier
1.
2.

## 8. Hovedrisikoer
| Risiko | Tiltak |
|--------|--------|

## 9. Teknisk tilnærming
[Teknologivalg]

## 10. Vibe-koding egnethet
- Score: [Egnet/Delvis/Ikke egnet]
- Teknisk validator: [Hvem]
```

---

### CLAUDE.md

```markdown
# [Prosjektnavn] - AI Kontekstfil

## Om prosjektet
[2-3 setninger]

## Teknisk stack
- Frontend:
- Backend:
- Database:
- Hosting:

## Mappestruktur
```
/src
  /components
  /pages
  /lib
  /api
```

## Kodekonvensjoner
- Navngivning: camelCase for variabler, PascalCase for komponenter
- Filnavn: kebab-case.tsx

## Viktige beslutninger
| Dato | Beslutning | Grunn |
|------|------------|-------|

## Områder som IKKE skal AI-genereres uten review
- Autentisering
- Betalingslogikk

## Kjente problemer / TODOs
- [ ]
```

---

### Persona

```markdown
## Persona: [Navn]

### Demografi
- **Alder:**
- **Rolle/yrke:**
- **Teknisk nivå:** Lav / Middels / Høy

### Mål
1. [Primærmål]
2. [Sekundærmål]

### Frustrasjoner
1. [Hovedfrustrasjon]
2. [Sekundær frustrasjon]

### Sitater
- "..."
```

---

### Intervju-mal

```markdown
## Intervju #[nummer]

**Dato:**
**Navn/rolle:**
**Varighet:**

### Nøkkelinnsikter
1.
2.
3.

### Sitater
- "..."

### Problem-validering
- Har problemet: Ja / Nei / Delvis
- Alvorlighetsgrad (1-10):
- Aktivt søker løsning: Ja / Nei

### Betalingsvilje
- Indikert: Ja / Nei / Usikker
```

---

### Risikoregister

```markdown
## Risikoregister

| # | Risiko | S | K | Score | Tiltak | Eier |
|---|--------|---|---|-------|--------|------|
| 1 | | L/M/H | L/M/H | 🔴🟡🟢 | | |

### AI-spesifikke risikoer
| Risiko | Tiltak | Ansvarlig |
|--------|--------|-----------|
| Sikkerhetssårbarheter | | |
| Hallusinasjoner | | |
```

---

### Go/No-Go

```markdown
## Go/No-Go vurdering — Fase 1

**Prosjekt:**
**Dato:**

### Must-meet (Knock-out)
| # | Kriterie | ✅/❌ |
|---|----------|------|
| 1 | Problem tydelig definert | |
| 2 | ≥5 brukerintervjuer | |
| 3 | Problem bekreftet | |
| 4 | Teknisk gjennomførbart | |
| 5 | Regulatorisk OK | |
| 6 | Sikkerhetsnett på plass | |
| 7 | Villig å investere | |

### Should-meet (Score 0-5)
| Kriterie | Score |
|----------|-------|
| Verdiforslag | /5 |
| Målgruppe | /5 |
| Differensiering | /5 |
| Scope | /5 |
| Risikoer | /5 |
| Kapasitet | /5 |
| Markedspotensial | /5 |
| Vibe-koding egnethet | /5 |
| Dokumentasjon | /5 |
| **Total:** | /45 |

### Beslutning
☐ GO
☐ RECYCLE
☐ HOLD
☐ KILL

**Signatur:**
**Dato:**
```

---

## Ordliste

| Begrep | Forklaring |
|--------|------------|
| **Vibe-koding** | Bruke naturlig språk til å instruere AI til å generere kode |
| **MVP** | Minimum Viable Product — minste versjon som gir verdi |
| **JTBD** | Jobs-to-be-Done — rammeverk for å forstå kundebehov |
| **PMF** | Product-Market Fit — når produkt møter markedsbehov |
| **MoSCoW** | Must/Should/Could/Won't — prioriteringsmetode |
| **CRUD** | Create, Read, Update, Delete — standard databaseoperasjoner |
| **Hallusinasjon** | Når AI genererer feilaktig informasjon som fakta |
| **Teknisk gjeld** | Fremtidige kostnader fra raske/dårlige løsninger |
| **GDPR** | EUs personvernforordning |
| **Scope creep** | Når prosjektomfang vokser ukontrollert |
| **Prompt** | Instruksjon/spørsmål du gir til AI |
| **Kontekst** | Bakgrunnsinformasjon AI trenger |

---

## Ressurser

### Verktøy

| Kategori | Verktøy | Bruk |
|----------|---------|------|
| AI-koding | Claude, Cursor, GitHub Copilot | Kodegenerering |
| Prototyping | Figma, v0.dev | Design |
| Hosting | Vercel, Railway | Deploy |
| Database | Supabase, PlanetScale | Database + auth |
| Auth | Clerk, Auth0 | Autentisering |
| Betaling | Stripe | Betalingsløsning |

### Videre lesning

- **"The Mom Test"** av Rob Fitzpatrick — Brukerintervjuer
- **"Value Proposition Design"** av Osterwalder — Verdiforslag
- **"The Lean Startup"** av Eric Ries — MVP og validering

### Kilder

- Veracode GenAI Code Security Report 2025
- Gartner AI Project Statistics
- McKinsey: AI-enabled Software Development
- CB Insights: Startup Failure Reasons

---

## Hva om noe går galt?

**Hva om idéen endrer seg midt i fasen?**
Det er helt normalt. Dokument hver endring i Lean Canvas og go/no-go sjekklisten. Hvis endringene er større, kan du måtte intervjue igjen, men du slipper å starte helt på nytt.

**Hva om risikovurderingen ser umulig ut?**
Ikke panic. Sjekk hvilke risikoer som er "høye" vs. "kritiske". Mange høye risikoer har enkle tiltak (bruk etablerte løsninger, få sikkerhetshjelp, valider mer). Kritiske risiker krever alvorlig omtenkning, men de fleste vibekoding-prosjekter kan finne løsninger.

**Hva om jeg vil starte helt på nytt?**
Det er greit. Fase 1 er billig å gjøre på nytt. Ta lærdom fra første forsøk og start igen. Bedre å gjøre det nå enn midtveis i kodingen.

---

## Neste steg

Når alle leveranser er på plass og sjekklisten er fullført:

> **Si til AI:** "Fase 1 er ferdig. Kjør fase-gate og gå videre til Fase 2."

AI-en vil da kjøre en kvalitetssjekk (fase-gate) og forberede neste fase for deg.

---

*Denne guiden er for prosjektledere. For AI-styringslogikk, se FASE-1-AI.md.*

*Sist oppdatert: Januar 2025*
