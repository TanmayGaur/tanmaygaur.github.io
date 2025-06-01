"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
// import { useMediaQuery } from "@/hooks/use-mobile"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  // const isMobile = useMediaQuery("(max-width: 560px)")

  useEffect(() => {
    setIsMounted(true)
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsHidden(false)
    }

    const updateCursorStyle = () => {
      const hoveredElement = document.querySelectorAll(":hover")
      const isHoveringClickable = Array.from(hoveredElement).some((el) => {
        const cursor = window.getComputedStyle(el).cursor
        return cursor === "pointer"
      })
      setIsPointer(isHoveringClickable)
    }

    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)

    window.addEventListener("mousemove", updateCursorPosition)
    window.addEventListener("mousemove", updateCursorStyle)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition)
      window.removeEventListener("mousemove", updateCursorStyle)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  // if (typeof window === "undefined") return null
    if (!isMounted) return null

  return (
    <>
      {<>
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary-500 z-50 pointer-events-none mix-blend-difference"
          animate={{
            x: position.x - 16,
            y: position.y - 16,
            scale: isPointer ? 1.5 : 1,
            opacity: isHidden ? 0 : 1,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
        />
        <div
        style={{
          position: "fixed",
          top: position.y,
          left: position.x,
          width: "10px",
          height: "10px",
          backgroundColor: "white",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}
      />
      </>
    }
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary-500 z-50 pointer-events-none mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 500 }}
      />
    </>
  )
}
