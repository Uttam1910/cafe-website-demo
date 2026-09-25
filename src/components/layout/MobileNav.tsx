import { CalendarDays, Coffee, MapPin, ShoppingBag } from 'lucide-react'
import { NavLink } from 'react-router'

const items = [
  { to: '/menu', label: 'Menu', icon: Coffee },
  { to: '/order', label: 'Order', icon: ShoppingBag },
  { to: '/reservations', label: 'Reserve', icon: CalendarDays },
  { to: '/contact', label: 'Location', icon: MapPin },
]

export function MobileNav() {
  return (
    <nav
      aria-label="Quick links"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto grid h-16 max-w-md grid-cols-4">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex h-full flex-col items-center justify-center gap-1 text-[11px] font-semibold tracking-wide transition-colors ${
                  isActive ? 'text-terracotta' : 'text-roast hover:text-espresso'
                }`
              }
            >
              <Icon className="size-5" strokeWidth={1.7} aria-hidden />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
