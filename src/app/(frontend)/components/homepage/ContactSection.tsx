'use client'

import { useState } from 'react'

import { useScrollReveal } from '../../hooks/use-scroll-reveal'

type FormState = {
  name: string
  email: string
  company: string
  country: string
  interestedCategory: string
  incotermsPreferred: 'FOB' | 'EXW' | 'DDP'
  message: string
}

const OFFICE_MAP_EMBED_URL =
  'https://www.google.com/maps?q=30.283212,120.179958&hl=en&z=16&output=embed'

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  company: '',
  country: '',
  interestedCategory: '',
  incotermsPreferred: 'FOB',
  message: '',
}

const INTERESTED_CATEGORIES = [
  'Stainless Steel',
  'Ceramic',
  'Tableware',
  'Gift Sets',
  'Others',
] as const

const INCOTERM_OPTIONS = ['FOB', 'EXW', 'DDP'] as const

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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
      const enrichedMessage = [
        form.interestedCategory ? `Interested Category: ${form.interestedCategory}` : null,
        `Incoterms Preferred: ${form.incotermsPreferred}`,
        '',
        form.message.trim(),
      ]
        .filter(Boolean)
        .join('\n')

      const response = await fetch('/api/inquiry-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          country: form.country,
          message: enrichedMessage,
        }),
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
            <h2 className="mb-4 text-3xl font-bold text-[#333333] sm:text-4xl">Ready to Elevate Your Collection?</h2>
            <p className="mb-6 text-sm leading-7 text-[#666666]">
              Whether you&apos;re looking for a reliable OEM partner or exploring new tableware designs,
              our team is ready to provide expert manufacturing support. We typically respond within
              24 hours.
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
                  <p className="break-all text-xs leading-5 text-[#666666]">sales@cnurbaneco.com</p>
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
                  <p className="text-xs leading-5 text-[#666666]">
                    <span className="block">+86-571-8823 1580</span>
                    <span className="block">+86-189 6903 8198</span>
                  </p>
                </div>
              </div>

              <div className="rounded-[4px] border border-[#e4e9f0] bg-white p-3">
                <div className="mb-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-[#00868b]/10">
                  <span className="text-[#00868b]">
                    <MapPinIcon />
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#333333]">Visit Our Showroom</h3>
                  <p className="text-xs leading-5 text-[#666666]">Hangzhou, Zhejiang, China</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/8618969038198"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-3 rounded-[4px] bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(37,211,102,0.24)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <WhatsAppIcon />
              <span>WhatsApp Quick Chat</span>
            </a>

            <div className="mt-5 overflow-hidden rounded-[4px] border border-[#e4e9f0] shadow-[0_14px_40px_rgba(16,34,56,0.08)]">
              <iframe
                title="Global Castle office location"
                src={OFFICE_MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full border-0 lg:h-[420px]"
              />
            </div>
            <p className="mt-3 text-sm font-medium text-[#7d8995]">
              Located in the Heart of China&apos;s Manufacturing Hub.
            </p>
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
                <h3 className="mb-2 text-xl font-semibold text-[#333333]">Quote Request Sent</h3>
                <p className="text-[#666666]">
                  Thank you. Your quote request has been recorded and our team will follow up with
                  the most practical next step for sampling, pricing, or branding direction.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-[4px] bg-[#f5f7fa] p-6 lg:p-8">
                <h3 className="mb-6 text-xl font-semibold text-[#333333]">Request a Custom Quote</h3>

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

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-[#333333]">
                    <span className="mb-2 block">Interested Category</span>
                    <select
                      value={form.interestedCategory}
                      onChange={(event) => handleChange('interestedCategory', event.target.value)}
                      name="interestedCategory"
                      className="gc-input appearance-none"
                    >
                      <option value="">Select a category</option>
                      {INTERESTED_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>

                  <fieldset className="block text-sm font-medium text-[#333333]">
                    <legend className="mb-2 block">Incoterms Preferred</legend>
                    <div className="grid grid-cols-3 gap-2">
                      {INCOTERM_OPTIONS.map((option) => {
                        const checked = form.incotermsPreferred === option

                        return (
                          <label
                            key={option}
                            className={`flex cursor-pointer items-center justify-center rounded-[4px] border px-3 py-3 text-sm font-semibold transition-colors duration-150 ${
                              checked
                                ? 'border-[#00868b] bg-[#00868b] text-white'
                                : 'border-[#dbe4eb] bg-white text-[#4b5563]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="incotermsPreferred"
                              value={option}
                              checked={checked}
                              onChange={(event) => handleChange('incotermsPreferred', event.target.value)}
                              className="sr-only"
                            />
                            {option}
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>
                </div>

                <label className="mt-4 block text-sm font-medium text-[#333333]">
                  <span className="mb-2 block">Message</span>
                  <textarea
                    value={form.message}
                    onChange={(event) => handleChange('message', event.target.value)}
                    name="message"
                    placeholder="Please let us know your required quantity, target materials, or custom branding needs for a more accurate quote."
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
                  {status === 'submitting' ? 'Sending...' : 'Request a Custom Quote'}
                </button>
                <p className="mt-3 text-center text-xs leading-5 text-[#8b95a1]">
                  Your information is kept confidential and used only to provide the requested
                  quote.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
