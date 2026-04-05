## Komplett agent-oversikt: 50 agenter

------

## NIVÅ 0: SYSTEM-AGENTER (5 stk)

### SYS-001: ORCHESTRATOR

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Sentral koordinator som ruter oppgaver, håndterer handoffs mellom agenter, og sikrer riktig agent aktiveres |
| **Hvorfor viktig**    | Uten denne fungerer ingenting - den er "hjernen" som vet hvilken agent som skal gjøre hva |
| **Problem som løses** | Kaos og forvirring når mange agenter skal samarbeide. Brukeren slipper å vite hvilken agent de skal bruke |
| **Hvordan det løses** | Analyserer brukerens forespørsel, klassifiserer oppgaven, og delegerer til riktig prosess-agent |
| **Verdi**             | Sømløs brukeropplevelse - brukeren snakker med én "assistent" som automatisk koordinerer spesialister |

### SYS-002: CONTEXT-LOADER

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Laster prosjektkontekst ved session-start (CLAUDE.md, mappestruktur, tidligere beslutninger) |
| **Hvorfor viktig**    | AI mister kontekst mellom sesjoner - denne gjenoppretter "hukommelsen" |
| **Problem som løses** | AI som starter fra scratch hver gang og gir inkonsistente svar |
| **Hvordan det løses** | Leser prosjektfiler automatisk og bygger opp en mental modell av prosjektet |
| **Verdi**             | Kontinuitet - AI husker tech stack, konvensjoner, og tidligere beslutninger |

### SYS-003: AUTO-CLASSIFIER

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Klassifiserer prosjektet (Lite internt → Internt m/data → Kundevendt → Stor skala) |
| **Hvorfor viktig**    | Ulike prosjekter trenger ulik mengde sikkerhet, dokumentasjon og testing |
| **Problem som løses** | Over-engineering av små prosjekter, under-engineering av kritiske systemer |
| **Hvordan det løses** | Stiller 5 klassifiseringsspørsmål (K1-K5) og matcher mot matrise |
| **Verdi**             | Riktig mengde arbeid for riktig prosjekt - spar tid på små prosjekter, sikre store |

### SYS-004: PHASE-GATES

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Validerer at alle krav er oppfylt før overgang til neste fase |
| **Hvorfor viktig**    | Forhindrer at kritiske steg hoppes over                      |
| **Problem som løses** | Prosjekter som går til produksjon uten tilstrekkelig testing/sikkerhet |
| **Hvordan det løses** | Sjekkliste-validering ved hver faseovergang med MÅ/BØR/KAN-krav |
| **Verdi**             | Kvalitetssikring - garanterer at fundament er på plass før man bygger videre |

### SYS-005: AGENT-PROTOCOL

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Kommunikasjonsstandard mellom agenter (format, handoff-protokoll) |
| **Hvorfor viktig**    | Agenter må "snakke samme språk" for å samarbeide effektivt   |
| **Problem som løses** | Tap av informasjon ved overlevering mellom agenter           |
| **Hvordan det løses** | Definerer standardformat for input/output, kontekst-overføring, og feilhåndtering |
| **Verdi**             | Pålitelig kommunikasjon - ingen informasjon går tapt mellom agenter |

------

## NIVÅ 1: BASIS-AGENTER (6 stk)

### BAS-001: PLANLEGGER-agent

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | PRD (Product Requirements Document), oppgavenedbrytning, strategisk planlegging |
| **Hvorfor viktig**    | God planlegging er 80% av suksess - "measure twice, cut once" |
| **Problem som løses** | Kaotisk utvikling uten klar retning, scope creep, glemte krav |
| **Hvordan det løses** | Strukturert nedbrytning av features til konkrete oppgaver med akseptansekriterier |
| **Verdi**             | Klar retning, målbare leveranser, forutsigbar progresjon     |

