import { Cake, Check, Coffee, Croissant, Gift, Sparkles, Stamp } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { DemoNote } from '../components/ui/DemoNote'
import { Field } from '../components/ui/Field'
import { fieldProps } from '../components/ui/fieldProps'
import { Img } from '../components/ui/Img'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { demoMemberNumber } from '../utils/ids'
import { compact, hasErrors, isEmail, type Errors } from '../utils/validation'

const GOAL = 8

const benefits = [
  { icon: Croissant, title: 'Free pastry', body: 'Every eighth visit, a pastry of your choice is on us.' },
  { icon: Cake, title: 'Birthday treat', body: 'A slice of something sweet during your birthday week.' },
  { icon: Sparkles, title: 'Early access', body: 'Taste seasonal drinks a week before they hit the menu.' },
  { icon: Gift, title: 'Members-only specials', body: 'Occasional off-menu bakes and small events for the club.' },
]

const rewards = [
  { at: 4, label: 'Free size upgrade' },
  { at: 8, label: 'Free pastry' },
]

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

type Key = 'name' | 'email'

export function LoyaltyPage() {
  useDocumentMeta('The Morning Club', 'THE MORNING CLUB — the MORNING THEORY loyalty programme. Collect stamps, earn free pastries and birthday treats. Demo only.')
  const [visits, setVisits] = useState(4)
  const [member, setMember] = useState<{ name: string; number: string } | null>(null)
  const [form, setForm] = useState({ name: '', email: '', month: '' })
  const [errors, setErrors] = useState<Errors<Key>>({})

  const complete = visits >= GOAL
  const nextReward = rewards.find((r) => r.at > visits) ?? rewards[rewards.length - 1]

  const join = () => {
    const next = compact<Key>({
      name: form.name.trim().length < 2 ? 'Please tell us your name.' : undefined,
      email: !form.email.trim() ? 'Please add your email.' : !isEmail(form.email) ? 'That email doesn’t look quite right.' : undefined,
    })
    setErrors(next)
    if (hasErrors(next)) {
      document.getElementById(`club-${Object.keys(next)[0]}`)?.focus()
      return
    }
    setMember({ name: form.name.trim(), number: demoMemberNumber() })
    setVisits(1)
  }

  return (
    <>
      <section className="bg-terracotta text-paper">
        <div className="container-page grid grid-cols-1 gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="eyebrow text-paper/75">The Morning Club</p>
            <h1 className="mt-4 text-[2.7rem] leading-[1] font-light text-paper sm:text-6xl lg:text-7xl">
              A little more coffee. A little more love.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/80">
              Collect a stamp every time you visit. Rewards arrive quietly — like a free pastry on a Tuesday when you needed one.
            </p>
            <a href="#join" className="mt-8 inline-flex h-13 items-center rounded-full bg-paper px-7 text-[15px] font-semibold text-espresso transition-colors hover:bg-sand">
              Join the club
            </a>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="relative mx-auto max-w-md rotate-[-2deg] rounded-[28px] bg-cream p-6 text-espresso shadow-[0_30px_60px_-25px_rgba(40,20,10,0.55)] sm:p-8" aria-live="polite">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-serif text-lg tracking-[0.14em]">MORNING THEORY</p>
                  <p className="eyebrow mt-1 text-[9px] text-muted">The Morning Club · Demo card</p>
                </div>
                <Stamp className="size-6 text-terracotta" aria-hidden />
              </div>
              <p className="mt-6 font-hand text-3xl text-terracotta">{member ? `Hi, ${member.name.split(' ')[0]}!` : 'Good morning!'}</p>
              <ol className="mt-5 grid grid-cols-4 gap-3" aria-label={`${Math.min(visits, GOAL)} of ${GOAL} visits stamped`}>
                {Array.from({ length: GOAL }, (_, i) => {
                  const stamped = i < visits
                  return (
                    <li
                      key={i}
                      className={`grid aspect-square place-items-center rounded-full border-2 border-dashed transition-colors duration-300 ${
                        stamped ? 'border-terracotta bg-terracotta text-paper' : 'border-oat text-oat'
                      }`}
                    >
                      {i === GOAL - 1 && !stamped ? <Croissant className="size-5" aria-hidden /> : <Coffee className={`size-5 ${stamped ? 'animate-fade-in' : ''}`} aria-hidden />}
                    </li>
                  )
                })}
              </ol>
              <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
                <div>
                  <p className="font-serif text-3xl tabular-nums">{Math.min(visits, GOAL)} / {GOAL} <span className="text-base text-muted">visits</span></p>
                  <p className="mt-1 text-sm text-muted">
                    {complete ? 'Reward unlocked: Free pastry!' : <>Next reward: <strong className="text-espresso">{nextReward.label}</strong></>}
                  </p>
                </div>
                <p className="text-right text-[11px] text-muted tabular-nums">{member ? member.number : 'MC-DEMO-0004'}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {complete ? (
                <Button variant="light" onClick={() => setVisits(0)}>
                  <Gift className="size-4" aria-hidden /> Redeem pastry (demo)
                </Button>
              ) : (
                <Button variant="light" onClick={() => setVisits((v) => v + 1)}>
                  <Stamp className="size-4" aria-hidden /> Add a demo visit
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="benefits-title" className="container-page py-16 sm:py-24">
        <p className="hand mb-2">Why join</p>
        <h2 id="benefits-title" className="text-4xl font-light sm:text-5xl">Small rewards for regulars</h2>
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, body }) => (
            <li key={title} className="rounded-3xl border border-line bg-paper p-6">
              <span className="grid size-12 place-items-center rounded-full bg-sand text-terracotta">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-serif text-xl">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid grid-cols-1 gap-4 rounded-3xl bg-sand/60 p-6 sm:grid-cols-3 sm:p-8">
          <h3 className="font-serif text-2xl">How rewards work</h3>
          {rewards.map((r) => (
            <p key={r.at} className="flex items-center gap-3 text-roast">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-paper font-serif text-lg text-terracotta tabular-nums">{r.at}</span>
              visits — {r.label.toLowerCase()}
            </p>
          ))}
        </div>
      </section>

      <section id="join" aria-labelledby="join-title" className="scroll-mt-24 bg-paper py-16 sm:py-24">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="hidden overflow-hidden rounded-3xl lg:col-span-5 lg:block">
            <Img name="cozy-cup" sizes="40vw" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {member ? (
              <div role="status">
                <span className="grid size-14 place-items-center rounded-full bg-sage-soft text-sage-dark">
                  <Check className="size-6" aria-hidden />
                </span>
                <h2 className="mt-5 text-4xl font-light sm:text-5xl">Welcome to the club, {member.name.split(' ')[0]}.</h2>
                <p className="mt-4 text-lg text-muted">Your first stamp is on the card above. Demo member number {member.number}.</p>
                <DemoNote className="mt-4">This is a demo — no account was created and nothing is saved.</DemoNote>
              </div>
            ) : (
              <form noValidate onSubmit={(e) => { e.preventDefault(); join() }} aria-labelledby="join-title">
                <p className="hand mb-2">It’s free</p>
                <h2 id="join-title" className="text-4xl font-light sm:text-5xl">Join The Morning Club</h2>
                <p className="mt-3 text-muted">Takes ten seconds. Your first stamp is on us.</p>
                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field id="club-name" label="Name" error={errors.name} className="sm:col-span-2">
                    <input {...fieldProps('club-name', errors.name)} value={form.name} onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((x) => ({ ...x, name: undefined })) }} autoComplete="name" className="field-input" />
                  </Field>
                  <Field id="club-email" label="Email" error={errors.email}>
                    <input {...fieldProps('club-email', errors.email)} type="email" value={form.email} onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((x) => ({ ...x, email: undefined })) }} autoComplete="email" className="field-input" />
                  </Field>
                  <Field id="club-month" label="Birthday month" optional>
                    <select {...fieldProps('club-month')} value={form.month} onChange={(e) => setForm((f) => ({ ...f, month: e.target.value }))} className="field-input">
                      <option value="">Prefer not to say</option>
                      {months.map((m) => <option key={m}>{m}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <DemoNote>Demo form — no account is created.</DemoNote>
                  <Button type="submit" variant="accent" size="lg">Join Now</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
