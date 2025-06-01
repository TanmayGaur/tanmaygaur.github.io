"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type SectionType = "home" | "projects" | "skills" | "contact"
// export type SectionType = "home" | "projects" | "skills" | "about" | "contact"

interface NavigationContextType {
  currentSection: SectionType
  navigateTo: (section: SectionType) => void
  previousSection: SectionType | null
}

const NavigationContext = createContext<NavigationContextType>({
  currentSection: "home",
  navigateTo: () => {},
  previousSection: null,
})

export const useNavigation = () => useContext(NavigationContext)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState<SectionType>("home")
  const [previousSection, setPreviousSection] = useState<SectionType | null>(null)

  const navigateTo = (section: SectionType) => {
    if (section !== currentSection) {
      setPreviousSection(currentSection)
      setCurrentSection(section)
    }
  }

  return (
    <NavigationContext.Provider value={{ currentSection, navigateTo, previousSection }}>
      {children}
    </NavigationContext.Provider>
  )
}
