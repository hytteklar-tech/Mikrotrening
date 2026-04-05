# Fase 5: Bygg funksjonene — Én funksjon om gangen (Prosjektleder-guide)

> Utvikling, Iterasjon & Kontinuerlig Validering

Du har en fungerende prototype fra Fase 4. Nå handler det om å bygge ut produktet systematisk — **modul for modul** — og kontinuerlig validere at du bygger riktig ting.

---

## VIKTIG: Fase 5 er en LOOP — ikke et enkeltpass

Fase 5 er den eneste fasen som kjøres **flere ganger**. Du bygger én modul ferdig, så neste, så neste — helt til alle moduler i modulregisteret er merket "Done". Først DA går du til Fase 6.

```
┌────────────────────────────────────────────────────────┐
│                    FASE 5 LOOP                         │
│                                                        │
│   ┌──────────┐                                         │
│   │  START   │                                         │
│   │  Last    │                                         │
│   │  modul-  │                                         │
│   │  register│                                         │
│   └────┬─────┘                                         │
│        ▼                                               │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐      │
│   │ 1. VELG  │────▶│ 2. BYGG  │────▶│ 3. TEST  │      │
│   │ neste    │     │ under-   │     │ hele     │      │
│   │ modul    │     │ funksjoner│     │ modulen  │      │
│   └──────────┘     │ én om    │     └────┬─────┘      │
│        ▲           │ gangen   │          │             │
│        │           └──────────┘          ▼             │
│        │                           ┌──────────┐       │
│        │                           │ 4. POLÉR │       │
│        │                           │ bugs,UX, │       │
│        │                           │ ytelse   │       │
│        │                           └────┬─────┘       │
│        │                                │              │
│        │                                ▼              │
│        │                           ┌──────────┐       │
│        │           JA              │ 5. MARKER│       │
│        ├───────────────────────────│ som Done │       │
│        │    Flere moduler?         └────┬─────┘       │
│        │                                │ NEI          │
│        │                                ▼              │
│   ┌────┴─────┐                    ┌──────────┐       │
│   │ LOOP     │                    │  FASE 6  │       │
│   │ TILBAKE  │                    │  →→→→→   │       │
│   └──────────┘                    └──────────┘       │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Hva er en modul?

En modul er en samling relaterte funksjoner som utgjør en helhet i appen din. Alle moduler ble definert i Fase 2 og ligger i **modulregisteret** (`docs/FASE-2/MODULREGISTER.md`) med detaljert spesifikasjon per modul (`docs/moduler/M-XXX-[navn].md`).

### Per-modul arbeidsflyt

For **hver modul** gjør du dette:

1. **Velg modul** — Se modulregisteret. Velg neste modul med status "Pending" (respekter avhengigheter)
2. **Bygg underfunksjoner** — Ta én underfunksjon om gangen. Mikro-iterasjon: kode → test → verifiser → neste
3. **Test hele modulen** — Når alle underfunksjoner er bygget, test modulen som helhet
4. **Polér** — Fiks bugs, forbedre UX, optimér ytelse
5. **Marker som Done** — Oppdater modulregisteret. Bekreft til bruker

### Når er Fase 5 ferdig?

Fase 5 er ferdig NÅR:
- Alle moduler i modulregisteret har status "Done"
- Modulregisteret viser 100% implementeringsprosent

Fase 5 er IKKE ferdig bare fordi du har bygget én sprint eller implementert noen features.

### Oppfølgingssesjoner (når du lukker chatten og åpner ny)

Når en ny chat-sesjon starter midt i Fase 5:
1. AI laster modulregisteret
2. AI finner modulen med status "Building" (den du jobbet på sist)
3. AI laster modulspesifikasjonen med all kontekst, byggnotater og visjonen din
4. AI sier: "Sist gang jobbet vi på [modul]. Vi fullførte [X] og gjenstår [Y]. Skal vi fortsette?"

**Ingenting går tapt mellom sesjoner.** Alle beskrivelser og all kontekst ligger lagret i modulfiler.

### Nye idéer midt i produksjonen

Hvis du kommer på en ny funksjon mens du bygger:
1. Fortell AI om den nye funksjonen i detalj
2. AI lagrer UMIDDELBART til en ny modulfil og oppdaterer modulregisteret
3. AI bekrefter med: `📋 MODUL: opprettet docs/moduler/M-XXX-[navn].md`
4. Du fortsetter med det du holdt på med — den nye modulen bygges når dens tur kommer

---

## Din rolle som prosjektleder

Du styrer retningen, prioriterer, og sikrer kvalitet – AI-assistenten gjør kodingen. Du trenger ikke forstå hver kodelinje, men du må forstå hva som bygges og hvorfor.

**Viktigst:** Du er kvalitetskontrollen som sikrer at AI-en ikke introduserer feil, sikkerhetshull eller teknisk gjeld.

---

## Del 1: Gullreglene

### De fem ufravikelige prinsippene

| # | Regel | Forklaring |
|---|-------|------------|
| 1 | **Aldri stol blindt** | All AI-generert kode er uverifisert inntil du har testet den |
| 2 | **Små steg** | Be om én ting om gangen, ikke hele funksjoner på én gang |
| 3 | **Kontekst er alt** | Jo mer kontekst du gir, jo bedre output får du |
| 4 | **Sikkerhet først** | Inkluder alltid sikkerhetskrav i promptene dine |
| 5 | **Dokumenter underveis** | Skriv ned hva du ba om og hva du fikk |

### AI som "junior utvikler"

Behandle AI-output som du ville behandlet arbeid fra en junior:

| Situasjon | Junior utvikler | AI-assistent |
|-----------|-----------------|--------------|
| Får oppgave | Trenger klare krav | Trenger klare prompts |
| Leverer kode | Du gjør code review | Du gjør code review |
| Gjør feil | Du veileder og korrigerer | Du gir feedback og ber om ny versjon |
| Tar snarveier | Du påpeker og ber om forbedring | Du påpeker og ber om forbedring |
| Vet ikke svaret | Innrømmer det | Later som den vet (hallusinerer) |

**Viktig statistikk:**
- 62% av AI-generert kode inneholder design-feil eller sikkerhetshull
- 8x høyere kodeduplisering enn menneskeskrevet kode

---

## Del 2: Effektiv kommunikasjon

### Prompt-strukturen KSKSE

| Element | Betydning | Eksempel |
|---------|-----------|----------|
| **K**ontekst | Bakgrunn AI-en trenger | "Vi bygger en oppgave-app med React og Supabase" |
| **S**pesifikasjon | Nøyaktig hva du vil ha | "Lag en funksjon som henter brukerens oppgaver" |
| **K**rav | Spesifikke betingelser | "Må håndtere feil, bruke TypeScript, og cache resultatet" |
| **S**ikkerhet | Sikkerhetsrelaterte instrukser | "Verifiser at brukeren har tilgang til oppgavene" |
| **E**ksempler | Vis hva du mener | "Output skal se slik ut: { tasks: [...], error: null }" |

### Prompt-mal

```
KONTEKST:
[Beskriv prosjektet og relevant bakgrunn]

