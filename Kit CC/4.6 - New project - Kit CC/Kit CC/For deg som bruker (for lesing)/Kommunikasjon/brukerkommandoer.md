# Brukerkommandoer

> Kit CC har innebygde kommandoer som bruker kan bruke for å navigere, endre modus, og få informasjon — uten å måtte skrive komplekse instruksjoner.

## Hva gjør den?

Brukerkommandoer er snarveier som bruker kan bruke for å kontrollere Kit CC. I stedet for å si "Jeg vil gjerne se hvor prosjektet mitt står nå", kan bruker bare si "Vis status" og systemet vet nøyaktig hva som menes.

Kommandoene er organisert i grupper:

1. **Informasjon** — "Vis status", "Neste steg", "Vis checkpoints"
2. **Navigasjon** — "Bytt til [agent]", "Gå tilbake til [dato]"
3. **Modus** — "Bytt byggemodus", "Bytt til [nivå]"
4. **Klassifisering** — "Re-klassifiser", "Oversty gate [Fase-N]"

## Hvorfor er det nyttig?

- **Rask kontroll** — Bruker får instante svar uten å måtte formulere spørsmål
- **Konsistent** — Systemet forstår alltid hva bruker mener
- **Oppdagbarhet** — Bruker lærer kommandoer gradvis, ikke alt på en gang
- **Kraftig** — Med få ord kan bruker gjøre komplekse operasjoner
- **Tilbake-kontroll** — Bruker kan når som helst justere retning

## Hvordan fungerer det?

**Kommandoer er håndtert i boot-sekvensen og alle fase-agenter.**

Når bruker skriver melding, sjekker systemet:
1. Starter meldingen med kjent kommando? (f.eks. "Vis status")
2. JA → Kjør kommando, ikke send til fase-agent
3. NEI → Send til aktiv fase-agent

**Kommandolisten (komplette instruksjoner per kommando):**

### Informasjons-kommandoer

**"Vis status"**
- Hva: Full prosjektoversikt
- Resultat:
```
✅ Fase 4 (MVP)
📊 Fremdrift: 3 av 8 oppgaver fullført (37%)
➡️ Neste: Implementer autentisering
⏱️ Prosjekttype: Vanlig app-prosjekt (15 poeng)
🕐 Sesjon startet: 14:30
🌐 Kit CC Monitor: http://localhost:[PORT]
⚠️ Gate-unntak: 0
🔄 Reklassifiseringer: 0
```

**"Neste steg"**
- Hva: Forslag til hva bruker bør gjøre
- Hvem håndterer: Aktiv fase-agent (se fase-agentens BRUKERKOMMANDO-seksjon)
- Resultat: Spesifikk oppgave + hvordan gjøre den

**"Vis alle checkpoints"** (eller "Vis checkpoints")
- Hva: Liste alle lagringspunkter
- Resultat:
```
Tilgjengelige checkpoints:

1. 2026-02-10 14:30 — "Fase 2 fullført, før fase 3"
2. 2026-02-12 09:15 — "MVP-setup ferdig"
3. 2026-02-14 16:45 — "Autentisering implementert"
4. 2026-02-16 11:20 — "Test av betalinger fullført"

(Bruk "Gå tilbake til [dato]" for å rulle tilbake)
```

### Navigasjons-kommandoer

**"Bytt til [agent-navn]"**
- Hva: Bytt til spesifikk agent manuelt
- Eksempler:
  - "Bytt til OWASP-ekspert" — Få sikkerhetshjelp
  - "Bytt til BYGGER-agent" — Få hjelp med koding
  - "Bytt til DEBUGGER-agent" — Feilsøking
- Resultat: Systemet bytter modus, bruker kan spørre expertagenten

**"Gå tilbake til [dato]"** (eller "Rollback til [dato]")
- Hva: Rulle tilbake prosjektet til et tidligere punkt
- Eksempel: "Gå tilbake til 2026-02-14 16:45"
- Resultat:
  1. Systemet sjekker at checkpoint finnes
  2. Viser hva som vil bli reversert
  3. Spør om godkjenning
  4. Hvis ja: Bruker filer og state gjenopprettes
  5. PROGRESS-LOG og PROJECT-STATE.json oppdateres med "ROLLBACK" event
- Ref: Kit CC/Agenter/klassifisering/ROLLBACK-PROTOCOL.md (Lag 3)

### Modus-kommandoer

**"Bytt byggemodus"** (eller "Bytt modus")
- Hva: Endre hvordan systemet samarbeider med deg
- Alternativer:
  1. **ai-bestemmer** — System gjør beslutninger, bruker godkjenner ved milepæler
  2. **samarbeid** — System foreslår, bruker godkjenner hver oppgave
  3. **detaljstyrt** — Bruker styrer hver detalj, system er assistent
