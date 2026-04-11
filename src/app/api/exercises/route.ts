import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const bodyPart = searchParams.get('bodyPart')
  const name = searchParams.get('name')?.toLowerCase().trim()
  const limit = searchParams.get('limit') ?? '20'

  const apiKey = process.env.RAPIDAPI_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'no_key' }, { status: 500 })
  }

  let url = `https://exercisedb.p.rapidapi.com/exercises?limit=${limit}&offset=0`
  if (name) url = `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(name)}?limit=${limit}`
  else if (bodyPart) url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${encodeURIComponent(bodyPart)}?limit=${limit}`

  const res = await fetch(url, {
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    },
    next: { revalidate: 3600 },
  })

  if (!res.ok) return NextResponse.json({ error: 'api_error' }, { status: res.status })
  const data = await res.json()
  return NextResponse.json(data)
}
