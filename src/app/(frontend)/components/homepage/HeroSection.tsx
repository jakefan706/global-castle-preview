'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HERO_BANNERS = [
  '/images/banner1.webp',
  '/images/banner2.webp',
  '/images/banner3.webp',
  '/images/banner4.webp',
] as const

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentBanner, setCurrentBanner] = useState(0)
  const [previousBanner, setPreviousBanner] = useState<number | null>(null)
  const [scrollParallax, setScrollParallax] = useState({ media: 0, content: 0 })

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentBanner((current) => {
        setPreviousBanner(current)
        return (current + 1) % HERO_BANNERS.length
      })
    }, 6000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (previousBanner === null) return

    const timer = window.setTimeout(() => {
      setPreviousBanner(null)
    }, 1500)

    return () => window.clearTimeout(timer)
  }, [previousBanner])

  useEffect(() => {
    let frame = 0
    let currentMedia = 0
    let currentContent = 0

    const updateParallax = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1
      const travelBase = Math.max(Math.min(rect.height, viewportHeight), 1)
      const rawProgress = Math.min(Math.max((-rect.top) / (travelBase * 0.85), 0), 1.15)

      const targetMedia = rawProgress * -180
      const delayedProgress = rawProgress <= 0.32 ? 0 : (rawProgress - 0.32) / 0.68
      const targetContent = Math.min(delayedProgress, 1) * -96

      currentMedia += (targetMedia - currentMedia) * 0.16
      currentContent += (targetContent - currentContent) * 0.12

      const mediaDone = Math.abs(targetMedia - currentMedia) < 0.2
      const contentDone = Math.abs(targetContent - currentContent) < 0.2

      setScrollParallax({
        media: Number(currentMedia.toFixed(2)),
        content: Number(currentContent.toFixed(2)),
      })

      if (!mediaDone || !contentDone) {
        frame = window.requestAnimationFrame(updateParallax)
      } else {
        frame = 0
      }
    }

    const handleScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateParallax)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative flex min-h-[66vh] items-center justify-center overflow-hidden lg:min-h-[68vh]">
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${scrollParallax.media}px, 0)` }}
      >
        {previousBanner !== null ? (
          <div key={`previous-${previousBanner}`} className="hero-zoom-slide-previous absolute inset-0 overflow-hidden">
            <Image
              src={HERO_BANNERS[previousBanner]}
              alt="UrbanEco OEM and ODM manufacturing showcase"
              fill
              sizes="100vw"
              className="hero-zoom-slide-image object-cover"
            />
          </div>
        ) : null}

        <div key={`current-${currentBanner}`} className="hero-zoom-slide-current absolute inset-0 overflow-hidden">
          <Image
            src={HERO_BANNERS[currentBanner]}
            alt="UrbanEco OEM and ODM manufacturing showcase"
            fill
            priority={currentBanner === 0}
            sizes="100vw"
            className="hero-zoom-slide-image object-cover"
          />
        </div>
      </div>

      <div className="hero-overlay absolute inset-0" />

      <div
        className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center will-change-transform sm:px-6 lg:px-8 lg:py-28"
        style={{ transform: `translate3d(0, ${scrollParallax.content}px, 0)` }}
      >
        <h1 className="hero-title hero-title-readable mb-6 text-4xl font-bold leading-tight text-[#e6eaee] sm:text-5xl lg:text-6xl xl:text-[5.25rem] text-balance">
          Your Strategic OEM/ODM Partner
          <span className="block text-[#00868b]">for Drinkware & Tableware</span>
        </h1>

        <div className="hero-subtitle-panel mx-auto mb-10 max-w-3xl px-5 py-4 sm:px-6">
          <p className="hero-subtitle mb-0 text-lg text-[#d5dde4] sm:text-xl text-pretty">
            Expert manufacturing across a diverse range of stainless steel, ceramic, and dining
            essentials. We provide retail-ready excellence for wholesalers and global chains,
            backed by 20 years of industry expertise.
          </p>
        </div>

        <div className="hero-cta flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/products" className="btn-primary hero-cta-button hero-cta-primary px-9 py-4 text-base">
            View Products
          </Link>
          <Link href="/resources#download-center" className="btn-white hero-cta-button hero-cta-secondary px-9 py-4 text-base">
            Request Catalog 2026
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {HERO_BANNERS.map((banner, index) => (
            <button
              key={banner}
              type="button"
              aria-label={`Show banner ${index + 1}`}
              onClick={() => setCurrentBanner(index)}
              className={`h-1.5 rounded-[4px] transition-all duration-300 ${
                index === currentBanner ? 'w-8 bg-[#00868b]' : 'w-2 bg-[#d5dde4]/70'
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce lg:block">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/50 p-1">
            <div className="h-2 w-1 rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </section>
  )
}
