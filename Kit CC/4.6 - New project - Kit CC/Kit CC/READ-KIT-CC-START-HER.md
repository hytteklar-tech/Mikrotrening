# START HER: Quick Guide til Kit CC

**👋 Velkommen til Kit CC!**

Dette dokumentet hjelper deg raskt i gang med dagens agentmaskineri.

---

## 📖 ANBEFALT LESEREKKEFØLGE

Ikke les alt! Velg stien som passer deg:

### 🟢 Rask start (10 min)
1. **Denne filen** (READ-KIT-CC-START-HER.md) — Du er her nå
2. Si "Start nytt prosjekt" til AI-assistenten

### 🟡 Grundig forberedelse (30 min)
1. **Denne filen** — Oversikt og konsepter
2. **[READ-KIT-CC-KOMME-I-GANG.md](READ-KIT-CC-KOMME-I-GANG.md)** — Pedagogisk gjennomgang med eksempel-prosjekt
3. Si "Start nytt prosjekt" til AI-assistenten

### 🔴 Komplett forståelse (1-2 timer)
1. **Denne filen** — Oversikt og konsepter
2. **[READ-KIT-CC-KOMME-I-GANG.md](READ-KIT-CC-KOMME-I-GANG.md)** — Pedagogisk gjennomgang
3. **[READ-KIT-CC-BRUKERHÅNDBOK.md](READ-KIT-CC-BRUKERHÅNDBOK.md)** — Komplett referanse
4. **[READ-KIT-CC-REFERANSE.md](READ-KIT-CC-REFERANSE.md)** — Hurtigreferanse (behold åpen)

### Du trenger IKKE lese:
- **Fase-mapper** — AI leser disse automatisk
- **Agenter-mappen** — AI bruker disse automatisk
- **KIT-CC-EVALUERING.md** — Intern evaluering av systemet
- **READ-KIT-CC-GUI-PROSJEKTERING.md** — Fremtidig designdokument (ikke implementert ennå)

---

## 🎯 Hva er Kit CC?

Et komplett system for å bygge apper med AI-assistanse - fra idé til produksjon.

**Består av:**
- **7 faser** (Oppstart → Krav → Arkitektur → MVP → Iterasjon → Kvalitetssikring → Publisering)
- **50 AI-agenter** på 4 nivåer (System, Prosess, Basis, Ekspert)
- **Sikkerhet på to nivåer** (Security by Design i arkitektur + Security Validation i kode)
- **Automatisk klassifisering** av prosjektstørrelse

**Målgruppe:** Ikke-kodere som bygger med AI-verktøy (Cursor, Claude, Supabase, Vercel)

---

## 🏗️ Agent-arkitekturen (4 nivåer)

```
┌────────────────────────────────────────┐
│  NIVÅ 0: SYSTEM-AGENTER (5 stk)       │ ← Orkestrering (automatisk)
│  ORCHESTRATOR styrer alt               │
└────────────────────────────────────────┘
              ↓
┌────────────────────────────────────────┐
│  NIVÅ 2: PROSESS-AGENTER (7 stk)      │ ← Én per fase (du aktiverer)
│  Koordinerer arbeidet i sin fase       │
└────────────────────────────────────────┘
              ↓
    ┌─────────────┬─────────────┐
    ↓             ↓             ↓
┌─────────┐  ┌─────────┐  ┌─────────┐
│ NIVÅ 1: │  │ NIVÅ 3: │  │ NIVÅ 3: │
│ BASIS   │  │ EKSPERT │  │ EKSPERT │
│ (7 stk) │  │ (30 stk)│  │ (mer)   │
└─────────┘  └─────────┘  └─────────┘
```

**Du trenger bare å aktivere Prosess-agenter** - resten kalles automatisk.

---

## ⚡ Quick Start (5 minutter)

### **Steg 1: Hvor er du i prosjektet?**

Velg ditt scenario:

