# ORCHESTRATOR - Hvordan Kit CC forstår deg

> **For brukere:** Forstå hvordan systemet tolker det du sier
> **Oppdatert:** 3. februar 2026 | **Versjon:** 2.0

---

## 🎯 Hva er ORCHESTRATOR?

ORCHESTRATOR er "hjernen" i Kit CC. Den leser det du skriver, forstår hva du mener, og aktiverer riktig agent.

**Viktigst å vite:**
- ✅ Du kan bruke **naturlig språk** - ingen stive kommandoer
- ✅ ORCHESTRATOR forstår **synonymer** og ulike uttrykksmåter
- ✅ Du kan være i **nybegynner-modus** (enkel) eller **ekspert-modus** (full kontroll)

---

## 🗣️ Tre måter å kommunisere på

### **1. Automatisk modus (for nybegynnere)**

**Bruk enkle, naturlige fraser:**

| Du sier | ORCHESTRATOR forstår | Hva skjer |
|---------|----------------------|-----------|
| "Start nytt prosjekt" | Nytt prosjekt-initiering | AUTO-CLASSIFIER → progressiv avsløring → OPPSTART-agent |
| "Fortsett" | Gjenoppta arbeid | Leser PROJECT-STATE → Neste agent i fasen |
| "Gå videre" | Fortsett (synonym) | Samme som "Fortsett" |
| "Hva er neste steg?" | Be om veiledning | Foreslår neste handling basert på fase |
| "Vis status" | Statuskontroll | Viser fase, oppgaver, fremdrift |
| "Hvor er jeg?" | Statuskontroll (variant) | Samme som "Vis status" |

**Eksempler på naturlig språk:**
```
✅ "La oss fortsette der vi slapp"     → Fortsett
✅ "Hva skal jeg gjøre nå?"             → Neste steg
✅ "Kan du gi meg en oppsummering?"     → Vis status
✅ "Jeg vil starte et nytt prosjekt"    → Start nytt prosjekt
```

---

### **2. Intensjonsbasert (hybrid)**

**Beskriv hva du vil - ORCHESTRATOR foreslår løsning:**

| Du sier | ORCHESTRATOR tenker | Forslag |
|---------|---------------------|---------|
| "Jeg vil bygge en todo-app" | Nytt prosjekt? Eller eksisterende? | "Vil du starte et nytt prosjekt? Jeg kan aktivere OPPSTART-agent" |
| "Hjelp meg fikse en bug i innloggingen" | Bug = DEBUGGER-agent | "Jeg aktiverer DEBUGGER-agent for deg" |
| "Jeg må planlegge en ny feature" | Planlegging = PLANLEGGER-agent | "Aktiverer PLANLEGGER-agent" |
| "Trenger sikkerhetstesting" | Sikkerhet = SIKKERHETS-agent eller OWASP-ekspert | "Er dette code review eller full OWASP-testing?" |

**Eksempler:**
```
✅ "Jeg vil legge til brukerautentisering"
   → ORCHESTRATOR: "Har du en plan? Skal jeg aktivere PLANLEGGER-agent først?"

✅ "Noe er galt med databasen"
   → ORCHESTRATOR: "Aktiverer DEBUGGER-agent for feilsøking"

✅ "Jeg vil teste sikkerheten"
   → ORCHESTRATOR: "Hvilken type? Code review (SIKKERHETS-agent) eller penetrasjonstest (OWASP-ekspert)?"
```

**Viktig:** I hybrid-modus foreslår ORCHESTRATOR løsning og venter på bekreftelse før den fortsetter.

---

### **3. Manuell modus (for erfarne)**

**Direkte aktivering - du har full kontroll:**

| Du sier | ORCHESTRATOR gjør | Resultat |
|---------|-------------------|----------|
| "Aktiver BYGGER-agent" | Direkte aktivering | BYGGER-agent starter umiddelbart |
| "Kjør PLANLEGGER-agent" | Direkte aktivering (variant) | PLANLEGGER-agent starter |
| "Start DEBUGGER" | Direkte aktivering (forkortet) | DEBUGGER-agent starter |

**Når bruke manuell:**
- ✅ Du vet nøyaktig hvilken agent du trenger
- ✅ Du vil hoppe over ORCHESTRATOR-forslag
- ✅ Du vil teste en spesifikk agent

