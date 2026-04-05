# Søk før mangel

> Før AI-en konkluderer med at en fil, funksjon eller informasjon "mangler", MÅ den søke rekursivt i prosjektmappen først. Dette unngår at systemet later som noe er borte når det faktisk finnes eller kan finnes.

## Hva gjør den?

Søk før mangel er en protokoll som sikrer at AI-agenter ikke er "late" når de leter etter ting. I stedet for å si "Det finnes ikke en databasemodell", må agenten faktisk søke etter den først.

Protokollen sier:

> Hvis du skal konkludere med at noe "mangler" — en fil, en funksjon, en konfigurasjon, informasjon fra brukeren, eller hva som helst — MÅ du først gjøre et aktivt søk ved å:
> 1. **Søk rekursivt** i prosjektmappen med grep eller find
> 2. **Sjekk alle relevante steder** (ikke bare én plass)
> 3. **Si hva du søkte etter** — eksempel: "Jeg søkte etter 'database' i hele prosjektet og fant 5 filer, men ingen som definerer databaseskjemaet"
> 4. **Først da** kan du konkludere med at det mangler

Poenget er å unngå "hallusinasjoner" — når AI-en antar noe er borte uten å faktisk ha sjekket.

## Hvorfor er det nyttig?

Uten denne protokollen skjer dette:
- **Agenten:** "Databasemodulen mangler. Skal jeg lage den?"
- **Du:** "Nei, den finnes allerede! Den heter `db-connector.js`"
- **Agenten:** "Åh, den fantes jo der."

Det er kjedelig fordi det koster tid og gjør at du mister tilliten til agenten.

Med protokollen:
- **Agenten:** "Jeg søkte etter 'database' og fant 5 filer... og der er `db-connector.js`! Skal jeg bruke den?"
- **Du:** "Ja, perfekt."

Søking tar noen sekunder. Det er billig. Og det bygger tillit.

## Hvordan fungerer det?

**Når skal du søke?**

Søk når du skal konkludere med at noe mangler eller ikke finnes. Eksempler:
- "Jeg finner ingen sikkerhetsteam-beskrivelse" → Søk etter "security" og "team" før du konkluderer
- "Database-konfigurasjonen finnes ikke" → Søk etter "config", "database", ".env" før du konkluderer
- "API-dokumentasjonen mangler" → Søk etter "README", "API", ".md" før du konkluderer
- "Komponenten ButtonInput finnes ikke" → Søk etter "ButtonInput", "button-input" før du konkluderer

**Hva søker du etter?**

Hovedsakelig bruker du to verktøy:
- **grep:** For å søke inne i filer etter tekst
  ```
  grep -r "sikkerhet" prosjektmappen/
  ```
- **find:** For å søke etter filnavn
  ```
  find prosjektmappen/ -name "*database*"
  ```

**Hvor søker du?**

Alltid i hele prosjektmappen eller de relevante undermappene:
- `src/` (eller `app/`, eller der koden er)
- `docs/`
- `.ai/` (Fase-dokumenter og notatene fra tidligere)
- `Kit CC/` (Hvis du leter etter agenter eller dokumentasjon)
- `config/`
- Rotmappen

**Hva rapporterer du?**

Når du har søkt, skal du si eksplisitt:
- "Jeg søkte etter [X] ved å bruke [grep/find]"
- "Jeg fant [Y] filer/resultater"
- "Resultat: [liste over det du fant, eller 'ingenting']"
- "Konklusjon: [Noe mangler, eller finnes der]"

Eksempel:
```
Jeg søkte etter "authentication" i hele prosjektet:
  grep -r "authentication" src/
  find . -name "*auth*"

Resultat:
  - src/services/AuthService.js (implementering)
  - src/components/LoginForm.js (brukt i UI)
  - docs/AUTHENTICATION.md (dokumentasjon)

Konklusjon: Autentisering finnes allerede. Ingen implementering trengs.
```

Alternativt:
```
Jeg søkte etter "database schema":
  grep -r "schema" src/
  grep -r "database" src/
  find . -name "*database*" -o -name "*schema*"

Resultat:
  - Ingen filer med ordet "schema"
  - Ingen filer med ordet "database" i kodemappen
  - `.env` filen refererer til DATABASE_URL, men ingen skjema-definisjon finnes

Konklusjon: Databaseskjemaet mangler. Det må definieres.
```

## Eksempel

Du er i Fase 4 (MVP). Agenten sier:

**Agenten:** "Jeg skal nå implementere databaselaget. Skal jeg bruke MongoDB eller SQL?"

**Du:** "Sjekk først om vi allerede har noe databasekonfigurasjon fra tidligere faser."

**Agenten følger søk-før-mangel:**

```
Jeg søker etter eksisterende databasekonfigurasjon:

  grep -r "mongodb\|postgresql\|mysql\|database" src/ docs/
  find . -name ".env*" -o -name "*database*" -o -name "*db*"

Resultat:
  1. docs/FASE-3-ARKITEKTUR.md - nevner "PostgreSQL anbefales"
  2. .env.example - har DATABASE_URL=postgresql://...
  3. Ingen faktisk database-driver-kode finnes i src/

Konklusjon:
  Du valgte PostgreSQL i Fase 3, og jeg fant konfigurasjonen.
  Databasedriveren må implementeres, men jeg vet nå at jeg skal bruke PostgreSQL.
```

Du bekrefter: "Ja, det stemmer. Bruk PostgreSQL og her er innlogningsinformasjonen." Agenten fortsetter.

---

Eksempel der søket finner ingenting:

**Agenten:** "Skal jeg implementere betalingsintegrasjon?"

**Du:** "Sjekk først om det finnes allerede betalingskode fra tidligere faser."

**Agenten søker:**

```
Jeg søker etter betalingskode:

  grep -r "stripe\|payment\|checkout\|billing" src/ docs/
  find . -name "*payment*" -o -name "*stripe*" -o -name "*checkout*"

Resultat:
  - Ingen filer funnet
  - Ingen grep-resultater
  - .ai/MISSION-BRIEFING-FASE-4.md nevner ikke betaling som MVP-funksjon

Konklusjon:
  Betalingsintegrasjon finnes ikke allerede, og det var ikke planlagt for MVP.
  Skal jeg legge det til, eller er det først i Fase 5?
```

## Relaterte features

- **fase-gates** — Bruker søk-før-mangel når den validerer at alle leveranser finnes
- **oppgavekompleksitet** — Søk-protokollen sjekker at oppgaven ikke er allerede fullført
- **modulregistrering** — Søker i registeret for å se om en funksjon allerede er implementert

---

*Definert i: Kit CC/Agenter/agenter/system/protocol-VERIFY-BEFORE-MISSING.md*
*Lagt til: 2026-02-17*
*Kategori: Kvalitetssikring*
