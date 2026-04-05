# Oppgave 13: Legg til BØR/KAN-seksjoner i PHASE-SUMMARY mal

> **Prioritet:** MIDDELS
> **Status:** ⚪ Ikke startet
> **Estimert tid:** 20-30 minutter

---

## HVA

Oppdater malen for PHASE-SUMMARY.md til å inkludere BØR/KAN-seksjoner.

## HVOR

Mal eller eksempel-fil for PHASE-SUMMARY.md
(Kan være i /mnt/Ongoing work/Agenter/maler/ eller i fase-dokumentasjon)

## ENDRING

Legg til følgende seksjon i PHASE-SUMMARY malen:

```markdown
---

## BØR/KAN-oppgaver

### Utførte BØR-oppgaver (utover MÅ)
- [ID]: [Oppgavenavn] — [Kort beskrivelse av hva som ble levert]
- [Liste alle BØR-oppgaver som ble utført]

### Skippede BØR-oppgaver
- [ID]: [Oppgavenavn] — **Begrunnelse:** [Konkret årsak til hvorfor den ble skipet]
- [Liste alle BØR-oppgaver som ble skipet med begrunnelse]

### Valgte KAN-oppgaver
- [ID]: [Oppgavenavn] — [Kort beskrivelse]
- [Liste KAN-oppgaver brukeren valgte å inkludere]

**Total BØR-dekning:** X av Y utført eller skipet med begrunnelse (Z%)

---
```

## REFERANSE

Se `FASE-AGENT-FELLES-ENDRING.md` for eksempel.

## VERIFISERING

- [ ] BØR/KAN-seksjoner er lagt til i mal
- [ ] Tre underseksjoner: Utførte BØR, Skippede BØR, Valgte KAN
- [ ] Total BØR-dekning-linje er med

---

**Status:** ⚪ → 🟢 når ferdig
**Avhenger av:** Oppgave 1