SPESIFIKASJON:
[Hva skal lages/endres?]

KRAV:
- [Krav 1]
- [Krav 2]
- [Krav 3]

SIKKERHET:
- [Sikkerhetskrav 1]
- [Sikkerhetskrav 2]

EKSEMPEL:
[Vis forventet input/output hvis relevant]
```

### Sikkerhets-boostere (legg alltid til minst én)

```
"Bruk sikre kodingspraksiser for [området]"
"Valider all input før bruk"
"Ikke eksponer sensitiv informasjon i feilmeldinger"
"Bruk parameteriserte spørringer for database-kall"
"Implementer tilgangskontroll på dette endepunktet"
```

---

## Del 3: Mikro-iterasjon

### Hvorfor små steg?

Å be AI om store, monolittiske outputs fører til:
- Feil som gjemmer seg i kompleks kode
- Kode som er vanskelig å debugge
- "All or nothing"-situasjoner

**Tommelfingerregel:** Hvis du ikke kan verifisere resultatet på under 2 minutter, er oppgaven for stor.

### Eksempel på oppdeling

```
❌ Dårlig: "Lag et komplett brukerregistreringssystem med e-postverifisering"

✅ Godt: Del opp i mikro-oppgaver:
1. "Lag et skjema for brukerregistrering"
   → Verifiser at skjemaet vises korrekt

2. "Legg til validering på e-post-feltet"
   → Test med gyldige og ugyldige e-poster

3. "Legg til passord-validering"
   → Test med ulike passord

4. "Lag API-rute som mottar dataene"
   → Test at data mottas korrekt

