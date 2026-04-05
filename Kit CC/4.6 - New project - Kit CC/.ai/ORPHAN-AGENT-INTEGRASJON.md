# Orphan-Agent Integrasjon

**Dato:** 2026-02-04  
**Issue:** P2-006 - 2 orphan agenter uten clear activation path  
**Status:** ✅ LØST

---

## Problem

2 ekspert-agenter hadde ingen clear aktivering fra prosess-agenter:
1. **PROMPT-INGENIØR-ekspert** (EKS-028) - finnes i JSON men ikke referert
2. **CODE-QUALITY-GATE-ekspert** (EKS-031) - fantes som fil men ikke i JSON

---

## Løsning

### 1. CODE-QUALITY-GATE-ekspert (EKS-031)

**Status:** ✅ Lagt til i AI-OPPGAVER.json

**Rolle:** Automatisk code quality og security scanning av AI-generert kode

**Faser:** 4, 5, 6 (MVP, Iterasjon, Kvalitetssikring)

**Aktivering:**
- **Automatisk** etter BYGGER-agent har generert kode
- **Automatisk** før PUBLISERINGS-agent deployer til staging/prod
- **On-demand** når bruker ber om "scan koden"

**Kalles av:**
- PRO-004 (MVP-agent) - fase 4
- PRO-005 (ITERASJONS-agent) - fase 5
- PRO-006 (KVALITETSSIKRINGS-agent) - fase 6
- BAS-003 (REVIEWER-agent) - for code review

**Hva den gjør:**
- Kjører linters (ESLint, Pylint, etc.)
- Security scanning (vulnerabilities)
- Code complexity metrics
- Test coverage sjekk
- Verifiserer at quality gates er passert

**Eksempel-integrasjon i PRO-004 (MVP-agent):**

```markdown
### Steg 3: Code Quality Gate

**Når:** Etter hver kode-implementering

**Aktivér:** CODE-QUALITY-GATE-ekspert (EKS-031)

**Input:**
- Alle genererte/endrede kodefiler
- Tech stack info (for å velge riktig linter)
- Quality thresholds fra protocol-CODE-QUALITY-GATES.md

**Output:**
- ✅ PASS: Koden møter minimumskrav
- 🛑 FAIL: Kritiske issues funnet (blokkerer videre)
- ⚠️ WARNING: Non-kritiske issues (kan fortsette)

**Ved FAIL:**
1. CODE-QUALITY-GATE-ekspert gir detaljert report
2. BYGGER-agent fikser issues
3. Re-scan til PASS
```

---

### 2. PROMPT-INGENIØR-ekspert (EKS-028)

**Status:** ✅ Allerede i JSON, men mangler clear aktivering

**Rolle:** Validerer og forbedrer prompts som sendes til AI-modeller

**Faser:** Alle faser (["alle"])

**Aktivering:**
- **On-demand** når agent skal sende prompt til LLM
- **Automatisk** ved første gang ny agent aktiveres i prosjekt
- **On-demand** når bruker ber om "forbedre prompt"

**Kalles av:**
- Alle agenter som bruker LLM-calls (spesielt BYGGER-agent)
- ORCHESTRATOR ved første session i nytt prosjekt
- BAS-001 (PLANLEGGER-agent) for PRD-generering

**Hva den gjør:**
- Validerer prompt-struktur (clear instructions, examples, format)
- Sjekker at prompt følger best practices
- Foreslår forbedringer (tydelighet, spesifisitet)
- Bygger prompt-bibliotek for gjenbruk

**Eksempel-integrasjon i BAS-002 (BYGGER-agent):**

```markdown
### Prompt Quality Check (On-Demand)

**Trigger:** Når BYGGER-agent skal generere kompleks kode

**Aktivér:** PROMPT-INGENIØR-ekspert (EKS-028)

**Input:**
- Draft prompt som skal sendes til LLM
- Context om hva som skal implementeres
- Tech stack og constraints

**Output:**
- Forbedret prompt med:
  - Tydeligere instruksjoner
  - Relevante eksempler
  - Format-spesifikasjon
  - Sikkerhetskrav inkludert

**Eksempel:**

*Før (original prompt):*
```
Lag en login-komponent i React
```

*Etter (PROMPT-INGENIØR optimalisert):*
```
Implementer en sikker login-komponent i React med TypeScript:

Requirements:
- Email + password fields
- Form validation (email format, password min 8 chars)
- Error handling (invalid credentials, network errors)
- Loading state during authentication
- Accessible (ARIA labels, keyboard navigation)
- OWASP Top 10 compliant

Tech stack:
- React 18.x + TypeScript
- React Hook Form for validation
- Tailwind CSS for styling

