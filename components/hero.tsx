export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/50">
      <div className="max-w-3xl text-center space-y-8">
        <div className="space-y-6">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-balance text-foreground tracking-tight">
            Sujata Dahal
          </h1>
          <p className="text-2xl sm:text-3xl font-medium text-accent">DevOps Engineer</p>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Building reliable, scalable infrastructure and automating everything. Passionate about cloud technologies,
            CI/CD pipelines, and infrastructure as code.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <a
            href="/blog"
            className="px-8 py-4 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Read My Blog
          </a>
          <a
            href="/#about"
            className="px-8 py-4 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition-all duration-300 font-semibold text-lg"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}
