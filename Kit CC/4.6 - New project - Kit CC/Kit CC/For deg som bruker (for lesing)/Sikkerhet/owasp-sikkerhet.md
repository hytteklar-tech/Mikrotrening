# OWASP-sikkerhet

> OWASP-ekspert-agenten gjennomgår koden for de 10 viktigste sikkerhetssårbarheter og sikrer at prosjektet oppfyller industristandarden.

## Hva gjør den?

OWASP-sikkerhetsfunksjonen involverer en dedikert ekspert-agent som kjører sikkerhetsgjennogang mot OWASP Top 10 — de 10 mest kritiske sårbare områdene i webapplikasjoner. Agenten sjekker koden for hver sårbarhetstype og rapporterer funn med løsningsforslag.

OWASP Top 10 som kontrolleres:

1. **Injection** — SQL-injection, OS-command injection, LDAP-injection. Sikrer at brukerinput valideres og saneres.
2. **Broken Authentication** — Svake passord, sesjonshåndtering, tokenkeying. Sikrer sikker autentisering og sesjonsstyring.
3. **Sensitive Data Exposure** — Ukryptert data i transit eller lagring. Sikrer HTTPS, kryptering, sikker hasning.
4. **XML External Entity (XXE)** — Parsing av usikker XML. Sikrer at XML-parsere ikke er sårbare.
5. **Broken Access Control** — Uautorisert tilgang til funksjoner eller data. Sikrer at tilgangskontroll er implementert.
6. **Security Misconfiguration** — Dårlige eller fraværende sikkerhetskonfigurasjoner. Sikrer sikre defaults.
7. **Cross-Site Scripting (XSS)** — Injeksjon av JavaScript. Sikrer korrekt escaping og Content Security Policy.
8. **Insecure Deserialization** — Usikker deserialisering av objekter. Sikrer sikre deserialiseringsmetoder.
9. **Using Components with Known Vulnerabilities** — Biblioteker med kjente sikkerhetshull. Sikrer at avhengigheter er oppdatert.
10. **Insufficient Logging and Monitoring** — Manglende sikkerhetshendelseslogging. Sikrer at sikkerhetshendelser blir logget.

## Hvorfor er det nyttig?

OWASP Top 10 er industristandarden for sikkerhetsvurderinger. Selv erfarne utviklere kan glemme en eller to av disse — og en gjemlte sårbarheter er alt en angriper trenger. Automatisk sjekking sikrer at:

- Ingen vanlige sikkerhetshull blir ignorert
- Koden oppfyller bransjestandarder
- Bruker får konkrete anbefalinger for hver sårbarhete
- Sikkerhetsgransking er transparent og dokumentert

## Hvordan fungerer det?

OWASP-ekspert-agenten kjører en systematisk sjekk:

1. **Analyse av kodebase**
   - Søk etter vanlige antipatterns (direkte SQL-strenger, lagret passord, etc.)
   - Analyser avhengighetstre for kjente sårbarheter
   - Sjekk autentiserings- og autorisasjonsimplementering

2. **Rapport per sårbarhetstype**
   - Funn: "Funnet X instanser av [vuln]"
   - Alvorlighetsgrad: Kritisk / Høyt / Medium / Lavt
   - Sted: Filsti og linjenummer
   - Løsning: Konkrete anbefalinger

3. **Prioritering**
   - Kritiske funn: Må fikses før launch
   - Høye funn: Bør fikses før release
   - Medium/lave: Kan planlegges

4. **Vedlikehald**
   - Agenten kjører igjen etter kodeendringer
   - Sjekker at tidligere funn er løst

## Eksempel

```
OWASP-SIKKERHET RAPPORT
=======================
Prosjekt: Mini-nettbutikk
Dato: 2026-02-17

KRITISK — Injection (SQL)
  Funn: 2 steder hvor brukerinput går direkte til SQL
  Sted: src/orders.js (linje 42, 89)
  Problem: Unngår prepared statements
  Løsning: Bruk parameteriserte spørringer:
    // FØR (usikker):
    query("SELECT * FROM orders WHERE id = " + req.params.id)

    // ETTER (sikker):
    query("SELECT * FROM orders WHERE id = ?", [req.params.id])

HØYT — Sensitive Data Exposure
  Funn: Passord lastes i klarform i logger
  Sted: src/auth.js (linje 67)
  Problem: console.log(user) lagrer passord i loggene
  Løsning: Logg bare brukernavn, ikke passord
    logger.info("Login attempt", { username: user.username }) // Ikke passord

HØYT — Broken Access Control
  Funn: Admin-funksjoner sjekker ikke rollekontroll
  Sted: src/admin.js (alle ruter)
  Problem: Bruker kan kalles /admin/delete-order direkte
  Løsning: Legger til middleware som sjekker rolle:
    app.delete('/admin/delete-order', requireAdmin, deleteOrder)

MEDIUM — Insufficient Logging
  Funn: Ingen logging av sikkerhetshendelser
  Problem: Kan ikke sporslå hvem som gjorde hva
  Løsning: Logg pålogging, rettighetsfeil, og sensitive operasjoner

Sammendrag:
  ✅ 4 kritiske/høye funn som må fikses
  ⚠️  1 medium funn
  ✅ Ingen kjente sårbare avhengigheter funnet

Anbefaling: Fikse kritiske funn før launch.
```

## Relaterte features

- **Hemmelighetssjekk** — Sikrer at API-nøkler ikke lekkes
- **Trusselmodellering** — Identifiserer angripere og angrepsflater
- **GDPR-compliance** — Sikrer håndtering av persondata
- **Automatisk sikkerhetsoppgradering** — Oppgraderer sikkerhetskrav basert på datatyper

---

*Definert i: Kit CC/Agenter/agenter/ekspert/OWASP-ekspert.md*
*Lagt til: 2026-02-17*
*Kategori: Sikkerhet*
