# Arkitektur — Sommerkropp

## Stack
- **Frontend:** Next.js 14 App Router + Tailwind CSS
- **Backend/DB:** Supabase (PostgreSQL + Auth + Realtime)
- **Hosting:** Vercel
- **PWA:** next-pwa + Web Push API

## Mappestruktur
```
src/
  app/
    (auth)/login/          → SMS OTP innlogging
    (app)/page.tsx         → Dashboard
    (app)/workouts/        → Treningspakker
    (app)/leaderboard/     → Poeng og rangering
    (app)/group/           → Gruppe og sosial
    (app)/settings/        → Innstillinger
  components/ui/           → Gjenbrukbare komponenter
  components/features/     → Feature-komponenter
  lib/supabase/            → Klienter og queries
supabase/migrations/       → SQL-migrasjoner
public/manifest.json       → PWA manifest
```

## Auth-flyt
1. Middleware sjekker session → redirect /login hvis ikke innlogget
2. Mobilnummer → SMS OTP via Supabase Auth
3. Verifiser kode → session opprettes
4. Første gang → /onboarding (sett visningsnavn)
5. Deretter → /dashboard

## Sikkerhet
- RLS aktivert på alle tabeller
- Bruker ser kun egne pakker og registreringer
- Gruppemedlemmer ser hverandres aktiv/ikke aktiv-status via RLS policy
- JWT håndteres av Supabase

## Godkjent av bruker: ✅
