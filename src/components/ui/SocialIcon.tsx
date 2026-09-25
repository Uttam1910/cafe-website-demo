/** Brand glyphs (lucide-react no longer ships brand icons). */
export function SocialIcon({ id, className = 'size-4' }: { id: string; className?: string }) {
  if (id === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3A21 21 0 0 0 14.3 4c-2.3 0-3.8 1.4-3.8 3.9v2.5H8v3h2.5V21h3Z" />
    </svg>
  )
}
