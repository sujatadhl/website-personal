"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this to a backend or email service
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <>
      <Navigation activeSection="contact" setActiveSection={() => {}} />
      <main className="min-h-screen bg-background pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-accent hover:text-accent/80 transition-colors mb-8 inline-block">
            ← Back to Home
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">Get In Touch</h1>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            I'm always interested in discussing DevOps best practices, infrastructure challenges, and new opportunities.
            Feel free to reach out!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 mb-12">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>

            {submitted && (
              <div className="p-4 bg-green-900/20 border border-green-700/50 rounded-lg text-green-400">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}
          </form>

          <div className="pt-12 border-t border-border">
            <h2 className="text-2xl font-semibold mb-6">Quick Links</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <a
                href="mailto:dahalsujata52@gmail.com"
                className="text-muted-foreground hover:text-accent transition-colors text-lg"
              >
                📧 dahalsujata52@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/m/in/sujata-dahal-2339131b5/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors text-lg"
              >
                💼 LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
