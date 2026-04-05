# MISSION-BRIEFING — FASE 1: OPPSTART
**Prosjekt:** Sommerkropp
**Dato:** 2026-04-01
**Fase:** 1 av 7
**Intensitet:** MINIMAL (7/28)

---

## Prosjektsammendrag

En motivasjonsapp for daglig mikrotrening. Brukeren oppretter enkle treningspakker (f.eks. 50 reps styrkeøvelse) og registrerer gjennomføring hver dag. Appen motiverer til å både trene og registrere daglig. Målgruppe: venner og familie (<50 brukere). Ingen innlogging eller server-lagring.

---

## Klassifisering

- **Intensitet:** MINIMAL
- **Score:** 7/28
- **Prosjekttype:** Personlig treningsapp / motivasjonsverktøy
- **Brukerskala:** Venner og familie (<50)
- **Lagring:** Lokal (ingen server, ingen innlogging)
- **Byggemodus:** Samarbeid

---

## MÅ-oppgaver for Fase 1

- [ ] Definere kjernebrukerscenariet klart
- [ ] Bestemme hva en "treningspakke" er (struktur, innhold)
- [ ] Definere hva "registrere" betyr (hva logges?)
- [ ] Bestemme motivasjonsmekanismer (streak, badges, push, etc.)
- [ ] Velge plattform (webapp, mobilapp, PWA?)
- [ ] Lage enkel visuell skisse / wireframe av hovedskjerm

## BØR-oppgaver (hvis tid)

- [ ] Avklare om data skal deles mellom venner/familie
- [ ] Vurdere om det trengs offline-støtte
- [ ] Skissere onboarding-flyt for nye brukere

## KAN-oppgaver

- [ ] Utforske gamification-elementer (poeng, nivåer, leaderboard)
- [ ] Vurdere notifikasjoner/påminnelser

---

## TILGJENGELIGE RESSURSER (Lag 2)

- `Kit CC/4.6 - New project - Kit CC/Kit CC/Agenter/agenter/basis/PLANLEGGER-agent.md` — for prosjektplanlegging
- `Kit CC/4.6 - New project - Kit CC/Kit CC/Agenter/agenter/ekspert/LEAN-CANVAS-ekspert.md` — for forretningsmodell
- `Kit CC/4.6 - New project - Kit CC/Kit CC/Agenter/agenter/prosess/1-OPPSTART-agent.md` — aktiv fase-agent

---

## KONTEKST-NOTATER

- Ingen sensitive data → enkel arkitektur
- Lokal lagring (localStorage/IndexedDB) er sannsynlig løsning
- PWA kan gi app-følelse uten App Store
- Motivasjon er kjernefeature — ikke bare logging
