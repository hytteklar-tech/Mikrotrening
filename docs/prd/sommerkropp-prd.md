# PRD — Sommerkropp MVP

## User Stories

Se `docs/FASE-2/user-stories.md` for fullstendig liste (US-01 til US-16).

## Akseptansekriterier

### M-001 Treningspakker
- Bruker kan opprette pakke med navn og minst én øvelse
- Øvelse har navn og reps (heltall > 0)
- Pakker vises i liste sortert etter sist brukt

### M-002 Daglig registrering
- Knapp for "Trent i dag" er tydelig på hjemskjermen
- Registrering skjer med ett trykk — ingen skjema
- Kan kun registrere én gang per dag (dobbel-klikk ignoreres)
- Registrert status vises visuelt (grønn hake el.l.)

### M-003 Streak & Motivasjon
- Streak-teller vises på hjemskjermen
- Streak økes ved registrering, resetter hvis en dag mangler
- Badge-notifikasjon vises ved milepæler: 3, 7, 14, 30 dager
- Leaderboard viser alle gruppemedlemmer sortert etter poeng (streak×2 + totale_dager)
- Daglige meldinger kan slås av/på i innstillinger

### M-004 Innlogging
- Bruker taster inn mobilnummer → mottar SMS med 6-sifret kode
- Koden er gyldig i 10 minutter
- Feil kode gir tydelig feilmelding
- Etter første innlogging: skjerm for å sette visningsnavn

### M-006 Sosial
- Bruker kan opprette gruppe og få 6-tegns invitasjonskode
- Bruker kan bli med i gruppe via kode
- Gruppevisning viser alle medlemmer med aktiv/ikke aktiv status for i dag
