# Sikkerhetskrav — Sommerkropp

## Autentisering
- Innlogging via mobilnummer + OTP (Supabase Auth + SMS)
- OTP-kode utløper etter 10 minutter
- Maks 5 forsøk per mobilnummer per 15 minutter (rate limiting via Supabase)
- JWT-tokens håndteres av Supabase — ingen egne tokens

## Autorisering
- Bruker kan kun se og endre egne treningspakker og registreringer
- Bruker kan kun se gruppemedlemmer i grupper de er med i
- Row Level Security (RLS) aktiveres på alle Supabase-tabeller
- Ingen admin-grensesnitt i MVP

## Datahåndtering
- Mobilnummer lagres kun i Supabase Auth — ikke i egne tabeller
- Ingen logging av sensitiv brukerdata
- Supabase håndterer kryptering i hvile (AES-256) og i transport (TLS)
- Minimalt datagrunnlag: kun det som trengs for funksjonaliteten
- Bruker kan slette konto (GDPR-rett) — implementeres i Fase 6
