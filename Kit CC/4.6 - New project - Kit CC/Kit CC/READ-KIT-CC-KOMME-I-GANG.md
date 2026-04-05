# Komme i gang med Kit CC

> **Din vennlige introduksjon til Kit CC - steg for steg, uten teknisk sjargong**

**For:** Nybegynnere som aldri har brukt Kit CC før
**Tidsbruk:** 30-60 minutter for første gjennomlesning
**Versjon:** 3.4

---

## 🎯 Hva du vil lære

Etter denne guiden kan du:
- ✅ Forstå hva Kit CC er og hvordan det fungerer
- ✅ Starte ditt første prosjekt
- ✅ Aktivere riktig agent for hver oppgave
- ✅ Navigere gjennom de 7 fasene
- ✅ Unngå vanlige nybegynnerfeil

---

## 📚 Kapittel 1: Hva er Kit CC? (5 min)

### **Den enkle forklaringen**

Kit CC er som å ha et helt utviklerteam som assistent - men istedenfor mennesker, har du 50 AI-agenter som samarbeider.

**Tenk på det som:**
- Du er **prosjektlederen**
- AI-agentene er ditt **team**
- Kit CC er **systemet** som koordinerer teamet

### **Hva kan Kit CC hjelpe deg med?**

1. **Planlegge** - Fra vag idé til konkret plan
2. **Designe** - Fra plan til teknisk design
3. **Bygge** - Fra design til fungerende kode
4. **Teste** - Fra kode til kvalitetssikret produkt
5. **Publisere** - Fra produkt til live applikasjon

### **Hvem er Kit CC for?**

- ✅ **Deg som har en idé** - Men ikke vet hvor du skal begynne
- ✅ **Deg som kan "vibekode"** - Du bruker AI-verktøy til å bygge
- ✅ **Deg som vil lære** - Profesjonelle utviklingsprosesser
- ✅ **Deg uten utviklerteam** - Men vil bygge profesjonelt

❌ **IKKE for:** Erfarne utviklere som allerede har egne prosesser

### **Tre måter å bruke Kit CC:**

**1. Spørre (for alle)**
- Du velger "Spørre" ved oppstart
- VEILEDER-agent starter i read-only modus
- Du kan spørre om Kit CC, prosjektet ditt, koding eller teknologi
- Agenten søker på nett automatisk ved behov
- **Fordel:** Lær og forstå uten risiko for å endre noe

**2. Bygge automatisk (for nybegynnere) - Anbefalt**
- Du sier: `Start nytt prosjekt` eller `Fortsett`
- ORCHESTRATOR aktiverer riktig agent automatisk
- Du følger guiden steg-for-steg
- **Fordel:** Enklere, mindre å tenke på

**3. Bygge manuelt (for erfarne) - Avansert**
- Du sier: `Aktiver [AGENT-navn]`
- Du tar mer kontroll selv
- Du kan hoppe mellom agenter fritt
- **Fordel:** Mer fleksibilitet og kontroll

> 💡 **I denne guiden:** Vi bruker primært automatisk modus, men viser også manuell modus der det er relevant.

---

## 🧩 Kapittel 2: De 4 typene agenter (10 min)

### **Nivå 0: System-agenter** (5 stk)

**Hva de gjør:** Jobber automatisk i bakgrunnen
**Du trenger:** Ikke tenke på dem

**Tenk på dem som:**
- Sekretæren som booker møter
- Prosjektkoordinatoren som holder orden
- Arkivaren som husker alt

**Eksempel:**
- AUTO-CLASSIFIER: "Dette er et stort prosjekt, vi må være grundige"
- ORCHESTRATOR: "Nå trenger du BYGGER-agent"
- CONTEXT-LOADER: "Her er hva dere gjorde sist gang"

---

### **Nivå 1: Basis-agenter** (7 stk)

**Hva de gjør:** Tverrfaglige verktøy du bruker ofte
**Du trenger:** Vite når du skal bruke dem

**Tenk på dem som:**
- Verktøykassa di - hammer, sag, skrutrekker
- Du velger riktig verktøy for jobben

**De 7 basis-agentene:**

