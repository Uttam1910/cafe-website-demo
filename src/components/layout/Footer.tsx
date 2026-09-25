import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router'
import { cafe, fullAddress } from '../../config/cafe'
import { useToast } from '../../context/toast'
import { Logo } from '../ui/Logo'
import { NewsletterForm } from '../ui/NewsletterForm'
import { SocialIcon } from '../ui/SocialIcon'
import { footerNav, legalNav } from './nav'

export function Footer() {
  const { showToast } = useToast()
  return (
    <footer className="bg-charcoal text-paper/80">
      <div className="container-page grid grid-cols-1 gap-12 py-14 sm:py-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/65">
            A neighbourhood café for slow mornings, good coffee and fresh bakes. {cafe.tagline}
          </p>
          <div className="mt-6 max-w-sm">
            <p className="mb-3 font-serif text-xl text-paper">Good things, occasionally.</p>
            <NewsletterForm tone="light" compact />
          </div>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-6">
          <h2 className="eyebrow mb-4 font-sans text-paper/50">Explore</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm lg:grid-cols-1">
            {footerNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-paper hover:underline hover:underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="eyebrow mb-4 font-sans text-paper/50">Visit</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-sand" aria-hidden />
              <span>{fullAddress}</span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-sand" aria-hidden />
              <span>
                {cafe.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-sand" aria-hidden />
              <a href={cafe.phoneHref} className="hover:text-paper">
                {cafe.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-sand" aria-hidden />
              <a href={`mailto:${cafe.email}`} className="break-all hover:text-paper">
                {cafe.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="eyebrow mb-4 font-sans text-paper/50">Follow</h2>
          <ul className="flex gap-2">
            {cafe.socialLinks.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => showToast({ message: `${s.label} is a placeholder in this demo — connect the café’s own profile here.` })}
                  className="grid size-11 place-items-center rounded-full border border-white/15 text-paper transition-colors hover:bg-paper hover:text-espresso"
                  aria-label={`${s.label} (demo placeholder)`}
                >
                  <SocialIcon id={s.id} />
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">{cafe.instagram}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-paper/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {cafe.brandName}. {cafe.demoNotice}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
