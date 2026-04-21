'use client'

import Image from 'next/image'
import Link from 'next/link'

import { FEATURED_CATEGORY_CARDS } from './homepage-data'
import { useScrollReveal, useStaggeredReveal } from '../../hooks/use-scroll-reveal'

function ArrowUpRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ProductsSection() {
  const [sectionRef, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.05 })
  const delays = useStaggeredReveal(FEATURED_CATEGORY_CARDS.length, 100)
  const shouldAnimate = isVisible

  return (
    <section ref={sectionRef} id="products" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2
            className="mb-4 text-3xl font-bold text-[#333333] transition-all duration-700 sm:text-4xl opacity-100"
            style={{ transform: 'translateY(0)' }}
          >
            Products
          </h2>
          <p
            className="mx-auto max-w-2xl text-[#666666] transition-all duration-700 delay-100 opacity-100"
            style={{ transform: 'translateY(0)' }}
          >
            A capability-first homepage should spotlight the core drinkware categories buyers ask
            about most often, while keeping the path to deeper product conversations simple.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-3 lg:gap-8">
          {FEATURED_CATEGORY_CARDS.map((product, index) => (
            <Link
              key={product.slug}
              href={`/products?category=${product.slug}`}
              className={`gc-product-card group relative aspect-square overflow-hidden rounded-[4px] transition-all duration-700 ${
                shouldAnimate ? 'opacity-100' : 'opacity-100'
              }`}
              style={{
                transform: shouldAnimate ? 'translateY(0)' : 'translateY(0)',
                transitionDelay: `${shouldAnimate ? delays[index] : 0}ms`,
              }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4 lg:p-6">
                <h3 className="mb-1 text-lg font-semibold text-white lg:text-xl">{product.name}</h3>
                <p className="line-clamp-3 text-sm text-white/80 transition-opacity duration-300 group-hover:opacity-100 lg:opacity-0">
                  {product.description}
                </p>
              </div>

              <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-[4px] bg-white/0 transition-all duration-300 group-hover:bg-white">
                <ArrowUpRightIcon className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-[#67c0bf]" />
              </div>
            </Link>
          ))}
        </div>

        <div
          className="mt-12 text-center transition-all duration-700 delay-500 opacity-100"
          style={{ transform: 'translateY(0)' }}
        >
          <Link
            href="/products"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm text-white"
          >
            <span>Explore All 11 Categories</span>
            <ArrowUpRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
