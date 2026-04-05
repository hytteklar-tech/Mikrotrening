# Datamodell — Sommerkropp

## Tabeller

### users
| Felt | Type | Beskrivelse |
|------|------|-------------|
| id | uuid PK | Supabase Auth ID |
| phone | text | Mobilnummer (fra auth) |
| display_name | text | Visningsnavn |
| created_at | timestamptz | Opprettet |
| notifications_enabled | boolean | Push-varsler av/på |

### workout_packages
| Felt | Type | Beskrivelse |
|------|------|-------------|
| id | uuid PK | |
| user_id | uuid FK → users | Eier |
| name | text | Navn på pakken |
| created_at | timestamptz | |

### exercises
| Felt | Type | Beskrivelse |
|------|------|-------------|
| id | uuid PK | |
| package_id | uuid FK → workout_packages | |
| name | text | Navn på øvelse |
| reps | integer | Antall repetisjoner |
| order | integer | Rekkefølge i pakken |

### daily_logs
| Felt | Type | Beskrivelse |
|------|------|-------------|
| id | uuid PK | |
| user_id | uuid FK → users | |
| package_id | uuid FK → workout_packages | |
| logged_date | date | Dato for treningen |
| created_at | timestamptz | |

### groups
| Felt | Type | Beskrivelse |
|------|------|-------------|
| id | uuid PK | |
| name | text | Gruppenavn |
| invite_code | text UNIQUE | 6-tegns kode |
| created_by | uuid FK → users | |
| created_at | timestamptz | |

### group_members
| Felt | Type | Beskrivelse |
|------|------|-------------|
| group_id | uuid FK → groups | |
| user_id | uuid FK → users | |
| joined_at | timestamptz | |
| PRIMARY KEY | (group_id, user_id) | |

## Beregnet data (ikke lagret — beregnes on-the-fly)

- **Streak:** Telles fra daily_logs — sammenhengende dager med minst én log
- **Totale dager:** COUNT(DISTINCT logged_date) per user
- **Poeng (leaderboard):** streak × 2 + totale_dager ✅ (bekreftet av bruker)
- **Aktiv i dag:** Finnes det en daily_log for today for denne brukeren?
