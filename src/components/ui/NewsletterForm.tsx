import { ArrowRight, Check } from 'lucide-react'
import { useId, useState } from 'react'
import { isEmail } from '../../utils/validation'

export function NewsletterForm({ tone = 'dark', compact = false }: { tone?: 'dark' | 'light'; compact?: boolean }) {
  const id = useId()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const light = tone === 'light'

  if (done) {
    return (
      <div role="status" className={`flex items-start gap-3 rounded-2xl px-4 py-3.5 ${light ? 'bg-white/8 text-paper' : 'bg-sage-soft text-sage-dark'}`}>
        <Check className="mt-0.5 size-4 shrink-0" aria-hidden />
        <p className="text-sm leading-snug">
          <strong className="font-semibold">You’re on the list.</strong> Good things, occasionally — and never more than twice a month. (Demo: no email is sent.)
        </p>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        if (!email.trim()) return setError('Please enter your email address.')
        if (!isEmail(email)) return setError('That email doesn’t look quite right.')
        setError('')
        setDone(true)
      }}
    >
      <label htmlFor={id} className={compact ? 'sr-only' : `mb-2 block text-[13px] font-semibold ${light ? 'text-paper/80' : 'text-espresso'}`}>
        Email address
      </label>
      <div className={`flex gap-2 ${compact ? '' : 'flex-col sm:flex-row'}`}>
        <input
          id={id}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError('')
          }}
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`h-12 min-w-0 rounded-full ${compact ? 'flex-1' : 'w-full sm:w-auto sm:flex-1'} border px-5 text-[15px] outline-none transition-colors ${
            light
              ? 'border-white/20 bg-white/5 text-paper placeholder:text-paper/45 focus:border-paper/70'
              : 'border-line bg-paper text-charcoal placeholder:text-muted/70 focus:border-espresso'
          } ${error ? (light ? 'border-[#e8a58a]!' : 'border-terracotta!') : ''}`}
        />
        <button
          type="submit"
          aria-label={compact ? 'Join the list' : undefined}
          className={`inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full font-semibold transition-colors ${
            compact ? 'w-12' : 'px-6'
          } ${light ? 'bg-paper text-espresso hover:bg-sand' : 'bg-espresso text-paper hover:bg-roast'}`}
        >
          {!compact && 'Join the List'}
          <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>
      {error && (
        <p id={`${id}-err`} className={`mt-2 text-[13px] ${light ? 'text-[#f0b9a3]' : 'text-terracotta-dark'}`}>
          {error}
        </p>
      )}
    </form>
  )
}
