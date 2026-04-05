# Regresjonsovervåking

> Kit CC sjekker at kvalitetskrav fra tidligere faser fortsatt er oppfylt når du gjør endringer senere. Hvis en ny endring bryter noe som allerede ble godkjent, varsler systemet deg.

## Hva gjør den?

Regresjonsovervåking er en sikkerhetsnett som sikrer at du ikke ødelagger noe som allerede fungerer når du bygger nye ting.

Et klassisk eksempel: I Fase 3 definerte du sikkerhetskrav ("All data må krypteres"). I Fase 5, mens du bygger en ny funksjon, endrer du hvordan data lagres — og glemmer å legge på krypteringen. Regresjonsovervåkingen vil flagge dette: "Advarsel: Din endring i [modul] bryter Fase 3-kravet: All brukerdata skal være kryptert."

Systemet overvåker fem områder automatisk:
1. **Sikkerhet** — Er sikkerhetsintentene fra Fase 3 fremdeles oppfylt?
2. **Arkitektur** — Er komponentene fortsatt organisert som planlagt?
3. **Tester** — Fungerer alle tidligere tester fortsatt?
4. **Performance** — Har nye endringer gjort systemet langsommere?
5. **Kompatibilitet** — Fungerer gamle integrasjoner fortsatt?

## Hvorfor er det nyttig?

Regresjonsovervåking unngår at du:
- **Gjør samme feilen to ganger.** Du fikset et sikkerhetshull i Fase 3, og nå gjør du det samme hullet igjen i Fase 5 — systemet varsler deg før du pusher koden.
- **Bryter gamle systemer.** Du bygger en ny feature som endrer databaseskjemaet — men 5 andre features avhenger av det gamle skjemaet. Regresjonen flag-ger at 5 andre features vil knekke.
- **Slitter ved integrasjonstesting.** Hver feature testes isolert, men når alt settes sammen senere, plutselig fungerer det ikke. Regresjonstesting fanger dette.

## Hvordan fungerer det?

**Fase 3 er "baseline":**
Når du fullfører Fase 3, lagrer systemet et snapshot av:
- Arkitektur (hvordan komponenter snakker sammen)
- Sikkerhetskrav (spesifikk list over sikkerhetskontroller som må implementeres)
- API-kontrakter (hvilke endepunkter og format forventes)
- Tester (alle tester som skal passere)

Dette snapshapet lagres i `.ai/PROJECT-STATE.json` under `phase3Baseline[]`.

**Under Fase 4 og 5:**
Hver gang en endring gjøres (en fil blir modifisert), sjekker systemet:
- "Endrer denne filen noe som er i Fase 3-baseline?"
- Hvis ja: "Bryter endringen baselinekravet?"

Hvis en brudd detekteres, logger systemet det.

**Når du er klar for fase-overgang:**
Fase-gaten (se feature: fase-gates) sjekker regresjonsrapporten:
- Hvis det finnes 0 regresjoner → ✅ OK
- Hvis det finnes regresjoner → 🟡 Advarsel: "X regresjoner funnet siden Fase 3. Detaljer:"
  - Du kan akseptere hver regresjon med begrunnelse ("Vi designet om sikkerheten på formål")
  - Eller du kan fikse det før du går videre

**Eksempel på regresjondeteksjon:**

Du endrer databasemodulen for å legge til en ny feature. Systemet ser:
- Fase 3-baseline: "Alle tabeller må ha `encrypted_fields[]`"
- Din endring: "Jeg la til tabell `UserPreferences` uten `encrypted_fields[]`"
- Regresjonsresultat: ⚠️ "Ny tabell `UserPreferences` mangler krypteringsfelt. Dette bryter Fase 3-kravet 'Alle tabeller må ha encrypted_fields[]'. Årsak: Jeg lagt til denne tabellen for preferanser, som ikke har sensitive data."
- Du godtar eller fikser

## Eksempel

Du bygger et chatprogram. Her er tidslinjen:

**Fase 3 (Arkitektur):**
Du definerer sikkerhetskravene:
- Alle meldinger må krypteres før lagring
- Alle API-kall må ha autentisering
- Databasen må kun snakke med backend, aldri direkte fra frontend

System lagrer: `phase3Baseline = [krav_1, krav_2, krav_3]`

**Fase 5, iterasjon 1: Bygg meldingsfunksjonen**
Agenten implementerer meldinger. Alle Fase 3-krav blir sjekket automatisk:
- ✅ Meldinger krypteres før lagring
- ✅ API-kall autentiseres
- ✅ Database-kontakt går gjennom backend
- **Regresjon: Ingen ✅**

**Fase 5, iterasjon 3: Bygg søkfunksjonalitet**
Agenten legger til søkefunksjonalitet. For å gjøre søk raskt, implementerer hun en "client-side søkeindeks":
- Backend sender alle meldinger til frontend (ukryptert, for indeksering)
- Frontend søker lokalt

Regresjonsovervåkingen flagger:
```
⚠️ REGRESJON DETEKTERT:
   Endring: Meldinger sendes nå ukrypterte til frontend (for søkindeksering)
   Bryter: Fase 3-krav "Alle meldinger må være kryptert"
   Årsak: ?
```

Du får valget:
- **A)** Fikse det: Backend sender bare metadata til frontend, kryptert. Søk gjøres på serveren.
- **B)** Godta og redokumenter: "Vi aksepterer at søk-indeksen må være ukryptert. Indeksen inneholder ikke sensitive data." System godtar endringen og logger det.

Du velger A) og agenten fixer søket til å være sikkert. Regresjonsvarsel forsvinner.

## Relaterte features

- **fase-gates** — Regresjonsrapport vises ved fase-overgang
- **de-7-fasene** — Fase 3 definerer baseline, Fase 5 overvåkes
- **sikkerhet** — Regresjonsovervåking fokuserer på sikkerhetskrav

---

*Definert i: Kit CC/Agenter/agenter/system/agent-PHASE-GATES.md (regresjonsovervåking-seksjon)*
*Lagt til: 2026-02-17*
*Kategori: Kvalitetssikring*
