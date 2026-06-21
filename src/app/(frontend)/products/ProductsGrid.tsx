'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

type ProductCard = {
  slug: string
  name: string
  itemNumber: string
  material: string
  capacityLabel: string
  customizeMOQ: string
  categoryName: string
  inquiryMessage: string
  mainImage: {
    url: string
    alt: string
  }
  cardSceneImage: {
    url: string
    alt: string
  }
  cardBadges: Array<{
    label: string
    tone: 'orange' | 'blue'
  }>
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

function buildInquiryHref(product: ProductCard) {
  const params = new URLSearchParams({
    product: product.name,
    item: product.itemNumber,
    message: product.inquiryMessage,
  })

  return `/contact?${params.toString()}#project-inquiry`
}

export default function ProductsGrid({ products }: { products: ProductCard[] }) {
  const router = useRouter()
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  const inquiryHrefMap = useMemo(
    () =>
      new Map(
        products.map((product) => [product.slug, buildInquiryHref(product)]),
      ),
    [products],
  )

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => {
        const isHovered = hoveredSlug === product.slug
        const inquiryHref = inquiryHrefMap.get(product.slug) || '/contact#project-inquiry'
        return (
          <article
            key={product.slug}
            className="grid overflow-hidden rounded-[4px] border border-[#d7e1e7] bg-white shadow-[0_16px_36px_rgba(10,32,46,0.05)] transition-transform duration-200 hover:-translate-y-1"
          >
            <div
              className="group relative aspect-square cursor-pointer overflow-hidden bg-[#eaf2f5]"
              onMouseEnter={() => setHoveredSlug(product.slug)}
              onMouseLeave={() => setHoveredSlug((current) => (current === product.slug ? null : current))}
              onClick={() => router.push(`/products/${product.slug}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  router.push(`/products/${product.slug}`)
                }
              }}
              aria-label={`View details for ${product.name}`}
            >
              <Image
                src={product.mainImage.url}
                alt={product.mainImage.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                className={`object-contain p-3 transition-all duration-500 ${isHovered ? 'scale-[1.04] opacity-0' : 'scale-100 opacity-100'}`}
              />
              <Image
                src={product.cardSceneImage.url}
                alt={product.cardSceneImage.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                className={`object-contain p-3 transition-all duration-500 ${isHovered ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'}`}
              />

              {product.cardBadges.length ? (
                <div className="absolute right-4 top-4 z-30">
                  <div className="flex flex-col items-end gap-2">
                    {product.cardBadges.map((badge) => {
                      const badgeClasses =
                        badge.tone === 'orange' ? 'bg-[#ff8d3a] text-white' : 'bg-[#14314b] text-white'

                      return (
                        <span
                          key={`${product.slug}-${badge.label}`}
                          className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${badgeClasses}`}
                        >
                          {badge.label}
                        </span>
                      )
                    })}
                  </div>
                </div>
              ) : null}

              <div
                className={`absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(9,25,35,0.08)_0%,rgba(9,25,35,0.82)_100%)] transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              />

              <div className="absolute inset-x-0 bottom-0 z-20 p-5">
                <div
                  className={`transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
                >
                  <Link
                    href={inquiryHref}
                    className="relative z-30 inline-flex items-center gap-2 rounded-[4px] bg-white px-4 py-2.5 text-sm font-semibold text-[#13232c] transition-all duration-200 hover:bg-[#dff4f4]"
                    onClick={(event) => {
                      event.stopPropagation()
                    }}
                  >
                    <span>Request a Sample</span>
                    <ArrowIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-3 p-4">
              <h3 className="text-base font-semibold text-[#13232c] leading-snug">{product.name}</h3>
              <div className="grid gap-2.5 text-[13px] text-[#4f6470] sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a9aa5]">
                    Item Number
                  </p>
                  <p className="mt-0.5 leading-5 font-medium text-[#13232c]">{product.itemNumber}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a9aa5]">
                    Material
                  </p>
                  <p className="mt-0.5 leading-5 font-medium text-[#13232c]">{product.material}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a9aa5]">
                    Capacity
                  </p>
                  <p className="mt-0.5 leading-5 font-medium text-[#13232c]">
                    {product.capacityLabel || 'To be confirmed'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a9aa5]">
                    Min. Order
                  </p>
                  <p className="mt-0.5 leading-5 font-medium text-[#13232c]">
                    1500 PCS
                  </p>
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
