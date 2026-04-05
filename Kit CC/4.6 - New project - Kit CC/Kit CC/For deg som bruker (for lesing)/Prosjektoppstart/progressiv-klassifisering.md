# Progressiv klassifisering

> Kit CC stiller få, enkle spørsmål først – og ber om mer detaljer bare når det er nødvendig.

## Hva gjør den?

I stedet for å bombekaste deg med 7 tekniske spørsmål, bruker progressiv klassifisering en intelligent to-trinns strategi. Først får du 3 enkle åpningsspørsmål i hverdagsspråk: "Hva skal du bygge?", "Hvem er brukerne dine?", og "Lagres det personlig informasjon?".

Basert på svarene dine trigges automatisk 0 til 4 oppfølgingsspørsmål – bare hvis det er relevant. For eksempel: Hvis du sier at du bygger en nettbutikk, spørres du om betaling. Hvis du bygger en API, spørres ikke om brukergrensesnitt. Bak kulissene mapper systemet svarene dine til 7 interne tekniske dimensjoner – men du ser aldri teknisk sjargong.

## Hvorfor er det nyttig?

Normale klassifiseringsprosesser føles som utfyllinger som tar for lang tid. Du må gjette hva AI-en egentlig spør om. Progressiv klassifisering gjør prosessen naturlig og rask – den virker som en normal samtale i stedet for et spørreskjema. Du får bare relevante spørsmål, ikke "bremsklosser" som ikke passer ditt prosjekt.

## Hvordan fungerer det?

1. **Fase 1 – Åpningsspørsmål (alltid stilt):**
   - "Hva skal du bygge?" (åpen tekstsvar)
   - "Hvem er dine brukere?" (åpen tekstsvar)
   - "Lagres det sensitiv informasjon?" (ja/nei med oppfølging)

2. **Fase 2 – Intelligente oppfølginger (triggeres kun hvis relevant):**
   - Hvis e-handel nevnes → Spørsmål om betalingsmetoder
   - Hvis innlogging nevnes → Spørsmål om autentisering
   - Hvis kart nevnes → Spørsmål om geografisk data
   - Hvis vedlegg nevnes → Spørsmål om filbehandling
   - Hvis API nevnes → Spørsmål om integrasjoner
   - Hvis data nevnes → Spørsmål om mengde/type data
   - Hvis ytelse nevnes → Spørsmål om brukertall

3. **Bak kulissene – AI-mapping (usynlig for bruker):**
   - Svar mappes til 7 dimensjoner: Prosjekttype, skala, kompleksitet, sikkerhet, integrasjoner, databehandling, og brukeropplevelse
   - Hver dimensjon får en score basert på ordet brukeren brukte og konteksten

## Eksempel

**Bruker:** "Jeg skal bygge en webshop for håndlagde sølvsmykker."

**Åpningsspørsmål 1 – Svar:** En nettbutikk for smykker (lyst av gull, sølv osv)

**Åpningsspørsmål 2 – Svar:** Håndverkere og hobbyister som vil selge online

**Åpningsspørsmål 3 – Svar:** Ja, vi lagrer adresser og betalingsinformasjon

**System trigges automatisk:**
- "Hvilke betalingsmåter?" → Bruker svarer: "Kort og Vipps"
- "Trenger du lagerhaket?" → Bruker svarer: "Ja, lagerstatus for hver variant"
- "Variantbehandling?" → Bruker svarer: "Farge og størrelse"

**Bak kulissene mappes:**
- Prosjekttype: E-handel ✓
- Skala: Liten (1000-5000 produkter anslått) ✓
- Kompleksitet: Middels (betalinger, lager, varianter) ✓
- Sikkerhet: Høy (PCI-DSS, personinfo, betalinger) ✓
- Integrasjoner: Betaling (Stripe/Vipps), evt. lagerserver ✓
- Databehandling: Moderate mengder ✓
- UX: Nettkatalog + handlekurv + checkout ✓

Bruker ser en liten status som sier: "Jeg har forstått at dette er en e-handelskjede med betalinger og lagerstyring. Skal vi legge til X?" – aldri "Prosjektkompleksitet-score: 16/28".

## Relaterte features
- integrasjonsanalyse.md — Automatisk utleding av integrasjoner basert på klassifisering
- confidence-scoring.md — Sikkerhetsscore for klassifiseringsdatakvalitet
- bildestrategi.md — Automatisk valg av bildeløsning basert på prosjekttype

---
*Definert i: Kit CC/Agenter/agenter/system/agent-AUTO-CLASSIFIER.md*
*Lagt til: 2026-02-17*
*Kategori: Prosjektoppstart*
