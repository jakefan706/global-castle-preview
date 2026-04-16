'use client'

import { ADVANTAGES } from './homepage-data'
import { useScrollReveal, useStaggeredReveal } from '../../hooks/use-scroll-reveal'

function FactoryIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 21V9l6 3V9l6 3V3h6v18H3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M7 21v-4m4 4v-4m4 4v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ShieldIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3l7 3v5c0 5-3.4 8.5-7 10-3.6-1.5-7-5-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m9.5 12 1.8 1.8L15 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SparklesIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m18 15 .8 2 .2.2 2 .8-2 .8-.2.2-.8 2-.8-2-.2-.2-2-.8 2-.8.2-.2.8-2ZM5 14l.6 1.5.2.1 1.5.6-1.5.6-.2.1-.6 1.5-.6-1.5-.2-.1-1.5-.6 1.5-.6.2-.1L5 14Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

function GlobeIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 12h17M12 3c2.8 3 4.2 6 4.2 9S14.8 18 12 21M12 3c-2.8 3-4.2 6-4.2 9s1.4 6 4.2 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

const ICONS = {
  factory: FactoryIcon,
  shield: ShieldIcon,
  sparkles: SparklesIcon,
  globe: GlobeIcon,
} as const

export default function AdvantagesSection() {
  const [sectionRef, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.1 })
  const delays = useStaggeredReveal(ADVANTAGES.length, 100)
  const shouldAnimate = isVisible

  return (
    <section ref={sectionRef} id="advantages" className="bg-[#f5f7fa] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2
            className={`mb-4 text-3xl font-bold text-[#333333] transition-all duration-700 sm:text-4xl ${
              shouldAnimate ? 'opacity-100' : 'opacity-100'
            }`}
            style={{ transform: shouldAnimate ? 'translateY(0)' : 'translateY(0)' }}
          >
            Why Choose Global Castle
          </h2>
          <p
            className="mx-auto max-w-2xl text-[#666666] transition-all duration-700 delay-100 opacity-100"
            style={{ transform: 'translateY(0)' }}
          >
            A homepage built for B2B buyers should quickly prove capability, reliability, and
            fit. This section keeps that message clear.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {ADVANTAGES.map((advantage, index) => {
            const Icon = ICONS[advantage.icon]

            return (
              <div
                key={advantage.title}
                className={`gc-card gc-advantage-card rounded-[4px] p-6 text-center transition-all duration-700 lg:p-8 ${
                  shouldAnimate ? 'opacity-100' : 'opacity-100'
                }`}
                style={{
                  transform: shouldAnimate ? 'translateY(0)' : 'translateY(0)',
                  transitionDelay: `${shouldAnimate ? delays[index] : 0}ms`,
                }}
              >
                <div className="mx-auto mb-5 flex items-center justify-center">
                  <Icon className="h-14 w-14 text-[#67c0bf] lg:h-16 lg:w-16" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#333333] lg:text-xl">{advantage.title}</h3>
                <p className="text-sm leading-relaxed text-[#666666] lg:text-base">
                  {advantage.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
