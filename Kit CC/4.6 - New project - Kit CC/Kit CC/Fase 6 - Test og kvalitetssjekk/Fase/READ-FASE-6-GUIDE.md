# Fase 6: Test, sikkerhet og kvalitetssjekk — Fungerer alt? (Prosjektleder-guide)

> **Mål:** Finne og fikse problemer før brukerne gjør det. Verifisere at produktet er sikkert, stabilt, og klart for lansering.

---

## Hvorfor denne fasen er kritisk

AI-generert kode har spesielle utfordringer:
- **45%** av AI-generert kode inneholder sikkerhetssårbarheter
- AI prioriterer "fungerer" over "sikker" og "vedlikeholdbar"
- "Vibe coding hangover" – kode som er vanskelig å forstå og vedlikeholde

**Din rolle:** Du trenger ikke forstå tekniske detaljer, men du må sikre at testingen gjennomføres og resultatene er akseptable.

---

## Før du starter: Entry-kriterier

**Ikke start Fase 6 før disse er på plass:**

| # | Sjekk | Betydning |
|---|-------|-----------|
| 1 | ☐ Kode ferdig | Alle planlagte funksjoner implementert |
| 2 | ☐ Testmiljø klart | En versjon av appen som er trygg å teste |
| 3 | ☐ Testdata tilgjengelig | Realistiske (men ikke ekte) brukerdata |
| 4 | ☐ Dokumentasjon fra Fase 5 | Oversikt over hva som er bygget |

**Hvis noe mangler:** Gå tilbake til Fase 5. Ikke start med "vi fikser det underveis".

---

## Steg 1: Bestem testnivå for ditt prosjekt

**Finn din prosjektkategori:**

| Kategori | Beskrivelse | Eksempler |
|----------|-------------|-----------|
| **A** | Lite internt verktøy, ingen sensitive data | Personlig todo-app, hobby |
| **B** | Internt verktøy med database/brukerdata | Team-dashboard, internt CRM |
| **C** | Produkt for eksterne brukere | SaaS-app, nettbutikk |
| **D** | Stor skala, sensitive data, høye krav | Fintech, helse, enterprise |

**Hva betyr kategorien for testing?**

| Aktivitet | A | B | C | D |
|-----------|---|---|---|---|
| AI-kode gjennomgang | Moderat | Viktig | **Kritisk** | **Kritisk** |
| Sikkerhetssjekk (OWASP) | Enkel | Viktig | **Kritisk** | **Kritisk** |
| Hemmelighetssjekk | Viktig | **Kritisk** | **Kritisk** | **Kritisk** |
| Manuell testing | Moderat | Viktig | **Kritisk** | **Kritisk** |
| Cross-browser | Lav | Moderat | **Kritisk** | **Kritisk** |
| Brukertesting | Lav | Moderat | Viktig | **Kritisk** |
| GDPR-testing | Nei | Moderat | **Kritisk** | **Kritisk** |
| Penetrasjonstest | Nei | Valgfritt | Anbefalt | **Kritisk** |

**Prioritetsnivåer:**
- **Kritisk** = Må gjøres, ingen unntak
- **Viktig** = Bør gjøres, unntak kun dokumentert
- **Moderat** = Vurder basert på situasjon
- **Lav/Nei** = Kan hoppes over

---

## Steg 2: Sikkerhetstesting

### Hvorfor sikkerhet er kritisk for VIBE-prosjekter

AI-generert kode har ofte:
- Hardkodede passord og API-nøkler
- Manglende validering av brukerinput
- Tilgangskontroll som ikke fungerer
- Utdaterte og sårbare biblioteker

**De tre testene du ALLTID må gjøre:**

### Test 1: Hemmelighetssjekk

**Hva:** Søk etter passord og API-nøkler i koden.

**Hvorfor:** En lekket API-nøkkel kan misbrukes innen minutter. Hackere har automatiske verktøy som skanner GitHub kontinuerlig.

