'use client'

import { useEffect, useRef } from 'react'

interface CrystalCanvasProps {
  className?: string
}

interface Crystal {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  opacity: number
  vertices: number
  parallaxFactor: number
  color: string
}

export function CrystalCanvas({ className }: CrystalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const crystalsRef = useRef<Crystal[]>([])
  const scrollRef = useRef(0)
  const animFrameRef = useRef<number>(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initCrystals()
    }

    const initCrystals = () => {
      const w = canvas.width
      const h = canvas.height
      crystalsRef.current = [
        // Large background crystals
        {
          x: w * 0.85,
          y: h * 0.2,
          size: Math.min(w, h) * 0.22,
          rotation: 0.3,
          rotationSpeed: 0.00015,
          opacity: 0.06,
          vertices: 6,
          parallaxFactor: 0.12,
          color: 'rgba(255,255,255,',
        },
        {
          x: w * 0.1,
          y: h * 0.7,
          size: Math.min(w, h) * 0.18,
          rotation: 1.1,
          rotationSpeed: -0.00012,
          opacity: 0.05,
          vertices: 4,
          parallaxFactor: 0.08,
          color: 'rgba(255,255,255,',
        },
        // Mid crystals
        {
          x: w * 0.72,
          y: h * 0.6,
          size: Math.min(w, h) * 0.12,
          rotation: 0.7,
          rotationSpeed: 0.0002,
          opacity: 0.08,
          vertices: 5,
          parallaxFactor: 0.2,
          color: 'rgba(255,255,255,',
        },
        {
          x: w * 0.2,
          y: h * 0.35,
          size: Math.min(w, h) * 0.1,
          rotation: 2.1,
          rotationSpeed: -0.00018,
          opacity: 0.07,
          vertices: 6,
          parallaxFactor: 0.25,
          color: 'rgba(255,255,255,',
        },
        // Small accent crystals
        {
          x: w * 0.5,
          y: h * 0.15,
          size: Math.min(w, h) * 0.06,
          rotation: 0.9,
          rotationSpeed: 0.0003,
          opacity: 0.1,
          vertices: 4,
          parallaxFactor: 0.35,
          color: 'rgba(255,255,255,',
        },
        {
          x: w * 0.35,
          y: h * 0.8,
          size: Math.min(w, h) * 0.07,
          rotation: 1.5,
          rotationSpeed: -0.00025,
          opacity: 0.09,
          vertices: 3,
          parallaxFactor: 0.3,
          color: 'rgba(255,255,255,',
        },
      ]
    }

    const drawCrystal = (
      ctx: CanvasRenderingContext2D,
      crystal: Crystal,
      scrollY: number,
      time: number
    ) => {
      const parallaxOffset = scrollY * crystal.parallaxFactor
      const breathe = Math.sin(time * 0.0008 + crystal.parallaxFactor * 10) * 0.015
      const currentOpacity = crystal.opacity * (1 + breathe)
      const cx = crystal.x
      const cy = crystal.y - parallaxOffset

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(crystal.rotation)

      // Draw main crystal shape
      ctx.beginPath()
      const angleStep = (Math.PI * 2) / crystal.vertices
      for (let i = 0; i < crystal.vertices; i++) {
        const angle = i * angleStep - Math.PI / 2
        const r = i % 2 === 0 ? crystal.size : crystal.size * 0.6
        const x = Math.cos(angle) * r
        const y = Math.sin(angle) * r
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()

      // Glass fill
      const grad = ctx.createRadialGradient(
        -crystal.size * 0.2,
        -crystal.size * 0.2,
        0,
        0,
        0,
        crystal.size
      )
      grad.addColorStop(0, `${crystal.color}${currentOpacity * 2})`)
      grad.addColorStop(0.5, `${crystal.color}${currentOpacity})`)
      grad.addColorStop(1, `${crystal.color}${currentOpacity * 0.3})`)
      ctx.fillStyle = grad
      ctx.fill()

      // Edge highlight
      ctx.strokeStyle = `${crystal.color}${currentOpacity * 3})`
      ctx.lineWidth = 0.5
      ctx.stroke()

      // Inner light reflection
      ctx.beginPath()
      ctx.moveTo(-crystal.size * 0.15, -crystal.size * 0.35)
      ctx.lineTo(crystal.size * 0.05, -crystal.size * 0.1)
      ctx.lineTo(-crystal.size * 0.05, crystal.size * 0.05)
      ctx.closePath()
      ctx.fillStyle = `rgba(255,255,255,${currentOpacity * 1.5})`
      ctx.fill()

      ctx.restore()
    }

    const drawLightStreaks = (ctx: CanvasRenderingContext2D, time: number) => {
      const w = canvas.width
      const h = canvas.height

      // Subtle horizontal light line
      const lineY = h * 0.5 + Math.sin(time * 0.0003) * h * 0.05
      const lineGrad = ctx.createLinearGradient(0, lineY, w, lineY)
      lineGrad.addColorStop(0, 'rgba(255,255,255,0)')
      lineGrad.addColorStop(0.3, 'rgba(255,255,255,0.012)')
      lineGrad.addColorStop(0.7, 'rgba(255,255,255,0.012)')
      lineGrad.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.beginPath()
      ctx.moveTo(0, lineY)
      ctx.lineTo(w, lineY)
      ctx.strokeStyle = lineGrad
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const animate = (time: number) => {
      timeRef.current = time
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update crystal rotations
      crystalsRef.current.forEach((crystal) => {
        crystal.rotation += crystal.rotationSpeed
      })

      // Draw light streaks first (background)
      drawLightStreaks(ctx, time)

      // Draw crystals
      crystalsRef.current.forEach((crystal) => {
        drawCrystal(ctx, crystal, scrollRef.current, time)
      })

      animFrameRef.current = requestAnimationFrame(animate)
    }

    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', handleScroll, { passive: true })
    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className || ''}`}
      style={{ zIndex: 1, opacity: 1 }}
      aria-hidden="true"
    />
  )
}
