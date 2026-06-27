import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowRight, Cpu, Eye, Network, Zap, Shield, ChevronDown } from "lucide-react";
import TransmissionLog from "@/components/ui/TransmissionLog";
import AnimateIn from "@/components/ui/AnimateIn";
import type { Member, ProjectLog } from "@/lib/types";

const tracks = [
  { icon: Cpu,     label: "Embedded Systems", desc: "Firmware, microcontrollers, low-level hardware-software integration.", index: "01" },
  { icon: Eye,     label: "Edge AI / Vision",  desc: "Computer vision, neural inference deployed directly on edge hardware.", index: "02" },
  { icon: Network, label: "Networks & OS",     desc: "Distributed systems, real-time operating systems, protocol design.",  index: "03" },
  { icon: Zap,     label: "Robotics / Mech",   desc: "Mechanical design, actuators, kinematics, motion control systems.",   index: "04" },
  { icon: Shield,  label: "Ethical Hacking",   desc: "Security research, vulnerability analysis, defensive engineering.",    index: "05" },
];

const marqueeItems = [
  "AUTOMATION", "NETWORKS", "VISION", "INTELLIGENT LABS",
  "WE DESIGN", "WE CODE", "WE BUILD", "ROBOTICS", "EDGE AI", "EMBEDDED SYSTEMS",
];

