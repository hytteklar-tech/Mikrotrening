# Tech-Stack — Sommerkropp

## Beslutning: Next.js PWA + Supabase

| Lag | Teknologi | Begrunnelse |
|-----|-----------|-------------|
| Frontend | Next.js 14 (App Router) | React-basert, PWA-støtte, god DX |
| Styling | Tailwind CSS | Raskt, mobil-first |
| Backend | Supabase | Auth + database + realtime i én tjeneste |
| Auth | Supabase Auth + SMS OTP | Innebygd SMS-støtte via Twilio |
| Database | PostgreSQL (via Supabase) | Relasjonsdatabase, godt egnet for datamodellen |
| Hosting | Vercel | Gratis tier, automatisk deploy fra git |
| Push-varsler | Web Push API (via next-pwa) | PWA-native, ingen app store nødvendig |

## PWA-konfigurasjon
- Installérbar på iOS og Android via "Legg til på hjemskjerm"
- Offline-støtte for visning av treningspakker (read-only cache)
- Push-notifikasjoner via Service Worker

## Repo-struktur (Next.js App Router)
```
src/
  app/
    (auth)/login/        → Innlogging med mobilnummer
    (app)/dashboard/     → Hjemskjerm med streak og dagens trening
    (app)/workouts/      → Treningspakker
    (app)/leaderboard/   → Poeng og rangering
    (app)/group/         → Gruppe og sosial
    (app)/settings/      → Innstillinger (notifikasjoner, profil)
  components/
  lib/
    supabase/            → Supabase-klient og queries
```
