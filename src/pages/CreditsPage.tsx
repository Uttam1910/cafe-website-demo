import { ArrowUpRight } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { imageWidths, images, type ImageName } from '../data/images'
import { imageSrc } from '../utils/images'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const entries = Object.entries(images) as [ImageName, (typeof images)[ImageName]][]

export function CreditsPage() {
  useDocumentMeta('Credits', 'Photography, font and icon credits for the MORNING THEORY website demo.')
  return (
    <>
      <PageIntro accent="Thank you" title="Credits" intro="This demo uses photography from talented Unsplash contributors, open-source fonts and icons." />
      <div className="container-page pb-16 sm:pb-24">
        <section aria-labelledby="type-credits" className="grid grid-cols-1 gap-4 rounded-3xl border border-line bg-paper p-6 sm:grid-cols-3 sm:p-8">
          <h2 id="type-credits" className="sr-only">Fonts and icons</h2>
          <p><span className="eyebrow block text-muted">Display type</span><span className="mt-1 block font-serif text-xl">Fraunces</span><span className="text-sm text-muted">SIL Open Font License</span></p>
          <p><span className="eyebrow block text-muted">Text type</span><span className="mt-1 block text-xl font-semibold">DM Sans · Caveat</span><span className="text-sm text-muted">SIL Open Font License</span></p>
          <p><span className="eyebrow block text-muted">Icons</span><span className="mt-1 block text-xl font-semibold">Lucide</span><span className="text-sm text-muted">ISC License</span></p>
        </section>

        <section aria-labelledby="photo-credits" className="mt-12">
          <h2 id="photo-credits" className="font-serif text-3xl">Photography</h2>
          <p className="mt-2 max-w-2xl text-muted">
            All {entries.length} photographs are from Unsplash, used under the{' '}
            <a href="https://unsplash.com/license" target="_blank" rel="noreferrer noopener" className="underline">Unsplash License</a>. No Unsplash+ images are used.
            Images were resized and converted to WebP. Photographers and places shown are not affiliated with this fictional café.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map(([name, img]) => (
              <li key={name} className="flex items-center gap-4 rounded-2xl border border-line bg-paper p-3">
                <img src={imageSrc(name, imageWidths[img.kind][0])} alt="" loading="lazy" width={64} height={64} className="size-16 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 text-sm">
                  <p className="truncate font-semibold text-espresso">{img.alt}</p>
                  <p className="text-muted">
                    Photo by{' '}
                    <a href={img.authorUrl} target="_blank" rel="noreferrer noopener" className="underline hover:text-espresso">{img.author}</a>
                  </p>
                  <a href={img.sourceUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-[12.5px] text-muted hover:text-espresso">
                    View on Unsplash <ArrowUpRight className="size-3" aria-hidden />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
