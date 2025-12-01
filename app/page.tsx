import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/footer";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoveUp, MoveDown, Wrench, Sparkles } from "lucide-react";

// Define the shape of your data (TypeScript best practice)
interface PatchChange {
  id: string;
  entity_name: string;
  simplified_text: string;
  official_text: string;
  type: 'buff' | 'nerf' | 'fix' | 'new';
}

// Icon and color mapping for better maintainability
const typeStyles = {
  buff: {
    icon: <MoveUp className="text-green-500" />,
    borderColor: "border-l-green-500",
  },
  nerf: {
    icon: <MoveDown className="text-red-500" />,
    borderColor: "border-l-red-500",
  },
  fix: {
    icon: <Wrench className="text-blue-500" />,
    borderColor: "border-l-blue-500",
  },
  new: {
    icon: <Sparkles className="text-yellow-500" />,
    borderColor: "border-l-yellow-500",
  },
};

export default async function Home() {
  // Fetch the latest published patch and its changes from Supabase
  const { data: latestPatch, error } = await supabase
    .from('patches')
    .select('*, patch_changes(*)')
    .eq('is_published', true)
    .order('release_date', { ascending: false })
    .limit(1)
    .single();

  // Fetch all published patches for the archive
  const { data: allPatches } = await supabase
    .from('patches')
    .select('id, version_number, release_date')
    .eq('is_published', true)
    .order('release_date', { ascending: false });

  if (error) {
    console.error("Supabase error:", error.message);
  }

  // If there's no patch, show a loading or empty state
  if (!latestPatch) {
    return (
      <main className="min-h-screen bg-background">
        <HeroSection />
        <div className="text-center p-8">Awaiting data from the database...</div>
        <Footer />
      </main>
    )
  }

  const changes = latestPatch.patch_changes as PatchChange[];

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />

      {/* Dynamic Patch Notes Section */}
      <section className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold uppercase tracking-wider">
            Patch {latestPatch.version_number}
          </h2>
          <p className="text-neutral-400 mt-2">
            Released on {new Date(latestPatch.release_date).toLocaleDateString()}
          </p>
        </div>

        <div className="grid gap-4">
          {changes.map((change) => {
            const style = typeStyles[change.type];
            return (
              <Card
                key={change.id}
                className={`border-l-4 bg-neutral-900 border-neutral-800 text-neutral-200 ${style?.borderColor ?? 'border-l-gray-500'}`}
              >
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <div className="flex items-center gap-3">
                    {style?.icon}
                    <CardTitle className="text-xl font-bold">{change.entity_name}</CardTitle>
                  </div>
                  <Badge variant="outline" className="uppercase text-xs tracking-wider">
                    {change.type}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium text-white mb-2">
                    {change.simplified_text}
                  </p>
                  <p className="text-sm font-mono text-neutral-500 border-l-2 border-neutral-800 pl-3">
                    DEV NOTE: "{change.official_text}"
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Transmission Archive Section */}
      <section className="max-w-4xl mx-auto py-8 px-4 mt-12 border-t border-neutral-800">
        <h2 className="text-2xl font-bold mb-6 text-white">Transmission Archive</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allPatches?.map((patch) => (
            <a
              key={patch.id}
              href={`/patch/${patch.id}`}
              className="block p-4 rounded border border-neutral-800 hover:border-primary/50 hover:bg-neutral-900 transition"
            >
              <span className="text-primary font-mono text-sm">V. {patch.version_number}</span>
              <div className="text-neutral-400 text-xs mt-1">
                {new Date(patch.release_date).toLocaleDateString()}
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
