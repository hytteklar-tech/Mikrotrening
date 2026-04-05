# Veileder-modus

> Ved oppstart kan bruker velge "Spørre" i stedet for "Bygge" — da starter VEILEDER-agenten i read-only modus, ingen filer endres, men bruker kan stille spørsmål om Kit CC, prosjektet, koding eller teknologi.

## Hva gjør den?

Veileder-modus er for når bruker vil lære eller få svar, ikke bygge. I denne modusen:

- **Ingen filer endres** — Systemet er rent read-only
- **Prosjektet påvirkes ikke** — PROGRESS-LOG.md, PROJECT-STATE.json osv. berøres ikke
- **Nettsøk aktivert** — VEILEDER-agenten søker automatisk på nett for oppdatert informasjon
- **Sokratisk veiledning** — For beslutningsspørsmål stiller agenten spørsmål i stedet for å svare direkte
- **Fleksibel** — Bruker kan bytte til "Bygge" når som helst

Eksempler på bruk:
- "Hva er en REST API?"
- "Hvordan fungerer OAuth?"
- "Hva er en relasjonell database?"
- "Bør jeg bruke TypeScript?"
- "Forklar Kit CC prosessen"
- "Hva handler prosjektet mitt om?" (lesing av eksisterende prosjekt)

## Hvorfor er det nyttig?

- **Læringsverkøy** — Bruker kan utforske konsepter uten press
- **Planleggingsmodus** — Før du starter bygget kan du lære og planlegge
- **Krisehåndtering** — Hvis noe gikk galt, kan du spørre om løsninger uten risiko
- **Langsom læring** — Nybegynnere kan ta seg tid uten frykt for å ødelegge prosjektet
- **Separate modus** — Bygge og spørre er ikke blandet sammen

## Hvordan fungerer det?

**Boot-sekvens (steg 0: MODUSVALG):**

```
System spør: "Hva vil du gjøre?"

1. Bygge — Start eller fortsett å bygge prosjektet
   (Eksempler: "Start nytt prosjekt", "Fortsett der vi slapp")

2. Spørre — Få svar uten å endre noe (read-only)
   (Eksempler: "Forklar REST API", "Hva er Kit CC?")
```

**Hvis bruker velger "Spørre":**

1. System leser Kit CC/Agenter/agenter/basis/VEILEDER-agent.md (Lag 2)
2. Starter VEILEDER-agent i read-only modus
3. STOPP HER — ikke fortsett til steg 1 (boot-sekvensen hopper over alt annet)
4. Bruker kan nå stille spørsmål

**VEILEDER-agentens oppgaver:**

1. **Svare på generelle spørsmål**
   - "Hva er en REST API?" → Forklaring tilpasset brukernivå
   - "Hvordan fungerer OAuth?" → Detaljert svar med eksempler

2. **Svare om Kit CC**
   - "Hva er de 7 fasene?" → Oversikt + detalj om hver fase
   - "Hvordan fungerer klassifisering?" → Forklaring med eksempler
   - "Hva betyr MÅ/BØR/KAN?" → Definisjoner

3. **Svare om brukerens prosjekt (read-only)**
   - "Hva handler prosjektet mitt om?" → Les PROJECT-STATE.json, forklar scope
   - "Hvor er jeg i prosessen?" → Les currentPhase, vis status
   - "Hva var oppgavene i fase 2?" → Les SESSION-HANDOFF.md eller PROGRESS-LOG

4. **Nettsøk ved behov**
   - Hvis bruker spør "Hva er WebSockets?" → Søk på nett, finn oppdatert info
   - Presenterer søkeresultat i brukerens språknivå
   - Lenker til kilder

5. **Sokratisk veiledning for beslutninger**
   - Bruker: "Bør jeg bruke TypeScript?"
   - VEILEDER: "Hva er dine hovedkonsern? Sikkerhet, læring, eller hastighet?"
   - Bruker: "Sikkerhet"
   - VEILEDER: "Hva slags prosjekt er det — liten hobby eller enterprise?"
   - Bruker: "Liten hobby"
   - VEILEDER: "I så fall kan TypeScript være overkill, men hvis du vil lære det, er det greit. Hva tiltrekker deg ved TypeScript?"
   - [Samtale fortsetter]

**Når bruker skriver melding:**

1. Sjekk: Er bruker i veileder-modus?
2. JA → Send til VEILEDER-agent (read-only)
3. NEI → Send til aktiv fase-agent (build-modus)

