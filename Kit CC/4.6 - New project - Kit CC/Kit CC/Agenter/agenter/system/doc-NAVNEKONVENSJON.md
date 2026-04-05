# doc-NAVNEKONVENSJON.md — Navnekonvensjon for filer i Kit CC

> **SSOT for filnavn-prefixer og konvensjoner.** Referert fra CLAUDE.md.
> Versjon: 1.0.0 | Opprettet: 2026-02-23

---

## System-mappen (`Kit CC/Agenter/agenter/system/`)

| Prefiks | Type | Beskrivelse |
|---------|------|-------------|
| `agent-*` | Agent | Faktisk agent (tar beslutninger, koordinerer arbeid) |
| `protocol-*` | Protokoll | Standarder og regler |
| `doc-*` | Dokumentasjon | Oversikter, matriser, referanser |
| `extension-*` | Extension | Tillegg som utvider andre agenter |

## Andre mapper

| Mappe | Format | Eksempel |
|-------|--------|---------|
| Basis-agenter | `[NAVN]-agent.md` | `BYGGER-agent.md` |
| Prosess-agenter | `[NR]-[NAVN]-agent.md` | `4-MVP-agent.md` |
| Ekspert-agenter | `[NAVN]-ekspert.md` | `GDPR-ekspert.md` |
| Maler | `MAL-[TYPE].md` | `MAL-EKSPERT.md` |

**Ved nye filer:** Følg alltid denne konvensjonen.
