# Navnekonvensjon for Kit CC
## Regler for alle filnavn i agentsystemet

**Dato:** 4. februar 2026  
**Status:** BINDENDE for alle nye filer

---

## FORMÅL

Sikre at det alltid er 100% tydelig hva som er:
- ✅ En faktisk agent (tar beslutninger, koordinerer)
- ✅ En protokoll (definerer standarder)
- ✅ En dokumentasjon (oversikt, referanse)
- ✅ En extension (utvider funksjonalitet)

---

## REGLER FOR SYSTEM-MAPPEN

**Plassering:** `Agenter/agenter/system/`

### Agenter (5 stk):
**Format:** `agent-[NAVN].md`

**Eksempler:**
- `agent-ORCHESTRATOR.md` ✅
- `agent-AUTO-CLASSIFIER.md` ✅
- `agent-CONTEXT-LOADER.md` ✅
- `agent-PHASE-GATES.md` ✅
- `agent-AGENT-PROTOCOL.md` ✅

**Kjennetegn:**
- Har "Du er [NAVN], system-agenten..." i IDENTITET
- ELLER: "Type: SYSTEM-AGENT" i IDENTITET
- Kan ta beslutninger og koordinere arbeid

### Protokoller (3 stk):
**Format:** `protocol-[NAVN].md`

**Eksempler:**
- `protocol-CODE-QUALITY-GATES.md` ✅
- `protocol-SYSTEM-COMMUNICATION.md` ✅
- `protocol-TASK-COMPLEXITY-ASSESSMENT.md` ✅

**Kjennetegn:**
- Har "Type: SYSTEM-PROTOCOL" i IDENTITET
- Definerer standarder, regler, prosedyrer
- Kan ikke ta beslutninger selv

### Dokumentasjon (2 stk):
**Format:** `doc-[NAVN].md`

**Eksempler:**
- `doc-INTENSITY-MATRIX.md` ✅
- `doc-QUICK-REFERENCE-TASK-QUALITY.md` ✅

**Kjennetegn:**
- Oversikter, matriser, referansedokumenter
- Ingen "Du er..." eller "Type: AGENT"
- Passiv informasjon

### Extensions:
**Format:** `extension-[NAVN].md`

**Eksempler:**
- `extension-ORCHESTRATOR-MONITORING.md` (hypotetisk)

**Kjennetegn:**
- Utvider funksjonalitet til en annen agent
- Ikke selvstendig agent

---

## REGLER FOR BASIS-MAPPEN

**Plassering:** `Agenter/agenter/basis/`

**Format:** `[NAVN]-agent.md`

**Eksempler:**
- `BYGGER-agent.md` ✅
- `PLANLEGGER-agent.md` ✅
- `REVIEWER-agent.md` ✅
- `SIKKERHETS-agent.md` ✅
- `DEBUGGER-agent.md` ✅
- `DOKUMENTERER-agent.md` ✅

---

## REGLER FOR PROSESS-MAPPEN

**Plassering:** `Agenter/agenter/prosess/`

**Format:** `[NUMMER]-[NAVN]-agent.md`

**Eksempler:**
- `1-OPPSTART-agent.md` ✅
- `2-KRAV-agent.md` ✅
- `3-ARKITEKTUR-agent.md` ✅
- `4-MVP-agent.md` ✅
- `5-ITERASJONS-agent.md` ✅
- `6-KVALITETSSIKRINGS-agent.md` ✅
- `7-PUBLISERINGS-agent.md` ✅

---

## REGLER FOR EKSPERT-MAPPEN

**Plassering:** `Agenter/agenter/ekspert/`

**Format:** `[NAVN]-ekspert.md`

**Eksempler:**
- `GDPR-ekspert.md` ✅
- `OWASP-ekspert.md` ✅
- `PERSONA-ekspert.md` ✅
- `API-DESIGN-ekspert.md` ✅
- osv. (31 totalt)

---

## REGLER FOR MALER-MAPPEN

**Plassering:** `Agenter/maler/`

**Format:** `MAL-[TYPE].md`

**Eksempler:**
- `MAL-SYSTEM.md` ✅
- `MAL-BASIS.md` ✅
- `MAL-PROSESS.md` ✅
- `MAL-EKSPERT.md` ✅
- `PHASE-SUMMARY-MAL.md` ✅
- `SESSION-HANDOFF-MAL.md` ✅

