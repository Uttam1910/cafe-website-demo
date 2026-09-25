import { NewsletterForm } from '../ui/NewsletterForm'

export function NewsletterSection() {
  return (
    <section aria-labelledby="newsletter-title" className="container-page pb-16 sm:pb-24">
      <div className="grid grid-cols-1 gap-8 rounded-3xl bg-sage-soft px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="hand mb-2 text-sage-dark!">The newsletter</p>
          <h2 id="newsletter-title" className="text-4xl leading-[1.05] font-light sm:text-5xl">
            Good things, occasionally.
          </h2>
          <p className="mt-3 max-w-md text-muted">New seasonal drinks, bake days and the odd event. No spam, ever.</p>
        </div>
        <NewsletterForm />
      </div>
    </section>
  )
}