**Hvordan delegere til AI:**
```
Gjennomfør en hemmelighetssjekk av prosjektet.

Søk etter:
- Passord i kode
- API-nøkler og tokens
- Connection strings
- Mønstrene "password", "secret", "api_key", "sk_live"

Rapporter alle funn med hvor de er og hva som må gjøres.
```

**Hvis noe finnes:**
1. Anta at hemmeligheten er kompromittert
2. Generer ny nøkkel hos leverandøren
3. Deaktiver den gamle
4. Flytt til miljøvariabler

### Test 2: OWASP Top 10 sjekk

**Hva:** Sjekk mot de 10 vanligste sikkerhetssårbarhetene.

**Hvorfor:** Disse utgjør over 90% av alle angrep på webapper.

**De viktigste å forstå:**

| Sårbarhet | I enkle ord | Konsekvens |
|-----------|-------------|------------|
| Broken Access Control | Bruker A kan se bruker B sine data | Datatyveri |
| Injection | Ondsinnet input kjøres som kode | Database tømmes |
| Cryptographic Failures | Data ikke kryptert riktig | Datalekkasje |

**Hvordan delegere til AI:**
```
Gjennomfør en OWASP Top 10:2025 sikkerhetssjekk.

For hver kategori:
1. Forklar hva det betyr i enkle ord
2. Sjekk om vi er sårbare
3. Hvis sårbar: vis konkret hvor og hvordan fikse

Gi en tabell med status og prioritet.
```

### Test 3: Dependency Scan

**Hva:** Sjekk om bibliotekene vi bruker har kjente sårbarheter.

**Hvorfor:** 90% av apper bruker open source. Én sårbar pakke kan kompromittere alt.

**Hvordan delegere til AI:**
```
Gjennomfør en avhengighetsanalyse.

Sjekk alle pakker for kjente sårbarheter.

Rapporter:
- Kritiske (fiks umiddelbart)
- Høye (fiks før lansering)
- Medium/Lave (planlegg)
```

---

## Steg 3: Manuell testing (dette kan DU gjøre)

### Test de viktigste brukerflyene

**Slik går du frem:**

1. **List alle måter brukere bruker produktet:**
   - Registrering
   - Innlogging
   - Hovedhandlingen (det produktet er til for)
   - Utlogging

2. **Test hver flyt systematisk:**

```
For hver brukerflyt, noter:

Flyt: [f.eks. "Registrering"]
Steg:
1. Gå til [side]
2. Fyll ut [felt]
3. Klikk [knapp]

Forventet: [hva skal skje]
Faktisk: ☐ OK / ☐ Problem

Notater:
```

3. **Prøv å ødelegge:**

| Test dette | Hva du gjør |
|------------|-------------|
| Tilbake-knapp | Klikk tilbake midt i prosess |
| Dobbeltklikk | Klikk raskt to ganger |
| Tom input | Send skjema med tomme felt |
| Lang tekst | Skriv 10.000 tegn |
| Spesialtegn | Bruk æøå, emoji 🎉, japansk 日本語 |
| Tregt nett | Bruk Chrome DevTools → Network → Slow 3G |

### Cross-browser: Test på flere enheter

**Minimum å teste:**

| Enhet | Nettleser | Hvorfor |
|-------|-----------|---------|
| Din laptop | Chrome | Mest brukt (65%) |
| Din mobil | Safari/Chrome | Mange bruker mobil |
| Hvis mulig | Safari på Mac | Beryktet for bugs |

**Se etter:**
- Ser layouten riktig ut?
- Fungerer alle knapper?
- Er tekst lesbar?
- Fungerer menyer?

---

## Steg 4: Brukertesting (5 personer er nok)

**Hvorfor:** Du er for nær produktet til å se problemer. Ekte brukere finner ting du aldri ville sett.

**Slik gjør du det:**

