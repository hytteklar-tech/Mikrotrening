# Fase 3: Arkitektur og sikkerhet — Hvordan bygges det trygt? (Prosjektleder-guide)

> **For:** Ikke-tekniske prosjektledere (vibekodere)
> **Formål:** Forstå hvorfor hvert punkt er viktig og ta informerte beslutninger

---

## HVA ER FASE 3?

Fase 3 er overgangen fra "hva skal vi bygge" (Fase 1-2) til "hvordan skal vi bygge det". Her tar du de konkrete tekniske valgene som setter rammene for hele utviklingen.

### Hovedaktiviteter

| # | Aktivitet | Hva det betyr |
|---|-----------|---------------|
| 1 | Forstå AI-kode-risiko | Lær hvorfor AI-generert kode trenger ekstra oppmerksomhet |
| 2 | Velge teknologier | Bestem hvilke verktøy som skal brukes |
| 3 | Designe arkitektur | Tegn opp hvordan systemet henger sammen |
| 4 | Gjennomføre trusselmodellering | Finn ut hva som kan gå galt |
| 5 | Planlegge sikkerhet | Definer innlogging, tilganger, kryptering |
| 6 | Sette opp DevSecOps | Automatiser testing og sikkerhetsskanning |
| 7 | Dokumentere | Lag dokumenter som guider utviklingen |

### Hvorfor er dette viktig?

Det er **10-100x dyrere** å fikse sikkerhetsproblemer etter lansering enn i designfasen. Ved å bruke 2-4 timer på planlegging, kan du spare 20-40 timer på debugging.

---

## PRIORITERINGSSYSTEM

Ikke alle prosjekter trenger samme sikkerhetsnivå.

### Ikoner
- 🔴 **KRITISK** – Må gjøres, hopp aldri over
- 🟡 **VIKTIG** – Bør gjøres for de fleste prosjekter
- 🟢 **VALGFRITT** – For større/komplekse prosjekter

### Prosjektkategorier

| Kategori | Beskrivelse | Eksempler |
|----------|-------------|-----------|
| Lite internt | Verktøy kun for deg selv | Script, personlig dashboard |
| Internt m/DB | Intern app med database | Team-verktøy, admin-panel |
| Kundevendt | Brukere utenfor organisasjonen | SaaS, mobilapp, nettbutikk |
| Stor skala | Mange brukere, sensitiv data | Fintech, helse, enterprise |

---

## 1. AI-GENERERT KODE: DET DU MÅ VITE

### Problemet

**Alarmerende tall:**
- **45% av AI-generert kode inneholder sikkerhetssårbarheter**
- AI-er feiler i 86-88% av tilfellene mot vanlige angrep som XSS
- AI optimerer for "kode som fungerer", ikke "kode som er sikker"

### Hvorfor skjer dette?

1. AI er trent på enorme mengder kode fra internett – inkludert usikker kode
2. Populære kode-snippets er ofte ikke sikkerhetsrevidert
3. AI har ikke kontekst om ditt spesifikke sikkerhetsbehov

### Hva betyr dette for deg?

**Grunnregel: Aldri stol blindt på AI-generert kode for sikkerhetskritiske funksjoner!**

| Situasjon | Din handling |
|-----------|--------------|
| Innlogging/autentisering | Be AI bruke etablerte biblioteker, ALDRI lage fra scratch |
| Databasespørringer | Spør AI om den bruker "parameteriserte queries" |
| Bruker-input | Sørg for at AI validerer all input |
| Kryptering | Aldri la AI "finne opp" kryptering |
| API-nøkler/passord | Sjekk at disse aldri ligger i koden |

### Spørsmål å stille AI

> "Bruker denne koden etablerte biblioteker for sikkerhet, eller har du laget noe fra scratch?"

> "Kan du forklare sikkerhetsvalgene du har gjort i denne koden?"

---

## 2. TECH STACK: VELGE TEKNOLOGIER

### Hva er tech stack?

**Tech stack = samlingen av teknologier som brukes for å bygge produktet**

Tenk på det som byggeklosser:

