'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CATEGORIES = [
  { name: 'Stainless Steel Bottles', slug: 'stainless-steel' },
  { name: 'Aluminum Bottles', slug: 'aluminum' },
  { name: 'Plastic Bottles', slug: 'plastic' },
  { name: 'Ceramic Mugs', slug: 'ceramic' },
  { name: 'Glass Bottles', slug: 'glass' },
  { name: 'Tumblers', slug: 'tumblers' },
  { name: 'Travel Mugs', slug: 'travel-mugs' },
  { name: 'Sports Bottles', slug: 'sports' },
  { name: 'Kids Bottles', slug: 'kids' },
  { name: 'Eco-Friendly', slug: 'eco-friendly' },
  { name: 'Custom Drinkware', slug: 'custom' },
]

const NAV_LINKS = [
  { label: 'Home', href: '/', icon: 'home', hasDropdown: false },
  { label: 'Products', href: '/products', icon: 'grid', hasDropdown: true },
  { label: 'Solutions', href: '/solutions', icon: 'spark', hasDropdown: false },
  { label: 'Resources', href: '/resources', icon: 'book', hasDropdown: false },
  { label: 'Blog', href: '/blog', icon: 'pen', hasDropdown: false },
  { label: 'About Us', href: '/about', icon: 'company', hasDropdown: false },
  { label: 'Contact', href: '/contact', icon: 'mail', hasDropdown: false },
] as const

function NavIcon({
  type,
  className = '',
}: {
  type: (typeof NAV_LINKS)[number]['icon']
  className?: string
}) {
  if (type === 'home') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 10.5 12 4l8 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 10v8.5h11V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (type === 'grid') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="4" y="4" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="4" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="4" y="14" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="14" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  }

  if (type === 'spark') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    )
  }

  if (type === 'book') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M6 5.5A2.5 2.5 0 0 1 8.5 3H20v16H8.5A2.5 2.5 0 0 0 6 21.5V5.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M6 5.5V20a1 1 0 0 0 1 1h1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'pen') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="m14 5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 20l4.5-1 9.7-9.7a1.8 1.8 0 0 0 0-2.6l-.9-.9a1.8 1.8 0 0 0-2.6 0L5 15.5 4 20Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    )
  }

  if (type === 'company') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 20V6.5A1.5 1.5 0 0 1 5.5 5H14v15" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 9H19.5A1.5 1.5 0 0 1 21 10.5V20" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 9h2M8 13h2M8 17h2M16.5 13H18M16.5 17H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m5 7 7 5 7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setDropdownOpen(true)
  }

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 100)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/94 backdrop-blur-md shadow-[0_8px_30px_rgba(12,28,46,0.08)]'
            : 'bg-[#071827]/28 backdrop-blur-md shadow-[0_10px_32px_rgba(7,24,39,0.12)]'
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-3 sm:px-4 lg:px-6">
          <div className="grid h-14 grid-cols-[auto_1fr_auto] items-center lg:h-16">
            <Link href="/" className="flex items-center gap-3 justify-self-start">
              <Image
                src="/images/logo-transparent-v2.png"
                alt="Global Castle Industrial"
                width={148}
                height={42}
                className={`h-7.5 w-auto object-contain transition-opacity duration-300 lg:h-8.5 ${
                  scrolled ? 'opacity-100' : 'opacity-95'
                }`}
                priority
              />
            </Link>

            <nav className="hidden justify-self-center lg:flex items-center justify-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      className={`group flex items-center gap-2 rounded-[4px] px-4 py-2.5 text-[15px] xl:text-[16px] font-semibold tracking-[-0.01em] transition-all duration-250 ${
                        scrolled ? 'text-[#2a3d4e]' : 'text-white'
                      } hover:bg-white/10 hover:text-[#67c0bf]`}
                    >
                      <span className="inline-flex h-5 w-5 items-center justify-center overflow-hidden">
                        <NavIcon
                          type={link.icon}
                          className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                        />
                      </span>
                      <span className="whitespace-nowrap">{link.label}</span>
                      <svg
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.4}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div
                      className={`absolute top-full left-1/2 mt-1 w-72 -translate-x-1/2 rounded-[4px] border border-gray-100 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)] overflow-hidden origin-top transition-all duration-300 ${
                        dropdownOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
                      }`}
                    >
                      <div className="py-2">
                        <Link
                          href="/products"
                          className="block px-4 py-3 text-sm font-semibold text-[#67c0bf] transition-colors duration-150 hover:bg-[#f0fafa]"
                          onClick={() => setDropdownOpen(false)}
                        >
                          All Products →
                        </Link>
                        <div className="mx-4 my-1 h-px bg-gray-100" />
                        {CATEGORIES.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/products?category=${cat.slug}`}
                            className="block px-4 py-2.5 text-sm text-[#555] transition-colors duration-150 hover:bg-[#f0fafa] hover:text-[#67c0bf]"
                            onClick={() => setDropdownOpen(false)}
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`group flex items-center gap-2 rounded-[4px] px-4 py-2.5 text-[15px] xl:text-[16px] font-semibold tracking-[-0.01em] transition-all duration-250 ${
                      scrolled ? 'text-[#2a3d4e]' : 'text-white'
                    } hover:bg-white/10 hover:text-[#67c0bf]`}
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center overflow-hidden">
                      <NavIcon
                        type={link.icon}
                        className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                      />
                    </span>
                    <span className="whitespace-nowrap">{link.label}</span>
                  </Link>
                ),
              )}
            </nav>

            <button
              className={`justify-self-end rounded-[4px] p-2 transition-colors duration-150 lg:hidden ${
                scrolled ? 'text-[#333]' : 'text-white'
              }`}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-500 lg:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-50' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 z-50 flex w-80 max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-500 ease-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Global Castle Industrial" width={120} height={36} className="h-8 w-auto" />
          </div>
          <button
            className="p-2 text-[#666] transition-colors duration-150 hover:text-[#333]"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {NAV_LINKS.map((link) =>
            link.hasDropdown ? (
              <div key={link.label}>
                <button
                  className="flex w-full items-center justify-between px-6 py-3.5 text-base font-semibold text-[#333] transition-colors duration-150 hover:bg-[#f0fafa] hover:text-[#67c0bf]"
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                >
                  <span className="flex items-center gap-2">
                    <NavIcon type={link.icon} className="h-4.5 w-4.5" />
                    <span className="whitespace-nowrap">{link.label}</span>
                  </span>
                  <svg
                    className={`h-4 w-4 transition-transform duration-300 ${mobileProductsOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileProductsOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="bg-gray-50 py-1">
                    <Link
                      href="/products"
                      className="block px-8 py-2.5 text-sm font-semibold text-[#67c0bf]"
                      onClick={() => setMobileOpen(false)}
                    >
                      All Products →
                    </Link>
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/products?category=${cat.slug}`}
                        className="block px-8 py-2.5 text-sm text-[#666] transition-colors duration-150 hover:text-[#67c0bf]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-[#333] transition-colors duration-150 hover:bg-[#f0fafa] hover:text-[#67c0bf]"
                onClick={() => setMobileOpen(false)}
              >
                <NavIcon type={link.icon} className="h-4.5 w-4.5" />
                <span className="whitespace-nowrap">{link.label}</span>
              </Link>
            ),
          )}
        </nav>
      </div>
    </>
  )
}