### BAS-002: BYGGER-agent

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Implementerer kode i 3 stages: UI → Funksjon → Sikkerhet     |
| **Hvorfor viktig**    | Strukturert bygging sikrer at sikkerhet ikke glemmes til slutt |
| **Problem som løses** | Kode som "fungerer" men mangler sikkerhet, validering, eller feilhåndtering |
| **Hvordan det løses** | Tvungen 3-stegs prosess der sikkerhet er innebygd, ikke påklistret |
| **Verdi**             | Sikker kode fra starten - reduserer teknisk gjeld og sårbarheter |

### BAS-003: REVIEWER-agent

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Code review, kvalitetssjekk, beste praksis-validering        |
| **Hvorfor viktig**    | "Fire øyne" fanger feil som utvikleren selv ikke ser         |
| **Problem som løses** | Bugs, sikkerhetshull, og dårlig kode som slipper gjennom     |
| **Hvordan det løses** | Systematisk gjennomgang med sjekkliste for sikkerhet, kvalitet, og lesbarhet |
| **Verdi**             | Høyere kodekvalitet, færre bugs i produksjon, kunnskapsdeling |

### BAS-004: SIKKERHETS-agent

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Security audit, sårbarhetssjekk, input-validering, auth-review |
| **Hvorfor viktig**    | 45% av AI-generert kode har sikkerhetssårbarheter            |
| **Problem som løses** | Sikkerhetshull som SQL injection, XSS, broken access control |
| **Hvordan det løses** | OWASP-basert scanning, hemmelighetssjekk, auth/authz-validering |
| **Verdi**             | Beskytter brukere og data - unngår kostbare sikkerhetsbrudd  |

### BAS-005: DEBUGGER-agent

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Feilsøking, bug-fixing, root cause analysis                  |
| **Hvorfor viktig**    | Bugs er uunngåelige - rask og presis feilsøking sparer tid   |
| **Problem som løses** | Timer brukt på å lete etter bugs, symptom-fixing i stedet for rotårsak |
| **Hvordan det løses** | Systematisk isolering, reproduksjon, og rotårsak-analyse     |
| **Verdi**             | Raskere bug-fixing, permanente løsninger i stedet for plaster |

### BAS-006: DOKUMENTERER-agent

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | README, API-docs, teknisk dokumentasjon, CLAUDE.md           |
| **Hvorfor viktig**    | Kode uten dokumentasjon er ubrukelig for andre (og deg selv om 6 mnd) |
| **Problem som løses** | Udokumentert kode, utdatert dokumentasjon, onboarding-problemer |
| **Hvordan det løses** | Auto-genererer docs fra kode, holder synkronisert med endringer |
| **Verdi**             | Lettere vedlikehold, raskere onboarding, redusert "bus factor" |

------

## NIVÅ 2: PROSESS-AGENTER (7 stk)

### PRO-001: OPPSTART-agent (Fase 1)

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Idé, visjon, risikovurdering, dataklassifisering, Go/No-Go   |
| **Hvorfor viktig**    | Avgjør om prosjektet i det hele tatt bør startes             |
| **Problem som løses** | Prosjekter som starter uten klar retning eller dør underveis |
| **Hvordan det løses** | 22 strukturerte oppgaver: problemdefinisjon, JTBD, persona, risiko, validering |
| **Verdi**             | Unngår å kaste bort tid på dårlige ideer - validerer før du bygger |

### PRO-002: KRAV-agent (Fase 2)

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Brukerhistorier, sikkerhetskrav, MVP-definisjon, edge cases  |
| **Hvorfor viktig**    | Klare krav = klart produkt. Uklare krav = endeløse endringer |
| **Problem som løses** | "Jeg visste ikke at du mente DET" - misforståelser mellom stakeholders |
| **Hvordan det løses** | MoSCoW-prioritering, brukerhistorier med akseptansekriterier |
| **Verdi**             | Felles forståelse, prioritert backlog, målbar MVP            |