**Eksempler:**
```
✅ "Aktiver BYGGER-agent. Implementer auth basert på plan.md"
✅ "Kjør OWASP-ekspert for sikkerhetstesting"
✅ "Start SIKKERHETS-agent"
```

---

## 🤖 Hvordan ORCHESTRATOR bestemmer

**Beslutningsprosess (forenklet):**

```
1. LES BRUKERINPUT
   └─ Hva sa brukeren?

2. SJEKK KONTEKST
   └─ Les PROJECT-STATE.json
   └─ Hvilken fase er vi i?
   └─ Hva er siste handling?

3. IDENTIFISER INTENSJON
   └─ Er dette:
      - Automatisk nøkkelord? (Fortsett, Start nytt, Vis status)
      - Direkte aktivering? (Aktiver X, Kjør Y)
      - Intensjonsbasert? (Jeg vil bygge Z, Hjelp med W)

4. VELG AGENT
   └─ Basert på:
      - Nåværende fase
      - Type oppgave
      - Brukerens erfaring

5. AKTIVER ELLER FORESLÅ
   └─ Automatisk: Aktiver direkte
   └─ Hybrid: Foreslå og vent på bekreftelse
   └─ Manuell: Aktiver spesifikk agent
```

---

## 💡 Smarte eksempler

### **Scenario 1: Nybegynner starter nytt prosjekt**

```
Bruker: "Hei, jeg vil lage en app"

ORCHESTRATOR:
├─ Leser input: "lage en app" = nytt prosjekt
├─ Sjekker: Finnes PROJECT-STATE.json? Nei
└─ Beslutning: Start nytt prosjekt-flyt

ORCHESTRATOR: "Ser ut som du vil starte et nytt prosjekt!
                Jeg starter klassifiseringen. Svar på noen enkle spørsmål,
                så tilpasser jeg prosessen til ditt prosjekt."

→ Aktiverer AUTO-CLASSIFIER
```

---

### **Scenario 2: Erfaren bruker vil bygge en feature**

```
Bruker: "Legg til søkefunksjon i dashboardet"

ORCHESTRATOR:
├─ Leser input: "legg til" = ny feature
├─ Sjekker: PROJECT-STATE.json viser Fase 5 (Bygg funksjonene)
└─ Beslutning: Trenger plan først

ORCHESTRATOR: "Skal jeg aktivere PLANLEGGER-agent for å
                planlegge søkefunksjonen først?"

Bruker: "Ja"

→ Aktiverer PLANLEGGER-agent
```

---

### **Scenario 3: Direkte aktivering (ekspert)**

```
Bruker: "Aktiver DEBUGGER-agent. Login feiler med 401 feil."

ORCHESTRATOR:
├─ Leser input: "Aktiver DEBUGGER-agent" = direkte kommando
├─ Hopper over forslag
└─ Beslutning: Aktiver DEBUGGER direkte

→ Aktiverer DEBUGGER-agent umiddelbart
   (ingen forslag, ingen bekreftelse)
```

---

### **Scenario 4: Tvetydig intensjon**

```
Bruker: "Jeg må fikse sikkerheten"

ORCHESTRATOR:
├─ Leser input: "sikkerhet" men tvetydig
├─ Sjekker fase: Fase 4 (MVP)
└─ Beslutning: Flere alternativer mulig

ORCHESTRATOR: "Sikkerhet kan bety flere ting:
                A) Code review (SIKKERHETS-agent)
                B) OWASP penetrasjonstest (OWASP-ekspert)
                C) Trusselmodellering (TRUSSELMODELLERINGS-ekspert)

                Hva trenger du?"

Bruker: "B"

→ Aktiverer OWASP-ekspert
```

---

## 📋 Nøkkelord-referanse

### **Automatisk-nøkkelord (alltid tolket likt):**

| Kategori | Nøkkelord | Synonymer/varianter |
|----------|-----------|---------------------|
| **Start** | "Start nytt prosjekt" | "Nytt prosjekt", "Lag nytt prosjekt", "Jeg vil starte" |
| **Fortsett** | "Fortsett" | "Gå videre", "Neste", "Fortsett arbeidet" |
| **Status** | "Vis status" | "Hvor er jeg?", "Hva har jeg gjort?", "Oppsummering" |
| **Neste steg** | "Neste steg" | "Hva nå?", "Hva skal jeg gjøre?", "Forslag?" |
| **Checkpoints** | "Vis alle checkpoints" | "Se lagringspunkter", "Vis historikk" |
| **Rollback** | "Gå tilbake til [navn]" | "Tilbakestill til [navn]", "Restore [navn]" |
| **Re-klassifiser** | "Re-klassifiser" | "Klassifiser på nytt", "Oppdater klassifisering" |

