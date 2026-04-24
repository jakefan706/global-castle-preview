'use client'

import { useEffect } from 'react'

import { STATS } from './homepage-data'
import { useCountUp } from '../../hooks/use-count-up'
import { useScrollReveal, useStaggeredReveal } from '../../hooks/use-scroll-reveal'

function formatCount(value: number) {
  if (value >= 1000000) {
    const compact = value / 1000000
    return Number.isInteger(compact) ? `${compact}M` : `${compact.toFixed(1)}M`
  }

  return value.toLocaleString()
}

function StatItem({
  end,
  suffix,
  label,
  isVisible,
  delay,
}: {
  end: number
  suffix: string
  label: string
  isVisible: boolean
  delay: number
}) {
  const [count, trigger] = useCountUp({ end, duration: 2000 })

  useEffect(() => {
    if (!isVisible) return

    const timeoutId = setTimeout(trigger, delay)
    return () => clearTimeout(timeoutId)
  }, [isVisible, delay, trigger])

  return (
    <div
      className={`gc-stat-card text-center transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="gc-stat-value mb-2 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
        {formatCount(count)}
        <span className="text-[#00868b]">{suffix}</span>
      </div>
      <p className="gc-stat-label text-sm text-white/80 sm:text-base">{label}</p>
    </div>
  )
}

export default function StatsSection() {
  const [sectionRef, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.3 })
  const delays = useStaggeredReveal(STATS.length, 150)
  const shouldAnimate = isVisible

  return (
    <section ref={sectionRef} className="relative bg-[#102238] py-16 lg:py-24">
      <div className="stats-pattern absolute inset-0 opacity-5" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {STATS.map((stat, index) => (
            <StatItem
              key={stat.label}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
              isVisible={shouldAnimate || true}
              delay={delays[index]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