### PRO-003: ARKITEKTUR-agent (Fase 3)

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Tech stack-valg, database-design, API-design, trusselmodellering |
| **Hvorfor viktig**    | Arkitektur-feil er dyre å fikse senere - design riktig fra start |
| **Problem som løses** | Feil tech stack, dårlig skalerbarhet, sikkerhetshull i design |
| **Hvordan det løses** | Systematisk evaluering av alternativer, STRIDE-analyse, dokumenterte beslutninger |
| **Verdi**             | Solid fundament som skalerer - unngår kostbar re-arkitektering |

### PRO-004: MVP-agent (Fase 4)

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Prosjektoppsett, Git, CI/CD, første prototype med sikkerhet  |
| **Hvorfor viktig**    | Første kode setter standarden - gjør det riktig fra dag 1    |
| **Problem som løses** | Prosjekter som starter uten CI/CD, secrets i kode, ingen tester |
| **Hvordan det løses** | Komplett oppsett med .gitignore, .env.example, GitHub Actions, sikkerhetsskanning |
| **Verdi**             | Profesjonell start - CI/CD fra dag 1, sikkerhet innebygd     |

### PRO-005: ITERASJONS-agent (Fase 5)

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Feature-utvikling, code review, brukervalidering, polering   |
| **Hvorfor viktig**    | Her bygges produktet - kvaliteten her bestemmer sluttresultatet |
| **Problem som løses** | Features som ingen vil ha, teknisk gjeld som hoper seg opp   |
| **Hvordan det løses** | Iterativ utvikling med brukervalidering, kontinuerlig code review |
| **Verdi**             | Produkt brukerne faktisk vil ha, håndterbar teknisk gjeld    |

### PRO-006: KVALITETSSIKRINGS-agent (Fase 6)

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | E2E-testing, OWASP-testing, GDPR, tilgjengelighet, cross-browser |
| **Hvorfor viktig**    | Siste sjanse til å fange problemer før produksjon            |
| **Problem som løses** | Bugs i prod, sikkerhetshull, compliance-brudd, utilgjengelig app |
| **Hvordan det løses** | Omfattende test-suite: funksjonell, sikkerhet, ytelse, tilgjengelighet |
| **Verdi**             | Trygg lansering - vet at produktet fungerer og er sikkert    |

### PRO-007: PUBLISERINGS-agent (Fase 7)

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Deploy, monitoring, vedlikehold, IR-plan, backup             |
| **Hvorfor viktig**    | Lansering er ikke slutten - drift er der verdien skapes      |
| **Problem som løses** | "Det fungerte på min maskin", nedetid uten varsling, ingen backup |
| **Hvordan det løses** | Produksjonsoppsett med monitoring, alerting, backup, og IR-plan |
| **Verdi**             | Pålitelig drift - vet når noe går galt og kan fikse raskt    |

------

## NIVÅ 3: EKSPERT-AGENTER (30 stk)

### Fase 1 eksperter

#### EKS-001: PERSONA-ekspert

|                       |                                                             |
| --------------------- | ----------------------------------------------------------- |
| **Brukes til**        | Jobs-to-be-Done, målgruppeanalyse, personas, brukerreise    |
| **Hvorfor viktig**    | Uten å forstå brukeren bygger du feil produkt               |
| **Problem som løses** | Produkter ingen vil ha fordi de ikke løser reelle problemer |
| **Hvordan det løses** | JTBD-framework, persona-maler, brukerreise-kartlegging      |
| **Verdi**             | Produkter som treffer - bygger det brukerne faktisk trenger |

#### EKS-002: LEAN-CANVAS-ekspert

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Forretningsmodell, kostnadsestimering, verdiforslag          |
| **Hvorfor viktig**    | Et produkt uten forretningsmodell er en hobby, ikke en business |
| **Problem som løses** | Produkter som ikke er bærekraftige økonomisk                 |
| **Hvordan det løses** | 9-felts Lean Canvas, break-even-analyse, verdiforslag-formulering |
| **Verdi**             | Bærekraftig forretning - vet hvordan du tjener penger        |