| Lag | Hva det gjør | Analogi |
|-----|--------------|---------|
| Frontend | Det brukeren ser | Fasaden på et hus |
| Backend | Serveren som håndterer logikk | Rørleggeren bak veggen |
| Database | Hvor data lagres | Arkivskapet |
| Hosting | Hvor appen kjører | Tomten huset står på |
| Auth | Innlogging og tilganger | Nøkkelkortsystemet |

### Kriterier for vibekoding

For å få best mulig hjelp fra AI, velg teknologier som er:

| Kriterie | Hvorfor | Eksempel |
|----------|---------|----------|
| Godt dokumentert | AI kjenner det bedre | Next.js fremfor obskur rammeverk |
| Innebygd sikkerhet | Mindre risiko | Supabase RLS fremfor manuell auth |
| Stort community | Lettere å finne løsninger | React fremfor eksperimentelle |
| Stabil | Unngå breaking changes | Etablerte versjoner |
| Passende størrelse | Ikke overingeniør | Supabase for MVP, ikke Kubernetes |

### Unngå i vibekoding

- Veldig nye/ustabile teknologier (AI har lite treningsdata)
- Komplekse enterprise-løsninger for enkle prosjekter
- Obskure rammeverk med lite dokumentasjon

### Beslutningsspørsmål

1. Hva skal jeg bygge? (webapp, mobilapp, utvidelse?)
2. Trenger jeg sanntidsdata? (chat, live-oppdateringer)
3. Trenger jeg betalingsløsning?
4. Hvor mange brukere forventer jeg?

---

## 3. ARKITEKTUR: HVORDAN HENGER DET SAMMEN?

### Tre hovedalternativer

**1. Monolitt (alt i ett)**
- ✅ Enkel å starte
- ❌ Kan bli rotete
- Passer for: MVP, små prosjekter

**2. Frontend + Backend API**
- ✅ Klar separasjon, skalerbar
- ❌ Mer kompleksitet
- Passer for: Mellomstore prosjekter

**3. Serverless / Backend-as-a-Service (anbefalt for vibekoding)**
- ✅ Rask utvikling, innebygd sikkerhet
- ❌ Vendor lock-in
- Passer for: De fleste vibekoding-prosjekter

### Hva bør du velge?

| Prosjekttype | Anbefaling |
|--------------|------------|
| MVP/enkel webapp | Serverless (Supabase) |
| Chrome Extension | Frontend-only |
| Mobilapp | Frontend + Backend-as-a-Service |
| Kompleks webapp | Frontend + egen Backend |

---

## 4. TRUSSELMODELLERING: HVA KAN GÅ GALT?

### Hvorfor dette?

Du må tenke gjennom hva som kan misbrukes FØR du bygger – ikke etterpå når det er for sent.

### En enkel analogi for vibekodere

**Trusselmodellering er som å tenke som en innbruddstyv:** "Hvor ville JEG brutt meg inn?" Du trenger ikke være sikkerhetsekspert — bare tenke gjennom de mest åpenbare risikoene. Akkurat som en huseier tenker gjennom hvor en tyv ville komme inn (dør, vindu, bakveien), tenker du gjennom hvor en angriper kunne angripe appen din.

---

### Fire enkle spørsmål (OWASP)

| # | Spørsmål | Tenk på |
|---|----------|---------|
| 1 | Hva bygger vi? | Hvem bruker det? Hva slags data? |
| 2 | Hva kan gå galt? | Alt som kan misbrukes eller feile |
| 3 | Hva gjør vi med det? | Tiltak for de viktigste truslene |
| 4 | Gjorde vi en god jobb? | Verifiser at tiltakene fungerer |

### Praktisk 5-punkts sjekkliste for vibekodere

Spør deg selv disse spørsmålene og merk av:

- [ ] **Har appen innlogging?** → Noen kan prøve å bruke andres konto. *Løsning: Bruk etablert auth-løsning (ikke egenbygget)*

- [ ] **Tar appen imot tekst fra brukere?** → Noen kan sende ondsinnet kode. *Løsning: Valider og saniter all input fra brukere*

- [ ] **Lagrer appen personopplysninger?** → Data kan lekke ut. *Løsning: Krypter sensitiv data, begrens hvem som kan se den*

