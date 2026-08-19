'use server'

import { createClient } from '@/lib/supabase/server'

export async function setPwaFlag(userId: string) {
  const supabase = await createClient()
  await supabase.from('users').update({ is_pwa: true }).eq('id', userId)
}

export async function autoFillDurations(userId: string) {
  const supabase = await createClient()

  const { data: alleLogs } = await supabase
    .from('daily_logs')
    .select('id, package_id, duration_seconds')
    .eq('user_id', userId)

  if (!alleLogs || alleLogs.length === 0) return

  // Beregn snitt per pakke fra logger med tid
  const gruppert: Record<string, number[]> = {}
  for (const log of alleLogs) {
    if (log.duration_seconds != null && (log.duration_seconds as number) > 0) {
      const pid = log.package_id as string
      if (!gruppert[pid]) gruppert[pid] = []
      gruppert[pid].push(log.duration_seconds as number)
    }
  }

  const snittPerPakke: Record<string, number> = {}
  for (const [pid, tider] of Object.entries(gruppert)) {
    snittPerPakke[pid] = Math.round(tider.reduce((a, b) => a + b, 0) / tider.length)
  }

  // Grupper logg-IDer uten tid per pakke
  const idsByPackage: Record<string, string[]> = {}
  for (const log of alleLogs) {
    if (log.duration_seconds == null) {
      const pid = log.package_id as string
      const snitt = snittPerPakke[pid]
      if (snitt) {
        if (!idsByPackage[pid]) idsByPackage[pid] = []
        idsByPackage[pid].push(log.id as string)
      }
    }
  }

  // Én update per pakke (ikke per logg)
  await Promise.all(
    Object.entries(idsByPackage).map(([pid, ids]) =>
      supabase
        .from('daily_logs')
        .update({ duration_seconds: snittPerPakke[pid] })
        .in('id', ids)
    )
  )
}
