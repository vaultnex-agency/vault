'use client'

import { useEffect, useRef } from 'react'

interface UseScrollRevealOptions {
  threshold?: number
  delay?: number
  once?: boolean
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.15, delay = 0, once = true } = options
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.opacity = '0'
    el.style.transform = 'translateY(2rem)'
    el.style.filter = 'blur(4px)'
    el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            el.style.filter = 'blur(0)'
            if (once) observer.unobserve(el)
          } else if (!once) {
            el.style.opacity = '0'
            el.style.transform = 'translateY(2rem)'
            el.style.filter = 'blur(4px)'
          }
        })
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, delay, once])

  return ref
}
