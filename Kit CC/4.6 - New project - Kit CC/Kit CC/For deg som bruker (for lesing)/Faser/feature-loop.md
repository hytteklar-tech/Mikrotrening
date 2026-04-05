# Feature-loop

> Fase 5 er en gjentakende loop hvor hver funksjon bygges, testes, forbedres og godkjennes før neste funksjon starter.

## Hva gjør den?

Feature-loopen er kjernen i Fase 5 (Bygg funksjonene). I stedet for å bygge hele prosjektet på en gang, jobber du med én funksjon av gangen i en forutsigbar syklus:

1. **Bygg** — Agenten implementerer funksjonen
2. **Test & Fiks** — Agenten tester, fikser bugs og forbedrer koden
3. **Godkjenn** — Du godkjenner eller ber om endringer
4. **Neste funksjon** — Loop gjentas med neste funksjon

Loopen fortsetter til ALLE funksjoner i modulregisteret har status "Done". Du styrer tempoet ved å si "Go" (start neste), "Mer arbeid" (flere poleringsrunder), eller "Blokkert" (hvis noe hindrer fremdriften).

## Hvorfor er det nyttig?

En loop sikrer at:
- **Fokus.** Agenten jobber med én ting av gangen, ikke alt samtidig.
- **Kontroll.** Du godkjenner hver funksjon før den er "ferdig", så det blir ingen overraskelser.
- **Kvalitet.** Tester og forbedringer skjer rundt hver funksjon, ikke bare på slutten.
- **Synlighet.** Du vet alltid hvilken funksjon som bygges og hvor langt den er.

## Hvordan fungerer det?

**Modulregisteret bestemmer rekkefølge:**
Før loopen starter, lister modulregisteret opp alle funksjoner. MVP-funksjoner bygges først, så "BØR ha"-funksjoner, så "KAN ha"-funksjoner. Dette sikrer at de viktigste tingene blir gjort først.

**Hver iterasjon av loopen:**
1. Agenten tar første funksjon med status "Pending"
2. Agenten bygger hele funksjonen (kode, tester, dokumentasjon)
3. Agenten kjører tester og fikser bugs
4. Du får beskjed: "Funksjon X er ferdig. OK?"
5. Du sier: "Go" (er OK, gå til neste), "Mer arbeid" (gjør mer poleringsrunder), eller "Blokkert" (hindring)
6. Agenten oppdaterer status og starter neste funksjon

**Avhengigheter håndteres automatisk:**
Hvis funksjon B avhenger av funksjon A, venter agenten automatisk til A er ferdig før B starter.

## Eksempel

Du bygger en blogg-app. Modulregisteret sier:
- Modul 1: Admin-panel (MVP)
- Modul 2: Blogginnlegg (MVP)
- Modul 3: Kommentarer (BØR ha)
- Modul 4: Søk (KAN ha)

**Loop-iterasjon 1:**
- Agenten bygger admin-panelet (login, brukeradministrasjon)
- Du godkjenner → "Go"

**Loop-iterasjon 2:**
- Agenten bygger blogginnlegg (skrive, redigere, slette)
- Du tester og ser at formatet er feil → "Mer arbeid"
- Agenten forbedrer formatet
- Du godkjenner → "Go"

**Loop-iterasjon 3:**
- Agenten bygger kommentarer
- Du godkjenner → "Go"

**Loop-iterasjon 4:**
- Agenten bygger søk
- Du godkjenner → "Go"

**Loop ferdig:** Alle funksjoner har status "Done". Du går videre til Fase 6 (testing).

## Relaterte features

- **de-7-fasene** — Fase 5 er del av denne
- **modulregistrering** — Hvordan funksjoner organiseres
- **tre-byggemodus** — Hvordan du styrer hver iterasjon

---
*Definert i: Kit CC/Features/Faser/feature-loop.md*
*Lagt til: 2026-02-17*
*Kategori: Faser*
