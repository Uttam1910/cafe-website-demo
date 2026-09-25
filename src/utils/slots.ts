import { cafe } from '../config/cafe'
import { formatTime } from './format'

export interface Slot {
  value: string
  label: string
  disabled: boolean
  reason?: 'past' | 'full'
}

const minutesNow = (d = new Date()) => d.getHours() * 60 + d.getMinutes()

export const todayISO = (d = new Date()) => {
  const offset = d.getTimezoneOffset() * 60000
  return new Date(d.getTime() - offset).toISOString().slice(0, 10)
}

export const addDaysISO = (days: number) => {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return todayISO(d)
}

/**
 * Pickup slots every 15 minutes from ~20 minutes out until closing.
 * After hours, offers tomorrow's slots instead (and no "ASAP").
 */
export const pickupSlots = (): { asap: boolean; slots: { value: string; label: string }[] } => {
  const open = cafe.openHour * 60
  const end = cafe.closeHour * 60 - 15
  const now = minutesNow()
  const build = (from: number, prefix = '') => {
    const slots: { value: string; label: string }[] = []
    for (let m = from; m <= end; m += 15) slots.push({ value: `${prefix ? 'tomorrow-' : ''}${m}`, label: `${prefix}${formatTime(m)}` })
    return slots
  }
  const today = build(Math.max(open, Math.ceil((now + 20) / 15) * 15))
  if (today.length > 0) return { asap: now >= open, slots: today }
  return { asap: false, slots: build(open, 'Tomorrow · ') }
}

export const pickupLabel = (value: string) => {
  if (value === 'asap') return 'As soon as possible'
  const tomorrow = value.startsWith('tomorrow-')
  const minutes = Number(value.replace('tomorrow-', ''))
  return `${tomorrow ? 'Tomorrow, ' : 'Today, '}${formatTime(minutes)}`
}

/** Deterministic "busy" pattern so a given date always shows the same full slots. */
const isFull = (dateISO: string, minutes: number) => {
  let hash = 0
  for (const ch of `${dateISO}-${minutes}`) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return hash % 5 === 0
}

export const reservationSlots = (dateISO: string): Slot[] => {
  const slots: Slot[] = []
  const isToday = dateISO === todayISO()
  const now = minutesNow()
  for (let m = cafe.openHour * 60; m <= (cafe.closeHour - 1) * 60; m += 30) {
    const past = isToday && m <= now + 30
    const full = !past && isFull(dateISO, m)
    slots.push({
      value: String(m),
      label: formatTime(m),
      disabled: past || full,
      reason: past ? 'past' : full ? 'full' : undefined,
    })
  }
  return slots
}
