# PROGRESS-LOG — Sommerkropp

---

## 2026-04-22 | P7 | SESSION_START
Sesjon 022. Fokus: OneSignal push-varsler.

## 2026-04-22 | P7 | DONE — Push-infrastruktur fikset
- middleware.ts gjenskapt (proxy.ts var ikke koblet inn)
- OneSignalSDKWorker.js og manifest.json lagt til i matcher-unntak
- OneSignal site URL endret til www.mikrotrening.no
- NEXT_PUBLIC_ONESIGNAL_APP_ID lagt inn i Vercel
- Chrome/Android: push fungerer via OneSignal

## 2026-04-22 | P7 | DONE — iOS native Web Push
- OneSignal optIn() fungerer ikke på iOS 26 — omgått med native PushManager
- Egne VAPID-nøkler generert og lagt inn i Vercel
- push-sw.js: separat service worker for iOS push-abonnement
- web-push bibliotek for server-side sending
- Cron-jobben sender til begge (onesignal_id + push_subscription)
- push_subscription kolonne lagt til i users-tabellen

## 2026-04-22 | P7 | PENDING — Streak og gruppe-varsler mangler iOS-støtte
- log.ts henter kun onesignal_id — iOS-brukere får ikke streak- eller gruppevarsler
- Bruker vil tenke på push-strategi før vi bygger videre

---

## 2026-04-22 | P7 | SESSION_START
Sesjon 023. Fokus: post-launch UX-forbedringer og push-fiks.

## 2026-04-22 | P7 | DONE — Streak-milepæler utvidet
- Lagt til 7, 14, 30, 45, 60, 90, 120, 180, 270, 365 dager
- Push-rate-limit: maks 5 varsler per dag per bruker (migration 011)
- Milepælvarsler sender til både onesignal_id og push_subscription

## 2026-04-22 | P7 | DONE — Onboarding redesignet (4 steg)
- Steg 5 (install-prompt) fjernet
- Steg 3: "Jeg vil ikke ha varsler" hopp-knapp
- Steg 4: notificationsDone-state — startknapp vises etter push-aktivering
- saveAndGoToInstall: finner "Mikro 30", logger gårsdagen som pre-registrering

## 2026-04-22 | P7 | DONE — Ny bruker-opplevelse på dashboard
- is_pwa logges til DB når åpnet i standalone-modus (migration 012)
- Install-banner vises ved 7/14/21 registreringer (ikke ved første besøk)
- isNewUser-flagg: viser velkomstkort med oransje aksent i stedet for streak
- StreakCard: "Du er i gang! 🚀" for nye brukere, ingen badge-seksjon

## 2026-04-22 | P7 | DONE — Mikro 30 standardpakke for nye brukere
- Migration 013: handle_new_user-trigger oppretter "Mikro 30" + Knebøy-øvelse
- Første dag pre-registrert i onboarding → streak = 1 ved ankomst

## 2026-04-22 | P7 | DONE — Kalender redesignet
- Komprimert 2-ukersvisning som standard, "Vis hele måneden ↓" utvider
- Rød farge fjernet fra utrenede dager — alle grå (samme som fremtid)
- Grønn (1 trening) og oransje (2+ treninger)

## 2026-04-22 | P7 | DONE — Gruppe-banner på hjemskjerm
- GroupBanner: avatarer (grønn=trent, grå=ikke), antall av totalt, lenke til /gruppe
- Hentes server-side i page.tsx med dagens logger for alle gruppemedlemmer

## 2026-04-22 | P7 | DONE — Rullerende daglig hilsemelding
- DailyMessage: 13 meldinger, ny per dag, aldri samme som i går, låst i localStorage

## 2026-04-22 | P7 | DONE — Cron-fix: Hobby-plan støtter maks 2 cron-jobs
- 5 separate cron-entries slått sammen til 1: "0 6,9,13,17 * * *"
- Dekker norsk kl 08, 11, 15, 19

## 2026-04-22 | P7 | SESSION_END

---

## 2026-04-20 | P7 | SESSION_START
Sesjon 021 startet. Fase 7 (post-launch). Fokus: øvelsesbibliotek.

