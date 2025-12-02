"use client"

import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { blogs } from "@/lib/blog-data"

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Link href="/" className="text-accent hover:text-accent/80 transition-colors mb-4 inline-block">
              ← Back to home
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">Blog</h1>
            <p className="text-lg text-muted-foreground">
              Technical insights, tutorials, and best practices for DevOps engineering and cloud infrastructure.
            </p>
          </div>

          <div className="space-y-6">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="block p-6 sm:p-8 bg-card border border-border rounded-lg hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10 group"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-3">
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold group-hover:text-accent transition-colors text-balance">
                      {blog.title}
                    </h2>
                  </div>
                  <span className="text-xs font-medium bg-accent/10 text-accent px-3 py-1 rounded-full whitespace-nowrap">
                    {blog.category}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4 line-clamp-2">{blog.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground/70">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 p-6 sm:p-8 bg-card border border-accent/20 rounded-lg">
            <h3 className="text-xl font-bold mb-2">More content coming soon</h3>
            <p className="text-muted-foreground mb-4">
              Stay tuned for in-depth guides on AWS, monitoring, CI/CD pipelines, container security, and advanced
              DevOps practices.
            </p>
            <Link href="/" className="inline-block text-accent hover:text-accent/80 transition-colors font-medium">
              Visit homepage →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
