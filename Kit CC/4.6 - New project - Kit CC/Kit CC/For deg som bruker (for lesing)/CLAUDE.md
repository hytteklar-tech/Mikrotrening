# Kit CC Features — Dokumentasjon av alle funksjoner

> Denne mappen inneholder strukturert dokumentasjon av alle funksjoner i Kit CC.
> Den er ment for brukere, selgere og utviklere som vil forstå hva Kit CC kan.

---

## Formål

Kit CC er et stort system med mange funksjoner. Denne mappen gjør det enkelt å:
- **Finne** hva Kit CC kan gjøre
- **Forstå** hver funksjon i detalj
- **Holde oversikt** når nye funksjoner utvikles

---

## Mappestruktur

```
Features/
├── CLAUDE.md              ← Denne filen (leses automatisk av AI)
├── CHANGELOG.md           ← Logg over nye features med filreferanser
├── Agentsystem/           ← Multi-agent arkitektur, agenttyper, koordinering
├── Prosjektoppstart/      ← Klassifisering, progressiv avsløring, bootstrap
├── Brownfield/            ← Analyse av eksisterende kodebaser
├── Faser/                 ← De 7 fasene og fasespesifikke funksjoner
├── Autonomi/              ← Byggemodus, beslutningslogikk, AI-styring
├── Kvalitetssikring/      ← Phase gates, teststrategier, kodekvalitet
├── Sikkerhet/             ← OWASP, GDPR, trusselmodellering, hemmelighetssjekk
├── Kontekst-og-minne/     ← Kontekstbudsjett, progress-log, session-handoff
├── Klassifisering/        ← Intensitetsnivåer, MÅ/BØR/KAN, funksjonsmatrise
├── Monitor/               ← Kit CC Monitor (live dashboard)
└── Kommunikasjon/         ← Brukernivåer, tilpasset kommunikasjon
```

---

## Konvensjoner

### Filnavn
Hver feature-fil er en frittstående `.md`-fil med dette formatet:

```
[kort-beskrivende-navn].md
```

Eksempler: `progressiv-klassifisering.md`, `25-agents-sverm.md`, `crash-recovery.md`

### Innhold per feature-fil
Hver fil følger denne strukturen:

```markdown
# [Feature-navn]

> Kort beskrivelse (1 setning)

## Hva gjør den?
[2-3 avsnitt som forklarer funksjonen for en ikke-teknisk bruker]

## Hvorfor er det nyttig?
[Verdien for brukeren — hva oppnår man med denne funksjonen]

## Hvordan fungerer det?
[Teknisk forklaring — for utviklere og avanserte brukere]

## Eksempel
[Konkret eksempel på funksjonen i bruk]

## Relaterte features
- [Lenke til relatert feature]

---
*Definert i: [filsti til implementasjonen]*
*Lagt til: [dato]*
*Kategori: [kategori]*
```

### Når nye features legges til
1. Opprett feature-fil i riktig kategorimappe
2. Legg til en linje i `CHANGELOG.md` med dato, feature-navn og filsti
3. Hvis featuren passer i flere kategorier, legg den i den mest naturlige — og referer til den fra andre kategorier

---

## For AI: Vedlikeholdsregler

Når du jobber med Kit CC og implementerer nye funksjoner:

1. **Etter hver ny feature:** Opprett en feature-fil i riktig kategorimappe
2. **Oppdater CHANGELOG.md** med ny entry øverst (nyeste først)
3. **Ikke dupliser:** Én feature = én fil. Bruk kryssreferanser
4. **Hold filene oppdatert:** Hvis en feature endrer seg, oppdater filen
5. **Bruk klart språk:** Feature-filer er for BRUKERE, ikke for maskiner

---

*Versjon: 1.0.0*
*Opprettet: 2026-02-17*
