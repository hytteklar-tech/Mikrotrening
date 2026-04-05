# Kit CC Dashboard - Komplett GUI-Prosjektering

> **⚠️ STATUS: DESIGNDOKUMENT — IKKE IMPLEMENTERT**
>
> Dette dokumentet er en fremtidig designspesifikasjon for et GUI/dashboard.
> Kit CC v3.4 brukes per i dag gjennom tekstbasert interaksjon med AI (Claude Code, Cursor, etc.).
> GUI-et beskrevet her er en visjon for fremtidig utvikling.

> **Dokument Type**: Teknisk Spesifikasjon & Design Document
> **Prosjektnavn**: Kit CC Dashboard
> **Versjon**: 1.0
> **Dato**: 4. februar 2026
> **Forfatter**: Claude (Sonnet 4.5) + Øyvind
> **Estimert byggetid**: 3-4 uker (omfattende)

---

## 📋 Executive Summary

Dette dokumentet beskriver en komplett GUI-løsning for **Kit CC** - et multi-agent system for programvareutvikling. Dashboardet vil transformere Kit CC fra en kommandolinje-basert plattform til en moderne, visuell web-applikasjon.

### Nøkkelfakta

- **Type**: Full-stack Web Application
- **Tech Stack**: Next.js 15 + React 19 + Supabase + Tailwind + shadcn/ui
- **Målgruppe**: Hybrid (vibekodere + utviklere)
- **Hovedformål**: Visualisere og styre Kit CC's byggeprosess
- **Features**: Real-time updates, dark mode, keyboard shortcuts, drag-and-drop
- **Deployment**: Vercel

---

## 🎯 Kravspesifikasjon

### Funksjonelle Krav

#### ✅ Må Ha (P0) - Kritiske Features

| # | Krav | Beskrivelse |
|---|------|-------------|
| 1 | Multi-prosjekt dashboard | Oversikt over alle prosjekter med status og progresjon |
| 2 | Detaljert prosjekt-view | Dypdykk i ett prosjekt: faser, oppgaver, filer, agenter |
| 3 | Live Agent Activity Feed | Real-time visning av hva agenter gjør akkurat nå |
| 4 | Guided onboarding wizard | Interaktiv guide som tar nye brukere gjennom første prosjekt (< 5 min) |
| 5 | Settings & konfigurasjon | Brukerinnstillinger, API keys, preferences |
| 6 | Dark mode toggle | Standard i 2026 - må fungere perfekt |
| 7 | Real-time WebSocket updates | Instant oppdateringer uten refresh |
| 8 | Supabase backend | Database + autentisering + real-time + storage |
| 9 | Responsiv design | Fungerer på desktop (1920px) til tablet (768px) |
| 10 | User authentication | Login/signup med Supabase Auth |

#### ✅ Bør Ha (P1) - Viktige Features

| # | Krav | Beskrivelse |
|---|------|-------------|
| 11 | Keyboard shortcuts | Cmd+K command palette, power user shortcuts |
| 12 | Drag-and-drop | Task reordering, file upload |
| 13 | Progress bars med estimates | Visuell progresjon + AI-drevet tidsestimering |
| 14 | Notifications system | Toast notifications for events |
| 15 | Search everything | Global søk (fuzzy search) over alt innhold |
| 16 | File browser med preview | Navigere filer, se kode inline |
| 17 | Export functionality | Eksporter prosjekt som ZIP |
| 18 | Undo/Redo | Version control for handlinger |

#### ⭐ Kan Ha (P2) - Nice-to-Have

| # | Krav | Beskrivelse |
|---|------|-------------|
| 19 | Collaborative features | Real-time multiplayer editing (CRDT) |
| 20 | Voice commands | "Start nytt prosjekt" |
| 21 | Mobile native app | iOS/Android app (React Native) |
| 22 | AI chat assistant | Embedded chatbot for hjelp |
| 23 | Analytics dashboard | Metrics, grafer, insights |
| 24 | Marketplace | Community-agenter og templates |

---

## 🏗️ Informasjonsarkitektur

### Sitemap & Navigasjonsstruktur

```
Kit CC Dashboard
│
├── 🏠 Dashboard (/)
│   ├── Prosjektoversikt (grid/list view)
│   ├── Quick stats (totalt prosjekter, aktive agenter, completion rate)
│   ├── Recent activity feed (5 siste events)
│   ├── Quick actions (Nytt prosjekt, Import, Søk)
│   └── Filter & Sort controls
│
├── 📊 Prosjekt-view (/project/:id)
│   ├── Header (navn, status, actions: Deploy, Share, Delete)
│   ├── Fase-progress (visuell timeline med checkmarks)
│   ├── Task checklist (collapsible per fase, drag-and-drop)
│   ├── Agent activity panel (live feed med WebSocket)
│   ├── File browser (sidebar, tree view)
│   ├── Code preview (modal/split-view)
│   └── Settings panel (project-spesifikke innstillinger)
│
├── 🤖 Agent Feed (/agents)
│   ├── Live activity stream (WebSocket)
│   ├── Filter by agent type (BYGGER, REVIEWER, etc.)
│   ├── Filter by project
│   ├── Filter by status (Active, Waiting, Completed, Error)
│   ├── Agent details (expandable cards)
│   └── Historical view (timeline)
│
├── ⚙️ Settings (/settings)
│   ├── Profile (navn, email, avatar, passord)
│   ├── API Keys (Supabase, Vercel, GitHub integrations)
│   ├── Preferences (theme, language, font size)
│   ├── Keyboard shortcuts (customize bindings)
│   ├── Notifications (email, push, in-app)
│   ├── Project defaults (stack, intensity level)
│   └── Danger zone (delete account, export data)
│
├── 🎓 Onboarding (/onboarding)
│   ├── Steg 1: Velkommen (intro til Kit CC)
│   ├── Steg 2: Lag første prosjekt (guided input)
│   ├── Steg 3: Velg stack (Supabase/Custom)
│   ├── Steg 4: Klassifisering (progressiv avsløring)
│   ├── Steg 5: Start byggeprosess (automated)
│   └── Steg 6: Se resultater (celebration)
│
├── 📚 Docs (/docs) [Optional]
│   ├── Getting Started
│   ├── Tutorials
│   ├── API Reference
│   └── FAQs
│
└── 🔐 Auth Pages
    ├── /login
    ├── /signup
    ├── /forgot-password
    └── /verify-email
```

### User Flows

#### **Flow 1: Ny Bruker (First-time Experience)**

```
1. Lander på / (ikke autentisert)
   ↓
2. Redirect til /login
   ↓
3. Klikker "Sign Up"
   ↓
4. Registrerer med email + passord (Supabase Auth)
   ↓
5. Verify email
   ↓
6. Redirect til /onboarding
   ↓
7. Går gjennom 6-stegs wizard
   ↓
8. Første prosjekt opprettes automatisk
   ↓
9. Redirect til /project/:id (ser live building)
   ↓
10. Etter 15-30 min → Prototype ferdig! 🎉
```

#### **Flow 2: Eksisterende Bruker (Daily Use)**

```
1. Login på /
   ↓
2. Ser dashboard med alle prosjekter
   ↓
3. Klikker på et prosjekt
   ↓
4. Ser detaljert status i /project/:id
   ↓
5. Agenter jobber i bakgrunnen (real-time feed)
   ↓
6. Brukeren kan:
   - Justere oppgaver (drag-and-drop)
   - Se filer (file browser)
   - Overstyre agent-beslutninger
   - Deploy til produksjon
```

#### **Flow 3: Power User (Keyboard-First)**

```
1. Login med Cmd+L (custom shortcut)
   ↓
2. Cmd+K → "nytt prosjekt" → Enter
   ↓
3. Quick create flow (ingen wizard)
   ↓
4. Cmd+P → Søk i filer
   ↓
5. Cmd+B → Toggle sidebar
   ↓
6. Cmd+Shift+D → Toggle dark mode
   ↓
7. Jobber uten å røre musen
```

---

## 🎨 Wireframes & Layout

### 1. Dashboard (/) - Hovedside

