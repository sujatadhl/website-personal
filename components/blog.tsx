"use client"

import Link from "next/link"
import { blogs } from "@/lib/blog-data"

export default function Blog() {
  return (
    <>
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-balance">Blog</h2>
          <div className="space-y-6">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="block p-6 bg-background border border-border rounded-lg hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold hover:text-accent transition-colors">{blog.title}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{blog.readTime}</span>
                </div>
                <p className="text-muted-foreground mb-3 line-clamp-2">{blog.excerpt}</p>
                <p className="text-sm text-muted-foreground/70">{blog.date}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 p-4 bg-background border border-border rounded-lg">
            <p className="text-muted-foreground text-sm">
              📝 More blogs coming soon! Stay tuned for articles on AWS, monitoring, CI/CD best practices, and more.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
