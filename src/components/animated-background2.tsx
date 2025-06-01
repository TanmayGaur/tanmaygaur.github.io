"use client"

import { useEffect, useRef } from "react"
import { useNavigation } from "@/context/navigation-context"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { currentSection } = useNavigation()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let hue = 0
    let lastTime = 0
    const FPS = 30 // Limit to 30 FPS for better performance
    const frameDelay = 1000 / FPS

    // Particle class with optimized rendering
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      originalHue: number

      constructor(x: number, y: number, size: number, speedX: number, speedY: number, hue: number) {
        this.x = x
        this.y = y
        this.size = size
        this.speedX = speedX
        this.speedY = speedY
        this.originalHue = hue
        this.color = `hsl(${hue}, 100%, 50%)`
      }

      update(currentHue: number) {
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges with reduced calculations
        if (canvas && (this.x > canvas.width / window.devicePixelRatio || this.x < 0)) {
          this.speedX = -this.speedX
        }
        if (canvas && (this.y > canvas.height / window.devicePixelRatio || this.y < 0)) {
          this.speedY = -this.speedY
        }

        // Update color less frequently
        if (Math.random() < 0.05) {
          const hueOffset = (currentHue - this.originalHue) % 360
          this.color = `hsl(${(this.originalHue + hueOffset) % 360}, 100%, 50%)`
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles - reduced count for better performance
    const initParticles = () => {
      particles = []
      // Calculate based on screen size but with a lower density
      const screenArea = (canvas.width / window.devicePixelRatio) * (canvas.height / window.devicePixelRatio)
      const numberOfParticles = Math.min(Math.floor(screenArea / 30000), 50)

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 3 + 1 // Smaller particles
        const x = Math.random() * (canvas.width / window.devicePixelRatio - size * 2) + size
        const y = Math.random() * (canvas.height / window.devicePixelRatio - size * 2) + size
        const speedX = (Math.random() - 0.5) * 1 // Slower movement
        const speedY = (Math.random() - 0.5) * 1
        const particleHue = hue + Math.random() * 30
        particles.push(new Particle(x, y, size, speedX, speedY, particleHue))
      }
    }

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      // Set display size (css pixels)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      // Scale context to match device pixel ratio
      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()
    initParticles() // Now call initParticles after it's defined

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setCanvasDimensions()
        initParticles() // Call initParticles after resizing
      }, 200)
    }

    let lastWidth = window.innerWidth
    window.addEventListener("resize", () => {
      if (window.innerWidth !== lastWidth) {
      lastWidth = window.innerWidth
      handleResize()
      }
    })

    // Set section-specific hue
    const getSectionHue = (): number => {
      switch (currentSection) {
        case "home":
          return 0 // Red
        case "projects":
          return 270 // Purple
        case "skills":
          return 200 // Blue
        // case "about":
        //   return 120 // Green
        case "contact":
          return 40 // Yellow
        default:
          return 0
      }
    }

    // Draw connections with distance optimization
    const drawConnections = () => {
      // Only draw connections if we have a reasonable number of particles
      if (particles.length > 40) return

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            // Reduced connection distance
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 - distance / 80})`
            ctx.lineWidth = 0.2
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop with frame limiting
    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp

      if (timestamp - lastTime >= frameDelay) {
        lastTime = timestamp

        // Clear with reduced opacity for trail effect
        ctx.fillStyle = "rgba(10, 10, 15, 0.2)"
        ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)

        // Gradually shift hue toward target
        const targetHue = getSectionHue()
        const hueDiff = targetHue - hue
        hue += hueDiff * 0.05

        // Update and draw particles
        particles.forEach((particle) => {
          particle.update(hue)
          particle.draw()
        })

        // Draw connections between particles - only for nearby particles
        drawConnections()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Initialize and start animation
    animationFrameId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      let lastWidth = window.innerWidth
    window.addEventListener("resize", () => {
      if (window.innerWidth !== lastWidth) {
      lastWidth = window.innerWidth
      handleResize()
      }
    })
      cancelAnimationFrame(animationFrameId)
    }
  }, [currentSection])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
}
