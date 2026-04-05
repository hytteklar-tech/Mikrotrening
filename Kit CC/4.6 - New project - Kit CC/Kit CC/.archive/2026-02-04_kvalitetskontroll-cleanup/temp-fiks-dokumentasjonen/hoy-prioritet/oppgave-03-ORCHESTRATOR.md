# Oppgave 3: Utvid handoff-validering i ORCHESTRATOR

> **Prioritet:** HØY
> **Status:** ⚪ Ikke startet
> **Estimert tid:** 30-45 minutter

---

## HVA

Legg til BØR/KAN-validering i ORCHESTRATOR sin handoff-protokoll slik at den sjekker at alle BØR-oppgaver er enten fullført eller skipet med begrunnelse før fase-overgang.

## HVOR

Fil: `/mnt/Ongoing work/Agenter/agenter/system/ORCHESTRATOR.md`
Seksjon: Handoff-validering (trolig rundt linje 160-200)

## ENDRING

Legg til i handoff-validering:

```markdown
### Handoff-validering (utvidet med BØR/KAN-sjekk)

Før en fase markeres som KOMPLETT, valider:

1. [Eksisterende] Alle MÅ-oppgaver er fullført eller blokkert
2. **[NY]** Alle BØR-oppgaver er enten i completedSteps eller skippedSteps
3. **[NY]** Alle skippedSteps har reason-felt (begrunnelse)
4. **[NY]** completedSteps inneholder ALLE utførte oppgaver (MÅ + BØR + KAN)
5. [Eksisterende] Phase gate quality score er beregnet

Hvis BØR/KAN-validering feiler:
- Stopp handoff
- Spør agent om manglende beslutninger
- Få agent til å oppdatere PROJECT-STATE.json
- Deretter fortsett handoff
```

## REFERANSE

Se `Fiks-dokumentasjon.md` seksjon 3.3 for detaljer.
Se oppgave 1 (SYSTEM-PROTOCOL) for completedSteps/skippedSteps struktur.

## VERIFISERING

- [ ] Ny handoff-validering er lagt til
- [ ] Steg 2-4 (NY) er tydelig markert
- [ ] Feilhåndtering for BØR/KAN-validering er beskrevet

---

**Status:** ⚪ → 🟢 når ferdig
**Avhenger av:** Oppgave 1, 2
