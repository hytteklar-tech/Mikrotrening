import { NextRequest, NextResponse } from 'next/server'

const DB_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json'
const IMG_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises'

let cachedExercises: any[] | null = null

async function getExercises() {
  if (cachedExercises) return cachedExercises
  const res = await fetch(DB_URL, { next: { revalidate: 86400 } })
  const data = await res.json()
  cachedExercises = data
  return data
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const bodyPart = searchParams.get('bodyPart')?.toLowerCase()
  const name = searchParams.get('name')?.toLowerCase().trim()
  const limit = parseInt(searchParams.get('limit') ?? '20')

  const all: any[] = await getExercises()

  let filtered = all
  if (name) {
    filtered = all.filter(e => e.name.toLowerCase().includes(name))
  } else if (bodyPart && bodyPart !== 'all') {
    filtered = all.filter(e =>
      e.category?.toLowerCase() === bodyPart ||
      e.primaryMuscles?.some((m: string) => m.toLowerCase().includes(bodyPart))
    )
  }

  const result = filtered.slice(0, limit).map(e => ({
    id: e.id,
    name: e.name,
    gifUrl: e.images?.[0] ? `${IMG_BASE}/${encodeURIComponent(e.id)}/${e.images[0].split('/').pop()}` : null,
    bodyPart: e.category ?? '',
    target: e.primaryMuscles?.[0] ?? '',
    equipment: e.equipment ?? '',
    instructions: e.instructions ?? [],
    level: e.level ?? '',
  }))

  return NextResponse.json(result)
}
