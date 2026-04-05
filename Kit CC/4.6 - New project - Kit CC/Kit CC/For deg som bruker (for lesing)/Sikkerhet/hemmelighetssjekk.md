# Hemmelighetssjekk

> Hemmelighetssjekk-ekspert-agenten søker i kodebasen etter lekket sensitiv informasjon som API-nøkler, passord, tokens, og private nøkler for å sikre at hemmeligheter holdes hemmelig.

## Hva gjør den?

Hemmelighetssjekk er en automatisert sikkerhetskontroll som scanner kodebasen etter utilsiktet lekket sensitiv informasjon. Agenten søker etter vanlige mønstre som:

- **API-nøkler:** Stripe, AWS, Google, OpenAI, etc.
- **Passord:** Hardkodede passord i kode eller config
- **Tokens:** JWT tokens, GitHub tokens, OAuth tokens
- **Private nøkler:** SSH-nøkler, RSA-nøkler, PEM-filer
- **Databasetilkoblinger:** Connection strings med passord
- **Kredittkort:** Visa, Mastercard, American Express
- **Personopplysninger:** Personnummere, sosiale sikkerhetsnummere

Agenten sjekker også at:

1. `.gitignore` dekker `.env`-filer, `*.pem`, og andre hemmelighetsfiler
2. Hemmeligheter er ikke hardkodet i kode
3. Hemmeligheter bruker miljøvariabler eller hemmelighetslagring
4. Tidligere commits ikke inneholder lekket hemmeligheter

## Hvorfor er det nyttig?

Lekkede hemmeligheter er en av de enkleste måtene for hackere å få tilgang til systemet. En oppdaget API-nøkkel kan brukes til å:

- Anrope API som bruker og stjele penger
- Få tilgang til database
- Endre data eller få fra systemet
- Gi unødvendig tilgang til tredjeparter

Eksempel: Utvikler pusher til GitHub med AWS-nøkelen i kode. Hacker scanner GitHub, finner nøkkelen, og spinner opp hundrevis av servere på offerets AWS-konto — kostnad: $50.000+.

Hemmelighetssjekk sikrer at:

- Hemmeligheter aldri lekkes
- Hvis de lekkes, oppdages det umiddelbart
- Prosess er dokumentert og automatisert
- Risiko for menneskelig feil minimeres

## Hvordan fungerer det?

Hemmelighetssjekk-ekspert-agenten kjører flere kontroller:

1. **Regex-basert søk** (High-entropy scanning)
   - Søk etter mønstre som ser ut som nøkler
     - AWS: `AKIA[0-9A-Z]{16}`
     - Stripe: `sk_live_[0-9a-zA-Z]{24,}`
     - GitHub: `ghp_[a-zA-Z0-9_]{36,255}`
     - Privat nøkkel: `-----BEGIN PRIVATE KEY-----`
   - Søk etter vanlige ordmønstre: "password", "secret", "token", "api_key"
   - High-entropy strenger (tilfeldige lange strenger = potensielle hemmeligheter)

2. **Git-historikk-sjekk**
   - Søk i hele git-historikken (ikke bare nåværende versjon)
   - Hvis hemmeligheter finnes: Avvis commit og ber om fix
   - Hvis hemmeligheter allerede pushet: Advarer bruker om å rotere nøkkelen

3. **.gitignore-validering**
   - Sjekk at `.env`, `*.pem`, `secrets/`, etc. er ignorert
   - Hvis mangler: Legg til automatisk

4. **Miljøvariabel-kontroll**
   - Sjekk at applikasjonen leser hemmeligheter fra miljøvariabler
   - Eksempel:
     ```javascript
     // FØR (usikker):
     const apiKey = "sk_live_abcdefg123456";

     // ETTER (sikker):
     const apiKey = process.env.STRIPE_API_KEY;
     ```

5. **Rapport**
   - Liste alle funn
   - Alvorlighetsgrad
   - Hvor de ble funnet
   - Løsningsforslag

## Eksempel

