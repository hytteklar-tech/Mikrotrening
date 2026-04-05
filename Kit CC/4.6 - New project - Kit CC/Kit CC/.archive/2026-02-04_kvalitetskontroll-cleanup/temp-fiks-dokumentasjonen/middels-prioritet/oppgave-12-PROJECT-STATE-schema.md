# Oppgave 12: Utvid PROJECT-STATE-SCHEMA.json

> **Prioritet:** MIDDELS
> **Status:** ⚪ Ikke startet
> **Estimert tid:** 30-45 minutter

---

## HVA

Dokumenter ny struktur for completedSteps og skippedSteps i PROJECT-STATE.json skjema.

## HVOR

Fil: `/mnt/Ongoing work/Agenter/klassifisering/PROJECT-STATE-SCHEMA.json`

## ENDRING

Oppdater schema for completedSteps og legg til skippedSteps:

```json
"completedSteps": {
  "type": "array",
  "description": "Liste over fullførte oppgaver",
  "items": {
    "oneOf": [
      {
        "type": "string",
        "description": "Enkel format (bakoverkompatibilitet) - kun oppgave-ID"
      },
      {
        "type": "object",
        "description": "Utvidet format (ANBEFALT) - med metadata",
        "required": ["id", "name", "requirement", "status"],
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "requirement": { "enum": ["MÅ", "BØR", "KAN"] },
          "status": { "enum": ["completed", "partial"] },
          "deliverable": { "type": "string" },
          "note": { "type": "string" },
          "timestamp": { "type": "string", "format": "date-time" }
        }
      }
    ]
  }
},
"skippedSteps": {
  "type": "array",
  "description": "Liste over bevisst skippede oppgaver",
  "items": {
    "type": "object",
    "required": ["id", "name", "requirement", "reason"],
    "properties": {
      "id": { "type": "string" },
      "name": { "type": "string" },
      "requirement": { "enum": ["BØR", "KAN"] },
      "reason": { 
        "type": "string",
        "description": "Begrunnelse for hvorfor oppgaven ble skipet"
      },
      "timestamp": { "type": "string", "format": "date-time" }
    }
  }
}
```

## REFERANSE

Se oppgave 1 (SYSTEM-PROTOCOL) for detaljert beskrivelse av feltene.

## VERIFISERING

- [ ] completedSteps støtter både string og object format
- [ ] skippedSteps schema er lagt til
- [ ] Alle påkrevde felt er markert i schema

---

**Status:** ⚪ → 🟢 når ferdig
**Avhenger av:** Oppgave 1