---

## REGLER FOR DOKUMENTFILER

**Plassering:** `Agenter/` (rot-nivå)

### For AI:
**Format:** `AI-[NAVN].md` eller `AI-[NAVN].json`

**Eksempler:**
- `AI-BYGGEINSTRUKSJONER.md` ✅
- `AI-OPPGAVER.json` ✅

### For bruker:
**Format:** `READ-[NAVN].md`

**Eksempler:**
- `READ-USER-AI-STRUKTUR.md` ✅
- `READ-USER-AI-AGENT-REGISTER.md` ✅
- `READ-USER-Beskrivelse-av-agenter.md` ✅

### For begge:
**Format:** `[NAVN].md` (ingen prefix)

**Eksempler:**
- `README.md` ✅
- `CLAUDE.md` ✅

---

## HVORDAN VERIFISERE NAVNEKONVENSJON

### For system-mappen:
```bash
cd Agenter/agenter/system/
ls -1

# Alle filer skal starte med:
# - agent-
# - protocol-
# - doc-
# - extension-
```

### For basis-mappen:
```bash
cd Agenter/agenter/basis/
ls -1

# Alle filer skal slutte med:
# - -agent.md
```

### For prosess-mappen:
```bash
cd Agenter/agenter/prosess/
ls -1

# Alle filer skal starte med nummer og slutte med:
# - [NR]-*-agent.md
```

### For ekspert-mappen:
```bash
cd Agenter/agenter/ekspert/
ls -1

# Alle filer skal slutte med:
# - -ekspert.md
```

---

## VED NYE FILER

**Før du oppretter en ny fil:**

1. ✅ Bestem hvilken kategori filen tilhører
2. ✅ Bruk riktig prefix/suffix basert på kategori
3. ✅ Følg eksisterende mønstre i samme mappe
4. ✅ Oppdater AI-OPPGAVER.json med riktig filsti
5. ✅ Oppdater dokumentasjon hvis nødvendig

**Aldri:**
- ❌ Lag filer uten prefix/suffix i system-mappen
- ❌ Bland navnekonvensjoner fra ulike mapper
- ❌ Bruk gamle filnavn uten prefix (f.eks. `ORCHESTRATOR.md`)

---

## EKSEMPLER PÅ FEIL

### ❌ FEIL:
```
agenter/system/ORCHESTRATOR.md           # Mangler agent- prefix
agenter/system/NEW-AGENT.md              # Mangler agent- prefix
agenter/system/my-protocol.md            # Skal være protocol-MY-PROTOCOL.md
agenter/basis/BYGGER.md                  # Mangler -agent suffix
agenter/ekspert/GDPR.md                  # Mangler -ekspert suffix
```

### ✅ RIKTIG:
```
agenter/system/agent-ORCHESTRATOR.md     # Har agent- prefix
agenter/system/agent-NEW-AGENT.md        # Har agent- prefix
agenter/system/protocol-MY-PROTOCOL.md   # Har protocol- prefix
agenter/basis/BYGGER-agent.md            # Har -agent suffix
agenter/ekspert/GDPR-ekspert.md          # Har -ekspert suffix
```

---

## VERKTØY FOR AUTOMATISK SJEKK

```bash
# Sjekk at alle filer i system/ følger konvensjon
cd /path/to/Kit\ CC/Agenter/agenter/system
for file in *.md; do
  if ! echo "$file" | grep -qE "^(agent-|protocol-|doc-|extension-)"; then
    echo "❌ FEIL: $file følger ikke navnekonvensjon"
  fi
done
```

---

## OPPDATERINGSHISTORIKK

| Dato | Endring |
|------|---------|
| 2026-02-04 | Initial versjon - dokumenterer navnekonvensjon |
| 2026-02-04 | Implementert prefixer i system-mappen |
| 2026-02-04 | Oppdatert alle 90+ referanser i prosjektet |

---

**Denne konvensjonen er BINDENDE for alle nye filer i Kit CC.**

---

*Versjon: 1.0.0*  
*Opprettet: 4. februar 2026*  
*Status: GODKJENT og IMPLEMENTERT*
