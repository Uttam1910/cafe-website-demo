import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '../components/ui/Button'
import { Img } from '../components/ui/Img'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function NotFoundPage() {
  useDocumentMeta('Page not found', 'This page isn’t on today’s menu. Head back home or browse the MORNING THEORY menu.')
  return (
    <section className="container-page grid grid-cols-1 min-h-[70vh] items-center gap-10 py-14 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <p className="font-serif text-8xl leading-none font-light text-oat sm:text-9xl">404</p>
        <p className="hand mt-4">Oops — wrong turn</p>
        <h1 className="mt-2 text-[2.5rem] leading-[1.05] font-light sm:text-6xl">Looks like you took the scenic route.</h1>
        <p className="mt-5 max-w-md text-lg text-muted">This page isn’t on today’s menu.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/" size="lg">Back Home</ButtonLink>
          <ButtonLink to="/menu" variant="outline" size="lg">
            View Menu <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
      <div className="overflow-hidden rounded-3xl lg:col-span-5 lg:col-start-8">
        <Img name="coffee-wood" sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]" />
      </div>
    </section>
  )
}