1. **PLANLEGGER** 🎯
   - **Jobb:** Lage planer og bryte ned oppgaver
   - **Brukes når:** Du skal planlegge noe
   - **Eksempel:** "Jeg vil bygge innlogging" → PLANLEGGER lager plan

2. **BYGGER** 🔨
   - **Jobb:** Skrive kode
   - **Brukes når:** Du skal implementere noe
   - **Eksempel:** "Basert på planen, bygg innlogging" → BYGGER skriver kode

3. **REVIEWER** 🔍
   - **Jobb:** Sjekke kodekvalitet
   - **Brukes når:** Automatisk etter BYGGER
   - **Eksempel:** REVIEWER sjekker om koden er god

4. **SIKKERHETS** 🛡️
   - **Jobb:** Finne sikkerhetsproblemer
   - **Brukes når:** Automatisk etter BYGGER
   - **Eksempel:** SIKKERHETS finner at passord ikke er kryptert

5. **DEBUGGER** 🐛
   - **Jobb:** Finne og fikse feil
   - **Brukes når:** Noe ikke fungerer
   - **Eksempel:** "Brukere kan ikke logge inn" → DEBUGGER finner hvorfor

6. **DOKUMENTERER** 📋
   - **Jobb:** Skrive dokumentasjon
   - **Brukes når:** Du trenger README eller dokumenter
   - **Eksempel:** DOKUMENTERER skriver hvordan brukere logger inn

7. **VEILEDER** 📚
   - **Jobb:** Veiledning og kunnskapsdeling (read-only)
   - **Brukes når:** Du velger "Spørre" ved oppstart
   - **Eksempel:** "Hvordan fungerer Kit CC?" → VEILEDER forklarer med eksempler og kilder

**Viktig å vite:**
- Du kaller PLANLEGGER og BYGGER **manuelt**
- REVIEWER, SIKKERHETS, DOKUMENTERER kalles ofte **automatisk**

---

### **Nivå 2: Prosess-agenter** (7 stk)

**Hva de gjør:** Koordinerer hele faser
**Du trenger:** Aktivere én når du starter en ny fase

**Tenk på dem som:**
- Fasledere på et byggeprosjekt
- Fase 1-leder, Fase 2-leder, osv.

**De 7 prosess-agentene:**

| Fase | Agent | Hva skjer | Når du bruker den |
|------|-------|-----------|-------------------|
| **1** | 🌱 OPPSTART | Du definerer problemet og visjonen | Når du starter nytt prosjekt |
| **2** | 📋 KRAV | Du bestemmer hva appen skal gjøre | Etter Fase 1 |
| **3** | 🏗️ ARKITEKTUR | Du designer teknisk løsning | Etter Fase 2 |
| **4** | 🚀 MVP | Du bygger første versjon | Etter Fase 3 |
| **5** | 🔄 ITERASJON | Du fullfører og polerer | Etter Fase 4 |
| **6** | ✅ KVALITET | Du tester alt grundig | Før lansering |
| **7** | 🌐 PUBLISERING | Du publiserer appen | Klar til å gå live |

**Viktig å vite:**
- Du går gjennom fasene **i rekkefølge**
- Du kan **ikke hoppe over** Fase 1-3 for nye prosjekter
- For små features på eksisterende prosjekter: Hopp rett til BYGGER

---

### **Nivå 3: Ekspert-agenter** (31 stk)

**Hva de gjør:** Spesialistkompetanse på smale områder
**Du trenger:** Ikke kalle dem - Prosess-agentene gjør det

**Tenk på dem som:**
- Konsulenter du ringer inn ved behov
- Sikkerhetsekspert, personvernrådgiver, UX-designer

**Eksempler:**
- **OWASP-ekspert** - Tester sikkerhet mot OWASP Top 10
- **GDPR-ekspert** - Sjekker at du følger personvernreglene
- **WIREFRAME-ekspert** - Lager UI-skisser
- **TRUSSELMODELLERINGS-ekspert** - Finner sikkerhetstrusler