```
┌───────────────────────────────────────────────────────────────────────┐
│  🎯 Kit CC                [Søk...]           [🔔] [@User ▼] [⚙️]      │
├───────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  Mine Prosjekter                      [Grid] [List]  [+ Nytt Prosjekt]│
│  ──────────────────────────────────────────────────────────────────── │
│                                                                        │
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐│
│  │ 📱 TODO-App       │  │ 🛒 E-handel       │  │ 📝 Blog CMS       ││
│  │                   │  │                   │  │                   ││
│  │ [████████░░] 45%  │  │ [███░░░░░░] 15%  │  │ [██████████] ✓    ││
│  │                   │  │                   │  │                   ││
│  │ 🔨 Fase 4: MVP    │  │ 📋 Fase 2: Planlegg  │  │ 🎉 Publisert      ││
│  │                   │  │                   │  │                   ││
│  │ ⏱️ 3t igjen        │  │ ⏱️ 12t igjen      │  │ 👁️ 234 visninger  ││
│  │                   │  │                   │  │                   ││
│  │ ⚙️ 3 agenter aktive│  │ ⚙️ 2 agenter     │  │ ✅ Alle tester OK ││
│  │                   │  │                   │  │                   ││
│  │ [Åpne prosjekt]   │  │ [Åpne prosjekt]  │  │ [Se live app]     ││
│  └───────────────────┘  └───────────────────┘  └───────────────────┘│
│                                                                        │
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐│
│  │ 💬 Chat-app       │  │ 📊 Dashboard      │  │ 🎵 Music Player   ││
│  │ [███░░░░░░] 20%   │  │ [██████░░░] 60%   │  │ [█░░░░░░░░] 5%    ││
│  │ 📐 Fase 3: Arkitektur og sikkerhet │  │ 🔄 Fase 5: Bygg funksjonene  │  │ 🌱 Fase 1: Idé og visjon ││
│  │ ⏱️ 8t igjen        │  │ ⏱️ 5t igjen       │  │ ⏱️ 1t igjen        ││
│  │ [Åpne]            │  │ [Åpne]            │  │ [Åpne]            ││
│  └───────────────────┘  └───────────────────┘  └───────────────────┘│
│                                                                        │
│  Quick Stats                                                           │
│  ──────────────────────────────────────────────────────────────────── │
│  📊 Totalt: 12 prosjekter  |  ⚙️ 8 aktive agenter  |  ✅ 5 fullført   │
│  ⏱️ 47t estimert totalt    |  🎯 73% avg completion |  🔥 3 hot today  │
│                                                                        │
│  Recent Activity                                    [Se alle →]        │
│  ──────────────────────────────────────────────────────────────────── │
│  ⚙️ BYGGER-agent fullførte UI for TODO-App            2 min siden     │
│  ✅ TESTER-agent kjørte 24 tester (alle passed)       5 min siden     │
│  🔍 REVIEWER-agent fant 2 security issues i E-handel  12 min siden    │
│  🚀 MVP-agent deployet Blog CMS til Vercel            23 min siden    │
│  📋 KRAV-agent genererte 15 user stories              45 min siden    │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘
```

**Nøkkelelementer:**
- **Card-based layout** for prosjekter (responsive grid: 3 cols desktop, 2 tablet, 1 mobile)
- **Progress bars** med prosent og estimert tid igjen
- **Visual status indicators** (emoji + farger: grønn=ok, oransje=aktiv, grå=paused)
- **Quick stats** for oversikt (metrics)
- **Recent activity feed** (5 siste events, real-time oppdatert)
- **Quick actions** i top-right (notifikasjoner, profil, settings)

---

### 2. Prosjekt-view (/project/:id) - Detaljert Side

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ← Tilbake  📱 TODO-App                   [🚀 Deploy] [📤 Share] [🗑️] [⚙️]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ Fase-progresjon                                             [⏱️ 3t igjen]   │
│ ──────────────────────────────────────────────────────────────────────────  │
│ [●●●●●○○] Fase 4 av 7 - MVP                                  45% ferdig    │
│                                                                              │
│ ✓ Idé og visjon  ✓ Planlegg  ✓ Arkitektur og sikkerhet  ⚙️ MVP  ○ Bygg  ○ Test  ○ Publiser│
│                                                                              │
│ ┌──────────────────────────────────┐  ┌────────────────────────────────┐  │
│ │ 📋 OPPGAVER (8/15)               │  │ 🤖 AGENT AKTIVITET             │  │
│ │ ────────────────────────────────  │  │ ──────────────────────────────  │  │
│ │                                  │  │                                 │  │
│ │ ▼ Fase 1: Idé og visjon ✓        │  │ ⚙️ BYGGER-agent                │  │
│ │   ✓ Klassifisering               │  │ → Implementerer TodoList.tsx   │  │
│ │   ✓ Risikovurdering               │  │   [████████░░] 87%             │  │
│ │   ✓ Dataklassifisering            │  │   ⏱️ 2 min igjen                │  │
│ │                                  │  │                                 │  │
│ │ ▼ Fase 2: Planlegg ✓      │  │ 🔍 REVIEWER-agent (i kø)        │  │
│ │   ✓ Brukerhistorier (12 stk)     │  │ → Venter på BYGGER...          │  │
│ │   ✓ Datamodell                   │  │                                 │  │
│ │   ✓ MVP scope                    │  │ 💬 Forslag:                    │  │
│ │                                  │  │ ┌───────────────────────────┐  │  │
│ │ ▼ Fase 3: Arkitektur og sikkerhet ✓ │  │ │ "Skal jeg legge til dark  │  │  │
│ │   ✓ Tech stack (Supabase)        │  │ │  mode for TODO-appen?"    │  │  │
│ │   ✓ Database-schema              │  │ │                           │  │  │
│ │   ✓ Trusselmodellering            │  │ │ [✅ Ja] [❌ Nei] [⏰ Senere]│  │  │
│ │                                  │  │ └───────────────────────────┘  │  │
│ │ ▶ Fase 4: MVP (45% ferdig)       │  │                                 │  │
│ │   ✓ Git setup                    │  │ 📊 Statistikk:                 │  │
│ │   ✓ Supabase setup               │  │ • 12 oppgaver fullført         │  │
│ │   ✓ Database schema              │  │ • 24 filer generert            │  │
│ │   ⚙️ UI implementering (87%)     │  │ • 1,240 linjer kode            │  │
│ │   ○ Backend API                  │  │ • 0 kritiske feil              │  │
│ │   ○ Autentisering                │  │ • 3 agenter aktive             │  │
│ │   ○ Testing                      │  │                                 │  │
│ │   ○ Deploy til staging           │  │ 🕐 Timeline:                   │  │
│ │                                  │  │ 14:23 - BYGGER startet UI      │  │
│ │ [+ Legg til oppgave]             │  │ 14:25 - REVIEWER fant 1 issue  │  │
│ │ [📊 Se full task list]           │  │ 14:27 - BYGGER fikset issue    │  │
│ └──────────────────────────────────┘  │ 14:30 - UI 87% ferdig (nå)     │  │
│                                        └────────────────────────────────┘  │
│                                                                              │
│ 📁 FILER (toggle sidebar)                          [🔍 Søk i filer...]     │
│ ──────────────────────────────────────────────────────────────────────────  │
│ 📁 src/                                                                     │
│   📄 App.tsx                                    [Sist endret: 2 min siden] │
│   📄 TodoList.tsx                               [⚙️ BYGGER arbeider her]   │
│   📁 components/                                                            │
│     📄 TodoItem.tsx                             [Sist endret: 5 min siden] │
│     📄 AddTodo.tsx                              [Sist endret: 8 min siden] │
│     📄 TodoFilter.tsx                           [Opprettet: 10 min siden]  │
│   📁 lib/                                                                   │
│     📄 supabaseClient.ts                        [Opprettet: 1t siden]      │
│ 📁 database/                                                                │
│   📄 schema.sql                                 [Sist endret: 1t siden]    │
│   📄 migrations/                                                            │
│ 📁 public/                                                                  │
│   📄 favicon.ico                                                            │
│                                                                              │
│ [📂 Expand all] [📝 New file] [📤 Upload]                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Nøkkelelementer:**
- **Phase timeline** (visuell med checkmarks, aktiv fase highlighted)
- **Collapsible task list** (per fase, kan drag-and-drop reorder)
- **Live agent activity** med progress bars og real-time updates
- **AI suggestions** (inline i activity feed, interaktive med buttons)
- **File browser** (expandable sidebar, tree view med icons)
- **Real-time indicators** (⚙️ = agent arbeider, ✓ = ferdig, ○ = ikke startet)
- **Statistics panel** (metrics oppdateres live)

---

### 3. Agent Activity Feed (/agents) - Dedikert Side

