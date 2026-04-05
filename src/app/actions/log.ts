'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function logWorkout(userId: string, packageId: string, date: string) {
  const supabase = await createClient()
  await supabase.from('daily_logs').insert({
    user_id: userId,
    package_id: packageId,
    logged_date: date,
  })
  revalidatePath('/')
  revalidatePath('/statistikk')
}

export async function removeLog(userId: string, date: string) {
  const supabase = await createClient()
  await supabase.from('daily_logs')
    .delete()
    .eq('user_id', userId)
    .eq('logged_date', date)
  revalidatePath('/')
  revalidatePath('/statistikk')
}
