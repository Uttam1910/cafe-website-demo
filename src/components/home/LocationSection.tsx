import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { cafe, fullAddress } from '../../config/cafe'
import { buttonClass } from '../ui/buttonClass'
import { DemoNote } from '../ui/DemoNote'
import { MapIllustration } from './MapIllustration'

export function LocationSection({ headingLevel: Heading = 'h2' }: { headingLevel?: 'h2' | 'h1' }) {
  return (
    <section id="find-us" aria-labelledby="find-us-title" className="scroll-mt-24 py-16 sm:py-24">
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <p className="hand mb-2">Come say hello</p>
          <Heading id="find-us-title" className="text-[2.3rem] leading-[1.02] font-light sm:text-6xl">
            Find Your Way Here
          </Heading>
          <p className="mt-4 max-w-md leading-relaxed text-muted">
            Tucked into a leafy lane off Pali Hill, a short walk from Linking Road. Look for the terracotta door and the plants.
          </p>
          <dl className="mt-8 space-y-5 text-[15px]">
            <div className="flex gap-4">
              <dt><MapPin className="mt-0.5 size-5 text-terracotta" aria-hidden /><span className="sr-only">Address</span></dt>
              <dd>
                {fullAddress}
                <span className="mt-1 block text-[13px] text-muted">Demo address</span>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt><Clock className="mt-0.5 size-5 text-terracotta" aria-hidden /><span className="sr-only">Opening hours</span></dt>
              <dd>
                {cafe.hours.map((h) => (
                  <span key={h.days} className="block">
                    <span className="inline-block w-40 text-muted">{h.days}</span> {h.time}
                  </span>
                ))}
              </dd>
            </div>
            <div className="flex gap-4">
              <dt><Phone className="mt-0.5 size-5 text-terracotta" aria-hidden /><span className="sr-only">Phone</span></dt>
              <dd>
                <a href={cafe.phoneHref} className="hover:underline">{cafe.phone}</a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt><Mail className="mt-0.5 size-5 text-terracotta" aria-hidden /><span className="sr-only">Email</span></dt>
              <dd className="min-w-0 break-words">
                <a href={`mailto:${cafe.email}`} className="hover:underline">{cafe.email}</a>
              </dd>
            </div>
          </dl>
          <a
            href={cafe.directionsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className={`mt-8 ${buttonClass('primary', 'lg')}`}
          >
            Get Directions <ArrowUpRight className="size-4" aria-hidden />
            <span className="sr-only">(opens Google Maps for the Bandra West area in a new tab)</span>
          </a>
          <DemoNote className="mt-5">{cafe.demoNotice}</DemoNote>
        </div>
        <div className="lg:col-span-7">
          <MapIllustration />
        </div>
      </div>
    </section>
  )
}
