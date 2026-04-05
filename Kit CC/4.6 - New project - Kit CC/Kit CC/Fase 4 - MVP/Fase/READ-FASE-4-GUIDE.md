# Fase 4: MVP - Sett opp prosjektet - Første fungerende versjon (Prosjektleder-guide)

> **Mål:** Bygge en fungerende versjon så raskt som mulig – med sikkerhet innebygd fra starten.

---

## Om denne guiden

**Målgruppe:** Ikke-tekniske vibekodere/prosjektledere som styrer utviklingsprosjekter med AI-verktøy.

**Hvordan bruke guiden:**
- Les innholdsfortegnelsen for å få oversikt
- Hvert punkt forklarer HVA det handler om, HVORFOR det er viktig, og VERDIEN
- Bruk sjekklistene for å sikre at ingenting glemmes
- Referer til denne guiden når du gir instruksjoner til AI

---

## Symbolforklaring

| Symbol | Betydning |
|--------|-----------|
| 🔴 | **Kritisk** – Må være på plass før MVP kan lanseres |
| 🟡 | **Viktig** – Bør være på plass, kan utsettes kort tid |
| 🟢 | **Anbefalt** – Nice to have, gir ekstra verdi |
| 💡 | **Tips** – Praktiske råd |
| ⚠️ | **Advarsel** – Viktige fallgruver å unngå |

---

## Innholdsfortegnelse

### Del A: Grunnleggende forståelse
1. Hva er MVP-fasen?
2. Vibe-kodingens muligheter og risikoer

### Del B: Blokk A — Prosjektoppsett (infrastruktur) (🔴)
3. Prosjekt-setup med sikkerhet
4. Moderne hemmelighets-håndtering
5. Supply chain-sikkerhet og pakkevalidering
6. CI/CD med sikkerhetsskanning

### Del B2: Blokk B — Første fungerende prototype (🔴)
7. Kjernefunksjonalitet med input-validering
8. API-sikkerhet og rate limiting
9. Autentisering implementert
10. Happy path fungerer og er sikret
11. Grunnleggende tester
12. Verifisering av AI-generert kode

### Del C: Viktige elementer (🟡)
13. Feilhåndtering (sikker)
14. Logging (uten sensitiv data)
15. Feature flags og kill switch
16. README med sikkerhetsinstruksjoner
17. Personvern ved bruk av AI-tjenester
18. Regulatoriske krav

### Del D: Anbefalte elementer (🟢)
19. Dummy-data
20. Rollback-strategi
21. SBOM – Software Bill of Materials
22. Zero Trust-prinsipper

### Del E: Prosjektleder-verktøy
23. Sjekkliste for prosjektleder
24. Red flags å se etter
25. Spørsmål å stille AI/team
26. Suksessmålinger
27. Kriterier for å gå videre

---

# Del A: Grunnleggende forståelse

## 1. Hva er MVP-fasen?

MVP (Minimum Viable Product) er den enkleste versjonen av produktet som fortsatt gir verdi til brukerne. I denne fasen bygger vi en fungerende prototype som:

- Demonstrerer at idéen fungerer i praksis
- Kan testes av ekte brukere for å få tilbakemeldinger
- Har grunnleggende sikkerhet på plass fra starten
- Danner grunnlaget for videre utvikling

### Problemet uten god MVP-prosess

| Uten god prosess | Med god prosess |
|-----------------|-----------------|
| Sikkerhetshull som må fikses senere (dyrt) | Sikkerhet innebygd fra start (billig) |
| Lang utviklingstid før feedback | Rask feedback fra brukere |
| Usikkerhet om idéen fungerer | Validert konsept |
| Teknisk gjeld fra dag én | Solid fundament å bygge på |

### Tidsramme

En typisk MVP bør kunne bygges på **2-6 uker** avhengig av kompleksitet. Hvis det tar lengre tid, er scopet sannsynligvis for stort.

💡 **For investorer:** 70% av investorer krever nå teknisk validering av AI-bygde MVPer før de vurderer finansiering.

---

## 2. Vibe-kodingens muligheter og risikoer

"Vibe-koding" er en måte å utvikle programvare på der du beskriver hva du vil ha med naturlig språk, AI-assistenten genererer koden, og din rolle skifter fra "koder" til "kvalitetssikrer".

### Statistikk du bør kjenne til

| Funn | Kilde |
|------|-------|
| 45% av vibe-kodet kode har sikkerhetsfeil | Veracode 2025 |
| 20% av AI-anbefalte pakker eksisterer ikke | Socket.dev |
| 66% av utviklere bruker tid på å fikse "nesten riktig" AI-kode | JetBrains 2025 |

