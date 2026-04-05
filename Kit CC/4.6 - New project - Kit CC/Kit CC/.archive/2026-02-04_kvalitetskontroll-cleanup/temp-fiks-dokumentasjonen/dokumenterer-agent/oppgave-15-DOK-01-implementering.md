# Oppgave 15: DOK-01 Automatisk Synk - Implementeringsdetaljer

> **Prioritet:** LAV (men viktig)
> **Status:** ⚪ Ikke startet
> **Estimert tid:** 20-30 minutter

---

## HVA

Legg til konkrete implementeringseksempler for DOK-01: Automatisk Synk med Kode.

## HVOR

Fil: `/mnt/Ongoing work/Agenter/agenter/basis/DOKUMENTERER-agent.md`
Seksjon: ### 🆕 F1: Automatisk Synk med Kode (rundt linje 38-64)

## MANGLER

- Ingen konkret filwatcher/trigger-system
- Mangler komplett npm-script eksempel
- Mangler komplett CI/CD workflow
- Ingen diff-deteksjon beskrivelse

## LEGG TIL

Etter eksisterende beskrivelse, legg til:

```markdown
#### Konkret implementering

**Steg 1: Dependencies**
```json
{
  "devDependencies": {
    "chokidar": "^3.5.3",
    "documentation": "^14.0.0"
  }
}
```

**Steg 2: Watch-skript**
```javascript
// scripts/docs-sync.js
const chokidar = require('chokidar');
const { exec } = require('child_process');

const watcher = chokidar.watch('src/**/*.{js,ts,jsx,tsx}', {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher.on('change', (path) => {
  console.log(`File ${path} changed, updating docs...`);
  exec('npm run docs:generate', (err, stdout) => {
    if (err) console.error(err);
    else console.log('Docs updated');
  });
});
```

**Steg 3: npm scripts**
```json
{
  "scripts": {
    "docs:sync": "node scripts/docs-sync.js",
    "docs:generate": "documentation build src/** -f md -o docs/API.md"
  }
}
```

**Steg 4: GitHub Actions (komplett)**
```yaml
# .github/workflows/docs.yml
name: Sync Documentation

on:
  push:
    paths:
      - 'src/**'
  pull_request:
    paths:
      - 'src/**'

jobs:
  sync-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run docs:generate
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "docs: auto-sync documentation"
          file_pattern: 'docs/**'
```
```

## VERIFISERING

- [ ] Dependencies listet
- [ ] Watch-skript eksempel inkludert
- [ ] npm scripts eksempel inkludert
- [ ] Komplett GitHub Actions workflow inkludert

---

**Status:** ⚪ → 🟢 når ferdig
