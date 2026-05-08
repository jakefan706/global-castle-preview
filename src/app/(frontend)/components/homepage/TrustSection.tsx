'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

import { CERTIFICATIONS, PARTNERS } from './homepage-data'
import { useScrollReveal, useStaggeredReveal } from '../../hooks/use-scroll-reveal'

export default function TrustSection() {
  const [sectionRef, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.1 })
  const certDelays = useStaggeredReveal(CERTIFICATIONS.length, 100)
  const partnerDelays = useStaggeredReveal(PARTNERS.length, 50)
  const shouldAnimate = isVisible
  const [offset, setOffset] = useState(0)
  const marqueePartners = useMemo(() => [...PARTNERS, ...PARTNERS], [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setOffset((current) => (current >= PARTNERS.length ? 0 : current + 1))
    }, 2200)

    return () => window.clearInterval(id)
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#f5f7fa] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <div className="mb-10 text-center">
            <h2
              className="mb-4 text-3xl font-bold text-[#333333] transition-all duration-700 sm:text-4xl opacity-100"
              style={{ transform: 'translateY(0)' }}
            >
              Global Compliance & Safety Standards
            </h2>
            <p
              className="mx-auto max-w-2xl text-[#666666] transition-all duration-700 delay-100 opacity-100"
              style={{ transform: 'translateY(0)' }}
            >
              Our commitment to quality is backed by rigorous international testing. From
              food-contact safety to social responsibility, we ensure every product meets the
              highest standards for the European and American markets.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {CERTIFICATIONS.map((cert, index) => (
              <div
                key={cert.name}
                className={`gc-card flex h-16 w-20 items-center justify-center rounded-[4px] bg-white p-3 transition-all duration-700 lg:h-20 lg:w-28 lg:p-4 ${
                  shouldAnimate ? 'opacity-100' : 'opacity-100'
                }`}
                style={{
                  transform: shouldAnimate ? 'translateY(0)' : 'translateY(0)',
                  transitionDelay: `${shouldAnimate ? certDelays[index] + 200 : 0}ms`,
                }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={cert.logo}
                    alt={`${cert.name} certification`}
                    fill
                    sizes="(min-width: 1024px) 112px, 80px"
                    className="object-contain grayscale transition-all duration-300 hover:grayscale-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-10 text-center">
            <h2
              className="mb-4 text-3xl font-bold text-[#333333] transition-all duration-700 sm:text-4xl opacity-100"
              style={{ transform: 'translateY(0)' }}
            >
              Trusted by Industry Leaders
            </h2>
            <p
              className="mx-auto max-w-2xl text-[#666666] transition-all duration-700 delay-100 opacity-100"
              style={{ transform: 'translateY(0)' }}
            >
              Supporting a diverse range of partners, from global distributors to specialty coffee
              chains, with reliable high-volume production and bespoke OEM solutions.
            </p>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-[1400ms] ease-out"
              style={{ transform: `translateX(calc(-${offset * 12.5}% - ${offset * 1}rem))` }}
            >
              {marqueePartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className={`gc-card min-w-[180px] flex-1 flex h-20 items-center justify-center rounded-[4px] bg-white p-4 transition-all duration-700 lg:h-24 lg:p-6 ${
                    shouldAnimate ? 'opacity-100' : 'opacity-100'
                  }`}
                  style={{
                    transform: shouldAnimate ? 'translateY(0)' : 'translateY(0)',
                    transitionDelay: `${shouldAnimate ? partnerDelays[index % PARTNERS.length] + 400 : 0}ms`,
                  }}
                >
                  <div className="relative h-10 w-full lg:h-12">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="(min-width: 1024px) 180px, 140px"
                      className="object-contain grayscale transition-all duration-300 hover:grayscale-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
