import { ArrowLeft, ArrowRight, Check, CircleCheck, Lock, ShoppingBag } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { CartLineItem } from '../components/order/CartLineItem'
import { OrderSummary } from '../components/order/OrderSummary'
import { OrderTypePanel } from '../components/order/OrderTypePanel'
import { Button, ButtonLink } from '../components/ui/Button'
import { Field } from '../components/ui/Field'
import { fieldProps } from '../components/ui/fieldProps'
import { Img } from '../components/ui/Img'
import { cafe } from '../config/cafe'
import { useCart } from '../context/cart'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import type { OrderDetails } from '../types'
import { formatINR } from '../utils/format'
import { demoOrderNumber } from '../utils/ids'
import { validateOrderDetails, type OrderTypeField } from '../utils/orderDetails'
import { selectionSummary, type CartTotals, type PricedLine } from '../utils/pricing'
import { pickupLabel } from '../utils/slots'
import { compact, hasErrors, isEmail, isIndianPhone, type Errors } from '../utils/validation'

const steps = ['Order', 'Details', 'Payment', 'Confirmation'] as const

type ContactField = 'name' | 'phone' | 'email'
type PaymentMethod = 'pay-later' | 'upi' | 'card'

interface Confirmation {
  number: string
  lines: PricedLine[]
  totals: CartTotals
  details: OrderDetails
  name: string
  payment: PaymentMethod
}

const paymentOptions: { id: PaymentMethod; label: string; detail: string }[] = [
  { id: 'pay-later', label: 'Pay at the counter', detail: 'Pay when you collect, or to the rider on delivery.' },
  { id: 'upi', label: 'UPI', detail: 'Demo only — no UPI request will be sent.' },
  { id: 'card', label: 'Card', detail: 'Demo only — card entry is disabled.' },
]

const describeFulfilment = (details: OrderDetails) => {
  if (details.type === 'pickup') {
    const location = cafe.locations.find((l) => l.id === details.locationId)
    return {
      heading: 'Pickup',
      lines: [`${location?.name ?? ''} (demo location)`, pickupLabel(details.pickupTime)],
      estimate: cafe.prepEstimate.pickup,
    }
  }
  return {
    heading: 'Delivery',
    lines: [details.address, details.area, details.instructions].filter(Boolean),
    estimate: cafe.prepEstimate.delivery,
  }
}

function StepHeading({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
  }, [])
  return (
    <h2 ref={ref} tabIndex={-1} className="font-serif text-3xl outline-none sm:text-4xl">
      {children}
    </h2>
  )
}