```
┌─────────────────────────────────────────────────────────────────────────┐
│  🤖 Agent Aktivitet                        [🔄 Refresh] [⚙️ Filter]     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  [Alle agenter ▼] [Alle prosjekter ▼] [🔴 Live ⚡] [📜 Historie]        │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐│
│  │ ⚙️ BYGGER-agent                              🟢 Active             ││
│  │ Prosjekt: TODO-App                           2 min siden            ││
│  │ ────────────────────────────────────────────────────────────────── ││
│  │                                                                     ││
│  │ → Implementerer TodoList.tsx                                       ││
│  │ → Bruker React hooks (useState, useEffect)                         ││
│  │ → Integrerer med Supabase realtime subscriptions                   ││
│  │ → Legger til TypeScript types                                      ││
│  │                                                                     ││
│  │ [████████░░] 87% ferdig (⏱️ 2 min igjen)                           ││
│  │                                                                     ││
│  │ 📄 Filer endret:                                                   ││
│  │   • TodoList.tsx (+87 linjer, -3 linjer)                           ││
│  │   • types.ts (+12 linjer)                                          ││
│  │                                                                     ││
│  │ [👁️ Se kode] [⏸️ Pause] [⚙️ Juster] [📋 Logg]                      ││
│  └────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐│
│  │ 🔍 REVIEWER-agent                            🟡 Waiting             ││
│  │ Prosjekt: TODO-App                           5 min siden            ││
│  │ ────────────────────────────────────────────────────────────────── ││
│  │                                                                     ││
│  │ → I kø for code review                                              ││
│  │ → Venter på at BYGGER-agent skal fullføre TodoList.tsx             ││
│  │ → Vil sjekke: Code quality, security, best practices               ││
│  │                                                                     ││
│  │ ⏳ Estimert start: 2 minutter                                       ││
│  │                                                                     ││
│  │ [⏩ Skip queue] [📋 Se plan]                                        ││
│  └────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐│
│  │ ✅ TESTER-agent                              ✓ Completed            ││
│  │ Prosjekt: E-handel                           12 min siden           ││
│  │ ────────────────────────────────────────────────────────────────── ││
│  │                                                                     ││
│  │ → Kjørte 24 unit tests for checkout-funksjonalitet                 ││
│  │ → Alle tester passed ✓                                              ││
│  │ → Test coverage: 87% (target: 80%)                                  ││
│  │                                                                     ││
│  │ 📊 Resultater:                                                      ││
│  │   • 24/24 passed (100%)                                             ││
│  │   • Total tid: 2.3 sekunder                                         ││
│  │   • 0 warnings, 0 errors                                            ││
│  │                                                                     ││
│  │ [📄 Se full rapport] [🔁 Kjør igjen] [✏️ Edit tests]                ││
│  └────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐│
│  │ 🛡️ SIKKERHETS-agent                          ⚠️ Warning             ││
│  │ Prosjekt: Blog CMS                           45 min siden           ││
│  │ ────────────────────────────────────────────────────────────────── ││
│  │                                                                     ││
│  │ → Security scan fullført                                            ││
│  │ → Fant 2 potensielle sårbarheter:                                   ││
│  │   1. SQL injection risk i search-funksjon (MEDIUM)                 ││
│  │   2. Manglende CSRF protection på API (HIGH)                       ││
│  │                                                                     ││
│  │ 💡 Forslag:                                                         ││
│  │   • Bruk parameterized queries (SQL)                                ││
│  │   • Legg til CSRF tokens                                            ││
│  │                                                                     ││
│  │ [🔧 Auto-fix] [📋 Se detaljer] [✓ Ignorer]                          ││
│  └────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐│
│  │ 🚀 MVP-agent                                 ✓ Completed            ││
│  │ Prosjekt: Fitness Tracker                    2 timer siden          ││
│  │ ────────────────────────────────────────────────────────────────── ││
│  │                                                                     ││
│  │ → Deployet til Vercel: https://fitness-tracker-xyz.vercel.app      ││
│  │ → Build successful (3m 24s)                                         ││
│  │ → Health check: ✓ All systems operational                           ││
│  │                                                                     ││
│  │ [🌐 Åpne app] [📊 Analytics] [⚙️ Settings]                          ││
│  └────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  [Load more...] (24 more activities)                                    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Nøkkelelementer:**
- **Live feed** med WebSocket updates (nyeste øverst)
- **Status indicators** (🟢 Active, 🟡 Waiting, ✓ Completed, ⚠️ Warning, ❌ Error)
- **Filter options** (agent type, project, status, timeframe)
- **Expandable cards** med detaljer og actions
- **Action buttons** (Se kode, Pause, Juster, Logg, etc.)
- **Real-time progress bars** for aktive agenter
- **Contextual suggestions** (f.eks. auto-fix for security issues)

---

### 4. Settings (/settings) - Konfigurasjon

```
┌─────────────────────────────────────────────────────────────────────┐
│  ⚙️ Settings                                                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  [👤 Profile] [🔐 API Keys] [🎨 Preferences] [⌨️ Shortcuts] [⚠️ Danger]│
│  ═══════════                                                         │
│                                                                      │
│  Profile Information                                                 │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                      │
│  Avatar:      [👤 Upload bilde] [🗑️ Fjern]                          │
│                                                                      │
│  Navn:        [Øyvind Daniel                                ]       │
│  Username:    [@oyvind_d                                    ]       │
│  Email:       [oyvind.daniel@gmail.com                      ]       │
│               ✓ Verified                                             │
│                                                                      │
│  Passord:     [••••••••]                              [Endre]       │
│                                                                      │
│  [💾 Lagre endringer]                                                │
│                                                                      │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                      │
│  API Keys & Integrasjoner                                            │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                      │
│  Supabase:    [••••••••••••••sk_1234]           ✓ Connected         │
│               Last tested: 2 min ago                                 │
│               [Test connection] [Regenerate] [Disconnect]            │
│                                                                      │
│  Vercel:      [Ikke tilkoblet]                  [🔗 Koble til]      │
│               Deploy direkte fra Kit CC                              │
│                                                                      │
│  GitHub:      [github.com/oyvind-d]             ✓ Connected         │
│               Repos: 12 private, 5 public                            │
│               [Reconnect] [Permissions]                              │
│                                                                      │
│  OpenAI:      [••••••••••sk_abc123]             ✓ Connected         │
│               Brukes for AI-suggestions                              │
│               [Test] [Update]                                        │
│                                                                      │
│  [+ Add new integration]                                             │
│                                                                      │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                      │
│  Appearance & Language                                               │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                      │
│  Theme:       [●] Light  [ ] Dark  [ ] System                        │
│                                                                      │
│  Accent color: [🔵] Blue  [ ] Green  [ ] Purple  [ ] Orange         │
│                                                                      │
│  Språk:       [Norsk (Bokmål) ▼]                                    │
│               Other: English, Svenska, Dansk                         │
│                                                                      │
│  Font size:   [──●────] Medium (16px)                               │
│               Affects all text in dashboard                          │
│                                                                      │
│  Density:     [ ] Compact  [●] Normal  [ ] Comfortable              │
│               Controls spacing and padding                           │
│                                                                      │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                      │
│  Notifications                                                       │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                      │
│  [✓] Agent completions                                               │
│  [✓] Errors & warnings                                               │
│  [✓] Deploy status                                                   │
│  [ ] Weekly summary email                                            │
│  [ ] Marketing emails                                                │
│                                                                      │
│  Push notifications: [Enabled ▼]                                     │
│                                                                      │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                      │
│  Project Defaults                                                    │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                      │
│  Default stack:        [Supabase + Next.js + Vercel ▼]             │
│  Default intensity:    [Standard (15-18 poeng) ▼]                   │
│  Auto-deploy staging:  [✓] Enabled                                  │
│  Git commits:          [✓] Auto-commit hver time                    │
│                                                                      │
│  [💾 Save defaults]                                                  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Tab 2: Keyboard Shortcuts**

```
┌─────────────────────────────────────────────────────────────────────┐
│  ⚙️ Settings                                                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  [👤 Profile] [🔐 API Keys] [🎨 Preferences] [⌨️ Shortcuts] [⚠️ Danger]│
│                                      ═════════════                   │
│                                                                      │
│  Keyboard Shortcuts                                [🔄 Reset all]   │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                      │
│  Global                                                              │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                      │
│  Command palette     [Cmd + K]                    [Edit]            │
│  Search everything   [Cmd + P]                    [Edit]            │
│  New project         [Cmd + N]                    [Edit]            │
│  Settings            [Cmd + ,]                    [Edit]            │
│  Toggle sidebar      [Cmd + B]                    [Edit]            │
│  Toggle dark mode    [Cmd + Shift + D]            [Edit]            │
│  Refresh             [Cmd + R]                    [Edit]            │
│                                                                      │
│  Navigation                                                          │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                      │
│  Go to dashboard     [G then D]                   [Edit]            │
│  Go to agents        [G then A]                   [Edit]            │
│  Go to settings      [G then S]                   [Edit]            │
│                                                                      │
│  Editing                                                             │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                      │
│  Save                [Cmd + S]                    [Edit]            │
│  Undo                [Cmd + Z]                    [Edit]            │
│  Redo                [Cmd + Shift + Z]            [Edit]            │
│  Select all          [Cmd + A]                    [Edit]            │
│                                                                      │
│  Power User                                                          │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                      │
│  [✓] Enable Vim mode                                                │
│      (h/j/k/l navigation, dd to delete, etc.)                       │
│                                                                      │
│  [✓] Enable Emacs bindings                                          │
│      (Ctrl+A to beginning, Ctrl+E to end, etc.)                     │
│                                                                      │
│  Custom shortcuts:   [+ Add custom shortcut]                        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Tab 3: Danger Zone**

```
┌─────────────────────────────────────────────────────────────────────┐
│  ⚙️ Settings                                                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  [👤 Profile] [🔐 API Keys] [🎨 Preferences] [⌨️ Shortcuts] [⚠️ Danger]│
│                                                          ══════════  │
│                                                                      │
│  ⚠️ Danger Zone                                                      │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ 📤 Export All Data                                           │  │
│  │                                                               │  │
│  │ Download alle prosjekter, filer, og innstillinger som ZIP   │  │
│  │                                                               │  │
│  │ [📥 Export data]                                             │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ 🗑️ Delete Account                                            │  │
│  │                                                               │  │
│  │ ⚠️ Permanent action! All data will be deleted.              │  │
│  │                                                               │  │
│  │ [🔴 Delete my account]                                       │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 5. Onboarding Wizard (/onboarding) - Første Gang

**Steg 1: Velkommen**

