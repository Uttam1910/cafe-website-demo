import { Expand } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { DemoNote } from '../components/ui/DemoNote'
import { Img } from '../components/ui/Img'
import { Lightbox } from '../components/ui/Lightbox'
import { PageIntro } from '../components/ui/PageIntro'
import { Pills } from '../components/ui/Pills'
import { gallery, galleryCategories } from '../data/gallery'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

type GalleryFilter = (typeof galleryCategories)[number]['id']

export function GalleryPage() {
  useDocumentMeta('Gallery', 'Coffee, food, space and people — a look inside MORNING THEORY, a specialty café concept in Bandra West.')
  const [filter, setFilter] = useState<GalleryFilter>('all')
  const [open, setOpen] = useState<number | null>(null)
  const items = useMemo(() => (filter === 'all' ? gallery : gallery.filter((g) => g.category === filter)), [filter])

  return (
    <>
      <PageIntro accent="Good days, captured" title="Gallery" intro="A look around — the coffee, the plates, the corners people love and the work that happens before the doors open." />
      <div className="container-page pb-16 sm:pb-24">
        <Pills label="Filter photos" options={galleryCategories} value={filter} onChange={setFilter} />
        <ul className="mt-8 columns-2 gap-3 sm:gap-4 lg:columns-3" aria-live="polite">
          {items.map((item, i) => (
            <li key={item.id} className="mb-3 break-inside-avoid sm:mb-4">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden rounded-2xl text-left"
                aria-label={`View larger: ${item.caption}`}
              >
                <Img
                  name={item.image}
                  sizes="(min-width: 1024px) 32vw, 48vw"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${item.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
                />
                <span aria-hidden className="absolute inset-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/55 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="font-hand text-xl leading-tight text-paper">{item.caption}</span>
                  <Expand className="size-4 shrink-0 text-paper" />
                </span>
              </button>
            </li>
          ))}
        </ul>
        <DemoNote className="mt-6">Photography licensed from Unsplash for this demo — see <Link to="/credits" className="underline">Credits</Link>.</DemoNote>
      </div>
      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  )
}