### Gyllen regel

> **"Behandle AI-generert kode som kode fra en junior utvikler – den trenger alltid review før den brukes."**

### Når du IKKE bør stole på AI alene
- Autentisering og tilgangskontroll
- Kryptering og sikker datahåndtering
- Betalingsintegrasjoner
- Behandling av personopplysninger

---

# Del B: Kritiske elementer (🔴)

> **Fase 4 er delt i to blokker:**
> - **Blokk A (punkt 3-6):** Prosjektoppsett — Først setter vi opp verktøyene og infrastrukturen. Dette er fundamentet alt annet bygges på.
> - **Blokk B (punkt 7-12):** Første fungerende prototype — Så bygger vi den første versjonen du kan se og teste. Denne versjonen har grunnleggende sikkerhet og én fungerende brukerflyt (happy path).
>
> **Gjør Blokk A ferdig før du starter Blokk B.** Infrastrukturen MÅ være på plass før du begynner å bygge.

---

## Blokk A: Prosjektoppsett (infrastruktur)

> **Mål:** Sette opp utviklingsmiljøet, sikkerhetsvakter, og automatisering FØR du skriver en eneste linje produktkode.

## Oversikt over kritiske elementer

| # | Element | Hvorfor kritisk |
|---|---------|-----------------|
| 3 | Prosjekt-setup | Riktig grunnlag forhindrer fremtidige problemer |
| 4 | Hemmelighets-håndtering | Eksponerte nøkler = full tilgang for angripere |
| 5 | Supply chain-sikkerhet | Ondsinnede pakker kan ta over systemet |
| 6 | CI/CD | Automatiserer kvalitetssikring |
| 7 | Input-validering | Forhindrer de vanligste angrepene |
| 8 | API-sikkerhet | Stopper automatiserte angrep |
| 9 | Autentisering | Sikrer hvem som har tilgang |
| 10 | Happy path sikret | Brukere kan ikke se hverandres data |
| 11 | Tester | Bekrefter at sikkerhet fungerer |
| 12 | AI-kode verifisert | Fanger sikkerhetsfeil før lansering |

---

## 3. 🔴 Prosjekt-setup med sikkerhet

### Hva det handler om
Å sette opp utviklingsmiljøet riktig fra dag én, med verktøy som automatisk hjelper deg unngå vanlige feil.

### Problemet
- Hackere søker GitHub etter eksponerte API-nøkler 24/7
- Én eksponert AWS-nøkkel kan koste hundretusenvis i løpet av timer
- 110,000+ domener ble kompromittert via eksponerte .env-filer i 2024

### Verdien
- ✅ Automatisk oppdagelse av feil før de blir problemer
- ✅ Sikkerhet som "default"
- ✅ Trygghet om at hemmeligheter ikke lekker

### Viktighet per prosjekttype
| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Moderat | Viktig | Kritisk | Kritisk |

---

## 4. 🔴 Moderne hemmelighets-håndtering

### Hva det handler om
Sikker lagring og håndtering av API-nøkler, databasepassord, og andre sensitive data.

### Problemet
- 96% av organisasjoner sliter med hemmeligheter spredt overalt
- Gjennomsnittlig kostnad for et databrudd: $4.88 millioner (2024)

### Verdien
- ✅ Hemmeligheter aldri i kildekode
- ✅ Kryptert lagring
- ✅ Tilgangskontroll per miljø og person

### Viktighet per prosjekttype
| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Basis | Viktig | Kritisk | Kritisk |

⚠️ **Advarsel:** Hvis du tror en hemmelighet er eksponert – roter den UMIDDELBART. Ikke vent og se.

---

## 5. 🔴 Supply chain-sikkerhet

### Hva det handler om
Sikre at alle biblioteker og pakker du bruker er ekte, trygge og oppdaterte.

### Problemet
AI-assistenter foreslår pakkenavn som ikke eksisterer i 20% av tilfellene. Angripere publiserer ondsinnede pakker med disse navnene.

**Store angrep i 2025:**
| Angrep | Konsekvens |
|--------|------------|
| s1ngularity | Nx build system kompromittert, stjal tokens |
| Shai-Hulud | 40+ npm-pakker infisert |
| Shai-Hulud 2.0 | 25,000+ GitHub-repositories påvirket |

### Verdien
- ✅ Unngår å installere falske pakker
- ✅ Oppdager kjente sårbarheter
- ✅ Kan reagere raskt når nye sårbarheter oppdages

