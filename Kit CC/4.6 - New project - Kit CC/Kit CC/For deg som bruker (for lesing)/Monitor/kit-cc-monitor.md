# Kit CC Monitor

> Live dashboard som viser prosjektstatus i nettleseren, starter automatisk med intelligent portfinning, og verifiserer eierskap via PID-fil.

## Hva gjør den?

Kit CC Monitor er et web-basert dashboard som gir bruker en visuell oversikt over hvor prosjektet står. I stedet for å måtte lese JSON-filer og logger, ser bruker:

- **Gjeldende fase** — Hvor i de 7 fasene er vi?
- **Fasefremgang** — Hvor langt i gjeldende fase?
- **Aktiv agent** — Hvilken agent jobber nå?
- **Siste handlinger** — Hva gjorde systemet sist?
- **Systemhelse** — Kjører alt bra? Noen advarsler?
- **Neste steg** — Hva er oppgaven?
- **Logg** — Siste 20 handlinger fra PROGRESS-LOG

Dashboardet starter automatisk når du begynner å bygge og kjøres i bakgrunnen. Du kan åpne det i nettleseren når som helst.

## Hvorfor er det nyttig?

- **Visuelt orientert** — Enklere å forstå status enn å lese tekst
- **Bakgrunnsprosess** — Kjører uavhengig av chat-sessionen, så du kan avslutte chat og fortsette senere
- **Intelligent start** — Finner automatisk ledig port, så flere prosjekter kan kjøres samtidig
- **Sikker** — Verifiserer eierskap via PID-fil, så du vet at det er DITT prosjekts Monitor som kjører
- **Fallback til manuell** — Hvis automatisk start feiler, får bruker enkle instruksjoner for manuell start

## Hvordan fungerer det?

**Automatisk oppstart (steg 3C i boot-sekvensen):**

1. **Sjekk avhengigheter**
   - Finnes `kit-cc-overlay/node_modules`?
   - NEI → Kjør automatisk: `npm install --prefix kit-cc-overlay/`
   - (Vis bruker: "⏳ Installerer Monitor-avhengigheter...")

2. **Sjekk om Monitor allerede kjører**
   - Les `kit-cc-overlay/monitor.pid` (hvis finnes)
   - Sjekk om PID-en lever: `kill -0 [PID] 2>/dev/null`
   - Hvis PID lever:
     - Health-sjekk: `curl -s http://localhost:[overlay.port]/kit-cc/api/health`
     - Hvis OK → Monitor kjører, fortsett
     - Hvis ikke OK → Drep prosessen, start på nytt

3. **Finn ledig port**
   - Start med `overlay.port` fra PROJECT-STATE.json (hvis satt), ellers 4444
   - FOR HVER kandidat-port (4444, 4445, 4446...):
     - macOS/Linux: `lsof -ti:[PORT]`
     - Windows: `netstat -ano | findstr :[PORT]`
     - Ingen output → LEDIG, bruk denne
     - Output → OPPTATT, prøv neste

4. **Start Monitor**
   - Lagre port: `overlay.port = [PORT]` i PROJECT-STATE.json
   - Kjør: `PORT=[PORT] nohup node kit-cc-overlay/server.js > kit-cc-overlay/monitor.log 2>&1 &`
   - Lagre PID: `echo $! > kit-cc-overlay/monitor.pid`
   - Vent 2 sekunder, health-sjekk
   - Hvis OK: Vis "✅ Kit CC Monitor startet på http://localhost:[PORT]"
   - Hvis feil: Vis manuell oppstart-instruksjon

**Fallback ved feil:**

Hvis automatisk start feiler, vises:
```
🖥️ Kit CC Monitor er klar, men må startes manuelt.

Åpne en ny terminal og kjør:
  cd [prosjektsti]/kit-cc-overlay && node server.js

Åpne deretter http://localhost:[PORT]
(Du kan fortsette å bygge mens du gjør dette.)
```

**Dashboard-innhold (API endpoints):**

- `/kit-cc/api/health` — Health-sjekk (returns `{status: "ok"}`)
- `/kit-cc/api/status` — Full prosjektstatus (leser PROJECT-STATE.json)
- `/kit-cc/api/progress` — PROGRESS-LOG (siste 20 linjer)
- `/kit-cc/api/current-agent` — Gjeldende fase-agent
- `/kit-cc/api/phase-progress` — Hvor langt i gjeldende fase

**Dashboard-layout:**

```
┌─────────────────────────────────────────────────────────┐
│ Kit CC Monitor                          [Refresh] [←→]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📊 Status                                              │
│  ├─ Fase 4 (MVP) — 3 av 8 oppgaver fullført [███░░░░] │
│  ├─ Aktiv agent: 4-MVP-agent.md                         │
│  └─ Prosjekttype: Vanlig app-prosjekt (15 poeng)       │
│                                                         │
│  ➜ Neste oppgave: Implementer autentisering           │
│                                                         │
│  ⏱️ Session startet: 14:30 (24 min)                    │
│  🌐 Kit CC Monitor: http://localhost:[PORT]              │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  📝 Siste handlinger (PROGRESS-LOG)                    │
│                                                         │
│  14:30 START task=4-MVP-setup desc="Sett opp prosjekt" │
│  14:31 FILE op=created path="src/index.ts"             │
│  14:32 FILE op=modified path="package.json"            │
│  14:35 COMMIT msg="Initial project setup"              │
│  14:36 DONE task=4-MVP-setup output="src/"             │
│                                                         │
│  [Vis alle] (PROGRESS-LOG)                             │
├─────────────────────────────────────────────────────────┤
│  🎯 Quick links                                         │
│  [Vis status] [Neste steg] [Bytt agent] [Gå tilbake]  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Eksempel

**Session 1:**
- Bruker starter: "Bygg TODO-app"
- Boot-sekvensen kjører
- Monitor finner automatisk en ledig port (starter fra 4444, prøver 4445, 4446... til ledig)
- Bruker åpner http://localhost:[PORT]
- Dashboard viser: "Fase 1 (Idé) — 0 av 2 oppgaver"
- Bruker jobber i chat
- Monitor oppdateres i sanntid (bruker refresh eller WebSocket)

**Session 2 (neste dag):**
- Bruker: "Fortsett"
- Boot-sekvensen sjekker: Monitor er allerede i gang på lagret port? Ja, PID lever ✅
- Dashboard viser: "Fase 2 (Planlegg) — 3 av 7 oppgaver fullført"
- Bruker kan umiddelbart se hvor de var

**Flere prosjekter samtidig:**
- Prosjekt A starter Monitor på f.eks. port 4444 (lagrer porten i `PROJECT-STATE.json`)
- Prosjekt B finner at 4444 er opptatt → starter på 4445
- Prosjekt C finner at 4444+4445 er opptatt → starter på 4446
- Hver bruker jobber uavhengig, Monitor-prosessene kjører i bakgrunnen

## Relaterte features

- `veileder-modus.md` — Monitor er også tilgjengelig i read-only veileder-modus
- `brukerkommandoer.md` — "Vis status" vises både i chat og Monitor
- Boot-sekvensen (CLAUDE.md, steg 3C) — Full implementasjonsdetalj

---
*Definert i: CLAUDE.md (steg 3C), kit-cc-overlay/, PROJECT-STATE.json (overlay.port)*
*Lagt til: 2026-02-17*
*Kategori: Monitor*
