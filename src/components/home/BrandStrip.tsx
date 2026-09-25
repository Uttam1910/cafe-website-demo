import { Coffee, Croissant, Sofa, Sprout } from 'lucide-react'
import { brandStrip } from '../../data/home'

const icons = { coffee: Coffee, croissant: Croissant, sprout: Sprout, sofa: Sofa }

export function BrandStrip() {
  return (
    <section aria-label="What we’re about" className="border-b border-line bg-paper">
      <ul className="container-page grid grid-cols-2 lg:grid-cols-4">
        {brandStrip.map((item, i) => {
          const Icon = icons[item.icon]
          return (
            <li
              key={item.title}
              className={`flex items-center gap-3 py-6 sm:gap-4 sm:py-8 lg:justify-center ${
                i % 2 === 0 ? 'pr-3' : 'pl-4 sm:pl-6'
              } ${i > 0 ? 'lg:border-l lg:border-line lg:pl-6' : ''} ${i % 2 === 1 ? 'border-l border-line' : ''} ${
                i < 2 ? 'border-b border-line lg:border-b-0' : ''
              }`}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand/70 text-roast">
                <Icon className="size-5" strokeWidth={1.6} aria-hidden />
              </span>
              <span>
                <span className="eyebrow block text-[10.5px] text-espresso sm:text-[11px]">{item.title}</span>
                <span className="mt-1 block text-[13px] text-muted">{item.body}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
