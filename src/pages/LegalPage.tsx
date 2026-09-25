import { Link } from 'react-router'
import { DemoNote } from '../components/ui/DemoNote'
import { PageIntro } from '../components/ui/PageIntro'
import { legalPages, type LegalPageData } from '../data/legal'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function LegalPage({ slug }: { slug: LegalPageData['slug'] }) {
  const page = legalPages.find((p) => p.slug === slug) ?? legalPages[0]
  useDocumentMeta(page.metaTitle, page.summary)
  return (
    <>
      <PageIntro accent="Sample policy" title={page.title} intro={page.summary} />
      <div className="container-page grid grid-cols-1 gap-10 pb-16 sm:pb-24 lg:grid-cols-12">
        <nav aria-label="Policies" className="lg:col-span-3">
          <ul className="flex flex-wrap gap-2 lg:sticky lg:top-24 lg:flex-col lg:gap-1">
            {legalPages.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/${p.slug}`}
                  aria-current={p.slug === slug ? 'page' : undefined}
                  className={`block rounded-full px-4 py-2 text-sm font-medium lg:rounded-xl ${
                    p.slug === slug ? 'bg-espresso text-paper' : 'bg-paper text-roast hover:bg-sand'
                  }`}
                >
                  {p.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/faq" className="block rounded-full bg-paper px-4 py-2 text-sm font-medium text-roast hover:bg-sand lg:rounded-xl">FAQ</Link>
            </li>
          </ul>
        </nav>
        <div className="max-w-2xl lg:col-span-8 lg:col-start-5">
          <div className="rounded-2xl border border-caramel/40 bg-sand/50 p-5">
            <DemoNote>
              Demo content: this is a sample policy for a fictional café, written to show how the page could look. It is not legal advice.
            </DemoNote>
          </div>
          {page.sections.map((s) => (
            <section key={s.heading} className="prose-legal mt-10">
              <h2 className="font-serif text-2xl">{s.heading}</h2>
              {s.body.map((p) => <p key={p}>{p}</p>)}
            </section>
          ))}
          <p className="mt-12 text-sm text-muted">Last updated: sample document.</p>
        </div>
      </div>
    </>
  )
}
