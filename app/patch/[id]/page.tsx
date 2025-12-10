import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { MoveUp, MoveDown, Wrench, Sparkles } from "lucide-react";

export const revalidate = 60;
export const dynamicParams = true; // (Já é true por defeito, mas fica explícito)

interface PatchChange {
  id: string;
  entity_name: string;
  type: 'buff' | 'nerf' | 'fix' | 'new' | 'adjustment';
  simplified_text: string;
  official_text: string;
}

export async function generateStaticParams() {
  const { data: patches } = await supabase.from('patches').select('id');
  return patches?.map(({ id }) => ({ id })) || [];
}

const typeStyles = {
  buff: { icon: <MoveUp className="w-4 h-4 text-green-500" /> },
  nerf: { icon: <MoveDown className="w-4 h-4 text-red-500" /> },
  fix: { icon: <Wrench className="w-4 h-4 text-blue-500" /> },
  new: { icon: <Sparkles className="w-4 h-4 text-yellow-500" /> },
  adjustment: { icon: <Wrench className="w-4 h-4 text-orange-500" /> }, 
};


 
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PatchPage({ params }: PageProps) {
  
  const { id } = await params;

  const { data: patch } = await supabase
    .from('patches')
    .select('*, patch_changes(*)')
    .eq('id', id)
    .single();

  if (!patch) {
    notFound(); 
  }

  const changes = patch.patch_changes as PatchChange[];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 border-b border-neutral-800 pb-6">
          <Link href="/" className="text-orange-500 hover:underline text-sm mb-4 block">← Back to Home</Link>
          <h1 className="text-3xl font-bold">Patch Notes <span className="text-neutral-500">{patch.version_number}</span></h1>
          <p className="text-neutral-400 mt-2">Released on {new Date(patch.release_date).toLocaleDateString()}</p>
        </header>

        <div className="space-y-6">
          {changes.map((change) => {
            // Fallback seguro caso venha um tipo que não definiste no style
            const style = typeStyles[change.type] || typeStyles['fix']; 
            
            return (
              <div key={change.id} className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
                <div className="flex items-center gap-2 mb-2">
                  {style.icon}
                  <h3 className="font-bold text-lg text-white">{change.entity_name}</h3>
                  <Badge variant="outline" className="ml-auto text-xs opacity-50 capitalize">{change.type}</Badge>
                </div>
                <p className="text-neutral-300 font-medium">{change.simplified_text}</p>
                <p className="text-neutral-600 text-sm mt-2 font-mono">{change.official_text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  );
}