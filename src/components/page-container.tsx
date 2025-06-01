"use client"

import { useNavigation } from "@/context/navigation-context"
import { AnimatePresence } from "framer-motion"
import HomeSection from "./sections/home-section"
import ProjectsSection from "./sections/projects-section"
import SkillsSection from "./sections/skills-section"
// import AboutSection from "./sections/about-section"
import ContactSection from "./sections/contact-section"

export type PageSection = "home" | "projects" | "skills" | "about" | "contact"

export default function PageContainer() {
  const { currentSection } = useNavigation()

  return (
    <div className="h-screen w-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {currentSection === "home" && <HomeSection key="home" />}
        {currentSection === "projects" && <ProjectsSection key="projects" />}
        {currentSection === "skills" && <SkillsSection key="skills" />}
        {/* {currentSection === "about" && <AboutSection key="about" />} */}
        {currentSection === "contact" && <ContactSection key="contact" />}
      </AnimatePresence>
    </div>
  )
}