```
┌────────────────────────────────────────────────────────────┐
│                    Velkommen til Kit CC! 🎉                 │
│                    [●○○○○○] Steg 1 av 6                    │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Vi skal hjelpe deg bygge din første app på under 30 min!  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                                                      │  │
│  │       [🚀 Illustrasjon av Kit CC dashboard]         │  │
│  │       (Animert hero image)                           │  │
│  │                                                      │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  Hva er Kit CC?                                             │
│                                                             │
│  • 50 AI-agenter som bygger appen for deg                  │
│  • Fra idé til produksjon på timer, ikke uker               │
│  • Sikkerhet og beste praksis innebygd                     │
│  • Perfekt for vibekodere og utviklere                     │
│                                                             │
│                    [Hopp over] [Neste →]                   │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Steg 2: Hva vil du bygge?**

```
┌────────────────────────────────────────────────────────────┐
│                    Hva vil du bygge? 💡                     │
│                    [●●○○○○] Steg 2 av 6                    │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Velg en mal eller beskriv din egen idé:                   │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ 📱       │  │ 🛒       │  │ 📝       │  │ 💬       │ │
│  │ TODO-app │  │ E-handel │  │ Blog/CMS │  │ Chat-app │ │
│  │          │  │          │  │          │  │          │ │
│  │ [Velg]   │  │ [Velg]   │  │ [Velg]   │  │ [Velg]   │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ 📊       │  │ 🎵       │  │ 🏋️       │  │ 🎯       │ │
│  │ Dashboard│  │ Music    │  │ Fitness  │  │ Annet    │ │
│  │          │  │ Player   │  │ Tracker  │  │ (custom) │ │
│  │ [Velg]   │  │ [Velg]   │  │ [Velg]   │  │ [Velg✓]  │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │
│                                                             │
│  Eller beskriv din egen idé:                               │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Jeg vil bygge en app for å tracke mine workouts    │  │
│  │ og se progresjon over tid. Trenger database for    │  │
│  │ å lagre øvelser og statistikk.                      │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│                    [← Tilbake] [Neste →]                   │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Steg 3: Velg Tech Stack**

```
┌────────────────────────────────────────────────────────────┐
│                    Velg Tech Stack 🛠️                       │
│                    [●●●○○○] Steg 3 av 6                    │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Hvilken stack vil du bruke?                               │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐│
│  │ ✅ Supabase + Next.js + Vercel (Anbefalt)            ││
│  │                                                        ││
│  │ Perfekt for vibekodere:                               ││
│  │ • Database (PostgreSQL) inkludert                     ││
│  │ • Autentisering ferdig                                ││
│  │ • Real-time subscriptions                             ││
│  │ • Gratis hosting på Vercel                            ││
│  │ • Deploy med ett klikk                                ││
│  │                                                        ││
│  │ [● Velg denne] ← 95% velger denne                    ││
│  └───────────────────────────────────────────────────────┘│
│                                                             │
│  ┌───────────────────────────────────────────────────────┐│
│  │ [ ] Custom Stack                                      ││
│  │                                                        ││
│  │ For erfarne utviklere:                                ││
│  │ • Velg din egen database                              ││
│  │ • Velg ditt eget frontend-rammeverk                   ││
│  │ • Full kontroll over alt                              ││
│  │                                                        ││
│  │ [○ Velg denne] ← For eksperter                       ││
│  └───────────────────────────────────────────────────────┘│
│                                                             │
│                    [← Tilbake] [Neste →]                   │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Steg 4: Klassifisering (progressiv avsløring)**

```
┌────────────────────────────────────────────────────────────┐
│                    Klassifisering 📊                        │
│                    [●●●●○○] Steg 4 av 6                    │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  La oss klassifisere prosjektet ditt                       │
│  (Dette hjelper oss tilpasse prosessen)                    │
│                                                             │
│  Spørsmål 1 av 7:                                          │
│  ──────────────────────────────────────────────────────    │
│                                                             │
│  Hvor mange brukere forventer du?                          │
│                                                             │
│  ( ) Bare meg (1-10)                                       │
│  (●) Lite team (10-100)                                    │
│  ( ) Hundrevis (100-1000)                                  │
│  ( ) Tusenvis (1000+)                                      │
│                                                             │
│  ──────────────────────────────────────────────────────    │
│                                                             │
│  [Progress: ██░░░░░]                                       │
│                                                             │
│                    [← Tilbake] [Neste →]                   │
│                    [Hopp over klassifisering]              │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Steg 5: Start Byggeprosess**

```
┌────────────────────────────────────────────────────────────┐
│                    Alt klart! 🚀                            │
│                    [●●●●●○] Steg 5 av 6                    │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Oppsummering:                                              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Prosjekt:    Fitness Tracker                        │  │
│  │ Stack:       Supabase + Next.js + Vercel           │  │
│  │ Nivå:        Standard (15-18 poeng)                │  │
│  │ Estimert tid: 4-6 timer                             │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  Kit CC vil nå:                                             │
│  1. ✓ Sette opp prosjekt-struktur                         │
│  2. ✓ Konfigurere database                                 │
│  3. ⚙️ Generere kode (UI + Backend)                        │
│  4. ○ Kjøre tester                                         │
│  5. ○ Deploye til staging                                  │
│                                                             │
│  Du kan følge med i sanntid!                               │
│                                                             │
│         [← Tilbake] [🚀 Start byggeprosess]                │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Steg 6: Building... (Live Progress)**

```
┌────────────────────────────────────────────────────────────┐
│                    Bygger appen din... ⚙️                   │
│                    [●●●●●●] Steg 6 av 6                    │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  [████████████████████████░░░░░░░] 75%                     │
│                                                             │
│  ⚙️ BYGGER-agent arbeider...                               │
│  → Genererer Workout-komponenten                           │
│                                                             │
│  Recent aktivitet:                                          │
│  ──────────────────────────────────────────────────────    │
│  ✓ Opprettet Supabase database              (2 min siden)  │
│  ✓ Genererte database schema                (3 min siden)  │
│  ✓ Satte opp Next.js prosjekt               (5 min siden)  │
│  ✓ Implementerte autentisering               (8 min siden)  │
│  ⚙️ Genererer UI-komponenter                (nå)           │
│  ○ Kjører tester                            (venter)       │
│  ○ Deployer til Vercel                      (venter)       │
│                                                             │
│  💡 Tips mens du venter:                                   │
│  Kit CC bygger nå en fullstendig fitness tracker med      │
│  database, auth, og deployment. Dette ville tatt deg      │
│  flere dager å bygge manuelt!                              │
│                                                             │
│                    [Se live kode →]                        │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Steg 7: Ferdig! 🎉**

```
┌────────────────────────────────────────────────────────────┐
│                    Gratulerer! 🎉                           │
│                    [●●●●●●] Fullført!                      │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Din Fitness Tracker er klar!                              │
│                                                             │
│  [🎊 Confetti-animasjon 🎊]                                │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 🌐 Live URL:                                        │  │
│  │ https://fitness-tracker-xyz.vercel.app              │  │
│  │                                                      │  │
│  │ [🚀 Åpne appen]                                     │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  Statistikk:                                                │
│  • Total tid: 23 minutter                                  │
│  • Filer generert: 42                                      │
│  • Linjer kode: 2,847                                      │
│  • Agenter brukt: 8                                        │
│                                                             │
│  Neste steg:                                                │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ [ ] Test appen (åpne live URL)                     │  │
│  │ [ ] Tilpass design                                  │  │
│  │ [ ] Legg til flere features                         │  │
│  │ [ ] Deploy til produksjon                           │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│           [📊 Se prosjekt i dashboard]                     │
│           [🎓 Ta tutorial (5 min)]                         │
│           [📚 Les dokumentasjon]                           │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## 🧩 Komponent-Hierarki

### Mappestruktur

```
kit-cc-dashboard/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # Auth-route group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (dashboard)/              # Dashboard-route group (protected)
│   │   ├── page.tsx              # Dashboard home
│   │   ├── project/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Prosjekt-view
│   │   ├── agents/
│   │   │   └── page.tsx          # Agent feed
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx            # Shared layout med Navbar
│   │
│   ├── onboarding/
│   │   └── page.tsx
│   │
│   ├── api/                      # API routes (hvis nødvendig)
│   │   └── webhook/
│   │       └── route.ts
│   │
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
│
├── components/                   # React komponenter
│   ├── ui/                       # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── progress.tsx
│   │   ├── badge.tsx
│   │   ├── toast.tsx
│   │   ├── tooltip.tsx
│   │   ├── tabs.tsx
│   │   ├── select.tsx
│   │   ├── switch.tsx
│   │   ├── separator.tsx
│   │   └── ...
│   │
│   ├── layout/                   # Layout komponenter
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   ├── Container.tsx
│   │   └── MobileNav.tsx
│   │
│   ├── dashboard/                # Dashboard-spesifikke
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── StatsWidget.tsx
│   │   ├── ActivityFeed.tsx
│   │   ├── QuickActions.tsx
│   │   └── EmptyState.tsx
│   │
│   ├── project/                  # Prosjekt-view komponenter
│   │   ├── PhaseTimeline.tsx
│   │   ├── TaskChecklist.tsx
│   │   ├── TaskItem.tsx
│   │   ├── AgentActivityPanel.tsx
│   │   ├── FileBrowser.tsx
│   │   ├── FileTree.tsx
│   │   ├── CodePreview.tsx
│   │   └── ProjectHeader.tsx
│   │
│   ├── agents/                   # Agent-relaterte
│   │   ├── AgentCard.tsx
│   │   ├── AgentFeed.tsx
│   │   ├── AgentStatus.tsx
│   │   ├── AgentFilter.tsx
│   │   ├── AgentDetails.tsx
│   │   └── AgentProgressBar.tsx
│   │
│   ├── onboarding/               # Onboarding wizard
│   │   ├── WizardContainer.tsx
│   │   ├── WizardStep.tsx
│   │   ├── StepIndicator.tsx
│   │   ├── Step1Welcome.tsx
│   │   ├── Step2ProjectType.tsx
│   │   ├── Step3Stack.tsx
│   │   ├── Step4Classify.tsx
│   │   ├── Step5Build.tsx
│   │   └── Step6Complete.tsx
│   │
│   └── shared/                   # Delte utilities
│       ├── LoadingSpinner.tsx
│       ├── LoadingSkeleton.tsx
│       ├── ErrorBoundary.tsx
│       ├── ErrorMessage.tsx
│       ├── EmptyState.tsx
│       ├── SearchBar.tsx
│       ├── CommandPalette.tsx
│       ├── ThemeToggle.tsx
│       ├── ConfettiEffect.tsx
│       └── NotificationToast.tsx
│
├── lib/                          # Utilities & helpers
│   ├── supabase/
│   │   ├── client.ts             # Supabase client (browser)
│   │   ├── server.ts             # Supabase client (server)
│   │   └── middleware.ts         # Auth middleware
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useProjects.ts
│   │   ├── useAgentActivity.ts
│   │   ├── useRealtime.ts
│   │   ├── useTasks.ts
│   │   └── useKeyboardShortcuts.ts
│   │
│   ├── utils/
│   │   ├── cn.ts                 # classnames utility
│   │   ├── formatters.ts         # Date, time, number formatters
│   │   └── validators.ts         # Zod schemas
│   │
│   └── constants.ts              # App-wide constants
│
├── store/                        # Global state (Zustand)
│   ├── projectStore.ts
│   ├── agentStore.ts
│   ├── uiStore.ts
│   └── userStore.ts
│
├── types/                        # TypeScript types
│   ├── database.types.ts         # Generated fra Supabase
│   ├── project.types.ts
│   ├── agent.types.ts
│   └── user.types.ts
│
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── .env.local                    # Environment variables
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── package.json
└── README.md
```

---

### Komponent-oversikt med Props

#### **1. Dashboard Components**

**ProjectCard.tsx**
```typescript
interface ProjectCardProps {
  id: string;
  name: string;
  description?: string;
  currentPhase: number; // 1-7
  progress: number; // 0-100
  status: 'active' | 'paused' | 'completed' | 'archived';
  activeAgents: number;
  estimatedTimeLeft: number; // minutes
  lastUpdated: Date;
  onClick: () => void;
}
```

**StatsWidget.tsx**
```typescript
interface StatsWidgetProps {
  totalProjects: number;
  activeAgents: number;
  completedProjects: number;
  avgCompletion: number; // percentage
  totalTime: number; // hours
}
```

**ActivityFeed.tsx**
```typescript
interface Activity {
  id: string;
  agentName: string;
  action: string;
  message: string;
  projectId: string;
  projectName: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error' | 'info';
}