```
┌─────────────────────────────────────────────────────┐
│  "Jeg vil bare spørre om noe / forstå prosjektet"   │
│  → Velg "Spørre" ved oppstart → VEILEDER-agent      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  "Jeg har en idé, men har ikke startet noe ennå"   │
│  → Gå til: FASE 1 - Aktiver OPPSTART-agent         │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  "Jeg vet hva jeg vil bygge, trenger kravspec"     │
│  → Gå til: FASE 2 - Aktiver KRAV-agent             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  "Jeg har kravene, trenger teknisk design"         │
│  → Gå til: FASE 3 - Aktiver ARKITEKTUR-agent       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  "Jeg vil starte å kode og bygge prototype"        │
│  → Gå til: FASE 4 - Aktiver MVP-agent              │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  "Jeg har prototype, må fullføre funksjoner"       │
│  → Gå til: FASE 5 - Aktiver ITERASJONS-agent       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  "Appen er ferdig, må testes før lansering"        │
│  → Gå til: FASE 6 - Aktiver KVALITETSSIKRINGS-agent│
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  "Alt er testet, klar til å publisere"             │
│  → Gå til: FASE 7 - Aktiver PUBLISERINGS-agent     │
└─────────────────────────────────────────────────────┘
```

### **Steg 2: Start arbeidet**

**For nybegynnere (anbefalt):**
```
Start nytt prosjekt              # → ORCHESTRATOR aktiverer OPPSTART-agent
Fortsett                         # → ORCHESTRATOR gjenopptar riktig fase
Jeg vil bygge [beskriv idé]     # → ORCHESTRATOR velger riktig agent
```

**For erfarne brukere (manuell kontroll):**
```
Aktiver [FASE]-agent
[Beskriv oppgaven din]
```

Eksempel (nybegynner - automatisk):
```
Start nytt prosjekt
# → ORCHESTRATOR starter klassifisering
# → AUTO-CLASSIFIER bruker progressiv avsløring (3 åpningsspørsmål + oppfølging)
# → OPPSTART-agent aktiveres automatisk
```

Eksempel (erfaren - manuell):
```
Aktiver OPPSTART-agent.
Jeg vil bygge en todo-app med samarbeidsfunksjoner.
```

### **Automatisk klassifisering**

Når du starter et nytt prosjekt, stiller **AUTO-CLASSIFIER** deg 3 enkle spørsmål om hva du skal bygge. Basert på svarene dine bestemmer den automatisk riktig prosjekttype — fra enkelt hobbyprosjekt til stort, kritisk system. Du ser aldri teknisk sjargong — alt skjer bak kulissene.

Klassifiseringen kan endres underveis hvis prosjektet vokser eller endrer karakter.

### **Steg 3: Følg agentens instruksjoner**

Agenten vil:
- Guide deg gjennom fasen steg-for-steg
- Kalle andre agenter automatisk når nødvendig
- Dokumentere alt underveis

---

## 🧭 De 90/10 Agentene

**90% av tiden bruker du bare disse 4 agentene:**

### **1. 🌱 OPPSTART-agent** (Prosess-agent for Fase 1)
**Når:** Du starter nytt prosjekt
**Gjør:** Problemdefinisjon, risikovurdering, dataklassifisering, prosjektklassifisering
**Output:** Vision, risikovurdering, klassifisering

**Quick prompt (nybegynner - automatisk):**
```
Start nytt prosjekt
```

**Quick prompt (erfaren - manuell):**
```
Aktiver OPPSTART-agent.
Jeg vil bygge [beskriv idé i 1-2 setninger].
```

---

### **2. 🎯 PLANLEGGER-agent** (Basis-agent)
**Når:** Du skal planlegge en ny feature
**Gjør:** Lager PRD, bryter ned oppgaver, AI-WBS generator
**Output:** `plan.md` med Work Breakdown Structure

**Quick prompt:**
```
Aktiver PLANLEGGER-agent.
Jeg vil bygge [beskriv feature].
Lag PRD og oppgavenedbrytning.
```