**Viktig å vite:**
- Du trenger **ikke** å huske alle 31 ekspertene
- Prosess-agentene kaller dem **automatisk** når nødvendig
- Eksempler: ARKITEKTUR-agent kaller TRUSSELMODELLERINGS-ekspert

---

## 🚀 Kapittel 3: Ditt første prosjekt (15 min)

### **Scenario: Todo-app**

La oss bygge en enkel todo-app sammen, steg for steg.

---

### **Steg 1: Forberedelse (2 min)**

**Opprett prosjektmappe:**
```bash
mkdir min-todo-app
cd min-todo-app
```

**Kopier Agenter-mappen:**
```bash
cp -r /path/til/Agenter ./
```

**Åpne Claude Code:**
```bash
# I prosjektmappen
claude-code .
```

---

### **Steg 2: Start prosjektet (5 min)**

**For nybegynnere (anbefalt - automatisk):**
```
Start nytt prosjekt
```

**Hva skjer nå - "Start nytt prosjekt" triggers OPPSTART-agent automatisk:**
1. Du sier: `Start nytt prosjekt`
2. ORCHESTRATOR aktiverer AUTO-CLASSIFIER automatisk
3. Du svarer på noen enkle spørsmål om prosjektet (progressiv avsløring)
4. Prosjektet klassifiseres (MIN/FOR/STD/GRU/ENT)
5. ORCHESTRATOR aktiverer automatisk OPPSTART-agent ← Du starter Fase 1

Det enkleste er altså bare å si `Start nytt prosjekt` - resten skjer automatisk!

> 💡 **For erfarne brukere som vil mer kontroll:** Du kan hoppe over AUTO-CLASSIFIER og gå rett til Fase 1 med: `Aktiver OPPSTART-agent. Jeg vil bygge [idé]`

**Dine svar (for todo-app):**

| Spørsmål | Svar | Poeng |
|----------|------|-------|
| Prosjektstørrelse? | Liten (kun én feature) | 1 |
| Hvem skal bruke det? | Kun meg selv | 1 |
| Hvilke data? | Intern data (todo-tekst) | 2 |
| Hvor mange brukere? | Under 50 (bare meg) | 1 |
| Hva skjer ved nedetid? | Ingen konsekvens | 1 |
| Regulering? | Ingen krav | 1 |
| Integrasjoner? | Standalone | 1 |

**Total:** 8 poeng → **Enkelt hobbyprosjekt**

**Hva betyr Enkelt hobbyprosjekt?**
- ✅ Rask prosess (timer-dager)
- ✅ Kun de mest nødvendige oppgavene
- ⛔ Ingen GDPR-sjekk (ikke nødvendig)
- ⛔ Ingen lasttest (ikke nødvendig)

---

### **Steg 3: Fase 1 - Idé og visjon (5 min)**

**OPPSTART-agent aktiveres automatisk av ORCHESTRATOR.**

**Hva OPPSTART-agent spør om:**
- Hva er problemet du vil løse?
- Hvem er målgruppen? (deg selv)
- Hva er målet med appen?

**Du svarer:**
```
Problemet: Jeg trenger en enkel måte å holde oversikt over oppgaver.
Målgruppe: Meg selv, personlig bruk.
Mål: Kunne legge til, fullføre og slette todos.
```

**OPPSTART-agent gjør:**
1. Lager `docs/vision.md`
2. Gjennomfører enkel risikovurdering (enkelt hobbyprosjekt = få risikoer)
3. Går til neste fase

**Output:**
```
✅ docs/vision.md opprettet
✅ Ingen kritiske risikoer identifisert
✅ Klar for Fase 2
```

---

### **Steg 4: Fase 2 - Planlegg (5 min)**

**KRAV-agent aktiveres automatisk etter Fase 1.**

**Hva KRAV-agent gjør:**
1. Lager brukerhistorier:
   - Som bruker vil jeg legge til todos
   - Som bruker vil jeg markere todos som fullført
   - Som bruker vil jeg slette todos
   - Som bruker vil jeg se liste over alle todos

2. Definerer MVP (hva er minimalt nødvendig):
   - **MUST:** Legge til, fullføre, slette todos
   - **WON'T:** Kategorier, prioritering, deling (ikke nå)

