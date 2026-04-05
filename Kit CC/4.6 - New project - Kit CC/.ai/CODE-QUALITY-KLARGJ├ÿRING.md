# CODE-QUALITY Rolle-klargjøring

**Dato:** 2026-02-04
**Problem:** Bug #17 - Forvirring om CODE-QUALITY rolle

---

## Problemet

Det finnes to filer med lignende navn:
1. **protocol-CODE-QUALITY-GATES.md** (system-fil)
2. **CODE-QUALITY-GATE-ekspert.md** (ekspert-agent)

Dette skaper forvirring om forskjellen.

---

## Klargjøring

### 1. protocol-CODE-QUALITY-GATES.md
**Type:** System referanse-dokument  
**Plassering:** `/Agenter/agenter/system/protocol-CODE-QUALITY-GATES.md`  
**Rolle:** Dokumenterer kvalitetsporter og gate-kriterier

**Brukes av:**
- PHASE-GATES (for validering)
- REVIEWER-agent (for code review standards)
- Alle agenter som trenger quality-kriterier

**Innhold:**
- Definisjon av kvalitetsporter
- Gate-kriterier for hver fase
- Pass/fail-kriterier
- Metrics og thresholds

---

### 2. CODE-QUALITY-GATE-ekspert.md  
**Type:** Ekspert-agent  
**Plassering:** `/Agenter/agenter/ekspert/CODE-QUALITY-GATE-ekspert.md`  
**Rolle:** Utfører faktisk kvalitetssjekk av kode

**Kalles av:**
- REVIEWER-agent
- KVALITETSSIKRINGS-agent

**Oppgaver:**
- Kjør linters (ESLint, Pylint, etc.)
- Sjekk test coverage
- Analyser code complexity
- Verifiser at gates er passert
- Rapporter kvalitetsmetrics

---

## Sammenligning

| Aspekt | protocol-CODE-QUALITY-GATES.md | CODE-QUALITY-GATE-ekspert.md |
|--------|----------------------|------------------------------|
| **Type** | Dokumentasjon | Agent |
| **Rolle** | Definerer kriterier | Utfører sjekker |
| **Aktiv** | Passiv (leses) | Aktiv (kjører) |
| **Output** | Kriterier | Resultat (pass/fail) |

---

## Når Bruke Hvilken

### Les protocol-CODE-QUALITY-GATES.md når:
- Du trenger å vite kvalitetskriterier
- Du skal implementere en gate
- Du trenger referanse for standards

### Kall CODE-QUALITY-GATE-ekspert når:
- Du skal faktisk kjøre kvalitetssjekk
- Du trenger metrics på eksisterende kode
- Du skal validere at kode passerer gates

---

## Analogi

**protocol-CODE-QUALITY-GATES.md** er som en "regelboken" for kvalitet.  
**CODE-QUALITY-GATE-ekspert** er som en "dommer" som håndhever reglene.

---

## Anbefaling

Behold begge. De har forskjellige roller og begge er nødvendige.

---

*Klargjort: 2026-02-04*
*Bug #17 løst*