[osv.]
```

### Sjekkliste etter hver mikro-iterasjon

- [ ] Fungerer den nye koden isolert?
- [ ] Fungerer den sammen med eksisterende kode?
- [ ] Er det noen åpenbare feil eller sikkerhetshull?
- [ ] Forstår jeg hva koden gjør?
- [ ] Har jeg committet endringen?

---

## Del 4: Sprint-struktur

### Anbefalt sprint-lengde

| Sprint-lengde | Passer for |
|---------------|------------|
| 1 uke | Små prosjekter, rask eksperimentering |
| 2 uker | De fleste prosjekter (anbefalt standard) |
| 3-4 uker | Komplekse prosjekter med mange avhengigheter |

### Hver sprint inneholder

**1. Sprint-planlegging (dag 1, maks 1 time)**
- Velg 3-5 brukerhistorier fra backlog
- Diskuter med AI-assistenten hva som trengs
- Estimer kompleksitet (liten/medium/stor)
- Legg til 25% buffer for AI-review og debugging

**2. Utvikling (dag 2 til nest siste dag)**
- Morgen: Status fra forrige dag, dagens mål
- Formiddag: Mikro-iterasjon på dagens oppgave
- Lunsj: Pause (viktig for perspektiv!)
- Ettermiddag: Fortsett + code review av dagens arbeid
- Slutt: Commit, oppdater status, planlegg neste dag

**3. Review og demo (siste dag)**
- Vis frem hva som er bygget
- Samle feedback fra interessenter
- Dokumenter hva som fungerte og ikke
- Planlegg forbedringer til neste sprint

---

## Del 5: Kvalitetssikring

### Code Review-sjekkliste

**Funksjonalitet:**
- [ ] Gjør koden det den skal?
- [ ] Er alle krav fra prompten oppfylt?
- [ ] Fungerer edge cases?
- [ ] Hva skjer hvis noe feiler?

**Sikkerhet (KRITISK for AI-kode):**
- [ ] Er det hardkodede hemmeligheter?
- [ ] Valideres all brukerinput?
- [ ] Er det SQL-injection sårbarheter?
- [ ] Er det XSS-sårbarheter?
- [ ] Er tilgangskontroll på plass?
- [ ] Eksponeres sensitiv informasjon i feilmeldinger?

**AI-spesifikke ting å se etter:**
- [ ] Brukes utdaterte biblioteker eller API-er?
- [ ] Er det "dead code"?
- [ ] Er det over-kompliserte løsninger?
- [ ] Er det copy-paste-kode som burde vært en felles funksjon?

### Håndtering av AI-hallusinasjoner

**Vanlige hallusinasjoner:**

| Type | Eksempel | Hvordan oppdage |
|------|----------|-----------------|
| Oppdiktede funksjoner | `user.validateEmail()` som ikke finnes | Prøv å kjøre koden |
| Utdaterte API-er | Gammel syntaks for et bibliotek | Sjekk dokumentasjon |
| Falske biblioteker | `import magic-validator` | Søk etter biblioteket |
| Overdreven optimisme | "Dette er 100% sikkert" | Vær skeptisk |

**Røde flagg:**
- AI sier "dette er standard måten"
- AI refererer til spesifikke versjonsnumre
- AI bruker biblioteker du aldri har hørt om
- Koden ser "for enkel ut" for et komplekst problem

---

## Del 6: Versjonskontroll

### Commit-strategi

```
ALDRI:
❌ Én stor commit på slutten av dagen
❌ "Diverse endringer" som commit-melding
❌ Blande flere funksjoner i én commit

