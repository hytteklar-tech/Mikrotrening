# Bildestrategi

> Kit CC velger automatisk den beste måten å håndtere bilder på – uten at du må spørre om hva som er mulig.

## Hva gjør den?

Bildestrategi-funksjonen analyserer automatisk om prosjektet ditt trenger bilder, og hvis ja – hvilken type bilder og hvor mange. Basert på denne analysen presenterer den 5 brukervennlige alternativer tilpasset akkurat ditt prosjekt.

For eksempel: Hvis du bygger en nettbutikk, foreslår den fotorealistiske eller AI-genererte produktbilder. Hvis du bygger en landingsside, foreslår den stilige illustrasjoner. Hvis du bygger en API eller kommandolinje-verktøy – ber den ikke engang om bilder, fordi det ikke trengs.

## Hvorfor er det nyttig?

Bilder er ofte "ett av de tingene" som blir utsatt eller glemt fordi man ikke vet hvor man skal få dem fra. Du kan velge fra 5 etablerte alternativer som alle fungerer:

1. **MCP-basert bildeinnhenting** – Systemet kan hente bilder direkte fra nett basert på beskrivelser (hvis du har tilgang til MCP-bilde-kilder)
2. **Unsplash** – Gratis, høykvalitetsfotografier
3. **Lorem Picsum** – Placeholder-bilder som ser ut som ekte (perfekt for prototyping)
4. **AI-genererte bilder** – DALL-E, Midjourney eller lignende (hvis du ønsker unike visuals)
5. **Ingen bilder** – Mange prosjekter trenger det ikke, og det er OK

Systemet gjør dette valet for deg basert på prosjekttypen – du velger bare hvilket alternativ som passer best.

## Hvordan fungerer det?

**Fase 1 – Automatisk deteksjon:**
Kit CC analyserer klassifiseringssvarene dine for tegn på bildebehovet:
- Er det en UI-app? (nettside, mobilapp, dashboard) → Sannsynlig bildebehovet
- Er det e-handel? → Høyt bildebehovet (produktfoto)
- Er det en landingsside/markedsføring? → Behovet for illustrasjoner/design
- Er det en API/CLI/backend? → Ingen bildebehovet (skippes)

**Fase 2 – Kontekst-analyse:**
- Hvis e-handel: Spørsmål om produktkategorier og antall bilder
- Hvis designtung app: Spørsmål om stil (minimalistisk, fargerik, fotografisk osv)
- Hvis innehold-basert: Spørsmål om innholdstype (blog, galleri, portefølje)

**Fase 3 – Anbefaling:**
Basert på analyse presenteres alternativer:

| Prosjekttype | Best alternativ | Begrunnelse |
|---|---|---|
| E-handel | AI-generert + Unsplash | Produktrealistisk men variert |
| Landingsside | Unsplash + illustrasjoner | Profesjonelt utseende |
| SaaS-dashboard | Lorem Picsum + tilpasset | Fokus på funksjonalitet |
| Portefølje/Kunstner | Eget innhold | Viser egen arbeid |
| API/Backend | (ingen) | Ikke relevant |
| Blog/Innhold | Unsplash | Gratis og variert |

## Eksempel

**Scenario 1 – E-handel for smykker:**
```
System detekterer: "Nettbutikk med produkter"
↓
Analyse: Høyt bildebehovet (produktfoto)
↓
Anbefaling presenteres:
"Din smykkeutikk trenger bilder av produkter. Her er 5 måter:
1. AI-genererte bilder av smykker (unikt, fullkontroll)
2. Unsplash (gratis reelle bilder, mindre kontroll)
3. Lorem Picsum (placeholders mens du venter på faktiske bilder)
4. MCP-basert henting (automatisk fra database eller nett)
5. Ingen bilder nå (kan legges til senere)

Anbefaling: AI-genererte + Unsplash for variasjon"
```

**Scenario 2 – API for værdata:**
```
System detekterer: "Backend API, ingen brukergrensesnitt"
↓
Analyse: Ingen bildebehovet (API returnerer JSON)
↓
Anbefaling: Skippes automatisk
"Værdata-APIet trenger ingen bilder. Hopper over!"
```

**Scenario 3 – SaaS-dashboard for prosjektstyring:**
```
System detekterer: "Webapp, mange dashboards og tabeller"
↓
Analyse: Moderat bildebehovet (ikoner, avatarer, ikke full gallerier)
↓
Anbefaling presenteres:
"Dashboardet kan bruke avatarer og ikoner. Foreslår:
1. Lorem Picsum for placeholder-avatarer (raskt å sette opp)
2. Unsplash for bakgrunn/illustrasjoner (hvis nødvendig)
3. AI-generer ikoner (hvis du trenger skjermspesifikk design)
4. Ingen bilder (helt tekstbasert er også OK)"
```

## Relaterte features
- progressiv-klassifisering.md — Klassifisering som trigges åpningsspørsmål og oppfølginger
- integrasjonsanalyse.md — Analyse av hvilke tjenester prosjektet trenger
- confidence-scoring.md — Sikkerhetsmål for klassifiseringskvalitet

---
*Definert i: Kit CC/Agenter/agenter/system/agent-AUTO-CLASSIFIER.md (B11)*
*Lagt til: 2026-02-17*
*Kategori: Prosjektoppstart*
