import Image from 'next/image'
import Link from 'next/link'

import { FEATURED_CATEGORY_CARDS, getCategoryHref } from '../category-config'
import { SOLUTION_PAGES, type SolutionPageData } from './solutions-data'

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

export default function SolutionDetailPage({ solution }: { solution: SolutionPageData }) {
  const relatedCategories = FEATURED_CATEGORY_CARDS.filter((category) =>
    solution.relatedCategorySlugs.includes(category.slug),
  )
  const adjacentSolutions = SOLUTION_PAGES.filter((item) => item.slug !== solution.slug).slice(0, 3)

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#081827] pt-28 text-white sm:pt-32">
        <Image
          src={solution.heroImage}
          alt={`${solution.title} by Global Castle`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-48"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,19,32,0.94)_0%,rgba(7,19,32,0.72)_54%,rgba(7,19,32,0.26)_100%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <nav className="mb-10" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/62">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/solutions" className="transition-colors hover:text-white">
                  Solutions
                </Link>
              </li>
              <li>/</li>
              <li className="text-white/82">{solution.shortTitle}</li>
            </ol>
          </nav>

          <div className="max-w-3xl animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#67c0bf]">
              {solution.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {solution.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d8e3ea] sm:text-lg">
              {solution.summary}
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/#contact" className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#67c0bf] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(103,192,191,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5ab0af]">
                <span>Start Your Custom Project</span>
                <ArrowIcon />
              </Link>
              <Link href="/solutions" className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-white/34 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/16">
                <span>Back to Solutions</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#67c0bf]">
              Program Focus
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
              A focused capability for practical B2B drinkware sourcing.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#666666] sm:text-base">
              {solution.intro}
            </p>
          </div>

          <div className="space-y-4">
            {solution.priorities.map((priority, index) => (
              <div key={priority} className="flex gap-4 border-b border-[#e3edf3] pb-4 last:border-b-0">
                <span className="text-sm font-bold text-[#67c0bf]">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-sm leading-7 text-[#4f5f6b] sm:text-base">{priority}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8fa] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#67c0bf]">
              What We Support
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
              Clear decisions before sampling and production.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {solution.proofPoints.map((point) => (
              <div key={point.label} className="rounded-[4px] border border-[#dbe5ec] bg-white p-6 shadow-[0_16px_36px_rgba(12,27,48,0.05)]">
                <h3 className="text-lg font-semibold text-[#333333]">{point.label}</h3>
                <p className="mt-3 text-sm leading-7 text-[#666666]">{point.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#67c0bf]">
                Related Product Ranges
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
                Start from a product category that fits this solution.
              </h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4eaead] transition-colors duration-200 hover:text-[#3f9998]">
              <span>View all products</span>
              <ArrowIcon />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {relatedCategories.map((category) => (
              <Link
                key={category.slug}
                href={getCategoryHref(category.slug)}
                className="group overflow-hidden rounded-[4px] border border-[#dbe5ec] bg-white transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(12,27,48,0.08)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#edf5f8]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#333333]">{category.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#666666]">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#081827] py-20 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#67c0bf]">
                More Solutions
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Keep building the full program around your sourcing brief.
              </h2>
              <Link href="/#contact" className="mt-7 inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#67c0bf] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(103,192,191,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5ab0af]">
                <span>Start an Inquiry</span>
                <ArrowIcon />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {adjacentSolutions.map((item) => (
                <Link
                  key={item.slug}
                  href={`/solutions/${item.slug}`}
                  className="rounded-[4px] border border-white/12 bg-white/[0.06] p-5 transition-all duration-250 hover:border-[#67c0bf]/60 hover:bg-white/[0.1]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#67c0bf]">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-3 text-base font-semibold text-white">{item.shortTitle}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#c5d1da]">{item.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
