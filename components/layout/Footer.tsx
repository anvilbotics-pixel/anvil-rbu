import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-iron-border mt-24">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-10 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="ANVIL logo" width={28} height={28} className="rounded-full shrink-0" />
            <span className="font-mono text-sm font-bold tracking-[0.22em] text-off-white">ANVIL</span>
            <span className="font-mono text-[0.48rem] tracking-[0.18em] border border-iron-border text-ash px-1.5 py-0.5">RBU</span>
          </div>
          <p className="font-mono text-[0.55rem] tracking-[0.18em] uppercase text-ash leading-relaxed">
            Automation · Networks · Vision<br />Intelligent Labs
          </p>
          <p className="font-mono text-[0.52rem] tracking-[0.15em] uppercase" style={{ color: "rgba(184,115,51,0.6)" }}>
            We Design · We Code · We Build
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4">
          <p className="font-mono text-[0.55rem] tracking-[0.25em] uppercase text-iron-border-light mb-1">Navigate</p>
          {[
            { href: "/logs",    label: "Project Logs" },
            { href: "/forge",   label: "Forge — Submit Ideas" },
            { href: "/arsenal", label: "Arsenal" },
            { href: "/about",   label: "About ANVIL" },
          ].map(l => (
            <Link key={l.href} href={l.href}
              className="font-mono text-[0.55rem] tracking-[0.18em] uppercase text-ash hover:text-copper transition-colors duration-300">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Contact & founder */}
        <div className="flex flex-col gap-4">
          <p className="font-mono text-[0.55rem] tracking-[0.25em] uppercase text-iron-border-light mb-1">Contact</p>
          <div>
            <p className="text-off-white text-sm font-semibold">Pranay Parihar</p>
            <p className="font-mono text-[0.52rem] tracking-[0.18em] uppercase mt-0.5" style={{ color: "#B87333" }}>
              Founder &amp; President
            </p>
          </div>
          <Link
            href="mailto:anvilbotics@gmail.com"
            className="font-mono text-[0.55rem] tracking-[0.18em] uppercase text-ash hover:text-copper transition-colors duration-300"
          >
            anvilbotics@gmail.com
          </Link>
          <div className="flex gap-5 mt-1">
            <Link
              href="https://instagram.com/anvil_rbu"
              target="_blank" rel="noopener noreferrer"
              className="font-mono text-[0.52rem] tracking-[0.18em] uppercase text-ash hover:text-copper transition-colors duration-300"
            >
              @anvil_rbu
            </Link>
            <Link
              href="https://github.com/anvilbotics-pixel/anvil-rbu"
              target="_blank" rel="noopener noreferrer"
              className="font-mono text-[0.52rem] tracking-[0.18em] uppercase text-ash hover:text-copper transition-colors duration-300"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-iron-border/50">
        <p className="font-mono text-[0.52rem] tracking-[0.18em] uppercase text-ash/50">
          © {new Date().getFullYear()} ANVIL — Ramdeobaba University · Nagpur, India
        </p>
        <p className="font-mono text-[0.52rem] tracking-[0.18em] uppercase text-ash/40">
          Backed by TattvaSilicon
        </p>
      </div>

      {/* Bottom copper line */}
      <div className="h-px" style={{
        background: "linear-gradient(to right, transparent, rgba(184,115,51,0.35) 30%, rgba(184,115,51,0.35) 70%, transparent)"
      }} />
    </footer>
  );
}
