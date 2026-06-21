import Image from 'next/image'
import Link from 'next/link'

import ProductGallery from './ProductGallery'
import ProductInquiryForm from './ProductInquiryForm'

type ProductDetailData = {
  id: number | string | null
  slug: string
  name: string
  itemNumber: string
  material: string
  customizeMOQ: string
  categoryName: string
  categorySlug: string
  capacityLabel: string
  applications: string[]
  mainImage: {
    alt: string
    url: string
  }
  gallery: Array<{
    alt: string
    url: string
  }>
  featureBullets: string[]
  specs: Array<{ label: string; value: string }>
  logoMethods: string[]
  finishOptions: string[]
  packagingOptions: string[]
  relatedCategories: Array<{ name: string; slug: string; image: string; productSlug?: string }>
  inquiryMessage: string
}

function FeatureCards() {
  const cards = [
    {
      title: 'Durable Double-Wall Construction',
      description:
        'Vacuum-insulated stainless steel formats built for gifting, coffee programs, and repeat commercial sourcing.',
      icon: (
        <>
          <path d="M7.5 4.5h9v4.8c0 4.8-1.9 8.2-4.5 9.7-2.6-1.5-4.5-4.9-4.5-9.7V4.5Z" />
          <path d="M9.8 4.5v4.3c0 3.5.9 6.1 2.2 7.8 1.3-1.7 2.2-4.3 2.2-7.8V4.5" />
          <path d="M7.5 8h9" />
          <path d="M9.3 20h5.4" />
        </>
      ),
    },
    {
      title: 'Custom Surface Finishes',
      description:
        'Powder coat, matte, gloss, metallic, and gradient directions help align each program with its brand language.',
      icon: (
        <>
          <path d="M6 15.5 12.5 9l5.5 5.5-6.5 6.5L6 15.5Z" />
          <path d="M9.2 12.3 15.7 18.8" />
          <path d="M14.6 6.9 17 4.5l2.5 2.5L17 9.4" />
          <path d="M5 19.5h6.5" />
        </>
      ),
    },
    {
      title: 'Logo Decoration Options',
      description:
        'Laser engraving, UV print, silkscreen, and transfer decoration are ready for distributor and private-label briefs.',
      icon: (
        <>
          <path d="M5.5 6.5h9.5v9.5H5.5z" />
          <path d="M8.2 9.4h4.1" />
          <path d="M8.2 12.2h4.1" />
          <path d="M16.2 7.8h2.8v2.8" />
          <path d="m19 5-5.2 5.2" />
          <path d="M4.8 19h14.4" />
        </>
      ),
    },
    {
      title: 'Retail-Ready Packaging',
      description:
        'Flexible packing from bulk master cartons to gift boxes and branded retail presentation formats.',
      icon: (
        <>
          <path d="M4.8 8.3 12 4.8l7.2 3.5L12 12 4.8 8.3Z" />
          <path d="M4.8 8.3v7.9L12 19.7l7.2-3.5V8.3" />
          <path d="M12 12v7.7" />
          <path d="M7.9 6.4 15 9.9" />
          <path d="M8.1 14.2h3.2" />
        </>
      ),
    },
  ]

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
            Product Advantages
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
            Built for B2B drinkware programs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#666666] sm:text-base">
            Engineered for dependable sourcing, customization, and presentation across retail, gifting, and campaign orders.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group rounded-[4px] border border-[#cfdde7] bg-[#edf5f8] p-6 shadow-[0_16px_36px_rgba(12,27,48,0.06)] transition-all duration-300 hover:scale-[1.018] hover:border-[#8ec9c7] hover:bg-[#e1f0f3] hover:shadow-[0_22px_46px_rgba(12,27,48,0.14)]"
            >
              <div className="mb-6 text-[#00757a] transition-transform duration-300 group-hover:scale-[1.02]">
                <svg viewBox="0 0 24 24" fill="none" className="h-14 w-14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {card.icon}
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#333333]">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#666666]">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CustomizationSection({
  logoMethods,
  finishOptions,
  packagingOptions,
}: Pick<ProductDetailData, 'logoMethods' | 'finishOptions' | 'packagingOptions'>) {
  const groups = [
    { label: 'Logo Methods', values: logoMethods },
    { label: 'Packaging Options', values: packagingOptions },
  ]

  return (
    <section className="bg-[#f5f8fa] py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-8">
        <div className="space-y-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] shadow-[0_24px_54px_rgba(12,27,48,0.1)]">
            <Image
              src="/images/banner-sample-2560x900.jpg"
              alt="Drinkware customization and finishing capability"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081320]/50 via-transparent to-transparent" />
          </div>

          <a
            href="#inquiry"
            className="inline-flex cursor-pointer items-center gap-2 rounded-[4px] border border-[#00868b] bg-white px-5 py-3 text-sm font-semibold text-[#00868b] shadow-[0_12px_26px_rgba(12,27,48,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#006d72] hover:text-[#00757a] hover:shadow-[0_16px_30px_rgba(12,27,48,0.1)]"
          >
            <span>Start Your Custom Project</span>
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
            Customization
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
            Flexible customization for your brand
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#666666] sm:text-base">
            From surface finish to decoration and packaging, the page follows the v0 reference flow so buyers can quickly understand how this item scales into a complete program.
          </p>

          <div className="mt-8 space-y-8">
            {groups.map((group) => (
              <div key={group.label}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#333333]">
                  {group.label}
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {group.values.map((value) => (
                    <div key={value} className="flex items-center gap-3 text-sm text-[#666666]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00868b]/12 text-[#00868b]">
                        <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m4 10 4 4 8-8" />
                        </svg>
                      </span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#333333]">
                Finish Options
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {finishOptions.map((finish) => (
                  <span
                    key={finish}
                    className="rounded-[4px] border border-[#dbe4eb] bg-white px-3 py-2 text-sm text-[#4d5b68]"
                  >
                    {finish}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TechnicalSpecs({ specs }: Pick<ProductDetailData, 'specs'>) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
            Technical Specs
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
            Technical specifications
          </h2>
        </div>

        <div className="mx-auto max-w-3xl overflow-hidden rounded-[4px] border border-[#dbe4eb] bg-white shadow-[0_18px_48px_rgba(12,27,48,0.06)]">
          {specs.map((spec, index) => (
            <div
              key={`${spec.label}-${index}`}
              className={`flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
                index === specs.length - 1 ? '' : 'border-b border-[#e8eef3]'
              }`}
            >
              <span className="text-sm text-[#72808d]">{spec.label}</span>
              <span className="text-sm font-medium text-[#333333] sm:text-right">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RelatedCapabilities({ categories }: { categories: ProductDetailData['relatedCategories'] }) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
            Related Products
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
            More from the same category
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {categories.map((category) => {
            const href = category.productSlug
              ? `/products/${category.productSlug}`
              : `/products?category=${category.slug}`
            return (
              <Link
                key={category.productSlug || category.slug}
                href={href}
                className="group relative aspect-square overflow-hidden rounded-[4px]"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 768px) 22vw, 100vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-105 bg-[#f0f4f6]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081320]/82 via-[#081320]/16 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <h3 className="text-base font-semibold text-white">{category.name}</h3>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/16 text-white backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function ProductDetailPage({ product }: { product: ProductDetailData }) {
  return (
    <>
      <section className="bg-white pb-16 pt-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-[#7b8793]">
              <li>
                <Link href="/" className="transition-colors hover:text-[#00868b]">
                  Home
                </Link>
              </li>
              <li className="text-[#b5c0ca]">/</li>
              <li>
                <Link href="/products" className="transition-colors hover:text-[#00868b]">
                  Products
                </Link>
              </li>
              <li className="text-[#b5c0ca]">/</li>
              <li>
                <Link href={`/products?category=${product.categorySlug}`} className="transition-colors hover:text-[#00868b]">
                  {product.categoryName}
                </Link>
              </li>
              <li className="text-[#b5c0ca]">/</li>
              <li className="text-[#7b8793]">{product.itemNumber}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:gap-12">
            <ProductGallery images={product.gallery} title={product.name} />

            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00868b]">
                Product Detail
              </p>
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#333333] sm:text-3xl">
                {product.name}
              </h1>

              <div className="mt-6 space-y-2.5 border-b border-[#e5edf2] pb-5 text-sm">
                <div className="flex items-center gap-2">
                  <span className="min-w-[108px] text-[#7b8793]">Item Number:</span>
                  <span className="font-medium text-[#333333]">{product.itemNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="min-w-[108px] text-[#7b8793]">Material:</span>
                  <span className="font-medium text-[#333333]">{product.material}</span>
                </div>
                {product.capacityLabel ? (
                  <div className="flex items-center gap-2">
                    <span className="min-w-[108px] text-[#7b8793]">Capacity:</span>
                    <span className="font-medium text-[#333333]">{product.capacityLabel}</span>
                  </div>
                ) : null}
                {product.customizeMOQ ? (
                  <div className="flex items-center gap-2">
                    <span className="min-w-[108px] text-[#7b8793]">Min. Order:</span>
                    <span className="font-medium text-[#333333]">{product.customizeMOQ}</span>
                  </div>
                ) : null}
              </div>

              <div className="mt-6">
                <h2 className="text-sm font-semibold text-[#333333]">Features</h2>
                <ul className="mt-4 space-y-3">
                  {product.featureBullets.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6 text-[#666666]">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#00868b]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#inquiry"
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-[#00868b] bg-[#00868b] px-8 py-3.5 text-base font-semibold text-white shadow-[0_12px_26px_rgba(0, 134, 139,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#006d72] hover:shadow-[0_16px_28px_rgba(0, 134, 139,0.24)]"
                >
                  <span>Start Your Custom Project -&gt;</span>
                </a>
                <a
                  href="#technical-specs"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#00868b] transition-colors duration-200 hover:text-[#00868b]"
                >
                  <span>View technical specs</span>
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeatureCards />
      <CustomizationSection
        logoMethods={product.logoMethods}
        finishOptions={product.finishOptions}
        packagingOptions={product.packagingOptions}
      />
      <section id="technical-specs">
        <TechnicalSpecs specs={product.specs} />
      </section>
      <RelatedCapabilities categories={product.relatedCategories} />

      <section id="inquiry" className="bg-[#f5f8fa] py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:px-8">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
              Inquiry
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
              Ready to build your custom drinkware program?
            </h2>
            <p className="text-sm leading-7 text-[#666666] sm:text-base">
              Share your target market, branding requirement, and packaging direction. We can help you evaluate MOQ, finishing methods, and production feasibility.
            </p>

            <div className="space-y-4 pt-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-[#00868b]/10 text-[#00868b]">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 7h16v10H4z" />
                    <path d="m5 8 7 5 7-5" />
                  </svg>
                </div>
                <span className="text-sm text-[#333333]">info@globalcastle.com</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-[#00868b]/10 text-[#00868b]">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <span className="text-sm text-[#666666]">We usually respond within 24 hours.</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-[#00868b]/10 text-[#00868b]">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </div>
                <span className="text-sm text-[#666666]">Hangzhou, Zhejiang Province, China</span>
              </div>
            </div>
          </div>

          <ProductInquiryForm productId={product.id} defaultMessage={product.inquiryMessage} />
        </div>
      </section>
    </>
  )
}
