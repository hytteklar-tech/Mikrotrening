# Go/No-Go Vurdering — Sommerkropp

## Vurdering: ✅ GO

## Styrker
- Enkel, avgrenset idé med klar verdi
- Ingen ekstern avhengighet (betaling, tredjepart-API bortsett fra SMS/OTP)
- Liten, kjent målgruppe → lavt markedsrisiko
- Ingen regulatorisk kompleksitet (GDPR-light håndteres enkelt)

## Risikoer
| Risiko | Sannsynlighet | Konsekvens | Tiltak |
|--------|--------------|------------|--------|
| SMS/OTP-kostnad skalerer | LAV | LAV | Bruk gratis tier (Twilio/Firebase) innledningsvis |
| Lav daglig bruk etter oppstart | MEDIUM | MEDIUM | Streak + leaderboard er kjernemotivasjon |
| GDPR-mobilnummer | LAV | LAV | Enkel personvernerklæring i Fase 6 |

## Konklusjon
Prosjektet er gjennomførbart, lavrisiko og har klar verdi for målgruppen.
Anbefaler å gå videre til Fase 2.