#### EKS-003: KONKURRANSEANALYSE-ekspert

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Markedsanalyse, differensiering, blue ocean-strategi         |
| **Hvorfor viktig**    | Må vite hva konkurrentene gjør for å skille deg ut           |
| **Problem som løses** | "Me too"-produkter som drukner i mengden                     |
| **Hvordan det løses** | Systematisk kartlegging av konkurrenter, gap-analyse, differensiering |
| **Verdi**             | Klar posisjonering - vet hvorfor kunder skal velge deg       |

### Fase 2 eksperter

#### EKS-004: WIREFRAME-ekspert

|                       |                                                         |
| --------------------- | ------------------------------------------------------- |
| **Brukes til**        | UI-skisser, brukerflyt, low-fidelity prototyper         |
| **Hvorfor viktig**    | Billigere å endre en skisse enn ferdig kode             |
| **Problem som løses** | Dyre UI-endringer sent i prosjektet                     |
| **Hvordan det løses** | Raske skisser som kan testes og itereres før koding     |
| **Verdi**             | Raskere iterasjon - test ideer før du investerer i kode |

#### EKS-005: API-DESIGN-ekspert

|                       |                                                         |
| --------------------- | ------------------------------------------------------- |
| **Brukes til**        | OpenAPI/Swagger, REST-design, maskinlesbare specs       |
| **Hvorfor viktig**    | API er kontrakten mellom frontend og backend            |
| **Problem som løses** | Uklare API-er som fører til integrasjonsproblemer       |
| **Hvordan det løses** | OpenAPI-spec først, auto-generert dokumentasjon         |
| **Verdi**             | Klar kontrakt - frontend og backend kan jobbe parallelt |

### Fase 3 eksperter

#### EKS-006: TRUSSELMODELLERINGS-ekspert

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | STRIDE-analyse, DREAD-rangering, attack surfaces             |
| **Hvorfor viktig**    | Tenk som en angriper FØR angriperne gjør det                 |
| **Problem som løses** | Sikkerhetshull som oppdages først når de utnyttes            |
| **Hvordan det løses** | Systematisk gjennomgang: Spoofing, Tampering, Repudiation, Info disclosure, DoS, Elevation |
| **Verdi**             | Proaktiv sikkerhet - finner hull før hackerne                |

#### EKS-007: DATAMODELL-ekspert

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | ER-diagram, normalisering, RLS (Row Level Security), indeksering |
| **Hvorfor viktig**    | Databasedesign er fundamentet - feil her koster dyrt         |
| **Problem som løses** | Dårlig ytelse, data-integritetsproblemer, sikkerhetshull     |
| **Hvordan det løses** | Normalisering, RLS-policies, optimale indekser               |
| **Verdi**             | Rask, sikker database som skalerer                           |

### Fase 4 eksperter

#### EKS-008: HEMMELIGHETSSJEKK-ekspert

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Secrets-scanning, .env-håndtering, git-historikk-sjekk       |
| **Hvorfor viktig**    | Én hardkodet API-nøkkel kan koste millioner                  |
| **Problem som løses** | Secrets i kode, git-historikk, eller logger                  |
| **Hvordan det løses** | Automatisk scanning med gitleaks/trufflehog, pre-commit hooks |
| **Verdi**             | Beskytter credentials - unngår kostbare lekkasjer            |

#### EKS-009: CICD-ekspert

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | GitHub Actions, pipelines, automatisert deploy               |
| **Hvorfor viktig**    | Manuell deploy = menneskelige feil og inkonsistens           |
| **Problem som løses** | "Fungerte på min maskin", glemte steg, inkonsistente deploys |
| **Hvordan det løses** | Automatisert pipeline: lint → test → build → deploy          |
| **Verdi**             | Konsistente, repeterbare deploys uten menneskelige feil      |

