'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { FACILITY_SLIDES } from './homepage-data'
import { useScrollReveal } from '../../hooks/use-scroll-reveal'

export default function FacilitySection() {
  const [sectionRef, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.15 })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoRotate, setAutoRotate] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const carouselSlides = [...FACILITY_SLIDES, ...FACILITY_SLIDES]

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)')

    const syncAutoRotate = () => {
      setAutoRotate(mediaQuery.matches)
    }

    syncAutoRotate()
    mediaQuery.addEventListener('change', syncAutoRotate)

    return () => {
      mediaQuery.removeEventListener('change', syncAutoRotate)
    }
  }, [])

  useEffect(() => {
    if (!autoRotate) return

    const id = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % FACILITY_SLIDES.length)
    }, 5200)

    return () => window.clearInterval(id)
  }, [autoRotate])

  useEffect(() => {
    const track = trackRef.current
    const target = track?.querySelector<HTMLElement>(`[data-slide="${currentSlide}"]`)

    if (!track || !target) return

    track.scrollTo({
      left: target.offsetLeft,
      behavior: autoRotate ? 'smooth' : 'auto',
    })
  }, [autoRotate, currentSlide])

  return (
    <section ref={sectionRef} className="overflow-hidden bg-white py-20 lg:py-28">
      <div
        className={`mx-auto max-w-7xl px-4 text-center transition-all duration-700 sm:px-6 lg:px-8 ${
          isVisible ? 'opacity-100' : 'opacity-100'
        }`}
        style={{ transform: 'translateY(0)' }}
        >
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#00868b]">
          Manufacturing & OEM/ODM
        </p>
        <h2 className="mx-auto max-w-3xl text-3xl font-bold text-[#333333] sm:text-4xl">
          Advanced Manufacturing & Integrated Solutions
        </h2>
        <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-[#666666]">
          A versatile production ecosystem designed for high-volume OEM/ODM projects. From
          precision molding and custom decoration to rigorous quality control, we ensure every
          piece of drinkware and tableware meets the highest retail standards.
        </p>
      </div>

      <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 lg:mt-14">
        <div ref={trackRef} className="overflow-x-hidden">
          <div className="flex gap-2 px-0 sm:gap-3">
            {carouselSlides.map((slide, index) => {
              const realIndex = index % FACILITY_SLIDES.length

              return (
                <div
                  key={`${slide.title}-${index}`}
                  data-slide={realIndex}
                  className={`gc-facility-slide group relative h-[320px] min-w-[76vw] overflow-hidden rounded-[4px] sm:h-[390px] sm:min-w-[48vw] lg:h-[460px] lg:min-w-[30vw] 2xl:h-[520px] 2xl:min-w-[25vw] ${
                    realIndex === currentSlide ? 'is-active' : ''
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 30vw, (min-width: 640px) 48vw, 76vw"
                    className="rounded-[4px] object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2135]/72 via-[#0f2135]/12 to-transparent opacity-45 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="gc-facility-caption absolute inset-x-0 bottom-0 px-5 py-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/72">
                      Process
                    </p>
                    <p className="mt-2 text-lg font-semibold sm:text-xl">{slide.title}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
