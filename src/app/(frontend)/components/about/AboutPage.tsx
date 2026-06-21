import type { ReactNode } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import {
  commitments,
  companyIntro,
  companyOverview,
  proofStats,
} from './about-data'

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0c7276]">{children}</p>
  )
}

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#081827] pt-28 text-white sm:pt-32">
        <Image
          src={companyIntro.heroImage}
          alt="UrbanEco manufacturing facility"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,19,32,0.94)_0%,rgba(7,19,32,0.8)_44%,rgba(7,19,32,0.24)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#081827] to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-18 sm:px-6 lg:px-8 lg:pb-24">
          <div className="max-w-3xl animate-fade-up">
            <SectionLabel>{companyIntro.eyebrow}</SectionLabel>
            <h1 className="mt-5 text-[2.6rem] font-semibold tracking-[-0.06em] text-white sm:text-[3.8rem] lg:text-[5rem]">
              {companyIntro.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d8e3ea] sm:text-lg">
              {companyIntro.description}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#company-overview"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#00868b] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0,134,139,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#006d72]"
              >
                <span>Explore Company Profile</span>
                <ArrowIcon />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-white/34 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/16"
              >
                <span>Start an Inquiry</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="company-overview" className="scroll-mt-28 bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16 lg:px-8">
          <div>
            <SectionLabel>{companyOverview.eyebrow}</SectionLabel>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#16313f] sm:text-4xl">
              {companyOverview.title}
            </h2>
          </div>

          <div className="space-y-6 text-sm leading-8 text-[#5c6e79] sm:text-base">
            {companyOverview.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#dbe5ea] bg-[#f5f8fa] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>Proof of Capability</SectionLabel>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#16313f] sm:text-4xl">
              UrbanEco by the Numbers
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {proofStats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-[4px] border border-[#dbe5ec] bg-white p-6 shadow-[0_16px_36px_rgba(12,27,48,0.05)]"
              >
                <p className="text-4xl font-semibold tracking-[-0.05em] text-[#16313f]">
                  {stat.value}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#0c7276]">
                  {stat.label}
                </p>
                <h3 className="mt-3 text-base font-semibold text-[#16313f]">{stat.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#5c6e79]">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>Our Commitments</SectionLabel>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#16313f] sm:text-4xl">
              What we protect for every program
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {commitments.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-[4px] border border-[#dbe5ec] bg-white shadow-[0_16px_36px_rgba(12,27,48,0.05)]"
              >
                <div className="relative aspect-[16/9] bg-[#081827]">
                  <Image
                    src={item.media}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 32vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081320]/72 via-[#081320]/16 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#16313f]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#5c6e79]">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
