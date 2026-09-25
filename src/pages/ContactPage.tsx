import { Check, Mail, MessageCircle, Phone } from 'lucide-react'
import { useState } from 'react'
import { LocationSection } from '../components/home/LocationSection'
import { Button } from '../components/ui/Button'
import { DemoNote } from '../components/ui/DemoNote'
import { Field } from '../components/ui/Field'
import { fieldProps } from '../components/ui/fieldProps'
import { PageIntro } from '../components/ui/PageIntro'
import { cafe } from '../config/cafe'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { compact, hasErrors, isEmail, isIndianPhone, type Errors } from '../utils/validation'

type Key = 'name' | 'email' | 'phone' | 'message'
const empty: Record<Key, string> = { name: '', email: '', phone: '', message: '' }

export function ContactPage() {
  useDocumentMeta('Contact', 'Get in touch with MORNING THEORY — address, opening hours, phone and email for our Bandra West café (demo details).')
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState<Errors<Key>>({})
  const [sent, setSent] = useState(false)

  const set = (k: Key, v: string) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const submit = () => {
    const next = compact<Key>({
      name: form.name.trim().length < 2 ? 'Please tell us your name.' : undefined,
      email: !form.email.trim() ? 'Please add your email so we can reply.' : !isEmail(form.email) ? 'That email doesn’t look quite right.' : undefined,
      phone: form.phone.trim() && !isIndianPhone(form.phone) ? 'Please enter a 10-digit Indian mobile number.' : undefined,
      message: form.message.trim().length < 10 ? 'Please write a short message (at least 10 characters).' : undefined,
    })
    setErrors(next)
    if (hasErrors(next)) {
      document.getElementById(`contact-${Object.keys(next)[0]}`)?.focus()
      return
    }
    setSent(true)
  }

  return (
    <>
      <PageIntro accent="Say hello" title="We’d love to hear from you." intro="Questions, feedback, events or just a good coffee recommendation — drop us a note." />
      <div className="container-page grid grid-cols-1 gap-10 pb-8 lg:grid-cols-12 lg:gap-14">
        <div className="rounded-3xl border border-line bg-paper p-5 sm:p-8 lg:col-span-7">
          {sent ? (
            <div role="status" className="py-10 text-center">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-sage-soft text-sage-dark">
                <Check className="size-7" aria-hidden />
              </span>
              <h2 className="mt-5 font-serif text-3xl">Thanks — we’ll get back to you soon.</h2>
              <p className="mt-3 text-muted">(Demo: your message wasn’t sent anywhere.)</p>
              <Button variant="outline" className="mt-7" onClick={() => { setForm(empty); setSent(false) }}>
                Send another message
              </Button>
            </div>
          ) : (
            <form noValidate onSubmit={(e) => { e.preventDefault(); submit() }} aria-labelledby="contact-form-title">
              <h2 id="contact-form-title" className="font-serif text-2xl">Send a message</h2>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id="contact-name" label="Name" error={errors.name} className="sm:col-span-2">
                  <input {...fieldProps('contact-name', errors.name)} value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" className="field-input" />
                </Field>
                <Field id="contact-email" label="Email" error={errors.email}>
                  <input {...fieldProps('contact-email', errors.email)} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" className="field-input" />
                </Field>
                <Field id="contact-phone" label="Phone" optional error={errors.phone}>
                  <input {...fieldProps('contact-phone', errors.phone)} type="tel" inputMode="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" className="field-input" />
                </Field>
                <Field id="contact-message" label="Message" error={errors.message} className="sm:col-span-2">
                  <textarea {...fieldProps('contact-message', errors.message)} rows={5} value={form.message} onChange={(e) => set('message', e.target.value)} className="field-input resize-y" />
                </Field>
              </div>
              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <DemoNote>Demo form — nothing is sent.</DemoNote>
                <Button type="submit" size="lg">Send Message</Button>
              </div>
            </form>
          )}
        </div>
        <aside className="space-y-4 lg:col-span-5" aria-label="Other ways to reach us">
          {[
            { icon: Phone, title: 'Call the café', body: cafe.phone, href: cafe.phoneHref },
            { icon: Mail, title: 'Email', body: cafe.email, href: `mailto:${cafe.email}` },
            { icon: MessageCircle, title: 'Events & private hire', body: 'Book the big table for up to 20 guests on weekday evenings.', href: undefined },
          ].map(({ icon: Icon, title, body, href }) => (
            <div key={title} className="flex gap-4 rounded-3xl bg-sand/60 p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-paper text-terracotta">
                <Icon className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <h2 className="font-serif text-xl">{title}</h2>
                {href ? (
                  <a href={href} className="mt-1 block break-words text-roast hover:underline">{body}</a>
                ) : (
                  <p className="mt-1 text-roast">{body}</p>
                )}
              </div>
            </div>
          ))}
          <DemoNote>{cafe.demoNotice}</DemoNote>
        </aside>
      </div>
      <LocationSection />
    </>
  )
}
