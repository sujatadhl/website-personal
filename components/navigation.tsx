"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "About", id: "about", href: "/#about" },
    { label: "Blog", id: "blog", href: "/blog" },
    { label: "Contact", id: "contact", href: "/contact" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b-2 border-accent/30" : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-accent hover:text-accent/80 transition-colors tracking-tight">
          SD
        </Link>
        <div className="flex items-center gap-1 sm:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm sm:text-base font-medium transition-all duration-200 text-muted-foreground hover:text-foreground hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
