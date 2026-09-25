const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

export const formatINR = (amount: number) => inr.format(Math.round(amount))

export const formatDelta = (delta: number) =>
  delta === 0 ? '' : `${delta > 0 ? '+' : '−'}${formatINR(Math.abs(delta))}`

export const pad2 = (n: number) => String(n).padStart(2, '0')

export const formatTime = (minutesFromMidnight: number) => {
  const h = Math.floor(minutesFromMidnight / 60)
  const m = minutesFromMidnight % 60
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${pad2(m)} ${suffix}`
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
