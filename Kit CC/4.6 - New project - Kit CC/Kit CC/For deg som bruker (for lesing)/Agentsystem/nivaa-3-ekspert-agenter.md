# Nivå 3: Ekspert-agenter

> Spesialistene. 32 ekspert-agenter med dyp kunnskap innen hvert sitt felt — fra OWASP-sikkerhet til GDPR-compliance til lasttesting. De kalles inn av prosess- og basis-agenter når spesialistkompetanse trengs.

**Antall agenter:** 32
**Når de brukes:** On-demand, når en prosess- eller basis-agent trenger spesialisthjelp
**Synlighet for bruker:** Lav — jobber bak kulissene med spesialiserte leveranser

---

## Sikkerhet og compliance (7 agenter)

### OWASP-ekspert

**Markedsføring**
**Tittel:** Penetrasjonstesting mot bransjens toppstandard
**Beskrivelse:** Tester applikasjonen systematisk mot OWASP Top 10:2025 — pluss AI-spesifikke sårbarheter. Fra SQL injection til XSS, fra broken access control til AI red teaming.

**Hva gjør denne agenten?**
Utfører sikkerhetspenetrasjonstesting mot OWASP Top 10:2025 og tester for AI/LLM-spesifikke sårbarheter.

**Hvorfor er det viktig?**
OWASP Top 10 dekker de vanligste og farligste sårbarhetene i webapplikasjoner. Uten systematisk testing mot denne listen er det bare flaks som skiller deg fra en sikkerhetshendelse.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: KVALITETSSIKRINGS-agent (Fase 6), SIKKERHETS-agent
- Eskalerer til: SIKKERHETS-agent for remediering

**Hvordan jobber den?**
Tester systematisk alle 10 OWASP-kategorier: Broken Access Control, Cryptographic Failures, Injection, Insecure Design, Security Misconfiguration, Vulnerable Components, Authentication Failures, Data Integrity, Logging Failures, SSRF. Bruker AI red teaming (Garak/PyRIT) for LLM-sårbarheter.

**Hvilke funksjoner har den?**
- Komplett OWASP Top 10:2025 testing
- AI red teaming med Garak og PyRIT
- Vibekoding-feilmønster-deteksjon
- Automatisert sårbarhetsfunn
- Risikovurdering med alvorlighetsgradering

---

### HEMMELIGHETSSJEKK-ekspert

**Markedsføring**
**Tittel:** Stopper lekkasjer før de skjer
**Beskrivelse:** Scanner kodebasen for API-nøkler, passord og tokens — og setter opp systemer for å hindre at hemmeligheter noen gang når repository.

**Hva gjør denne agenten?**
Scanner kodebasen for lekkede hemmeligheter (API-nøkler, credentials, tokens) og implementerer hemmelighetsbehandlingspraksis.

**Hvorfor er det viktig?**
En enkelt lekket API-nøkkel kan koste tusenvis av kroner — eller verre. Denne agenten finner og stopper lekkasjer proaktivt.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: MVP-agent (Fase 4), KVALITETSSIKRINGS-agent (Fase 6), PUBLISERINGS-agent (Fase 7)

**Hvordan jobber den?**
Kjører Gitleaks-scanning, setter opp hemmelighetsbehandling (vault), konfigurerer rotasjonspolicyer, integrerer CI/CD hemmelighetsscanning og revisjonslogging.

**Hvilke funksjoner har den?**
- Hemmelighetsdeteeksjon (Gitleaks)
- Vault-oppsett for sikker lagring
- Rotasjonspolicyer for nøkler
- CI/CD-integrert scanning
- Pre-commit hooks for forebygging
- Revisjonslogging

---

### GDPR-ekspert

**Markedsføring**
**Tittel:** Personvern innebygd i koden
**Beskrivelse:** Sørger for at applikasjonen din følger GDPR fra dag én — samtykkebehandling, dataminimering, brukerrettigheter og personvernerklæring.

**Hva gjør denne agenten?**
Sikrer at applikasjoner overholder GDPR og andre personvernregler.

**Hvorfor er det viktig?**
GDPR-brudd kan gi bøter på opptil 4% av global omsetning. Denne agenten bygger compliance inn i koden i stedet for å bolte det på etterpå.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: ARKITEKTUR-agent (Fase 3), KVALITETSSIKRINGS-agent (Fase 6)

**Hvordan jobber den?**
Utfører personvernkonsekvensvurdering (DPIA), implementerer samtykkebehandling, dataminimering, brukerrettigheter (innsyn/sletting) og personverndokumentasjon.

**Hvilke funksjoner har den?**
- Personvernkonsekvensvurdering (DPIA)
- Samtykkebehandling
- Dataminimering
- Implementering av brukerrettigheter (innsyn, sletting, portabilitet)
- Personvernerklæring-generering
- DPA-mal (databehandleravtale)

