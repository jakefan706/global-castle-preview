'use client'

import Image from 'next/image'

import { CERTIFICATIONS, PARTNERS } from './homepage-data'
import { useScrollReveal, useStaggeredReveal } from '../../hooks/use-scroll-reveal'

export default function TrustSection() {
  const [sectionRef, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.1 })
  const certDelays = useStaggeredReveal(CERTIFICATIONS.length, 70)
  const partnerDelays = useStaggeredReveal(PARTNERS.length, 50)
  const shouldAnimate = isVisible
  const firstRow = CERTIFICATIONS.slice(0, 5)
  const secondRow = CERTIFICATIONS.slice(5)
  const marqueePartners = [...PARTNERS, ...PARTNERS]

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
              food-contact safety to factory audits and recycled-material references, we keep the
              most relevant buyer-facing compliance marks visible for fast B2B review.
            </p>
          </div>

          <div className="space-y-3">
            {[firstRow, secondRow].map((row, rowIndex) => (
              <div key={`cert-row-${rowIndex}`} className="flex flex-nowrap items-center justify-center gap-2.5 lg:gap-3">
                {row.map((cert, itemIndex) => {
                  const absoluteIndex = rowIndex * 5 + itemIndex

                  return (
                    <div
                      key={cert.name}
                      className={`relative overflow-hidden gc-card flex h-[152px] shrink-0 items-center justify-center rounded-[4px] border border-[#dbe5ec] bg-white px-4 py-3 shadow-[0_14px_32px_rgba(12,27,48,0.05)] lg:h-[157px] lg:px-5 ${
                        shouldAnimate ? 'opacity-100' : 'opacity-100'
                      }`}
                      style={{
                        transform: shouldAnimate ? 'translateY(0)' : 'translateY(0)',
                        transitionDelay: `${shouldAnimate ? certDelays[absoluteIndex] + 160 : 0}ms`,
                      }}
                    >
                      <div className="relative shrink-0" style={{ height: '120px', width: 'clamp(83px, 6.4vw, 136px)' }}>
                        <Image
                          src={cert.logo}
                          alt={`${cert.name} certification`}
                          fill
                          unoptimized
                          sizes="(min-width: 1280px) 170px, (min-width: 1024px) 154px, (min-width: 768px) 136px, 104px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )
                })}
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

          <div className="gc-marquee-wrap overflow-hidden">
            <div className="gc-partner-marquee gc-partner-marquee--active flex w-max items-center gap-3 lg:gap-4">
              {marqueePartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className={`gc-card flex h-[118px] shrink-0 items-center justify-center rounded-[4px] bg-white px-6 py-5 shadow-[0_14px_32px_rgba(12,27,48,0.05)] transition-all duration-700 lg:h-[126px] lg:px-7 ${
                    shouldAnimate ? 'opacity-100' : 'opacity-100'
                  }`}
                  style={{
                    transform: shouldAnimate ? 'translateY(0)' : 'translateY(0)',
                    transitionDelay: `${shouldAnimate ? partnerDelays[index % PARTNERS.length] + 320 : 0}ms`,
                  }}
                >
                  <div className="relative shrink-0" style={{ height: '72px', width: 'clamp(128px, 10vw, 190px)' }}>
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      unoptimized
                      sizes="(min-width: 1280px) 190px, (min-width: 1024px) 172px, (min-width: 768px) 150px, 128px"
                      className="object-contain"
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
