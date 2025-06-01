"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigation } from "@/context/navigation-context"
import type { SectionType } from "@/context/navigation-context"

interface NavItem {
  id: SectionType
  label: string
  color: string
}

export default function OrbitalNav() {
  const { currentSection, navigateTo } = useNavigation()
  const [isOpen, setIsOpen] = useState(false)

  const navItems: NavItem[] = [
    { id: "home", label: "Home", color: "#FF5E5B" },
    { id: "projects", label: "Projects", color: "#D89CF6" },
    { id: "skills", label: "Skills", color: "#39A0ED" },
    // { id: "about", label: "About", color: "#7AE582" },
    { id: "contact", label: "Contact", color: "#FFD166" },
  ]

  // Simplified animation variants
  const menuVariants = {
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  return (
    <>
      {/* Menu Button */}
      <motion.button
        className="fixed top-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-md border border-white/20 text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} className="w-6 h-6 relative">
          <motion.span
            className="absolute top-2 left-0 w-6 h-0.5 bg-white rounded-full"
            animate={{ rotate: isOpen ? 90 : 0, y: isOpen ? 2 : 0 }}
          />
          <motion.span
            className="absolute bottom-2 left-0 w-6 h-0.5 bg-white rounded-full"
            animate={{ rotate: isOpen ? 0 : 0, y: isOpen ? -2 : 0 }}
          />
        </motion.div>
      </motion.button>

      {/* Navigation Menu */}
      <motion.div
        className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center bg-black/30"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="bg-black/50 backdrop-blur-md rounded-xl p-4 pointer-events-auto">
          <motion.div className="flex flex-col space-y-2">
            {isOpen && navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`px-6 py-3 rounded-lg flex items-center justify-start text-left transition-colors ${
                  currentSection === item.id ? "text-white" : "text-white/70 hover:text-white"
                }`}
                style={{
                  backgroundColor: currentSection === item.id ? `${item.color}80` : "transparent",
                  borderLeft: `3px solid ${currentSection === item.id ? item.color : "transparent"}`,
                }}
                onClick={() => {
                  navigateTo(item.id)
                  setIsOpen(false)
                }}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Navigation Indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2 bg-black/30 backdrop-blur-md rounded-full px-4 py-2 border border-white/10"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        { navItems.map((item) => (
          <motion.button
            key={item.id}
            className="relative group"
            onClick={() => navigateTo(item.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span
              className={`block w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === item.id ? "w-6 bg-white" : "bg-white/30"
              }`}
            />
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {item.label}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </>
  )
}