3. Lager enkel wireframe (UI-skisse)

**Output:**
```
✅ docs/krav/user-stories.md opprettet
✅ docs/mvp-definisjon.md opprettet
✅ Klar for Fase 3
```

---

### **Steg 5: Fase 3 - Arkitektur og sikkerhet (5 min)**

**ARKITEKTUR-agent aktiveres.**

**Hva ARKITEKTUR-agent gjør:**
1. Foreslår tech stack:
   - **Frontend:** React + Vite
   - **Styling:** Tailwind CSS
   - **State:** React useState (ingen backend nødvendig)
   - **Hosting:** Vercel

2. Lager datamodell:
   ```
   Todo {
     id: string
     tekst: string
     fullført: boolean
     opprettet: Date
   }
   ```

3. (Enkelt hobbyprosjekt = hopper over trusselmodellering)

**Output:**
```
✅ docs/teknisk/tech-stack.md opprettet
✅ docs/teknisk/datamodell.md opprettet
✅ Klar for Fase 4
```

---

### **Steg 6: Fase 4 - MVP (30 min)**

**MVP-agent aktiveres automatisk av ORCHESTRATOR.**

**Hva du gjør:**
```
Fortsett
```
(ORCHESTRATOR forstår at Fase 3 er ferdig og starter Fase 4)

> 💡 **For erfarne:** Du kan også si `Aktiver MVP-agent. Bygg todo-appen basert på teknisk design.`

**Hva MVP-agent gjør:**
1. Setter opp Git-repo
2. Initialiserer React + Vite-prosjekt
3. Kaller BYGGER-agent:
   - **Stage 1:** UI-komponenter (TodoList, TodoItem, AddTodoForm)
   - **Stage 2:** State-håndtering (useState, add, toggle, delete)
   - **Stage 3:** Styling (Tailwind CSS)

4. Genererer tester automatisk (enkelt hobbyprosjekt = enkle tester)
5. Deployer til Vercel staging

**Output:**
```
✅ Fungerende todo-app
✅ Live på: https://min-todo-app-staging.vercel.app
✅ Klar for Fase 5
```

---

### **Steg 7: Fase 5 - Bygg funksjonene (enkelt hobbyprosjekt = Hopp over)**

For enkle hobbyprosjekter hopper vi ofte over Fase 5.

**Hvis du vil polere:**
- Forbedre design
- Legge til animasjoner
- Responsivt design

Men for din første gang: **Hopp til Fase 6**

---

### **Steg 8: Fase 6 - Test, sikkerhet og kvalitetssjekk (15 min)**

**KVALITETSSIKRINGS-agent aktiveres.**

**Hva KVALITETSSIKRINGS-agent gjør (Enkelt hobbyprosjekt):**
1. Manuell smoke test:
   - ✅ Kan jeg legge til todo?
   - ✅ Kan jeg fullføre todo?
   - ✅ Kan jeg slette todo?
   - ✅ Vises alle todos?

2. Sjekker at appen fungerer i Chrome/Firefox/Safari

3. (Enkelt hobbyprosjekt = hopper over OWASP, GDPR, lasttest)

**Output:**
```
✅ Smoke test bestått
✅ Cross-browser OK
✅ Klar for produksjon
```

---

### **Steg 9: Fase 7 - Publiser og vedlikehold (10 min)**

**PUBLISERINGS-agent aktiveres automatisk av ORCHESTRATOR.**

**Hva du gjør:**
```
Fortsett
```
(ORCHESTRATOR starter automatisk Fase 7)

> 💡 **For erfarne:** Du kan også si `Aktiver PUBLISERINGS-agent. Deploy todo-appen til produksjon.`

**Hva PUBLISERINGS-agent gjør:**
1. Deployer til Vercel produksjon
2. Gir deg live URL
3. (Enkelt hobbyprosjekt = ingen monitoring/backup nødvendig)

**Output:**
```
✅ Live på: https://min-todo-app.vercel.app
🎉 Gratulerer! Ditt første Kit CC-prosjekt er publisert!
```

---

