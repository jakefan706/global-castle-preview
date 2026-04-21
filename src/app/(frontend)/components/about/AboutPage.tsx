import Image from 'next/image'
import Link from 'next/link'

import {
  certificationSupport,
  companyIntro,
  facilityHighlights,
  proofStats,
  timelineOrMilestones,
  whyChooseUs,
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

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#081827] pt-28 text-white sm:pt-32">
        <Image
          src={companyIntro.heroImage}
          alt="Global Castle production and export capability"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-42"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,19,32,0.95)_0%,rgba(7,19,32,0.75)_48%,rgba(7,19,32,0.28)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#081827] to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#67c0bf]">
              {companyIntro.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {companyIntro.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d8e3ea] sm:text-lg">
              {companyIntro.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/78">
              {[companyIntro.foundedLabel, companyIntro.locationLabel, companyIntro.audienceLabel].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/18 bg-white/8 px-4 py-2 backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#company-overview"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#67c0bf] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(103,192,191,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5ab0af]"
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
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#67c0bf]">
              Company Overview
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
              Built to support drinkware programs with production discipline and export awareness.
            </h2>
          </div>

          <div className="space-y-6 text-sm leading-7 text-[#5f6d78] sm:text-base">
            <p>
              Global Castle is a B2B drinkware manufacturer focused on stainless steel bottles,
              tumblers, mugs, and adjacent custom programs for distributors, wholesalers, gift
              companies, and brand teams.
            </p>
            <p>
              The company’s value is not only in supplying products, but in coordinating the
              details that matter to professional buyers: customization direction, packaging
              alignment, production readiness, quality review, and shipment planning.
            </p>
            <p>
              The result is a more practical sourcing partner for customers who need a factory that
              can support both everyday catalog demand and branded OEM projects with clearer
              communication and steadier execution.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f8fa] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#67c0bf]">
              Proof Of Capability
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
              The company profile should answer credibility questions quickly.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {proofStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[4px] border border-[#dbe5ec] bg-white p-6 shadow-[0_16px_36px_rgba(12,27,48,0.05)]"
              >
                <p className="text-4xl font-bold text-[#1f3345]">{stat.value}</p>
                <h3 className="mt-4 text-base font-semibold uppercase tracking-[0.12em] text-[#67c0bf]">
                  {stat.label}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#5f6d78]">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#67c0bf]">
              Why Work With Us
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
              A more useful version of “why choose us” for professional buyers.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#5f6d78] sm:text-base">
              This section is not written as brand promotion. Its job is to explain why the
              factory setup, process control, and export focus matter in real sourcing work.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="border-l border-[#dce8ee] pl-5">
                <h3 className="text-xl font-semibold text-[#333333]">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#5f6d78]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#edf4f7] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#67c0bf]">
                Facility & Production
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
                The factory is presented as a working production system, not a gallery.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#5f6d78]">
              The strongest part of the reference page is its workshop emphasis. Here, that idea is
              translated into a more architectural layout focused on execution capacity.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.16fr_0.84fr]">
            <div className="grid gap-6 sm:grid-cols-2">
              {facilityHighlights.slice(0, 2).map((highlight) => (
                <article key={highlight.title} className="overflow-hidden rounded-[4px] bg-white shadow-[0_18px_40px_rgba(12,27,48,0.06)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#081827]">
                    <Image
                      src={highlight.image}
                      alt={highlight.title}
                      fill
                      sizes="(min-width: 1024px) 28vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081320]/74 via-[#081320]/18 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#67c0bf]">
                        Process Zone
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{highlight.title}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm leading-7 text-[#5f6d78]">{highlight.detail}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="grid gap-6">
              {facilityHighlights.slice(2).map((highlight) => (
                <article
                  key={highlight.title}
                  className="grid overflow-hidden rounded-[4px] bg-white shadow-[0_18px_40px_rgba(12,27,48,0.06)] sm:grid-cols-[220px_1fr]"
                >
                  <div className="relative min-h-[220px] overflow-hidden bg-[#081827]">
                    <Image
                      src={highlight.image}
                      alt={highlight.title}
                      fill
                      sizes="(min-width: 640px) 220px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#67c0bf]">
                      Production Flow
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-[#333333]">{highlight.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#5f6d78]">{highlight.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#67c0bf]">
              Operational Rhythm
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
              How the company works once a sourcing conversation begins.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#5f6d78] sm:text-base">
              A company page is more useful when it shows how work actually moves, from inquiry
              alignment to shipment coordination, instead of only listing credentials.
            </p>
          </div>

          <div className="space-y-5">
            {timelineOrMilestones.map((item) => (
              <div
                key={item.step}
                className="grid gap-4 border-b border-[#dfe9ef] pb-5 last:border-b-0 last:pb-0 sm:grid-cols-[52px_1fr]"
              >
                <div className="text-lg font-bold text-[#67c0bf]">{item.step}</div>
                <div>
                  <h3 className="text-xl font-semibold text-[#333333]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5f6d78]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f8fa] py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#67c0bf]">
              Certifications & Support
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
              Certification references are presented as procurement support, not decoration.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#5f6d78] sm:text-base">
              Buyers often need confidence around documentation, food-contact expectations, quality
              review, and audit readiness. This section keeps that proof visible without turning it
              into a generic logo wall.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {certificationSupport.map((item) => (
              <div
                key={item.name}
                className="rounded-[4px] border border-[#dbe5ec] bg-white p-5 transition-all duration-200 hover:border-[#9bcfce] hover:shadow-[0_16px_30px_rgba(12,27,48,0.06)]"
              >
                <div className="relative h-14 w-20">
                  <Image
                    src={item.logo}
                    alt={`${item.name} certification logo`}
                    fill
                    sizes="80px"
                    className="object-contain object-left"
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#333333]">{item.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5f6d78]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#081827] py-20 text-white lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#67c0bf]">
              Start An Inquiry
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Share product type, quantity, branding needs, packaging direction, and timing.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c5d1da] sm:text-base">
              We can help evaluate product fit, customization scope, MOQ, packaging options,
              quality checkpoints, and delivery coordination for your next drinkware program.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#67c0bf] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(103,192,191,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5ab0af]"
          >
            <span>Start Your Inquiry</span>
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </>
  )
}
