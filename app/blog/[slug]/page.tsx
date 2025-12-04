import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { blogs } from "@/lib/blog-data"

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
            {
              // Custom simple parser: support headings (##), fenced code blocks (```lang),
              // grouped lists (- item), and paragraphs. This keeps blog text inline in JS simple.
            }
            {(() => {
              const lines = blog.content.split("\n")
              const nodes: React.ReactNode[] = []
              let i = 0
              let keyIndex = 0

              while (i < lines.length) {
                const line = lines[i]

                // Fenced code block: ```lang
                if (line.trim().startsWith("```)")) {
                  // fallback if someone wrote three backticks but parser misreads spacing
                }

                if (line.startsWith("```")) {
                  const info = line.slice(3).trim() // language info (e.g., hcl)
                  const codeLines: string[] = []
                  i++
                  while (i < lines.length && !lines[i].startsWith("```")) {
                    codeLines.push(lines[i])
                    i++
                  }
                  // skip closing fence if present
                  if (i < lines.length && lines[i].startsWith("```")) i++

                  nodes.push(
                    <pre key={"code-" + keyIndex} className="bg-card border border-border rounded-lg p-4 mb-4 overflow-x-auto">
                      <code className="text-accent font-mono text-sm">{codeLines.join("\n")}</code>
                    </pre>
                  )
                  keyIndex++
                  continue
                }

                // Headings
                if (line.startsWith("##")) {
                  nodes.push(
                    <h2 key={"h2-" + keyIndex} className="text-2xl font-bold mt-8 mb-4 text-accent">
                      {line.replace("## ", "")}
                    </h2>
                  )
                  keyIndex++
                  i++
                  continue
                }

                // Grouped list: consecutive lines starting with '- '
                if (line.startsWith("- ")) {
                  const items: React.ReactNode[] = []
                  while (i < lines.length && lines[i].startsWith("- ")) {
                    items.push(
                      <li key={"li-" + keyIndex} className="ml-6 mb-2 text-muted-foreground">
                        {lines[i].slice(2)}
                      </li>
                    )
                    keyIndex++
                    i++
                  }
                  nodes.push(
                    <ul key={"ul-" + keyIndex} className="mb-4 list-disc list-inside">
                      {items}
                    </ul>
                  )
                  keyIndex++
                  continue
                }

                // Blank line -> spacing
                if (line.trim() === "") {
                  nodes.push(<div key={"spacer-" + keyIndex} className="h-4" />)
                  keyIndex++
                  i++
                  continue
                }

                // Image line: support a simple `image: path/to/img.jpg` (quotes optional)
                // Example in content: image: /images/my-photo.jpg
                const imageMatch = line.match(/^\s*"?'?image:\s*(.+?)"?'?\s*$/i)
                if (imageMatch) {
                  let src = imageMatch[1].trim()
                  // If user provided a bare filename like image.jpg, assume /images/
                  if (!src.startsWith("/") && !src.startsWith("http")) {
                    src = "/images/" + src
                  }

                  const alt = src.split("/").pop() || "image"
                  nodes.push(
                    <div key={"img-" + keyIndex} className="my-6 flex justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt={alt} className="max-w-full rounded-lg border border-border" />
                    </div>
                  )
                  keyIndex++
                  i++
                  continue
                }

                // Default paragraph
                nodes.push(
                  <p key={"p-" + keyIndex} className="text-muted-foreground mb-4 leading-relaxed">
                    {line}
                  </p>
                )
                keyIndex++
                i++
              }

              return nodes
            })()}
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
