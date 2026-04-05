# MODULREGISTER — Sommerkropp

> Opprettet i Fase 1 basert på brukerens beskrivelse.

## Moduloversikt

| ID | Navn | Beskrivelse | Prioritet | Status |
|----|------|-------------|-----------|--------|
| M-001 | Treningspakker | Opprette og administrere treningspakker (øvelser + reps) | KRITISK | ⬜ |
| M-002 | Daglig registrering | Registrere gjennomført trening med ett trykk | KRITISK | ⬜ |
| M-003 | Streak & motivasjon | Streak-teller, badges, leaderboard blant venner, daglige meldinger (av/på) | KRITISK | ⬜ |
| M-004 | Innlogging (SMS/OTP) | Enkel innlogging med mobilnummer via OTP | KRITISK | ⬜ |
| M-005 | Datalagring | Lagre treningspakker og registreringer per bruker | KRITISK | ⬜ |
| M-006 | Sosial oversikt | Aktiv/ikke aktiv-status per venn i dag (ingen detaljer) | BØR | ⬜ |
| M-007 | Statistikk | Enkel oversikt over treninghistorikk | BØR | ⬜ |
| M-008 | Påminnelser | Push-notifikasjoner for daglig trening | KAN | ⬜ |

## Avhengigheter

| Modul | Avhenger av |
|-------|-------------|
| M-001 Treningspakker | M-004 (innlogging) |
| M-002 Daglig registrering | M-001, M-004, M-005 |
| M-003 Streak & Motivasjon | M-002, M-006 (leaderboard) |
| M-004 Innlogging | — |
| M-005 Datalagring | M-004 |
| M-006 Sosial | M-004 |
| M-007 Statistikk | M-002 |
| M-008 Push-påminnelser | M-004 |