---

### TRUSSELMODELLERINGS-ekspert

**Markedsføring**
**Tittel:** Finner truslene før angriperne gjør det
**Beskrivelse:** Systematisk identifikasjon av sikkerhetstrusler med STRIDE-rammeverket — Spoofing, Tampering, Repudiation, Information Disclosure, DoS og Elevation of Privilege.

**Hva gjør denne agenten?**
Identifiserer potensielle sikkerhetstrusler gjennom systematisk trusselmodellering med STRIDE-rammeverket.

**Hvorfor er det viktig?**
Man kan ikke beskytte seg mot trusler man ikke kjenner til. Trusselmodellering kartlegger angrepsflaten systematisk, slik at sikkerhetskontroller kan designes målrettet.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: ARKITEKTUR-agent (Fase 3), SIKKERHETS-agent, OWASP-ekspert

**Hvordan jobber den?**
Gjennomfører STRIDE-analyse per funksjon/komponent, scorer risikoer med DREAD, prioriterer mitigeringsstrategier og dokumenterer i trusselmodell.

**Hvilke funksjoner har den?**
- STRIDE-trusselmodellering
- DREAD-risikovurdering
- Angrepsflateanalyse
- Mitigeringsstrategier
- Trusselsimulering

---

### SUPPLY-CHAIN-ekspert

**Markedsføring**
**Tittel:** Sikrer avhengighetene dine
**Beskrivelse:** Analyserer alle tredjepartsbiblioteker for sårbarheter, lisenskonflikter og forsyningskjedeangrep — typosquatting, dependency confusion og skadelig kode.

**Hva gjør denne agenten?**
Håndterer avhengigheter, sårbarhetsskanning og sikker forsyningskjedepraksis for programvarekomponenter.

**Hvorfor er det viktig?**
Forsyningskjedeangrep økte 73% i 2025. En sårbar avhengighet kan kompromittere hele applikasjonen.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: MVP-agent (Fase 4), PUBLISERINGS-agent (Fase 7), SIKKERHETS-agent

**Hvordan jobber den?**
Utfører avhengighetsrevisjon, sårbarhetsskanning (OWASP Dependency-Check), lisenskompliance-sjekk og programvarekomposisjonsanalyse.

**Hvilke funksjoner har den?**
- Avhengighetsrevisjon
- Sårbarhetsskanning
- Lisenskompliance
- Programvarekomposisjonsanalyse (SCA)
- Sikker kildesporing

---

### AI-GOVERNANCE-ekspert

**Markedsføring**
**Tittel:** Ansvarlig AI — fra policy til kode
**Beskrivelse:** Sikrer etisk og regelrett bruk av AI i applikasjonen — fra bias-revisjon til EU AI Act compliance og forklarbarhetskrav.

**Hva gjør denne agenten?**
Spesialiserer seg på governance, compliance-rammeverk og ansvarlig AI-praksis for systemer som bruker AI-modeller.

**Hvorfor er det viktig?**
EU AI Act og lignende regelverk stiller nye krav til AI-systemer. Uten governance risikerer man bøter, omdømmeskade og uetisk bruk.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: KVALITETSSIKRINGS-agent (Fase 6), ARKITEKTUR-agent (Fase 3)

**Hvordan jobber den?**
Utvikler AI-policyer, utfører compliance-revisjon, etikk-gjennomgang, risikovurdering og regulatorisk tilpasning.

**Hvilke funksjoner har den?**
- AI-policyutvikling
- Compliance-revisjon (EU AI Act)
- Bias-revisjon
- Forklarbarhetskrav
- Risikoklassifisering
- Transparensretningslinjer

---

### INCIDENT-RESPONSE-ekspert

**Markedsføring**
**Tittel:** Klar når alarmen går
**Beskrivelse:** Utvikler hendelseshåndteringsplaner og krisehåndteringsstrategier — slik at teamet vet nøyaktig hva som skal gjøres når noe går galt i produksjon.

**Hva gjør denne agenten?**
Utvikler hendelseshåndteringsprosedyrer og krisehåndteringsstrategier for produksjonshendelser.

**Hvorfor er det viktig?**
Når produksjonen er nede, er det for sent å planlegge. Ferdige runbooks og eskaleringsrutiner reduserer nedetid dramatisk.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: PUBLISERINGS-agent (Fase 7), DEBUGGER-agent (produksjonsfeil)

**Hvordan jobber den?**
Oppretter runbooks, eskaleringsrutiner, kommunikasjonsmaler, post-mortem-metodikk og hendelsestriagering.

**Hvilke funksjoner har den?**
- Runbook-opprettelse
- Eskaleringsrutiner
- Kommunikasjonsmaler
- Post-mortem-metodikk
- Hendelsestriagering
- Vaktordning-design

---

## Arkitektur og design (5 agenter)

### API-DESIGN-ekspert

