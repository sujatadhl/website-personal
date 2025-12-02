export default function Projects() {
  const projects = [
    {
      title: "Kubernetes Cluster Setup",
      description:
        "Automated deployment and management of a production-grade Kubernetes cluster using Infrastructure as Code principles.",
      tags: ["Kubernetes", "Terraform", "AWS"],
      link: "#",
    },
    {
      title: "CI/CD Pipeline Automation",
      description:
        "Implemented comprehensive CI/CD pipelines using Jenkins and GitHub Actions for automated testing and deployment.",
      tags: ["Jenkins", "GitHub Actions", "Docker"],
      link: "#",
    },
    {
      title: "Monitoring & Observability",
      description:
        "Built complete monitoring stack using Prometheus, Grafana, and ELK Stack for production environment visibility.",
      tags: ["Prometheus", "Grafana", "ELK Stack"],
      link: "#",
    },
    {
      title: "Infrastructure as Code",
      description:
        "Designed and implemented IaC solutions using Terraform for managing cloud resources across multiple environments.",
      tags: ["Terraform", "AWS", "CloudFormation"],
      link: "#",
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-balance">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              className="group p-6 bg-card border border-border rounded-lg hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10"
            >
              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-accent/20 text-accent rounded border border-accent/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