**Hvordan bytte fra "Spørre" til "Bygge":**

Bruker kan når som helst si:
- "Bytt til byggemodus"
- "Start bygge"
- "OK, nå vil jeg starte"

Resultat:
- System kjører boot-sekvensen normalt (steg 1-5)
- Hvis prosjekt eksisterer: Gjenopptar fra der
- Hvis ikke: Starter nytt prosjekt
- PROGRESS-LOG oppdateres: "MODE_CHANGE: veileder → builder"

**Read-only implementasjon:**

VEILEDER-agent har tilgang til:
- ✅ Les PROJECT-STATE.json, PROGRESS-LOG.md, SESSION-HANDOFF.md
- ✅ Søk på nett
- ✅ Les fase-deliverables fra `docs/`
- ❌ Endre noen filer
- ❌ Kjøre kommandoer
- ❌ Starte agenter som endrer ting

## Eksempel

**Scenario 1: Ny bruker som vil lære**

```
Bruker: Hei, jeg er ny her

System: Velkommen til Kit CC! Hva vil du gjøre?
1. Bygge — Start eller fortsett prosjekt
2. Spørre — Få svar på spørsmål (read-only)

Bruker: Spørre

System: [VEILEDER-agent startet]
Hei! Jeg er veileder-moden. Du kan spørre meg om:
- Kit CC-prosessen
- Koding og teknologi
- Ditt prosjekt (lesing)

Hva vil du vite?

Bruker: Hvordan fungerer Kit CC?

VEILEDER: Kit CC er en prosess for å bygge programmer. Det består av 7 faser:

1. Idé — Hva skal du bygge?
2. Planlegg — Funksjoner og krav
3. Arkitektur — Sikkerhet og design
4. MVP — Første fungerende versjon
5. Funktioner — Bygg alt
6. Test — Sjekk at alt fungerer
7. Publiser — Send til verden

Hver fase tilpasses ditt prosjekts størrelse. Et hobbyprosjekt går raskt gjennom, et enterprise-system tar lengre tid.

Hva vil du vite mer om?

Bruker: Hva er fase 4 (MVP)?

VEILEDER: MVP står for "Minimum Viable Product" — det betyr minste versjon av programmet som fortsatt fungerer.

I fase 4 setter du opp grunnlaget:
- Database
- Innlogging
- En funksjon som fungerer helt

Du trenger ikke alle funksjonene — bare nok til at folk kan bruke det og gi tilbakemelding.

Eksempel: En TODO-app sin MVP er "bruker kan opprette, se, og slette oppgaver". Alt annet (sortering, filter, deling) kan komme senere.

Bruker: OK, jeg vil starte bygget nå

System: [Bytte modus til byggemodus]
[Boot-sekvensen kjører]
[AUTO-CLASSIFIER starter klassifisering]
```

**Scenario 2: Erfaren bruker som vil planlegge bedre**

```
Bruker: Spørre

System: [VEILEDER-agent startet]

Bruker: Jeg har et prosjekt som handler om ... [beskriver]

VEILEDER: Jeg skal hjelpe deg å planlegge. La meg stille noen spørsmål:

1. Hvor mange brukere forventer du?
2. Trenger du betalinger?
3. Er det GDPR-relevant?

Bruker: Svar på spørsmål...

VEILEDER: [Basert på svar] Du passer best i kategori X. Her er hva du må fokusere på...

Bruker: Skal jeg bruke TypeScript?

VEILEDER: Det avhenger av ditt team. La meg spørre:
- Har du erfaring med TypeScript?
- Hvor mye tid har du?
- Hvor kritisk er sikkerheten?

[Sokratisk dialog]

Bruker: OK, jeg er klar til å bygge nå

System: [Bytte til byggemodus, prosjektet lages]
```

## Relaterte features

- `tre-brukernivaaer.md` — VEILEDER tilpasser svar til brukernivå
- `brukerkommandoer.md` — Bruker kan skrive "Bytt til byggemodus" for å forlade veileder-modus
- VEILEDER-agent.md (Lag 2) — Full implementasjonen
- CLAUDE.md (steg 0: MODUSVALG) — Boot-sekvensen

---
*Definert i: VEILEDER-agent.md, CLAUDE.md (steg 0)*
*Lagt til: 2026-02-17*
*Kategori: Kommunikasjon*