```
HEMMELIGHETSSJEKK RAPPORT
=========================
Prosjekt: PaymentApp
Dato: 2026-02-17
Modus: Automatisk scanning + git-historikk

KRITISKE FUNN:

❌ KRITISK — AWS-nøkkel funnet i src/config.js

   Funn: AWS Access Key ID
   Mønstre: AKIA5G2X7K3M9Q1L4J8B
   Sted: src/config.js (linje 42)
   Alvorlighet: KRITISK

   Kode:
   ```
   const awsAccessKey = "AKIA5G2X7K3M9Q1L4J8B";
   const awsSecretKey = "wJalrXUtnFEMI/K7MDENG+39DFs8qADFDSf/J+FsD";
   ```

   Problem: Åpenbarte AWS-nøkler i git-repo
   Løsning:
     1. UMIDDELBAR: Roter AWS-nøkkelen i AWS-konsollen
     2. Fjern nøkkelen fra koden
     3. Legg til i .env (ikke commit)
     4. Les fra miljøvariabel:
        const awsAccessKey = process.env.AWS_ACCESS_KEY_ID;
     5. Rewrite git-historikk (se instruksjoner under)

   Risiko: Angriper kan bruke nøkkelen til å:
     - Lese all S3-data
     - Spin opp servere og kostnad ditt
     - Åpne databaseer
     ⚠️ ADVARSEL: Hvis nøkkelen er pushet til GitHub, AntisystemAngriper
        sannsynlig allerede funnet den!


❌ KRITISK — Stripe API-nøkkel i .env.example

   Funn: Stripe Secret Key
   Mønstre: sk_live_51JXYZaABC1234567890DEF
   Sted: .env.example (linje 5)
   Alvorlighet: KRITISK

   Problem: Live API-nøkkel i eksempelfil (kan bli commitet)
   Løsning:
     1. Fjern nøkkelen fra .env.example
     2. Bruk placeholder: STRIPE_SECRET_KEY=sk_live_YOUR_KEY_HERE
     3. Dokumenter hvor bruker får sin nøkkel (Stripe Dashboard)

   .env.example (ETTER FIX):
   ```
   AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY
   AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY
   STRIPE_SECRET_KEY=sk_live_YOUR_STRIPE_SECRET_KEY
   STRIPE_PUBLIC_KEY=pk_live_YOUR_STRIPE_PUBLIC_KEY
   DATABASE_URL=postgresql://user:password@localhost/db
   ```


⚠️ HØYT — Passord hardkodet i database-tilkobling

   Funn: Database passord i klarform
   Sted: src/database.js (linje 18)

   Kode:
   ```
   const pool = new Pool({
     user: 'admin',
     password: 'SuperSecret123!',
     host: 'localhost',
     database: 'paymentdb'
   });
   ```

   Problem: Passord i klarform i kode (vil bli synlig i git, logs, etc.)
   Løsning:
     1. Endre database-passord
     2. Les fra miljøvariabel:
        ```
        const pool = new Pool({
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          host: process.env.DB_HOST,
          database: process.env.DB_NAME
        });
        ```
     3. Legg til i .env (lokal):
        DB_USER=admin
        DB_PASSWORD=SuperSecret123!
     4. Sikre .env med .gitignore


⚠️ HØYT — GitHub Personal Access Token i .git/config

   Funn: GitHub token
   Mønstre: ghp_abc123def456ghi789jkl012mno345pqr
   Sted: .git/config (Git-konfigfil, lokalt)
   Alvorlighet: HØYT (ikke i repo, men på maskinen)

   Problem: Token i git-config betyr git-operasjoner vil eksponere den
   Løsning:
     1. Roter token i GitHub (Settings → Developer settings → Tokens)
     2. Fjern fra .git/config:
        git config --unset-all credential.helper
     3. Bruk SSH-nøkler istedenfor HTTPS-tokens (bedre praksis)


⚠️ MEDIUM — High-entropy streng funnet (potensial hemmelighet)

   Funn: Random string som kan være en nøkkel
   Mønstre: "KX7mK9dP2qL5rN8sT1vW4xY6zB3aC0pF9"
   Sted: src/utils/generateToken.js (linje 47)
   Alvorlighet: MEDIUM (usikker, men passord-lignende)

   Problem: Usikker om dette er en hardkodet hemmelighet
   Løsning: Manuelt gjennomgang — hvis dette er en hemmelighet, roter det


GIT-HISTORIKK FUNN:

❌ KRITISK — Hemmeligheter i forrige commit!

   Commit: abc123def456 ("Add database configuration")
   Dato: 2026-02-10
   Forfatter: alice@example.com

   Problem: Hemmeligheter ble pushet til GitHub

   Løsning (bruk BFG Repo-Cleaner):
     1. Download BFG: https://rtyley.github.io/bfg-repo-cleaner/
     2. Kjør: bfg --delete-files id_{rsa,dsa,ecdsa,ed25519}
     3. Kjør: git reflog expire --expire=now --all && git gc --aggressive --prune=now
     4. Force-push: git push -f origin main

   ⚠️  ADVARSEL: Hvis nøkler er allerede synlig på GitHub/GitLab:
        • Anta at angriper har kopiert dem
        • Roter ALLE nøkler umiddelbart
        • Sjekk access logs for mistenkelig aktivitet


.GITIGNORE-VALIDERING:

✅ OK:
   .env                (miljøvariabler)
   .env.local          (lokale overrides)
   .env.*.local        (miljøspesifikke)
   *.pem               (private SSH-nøkler)
   node_modules/       (avhengigheter)
   .DS_Store           (macOS-filer)

❌ MANGLER:
   .env.development    (ikke ignorert, legger til)
   secrets/            (ikke ignorert, legger til)
   *.key               (ikke ignorert, legger til)


SAMMENDRAG:

Kritisk (fikses omgående):
  ✗ AWS-nøkler i kode → roter nøkkelen, fjern fra kode
  ✗ Stripe-nøkkel i .env.example → fjern eller bruk placeholder
  ✗ Database-passord i kode → les fra miljøvariabel
  ✗ Hemmeligheter i git-historikk → rewrite history med BFG

Høyt:
  ✗ GitHub-token i .git/config → roter token, bruk SSH
  ⚠️  High-entropy streng (gjennomgang nødvendig)

Manglende:
  ✗ .gitignore inkomplett → legger til entries

NESTE SKRITT:

1. UMIDDELBAR (hvis nøkler på GitHub):
   • Roter ALLE nøkler (AWS, Stripe, Database, GitHub)
   • Anta at angriper har dem
   • Sjekk access logs for mistenkelig aktivitet

2. KORT SIKT:
   • Fjern hemmeligheter fra kode
   • Bruk .env + miljøvariabler
   • Oppdater .gitignore

3. VEDLIKEHOLD:
   • Hemmelighetssjekk kjøres før hver commit (pre-commit hook)
   • Git-historikk skannes ukentlig
   • Roter nøkler regelmessig (hver 90 dag)

Vil du at jeg implementerer disse endringene?
```