## 2026-04-20 | P7 | DONE — Øvelsesbibliotek: GIF → MP4
- Fant 10 ZIP-filer i public/exercises/ + sample-set.zip (barbell bench press)
- Konverterte alle 11 GIF-er til MP4 (h264, 360x360, 25fps) med ffmpeg
- Fjernet alle JPG, GIF og ZIP fra exercises-mappen
- 14 MP4-filer totalt i public/exercises/

## 2026-04-20 | P7 | DONE — exercises.ts oppdatert
- Fjernet 23 øvelser uten MP4-video
- La til 11 nye øvelser med norsk navn, beskrivelse og muskelgruppe
- Nye muskelgrupper: mage, rygg, hofter, legger

## 2026-04-20 | P7 | DONE — Test-exercises: valg-funksjon + hastighet
- Velg-modus med avkrysning på kort og valg-bar nederst
- Standard hastighet endret fra 0.1x til 1x
- Muskelgruppe-filter oppdatert med nye grupper

## 2026-04-20 | P7 | DECISION — Neste steg øvelsesbibliotek
- Alternativ B valgt: velg øvelser fra biblioteket inne i treningspakke-redigering
- Avventer flere GIF-pakker fra bruker før løsningen bygges ferdig
- Mangler øvelser for: ben, skuldre, armer, mer rygg

## 2026-04-20 | P7 | SESSION_END
Sesjon avsluttet. State lagret i SESSION-HANDOFF.md.

---

## 2026-04-01T07:00:00Z | CLA | SESSION_START
Bootstrap fullført. Nytt prosjekt opprettet.

## 2026-04-01T07:00:00Z | CLA | CLASSIFICATION
Intensitetsnivå: MINIMAL (7/28, confidence 91%). Bruker godkjent.

## 2026-04-01T07:00:00Z | CLA | BUILDER_MODE
Byggemodus satt til: samarbeid

## 2026-04-01T07:00:00Z | CLA | FILES_CREATED
Opprettet: .ai/PROJECT-STATE.json, .ai/MISSION-BRIEFING-FASE-1.md, .ai/PROGRESS-LOG.md

## 2026-04-01T07:00:00Z | P1 | PHASE_START
Fase 1 (Idé og visjon) startet.

ts=07:10 event=DECISION what="Re-klassifisering til FORENKLET" reason="Bruker ønsker innlogging (mobilnummer) og datalagring"
ts=07:10 event=FILE op=modified path=".ai/PROJECT-STATE.json" desc="Re-klassifisering: minimal→forenklet, score 7→10"
ts=07:10 event=FILE op=created path="docs/FASE-1/vision.md" desc="Prosjektvisjon og problemdefinisjon"
ts=07:10 event=FILE op=created path="docs/FASE-2/MODULREGISTER.md" desc="8 moduler identifisert fra brukerens beskrivelse"
ts=07:10 event=DONE task="OPP-01" output="docs/FASE-1/vision.md"

ts=07:20 event=DECISION what="Leaderboard: streak + totale dager (poeng-system)" reason="Bruker valgte C"
ts=07:20 event=DECISION what="Grupper kobles via invitasjonskode/lenke" reason="Bruker valgte A"
ts=07:20 event=FILE op=created path="docs/moduler/M-003-streak-motivasjon.md" desc="Modul-spec oppdatert med brukervalg"
ts=07:20 event=FILE op=created path="docs/moduler/M-006-sosial-oversikt.md" desc="Modul-spec oppdatert med brukervalg"
ts=07:20 event=FILE op=created path="docs/FASE-1/personas.md" desc="3 personas definert"
ts=07:20 event=FILE op=created path="docs/FASE-1/go-no-go-assessment.md" desc="Go-vurdering: GO"
ts=07:20 event=DONE task="OPP-03" output="docs/FASE-1/personas.md"
ts=07:20 event=DONE task="OPP-19" output="docs/FASE-1/go-no-go-assessment.md"

ts=07:25 event=DONE task="PHASE-GATE-1" output="PASS"
ts=07:25 event=FILE op=created path="docs/prosjektbeskrivelse.md" desc="Gate-krav: Problem/Verdiforslag/Målgruppe"
ts=07:25 event=FILE op=created path="docs/risikoregister.md" desc="10 risikoer med tiltak"
ts=07:25 event=DONE task="FASE-1" output="completed"
ts=07:25 event=START task="FASE-2" desc="Planlegging: tech-stack, MVP-scope, user stories, datamodell"

