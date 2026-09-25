import { Menu, Search, ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { useCart } from '../../context/cart'
import { buttonClass } from '../ui/buttonClass'
import { Logo } from '../ui/Logo'
import { MobileMenu } from './MobileMenu'
import { primaryNav } from './nav'
import { SearchDialog } from './SearchDialog'

export function Header() {
  const { pathname } = useLocation()
  const { itemCount, openDrawer } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const overHero = pathname === '/'
  const transparent = overHero && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const iconBtn = `relative grid size-10 place-items-center rounded-full transition-colors ${
    transparent ? 'text-paper hover:bg-white/15' : 'text-espresso hover:bg-sand'
  }`

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,color] duration-300 ${
          transparent
            ? 'bg-gradient-to-b from-black/35 to-transparent'
            : 'bg-cream/92 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md'
        }`}
      >
        <div className="container-page flex h-16 items-center gap-4 lg:h-[72px]">
          <Logo tone={transparent ? 'light' : 'dark'} />

          <nav aria-label="Primary" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `relative rounded-full px-3 py-2 text-[13.5px] font-medium transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                        transparent ? 'text-paper/90 after:bg-paper hover:text-paper' : 'text-roast after:bg-espresso hover:text-espresso'
                      } ${isActive ? `after:scale-x-100 ${transparent ? 'text-paper!' : 'text-espresso!'}` : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-3">
            <span className="mr-2 hidden md:block">
              <NavLink to="/reservations" className={buttonClass(transparent ? 'ghost-light' : 'accent', 'sm')}>
                Reserve a Table
              </NavLink>
            </span>
            <button type="button" className={iconBtn} aria-label="Search the menu" onClick={() => setSearchOpen(true)}>
              <Search className="size-[18px]" aria-hidden />
            </button>
            <button
              type="button"
              className={iconBtn}
              onClick={openDrawer}
              aria-label={`Open bag, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
            >
              <ShoppingBag className="size-[18px]" aria-hidden />
              {itemCount > 0 && (
                <span className="absolute top-0.5 right-0.5 grid min-w-[18px] place-items-center rounded-full bg-terracotta px-1 text-[10px] leading-[18px] font-bold text-paper tabular-nums">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className={`${iconBtn} lg:hidden`}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>
      {!overHero && <div aria-hidden className="h-16 lg:h-[72px]" />}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
