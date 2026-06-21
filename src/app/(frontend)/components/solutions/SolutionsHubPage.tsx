import Image from 'next/image'
import Link from 'next/link'

import { FEATURED_CATEGORY_CARDS, getCategoryHref } from '../category-config'
import { SOLUTION_PAGES, SOLUTIONS_HUB, SUPPORT_MODEL_FLOW } from './solutions-data'

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

function CapabilityIcon({
  index,
  className = 'h-5 w-5',
}: {
  index: number
  className?: string
}) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v3" />
        <path d="M12 18v3" />
        <path d="M4.9 4.9l2.1 2.1" />
        <path d="M17 17l2.1 2.1" />
        <path d="M3 12h3" />
        <path d="M18 12h3" />
        <path d="M4.9 19.1 7 17" />
        <path d="M17 7l2.1-2.1" />
        <circle cx="12" cy="12" r="4.2" />
      </svg>
    )
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v5c0 4.8-2.9 7.9-7 10-4.1-2.1-7-5.2-7-10V6l7-3Z" />
        <path d="m9.5 12 1.7 1.7 3.3-3.5" />
      </svg>
    )
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7.5h16" />
        <path d="M4 12h16" />
        <path d="M4 16.5h10" />
        <path d="M18 14v5" />
        <path d="m15.5 16.5 2.5-2.5 2.5 2.5" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="7" height="6.5" rx="1.5" />
      <rect x="13.5" y="5" width="7" height="6.5" rx="1.5" />
      <rect x="3.5" y="13" width="7" height="6.5" rx="1.5" />
      <rect x="13.5" y="13" width="7" height="6.5" rx="1.5" />
    </svg>
  )
}

