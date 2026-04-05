# MISSION-BRIEFING — FASE 3: ARKITEKTUR
**Prosjekt:** Sommerkropp
**Dato:** 2026-04-01
**Fase:** 3 av 7
**Intensitet:** FORENKLET (10/28)

## Fra Fase 2

- **Tech-stack:** Next.js 14 (App Router) + Tailwind + Supabase + Vercel
- **Auth:** Supabase Auth + SMS OTP (mobilnummer)
- **Database:** PostgreSQL via Supabase (6 tabeller)
- **Poeng:** streak × 2 + totale_dager
- **MVP:** 6 moduler (M-001 til M-006)
- **Sikkerhet:** RLS på alle tabeller, JWT via Supabase

## MÅ-oppgaver for Fase 3

- [ ] Definere mappestruktur og filkonvensjoner
- [ ] Designe Supabase-skjema med RLS-regler
- [ ] Definere auth-flyt (SMS OTP → session)
- [ ] Designe API-lag (Supabase queries / server actions)
- [ ] Sette opp PWA-konfigurasjon

## TILGJENGELIGE RESSURSER (Lag 2)

- `docs/FASE-2/tech-stack.md`
- `docs/FASE-2/datamodell.md`
- `docs/sikkerhetskrav.md`
- `Kit CC/.../agenter/prosess/3-ARKITEKTUR-agent.md` — aktiv fase-agent
