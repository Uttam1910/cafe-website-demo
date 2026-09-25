import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useModal } from '../../hooks/useModal'
import { useSwipe } from '../../hooks/useSwipe'
import type { GalleryItem } from '../../types'
import { Img } from './Img'

interface LightboxProps {
  items: GalleryItem[]
  index: number | null
  onClose: () => void
  onIndex: (index: number) => void
}

export function Lightbox({ items, index, onClose, onIndex }: LightboxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const open = index !== null
  useModal(open, onClose, ref)

  const count = items.length
  const prev = () => index !== null && onIndex((index - 1 + count) % count)
  const next = () => index !== null && onIndex((index + 1) % count)
  const swipe = useSwipe(next, prev)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onIndex(((index ?? 0) + 1) % count)
      if (e.key === 'ArrowLeft') onIndex(((index ?? 0) - 1 + count) % count)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, index, count, onIndex])

  if (index === null) return null
  const item = items[index]

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${count}: ${item.caption}`}
      className="fixed inset-0 z-[60] flex animate-fade-in flex-col bg-charcoal/96 text-paper"
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <p className="text-sm text-paper/70 tabular-nums">
          {index + 1} / {count}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="grid size-11 place-items-center rounded-full hover:bg-white/10"
        >
          <X className="size-6" aria-hidden />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-2 sm:px-20" {...swipe}>
        <figure key={item.id} className="flex max-h-full animate-fade-in flex-col items-center">
          <Img
            name={item.image}
            sizes="100vw"
            className="max-h-[calc(100dvh-10rem)] w-auto max-w-full rounded-lg object-contain"
          />
          <figcaption className="mt-4 px-4 text-center font-hand text-2xl text-sand">{item.caption}</figcaption>
        </figure>
        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          className="absolute top-1/2 left-2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:left-5 sm:grid"
        >
          <ChevronLeft className="size-6" aria-hidden />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className="absolute top-1/2 right-2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:right-5 sm:grid"
        >
          <ChevronRight className="size-6" aria-hidden />
        </button>
      </div>
      <div className="flex justify-center gap-3 pt-2 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:hidden">
        <button type="button" onClick={prev} aria-label="Previous photo" className="grid size-12 place-items-center rounded-full bg-white/10">
          <ChevronLeft className="size-6" aria-hidden />
        </button>
        <button type="button" onClick={next} aria-label="Next photo" className="grid size-12 place-items-center rounded-full bg-white/10">
          <ChevronRight className="size-6" aria-hidden />
        </button>
      </div>
    </div>
  )
}