Output format:
1. LoginForm.tsx (main component)
2. useAuth.ts (authentication hook)
3. LoginForm.test.tsx (unit tests)

Security requirements:
- No plaintext passwords in state
- HTTPS-only (check window.location.protocol)
- CSRF token handling
- Rate limiting on failed attempts
```

**Resultat:** Bedre kode, færre iterasjoner
```

---

## Implementeringsdetaljer

### For Prosess-Agenter

#### Når skal CODE-QUALITY-GATE-ekspert kalles?

**PRO-004 (MVP-agent) - Fase 4:**
- **Timing:** Etter BYGGER-agent har implementert MVP-features
- **Frequens:** Ved hver feature-completion
- **Mandatory:** ✅ JA (blokkerer deploy ved FAIL)

**PRO-005 (ITERASJONS-agent) - Fase 5:**
- **Timing:** Etter hver feature-implementering
- **Frequens:** Per feature (ikke per file)
- **Mandatory:** ✅ JA

**PRO-006 (KVALITETSSIKRINGS-agent) - Fase 6:**
- **Timing:** Som del av pre-release quality gate
- **Frequens:** Full codebase scan
- **Mandatory:** ✅ JA (final gate før prod)

#### Når skal PROMPT-INGENIØR-ekspert kalles?

**Automatisk:**
- **Aldri** - for mye overhead
- Kun on-demand når agent opplever dårlig LLM-output

**On-Demand:**
- Når BYGGER-agent får dårlig kode fra LLM (requires re-generation)
- Når bruker ber eksplisitt om "forbedre prompt"
- Ved første bruk av ny agent-type i prosjekt (for prompt-tuning)

**Best Practice:**
- Bygg prompt-bibliotek over tid
- Re-use vellykkede prompts
- Kun kall PROMPT-INGENIØR ved faktiske problemer

---

## Oppdatert Agent-Relasjon

### CODE-QUALITY-GATE-ekspert (EKS-031)

**Kalles av (6 agenter):**
1. PRO-004 (MVP-agent) - fase 4
2. PRO-005 (ITERASJONS-agent) - fase 5
3. PRO-006 (KVALITETSSIKRINGS-agent) - fase 6
4. BAS-003 (REVIEWER-agent) - code review
5. BAS-002 (BYGGER-agent) - self-check før handoff
6. PRO-007 (PUBLISERINGS-agent) - pre-deployment scan

**Kaller (dependencies):**
- Ingen (terminal agent - produserer bare output)
- Leser: protocol-CODE-QUALITY-GATES.md (system-fil)

**Output:** JSON-rapport med pass/fail + issue details

---

### PROMPT-INGENIØR-ekspert (EKS-028)

**Kalles av (potensielt alle agenter, men primært):**
1. BAS-002 (BYGGER-agent) - når LLM-output er dårlig
2. BAS-001 (PLANLEGGER-agent) - for PRD-generering
3. ORCHESTRATOR - ved første session (prompt-tuning)

**Kaller (dependencies):**
- Ingen (terminal agent)

**Output:** Forbedret prompt (string)

---

## Testing & Validering

### Test at CODE-QUALITY-GATE-ekspert fungerer:

```bash
# 1. Kjør et test-prosjekt gjennom fase 4
# 2. Introduser en security vulnerability (f.eks. SQL injection)
# 3. Verifiser at CODE-QUALITY-GATE-ekspert:
#    - Detekterer vulnerability
#    - Blokkerer videre deployment
#    - Gir clear report med fix-forslag
```

### Test at PROMPT-INGENIØR-ekspert fungerer:

```bash
# 1. Send en vag prompt til BYGGER-agent: "lag en app"
# 2. Be BYGGER-agent kalle PROMPT-INGENIØR-ekspert
# 3. Verifiser at PROMPT-INGENIØR:
#    - Identifiserer mangler (tech stack, requirements, format)
#    - Gir konkret forbedret prompt
#    - Forbedret prompt gir bedre kode
```

---

## Konklusjon

**P2-006 løst:**
- ✅ CODE-QUALITY-GATE-ekspert (EKS-031) lagt til i AI-OPPGAVER.json
- ✅ Aktivering definert for begge agenter
- ✅ 6 prosess-agenter skal nå kalle CODE-QUALITY-GATE-ekspert
- ✅ 3 basis/system-agenter skal kunne kalle PROMPT-INGENIØR-ekspert

**Resultat:**
- Ingen orphan agenter lenger
- Klar aktiveringsprotokoll
- Bedre code quality (automated scanning)
- Bedre prompts (on-demand optimization)

---

**Dokumentert:** 2026-02-04  
**Bug #P2-006:** ✅ LØST  
**Endringer:** AI-OPPGAVER.json (1 ny agent), denne guide (integrasjon)
