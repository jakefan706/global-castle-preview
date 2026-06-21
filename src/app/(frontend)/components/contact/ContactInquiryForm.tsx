'use client'

import { useEffect } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

type InquiryFormState = {
  name: string
  email: string
  company: string
  country: string
  message: string
}

const INITIAL_FORM: InquiryFormState = {
  name: '',
  email: '',
  company: '',
  country: '',
  message: '',
}

export default function ContactInquiryForm() {
  const searchParams = useSearchParams()
  const [form, setForm] = useState<InquiryFormState>(INITIAL_FORM)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    const product = searchParams.get('product')?.trim()
    const item = searchParams.get('item')?.trim()
    const message = searchParams.get('message')?.trim()
    const email = searchParams.get('email')?.trim()

    if (!product && !item && !message && !email) {
      return
    }

    setForm((current) => {
      if (current.message && (!email || current.email)) {
        return current
      }

      const generatedMessage =
        message ||
        [
          product ? `Product: ${product}` : null,
          item ? `Item Number: ${item}` : null,
          'Please share MOQ, lead time, branding options, and sample availability.',
        ]
          .filter(Boolean)
          .join('\n')

      return {
        ...current,
        email: current.email || email || '',
        message: generatedMessage,
      }
    })
  }, [searchParams])

  const handleChange = (field: keyof InquiryFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/api/inquiry-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Failed to submit inquiry')
      }

      setForm(INITIAL_FORM)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex min-h-[700px] flex-col justify-between rounded-[4px] border border-[#1f4d57] bg-[linear-gradient(180deg,#0b2330_0%,#091924_100%)] p-7 text-white shadow-[0_28px_72px_rgba(4,17,24,0.38)] sm:p-8 lg:min-h-[760px]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
            Inquiry Received
          </p>
          <h3 className="mt-5 max-w-lg text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            Your project brief has been sent to the Global Castle team.
          </h3>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#b4c9d1] sm:text-base">
            We will review the information you shared and respond with the most practical next
            step for product direction, decoration feasibility, or sample discussion.
          </p>
        </div>

        <div className="grid gap-4 border-t border-white/12 pt-8 sm:grid-cols-3">
          {[
            'Initial response is usually sent within 24 hours.',
            'Decoration and product direction typically follows within 1-2 working days.',
            'Sample discussion timing depends on scope, artwork, and packaging requirements.',
          ].map((item) => (
            <div key={item} className="border-l border-[#1f4d57] pl-4 text-sm leading-6 text-[#c7d7dd]">
              {item}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-[4px] border border-[#1f4d57] bg-[linear-gradient(180deg,#0d2430_0%,#0a1821_100%)] p-7 text-white shadow-[0_28px_72px_rgba(4,17,24,0.38)] sm:p-8">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
            Main Inquiry Zone
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
            Project inquiry terminal
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-[#b5c9d1]">
          Share the working brief here. Required fields are limited so buyers can start quickly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pt-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-[#d9e6eb]">
            <span className="mb-2 block">Name *</span>
            <input
              value={form.name}
              onChange={(event) => handleChange('name', event.target.value)}
              name="name"
              required
              placeholder="Your name"
              className="gc-input border-white/10 bg-white text-[#333333]"
            />
          </label>

          <label className="block text-sm font-medium text-[#d9e6eb]">
            <span className="mb-2 block">Email *</span>
            <input
              value={form.email}
              onChange={(event) => handleChange('email', event.target.value)}
              name="email"
              type="email"
              required
              placeholder="name@company.com"
              className="gc-input border-white/10 bg-white text-[#333333]"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-[#d9e6eb]">
            <span className="mb-2 block">Company</span>
            <input
              value={form.company}
              onChange={(event) => handleChange('company', event.target.value)}
              name="company"
              placeholder="Company name"
              className="gc-input border-white/10 bg-white text-[#333333]"
            />
          </label>

          <label className="block text-sm font-medium text-[#d9e6eb]">
            <span className="mb-2 block">Country</span>
            <input
              value={form.country}
              onChange={(event) => handleChange('country', event.target.value)}
              name="country"
              placeholder="Country / market"
              className="gc-input border-white/10 bg-white text-[#333333]"
            />
          </label>
        </div>

        <label className="block text-sm font-medium text-[#d9e6eb]">
          <span className="mb-2 block">Project brief *</span>
          <textarea
            value={form.message}
            onChange={(event) => handleChange('message', event.target.value)}
            name="message"
            required
            rows={9}
            placeholder="Tell us the product type, target quantity, branding method, packaging needs, and expected timing."
            className="gc-textarea border-white/10 bg-white text-[#333333]"
          />
        </label>

        {searchParams.get('item') || searchParams.get('product') ? (
          <p className="rounded-[4px] border border-[#1f4d57] bg-white/5 px-4 py-3 text-sm text-[#cfe1e7]">
            Product reference prefilled:
            {' '}
            {[searchParams.get('product'), searchParams.get('item')].filter(Boolean).join(' / ')}
          </p>
        ) : null}

        <div className="grid gap-4 border-t border-white/10 pt-5 text-sm text-[#a8bec7] sm:grid-cols-2">
          <p>Suggested inputs: bottle or tumbler type, quantity target, logo method, packaging format.</p>
          <p>Also useful: destination market, sample timing, forwarder notes, carton label expectations.</p>
        </div>

        {status === 'error' ? (
          <p className="rounded-[4px] border border-[#6e2c2c] bg-[#3a1616] px-4 py-3 text-sm text-[#ffd3d3]">
            Inquiry could not be sent. Please retry in a moment.
          </p>
        ) : null}

        <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex cursor-pointer items-center justify-center rounded-[4px] border border-[#00868b] bg-[#00868b] px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#006d72] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === 'submitting' ? 'Sending inquiry...' : 'Submit Project Inquiry'}
          </button>

          <p className="max-w-sm text-sm leading-6 text-[#9fb5be]">
            Required fields remain simple. More detail in the message usually leads to a faster and
            more useful first response.
          </p>
        </div>
      </form>
    </div>
  )
}