#### EKS-010: SUPPLY-CHAIN-ekspert

|                       |                                                            |
| --------------------- | ---------------------------------------------------------- |
| **Brukes til**        | Package-verifisering, lockfiles, SBOM, typosquatting-sjekk |
| **Hvorfor viktig**    | Dependencies er #3 på OWASP Top 10 - angrepsvektor         |
| **Problem som løses** | Ondsinnede pakker, utdaterte biblioteker med sårbarheter   |
| **Hvordan det løses** | npm audit, lockfile-verifikasjon, SBOM-generering          |
| **Verdi**             | Sikker forsyningskjede - vet hva som er i koden din        |

### Fase 5 eksperter

#### EKS-011: BRUKERTEST-ekspert

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Brukervalidering, feedback-analyse, usability-testing        |
| **Hvorfor viktig**    | Brukernes mening > utviklerens antakelser                    |
| **Problem som løses** | Features ingen bruker, forvirrende UX                        |
| **Hvordan det løses** | Strukturerte brukertester, Mom Test-intervjuer, feedback-analyse |
| **Verdi**             | Produkt brukerne elsker - bygger det de faktisk trenger      |

#### EKS-012: YTELSE-ekspert

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Lighthouse, Core Web Vitals, optimalisering                  |
| **Hvorfor viktig**    | 1 sekund ekstra lastetid = 7% lavere konvertering            |
| **Problem som løses** | Treg app som frustrerer brukere                              |
| **Hvordan det løses** | Lighthouse-audit, bilde-optimalisering, code splitting, caching |
| **Verdi**             | Rask app = fornøyde brukere og bedre SEO                     |

#### EKS-013: UI/UX-ekspert

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Polering, loading states, responsivitet, micro-interaksjoner |
| **Hvorfor viktig**    | Detaljer skiller profesjonelt fra amatør                     |
| **Problem som løses** | "Fungerer men føles billig" - manglende polish               |
| **Hvordan det løses** | Loading skeletons, smooth transitions, error states, responsive design |
| **Verdi**             | Profesjonell følelse - brukere stoler mer på polerte produkter |

#### EKS-014: REFAKTORING-ekspert

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Teknisk gjeld, kode-duplisering, arkitektur-rot              |
| **Hvorfor viktig**    | Teknisk gjeld akkumulerer renter - fiks før det blir uhåndterbart |
| **Problem som løses** | Kodebase som blir vanskeligere å vedlikeholde over tid       |
| **Hvordan det løses** | Identifiser hotspots, prioriter etter forretningsimpact, inkrementell refaktorering |
| **Verdi**             | Vedlikeholdbar kodebase - raskere utvikling på sikt          |

### Fase 6 eksperter

#### EKS-015: OWASP-ekspert

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | OWASP Top 10:2025 testing, penetrasjonstesting, sårbarhetsanalyse |
| **Hvorfor viktig**    | OWASP Top 10 dekker de vanligste sikkerhetshullene           |
| **Problem som løses** | Broken access control, injection, security misconfiguration  |
| **Hvordan det løses** | Systematisk testing av hver OWASP-kategori med konkrete tester |
| **Verdi**             | Beskyttet mot de vanligste angrepene                         |

#### EKS-016: GDPR-ekspert

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Personvernforordningen, DPIA, samtykke, rett til sletting    |
| **Hvorfor viktig**    | GDPR-bøter kan være opptil 4% av global omsetning            |
| **Problem som løses** | Ulovlig behandling av persondata                             |
| **Hvordan det løses** | Sjekkliste for samtykke, dataportabilitet, sletting, personvernerklæring |
| **Verdi**             | Lovlig drift - unngår bøter og omdømmetap                    |