## 💡 Kapittel 4: Vanlige nybegynnerfeil (5 min)

### **Feil 1: "Jeg prøver å kalle alle agenter manuelt"**

❌ **Feil:**
```
Aktiver OWASP-ekspert.
Aktiver GDPR-ekspert.
Aktiver MONITORING-ekspert.
...
```

✅ **Riktig:**
```
Aktiver KVALITETSSIKRINGS-agent.
```
→ Denne kaller ekspertene automatisk

**Læring:** Prosess-agenter koordinerer. Du kaller kun dem.

---

### **Feil 2: "Jeg hopper over Fase 1-3"**

❌ **Feil:**
```
Aktiver BYGGER-agent.
Bygg en todo-app.
```
(Uten vision, krav eller design)

✅ **Riktig (nybegynner):**
```
Start nytt prosjekt
```
→ ORCHESTRATOR aktiverer fasene i riktig rekkefølge

✅ **Riktig (erfaren):**
```
Aktiver OPPSTART-agent.
Jeg vil bygge en todo-app.
```
→ Følg fasene i rekkefølge

**Læring:** For NYE prosjekter: Fase 1-3 er nødvendig (tar bare 1-2 timer for enkle hobbyprosjekter).

---

### **Feil 3: "Jeg gir ikke nok kontekst"**

❌ **Feil:**
```
Aktiver BYGGER-agent.
```

✅ **Riktig:**
```
Aktiver BYGGER-agent.
Implementer brukerautentisering basert på plan.md.
Tech stack: Next.js + Supabase.
```

**Læring:** Jo mer kontekst, desto bedre resultat.

---

### **Feil 4: "Jeg forventer at AUTO-CLASSIFIER gjør alt"**

❌ **Feil:**
"AUTO-CLASSIFIER klassifiserte prosjektet mitt. Nå gjør AI alt automatisk!"

✅ **Riktig:**
- AUTO-CLASSIFIER bestemmer kun **hvor grundig** prosessen er (MIN/FOR/STD/GRU/ENT)
- ORCHESTRATOR aktiverer riktig agent når du sier `Fortsett`
- Du må fortsatt **gi input** og **godkjenne beslutninger**

**Læring:** AUTO-CLASSIFIER = Nivå-bestemmer. ORCHESTRATOR = Koordinerer. Du = Prosjektleder.

---

### **Feil 5: "Jeg forstår ikke hvorfor noe er MÅ vs BØR vs KAN"**

❌ **Forvirring:**
"Hvorfor er OWASP-testing KAN for mitt prosjekt, men MÅ for andres?"

✅ **Forståelse:**
- **Enkelt hobbyprosjekt:** OWASP = KAN (valgfritt)
- **Vanlig app-prosjekt:** OWASP = MÅ (kritisk)

**Læring:** Prosjekttype styrer MÅ/BØR/KAN.

---

## 🎓 Kapittel 5: Neste steg (5 min)

### **Du har nå lært:**
✅ Hva Kit CC er
✅ De 4 nivåene av agenter
✅ De 7 fasene
✅ Hvordan bygge ditt første prosjekt
✅ Vanlige feil å unngå

### **Hva gjør jeg nå?**

#### **1. Bygg ditt første prosjekt (anbefalt)**

Start med noe **ENKELT**:
- ✅ Todo-app
- ✅ Notatapp
- ✅ Enkel kalkulator
- ✅ Personlig blogg

**Hvorfor?** Du lærer ved å gjøre. Start enkelt, bli bedre, bygg mer komplekst.

**Tidsbruk:** 2-4 timer (enkelt hobbyprosjekt)

---

#### **2. Les mer dokumentasjon**

**Hvis du vil forstå mer:**
- [READ-KIT-CC-BRUKERHÅNDBOK.md](READ-KIT-CC-BRUKERHÅNDBOK.md) - Komplett guide
- [READ-KIT-CC-FUNKSJONSOVERSIKT.md](READ-KIT-CC-FUNKSJONSOVERSIKT.md) - Alle funksjoner
- FASE-1-KOMPLETT.md til FASE-7-KOMPLETT.md - Detaljert om hver fase

