"use client"

import { useEffect } from "react"

interface BlogPost {
  id: number
  title: string
  date: string
  readTime: string
  content: string
}

interface BlogModalProps {
  blog: BlogPost | undefined
  onClose: () => void
}

export default function BlogModal({ blog, onClose }: BlogModalProps) {
  useEffect(() => {
    if (blog) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = "unset"
      }
    }
  }, [blog])

  if (!blog) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{blog.title}</h2>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>{blog.date}</span>
                <span>{blog.readTime}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
            {blog.content.split("\n\n").map((paragraph, idx) => {
              if (paragraph.startsWith("##")) {
                return (
                  <h3 key={idx} className="text-xl font-semibold text-foreground mt-6 mb-2">
                    {paragraph.replace("## ", "")}
                  </h3>
                )
              }
              if (paragraph.startsWith("-")) {
                return (
                  <ul key={idx} className="list-disc list-inside space-y-2 ml-2">
                    {paragraph
                      .split("\n")
                      .filter((line) => line.startsWith("-"))
                      .map((item, i) => (
                        <li key={i} className="text-muted-foreground">
                          {item.replace("- ", "")}
                        </li>
                      ))}
                  </ul>
                )
              }
              if (paragraph.startsWith("`")) {
                return (
                  <pre key={idx} className="bg-background p-4 rounded border border-border overflow-x-auto">
                    <code className="text-accent text-sm">{paragraph.replace(/`/g, "")}</code>
                  </pre>
                )
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
