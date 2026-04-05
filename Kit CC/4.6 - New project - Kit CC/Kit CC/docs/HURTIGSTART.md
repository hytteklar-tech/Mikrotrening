# Hurtigstart — Kit CC

> Brukerveiledning for å komme i gang med Kit CC.

---

## Hva er Kit CC?

Kit CC er et komplett multi-agent system for å bygge programvare fra idé til ferdig produkt. Systemet består av 50+ agenter fordelt på 4 nivåer som samarbeider for å hjelpe deg.

---

## Ved oppstart velger du modus

| Modus | Beskrivelse |
|-------|-------------|
| **Bygge** | Start eller fortsett å bygge prosjektet (full skrivetilgang) |
| **Spørre** | Få svar uten å endre noe (read-only, VEILEDER-agent) |

---

## Bygge — første gang

1. Si "Start nytt prosjekt"
2. Svar på noen enkle spørsmål om prosjektet (progressiv avsløring)
3. Systemet klassifiseres automatisk
4. Fase 1 starter

## Bygge — fortsette eksisterende

1. Si "Fortsett"
2. Systemet leser hvor du var
3. Viser status og foreslår neste steg

## Spørre

1. Velg "Spørre" ved oppstart
2. VEILEDER-agent starter i read-only modus
3. Spør om Kit CC, prosjektet ditt, koding eller teknologi
4. Agenten søker på nett automatisk ved behov

---

## Nyttige kommandoer

| Kommando | Beskrivelse |
|----------|-------------|
| "Vis status" | Full prosjektoversikt med fremdrift |
| "Neste steg" | Delegerer til aktiv fase-agents neste oppgave |
| "Bytt til [agent]" | Kall spesifikk agent |
| "Re-klassifiser" | Kjør klassifisering på nytt |
| "Vis alle checkpoints" | Se lagringspunkter |
| "Gå tilbake til [dato]" | Rollback til tidligere tilstand |
| "Bytt til utvikler" | Endre kommunikasjonsnivå (også: "erfaren-vibecoder", "ny-vibecoder") |
| "Bytt byggemodus" | Bytt mellom ai-bestemmer / samarbeid / detaljstyrt |
| "Oversty gate [Fase-N]: [årsak]" | Manuelt overstyre fase-gate |

---

## De 7 fasene

| Fase | Navn | Hva skjer |
|------|------|-----------|
| 1 | Idé og visjon | Hva skal du bygge? |
| 2 | Planlegg | Funksjoner, krav og sikkerhet |
| 3 | Arkitektur og sikkerhet | Hvordan bygges det trygt? |
| 4 | MVP | Sett opp prosjektet - Første fungerende versjon |
| 5 | Bygg funksjonene | Feature-loop: Bygg → Test → Poler → Godkjenn → Neste |
| 6 | Test og kvalitetssjekk | Fungerer alt? |
| 7 | Publiser og vedlikehold | Ut i verden |

Prosessen tilpasser seg ditt prosjekt. Et hobby-prosjekt går raskt gjennom, mens et enterprise-system får grundigere behandling.

---

## Prosjekttyper

| Prosjekttype | Score | Typisk |
|------|-------|--------|
| Enkelt hobbyprosjekt | 7-10 | Hobby, læring, prototyper |
| Lite, oversiktlig prosjekt | 11-14 | Interne verktøy |
| Vanlig app-prosjekt | 15-18 | Kundevendte apper |
| Viktig prosjekt med sensitive data | 19-23 | Viktige systemer |
| Stort, kritisk system | 24-28 | Kritisk infrastruktur |

---

## Kompatibilitet med andre AI-verktøy

| AI-verktøy | Startfil |
|------------|----------|
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursorrules` eller `AGENT.md` |
| Windsurf | `.windsurfrules` eller `AGENT.md` |
| Andre | `AGENT.md` |