interface ActivityFeedProps {
  activities: Activity[];
  limit?: number;
  showProject?: boolean;
}
```

---

#### **2. Project View Components**

**PhaseTimeline.tsx**
```typescript
interface Phase {
  number: number;
  name: string;
  status: 'completed' | 'active' | 'pending';
  progress: number; // 0-100
}

interface PhaseTimelineProps {
  phases: Phase[];
  currentPhase: number;
  onPhaseClick?: (phaseNumber: number) => void;
}
```

**TaskChecklist.tsx**
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  phase: number;
  status: 'pending' | 'in_progress' | 'completed';
  assignedAgent?: string;
  orderIndex: number;
}

interface TaskChecklistProps {
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
  onReorder: (tasks: Task[]) => void;
  onAddTask: () => void;
  groupByPhase?: boolean;
}
```

**AgentActivityPanel.tsx**
```typescript
interface AgentActivity {
  id: string;
  agentName: string;
  action: string;
  message: string;
  progress: number; // 0-100
  estimatedTimeLeft: number; // seconds
  status: 'active' | 'waiting' | 'completed' | 'error';
  metadata?: Record<string, any>;
  timestamp: Date;
}

interface AgentActivityPanelProps {
  projectId: string;
  activities: AgentActivity[];
  onRefresh: () => void;
}
```

**FileBrowser.tsx**
```typescript
interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
  size?: number;
  lastModified?: Date;
  modifiedBy?: string; // agent name
}

interface FileBrowserProps {
  files: FileNode[];
  onFileClick: (path: string) => void;
  onFileDelete?: (path: string) => void;
  onFileRename?: (oldPath: string, newPath: string) => void;
  activeFile?: string;
}
```

---

#### **3. Agent Components**

**AgentCard.tsx**
```typescript
interface AgentCardProps {
  agentName: string;
  action: string;
  message: string;
  projectId: string;
  projectName: string;
  progress: number;
  estimatedTimeLeft: number;
  status: 'active' | 'waiting' | 'completed' | 'warning' | 'error';
  filesChanged?: string[];
  metadata?: Record<string, any>;
  timestamp: Date;
  onPause?: () => void;
  onStop?: () => void;
  onViewDetails?: () => void;
}
```

**AgentFilter.tsx**
```typescript
interface AgentFilterProps {
  agents: string[]; // List of agent names
  projects: string[]; // List of project names
  selectedAgents: string[];
  selectedProjects: string[];
  selectedStatus: string[];
  onFilterChange: (filters: {
    agents: string[];
    projects: string[];
    status: string[];
  }) => void;
}
```

---

#### **4. Onboarding Components**

**WizardStep.tsx**
```typescript
interface WizardStepProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  description?: string;
  children: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  nextLabel?: string;
  backLabel?: string;
  isNextDisabled?: boolean;
  showSkip?: boolean;
}
```

---

#### **5. Shared Components**

**CommandPalette.tsx**
```typescript
interface Command {
  id: string;
  label: string;
  shortcut?: string;
  icon?: React.ReactNode;
  action: () => void;
  category?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: Command[];
}
```

**SearchBar.tsx**
```typescript
interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: 'project' | 'file' | 'agent' | 'task';
  path?: string;
  icon?: React.ReactNode;
}

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => SearchResult[];
  onSelect: (result: SearchResult) => void;
}
```

---

## 🗄️ Database Schema (Supabase)

### SQL Schema

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROFILES (bruker Supabase Auth)
-- =====================================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,

  -- Preferences
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'system')),
  language TEXT DEFAULT 'no',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PROJECTS
-- =====================================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  -- Basic info
  name TEXT NOT NULL,
  description TEXT,

  -- Technical
  tech_stack TEXT DEFAULT 'supabase', -- 'supabase', 'custom'
  intensity_level TEXT DEFAULT 'STANDARD', -- 'MINIMAL', 'FORENKLET', 'STANDARD', 'GRUNDIG', 'ENTERPRISE'

  -- Progress
  current_phase INT DEFAULT 1 CHECK (current_phase BETWEEN 1 AND 7),
  overall_progress INT DEFAULT 0 CHECK (overall_progress BETWEEN 0 AND 100),
  phase_progress JSONB DEFAULT '{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0}',

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'archived')),

  -- Metadata
  estimated_time_left INT, -- minutes
  total_time_spent INT DEFAULT 0, -- minutes

  -- URLs
  repo_url TEXT,
  staging_url TEXT,
  production_url TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Index for performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);

-- =====================================================
-- TASKS
-- =====================================================
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,

  -- Task info
  phase INT NOT NULL CHECK (phase BETWEEN 1 AND 7),
  title TEXT NOT NULL,
  description TEXT,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'skipped')),

  -- Assignment
  assigned_agent TEXT, -- 'BYGGER', 'REVIEWER', etc.

  -- Ordering (for drag-and-drop)
  order_index INT NOT NULL DEFAULT 0,

  -- Priority
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'critical')),

  -- Metadata
  estimated_duration INT, -- minutes
  actual_duration INT, -- minutes

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_phase ON tasks(phase);

-- =====================================================
-- AGENT ACTIVITY (logg av agent-handlinger)
-- =====================================================
CREATE TABLE agent_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,

  -- Agent info
  agent_name TEXT NOT NULL, -- 'BYGGER-agent', 'REVIEWER-agent', etc.
  agent_type TEXT, -- 'system', 'basis', 'prosess', 'ekspert'

  -- Action
  action TEXT NOT NULL, -- 'started', 'progress', 'completed', 'failed', 'waiting'
  message TEXT NOT NULL,

  -- Progress
  progress INT CHECK (progress BETWEEN 0 AND 100),
  estimated_time_left INT, -- seconds

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'waiting', 'completed', 'warning', 'error')),

  -- Metadata
  metadata JSONB, -- { files_changed: ['file1.ts'], lines_added: 120, etc. }

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_agent_activity_project_id ON agent_activity(project_id);
CREATE INDEX idx_agent_activity_created_at ON agent_activity(created_at DESC);
CREATE INDEX idx_agent_activity_agent_name ON agent_activity(agent_name);