### Forberedelse (30 min)
1. Definer 3-5 oppgaver brukeren skal utføre
2. Finn 3-5 testpersoner (helst fra målgruppen)
3. Sett opp skjermopptak (med tillatelse)

### Gjennomføring (15-20 min per person)

**Si til brukeren:**
- "Tenk høyt mens du bruker produktet"
- "Det er produktet som testes, ikke deg"
- "Det finnes ingen feil svar"

**VIKTIG: Ikke hjelp!**

Noter:
- Hvor nøler de?
- Hva klikker de på først?
- Uttrykker de frustrasjon?
- Prøver de noe du ikke forventet?

### Etterpå
Spør:
- "Hva var mest forvirrende?"
- "Var det noe du savnet?"
- "Ville du brukt dette?"

---

## Steg 5: Compliance-sjekk

### GDPR (hvis du samler persondata)

**Sjekkliste:**

```
SAMTYKKE:
☐ Samtykke er eksplisitt (ikke pre-avkrysset)
☐ Bruker kan velge hvilke typer samtykke
☐ Samtykke kan trekkes tilbake

BRUKERRETTIGHETER:
☐ Bruker kan se sine data
☐ Bruker kan laste ned sine data
☐ Bruker kan slette sin konto

INFORMASJON:
☐ Personvernerklæring er tilgjengelig
☐ Det er klart hvilke data som samles og hvorfor
```

**Konsekvenser av brudd:** Opptil EUR 20 millioner eller 4% av omsetning.

### Plattformkrav (hvis app store)

**iOS App Store:**
- Account deletion må fungere i appen
- Personvernerklæring påkrevd
- Demo-konto til Apple for review

**Android Play Store:**
- Minimum 12 testere i 14 dager (for nye utviklerkontoer)
- Data safety section utfylt

---

## Steg 6: Bug-håndtering

### Kategoriser alle bugs

| Prioritet | Beskrivelse | Handling |
|-----------|-------------|----------|
| **P0** | Kritisk – app krasjer, sikkerhetshull | Fiks UMIDDELBART |
| **P1** | Høy – hovedfunksjon virker ikke | Fiks før lansering |
| **P2** | Medium – sekundær funksjon | Planlegg fiks |
| **P3** | Lav – kosmetisk | Backlog |

### Lanseringskriterier

**Du kan IKKE lansere hvis:**
- Noen P0-bugs åpne
- Noen P1-bugs åpne

**Du kan lansere med:**
- P2/P3-bugs dokumentert og planlagt

---

## Exit-kriterier: Når er du ferdig?

### Minimum (alle prosjekter)

```
☐ AI-kode gjennomgang av kritisk kode
☐ OWASP grunnleggende sjekk
☐ Hemmelighetssjekk gjennomført
☐ Dependency scan uten kritiske funn
☐ Hovedflyter manuelt testet
☐ 0 P0 og P1 bugs
```

### Anbefalt (kundevendte apper)

```
☐ Alt over +
☐ Full OWASP-gjennomgang
☐ Cross-browser testet
☐ Brukertesting gjennomført (3-5 personer)
☐ GDPR-compliance verifisert
```

### Optimal (stor skala)

```
☐ Alt over +
☐ Profesjonell penetrasjonstesting
☐ Load testing gjennomført
☐ Automatiserte E2E-tester
```

---

## Leveranser fra Fase 6

**Dokumenter disse før du går til Fase 7:**

### 1. Testrapport

```
Prosjekt: [navn]
Dato: [dato]
Versjon: [versjon]

SAMMENDRAG:
- Tester kjørt: X
- Passert: Y
- Feilet: Z

SIKKERHET:
- OWASP: ✓/✗
- Hemmeligheter: ✓/✗
- Dependencies: ✓/✗

KONKLUSJON:
☐ Klar for lansering
☐ Klar med forbehold
☐ Ikke klar
```

### 2. Kjente issues

