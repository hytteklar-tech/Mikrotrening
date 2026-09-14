// Delt streak-logikk: "dager på rad", milepæler og pausemerker.
//
// Pausemerker: hver milepæl (isMilestone) gir ett merke. Ett merke bro­kobler
// ett helt opphold uansett lengde (ikke ett merke per tapt dag). Merker er
// knyttet til den aktive streaken — hvis et opphold ikke kan brokobles,
// nullstilles både streak og merker sammen.
//
// calculateStreak() er en ren funksjon: alt utledes fra loggede datoer hver
// gang den kalles. Ingen persistert state — merket "brukes" først i det du
// faktisk logger en ny dag etter et opphold, ikke bare ved å være i pausen.

const MILESTONES_BASE = [7, 14, 30, 50, 75, 100]

/** Faste dager-på-rad-milepæler: 7, 14, 30, 50, 75, 100, og deretter hver 25. dag i det uendelige. */
export function isMilestone(n: number): boolean {
  if (n <= 0) return false
  if (MILESTONES_BASE.includes(n)) return true
  return n > 100 && n % 25 === 0
}

/** Antall milepæler nådd (= antall pausemerker tjent totalt) ved en gitt streak-lengde. */
export function countMilestonesUpTo(n: number): number {
  let count = MILESTONES_BASE.filter(m => m <= n).length
  if (n > 100) count += Math.floor((n - 100) / 25)
  return count
}

/** De `count` neste milepælene forbi `current` (eksklusivt). */
export function nextMilestones(current: number, count: number): number[] {
  const result: number[] = []
  let n = current + 1
  while (result.length < count) {
    if (isMilestone(n)) result.push(n)
    n++
  }
  return result
}

/** Siste milepæl nådd ved eller under `n`, eller null hvis ingen er nådd ennå. */
export function lastMilestoneAtOrBelow(n: number): number | null {
  let last: number | null = null
  for (const m of MILESTONES_BASE) if (m <= n) last = m
  if (n >= 125) last = 100 + Math.floor((n - 100) / 25) * 25
  return last
}

/** Milepæler å vise i UI: siste nådde (hvis noen) + de neste to — ikke hele den uendelige rekken. */
export function milestoneWindow(streak: number): number[] {
  const last = lastMilestoneAtOrBelow(streak)
  return last !== null ? [last, ...nextMilestones(streak, 2)] : nextMilestones(0, 3)
}

const FLAVOR: Record<number, string> = {
  7: 'Du bygger en vane.',
  14: 'To uker uten å gi opp.',
  30: 'Vanen sitter nå.',
  50: 'Halvveis til 100.',
  75: 'Du er nesten der.',
  100: 'Du er Maskinen.',
}

/** Gratulasjon + kort forklaring, vist/sendt når en ny milepæl (= nytt pausemerke) nås. */
export function milestoneMessage(n: number): string {
  const text = FLAVOR[n] ?? 'Sterkt jobbet.'
  return `${n} dager på rad! ${text} 🛡️ Du har tjent et pausemerke — glemmer du en dag, brukes det automatisk så streaken din består.`
}

/** Vises når et pausemerke faktisk ble brukt til å brokoble et opphold. */
export function pauseTokenUsedMessage(streak: number, tokensLeft: number): string {
  return `Pausemerke brukt — streaken din fortsetter på ${streak} dager! 🛡️ ${tokensLeft} igjen.`
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T12:00:00')
  const db = new Date(b + 'T12:00:00')
  return Math.round((db.getTime() - da.getTime()) / 86400000)
}

export function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + 'T12:00:00')
  d.setDate(d.getDate() + n)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export type StreakState = { streak: number; pauseTokens: number }

// Pausemerker gjelder fra og med lanseringsdagen og fremover — ikke retroaktivt.
// Uten denne grensen ville funksjonen brokoblet gamle opphold fra langt tilbake i
// loggen (fra før pausemerker fantes) og blåst opp streaken kunstig. Et opphold kan
// derfor kun brokobles hvis dagen du logger igjen (`d`) er på eller etter denne datoen;
// eldre opphold brytes som før (rent kalender-sammenhengende).
const PAUSE_TOKENS_LAUNCH_DATE = '2026-09-14'

export function calculateStreak(dates: string[], todayStr: string): StreakState {
  const sortedAsc = [...new Set(dates)].sort()
  if (!sortedAsc.length) return { streak: 0, pauseTokens: 0 }

  let streak = 0
  let tokensUsed = 0
  let prev: string | null = null

  for (const d of sortedAsc) {
    if (prev === null) {
      streak = 1
    } else {
      const gap = daysBetween(prev, d) - 1
      if (gap === 0) {
        streak += 1
      } else {
        const canBridge = d >= PAUSE_TOKENS_LAUNCH_DATE
        const available = countMilestonesUpTo(streak) - tokensUsed
        if (canBridge && available > 0) {
          tokensUsed += 1
          streak += 1
        } else {
          streak = 1
          tokensUsed = 0
        }
      }
    }
    prev = d
  }

  // Live-sjekk: er oppholdet siden siste faktiske logg (frem til i går, med
  // gratisdag for i dag) større enn det gjenværende merker kan dekke akkurat nå?
  const referenceDate = new Set(dates).has(todayStr) ? todayStr : addDays(todayStr, -1)
  if (prev !== null && prev < referenceDate) {
    const available = countMilestonesUpTo(streak) - tokensUsed
    if (available <= 0) {
      streak = 0
      tokensUsed = 0
    }
    // ellers: fortsatt i live — merket forblir reservert til du faktisk logger igjen
  }

  return { streak, pauseTokens: Math.max(0, countMilestonesUpTo(streak) - tokensUsed) }
}
