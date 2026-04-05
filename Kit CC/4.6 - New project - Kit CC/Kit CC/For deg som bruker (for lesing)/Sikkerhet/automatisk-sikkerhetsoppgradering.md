# Automatisk sikkerhetsoppgradering

> Når Kit CC oppdager sensitive datatyper, oppgraderes prosjektets intensitetsnivå automatisk for å pålegge strengere sikkerhetskrav.

## Hva gjør den?

Automatisk sikkerhetsoppgradering er en innebygd sikkerhetsmekanism som kjører under klassifiseringen og under hele prosjektutviklingen. Dersom systemet oppdager at prosjektet håndterer sensitive data (som helseopplysninger, betalingsinformasjon, persondata, eller andre følsomme datatyper), oppgraderes intensitetsnivået automatisk til et høyere nivå. Det medfører strengere sikkerhetskrav, flere kontroller, og involvering av sikkerhetsspesialister.

Eksempel: Et prosjekt starter med klassifisering MINIMAL (hobbyprosekt), men under intervjuet nevner bruker at appen skal håndtere betalinger. Systemet oppdager dette og oppgraderer automatisk til STANDARD med PCI-DSS-kravene inkludert.

## Hvorfor er det nyttig?

Sikkerhet er ikke en tanke etterpå — det må være innebygd fra starten. Mange utviklere er ikke klar over at deres prosjekt håndterer sensitive data før det er for sent. Automatisk oppgradering sikrer at:

- Prosjekter som håndterer betalinger eller helse får PCI-DSS og HIPAA-krav fra dag én
- Persondata aktiverer GDPR-kontroller automatisk
- Ingen prosjekter "glimrer forbi" uten tilstrekkelig sikkerhet
- Oppgradering er transparent — bruker ser årsaken og kan godkjenne eller debattere

## Hvordan fungerer det?

AUTO-CLASSIFIER-agenten søker etter trigger-ord og funksjoner i brukerens beskrivelse:

1. **Deteksjon:** Scanne prosjektbeskrivelsen for sensitive ordmønstre
   - Betalinger: "betaling", "stripe", "kredittkort", "transaksjoner"
   - Helse: "pasient", "medisin", "diagnose", "helseopplysninger"
   - Persondata: "navn", "adresse", "personnummer", "fødselsdato"
   - Sikkerhet: "sikkerheit", "innlogging", "autentisering", "tilgang"

2. **Oppgradering:** Hvis trigger funnet → oppgrader intensitet
   - MINIMAL → STANDARD (hvis betalinger eller persondata)
   - STANDARD → HØYT (hvis helse eller finansielle data)
   - HØYT → KRITISK (hvis kritiske funksjoner eller mange brukere)

3. **Implementering:** Nye sikkerhetskrav aktiveres
   - PCI-DSS-sjekk for betalingssystemer
   - GDPR-compliance for persondata
   - HIPAA for helseopplysninger
   - Trusselmodellering på høyere nivå

4. **Kommunikasjon:** Bruker informeres
   - "Jeg ser at du håndterer betalinger. Jeg oppgraderer til STANDARD med PCI-DSS-krav. Er du enig?"
   - Bruker kan akseptere, debattere, eller justere

## Eksempel

**Scenario 1: Hobbyprosekt → Oppgradering**

```
Bruker: "Jeg lager en enkel app for å logge treningsøktene mine"
Kit CC klassifisering: MINIMAL (hobby, personlig data)
---
Bruker fortsetter: "...og jeg vil også spore kostnadene og ha en betalings-integrasjon for premium-funksjoner"
AUTO-CLASSIFIER oppdager: "betaling", "premium"
---
AUTO-CLASSIFIER: "Jeg oppdager at du håndterer betalinger. Jeg oppgraderer
klassifiseringen til STANDARD med PCI-DSS-krav. Dette betyr strengere
kryptering, sikkerere hemmelighetslagring, og en sikkerhetsgennomgang.
Er du enig?"
---
Bruker: "Ja, det er greit"
Intensitet: Oppgradert til STANDARD
Sikkerhetskrav: PCI-DSS, hemmelighetssjekk, OWASP Top 10
```

**Scenario 2: STANDARD → HØYT (helse)**

```
Bruker: "Jeg bygger en app for små klinikker til å administrere pasientjournal"
AUTO-CLASSIFIER oppdager: "pasientjournal", "klinikk"
---
AUTO-CLASSIFIER: "Dette involverer helseopplysninger (personvernklasse).
Jeg oppgraderer til HØYT med GDPR og HIPAA-krav. Du trenger også
trusselmodellering og sikkerhetsgransking. Greit?"
---
Intensitet: Oppgradert til HØYT
Sikkerhetskrav: GDPR, HIPAA, trusselmodellering, dataminimering, DPIA
```

## Relaterte features

- **GDPR-compliance** — Automatisk aktivert for persondata
- **OWASP-sikkerhet** — Sikkerhetsgransking mot OWASP Top 10
- **Hemmelighetssjekk** — Sikrer at API-nøkler ikke lekkes
- **Trusselmodellering** — Identifiserer angripere og angrepsflater
- **Klassifiseringssystem** — Intensitetsnivåer (MINIMAL, STANDARD, HØYT, KRITISK)

---

*Definert i: Kit CC/Agenter/agenter/system/agent-AUTO-CLASSIFIER.md (AUTOMATIC-UPGRADE seksjon)*
*Lagt til: 2026-02-17*
*Kategori: Sikkerhet*
