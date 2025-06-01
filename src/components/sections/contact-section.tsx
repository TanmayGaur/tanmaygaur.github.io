"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue} from "framer-motion"
import { Mail, Send, Github, Linkedin} from "lucide-react"
import { useMediaQuery } from "@/hooks/use-mobile"

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

  try {
    // Prepare email content
    const subject = `Contact from ${formState.name}`
    const body = `Name: ${formState.name}
Email: ${formState.email}

Message:
${formState.message}`

    // Create mailto URL with encoded parameters
    const mailtoUrl = `mailto:tanmaygaur2532@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Open default email client
    window.location.href = mailtoUrl

    // Show success state
    setIsSubmitted(true)
    setFormState({ name: "", email: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    setIsSubmitting(false)
  }
  }

  const socialLinks = [
    { icon: <Github size={isMobile ? 16 : 20} />, url: "https://github.com/TanmayGaur", color: "#333" },
    { icon: <Linkedin size={isMobile ? 16 : 20} />, url: "https://www.linkedin.com/in/tanmaygaur25/", color: "#0077B5" },
    // { icon: <Twitter size={isMobile ? 16 : 20} />, url: "https://twitter.com", color: "#1DA1F2" },
    // { icon: <Instagram size={isMobile ? 16 : 20} />, url: "https://instagram.com", color: "#E1306C" },
  ]

  return (
    <motion.div
      className="h-screen w-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute top-16 left-0 w-full text-center ">
        <motion.h2
          className="text-3xl md:text-5xl font-bold"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
            Get In Touch
          </span>
        </motion.h2>
      </div>

      <div className="w-full max-w-5xl px-6 py-8 mt-12 grid md:grid-cols-2 gap-6 md:gap-8 items-center justify-center overflow-y-auto max-h-[calc(100vh-150px)] md:overflow-visible md:max-h-none">
        <motion.div
          className="space-y-4 md:space-y-6 order-2 md:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl md:text-2xl font-bold">Let&apos;s Create Something Amazing Together</h3>
          <p className="text-sm md:text-base text-white/70">
            Have a project in mind or want to discuss potential opportunities? I&apos;m always open to new ideas and
            collaborations. Feel free to reach out!
          </p>

          <div className="space-y-3 md:space-y-4">
            <motion.div
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Mail className="text-white" size={isMobile ? 14 : 18} />
              </div>
              <div>
                <h4 className="font-medium text-sm md:text-base">Email</h4>
                <p className="text-white/70 text-xs md:text-sm">tanmaygaur2532@gmail.com</p>
              </div>
            </motion.div>

            {/* <motion.div
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Phone className="text-white" size={isMobile ? 14 : 18} />
              </div>
              <div>
                <h4 className="font-medium text-sm md:text-base">Phone</h4>
                <p className="text-white/70 text-xs md:text-sm">+1 (555) 123-4567</p>
              </div>
            </motion.div> */}

            {/* <motion.div
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-white" size={isMobile ? 14 : 18} />
              </div>
              <div>
                <h4 className="font-medium text-sm md:text-base">Location</h4>
                <p className="text-white/70 text-xs md:text-sm">San Francisco, CA</p>
              </div>
            </motion.div> */}
          </div>

          <div className="flex gap-3 md:gap-4 mt-6 md:mt-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center"
                whileHover={{ scale: 1.1, backgroundColor: link.color }}
                whileTap={{ scale: 0.9 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative order-1 md:order-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onMouseMove={handleMouseMove}
        >
          <div
            className="absolute -inset-2 md:-inset-4 rounded-xl opacity-20"
            style={{
              background: "radial-gradient(circle at var(--x) var(--y), rgba(255,165,0,0.8), transparent 80%)",
              // backgroundPosition: useTransform(mouseX, (value) => `${value}px`),
              // backgroundPositionY: useTransform(mouseY, (value) => `${value}px`),
              "--x": `${mouseX.get()}px`,
              "--y": `${mouseY.get()}px`,
            } as React.CSSProperties}
          />
          <div className="rounded-xl backdrop-blur-sm border border-white/10 p-4 md:p-6 relative overflow-hidden">
          <p className="text-sm text-white/70 mb-4">This form will open your default email client to send the message.</p>
            {isSubmitted ? (
              <motion.div
                className="text-center py-6 md:py-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20 }}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Send className="text-white" size={isMobile ? 18 : 24} />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-white/70 text-sm md:text-base">
                  Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div className="space-y-1 md:space-y-2">
                  <label htmlFor="name" className="text-xs md:text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 border border-white/10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors text-sm md:text-base"
                  />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <label htmlFor="email" className="text-xs md:text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 border border-white/10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors text-sm md:text-base"
                  />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <label htmlFor="message" className="text-xs md:text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 border border-white/10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors min-h-[80px] md:min-h-[120px] resize-none text-sm md:text-base"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full py-2 md:py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium text-sm md:text-base"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