-- =====================================================
-- FILES (genererte filer)
-- =====================================================
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,

  -- File info
  file_path TEXT NOT NULL, -- 'src/App.tsx'
  file_name TEXT NOT NULL, -- 'App.tsx'
  file_type TEXT, -- 'tsx', 'ts', 'sql', 'md', etc.

  -- Content
  content TEXT, -- Faktisk kode (kan være stor!)
  size INT, -- bytes

  -- Metadata
  created_by TEXT, -- Hvilken agent som laget den
  last_modified_by TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint: en fil per path per prosjekt
  UNIQUE(project_id, file_path)
);

-- Indexes
CREATE INDEX idx_files_project_id ON files(project_id);
CREATE INDEX idx_files_file_type ON files(file_type);

-- =====================================================
-- PROJECT STATES (snapshot av PROJECT-STATE.json)
-- =====================================================
CREATE TABLE project_states (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE UNIQUE NOT NULL,

  -- State data
  state_data JSONB NOT NULL, -- Hele PROJECT-STATE.json

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_project_states_project_id ON project_states(project_id);

-- =====================================================
-- NOTIFICATIONS
-- =====================================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  -- Notification info
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),

  -- Link
  link TEXT, -- '/project/123'

  -- Status
  read BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PROFILES POLICIES
-- =====================================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile (on signup)
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- PROJECTS POLICIES
-- =====================================================

-- Users can view their own projects
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own projects
CREATE POLICY "Users can create own projects" ON projects
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own projects
CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own projects
CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- TASKS POLICIES
-- =====================================================

-- Users can view tasks for their own projects
CREATE POLICY "Users can view tasks for own projects" ON tasks
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Users can create tasks for their own projects
CREATE POLICY "Users can create tasks for own projects" ON tasks
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Users can update tasks for their own projects
CREATE POLICY "Users can update tasks for own projects" ON tasks
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Users can delete tasks for their own projects
CREATE POLICY "Users can delete tasks for own projects" ON tasks
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- =====================================================
-- AGENT ACTIVITY POLICIES
-- =====================================================

-- Users can view agent activity for their own projects
CREATE POLICY "Users can view agent activity for own projects" ON agent_activity
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = agent_activity.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- System can insert agent activity (via service role key)
CREATE POLICY "Service role can insert agent activity" ON agent_activity
  FOR INSERT
  WITH CHECK (true);

-- =====================================================
-- FILES POLICIES
-- =====================================================

-- Users can view files for their own projects
CREATE POLICY "Users can view files for own projects" ON files
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = files.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- System can insert/update files (via service role key)
CREATE POLICY "Service role can manage files" ON files
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- PROJECT STATES POLICIES
-- =====================================================

-- Users can view project states for their own projects
CREATE POLICY "Users can view project states for own projects" ON project_states
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_states.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- System can manage project states (via service role key)
CREATE POLICY "Service role can manage project states" ON project_states
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- NOTIFICATIONS POLICIES
-- =====================================================

-- Users can view their own notifications
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE
  USING (auth.uid() = user_id);

-- System can create notifications (via service role key)
CREATE POLICY "Service role can create notifications" ON notifications
  FOR INSERT
  WITH CHECK (true);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers: Auto-update updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_files_updated_at
  BEFORE UPDATE ON files
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_states_updated_at
  BEFORE UPDATE ON project_states
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- REALTIME (Enable for specific tables)
-- =====================================================

-- Enable Realtime for agent_activity
ALTER PUBLICATION supabase_realtime ADD TABLE agent_activity;

-- Enable Realtime for tasks
ALTER PUBLICATION supabase_realtime ADD TABLE tasks;

-- Enable Realtime for projects
ALTER PUBLICATION supabase_realtime ADD TABLE projects;

-- Enable Realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
```

---

### Database Relationships Diagram

```
┌─────────────────┐
│   auth.users    │ (Supabase Auth)
└────────┬────────┘
         │
         │ 1:1
         ▼
┌─────────────────┐
│    profiles     │
└────────┬────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│    projects     │
└────────┬────────┘
         │
         ├─────────────────┐
         │ 1:N             │ 1:N
         ▼                 ▼
┌─────────────────┐  ┌──────────────────┐
│     tasks       │  │ agent_activity   │
└─────────────────┘  └──────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│     files       │
└─────────────────┘
         │
         │ 1:1
         ▼
┌─────────────────┐
│ project_states  │
└─────────────────┘

         ┌─────────────────┐
         │ notifications   │ (separate, tied to user)
         └─────────────────┘
```

---

## 🔌 Real-Time Features (Supabase Realtime)

### WebSocket Subscriptions

**1. Agent Activity Feed (Real-time)**

```typescript
// lib/hooks/useAgentActivity.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { AgentActivity } from '@/types/agent.types';

export function useAgentActivity(projectId: string) {
  const [activities, setActivities] = useState<AgentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    const fetchActivities = async () => {
      const { data, error } = await supabase
        .from('agent_activity')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (data) {
        setActivities(data);
      }
      setIsLoading(false);
    };

    fetchActivities();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`agent-activity:${projectId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'agent_activity',
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          // Add new activity to top of list
          setActivities((prev) => [payload.new as AgentActivity, ...prev]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'agent_activity',
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          // Update existing activity (e.g., progress)
          setActivities((prev) =>
            prev.map((activity) =>
              activity.id === payload.new.id
                ? (payload.new as AgentActivity)
                : activity
            )
          );
        }
      )
      .subscribe();

    // Cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId]);

  return { activities, isLoading };
}
```

**2. Task Updates (Real-time)**

```typescript
// lib/hooks/useTasks.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Task } from '@/types/project.types';

export function useTasks(projectId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId)
        .order('order_index', { ascending: true });

      if (data) {
        setTasks(data);
      }
      setIsLoading(false);
    };

    fetchTasks();

    // Subscribe to changes
    const channel = supabase
      .channel(`tasks:${projectId}`)
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'tasks',
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTasks((prev) => [...prev, payload.new as Task]);
          } else if (payload.eventType === 'UPDATE') {
            setTasks((prev) =>
              prev.map((task) =>
                task.id === payload.new.id ? (payload.new as Task) : task
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setTasks((prev) =>
              prev.filter((task) => task.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId]);

  return { tasks, isLoading };
}
```

**3. Project Progress (Real-time)**

```typescript
// lib/hooks/useProject.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Project } from '@/types/project.types';

export function useProject(projectId: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (data) {
        setProject(data);
      }
      setIsLoading(false);
    };

    fetchProject();

    // Subscribe to updates
    const channel = supabase
      .channel(`project:${projectId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'projects',
          filter: `id=eq.${projectId}`,
        },
        (payload) => {
          setProject(payload.new as Project);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId]);

  return { project, isLoading };
}
```

---

## ⌨️ Keyboard Shortcuts

### Global Shortcuts

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Cmd/Ctrl + K` | Command palette | Open quick actions menu |
| `Cmd/Ctrl + P` | Search | Global search (fuzzy) |
| `Cmd/Ctrl + N` | New project | Create new project |
| `Cmd/Ctrl + B` | Toggle sidebar | Show/hide file browser |
| `Cmd/Ctrl + Shift + D` | Toggle dark mode | Switch theme |
| `Cmd/Ctrl + ,` | Settings | Open settings |
| `Cmd/Ctrl + R` | Refresh | Refresh current view |
| `/` | Focus search | Focus search input |
| `Esc` | Close modal | Close any open dialog/modal |
| `?` | Show shortcuts | Display keyboard shortcuts help |

### Navigation Shortcuts (Vim-style)

| Shortcut | Action |
|----------|--------|
| `G then D` | Go to Dashboard |
| `G then P` | Go to Projects |
| `G then A` | Go to Agents |
| `G then S` | Go to Settings |

### Editing Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + S` | Save |
| `Cmd/Ctrl + Z` | Undo |
| `Cmd/Ctrl + Shift + Z` | Redo |
| `Cmd/Ctrl + A` | Select all |
| `Cmd/Ctrl + C` | Copy |
| `Cmd/Ctrl + V` | Paste |

### Implementation

```typescript
// lib/hooks/useKeyboardShortcuts.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useKeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const cmdOrCtrl = e.metaKey || e.ctrlKey;

      // Cmd+K: Command palette
      if (cmdOrCtrl && e.key === 'k') {
        e.preventDefault();
        // Open command palette
        // ...
      }

      // Cmd+P: Search
      if (cmdOrCtrl && e.key === 'p') {
        e.preventDefault();
        // Focus search
        // ...
      }

      // Cmd+N: New project
      if (cmdOrCtrl && e.key === 'n') {
        e.preventDefault();
        router.push('/onboarding');
      }

      // Cmd+B: Toggle sidebar
      if (cmdOrCtrl && e.key === 'b') {
        e.preventDefault();
        // Toggle sidebar
        // ...
      }

      // Cmd+Shift+D: Toggle dark mode
      if (cmdOrCtrl && e.shiftKey && e.key === 'd') {
        e.preventDefault();
        // Toggle theme
        // ...
      }

      // Cmd+,: Settings
      if (cmdOrCtrl && e.key === ',') {
        e.preventDefault();
        router.push('/settings');
      }

      // Escape: Close modal
      if (e.key === 'Escape') {
        // Close any open modal
        // ...
      }

      // ?: Show shortcuts help
      if (e.key === '?' && !e.shiftKey) {
        // Show shortcuts dialog
        // ...
      }

      // Vim-style navigation (G then key)
      // Requires state tracking
      // ...
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);
}
```

