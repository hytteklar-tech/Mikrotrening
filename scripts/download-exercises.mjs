#!/usr/bin/env node
// Laster ned øvelsesbilder fra free-exercise-db til public/exercises/
// Bytt ut bildene med Gym Visual GIF-er etterpå — datastrukturen er den samme
//
// Bruk: node scripts/download-exercises.mjs

import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const DB_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json'
const IMAGE_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/'
const OUTPUT_DIR = path.join(ROOT, 'public/exercises')
const DATA_FILE = path.join(ROOT, 'src/data/exercises.ts')

const TARGET_MUSCLES = {
  bryst: ['chest'],
  ben: ['hamstrings', 'quadriceps', 'glutes'],
}
const PER_GROUP = 15

async function fetchJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Fetch feilet: ${url} (${res.status})`)
  return res.json()
}

async function downloadFile(url, filePath) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Nedlasting feilet: ${url} (${res.status})`)
  const buffer = await res.arrayBuffer()
  await writeFile(filePath, Buffer.from(buffer))
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true })

  console.log('Henter øvelsesdatabase...')
  const all = await fetchJSON(DB_URL)
  console.log(`Totalt: ${all.length} øvelser\n`)

  const selected = []

  for (const [muscleGroup, muscles] of Object.entries(TARGET_MUSCLES)) {
    const filtered = all
      .filter(e =>
        e.images.length > 0 &&
        e.primaryMuscles.some(m => muscles.includes(m.toLowerCase()))
      )
      .slice(0, PER_GROUP)

    console.log(`--- ${muscleGroup.toUpperCase()} (${filtered.length} øvelser) ---`)

    for (const ex of filtered) {
      const imageFile = ex.images[0]
      const imageUrl = IMAGE_BASE + imageFile
      const ext = path.extname(imageFile)
      const slug = slugify(ex.name)
      const fileName = `${slug}${ext}`
      const filePath = path.join(OUTPUT_DIR, fileName)

      process.stdout.write(`  ${ex.name}... `)
      try {
        await downloadFile(imageUrl, filePath)
        console.log('ok')
        selected.push({
          id: slug,
          name: ex.name,
          muscleGroup,
          image: `/exercises/${fileName}`,
          equipment: ex.equipment,
          level: ex.level,
          primaryMuscles: ex.primaryMuscles,
        })
      } catch (e) {
        console.log(`FEIL: ${e.message}`)
      }
    }

    console.log()
  }

  const dataContent = `// Generert av scripts/download-exercises.mjs
// Kjør scriptet på nytt for å oppdatere: node scripts/download-exercises.mjs
//
// NB: Bytt ut bildene i public/exercises/ med Gym Visual GIF-er.
// Hold filnavnene like (bruk samme id-slug).

export type Exercise = {
  id: string
  name: string
  muscleGroup: string
  image: string
  equipment: string
  level: string
  primaryMuscles: string[]
}

export const exercises: Exercise[] = ${JSON.stringify(selected, null, 2)}

export const MUSCLE_GROUP_LABELS: Record<string, string> = {
  bryst: 'Bryst',
  ben: 'Ben',
}
`

  await writeFile(DATA_FILE, dataContent)
  console.log(`Ferdig! ${selected.length} øvelser lagret.`)
  console.log(`  Data:   src/data/exercises.ts`)
  console.log(`  Bilder: public/exercises/`)
}

main().catch(e => {
  console.error(e.message)
  process.exit(1)
})