---

### **3. 🔨 BYGGER-agent** (Basis-agent)
**Når:** Du skal implementere kode
**Gjør:** Bygger i 3 stages (UI → Funksjonalitet → Sikkerhet)
**Output:** Fungerende kode

**Quick prompt:**
```
Aktiver BYGGER-agent.
Implementer basert på plan.md
```

---

### **4. 🐛 DEBUGGER-agent** (Basis-agent)
**Når:** Noe er i stykker
**Gjør:** Finner og fikser bugs
**Output:** Fikset kode

**Quick prompt:**
```
Aktiver DEBUGGER-agent.
Jeg har følgende problem: [beskriv bug].
```

---

## 📊 De andre agentene (kalles automatisk)

### **NIVÅ 0: System-agenter (5 stk)**
Disse jobber i bakgrunnen - du trenger ikke aktivere dem:
- **ORCHESTRATOR** - Koordinerer alle agenter
- **AUTO-CLASSIFIER** - Klassifiserer prosjektstørrelse automatisk
- **CONTEXT-LOADER** - Laster prosjektkontekst
- **PHASE-GATES** - Validerer kvalitet mellom faser
- **AGENT-PROTOCOL** - Kommunikasjonsstandard

### **NIVÅ 2: Prosess-agenter (7 stk)**
Én per fase - disse aktiverer du:

| Fase | Agent | Hva den gjør |
|------|-------|--------------|
| **1** | 🌱 **OPPSTART-agent** | Problemdefinisjon, risiko, klassifisering |
| **2** | 📋 **KRAV-agent** | Brukerhistorier, kravspec |
| **3** | 🏗️ **ARKITEKTUR-agent** | Tech stack, design, trusselmodellering |
| **4** | 🚀 **MVP-agent** | Prosjektoppsett, prototype |
| **5** | 🔄 **ITERASJONS-agent** | Fullføre features, polering |
| **6** | ✅ **KVALITETSSIKRINGS-agent** | Testing, sikkerhet |
| **7** | 🌐 **PUBLISERINGS-agent** | Deploy, monitoring |

### **NIVÅ 1: Basis-agenter (7 stk)**
Tverrfaglige verktøy - kalles automatisk av Prosess-agenter:
- 🎯 **PLANLEGGER** - PRD og oppgavenedbrytning
- 🔨 **BYGGER** - Implementerer kode
- 🔍 **REVIEWER** - Code review
- 🛡️ **SIKKERHETS** - Security audit
- 🐛 **DEBUGGER** - Bugfixing
- 📋 **DOKUMENTERER** - Oppdaterer dokumentasjon
- 📚 **VEILEDER** - Spørremodus (read-only, veiledning og kunnskapsdeling)

### **NIVÅ 3: Ekspert-agenter (31 stk)**
Spesialistkompetanse - kalles automatisk når nødvendig:
- 🔐 **OWASP-ekspert** - Sikkerhetstest
- 📊 **GDPR-ekspert** - GDPR-compliance
- ⚠️ **TRUSSELMODELLERINGS-ekspert** - STRIDE-analyse
- 🎨 **WIREFRAME-ekspert** - UI-skisser
- ♿ **TILGJENGELIGHETS-ekspert** - WCAG-testing
- 📈 **YTELSE-ekspert** - Performance-optimalisering
- 🧪 **BRUKERTEST-ekspert** - Brukertesting
- ... og 23 andre spesialister

**Du trenger IKKE å manuelt kalle disse** - Prosess-agentene gjør det automatisk.

---

## 🎯 Decision Tree: Hvilken agent trenger jeg?

