# Kit CC - Quick Reference

> **Rask tilgang til det viktigste - for erfarne brukere**

**Versjon:** 2.0 | **Sist oppdatert:** 3. februar 2026

> ℹ️ **For nybegynnere:** Bruk `Start nytt prosjekt` og `Fortsett` - ORCHESTRATOR aktiverer agenter automatisk. Denne referansen viser **manuelle kommandoer** for erfarne brukere.

---

## ⚡ Hurtigkommandoer

### **Start / Fortsett (Nybegynner - Automatisk)**
```
Start nytt prosjekt              → Bootstrap med AUTO-CLASSIFIER + ORCHESTRATOR
Fortsett                         → ORCHESTRATOR aktiverer neste fase
Vis status                       → Viser fase, oppgaver, neste steg
```

### **Fase-aktivering (Erfaren - Manuell)**
```
Aktiver OPPSTART-agent           → Fase 1
Aktiver KRAV-agent               → Fase 2
Aktiver ARKITEKTUR-agent         → Fase 3
Aktiver MVP-agent                → Fase 4
Aktiver ITERASJONS-agent         → Fase 5
Aktiver KVALITETSSIKRINGS-agent  → Fase 6
Aktiver PUBLISERINGS-agent       → Fase 7
```

### **Basis-agenter (Erfaren - Manuell)**
```
Aktiver PLANLEGGER-agent         → PRD, WBS, estimering
Aktiver BYGGER-agent             → Implementering (3 stages)
Aktiver REVIEWER-agent           → Code review
Aktiver SIKKERHETS-agent         → Security audit
Aktiver DEBUGGER-agent           → Feilsøking
Aktiver DOKUMENTERER-agent       → Dokumentasjon
```

### **Utilities**
```
Re-klassifiser prosjektet        → Kjør AUTO-CLASSIFIER på nytt
Vis alle checkpoints             → Liste over lagringspunkter
Gå tilbake til [checkpoint]      → Rollback
```

---

## 🏗️ De 4 nivåene (kort)

| Nivå | Antall | Aktiver | Formål |
|------|--------|---------|--------|
| **0: System** | 5 | ❌ Auto | Infrastruktur (ORCHESTRATOR, AUTO-CLASSIFIER, etc.) |
| **1: Basis** | 7 | ✅ Manuelt | Tverrfaglige verktøy (BYGGER, PLANLEGGER, etc.) |
| **2: Prosess** | 7 | ✅ Manuelt | Fase-koordinering (én per fase) |
| **3: Ekspert** | 31 | ❌ Auto | Spesialister (OWASP, GDPR, etc.) |

---

## 🎯 De 7 fasene

| # | Fase | Nøkkelaktiviteter | Leveranser | Tid (MIN/STD/ENT) |
|---|------|------------------|------------|-------------------|
| **1** | Oppstart | Problem, visjon, risiko, klassifisering | `vision.md`, risikovurdering | 30m / 4h / 2d |
| **2** | Krav | User stories, wireframes, MVP-def | `user-stories.md`, wireframes | 1h / 8h / 4d |
| **3** | Arkitektur | Tech stack, DB, API, trusselmodell | `tech-stack.md`, `api-spec.yaml` | 1h / 8h / 5d |
| **4** | MVP | Git, CI/CD, secrets, implementering | Fungerende MVP, staging deploy | 1-2d / 2w / 4w |
| **5** | Iterasjon | Features, polering, brukertest | Feature-komplett app | - / 4w / 3m |
| **6** | Kvalitet | E2E, OWASP, GDPR, tilgjengelighet | Test-rapporter, compliance-docs | 1d / 1w / 4w |
| **7** | Publisering | Deploy, monitoring, IR-plan, backup | Live URL, monitoring-dashboard | 4h / 2d / 1w |

**Tidsbruk totalt:** 6-8h (MIN) / 4-8w (STD) / 3-6m (ENT)

---

## 📊 Klassifisering (progressiv avsløring)

| # | Spørsmål | Poeng |
|---|----------|-------|
| 1 | Prosjektstørrelse | 1-4 |
| 2 | Brukertype | 1-4 |
| 3 | Datatyper | 1-4 |
| 4 | Brukerskala | 1-4 |
| 5 | Nedetid-konsekvens | 1-4 |
| 6 | Regulering | 1-4 |
| 7 | Integrasjoner | 1-4 |

