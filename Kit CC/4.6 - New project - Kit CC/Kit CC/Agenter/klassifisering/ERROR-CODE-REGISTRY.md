# FEILTYPE-TAKSONOMI — Kit CC

> **Versjon:** 2.0.0
> **Opprettet:** 2026-02-05 | **Revidert:** 2026-02-19
> **Formål:** Klassifisering av feiltyper for strukturert logging i PROGRESS-LOG

---

## BRUK

Feiltyper brukes i PROGRESS-LOG logfmt-format:
```
ts=HH:MM event=ERROR type=[feiltype] desc="[beskrivelse]" fix="[løsning]"
```

## FEILTYPER

| Type | Beskrivelse | Eksempler | Alvorlighet |
|------|-------------|-----------|-------------|
| `state` | Tilstandsfeil i PROJECT-STATE.json eller PROGRESS-LOG | Korrupt JSON, manglende felt, inkonsistent data | KRITISK |
| `planning` | Feil i oppgaveplanlegging eller faseovergang | Gate-validering feilet, manglende MÅ-oppgaver, feil faserekkefølge | HØY |
| `execution` | Feil under oppgaveutførelse | Kode kompilerer ikke, test feiler, fil ikke funnet | HØY |
| `context` | Kontekstfeil — manglende eller feil kontekst | Agent-fil ikke funnet, mission briefing mangler, Lag 2-fil utilgjengelig | MEDIUM |
| `communication` | Kommunikasjonsfeil mellom agent og bruker | Uklart svar, misforstått instruksjon, manglende bekreftelse | MEDIUM |
| `dependency` | Ekstern avhengighet feilet | npm install feilet, API utilgjengelig, Monitor startet ikke | MEDIUM |
| `timeout` | Kontekstbudsjett eller tidsavbrudd | Budsjett nådd, sesjon avbrutt uventet | LAV |
| `validation` | Valideringsfeil i input eller output | Ugyldig filformat, schema-brudd, manglende påkrevde felt | MEDIUM |

## ALVORLIGHETS-RESPONS

| Alvorlighet | Agent-respons |
|-------------|---------------|
| KRITISK | Stopp arbeid, informer bruker, tilby gjenoppretting |
| HØY | Pause, forsøk alternativ tilnærming, informer bruker ved feil |
| MEDIUM | Logg, forsøk automatisk recovery, informer ved gjentatt feil |
| LAV | Logg og fortsett |

## ESKALERING

Alle feil med alvorlighet HØY eller KRITISK → Informer bruker i klartekst.
Ved gjentatt feil (3+ av samme type i én sesjon) → Uansett alvorlighet, informer bruker.

---

> Erstatter tidligere ERROR-CODE-REGISTRY v1.0.0 (73 individuelle feilkoder).
> Ny modell basert på industri-standard feiltype-taksonomi for AI-agentsystemer.
