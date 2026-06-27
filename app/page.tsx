import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowRight, Zap, Cpu, Eye, Network, Shield } from "lucide-react";
import TransmissionLog from "@/components/ui/TransmissionLog";
import type { Member, ProjectLog } from "@/lib/types";

const tracks = [
  { icon: Cpu,     label: "Embedded Systems" },
  { icon: Eye,     label: "Edge AI / Vision" },
  { icon: Network, label: "Networks & OS" },
  { icon: Zap,     label: "Robotics / Mech" },
  { icon: Shield,  label: "Ethical Hacking" },
];

export default async function Home() {
  const supabase = createClient();

  const { data: members } = await supabase
    .from("members")
    .select("*")
    .order("created_at");

  const { data: logs } = await supabase
    .from("project_logs")
    .select("*, project:projects(name, codename)")
    .order("created_at", { ascending: false })
    .limit(8);

  return (
    <div className="animate-fade-in">

      {/* ── HERO ── */}
      <section className="py-8 md:py-16 border-b border-iron-border mb-12">
        <p className="eyebrow mb-4">Ramdeobaba University — Nagpur</p>
        <h1 className="font-mono text-5xl md:text-7xl font-bold tracking-tight text-off-white leading-none mb-6">
          ANVIL
        </h1>
        <p className="text-lg md:text-xl text-smoke max-w-xl leading-relaxed mb-2">
          Automation, Networks, Vision &amp; Intelligent Labs.
        </p>
        <p className="text-sm text-ash max-w-2xl mb-8">
          An engineering and robotics club building real systems — combat robots,
          autonomous platforms, and silicon-level hardware. Backed by{" "}
          <a href="https://tattvasilicon.com" target="_blank" className="text-gold hover:underline">
            TattvaSilicon
          </a>{" "}
          and Ramdeobaba University.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/forge" className="btn btn-primary">
            Submit an idea <ArrowRight size={14} />
          </Link>
          <Link href="/logs" className="btn btn-ghost">
            View project logs
          </Link>
        </div>
      </section>

      {/* ── TRACKS ── */}
      <section className="mb-12">
        <p className="eyebrow mb-6">Technical tracks</p>
        <div className="flex flex-wrap gap-3">
          {tracks.map(t => (
            <div key={t.label} className="flex items-center gap-2 border border-iron-border px-3 py-2">
              <t.icon size={13} className="text-forge-red" />
              <span className="font-mono text-xs tracking-widest uppercase text-ash">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-iron-border mb-12" />

      {/* ── MEMBERS ── */}
      <section className="mb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="eyebrow mb-1">Founding batch</p>
            <h2 className="font-mono text-2xl font-bold text-off-white">The Crew</h2>
          </div>
          <span className="font-mono text-xs text-ash">{members?.length ?? 0} members</span>
        </div>

        {members && members.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(members as Member[]).map(m => (
              <div key={m.id} className="card card-accent group">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-full bg-iron-light border border-iron-border flex items-center justify-center font-mono text-gold text-sm font-bold">
                    {m.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)}
                  </div>
                  <span className="tag tag-green">Active</span>
                </div>
                <p className="font-semibold text-off-white">{m.name}</p>
                <p className="font-mono text-[0.65rem] tracking-wider text-forge-red uppercase mt-0.5">{m.role}</p>
                <p className="text-ash text-xs mt-2">{m.track} · {m.year}</p>
                {m.bio && <p className="text-sm text-smoke mt-3 leading-relaxed line-clamp-2">{m.bio}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-ash text-sm">Members will appear here once added via Supabase.</p>
          </div>
        )}
      </section>

      {/* ── LIVE TRANSMISSION LOG ── */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="eyebrow mb-1">Live feed</p>
            <h2 className="font-mono text-2xl font-bold text-off-white">Transmission Log</h2>
          </div>
          <Link href="/logs" className="btn btn-ghost py-1.5 px-3 text-[0.65rem]">
            All logs <ArrowRight size={11} />
          </Link>
        </div>
        <TransmissionLog initialLogs={(logs as ProjectLog[]) ?? []} />
      </section>
    </div>
  );
}
