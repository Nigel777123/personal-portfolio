import { useEffect, useRef } from 'react'
import { useScroll, useSpring, useVelocity } from 'framer-motion'

type ParticleLayer = 0 | 1 | 2

type Particle = {
  x: number
  y: number
  baseX: number
  size: number
  opacity: number
  speed: number
  driftSpeed: number
  driftAmplitude: number
  driftPhase: number
  twinklePhase: number
  layer: ParticleLayer
}

const MAX_PARTICLES_MOBILE = 30
const MAX_PARTICLES_DESKTOP = 50

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function createParticle(layer: ParticleLayer, width: number, height: number): Particle {
  if (layer === 0) {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      baseX: Math.random() * width,
      size: randomBetween(0.5, 1),
      opacity: 0.05,
      speed: randomBetween(0.04, 0.12),
      driftSpeed: randomBetween(0.0015, 0.003),
      driftAmplitude: randomBetween(2, 8),
      driftPhase: Math.random() * Math.PI * 2,
      twinklePhase: Math.random() * Math.PI * 2,
      layer,
    }
  }

  if (layer === 1) {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      baseX: Math.random() * width,
      size: 1.5,
      opacity: 0.1,
      speed: randomBetween(0.12, 0.22),
      driftSpeed: randomBetween(0.002, 0.004),
      driftAmplitude: randomBetween(5, 13),
      driftPhase: Math.random() * Math.PI * 2,
      twinklePhase: Math.random() * Math.PI * 2,
      layer,
    }
  }

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    baseX: Math.random() * width,
    size: randomBetween(2, 3),
    opacity: 0.15,
    speed: randomBetween(0.22, 0.4),
    driftSpeed: randomBetween(0.003, 0.006),
    driftAmplitude: randomBetween(8, 18),
    driftPhase: Math.random() * Math.PI * 2,
    twinklePhase: Math.random() * Math.PI * 2,
    layer,
  }
}

function buildParticles(width: number, height: number, count: number) {
  return Array.from({ length: count }, (_, index) => {
    const layer: ParticleLayer = index < count * 0.4 ? 0 : index < count * 0.75 ? 1 : 2
    return createParticle(layer, width, height)
  })
}

export function F1DataDustBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const dimensionsRef = useRef({ width: 0, height: 0, dpr: 1 })
  const animationFrameRef = useRef<number | null>(null)
  const timeRef = useRef(0)

  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 400,
    damping: 50,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof window === 'undefined') {
      return
    }

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) {
      return
    }

    const measure = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const dpr = Math.max(window.devicePixelRatio || 1, 1)

      dimensionsRef.current = { width, height, dpr }
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const particleCount = width < 768 ? MAX_PARTICLES_MOBILE : MAX_PARTICLES_DESKTOP
      particlesRef.current = buildParticles(width, height, particleCount)
    }

    measure()

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(document.documentElement)

    const render = () => {
      const { width, height } = dimensionsRef.current
      const particles = particlesRef.current
      const scrollBoost = smoothVelocity.get()
      const scrollIntensity = Math.min(Math.abs(scrollBoost) / 2200, 2.8)
      const direction = scrollBoost >= 0 ? 1 : -1

      timeRef.current += 0.016

      context.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i]
        const depthWeight = particle.layer === 0 ? 0.35 : particle.layer === 1 ? 0.7 : 1.15
        const velocityModifier = 1 + scrollIntensity * depthWeight * 2.1
        const upwardAcceleration =
          particle.layer === 0
            ? 0.018
            : particle.layer === 1
              ? 0.05
              : 0.09

        particle.y -= particle.speed * velocityModifier + upwardAcceleration

        if (direction > 0) {
          particle.y -= scrollIntensity * depthWeight * (particle.layer === 2 ? 2.6 : particle.layer === 1 ? 1.6 : 0.9)
        }

        if (particle.y < -10) {
          particle.y = height + randomBetween(4, 24)
          particle.x = Math.random() * width
          particle.baseX = particle.x
          particle.driftPhase = Math.random() * Math.PI * 2
        }

        if (particle.x < -24) {
          particle.x = width + randomBetween(4, 16)
          particle.baseX = particle.x
        } else if (particle.x > width + 24) {
          particle.x = -randomBetween(4, 16)
          particle.baseX = particle.x
        }

        particle.driftPhase += particle.driftSpeed
        particle.twinklePhase += 0.006 + particle.layer * 0.002

        const drift = Math.sin(timeRef.current * 0.8 + particle.driftPhase) * particle.driftAmplitude
        const shimmer = 0.85 + Math.sin(timeRef.current * 1.8 + particle.twinklePhase) * 0.08

        const renderX = particle.baseX + drift
        const renderY = particle.y

        context.beginPath()
        context.fillStyle = `rgba(212, 255, 0, ${particle.opacity * shimmer})`
        context.arc(renderX, renderY, particle.size, 0, Math.PI * 2)
        context.fill()
      }

      animationFrameRef.current = window.requestAnimationFrame(render)
    }

    animationFrameRef.current = window.requestAnimationFrame(render)

    return () => {
      resizeObserver.disconnect()
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [smoothVelocity])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}