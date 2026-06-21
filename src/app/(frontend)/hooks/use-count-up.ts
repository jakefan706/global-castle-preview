'use client'

import { useEffect, useRef, useState } from 'react'

type UseCountUpOptions = {
  start?: number
  end: number
  duration?: number
  startOnMount?: boolean
}

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  startOnMount = false,
}: UseCountUpOptions): [number, () => void] {
  const [count, setCount] = useState(start)
  const [shouldStart, setShouldStart] = useState(startOnMount)
  const lastValueRef = useRef(start)

  const trigger = () => setShouldStart(true)

  useEffect(() => {
    if (!shouldStart) return

    let startTime: number | null = null
    let animationFrame = 0

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp

      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(start + (end - start) * easeOut)

      if (currentCount !== lastValueRef.current) {
        lastValueRef.current = currentCount
        setCount(currentCount)
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else if (lastValueRef.current !== end) {
        lastValueRef.current = end
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [start, end, duration, shouldStart])

  return [count, trigger]
}