#### EKS-017: TILGJENGELIGHETS-ekspert

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | WCAG 2.2 AA, skjermleser, tastaturnavigasjon                 |
| **Hvorfor viktig**    | 15% av befolkningen har funksjonsnedsettelser - stor brukergruppe |
| **Problem som løses** | App som ekskluderer brukere med funksjonsnedsettelser        |
| **Hvordan det løses** | WCAG-sjekkliste, skjermleser-testing, tastatur-navigasjon    |
| **Verdi**             | Inkluderende produkt - når flere brukere, ofte lovpålagt     |

#### EKS-018: CROSS-BROWSER-ekspert

|                       |                                                             |
| --------------------- | ----------------------------------------------------------- |
| **Brukes til**        | Safari-quirks, CSS-kompatibilitet, polyfills                |
| **Hvorfor viktig**    | "Fungerer i Chrome" ≠ "Fungerer overalt"                    |
| **Problem som løses** | Bugs som kun oppstår i Safari, Firefox, eller Edge          |
| **Hvordan det løses** | Systematisk testing i alle målnettlesere, polyfill-strategi |
| **Verdi**             | Konsistent opplevelse for alle brukere uansett nettleser    |

#### EKS-019: LASTTEST-ekspert

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Load testing, stress testing, k6/Artillery                   |
| **Hvorfor viktig**    | Vet ikke om systemet tåler belastning før du tester          |
| **Problem som løses** | Krasj ved lansering eller høy trafikk                        |
| **Hvordan det løses** | Simuler realistisk last, finn flaskehalser, sett kapasitetsgrenser |
| **Verdi**             | Trygg skalering - vet hvor mye systemet tåler                |

### Fase 7 eksperter

#### EKS-020: MONITORING-ekspert

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Sentry, logging, SLI/SLO, golden signals, alerting           |
| **Hvorfor viktig**    | Kan ikke fikse problemer du ikke vet om                      |
| **Problem som løses** | Problemer i prod som ingen oppdager før brukere klager       |
| **Hvordan det løses** | Strukturert logging, feil-tracking (Sentry), custom metrics, alerts |
| **Verdi**             | Proaktiv drift - oppdager problemer før brukerne             |

#### EKS-021: INCIDENT-RESPONSE-ekspert

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | IR-plan, eskalering, post-mortem, beredskap                  |
| **Hvorfor viktig**    | Når (ikke hvis) noe går galt - ha en plan                    |
| **Problem som løses** | Kaos og panikk når produksjon er nede                        |
| **Hvordan det løses** | Dokumentert IR-plan, eskaleringsmatrise, post-mortem-template |
| **Verdi**             | Rask respons - minimerer nedetid og skade                    |

#### EKS-022: BACKUP-ekspert

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | 3-2-1-regel, disaster recovery, gjenoppretting               |
| **Hvorfor viktig**    | Data som ikke er backupet er data du ikke bryr deg om        |
| **Problem som løses** | Datatap ved feil, hacking, eller naturkatastrofer            |
| **Hvordan det løses** | 3-2-1-backup (3 kopier, 2 medier, 1 offsite), test-restore   |
| **Verdi**             | Dataintegritet - kan alltid gjenopprette til kjent god tilstand |

### Research-baserte eksperter (Nye 2026)

#### EKS-023: AI-GOVERNANCE-ekspert 🔴

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | AI-generert kode dokumentasjon, prompt-sporing, governance compliance |
| **Hvorfor viktig**    | Enterprise krever sporbarhet på AI-generert kode             |
| **Problem som løses** | "Hvem skrev denne koden? Hvilken prompt?" - uklart opphav    |
| **Hvordan det løses** | Logger alle AI-interaksjoner, tagger kode med opprinnelse, compliance-rapporter |
| **Verdi**             | Sporbar AI - tilfredsstiller compliance og audit-krav        |

#### EKS-024: TEST-GENERATOR-ekspert 🔴

|                       |                                                      |
| --------------------- | ---------------------------------------------------- |
| **Brukes til**        | Automatisk generering av unit-tester og E2E-tester   |
| **Hvorfor viktig**    | 70% av QA-teams bruker AI for testgenerering i 2026  |
| **Problem som løses** | Manuell test-skriving er tidkrevende og kjedelig     |
| **Hvordan det løses** | Analyserer kode og spec, genererer tester automatisk |
| **Verdi**             | Høyere test-dekning med mindre innsats               |

