# Oppgave 14: Legg til referanse til alt arbeid i Handoff-mal

> **Prioritet:** MIDDELS
> **Status:** ⚪ Ikke startet
> **Estimert tid:** 15-20 minutter

---

## HVA

Oppdater handoff-mal til å inkludere seksjon for BØR-leveranser og skippede oppgaver.

## HVOR

Mal eller eksempel for SESSION-HANDOFF.md
(Kan være i /mnt/Ongoing work/Agenter/ eller i .ai/ mappe)

## ENDRING

Legg til i handoff-mal, etter MÅ-leveranser:

```markdown
## Leveranser

### MÅ-leveranser
[Eksisterende liste]

### BØR-leveranser (utført)
- [ID]: [leveranse-filnavn] — [Hva den inneholder og hvorfor viktig]
- [Liste alle BØR-leveranser]

### Skippede BØR-oppgaver (med begrunnelse)
- [ID]: [oppgavenavn] — **Skipet fordi:** [årsak]
- [Liste alle skippede BØR med begrunnelse]

**Viktig for neste fase:**
[Konsekvenser av skippede oppgaver, hvis noen]
[Hva neste fase bør være oppmerksom på]
```

## REFERANSE

Se `FASE-AGENT-FELLES-ENDRING.md` for eksempel.

## VERIFISERING

- [ ] BØR-leveranser seksjon lagt til
- [ ] Skippede BØR-oppgaver seksjon lagt til
- [ ] "Viktig for neste fase" note lagt til

---

**Status:** ⚪ → 🟢 når ferdig
**Avhenger av:** Oppgave 1
