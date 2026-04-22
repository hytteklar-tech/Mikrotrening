import { NextRequest, NextResponse } from 'next/server'

const IMAGE_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/'
const DB_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json'

const MUSCLE_MAP: Record<string, string[]> = {
  chest: ['chest'],
  back: ['middle back', 'lower back', 'lats'],
  shoulders: ['shoulders'],
  'upper arms': ['biceps', 'triceps'],
  'upper legs': ['hamstrings', 'quadriceps', 'glutes'],
  'lower legs': ['calves'],
  waist: ['abdominals'],
  cardio: ['cardiovascular system'],
}

type RawExercise = {
  id: string
  name: string
  category: string
  equipment: string
  level: string
  primaryMuscles: string[]
  secondaryMuscles: string[]
  instructions: string[]
  images: string[]
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const bodyPart = searchParams.get('bodyPart')
  const name = searchParams.get('name')?.toLowerCase().trim()
  const limit = Math.min(Math.max(parseInt(searchParams.get('limit') ?? '20', 10) || 20, 1), 100)

  const res = await fetch(DB_URL, { next: { revalidate: 86400 } })
  if (!res.ok) {
    return NextResponse.json({ error: 'fetch_failed' }, { status: 502 })
  }

  const all: RawExercise[] = await res.json()

  let filtered = all
  if (name) {
    filtered = all.filter(e => e.name.toLowerCase().includes(name))
  } else if (bodyPart && bodyPart !== 'all') {
    if (bodyPart === 'cardio') {
      filtered = all.filter(e => e.category === 'cardio')
    } else {
      const muscles = MUSCLE_MAP[bodyPart] ?? []
      filtered = all.filter(e =>
        e.primaryMuscles.some(m => muscles.includes(m.toLowerCase()))
      )
    }
  }

  const result = filtered.slice(0, limit).map(e => ({
    id: e.id,
    name: e.name,
    gifUrl: e.images[0] ? IMAGE_BASE + e.images[0] : null,
    bodyPart: e.primaryMuscles[0] ?? e.category,
    target: e.primaryMuscles[0] ?? '',
    equipment: e.equipment,
    instructions: e.instructions,
    level: e.level,
  }))

  return NextResponse.json(result)
}
