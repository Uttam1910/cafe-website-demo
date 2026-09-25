import { CalendarCheck, Clock, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button, ButtonLink } from '../components/ui/Button'
import { DemoNote } from '../components/ui/DemoNote'
import { Field } from '../components/ui/Field'
import { fieldProps } from '../components/ui/fieldProps'
import { Img } from '../components/ui/Img'
import { cafe } from '../config/cafe'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatDate, formatTime } from '../utils/format'
import { demoReservationNumber } from '../utils/ids'
import { addDaysISO, reservationSlots, todayISO } from '../utils/slots'
import { compact, hasErrors, isEmail, isIndianPhone, type Errors } from '../utils/validation'

type Key = 'name' | 'phone' | 'email' | 'date' | 'time' | 'guests' | 'occasion' | 'request'
type FormState = Record<Key, string>

const occasions = ['Just because', 'Catching up', 'Birthday', 'Date', 'Work meeting', 'Celebration']

const empty: FormState = { name: '', phone: '', email: '', date: '', time: '', guests: '2', occasion: 'Just because', request: '' }

const validate = (f: FormState): Errors<Key> =>
  compact<Key>({
    name: f.name.trim().length < 2 ? 'Please tell us your name.' : undefined,
    phone: !f.phone.trim() ? 'Please add a phone number.' : !isIndianPhone(f.phone) ? 'Please enter a 10-digit Indian mobile number.' : undefined,
    email: !f.email.trim() ? 'Please add an email address.' : !isEmail(f.email) ? 'That email doesn’t look quite right.' : undefined,
    date: !f.date ? 'Please choose a date.' : f.date < todayISO() ? 'Please choose today or a future date.' : undefined,
    time: !f.time ? 'Please choose a time.' : undefined,
  })

