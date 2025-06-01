"use client"

import { ReactElement, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Download, Briefcase, GraduationCap, Award, User, Code } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-mobile"

type TabType = "bio" | "experience" | "education" | "achievements"

interface TabInfo {
  id: TabType
  label: string
  icon: ReactElement
  color: string
}

const tabs: TabInfo[] = [
  { id: "bio", label: "Biography", icon: <User size={18} />, color: "#FF5E5B" },
  { id: "experience", label: "Experience", icon: <Briefcase size={18} />, color: "#D89CF6" },
  { id: "education", label: "Education", icon: <GraduationCap size={18} />, color: "#39A0ED" },
  { id: "achievements", label: "Achievements", icon: <Award size={18} />, color: "#7AE582" },
]

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<TabType>("bio")
  const [direction, setDirection] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleTabChange = (tab: TabType) => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab)
    const newIndex = tabs.findIndex((t) => t.id === tab)
    setDirection(newIndex > currentIndex ? 1 : -1)
    setActiveTab(tab)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? (isMobile ? 100 : 200) : isMobile ? -100 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? (isMobile ? -100 : -200) : isMobile ? 100 : 200,
      opacity: 0,
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
          <span className="bg-gradient-to-r from-green-400 to-teal-500 text-transparent bg-clip-text">About Me</span>
        </motion.h2>
      </div>

      <div className="w-full max-w-6xl px-4 grid md:grid-cols-2 gap-6 md:gap-8 items-center justify-center overflow-y-auto max-h-[calc(100vh-150px)] md:overflow-visible md:max-h-none">
        {!isMobile && (
          <motion.div
            className="relative hidden md:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div
                className="absolute -inset-4 rounded-full opacity-30 animate-pulse"
                style={{ background: "linear-gradient(45deg, #7AE582, #39A0ED)" }}
              />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10">
                <Image src="/placeholder.svg?height=600&width=600" alt="John Doe" fill className="object-cover" />
              </div>
            </div>
          </motion.div>
        )}

        <div className="space-y-4 md:space-y-6">
          {isMobile && (
            <motion.div
              className="relative w-32 h-32 mx-auto mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div
                className="absolute inset-0 rounded-full opacity-30 animate-pulse"
                style={{ background: "linear-gradient(45deg, #7AE582, #39A0ED)" }}
              />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10">
                <Image src="/placeholder.svg?height=200&width=200" alt="John Doe" fill className="object-cover" />
              </div>
            </motion.div>
          )}

          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`px-3 md:px-4 py-1 md:py-2 rounded-full flex items-center gap-1 md:gap-2 ${
                  activeTab === tab.id ? "text-white" : "text-white/70 hover:text-white"
                } transition-colors text-xs md:text-sm`}
                style={{
                  backgroundColor: activeTab === tab.id ? tab.color : "rgba(255,255,255,0.1)",
                }}
                onClick={() => handleTabChange(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </motion.div>

          <div className="relative overflow-x-clip min-h-[250px] md:min-h-[300px] ">
            <AnimatePresence custom={direction} mode="wait">
              {activeTab === "bio" && (
                <motion.div
                  key="bio"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0"
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                    Creative Developer with a Passion for Innovation
                  </h3>
                  <p className="text-sm md:text-base text-white/70 mb-2 md:mb-4">
                    I&apos;m a software developer with over 5 years of experience creating immersive digital experiences. My
                    journey in tech began with a fascination for how interactive design and code can create memorable
                    user experiences.
                  </p>
                  <p className="text-sm md:text-base text-white/70 mb-2 md:mb-4">
                    I specialize in creative development, blending technical expertise with artistic vision to build
                    applications that are both functional and visually stunning.
                  </p>
                  <div className="flex gap-3 md:gap-4 mt-4 md:mt-6">
                    <motion.button
                      className="px-4 md:px-6 py-2 rounded-lg flex items-center gap-2 bg-gradient-to-r from-green-400 to-teal-500 text-xs md:text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download size={isMobile ? 14 : 18} />
                      Resume
                    </motion.button>
                    <motion.button
                      className="px-4 md:px-6 py-2 rounded-lg flex items-center gap-2 bg-white/10 backdrop-blur-sm text-xs md:text-sm"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Code size={isMobile ? 14 : 18} />
                      Portfolio
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {activeTab === "experience" && (
                <motion.div
                  key="experience"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0"
                >
                  <ul className="space-y-4 md:space-y-6 px-2">
                    <li className="relative pl-6 md:pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:to-transparent">
                      <div className="absolute left-0 top-0 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-purple-500 -translate-x-1.5" />
                      <h3 className="text-lg md:text-xl font-bold">Senior Creative Developer</h3>
                      <p className="text-xs md:text-sm text-white/50 mb-1 md:mb-2">
                        DigitalCraft Studios • 2020 - Present
                      </p>
                      <p className="text-xs md:text-base text-white/70">
                        Leading development of interactive web experiences and creative applications. Mentoring junior
                        developers and establishing technical direction for projects.
                      </p>
                    </li>
                    <li className="relative pl-6 md:pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:to-transparent">
                      <div className="absolute left-0 top-0 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-purple-500 -translate-x-1.5" />
                      <h3 className="text-lg md:text-xl font-bold">Frontend Developer</h3>
                      <p className="text-xs md:text-sm text-white/50 mb-1 md:mb-2">InnovateUX • 2018 - 2020</p>
                      <p className="text-xs md:text-base text-white/70">
                        Developed responsive web applications with a focus on animation and interactive elements.
                      </p>
                    </li>
                    <li className="relative pl-6 md:pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:to-transparent">
                      <div className="absolute left-0 top-0 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-purple-500 -translate-x-1.5" />
                      <h3 className="text-lg md:text-xl font-bold">Junior Developer</h3>
                      <p className="text-xs md:text-sm text-white/50 mb-1 md:mb-2">TechStart • 2016 - 2018</p>
                      <p className="text-xs md:text-base text-white/70">
                        Built and maintained web applications using modern JavaScript frameworks.
                      </p>
                    </li>
                  </ul>
                </motion.div>
              )}

              {activeTab === "education" && (
                <motion.div
                  key="education"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0"
                >
                  <ul className="space-y-4 md:space-y-6 px-2">
                    <li className="relative pl-6 md:pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:to-transparent">
                      <div className="absolute left-0 top-0 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-blue-500 -translate-x-1.5" />
                      <h3 className="text-lg md:text-xl font-bold">Master&apos;s in Interactive Media</h3>
                      <p className="text-xs md:text-sm text-white/50 mb-1 md:mb-2">
                        Digital Arts University • 2014 - 2016
                      </p>
                      <p className="text-xs md:text-base text-white/70">
                        Specialized in creative coding and interactive installations.
                      </p>
                    </li>
                    <li className="relative pl-6 md:pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:to-transparent">
                      <div className="absolute left-0 top-0 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-blue-500 -translate-x-1.5" />
                      <h3 className="text-lg md:text-xl font-bold">Bachelor&apos;s in Computer Science</h3>
                      <p className="text-xs md:text-sm text-white/50 mb-1 md:mb-2">Tech Institute • 2010 - 2014</p>
                      <p className="text-xs md:text-base text-white/70">
                        Foundations in programming, algorithms, and software development.
                      </p>
                    </li>
                    <li className="relative pl-6 md:pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:to-transparent">
                      <div className="absolute left-0 top-0 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-blue-500 -translate-x-1.5" />
                      <h3 className="text-lg md:text-xl font-bold">Creative Coding Bootcamp</h3>
                      <p className="text-xs md:text-sm text-white/50 mb-1 md:mb-2">Art & Code Academy • 2013</p>
                      <p className="text-xs md:text-base text-white/70">
                        Intensive program focused on generative art and interactive installations.
                      </p>
                    </li>
                  </ul>
                </motion.div>
              )}

              {activeTab === "achievements" && (
                <motion.div
                  key="achievements"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0"
                >
                  <ul className="space-y-4 md:space-y-6 px-2">
                    <li className="relative pl-6 md:pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-green-500 before:to-transparent">
                      <div className="absolute left-0 top-0 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-green-500 -translate-x-1.5" />
                      <h3 className="text-lg md:text-xl font-bold">Interactive Experience Award</h3>
                      <p className="text-xs md:text-sm text-white/50 mb-1 md:mb-2">Digital Design Awards • 2022</p>
                      <p className="text-xs md:text-base text-white/70">
                        Recognized for creating an immersive web experience that pushed boundaries.
                      </p>
                    </li>
                    <li className="relative pl-6 md:pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-green-500 before:to-transparent">
                      <div className="absolute left-0 top-0 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-green-500 -translate-x-1.5" />
                      <h3 className="text-lg md:text-xl font-bold">Open Source Contributor</h3>
                      <p className="text-xs md:text-sm text-white/50 mb-1 md:mb-2">
                        100+ contributions • 2020 - Present
                      </p>
                      <p className="text-xs md:text-base text-white/70">
                        Active contributor to creative coding libraries and tools.
                      </p>
                    </li>
                    <li className="relative pl-6 md:pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-green-500 before:to-transparent">
                      <div className="absolute left-0 top-0 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-green-500 -translate-x-1.5" />
                      <h3 className="text-lg md:text-xl font-bold">Creative Hackathon Winner</h3>
                      <p className="text-xs md:text-sm text-white/50 mb-1 md:mb-2">Global Code & Art Jam • 2019</p>
                      <p className="text-xs md:text-base text-white/70">
                        First place for developing an innovative interactive installation.
                      </p>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
