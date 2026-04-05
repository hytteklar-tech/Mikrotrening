# Risikoregister — Sommerkropp

| # | Risiko | Sannsynlighet | Konsekvens | Tiltak |
|---|--------|--------------|------------|--------|
| R-01 | SMS/OTP-kostnad ved mange brukere | LAV | LAV | Bruk gratis tier (Firebase Auth) |
| R-02 | Lav daglig bruk etter lansering | MEDIUM | MEDIUM | Streak + leaderboard er kjernemotivasjon |
| R-03 | Mobilnummer er personopplysning (GDPR) | LAV | LAV | Enkel personvernerklæring, minimalt datagrunnlag |
| R-04 | Brukere glemmer å registrere trening | MEDIUM | MEDIUM | Push-påminnelser (av/på) |
| R-05 | Streak-reset demotiverer | MEDIUM | MEDIUM | Vurder "grace period" på 1 dag |
| R-06 | Invitasjonskode deles utenfor gruppen | LAV | LAV | Koder kan deaktiveres av gruppeeier |
| R-07 | Backend nedetid | LAV | LAV | Bruk managed cloud-tjeneste (Supabase/Firebase) |
| R-08 | Data går tapt | LAV | MEDIUM | Automatisk backup via cloud-provider |
| R-09 | Appen brukes ikke på mobil (feil plattform) | LAV | HØY | Bygg som PWA eller React Native fra start |
| R-10 | Konkurrerende apper tar markedsandeler | LAV | LAV | Privat, lukket gruppe — ikke konkurranse med store apper |
