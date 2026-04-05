# De 7 fasene

> Kit CC bruker en 7-fase prosess som tilpasser seg automatisk til prosjektets størrelse og kompleksitet.

## Hva gjør den?

Kit CC deler byggeprosessen i 7 tydelige faser. Hver fase har sine egne oppgaver, checkpoints og leverable. Systemet tilpasser hvor grundig hver fase skal være — et lite hobbyprosjekt går fort gjennom, mens et kritisk enterprise-system får mye mer detaljert behandling. Prosessen er sekvensiell; du kan ikke hoppe til neste fase før forrige er godkjent av fase-gatene.

De 7 fasene er:
1. **Idé og visjon** — Hva skal du bygge?
2. **Planlegg** — Funksjoner, krav og sikkerhet
3. **Arkitektur og sikkerhet** — Hvordan bygges det trygt?
4. **MVP** — Sett opp prosjektet og få første fungerende versjon
5. **Bygg funksjonene** — Feature-loop som gjentas til alt er ferdig
6. **Test, sikkerhet og kvalitetssjekk** — Fungerer alt?
7. **Publiser og vedlikehold** — Ut i verden og drift

## Hvorfor er det nyttig?

En klar fasestruktur gjør det enkelt å vite hvor du er og hva som skal gjøres neste. Det forhindrer at du hopper rundt tilfeldig, og sikrer at viktige steg (som sikkerhet og testing) ikke bli glemt. Fordi prosessen tilpasser seg automatisk, slipper du unødvendig grundighet på små prosjekter, mens store prosjekter får den oppmerksomheten de trenger.

## Hvordan fungerer det?

**Klassifisering bestemmer tempo:**
Når du starter et nytt prosjekt, klassifiseres det automatisk basert på størrelse, sikkerhetskrav og kompleksitet (score 7–28). En lille hobby-app får "enkelt hobbyprosjekt"-behandling, mens et finansielt system får "stort, kritisk system"-behandling. Denne klassifiseringen påvirker hvor mange detaljsjekker hver fase gjennomgår.

**Fase-gater sikrer kvalitet:**
Før du går videre til neste fase, må gjeldende fase bestå fase-gatene — kvalitetskontroller som sikrer at all nødvendig arbeid er ferdig. Du kan ikke hoppa over gater. Hvis noe ikke er klart, får du beskjed om hva som mangler.

**Fase-agenter koordinerer arbeid:**
Hver fase har sin egen agent (1-OPPSTART-agent, 2-KRAV-agent, osv.). Agenten styrer oppgavene for den fasen og rapporterer når fasen er ferdig.

## Eksempel

Du starter et nytt e-handels-system:
- **Fase 1:** Du forklarer hva systemet skal gjøre. Agenten noterer ned visjonen.
- **Fase 2:** Agenten lister opp alle funksjonene du trenger og sjekker sikkerhetskrav (betaling, brukerkonto, osv.).
- **Fase 3:** Agenten tegner opp systemarkitekturen og sikringsmekanismene.
- **Fase 4:** Agenten setter opp Git, databasen og grunnstrukturen. Første fungerende versjon.
- **Fase 5:** Agenten bygger én funksjon av gangen (produktkatalog, handlekurv, betaling). Du godkjenner hver.
- **Fase 6:** Agenten kjører tester, sikkerhetstester og kvalitetskontroller.
- **Fase 7:** Agenten pusher koden til produksjon og setter opp vedlikehold.

## Relaterte features

- **feature-loop** — Hvordan fase 5 fungerer
- **modulregistrering** — Hvordan funksjoner organiseres
- **fase-gater** — Kvalitetskontroller mellom faser
- **tre-byggemodus** — Hvordan du styrer oppgavene

---
*Definert i: Kit CC/Features/Faser/de-7-fasene.md*
*Lagt til: 2026-02-17*
*Kategori: Faser*
