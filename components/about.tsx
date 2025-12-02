"use client"

interface AboutProps {
  setActiveSection: (section: string) => void
}

export default function About({ setActiveSection }: AboutProps) {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl font-bold mb-4 text-balance inline-block pb-3 border-b-3 border-accent">About Me</h2>
          <p className="text-xl text-accent font-medium mt-4">Sujata Dahal — DevOps Engineer</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hi, I'm Sujata Dahal, a passionate DevOps Engineer dedicated to building robust, scalable infrastructure
              and automating complex deployment processes. With expertise in containerization, orchestration, and cloud
              platforms, I help teams deliver software reliably and efficiently.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My focus areas include Docker, Kubernetes, AWS, CI/CD pipelines, Infrastructure as Code (Terraform), and
              monitoring solutions. I believe in the power of automation to reduce manual overhead and improve system
              reliability.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not working on infrastructure, I enjoy exploring emerging cloud technologies, contributing to
              open-source projects, and sharing knowledge through technical writing.
            </p>
          </div>
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Docker",
                  "Kubernetes",
                  "AWS",
                  "Terraform",
                  "CI/CD",
                  "Linux",
                  "Jenkins",
                  "GitHub Actions",
                  "Prometheus",
                  "ELK Stack",
                  "Python",
                  "Bash",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-accent/15 text-accent rounded-full text-sm font-medium border border-accent/40 hover:bg-accent/25 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Connect</h3>
              <div className="space-y-3">
                <a
                  href="https://www.linkedin.com/m/in/sujata-dahal-2339131b5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-accent transition-colors text-lg font-medium"
                >
                  LinkedIn →
                </a>
                <a
                  href="mailto:dahalsujata52@gmail.com"
                  className="block text-muted-foreground hover:text-accent transition-colors text-lg font-medium"
                >
                  Email: dahalsujata52@gmail.com →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