```
START HER
    ↓
Vil du bygge, eller bare spørre/forstå?
    │
    ├─ SPØRRE → Velg "Spørre" ved oppstart
    │            → VEILEDER-agent (read-only)
    │
    └─ BYGGE
       ↓
       Har du startet prosjektet?
       │
       ├─ NEI → Aktiver OPPSTART-agent (Fase 1)
       │        Deretter følg Fase 2-7 sekvensielt
       │
       └─ JA
          ↓
          Har du en bug?
          │
          ├─ JA → Aktiver DEBUGGER-agent
          │
          └─ NEI
             ↓
             Skal du bygge ny feature?
             │
             ├─ JA
             │   ↓
             │   Har du plan for featuren?
             │   │
             │   ├─ NEI → Aktiver PLANLEGGER-agent
             │   │        Deretter BYGGER-agent
             │   │
             │   └─ JA → Aktiver BYGGER-agent
             │
             └─ NEI
                ↓
                Er du klar for lansering?
                │
                ├─ JA → Aktiver KVALITETSSIKRINGS-agent
                │        Deretter PUBLISERINGS-agent
                │
                └─ NEI → Les fasedokumentene for å finne
                         riktig fase
```

---

## 🚀 3 Vanligste Scenarios

### **Scenario 1: Helt nytt prosjekt (første gang)**

```
TID: 2-6 uker avhengig av kompleksitet

DAG 1-2: PLANLEGGING
├─ Aktiver OPPSTART-agent → vision, klassifisering
├─ Aktiver KRAV-agent → kravdokumenter
└─ Aktiver ARKITEKTUR-agent → teknisk spec

DAG 3-5: MVP
└─ Aktiver MVP-agent → fungerende prototype

UKE 2-4: UTVIKLING
└─ Aktiver ITERASJONS-agent → feature-komplett app

UKE 5: TESTING
└─ Aktiver KVALITETSSIKRINGS-agent → testet app

DAG SISTE: LANSERING
└─ Aktiver PUBLISERINGS-agent → live app
```

**Kopier-klar kommando:**
```
Aktiver OPPSTART-agent.
Jeg vil bygge [din idé].
```

---

### **Scenario 2: Legg til ny feature (daglig bruk)**

```
TID: 1-3 dager per feature

STEG 1: PLANLEGG (30 min)
└─ Aktiver PLANLEGGER-agent → plan.md lages

STEG 2: BYGG (4-8 timer)
└─ Aktiver BYGGER-agent → implementer feature

STEG 3: REVIEW (1-2 timer)
├─ REVIEWER-agent kalles automatisk → code review
└─ SIKKERHETS-agent kalles automatisk → security review

STEG 4: DEPLOY
└─ Deploy til staging → testing → produksjon
```

**Kopier-klar kommando:**
```
Aktiver PLANLEGGER-agent.
Jeg vil bygge [feature].
```

---

### **Scenario 3: Fikse en bug (ad-hoc)**

```
TID: 30 min - 4 timer avhengig av kompleksitet

STEG 1: IDENTIFISER
└─ Aktiver DEBUGGER-agent → finn årsak

STEG 2: FIKS
└─ DEBUGGER-agent → implementer fix

STEG 3: VERIFISER
└─ Kjør tester → verifiser fix
```

**Kopier-klar kommando:**
```
Aktiver DEBUGGER-agent.
Jeg har følgende problem: [beskriv bug].
```

---

## ⚠️ Vanlige Misforståelser

### ❌ Misforståelse 1: "Jeg må kalle alle 50 agenter manuelt"
✅ **Realitet:** Du aktiverer hovedsakelig bare **Prosess-agenter** (7 stk). De kaller de andre automatisk.

### ❌ Misforståelse 2: "Jeg må følge alle 7 faser selv for en liten feature"
✅ **Realitet:** For eksisterende prosjekter: Bruk bare PLANLEGGER → BYGGER → (REVIEWER kalles automatisk).

### ❌ Misforståelse 3: "Jeg kan hoppe over Fase 1-3 og gå rett til koding"
✅ **Realitet:** For NYE prosjekter må du gå gjennom Fase 1-3. Men det tar bare 1-2 dager og sparer uker senere.