### Viktighet per prosjekttype
| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Viktig | Kritisk | Kritisk | Kritisk |

💡 **Tips:** Når AI foreslår en pakke du ikke har hørt om – be om alternativer fra kjente kilder først.

---

## 6. 🔴 CI/CD med sikkerhetsskanning

### Hva det handler om
Automatisk testing og publisering av kode, med sikkerhetsskanning som del av prosessen.

### Problemet
Uten CI/CD:
- Endringer må testes manuelt
- Sikkerhetsproblemer oppdages først i produksjon
- Publisering blir risikabelt

### Verdien
- ✅ Automatisk kvalitetssikring på hver endring
- ✅ Sikkerhetsproblemer fanges før lansering
- ✅ Trygg og forutsigbar publisering

### Viktighet per prosjekttype
| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Anbefalt | Viktig | Kritisk | Kritisk |

💡 **Tips:** Start med enkel CI/CD (auto-deploy fra GitHub) og legg til sikkerhetsskanning gradvis.

---

## Blokk B: Første fungerende prototype

> **Mål:** Bygge den første versjonen du kan se og teste. Denne har grunnleggende sikkerhet, én fungerende brukerflyt (happy path), og autentisering.
>
> **Forutsetning:** Blokk A (prosjektoppsett) er ferdig.

---

## 7. 🔴 Kjernefunksjonalitet med input-validering

### Hva det handler om
Sjekke at all data fra brukere er riktig type, format og innenfor akseptable grenser.

### Problemet
Uten validering er systemet sårbart for:
| Angrep | Konsekvens |
|--------|------------|
| SQL Injection | Datatyveri |
| XSS | Kapring av brukersesjoner |
| Command Injection | Full servertilgang |

### Verdien
- ✅ Beskyttelse mot de vanligste angrepene
- ✅ Stabil applikasjon som ikke krasjer
- ✅ Bedre brukeropplevelse med tydelige feilmeldinger

### Viktighet per prosjekttype
| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Viktig | Kritisk | Kritisk | Kritisk |

---

## 8. 🔴 API-sikkerhet og rate limiting

### Hva det handler om
Beskytte API-et mot automatiserte angrep og misbruk.

### Problemet
Uten API-sikkerhet kan angripere:
- Prøve tusenvis av passord (brute force)
- Oversvømme systemet (DDoS)
- Misbruke betalte tjenester (store kostnader)

### Verdien
- ✅ Beskyttelse mot automatiserte angrep
- ✅ Kontroll over kostnader
- ✅ Stabil ytelse under høy last

### Viktighet per prosjekttype
| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Moderat | Viktig | Kritisk | Kritisk |

---

## 9. 🔴 Autentisering implementert

### Hva det handler om
Systemet som lar brukere registrere seg, logge inn, og håndterer sesjoner.

### Problemet
Å bygge eget autentiseringssystem er ekstremt risikabelt og kan føre til:
- Konto-overtakelse
- Datatyveri
- Juridisk ansvar (GDPR-brudd)

### Verdien
Ved å bruke etablerte løsninger får du:
- ✅ Sikker passord-hashing
- ✅ Brute-force beskyttelse
- ✅ "Glemt passord"-flyt
- ✅ OAuth/sosial login
- ✅ Multi-faktor autentisering

### Viktighet per prosjekttype
| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Enkel/valgfritt | Standard | Robust | Enterprise |

⚠️ **Gyllen regel:** Aldri bygg eget autentiseringssystem.

---

## 10. 🔴 Happy path fungerer og er sikret

### Hva det handler om
Hovedscenariet der alt går som planlagt – og sikre at brukere kun kan se sine egne data.

### Problemet
"Broken Access Control" er #1 sikkerhetsproblem i webapplikasjoner (OWASP Top 10).

Eksempel:
- Bruker A endrer ID i URL og får tilgang til bruker Bs data

### Verdien
- ✅ Brukere kan kun se og endre sine egne data
- ✅ Systemet er forutsigbart og pålitelig
- ✅ Grunnlag for videre utvikling er solid

### Viktighet per prosjekttype
| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Viktig | Viktig | Kritisk | Kritisk |

💡 **Tips:** Be alltid om en demonstrasjon: "Vis meg at bruker A ikke kan se bruker Bs data."

---

## 11. 🔴 Grunnleggende tester

### Hva det handler om
Automatiske tester som verifiserer at koden fungerer som forventet.

### Problemet
Med AI-generert kode er testing EKSTRA viktig fordi:
- AI kan generere kode som ser riktig ut men har subtile feil
- 45% av AI-kode har sikkerhetsfeil som tester kan fange

