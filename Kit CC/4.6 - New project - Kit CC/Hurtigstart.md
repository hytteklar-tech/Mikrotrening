# Hurtigstart — Kit CC

> 15 ting du trenger for at Kit CC skal fungere bra for deg.

---

## 1. Slik starter du

Kopier hele `Kit CC/`-mappen inn i rotmappen til prosjektet ditt. Legg `CLAUDE.md` i roten (samme nivå som `Kit CC/`). Start Claude Code i prosjektmappen og Kit CC tar deg gjennom resten.

**Bruker du Cursor eller Windsurf?** Rename `CLAUDE.md` til `.cursorrules` (Cursor) eller `AGENTS.md` (andre verktøy). Innholdet er det samme.

---

## 2. Mappestruktur du bør forstå

```
ditt-prosjekt/               <-- Rotmappen
├── CLAUDE.md                 <-- Kit CC sin "inngang" (leses automatisk)
├── Kit CC/                   <-- Agentsystemet (rør ALDRI denne mappen)
│   ├── Agenter/              <-- Alle 50+ agenter
│   └── docs/                 <-- Kit CC sin egen dokumentasjon
├── .ai/                      <-- Opprettes automatisk (prosjektstatus, logger)
├── docs/                     <-- Dine krav, spesifikasjoner, moduler
├── src/                      <-- Koden din havner her (eller app/, lib/, etc.)
└── kit-cc-overlay/           <-- Monitor-dashboard (opprettes automatisk)
```

**Kit CC-mappen er hellig** — ikke endre, slett eller flytt filer i den. Alt annet i roten er ditt prosjekt.

---

## 3. Har du allerede en app?

Legg den i rotmappen ved siden av `Kit CC/`. Hvis du har en eksisterende `src/`-mappe, `package.json`, etc. — la det ligge. Kit CC oppdager automatisk at det finnes kode (3+ kildekodefiler) og tilbyr å analysere den med en 25-agents sverm. Si ja — den kartlegger arkitektur, konvensjoner og sikkerhetshull slik at Kit CC bygger videre uten å ødelegge.

---

## 4. De to modusene

Når du starter, spør Kit CC: **Bygge eller Spørre?**

- **Bygge** — Full prosess med koding, faser, agenter
- **Spørre** — Read-only. Spør om hva som helst uten at noe endres

Du kan bytte mellom dem når som helst.

---

## 5. Klassifiseringen (3-5 spørsmål, deretter autopilot)

Kit CC stiller deg noen enkle spørsmål: Hva bygger du? For hvem? Sensitiv data? Basert på svarene scorer den prosjektet (7-28 poeng) og tilpasser HELE prosessen:

| Nivå | Poeng | Betyr | Eksempel |
|------|-------|-------|----------|
| MINIMAL | 7-10 | Lite hobbyprosjekt | TODO-app, prototype |
| FORENKLET | 11-14 | Oversiktlig prosjekt | Internt verktøy |
| STANDARD | 15-18 | Vanlig app | Kundevendt app |
| GRUNDIG | 19-23 | Viktig, sensitiv data | Helse, betaling |
| ENTERPRISE | 24-28 | Kritisk system | Infrastruktur |

Du trenger ikke tenke på dette etterpå — Kit CC justerer automatisk hva som er obligatorisk, anbefalt og valgfritt.

---

## 6. Byggemodus — velg din stil

Du velger hvor mye kontroll du vil ha:

- **ai-bestemmer** — AI tar alle valg, du godkjenner resultatet (raskest)
- **samarbeid** — AI foreslår, du godkjenner viktige valg (anbefalt)
- **detaljstyrt** — Du velger mellom alternativer for hver beslutning

Bytt når som helst med: `Bytt byggemodus`

---

## 7. De 7 fasene (men du trenger bare å følge med)

Kit CC guider deg automatisk gjennom:

1. **Idé og visjon** — Hva skal du bygge?
2. **Planlegg** — Krav, brukerhistorier, moduler
3. **Arkitektur** — Tech stack, sikkerhet, datamodell
4. **MVP** — Første fungerende versjon
5. **Bygg funksjonene** — En funksjon om gangen (feature-loop)
6. **Kvalitetssikring** — Tester, sikkerhet, ytelse
7. **Publiser** — Deploy og vedlikehold

Du trenger ikke huske dette — Kit CC forteller deg hva som er neste steg.

---

## 8. VIKTIG: Fase 5 er der du bør bli

Fase 5 (Bygg funksjonene) er **hoveddelen av arbeidet**. Her bygger Kit CC en funksjon om gangen i en loop:

**Bygg → Test → Poler → Godkjenn → Neste funksjon**

**Ikke gå til fase 6 før du er fornøyd.** Du styrer tempoet:
- Si **"Go"** — Godkjenn og start neste funksjon
- Si **"Mer arbeid"** — Mer polering på denne funksjonen
- Si **"Blokkert"** — Noe hindrer fremdrift

Bli i fase 5 til alle funksjonene dine er bygd og du er fornøyd med resultatet. Fase 6 er for sluttesting — ikke for å bygge mer.

---

## 9. Nye ideer underveis? Bare dump dem

Har du en ny idé midt i arbeidet? Bare si det. Kit CC parkerer ideen i `docs/BRUKERENS-PLAN.md` eller registrerer den som en fremtidig modul. Ingenting går tapt.

Du kan også si: `Re-klassifiser` hvis prosjektet har vokst utover det opprinnelige.

---

## 10. Når Kit CC ber deg starte ny sesjon

Kit CC pauser automatisk etter ca. 25 meldinger eller 8 filer. Det betyr ikke at noe er galt — det er for å holde kvaliteten oppe. Alt arbeid er lagret. Start bare en ny chat og si **"Fortsett"**.

---

## 11. Kommandoer du kan bruke

| Kommando | Hva den gjør |
|----------|-------------|
| `Vis status` | Se fase, fremdrift, neste steg |
| `Neste steg` | Hva bør jeg gjøre nå? |
| `Bytt byggemodus` | Endre AI-autonomi |
| `Re-klassifiser` | Klassifiser prosjektet på nytt |
| `Vis alle checkpoints` | Se lagringspunkter |
| `Gå tilbake til [dato]` | Rull tilbake til et tidspunkt |
| `Oversty gate [Fase-N]: [årsak]` | Hopp over en kvalitetssjekk |

---

## 12. Monitor-dashboardet

Kit CC starter automatisk et visuelt dashboard i nettleseren (http://localhost:4444 eller lignende port). Her ser du:
- Gjeldende fase og fremdrift
- Siste handlinger
- Neste oppgave

Du trenger ikke bruke det, men det er nyttig for oversikt.

---

## 13. Dokumentasjon skjer (nesten) automatisk

Kit CC dokumenterer underveis — krav, arkitektur, brukerhistorier, moduler. Men **be den jevnlig om å dokumentere** for best resultat. Si f.eks. "Dokumenter det vi har gjort så langt" mellom sesjoner.

---

## 14. Når noe går galt

Hvis en sesjon krasjer, er det greit. Kit CC logger alt i `PROGRESS-LOG.md`. Neste sesjon oppdager automatisk hva som skjedde og tilbyr:
- Prøv på nytt
- Hopp over
- Rull tilbake
- Avslutt trygt

---

## 15. Det viktigste

- **Kit CC-mappen** er agentsystemet. Ikke endre den.
- **Koden din** havner i roten (`src/`, `app/`, etc.)
- **Bli i fase 5** til du er fornøyd — ikke rush til fase 6
- **Start ny chat** når Kit CC ber om det — alt er lagret
- **Dump ideer** fritt — de fanges opp og parkeres
- **Be om dokumentasjon** jevnlig

---

*Kit CC v3.5.0 — Bygd av Øyvind Daniel Paulsen - oyvind.daniel@gmail.com - 917 45 075*