#### EKS-025: SELF-HEALING-TEST-ekspert 🟡

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Automatisk vedlikehold av testsuiter når app endres          |
| **Hvorfor viktig**    | Tester som alltid feiler blir ignorert - "test fatigue"      |
| **Problem som løses** | Tester som brekker ved hver UI-endring                       |
| **Hvordan det løses** | AI oppdaterer selectors, assertions når app endres           |
| **Verdi**             | Vedlikeholdbare tester - fokuser på features, ikke test-fixing |

#### EKS-026: INFRASTRUKTUR-ekspert 🟡

|                       |                                                             |
| --------------------- | ----------------------------------------------------------- |
| **Brukes til**        | Kubernetes, cloud-native, IaC (Terraform/Pulumi)            |
| **Hvorfor viktig**    | Modern infrastruktur er kompleks - spesialkompetanse kreves |
| **Problem som løses** | Manuell infrastruktur-håndtering, konfigurasjonsdrift       |
| **Hvordan det løses** | Infrastructure as Code, Kubernetes-manifester, auto-scaling |
| **Verdi**             | Repeterbar infrastruktur - konsistent på tvers av miljøer   |

#### EKS-027: DESIGN-TIL-KODE-ekspert 🟡

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Figma til React/Vue-komponenter, design system-implementering |
| **Hvorfor viktig**    | Gap mellom designer og utvikler skaper friksjon              |
| **Problem som løses** | "Det ser ikke ut som designet" - translation loss            |
| **Hvordan det løses** | Automatisk konvertering fra Figma, design tokens, komponent-mapping |
| **Verdi**             | Pixel-perfect implementering - designer og utvikler snakker samme språk |

#### EKS-028: PROMPT-INGENIØR-ekspert 🟢

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Validerer og forbedrer prompts, prompt-bibliotek             |
| **Hvorfor viktig**    | Prompt-kvalitet = AI-output-kvalitet                         |
| **Problem som løses** | Dårlige prompts gir dårlige resultater                       |
| **Hvordan det løses** | Prompt-templates, testing, iterasjon, bibliotek med velprøvde prompts |
| **Verdi**             | Bedre AI-output - mer konsistent og pålitelig                |

#### EKS-029: MIGRASJON-ekspert 🟢

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Oppgraderer dependencies, migrerer mellom versjoner          |
| **Hvorfor viktig**    | Utdaterte dependencies = sikkerhetshull                      |
| **Problem som løses** | "Vi tør ikke oppgradere - noe kan brekke"                    |
| **Hvordan det løses** | Automatisert migrering med testing, codemods, gradvis utrulling |
| **Verdi**             | Alltid oppdatert - sikker og modern stack                    |

#### EKS-030: SRE-ekspert 🟢

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Brukes til**        | Site Reliability Engineering, SLI/SLO, error budgets         |
| **Hvorfor viktig**    | SRE-praksis er standarden for pålitelige systemer            |
| **Problem som løses** | "Vi vet ikke hvor pålitelige vi er" - ingen målinger         |
| **Hvordan det løses** | Definer SLI (hva måler vi), SLO (hva er målet), error budget (hvor mye nedetid er OK) |
| **Verdi**             | Målbar pålitelighet - data-drevet beslutning om features vs. stabilitet |

------

## Oppsummering

| Nivå      | Antall | Hovedverdi                     |
| --------- | ------ | ------------------------------ |
| System    | 5      | Koordinering og infrastruktur  |
| Basis     | 7      | Tverrfaglige verktøy           |
| Prosess   | 7      | Fase-koordinering              |
| Ekspert   | 31     | Spesialistkompetanse           |
| **Total** | **50** | **Komplett utviklingsprosess** |