import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-iron-border py-6 px-5 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="font-mono text-[0.65rem] tracking-widest text-ash uppercase">
          © {new Date().getFullYear()} ANVIL — Ramdeobaba University, Nagpur
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="https://instagram.com/anvil_rbu"
            target="_blank"
            className="font-mono text-[0.65rem] tracking-widest uppercase text-ash hover:text-forge-red transition-colors"
          >
            @anvil_rbu
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            className="font-mono text-[0.65rem] tracking-widest uppercase text-ash hover:text-forge-red transition-colors"
          >
            GitHub
          </Link>
          <span className="font-mono text-[0.65rem] tracking-widest text-ash uppercase">
            Backed by TattvaSilicon
          </span>
        </div>
      </div>
    </footer>
  );
}
