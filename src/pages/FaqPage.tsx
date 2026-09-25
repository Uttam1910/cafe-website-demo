import { Plus } from 'lucide-react'
import { ButtonLink } from '../components/ui/Button'
import { PageIntro } from '../components/ui/PageIntro'
import { faqs } from '../data/faqs'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function FaqPage() {
  useDocumentMeta('FAQ', 'Frequently asked questions about MORNING THEORY — reservations, dietary options, working from the café, pickup and delivery.')
  return (
    <>
      <PageIntro accent="Good questions" title="Frequently Asked" intro="The things people ask us most. Anything else, just drop us a line." />
      <div className="container-page grid grid-cols-1 gap-10 pb-16 sm:pb-24 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ul className="divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <li key={f.question}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-xl text-espresso [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 group-open:rotate-45">
                      <Plus className="size-4" aria-hidden />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-6 leading-relaxed text-roast">{f.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
        <aside className="lg:col-span-4">
          <div className="rounded-3xl bg-sand/60 p-7 lg:sticky lg:top-24">
            <h2 className="font-serif text-2xl">Still wondering?</h2>
            <p className="mt-2 text-muted">We’re happy to help with anything else.</p>
            <ButtonLink to="/contact" className="mt-5">Contact us</ButtonLink>
          </div>
        </aside>
      </div>
    </>
  )
}
