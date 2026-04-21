import Image from 'next/image'
import Link from 'next/link'

import { FEATURED_CATEGORY_CARDS, getCategoryHref } from '../category-config'
import { SOLUTION_PAGES, SOLUTIONS_HUB } from './solutions-data'

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

export default function SolutionsHubPage() {
  const bridgeCategories = FEATURED_CATEGORY_CARDS.slice(0, 6)

  return (
    <>
      <section className="relative isolate min-h-[76vh] overflow-hidden bg-[#081827] pt-24 text-white sm:pt-28">
        <Image
          src={SOLUTIONS_HUB.heroImage}
          alt="Global Castle drinkware customization and packaging capability"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,19,32,0.92)_0%,rgba(7,19,32,0.68)_46%,rgba(7,19,32,0.2)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#081827] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(76vh-6rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#67c0bf]">
              Custom Drinkware Solutions
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Built for distributors and brands that need more than a product list.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d8e3ea] sm:text-lg">
              Global Castle helps turn drinkware categories into brand-ready programs with practical support across product selection, customization, packaging, quality review, and delivery coordination.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/#contact" className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#67c0bf] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(103,192,191,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5ab0af]">
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
              <p className="text-3xl font-bold text-[#67c0bf]">{point.value}</p>
              <p className="mt-2 text-sm leading-6 text-[#c5d1da]">{point.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#67c0bf]">
              Support Model
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
              A practical path from category idea to shipment-ready program.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#666666] sm:text-base">
              The solutions page is organized around the capabilities buyers ask about most often: private label setup, branding, packaging, OEM/ODM development, and delivery coordination.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {SOLUTION_PAGES.map((solution) => (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="group rounded-[4px] border border-[#dbe5ec] bg-[#f7fafb] p-5 transition-all duration-250 hover:scale-[1.01] hover:border-[#9bcfce] hover:bg-white hover:shadow-[0_18px_40px_rgba(12,27,48,0.09)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#67c0bf]">
                  {solution.eyebrow}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[#333333]">{solution.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#666666]">{solution.summary}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#4eaead]">
                  <span>View solution</span>
                  <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
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
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#67c0bf]">
              Capability Proof
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
              Built around real decisions buyers need to make.
            </h2>
            <div className="mt-8 space-y-5">
              {SOLUTIONS_HUB.capabilityProof.map((proof) => (
                <div key={proof} className="flex gap-4">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#67c0bf]/12 text-[#67c0bf]">
                    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m4 10 4 4 8-8" />
                    </svg>
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
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#67c0bf]">
              Workflow
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
              From sourcing brief to shipment coordination.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {SOLUTIONS_HUB.workflow.map((item) => (
              <div key={item.step} className="border-l border-[#dce8ee] pl-5">
                <p className="text-sm font-bold text-[#67c0bf]">{item.step}</p>
                <h3 className="mt-4 text-xl font-semibold text-[#333333]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#666666]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8fa] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#67c0bf]">
                Product Bridge
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
                Connect each solution with a practical product range.
              </h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4eaead] transition-colors duration-200 hover:text-[#3f9998]">
              <span>Explore all products</span>
              <ArrowIcon />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {bridgeCategories.map((category) => (
              <Link
                key={category.slug}
                href={getCategoryHref(category.slug)}
                className="group relative aspect-[4/3] overflow-hidden rounded-[4px] bg-[#081827]"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover opacity-82 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081320]/88 via-[#081320]/16 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/78">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#081827] py-20 text-white lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#67c0bf]">
              Start A Project
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Share your target product, quantity, branding needs, and timing.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c5d1da] sm:text-base">
              We can help evaluate product fit, customization direction, packaging options, MOQ, and sample lead time.
            </p>
          </div>
          <Link href="/#contact" className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#67c0bf] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(103,192,191,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5ab0af]">
            <span>Start Your Custom Project</span>
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </>
  )
}
