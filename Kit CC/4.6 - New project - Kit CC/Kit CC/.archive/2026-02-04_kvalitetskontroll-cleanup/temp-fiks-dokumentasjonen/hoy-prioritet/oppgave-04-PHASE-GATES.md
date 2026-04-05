# Oppgave 4: BØR/KAN-dekning i PHASE-GATES quality scoring

> **Prioritet:** HØY
> **Status:** ⚪ Ikke startet
> **Estimert tid:** 30-45 minutter

---

## HVA

Legg til BØR/KAN-dekning (15%) som ny kategori i quality scoring for phase gates.

## HVOR

Fil: `/mnt/Ongoing work/Agenter/agenter/system/PHASE-GATES.md`
Seksjon: Quality scoring (trolig rundt linje 100-200)

## ENDRING

Endre existing scoring fra 40/30/30 til 35/25/25/15:

```markdown
### Utvidet quality scoring

**Artefakter (35%):** [redusert fra 40%]
  [Eksisterende scoring]

**Kvalitetssjekker (25%):** [redusert fra 30%]
  [Eksisterende scoring]

**Sikkerhet (25%):** [redusert fra 30%]
  [Eksisterende scoring]

**BØR/KAN-dekning (15%):** ← NY KATEGORI
  - Andel BØR-oppgaver som er utført ELLER skipet med begrunnelse: X%
  - Andel KAN-oppgaver som er tilbudt til bruker (hvis relevant): X%
  
  Beregning:
  - (Antall BØR utført + Antall BØR skipet med reason) / Totalt antall BØR = score
  - Eksempel: 4 BØR totalt, 3 utført, 1 skipet med reason = 100%
  - Eksempel: 4 BØR totalt, 2 utført, 2 ikke nevnt = 50%

**VIKTIG:** En skipet BØR-oppgave MED begrunnelse teller som 100%.
En skipet BØR-oppgave UTEN begrunnelse teller som 0%.
Poenget er å dokumentere beslutningen, ikke å gjøre alt.
```

## REFERANSE

Se `Fiks-dokumentasjon.md` seksjon 3.5 for detaljer.

## VERIFISERING

- [ ] BØR/KAN-dekning (15%) er lagt til
- [ ] Andre kategorier er justert til 35/25/25
- [ ] Beregningsformel er inkludert
- [ ] VIKTIG-note om at skipet MED begrunnelse = 100% er med

---

**Status:** ⚪ → 🟢 når ferdig
**Avhenger av:** Oppgave 1, 2