const stats = [
  { value: "₹1Cr+", label: "Seed Funding"    },
  { value: "2024",  label: "Founded"          },
  { value: "NGP",   label: "Nagpur, India"    },
  { value: "1st",   label: "Student Humanoid" },
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
    <div>

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden pb-12">

        {/* Grid */}
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />

        {/* Large copper glow — top left */}
        <div className="absolute pointer-events-none" style={{
          top: "-20%", left: "-10%",
          width: "70vw", height: "70vw",
          background: "radial-gradient(circle, rgba(184,115,51,0.07) 0%, transparent 60%)",
        }} />

        {/* Accent glow — bottom right */}
        <div className="absolute pointer-events-none" style={{
          bottom: "-10%", right: "-5%",
          width: "45vw", height: "45vw",
          background: "radial-gradient(circle, rgba(201,149,42,0.05) 0%, transparent 55%)",
        }} />

        {/* Left edge index */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 pl-1">
          <div className="w-px h-20 bg-gradient-to-b from-transparent to-iron-border" />
          <span className="hero-index">ANVIL-RBU-2024</span>
          <div className="w-px h-20 bg-gradient-to-t from-transparent to-iron-border" />
        </div>

        {/* Main headline */}
        <div className="relative flex-1 flex flex-col justify-center">
          {/* Eyebrow */}
          <p className="eyebrow mb-6" style={{ animation: "fadeIn 0.7s ease 0.1s both" }}>
            Ramdeobaba University — Nagpur, India
          </p>

          {/* HERO WORDMARK */}
          <div style={{ animation: "fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both" }}>
            <h1
              className="font-mono font-bold leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(4.5rem, 18vw, 16rem)" }}
            >
              <span className="text-metallic-copper">ANVIL</span>
            </h1>
            <p
              className="font-sans font-bold leading-[1.0] text-off-white/90"
              style={{ fontSize: "clamp(1.1rem, 3.5vw, 3rem)", marginTop: "0.3em" }}
            >
              Building India's First<br className="hidden sm:block" />
              <span className="text-metallic-copper-animate"> Student Humanoid Robot.</span>
            </p>
          </div>

          {/* Subtitle row */}
          <div
            className="flex flex-wrap items-center gap-3 mt-6 mb-10"
            style={{ animation: "fadeUp 0.8s ease 0.55s both" }}
          >
            {["Automation","Networks","Vision","Intelligent Labs"].map((w, i, arr) => (
              <span key={w} className="flex items-center gap-3">
                <span className="font-mono text-[0.58rem] tracking-[0.28em] uppercase text-ash">{w}</span>
                {i < arr.length - 1 && <span className="text-iron-border-light text-xs">·</span>}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4" style={{ animation: "fadeUp 0.8s ease 0.75s both" }}>
            <Link href="/logs" className="btn btn-primary group">
              View Project Logs
              <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/forge" className="btn btn-ghost">
              Propose an Idea
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="relative flex items-end justify-between"
          style={{ animation: "fadeIn 1s ease 1.2s both" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map(s => (
              <div key={s.label} className="flex flex-col gap-1">
                <p className="font-mono font-bold text-metallic-copper" style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}>
                  {s.value}
                </p>
                <p className="font-mono text-[0.52rem] tracking-[0.22em] uppercase text-ash">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Scroll cue */}
          <div className="hidden md:flex flex-col items-center gap-2 pb-1">
            <span className="font-mono text-[0.45rem] tracking-[0.25em] uppercase text-ash/40">Scroll</span>
            <ChevronDown size={12} className="text-ash/30 animate-bounce" />
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          MARQUEE
      ═══════════════════════════════════════ */}
      <div className="marquee-wrap my-20 -mx-6 md:-mx-12">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-mono text-[0.58rem] tracking-[0.32em] uppercase text-ash whitespace-nowrap px-6">
              {item}
              <span className="mx-6 text-iron-border">·</span>
            </span>
          ))}
        </div>
      </div>


      {/* ═══════════════════════════════════════
          HUMANOID PROJECT — CENTREPIECE
      ═══════════════════════════════════════ */}
      <AnimateIn className="mb-28">
        <section className="relative overflow-hidden border border-iron-border bg-iron-mid/30">
          {/* Diagonal copper line */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div style={{
              position: "absolute", top: 0, right: 0,
              width: "50%", height: "100%",
              background: "linear-gradient(135deg, transparent 40%, rgba(184,115,51,0.04) 100%)",
            }} />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: content */}
            <div className="p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-iron-border flex flex-col justify-between">
              <div>
                <span className="eyebrow block mb-6">Primary Mission</span>
                <h2 className="font-mono font-bold leading-[1.0] text-off-white mb-6"
                    style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
                  Project<br />
                  <span className="text-metallic-copper">HUMANOID</span>
                </h2>
                <p className="text-smoke text-base leading-relaxed max-w-md mb-4">
                  ANVIL's defining objective is to engineer and build India's first
                  fully capable humanoid robot — entirely by university students,
                  from hardware to AI stack.
                </p>
                <p className="text-ash text-sm leading-relaxed max-w-md">
                  Backed by ₹1 crore in seed funding, this is not a prototype exercise.
                  It is a production-grade robotics system, built at RBU Nagpur.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <span className="tag tag-copper">In Progress</span>
                <span className="tag tag-ash">Mechatronics</span>
                <span className="tag tag-ash">Edge AI</span>
                <span className="tag tag-ash">Embedded</span>
              </div>
            </div>

            {/* Right: visual — schematic placeholder */}
            <div className="relative min-h-[320px] lg:min-h-[440px] flex items-center justify-center p-10">
              {/* Animated radial glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div style={{
                  width: "60%", height: "60%",
                  background: "radial-gradient(circle, rgba(184,115,51,0.12) 0%, transparent 70%)",
                  animation: "glow 4s ease-in-out infinite",
                }} />
              </div>

              {/* Humanoid silhouette — geometric SVG */}
              <svg viewBox="0 0 160 280" fill="none" xmlns="http://www.w3.org/2000/svg"
                   className="relative z-10 w-32 md:w-44 opacity-80">
                <defs>
                  <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"  stopColor="#5C3010"/>
                    <stop offset="45%" stopColor="#E8C060"/>
                    <stop offset="55%" stopColor="#F5D880"/>
                    <stop offset="100%" stopColor="#5C3010"/>
                  </linearGradient>
                </defs>
                {/* Head */}
                <rect x="52" y="2" width="56" height="50" rx="4" stroke="url(#hg)" strokeWidth="1.5"/>
                {/* Eye dots */}
                <circle cx="72" cy="24" r="4" fill="rgba(184,115,51,0.4)"/>
                <circle cx="88" cy="24" r="4" fill="rgba(184,115,51,0.4)"/>
                {/* Neck */}
                <rect x="72" y="52" width="16" height="12" stroke="url(#hg)" strokeWidth="1.2"/>
                {/* Torso */}
                <rect x="40" y="64" width="80" height="80" rx="3" stroke="url(#hg)" strokeWidth="1.5"/>
                {/* Chest panel */}
                <rect x="56" y="76" width="48" height="28" rx="2" stroke="rgba(184,115,51,0.35)" strokeWidth="1"/>
                {/* Pelvis */}
                <rect x="52" y="144" width="56" height="24" rx="2" stroke="url(#hg)" strokeWidth="1.2"/>
                {/* Left arm */}
                <rect x="8" y="64" width="28" height="68" rx="14" stroke="url(#hg)" strokeWidth="1.3"/>
                {/* Right arm */}
                <rect x="124" y="64" width="28" height="68" rx="14" stroke="url(#hg)" strokeWidth="1.3"/>
                {/* Left leg */}
                <rect x="44" y="168" width="28" height="76" rx="14" stroke="url(#hg)" strokeWidth="1.3"/>
                {/* Right leg */}
                <rect x="88" y="168" width="28" height="76" rx="14" stroke="url(#hg)" strokeWidth="1.3"/>
                {/* Joint dots */}
                <circle cx="22" cy="132" r="3" stroke="rgba(184,115,51,0.5)" strokeWidth="1"/>
                <circle cx="138" cy="132" r="3" stroke="rgba(184,115,51,0.5)" strokeWidth="1"/>
                <circle cx="58" cy="244" r="3" stroke="rgba(184,115,51,0.5)" strokeWidth="1"/>
                <circle cx="102" cy="244" r="3" stroke="rgba(184,115,51,0.5)" strokeWidth="1"/>
              </svg>

              {/* Corner labels */}
              {[
                { text: "ACTUATORS",     style: { top: "10%",  left: "8%"  } },
                { text: "EDGE AI",       style: { top: "10%",  right: "8%" } },
                { text: "SENSORS",       style: { bottom: "10%", left: "8%"  } },
                { text: "POWER SYS",     style: { bottom: "10%", right: "8%" } },
              ].map(({ text, style }) => (
                <span key={text}
                  className="absolute font-mono text-[0.45rem] tracking-[0.22em] uppercase"
                  style={{ ...style, color: "rgba(184,115,51,0.45)" }}
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
        </section>
      </AnimateIn>


      {/* ═══════════════════════════════════════
          MISSION — ABOUT ANVIL
      ═══════════════════════════════════════ */}
      <AnimateIn className="mb-28" delay={60}>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Label column */}
          <div className="lg:col-span-4">
            <span className="accent-line" />
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-ash mb-4">
              What is ANVIL?
            </h2>
            <h3 className="font-sans font-bold leading-[1.1] text-off-white"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
              Not a club.
              <br />
              <span className="text-metallic-copper">A forge.</span>
            </h3>
          </div>

          {/* Content column */}
          <div className="lg:col-span-8 space-y-6">
            <p className="text-smoke text-lg leading-relaxed">
              ANVIL — Automation, Networks, Vision & Intelligent Labs — was founded
              at Ramdeobaba University, Nagpur in 2024 with two mandates: to embed a real
              culture of robotics at RBU, and to build a fully capable humanoid robot.
            </p>
            <p className="text-ash text-sm leading-relaxed">
              With ₹1 crore in seed funding and a team of engineers across mechatronics,
              edge AI, embedded systems, and autonomous platforms, ANVIL is doing something
              unprecedented at the Indian university level — shipping real, production-grade
              robotic systems, not just prototypes.
            </p>

            {/* Founder callout */}
            <div className="border-l-2 pl-5 mt-8" style={{ borderColor: "#B87333" }}>
              <p className="text-off-white font-semibold text-sm">Pranay Parihar</p>
              <p className="font-mono text-[0.55rem] tracking-[0.2em] uppercase mt-0.5" style={{ color: "#B87333" }}>
                Founder &amp; President, ANVIL RBU
              </p>
              <p className="text-ash text-xs mt-2 leading-relaxed">
                "We don't talk about the future. We build it."
              </p>
            </div>
          </div>
        </section>
      </AnimateIn>


      {/* ═══════════════════════════════════════
          DIVIDER
      ═══════════════════════════════════════ */}
      <hr className="divider-copper mb-28" />


      {/* ═══════════════════════════════════════
          TECHNICAL TRACKS
      ═══════════════════════════════════════ */}
      <AnimateIn className="mb-28" delay={80}>
        <section>
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="eyebrow block mb-3">What we work on</span>
              <h2 className="font-mono text-2xl md:text-3xl font-bold text-off-white">
                Technical Tracks
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-iron-border">
            {tracks.map(t => (
              <div key={t.label} className="track-cell group">
                <div className="flex items-start justify-between mb-6">
                  <t.icon size={18} className="transition-all duration-300" style={{ color: "rgba(184,115,51,0.7)" }} />
                  <span className="font-mono text-[0.5rem] tracking-[0.2em]" style={{ color: "rgba(184,115,51,0.3)" }}>
                    {t.index}
                  </span>
                </div>
                <p className="font-mono text-sm font-bold text-off-white mb-2 transition-colors duration-300 group-hover:text-metallic-copper">
                  {t.label}
                </p>
                <p className="text-ash text-xs leading-relaxed">{t.desc}</p>
              </div>
            ))}

            {/* Sixth cell — CTA */}
            <div className="track-cell flex flex-col justify-between group" style={{ minHeight: "140px" }}>
              <div>
                <p className="font-mono text-[0.55rem] tracking-[0.25em] uppercase mb-2" style={{ color: "rgba(184,115,51,0.5)" }}>
                  Your domain
                </p>
                <p className="font-mono text-sm font-bold text-iron-border-light group-hover:text-off-white transition-colors duration-300">
                  Bring your expertise.
                </p>
              </div>
              <Link href="/forge" className="mt-4 btn btn-outline-copper py-2 px-4 text-[0.52rem] self-start">
                Propose a track <ArrowRight size={10} />
              </Link>
            </div>
          </div>
        </section>
      </AnimateIn>


      {/* ═══════════════════════════════════════
          FOUNDING MEMBERS
      ═══════════════════════════════════════ */}
      <AnimateIn className="mb-28" delay={60}>
        <section>
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="eyebrow block mb-3">Founding batch</span>
              <h2 className="font-mono text-2xl md:text-3xl font-bold text-off-white">The Crew</h2>
            </div>
            <span className="font-mono text-[0.52rem] tracking-[0.2em] uppercase text-ash">
              {members?.length ?? 0}&nbsp;Members
            </span>
          </div>

          {members && members.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(members as Member[]).map((m, i) => (
                <AnimateIn key={m.id} delay={i * 60}>
                  <div className="card card-accent copper-glow-border h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center font-mono text-sm font-bold border"
                        style={{ background: "rgba(184,115,51,0.06)", borderColor: "rgba(184,115,51,0.25)", color: "#B87333" }}
                      >
                        {m.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)}
                      </div>
                      <span className="tag tag-green">Active</span>
                    </div>
                    <p className="font-semibold text-off-white">{m.name}</p>
                    <p className="font-mono text-[0.55rem] tracking-[0.18em] uppercase mt-1" style={{ color: "#B87333" }}>
                      {m.role}
                    </p>
                    <p className="text-ash text-xs mt-2">{m.track} · {m.year}</p>
                    {m.bio && (
                      <p className="text-sm text-smoke mt-3 leading-relaxed line-clamp-3">{m.bio}</p>
                    )}
                  </div>
                </AnimateIn>
              ))}
            </div>
          ) : (
            <div className="card text-center py-20">
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-ash">
                Members will appear here once added via Supabase.
              </p>
            </div>
          )}
        </section>
      </AnimateIn>


      {/* ═══════════════════════════════════════
          TRANSMISSION LOG
      ═══════════════════════════════════════ */}
      <AnimateIn className="mb-4" delay={60}>
        <section>
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="eyebrow block mb-3">Live feed</span>
              <h2 className="font-mono text-2xl md:text-3xl font-bold text-off-white">Transmission Log</h2>
            </div>
            <Link href="/logs" className="btn btn-ghost py-2 px-4 text-[0.52rem] group">
              All logs
              <ArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <TransmissionLog initialLogs={(logs as ProjectLog[]) ?? []} />
        </section>
      </AnimateIn>

    </div>
  );
}