### ❌ Misforståelse 4: "OWASP-ekspert er for store prosjekter"
✅ **Realitet:** OWASP-testing er kritisk for ALLE kundevendte apper, uansett størrelse. Tar 2-3 timer, kan spare deg for databrudd.

### ❌ Misforståelse 5: "AUTO-CLASSIFIER styrer alt automatisk"
✅ **Realitet:** AUTO-CLASSIFIER klassifiserer bare prosjektstørrelse (MIN/FOR/STD/GRU/ENT).
- **Nybegynnere:** Sier `Fortsett` → ORCHESTRATOR aktiverer riktig agent
- **Erfarne:** Aktiverer Prosess-agenter manuelt for mer kontroll

## 🎯 Hvor finner jeg hva?

```
Ongoing work/
├── READ-KIT-CC-START-HER.md       ← Du er her
├── READ-KIT-CC-KOMME-I-GANG.md    ← Nybegynnerguide
├── READ-KIT-CC-BRUKERHÅNDBOK.md   ← Komplett håndbok
├── READ-KIT-CC-FUNKSJONSOVERSIKT.md ← Alle funksjoner
├── READ-KIT-CC-REFERANSE.md       ← Quick reference
├── CLAUDE.md                 ← Prosjektoversikt og prinsipper
│
├── Agenter/                  ← Alle 50 agenter
│   ├── README.md             ← Oversikt over agentsystemet
│   ├── USER-*.md             ← Dokumentasjon for brukere
│   ├── agenter/
│   │   ├── system/           ← Nivå 0: System-agenter (5)
│   │   ├── prosess/          ← Nivå 2: Prosess-agenter (7)
│   │   ├── basis/            ← Nivå 1: Basis-agenter (7)
│   │   └── ekspert/          ← Nivå 3: Ekspert-agenter (31)
│   └── klassifisering/       ← Klassifiseringssystem
│
├── Fase 1-7/                 ← Fasedokumenter
│   └── FASE-X-KOMPLETT.md    ← Gjeldende fasedokument
│
├── Research/                 ← Aktiv research
└── Arkiv/                    ← Utdaterte filer og research
```

---

## 🔥 Pro Tips

### **Tip 1: Alltid gi kontekst**
```
❌ Dårlig: "Aktiver BYGGER-agent"
✅ Bra: "Aktiver BYGGER-agent. Implementer brukerautentisering basert på plan.md"
```

### **Tip 2: Referer til eksisterende dokumenter**
```
✅ "Les vision.md og kravdokumenter før du fortsetter"
```

### **Tip 3: Vær spesifikk på leveranser**
```
✅ "Lagre resultatet i docs/security/trusselmodell.md"
```

### **Tip 4: Bruk 3-stage tilnærmingen**
Når du bygger features:
1. **Stage 1:** UI only (mock data)
2. **Stage 2:** Real functionality
3. **Stage 3:** Testing + Security

Dette forhindrer at du bygger masse funksjonalitet som må kastes.

### **Tip 5: Ikke skip sikkerhet**
Hver fase har sikkerhetshensyn. Ikke hopp over dem:
- Fase 1: Dataklassifisering
- Fase 3: Trusselmodellering
- Fase 4-5: Sikker koding
- Fase 6: OWASP-testing

Å fikse sikkerhetshull tidlig er 10x billigere enn senere.

### **Tip 6: La AUTO-CLASSIFIER klassifisere prosjektet**
OPPSTART-agent kaller AUTO-CLASSIFIER automatisk. Den bruker progressiv avsløring — 3 enkle åpningsspørsmål etterfulgt av relevante oppfølgingsspørsmål — og klassifiserer prosjektet som:
- **MIN** (Minimum) - Personlig verktøy
- **FOR** (Forenklet) - Internt verktøy
- **STD** (Standard) - Kundevendt app
- **GRU** (Grundig) - Kritisk app med sensitive data
- **ENT** (Enterprise) - Stor skala, compliance-krav

Dette styrer automatisk hvilke oppgaver som er MÅ/BØR/KAN i hver fase.