**Markedsføring**
**Tittel:** APIer som utviklere elsker
**Beskrivelse:** Designer RESTful og GraphQL APIer med fokus på skalerbarhet, sikkerhet og utvikleropplevelse — inkludert versjonering, rate limiting og OAuth/JWT.

**Hva gjør denne agenten?**
Ekspert i RESTful og GraphQL API-design med fokus på skalerbarhet, sikkerhet og utvikleropplevelse.

**Hvorfor er det viktig?**
APIer er kontrakten mellom frontend og backend. Dårlig API-design fører til teknisk gjeld, sikkerhetshull og frustrasjon.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: KRAV-agent (Fase 2), ARKITEKTUR-agent (Fase 3)

**Hvordan jobber den?**
Designer API-arkitektur, versjoneringsstrategier, rate limiting, genererer dokumentasjon og SDK-er, implementerer OAuth/JWT.

**Hvilke funksjoner har den?**
- RESTful og GraphQL design
- Versjoneringsstrategier
- Rate limiting
- Auto-dokumentasjon
- SDK-generering
- OAuth/JWT-implementering

---

### DATAMODELL-ekspert

**Markedsføring**
**Tittel:** Databasedesign som skalerer
**Beskrivelse:** Designer databaseskjemaer, optimerer spørringer og planlegger migrasjoner — slik at databasen din er rask, pålitelig og enkel å vedlikeholde.

**Hva gjør denne agenten?**
Designer databaseskjemaer, datamodeller og implementerer effektive spørringer for optimal ytelse.

**Hvorfor er det viktig?**
Databasen er fundamentet applikasjonen bygger på. Dårlig skjemadesign er ekstremt dyrt å fikse senere.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: ARKITEKTUR-agent (Fase 3)

**Hvordan jobber den?**
Designer skjema med normalisering, indekseringsstrategi, spørringsoptimering, dataintegritet og migrasjonsplanlegging.

**Hvilke funksjoner har den?**
- Skjemadesign og normalisering
- Indekseringsstrategi
- Spørringsoptimering
- Dataintegritet og constraints
- Migrasjonsplanlegging

---

### INFRASTRUKTUR-ekspert

**Markedsføring**
**Tittel:** Infrastruktur som kjører seg selv
**Beskrivelse:** Designer og konfigurerer infrastruktur — fra Vercel-deploy til auto-skalering, CDN og kostnadsoptimalisering.

**Hva gjør denne agenten?**
Designer og håndterer infrastruktur, DevOps, skaleringstrategier og deploymiljøer (Vercel, Supabase, AWS).

**Hvorfor er det viktig?**
God infrastruktur er usynlig — den bare fungerer. Dårlig infrastruktur gir nedetid, treg ytelse og uforutsigbare kostnader.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: MVP-agent (Fase 4), ARKITEKTUR-agent (Fase 3), PUBLISERINGS-agent (Fase 7)

**Hvordan jobber den?**
Infrastructure as Code, containerisering, auto-skalering, CDN-oppsett, overvåkingsinfrastruktur og kostnadsoptimalisering.

**Hvilke funksjoner har den?**
- Infrastructure as Code
- Containerisering
- Auto-skalering
- CDN-oppsett
- Overvåkingsinfrastruktur
- Kostnadsoptimalisering

---

### WIREFRAME-ekspert

**Markedsføring**
**Tittel:** Fra brukerreise til skjermbilder
**Beskrivelse:** Oversetter brukerreiser og krav til wireframes og prototyper — slik at du ser hvordan appen vil se ut før en eneste linje kode skrives.

**Hva gjør denne agenten?**
Lager wireframes og prototyper som mapper brukerreiser til grensesnittlayouter før visuelt design.

**Hvorfor er det viktig?**
Wireframes avdekker UX-problemer tidlig — når det koster minutter å fikse, ikke dager.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: KRAV-agent (Fase 2), ARKITEKTUR-agent (Fase 3)

**Hvordan jobber den?**
Lager wireframes, interaksjonskarting, prototyper, brukerflytdesign og oversetter krav til layouter.

**Hvilke funksjoner har den?**
- Wireframe-opprettelse
- Interaksjonskarting
- Prototypeutvikling
- Brukerflytdesign
- Krav-til-layout-oversetting

---

### UIUX-ekspert

**Markedsføring**
**Tittel:** Intuitive grensesnitt som brukerne forstår
**Beskrivelse:** Designer brukergrensesnitt og opplevelser som er intuitive, tilgjengelige og i tråd med beste praksis — fra informasjonsarkitektur til designsystemer.

**Hva gjør denne agenten?**
Designer intuitive brukergrensesnitt og opplevelser basert på personas og beste praksis.

