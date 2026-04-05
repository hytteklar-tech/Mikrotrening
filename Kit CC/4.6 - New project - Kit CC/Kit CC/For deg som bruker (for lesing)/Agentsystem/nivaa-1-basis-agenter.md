# Nivå 1: Basis-agenter

> Arbeiderne som gjør jobben. Disse 7 agentene er spesialiserte håndverkere som kalles inn av prosess-agentene for å utføre konkret arbeid — bygge kode, feilsøke, dokumentere, planlegge, reviewe, sikre og veilede.

**Antall agenter:** 7
**Når de brukes:** Kalles av prosess-agenter (Nivå 2) etter behov
**Synlighet for bruker:** Medium — brukeren ser resultatet, men ikke alltid hvem som gjorde jobben

---

## BYGGER-agent

### Markedsføring
**Tittel:** Koder som bygger sikkert fra start
**Beskrivelse:** Bygger-agenten implementerer funksjoner i tre trinn — først UI, så funksjonalitet, til slutt sikkerhet. Den genererer tester parallelt med koden, reviewar sitt eget arbeid fra et sikkerhetsperspektiv, og holder endringene små og håndterbare.

### Hva gjør denne agenten?
Implementerer funksjoner inkrementelt med innebygd sikkerhet og kvalitet. Følger en 3-trinns modell: Stage 1 (UI) → Stage 2 (Funksjonalitet) → Stage 3 (Sikkerhet). Genererer tester parallelt med koden.

### Hvorfor er det viktig?
Kode som skrives uten struktur ender opp som teknisk gjeld. Bygger-agenten sikrer at hver funksjon bygges riktig fra start — med tester, sikkerhet og arkitekturkonsistens — i stedet for å bolte det på etterpå.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** MVP-agent (Fase 4), ITERASJONS-agent (Fase 5), direkte av bruker
- **Eskalerer til:** SIKKERHETS-agent (sikkerhetsproblemer), ARKITEKTUR-agent (arkitekturspørsmål), YTELSE-ekspert (ytelsesproblemer)

### Hvordan jobber den?
1. **Analyse:** Forstå oppgaven, identifiser relevante filer (maks 30% av kontekstvindu)
2. **Diskusjonsgate (obligatorisk):** Presenter alternative tilnærminger basert på byggemodus, la bruker velge før koding
3. **Utførelse (3 stages):** UI → Funksjonalitet → Sikkerhet med parallell testgenerering
4. **Selvrefleksjon:** AI reviewer egen kode fra sikkerhetsperspektiv
5. **Verifisering og levering:** Endelige guardrails, PR-strategi, overlevering

### Hvilke funksjoner har den?
- **Smart konteksthenting:** Laster kun relevante filer, maks 30% av kontekstvindu
- **Parallell testgenerering:** Skriver tester samtidig med koden
- **Inkrementell PR-strategi:** Holder endringer under 400 linjer
- **Selvhelbredende kode:** Auto-fikser vanlige feil (manglende imports, linting)
- **Arkitektur-konsistenssjekk:** Verifiserer at ny kode følger eksisterende mønstre
- **Feature flag-integrasjon:** Trygge utrullinger bak feature flags
- **To-stegs selvrefleksjon:** Reviewer eget arbeid fra sikkerhetsperspektiv
- **Vibekoding-guardrails:** AI-spesifikke sikkerhetsskranker
- **Diskusjonsgate:** Obligatorisk diskusjon av tilnærming FØR koding starter
- **Byggemodus-tilpasning:** Oppfører seg ulikt basert på ai-bestemmer/samarbeid/detaljstyrt
- **AI-kodemerking:** Genererer AI-taggede kodeheadere
- **CODE-QUALITY-GATE-trigger:** Automatisk kvalitetssjekk etter koding

---

## DEBUGGER-agent

### Markedsføring
**Tittel:** Systematisk feilsøking som finner rotårsaken
**Beskrivelse:** Debugger-agenten bruker en 5-trinns industri-standard prosess for å fikse bugs: Reproduser → Isoler → Analyser → Fiks → Forhindre. Den sjekker logger og diagnostikk FØR den leser kode — fordi 80% av bugs kan identifiseres uten å se på en eneste kodelinje.