ts=07:35 event=DECISION what="Tech-stack: Next.js PWA + Supabase + Vercel" reason="Bruker valgte A"
ts=07:35 event=FILE op=created path="docs/FASE-2/tech-stack.md" desc="Full tech-stack beslutning"
ts=07:35 event=FILE op=created path="docs/FASE-2/datamodell.md" desc="PostgreSQL-datamodell: 6 tabeller"
ts=07:35 event=FILE op=created path="docs/FASE-2/mvp-scope.md" desc="MVP: 6 moduler inn, 2 utsatt"
ts=07:35 event=FILE op=created path="docs/FASE-2/user-stories.md" desc="16 user stories for MVP"
ts=07:35 event=DONE task="KR-01" output="tech-stack.md"
ts=07:35 event=DONE task="KR-02" output="mvp-scope.md"
ts=07:35 event=DONE task="KR-03" output="user-stories.md + datamodell.md"

ts=07:45 event=DONE task="PHASE-GATE-2" output="PASS"
ts=07:45 event=DONE task="FASE-3" output="docs/FASE-3/arkitektur.md"
ts=07:45 event=DONE task="PHASE-GATE-3" output="PASS"
ts=07:45 event=START task="FASE-4" desc="MVP-bygging: Next.js + Supabase"

ts=08:00 event=FILE op=created path="src/lib/supabase/client.ts" desc="Browser Supabase-klient"
ts=08:00 event=FILE op=created path="src/lib/supabase/server.ts" desc="Server Supabase-klient"
ts=08:00 event=FILE op=created path="src/middleware.ts" desc="Auth-middleware"
ts=08:00 event=FILE op=created path="supabase/migrations/001_initial_schema.sql" desc="SQL-migrasjoner + RLS"
ts=08:00 event=FILE op=created path="src/app/(auth)/login/page.tsx" desc="Innlogging SMS OTP"
ts=08:00 event=FILE op=created path="src/app/(app)/page.tsx" desc="Dashboard med streak"
ts=08:00 event=FILE op=created path="src/app/(app)/workouts/page.tsx" desc="Treningspakker"
ts=08:00 event=FILE op=created path="src/app/(app)/leaderboard/page.tsx" desc="Leaderboard"
ts=08:00 event=FILE op=created path="src/app/(app)/group/page.tsx" desc="Gruppe og sosial"
ts=08:00 event=FILE op=created path="src/app/(app)/settings/page.tsx" desc="Innstillinger"
ts=08:00 event=DONE task="MVP-BUILD" output="Build OK — alle sider kompilerer"

## 2026-04-02T00:00:00Z | CLA | SESSION_START
Gjenopptatt sesjon. PROJECT-STATE versjon 3.5.0. Fase 4 in_progress.

ts=00:01 event=START task="MONITOR-PROXY" desc="Kobler Monitor til dev-server"
ts=00:01 event=DONE task="MONITOR-PROXY" output="Kit CC Monitor proxy-modus aktiv: http://localhost:4864 → port 3000"

ts=00:10 event=START task="MVP-DB" desc="Kjøre SQL-migrasjoner mot Supabase"
ts=00:10 event=DONE task="MVP-DB" output="001_initial_schema.sql kjørt — 6 tabeller + RLS + trigger opprettet"

## 2026-04-02 | CLA | AUTH_CHANGE
ts=sesjon event=DECISION what="Bytt innlogging: SMS OTP → e-post magic link" reason="Bruker har ikke Twilio satt opp"
ts=sesjon event=FILE op=modified path="src/app/(auth)/login/page.tsx" desc="Byttet til email magic link med signInWithOtp({email})"
ts=sesjon event=FILE op=created path="src/app/auth/callback/route.ts" desc="Auth callback for magic link code exchange"
ts=sesjon event=FILE op=modified path="src/middleware.ts" desc="Tillat /auth/callback uten innlogging"
ts=sesjon event=DONE task="AUTH-EMAIL" output="E-post magic link implementert"

