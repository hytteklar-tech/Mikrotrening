# Fase-gates

> Mellom hver fase kjøres automatisk kvalitetsvalidering for å sikre at alle obligatoriske krav er oppfylt før arbeidet fortsetter.

## Hva gjør den?

Fase-gates er automatiske kontrollpunkter som Kit CC kjører når du er klar til å gå fra en fase til den neste. Systemet sjekker to lag av krav:

**Lag 1 — Binær MÅ-sjekk:** Alle obligatoriske leveranser for fasen må finnes. Hvis en MÅ-leveranse mangler, kan du ikke gå videre — du må fullføre den først. Eksempler på MÅ-krav: "Arkitektur-dokument må finnes", "Sikkerhetsgjennomgang må være utført", "Alle MVP-funksjoner må være kodet".

**Lag 2 — Kvalitets-score:** Selv om alle MÅ-krav er oppfylt, scorer systemet kvaliteten på arbeidet (0-100%):
- **Artifacts (40%):** Finnes alle nødvendige dokumenter, kode og tester?
- **Quality checks (30%):** Er koden testet, dokumentert og fri for åpenbare bugs?
- **Security (30%):** Har vi sjekket for sikkerhetsproblemer relevant for denne fasen?

Hvis kvalitets-scoren er under 70%, varsler systemet at noe kan trenge mer arbeid — men du kan fortsatt gå videre hvis du godkjenner det med begrunnelse.

## Hvorfor er det nyttig?

Fase-gates sikrer at:
- **Ingen uferdig arbeid sniker seg videre.** Det er lett å tro at noe er ferdig når det ikke er det. Gate-ene tvinger deg til å sjekke faktisk.
- **Kvalitet skjer hele veien.** I stedet for å teste alt på slutten, tester vi etterhvert som vi bygger.
- **Du har kontroll.** Hvis et krav ikke passer ditt prosjekt, kan du overstyre gaten med begrunnelse — systemet logger det og husker hvorfor.
- **Ingen overraskelser senere.** En arkitektur-feil som kunne ha kostet 2 uker arbeid senere blir tatt opp når det er enkelt å fikse det.

## Hvordan fungerer det?

**Når er du klar til fase-overgang?**
Du signaliserer at en fase er ferdig. Kit CC leser `.ai/PROJECT-STATE.json` og finner hvilken fase du er i.

**Lag 1-validering kjøres først:**
Systemet sjekker `completedTasks[]` (oppgaver som er fullført) og `deliverables[]` (leveranser generert). For hver obligatorisk MÅ-leveranse:
- Hvis den finnes → ✅ OK
- Hvis den mangler → ❌ STOPP — Agenten forteller deg hvilken leveranse som mangler og hva den skal inneholde

**Hvis Lag 1 går bra, kjøres Lag 2:**
Systemet scorer leveransene. Scoren lagres i `gateScore` i PROJECT-STATE.json. Hvis scoren er:
- 85%+ → ✅ Grønt lys, gå videre
- 70-84% → 🟡 Gult lys, varsling om at noe kunne vært bedre, men du kan gå videre
- <70% → 🔴 Rødt lys, du bør fikse ting før du fortsetter, men kan overstyre

**Override-mekanisme (for profesjonelle):**
Hvis du vet bedre enn systemet, kan du overstyre en gate:
```
"Oversty gate [Fase-N]: [årsak]"
```

Systemet lagrer overridden i `gateOverrides[]` med fase, årsak og tidsstempel. Du kan ikke snyte — systemet husker at du gjorde det og varsler senere hvis det ble et problem.

**Regresjonsovervåking:**
Når du går til neste fase, sjekker systemet at du ikke har brutt noe som ble godkjent i tidligere faser. Hvis du endrer arkitekturen i Fase 5 på en måte som bryter sikkerhetskravene fra Fase 3, varsler systemet deg med "Advarsel: Endring i [modul] bryter Fase 3-krav: [detalj]". Du kan godta endringen med begrunnelse, eller rulle tilbake.

## Eksempel

Du bygger en e-commerce-app. Du har fullført Fase 4 (MVP). Her er hva som skjer:

**Du sier:** "Jeg er ferdig med Fase 4"

**Kit CC kjører gate-sjekk:**
- Lag 1 (MÅ): Sjekker at disse finnes:
  - ✅ Prosjekt er opprettet
  - ✅ Databaseskjema er definert
  - ✅ API-endepunkter for MVP-funksjoner finnes
  - ✅ Frontend-komponenter for MVP finnes
- **Lag 1 resultat:** Alle MÅ-krav oppfylt ✅

- Lag 2 (Kvalitet):
  - Artifacts: 35/40 (6 av 7 komponenter testet)
  - Quality: 28/30 (2 småbugs logget, men ikke kritisk)
  - Security: 28/30 (sikkerhetsjekk gjorde, 1 liten bekymring)
  - **Samlet: 91% 🟢**

**Resultat:** "MVP er klar for Fase 5. Kvalitet er god (91%). Du kan starte feature-loopen når du er klar."

---

Alternativt scenario hvor noe mangler:

**Du sier:** "Jeg er ferdig med Fase 4"

**Kit CC sjekker Lag 1:**
- ✅ Prosjekt er opprettet
- ❌ **Databaseskjema finnes IKKE**
- ✅ API-endepunkter finnes
- ✅ Frontend finnes

**Resultat:** "Fase-gate blokkert. Databaseskjema mangler. Dette må være på plass før du kan gå til Fase 5. Databaseskjemaet skal definere tabeller for [produkter, ordrer, brukere]."

## Relaterte features

- **de-7-fasene** — Fase-gates kjøres mellom alle 7 fasene
- **oppgavekompleksitet** — Kompleksitet påvirker kvalitetskravene
- **søk-foer-mangel** — Gate-validering bruker denne for å sjekke at filer faktisk mangler

---

*Definert i: Kit CC/Agenter/agenter/system/agent-PHASE-GATES.md*
*Lagt til: 2026-02-17*
*Kategori: Kvalitetssikring*