export default function SolutionsHubPage() {
  const bridgeCategories = FEATURED_CATEGORY_CARDS.slice(0, 6)
  const supportModelCards = SUPPORT_MODEL_FLOW.map((item) => ({
    ...item,
    solution: SOLUTION_PAGES.find((solution) => solution.slug === item.slug),
  })).filter((item) => item.solution)

  return (
    <>
      <section className="relative isolate min-h-[76vh] overflow-hidden bg-[#081827] pt-24 text-white sm:pt-28">
        <Image
          src={SOLUTIONS_HUB.heroImage}
          alt="Global Castle drinkware customization and packaging capability"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-72"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,19,32,0.78)_0%,rgba(7,19,32,0.5)_46%,rgba(7,19,32,0.12)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#081827] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(76vh-6rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#00868b]">
              Custom Drinkware Solutions
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Strategic Manufacturing Partners for Brands that Demand Excellence.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d8e3ea] sm:text-lg">
              UrbanEco empowers global partners to build comprehensive brand programs. We provide
              seamless support from trend-driven product selection and technical ODM development to
              retail-ready packaging and rigorous quality assurance-all fine-tuned for the European
              and American markets.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/#contact" className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#00868b] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0, 134, 139,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#006d72]">
                <span>Start a Custom Program</span>
                <ArrowIcon />
              </Link>
              <Link href="/products" className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-white/34 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/16">
                <span>Browse Product Categories</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#081827] pb-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {SOLUTIONS_HUB.proofPoints.map((point) => (
            <div key={point.label} className="border-t border-white/18 pt-5">
              <p className="text-3xl font-bold text-[#00868b]">{point.value}</p>
              <p className="mt-2 text-sm leading-6 text-[#c5d1da]">{point.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
              Support Model
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
              A Strategic Path from Product Concept to Retail-Ready Reality.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#666666] sm:text-base">
              Our support model is built around the core pillars of professional sourcing: bespoke
              product development, brand identity, retail packaging, and rigorous export-standard
              quality control.
            </p>
          </div>

          <div className="relative mt-14">
            <div className="absolute left-[8%] right-[8%] top-5 hidden h-px bg-[#dbe5ec] xl:block" />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {supportModelCards.map(({ step, role, solution }) =>
              solution ? (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="group relative rounded-[4px] border border-[#dbe5ec] bg-[linear-gradient(180deg,#f8fbfc_0%,#ffffff_100%)] p-6 transition-all duration-250 hover:-translate-y-1 hover:border-[#81bfc1] hover:bg-white hover:shadow-[0_20px_44px_rgba(12,27,48,0.1)] xl:min-h-[360px]"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#b7d6d9] bg-white text-sm font-bold text-[#00868b] shadow-[0_10px_24px_rgba(12,27,48,0.06)]">
                      {step}
                    </span>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8fa4ae]">
                      {role}
                    </p>
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#00868b]">
                    {solution.eyebrow}
                  </p>
                  <h3 className="mt-3 text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.04em] text-[#333333]">
                    {solution.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#666666]">{solution.summary}</p>
                </div>
                <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#00868b]">
                  <span>View solution</span>
                  <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
              ) : null,
            )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8fa] py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] shadow-[0_24px_54px_rgba(12,27,48,0.11)]">
            <Image
              src="/images/products/gift-sets.jpg"
              alt="Drinkware packaging and customization proof"
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081320]/52 via-transparent to-transparent" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
              Capability Proof
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
              Streamlining Your Path to Market
            </h2>
            <div className="mt-8 space-y-5">
              {SOLUTIONS_HUB.capabilityProof.map((proof, index) => (
                <div key={proof} className="flex gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00868b]/12 text-[#00868b]">
                    <CapabilityIcon index={index} className="h-7 w-7" />
                  </span>
                  <p className="text-sm leading-7 text-[#5f6d78] sm:text-base">{proof}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
              Workflow
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
              A Streamlined Path to Market Excellence.
            </h2>
          </div>

          <div className="relative mt-12">
            <div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-[linear-gradient(90deg,rgba(0,134,139,0.18)_0%,rgba(0,134,139,0.34)_35%,rgba(0,134,139,0.34)_65%,rgba(0,134,139,0.18)_100%)] md:block" />
            <div className="grid gap-5 md:grid-cols-4">
            {SOLUTIONS_HUB.workflow.map((item) => (
              <div key={item.step} className="relative rounded-[4px] border border-[#bfd2dc] bg-[linear-gradient(180deg,#ffffff_0%,#f9fcfd_100%)] px-5 pb-6 pt-5 shadow-[0_18px_38px_rgba(12,27,48,0.06)]">
                <div className="flex min-h-[3.5rem] items-start">
                  <div className="inline-flex items-center">
                    <span className="inline-flex h-12 min-w-[3.4rem] items-center justify-center rounded-full border border-[#0a6d72] bg-[#0a6d72] px-4 text-sm font-bold tracking-[0.18em] text-white shadow-[0_12px_24px_rgba(10,109,114,0.16)]">
                      {item.step}
                    </span>
                  </div>
                </div>
                <h3 className="mt-2.5 text-xl font-semibold leading-[1.15] text-[#333333]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#666666]">{item.text}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8fa] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
                Product Bridge
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
                Explore Our Curated Product Portfolios.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#667781] sm:text-base">
                Retail-ready collections spanning hydration, tableware, gifting, and hospitality programs, selected to support modern global sourcing.
              </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {bridgeCategories.map((category) => (
              <Link
                key={category.slug}
                href={getCategoryHref(category.slug)}
                className="group relative aspect-[4/3] overflow-hidden rounded-[4px] bg-[#081827] shadow-[0_16px_36px_rgba(8,24,39,0.08)]"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover opacity-82 transition-transform duration-500 group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081320]/92 via-[#081320]/20 to-transparent transition-opacity duration-300 group-hover:from-[#081320]/94 group-hover:via-[#081320]/34" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/78">{category.description}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#dff6f4]">
                    <span>View Collection</span>
                    <ArrowIcon className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-[4px] border border-[#8dc7ca] bg-white px-6 py-3 text-sm font-semibold text-[#0a6d72] shadow-[0_12px_28px_rgba(8,24,39,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0a6d72] hover:bg-[#f4fbfb]"
            >
              <span>Explore all products</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#eef4f6] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[6px] border border-[#c6d8e0] bg-[linear-gradient(135deg,#0b1d2f_0%,#0c2437_56%,#123447_100%)] text-white shadow-[0_26px_60px_rgba(7,24,39,0.14)]">
            <div className="grid items-center gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-12 lg:py-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#35b9bd]">
                  Start A Project
                </p>
                <h2 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Share your brief, and we will align product, branding, and delivery around your launch goals.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c8d6de] sm:text-base">
                  Tell us the category, target quantity, decoration requirements, packaging direction, and timing. We can quickly map the right product path, MOQ, sampling plan, and export workflow.
                </p>
              </div>
              <Link href="/#contact" className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#11939a] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(17,147,154,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0d7e84]">
                <span>Start Your Custom Project</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
