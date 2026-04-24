import Image from 'next/image'
import Link from 'next/link'

import { ALL_PRODUCT_CATEGORIES } from '../components/category-config'
import { getProductIndex } from '@/lib/products'

export const metadata = {
  title: 'Products | Global Castle',
  description:
    'Browse Global Castle drinkware products by category, compare key specifications, and move from sourcing review to product detail or inquiry.',
}

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

function FilterChip({
  href,
  label,
  active,
  isAllProducts = false,
}: {
  href: string
  label: string
  active: boolean
  isAllProducts?: boolean
}) {
  if (isAllProducts) {
    return (
      <Link
        href={href}
        className={`inline-flex items-center gap-2 rounded-[4px] border px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
          active
            ? 'border-[#00868b] bg-[#00868b] text-white'
            : 'border-[#9fb3be] bg-[#13232c] text-white hover:border-[#00868b] hover:bg-[#0f1d24]'
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            active ? 'bg-white' : 'bg-[#63d3d6]'
          }`}
        />
        <span>All Products</span>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
        active
          ? 'border-[#00868b] bg-[#00868b] text-white'
          : 'border-[#d3dde4] bg-white text-[#425563] hover:border-[#62aeb0] hover:text-[#006d72]'
      }`}
    >
      {label}
    </Link>
  )
}

type ProductsPageProps = {
  searchParams?: Promise<{
    category?: string
  }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const requestedCategory = resolvedSearchParams?.category?.trim() || ''
  const hasValidCategory = ALL_PRODUCT_CATEGORIES.some(
    (category) => category.slug === requestedCategory,
  )
  const activeCategory = hasValidCategory ? requestedCategory : ''

  const products = await getProductIndex()
  const filteredProducts = activeCategory
    ? products.filter((product) => product.categorySlug === activeCategory)
    : products

  const activeCategoryMeta = ALL_PRODUCT_CATEGORIES.find(
    (category) => category.slug === activeCategory,
  )

  return (
    <section className="min-h-screen bg-[#f4f8fa] pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#d5e1e7] pb-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#006d72]">
                Product Catalog
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#13232c] sm:text-5xl">
                A working product directory for B2B drinkware sourcing.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5a6d79] sm:text-base">
                Review categories, compare key commercial specs, and move into the product detail
                page once a format looks relevant for your program.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#13232c] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0b151b]"
              >
                <span>Start Project Inquiry</span>
                <ArrowIcon />
              </Link>
              <div className="rounded-[4px] border border-[#d5e1e7] bg-white px-5 py-3 text-sm text-[#5a6d79]">
                <span className="font-semibold text-[#13232c]">{filteredProducts.length}</span>{' '}
                products
                {activeCategoryMeta ? ` in ${activeCategoryMeta.name}` : ' across all categories'}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-[#d5e1e7] py-6">
          <div className="flex flex-wrap gap-3">
            <FilterChip
              href="/products"
              label="All Products"
              active={!activeCategory}
              isAllProducts
            />
            {ALL_PRODUCT_CATEGORIES.map((category) => (
              <FilterChip
                key={category.slug}
                href={`/products?category=${category.slug}`}
                label={category.name}
                active={activeCategory === category.slug}
              />
            ))}
          </div>
        </div>

        <div className="py-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#006d72]">
                Results Workspace
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#13232c] sm:text-3xl">
                {activeCategoryMeta ? activeCategoryMeta.name : 'All product entries'}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#5a6d79]">
              Start by checking category fit, item number, material, capacity, and MOQ. If a SKU
              looks close, open the detail page for specifications, customization, and inquiry.
            </p>
          </div>

          {filteredProducts.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <article
                  key={product.slug}
                  className="grid overflow-hidden rounded-[4px] border border-[#d7e1e7] bg-white shadow-[0_16px_36px_rgba(10,32,46,0.05)]"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group relative block aspect-square overflow-hidden bg-[#eaf2f5]"
                  >
                    <Image
                      src={product.mainImage.url}
                      alt={product.mainImage.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#091923]/82 via-[#091923]/16 to-transparent p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9fe0e2]">
                        {product.categoryName}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">{product.name}</h3>
                    </div>
                  </Link>

                  <div className="grid gap-5 p-6">
                    <div className="grid gap-3 text-sm text-[#4f6470] sm:grid-cols-2">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a9aa5]">
                          Item Number
                        </p>
                        <p className="mt-1 font-medium text-[#13232c]">{product.itemNumber}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a9aa5]">
                          Material
                        </p>
                        <p className="mt-1 font-medium text-[#13232c]">{product.material}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a9aa5]">
                          Capacity
                        </p>
                        <p className="mt-1 font-medium text-[#13232c]">
                          {product.capacityLabel || 'To be confirmed'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a9aa5]">
                          Customize MOQ
                        </p>
                        <p className="mt-1 font-medium text-[#13232c]">
                          {product.customizeMOQ || 'Discuss project scope'}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[4px] border border-[#d5e1e7] bg-white p-8 shadow-[0_16px_36px_rgba(10,32,46,0.05)] sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#006d72]">
                No Matching Products
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#13232c]">
                No product entries were found for this category filter.
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5a6d79]">
                Clear the filter to review the full catalog, or start an inquiry if you already
                know the product direction, quantity, branding, and packaging requirements.
              </p>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#13232c] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0b151b]"
                >
                  <span>Clear filter</span>
                  <ArrowIcon />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-[#cdd9df] px-6 py-3 text-sm font-semibold text-[#006d72] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#62aeb0]"
                >
                  <span>Start inquiry</span>
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-[4px] border border-[#d5e1e7] bg-white p-6 shadow-[0_16px_36px_rgba(10,32,46,0.05)] sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#006d72]">
                Catalog Guidance
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#13232c] sm:text-3xl">
                Use the catalog to narrow direction, then switch to detail or inquiry at the right
                moment.
              </h2>
            </div>
            <div className="grid gap-4 text-sm leading-7 text-[#5a6d79] sm:grid-cols-2">
              <p>
                Open the product detail page when you want specifications, feature positioning,
                packaging options, and related category context.
              </p>
              <p>
                Start a direct inquiry when you already know the target category, quantity,
                branding method, or packaging requirements and want a practical response.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
