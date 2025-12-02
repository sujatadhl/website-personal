"use client"

import type React from "react"

import { useState } from "react"

export default function Contact() {
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
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-balance">Get In Touch</h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          I'm always interested in discussing DevOps best practices, infrastructure challenges, and new opportunities.
          Feel free to reach out!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="mt-12 pt-12 border-t border-border">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <a
              href="mailto:dahalsujata52@gmail.com"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              📧 dahalsujata52@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/m/in/sujata-dahal-2339131b5/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              💼 LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