ALLTID:
✅ Commit etter hver vellykket mikro-iterasjon
✅ Beskrivende commit-meldinger
✅ Én logisk endring per commit
```

### Checkpoint-rutine

| Hendelse | Aksjon |
|----------|--------|
| Før du starter ny funksjon | Lag en branch |
| Etter vellykket mikro-iterasjon | Commit |
| Før eksperimentering | Commit først |
| Etter code review | Commit + merge |
| Ved usikkerhet | Commit det som fungerer |

**Tommelfingerregel:** Hvis du tenker "dette burde jeg kanskje committe", så bør du committe.

---

## Del 7: Teknisk gjeld

### AI-typiske gjeldskilder

| Kilde | Beskrivelse |
|-------|-------------|
| Kodeduplisering | 8x høyere med AI |
| Copy-paste | AI elsker dette |
| Dead code | "backward compatibility" |
| Hardkodede verdier | Verdier som burde vært konfigurerbare |
| Over-kompleksitet | AI viser seg fram |

### Strategi

**Allokér 20% av hver sprint til gjeldshåndtering**

| Aktivitet | Andel av sprint |
|-----------|-----------------|
| Ny funksjonalitet | 80% |
| Teknisk gjeld | 20% |

**"Tech Debt Friday"-rutine:**
1. Gå gjennom gjeld-loggen
2. Velg 2-3 poster å håndtere
3. Refaktorer med AI-hjelp
4. Kjør alle tester for å verifisere
5. Commit og oppdater loggen

---

## Del 8: Brukervalidering

### Uformell demo (minimum)

1. Finn noen i målgruppen
2. Vis dem produktet
3. Be dem utføre hovedoppgaven UTEN hjelp fra deg
4. Observer hvor de stopper opp eller blir forvirret
5. Still åpne spørsmål:
   - "Hva tenker du nå?"
   - "Hva forventet du skulle skje?"
   - "Hva ville du gjort videre?"
6. Skriv ned observasjoner umiddelbart

### Hva du ser etter

| Observasjon | Betyr ofte |
|-------------|------------|
| Bruker nøler | Uklar instruksjon/design |
| Bruker klikker feil sted | Misleading UI |
| Bruker spør "hva nå?" | Manglende veiledning |
| Bruker sukker | Frustrasjon, for mange steg |

**Viktig:** Observer hva folk *gjør*, ikke bare hva de *sier*.

---

## Del 9: UI/UX-sjekkliste

### Konsistens
- [ ] Samme farger brukes konsekvent
- [ ] Samme fonter og størrelser overalt
- [ ] Samme spacing mellom elementer
- [ ] Samme knapp-stiler for samme type handlinger

### Responsivitet
- [ ] Fungerer på mobil (320px bredde)
- [ ] Fungerer på tablet (768px)
- [ ] Fungerer på desktop (1200px+)
- [ ] Ingen horisontalt scroll

### Feedback
- [ ] Knapper reagerer på hover
- [ ] Klikkbare elementer har cursor: pointer
- [ ] Loading-indikatorer der ting tar tid
- [ ] Suksess- og feilmeldinger er tydelige

### Loading og tomme tilstander

Hver skjerm må håndtere:

| Tilstand | Hva bruker ser |
|----------|----------------|
| Laster | Spinner, skeleton, progressbar |
| Tom | Hjelpsom melding + handling |
| Feil | Forklaring + mulighet for retry |

---

## Del 10: Dokumentasjon

### Minimum dokumentasjon

**1. README.md**
- Kort beskrivelse
- Kom i gang-instruksjoner
- Viktige kommandoer
- Mappestruktur

**2. ADR (Architecture Decision Records)**
- Kontekst
- Beslutning
- Konsekvenser

**3. AI-prompt-logg**
- Vellykkede prompts (som mal)
- Mislykkede prompts (som lærdom)

**Tommelfingerregel:** Hvis du tenkte "hvorfor gjør vi det slik?" når du tok beslutningen, skriv ned svaret.

---

## Del 11: Dashboard-metrikker

### Nøkkelmetrikker for deg

| Metrikk | Hva det måler | Bra | Advarsel |
|---------|---------------|-----|----------|
| Sprint velocity | Fullførte oppgaver per sprint | Stabil/økende | Synkende |
| Bug-rate | Nye feil per funksjon | Synkende | Økende |
| Test coverage | Prosent kode med tester | > 70% | < 50% |
| Åpne issues | Uløste problemer | Håndterbart | Voksende |

Et godt dashboard svarer på: "Er vi på sporet?"

---

## Del 12: Leveransesjekkliste

### Feature-komplett applikasjon
- [ ] Alle MVP-funksjoner implementert og testet
- [ ] Sikkerhet innebygd i alle funksjoner
- [ ] Komplett feilhåndtering
- [ ] Polert brukergrensesnitt
- [ ] Gode loading/tomme tilstander
- [ ] Responsivt design

### Kvalitetssikring
- [ ] Code review gjennomført på all kode
- [ ] AI-hallusinasjoner sjekket og verifisert
- [ ] SAST-verktøy kjører i CI/CD-pipeline
- [ ] Bruker-feedback innhentet og adressert
- [ ] Teknisk gjeld dokumentert og under kontroll
- [ ] Arkitektur er konsistent

### Infrastruktur
- [ ] CI/CD-pipeline satt opp og fungerer
- [ ] Feature flags på plass (hvis relevant)
- [ ] Logging og observabilitet implementert
- [ ] Dokumentasjon oppdatert
- [ ] AI-prompt-logg dokumentert

### Testdekning
- [ ] Tester for all kritisk funksjonalitet
- [ ] Tester for sikkerhetskritiske deler
- [ ] Automatiske tester kjører ved hver endring
- [ ] Test coverage > 70% for kritisk kode

### Versjonskontroll
- [ ] Alle endringer committet
- [ ] Commit-historikk er ryddig og forståelig
- [ ] Ingen ucommitted endringer
- [ ] Branches er ryddet opp

### Din signoff
- [ ] Jeg forstår hva som er bygget
- [ ] Jeg har sett produktet i aksjon
- [ ] Dokumentasjonen er forståelig
- [ ] Risikofaktorer er dokumentert
- [ ] Klar for Fase 6

---

## Viktighet per prosjektkategori

Bruk denne tabellen for å prioritere:

| Oppgave | Lite internt | Internt m/DB | Kundevendt | Stor skala |
|---------|--------------|--------------|------------|------------|
| Gullreglene | Kritisk | Kritisk | Kritisk | Kritisk |
| TDD | Moderat | Viktig | Kritisk | Kritisk |
| Code Review | Moderat | Viktig | Kritisk | Kritisk |
| CI/CD | Valgfritt | Anbefalt | Viktig | Kritisk |
| Feature flags | Valgfritt | Moderat | Viktig | Kritisk |
| Brukervalidering | Moderat | Viktig | Kritisk | Kritisk |
| UI-polish | Lav | Moderat | Viktig | Kritisk |
| Dokumentasjon | Lav | Moderat | Viktig | Kritisk |

---

## Ordliste

| Begrep | Forklaring |
|--------|------------|
| A/B-testing | Teste to varianter for å se hvilken fungerer best |
| ADR | Architecture Decision Record – dokumentasjon av viktige beslutninger |
| CI/CD | Continuous Integration/Deployment – automatisk testing og utrulling |
| Edge case | Uvanlig eller ekstrem situasjon som må håndteres |
| Feature flag | Brytere som lar deg skru funksjoner av/på |
| Hallusinasjon | Når AI genererer oppdiktet eller feil informasjon |
| MVP | Minimum Viable Product – enkleste versjon som gir verdi |
| Prompt | Instruksjonen du gir til AI-assistenten |
| SAST | Static Application Security Testing – automatisk sikkerhetsskanning |
| Scope creep | Når prosjektet vokser utover opprinnelig plan |
| Sprint | Kort utviklingssyklus (vanligvis 1-2 uker) |
| TDD | Test-Driven Development – skriv tester først, så kode |
| Teknisk gjeld | Snarveier i kode som må "betales tilbake" senere |

---

## Når er du ferdig med Fase 5?

**Fase 5 looper til alle moduler i modulregisteret er ferdige.** Sjekk modulregisteret (`docs/FASE-2/MODULREGISTER.md`):

```
MVP-moduler ferdig:  [X] / [Y]  (100%?)
Alle moduler ferdig: [X] / [Z]  (100%?)
```

**Du kan GÅ TIL FASE 6 når:**
- Alle MVP-moduler har status "Done" ✅
- Modulregisteret viser 100% for MVP-moduler
- Alle per-modul validerings-sjekklister er fullført

**Du kan IKKE gå til Fase 6 når:**
- Noen moduler fortsatt har status "Pending", "Building", "Testing" eller "Polishing"
- Modulregisteret viser under 100% implementeringsprosent

### Neste steg

Når modulregisteret viser 100% → **Fase 6: Test, sikkerhet og kvalitetssjekk — Fungerer alt?**

I Fase 6 gjør du grundig testing, sikkerhetsgjennomgang og kvalitetssikring av HELE appen — alle moduler samlet.

---

## Hva om noe går galt?

**Hva om en modul er vanskeligere enn forventet?**
Opdater modulregisteret: endre status fra "Building" til "Blocked" og legg til notater om hva som er vanskelig. Be AI om å hjelpe med den vanskelige biten isolert. Hvis det tar mer tid enn planlagt, godta det og juster neste moduls estimat. Noen moduler er rett og slett hardere.

**Hva om jeg vil legge til en ny modul midt i produksjonen?**
Perfekt! Fortell AI om modulen i detalj, AI lagrer den til en ny modulfil, og den blir lagt til i modulregisteret. Prioriter den hvor den passer beste, og bygg den når dens tur kommer. Ingenting går tapt, og moduler kan legges til når som helst.

**Hva om jeg har sittet på samme modul i evigheter?**
Break it down. Modulen har underfunksjoner – kanskje du kan parkere noen og fullføre andre først? Be AI om å liste bare det absolutt nødvendige for å merke modulen som "Done" (happy path). Resten kan være v1.1. Bedre å ha 80% av 10 moduler enn 100% av 5.

---

## Neste steg

Når modulregisteret viser 100% for alle MVP-moduler:

> **Si til AI:** "Fase 5 er ferdig. Kjør fase-gate og gå videre til Fase 6."

AI-en vil da kjøre en kvalitetssjekk (fase-gate) og forberede testing og lansering for deg.

---

*Prosjektleder-guide for Fase 5, versjon 2.0*
