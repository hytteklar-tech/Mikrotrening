# Modulregistrering

> Hver funksjon i prosjektet registreres som en modul med egen spec-fil som holder oversikt over status, avhengigheter og prioritet.

## Hva gjør den?

Modulregistrering er et system for å holde orden på alle funksjonene i prosjektet. I stedet for å ha en lang liste, har hver funksjon sin egen fil (MODUL-SPEC) som inneholder:

- **Navn og beskrivelse** — Hva funksjonen gjør
- **Status** — Pending, In Progress, Done
- **Klassifisering** — MÅ ha (MVP), BØR ha, eller KAN ha
- **Avhengigheter** — Hvilke andre funksjoner må være ferdig først
- **Akseptansekriterier** — Hva betyr det at funksjonen er "ferdig"
- **Estimat** — Omtrentlig hvor mye arbeid
- **Notat** — Spesielle hensyn eller tilpasninger

Alle modulfiler ligger i mappen `docs/moduler/`. Modulregisteret som helhet gir et komplett bilde av hele byggeprosessen.

## Hvorfor er det nyttig?

Et modulregistrering system sikrer at:
- **Oversikt.** Du vet eksakt hvilke funksjoner som skal bygges og hvor de er.
- **Prioritering.** MVP-moduler (essensielle) bygges før "nice-to-have"-moduler.
- **Avhengigheter håndteres.** Agenten vet hvilke funksjoner som må være ferdig før andre kan starte.
- **Gjenbruk.** Du kan kopiere MODUL-SPEC-mal og lage nye moduler raskt.
- **Sporbarhet.** Du kan når som helst se hva som er gjort, hva som pågår, og hva som gjenstår.

## Hvordan fungerer det?

**Under Fase 2 (Planlegg):**
Agenten lister opp alle funksjonene prosjektet skal ha. For hver funksjon opprettes en MODUL-SPEC fil:
- `M-001-Admin-panel.md` (MVP)
- `M-002-Brukerregistrering.md` (MVP)
- `M-003-Kommentarer.md` (BØR ha)
- osv.

**Under Fase 5 (Bygg funksjonene):**
Agenten leser modulregisteret i prioritert rekkefølge:
1. Alle MÅ ha-moduler først
2. Deretter BØR ha-moduler
3. Til sist KAN ha-moduler

**Avhengigheter styrer flytingen:**
Hvis modul B avhenger av modul A (f.eks. "Kommentarer" avhenger av "Admin-panel"), venter agenten til A er ferdig før B bygges.

**Status oppdateres kontinuerlig:**
- `Pending` → Agenten tar den
- `In Progress` → Agenten jobber med den
- `Done` → Agenten har ferdig, du har godkjent

## Eksempel

En MODUL-SPEC for en e-handels-app kan se slik ut:

```
# M-001: Produktkatalog

**Klassifisering:** MÅ ha (MVP)
**Status:** Done
**Prioritet:** 1

## Beskrivelse
Brukere skal kunne se liste over alle produkter med bilder, navn, pris og beskrivelse.

## Akseptansekriterier
- [ ] Produkter kan vises med bilde, navn, pris
- [ ] Brukere kan søke etter produkter
- [ ] Produkter kan sorteres etter pris og navn
- [ ] Hver produkt har detaljerside

## Avhengigheter
- Databaseskjema (MVP-setup)
- Admin-panel (for å legge til produkter)

## Estimat
Liten (2-3 timer)

## Notat
Bruk Tailwind CSS for styling. Bilder lagres i S3.
```

**Under Fase 5:**
- Agenten bygger produktkatalogen
- Tests at alle akseptansekriterier er oppfylt
- Du godkjenner → Status blir "Done"
- Neste modul starter

## Relaterte features

- **feature-loop** — Hvordan moduler bygges
- **de-7-fasene** — Modulregistrering starter i fase 2
- **tre-byggemodus** — Hvordan du styrer moduler

---
*Definert i: Kit CC/Features/Faser/modulregistrering.md*
*Lagt til: 2026-02-17*
*Kategori: Faser*
