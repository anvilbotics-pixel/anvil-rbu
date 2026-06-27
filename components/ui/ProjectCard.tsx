"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Project, ProjectLog } from "@/lib/types";
import clsx from "clsx";

const STATUS_DOT: Record<string, string> = {
  active:   "dot-active",
  paused:   "dot-paused",
  complete: "dot-complete",
};

const TAG_OPTS = ["update", "milestone", "blocker", "fix", "note"] as const;

const TAG_COLORS: Record<string, string> = {
  kickoff:   "tag-gold",
  update:    "tag-ash",
  milestone: "tag-green",
  blocker:   "tag-red",
  fix:       "tag-green",
  note:      "tag-ash",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  });
}

export default function ProjectCard({
  project,
  logs: initialLogs,
  isAuthenticated,
  authorName,
}: {
  project: Project;
  logs: ProjectLog[];
  isAuthenticated: boolean;
  authorName: string;
}) {
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState<ProjectLog[]>(initialLogs);
  const [entry, setEntry] = useState("");
  const [tag, setTag] = useState<typeof TAG_OPTS[number]>("update");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const supabase = createClient();

  const postLog = async () => {
    if (!entry.trim()) return;
    setLoading(true);
    setErr("");
    const { data, error } = await supabase
      .from("project_logs")
      .insert({ project_id: project.id, author: authorName, entry: entry.trim(), tag })
      .select()
      .single();
    if (error) { setErr(error.message); }
    else {
      setLogs([data as ProjectLog, ...logs]);
      setEntry("");
    }
    setLoading(false);
  };

  return (
    <div className="card">
      {/* Header */}
      <button
        className="w-full text-left flex items-start justify-between gap-4"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={STATUS_DOT[project.status]} />
            <span className="font-mono text-xs tracking-widest text-forge-red uppercase">
              {project.codename}
            </span>
            <span className="tag tag-ash">{project.track}</span>
          </div>
          <h3 className="font-semibold text-off-white text-lg">{project.name}</h3>
          <p className="text-ash text-sm mt-1">Lead: {project.lead}</p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="font-mono text-[0.6rem] tracking-wider text-ash uppercase">
            {logs.length} {logs.length === 1 ? "entry" : "entries"}
          </span>
          {open ? <ChevronUp size={16} className="text-ash" /> : <ChevronDown size={16} className="text-ash" />}
        </div>
      </button>

      {/* Expanded */}
      {open && (
        <div className="mt-6 border-t border-iron-border pt-5">
          <p className="text-smoke text-sm mb-5 leading-relaxed">{project.description}</p>

          {/* Log timeline */}
          <div className="space-y-0">
            {logs.length === 0 ? (
              <p className="text-ash text-sm">No log entries yet.</p>
            ) : (
              logs.map((l, i) => (
                <div key={l.id} className={clsx("log-line", i === 0 && "latest")}>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={clsx("tag text-[0.55rem]", TAG_COLORS[l.tag] ?? "tag-ash")}>
                      {l.tag}
                    </span>
                    <span className="font-mono text-[0.6rem] text-ash">{fmtDate(l.created_at)}</span>
                    <span className="font-mono text-[0.6rem] text-ash">· {l.author}</span>
                  </div>
                  <p className="text-smoke text-sm leading-relaxed">{l.entry}</p>
                </div>
              ))
            )}
          </div>

          {/* Post log — auth only */}
          {isAuthenticated && (
            <div className="mt-6 pt-5 border-t border-iron-border">
              <p className="eyebrow mb-3">Post log entry</p>
              <div className="flex gap-2 mb-3">
                {TAG_OPTS.map(t => (
                  <button
                    key={t}
                    onClick={() => setTag(t)}
                    className={clsx(
                      "tag cursor-pointer transition-colors",
                      tag === t ? "tag-red border-forge-red text-forge-red" : "tag-ash"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="field mb-3">
                <textarea
                  rows={3}
                  value={entry}
                  onChange={e => setEntry(e.target.value)}
                  placeholder="What happened? Be specific — future you will thank present you."
                />
              </div>
              {err && <p className="text-forge-red font-mono text-xs mb-2">{err}</p>}
              <button
                onClick={postLog}
                disabled={loading || !entry.trim()}
                className="btn btn-primary disabled:opacity-40"
              >
                <Send size={13} />
                {loading ? "Posting..." : "Post entry"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
