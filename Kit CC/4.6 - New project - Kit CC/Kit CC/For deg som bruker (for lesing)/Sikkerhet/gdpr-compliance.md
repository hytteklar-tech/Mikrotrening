# GDPR-compliance

> GDPR-ekspert-agenten sikrer at prosjektet oppfyller EUs personvernforordning når det håndterer persondata fra EU-borgere.

## Hva gjør den?

GDPR-compliance-funksjonen er en automatisert kontroll som sikrer at prosjektet oppfyller EUs personvernforordning (General Data Protection Regulation). Agenten aktiveres automatisk når prosjektet oppdages å håndtere persondata fra EU-borgere. Den gjennomgår implementeringen for nøkkelbetingelser som databehandlingsavtaler, samtykkehåndtering, rett til sletting, dataminimering, og krav om personvernombud.

GDPR-sjekker som kjøres:

1. **Databehandlingsavtale (DPA)** — Kontroll og dokumentasjon av hvor og hvordan data behandles
2. **Samtykkehåndtering** — Bruker gir eksplisitt samtykke før data samles
3. **Rett til sletting** — Bruker kan be om at alle sine data slettes
4. **Dataminimering** — Bare nødvendige data samles
5. **Transnasjonale overføringer** — Data som sendes utenfor EU må ha juridisk grunnlag
6. **Datalekkasjevarslinger** — Sikkerhetshendelser må rapporteres innen 72 timer
7. **DPIA (Data Protection Impact Assessment)** — For høyrisikobehandlinger
8. **Personvernombud** — Stor databehandleri trenger personvernombud

## Hvorfor er det nyttig?

GDPR gjelder for alle som behandler persondata fra EU-borgere — uansett hvor selskapet er registrert. Brudd kan være dyre (opptil 4 % av årlig omsetning) og skape tillitsploblemer. Automatisert compliance sikrer at:

- Prosjektet oppfyller loven fra dag én
- Juridisk risiko minimeres
- Bruker vet hva som må implementeres
- Compliance er dokumentert for kontrollørum

## Hvordan fungerer det?

GDPR-ekspert-agenten kjører en systematisk kontroll:

1. **Deteksjon av persondata**
   - "Behandles persondata fra EU-borgere?"
   - Hvis ja: Aktiver GDPR-kontroller

2. **Databehandlingsavtale**
   - Dokumenter hver datatype som samles: navn, e-post, adresse, atferd, etc.
   - Dokumenter formålet: markedsføring, kundeservice, analyse, osv.
   - Dokumenter oppbevaring: hvor lagres data, hvor lenge, sikkerhet

3. **Samtykkekontroll**
   - Bruker må eksplisitt samtykke til datainnsamling
   - Samtykke må være dokumentert
   - Bruker må kunne trekke samtykket når som helst

4. **Dataminimering**
   - Samle bare data som trengs for det angitte formål
   - Slett data når ikke lenger nødvendig
   - Sjekk at ingen overflødig data lagres

5. **Rett til sletting**
   - Implementer "slett meg"-funksjonalitet
   - Slette alle personlige data når bruker ønsker
   - Arkiver data sikker hvis juridisk påkrevd

6. **Transnasjonale overføringer**
   - Data som sendes til USA, Asía, etc. trenger juridisk grunnlag
   - SCC (Standard Contractual Clauses) eller liknende
   - Dokumenter alle overføringer

7. **Datalekkasjevarslinger**
   - Ved sikkerhetsbrudd: varsle bruker innen 72 timer
   - Logg hendelsen for tilsynsmyndigheter

8. **DPIA (vurdering av virkning på personvern)**
   - For høyrisikobehandlinger (biometri, profiling, automatisert beslutning, etc.)
   - Dokumenter risiko og tiltak

## Eksempel

```
GDPR-COMPLIANCE RAPPORT
=======================
Prosjekt: E-handles app
Dato: 2026-02-17

PERSONNDATA IDENTIFISERT:
  - Fullt navn (påkrevd for ordre)
  - E-postadresse (påkrevd for kontakt)
  - Leveringsadresse (påkrevd for levering)
  - Betalingsinformasjon (påkrevd for betaling)
  - Gjennomføringhshistorikk (for anbefalinger)

FORMÅL MED BEHANDLING:
  - Ordreutførelse (juridisk grunnlag: kontakt)
  - Betalingsbehandling (juridisk grunnlag: kontakt)
  - E-postmarkedsføring (juridisk grunnlag: SAMTYKKE — MANGLER!)
  - Produktanbefalinger (juridisk grunnlag: berettiget interesse)

STATUS:

1. SAMTYKKEHÅNDTERING — ⚠️ MANGLER
   Problem: Bruker får markedsføring uten å ha gitt samtykke
   Løsning: Legg til checkbox "Ja, send meg tilbud og nyheter"
   Kode-eksempel:
     <form>
       <input type="checkbox" name="marketing-consent">
       Jeg samtykker til at dere kontakter meg med tilbud
     </form>

2. DATAMINIMERING — ✅ OK
   Kontroll: Samler bare nødvendig data for ordre
   Anbefaling: Fjern "telefonnummer" hvis ikke brukt

3. RETT TIL SLETTING — ⚠️ MANGLER FUNKSJONALITET
   Problem: Ingen måte å slette data på
   Løsning: Implementer "slett min konto"-funksjon
     - Bruker logger inn
     - Klikker "slett min konto"
     - All persondata slettes (unntatt data med juridisk oppbevaringsplikt)

4. TRANSNASJONALE OVERFØRINGER — ⚠️ SJEKK NØDVENDIG
   Spørsmål: Sendes data til USA eller andre land?
   Hvis Stripe/PayPal brukes: JA, data sendes til USA
   Løsning: Dokumenter SCC eller Adequacy Decision

5. DATALEKKASJEVARSLINGER — ⚠️ MANGLER
   Problem: Ingen prosedyre for sikkerhetshendelse
   Løsning: Lag sjekkliste:
     - Oppdag brudd → logg hendelse (tid, hva, påvirket data)
     - Innen 72 timer: varsle bruker hvis høy risiko
     - Innen 72 timer: varsle tilsynsmyndighet (Datatilsynet)

6. DPIA (VIRKNINGEN VÅ PERSONVERN) — IKKE NØDVENDIG (ENNÅ)
   Vurdering: Enkel e-handel uten automatisert profilering
   Anbefaling: Utfør DPIA hvis du senere legger til anbefalingsalgoritme

SAMMENDRAG:

✅ Godkjent:
   - Dataminimering implementert
   - Juridisk grunnlag dokumentert for mest all data

⚠️ Påkrevd før launch:
   - Legg til samtykkehåndtering for markedsføring
   - Implementer "slett min konto"-funksjonalitet
   - Lag datalekkasje-prosedyre
   - Dokumenter SCC for transnasjonale overføringer

JURIDISK RISIKO:
   HØYT hvis du lancer uten samtykkehåndtering
   → Brudd på GDPR artikkel 7 (ca. 20.000 NOK bot per bruker)

Anbefaling: Fikser før launch. Vil gjøre det nå?
```

## Relaterte features

- **Automatisk sikkerhetsoppgradering** — Aktiverer GDPR når persondata oppdages
- **OWASP-sikkerhet** — Sikrer at persondata er beskyttet mot hacking
- **Hemmelighetssjekk** — Sikrer at persondata ikke lekkes
- **Trusselmodellering** — Vurderer trusler mot persondata

---

*Definert i: Kit CC/Agenter/agenter/ekspert/GDPR-ekspert.md*
*Lagt til: 2026-02-17*
*Kategori: Sikkerhet*