- [ ] **Har appen betaling/betalingsfunksjon?** → Penger kan stjeles. *Løsning: Bruk etablert betalingsleverandør (Stripe, Vipps), lagre aldri kredittkort selv*

- [ ] **Har appen admin-funksjoner?** → Noen kan prøve å bli admin. *Løsning: Sjekk tilgang på serveren, ikke bare i appen*

**Hvis du krysset av 3+ bokser:** Ta en grundig gjennomgang med AI-assistenten eller en sikkerhetsekspert.

---

### Vanlige trusler å tenke på

| Trussel | På vanlig norsk | Eksempel |
|---------|-----------------|----------|
| Spoofing | Identitetstyveri | Noen later som de er deg |
| Tampering | Manipulering | Noen endrer data de ikke burde |
| Datalekkasje | Persondata på avveie | E-poster lekker ut |
| Tjenestenekt | System utilgjengelig | Angriper overbelaster serveren |
| Rettighetshevning | Vanlig bruker blir admin | Angriper får tilgang de ikke skal ha |

### Hvordan prioritere?

Ikke alle trusler er like alvorlige. Spør:
- Hvor stor skade kan dette gjøre?
- Hvor lett er det å utnytte?
- Hvor mange påvirkes?

---

## 5. SIKKERHET: DE VIKTIGSTE BESLUTNINGENE

### Autentisering (hvem er brukeren?)

**🔴 KRITISK: Aldri bygg egen autentisering!**

Bruk etablerte løsninger:
- Supabase Auth (for Supabase-prosjekter)
- Firebase Auth (for Firebase-prosjekter)
- Clerk (for React/Next.js)
- Auth0 (for større prosjekter)

### Autorisering (hva har brukeren lov til?)

Definer roller med klare rettigheter:

| Rolle | Kan | Kan ikke |
|-------|-----|----------|
| Admin | Alt | - |
| Bruker | Lese/endre EGNE data | Se andres data |
| Gjest | Se offentlig innhold | Opprette/endre |

**Viktig:** Sjekk alltid tilgang på serveren, ikke bare i appen!

### Datahåndtering

Kategoriser data etter sensitivitet:

| Nivå | Eksempler | Krav |
|------|-----------|------|
| Offentlig | Markedsføring | Ingen spesielle |
| Intern | Brukerinnhold | Tilgangskontroll |
| Konfidensiell | Persondata | Kryptering |
| Strengt konfidensiell | Passord, betaling | Sterk kryptering |

### Secrets (hemmeligheter)

API-nøkler, database-passord og lignende MÅ:
- Lagres i miljøvariabler (ALDRI i koden!)
- Være forskjellige for utvikling og produksjon
- Roteres regelmessig

---

## 6. GDPR OG PERSONVERN

### Hvis du har brukere i EU

Du MÅ sikre at brukere kan:
- Se sine data (rett til innsyn)
- Slette sine data (rett til sletting)
- Eksportere sine data (rett til portabilitet)
- Korrigere feil (rett til retting)

### Privacy by Design

- Samle kun data du faktisk trenger
- Informer brukeren om hva du samler
- Gjør det like lett å trekke tilbake samtykke som å gi det

---

## 7. ROLLER OG ANSVAR

I et vibekoding-prosjekt:

| Rolle | Hvem | Ansvar |
|-------|------|--------|
| Prosjektleder | Deg | Overordnet ansvar, beslutninger |
| AI-assistent | Claude/ChatGPT | Kodeimplementering, forslag |
| Sikkerhetsreviewer | Deg + evt. ekspert | Sjekke kritisk kode |

### Når søke ekstern hjelp

| Situasjon | Handling |
|-----------|----------|
| Usikker på sikkerhet | Konsulter sikkerhetsekspert |
| AI gir motstridende råd | Få second opinion |
| Betalingsløsning | Konsulter fintech-ekspert |
| Helsedata | Konsulter helsedata-ekspert |
| GDPR uklart | Konsulter personvern-jurist |

### Røde flagg som krever eskalering

