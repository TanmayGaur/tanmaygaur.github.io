"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, ArrowLeft, ArrowRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-mobile"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  demo: string
  color: string
}

const projects: Project[] = [
  {
      id: "ai-design-studio",
      title: "AI Design Studio",
      description: "An AI-powered design studio leveraging real-time generative capabilities, integrated AI agents via Gemini API, and seamless PDF generation using jsPDF and PDF-lib.",
      image: "/ai-design-studio.png?height=600&width=800",
      tags: ["Vite", "Gemini API", "jsPDF", "PDF-lib"],
      github: "https://github.com/TanmayGaur",
      demo: "https://tanmaygaur.github.io/ai-design-studio/",
      color: "rgba(216, 156, 246, 0.5)",
  },
  {
    id: "restaurant-pos",
    title: "Servitor",
    description:
      "A modern point-of-sale system designed for restaurants and retail, featuring real-time inventory, sales analytics, and seamless integrations.",
    image: "/servitor.png?height=600&width=800",
    tags: ["React", "Next.js", "Node.js", "MongoDB"],
    github: "https://github.com/TanmayGaur",
    demo: "https://servitor-v2.vercel.app",
    color: "rgba(216, 156, 246, 0.5)",
  },
  {
    id: "ai-leaf-identification",
    title: "Leaf lens",
    description:
      "An AI-powered web app that identifies plant species from leaf images. Utilizes Gemini for classification, provides detailed species info, and features a smooth, interactive UI for plant enthusiasts and researchers.",
    image: "/leaf-lens.png?height=600&width=800",
    tags: ["Next.js", "Tensorflow", "Django"],
    github: "https://github.com/TanmayGaur",
    demo: "https://leaf-lens1.vercel.app",
    color: "rgba(216, 156, 246, 0.5)",
  }
]

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const project = projects[currentIndex]
  const isMobile = useMediaQuery("(max-width: 768px)")

  const nextProject = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? (isMobile ? 300 : 1000) : isMobile ? -300 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? (isMobile ? -300 : -1000) : isMobile ? 300 : 1000,
      opacity: 0,
      scale: 0.8,
    }),
  }

  return (
    <motion.div
      className="h-screen w-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute top-16 left-0 w-full text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-bold"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            Featured Projects
          </span>
        </motion.h2>
      </div>

      <div className="relative w-full max-w-6xl px-4 flex items-center justify-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={project.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full grid md:grid-cols-2 gap-4 md:gap-8 justify-center items-center px-8 md:px-16"
          >
            <div className="relative max-w-lg ">
              <motion.div
                className="absolute -inset-2 md:-inset-4 rounded-xl opacity-50"
                style={{ backgroundColor: project.color, filter: "blur(30px)" }}
                layoutId={`project-glow-${project.id}`}
              />
              <motion.div
                className="relative aspect-video overflow-hidden rounded-xl border border-white/10"
                layoutId={`project-image-${project.id}`}
              >
                <div
                  className="w-full h-full bg-cover bg-center "
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </motion.div>
            </div>

            <div className="space-y-3 md:space-y-6 mt-4 md:mt-0">
              <motion.h3 className="text-2xl md:text-3xl font-bold" layoutId={`project-title-${project.id}`}>
                {project.title}
              </motion.h3>

              <motion.div className="flex flex-wrap gap-2" layoutId={`project-tags-${project.id}`}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-white/10 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.p className="text-sm md:text-base text-white/70" layoutId={`project-desc-${project.id}`}>
                {project.description}
              </motion.p>

              <motion.div className="flex gap-3 md:gap-4" layoutId={`project-links-${project.id}`}>
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-sm md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={isMobile ? 14 : 16} />
                  Code
                </motion.a>
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-colors text-sm md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={isMobile ? 14 : 16} />
                  Live Demo
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.button
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-10"
          onClick={prevProject}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={isMobile ? 16 : 20} />
        </motion.button>

        <motion.button
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-10"
          onClick={nextProject}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowRight size={isMobile ? 16 : 20} />
        </motion.button>
      </div>

      <div className="absolute bottom-20 md:bottom-40  left-1/2 transform -translate-x-1/2 flex space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
              currentIndex === index ? "bg-white w-6" : "bg-white/30"
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
