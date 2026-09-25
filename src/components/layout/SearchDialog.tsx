import { ArrowRight, Search, X } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import { categoryLabel } from '../../data/menu'
import { useModal } from '../../hooks/useModal'
import { formatINR } from '../../utils/format'
import { matchProducts } from '../../utils/search'
import { Img } from '../ui/Img'

const pages = [
  { to: '/reservations', label: 'Reserve a table', keywords: 'book table reservation booking' },
  { to: '/loyalty', label: 'The Morning Club', keywords: 'loyalty rewards club stamp member' },
  { to: '/contact', label: 'Find us & contact', keywords: 'address location hours phone email map directions' },
  { to: '/gallery', label: 'Gallery', keywords: 'photos pictures instagram' },
  { to: '/our-story', label: 'Our story', keywords: 'about story team' },
  { to: '/faq', label: 'FAQ', keywords: 'questions help delivery wifi pets' },
]

const suggestions = ['Latte', 'Croissant', 'Vegan', 'Matcha', 'Chai']

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  useModal(open, onClose, ref)

  const results = useMemo(() => (query.trim() ? matchProducts(query).slice(0, 8) : []), [query])
  const pageResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? pages.filter((p) => `${p.label} ${p.keywords}`.toLowerCase().includes(q)) : []
  }, [query])

  if (!open) return null
  const close = () => {
    setQuery('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 animate-fade-in bg-charcoal/45" onClick={close} aria-hidden />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="relative mx-auto flex max-h-[100dvh] w-full max-w-2xl animate-rise flex-col bg-cream sm:mt-[10vh] sm:max-h-[75vh] sm:rounded-3xl sm:shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <Search className="size-5 shrink-0 text-muted" aria-hidden />
          <label htmlFor="site-search" className="sr-only">
            Search the menu
          </label>
          <input
            id="site-search"
            data-autofocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lattes, bakes, breakfast…"
            autoComplete="off"
            className="h-10 min-w-0 flex-1 bg-transparent text-lg text-espresso outline-none placeholder:text-muted/70"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close search"
            className="grid size-10 shrink-0 place-items-center rounded-full text-espresso hover:bg-sand"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-5" aria-live="polite">
          {!query.trim() && (
            <div>
              <p className="eyebrow mb-3 text-muted">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-line bg-paper px-4 py-2 text-sm text-roast hover:border-espresso/40"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {query.trim() && results.length === 0 && pageResults.length === 0 && (
            <p className="py-8 text-center text-muted">
              Nothing matches “{query}”. Try <button type="button" className="font-semibold text-espresso underline" onClick={() => setQuery('coffee')}>coffee</button> or{' '}
              <button type="button" className="font-semibold text-espresso underline" onClick={() => setQuery('bakery')}>bakery</button>.
            </p>
          )}
          {results.length > 0 && (
            <ul className="divide-y divide-line">
              {results.map((p) => (
                <li key={p.id}>
                  <Link to={`/menu/${p.slug}`} onClick={close} className="flex items-center gap-4 py-3 hover:bg-sand/40">
                    <Img name={p.image} sizes="56px" alt="" className="size-14 shrink-0 rounded-xl object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-serif text-lg text-espresso">{p.name}</span>
                      <span className="block truncate text-[13px] text-muted">{categoryLabel(p.category)} · {p.description}</span>
                    </span>
                    <span className="text-sm font-semibold text-espresso">{formatINR(p.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {pageResults.length > 0 && (
            <div className="mt-4">
              <p className="eyebrow mb-2 text-muted">Pages</p>
              <ul>
                {pageResults.map((p) => (
                  <li key={p.to}>
                    <Link to={p.to} onClick={close} className="flex items-center justify-between py-2.5 font-medium text-espresso hover:text-terracotta">
                      {p.label} <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
