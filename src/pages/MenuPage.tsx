import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { ProductCard } from '../components/product/ProductCard'
import { Button } from '../components/ui/Button'
import { PageIntro } from '../components/ui/PageIntro'
import { Pills } from '../components/ui/Pills'
import { categoryLabel, dietaryFilters, menuCategories, type DietaryFilter, type MenuFilter } from '../data/menu'
import { products } from '../data/products'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import type { CategoryId } from '../types'
import { filterProducts, inCategory } from '../utils/search'

const isMenuFilter = (v: string | null): v is MenuFilter => menuCategories.some((c) => c.id === v)
const isDietary = (v: string): v is DietaryFilter => dietaryFilters.some((d) => d.id === v)

export function MenuPage() {
  useDocumentMeta('Menu', 'Specialty coffee, matcha, all-day breakfast, sandwiches, fresh bakes and desserts at MORNING THEORY. Prices in INR.')
  const [params, setParams] = useSearchParams()
  const rawCategory = params.get('category')
  const category: MenuFilter = isMenuFilter(rawCategory) ? rawCategory : 'all'
  const query = params.get('q') ?? ''
  const dietParam = params.get('diet') ?? ''
  const dietary = useMemo(() => dietParam.split(',').filter(isDietary), [dietParam])

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v)
      else next.delete(k)
    }
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const toggleDiet = (id: DietaryFilter) => {
    const next = dietary.includes(id) ? dietary.filter((d) => d !== id) : [...dietary, id]
    update({ diet: next.join(',') || null })
  }

  const results = useMemo(() => filterProducts(query, category, dietary), [query, category, dietary])
  const counts = useMemo(
    () => Object.fromEntries(menuCategories.map((c) => [c.id, products.filter((p) => inCategory(p, c.id)).length])),
    [],
  ) as Record<MenuFilter, number>

  const grouped = category === 'all' && !query && dietary.length === 0
  const groups = useMemo(() => {
    const map = new Map<CategoryId, typeof results>()
    for (const p of results) map.set(p.category, [...(map.get(p.category) ?? []), p])
    return [...map.entries()]
  }, [results])

  const hasFilters = category !== 'all' || query || dietary.length > 0

  return (
    <>
      <PageIntro
        accent="Made slowly, served warmly"
        title="Our Menu"
        intro="Coffee from small Indian estates, bakes from our own oven and breakfast all day. Every milk drink can be made with oat, almond or soy."
      />

      <div className="sticky top-16 z-20 border-y border-line bg-cream/95 backdrop-blur-md lg:top-[72px]">
        <div className="container-page flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:gap-6">
          <div className="min-w-0 flex-1">
            <Pills
              label="Menu categories"
              options={menuCategories}
              value={category}
              onChange={(id) => update({ category: id === 'all' ? null : id })}
              counts={counts}
            />
          </div>
          <div className="relative lg:w-72">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <label htmlFor="menu-search" className="sr-only">
              Search the menu
            </label>
            <input
              id="menu-search"
              type="search"
              value={query}
              onChange={(e) => update({ q: e.target.value || null })}
              placeholder="Search the menu"
              className="h-11 w-full rounded-full border border-line bg-paper pr-4 pl-11 text-sm outline-none focus:border-espresso"
            />
          </div>
        </div>
      </div>

      <div className="container-page py-8 sm:py-10">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Dietary filters">
          <span className="mr-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted">
            <SlidersHorizontal className="size-4" aria-hidden /> Dietary
          </span>
          {dietaryFilters.map((d) => {
            const active = dietary.includes(d.id)
            return (
              <button
                key={d.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggleDiet(d.id)}
                className={`h-9 rounded-full border px-3.5 text-[13px] font-medium transition-colors ${
                  active ? 'border-sage-dark bg-sage-dark text-paper' : 'border-line bg-paper text-roast hover:border-sage'
                }`}
              >
                {d.label}
              </button>
            )
          })}
          {hasFilters && (
            <button
              type="button"
              onClick={() => setParams({}, { replace: true, preventScrollReset: true })}
              className="ml-auto inline-flex items-center gap-1 text-[13px] font-semibold text-terracotta-dark hover:underline"
            >
              <X className="size-3.5" aria-hidden /> Clear filters
            </button>
          )}
        </div>

        <p className="mt-6 text-sm text-muted" aria-live="polite">
          {results.length} {results.length === 1 ? 'item' : 'items'}
          {category !== 'all' && ` in ${menuCategories.find((c) => c.id === category)?.label}`}
          {query && ` matching “${query}”`}
        </p>

        {results.length === 0 ? (
          <div className="mx-auto max-w-md py-20 text-center">
            <p className="hand mb-2">Hmm, nothing here</p>
            <h2 className="font-serif text-3xl">Nothing on the menu matches that.</h2>
            <p className="mt-3 text-muted">Try a different search or clear your filters — there’s a lot of good coffee waiting.</p>
            <Button className="mt-6" onClick={() => setParams({}, { replace: true })}>
              Show the full menu
            </Button>
          </div>
        ) : grouped ? (
          groups.map(([cat, items]) => (
            <section key={cat} aria-labelledby={`cat-${cat}`} className="mt-12 first-of-type:mt-8">
              <div className="mb-6 flex items-baseline justify-between border-b border-line pb-3">
                <h2 id={`cat-${cat}`} className="font-serif text-3xl sm:text-4xl">
                  {categoryLabel(cat)}
                </h2>
                <span className="text-sm text-muted">{items.length} items</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} sizes="(min-width: 1024px) 24vw, 48vw" />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} sizes="(min-width: 1024px) 24vw, 48vw" />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
