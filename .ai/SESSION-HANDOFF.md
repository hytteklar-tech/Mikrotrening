# SESSION-HANDOFF — Mikrotrening
**Lagret:** 2026-04-22
**Fase:** 7 — Live / Post-launch
**URL:** https://www.mikrotrening.no

## Hva ble gjort denne økten (sess-023)

### Onboarding redesignet (4 steg)
- Pre-registrerer gårsdagen → nye brukere ankommer med streak = 1
- Steg 3: hopp-knapp for de som ikke vil ha varsler
- Steg 4: viser startknapp først etter at push er aktivert

### Mikro 30 standardpakke
- Migration 013: `handle_new_user`-trigger oppretter "Mikro 30" + Knebøy-øvelse automatisk

### Dashboard ny bruker-UX
- `isNewUser` flagg: velkomstkort med oransje aksent i stedet for streak
- StreakCard: "Du er i gang! 🚀" for nye brukere
- Install-banner vises ved 7/14/21 registreringer (ikke ved første besøk)
- `is_pwa` logges til DB (migration 012)

### Kalender
- Komprimert 2-ukersvisning som standard, knapp utvider til full måned
- Rød farge fjernet — alle utrenede dager er grå

### Gruppe-banner på hjemskjerm
- Avatarer med grønn/grå farge basert på om de trente i dag
- Hentes server-side med dagens logger for alle gruppemedlemmer

### Daglig hilsemelding
- 13 roterende meldinger, ny per dag, aldri samme som i går, låst i localStorage

### Push-varsler
- Streak-milepæler utvidet: 7/14/30/45/60/90/120/180/270/365 dager
- Rate-limit: maks 5 push per bruker per dag (migration 011)
- **Cron-fix**: Hobby-plan tillater bare 2 cron-jobs — 5 entries slått til 1: `0 6,9,13,17 * * *`

## Ventende
- Sjekk Vercel Logs etter kl 15 eller 19 norsk tid — verifiser at push faktisk sendes
- Supabase-migrasjoner 011, 012, 013 må kjøres hvis ikke allerede gjort

## Neste sesjon
- Bekreft at push-cron fungerer
- Vurder å bygge "velg øvelser fra bibliotek" inn i treningspakke-editoren

## Miljø
- Vercel: www.mikrotrening.no
- Supabase: lnnejzxebvbtygcrknkh
- OneSignal App ID: 5940cc3a-ce56-4cce-a252-6c3f3e39a612