### Verdien
- ✅ Feil fanges før de når brukere
- ✅ Endringer kan gjøres uten frykt
- ✅ Dokumentasjon av hvordan systemet skal fungere

### Viktighet per prosjekttype
| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Valgfritt | Anbefalt | Viktig | Kritisk |

---

## 12. 🔴 Verifisering av AI-generert kode

### Hva det handler om
Systematisk gjennomgang av kode generert av AI for å fange sikkerhetsproblemer.

### Problemet
| Problem | Frekvens |
|---------|----------|
| Hardkodede hemmeligheter | Vanlig |
| Manglende validering | 45% av kode |
| Hallusinerte pakker | 20% |

### Verdien
- ✅ Høyere kodekvalitet
- ✅ Færre sikkerhetsproblemer i produksjon
- ✅ Redusert "productivity tax"

### Viktighet per prosjekttype
| Lite internt | Internt m/DB | Kundevendt | Stor skala |
|--------------|--------------|------------|------------|
| Viktig | Kritisk | Kritisk | Kritisk |

---

# Del C: Viktige elementer (🟡)

## 13-18: Sammendrag

| # | Element | Hva det handler om | Viktighet |
|---|---------|-------------------|-----------|
| 13 | Feilhåndtering | Gi nyttige meldinger uten å avsløre tekniske detaljer | Viktig |
| 14 | Logging | Registrere hva som skjer uten å logge sensitive data | Moderat |
| 15 | Feature flags | Skru funksjoner av/på uten å deploye ny kode | Anbefalt |
| 16 | README | Dokumentasjon for oppsett og sikkerhet | Moderat |
| 17 | AI-personvern | Ikke del sensitive data med AI-tjenester | Moderat |
| 18 | Regulatoriske krav | GDPR-compliance og lignende | Viktig for kundevendt |

---

# Del D: Anbefalte elementer (🟢)

| # | Element | Hva det handler om |
|---|---------|-------------------|
| 19 | Dummy-data | Testdata som ser realistisk ut uten personinfo |
| 20 | Rollback-strategi | Plan for å gå tilbake hvis noe går galt |
| 21 | SBOM | Liste over alle komponenter i programvaren |
| 22 | Zero Trust | "Aldri stol på, alltid verifiser" |

---

# Del E: Prosjektleder-verktøy

## 23. Sjekkliste for prosjektleder

### Før utvikling starter
- [ ] Er prosjektsetup gjort med sikre defaults?
- [ ] Er .gitignore konfigurert riktig?
- [ ] Er .env.example på plass (uten ekte verdier)?

### Under utvikling
- [ ] Valideres all input på server-side?
- [ ] Brukes etablert auth-løsning (ikke egenbygd)?
- [ ] Er AI-generert kode gjennomgått?
- [ ] Finnes det pakker som AI foreslo som vi bør verifisere?

### Før lansering
- [ ] Kjører CI/CD med sikkerhetsskanning?
- [ ] Er det tester for autentisering og autorisasjon?
- [ ] Vis meg at bruker A ikke kan se bruker Bs data
- [ ] Vis meg at API returnerer 401 uten innlogging
- [ ] Er README komplett?

---

## 24. Red flags å se etter

| Tegn | Mulig problem |
|------|---------------|
| "Vi bygger egen innlogging" | Høy risiko |
| "Vi deaktiverte linting fordi det tok tid" | Kodekvalitet lider |
| API-nøkler i koden | Sikkerhetsbrist |
| Ingen tester | Høy risiko ved endringer |
| "Det funker på min maskin" | Mangler CI/CD |
| AI foreslår pakker du aldri har hørt om | Supply chain-risiko |
| Feilmeldinger viser filstier eller database-info | Informasjonslekkasje |

---

## 25. Spørsmål å stille AI/team

### Om sikkerhet
1. "Hvor lagres hemmelighetene (API-nøkler, passord)?"
2. "Hva skjer hvis en bruker sender ugyldig data?"
3. "Kan en bruker se en annen brukers data?"
4. "Hva ser brukeren hvis noe går galt?"

### Om kvalitet
5. "Hvilke pakker bruker vi, og er de verifisert?"
6. "Har vi tester for sikkerhetskritisk funksjonalitet?"
7. "Hvordan ruller vi tilbake hvis noe går galt?"

### Om dokumentasjon
8. "Finnes det instruksjoner for hvordan sette opp prosjektet?"
9. "Er alle miljøvariabler dokumentert?"

---

## 26. Suksessmålinger

