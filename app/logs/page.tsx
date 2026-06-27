import { createClient } from "@/lib/supabase/server";
import ProjectCard from "@/components/ui/ProjectCard";
import type { Project, ProjectLog } from "@/lib/types";

export const revalidate = 0; // always fresh

export default async function LogsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = user?.email === "anvilbotics@gmail.com";

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at");

  const { data: logs } = await supabase
    .from("project_logs")
    .select("*")
    .order("created_at", { ascending: false });

  const logsByProject: Record<string, ProjectLog[]> = {};
  (logs ?? []).forEach((l: ProjectLog) => {
    if (!logsByProject[l.project_id]) logsByProject[l.project_id] = [];
    logsByProject[l.project_id].push(l);
  });

  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <p className="eyebrow mb-2">Updated in real-time</p>
        <h1 className="font-mono text-3xl md:text-4xl font-bold text-off-white">Project Logs</h1>
        <p className="text-ash text-sm mt-2 max-w-xl">
          Every project ANVIL is running, with a full timestamped log of progress.
          {isAdmin
            ? " Logged in as admin — you can post log entries below."
            : " Log entries are posted by the ANVIL team."}
        </p>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-ash">No projects yet. Add one via Supabase.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {(projects as Project[]).map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              logs={logsByProject[project.id] ?? []}
              isAuthenticated={isAdmin}
              authorName={user?.email ?? ""}
            />
          ))}
        </div>
      )}
    </div>
  );
}
