"use client"

import { useState } from "react"
import Link from "next/link"
import { blogs } from "@/lib/blog-data"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function BlogAdmin() {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editDate, setEditDate] = useState("")
  const [localBlogs, setLocalBlogs] = useState(blogs)

  const handleEditClick = (blogId: number, currentDate: string) => {
    setEditingId(blogId)
    setEditDate(currentDate)
  }

  const handleSaveDate = (blogId: number) => {
    setLocalBlogs(localBlogs.map((blog) => (blog.id === blogId ? { ...blog, date: editDate } : blog)))
    setEditingId(null)
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditDate("")
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-accent hover:text-accent/80 transition-colors mb-4 inline-block">
            ← Back to home
          </Link>
          <h1 className="text-4xl font-bold mb-2">Blog Manager</h1>
          <p className="text-muted-foreground mb-8">Manage your blog posts and edit their publication dates.</p>

          <div className="space-y-4">
            {localBlogs.map((blog) => (
              <div key={blog.id} className="p-6 bg-card border border-border rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{blog.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    {editingId === blog.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editDate}
                          onChange={(e) => setEditDate(e.target.value)}
                          placeholder="e.g., Dec 15, 2024"
                          className="flex-1 px-3 py-2 bg-background border border-border rounded text-foreground text-sm"
                        />
                        <button
                          onClick={() => handleSaveDate(blog.id)}
                          className="px-4 py-2 bg-accent text-black rounded font-medium text-sm hover:bg-accent/90 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 bg-muted border border-border rounded font-medium text-sm hover:bg-muted/80 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">Date: {blog.date}</span>
                        <button
                          onClick={() => handleEditClick(blog.id, blog.date)}
                          className="text-accent hover:text-accent/80 transition font-medium text-sm"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{blog.excerpt}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-card border border-border rounded-lg">
            <h3 className="font-bold mb-2">How to use this page:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Click "Edit" to modify a blog post's publication date</li>
              <li>• Enter the date in any format (e.g., "Dec 15, 2024" or "2024-12-15")</li>
              <li>• Changes are updated instantly</li>
              <li>• To add new blogs, edit the blog data in lib/blog-data.ts</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
