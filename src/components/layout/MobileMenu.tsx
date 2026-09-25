import { ArrowRight, X } from 'lucide-react'
import { useRef } from 'react'
import { NavLink } from 'react-router'
import { cafe } from '../../config/cafe'
import { useModal } from '../../hooks/useModal'
import { ButtonLink } from '../ui/Button'
import { Logo } from '../ui/Logo'
import { primaryNav, secondaryNav } from './nav'

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useModal(open, onClose, ref)
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 animate-fade-in bg-charcoal/40" onClick={onClose} aria-hidden />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="absolute inset-y-0 right-0 flex w-full max-w-sm animate-slide-in-right flex-col overflow-y-auto bg-cream"
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Logo onClick={onClose} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-10 place-items-center rounded-full text-espresso hover:bg-sand"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 px-5 pt-6">
          <ul className="space-y-1">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-b border-line py-3.5 font-serif text-[1.7rem] leading-tight ${
                      isActive ? 'text-terracotta' : 'text-espresso'
                    }`
                  }
                >
                  {item.label}
                  <ArrowRight className="size-4 opacity-40" aria-hidden />
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {secondaryNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} onClick={onClose} className="text-sm font-medium text-roast underline-offset-4 hover:underline">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-4 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <ButtonLink to="/reservations" onClick={onClose} variant="accent" size="lg" className="w-full">
            Reserve a Table
          </ButtonLink>
          <p className="text-center text-xs text-muted">
            {cafe.hours[0].days}: {cafe.hours[0].time}
          </p>
        </div>
      </div>
    </div>
  )
}
