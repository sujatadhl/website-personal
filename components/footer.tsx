export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Sujata Dahal</h4>
            <p className="text-sm text-muted-foreground">
              DevOps Engineer passionate about building reliable infrastructure and automating complex systems.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button className="hover:text-accent transition-colors">About</button>
              </li>
              <li>
                <button className="hover:text-accent transition-colors">Projects</button>
              </li>
              <li>
                <button className="hover:text-accent transition-colors">Blog</button>
              </li>
              <li>
                <button className="hover:text-accent transition-colors">Contact</button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://www.linkedin.com/m/in/sujata-dahal-2339131b5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:dahalsujata52@gmail.com" className="hover:text-accent transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Sujata Dahal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
