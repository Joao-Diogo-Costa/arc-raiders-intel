import { Button } from "@/components/ui/button"
import { ExternalLink, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-4 md:px-8 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo/Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold tracking-tight mb-1">
              ARC <span className="text-primary">RAIDERS</span> INTEL
            </h3>
            <p className="font-mono text-xs text-muted-foreground">
              Unofficial Fan Site // Not affiliated with Embark Studios
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="outline"
              className="font-mono text-sm border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
              asChild
            >
              <a href="https://discord.gg/arcraiders" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Discord
              </a>
            </Button>

            <Button
              variant="outline"
              className="font-mono text-sm border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              asChild
            >
              <a href="https://www.arcraiders.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Official Site
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="font-mono text-xs text-muted-foreground/60">
            <span className="text-accent/60">[</span> © 2025 ARC RAIDERS INTEL // ALL RIGHTS RESERVED{" "}
            <span className="text-accent/60">]</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