### Hva gjør denne agenten?
Systematisk feilretting med 5-trinns industri-standard prosess: Reproduser → Isoler → Analyser → Fiks → Forhindre. Bruker AI-assistert rotårsaksanalyse og prediktiv anomali-deteksjon.

### Hvorfor er det viktig?
Tilfeldig feilsøking er tidkrevende og løser ofte bare symptomene. Debugger-agenten finner rotårsaken systematisk og implementerer forebygging, slik at samme type bug ikke dukker opp igjen.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** ITERASJONS-agent (Fase 5), KVALITETSSIKRINGS-agent (Fase 6), PUBLISERINGS-agent (Fase 7), direkte av bruker
- **Eskalerer til:** SIKKERHETS-agent (sikkerhetsbugger), YTELSE-ekspert (ytelsesbugger), INCIDENT-RESPONSE-ekspert (produksjon)

### Hvordan jobber den?
1. **Diagnostikk først:** Sjekk ALLE diagnostikkkilder FØR kodelesing — Kit CC Monitor (primær), nettleserkonsoll, nettverkstab, brukerens feilmelding
2. **Reproduser:** AI-assistert reproduksjon (RepGen-inspirert: auto-genererer steg fra rapporter)
3. **Isoler:** ML-basert rotårsaksprediksjon (rangerer sannsynlige årsaker)
4. **Analyser:** AI-assistert 5 Whys (iterativt "hvorfor" for å finne rotårsaken)
5. **Fiks:** Automatisk hotfix-generering for kjente mønstre
6. **Forhindre:** Søk proaktivt etter lignende bugs i kodebasen

### Hvilke funksjoner har den?
- **Diagnostikk-først:** 80% av bugs identifiseres fra logger alene — sjekker alltid logger FØR kode
- **AI-assistert reproduksjon:** Auto-genererer reproduksjonssteg fra feilrapporter
- **ML-basert rotårsaksprediksjon:** Rangerer sannsynlige årsaker etter sannsynlighet
- **Intelligent logg-oppsummering:** Komprimerer 10 000 linjer til nøkkelinnsikt
- **Distribuert feilsporing:** Sporer feil på tvers av mikrotjenester
- **AI-assistert 5 Whys:** Iterativ rotårsaksanalyse
- **Prediktiv anomali-deteksjon:** Varsler om minnelekkasjer, ytelsesforringelse
- **Automatisk hotfix-generering:** For kjente feilmønstre
- **Proaktiv bug-søk:** Etter fiksing, søker etter lignende problemer i resten av kodebasen

---

## DOKUMENTERER-agent

### Markedsføring
**Tittel:** Dokumentasjon som holder seg oppdatert
**Beskrivelse:** Dokumenterer-agenten holder kode og dokumentasjon synkronisert automatisk. Når koden endres, oppdateres README, API-docs og diagrammer. Den genererer også AI-vennlig dokumentasjon (llms.txt) slik at andre AI-verktøy forstår prosjektet ditt.

### Hva gjør denne agenten?
Holder kode og dokumentasjon synkronisert automatisk. Genererer README, API-dokumentasjon, JSDoc, diagrammer og AI-vennlig kontekst (llms.txt).

### Hvorfor er det viktig?
Utdatert dokumentasjon er verre enn ingen dokumentasjon — den villeder. Dokumenterer-agenten sikrer at doksene alltid speiler virkeligheten, og genererer AI-vennlig dokumentasjon som gjør prosjektet tilgjengelig for andre verktøy.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** KRAV-agent (Fase 2), ARKITEKTUR-agent (Fase 3), ITERASJONS-agent (Fase 5), PUBLISERINGS-agent (Fase 7), BYGGER-agent (automatisk ved kodeendring), direkte av bruker
- **Eskalerer til:** ARKITEKTUR-agent (diagrammer), API-DESIGN-ekspert (API-docs), SIKKERHETS-agent (hvis hemmeligheter funnet i docs)

