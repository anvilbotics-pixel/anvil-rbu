import { createClient } from "@/lib/supabase/server";
import ForgeBoard from "@/components/ui/ForgeBoard";
import type { ForgeIdea } from "@/lib/types";

export const revalidate = 60;

export default async function ForgePage() {
  const supabase = createClient();
  const { data: ideas } = await supabase
    .from("forge_ideas")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <p className="eyebrow mb-2">Open to everyone</p>
        <h1 className="font-mono text-3xl md:text-4xl font-bold text-off-white">The Forge</h1>
        <p className="text-ash text-sm mt-2 max-w-xl">
          Got an idea, project concept, or design you want to throw into the mix?
          Drop it here — ANVIL members, students from other colleges, or anyone with
          a working brain is welcome. Submissions are reviewed before going public.
        </p>
      </div>
      <ForgeBoard initialIdeas={(ideas as ForgeIdea[]) ?? []} />
    </div>
  );
}
