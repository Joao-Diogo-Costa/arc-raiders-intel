"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crosshair, Sword, Shield, Heart, Zap, Move, Anchor, User, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export type ChangeType = "buff" | "nerf" | "new"

export interface PatchChange {
  id: string
  type: ChangeType
  title: string
  devNote: string
  icon: string
  category: string
}

const iconMap: Record<string, LucideIcon> = {
  crosshair: Crosshair,
  sword: Sword,
  shield: Shield,
  heart: Heart,
  zap: Zap,
  move: Move,
  anchor: Anchor,
  user: User,
}

const typeConfig: Record<ChangeType, { label: string; borderClass: string; badgeClass: string }> = {
  buff: {
    label: "BUFF",
    borderClass: "border-l-buff",
    badgeClass: "bg-buff/20 text-buff border-buff",
  },
  nerf: {
    label: "NERF",
    borderClass: "border-l-nerf",
    badgeClass: "bg-nerf/20 text-nerf border-nerf",
  },
  new: {
    label: "NEW",
    borderClass: "border-l-new",
    badgeClass: "bg-new/20 text-new border-new",
  },
}

interface IntelCardProps {
  change: PatchChange
  index: number
}

export function IntelCard({ change, index }: IntelCardProps) {
  const Icon = iconMap[change.icon] || Zap
  const config = typeConfig[change.type]

  return (
    <Card
      className={cn(
        "group relative bg-card border-l-4 border-border hover:bg-muted/50 transition-all duration-300",
        config.borderClass,
      )}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon container */}
          <div className="flex-shrink-0 w-12 h-12 rounded bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
            <Icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header with badge and category */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="outline" className={cn("font-mono text-xs tracking-wider", config.badgeClass)}>
                {config.label}
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">{change.category}</span>
            </div>

            {/* Primary text - human readable */}
            <h3 className="text-lg font-semibold text-foreground mb-3 leading-snug">{change.title}</h3>

            {/* Secondary text - dev note */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
              <p className="font-mono text-xs text-muted-foreground pl-3 leading-relaxed">
                {">"} {change.devNote}
              </p>
            </div>
          </div>
        </div>

        {/* Index number */}
        <div className="absolute top-3 right-3 font-mono text-xs text-muted-foreground/30">
          #{String(index + 1).padStart(2, "0")}
        </div>
      </CardContent>
    </Card>
  )
}