### **Intensjonsbaserte fraser (ORCHESTRATOR tolker):**

| Du sier | ORCHESTRATOR forstår som | Foreslått agent |
|---------|---------------------------|-----------------|
| "Jeg vil bygge X" | Ny feature | PLANLEGGER → BYGGER |
| "Hjelp meg med Y" | Generell hjelp | Avhenger av Y |
| "Noe er feil med Z" | Feilsøking | DEBUGGER |
| "Test sikkerhet" | Sikkerhetstesting | SIKKERHETS eller OWASP |
| "Lag dokumentasjon" | Dokumentering | DOKUMENTERER |
| "Plan for X" | Planlegging | PLANLEGGER |

### **Direkte aktivering (ekspert-modus):**

| Format | Eksempel |
|--------|----------|
| "Aktiver [AGENT]" | "Aktiver BYGGER-agent" |
| "Kjør [AGENT]" | "Kjør PLANLEGGER-agent" |
| "Start [AGENT]" | "Start DEBUGGER" |

---

## ⚠️ Vanlige misforståelser

### ❌ "ORCHESTRATOR gjør alt automatisk"
**Realitet:** ORCHESTRATOR **foreslår** og **koordinerer**, men du må godkjenne viktige beslutninger.

### ❌ "Jeg må bruke nøyaktig samme ord hver gang"
**Realitet:** ORCHESTRATOR forstår synonymer. "Fortsett", "Gå videre", "Neste" betyr det samme.

### ❌ "Jeg må aktivere ORCHESTRATOR manuelt"
**Realitet:** ORCHESTRATOR er **alltid aktiv** - du snakker alltid med den først.

### ❌ "Automatisk modus er for barn, manuell for proffer"
**Realitet:** Begge er legitime arbeidsmetoder. Erfarne brukere blander ofte begge.

---

## 🎓 Beste praksis

### **For nybegynnere:**
- ✅ Bruk enkle fraser: "Fortsett", "Start nytt prosjekt"
- ✅ La ORCHESTRATOR foreslå neste steg
- ✅ Si "Hva skal jeg gjøre nå?" når du er usikker

### **For erfarne:**
- ✅ Bland automatisk og manuell etter behov
- ✅ Bruk direkte aktivering når du vet hva du vil
- ✅ Gi kontekst: "Aktiver BYGGER-agent. Implementer auth basert på plan.md"

### **For alle:**
- ✅ Vær så spesifikk som mulig
- ✅ Referer til eksisterende filer (plan.md, vision.md)
- ✅ Spør hvis du er usikker!

---

## 🆘 Hjelp, ORCHESTRATOR forstår ikke meg!

**Problem:** "Jeg sier X, men ORCHESTRATOR gjør Y"

**Løsninger:**
1. **Vær mer spesifikk:**
   - ❌ "Fiks det"
   - ✅ "Aktiver DEBUGGER-agent. Login-knappen fungerer ikke"

2. **Bruk direkte aktivering:**
   - ❌ "Jeg trenger hjelp med noe"
   - ✅ "Aktiver PLANLEGGER-agent"

3. **Bekreft intensjon:**
   - Hvis ORCHESTRATOR foreslår feil agent, si:
   - "Nei, jeg mener [X agent]" eller "Nei, jeg vil [beskrivelse]"

4. **Si "Vis status" først:**
   - Får kontekst på hvor du er
   - ORCHESTRATOR foreslår da mer relevant

---

## 📚 Relaterte dokumenter

- **[READ-KIT-CC-BRUKERHÅNDBOK.md](READ-KIT-CC-BRUKERHÅNDBOK.md)** - Komplett guide
- **[READ-KIT-CC-START-HER.md](READ-KIT-CC-START-HER.md)** - Quick start
- **[agent-ORCHESTRATOR.md](Agenter/agenter/system/agent-ORCHESTRATOR.md)** - Full agent-prompt (for avanserte)

---

**Nøkkel-takeaway:** Du trenger ikke lære spesielle kommandoer. Snakk naturlig, vær spesifikk, og ORCHESTRATOR vil forstå deg. 🎯

**Versjon:** 2.0 | **Opprettet:** 3. februar 2026
