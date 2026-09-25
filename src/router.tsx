import type { ComponentType } from 'react'
import { createBrowserRouter } from 'react-router'
import { RootLayout } from './layouts/RootLayout'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import type { LegalPageData } from './data/legal'

/* Inner pages are split into their own chunks; the homepage and 404 stay in the main bundle. */
const page = <K extends string>(load: () => Promise<Record<K, ComponentType>>, name: K) => async () => ({
  Component: (await load())[name],
})

const legal = (slug: LegalPageData['slug']) => async () => {
  const { LegalPage } = await import('./pages/LegalPage')
  return { Component: () => <LegalPage slug={slug} /> }
}

const product = (from: 'menu' | 'order') => async () => {
  const { ProductPage } = await import('./pages/ProductPage')
  return { Component: () => <ProductPage from={from} /> }
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    hydrateFallbackElement: <div className="min-h-[60vh]" />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/menu', lazy: page(() => import('./pages/MenuPage'), 'MenuPage') },
      { path: '/menu/:slug', lazy: product('menu') },
      { path: '/order', lazy: page(() => import('./pages/OrderPage'), 'OrderPage') },
      { path: '/order/:slug', lazy: product('order') },
      { path: '/checkout', lazy: page(() => import('./pages/CheckoutPage'), 'CheckoutPage') },
      { path: '/our-story', lazy: page(() => import('./pages/OurStoryPage'), 'OurStoryPage') },
      { path: '/gallery', lazy: page(() => import('./pages/GalleryPage'), 'GalleryPage') },
      { path: '/reservations', lazy: page(() => import('./pages/ReservationsPage'), 'ReservationsPage') },
      { path: '/contact', lazy: page(() => import('./pages/ContactPage'), 'ContactPage') },
      { path: '/loyalty', lazy: page(() => import('./pages/LoyaltyPage'), 'LoyaltyPage') },
      { path: '/privacy', lazy: legal('privacy') },
      { path: '/terms', lazy: legal('terms') },
      { path: '/shipping', lazy: legal('shipping') },
      { path: '/returns', lazy: legal('returns') },
      { path: '/faq', lazy: page(() => import('./pages/FaqPage'), 'FaqPage') },
      { path: '/credits', lazy: page(() => import('./pages/CreditsPage'), 'CreditsPage') },
      { path: '/404', element: <NotFoundPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