**Hvorfor er det viktig?**
Dårlig UX dreper gode produkter. Denne agenten sikrer at grensesnittet er intuitivt, tilgjengelig og konsistent.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: ITERASJONS-agent (Fase 5), WIREFRAME-ekspert, DESIGN-TIL-KODE-ekspert

**Hvordan jobber den?**
Informasjonsarkitektur, interaksjonsdesign, brukertesting, designsystemer, tilgjengelighetsintegrasjon og brukerflyter.

**Hvilke funksjoner har den?**
- Informasjonsarkitektur
- Interaksjonsdesign
- Designsystem-utvikling
- Tilgjengelighetsintegrasjon
- Brukerflyt-optimering
- Responsivt design

---

## Testing (5 agenter)

### TEST-GENERATOR-ekspert

**Markedsføring**
**Tittel:** Automatisk testgenerering fra kode og krav
**Beskrivelse:** Genererer automatisk testcases — unit, integrasjon og E2E — fra kodebasen og kravspesifikasjonene. Testdekning på autopilot.

**Hva gjør denne agenten?**
Genererer automatisk omfattende testcases (unit, integrasjon, E2E) fra kode og krav.

**Hvorfor er det viktig?**
Manuell testskriving er tidkrevende og ufullstendig. Automatisk generering sikrer bredere dekning raskere.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: MVP-agent (Fase 4), ITERASJONS-agent (Fase 5), KVALITETSSIKRINGS-agent (Fase 6)

**Hvordan jobber den?**
Analyserer kode og krav, genererer unit-tester, integrasjonstester og E2E-tester, analyserer dekning og genererer testdata.

**Hvilke funksjoner har den?**
- Unit-test-generering
- Integrasjonstest-opprettelse
- E2E-test-scaffolding
- Dekningsanalyse
- Testdata-generering
- Automatisk testvedlikehold

---

### TESTSKRIVER-ekspert

**Markedsføring**
**Tittel:** Håndskrevne tester av ekspertkvalitet
**Beskrivelse:** Skriver vedlikeholdbare, lesbare tester som følger beste praksis — for de tilfellene der automatisk generering ikke er nok.

**Hva gjør denne agenten?**
Skriver omfattende, vedlikeholdbar testkode som følger beste praksis og sikrer høy testkvalitet.

**Hvorfor er det viktig?**
Automatisk genererte tester dekker bredden — håndskrevne tester dekker dybden. Denne agenten skriver de kritiske testene som krever domenekunnskap.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: TEST-GENERATOR-ekspert (for manuell raffinering)

**Hvordan jobber den?**
Designer teststruktur, setter opp fixtures, implementerer assertion best practices, testisolering og ytelsestesting.

**Hvilke funksjoner har den?**
- Teststrukturdesign
- Fixture-oppsett
- Best practice assertions
- Testisolering
- Ytelsestesting
- Testdokumentasjon

---

### SELF-HEALING-TEST-ekspert

**Markedsføring**
**Tittel:** Tester som reparerer seg selv
**Beskrivelse:** Implementerer selvhelbredende tester som automatisk tilpasser seg UI-endringer — med ML-basert selektor-healing, ustabilitetsdeteksjon og visuell regresjonssjekk.

**Hva gjør denne agenten?**
Implementerer automatisk testreparasjon og -vedlikehold når UI endres, med ML-basert selektor-healing og ustabilitetsdeteksjon.

**Hvorfor er det viktig?**
Testsuiter som knekker ved hver UI-endring sløser tid og tillit. Selvhelbredende tester holder testsuiten pålitelig uten manuelt vedlikehold.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: ITERASJONS-agent (Fase 5), KVALITETSSIKRINGS-agent (Fase 6)

**Hvordan jobber den?**
Smart selektor-reparasjon med fallbacks, assertion-selvhealing, visuell regresjonsdeteksjon, ustabilitetsdiagnose (AI-drevet), Playwright MCP-integrasjon.

**Hvilke funksjoner har den?**
- Smart selektor-reparasjon med fallbacks
- Assertion-selvhealing
- Visuell regresjonsdeteksjon
- AI-drevet ustabilitetsdiagnose
- Playwright MCP-integrasjon
- Mellomrom-tolerant reparasjon
- Healing-dashboard med statistikk

---

### LASTTEST-ekspert

**Markedsføring**
**Tittel:** Vet appen din tåle trafikken?
**Beskrivelse:** Kjører lasttester for å finne bristepunktet — baseline, spike, utholdenhets- og stresstester som viser nøyaktig hvor ytelsen svikter.

**Hva gjør denne agenten?**
Utfører lasttesting for å sikre applikasjonsstabilitet under høy trafikk og identifiserer ytelsesflaskehalser.

**Hvorfor er det viktig?**
En app som kneler ved lansering gir dårlig førsteinntrykk. Lasttesting avdekker flaskehalser FØR virkelige brukere treffer dem.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: KVALITETSSIKRINGS-agent (Fase 6)