```
DOKUMENTERTE BUGS:
- [P2] Beskrivelse – planlagt fiks: [dato]
- [P3] Beskrivelse – backlog

KJENT TEKNISK GJELD:
- [beskrivelse] – plan: [handlingsplan]
```

---

## Prompts for AI-assistanse

### Testplanlegging
```
Jeg er prosjektleder for et VIBE-prosjekt. Produktet er [beskriv].

Hjelp meg lage en testplan som tar høyde for AI-generert kode.

Inkluder:
1. Kritiske områder å teste ekstra nøye
2. Estimert tidsbruk per aktivitet
3. Hva jeg kan gjøre selv vs. trenger teknisk hjelp til
```

### Sikkerhetssjekk
```
Gjennomfør en komplett sikkerhetssjekk av prosjektet.

For hver sårbarhet funnet:
1. Forklar hva det betyr i enkle ord
2. Hvor kritisk det er
3. Hva som må gjøres for å fikse det
```

### Bug-rapport
```
Jeg har funnet dette problemet: [beskrivelse]

Hjelp meg lage en bug-rapport med:
1. Prioritet (P0-P3)
2. Steg for å reprodusere
3. Mulig årsak
4. Forslag til løsning
```

### Klar for lansering?
```
Vurder om prosjektet er klart for lansering.

Gå gjennom:
1. Er alle kritiske tester gjennomført?
2. Er alle P0/P1 bugs fikset?
3. Er sikkerhetssjekker bestått?
4. Er det kjente risikoer?

Gi en tydelig JA/NEI med begrunnelse.
```

---

## Når du trenger ekstern hjelp

| Oppgave | Når trenger du ekstern hjelp |
|---------|------------------------------|
| Penetrasjonstest | B2B-salg, finans, helse |
| DAST-skanning | Kundevendte apper |
| SOC 2 | Enterprise-salg |
| Load testing | Forventet høy trafikk |

**Budsjett:** Penetrasjonstest koster typisk NOK 50.000-500.000+

---

## Tidsestimat

| Prosjekttype | Estimert tid for Fase 6 |
|--------------|-------------------------|
| A: Lite internt | 1-2 dager |
| B: Internt m/data | 3-5 dager |
| C: Kundevendt | 1-2 uker |
| D: Stor skala | 2-4 uker |

**Tommelfingerregel:** Alloker minimum 20% av total prosjekttid til testing.

---

## Hva om noe går galt?

**Hva om sikkerhetstesting finner kritisk flaw?**
Ikke panic. Stopp testingen, noter nøyaktig hva som er funnet (ikke deploy ennå!), og be AI om å fikse det. Hvis AI ikke kan fikse det alene, konsulter en sikkerhetsperson. En kritisk sårbarhet er alvorlig, men den er bedre oppdaget nå enn etter lansering. Fase 6 gjør jobben sin.

**Hva om testene feiler hele tiden?**
Det er normalt når du tester AI-generert kode grundig for første gang. Lag en prioliste: kritiske bugs først, så høye, så medium. Ikke la perfeksjon bli fienden av godt. En bug som ikke påvirker hovedfunksjonen kan vente til v1.1. Fix P0 og P1, dokumenter P2 og P3.

**Hva om jeg ikke kan fikse en bug?**
Dokumenter det nøye: "Bug X påvirker Y og jeg prøvde Z uten resultat". Send til AI med all kontekst. Hvis AI ikke løser det, markerer du det som "Known issue" og går videre. Ingen produkt er perfekt – det som teller er å være transparent om problemene.

---

## Neste steg

Når alle exit-kriterier er oppfylt:

> **Si til AI:** "Fase 6 er ferdig. Kjør fase-gate og gå videre til Fase 7."

AI-en vil da kjøre en kvalitetssjekk (fase-gate) og forberede lansering for deg.

---

## Neste steg

Når alle exit-kriterier er oppfylt → [Fase 7: Publiser og vedlikehold — Ut i verden]
