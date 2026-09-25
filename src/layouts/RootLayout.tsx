import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { CartDrawer } from '../components/layout/CartDrawer'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { MobileNav } from '../components/layout/MobileNav'

/** Scrolls to #hash targets after navigation (e.g. /contact#find-us). */
function HashScroll() {
  const { hash, pathname } = useLocation()
  useEffect(() => {
    if (!hash) return
    const id = decodeURIComponent(hash.slice(1))
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 60)
    return () => window.clearTimeout(t)
  }, [hash, pathname])
  return null
}

export function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0">
      <a
        href="#main"
        className="fixed top-2 left-2 z-[80] -translate-y-20 rounded-full bg-espresso px-4 py-2 text-sm font-semibold text-paper focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <CartDrawer />
      <ScrollRestoration />
      <HashScroll />
    </div>
  )
}
