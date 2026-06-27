"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ProjectLog } from "@/lib/types";
import clsx from "clsx";

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

export default function TransmissionLog({ initialLogs }: { initialLogs: ProjectLog[] }) {
  const [logs, setLogs] = useState<ProjectLog[]>(initialLogs);
  const supabase = createClient();

  // Subscribe to real-time inserts
  useEffect(() => {
    const channel = supabase
      .channel("project_logs_feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "project_logs" },
        async (payload) => {
          // Fetch the new log with its project info
          const { data } = await supabase
            .from("project_logs")
            .select("*, project:projects(name, codename)")
            .eq("id", payload.new.id)
            .single();
          if (data) setLogs(prev => [data as ProjectLog, ...prev].slice(0, 8));
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="terminal">
      {/* Terminal bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-iron-border">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E05252]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#E0C452]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#52C452]" />
        <span className="ml-auto font-mono text-[0.6rem] tracking-widest text-ash uppercase">
          anvil@rbu — transmission.log
        </span>
        <span className="dot-active" />
      </div>

      {logs.length === 0 ? (
        <p className="text-ash text-sm py-4 text-center">
          No transmissions yet. First log entry will appear here in real-time.
        </p>
      ) : (
        <div className="space-y-4">
          {logs.map((log, i) => (
            <div key={log.id} className={clsx("flex gap-3 text-sm animate-slide-up", i === 0 && "")}>
              <span className="text-ash shrink-0 w-4">{i === 0 ? "▶" : " "}</span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-forge-red font-mono text-xs">
                    {/* @ts-ignore */}
                    [{log.project?.codename ?? "—"}]
                  </span>
                  <span className={clsx("tag text-[0.55rem]", TAG_COLORS[log.tag] ?? "tag-ash")}>
                    {log.tag}
                  </span>
                  <span className="text-ash text-xs">{fmtDate(log.created_at)}</span>
                  <span className="text-ash text-xs">· {log.author}</span>
                </div>
                <p className="text-smoke leading-relaxed">{log.entry}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
