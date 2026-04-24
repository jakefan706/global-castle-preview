import Image from 'next/image'
import Link from 'next/link'

import {
  brochureDownloads,
  certificationHighlights,
  faqItems,
  guideCards,
  resourceCategories,
  RESOURCES_HUB,
} from './resources-data'

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

function DownloadIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4v10" />
      <path d="m8 10 4 4 4-4" />
      <path d="M5 19h14" />
    </svg>
  )
}

const QUICK_LINKS = [
  { label: 'Buying Guides', href: '#buying-guides' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Download Center', href: '#download-center' },
] as const

export default function ResourcesPage() {
  return (
    <>
      <section className="relative isolate min-h-[72vh] overflow-hidden bg-[#081827] pt-24 text-white sm:pt-28">
        <Image
          src={RESOURCES_HUB.heroImage}
          alt="Global Castle resource center for custom drinkware buyers"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-48"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,19,32,0.95)_0%,rgba(7,19,32,0.72)_48%,rgba(7,19,32,0.24)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#081827] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(72vh-6rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#00868b]">
              Resource Center
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Practical sourcing guidance for custom drinkware programs.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d8e3ea] sm:text-lg">
              Use this hub to review the questions buyers ask most often around customization,
              MOQ, packaging, quality checks, sample review, and delivery planning.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#buying-guides"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#00868b] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0, 134, 139,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#006d72]"
              >
                <span>Browse Buying Guides</span>
                <ArrowIcon />
              </Link>
              <Link
                href="#download-center"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-white/34 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/16"
              >
                <span>Open Download Center</span>
                <DownloadIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#081827] pb-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {RESOURCES_HUB.proofPoints.map((point) => (
            <div key={point.label} className="border-t border-white/18 pt-5">
              <p className="text-3xl font-bold text-[#00868b]">{point.value}</p>
              <p className="mt-2 text-sm leading-6 text-[#c5d1da]">{point.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#d9e5ec] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 py-5">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center rounded-full border border-[#d8e5ec] px-4 py-2 text-sm font-medium text-[#455766] transition-colors duration-200 hover:border-[#81bfc1] hover:text-[#006d72]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="buying-guides"
        className="scroll-mt-28 bg-white py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
                Buying Guides
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
                Organize the sourcing conversation before it reaches production.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#666666] sm:text-base">
                The resource center is grouped around the buying decisions that typically shape a
                B2B drinkware program first: branding direction, packaging and MOQ planning, then
                quality review and delivery timing.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {resourceCategories.map((category) => (
                <div
                  key={category.title}
                  className="border-l border-[#dce8ee] pl-5"
                >
                  <h3 className="text-lg font-semibold text-[#333333]">{category.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5f6d78]">
                    {category.description}
                  </p>
                  <div className="mt-4 space-y-3">
                    {category.bullets.map((bullet) => (
                      <div key={bullet} className="flex gap-3 text-sm text-[#5f6d78]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00868b]" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={category.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#00868b] transition-colors duration-200 hover:text-[#006d72]"
                  >
                    <span>{category.ctaLabel}</span>
                    <ArrowIcon />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {guideCards.map((guide) => (
              <Link
                key={guide.question}
                href={guide.href}
                className="group rounded-[4px] border border-[#dbe5ec] bg-[#f7fafb] p-6 transition-all duration-250 hover:-translate-y-0.5 hover:border-[#81bfc1] hover:bg-white hover:shadow-[0_18px_40px_rgba(12,27,48,0.09)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00868b]">
                  {guide.category}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-[#333333]">
                  {guide.question}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#666666]">{guide.summary}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#00868b]">
                  <span>{guide.ctaLabel}</span>
                  <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-28 bg-[#f4f8fa] py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
              Fast answers to the questions buyers raise most often.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#666666] sm:text-base">
              These answers are written to help sourcing teams frame a useful first inquiry, not
              to replace a quote review. Final MOQ, sample timing, and production planning always
              depend on the confirmed program scope.
            </p>

            <div className="mt-8 rounded-[4px] border border-[#dbe5ec] bg-white p-6 shadow-[0_16px_36px_rgba(12,27,48,0.05)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00868b]">
                Best Inquiry Inputs
              </p>
              <div className="mt-5 space-y-4">
                {[
                  'Target product type or category',
                  'Estimated order quantity or MOQ target',
                  'Branding and finish requirements',
                  'Packaging direction and delivery timing',
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-[#4f5f6b]">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00868b]/12 text-[#00868b]">
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-3.5 w-3.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m4 10 4 4 8-8" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="rounded-[4px] border border-[#dbe5ec] bg-white p-6 shadow-[0_16px_36px_rgba(12,27,48,0.05)]"
              >
                <h3 className="text-lg font-semibold text-[#333333]">{item.question}</h3>
                <p className="mt-4 text-sm leading-7 text-[#666666]">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="certifications"
        className="scroll-mt-28 bg-white py-20 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
              Certifications
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
              Supporting proof for compliance and sourcing confidence.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#666666] sm:text-base">
              Certification discussion is usually part of a wider sourcing review that also covers
              product material, market destination, testing scope, inspection timing, and packing
              requirements. This section gives buyers a fast view of the supporting references most
              often requested.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'Food-contact standards reviewed alongside target market requirements',
                'Documentation conversations aligned with OEM, gifting, and retail programs',
                'Factory process and audit signals that support repeat-order sourcing reviews',
              ].map((point) => (
                <div key={point} className="flex gap-4">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00868b]/12 text-[#00868b]">
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-3.5 w-3.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m4 10 4 4 8-8" />
                    </svg>
                  </span>
                  <p className="text-sm leading-7 text-[#5f6d78] sm:text-base">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {certificationHighlights.map((certification) => (
              <div
                key={certification.name}
                className="rounded-[4px] border border-[#dbe5ec] bg-[#f7fafb] p-5 transition-all duration-200 hover:border-[#81bfc1] hover:bg-white hover:shadow-[0_16px_30px_rgba(12,27,48,0.07)]"
              >
                <div className="relative h-14 w-20">
                  <Image
                    src={certification.logo}
                    alt={`${certification.name} certification logo`}
                    fill
                    sizes="80px"
                    className="object-contain object-left"
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#333333]">
                  {certification.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#666666]">
                  {certification.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="download-center"
        className="scroll-mt-28 bg-[#f4f8fa] py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
                Download Center
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
                Quarterly brochure slots ready for final PDF uploads.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#666666] sm:text-base">
                The shelf below is intentionally structured for quarterly brochure updates. Cover
                previews and file slots are in place now so future swaps only require updating the
                approved PDF and final preview image.
              </p>
            </div>

            <div className="rounded-[4px] border border-[#dbe5ec] bg-white px-5 py-4 text-sm text-[#5f6d78] shadow-[0_14px_30px_rgba(12,27,48,0.05)]">
              Current state: brochure cards are live, and file uploads can be replaced later
              without changing layout code.
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {brochureDownloads.map((brochure) => (
              <article
                key={`${brochure.quarter}-${brochure.title}`}
                className="overflow-hidden rounded-[4px] border border-[#dbe5ec] bg-white shadow-[0_18px_40px_rgba(12,27,48,0.06)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#081827]">
                  <Image
                    src={brochure.coverImage}
                    alt={`${brochure.title} cover preview`}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081320]/92 via-[#081320]/28 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#00868b]">
                      {brochure.quarter}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{brochure.title}</h3>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#00868b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#00757a]">
                      {brochure.status}
                    </span>
                    {brochure.fileLabel ? (
                      <span className="text-xs font-medium text-[#7b8793]">
                        {brochure.fileLabel}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-4 text-sm leading-7 text-[#666666]">{brochure.summary}</p>

                  <Link
                    href={brochure.pdfUrl}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-[4px] border border-[#00868b] bg-white px-4 py-3 text-sm font-semibold text-[#00868b] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#006d72] hover:text-[#00757a]"
                  >
                    <span>Request current PDF</span>
                    <DownloadIcon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="resource-inquiry"
        className="scroll-mt-28 bg-[#081827] py-20 text-white lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
              Start An Inquiry
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Share product type, quantity, branding needs, packaging direction, and timeline.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c5d1da] sm:text-base">
              We can help evaluate MOQ, sample direction, decoration options, packaging paths,
              quality review priorities, and delivery coordination for the program.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#00868b] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0, 134, 139,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#006d72]"
          >
            <span>Start Your Inquiry</span>
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </>
  )
}
