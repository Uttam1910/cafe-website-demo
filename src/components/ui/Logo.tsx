import { Link } from 'react-router'
import { cafe } from '../../config/cafe'

export function Logo({
  tone = 'dark',
  compact = false,
  onClick,
}: {
  tone?: 'dark' | 'light'
  compact?: boolean
  onClick?: () => void
}) {
  const color = tone === 'light' ? 'text-paper' : 'text-espresso'
  return (
    <Link to="/" onClick={onClick} className={`group inline-flex flex-col leading-none ${color}`} aria-label={`${cafe.brandName} — home`}>
      <span className="font-serif text-[1.15rem] font-medium tracking-[0.14em] sm:text-[1.3rem]">
        MORNING<span className="mx-[0.28em] inline-block size-[0.3em] -translate-y-[0.12em] rounded-full bg-terracotta align-middle" aria-hidden />THEORY
      </span>
      {!compact && (
        <span className={`mt-1 text-[8.5px] font-semibold tracking-[0.3em] ${tone === 'light' ? 'text-paper/75' : 'text-muted'}`}>
          {cafe.descriptor}
        </span>
      )}
    </Link>
  )
}
