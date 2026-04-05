# Oppgave 16: DOK-02 llms.txt-generering - Implementeringsdetaljer

> **Prioritet:** LAV
> **Status:** ⚪ Ikke startet
> **Estimert tid:** 25-35 minutter

---

## HVA

Legg til konkrete implementeringseksempler for DOK-02: llms.txt-generering.

## HVOR

Fil: `/mnt/Ongoing work/Agenter/agenter/basis/DOKUMENTERER-agent.md`
Seksjon: ### 🆕 F2: llms.txt-generering (rundt linje 67-109)

## MANGLER

- Ingen skript for auto-generering
- Mangler parsing-logikk
- Ingen template
- Mangler integrasjon

## LEGG TIL

```markdown
#### Konkret implementering

**Steg 1: Genereringsskript**
```javascript
// scripts/generate-llms-txt.js
const fs = require('fs');
const path = require('path');

function generateLLMsTxt(projectRoot) {
  const packageJson = require(path.join(projectRoot, 'package.json'));
  const structure = getFolderStructure('src');
  
  const content = `# llms.txt - AI Context for ${packageJson.name}

## Prosjektoversikt
${packageJson.description || 'No description'}

## Teknologi
${getTechStack(packageJson)}

## Mappestruktur
${structure}

## Viktige filer
${getImportantFiles(projectRoot)}

## Kodestandarder
- TypeScript strict mode
- ESLint: ${packageJson.eslintConfig ? 'Enabled' : 'Not configured'}
- Testing: ${packageJson.scripts?.test ? 'Configured' : 'Not configured'}

## Vanlige oppgaver
- Start dev: ${packageJson.scripts?.dev || 'npm run dev'}
- Run tests: ${packageJson.scripts?.test || 'npm test'}
- Build: ${packageJson.scripts?.build || 'npm run build'}
`;

  fs.writeFileSync('llms.txt', content);
  console.log('✅ llms.txt generated');
}

function getTechStack(pkg) {
  const deps = {...pkg.dependencies, ...pkg.devDependencies};
  const stack = [];
  
  if (deps.react) stack.push(`- Frontend: React ${deps.react}`);
  if (deps.next) stack.push(`- Framework: Next.js ${deps.next}`);
  if (deps.express) stack.push(`- Backend: Express ${deps.express}`);
  // Legg til flere...
  
  return stack.join('\n');
}

// ... resten av funksjonene
```

**Steg 2: npm script**
```json
{
  "scripts": {
    "docs:llms": "node scripts/generate-llms-txt.js"
  }
}
```

**Steg 3: Pre-commit hook**
```bash
#!/bin/sh
# .husky/pre-commit
npm run docs:llms
git add llms.txt
```
```

## VERIFISERING

- [ ] Genereringsskript inkludert
- [ ] npm script eksempel
- [ ] Pre-commit hook eksempel

---

**Status:** ⚪ → 🟢 når ferdig