### **Oppgaveklassifisering: MÅ / BØR / KAN**

Kit CC klassifiserer alle oppgaver i tre kategorier basert på prosjekttype:

- **MÅ** — Obligatoriske oppgaver som alltid utføres. Kan ikke hoppes over.
- **BØR** — Anbefalte oppgaver som AI presenterer for deg. Du velger selv om de skal gjøres.
- **KAN** — Valgfrie oppgaver som kan gi ekstra kvalitet. Foreslås kun om relevant.

Hva du ser som MÅ, BØR eller KAN avhenger av prosjekttypen. Et enkelt hobbyprosjekt har færre MÅ-oppgaver enn et stort, kritisk system. AI-en håndterer dette automatisk — du trenger bare å svare ja eller nei på BØR/KAN-forslagene.

---

## 🆘 Hjelp, jeg står fast!

### **Problem:** "Jeg vet ikke hvilken fase jeg er i"
**Løsning:** Sjekk hva du har:
- Har du `vision.md`? → Du har gjort Fase 1
- Har du `kravdokumenter`? → Du har gjort Fase 2
- Har du `teknisk-spec.md`? → Du har gjort Fase 3
- Har du fungerende kode? → Du er i Fase 4-5
- Har du kjørt tester? → Du er i Fase 6
- Er appen live? → Du har gjort Fase 7

### **Problem:** "Agenten gir ikke de resultatene jeg forventer"
**Løsning:** Gi mer kontekst og vær tydelig:
```
Aktiver [AGENT].

KONTEKST:
- Prosjekt: [navn]
- Målgruppe: [hvem]
- Tech stack: [hva]

OPPGAVE:
[Beskriv nøyaktig hva du vil]

LEVERANSER:
[Hva forventer du som output]
```

### **Problem:** "Jeg har ikke tid til alle 7 faser"
**Løsning:** Prioriter:
- **Minimum:** Fase 1, 4, 7 (visjon → bygg → deploy)
- **Anbefalt:** Fase 1-4, 6-7 (hopp over iterasjon hvis enkel MVP)
- **Ideelt:** Alle 7 faser (gir best resultat)

Men vær klar over: Å hoppe over sikkerhetsfaser (3, 6) kan koste deg dyrt senere.

### **Problem:** "Hvilke agenter finnes og hva gjør de?"
**Løsning:** Se `Agenter/README.md` for komplett oversikt over alle 50 agenter.

---

## 📚 Viktige dokumenter

### **For å forstå agentsystemet:**
- **[Agenter/README.md](Agenter/README.md)** - Komplett oversikt over alle 50 agenter
- **[Agenter/USER-AI-STRUKTUR.md](Agenter/USER-AI-STRUKTUR.md)** - Hvordan nivåene forholder seg
- **[Agenter/USER-Beskrivelse-av-agenter.md](Agenter/USER-Beskrivelse-av-agenter.md)** - Detaljerte beskrivelser

### **For å forstå fasene:**
- **FASE-1-KOMPLETT.md** (i Fase 1-mappen) - Idé og visjon — Hva skal du bygge?
- **FASE-2-KOMPLETT.md** (i Fase 2-mappen) - Planlegg — Funksjoner, krav og sikkerhet
- **FASE-3-KOMPLETT.md** (i Fase 3-mappen) - Arkitektur og sikkerhet — Hvordan bygges det trygt?
- **FASE-4-KOMPLETT.md** (i Fase 4-mappen) - MVP - Sett opp prosjektet - Første fungerende versjon
- **FASE-5-KOMPLETT.md** (i Fase 5-mappen) - Bygg funksjonene — Én funksjon om gangen
- **FASE-6-KOMPLETT.md** (i Fase 6-mappen) - Test, sikkerhet og kvalitetssjekk — Fungerer alt?
- **FASE-7-KOMPLETT.md** (i Fase 7-mappen) - Publiser og vedlikehold — Ut i verden

