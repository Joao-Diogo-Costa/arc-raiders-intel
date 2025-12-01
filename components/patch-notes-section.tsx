import { IntelCard, type PatchChange } from "@/components/intel-card"
import { Badge } from "@/components/ui/badge"
import { FileWarning, Calendar, Hash } from "lucide-react"

const patchChanges: PatchChange[] = [
  {
    id: "1",
    type: "nerf",
    title: "The Venator is slower now, easier to dodge",
    devNote: "Venator fire rate reduced by 15%, projectile speed decreased from 450 to 380 m/s",
    icon: "crosshair",
    category: "Enemies",
  },
  {
    id: "2",
    type: "buff",
    title: "SMGs actually feel worth using now",
    devNote: "Increased base damage of all SMG-class weapons by 12%, reduced horizontal recoil by 20%",
    icon: "sword",
    category: "Weapons",
  },
  {
    id: "3",
    type: "new",
    title: "New Raider: 'Mira' joins the squad",
    devNote: "Added new playable Raider 'Mira' with unique recon abilities and passive radar pulse",
    icon: "user",
    category: "Raiders",
  },
  {
    id: "4",
    type: "buff",
    title: "Shield generator lasts way longer",
    devNote: "Portable Shield Generator duration increased from 8s to 14s, cooldown unchanged",
    icon: "shield",
    category: "Equipment",
  },
  {
    id: "5",
    type: "nerf",
    title: "Healing stims are less spammable",
    devNote: "Emergency Stim cooldown increased from 45s to 65s, heal amount remains at 75HP",
    icon: "heart",
    category: "Equipment",
  },
  {
    id: "6",
    type: "new",
    title: "Ping system got a major upgrade",
    devNote: "Implemented contextual ping system with enemy callouts, loot markers, and danger zones",
    icon: "zap",
    category: "UI/UX",
  },
  {
    id: "7",
    type: "buff",
    title: "Sprinting feels snappier overall",
    devNote: "Reduced sprint acceleration time from 0.4s to 0.25s, max sprint speed unchanged",
    icon: "move",
    category: "Movement",
  },
  {
    id: "8",
    type: "nerf",
    title: "Grapple hook range got trimmed",
    devNote: "Grappling hook maximum range reduced from 50m to 38m, recharge time unchanged",
    icon: "anchor",
    category: "Equipment",
  },
]

export function PatchNotesSection() {
  const buffCount = patchChanges.filter((c) => c.type === "buff").length
  const nerfCount = patchChanges.filter((c) => c.type === "nerf").length
  const newCount = patchChanges.filter((c) => c.type === "new").length

  return (
    <section className="py-20 px-4 md:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FileWarning className="w-6 h-6 text-primary" />
            <span className="font-mono text-sm text-primary tracking-[0.2em] uppercase">Latest Transmission</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            SITREP: <span className="text-accent">Patch 0.5.2</span>
          </h2>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 font-mono text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>2025.01.15</span>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              <span>{patchChanges.length} Changes</span>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-buff text-buff bg-buff/10">
                {buffCount} Buffs
              </Badge>
              <Badge variant="outline" className="border-nerf text-nerf bg-nerf/10">
                {nerfCount} Nerfs
              </Badge>
              <Badge variant="outline" className="border-new text-new bg-new/10">
                {newCount} New
              </Badge>
            </div>
          </div>
        </div>

        {/* Intel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {patchChanges.map((change, index) => (
            <IntelCard key={change.id} change={change} index={index} />
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="font-mono text-xs text-muted-foreground text-center">
            <span className="text-accent">{"<<"}</span> END OF TRANSMISSION <span className="text-accent">{">>"}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