**Total:** 7-28 poeng → Prosjekttype

| Prosjekttype | Score | Fokus |
|------|-------|-------|
| **Enkelt hobbyprosjekt** | 7-10 | Kun nødvendig, rask iterasjon |
| **Lite, oversiktlig prosjekt** | 11-14 | Best practices, intern bruk |
| **Vanlig app-prosjekt** | 15-18 | Profesjonell kvalitet, kundevendt |
| **Viktig prosjekt med sensitive data** | 19-23 | Sikkerhet, compliance, kritisk data |
| **Stort, kritisk system** | 24-28 | Full compliance, enterprise-grade |

---

## 🔧 Basis-agenter - Funksjoner

### **PLANLEGGER-agent**
- **AI-WBS Generator** 🆕 - Auto oppgavenedbrytning
- **Dual-modus estimering** 🆕 - AI-modus (timer) / Hybrid (dager)
- PRD-generering
- Akseptansekriterier
- Dependency-mapping (GRU, ENT)

### **BYGGER-agent**
- **Smart konteksthenting** 🆕 - Maks 30% kontekst
- **Auto test-generering** 🆕 - Genererer tester samtidig
- **Inkrementell PR-strategi** 🆕 - < 400 linjer per PR
- **3-stage implementation** - UI → Funksjon → Sikkerhet
- Two-step self-reflection

### **REVIEWER-agent**
- Code quality review
- Technical debt detection
- Performance hints

### **SIKKERHETS-agent**
- Input-validation check
- Auth/authz review
- Secret detection
- Dependency vuln scan

### **DEBUGGER-agent**
- Root cause analysis
- Stack trace analysis
- Debugging instrumentation

### **DOKUMENTERER-agent**
- README generation
- API docs (OpenAPI/Swagger)
- Code comments (JSDoc/TSDoc)

---

## 🔬 Ekspert-agenter (utvalg)

### **Fase 1-3:**
- **PERSONA** - Jobs-to-be-Done, personas
- **LEAN-CANVAS** - Forretningsmodell
- **KONKURRANSEANALYSE** - Markedsanalyse
- **WIREFRAME** - UI-skisser
- **API-DESIGN** - OpenAPI/Swagger
- **TRUSSELMODELLERING** - STRIDE/DREAD
- **DATAMODELL** - ER-diagram, normalisering

### **Fase 4-5:**
- **HEMMELIGHETSSJEKK** - Secrets-scanning
- **CI/CD** - GitHub Actions, pipelines
- **SUPPLY-CHAIN** - SBOM, package-verifisering
- **BRUKERTEST** - Usability testing
- **YTELSE** - Lighthouse, Core Web Vitals
- **UI/UX** - Polering, micro-interaksjoner
- **REFAKTORING** - Teknisk gjeld

### **Fase 6-7:**
- **OWASP** - OWASP Top 10:2025 testing
- **GDPR** - DPIA, samtykke, personvern
- **TILGJENGELIGHET** - WCAG 2.2 AA
- **CROSS-BROWSER** - Safari-quirks, polyfills
- **LASTTEST** - k6/Artillery
- **MONITORING** - Sentry, alerting
- **INCIDENT-RESPONSE** - IR-plan
- **BACKUP** - 3-2-1-regel

### **Research-baserte (2026):**
- **AI-GOVERNANCE** 🔴 - Prompt-traceability, AI-kode-tagging
- **TEST-GENERATOR** 🔴 - Auto unit/E2E-tester
- **SELF-HEALING-TEST** - Auto test-vedlikehold
- **INFRASTRUKTUR** - Kubernetes, IaC
- **DESIGN-TIL-KODE** - Figma til React/Vue
- **PROMPT-INGENIØR** - Prompt-validering
- **MIGRASJON** - Dependency-oppgradering
- **SRE** - SLI/SLO, error budgets

---

## 📁 Filstruktur