### **For å forstå hvordan det hele henger sammen:**
- **[CLAUDE.md](../../CLAUDE.md)** - Oversikt over hele prosjektet og prinsipper

---

## ✅ Sjekkliste: Er jeg klar til å starte?

**For nytt prosjekt:**
- [ ] Jeg har lest denne START-HER.md filen
- [ ] Jeg har lest Agenter/README.md (15 min)
- [ ] Jeg har en klar idé om hva jeg vil bygge
- [ ] Jeg er klar til å bruke 2-6 uker på dette

**For eksisterende prosjekt:**
- [ ] Jeg vet hvilken feature jeg vil bygge
- [ ] Jeg vet om jeg trenger PLANLEGGER-agent først eller kan bygge direkte

---

## 🎯 Neste Steg

**Velg basert på din situasjon:**

### **Jeg vil starte nytt prosjekt NÅ (nybegynner - automatisk):**
1. Les Fase 1-dokumentet (FASE-1-KOMPLETT.md)
2. Start med kommandoen:
```
Start nytt prosjekt
```

### **Jeg vil starte nytt prosjekt NÅ (erfaren - manuell):**
1. Les Fase 1-dokumentet (FASE-1-KOMPLETT.md)
2. Aktiver OPPSTART-agent med kommandoen:
```
Aktiver OPPSTART-agent.
Jeg vil bygge [din idé].
```

### **Jeg vil bygge en feature på eksisterende prosjekt:**
1. Aktiver PLANLEGGER-agent:
```
Aktiver PLANLEGGER-agent.
Jeg vil bygge [feature].
```
2. Deretter aktiver BYGGER-agent når planen er klar

### **Jeg vil forstå systemet grundig først:**
1. Les [READ-KIT-CC-KOMME-I-GANG.md](READ-KIT-CC-KOMME-I-GANG.md) (30-60 min)
2. Les [READ-KIT-CC-BRUKERHÅNDBOK.md](READ-KIT-CC-BRUKERHÅNDBOK.md) for dybdeforståelse
3. Les FASE-1-KOMPLETT.md (30 min)
4. Start med et reelt prosjekt

---

## 📞 Hvor finner jeg hva?

```
Ongoing work/
├── READ-KIT-CC-START-HER.md       ← Du er her
├── READ-KIT-CC-KOMME-I-GANG.md    ← Nybegynnerguide
├── READ-KIT-CC-BRUKERHÅNDBOK.md   ← Komplett håndbok
├── READ-KIT-CC-FUNKSJONSOVERSIKT.md ← Alle funksjoner
├── READ-KIT-CC-REFERANSE.md       ← Quick reference
├── CLAUDE.md                 ← Prosjektoversikt og prinsipper
│
├── Agenter/                  ← Alle 50 agenter
│   ├── README.md             ← Oversikt over agentsystemet
│   ├── USER-*.md             ← Dokumentasjon for brukere
│   ├── agenter/
│   │   ├── system/           ← Nivå 0: System-agenter (5)
│   │   ├── prosess/          ← Nivå 2: Prosess-agenter (7)
│   │   ├── basis/            ← Nivå 1: Basis-agenter (7)
│   │   └── ekspert/          ← Nivå 3: Ekspert-agenter (31)
│   └── klassifisering/       ← Klassifiseringssystem
│
├── Fase 1-7/                 ← Fasedokumenter
│   └── FASE-X-KOMPLETT.md    ← Gjeldende fasedokument
│
├── Research/                 ← Aktiv research
└── Arkiv/                    ← Utdaterte filer og research
```

---

**Lykke til med ditt prosjekt! 🚀**

*Kit CC er her for å hjelpe deg bygge tryggere, raskere og bedre. Ta deg tid til å forstå systemet, så vil det betale seg mange ganger over.*

---

**Sist oppdatert:** 2026-02-10
**Versjon:** 3.4 (4-lags agentmaskineri med progressiv klassifisering - AUTO-CLASSIFIER v3.4)
