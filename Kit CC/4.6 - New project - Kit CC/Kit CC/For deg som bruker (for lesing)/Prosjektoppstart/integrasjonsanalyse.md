# Integrasjonsanalyse

> Kit CC finner automatisk hvilke eksterne tjenester ditt prosjekt trenger – uten å stille nye spørsmål.

## Hva gjør den?

Integrasjonsanalyse er en usynlig intelligens som leser alle svarene dine fra klassifiseringen og deduserer hvilke eksterne tjenester (som Stripe, Google Maps, Supabase, GitHub osv) som trengs. Den gjør dette uten å spørre flere spørsmål – den "leser mellom linjene" i det du allerede har sagt.

Eksempel: Hvis du nevner at du bygger en "nettbutikk med betaling", utleder systemet automatisk at du trenger Stripe eller Vipps. Hvis du sier "app med kart", vet det at du trenger Google Maps. Hvis du nevner "innlogging", vet det at du trenger en database. Det hele oppbygningen av integrasjonslisten skjer i bakgrunnen – brukeren ser bare resultatet.

## Hvorfor er det nyttig?

Integrasjoner er grunnlaget for hvordan prosjektet fungerer. Men det er enkelt å glemme noe eller ikke vite at noe finnes. Ved å automatisk analysere klassifiseringssvarene dine kan systemet foreslå alle integrasjonene du sannsynligvis trenger – og du kan godkjenne eller avslå dem etter behov.

Dette sparer tid fordi du ikke trenger å tenke på "Hva trenger jeg nå? Hva mangler?" – systemet gjør dette tenkearbeidet for deg og presenterer et gjennomtenkt forslag.

## Hvordan fungerer det?

**Fase 1 – Basis-integrasjoner (alltid inkludert):**
Alle prosjekter får automatisk:
- GitHub (versjonskontroll)
- Utviklingsverktøy (Node.js, TypeScript, linting, testing)

**Fase 2 – Intelligente slutninger basert på svarene dine:**

| Ord bruker bruker | System deduserer | Integrasjon(er) |
|---|---|---|
| "Nettbutikk", "selge", "kjøp" | Betalingshåndtering | Stripe, Vipps, Paypal |
| "Innlogging", "bruker", "konto" | Autentisering + database | Firebase Auth + Firestore, eller Supabase |
| "Kart", "geografi", "lokasjon" | Kartdata | Google Maps, Mapbox |
| "E-post", "meldinger", "varsler" | E-postservice | SendGrid, Mailgun, Resend |
| "Fil", "vedlegg", "lastet opp", "dokument" | Fillagring | AWS S3, Cloudinary, Supabase Storage |
| "Søk", "filtrering av store mengder" | Søkemotor | Elasticsearch, Algolia |
| "Real-time", "live oppdateringer" | WebSocket-server | Firebase Realtime, Supabase Realtime |
| "Analyse", "metrics", "tracking" | Analyser | Plausible, Mixpanel, Amplitude |
| "CDN", "rask last", "globalt" | Content Delivery Network | Cloudflare, Vercel, Netlify |
| "Video", "streaming", "media" | Videoserving | Mux, YouTube, Vimeo |
| "Chat", "meldinger", "støtte" | Chatstøtte | Slack, Intercom, Crisp |
| "Kalender", "møter", "planlegging" | Kalenderintegrasjon | Google Calendar, Outlook |
| "PDF", "rapporter", "eksport" | PDF-generering | PDFKit, jsPDF |
| "SMS", "varsel", "telefon" | SMS-service | Twilio, AWS SNS |
| "AI", "ML", "intelligens", "large language model" | AI-API | OpenAI, Anthropic, Hugging Face |

**Fase 3 – Kryss-referanser (intelligent kombinering):**
- Hvis "betaling" + "innlogging" → Bruker database + betalingstjeneste + autentisering
- Hvis "fil" + "betaling" → Fillagring + betaling for pro-features
- Hvis "chat" + "innlogging" → Brukerbase + chatsystem
- Hvis "analyse" + "AI" → Analytics + ML-modeller + insights

**Fase 4 – Presentasjon:**
Systemet viser en liste som ser slik ut:

```
INTEGRASJONER DITT PROSJEKT SANNSYNLIGVIS TRENGER:
✓ GitHub (versjonskontroll)
✓ Stripe (betalinger) — eller Vipps?
✓ Supabase (database + autentisering)
✓ Cloudinary (bildelagring)
✓ SendGrid (e-postvarslinger)
✓ Google Maps (kartvisning)

Vil du legge til, fjerne eller endre noen av disse?
```

## Eksempel

**Scenario: Bruker sier "Jeg skal bygge en app hvor håndverkere kan selge håndlagde produkter, med innlogging, og jeg trenger en måte å spore hvor pakkene er"**

System analyserer ordene:
- "selge" + "produkter" → Betalinger (Stripe/Vipps)
- "innlogging" → Autentisering + database (Supabase/Firebase)
- "håndverkere" → Brukertyper (admin/selger/kjøper) → Roller i database
- "spore pakker" → Integrering med leverandør (Bring, PostNord) eller egen tracking

**Automatisk dedusert integrasjonsliste:**
1. GitHub (alltid)
2. Stripe eller Vipps (betalinger)
3. Supabase (brukerbase, innlogging, produktlager)
4. Cloudinary (produktbilder)
5. SendGrid (bekreftelsesmeldinger, varsler)
6. Bring API eller PostNord API (sporing)
7. Plausible (analytics – vil de vite hvor brukerne kommer fra?)

Bruker godkjenner eller justerer uten å ha måttet spørre spørsmål selv.

## Relaterte features
- progressiv-klassifisering.md — Klassifisering som gir datagrunnlaget for analyse
- confidence-scoring.md — Sikkerhetsmål som påvirker hvor sikker analysen er
- bildestrategi.md — Lignende automatisk deduksjon, men for bilder

---
*Definert i: Kit CC/Agenter/agenter/system/agent-AUTO-CLASSIFIER.md (B12)*
*Lagt til: 2026-02-17*
*Kategori: Prosjektoppstart*