**Hvordan jobber den?**
Oppretter lasttest-scenarier, utfører spike-, utholdenhet- og stresstester, analyserer databaseflaskehalser og API-responstider.

**Hvilke funksjoner har den?**
- Lasttest-scenarioer
- Spike-testing
- Utholdenhetstesting
- Stresstesting til bristepunkt
- Databaseflaskehalsanalyse
- API-responstidsanalyse
- Skalerbarhetstesting

---

### CROSS-BROWSER-ekspert

**Markedsføring**
**Tittel:** Fungerer overalt, for alle
**Beskrivelse:** Tester at appen ser riktig ut og fungerer korrekt i alle nettlesere og enheter — Chrome, Firefox, Safari, Edge, iPhone og Android.

**Hva gjør denne agenten?**
Tester og sikrer applikasjonskompatibilitet på tvers av nettlesere og enheter.

**Hvorfor er det viktig?**
Brukerne dine bruker forskjellige nettlesere og enheter. Det som fungerer i Chrome fungerer ikke nødvendigvis i Safari på iPhone.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: KVALITETSSIKRINGS-agent (Fase 6)

**Hvordan jobber den?**
Nettlesertesting, responsivt design-validering, kompatibilitetsmatriser og enhetsspesifikk feilsøking.

**Hvilke funksjoner har den?**
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Responsivt design-validering
- Kompatibilitetsmatrise
- Enhetsspesifikk feilsøking (iPhone, Android)
- Mobiltesting

---

## Ytelse og drift (5 agenter)

### YTELSE-ekspert

**Markedsføring**
**Tittel:** Raskere app, gladere brukere
**Beskrivelse:** Optimerer applikasjonsytelsen gjennom kodeprofilering, frontend-optimering, bundle-analyse og caching — med målbare forbedringer i Lighthouse-score.

**Hva gjør denne agenten?**
Optimerer applikasjonsytelse gjennom kodeprofilering, frontend-optimering og API-effektivitetsforbedringer.

**Hvorfor er det viktig?**
Trege apper mister brukere. Hvert sekunds lastetid reduserer konverteringer. Denne agenten finner og fikser ytelsesproblemene.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: ITERASJONS-agent (Fase 5, når Lighthouse faller), KVALITETSSIKRINGS-agent (Fase 6), PUBLISERINGS-agent (Fase 7)

**Hvordan jobber den?**
Frontend-ytelsesoptimering, kodeprofilering, bundle-analyse, caching-strategier, lazy loading, databasespørringsoptimering, API-responstidsreduksjon.

**Hvilke funksjoner har den?**
- Frontend-optimering
- Kodeprofilering
- Bundle-analyse
- Caching-strategier
- Lazy loading
- Databasespørringsoptimering
- API-responstidsreduksjon

---

### MONITORING-ekspert

**Markedsføring**
**Tittel:** Se alt som skjer — i sanntid
**Beskrivelse:** Setter opp komplett overvåking med Sentry, Web Vitals, database-observabilitet og AI-genererte dashboards — slik at du alltid vet hvordan appen din har det.

**Hva gjør denne agenten?**
Setter opp omfattende overvåking, feilsporing (Sentry), frontend-metrikker, database-observabilitet og varsling.

**Hvorfor er det viktig?**
Uten overvåking oppdager du problemer først når brukerne klager. Med overvåking ser du problemene i sanntid — ofte før brukerne merker dem.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: PUBLISERINGS-agent (Fase 7)

**Hvordan jobber den?**
Setter opp feilsporing, Web Vitals-overvåking, database-ytelsesanalyse, SLI/SLO-definisjon, golden signals-overvåking, OpenTelemetry auto-oppsett og AI-genererte dashboards.

**Hvilke funksjoner har den?**
- Feilsporing (Sentry)
- Web Vitals-overvåking
- Database-observabilitet
- SLI/SLO-definisjon
- Golden signals-overvåking
- OpenTelemetry auto-oppsett
- AI-genererte dashboards
- Varslingskonfigurasjon

---

### SRE-ekspert

**Markedsføring**
**Tittel:** Pålitelighet som en tjeneste
**Beskrivelse:** Definerer SLI/SLO-basert pålitelighetsprogram med error budgets, runbooks og AI-drevet SLO-prediksjon — slik at pålitelighet ikke er tilfeldig, men systematisk.

**Hva gjør denne agenten?**
Definerer SLI/SLO-basert pålitelighetsprogram med error budgets, runbooks og vaktordningsprosedyrer.

**Hvorfor er det viktig?**
Pålitelighet uten mål er bare ønsketenkning. SRE-eksperten setter målbare mål og systemer for å oppnå dem.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: PUBLISERINGS-agent (Fase 7)

**Hvordan jobber den?**
SLI/SLO-definisjon, AIOps SLO-prediksjon (30 min fremover), unified SLI-dashboard, AI pålitelighetscoring, runbook-utvikling, varslingstuning, error budget-sporing.

