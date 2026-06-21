import Image from 'next/image'
import Link from 'next/link'

import {
  downloads,
  quickSupportItems,
  RESOURCES_HUB,
  verificationItems,
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

export default function ResourcesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#081827] pt-24 text-white sm:pt-28">
        <Image
          src={RESOURCES_HUB.heroImage}
          alt="Resource center"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[linear-gradient(96deg,rgba(6,18,29,0.96)_0%,rgba(6,18,29,0.9)_42%,rgba(6,18,29,0.58)_100%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-20 lg:pt-18">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#35b9bd]">
              {RESOURCES_HUB.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {RESOURCES_HUB.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d5e1e8] sm:text-lg">
              {RESOURCES_HUB.summary}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#downloads"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#11939a] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(17,147,154,0.26)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0d7e84]"
              >
                <span>Open Downloads</span>
                <DownloadIcon />
              </Link>
              <Link
                href="#verification"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-white/20 bg-white/8 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/14"
              >
                <span>See Verification</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 border-t border-white/14 pt-6 md:grid-cols-3">
            {RESOURCES_HUB.proofPoints.map((point) => (
              <div key={point.label} className="border-l border-white/12 pl-4 first:border-l-0 first:pl-0">
                <p className="text-3xl font-bold text-[#35b9bd]">{point.value}</p>
                <p className="mt-2 text-sm leading-6 text-[#c4d1d9]">{point.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="downloads" className="scroll-mt-28 bg-[#f5f8fa] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
                Downloads
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#24323d] sm:text-4xl">
                Real catalogs, not placeholder shelves.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#5f6d78] sm:text-base">
                This section now focuses on live files your buyers can actually open. We kept the
                layout clean, moved the best assets forward, and removed the filler around them.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[4px] border border-[#d7e2e8] bg-white p-5 shadow-[0_14px_30px_rgba(12,27,48,0.05)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00868b]">
                  Best starting point
                </p>
                <p className="mt-3 text-base font-semibold text-[#24323d]">
                  2025 Q1 Catalog
                </p>
                <p className="mt-2 text-sm leading-6 text-[#60707c]">
                  The broadest current overview for product scouting and first-pass assortment
                  discussion.
                </p>
              </div>
              <div className="rounded-[4px] border border-[#d7e2e8] bg-white p-5 shadow-[0_14px_30px_rgba(12,27,48,0.05)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00868b]">
                  Lightest file
                </p>
                <p className="mt-3 text-base font-semibold text-[#24323d]">
                  2024 Flexibility Catalog
                </p>
                <p className="mt-2 text-sm leading-6 text-[#60707c]">
                  Best when a buyer needs a fast-share PDF for internal review and early alignment.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {downloads.map((download) => (
              <article
                key={download.title}
                className="group overflow-hidden rounded-[6px] border border-[#dbe5ec] bg-white shadow-[0_18px_38px_rgba(12,27,48,0.06)] transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(12,27,48,0.1)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e8eef2]">
                  <Image
                    src={download.coverImage}
                    alt={`${download.title} cover`}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw"
                    className="object-contain object-center p-4 transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#eaf7f7] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#00757a]">
                      {download.yearLabel}
                    </span>
                    <span className="text-xs font-medium text-[#7b8793]">{download.fileSize}</span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-[#24323d]">{download.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#667781]">{download.summary}</p>

                  <Link
                    href={download.pdfUrl}
                    target="_blank"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#00868b] transition-colors duration-200 hover:text-[#006d72]"
                  >
                    <span>Download PDF</span>
                    <DownloadIcon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="verification" className="scroll-mt-28 bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
              Verification
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#24323d] sm:text-4xl">
              Compliance references presented as a quick visual grid.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#667781] sm:text-base">
              This section is intentionally lighter now. Buyers should be able to scan the proof at
              a glance, not read through long explanation blocks before they know what is covered.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {verificationItems.map((item) => (
              <div
                key={item.name}
                className="rounded-[4px] border border-[#dce6eb] bg-[#f8fbfc] p-5 text-center transition-all duration-200 hover:border-[#95c8ca] hover:bg-white"
              >
                <div className="relative mx-auto h-14 w-20">
                  <Image
                    src={item.logo}
                    alt={`${item.name} logo`}
                    fill
                    sizes="80px"
                    className="object-contain object-center"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#24323d]">{item.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6b7b86]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quick-support" className="scroll-mt-28 bg-[#eef4f6] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
                Quick Support
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#24323d] sm:text-4xl">
                Short answers for the last questions before inquiry.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#667781] sm:text-base">
                We trimmed this area down on purpose. It should remove friction, not become another
                long reading section.
              </p>
            </div>

            <div className="space-y-4">
              {quickSupportItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-[4px] border border-[#d7e2e8] bg-white p-6 shadow-[0_14px_30px_rgba(12,27,48,0.04)]"
                >
                  <h3 className="text-lg font-semibold text-[#24323d]">{item.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#667781]">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 overflow-hidden rounded-[6px] border border-[#c6d8e0] bg-[linear-gradient(135deg,#0b1d2f_0%,#0c2437_56%,#123447_100%)] text-white shadow-[0_26px_60px_rgba(7,24,39,0.12)]">
            <div className="grid gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12 lg:py-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#35b9bd]">
                  Need Something Else?
                </p>
                <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Share your target category and we will point you to the right file or next step.
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c8d6de] sm:text-base">
                  If the exact catalog, compliance note, or briefing format is not on this page,
                  send us the buyer scenario and we will guide the next move directly.
                </p>
              </div>

              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#11939a] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(17,147,154,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0d7e84]"
              >
                <span>Contact Us</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
