# protocol-MODULREGISTRERING.md — SSOT for modulregistrering på tvers av faser

> **Versjon:** 1.1.0
> **Type:** Protokoll (SSOT — Single Source of Truth)
> **Lag:** 2 (Skrivebordsskuff — lastes on-demand av prosess-agenter)
> **Erstatter:** Dupliserte MODULREGISTRERING-seksjoner i 5 prosess-agenter

---

## FORMÅL

Sikrer at nye funksjoner/moduler som brukeren beskriver — **uansett hvilken fase prosjektet er i** — alltid blir fanget opp, registrert og sporet. Ingen idéer skal gå tapt.

---

## KJERNEPRINSIPP: LAGRE ALT, ALLTID

> **Brukerens input er uvurderlig og kan IKKE gjenskapes. ALLTID lagre rå input FØR noe annet.**

Når brukeren gir en beskrivelse av appen sin — kort eller lang, i hvilken som helst fase — gjelder denne prioritetsrekkefølgen:

1. **FØRST: Lagre rå input** → Append til `docs/BRUKERENS-PLAN.md` med tidsstempel og fasereferanse
2. **SÅ: Behandle** → Identifiser moduler, oppdater registre, etc.

### Rådata-lagring (alle faser)

```
NÅR BRUKER GIR FUNKSJONSBESKRIVELSE (uansett fase):
  1. UMIDDELBART — Append til docs/BRUKERENS-PLAN.md:
     ---
     ## [Fase N] — Tilleggsbeskrivelse ([dato])
     [Brukerens ORDRETT tekst — uendret, ubehandlet, komplett]
     ---
  2. Logg: ts=HH:MM event=FILE op=modified path="docs/BRUKERENS-PLAN.md" desc="Brukerinput lagret rå"
  3. DERETTER — Følg MODULREGISTRERING-prosessen for å identifisere og registrere moduler
```

> **BRUKERENS-PLAN.md er append-only for AI.** AI legger KUN til nye seksjoner med tidsstempel — redigerer ALDRI eksisterende innhold. Bruker kan redigere fritt.

> **Ingen input er for stor eller for liten.** En setning eller et 4-siders dokument — alt lagres ordrett først, prosesseres etterpå.

---

## NY FUNKSJON — MODULREGISTRERING (alle faser)

> ⚠️ **KRITISK PRINSIPP:** Brukerens funksjonsbeskrivelser er UVURDERLIGE og kan IKKE gjenskapes.
> Hver gang brukeren forklarer hva appen skal gjøre — i hvilken som helst kontekst — er dette en potensiell modul.
> **Fang opp AKTIVT, ikke bare passivt.** Ikke vent på at brukeren sier "lag en modul" — identifiser moduler fra det brukeren forteller deg.

### Primærkilde: Brukerens originalplan

> `docs/BRUKERENS-PLAN.md` er brukerens ORDRETT input — starter med AUTO-CLASSIFIER (Spørsmål 1) og utvides med nye beskrivelser gjennom alle faser.
> Denne filen er **APPEND-ONLY for AI** — AI legger til nye seksjoner med tidsstempel, men redigerer ALDRI eksisterende innhold. Bruker kan redigere fritt.
> Den er **PRIMÆRKILDEN** for å identifisere moduler, og skal leses FØR noe annet modularbeid.

### Aktiv fangst

Agenten skal AKTIVT identifisere moduler fra brukerens beskrivelser:
- **Først:** Les `docs/BRUKERENS-PLAN.md` og identifiser alle distinkte funksjoner/moduler
- Under visjonsarbeid i Fase 1 → Identifiser og registrer HVER distinkt funksjon
- Under kravarbeid i Fase 2 → Knytt brukerhistorier til eksisterende moduler, opprett nye
- Under alle andre faser → Fang opp nye idéer umiddelbart

### Registreringsprosess

> **Hvis brukeren beskriver en ny funksjon eller modul — uansett fase — gjør dette UMIDDELBART:**

```
1. Opprett MODUL-SPEC-fil:
   Sti:    docs/moduler/M-XXX-[modulnavn].md
   Mal:    Kit CC/Agenter/maler/MODUL-SPEC-MAL.md
   → Fyll inn brukerens beskrivelse ORDRETT i seksjon 2 "Brukerens visjon"
   → ALDRI omskriv eller parafrasér — brukerens egne ord er essensielle

2. Oppdater MODULREGISTER:
   Sti:    docs/FASE-2/MODULREGISTER.md
   → Legg til ny rad med status "Pending"
   → Sett MVP = "Nei" (bruker kan endre senere)
   → Merk: Hvis MODULREGISTER.md ikke finnes ennå (før Fase 2),
     opprett den med minimal struktur (header + tabellformat)

3. Bekreft tilbake:
   "📋 MODUL: opprettet docs/moduler/M-XXX-[modulnavn].md
    Modulen er lagt til i MODULREGISTER med status Pending.
    Den vil automatisk bli plukket opp i Fase 5."

4. Fortsett med gjeldende oppgave i denne fasen.
```

