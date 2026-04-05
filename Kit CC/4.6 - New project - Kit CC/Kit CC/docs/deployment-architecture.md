# DEPLOYMENT ARCHITECTURE v1.0

> Definerer infrastruktur, deployment-strategi og CI/CD pipeline for Kit CC

**Formål:** Sikre sikker, automatisert og repetérbar deployment til produksjon.

**Target:** 99.9% uptime, <5 min deployment time, zero-downtime updates.

---

## OVERSIKT

### Deployment Stack

```
┌─────────────────────────────────────────────────┐
│         GitHub (Source Control)                 │
│  - main branch (production)                      │
│  - staging branch (pre-production)               │
│  - feature branches (development)                │
└────────────────┬────────────────────────────────┘
                 │
                 ↓
         ┌───────────────┐
         │ GitHub Actions│ (CI/CD Pipeline)
         │ - Build       │
         │ - Test        │
         │ - Deploy      │
         └───────┬───────┘
                 │
    ┌────────────┼────────────┐
    ↓            ↓            ↓
┌────────┐  ┌────────┐  ┌────────┐
│  Dev   │  │Staging │  │  Prod  │
│(Vercel)│  │(Vercel)│  │(Vercel)│
└────────┘  └────────┘  └────────┘
    │            │            │
    └────────────┼────────────┘
                 ↓
        ┌──────────────────┐
        │ Supabase Database│
        │ (PostgreSQL)     │
        └──────────────────┘
```

---

## 1. DEPLOYMENT-STRATEGI FOR VERCEL

### 1.1 Environment Konfiguration

#### Development (dev)
- **URL:** https://kit-cc-dev.vercel.app
- **Branch:** develop
- **Auto-deploy:** ON (på push til develop)
- **Database:** Supabase dev
- **Secrets:** Development API keys

**Vercel Settings:**
```
- Root Directory: ./
- Build Command: npm run build
- Output Directory: .next
- Environment: Node.js 20+
```

#### Staging (staging)
- **URL:** https://kit-cc-staging.vercel.app
- **Branch:** staging
- **Auto-deploy:** ON (manuell)
- **Database:** Supabase staging
- **Secrets:** Staging API keys
- **Formål:** Pre-production testing, UAT

**Vercel Settings:**
```
- Same as dev, men med staging secrets
- Preview deployments: ON
- Production branch: staging
```

#### Production (prod)
- **URL:** https://kit-cc.vercel.app
- **Branch:** main
- **Auto-deploy:** ON (med manual approval i CI/CD)
- **Database:** Supabase production
- **Secrets:** Production API keys (høy sikkerhetsnivå)

**Vercel Settings:**
```
- Root Directory: ./
- Build Command: npm run build:prod
- Output Directory: .next
- Environment: Node.js 20+
- Serverless Functions: 60s timeout
```

---

### 1.2 Vercel Configuration File

**vercel.json:**
```json
{
  "projectId": "kit-cc-project-id",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "env": {
    "NODE_ENV": {
      "production": "production",
      "staging": "staging",
      "development": "development"
    }
  },
  "regions": [
    "arn1",
    "bru1",
    "cdg1",
    "cle1",
    "dub1",
    "fra1",
    "gru1",
    "hnd1",
    "iad1",
    "icn1",
    "kix1",
    "lhr1",
    "pdx1",
    "sin1",
    "syd1",
    "tyo1"
  ],
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 60
    }
  }
}
```

---

## 2. CI/CD PIPELINE (GITHUB ACTIONS)

### 2.1 Pipeline Overview

```
┌──────────────────────────────────────────────────┐
│ Push to branch (feature/develop/staging/main)    │
└────────────────┬─────────────────────────────────┘
                 │
    ┌────────────┴────────────┐
    ↓                         ↓
┌─────────────┐        ┌────────────┐
│ Lint & Type │        │Build & Test│
│   Check     │        │            │
└──────┬──────┘        └─────┬──────┘
       │                     │
       └─────────────┬───────┘
                     ↓
            ┌────────────────┐
            │ Security Scan  │
            └────────┬───────┘
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
    Feature     Staging      Production
     Deploy     Deploy       (Manual)
```

### 2.2 GitHub Actions Workflows

#### Workflow 1: PR Checks (feature branches)

**File:** `.github/workflows/pr-checks.yml`

```yaml
name: PR Checks

on:
  pull_request:
    branches: [develop, staging, main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Type check
        run: npm run type-check

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run Semgrep
        uses: returntocorp/semgrep-action@v1
        with:
          config: >-
            p/security-audit
            p/owasp-top-ten
```

#### Workflow 2: Development Deploy

**File:** `.github/workflows/deploy-dev.yml`

