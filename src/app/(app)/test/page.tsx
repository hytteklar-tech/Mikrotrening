import { unstable_noStore as noStore } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import TestClient from '@/components/features/TestClient'

export default async function TestPage() {
  noStore()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: types } = await supabase
    .from('test_types')
    .select('id, name, unit, higher_is_better, user_id')
    .or(`user_id.is.null,user_id.eq.${user.id}`)
    .order('created_at', { ascending: true })

  const { data: results } = await supabase
    .from('test_results')
    .select('id, test_type_id, result, tested_date, notes')
    .eq('user_id', user.id)
    .order('tested_date', { ascending: true })

  const testTypes = (types ?? []).map(t => ({
    id: t.id as string,
    name: t.name as string,
    unit: t.unit as string,
    higherIsBetter: t.higher_is_better as boolean,
    isOwn: t.user_id === user.id,
  }))

  const testResults = (results ?? []).map(r => ({
    id: r.id as string,
    testTypeId: r.test_type_id as string,
    result: Number(r.result),
    testedDate: r.tested_date as string,
    notes: r.notes as string | null,
  }))

  return (
    <div className="p-4 pb-28 space-y-4">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Tester 📏</h1>
        <p className="text-gray-400 text-sm mt-1">Mål fremgangen din</p>
      </div>
      <TestClient
        initialTestTypes={testTypes}
        initialTestResults={testResults}
        userId={user.id}
      />
    </div>
  )
}
