import { Button } from "@/components/ui/button"
import { ChevronDown, Radio, Crosshair } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden scanlines">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Diagonal stripes accent */}
      <div className="absolute left-0 top-1/4 w-24 h-64 opacity-20">
        <svg viewBox="0 0 100 300" className="w-full h-full text-primary">
          {[...Array(12)].map((_, i) => (
            <line key={i} x1="0" y1={i * 25} x2="100" y2={i * 25 + 50} stroke="currentColor" strokeWidth="3" />
          ))}
        </svg>
      </div>

      {/* Status indicator */}
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <div className="relative">
          <Radio className="w-5 h-5 text-primary animate-pulse" />
          <div className="absolute inset-0 w-5 h-5 bg-primary/30 rounded-full animate-ping" />
        </div>
        <span className="font-mono text-sm text-muted-foreground tracking-wider">SIGNAL ACTIVE</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Top label */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-px w-12 bg-primary/50" />
          <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">Raider Network</span>
          <div className="h-px w-12 bg-primary/50" />
        </div>

        {/* Main headline */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-4 glitch-text">
          <span className="text-foreground">ARC</span>
          <span className="text-primary"> RAIDERS</span>
        </h1>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent tracking-wide mb-8">INTEL</h2>

        {/* Subheadline */}
        <p className="font-mono text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          {">"} Survival guide & Human-readable patch notes.
          <span className="text-primary animate-pulse">_</span>
        </p>

        {/* CTA Button */}
        <Link href="#patch-note">
          <Button
            size="lg"
            className="group relative bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 tracking-wider uppercase transition-all duration-300"
          >
            <Crosshair className="w-5 h-5 mr-3 group-hover:animate-spin" />
            View Latest Changes
            <ChevronDown className="w-5 h-5 ml-3 group-hover:translate-y-1 transition-transform" />
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary-foreground/50" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary-foreground/50" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary-foreground/50" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary-foreground/50" />
          </Button>
        </Link>

        {/* Version tag */}
        <div className="mt-16 font-mono text-xs text-muted-foreground">
          <span className="text-accent">[</span>
          BUILD v0.5.2 // LAST UPDATE: 2025.01.15
          <span className="text-accent">]</span>
        </div>
      </div>

      {/* Bottom corner decoration */}
      <div className="absolute bottom-8 right-8 text-right">
        <div className="font-mono text-xs text-muted-foreground/50 space-y-1">
          <div>LAT: 52.5200° N</div>
          <div>LONG: 13.4050° E</div>
          <div className="text-primary">SECTOR: ALPHA-7</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  )
}