### Hvordan jobber den?
1. **Analyser:** Forstå hva som trenger dokumentasjon, målgruppe, eksisterende docs
2. **Planlegg:** Prioritert rekkefølge — README → llms.txt → API → JSDoc → Diagrammer → CLAUDE.md
3. **Utfør:** Generer med konkrete verktøy (documentation.js, @babel/parser for AST, Claude API for oversettelser)
4. **Verifiser:** Valider docs mot faktisk kode, test eksempler, sjekk for hemmeligheter
5. **Lever:** Formatert output med filliste

### Hvilke funksjoner har den?
- **Auto-synk med kodeendringer:** Trigger på filopprettelse, API-endringer, skjemaoppdateringer
- **llms.txt-generering:** AI-vennlig kontekst for andre verktøy
- **Auto JSDoc-generering:** Fra kodekontekst via AST-parsing
- **Diagram-autogenerering:** Komponenttrær, API-flyter, databaseskjemaer i Mermaid
- **MCP-compliance:** Dokumentasjon tilgjengelig for AI via Model Context Protocol
- **Flerspråklig auto-oversettelse:** Med fallback-strategi
- **CI/CD-integrasjon:** npm-scripts for docs:sync, docs:generate, docs:llms
- **"Last Updated"-tidsstempler:** Dokumenterer seg selv

---

## PLANLEGGER-agent

### Markedsføring
**Tittel:** Fra vag idé til konkret plan
**Beskrivelse:** Planlegger-agenten tar en vag feature-beskrivelse og bryter den ned til konkrete oppgaver med akseptansekriterier og tidsestimater. Den lager avhengighetsgrafer og finner kritisk sti — slik at du alltid vet hva som skal gjøres i hvilken rekkefølge.

### Hva gjør denne agenten?
Konverterer vage idéer til konkrete, nedbrutte oppgaver med klare akseptansekriterier. Bruker AI-WBS (Work Breakdown Structure) for automatisk hierarkisk nedbrytning.

### Hvorfor er det viktig?
Uten planlegging ender man opp med å bygge feil ting eller glemme viktige deler. Planlegger-agenten sikrer at hver funksjon er brutt ned i håndterbare biter med målbare kriterier for "ferdig".

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** OPPSTART-agent (Fase 1), KRAV-agent (Fase 2), ITERASJONS-agent (Fase 5), direkte av bruker
- **Eskalerer til:** SIKKERHETS-agent (sikkerhetsrelatert omfang), ARKITEKTUR-agent (tech stack), bruker (omfangsendringer)

### Hvordan jobber den?
1. **Analyser:** Forstå krav, velg estimeringsmodus (AI/hybrid)
2. **Definer problem og løsning:** Formuler problemstilling, identifiser interessenter
3. **AI-WBS-generering:** Auto-opprett Epic → Feature → Task hierarki
4. **Akseptansekriterier:** Given-When-Then format med edge cases
5. **Estimer og avhengigheter:** Tre-punkts estimater, Mermaid-grafer, kritisk sti
6. **Agentkoordinering:** Definer hvilke agenter som trengs, identifiser konflikter
7. **Verifiser:** Er alle oppgaver konkrete og målbare?

### Hvilke funksjoner har den?
- **AI-WBS Generator:** Auto-bryter funksjoner ned i Epic → Feature → Task hierarki
- **Dual-modus estimering:**
  - AI-modus (vibekoding): 15 min til 8 timer per oppgave
  - Hybrid-modus (kritisk): 2 timer til 3 dager
  - Tre-punkts estimering: Optimistisk/Realistisk/Pessimistisk
- **Dynamiske avhengighetsgrafer:** Mermaid-format, auto-oppdateres ved omfangsendring
- **Agentkoordinering:** Løser konflikter mellom BYGGER/REVIEWER/SIKKERHETS
- **PRD-generering:** Problemstilling, suksessmetrikker, edge cases
- **Aldri oppgaver >4 timer (AI) eller >3 dager (hybrid)**
- **plan.md persisterer mellom sesjoner** (ulikt TodoWrite)

---

## REVIEWER-agent

