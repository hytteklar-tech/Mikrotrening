# MÅ-BØR-KAN klassifisering

> Alle funksjoner i Kit CC klassifiseres som MÅ (obligatorisk), BØR (anbefalt), eller KAN (valgfritt), og hvilke som gjelder avhenger av prosjektets intensitetsnivå.

## Hva gjør den?

MÅ-BØR-KAN er Kit CC's prioriteringssystem. I stedet for å tvinge alt gjeldende for alle prosjekter, tilpasser systemet forventninger basert på hvor kritisk prosjektet er.

**Definisjonene:**

- **MÅ** — Obligatorisk. Blokkerer faseovergang hvis ikke gjort. Eksempel: "ALLE prosjekter MÅ ha git-versjonering"
- **BØR** — Anbefalt. Presenteres til bruker, men blokkerer ikke hvis bruker velger å hoppa over. Eksempel: "Vanlige app-prosjekter BØR ha automatisert testing"
- **KAN** — Valgfritt. Tilbys hvis tid/interesse. Eksempel: "Hobbyprosjekter KAN ha monitoring, men det er ikke nødvendig"

Hvilken klassifisering en funksjon får avhenger av intensitetsnivået:

| Funksjon | Enkelt hobby | Lite oversiktlig | Vanlig app | Viktig + data | Kritisk system |
|----------|--------------|------------------|------------|---------------|----------------|
| Versjonering (git) | MÅ | MÅ | MÅ | MÅ | MÅ |
| Automatisert testing | KAN | BØR | BØR | MÅ | MÅ |
| GDPR-dokumentasjon | KAN | BØR | BØR | MÅ | MÅ |
| Load-testing | KAN | KAN | KAN | BØR | MÅ |
| 24/7 monitoring | KAN | KAN | BØR | BØR | MÅ |
| Sikkerhetkode-review | KAN | KAN | BØR | MÅ | MÅ |
| Disaster recovery | KAN | KAN | KAN | BØR | MÅ |

## Hvorfor er det nyttig?

- **Effektivitet** — Hobbyprosjekter bruker 20% av tiden på testing i stedet for 60%
- **Risikovurdering** — Kritiske systemer får mer oppmerksomhet der det betyr noe
- **Fleksibilitet** — Bruker kan velge å gjøre "BØR" hvis de vil, uten tvang
- **Transparans** — Bruker vet nøyaktig hva som er forventet basert på deres prosjekt
- **Skalering** — Kit CC kan håndtere både 2-timers hobbyprosjekter og 6-måneders enterprise-systemer

## Hvordan fungerer det?

**Når faseovergangs-gate kjøres (før fase-overgang):**

1. System leser `classification.intensityLevel` fra PROJECT-STATE.json
2. Laster funksjonmatrisen for gjeldende fase (fra KLASSIFISERING-METADATA-SYSTEM.md eller fase-agent)
3. Kategoriserer alle oppgaver/deliverables som MÅ/BØR/KAN basert på nivå
4. **Gate-sjekk:**
   - Alle MÅ-oppgaver: Sjekker at de er fullført ✅
   - Alle BØR-oppgaver: Viser lista, anbefaler gjennomføring, men tillater hopping
   - Alle KAN-oppgaver: Viser kun som "Valgfritt"
5. **Resultat:**
   - MÅ-oppgaver mangler → Gate blokkerer faseovergang
   - BØR-oppgaver mangler → Bruker får advarsel ("Anbefaler at du fullfører X før faseovergang")
   - KAN-oppgaver mangler → Ingenting, de er valgfrie

**Eksempel gate-sjekk for fase 4 → 5 (ENKELT HOBBYPROSJEKT):**

```
🚩 MÅ-oppgaver:
✅ Versjonering satt opp
✅ Grunnleggende sikkerhet implementert
✅ Første feature ferdig

💡 BØR-oppgaver (anbefalt):
⚪ Enkel dokumentasjon (velg: gjør nå / hopp over)
⚪ Basis-logging (velg: gjør nå / hopp over)

✨ KAN-oppgaver (valgfritt):
⚪ GitHub Pages-hosting
⚪ Analytics-integrasjon

➜ Gate-status: KLAR FOR FASEOVERGANG (alle MÅ fullført)
```

**Sammenlignet med VANLIG APP-PROSJEKT:**

```
🚩 MÅ-oppgaver:
✅ Versjonering satt opp
✅ Sikkerhet gjennomgått av ekspert
✅ Automatisert testing implementert
✅ First 3 features ferdig
✅ Logging og error-tracking
✅ Database-migreringsstrategi

❌ BLOKKERT — MÅ-oppgaver mangler:
❌ Automatisert testing (82% ikke ferdig)
❌ Database-migreringer (ikke startet)

💡 BØR-oppgaver:
⚪ Ytelsestesting
⚪ Sikkerhetsdokumentasjon

Gate-status: BLOKKERT — Fullført alle MÅ-oppgaver før faseovergang
```

## Eksempel

**Bruker med Enkelt Hobbyprosjekt (TODO-app):**

Fase 3 → 4 gate-sjekk:
- MÅ: Versjonering ✅, Arkitektur-skisse ✅, Prosjekt-setup ✅
- BØR: README-dokumentasjon (bruker hopper over)
- KAN: GitHub Pages (bruker hopper over)
- Resultat: Gate passert, faseovergang tillatt

**Bruker med Vanlig App-Prosjekt (e-handelssystem):**

Samme gate-sjekk:
- MÅ: Versjonering ✅, Arkitektur-review ✅, Sikkerhetskjekk ❌ (BLOKKERT)
- BØR: README, API-dokumentasjon (ikke sjekket da gate blokkert)
- KAN: Monitoring (ikke sjekket)
- Resultat: Gate blokkert. System sier: "MÅ-oppgave mangler: Sikkerhetskjekk. Kontakt sikkerhet-ekspert før faseovergang."

## Relaterte features

- `intensitetsnivaaer.md` — De 5 nivåene som bestemmer MÅ/BØR/KAN
- `funksjonsmatrise.md` — Detaljert matrise over alle funksjoner per nivå
- Agent-filene bruker MÅ-BØR-KAN i sine fase-gates

---
*Definert i: KLASSIFISERING-METADATA-SYSTEM.md, agent-PHASE-GATES.md*
*Lagt til: 2026-02-17*
*Kategori: Klassifisering*