**Hvilke funksjoner har den?**
- SLI/SLO-definisjon
- AIOps SLO-prediksjon (30 min fremover)
- Unified SLI-dashboard
- AI pålitelighetscoring
- Runbook-utvikling
- Varslingstuning
- Error budget-sporing
- Vaktordnings-design

---

### BACKUP-ekspert

**Markedsføring**
**Tittel:** Datasikkerhet du kan stole på
**Beskrivelse:** Implementerer 3-2-1 backup-strategi med automatisert backup, testede recovery-prosedyrer og dokumentert RTO/RPO.

**Hva gjør denne agenten?**
Håndterer backup-strategi, disaster recovery og databeskyttelse på tvers av databaser og infrastruktur.

**Hvorfor er det viktig?**
Data er uerstattelig. Uten backup er du én feil unna å miste alt.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: PUBLISERINGS-agent (Fase 7), INFRASTRUKTUR-ekspert

**Hvordan jobber den?**
Backup-automatisering, recovery-testing, disaster recovery-planlegging, dataredundans og compliance med backup-standarder.

**Hvilke funksjoner har den?**
- 3-2-1 backup-strategi
- Backup-automatisering
- Recovery-testing
- Disaster recovery-planlegging
- RTO/RPO-dokumentasjon
- Dataredundans

---

### CICD-ekspert

**Markedsføring**
**Tittel:** Automatisert bygg, test og deploy
**Beskrivelse:** Designer og implementerer CI/CD-pipelines med GitHub Actions — automatisert testing, deployment, miljøhåndtering og rollback.

**Hva gjør denne agenten?**
Designer og implementerer CI/CD-pipelines for automatisert testing og deployment.

**Hvorfor er det viktig?**
Manuell deployment er feilutsatt og treg. CI/CD automatiserer hele prosessen — fra kode-push til produksjon — med kvalitetssikring i hvert steg.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: MVP-agent (Fase 4), PUBLISERINGS-agent (Fase 7)

**Hvordan jobber den?**
GitHub Actions-oppsett, automatisert testing, deployment-automatisering, miljøhåndtering og rollback-strategier.

**Hvilke funksjoner har den?**
- GitHub Actions-oppsett
- Automatisert testing i pipeline
- Deployment-automatisering
- Miljøhåndtering (staging/prod)
- Rollback-strategier
- Hemmelighetsbehandling i CI/CD

---

## Kodekvalitet og vedlikehold (4 agenter)

### CODE-QUALITY-GATE-ekspert

**Markedsføring**
**Tittel:** Automatiske kvalitetsporter i koden
**Beskrivelse:** Etablerer kvalitetsstandarder og automatiserte porter som forhindrer dårlig kode fra å bli merget — linting, dekning, kompleksitetssjekker og automatiserte reviews.

**Hva gjør denne agenten?**
Etablerer kvalitetsstandarder og automatiserte porter som hindrer dårlig kode fra å bli merget.

**Hvorfor er det viktig?**
Uten kvalitetsporter sniker dårlig kode seg inn gradvis. Automatiserte porter sikrer en konsistent minimumsstandard.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: MVP-agent (Fase 4), KVALITETSSIKRINGS-agent (Fase 6), BYGGER-agent (automatisk trigger)

**Hvordan jobber den?**
Konfigurerer linting-regler, dekningsterskler, kompleksitetssjekker, automatiserte reviews og standardhåndhevelse.

**Hvilke funksjoner har den?**
- Linting-regelkonfigurasjon
- Dekningsterskler
- Syklomatisk kompleksitetssjekk
- Automatiserte reviews
- Standardhåndhevelse
- Kvalitetsrapportering

---

### REFAKTORING-ekspert

**Markedsføring**
**Tittel:** Rydd opp i teknisk gjeld systematisk
**Beskrivelse:** Vurderer teknisk gjeld, identifiserer kodekvalitetsproblemer og prioriterer refactoring — med spesielt fokus på AI-generert kode som ofte har sine egne antimønstre.

**Hva gjør denne agenten?**
Vurderer teknisk gjeld, identifiserer kodekvalitetsproblemer og prioriterer refactoring med fokus på AI-generert kode.

**Hvorfor er det viktig?**
Teknisk gjeld akkumuleres usynlig. Denne agenten gjør den synlig og håndterbar med en prioritert plan.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: ITERASJONS-agent (Fase 5), PUBLISERINGS-agent (Fase 7)

**Hvordan jobber den?**
Kodekvalitetsmetrikker, teknisk gjeld-deteksjon, AI-antimønster-deteksjon, refactoring-konsekvensanalyse og gjeld-prioritering.

**Hvilke funksjoner har den?**
- Kodekvalitetsmetrikker
- Teknisk gjeld-deteksjon
- AI-antimønster-deteksjon
- Refactoring-konsekvensanalyse
- Gjeld-prioritering
- Refactoring-veikart

