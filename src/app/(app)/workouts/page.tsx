import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import EgenpakkeClient from '@/components/features/EgenpakkeClient'
import { exercises as exerciseLibrary } from '@/data/exercises'

export default async function WorkoutsPage({ searchParams }: { searchParams: Promise<{ ids?: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { ids } = await searchParams
  const preselected = ids
    ? ids.split(',').map(id => exerciseLibrary.find(e => e.id === id)).filter(Boolean).map(e => ({
        name: e!.name, value: String(e!.suggestedValue), unit: e!.unit,
      }))
    : []

  const { data: rawPackages, error } = await supabase
    .from('workout_packages')
    .select('id, name, is_active, workout_package_categories(category_id), exercises(id, name, reps, unit, order)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) console.error('workouts query error:', error)

  const packages = (rawPackages ?? []).map(p => ({
    ...p,
    category_ids: ((p.workout_package_categories ?? []) as { category_id: string }[]).map(x => x.category_id),
  }))

  return (
    <div className="p-4 space-y-4">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Egenpakker</h1>
      </div>
      <EgenpakkeClient packages={packages} userId={user.id} preselected={preselected} />
    </div>
  )
}
