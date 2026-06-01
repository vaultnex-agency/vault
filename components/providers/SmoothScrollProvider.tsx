'use client'

import { useEffect, useRef } from 'react'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    let lenis: any
    let rafId: number

    async function initLenis() {
      try {
        const { default: Lenis } = await import('lenis')
        lenis = new Lenis({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.8,
          touchMultiplier: 1.5,
        })

        lenisRef.current = lenis

        function raf(time: number) {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }

        rafId = requestAnimationFrame(raf)
      } catch (e) {
        // Lenis not available, fallback to native scroll
      }
    }

    initLenis()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