---

### MIGRASJON-ekspert

**Markedsføring**
**Tittel:** Trygge oppgraderinger uten nedetid
**Beskrivelse:** Planlegger og utfører sikre avhengighetsoppgraderinger og datamigrasjoner — med AI-assistert breaking-change-analyse og automatisk rollback.

**Hva gjør denne agenten?**
Planlegger og utfører sikre, AI-assisterte avhengighetsoppgraderinger og datamigrasjoner med automatisert breaking-change-analyse.

**Hvorfor er det viktig?**
Utdaterte avhengigheter er sikkerhetshull. Men oppgraderinger som knekker ting er verre. Denne agenten finner trygg vei gjennom.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: ITERASJONS-agent (Fase 5), PUBLISERINGS-agent (Fase 7)

**Hvordan jobber den?**
AI-basert breaking change-deteksjon, Renovate-integrasjon, migrasjonstestgenerering, kompatibilitetstesting og automatisert rollback.

**Hvilke funksjoner har den?**
- AI-basert breaking change-deteksjon
- Renovate-integrasjon
- Migrasjonstestgenerering
- Kompatibilitetstesting
- Automatisert rollback
- Migrasjonsrapport

---

### PROMPT-INGENIØR-ekspert

**Markedsføring**
**Tittel:** Optimale AI-prompts med kvalitetssikring
**Beskrivelse:** Validerer, optimerer og versjonerer prompts med CI/CD — slik at AI-output er konsistent, pålitelig og testbart.

**Hva gjør denne agenten?**
Validerer, optimerer, tester og versjonerer prompts på tvers av alle agenter med CI/CD og kvalitetsovervåking.

**Hvorfor er det viktig?**
Dårlige prompts gir dårlige resultater. Denne agenten sikrer at AI-prompts er testede, versionerte og optimaliserte.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: Alle agenter (for promptvalidering og -optimering)

**Hvordan jobber den?**
Promptvalidering, testrammeverk (CI/CD), semantisk versjonering, few-shot-optimering, kontekstengineering og kvalitetsovervåking med nettsøk for optimale teknikker.

**Hvilke funksjoner har den?**
- Promptvalidering
- Test-rammeverk med CI/CD
- Semantisk versjonering av prompts
- Few-shot-optimering
- Kontekstengineering
- Kvalitetsovervåking
- Nettsøk for optimale teknikker

---

## Brukeropplevelse (4 agenter)

### PERSONA-ekspert

**Markedsføring**
**Tittel:** Forstå brukerne dine på et dypere nivå
**Beskrivelse:** Utvikler detaljerte brukerpersonas basert på Jobs-to-be-Done — med emosjonell kartlegging, smertepunkter og konkurrerende alternativer.

**Hva gjør denne agenten?**
Utvikler detaljerte brukerpersonas og reisekart basert på Jobs-to-be-Done (JTBD) og markedsundersøkelser.

**Hvorfor er det viktig?**
Du kan ikke bygge noe brukerne elsker uten å forstå hvem de er, hva de prøver å oppnå, og hva som frustrerer dem.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: OPPSTART-agent (Fase 1)

**Hvordan jobber den?**
JTBD-analyse, persona-utvikling med emosjonell kartlegging, reisekart, smertepunktidentifikasjon, konkurrerende alternativanalyse og atferdssegmentering.

**Hvilke funksjoner har den?**
- JTBD-analyse (Jobs-to-be-Done)
- Persona-utvikling med emosjonell kartlegging
- Reisekart
- Smertepunktidentifikasjon
- Konkurrerende alternativanalyse
- Atferdssegmentering

---

### BRUKERTEST-ekspert

**Markedsføring**
**Tittel:** Ekte tilbakemeldinger fra ekte brukere
**Beskrivelse:** Gjennomfører brukertesting for å validere antagelser og samle inn tilbakemeldinger — slik at du bygger det brukerne faktisk trenger, ikke det du tror de trenger.

**Hva gjør denne agenten?**
Gjennomfører brukertesting for å validere produktantagelser og samle tilbakemeldinger fra virkelige brukere.

**Hvorfor er det viktig?**
Antagelser dreper produkter. Brukertesting avslører forskjellen mellom hva du tror brukerne vil ha og hva de faktisk trenger.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: ITERASJONS-agent (Fase 5), KVALITETSSIKRINGS-agent (Fase 6)

**Hvordan jobber den?**
Brukerforskningsmetodikk, prototypetesting, tilbakemeldingsinnsamling, brukervennlighetsanalyse og iterativ forbedringsveiledning.

**Hvilke funksjoner har den?**
- Brukerforskningsmetodikk
- Prototypetesting
- Tilbakemeldingsinnsamling
- Brukervennlighetsanalyse
- Iterativ forbedringsveiledning

