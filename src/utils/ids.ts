const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

const randomCode = (length: number) =>
  Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('')

/** Fictional reference numbers for demo confirmations. */
export const demoOrderNumber = () => `MT-${randomCode(6)}`
export const demoReservationNumber = () => `MTR-${randomCode(5)}`
export const demoMemberNumber = () => `MC-${randomCode(4)}-${randomCode(4)}`