export function ReservationsPage() {
  useDocumentMeta('Reservations', 'Request a table at MORNING THEORY in Bandra West. Frontend demo — no real reservation is made.')
  const [form, setForm] = useState<FormState>(empty)
  const [errors, setErrors] = useState<Errors<Key>>({})
  const [confirmed, setConfirmed] = useState<{ number: string; form: FormState } | null>(null)

  const slots = useMemo(() => (form.date ? reservationSlots(form.date) : []), [form.date])

  const set = (k: Key, v: string) => {
    setForm((f) => ({ ...f, [k]: v, ...(k === 'date' ? { time: '' } : {}) }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const submit = () => {
    const next = validate(form)
    setErrors(next)
    if (hasErrors(next)) {
      const first = (Object.keys(next) as Key[])[0]
      document.getElementById(first === 'time' ? 'res-time-group' : `res-${first}`)?.focus()
      return
    }
    setConfirmed({ number: demoReservationNumber(), form })
    window.scrollTo({ top: 0 })
  }

  if (confirmed) {
    const f = confirmed.form
    return (
      <section className="container-page py-14 sm:py-20" aria-labelledby="res-confirmed">
        <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-paper p-7 text-center sm:p-12">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-sage-soft text-sage-dark">
            <CalendarCheck className="size-7" aria-hidden />
          </span>
          <p className="hand mt-5">See you soon</p>
          <h1 id="res-confirmed" className="mt-1 text-4xl font-light sm:text-5xl">Table request received</h1>
          <p className="mt-4 text-muted">
            Thanks, {f.name.split(' ')[0]}. In a live version, we’d confirm by SMS within the hour.
          </p>
          <dl className="mt-8 grid grid-cols-1 gap-4 rounded-2xl bg-cream p-5 text-left sm:grid-cols-2">
            <div><dt className="eyebrow text-muted">Demo reference</dt><dd className="mt-1 font-serif text-2xl">{confirmed.number}</dd></div>
            <div><dt className="eyebrow text-muted">When</dt><dd className="mt-1">{formatDate(f.date)}, {formatTime(Number(f.time))}</dd></div>
            <div><dt className="eyebrow text-muted">Guests</dt><dd className="mt-1">{f.guests} {f.guests === '1' ? 'guest' : 'guests'}</dd></div>
            <div><dt className="eyebrow text-muted">Occasion</dt><dd className="mt-1">{f.occasion}</dd></div>
          </dl>
          <DemoNote className="mt-6 justify-center">This is a demo — no reservation has been made and no message will be sent.</DemoNote>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/">Back to Home</ButtonLink>
            <Button variant="outline" onClick={() => { setForm(empty); setConfirmed(null) }}>Make another request</Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="container-page grid grid-cols-1 gap-10 pt-10 pb-16 sm:pt-16 sm:pb-24 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-5">
        <p className="hand mb-3">Reservations</p>
        <h1 className="text-[2.7rem] leading-none font-light sm:text-6xl">Stay for a while.</h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
          Request a table for up to 8. Most of the café is kept for walk-ins, so don’t worry if you’re spontaneous.
        </p>
        <div className="mt-8 hidden overflow-hidden rounded-3xl lg:block">
          <Img name="interior-soft" sizes="40vw" className="aspect-[4/5] w-full object-cover" />
        </div>
        <ul className="mt-8 space-y-3 text-sm text-roast">
          <li className="flex gap-3"><Clock className="size-4 shrink-0 text-terracotta" aria-hidden /> Tables are held for 15 minutes.</li>
          <li className="flex gap-3"><Users className="size-4 shrink-0 text-terracotta" aria-hidden /> Groups of 9 or more — call us on {cafe.phone}.</li>
        </ul>
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className="rounded-3xl border border-line bg-paper p-5 sm:p-8 lg:col-span-7"
        aria-labelledby="res-form-title"
      >
        <h2 id="res-form-title" className="font-serif text-2xl">Your table</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Field id="res-date" label="Date" error={errors.date}>
            <input {...fieldProps('res-date', errors.date)} type="date" min={todayISO()} max={addDaysISO(30)} value={form.date} onChange={(e) => set('date', e.target.value)} className="field-input" />
          </Field>
          <Field id="res-guests" label="Guests">
            <select {...fieldProps('res-guests')} value={form.guests} onChange={(e) => set('guests', e.target.value)} className="field-input">
              {Array.from({ length: 8 }, (_, i) => String(i + 1)).map((n) => (
                <option key={n} value={n}>{n} {n === '1' ? 'guest' : 'guests'}</option>
              ))}
            </select>
          </Field>
          <Field id="res-occasion" label="Occasion">
            <select {...fieldProps('res-occasion')} value={form.occasion} onChange={(e) => set('occasion', e.target.value)} className="field-input">
              {occasions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
        </div>

        <fieldset className="mt-6">
          <legend className="mb-2 text-[13px] font-semibold text-espresso">Time</legend>
          {!form.date ? (
            <p className="rounded-xl border border-dashed border-line px-4 py-5 text-center text-sm text-muted">Choose a date to see available times.</p>
          ) : (
            <div
              id="res-time-group"
              tabIndex={-1}
              role="radiogroup"
              aria-label="Available times"
              aria-describedby={errors.time ? 'res-time-msg' : 'res-time-legend'}
              className="grid grid-cols-3 gap-2 outline-none sm:grid-cols-5"
            >
              {slots.map((s) => {
                const active = form.time === s.value
                return (
                  <button
                    key={s.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    disabled={s.disabled}
                    onClick={() => set('time', s.value)}
                    className={`h-11 rounded-xl border text-[13px] font-semibold tabular-nums transition-colors ${
                      active
                        ? 'border-espresso bg-espresso text-paper'
                        : s.disabled
                          ? 'cursor-not-allowed border-line bg-cream text-muted/60 line-through'
                          : 'border-line bg-paper text-roast hover:border-espresso/50'
                    }`}
                    title={s.reason === 'full' ? 'Fully booked' : s.reason === 'past' ? 'No longer available' : undefined}
                  >
                    {s.label}
                    {s.disabled && <span className="sr-only"> — {s.reason === 'full' ? 'fully booked' : 'unavailable'}</span>}
                  </button>
                )
              })}
            </div>
          )}
          {form.date && (
            <p id="res-time-legend" className="mt-2 text-[12.5px] text-muted">Struck-through times are fully booked or have passed.</p>
          )}
          {errors.time && <p id="res-time-msg" className="mt-2 text-[13px] text-terracotta-dark">{errors.time}</p>}
          {form.date && slots.every((s) => s.disabled) && (
            <p className="mt-2 text-[13px] text-terracotta-dark">No tables left for this date — please try another day.</p>
          )}
        </fieldset>

        <h2 className="mt-10 font-serif text-2xl">Your details</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id="res-name" label="Name" error={errors.name} className="sm:col-span-2">
            <input {...fieldProps('res-name', errors.name)} value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" className="field-input" />
          </Field>
          <Field id="res-phone" label="Phone" error={errors.phone}>
            <input {...fieldProps('res-phone', errors.phone)} type="tel" inputMode="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" placeholder="98765 43210" className="field-input" />
          </Field>
          <Field id="res-email" label="Email" error={errors.email}>
            <input {...fieldProps('res-email', errors.email)} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" className="field-input" />
          </Field>
          <Field id="res-request" label="Special request" optional className="sm:col-span-2">
            <textarea {...fieldProps('res-request')} rows={3} value={form.request} onChange={(e) => set('request', e.target.value)} placeholder="Window seat, high chair, birthday candle…" className="field-input resize-y" />
          </Field>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <DemoNote>Demo form — no reservation is made.</DemoNote>
          <Button type="submit" variant="accent" size="lg">Request Table</Button>
        </div>
      </form>
    </div>
  )
}
