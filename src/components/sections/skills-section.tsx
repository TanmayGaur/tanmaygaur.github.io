"use client"

import { ReactElement, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Javascript, ReactLogo, Nodejs, Database, Github, Docker, Cloud, NextjsLogo } from "../icons"
// import { useMediaQuery } from "@/hooks/use-mobile"

interface Skill {
  id: string
  name: string
  icon: ReactElement
  description: string
  level: number
  color: string
}

const skills: Skill[] = [
  // {
  //   id: "html",
  //   name: "HTML",
  //   icon: <Html5 />,
  //   description: "Semantic markup, accessibility, and modern HTML5 features",
  //   level: 95,
  //   color: "#E34F26",
  // },
  // {
  //   id: "css",
  //   name: "CSS",
  //   icon: <Css3 />,
  //   description: "Responsive design, animations, and CSS architecture",
  //   level: 90,
  //   color: "#1572B6",
  // },
  {
    id: "javascript",
    name: "JavaScript",
    icon: <Javascript />,
    description: "ES6+, async programming, and functional concepts",
    level: 92,
    color: "#F7DF1E",
  },
  {
    id: "react",
    name: "React",
    icon: <ReactLogo />,
    description: "Component architecture, hooks, and state management",
    level: 88,
    color: "#61DAFB",
  },
  {
    id: "nodejs",
    name: "Node.js",
    icon: <Nodejs />,
    description: "Server-side JavaScript, API development, and microservices",
    level: 85,
    color: "#339933",
  },
  {
    id: "next",
    name: "next.js",
    icon: <NextjsLogo />,
    description: "Server-side JavaScript, API development, and microservices",
    level: 85,
    color: "#FFFFFF",
  },
  {
    id: "database",
    name: "Databases",
    icon: <Database />,
    description: "SQL, NoSQL, data modeling, and query optimization",
    level: 80,
    color: "#336791",
  },
  {
    id: "git",
    name: "Git/GitHub",
    icon: <Github />,
    description: "Version control, collaboration, and CI/CD workflows",
    level: 87,
    color: "#F05032",
  },
  // {
  //   id: "design",
  //   name: "UI/UX Design",
  //   icon: <Figma />,
  //   description: "User-centered design, prototyping, and design systems",
  //   level: 82,
  //   color: "#F24E1E",
  // },
  {
    id: "docker",
    name: "Docker",
    icon: <Docker />,
    description: "Containerization, orchestration, and deployment",
    level: 78,
    color: "#2496ED",
  },
  {
    id: "cloud",
    name: "Cloud Services",
    icon: <Cloud />,
    description: "AWS, serverless architecture, and cloud infrastructure",
    level: 75,
    color: "#4285F4",
  },
  {
    id: "react-native",
    name: "React Native",
    icon: <ReactLogo />,
    description: "Cross-platform mobile development with React",
    level: 75,
    color: "#61DAFB",
  },
]

export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  // const isMobile = useMediaQuery("(max-width: 768px)")

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
          <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">
            Technical Skills
          </span>
        </motion.h2>
      </div>

      <div className="relative w-full max-w-6xl px-4 overflow-y-auto max-h-[calc(100vh-150px)] md:overflow-visible md:max-h-none">
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-4"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              className="relative"
              variants={{
                hidden: { y: 20, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
            >
              <motion.button
                className={`w-full aspect-square rounded-lg md:rounded-xl backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center gap-1 md:gap-2 relative overflow-hidden group ${
                  selectedSkill?.id === skill.id ? "ring-2 ring-white" : ""
                }`}
                style={{
                  backgroundColor:
                    hoveredSkill === skill.id || selectedSkill?.id === skill.id
                      ? `${skill.color}30`
                      : "rgba(255,255,255,0.05)",
                }}
                // onClick={() => setSelectedSkill(skill)}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at center, ${skill.color}40 0%, transparent 70%)`,
                  }}
                />
                <motion.div
                  className="text-2xl md:text-4xl"
                  style={{ color: skill.color }}
                  animate={{
                    scale: hoveredSkill === skill.id ? 1.2 : 1,
                  }}
                >
                  {skill.icon}
                </motion.div>
                <motion.span className="font-medium text-xs md:text-sm">{skill.name}</motion.span>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              className="mt-4 md:mt-8 rounded-xl backdrop-blur-sm border border-white/10 p-4 md:p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle at center, ${selectedSkill.color} 0%, transparent 70%)`,
                }}
                layoutId={`skill-bg-${selectedSkill.id}`}
              />
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <motion.div
                  className="text-3xl md:text-5xl"
                  style={{ color: selectedSkill.color }}
                  layoutId={`skill-icon-${selectedSkill.id}`}
                >
                  {selectedSkill.icon}
                </motion.div>
                <div>
                  <motion.h3 className="text-xl md:text-2xl font-bold" layoutId={`skill-name-${selectedSkill.id}`}>
                    {selectedSkill.name}
                  </motion.h3>
                  <motion.p className="text-sm md:text-base text-white/70">{selectedSkill.description}</motion.p>
                </div>
              </div>
              <div className="w-full h-3 md:h-4 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: selectedSkill.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedSkill.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs md:text-sm">
                <span>Proficiency</span>
                <span>{selectedSkill.level}%</span>
              </div>
              <motion.button
                className="absolute top-2 right-2 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center"
                onClick={() => setSelectedSkill(null)}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