```
prosjekt/
├── Kit CC/                    # Kit CC-systemet
│   ├── CLAUDE.md               # Boot-fil
│   ├── Agenter/agenter/
│   │   ├── system/             # Nivå 0 (5)
│   │   ├── basis/              # Nivå 1 (7)
│   │   ├── prosess/            # Nivå 2 (7)
│   │   └── ekspert/            # Nivå 3 (31)
│   ├── klassifisering/
│   │   ├── KLASSIFISERING-METADATA-SYSTEM.md
│   │   ├── FUNKSJONSOVERSIKT-KOMPLETT.md
│   │   └── PROJECT-STATE-SCHEMA.json
│   └── .ai/                    # Prosjekttilstand
│       ├── PROJECT-STATE.json  # Hovedtilstand
│       ├── SESSION-HANDOFF.md  # Overlevering
│       ├── SESSION-HANDOFF.md  # Menneskelesbar oversikt
│       └── CHECKPOINT-HISTORY/ # Lagringspunkter
│
├── docs/                       # Dokumentasjon
│   ├── vision.md
│   ├── krav/
│   ├── teknisk/
│   ├── security/
│   └── testing/
│
├── src/                        # Kildekode
├── tests/                      # Tester
└── .github/workflows/          # CI/CD
```

---

## 🎯 Vanlige oppgaver

### **Nytt prosjekt (Nybegynner - Automatisk)**
```
1. Start nytt prosjekt
2. Svar på enkle spørsmål via progressiv avsløring (AUTO-CLASSIFIER)
3. Fortsett (ORCHESTRATOR aktiverer OPPSTART-agent)
4. Følg fasene 1→7 med "Fortsett"
```

### **Nytt prosjekt (Erfaren - Manuell)**
```
1. Aktiver OPPSTART-agent
2. Beskriv prosjektet ditt
3. Aktiver KRAV-agent → ARKITEKTUR-agent → osv.
4. Følg fasene 1→7 med manuelle aktivasjoner
```

### **Ny feature (eksisterende prosjekt)**
```
1. Aktiver PLANLEGGER-agent → PRD
2. Aktiver BYGGER-agent → Implementer
3. (Auto) REVIEWER + SIKKERHETS → Review
4. Deploy til staging → Test → Prod
```

### **Bugfix**
```
1. Aktiver DEBUGGER-agent
2. Beskriv problem
3. DEBUGGER finner + fikser
4. Deploy hotfix
```

### **Re-klassifisering**
```
Re-klassifiser prosjektet
→ AUTO-CLASSIFIER kjører på nytt
→ Kan oppgradere MIN→FOR→STD→GRU→ENT
```

### **Rollback**
```
Vis alle checkpoints
Gå tilbake til [checkpoint-navn]
→ PROJECT-STATE tilbakestilles
```

---

## 🔐 Sikkerhet (per fase)

| Fase | Sikkerhetstiltak |
|------|------------------|
| **1** | Dataklassifisering (offentlig/intern/konf/sensitiv) |
| **2** | Sikkerhetskrav basert på dataklassifisering |
| **3** | Trusselmodellering (STRIDE), sikkerhetskontroller |
| **4** | Secrets management, pre-commit hooks, SAST |
| **5** | Sikker koding, auth/authz, input-validering |
| **6** | OWASP Top 10:2025, penetrasjonstesting |
| **7** | Monitoring, IR-plan, backup, incident-respons |

---

## 🆕 Nye funksjoner (v2.0)

| Funksjon | Agent | Prioritet | Benefit |
|----------|-------|-----------|---------|
| Smart konteksthenting | BYGGER | 🔴 Høy | Unngår context rot, 70% mindre kontekst |
| Auto test-generering | BYGGER | 🔴 Høy | 40% færre bugs i produksjon |
| Inkrementell PR | BYGGER | 🟡 Medium | 3x raskere review-sykluser |
| AI-WBS Generator | PLANLEGGER | 🟡 Medium | Auto oppgavenedbrytning |
| Dual-modus estimering | PLANLEGGER | 🟡 Medium | AI-modus (timer) vs Hybrid (dager) |
| Prompt-traceability | AI-GOVERNANCE | 🔴 Høy | EU AI Act compliance |
| AI-kode-tagging | AI-GOVERNANCE | 🔴 Høy | Enterprise-compliance |
| Unit-test-generation | TEST-GENERATOR | 🔴 Høy | 80%+ coverage automatisk |
| Self-healing tests | SELF-HEALING-TEST | 🟢 Lav | 80% færre flaky tests |

---

## 🎚️ MÅ/BØR/KAN per nivå

