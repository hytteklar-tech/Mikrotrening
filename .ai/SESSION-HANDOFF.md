# SESSION-HANDOFF — Mikrotrening
**Lagret:** 2026-04-22
**Fase:** 7 — Live / Post-launch
**URL:** https://www.mikrotrening.no

## Hva ble gjort denne økten (sess-024)

### OneSignal push-varsler fikset
- Roterte REST API Key i OneSignal (gammel nøkkel var ugyldig)
- Ny nøkkel (os_v2_...) lagt inn i Vercel → ONESIGNAL_REST_API_KEY
- Verifisert med /api/push/test → status 200
- Kl 19-varselet ble 3 min for sent (redeploy ikke ferdig) — kl 08 i morgen er første reelle test

### Sikkerhetsgjennomgang og -fiks
- /api/milestones/check: lagt til autentisering (401/403 uten innlogging)
- /api/exercises: limit begrenset til 1–100
- next.config.ts: security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy)

### Kontosikkerhet
- 2FA aktivert på Google, Supabase og Vercel

### Install-banner forbedret
- Vises nå ved 3, 7 og 10 registreringer (tidligere: hver 7.)
- Hvert tidspunkt huskes separat i localStorage
- iPhone: viser Safari deleknapp-instruksjoner
- Android: viser "Installer appen"-knapp

### Ingrid onboardet
- User-rad slettet fra users-tabellen → hun kjører onboarding på nytt

## Ventende
- Sjekk iPhone kl 08 i morgen — kom push-varselet?
- Øvelsesbibliotek i treningspakke-editor (avventer GIF-pakker)
- Supabase-migrasjoner 011, 012, 013 — sjekk om kjørt i prod

## Miljø
- Vercel: www.mikrotrening.no
- Supabase: lnnejzxebvbtygcrknkh
- OneSignal App ID: 5940cc3a-ce56-4cce-a252-6c3f3e39a612
