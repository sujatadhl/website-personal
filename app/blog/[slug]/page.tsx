import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { blogs } from "@/lib/blog-data"
import ReactMarkdown from "react-markdown"

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = blogs.find((b) => b.slug === slug)

  if (!blog) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog" className="text-accent hover:text-accent/80 transition-colors font-medium">
              ← Back to blog
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <article className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/blog" className="text-accent hover:text-accent/80 transition-colors mb-6 inline-block">
              ← Back to blog
            </Link>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium bg-accent/10 text-accent px-3 py-1 rounded-full">
                  {blog.category}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">{blog.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>{blog.date}</span>
                <span>•</span>
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div className="space-y-4">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mt-8 mb-4 text-accent">{children}</h2>
                  ),
                  p: ({ children }) => (
                    <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-outside space-y-2 ml-8 mb-4 text-muted-foreground marker:text-accent">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-muted-foreground pl-2">{children}</li>
                  ),
                  code: ({ children, className }) => {
                    const isBlock = className?.includes('language-')
                    if (isBlock) {
                      return (
                        <pre className="bg-card border border-border rounded-lg p-4 mb-4 overflow-x-auto">
                          <code className="text-accent font-mono text-sm">{children}</code>
                        </pre>
                      )
                    }
                    return <code className="bg-card px-2 py-1 rounded text-accent font-mono text-sm">{children}</code>
                  },
                  pre: ({ children }) => (
                    <pre className="bg-card border border-border rounded-lg p-4 mb-4 overflow-x-auto">
                      {children}
                    </pre>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-accent">{children}</strong>
                  ),
                  img: ({ src, alt }) => (
                    <img 
                      src={src} 
                      alt={alt || ""} 
                      className="max-w-full h-auto rounded-lg border border-border my-4 mx-auto block"
                    />
                  ),
                }}
              >
                {blog.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Written by</p>
                <p className="font-semibold">Sujata Dahal</p>
              </div>
              <Link href="/blog" className="text-accent hover:text-accent/80 transition-colors font-medium">
                ← Back to all posts
              </Link>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
