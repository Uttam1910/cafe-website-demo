import { ArrowLeft, ChevronRight, Clock } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { ProductCard } from '../components/product/ProductCard'
import { ProductCustomizer } from '../components/product/ProductCustomizer'
import { ButtonLink } from '../components/ui/Button'
import { DietaryBadges, FoodMarker } from '../components/ui/DietaryBadges'
import { Img } from '../components/ui/Img'
import { categoryLabel, dietaryInfo } from '../data/menu'
import { productBySlug, products } from '../data/products'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatINR } from '../utils/format'

export function ProductPage({ from }: { from: 'menu' | 'order' }) {
  const { slug } = useParams()
  const product = productBySlug(slug)
  const base = from === 'order' ? '/order' : '/menu'
  const backLabel = from === 'order' ? 'Order Online' : 'Menu'

  useDocumentMeta(
    product ? product.name : 'Item not found',
    product ? `${product.name} — ${product.description}` : 'This item isn’t on today’s menu at MORNING THEORY.',
  )

  if (!product) {
    return (
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="hand mb-3">Sold out… or never baked</p>
        <h1 className="max-w-xl text-4xl font-light sm:text-5xl">This item isn’t on today’s menu.</h1>
        <p className="mt-4 max-w-md text-muted">It may have been a seasonal special, or the link has a typo. Everything we’re serving today is on the menu.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink to={base}>Back to {backLabel}</ButtonLink>
          <ButtonLink to="/" variant="outline">Back Home</ButtonLink>
        </div>
      </section>
    )
  }

  const related = [
    ...products.filter((p) => p.category === product.category && p.id !== product.id),
    ...products.filter((p) => p.popular && p.category !== product.category),
  ].slice(0, 4)

  const dietaryDetails = product.dietary.map((d) => dietaryInfo[d].label)
  if (product.veganOption && !product.dietary.includes('vegan')) dietaryDetails.push('Can be made vegan with plant milk')

  return (
    <>
      <div className="container-page pt-6 sm:pt-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
            <li>
              <Link to={base} className="inline-flex items-center gap-1 hover:text-espresso">
                <ArrowLeft className="size-3.5 sm:hidden" aria-hidden /> {backLabel}
              </Link>
            </li>
            <li aria-hidden className="hidden sm:block"><ChevronRight className="size-3.5" /></li>
            <li className="hidden sm:block">
              <Link to={`/menu?category=${product.category}`} className="hover:text-espresso">
                {categoryLabel(product.category)}
              </Link>
            </li>
            <li aria-hidden className="hidden sm:block"><ChevronRight className="size-3.5" /></li>
            <li className="hidden text-espresso sm:block" aria-current="page">{product.name}</li>
          </ol>
        </nav>
      </div>

      <article className="container-page grid grid-cols-1 gap-8 pt-6 pb-16 sm:pb-24 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <div className="overflow-hidden rounded-3xl bg-sand lg:sticky lg:top-24">
            <Img
              name={product.image}
              sizes="(min-width: 1024px) 46vw, 100vw"
              priority
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:pt-4">
          {product.note && <p className="hand mb-2">{product.note}</p>}
          <h1 className="text-[2.6rem] leading-[1.02] font-light sm:text-6xl">{product.name}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <p className="font-serif text-3xl text-espresso">{formatINR(product.price)}</p>
            <FoodMarker product={product} />
            <DietaryBadges product={product} size="md" />
            {product.popular && (
              <span className="rounded-full bg-terracotta px-2.5 py-1 text-xs font-semibold text-paper">Popular</span>
            )}
          </div>
          <p className="mt-6 text-lg leading-relaxed text-roast">{product.description}</p>
          <p className="mt-3 leading-relaxed text-muted">{product.story}</p>
          <p className="mt-4 inline-flex items-center gap-2 text-[13px] text-muted">
            <Clock className="size-4" aria-hidden /> Ready in about {Math.max(5, product.prepMinutes)} minutes
          </p>

          <div className="mt-8 rounded-3xl border border-line bg-paper p-5 sm:p-7">
            <ProductCustomizer key={product.id} product={product} />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <section aria-labelledby="ingredients-title">
              <h2 id="ingredients-title" className="eyebrow mb-3 font-sans text-muted">Ingredients</h2>
              <ul className="space-y-1.5 text-[15px] text-roast">
                {product.ingredients.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-caramel" /> {i}
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="dietary-title">
              <h2 id="dietary-title" className="eyebrow mb-3 font-sans text-muted">Dietary</h2>
              <ul className="space-y-1.5 text-[15px] text-roast">
                {dietaryDetails.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">
                Our kitchen handles gluten, dairy and nuts. Please tell us about any allergies.
              </p>
            </section>
          </div>
        </div>
      </article>

      <section aria-labelledby="related-title" className="border-t border-line bg-paper py-16 sm:py-20">
        <div className="container-page">
          <h2 id="related-title" className="font-serif text-3xl sm:text-4xl">You May Also Like</h2>
          <div className="scroll-row -mx-4 mt-8 px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} basePath={base} className="w-[62%] shrink-0 snap-start sm:w-auto" sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 62vw" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
