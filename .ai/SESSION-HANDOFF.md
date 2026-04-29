# SESSION-HANDOFF — Mikrotrening
**Lagret:** 2026-04-27
**Fase:** 7 — Live / Post-launch
**URL:** https://www.mikrotrening.no

## Hva ble gjort denne økten (sess-030)

- **Android PWA-ikon** — manifest.json byttet fra statiske PNG-er til dynamisk `/icon`-rute. Georgia-font og scaleX-transform fjernet (ikke støttet i Satori). icon.tsx oppgradert til 512px.
- **Kalender 2-ukers visning** — Feil dag-kolonner rettet. Ny funksjon `getLastTwoCalendarWeeks()` viser faktiske man-søn kalenderuker.
- **OTP 6 sifre** — Supabase satt til 6 i Dashboard. login/page.tsx oppdatert tilsvarende.
- **Onboarding installguide** — 3-stegs guide for Android og iOS vises etter notifikasjonssteg. Hoppes over om allerede installert.
- **Invitasjonslenke** — join/[code]/page.tsx viser koden tydelig med forklaring "Åpne appen og skriv inn koden under Gruppe".
- **push_enabled-logikk** — `saveAndGoToInstall(granted)` → `saveAndGoToInstall(true)` når bruker sier JA. Notification.permission-sjekken ga false på iOS/trege enheter.

## Neste steg

1. **Sett opp 3 gjenstående cron-jobber på cron-job.org**:
   - `0 6 * * *` → morning (08:00 Oslo)
   - `0 9 * * *` → midday (11:00 Oslo)
   - `0 13 * * *` → afternoon (15:00 Oslo)
   - `0 17 * * *` → evening (19:00 Oslo)
2. **Event-drevet push** — iOS-brukere uten onesignal_id får ikke milepæl-push

## Miljø
- Vercel-prosjekt: **mikrotrening**
- URL: www.mikrotrening.no
- Supabase: lnnejzxebvbtygcrknkh
- OneSignal App ID: 5940cc3a-ce56-4cce-a252-6c3f3e39a612
- CRON_SECRET: finnes i .env lokalt og i Vercel