- AI sier "jeg er ikke sikker på sikkerhetsimplikasjonene"
- Koden håndterer kredittkortdata direkte
- Du implementerer kryptografi fra scratch
- Du er usikker på lover/regler

---

## 8. LEVERANSER FRA FASE 3

Når Fase 3 er ferdig, skal du ha:

| Dokument | Hva det er | Fil |
|----------|------------|-----|
| Teknisk Design | Hovedspesifikasjon | TDD.md |
| Trusselmodell | Identifiserte trusler og tiltak | THREAT-MODEL.md |
| SPEC.md | Kortversjon for AI-kontekst | SPEC.md |
| ADR | Dokumentert arkitekturbeslutning | adr/001-xxx.md |

---

## ENKEL SJEKKLISTE

### Før du går videre til Fase 4

**AI-sikkerhet**
- [ ] Jeg forstår at AI-kode kan ha sikkerhetsproblemer
- [ ] Jeg vet at sikkerhetskritisk kode trenger ekstra gjennomgang

**Tech Stack**
- [ ] Jeg har valgt teknologier (med AI sin hjelp)
- [ ] Valgene er dokumentert med begrunnelse

**Arkitektur**
- [ ] Jeg har et bilde av hvordan systemet henger sammen
- [ ] AI har laget et arkitekturdiagram

**Sikkerhet**
- [ ] Auth-løsning er valgt (etablert tjeneste, ikke egen)
- [ ] Roller og tilganger er definert
- [ ] Jeg vet hvordan sensitive data skal behandles

**Dokumentasjon**
- [ ] SPEC.md er klar (AI kan bruke denne)
- [ ] Viktige beslutninger er dokumentert

---

## NESTE STEG

🎉 **Når alt er på plass, er du klar for Fase 4: MVP/Prototype!**

**Tips før du starter Fase 4:**
1. Gi SPEC.md til AI-assistenten som kontekst
2. Ha TDD og trusselmodellen tilgjengelig
3. Begynn med de enkleste funksjonene først

---

## VANLIGE SPØRSMÅL

**"Må jeg virkelig gjøre alt dette for et lite prosjekt?"**
Nei! Bruk prioriteringssystemet. For et personlig verktøy trengs bare det mest kritiske (🔴). For en kundevendt app med brukerdata trengs mer.

**"Jeg forstår ikke det tekniske – er det greit?"**
Ja! Din jobb er å forstå HVORFOR, ikke HVORDAN. Spør AI om å forklare konsepter på enklere måter. Fokuser på beslutningene, ikke detaljene.

**"Hvor lang tid tar Fase 3?"**
For et enkelt prosjekt: 1-2 timer. For et komplekst prosjekt med mange brukere: 1-2 dager.

**"Hva om jeg gjør feil valg?"**
Det er bedre å ta et valg og justere senere enn å ikke ta noe valg. Dokumenter valgene dine (ADR), så husker du hvorfor du tok dem.

---

## Hva om noe går galt?

**Hva om jeg ikke forstår arkitekturen?**
Arkitektur er ikke så komplisert som det høres ut. Be AI om å tegne det som et enkelt diagram: "Bruker → Frontend → Backend → Database". Hvis du forstår disse tre lagene, forstår du arkitekturen. Resten er detaljer.

**Hva om teknologivalgene virker feil?**
Uvanlig nok, men det er OK. Dokumenter hvorfor du valgte dem (ADR), så vet du basisen for å endre dem senere. Teknologi kan endres. Arkitektur kan justeres. Det som teller nå, er at du har gjort et bevisst valg.

**Hva om trusselmodellering virker for avansert?**
Det er normalt å føle seg overveldet. Start enkelt: "Hva hvis noen prøver å logge inn som en annen bruker?" eller "Hva hvis databaspassordet lekker?" Spør AI: "Hva er de tre største trusselen for dette prosjektet?" og start derfra.

---

## Neste steg

Når alle leveranser er på plass og sjekklisten er fullført:

> **Si til AI:** "Fase 3 er ferdig. Kjør fase-gate og gå videre til Fase 4."

AI-en vil da kjøre en kvalitetssjekk (fase-gate) og forberede neste fase for deg.

---

*Versjon 1.0 - Januar 2026*
