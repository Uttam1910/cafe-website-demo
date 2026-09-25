import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useCallback, useState, type KeyboardEvent } from 'react'
import { cafe } from '../../config/cafe'
import { heroSlides } from '../../data/home'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useSwipe } from '../../hooks/useSwipe'
import { pad2 } from '../../utils/format'
import { ButtonLink } from '../ui/Button'
import { Img } from '../ui/Img'

const DURATION = 6500

export function HeroSlider() {
  const reducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [userPaused, setUserPaused] = useState<boolean | null>(null)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  const count = heroSlides.length
  const go = useCallback((i: number) => setIndex((i + count) % count), [count])
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count])
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count])

  // Reduced-motion visitors start paused; an explicit choice always wins.
  const stopped = userPaused ?? reducedMotion
  const paused = stopped || hovered || focused
  const swipe = useSwipe(next, prev)

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    }
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Welcome to MORNING THEORY"
      className="relative isolate h-[92svh] min-h-[580px] touch-pan-y overflow-hidden bg-espresso text-paper select-none sm:h-[100svh] sm:max-h-[940px] sm:min-h-[640px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false)
      }}
      onKeyDown={onKeyDown}
      {...swipe}
    >
      <h1 className="sr-only">
        {cafe.brandName} — specialty coffee, fresh bakes and good days in Bandra West, Mumbai
      </h1>

      {heroSlides.map((slide, i) => {
        const active = i === index
        return (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={!active}
            inert={!active}
            className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${active ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}
          >
            <Img
              name={slide.image}
              sizes="100vw"
              priority={i === 0}
              className={`absolute inset-0 size-full object-cover transition-transform duration-[7000ms] ease-out ${
                active ? 'scale-100' : 'scale-[1.06]'
              }`}
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/20" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

            <div className="container-page relative flex h-full flex-col justify-end pb-32 sm:pb-36 lg:pb-40">
              <div className={`max-w-3xl ${active ? 'animate-rise' : ''}`}>
                <p className="eyebrow mb-5 text-paper/85">{slide.eyebrow}</p>
                <h2 className="text-[3.3rem] leading-[0.95] font-light text-paper sm:text-7xl lg:text-[6.6rem]">
                  {slide.headline}
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-paper/85 sm:text-lg">{slide.body}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink to="/order" variant="light" size="lg">
                    Order Online <ArrowRight className="size-4" aria-hidden />
                  </ButtonLink>
                  <ButtonLink to="/contact#find-us" variant="ghost-light" size="lg">
                    Find Us
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      <p className="pointer-events-none absolute top-28 right-10 z-20 hidden rotate-[-6deg] font-hand text-4xl text-paper/85 xl:block" aria-hidden>
        good coffee,<br />brighter days.
      </p>

      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="container-page flex items-center justify-between gap-4 pb-8 sm:pb-10">
          <ol className="flex items-center gap-3 sm:gap-5" aria-label="Choose slide">
            {heroSlides.map((slide, i) => {
              const active = i === index
              return (
                <li key={slide.id}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Slide ${i + 1}: ${slide.headline}`}
                    aria-current={active ? 'true' : undefined}
                    className={`group flex items-center gap-3 py-2 text-sm font-semibold tabular-nums transition-colors ${
                      active ? 'text-paper' : 'text-paper/55 hover:text-paper'
                    }`}
                  >
                    {pad2(i + 1)}
                    <span className={`relative h-px overflow-hidden bg-paper/30 transition-[width] duration-500 ${active ? 'w-12 sm:w-16' : 'w-5 sm:w-8'}`}>
                      {active && (
                        <span
                          key={`${index}-${stopped}`}
                          className={`absolute inset-0 bg-paper ${stopped ? 'scale-x-100' : 'hero-progress'}`}
                          data-paused={paused}
                          style={{ ['--hero-duration' as string]: `${DURATION}ms` }}
                          onAnimationEnd={next}
                        />
                      )}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setUserPaused(!stopped)}
              aria-label={stopped ? 'Play slideshow' : 'Pause slideshow'}
              className="grid size-11 place-items-center rounded-full border border-paper/35 text-paper transition-colors hover:bg-paper hover:text-espresso"
            >
              {stopped ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
            </button>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="hidden size-11 place-items-center rounded-full border border-paper/35 text-paper transition-colors hover:bg-paper hover:text-espresso sm:grid"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="grid size-11 place-items-center rounded-full border border-paper/35 text-paper transition-colors hover:bg-paper hover:text-espresso"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live={paused ? 'polite' : 'off'}>
        Slide {index + 1} of {count}: {heroSlides[index].headline}
      </p>
    </section>
  )
}