---

## 🎨 Design System

### Color Palette

**Light Mode:**
```css
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(222.2 84% 4.9%);

  --card: hsl(0 0% 100%);
  --card-foreground: hsl(222.2 84% 4.9%);

  --popover: hsl(0 0% 100%);
  --popover-foreground: hsl(222.2 84% 4.9%);

  --primary: hsl(221.2 83.2% 53.3%); /* Blue */
  --primary-foreground: hsl(210 40% 98%);

  --secondary: hsl(210 40% 96.1%);
  --secondary-foreground: hsl(222.2 47.4% 11.2%);

  --muted: hsl(210 40% 96.1%);
  --muted-foreground: hsl(215.4 16.3% 46.9%);

  --accent: hsl(210 40% 96.1%);
  --accent-foreground: hsl(222.2 47.4% 11.2%);

  --destructive: hsl(0 84.2% 60.2%); /* Red */
  --destructive-foreground: hsl(210 40% 98%);

  --success: hsl(142 71% 45%); /* Green */
  --success-foreground: hsl(0 0% 100%);

  --warning: hsl(38 92% 50%); /* Orange */
  --warning-foreground: hsl(0 0% 100%);

  --border: hsl(214.3 31.8% 91.4%);
  --input: hsl(214.3 31.8% 91.4%);
  --ring: hsl(221.2 83.2% 53.3%);

  --radius: 0.5rem;
}
```

**Dark Mode:**
```css
.dark {
  --background: hsl(222.2 84% 4.9%);
  --foreground: hsl(210 40% 98%);

  --card: hsl(222.2 84% 4.9%);
  --card-foreground: hsl(210 40% 98%);

  --popover: hsl(222.2 84% 4.9%);
  --popover-foreground: hsl(210 40% 98%);

  --primary: hsl(217.2 91.2% 59.8%);
  --primary-foreground: hsl(222.2 47.4% 11.2%);

  --secondary: hsl(217.2 32.6% 17.5%);
  --secondary-foreground: hsl(210 40% 98%);

  --muted: hsl(217.2 32.6% 17.5%);
  --muted-foreground: hsl(215 20.2% 65.1%);

  --accent: hsl(217.2 32.6% 17.5%);
  --accent-foreground: hsl(210 40% 98%);

  --destructive: hsl(0 62.8% 30.6%);
  --destructive-foreground: hsl(210 40% 98%);

  --success: hsl(142 71% 35%);
  --success-foreground: hsl(0 0% 100%);

  --warning: hsl(38 92% 40%);
  --warning-foreground: hsl(0 0% 100%);

  --border: hsl(217.2 32.6% 17.5%);
  --input: hsl(217.2 32.6% 17.5%);
  --ring: hsl(224.3 76.3% 48%);
}
```

### Status Colors

```css
/* Agent/Task status */
--status-active: hsl(142 71% 45%);    /* Green */
--status-waiting: hsl(38 92% 50%);    /* Orange */
--status-completed: hsl(221.2 83.2% 53.3%); /* Blue */
--status-error: hsl(0 84.2% 60.2%);   /* Red */
--status-paused: hsl(215.4 16.3% 46.9%); /* Gray */
```

### Typography

```css
/* Font families */
--font-sans: 'Inter', 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;

/* Font sizes */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;      /* 16px */
--font-size-lg: 1.125rem;    /* 18px */
--font-size-xl: 1.25rem;     /* 20px */
--font-size-2xl: 1.5rem;     /* 24px */
--font-size-3xl: 1.875rem;   /* 30px */
--font-size-4xl: 2.25rem;    /* 36px */

/* Line heights */
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;

/* Font weights */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Spacing

```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
--spacing-3xl: 4rem;     /* 64px */
--spacing-4xl: 6rem;     /* 96px */
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

### Animations