---

#### **3. Bygg et reelt prosjekt**

Nå som du har erfaring fra første prosjekt, bygg noe du faktisk trenger:
- 🏢 Intern verktøy for jobben
- 💡 Din egen app-idé
- 🚀 MVP for gründeridé

**Klassifisering:** Sannsynligvis lite, oversiktlig prosjekt eller vanlig app-prosjekt.

---

## 📖 Appendix: Hurtigreferanse

### **De 4 agentene du bruker 90% av tiden:**

**Nybegynner-modus (automatisk - anbefalt):**

| Når | Kommando | Hva skjer |
|-----|----------|-----------|
| Nytt prosjekt | `Start nytt prosjekt` | ORCHESTRATOR aktiverer OPPSTART-agent |
| Fortsette arbeidet | `Fortsett` | ORCHESTRATOR aktiverer neste fase-agent |

**Erfaren-modus (manuell):**

| Agent | Når | Kommando |
|-------|-----|----------|
| **OPPSTART** | Nytt prosjekt | `Aktiver OPPSTART-agent. Jeg vil bygge [idé]` |
| **PLANLEGGER** | Ny feature | `Aktiver PLANLEGGER-agent. Jeg vil bygge [feature]` |
| **BYGGER** | Implementere | `Aktiver BYGGER-agent. Implementer basert på plan.md` |
| **DEBUGGER** | Noe er feil | `Aktiver DEBUGGER-agent. [Beskriv problem]` |

---

### **De 7 fasene - kort versjon:**

| Fase | Hva | Tidsbruk (enkelt hobbyprosjekt) |
|------|-----|---------------------|
| 1. Idé og visjon | Hva skal du bygge? | 30 min |
| 2. Planlegg | Funksjoner, krav og sikkerhet | 1 time |
| 3. Arkitektur og sikkerhet | Hvordan bygges det trygt? | 1 time |
| 4. MVP | Sett opp prosjektet - Første fungerende versjon | 2-4 timer |
| 5. Bygg funksjonene | Én funksjon om gangen | - |
| 6. Test, sikkerhet og kvalitetssjekk | Fungerer alt? | 30 min |
| 7. Publiser og vedlikehold | Ut i verden | 30 min |

**Total:** 6-8 timer for et enkelt hobbyprosjekt

---

### **Prosjekttyper:**

| Nivå | Score | Eksempel | Tidsbruk |
|------|-------|----------|----------|
| MIN | 7-10 | Todo-app, læringsprosjekt | Timer-dager |
| FOR | 11-14 | Internt verktøy | Uker |
| STD | 15-18 | Kundevendt app | Uker-måneder |
| GRU | 19-23 | Helsetjeneste, fintech | Måneder |
| ENT | 24-28 | Banking, offentlig sektor | Måneder+ |

---

## 🆘 Hjelp!

**Problem:** "Jeg vet ikke hvilken agent jeg skal bruke"

**Løsning:**
```
Si: "Jeg vil [beskriv hva du vil gjøre]"
```
ORCHESTRATOR vil foreslå riktig agent.

---

**Problem:** "Noe fungerer ikke"

**Løsning:**
```
Aktiver DEBUGGER-agent.
[Beskriv problemet så detaljert som mulig]
```

---

**Problem:** "Jeg har glemt hvor jeg var"

**Løsning:**
```
Si: "Vis status"
```
CONTEXT-LOADER viser hvor du er og hva som gjenstår.

---

## 🎉 Gratulerer!

Du er nå klar til å bruke Kit CC!

**Husk:**
- Start **enkelt** (enkelt hobbyprosjekt)
- Følg **fasene** (1 → 2 → 3 → 4 → 5 → 6 → 7)
- Gi **kontekst** til agentene
- **Lær ved å gjøre** (ikke bare lese)

**Lykke til! 🚀**

---

**Neste:** [READ-KIT-CC-BRUKERHÅNDBOK.md](READ-KIT-CC-BRUKERHÅNDBOK.md) for mer dybde

**Versjon:** 3.4
**Opprettet:** 3. februar 2026
**Oppdatert:** 10. februar 2026
