import { Camera } from 'lucide-react'
import { Link } from 'react-router'
import { cafe } from '../../config/cafe'
import { instagramFeed } from '../../data/gallery'
import { DemoNote } from '../ui/DemoNote'
import { Img } from '../ui/Img'
import { SectionHeading } from '../ui/SectionHeading'

export function InstagramSection() {
  return (
    <section aria-labelledby="ig-title" className="pb-16 sm:pb-24">
      <div className="container-page">
        <SectionHeading
          id="ig-title"
          accent={cafe.instagram}
          title="Follow the good days"
          intro="Latte art, first batches and the people who make the mornings."
          action={
            <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-espresso underline-offset-4 hover:underline">
              <Camera className="size-4" aria-hidden /> See the gallery
            </Link>
          }
        />
        <ul className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {instagramFeed.map((name, i) => (
            <li key={name} className={i >= 6 ? 'hidden sm:block' : ''}>
              <Link to="/gallery" className="group relative block overflow-hidden rounded-xl" aria-label="Open gallery">
                <Img
                  name={name}
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span aria-hidden className="absolute inset-0 bg-espresso/0 transition-colors group-hover:bg-espresso/20" />
              </Link>
            </li>
          ))}
        </ul>
        <DemoNote className="mt-5">Demo feed — {cafe.instagram} is a placeholder handle and these posts are illustrative.</DemoNote>
      </div>
    </section>
  )
}