```css
/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide up */
@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Spin (for loading) */
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Pulse (for live indicators) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## 🚀 Implementation Roadmap (3-4 uker)

### **Uke 1: Foundation & Setup**
**Mål**: Sett opp prosjekt, database, autentisering

#### **Dag 1-2: Next.js + Supabase Setup**
- [ ] Init Next.js 15 prosjekt med TypeScript
  ```bash
  npx create-next-app@latest kit-cc-dashboard --typescript --tailwind --app
  ```
- [ ] Installer dependencies
  ```bash
  npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
  npm install zustand
  npm install lucide-react
  npm install @dnd-kit/core @dnd-kit/sortable
  npm install framer-motion
  npm install cmdk
  npm install react-hook-form zod @hookform/resolvers
  npm install date-fns
  ```
- [ ] Installer shadcn/ui
  ```bash
  npx shadcn-ui@latest init
  npx shadcn-ui@latest add button card dialog dropdown-menu input progress badge toast tabs select switch
  ```
- [ ] Konfigurer Supabase
  - Opprett Supabase prosjekt
  - Sett opp `.env.local` med keys
  - Konfigurer Supabase client (`lib/supabase/client.ts`)

**Leveranse**: Fungerende Next.js + Supabase setup

#### **Dag 3-4: Database Schema & RLS**
- [ ] Kjør SQL-schema i Supabase SQL Editor
- [ ] Test tabeller og relationships
- [ ] Konfigurer Row Level Security policies
- [ ] Test RLS med mock user
- [ ] Sett opp Realtime subscriptions
- [ ] Test CRUD-operasjoner via Supabase dashboard

**Leveranse**: Fullstendig database med RLS

#### **Dag 5: Autentisering & Brukerflyt**
- [ ] Lag `/login` og `/signup` pages
- [ ] Implementer Supabase Auth (email/password)
- [ ] Lag middleware for protected routes
- [ ] Opprett profile automatisk ved signup
- [ ] Test auth flow end-to-end

**Leveranse**: Fungerende autentisering

---

### **Uke 2: Core UI & Dashboard**
**Mål**: Bygg hovedsider og komponent-bibliotek

#### **Dag 6-7: Design System & Layout**
- [ ] Konfigurer Tailwind (colors, fonts, spacing)
- [ ] Implementer dark mode (next-themes)
- [ ] Lag `Navbar.tsx` komponent
- [ ] Lag `Container.tsx` layout komponent
- [ ] Lag `ThemeToggle.tsx` for dark mode
- [ ] Test responsivitet (desktop, tablet, mobile)

**Leveranse**: Design system og layouts klare

#### **Dag 8-9: Dashboard (/)**
- [ ] Lag `ProjectCard.tsx` komponent
- [ ] Implementer `ProjectGrid.tsx` (grid/list toggle)
- [ ] Lag `StatsWidget.tsx` (quick stats)
- [ ] Implementer `ActivityFeed.tsx`
- [ ] Hent prosjekter fra Supabase
- [ ] Test med mock data
- [ ] Implementer "Nytt prosjekt" button → redirect til /onboarding

**Leveranse**: Fungerende dashboard med mock data

#### **Dag 10-11: Prosjekt-view (/project/:id)**
- [ ] Lag `PhaseTimeline.tsx` (visuell progresjon)
- [ ] Implementer `TaskChecklist.tsx` (collapsible per fase)
- [ ] Lag `AgentActivityPanel.tsx` (med dummy data)
- [ ] Implementer `FileBrowser.tsx` sidebar
- [ ] Koble til Supabase (hent prosjekt-data)
- [ ] Test real-time updates (WebSocket)

**Leveranse**: Fungerende prosjekt-view

---

### **Uke 3: Features & Interaktivitet**
**Mål**: Real-time, drag-and-drop, onboarding

#### **Dag 12-13: Real-time WebSocket Integration**
- [ ] Implementer `useAgentActivity` hook
- [ ] Implementer `useTasks` hook
- [ ] Implementer `useProject` hook
- [ ] Test WebSocket subscriptions
- [ ] Implementer toast notifications (sonner / react-hot-toast)
- [ ] Progress bars oppdateres live

**Leveranse**: Real-time updates fungerer

#### **Dag 14-15: Drag-and-drop & Interactions**
- [ ] Installer dnd-kit
- [ ] Implementer task reordering (drag-and-drop)
- [ ] Implementer file upload (drag-and-drop)
- [ ] Legg til smooth animations (framer-motion)
- [ ] Loading states for async operations
- [ ] Skeleton loaders

**Leveranse**: Interaktiv UI med DnD

#### **Dag 16-17: Onboarding Wizard**
- [ ] Lag `WizardContainer.tsx`
- [ ] Implementer 6 steg (Step1-Step6)
- [ ] Step 1: Velkommen
- [ ] Step 2: Hva vil du bygge? (templates)
- [ ] Step 3: Velg stack
- [ ] Step 4: Klassifisering (progressiv avsløring)
- [ ] Step 5: Start building (simulert progresjon)
- [ ] Step 6: Ferdig! (confetti + link til app)
- [ ] Lagre prosjekt i Supabase etter wizard

**Leveranse**: Fullstendig onboarding flow

---

### **Uke 4: Polish & Advanced Features**
**Mål**: Keyboard shortcuts, settings, testing

#### **Dag 18-19: Command Palette & Shortcuts**
- [ ] Installer cmdk library
- [ ] Lag `CommandPalette.tsx` (Cmd+K)
- [ ] Implementer global keyboard shortcuts
- [ ] Implementer fuzzy search (over prosjekter, filer, etc.)
- [ ] Quick actions (Nytt prosjekt, Søk, Settings)

**Leveranse**: Command palette fungerer

#### **Dag 20-21: Settings & Konfigurasjon**
- [ ] Lag `/settings` page
- [ ] Tab 1: Profile (edit navn, email, avatar)
- [ ] Tab 2: API Keys (Supabase, Vercel, GitHub)
- [ ] Tab 3: Preferences (theme, language, font size)
- [ ] Tab 4: Keyboard shortcuts (customize bindings)
- [ ] Tab 5: Danger zone (delete account)

**Leveranse**: Settings fungerer

#### **Dag 22-23: Agent Feed (/agents)**
- [ ] Lag `/agents` dedikert side
- [ ] Implementer `AgentFeed.tsx`
- [ ] Advanced filtering (agent type, project, status)
- [ ] `AgentCard.tsx` med expandable details
- [ ] Historical view (timeline)

**Leveranse**: Agent feed fungerer

#### **Dag 24-25: Testing & Bug Fixes**
- [ ] Manual testing av alle flows
  - Auth flow
  - Onboarding flow
  - Dashboard navigation
  - Prosjekt-view
  - Agent feed
  - Settings
- [ ] Responsive design testing (mobile, tablet, desktop)
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Performance optimization
  - Lazy loading
  - Code splitting
  - Image optimization
- [ ] Bug fixes
- [ ] Final polish (animasjoner, transitions)

**Leveranse**: Production-ready dashboard! 🎉

---

## 📦 Tech Stack Oversikt

| Kategori | Teknologi | Versjon | Formål | Dokumentasjon |
|----------|-----------|---------|--------|---------------|
| **Frontend Framework** | Next.js | 15.x | React framework med SSR/SSG | [Next.js Docs](https://nextjs.org/docs) |
| **UI Library** | React | 19.x | Component library | [React Docs](https://react.dev/) |
| **Language** | TypeScript | 5.x | Type safety | [TypeScript Docs](https://www.typescriptlang.org/docs/) |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS | [Tailwind Docs](https://tailwindcss.com/docs) |
| **UI Components** | shadcn/ui | Latest | Pre-built components | [shadcn/ui Docs](https://ui.shadcn.com/) |
| **Backend/Database** | Supabase | Latest | BaaS (Postgres + Auth + Realtime) | [Supabase Docs](https://supabase.com/docs) |
| **Database** | PostgreSQL | 15.x | Relational database (via Supabase) | - |
| **Deployment** | Vercel | - | Hosting + CI/CD | [Vercel Docs](https://vercel.com/docs) |
| **State Management** | Zustand | Latest | Global state (lightweight) | [Zustand Docs](https://docs.pmnd.rs/zustand) |
| **Real-time** | Supabase Realtime | - | WebSocket subscriptions | [Realtime Docs](https://supabase.com/docs/guides/realtime) |
| **Drag-and-Drop** | dnd-kit | Latest | Drag-and-drop (accessible) | [dnd-kit Docs](https://docs.dndkit.com/) |
| **Animations** | Framer Motion | Latest | Smooth transitions & animations | [Framer Docs](https://www.framer.com/motion/) |
| **Command Palette** | cmdk | Latest | Cmd+K interface | [cmdk GitHub](https://github.com/pacocoursey/cmdk) |
| **Icons** | Lucide React | Latest | Icon library (consistent style) | [Lucide Icons](https://lucide.dev/) |
| **Forms** | React Hook Form | Latest | Form handling | [RHF Docs](https://react-hook-form.com/) |
| **Validation** | Zod | Latest | Schema validation | [Zod Docs](https://zod.dev/) |
| **Notifications** | Sonner | Latest | Toast notifications | [Sonner GitHub](https://github.com/emilkowalski/sonner) |
| **Date Handling** | date-fns | Latest | Date utilities | [date-fns Docs](https://date-fns.org/) |

---

## ✅ Success Metrics & KPIs

### Performance Metrics

| Metric | Target | Measurement Tool |
|--------|--------|------------------|
| **First Contentful Paint (FCP)** | < 1.5s | Lighthouse |
| **Largest Contentful Paint (LCP)** | < 2.5s | Lighthouse |
| **Time to Interactive (TTI)** | < 3s | Lighthouse |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Lighthouse |
| **First Input Delay (FID)** | < 100ms | Chrome DevTools |
| **Lighthouse Score (Overall)** | > 90 | Lighthouse |
| **Bundle Size (Initial Load)** | < 200KB | Webpack Bundle Analyzer |
| **WebSocket Latency** | < 100ms | Custom monitoring |

### Usability Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Onboarding Completion Rate** | > 80% | Analytics tracking |
| **Time to First Project** | < 5 min | Analytics + user testing |
| **Time to Find Feature** | < 30 sec | User testing |
| **User Satisfaction (NPS)** | > 50 | Post-use survey |
| **Task Success Rate** | > 90% | User testing |
| **Error Rate** | < 5% | Error tracking (Sentry) |

### Technical Metrics

| Metric | Target |
|--------|--------|
| **Zero Critical Bugs** | ✓ |
| **Real-time Latency** | < 100ms |
| **Database Query Time** | < 50ms (avg) |
| **API Response Time** | < 200ms (p95) |
| **Uptime** | > 99.9% |
| **Test Coverage** | > 80% (future) |

---

## 🔗 Sources & Research

### Design & UX Best Practices
- [15 Best React UI Libraries for 2026 - Builder.io](https://www.builder.io/blog/react-component-libraries-2026)
- [shadcn/ui Dashboard Examples](https://ui.shadcn.com/examples/dashboard)
- [11+ Best Open Source Shadcn Dashboard Templates](https://dev.to/tailwindadmin/best-open-source-shadcn-dashboard-templates-29fb)
- [Creating Effective Management Dashboards - Anoda](https://www.anoda.mobi/ux-blog/creating-management-dashboard)
- [Dashboard Design Best Practices - Justinmind](https://www.justinmind.com/ui-design/dashboard-design-best-practices-ux)

### AI Agent UI Patterns
- [Finding the Holy Grail of AI Agent UIs: A2UI](https://medium.com/@fmind/finding-the-holy-grail-of-ai-agent-uis-from-ai-orchestrated-development-to-a2ui-8fa8303d5381)
- [The Leading Multi-Agent Platform - CrewAI](https://www.crewai.com/)
- [Google's Eight Essential Multi-Agent Design Patterns](https://www.infoq.com/news/2026/01/multi-agent-design-patterns/)
- [LangChain: Choosing the Right Multi-Agent Architecture](https://www.blog.langchain.com/choosing-the-right-multi-agent-architecture/)

### Prototyping & Wireframing
- [Figma AI Wireframe Generator](https://www.figma.com/solutions/ai-wireframe-generator/)
- [Visily - AI-powered UI Design](https://www.visily.ai/)
- [Uizard - AI UI Design Tool](https://uizard.io/)
- [Miro AI Wireframe Generator](https://miro.com/ai/wireframe/)

### Next.js & React Best Practices
- [React & Next.js Best Practices 2026 - Strapi](https://strapi.io/blog/react-and-nextjs-in-2025-modern-best-practices)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19)

### Supabase
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Realtime Guide](https://supabase.com/docs/guides/realtime)
- [Supabase Auth with Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

---

## 📞 Neste Steg for Implementering

### 1. **Start Kit CC Byggeprosess**
Du kan nå bruke **Kit CC** for å bygge dette dashboardet! Følg disse stegene:

```
1. Åpne Kit CC
2. Aktiver OPPSTART-agent
3. Gi den denne filen som input
4. La agentene bygge dashboardet
```

### 2. **Manuell Bygging (hvis du vil)**
Hvis du vil bygge manuelt uten Kit CC:

```bash
# Steg 1: Init prosjekt
npx create-next-app@latest kit-cc-dashboard --typescript --tailwind --app

# Steg 2: Installer dependencies
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs zustand lucide-react @dnd-kit/core framer-motion cmdk

# Steg 3: Installer shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card dialog input progress badge toast

# Steg 4: Sett opp Supabase
# - Opprett Supabase prosjekt på supabase.com
# - Kjør SQL schema fra denne filen
# - Konfigurer .env.local

# Steg 5: Start development
npm run dev
```

### 3. **Tilpasninger**
Dette dokumentet er en komplett guide, men du kan tilpasse:
- Farger (endre Tailwind config)
- Komponenter (legg til/fjern features)
- Database schema (legg til flere tabeller)
- Roadmap (prioriter annerledes)

---

## 🎉 Konklusjon

Denne GUI-projekteringen gir deg:

✅ **Komplett visuell design** (wireframes for alle sider)
✅ **Database schema** (Supabase med RLS)
✅ **Komponent-arkitektur** (gjenbrukbare komponenter)
✅ **Real-time features** (WebSocket-plan)
✅ **Implementation roadmap** (4 ukers detaljert plan)
✅ **Tech stack** (moderne best practices 2026)
✅ **Success metrics** (målbare KPI-er)

**Du er nå klar til å bygge Kit CC Dashboard! 🚀**

---

*Dokument opprettet: 4. februar 2026*
*Sist oppdatert: 4. februar 2026*
*Versjon: 1.0.0*
*Forfatter: Claude (Sonnet 4.5) + Øyvind*
