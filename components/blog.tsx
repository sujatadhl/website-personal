"use client"

import { useState } from "react"
import BlogModal from "./blog-modal"

export default function Blog() {
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null)

  const blogs = [
    {
      id: 1,
      title: "Getting Started with Docker",
      excerpt: "A comprehensive guide to containerization with Docker. Learn how to build, run, and manage containers.",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      content: `Docker is a containerization platform that has revolutionized how we deploy applications. 

## What is Docker?

Docker allows you to package your entire application including dependencies into a container that runs consistently across any environment.

## Key Concepts

- **Images**: Lightweight, standalone, executable packages containing everything needed to run an application
- **Containers**: Runtime instances of Docker images
- **Registries**: Repositories where you store and share Docker images

## Getting Started

To get started with Docker:

1. Install Docker from docker.com
2. Create a Dockerfile in your project
3. Build your image: \`docker build -t myapp:1.0 .\`
4. Run your container: \`docker run -p 8080:8080 myapp:1.0\`

## Best Practices

- Use specific base image versions
- Minimize layers in your Dockerfile
- Use .dockerignore files
- Don't run as root in containers
- Use health checks

Docker is essential for modern application development and deployment.`,
    },
    {
      id: 2,
      title: "Kubernetes for DevOps",
      excerpt:
        "Explore Kubernetes concepts including deployments, services, and ingress for orchestrating containerized applications.",
      date: "Dec 10, 2024",
      readTime: "12 min read",
      content: `Kubernetes has become the standard for container orchestration in modern enterprises.

## Why Kubernetes?

Kubernetes automates many of the manual processes involved in deploying, managing, and scaling containerized applications.

## Core Components

- **Pods**: Smallest deployable units in Kubernetes
- **Deployments**: Manage replica sets of pods
- **Services**: Expose pods to network traffic
- **Ingress**: Manage external access to services

## Deployment Example

Creating a simple Kubernetes deployment is straightforward with proper configuration.

## Production Considerations

When moving to production with Kubernetes, consider:
- Resource requests and limits
- Health checks
- Network policies
- RBAC configuration
- Persistent storage

Kubernetes might seem complex initially, but it's worth the learning curve.`,
    },
    {
      id: 3,
      title: "Terraform Infrastructure as Code",
      excerpt:
        "Learn how to manage your AWS infrastructure using Terraform for reproducible and version-controlled deployments.",
      date: "Dec 1, 2024",
      readTime: "10 min read",
      content: `Infrastructure as Code (IaC) is a best practice for managing cloud resources.

## What is Terraform?

Terraform is an open-source IaC tool that allows you to define infrastructure using declarative configuration files.

## Benefits of IaC

- Version control for infrastructure
- Reproducible deployments
- Infrastructure documentation
- Team collaboration
- Disaster recovery

## Basic Terraform Workflow

1. Write configuration files (.tf files)
2. Initialize Terraform: \`terraform init\`
3. Plan changes: \`terraform plan\`
4. Apply changes: \`terraform apply\`

## Example

\`\`\`hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "web-server"
  }
}
\`\`\`

Terraform makes infrastructure management predictable and scalable.`,
    },
  ]

  return (
    <>
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-balance">Blog</h2>
          <div className="space-y-6">
            {blogs.map((blog) => (
              <button
                key={blog.id}
                onClick={() => setSelectedBlog(blog.id)}
                className="w-full text-left p-6 bg-background border border-border rounded-lg hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold hover:text-accent transition-colors">{blog.title}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{blog.readTime}</span>
                </div>
                <p className="text-muted-foreground mb-3 line-clamp-2">{blog.excerpt}</p>
                <p className="text-sm text-muted-foreground/70">{blog.date}</p>
              </button>
            ))}
          </div>
          <div className="mt-8 p-4 bg-background border border-border rounded-lg">
            <p className="text-muted-foreground text-sm">
              📝 More blogs coming soon! Stay tuned for articles on AWS, monitoring, CI/CD best practices, and more.
            </p>
          </div>
        </div>
      </section>
      <BlogModal blog={blogs.find((b) => b.id === selectedBlog)} onClose={() => setSelectedBlog(null)} />
    </>
  )
}
