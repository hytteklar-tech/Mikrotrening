# Oppgavekompleksitet

> Hver oppgave scores på kompleksitet, og hvis den avviker mye fra prosjektets gjennomsnittlige intesitet, varsler systemet deg med en 80/20-advarsel.

## Hva gjør den?

Oppgavekompleksitet er et poengssystem som måler hvor vanskelig en oppgave er. Hver oppgave scores fra 0 til 10, basert på fire faktorer:

1. **Sikkerhet (0-3 poeng):** Hvor mye oppgaven påvirker sikkerhet. Eksempel: "Legge til innloggingsfunksjonalitet" = 3 poeng. "Rendre en overskrift" = 0 poeng.

2. **Integrasjon (0-3 poeng):** Hvor mange andre systemer oppgaven må snakke med. Eksempel: "Integrere betaling via Stripe" = 3 poeng. "Skrive en hjelpefunksjon" = 0 poeng.

3. **Tilstandshåndtering (0-2 poeng):** Hvor komplisert er det å holde rede på data? Eksempel: "Lagre og oppdatere brukerinnstillinger" = 2 poeng. "Vise en statisk liste" = 0 poeng.

4. **Testing (0-2 poeng):** Hvor mye testing trengs? Eksempel: "Betaling må være sikker og pålitelig" = 2 poeng. "En enkel knapp" = 0 poeng.

**Eksempel:** Oppgaven "Implementer innlogging med Google OAuth" scorer:
- Sikkerhet: 3 (håndterer passord og tokens)
- Integrasjon: 3 (snakker med Google API)
- Tilstandshåndtering: 1 (lagrer session-data)
- Testing: 1 (må teste login-flow)
- **Total: 8/10 (veldig kompleks)**

## Hvorfor er det nyttig?

Oppgavekompleksitet hjelper Kit CC på to måter:

**1. Matching mellom oppgave og prosjektstørrelse:**
Ditt prosjekt har en "gjennomsnittlig intensitet" basert på klassifiseringen. Et hobby-prosjekt har intensitet rundt 2-3, et enterprise-system rundt 8-9.

Hvis du får en oppgave som er mye vanskeligere enn normalt (f.eks. intensitet 1-prosjekt får en oppgave med kompleksitet 9), varsler systemet: "⚠️ 80/20-advarsel: Denne oppgaven er langt vanskeligere enn resten av prosjektet. Det kan bety at dine estimater blir dårlige. Vil du dele oppgaven i mindre biter?"

**2. Risikospotting:**
Hvis du oppleverer at oppgaver plutselig blir mye vanskeligere, kan det bety at prosjektet har fått høyere krav enn du forventet. Systemet flag-ger dette så du kan justere planen.

## Hvordan fungerer det?

**Scoringen gjøres av agenten:**
Når ITERASJONS-agenten (Fase 5) starter en ny oppgave, leser den oppgavedeskripsjonen og scorer den. Scoren lagres i modulregisteret under `complexity: X`.

**Sammenligningen med prosjektintensitet:**
Kit CC beregner gjennomsnittskompleksitet for alle oppgaver hittil. Hvis denne ligger langt fra prosjektintensiteten, varsler den.

**Formelen for 80/20-advarsel:**
```
IF |oppgavekompleksitet - prosjektintensitet| >= 3:
  ADVARSEL: "Denne oppgaven er uvanlig vanskelig/enkel for ditt prosjekt"
```

Eksempel:
- Prosjektintensitet: 4 (vanlig app)
- Oppgave 1: Kompleksitet 5 (OK, innenfor 80/20)
- Oppgave 2: Kompleksitet 3 (OK, innenfor 80/20)
- Oppgave 3: Kompleksitet 9 (⚠️ ADVARSEL! Avvik på 5 poeng)

## Eksempel

Du bygger en enkel notater-app (intensitet 3). Her er oppgavesekvensen:

**Oppgave 1: Opprett database**
- Sikkerhet: 1 (grunnleggende)
- Integrasjon: 0 (bare lokal database)
- Tilstand: 1 (tabellstruktur)
- Testing: 0 (enkel oppsett)
- **Total: 2/10 (enkelt) ✅**

**Oppgave 2: Lag innlogging**
- Sikkerhet: 3
- Integrasjon: 2 (Google OAuth)
- Tilstand: 1
- Testing: 2
- **Total: 8/10 (kompleks) ⚠️**

Systemet varsler: "⚠️ 80/20-advarsel: Oppgave 2 (innlogging, kompleksitet 8) er langt vanskeligere enn gjennomsnittet i ditt prosjekt (intensitet 3). Normalt holder du deg rundt 2-4. Vil du dele innloggingen i mindre oppgaver? Eksempel: (1) Grunnleggende login-form, (2) Google OAuth-integrasjon, (3) Sikkerhet og token-håndtering."

Du kan velge:
- **A)** "Ja, del det opp" → Systemet gir deg 3 mindre oppgaver hver med kompleksitet 3-4
- **B)** "Nei, gjør det hele nå" → Du aksepterer risikoen, og systemet logger at dette var uvanlig
- **C)** "Omvurder prosjektstørrelse" → Kanskje du underestimerte prosjektet? Du kan re-klassifisere

## Relaterte features

- **de-7-fasene** — Fase 5 bruker kompleksitets-scoring
- **modulregistrering** — Kompleksitet lagres der
- **fase-gates** — Kvalitets-score påvirkes av kompleksiteten på oppgavene

---

*Definert i: Kit CC/Agenter/agenter/system/protocol-TASK-COMPLEXITY-ASSESSMENT.md og Kit CC/Agenter/agenter/system/doc-INTENSITY-MATRIX.md*
*Lagt til: 2026-02-17*
*Kategori: Kvalitetssikring*