```yaml
name: Deploy to Development

on:
  push:
    branches: [develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.DEV_API_URL }}
          SUPABASE_URL: ${{ secrets.DEV_SUPABASE_URL }}
          SUPABASE_ANON_KEY: ${{ secrets.DEV_SUPABASE_ANON_KEY }}

      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_DEV }}
          scope: ${{ secrets.VERCEL_ORG_ID }}
```

#### Workflow 3: Staging Deploy

**File:** `.github/workflows/deploy-staging.yml`

```yaml
name: Deploy to Staging

on:
  push:
    branches: [staging]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run full test suite
        run: npm run test

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.STAGING_API_URL }}
          SUPABASE_URL: ${{ secrets.STAGING_SUPABASE_URL }}
          SUPABASE_ANON_KEY: ${{ secrets.STAGING_SUPABASE_ANON_KEY }}

      - name: Deploy to Vercel Staging
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_STAGING }}
          scope: ${{ secrets.VERCEL_ORG_ID }}

      - name: Notify Slack
        if: success()
        uses: slackapi/slack-github-action@v1
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          payload: |
            {
              "text": "✅ Staging deployed successfully"
            }
```

#### Workflow 4: Production Deploy (Manual)

**File:** `.github/workflows/deploy-prod.yml`

```yaml
name: Deploy to Production

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Confirm production deployment'
        required: true
        default: 'production'

jobs:
  pre-deploy-checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run lint
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Run tests
        run: npm run test

      - name: Security scan
        run: npm run security:scan

  deploy:
    needs: pre-deploy-checks
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://kit-cc.vercel.app
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build:prod
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.PROD_API_URL }}
          SUPABASE_URL: ${{ secrets.PROD_SUPABASE_URL }}
          SUPABASE_ANON_KEY: ${{ secrets.PROD_SUPABASE_ANON_KEY }}

      - name: Deploy to Vercel Production
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_PROD }}
          scope: ${{ secrets.VERCEL_ORG_ID }}
          production: true

      - name: Health check
        run: |
          sleep 10
          curl -f https://kit-cc.vercel.app/api/health || exit 1

      - name: Create GitHub release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: v${{ github.run_number }}
          release_name: Production Release ${{ github.run_number }}
          body: Deployed to production

      - name: Notify Slack
        if: success()
        uses: slackapi/slack-github-action@v1
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          payload: |
            {
              "text": "🚀 Production deployed successfully",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Production Deployment Success*\n\nCommit: ${{ github.sha }}\nRelease: v${{ github.run_number }}\nURL: https://kit-cc.vercel.app"
                  }
                }
              ]
            }

      - name: Notify on failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          payload: |
            {
              "text": "❌ Production deployment FAILED",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Production Deployment Failed*\n\nAction: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
                  }
                }
              ]
            }
```

---

## 3. ENVIRONMENT-HÅNDTERING

### 3.1 Environment Variables

#### Development (.env.development.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ENV=development
SUPABASE_URL=https://dev-project.supabase.co
SUPABASE_ANON_KEY=dev_anon_key_xxxxx
DATABASE_URL=postgresql://dev:password@localhost:5432/kit_cc_dev
DEBUG=true
```

#### Staging (.env.staging)
```
NEXT_PUBLIC_API_URL=https://kit-cc-staging.vercel.app
NEXT_PUBLIC_ENV=staging
SUPABASE_URL=https://staging-project.supabase.co
SUPABASE_ANON_KEY=staging_anon_key_xxxxx
DATABASE_URL=postgresql://staging_user:password@staging-db:5432/kit_cc_staging
DEBUG=false
```

#### Production (.env.production)
```
NEXT_PUBLIC_API_URL=https://kit-cc.vercel.app
NEXT_PUBLIC_ENV=production
SUPABASE_URL=https://prod-project.supabase.co
SUPABASE_ANON_KEY=prod_anon_key_xxxxx
DATABASE_URL=postgresql://prod_user:secure_password@prod-db:5432/kit_cc_prod
DEBUG=false
```

### 3.2 Secrets Management

**GitHub Secrets Setup:**

```
Development:
- DEV_SUPABASE_URL
- DEV_SUPABASE_ANON_KEY
- DEV_API_URL

Staging:
- STAGING_SUPABASE_URL
- STAGING_SUPABASE_ANON_KEY
- STAGING_API_URL

Production:
- PROD_SUPABASE_URL
- PROD_SUPABASE_ANON_KEY
- PROD_API_URL

