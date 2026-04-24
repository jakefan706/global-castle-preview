'use client'

import { useState } from 'react'

import { useScrollReveal } from '../../hooks/use-scroll-reveal'

type FormState = {
  name: string
  email: string
  company: string
  country: string
  message: string
}

const OFFICE_MAP_EMBED_URL =
  'https://www.google.com/maps?q=30.283212,120.179958&hl=en&z=16&output=embed'

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  company: '',
  country: '',
  message: '',
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M4 7h16v10H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m5 8 7 5 7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M6.8 4h3l1 4-1.8 1.8a14 14 0 0 0 5.2 5.2L16 13l4 1v3c0 1.1-.9 2-2 2C10.3 19 5 13.7 5 7c0-1.1.9-2 1.8-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M12 21s6-5.6 6-11a6 6 0 1 0-12 0c0 5.4 6 11 6 11Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
      <path d="M21 3 3 11l7 2 2 7 9-17Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M10 13 21 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export default function ContactSection() {
  const [sectionRef, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.1 })
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const shouldAnimate = isVisible

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

  return (
    <section ref={sectionRef} id="contact" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div
            className="transition-all duration-700 opacity-100"
            style={{ transform: 'translateX(0)' }}
          >
            <h2 className="mb-4 text-3xl font-bold text-[#333333] sm:text-4xl">Start Your Partnership</h2>
            <p className="mb-6 text-sm leading-7 text-[#666666]">
              The UI now keeps the cleaner v0 layout, but this form submits into your actual
              Payload inquiry collection so the homepage can work as a real lead entry point.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[4px] border border-[#e4e9f0] bg-white p-3">
                <div className="mb-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-[#00868b]/10">
                  <span className="text-[#00868b]">
                    <MailIcon />
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#333333]">Email Us</h3>
                  <p className="break-all text-xs leading-5 text-[#666666]">info@globalcastle.com</p>
                </div>
              </div>

              <div className="rounded-[4px] border border-[#e4e9f0] bg-white p-3">
                <div className="mb-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-[#00868b]/10">
                  <span className="text-[#00868b]">
                    <PhoneIcon />
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#333333]">Call Us</h3>
                  <p className="text-xs leading-5 text-[#666666]">+86 571 8888 8888</p>
                </div>
              </div>

              <div className="rounded-[4px] border border-[#e4e9f0] bg-white p-3">
                <div className="mb-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-[#00868b]/10">
                  <span className="text-[#00868b]">
                    <MapPinIcon />
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#333333]">Visit Us</h3>
                  <p className="text-xs leading-5 text-[#666666]">Hangzhou, Zhejiang, China</p>
                </div>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-[4px] border border-[#e4e9f0] shadow-[0_14px_40px_rgba(16,34,56,0.08)]">
              <iframe
                title="Global Castle office location"
                src={OFFICE_MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full border-0 lg:h-[420px]"
              />
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${shouldAnimate ? 'opacity-100' : 'opacity-100'}`}
            style={{ transform: shouldAnimate ? 'translateX(0)' : 'translateX(0)' }}
          >
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center rounded-[4px] bg-[#f5f7fa] p-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#2ecc71]/10">
                  <span className="text-[#2ecc71]">
                    <SendIcon />
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[#333333]">Inquiry Sent</h3>
                <p className="text-[#666666]">
                  Thank you. Your message has been recorded in the CMS and the team can follow up
                  from the admin panel.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-[4px] bg-[#f5f7fa] p-6 lg:p-8">
                <h3 className="mb-6 text-xl font-semibold text-[#333333]">Quick Inquiry</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-[#333333]">
                    <span className="mb-2 block">Your Name</span>
                    <input
                      value={form.name}
                      onChange={(event) => handleChange('name', event.target.value)}
                      name="name"
                      placeholder="John Smith"
                      required
                      className="gc-input"
                    />
                  </label>

                  <label className="block text-sm font-medium text-[#333333]">
                    <span className="mb-2 block">Email Address</span>
                    <input
                      value={form.email}
                      onChange={(event) => handleChange('email', event.target.value)}
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      required
                      className="gc-input"
                    />
                  </label>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-[#333333]">
                    <span className="mb-2 block">Company Name</span>
                    <input
                      value={form.company}
                      onChange={(event) => handleChange('company', event.target.value)}
                      name="company"
                      placeholder="Your Company Ltd."
                      className="gc-input"
                    />
                  </label>

                  <label className="block text-sm font-medium text-[#333333]">
                    <span className="mb-2 block">Country</span>
                    <input
                      value={form.country}
                      onChange={(event) => handleChange('country', event.target.value)}
                      name="country"
                      placeholder="United States"
                      className="gc-input"
                    />
                  </label>
                </div>

                <label className="mt-4 block text-sm font-medium text-[#333333]">
                  <span className="mb-2 block">Message</span>
                  <textarea
                    value={form.message}
                    onChange={(event) => handleChange('message', event.target.value)}
                    name="message"
                    placeholder="Tell us about your requirements..."
                    rows={5}
                    required
                    className="gc-textarea"
                  />
                </label>

                {status === 'error' ? (
                  <p className="mt-4 text-sm text-red-600">
                    Something went wrong while sending your inquiry. Please try again.
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary mt-6 w-full border-0 px-6 py-4 text-base disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
