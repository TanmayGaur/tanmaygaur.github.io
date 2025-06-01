import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import CustomCursor from "@/components/custom-cursor"

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"]
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700"]
})


export const metadata: Metadata = {
  title: "Tanmay Gaur | Software Developer",
  description: "Portfolio of Tanmay Gaur, a software developer specializing in web and mobile applications",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
          <CustomCursor />
          {children}
      </body>
    </html>
  )
}