Common:
- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID_DEV
- VERCEL_PROJECT_ID_STAGING
- VERCEL_PROJECT_ID_PROD
- SLACK_WEBHOOK_URL
```

**Sikkerhet:**
- Alle secrets lagres som GitHub Secrets (encrypted)
- Bare CI/CD kan aksessere secrets
- Secrets roteres kvartalsvis
- Ingen secrets i git repository

---

## 4. ROLLBACK-PROSEDYRER

### 4.1 Automatic Rollback

**Trigger conditions:**

```yaml
Rollback hvis:
- Health check fails for > 5 minutter
- Error rate > 5% for > 10 minutter
- API response time > 3s for > 5 minutter
- Critical security vulnerability detected
```

### 4.2 Manual Rollback

#### Via Vercel Dashboard

```
1. Go to: Vercel Dashboard → Kit CC Project
2. Click: Deployments tab
3. Find: Previous stable deployment
4. Click: "Promote to Production"
5. Confirm: Proceed with rollback
```

#### Via GitHub Actions (Emergency)

**File:** `.github/workflows/emergency-rollback.yml`

```yaml
name: Emergency Rollback

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version to rollback to (e.g., v1.2.3)'
        required: true

jobs:
  rollback:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          ref: ${{ github.event.inputs.version }}

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build:prod
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.PROD_API_URL }}
          SUPABASE_URL: ${{ secrets.PROD_SUPABASE_URL }}
          SUPABASE_ANON_KEY: ${{ secrets.PROD_SUPABASE_ANON_KEY }}

      - name: Deploy to Vercel (Rollback)
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_PROD }}
          production: true

      - name: Notify team
        uses: slackapi/slack-github-action@v1
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          payload: |
            {
              "text": "⚠️ EMERGENCY ROLLBACK EXECUTED",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Emergency Rollback*\n\nRolled back to: ${{ github.event.inputs.version }}\nTriggered by: ${{ github.actor }}"
                  }
                }
              ]
            }
```

### 4.3 Rollback Checklist

```
Før rollback:
☐ Identify root cause of failure
☐ Notify team on Slack
☐ Prepare rollback version
☐ Inform customers if necessary

Under rollback:
☐ Initiate rollback via Vercel/GitHub
☐ Monitor health checks
☐ Verify application is responding
☐ Check database is accessible

Etter rollback:
☐ Confirm all systems operational
☐ Create incident report
☐ Schedule post-mortem
☐ Update status page
☐ Notify customers of resolution
```

---

## 5. DATABASE-MIGRERING (SUPABASE)

### 5.1 Migration Strategy

```
Dev → Staging → Production

Each environment has isolated database
```

### 5.2 Migration Tools

**Tool:** Supabase Migrations (SQL-based)

**File structure:**
```
supabase/migrations/
├── 20260101000000_initial_schema.sql
├── 20260105000000_add_users_table.sql
├── 20260110000000_create_indexes.sql
└── 20260115000000_update_schema.sql
```

### 5.3 Migration Workflow

#### Step 1: Local Development

```bash
# Create new migration
supabase migration new add_users_table

# Edit SQL file in supabase/migrations/
# Write migration SQL

# Test locally
supabase db reset
supabase db status

# Verify schema
psql $LOCAL_DATABASE_URL -c "\dt"
```

#### Step 2: Push to Staging

```bash
# Link to staging project
supabase link --project-ref staging-project-id

# Push migration
supabase db push

# Verify on staging
supabase db remote --project-ref staging-project-id set < supabase/migrations/latest.sql
```

#### Step 3: Production Migration

```bash
# Link to production project
supabase link --project-ref prod-project-id

# Create backup first
supabase db backup create --project-ref prod-project-id

# Push migration
supabase db push

# Verify
supabase db remote --project-ref prod-project-id status
```

### 5.4 Migration Script

**File:** `scripts/migrate.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runMigrations() {
  try {
    console.log('Starting database migration...');

    // Run all migration files
    const migrations = [
      'create_users_table',
      'create_posts_table',
      'create_indexes'
    ];

    for (const migration of migrations) {
      console.log(`Running: ${migration}`);
      const { error } = await supabase.rpc(`migrate_${migration}`);

      if (error) {
        throw new Error(`Migration ${migration} failed: ${error.message}`);
      }
      console.log(`✓ ${migration} completed`);
    }

    console.log('✓ All migrations completed');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
```

### 5.5 Rollback Migration

```bash
# Revert last migration
supabase db reset

# Or revert to specific migration
supabase db push --version 20260110000000
```

---

## 6. DEPLOYMENT CHECKLIST

### Pre-Deployment

```
Production Deployment Checklist:

☐ All tests passing
☐ Code review approved
☐ Security scan passed
☐ Type check passed
☐ Build succeeds
☐ Staging deployment successful
☐ UAT completed on staging
☐ Database migrations tested
☐ Rollback plan documented
☐ On-call engineer notified
```

### Post-Deployment

```
☐ Health check passes
☐ No error spikes in monitoring
☐ Database connectivity verified
☐ API endpoints responding
☐ Frontend loads correctly
☐ Critical user flows working
☐ No performance degradation
☐ Team notified on Slack
☐ Status page updated (if down)
```

---

**Versjon:** 1.0.0
**Opprettet:** 2026-02-05
**Formål:** Definere deployment-strategi og infrastruktur
**Target:** 99.9% uptime, <5 min deployment
