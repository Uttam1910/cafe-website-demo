export type Errors<K extends string> = Partial<Record<K, string>>

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

/** Accepts Indian mobile numbers with optional +91 / 0 prefix and spaces. */
export const isIndianPhone = (v: string) => /^(?:\+?91|0)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, ''))

export const required = (v: string, message: string) => (v.trim() ? undefined : message)

export const hasErrors = <K extends string>(errors: Errors<K>) =>
  Object.values(errors).some(Boolean)

/** Removes undefined entries so an empty object means "valid". */
export const compact = <K extends string>(errors: Errors<K>): Errors<K> =>
  Object.fromEntries(Object.entries(errors).filter(([, v]) => Boolean(v))) as Errors<K>
