# Overlappende Oppgaver - Klargjøring

**Dato:** 2026-02-04  
**Status:** Klargjort  
**Kilde:** FASE-OPPGAVE-KOORDINERING.md kvalitetskontroll

---

## Oversikt

11 oppgaver har overlappende ansvar mellom flere agenter. Dette dokumentet klargjør hvem som gjør hva.

---

## Klargjorte Roller

### 1. Git/Repository Setup
**Oppgave:** Opprette Git repository  
**Overlapp:** MVP-agent + BYGGER-agent  
**Klargjort:**
- **MVP-agent:** Opprett repository, initial commit, README
- **BYGGER-agent:** Git-kommandoer under implementering

### 2. Dokumentasjon
**Oppgave:** Skrive dokumentasjon  
**Overlapp:** DOKUMENTERER-agent + alle prosess-agenter  
**Klargjort:**
- **DOKUMENTERER-agent:** Teknisk API-docs, arkitekturdokumentasjon
- **Prosess-agenter:** Fase-spesifikk dokumentasjon (PRD, design docs, etc.)

### 3. Testing
**Oppgave:** Skrive og kjøre tester  
**Overlapp:** BYGGER-agent + TEST-GENERATOR-ekspert + REVIEWER-agent  
**Klargjort:**
- **BYGGER-agent:** Implementer tester som del av feature
- **TEST-GENERATOR-ekspert:** Generer test-cases automatisk
- **REVIEWER-agent:** Verifiser testkvalitet

### 4. Code Review
**Oppgave:** Code review  
**Overlapp:** REVIEWER-agent + SIKKERHETS-agent  
**Klargjort:**
- **REVIEWER-agent:** Kode-kvalitet, best practices, bugs
- **SIKKERHETS-agent:** Sikkerhetsvurdering, sårbarheter

### 5. Sikkerhetsvurdering
**Oppgave:** Sikkerhet  
**Overlapp:** SIKKERHETS-agent + OWASP-ekspert + TRUSSELMODELLERINGS-ekspert  
**Klargjort:**
- **SIKKERHETS-agent:** Generell sikkerhet gjennom alle faser
- **OWASP-ekspert:** OWASP Top 10 testing (Fase 6)
- **TRUSSELMODELLERINGS-ekspert:** STRIDE-analyse (Fase 3)

### 6. Deployment
**Oppgave:** Deploy til produksjon  
**Overlapp:** PUBLISERINGS-agent + CICD-ekspert + INFRASTRUKTUR-ekspert  
**Klargjort:**
- **PUBLISERINGS-agent:** Koordinerer deployment
- **CICD-ekspert:** Pipeline-setup
- **INFRASTRUKTUR-ekspert:** Infrastruktur-setup (Kubernetes, cloud)

### 7. Monitoring
**Oppgave:** Sett opp monitoring  
**Overlapp:** PUBLISERINGS-agent + MONITORING-ekspert  
**Klargjort:**
- **PUBLISERINGS-agent:** Koordinerer monitoring-setup
- **MONITORING-ekspert:** Implementer Sentry, logging, alerting

### 8. Database Design
**Oppgave:** Design database  
**Overlapp:** ARKITEKTUR-agent + DATAMODELL-ekspert  
**Klargjort:**
- **ARKITEKTUR-agent:** High-level database-valg
- **DATAMODELL-ekspert:** Detaljert ER-diagram, normalisering

### 9. API Design
**Oppgave:** Design API  
**Overlapp:** ARKITEKTUR-agent + API-DESIGN-ekspert  
**Klargjort:**
- **ARKITEKTUR-agent:** API-strategi (REST vs GraphQL)
- **API-DESIGN-ekspert:** OpenAPI spec, endpoint design

### 10. Performance Optimization
**Oppgave:** Optimalisere ytelse  
**Overlapp:** ITERASJONS-agent + YTELSE-ekspert  
**Klargjort:**
- **ITERASJONS-agent:** Koordinerer optimalisering
- **YTELSE-ekspert:** Lighthouse audit, Core Web Vitals

### 11. Refactoring
**Oppgave:** Refaktorere kode  
**Overlapp:** ITERASJONS-agent + REFAKTORING-ekspert  
**Klargjort:**
- **ITERASJONS-agent:** Koordinerer refaktoring
- **REFAKTORING-ekspert:** Identifiser og fiks teknisk gjeld

---

## Generell Regel

**Prosess-agenter** koordinerer alltid.  
**Ekspert-agenter** utfører spesifikke oppgaver når kalt.  
**Basis-agenter** brukes av prosess-agenter ved behov.

---

*Opprettet: 2026-02-04*  
*Next: Les HANDOFF-PROTOKOLL.md for fase-overganger*