---

### TILGJENGELIGHETS-ekspert

**Markedsføring**
**Tittel:** Tilgjengelig for alle, uansett funksjonsnivå
**Beskrivelse:** Sikrer at appen din følger WCAG 2.2 AA — skjermleser-testing, tastaturnavigasjon, fargekontrast og ARIA-implementering.

**Hva gjør denne agenten?**
Sikrer at webapplikasjoner oppfyller tilgjengelighetsstandarder (WCAG 2.2 AA) for brukere med funksjonsnedsettelser.

**Hvorfor er det viktig?**
15% av verdens befolkning har en funksjonsnedsettelse. Tilgjengelighet er ikke bare etisk riktig — det er ofte lovpålagt.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: KVALITETSSIKRINGS-agent (Fase 6)

**Hvordan jobber den?**
WCAG-compliance-revisjon, skjermleser-testing, tastaturnavigasjonsvalidering, fargekontrastsjekk, ARIA-implementering og automatisert tilgjengelighetstest.

**Hvilke funksjoner har den?**
- WCAG 2.2 AA compliance-revisjon
- Skjermleser-testing
- Tastaturnavigasjonsvalidering
- Fargekontrastsjekk
- ARIA-implementering
- Automatisert tilgjengelighetstest

---

### DESIGN-TIL-KODE-ekspert

**Markedsføring**
**Tittel:** Fra design til piksel-perfekt kode
**Beskrivelse:** Konverterer designmockups og wireframes til fungerende HTML/CSS/JavaScript — med responsivt design, animasjoner og designtroskap.

**Hva gjør denne agenten?**
Konverterer designmockups og wireframes til fungerende HTML/CSS/JavaScript-kode.

**Hvorfor er det viktig?**
Gapet mellom design og kode er der mange prosjekter mister kvalitet. Denne agenten sikrer at koden ser ut som designet — piksel for piksel.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: MVP-agent (Fase 4), ITERASJONS-agent (Fase 5)

**Hvordan jobber den?**
Komponentimplementering, responsiv design-konvertering, CSS-styling, animasjonsimplementering og designtroskap-validering.

**Hvilke funksjoner har den?**
- Komponentimplementering
- Responsiv design-konvertering
- CSS-styling
- Animasjonsimplementering
- Designtroskap-validering
- Produksjonsklar kode

---

## Forretning og strategi (2 agenter)

### LEAN-CANVAS-ekspert

**Markedsføring**
**Tittel:** Forretningsmodell på én side
**Beskrivelse:** Lager Lean Canvas, enhetsøkonomi-analyse og pitch decks — slik at du kan validere forretningsmodellen og presentere den for investorer.

**Hva gjør denne agenten?**
Lager Lean Canvas, enhetsøkonomisk analyse og pitch decks for forretningsvalidering og fundraising.

**Hvorfor er det viktig?**
Teknologi uten forretningsmodell er et hobbyprosjekt. Lean Canvas tvinger frem klarhet om problem, løsning, kunder og inntekt.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: OPPSTART-agent (Fase 1)

**Hvordan jobber den?**
Lean Canvas-generering, token-kostnads-enhetsøkonomi (AI-spesifikt), markedsvalidering via data, pitch deck-automatisering og MVP-omfangsbestemming.

**Hvilke funksjoner har den?**
- Lean Canvas (9-felts forretningsmodell)
- Token-kostnads-enhetsøkonomi (AI-spesifikt)
- Markedsvalidering
- Pitch deck-generering
- MVP-omfangsbestemming

---

### KONKURRANSEANALYSE-ekspert

**Markedsføring**
**Tittel:** Kjenn konkurrentene dine bedre enn de kjenner seg selv
**Beskrivelse:** Markedsundersøkelse, konkurrentsporing og blue ocean-strategi — slik at du vet hvor mulighetene ligger og hvordan du differensierer deg.

**Hva gjør denne agenten?**
Utfører markedsundersøkelser, konkurrentsporing, SWOT-analyse og blue ocean-strategiidentifikasjon.

**Hvorfor er det viktig?**
Å bygge uten å kjenne konkurrentene er som å kjøre med bind for øynene. Denne agenten kartlegger landskapet og finner dine unike muligheter.

**Hvilke andre agenter kaller den / hvem kaller denne?**
- Kalles av: OPPSTART-agent (Fase 1)

**Hvordan jobber den?**
Konkurrentlandskap-kartlegging, automatisert SWOT-analyse, verdikurveanalyse, markedshvitfelt-identifikasjon og konkurransegap-analyse.

**Hvilke funksjoner har den?**
- Konkurrentlandskap-kartlegging
- Automatisert SWOT-analyse
- Verdikurveanalyse
- Blue ocean-strategi
- Markedshvitfelt-identifikasjon
- Konkurransegap-analyse