| Måling | Mål | Hvordan måle |
|--------|-----|--------------|
| Happy path fungerer | 100% | Manuell test |
| Sikkerhetstester passerer | 100% | CI/CD |
| npm audit | 0 high/critical | `npm audit` |
| Secrets i kode | 0 | GitGuardian/TruffleHog |
| Lint-feil | 0 | ESLint |
| Test-dekning (kritisk kode) | >50% | Coverage-rapport |

---

## 27. Kriterier for å gå videre til Fase 5

### MÅ være oppfylt
- [ ] Hemmeligheter er IKKE i koden
- [ ] All input valideres på server-side
- [ ] Autentisering bruker etablert løsning
- [ ] Bruker A kan ikke se bruker Bs data
- [ ] CI/CD deployer automatisk
- [ ] Grunnleggende tester finnes
- [ ] AI-generert kode er gjennomgått

### BØR være oppfylt
- [ ] Sikkerhetsskanning i CI/CD
- [ ] Feilmeldinger avslører ikke tekniske detaljer
- [ ] Logger inneholder ikke sensitiv data
- [ ] README er komplett

---

# Vedlegg

## Ordliste for ikke-tekniske

| Begrep | Forklaring |
|--------|------------|
| **API** | Måten programmer snakker med hverandre på |
| **Autentisering** | Verifisere hvem du er (innlogging) |
| **Autorisasjon** | Hva du har lov til å gjøre |
| **CI/CD** | Automatisk testing og publisering |
| **Frontend** | Det brukeren ser (nettsiden) |
| **Backend** | Serveren som behandler data |
| **Token** | Midlertidig "nøkkel" som beviser at du er innlogget |
| **Injection** | Angrep der ondsinnet kode "injiseres" |
| **XSS** | Angrep der JavaScript kjøres i andres nettleser |
| **Rate limiting** | Begrensning på antall forespørsler |
| **SBOM** | Liste over alle komponenter i programvaren |
| **GDPR** | EUs personvernforordning |
| **MVP** | Minimum Viable Product - enkleste fungerende versjon |

---

## Ressurser og lenker

### Dokumentasjon
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - De vanligste sikkerhetsproblemene
- [MVSP.dev](https://mvsp.dev/) - Minimum Viable Secure Product sjekkliste

### Verktøy
- [Snyk](https://snyk.io/) - Dependency scanning
- [GitGuardian](https://www.gitguardian.com/) - Secrets detection
- [Doppler](https://www.doppler.com/) - Secrets management

### Auth-løsninger
- [Supabase Auth](https://supabase.com/auth)
- [Clerk](https://clerk.com/)
- [Auth.js](https://authjs.dev/)

---

## Tidsestimater

| Prosjekttype | Estimert tid for Fase 4 |
|--------------|------------------------|
| Enkel web-app | 1-2 uker |
| Web-app med database | 2-4 uker |
| Mobile app | 3-6 uker |
| Chrome Extension | 1-2 uker |

*Tid kan reduseres med vibe-koding, men bruk spart tid på verifisering av AI-generert kode.*

---

## Hva om noe går galt?

**Hva om koden ikke kompilerer?**
Det er helt normalt med vibe-koding. AI genererer kode som er "nesten riktig". Be AI om å fikse kompileringsfeilene: "Jeg får denne feilen: [feilmelding]. Hva skal endres?" Vanligvis er det små typo-er eller manglende imports. Sjekk at du bruker riktig Node/Python-versjon også.

**Hva om MVP-en er brukket?**
MVP starter fra Blokk A (infrastruktur) – ikke Blokk B (koding). Hvis du hopper rett til koding, blir alt verre. Gå tilbake: er git configurert? Er hemmeligheter i miljøvariabler? Er CI/CD på plass? Først DERETTER bygger vi funksjoner.

**Hva om jeg sitter fast på en bug?**
Isoler buggen: "Hva er det minste stykket kode som viser feilen?" Be AI om å fikse akkurat det. Hvis det ikke hjelper, prøv å revert til sist kjente god versjon og start på nytt. Å bruke 30 minutter på å forstå gi den til AI er bedre enn å sitte fast i 3 timer.

---

## Neste steg

Når alle leveranser er på plass og sjekklisten er fullført:

> **Si til AI:** "Fase 4 er ferdig. Kjør fase-gate og gå videre til Fase 5."

AI-en vil da kjøre en kvalitetssjekk (fase-gate) og forberede neste fase for deg.

---

**Dokumentversjon:** 2.0 (Prosjektleder-versjon)
**Sist oppdatert:** Januar 2026
**Neste fase:** Fase 5 - Bygg funksjonene