> **Viktig:** Ikke avbryt pågående arbeid. Lagre modulen, bekreft, og fortsett.

### Modulregister-eierskap og timing

**KRAV-agent (Fase 2) er EIER av MODULREGISTER.** Men:
- OPPSTART-agent (Fase 1) kan identifisere moduler tidlig og opprette foreløpige modul-spec-filer
- KRAV-agent sjekker ALLTID hva som allerede finnes før den oppretter noe

Når KRAV-agent starter, skal den ALLTID:
1. Lese `docs/BRUKERENS-PLAN.md` — HELE filen inkludert eventuelle tilleggsbeskrivelser fra Fase 1
2. Sjekke om det allerede finnes moduler registrert fra Fase 1
3. Lese Fase 1-leveranser (vision.md, lean-canvas.md) for funksjoner som ble beskrevet men IKKE registrert
4. Sammenligne: Er det funksjoner i BRUKERENS-PLAN.md som IKKE ble registrert som moduler? → Registrer dem nå
5. Vise bruker hva som allerede er fanget opp, og spørre om utdyping — IKKE be om gjentakelse
6. Opprette/oppdatere `docs/FASE-2/MODULREGISTER.md` som den autoritative oversikten

---

## BRUKERKOMMANDO: "Vis funksjoner" (alle faser)

Gjenkjenner: "Vis funksjoner", "Vis moduler", "Hvilke funksjoner har vi?", "Hva skal vi bygge?"

```markdown
1. Les docs/FASE-2/MODULREGISTER.md
2. Hvis filen ikke finnes → "Modulregisteret opprettes i Fase 2."
3. Hvis filen finnes → vis oversikt over alle moduler med status
4. Hvis bruker sier "Vis M-XXX" → les docs/moduler/M-XXX-[navn].md og vis detaljer
```

---

## RÅDATA-KONSISTENSSJEKK (ved fasestart)

> **Formål:** Sikre at ingen funksjonsbeskrivelser gikk tapt mellom faser.
> **Trigger:** Kjøres automatisk når en ny fase starter (etter at fase-agenten er lastet).

```
VED FASESTART (etter Lag 1-lasting):
  1. Les docs/BRUKERENS-PLAN.md — tell antall distinkte funksjoner/moduler nevnt
  2. Les docs/FASE-2/MODULREGISTER.md — tell antall registrerte moduler
  3. SAMMENLIGN:
     a. Er alle funksjoner fra BRUKERENS-PLAN.md representert i MODULREGISTER?
     b. Finnes det funksjoner bruker har beskrevet (i PROGRESS-LOG event=DECISION,
        eller i chat under forrige fase) som IKKE er i MODULREGISTER?
  4. HVIS MANGLER FUNNET:
     → Vis bruker: "⚠️ Jeg fant [N] funksjoner i planen din som ikke er registrert som moduler ennå: [liste]"
     → Spør: "Skal jeg registrere disse nå, eller er de allerede dekket av eksisterende moduler?"
     → Registrer manglende moduler via MODULREGISTRERING-prosessen
  5. HVIS ALT STEMMER:
     → Logg: ts=HH:MM event=DONE task=KONSISTENSSJEKK output="[N] moduler verifisert mot BRUKERENS-PLAN.md"
```

> **Merk:** Denne sjekken bruker maks 2-3 meldinger. Den erstatter IKKE fase-agentens egen kontekstlasting.

---

## HVEM BRUKER DENNE PROTOKOLLEN

| Fase-agent | Når |
|------------|-----|
| 1-OPPSTART-agent | Bruker nevner en idé under visjonsarbeid |
| 3-ARKITEKTUR-agent | Bruker nevner ny funksjon under arkitektur |
| 4-MVP-agent | Bruker nevner ny funksjon under MVP-bygging |
| 6-KVALITETSSIKRINGS-agent | Bruker nevner ny funksjon under testing |
| 7-PUBLISERINGS-agent | Bruker nevner ny funksjon under publisering |

**Merk:** 2-KRAV-agent og 5-ITERASJONS-agent håndterer moduler som del av sin kjerneprosess og trenger ikke denne protokollen separat.

---

*Versjon: 1.1.0*
*Opprettet: 2026-02-15*
*Oppdatert: 2026-02-19*
*SSOT for: Modulregistrering, MODUL-SPEC-oppretting, "Vis funksjoner"-kommando*
*v1.1.0: "Lagre alt alltid"-prinsipp — Brukerinput lagres rå og append-only før behandling. Modulregister-eierskap avklart.*