| Oppgave | MIN | FOR | STD | GRU | ENT |
|---------|-----|-----|-----|-----|-----|
| OWASP-testing | KAN | BØR | MÅ | MÅ | MÅ |
| GDPR-compliance | IKKE | KAN | BØR | MÅ | MÅ |
| Trusselmodellering | IKKE | KAN | MÅ | MÅ | MÅ |
| Load testing | IKKE | KAN | BØR | MÅ | MÅ |
| AI-governance | IKKE | IKKE | KAN | BØR | MÅ |
| DPIA | IKKE | IKKE | KAN | MÅ | MÅ |
| SLI/SLO | IKKE | IKKE | KAN | BØR | MÅ |
| Penetrasjonstest | IKKE | KAN | BØR | MÅ | MÅ |

---

## 💡 Pro Tips

> 💡 **Merk:** Disse tipsene viser manuell aktivering (for erfarne brukere). Nybegynnere kan bruke `Fortsett` og ORCHESTRATOR aktiverer agenter automatisk.

### **1. Alltid gi kontekst**
```
✅ Aktiver BYGGER-agent. Implementer auth basert på plan.md. Stack: Next.js + Supabase.
❌ Aktiver BYGGER-agent.
```

### **2. Referer til docs**
```
✅ Aktiver ARKITEKTUR-agent. Les vision.md og kravdokumenter først.
```

### **3. Bruk 3-stage (BYGGER)**
```
Stage 1: UI only (mock data)
Stage 2: Real functionality
Stage 3: Testing + Security
```

### **4. Inkrementell PR**
```
✅ Feature splittet i 3 PR-er à 150 linjer
❌ Én PR med 1200 linjer
```

### **5. Ikke skip sikkerhet**
```
Fase 1: Dataklassifisering
Fase 3: Trusselmodellering
Fase 4-5: Sikker koding
Fase 6: OWASP-testing
```

---

## 🐛 Feilsøking

| Problem | Løsning |
|---------|---------|
| Vet ikke hvilken fase | `Vis status` eller sjekk hva du har (vision.md → Fase 1 done) |
| Agenten gir feil resultat | Gi mer kontekst + spesifiser leveranser |
| Feil oppstår 3x | Circuit-breaker → RETRY/ALTERNATE/SKIP/ABORT |
| Vil gå tilbake | `Vis alle checkpoints` → `Gå tilbake til [navn]` |
| Prosjektet har endret seg | `Re-klassifiser prosjektet` |

---

## 📚 Dokumenter

| Dokument | Formål | Når |
|----------|--------|-----|
| **KIT-CC-KOMME-I-GANG.md** | Pedagogisk guide | Nybegynner |
| **KIT-CC-BRUKERHÅNDBOK.md** | Komplett guide | Grundig forståelse |
| **KIT-CC-FUNKSJONSOVERSIKT.md** | Alle funksjoner | Detaljert funksjonsliste |
| **KIT-CC-REFERANSE.md** | Quick reference | Denne filen |
| **FASE-1-KOMPLETT.md til FASE-7-KOMPLETT.md** | Fasedokumenter | Dybdeinformasjon per fase |

---

## ⌨️ Keyboard Shortcuts (Claude Code)

| Shortcut | Handling |
|----------|----------|
| `Ctrl/Cmd + L` | Åpne ny chat |
| `Ctrl/Cmd + K` | Quick command |
| `Ctrl/Cmd + /` | Kommandopalette |
| `Esc` | Avbryt |

---

## 🔗 Relaterte filer

- `CLAUDE.md` - Boot-fil med bootstrap-sekvens (leses automatisk ved oppstart)
- `Agenter/klassifisering/KLASSIFISERING-METADATA-SYSTEM.md` - Klassifiseringsdetaljer
- `Agenter/USER-AI-STRUKTUR.md` - Agent-arkitektur
- `READ-KIT-CC-START-HER.md` - Quick start guide

---

**Quick Link til dokumentasjon:**
- [Komme i gang](READ-KIT-CC-KOMME-I-GANG.md) | [Brukerhåndbok](READ-KIT-CC-BRUKERHÅNDBOK.md) | [Funksjoner](READ-KIT-CC-FUNKSJONSOVERSIKT.md)

**Versjon:** 2.0 | **Opprettet:** 3. februar 2026