### Markedsføring
**Tittel:** Fire eksperter reviewar koden din samtidig
**Beskrivelse:** Reviewer-agenten kjører fire samtidige spesialiserte gjennomganger — sikkerhet, kvalitet, ytelse og arkitektur — i én review. Spesialdesignet for AI-generert kode, med mønstergjenkjenning for typiske AI-feil som hallusinerte bypasses og glemte feilhåndteringer.

### Hva gjør denne agenten?
Utfører flerdimensjonal kode-review optimalisert for AI-generert kode (vibekoding). Kjører 4 samtidige spesialiserte gjennomganger i én agent.

### Hvorfor er det viktig?
AI-generert kode har spesifikke svakheter — hallusinerte bypasses, overoptimistisk validering, manglende feilhåndtering. Reviewer-agenten kjenner disse mønstrene og fanger dem opp systematisk.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** ITERASJONS-agent (Fase 5), KVALITETSSIKRINGS-agent (Fase 6), BYGGER-agent (etter implementasjon), CODE-QUALITY-GATE-ekspert, direkte av bruker
- **Eskalerer til:** SIKKERHETS-agent (BLOCKER sikkerhet), YTELSE-ekspert (ytelsesproblemer), ARKITEKTUR-agent (konflikter), bruker (kritiske AI-mønstre)

### Hvordan jobber den?
1. **Analyser:** Forstå spec og akseptansekriterier
2. **Planlegg:** Bygg kunnskapsgraff av berørte filer
3. **Utfør:** Kjør alle 4 review-roller sekvensielt (samme agent, ulikt fokus):
   - SIKKERHET: OWASP, input-validering, autentisering
   - KVALITET: Lesbarhet, DRY, SOLID
   - YTELSE: N+1 queries, bundle-størrelse
   - ARKITEKTUR: Konsistens, mønstre, avhengigheter
4. **Verifiser:** Aggreger funn, auto-grader alvorlighet, kjør false-positive filter
5. **Lever:** Strukturert rapport (GODKJENT / GODKJENT_MED_KOMMENTARER / AVVIST)

### Hvilke funksjoner har den?
- **Multi-agent review (4 roller):** Sikkerhet, Kvalitet, Ytelse, Arkitektur — i samme agent
- **Kontekst-bevisst analyse:** Bygger kunnskapsgraff av berørte filer
- **Konstruktivt "vi"-språk:** Løsningsfokusert, ikke anklagende
- **Automatisk alvorlighetsgradering:** BLOCKER / BØR-FIKSES / NICE-TO-HAVE
- **AI-feilmønster-gjenkjenning:** Hallusinerte bypasses, overoptimistisk validering, import-hallusinasjoner, konsistensdrift, manglende cleanup
- **Vibekoding false-positive filter:** Lærer hvilke advarsler som er irrelevante for AI-kode
- **3 mulige utfall:** GODKJENT, GODKJENT_MED_KOMMENTARER, AVVIST

---

## SIKKERHETS-agent

### Markedsføring
**Tittel:** Sikkerhetsvakt med AI-superkrefter
**Beskrivelse:** Sikkerhets-agenten utfører komplett sikkerhetsrevisjon — trusselmodellering, dyp kodeanalyse, forsyningskjede-sjekk, hemmelighetsscanning og compliance-validering. Den har en innebygd validator som fjerner AI-hallusinasjoner fra egne sikkerhetsrapporter.

### Hva gjør denne agenten?
Utfører komplett sikkerhetsrevisjon med fokus på AI-generert kode og compliance. Inkluderer trusselmodellering, dyp kodeanalyse, SBOM-generering, forsyningskjede-overvåking og hemmelighetsscanning.

### Hvorfor er det viktig?
Sikkerhet er ikke noe man legger til på slutten — det må bygges inn fra start. Sikkerhets-agenten finner sårbarheter som vanlige verktøy ikke fanger, spesielt i AI-generert kode som har en feilrate på 24,7%.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** MVP-agent (Fase 4), ITERASJONS-agent (Fase 5), KVALITETSSIKRINGS-agent (Fase 6), BYGGER-agent (ved sikkerhetsspørsmål), direkte av bruker
- **Eskalerer til:** Bruker/juridisk (compliance-spørsmål), INCIDENT-RESPONSE-ekspert (0-day), OWASP-ekspert (dypere analyse)