- Resultat:
  ```
  Gjeldende modus: samarbeid

  Alternativer:
  - ai-bestemmer: "System bestemmer, jeg godkjenner på slutten"
  - detaljstyrt: "Jeg styrer alt, system hjelper"

  Hvilket modus?
  ```
  - Oppdaterer `builderMode` i PROJECT-STATE.json
  - Logg til PROGRESS-LOG: "🔀 MODUS: samarbeid → detaljstyrt"

**"Bytt til [nivå]"** (eller "Bytt kommunikasjonsnivå")
- Hva: Endre brukernivå for kommunikasjon
- Alternativer:
  1. **Utvikler** — Teknisk språk
  2. **Erfaren vibecoder** — Balansert
  3. **Ny vibecoder** — Enkelt
- Eksempel: "Bytt til Utvikler"
- Resultat:
  - Oppdaterer `classification.userLevel` i PROJECT-STATE.json
  - Alle nye meldinger blir teknisk
  - Logg til PROGRESS-LOG: "📚 NIVÅ: ny-vibecoder → utvikler"

### Klassifiserings-kommandoer

**"Re-klassifiser"** (eller "Reklassifiser prosjektet")
- Hva: Kjør klassifiseringen på nytt
- Resultat:
  1. System stiller 5-8 spørsmål på nytt
  2. Beregner ny poengsum
  3. Viser hvis klassifisering endret seg
  4. Hvis ja: Spør om godkjenning for oppgradering
  5. Logg i PROGRESS-LOG: "🔍 RECLASSIFICATION: LITE_OVERSIKTLIG → VANLIG_APP (scope expanded)"
- Ref: agent-AUTO-CLASSIFIER.md (Lag 3)

**"Oversty gate [Fase-N]: [årsak]"** (eller "Override gate")
- Hva: Manuelt overstyre fase-gate for å tvinge faseovergang
- Eksempel: "Oversty gate fase-3: Trenger å komme videre selv om sikkerhetstesting ikke ferdig"
- Resultat:
  1. System sjekker at du er klar over konsekvensene
  2. Spør om godkjenning
  3. Hvis ja:
     - Legger til entry i `gateOverrides[]` i PROJECT-STATE.json:
       ```json
       {
         "phase": "3",
         "reason": "Trenger å komme videre selv om sikkerhetstesting ikke ferdig",
         "timestamp": "2026-02-17T14:30:00Z",
         "userApproval": true
       }
       ```
     - Logg i PROGRESS-LOG: "⚠️ GATE_OVERRIDE: Fase 3 overstyrt, årsak: Trenger å komme videre..."
     - Tillater faseovergang tross MÅ-oppgaver mangler
- Ref: agent-PHASE-GATES.md (Lag 3)

## Eksempel

**Typisk brukersession med kommandoer:**

```
Bruker: Hei! Jeg er tilbake.

System: Velkommen tilbake! Du er på fase 4. Hva vil du gjøre?

Bruker: Vis status

System: [Viser full status inkludert fase, fremdrift, neste steg, monitor-link]

Bruker: Jeg jobbet på autentisering, men ting ble rotete. Kan jeg gå tilbake?

System: Ja, du har disse checkpointene:
1. 2026-02-15 10:00 — Fase 3 fullført
2. 2026-02-16 14:30 — MVP-setup ferdig

Bruker: Gå tilbake til 2026-02-16 14:30

System: Du vil rulle tilbake fra autentiserings-implementasjon til MVP-setup-punkt.
Endringer som reverseres:
- Slett: src/auth/ (3 filer)
- Slett: database migration auth_users

OK?

Bruker: Ja

System: [Rollback fullført] Du er nå på checkpoint fra 2026-02-16 14:30.
PROGRESS-LOG oppdatert: ROLLBACK event.

Bruker: Bytt til OWASP-ekspert

System: Du snakker nå med OWASP-sikkerhet-eksperter. Hva trenger du hjelp med?
```

## Relaterte features

- `tre-brukernivaaer.md` — Brukernivåer (kan byttes med kommando)
- `kit-cc-monitor.md` — Monitor viser også disse kommandoene som "Quick links"
- CLAUDE.md (steg 0: MODUSVALG) — Boot-sekvensen håndterer kommandoer

---
*Definert i: CLAUDE.md (steg 0, brukerkommandoer-liste)*
*Lagt til: 2026-02-17*
*Kategori: Kommunikasjon*
