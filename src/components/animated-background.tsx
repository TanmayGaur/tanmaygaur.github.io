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

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
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

        // Bounce off edges
        if (this.x > (canvas?.width ?? 0) || this.x < 0) {
          this.speedX = -this.speedX
        }
        if (this.y > (canvas?.height ?? 0) || this.y < 0) {
          this.speedY = -this.speedY
        }

        // Update color based on current hue
        const hueOffset = (currentHue - this.originalHue) % 360
        this.color = `hsl(${(this.originalHue + hueOffset) % 360}, 100%, 50%)`
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    const initParticles = () => {
      particles = []
      const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100)

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 5 + 1
        const x = Math.random() * (canvas.width - size * 2) + size
        const y = Math.random() * (canvas.height - size * 2) + size
        const speedX = (Math.random() - 0.5) * 1.5
        const speedY = (Math.random() - 0.5) * 1.5
        const particleHue = hue + Math.random() * 30
        particles.push(new Particle(x, y, size, speedX, speedY, particleHue))
      }
    }

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

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Gradually shift hue toward target
      const targetHue = getSectionHue()
      const hueDiff = targetHue - hue
      hue += hueDiff * 0.05

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(hue)
        particle.draw()
      })

      // Draw connections between particles
      drawConnections()

      animationFrameId = requestAnimationFrame(animate)
    }

    // Draw connections between nearby particles
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`
            ctx.lineWidth = 0.2
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Initialize and start animation
    initParticles()
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [currentSection])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
}