## 2026-04-03 | CLA | CALENDAR_FEATURE
ts=08:00 event=FILE op=created path="src/components/features/CalendarView.tsx" desc="Kalender med grønn/rød/grå per dag, måneds-navigasjon, datovelger"
ts=08:00 event=FILE op=modified path="src/components/features/TrainTodayButton.tsx" desc="Pil-navigasjon erstattet med CalendarView"
ts=08:00 event=FILE op=modified path="src/app/(app)/page.tsx" desc="Henter alle loggedDates, fjernet todayLog-kall, sender loggedDates til TrainTodayButton"
ts=08:00 event=DONE task="KALENDER" output="CalendarView integrert — grønn=trent, rød=ikke trent, grå=fremtid"

## 2026-04-03 | CLA | STREAK_FIX + STATS
ts=08:30 event=FILE op=created path="src/components/features/DashboardClient.tsx" desc="Client-wrapper som eier loggedDates-state og beregner streak client-side"
ts=08:30 event=FILE op=modified path="src/components/features/TrainTodayButton.tsx" desc="Fjernet intern state — bruker onLogChange callback fra DashboardClient"
ts=08:30 event=FILE op=modified path="src/app/(app)/page.tsx" desc="Bruker DashboardClient, henter loggedDates + packages via Promise.all"
ts=08:30 event=FILE op=created path="src/components/features/StatsView.tsx" desc="Statistikk-komponent: tabs uke/mnd/år, CSS-grafer, streak, totaler"
ts=08:30 event=FILE op=created path="src/app/(app)/statistikk/page.tsx" desc="Statistikk-side: henter logs med reps via join, beregner streaks"
ts=08:30 event=FILE op=modified path="src/components/ui/BottomNav.tsx" desc="La til Statistikk (📊) som nytt menypunkt"
ts=08:30 event=DONE task="STREAK-FIX" output="Streak oppdateres nå optimistisk uten server-roundtrip"
ts=08:30 event=DONE task="STATS-PAGE" output="/statistikk med uke/måned/år-tabs og grafer"

## 2026-04-16 | CLA | SESSION_START
Sesjon 015 startet. Gjenopptatt fra fase 7 (live).

## 2026-04-16 | CLA | BUG_FIX
task="bug-timer-sleep" — Tidtaker stoppet ved skjermhvile. Byttet til Date.now()-diff.

## 2026-04-16 | CLA | FEATURE
task="feature-ring-timer" — SVG ring-tidtaker med oransje/hvit overtidsring og snitt fra DB.

## 2026-04-16 | CLA | BUG_FIX
task="bug-kalender-dato" — Kalender viste gaarsdagens dato. useEffect korrigerer SSR timezone-mismatch.

## 2026-04-16 | CLA | PERF
task="perf-responstid" — staleTimes 30s, parallell profil-fetch, statistikk -> serverkomponent.

## 2026-04-16 | CLA | IMPROVEMENT
task="stats-forbedringer" — Tre kolonner, totaltid, periode i overskrift.

## 2026-04-16 | CLA | SESSION_END
Alt deployet til mikrotrening.no. State lagret.

## 2026-04-17 | CLA | SESSION_START
Sesjon 016 startet. Gjenopptok fra sesjon 015.

## 2026-04-17 | CLA | BUG_FIX
iOS PWA nav-bug: BottomNav sto midt på siden ved scrolling.
Fix: h-dvh flex-layout, main overflow-y-auto, BottomNav shrink-0 (fjernet fixed).

## 2026-04-17 | CLA | FEATURE
Safe area inset: viewportFit=cover + pb-[env(safe-area-inset-bottom)] på BottomNav.

## 2026-04-17 | CLA | SESSION_END
Sesjon 016 avsluttet.
## 2026-04-22 | P7 | SESSION_END
Sesjon 024 avsluttet.
- OneSignal API-nøkkel fikset (rotert, ny os_v2-nøkkel i Vercel)
- Sikkerhetsfikser deployet: milestones auth, exercises limit, security headers
- 2FA aktivert på Google, Supabase og Vercel
- Ventende: verifiser kl 08-varsel på iPhone i morgen

## 2026-04-22 | P7 | DONE — Install-banner: 3/7/10 registreringer
- Trigger endret fra % 7 til eksakt [3, 7, 10]
- Hvert tidspunkt huskes separat (install_dismissed array i localStorage)
- iPhone får Safari-instruksjoner, Android får Installer-knapp

## 2026-04-22 | P7 | DONE — Ingrid onboardet
- User-rad slettet fra users-tabellen

## 2026-04-22 | P7 | SESSION_END
Sesjon 024 avsluttet.
