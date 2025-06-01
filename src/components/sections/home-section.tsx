"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useNavigation } from "@/context/navigation-context"
import { useMediaQuery } from "@/hooks/use-mobile"

export default function HomeSection() {
  const { navigateTo } = useNavigation()
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    if (isMobile) return // Skip mouse effect on mobile

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()

      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      containerRef.current.style.setProperty("--mouse-x", String(x))
      containerRef.current.style.setProperty("--mouse-y", String(y))
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isMobile])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative h-screen w-screen flex items-center justify-center overflow-hidden"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      style={{
        perspective: isMobile ? "none" : "1000px",
      }}
    >
      {/* <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-[20vw] md:text-[15vw] font-bold text-white/5 select-none pointer-events-none"
          animate={
            isMobile
              ? {}
              : {
                  rotateX: ["0deg", "10deg", "0deg"],
                  rotateY: ["0deg", "10deg", "0deg"],
                }
          }
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          CREATIVE
        </motion.div>
      </div> */}

      <div className="relative z-10 max-w-4xl w-full px-6">
        <motion.div
          className="mb-6 md:mb-8"
          variants={itemVariants}
          style={
            isMobile
              ? {}
              : {
                  transform:
                    "translateZ(0) rotateX(calc(var(--mouse-y) * 20deg)) rotateY(calc(var(--mouse-x) * -20deg))",
                }
          }
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-white/70 mb-2">Hello, I&apos;m</h2>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            Tanmay Gaur
          </h1>
          <h2 className="text-xl md:text-4xl font-medium mt-2 text-white/90">
            Creative <span className="text-pink-500">Software</span>  <span className="text-blue-500">Developer</span>
          </h2>
        </motion.div>

        {/* <motion.p
          className="text-lg md:text-xl text-white/70 max-w-2xl mb-6 md:mb-8"
          variants={itemVariants}
          style={
            isMobile
              ? {}
              : {
                  transform:
                    "translateZ(0) rotateX(calc(var(--mouse-y) * 10deg)) rotateY(calc(var(--mouse-x) * -10deg))",
                }
          }
        >
          I craft immersive digital experiences that blend creativity with cutting-edge technology. My work focuses on
          creating memorable, interactive designs that push boundaries.
        </motion.p> */}

        <motion.div
          className="flex flex-wrap gap-4"
          variants={itemVariants}
          style={
            isMobile
              ? {}
              : {
                  transform: "translateZ(0) rotateX(calc(var(--mouse-y) * 5deg)) rotateY(calc(var(--mouse-x) * -5deg))",
                }
          }
        >
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateTo("projects")}
          >
            Explore My Work
          </motion.button>
          <motion.button
            className="px-6 py-3 bg-transparent border border-white/20 rounded-full text-white font-medium backdrop-blur-sm"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateTo("contact")}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>

    </motion.div>
  )
}
