# SESSION-HANDOFF — Mikrotrening
**Lagret:** 2026-09-14
**Fase:** 7 — Live / Post-launch
**URL:** https://app.mikrotrening.no

## Hva ble gjort denne sesjonen (sess-057)

### Pausemerker (streak-milepæler + "liv" ved opphold)
- Ny uendelig milepæl-rekke (7/14/30/50/75/100, deretter hver 25. dag)
- Pausemerker: hver milepæl gir ett merke, ett merke brokobler ett helt opphold uten å nullstille streaken
- Stateless algoritme i ny `src/lib/streak.ts`, konsoliderer 5 dupliserte streak-beregninger
- StreakCard: milepæl-vindu + pausemerke-rad. Toast/push/konfetti ved ny milepæl og ved bruk
- Bifangst: fikset divide-by-zero i ProgressRing for streak ≥ 100
- Commit `184756b`, deployet

### Bugfiks: pausemerker brokoblet retroaktivt (213-dagers-bugen)
- `calculateStreak()` manglet nedre grense — brokoblet gamle opphold fra før pausemerker eksisterte
- Fiks: `PAUSE_TOKENS_LAUNCH_DATE`-grense i `src/lib/streak.ts`
- Bekreftet mot ekte prod-data (bruker Arild): streak 213→42, tokens 4→3 (korrekt)
- Commit `78077de`, deployet

### Ytelse: fjernet 2 av 3 redundante auth-nettverkskall på hjemsiden
- `proxy.ts`, `layout.tsx` og `page.tsx` kalte alle `getUser()` for samme request
- Fiks: `proxy.ts` eneste sted som kaller `getUser()`, videreformidler bruker-id/e-post via `x-user-id`/`x-user-email`-headere (fjernes ved manglende auth — ikke spoofbart)
- Dette arbeidet var gjort og staget av en tidligere sesjon som ikke rakk å committe det (ikke krasj — bare uferdig bokføring). Verifisert på nytt (`tsc --noEmit`), committet (`79d703d`), pushet, deployet og smoke-testet (uinnlogget `/` → 307 til `/login`)

### Deploy
- Alle tre endringer pushet til `origin/main`, GitHub-integrasjonen deployet automatisk
- Siste: `dpl_JC25vkRu6aZWSdsvhFmGcuiQk5rx`, READY 28s, aliaset til app.mikrotrening.no
- Ingen feil i build-logg

## Utestående (uendret)
- Cron-jobber på cron-job.org (11/15/19 Oslo) — kun 08 (via vercel.json) + 18:00-test er satt
- Event-drevet push for iOS-brukere uten `onesignal_id` (log.ts)
- Markedsside på mikrotrening.no (nytt repo)
- TypeScript 7 og @types/node 26 — utsatt, ikke kritisk

## Uavklart — sjekk med bruker
- `musikk/`-mappe og `scripts/upload-musikk.mjs` ligger fortsatt untracked i arbeidstreet. Formål ikke bekreftet på tvers av flere sesjoner nå.
- Lokale endringer i `.claude/settings.local.json` (opphopede tillatelser) ikke committet — ufarlig å la ligge.
- `CLAUDE.md` har en uncommittet blokk auto-generert av `next dev` (Kit CC-rammeverket er for øvrig fortsatt ikke installert på riktige stier i dette repoet — arbeid skjer som vanlig ingeniørarbeid).