## Hemmelighetsrotasjon (Best Practices)

```
HEMMELIGHETSROTASJONSSYKLUS:

1. GENERERING (første gang)
   • Generer sterk tilfeldig nøkkel
   • Lagre i sikker hemmelighetslagring (f.eks. HashiCorp Vault, AWS Secrets Manager)
   • IKKE hardkode i kode

2. DISTRIBUSJON
   • Les fra miljøvariabler ved runtime
   • IKKE logg eller printer nøkler
   • Begrens tilgang (only needed services)

3. ROTASJON (hver 90. dag)
   • Generer ny nøkkel
   • Oppdater all steder som bruker nøkkelen
   • Slett gammel nøkkel etter at ny er aktivert
   • Logg hvem som roterte nøkkelen og når

4. MONITORERING
   • Alerts hvis nøkler misbrukes (uventet bruk)
   • Logg all tilgang til nøkler
   • Sjekk for lekking på GitHub, pastebin, etc.
```

## Relaterte features

- **OWASP-sikkerhet** — Sjekker for hardkodede hemmeligheter som OWASP-sårbarhet
- **Trusselmodellering** — Vurderer risiko ved lekket hemmeligheter
- **GDPR-compliance** — Hemmeligheter brukes til å beskytte persondata
- **Automatisk sikkerhetsoppgradering** — Oppgraderer hvis hemmeligheter detektert

---

*Definert i: Kit CC/Agenter/agenter/ekspert/HEMMELIGHETSSJEKK-ekspert.md*
*Lagt til: 2026-02-17*
*Kategori: Sikkerhet*