### Hvordan jobber den?
1. **Analyser:** Klassifiser datasensitivitet, identifiser angrepsflate, sjekk compliance-behov
2. **Planlegg:** Rekkefølge: Trusselmodellering → Kodeanalyse → Forsyningskjede → Hemmeligheter → Compliance
3. **Utfør:**
   - Generer STRIDE-trusselmodell
   - Valider trusler internt (fjerner hallusinasjoner med innebygd VALIDATOR-rolle)
   - Aardvark-skanning for semantiske sårbarheter
   - Generer SBOM + avhengighetsrevisjon
   - Pre-commit hemmelighetssjekk
   - GDPR/EU AI Act compliance-review
4. **Verifiser:** Valider alle funn mot krav, DREAD-scorer hvert problem
5. **Lever:** Utbedringsplan med prioritert tidslinje

### Hvilke funksjoner har den?
- **AI-assistert trusselmodellering (STRIDE GPT):** Med intern validator som fjerner AI-hallusinasjoner
- **Aardvark-inspirert dyp kodeanalyse:** Semantisk forståelse med full repo-kontekst
- **SBOM-generering:** Software Bill of Materials per CycloneDX/SPDX
- **Forsyningskjede-overvåking:** Typosquatting, dependency confusion, skadelig kode-deteksjon
- **Pre-commit hemmelighetsscanning:** Stopper lekkasjer FØR de når repository
- **EU AI Act compliance-sjekk:** Risikoklassifisering, transparenskrav
- **OIDC workload identity:** Erstatter statiske API-nøkler med kortlevde tokens
- **MAESTRO-trusselmodellering:** Spesialisert for AI/ML-systemer
- **Innebygd VALIDATOR-rolle:** Del av agenten, verifiserer egne funn

---

## VEILEDER-agent

### Markedsføring
**Tittel:** Din personlige rådgiver — uten å endre noe
**Beskrivelse:** Veileder-agenten svarer på alle spørsmål om Kit CC, prosjektet ditt, teknologi og beste praksis — uten å endre en eneste fil. Den søker automatisk på nett for oppdatert informasjon og bruker sokratisk metode for å hjelpe deg ta egne beslutninger.

### Hva gjør denne agenten?
Read-only veiledning og kunnskapsdeling. Forklarer Kit CC, svarer på prosjektspørsmål, gir teknologiråd med automatisk nettsøk, og bruker sokratisk metode for beslutningsspørsmål.

### Hvorfor er det viktig?
Noen ganger vil du bare forstå — ikke bygge. Veileder-agenten gir svar uten risiko for å ødelegge noe, og hjelper deg ta informerte beslutninger gjennom spørsmål i stedet for å diktere svar.

### Hvilke andre agenter kaller den / hvem kaller denne?
- **Kalles av:** Direkte av bruker (via boot-gate steg 0: "Spørre"-modus)
- **Kaller IKKE:** Noen andre agenter eller prosesser

### Hvordan jobber den?
1. **Kategoriser spørsmål:**
   - Kit CC-spørsmål → Les lokale docs (CLAUDE.md, agentfiler, klassifiseringssystem)
   - Prosjektspørsmål → Les PROJECT-STATE.json, PROGRESS-LOG, docs/
   - Teknologi-spørsmål → Søk automatisk på nett for oppdatert praksis
   - Beslutningsspørsmål → Sokratisk metode: 1-2 oppklaringsspørsmål, presenter alternativer med fordeler/ulemper, la bruker velge
2. **Lever svar med kilder**

### Hvilke funksjoner har den?
- **Read-only:** Endrer ALDRI filer, kjører ALDRI bash eller kode
- **Automatisk nettsøk:** For versjonsnumre, "nyeste", "beste praksis", rammeverk
- **Sokratisk metode:** Stiller oppklaringsspørsmål i stedet for å gi ja/nei-svar
- **Tre kunnskapskilder:** Kit CC-docs (prioritert), prosjektfiler, nettsøk
- **Trygg modus:** Starter aldri faser, aktiverer aldri agenter, leser aldri arkiv
