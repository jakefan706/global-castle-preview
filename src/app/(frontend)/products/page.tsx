import Image from 'next/image'
import Link from 'next/link'

import { getProductIndex } from '@/lib/products'

export const metadata = {
  title: 'Products | Global Castle',
  description:
    'Browse Global Castle drinkware products, including stainless steel tumblers, bottles, and custom OEM-ready formats.',
}

export default async function ProductsPage() {
  const products = await getProductIndex()

  return (
    <section className="bg-white pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#67c0bf]">
            Products
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#333333] sm:text-5xl">
            Explore Global Castle product detail pages
          </h1>
          <p className="mt-5 text-sm leading-7 text-[#666666] sm:text-base">
            This index is intentionally simple for now. Its main job is to restore navigability while we continue refining individual product detail pages.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group overflow-hidden rounded-[4px] border border-[#dde6ee] bg-white shadow-[0_16px_40px_rgba(12,27,48,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(12,27,48,0.09)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f1f6f8]">
                <Image
                  src={product.mainImage.url}
                  alt={product.mainImage.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#67c0bf]">
                  {product.categoryName}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-[#333333]">
                  {product.name}
                </h2>
                <div className="mt-4 space-y-2 text-sm text-[#666666]">
                  <p>
                    <span className="text-[#7b8793]">Item Number:</span> {product.itemNumber}
                  </p>
                  <p>
                    <span className="text-[#7b8793]">Material:</span> {product.material}
                  </p>
                  {product.capacityLabel ? (
                    <p>
                      <span className="text-[#7b8793]">Capacity:</span> {product.capacityLabel}
                    </p>
                  ) : null}
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#67c0bf]">
                  <span>View details</span>
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