export function CheckoutPage() {
  useDocumentMeta('Checkout', 'Demo checkout for MORNING THEORY. No real payment is processed.')
  const { lines, totals, details, clear } = useCart()
  const [step, setStep] = useState(0)
  const [orderErrors, setOrderErrors] = useState<Errors<OrderTypeField>>({})
  const [contact, setContact] = useState({ name: '', phone: '', email: '', notes: '' })
  const [contactErrors, setContactErrors] = useState<Errors<ContactField>>({})
  const [payment, setPayment] = useState<PaymentMethod>('pay-later')
  const [ack, setAck] = useState(false)
  const [ackError, setAckError] = useState('')
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null)
  const topRef = useRef<HTMLDivElement>(null)

  const goTo = (next: number) => {
    setStep(next)
    topRef.current?.scrollIntoView({ block: 'start' })
  }

  if (lines.length === 0 && !confirmation) {
    return (
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="mb-5 grid size-20 place-items-center rounded-full bg-sand text-roast">
          <ShoppingBag className="size-8" aria-hidden />
        </span>
        <h1 className="text-4xl font-light sm:text-5xl">Your bag is empty.</h1>
        <p className="mt-3 max-w-sm text-muted">Add a few things from the menu, then come back to check out.</p>
        <ButtonLink to="/order" className="mt-7">
          Start an order <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      </section>
    )
  }

  const submitOrderStep = () => {
    const errors = validateOrderDetails(details)
    setOrderErrors(errors)
    if (!hasErrors(errors)) goTo(1)
  }

  const submitDetails = () => {
    const errors = compact<ContactField>({
      name: contact.name.trim().length < 2 ? 'Please tell us your name.' : undefined,
      phone: !contact.phone.trim()
        ? 'We need a phone number in case of questions.'
        : !isIndianPhone(contact.phone)
          ? 'Please enter a 10-digit Indian mobile number.'
          : undefined,
      email: contact.email.trim() && !isEmail(contact.email) ? 'That email doesn’t look quite right.' : undefined,
    })
    setContactErrors(errors)
    if (!hasErrors(errors)) goTo(2)
    else document.getElementById(`checkout-${Object.keys(errors)[0]}`)?.focus()
  }

  const placeOrder = () => {
    if (!ack) {
      setAckError('Please confirm you understand this is a demo order.')
      document.getElementById('checkout-ack')?.focus()
      return
    }
    setConfirmation({ number: demoOrderNumber(), lines, totals, details, name: contact.name.trim(), payment })
    clear()
    goTo(3)
  }

  const view = confirmation ?? { lines, totals, details }
  const fulfilment = describeFulfilment(view.details)
  const setField = (k: keyof typeof contact, v: string) => {
    setContact((c) => ({ ...c, [k]: v }))
    if (k in contactErrors) setContactErrors((e) => ({ ...e, [k]: undefined }))
  }

  return (
    <div ref={topRef} className="scroll-mt-20">
      <header className="container-page pt-10 pb-6 sm:pt-14">
        <p className="hand mb-2">Almost there</p>
        <h1 className="text-[2.6rem] leading-none font-light sm:text-6xl">Checkout</h1>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-sand px-3 py-1.5 text-[13px] font-semibold text-roast">
          <Lock className="size-3.5" aria-hidden /> Demo Checkout — nothing is charged or sent
        </p>
      </header>

      <nav aria-label="Checkout progress" className="container-page">
        <ol className="grid grid-cols-4 gap-2 border-y border-line py-4">
          {steps.map((label, i) => {
            const done = i < step
            const current = i === step
            const canJump = done && !confirmation
            const content = (
              <>
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold tabular-nums transition-colors ${
                    current ? 'bg-espresso text-paper' : done ? 'bg-sage-dark text-paper' : 'border border-line bg-paper text-muted'
                  }`}
                >
                  {done ? <Check className="size-4" aria-hidden /> : String(i + 1).padStart(2, '0')}
                </span>
                <span className={`text-[12px] font-semibold sm:text-sm ${current ? 'text-espresso' : 'text-muted'}`}>{label}</span>
              </>
            )
            return (
              <li key={label} aria-current={current ? 'step' : undefined}>
                {canJump ? (
                  <button type="button" onClick={() => goTo(i)} className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                    {content}
                    <span className="sr-only">(completed — go back to this step)</span>
                  </button>
                ) : (
                  <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">{content}</div>
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="container-page grid grid-cols-1 gap-10 py-10 pb-16 sm:pb-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {step === 0 && (
            <section aria-label="Order">
              <StepHeading>01 · Your order</StepHeading>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {lines.map((l) => (
                  <CartLineItem key={l.key} line={l} />
                ))}
              </ul>
              <h3 className="mt-10 mb-4 font-serif text-2xl">Pickup or delivery?</h3>
              <OrderTypePanel errors={orderErrors} />
              <div className="mt-8 flex justify-end">
                <Button size="lg" onClick={submitOrderStep}>
                  Continue to details <ArrowRight className="size-4" aria-hidden />
                </Button>
              </div>
            </section>
          )}

          {step === 1 && (
            <form
              noValidate
              aria-label="Your details"
              onSubmit={(e) => {
                e.preventDefault()
                submitDetails()
              }}
            >
              <StepHeading>02 · Your details</StepHeading>
              <p className="mt-2 text-muted">So we know whose flat white it is.</p>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id="checkout-name" label="Full name" error={contactErrors.name} className="sm:col-span-2">
                  <input {...fieldProps('checkout-name', contactErrors.name)} value={contact.name} onChange={(e) => setField('name', e.target.value)} autoComplete="name" className="field-input" />
                </Field>
                <Field id="checkout-phone" label="Mobile number" error={contactErrors.phone} hint="10-digit Indian mobile">
                  <input {...fieldProps('checkout-phone', contactErrors.phone, 'hint')} value={contact.phone} onChange={(e) => setField('phone', e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" className="field-input" />
                </Field>
                <Field id="checkout-email" label="Email" optional error={contactErrors.email} hint="For your demo receipt">
                  <input {...fieldProps('checkout-email', contactErrors.email, 'hint')} value={contact.email} onChange={(e) => setField('email', e.target.value)} type="email" autoComplete="email" className="field-input" />
                </Field>
                <Field id="checkout-notes" label="Notes for the kitchen" optional className="sm:col-span-2">
                  <textarea {...fieldProps('checkout-notes')} value={contact.notes} onChange={(e) => setField('notes', e.target.value)} rows={3} placeholder="Allergies, extra hot, no sugar…" className="field-input resize-y" />
                </Field>
              </div>
              <div className="mt-8 flex flex-col-reverse justify-between gap-3 sm:flex-row">
                <Button variant="outline" size="lg" onClick={() => goTo(0)}>
                  <ArrowLeft className="size-4" aria-hidden /> Back
                </Button>
                <Button type="submit" size="lg">
                  Continue to payment <ArrowRight className="size-4" aria-hidden />
                </Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <section aria-label="Payment">
              <StepHeading>03 · Payment</StepHeading>
              <div className="mt-5 rounded-2xl border border-caramel/40 bg-sand/60 p-5">
                <p className="eyebrow text-terracotta-dark">Demo Checkout</p>
                <p className="mt-2 text-[15px] leading-relaxed text-roast">
                  This is a frontend demo. No payment is taken, no card or UPI details are collected, and no order is sent to a café.
                </p>
              </div>
              <fieldset className="mt-6">
                <legend className="eyebrow mb-3 text-muted">Payment method</legend>
                <div className="space-y-3">
                  {paymentOptions.map((o) => (
                    <label
                      key={o.id}
                      className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terracotta ${
                        payment === o.id ? 'border-espresso bg-paper' : 'border-line bg-paper/60 hover:border-oat'
                      }`}
                    >
                      <input type="radio" name="payment" value={o.id} checked={payment === o.id} onChange={() => setPayment(o.id)} className="sr-only" />
                      <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2 ${payment === o.id ? 'border-espresso' : 'border-oat'}`} aria-hidden>
                        {payment === o.id && <span className="size-2.5 rounded-full bg-espresso" />}
                      </span>
                      <span>
                        <span className="block font-semibold text-espresso">{o.label}</span>
                        <span className="block text-[13px] text-muted">{o.detail}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {payment === 'card' && (
                <div className="mt-4 rounded-2xl border border-dashed border-oat p-5 text-sm text-muted" role="note">
                  <p className="font-semibold text-espresso">Card fields are intentionally disabled.</p>
                  <p className="mt-1">A live version would use a secure, PCI-compliant payment provider here. Nothing can be typed in this demo.</p>
                  <div className="mt-4 grid grid-cols-2 gap-3" aria-hidden>
                    <span className="col-span-2 h-11 rounded-xl bg-sand/70" />
                    <span className="h-11 rounded-xl bg-sand/70" />
                    <span className="h-11 rounded-xl bg-sand/70" />
                  </div>
                </div>
              )}
              <div className="mt-6">
                <label className="flex cursor-pointer items-start gap-3 text-[15px] text-roast">
                  <input
                    id="checkout-ack"
                    type="checkbox"
                    checked={ack}
                    onChange={(e) => {
                      setAck(e.target.checked)
                      setAckError('')
                    }}
                    aria-invalid={ackError ? true : undefined}
                    aria-describedby={ackError ? 'checkout-ack-msg' : undefined}
                    className="mt-1 size-4 shrink-0 accent-espresso"
                  />
                  I understand this is a demo order and nothing will be charged or prepared.
                </label>
                {ackError && (
                  <p id="checkout-ack-msg" className="mt-2 text-[13px] text-terracotta-dark">
                    {ackError}
                  </p>
                )}
              </div>
              <div className="mt-8 flex flex-col-reverse justify-between gap-3 sm:flex-row">
                <Button variant="outline" size="lg" onClick={() => goTo(1)}>
                  <ArrowLeft className="size-4" aria-hidden /> Back
                </Button>
                <Button variant="accent" size="lg" onClick={placeOrder}>
                  Place demo order · {formatINR(totals.total)}
                </Button>
              </div>
            </section>
          )}

          {step === 3 && confirmation && (
            <section aria-label="Confirmation">
              <div className="rounded-3xl bg-sage-soft p-6 sm:p-8">
                <CircleCheck className="size-10 text-sage-dark" strokeWidth={1.5} aria-hidden />
                <StepHeading>Order received!</StepHeading>
                <p className="mt-3 text-lg text-roast">
                  Thanks{confirmation.name ? `, ${confirmation.name.split(' ')[0]}` : ''}. Your {cafe.brandName} order is being prepared.
                </p>
                <p className="mt-1 text-sm text-muted">(Demo — no order was actually sent.)</p>
                <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <dt className="eyebrow text-muted">Demo order no.</dt>
                    <dd className="mt-1 font-serif text-2xl text-espresso">{confirmation.number}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-muted">Estimated time</dt>
                    <dd className="mt-1 font-serif text-2xl text-espresso">{fulfilment.estimate}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-muted">Payment</dt>
                    <dd className="mt-1 text-[15px] text-espresso">{paymentOptions.find((p) => p.id === confirmation.payment)?.label} (demo)</dd>
                  </div>
                </dl>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink to="/" size="lg">Back to Home</ButtonLink>
                <ButtonLink to="/menu" variant="outline" size="lg">Continue Browsing</ButtonLink>
              </div>
            </section>
          )}
        </div>

        <aside aria-labelledby="summary-title" className="lg:col-span-5">
          <div className="rounded-3xl border border-line bg-paper p-6 lg:sticky lg:top-24">
            <h2 id="summary-title" className="font-serif text-2xl">Order summary</h2>
            <ul className="mt-4 space-y-3">
              {view.lines.map((l) => (
                <li key={l.key} className="flex items-center gap-3">
                  <Img name={l.product.image} sizes="48px" alt="" className="size-12 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-espresso">
                      {l.quantity} × {l.product.name}
                    </p>
                    <p className="truncate text-xs text-muted">{selectionSummary(l.product, l.selection) || 'As it comes'}</p>
                  </div>
                  <span className="text-sm tabular-nums">{formatINR(l.total)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-2xl bg-cream p-4 text-sm">
              <p className="eyebrow text-muted">{fulfilment.heading}</p>
              {fulfilment.lines.length > 0 ? (
                fulfilment.lines.map((line) => (
                  <p key={line} className="mt-1 text-espresso">{line}</p>
                ))
              ) : (
                <p className="mt-1 text-muted">Add your address in step 01.</p>
              )}
            </div>
            <div className="mt-5 border-t border-line pt-5">
              <OrderSummary totals={view.totals} orderType={view.details.type} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
