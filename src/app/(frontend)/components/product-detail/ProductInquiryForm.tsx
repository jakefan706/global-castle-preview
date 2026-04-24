'use client'

import { useState } from 'react'

type FormState = {
  name: string
  email: string
  company: string
  country: string
  message: string
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  company: '',
  country: '',
  message: '',
}

export default function ProductInquiryForm({
  productId,
  defaultMessage,
}: {
  productId: number | string | null
  defaultMessage: string
}) {
  const [form, setForm] = useState<FormState>({
    ...INITIAL_FORM,
    message: defaultMessage,
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/api/inquiry-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          sourceProduct: productId || undefined,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit inquiry')
      }

      setForm({
        ...INITIAL_FORM,
        message: defaultMessage,
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="rounded-[4px] border border-[#dbe4eb] bg-white p-6 shadow-[0_16px_46px_rgba(12,27,48,0.08)] sm:p-8">
      {status === 'success' ? (
        <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#2ecc71]/10 text-[#2ecc71]">
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
              <path d="m5 12 4.2 4.2L19 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="mb-2 text-2xl font-semibold text-[#333333]">Inquiry Sent</h3>
          <p className="max-w-sm text-sm leading-6 text-[#666666]">
            Your request has been submitted to the Global Castle team. We usually respond within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
              Start Inquiry
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-[#333333]">
              Ready to build your custom drinkware program?
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#666666]">
              Share your branding requirements, target quantity, and market. We will help evaluate decoration, packaging, and lead time.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-[#333333]">
              <span className="mb-2 block">Name</span>
              <input
                className="gc-input"
                value={form.name}
                onChange={(event) => handleChange('name', event.target.value)}
                name="name"
                required
                placeholder="Your name"
              />
            </label>

            <label className="block text-sm font-medium text-[#333333]">
              <span className="mb-2 block">Email</span>
              <input
                className="gc-input"
                value={form.email}
                onChange={(event) => handleChange('email', event.target.value)}
                name="email"
                type="email"
                required
                placeholder="your@email.com"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-[#333333]">
              <span className="mb-2 block">Company</span>
              <input
                className="gc-input"
                value={form.company}
                onChange={(event) => handleChange('company', event.target.value)}
                name="company"
                placeholder="Company name"
              />
            </label>

            <label className="block text-sm font-medium text-[#333333]">
              <span className="mb-2 block">Country</span>
              <input
                className="gc-input"
                value={form.country}
                onChange={(event) => handleChange('country', event.target.value)}
                name="country"
                placeholder="Your country"
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-[#333333]">
            <span className="mb-2 block">Message</span>
            <textarea
              className="gc-textarea"
              value={form.message}
              onChange={(event) => handleChange('message', event.target.value)}
              name="message"
              required
              rows={6}
              placeholder="Tell us about quantity, branding, packaging, and timing..."
            />
          </label>

          {status === 'error' ? (
            <p className="text-sm text-red-600">
              Something went wrong while sending your inquiry. Please try again.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full cursor-pointer rounded-[4px] border border-[#00868b] bg-[#00868b] px-6 py-4 text-base font-semibold text-white shadow-[0_12px_26px_rgba(0, 134, 139,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#006d72] hover:shadow-[0_16px_28px_rgba(0, 134, 139,0.24)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
          </button>

          <p className="text-center text-xs text-[#7b8793]">
            We usually reply within 24 hours.
          </p>
        </form>
      )}
    </div>
  )
}
