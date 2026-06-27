"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import clsx from "clsx";

const links = [
  { href: "/logs",    label: "Logs"    },
  { href: "/forge",   label: "Forge"   },
  { href: "/arsenal", label: "Arsenal" },
  { href: "/about",   label: "About"   },
];

const ADMIN_EMAIL = "anvilbotics@gmail.com";

export default function Nav() {
  const pathname  = usePathname();
  const router    = useRouter();
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user,     setUser]     = useState<User | null>(null);
  const supabase  = createClient();

  /* ── scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* ── auth ── */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => setUser(session?.user ?? null)
    );
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
  };

  return (
    <>
      {/* ── TOP BAR ── */}
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "h-14 bg-[#0A0805]/96 backdrop-blur-xl border-b border-iron-border/60"
            : "h-20 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
            {/* Copper triangle mark */}
            <svg
              width="22" height="20" viewBox="0 0 22 20"
              fill="none" xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <defs>
                <linearGradient id="nav-copper" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#5C3010"/>
                  <stop offset="45%"  stopColor="#E8C060"/>
                  <stop offset="55%"  stopColor="#F5D880"/>
                  <stop offset="100%" stopColor="#5C3010"/>
                </linearGradient>
              </defs>
              <polygon points="11,1 21,19 1,19" fill="none" stroke="url(#nav-copper)" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>

            <span className="font-mono text-[0.85rem] font-bold tracking-[0.22em] text-off-white transition-all duration-300 group-hover:text-metallic-copper">
              ANVIL
            </span>

            <span className="hidden sm:inline font-mono text-[0.48rem] tracking-[0.18em] border border-iron-border text-ash px-1.5 py-0.5 transition-colors duration-300 group-hover:border-copper/30 group-hover:text-copper">
              RBU
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx("nav-link", { active: pathname === l.href })}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right: auth + hamburger */}
          <div className="flex items-center gap-4">
            {user ? (
              <button
                onClick={handleSignOut}
                className="hidden md:flex btn btn-ghost py-2 px-4 text-[0.52rem]"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="hidden md:flex btn btn-ghost py-2 px-4 text-[0.52rem]"
              >
                Member Login
              </Link>
            )}

            {/* Animated hamburger */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 relative z-[60]"
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span
                className="block h-px w-6 bg-off-white transition-all duration-300 origin-center"
                style={{ transform: open ? "rotate(45deg) translateY(6px)" : "none" }}
              />
              <span
                className="block h-px w-6 bg-off-white transition-all duration-300"
                style={{ opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "scaleX(1)" }}
              />
              <span
                className="block h-px w-6 bg-off-white transition-all duration-300 origin-center"
                style={{ transform: open ? "rotate(-45deg) translateY(-6px)" : "none" }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ── FULLSCREEN MOBILE MENU ── */}
      <div
        className={clsx(
          "fixed inset-0 z-40 flex flex-col justify-center px-8 md:hidden",
          "bg-iron-black transition-all duration-500",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Background texture */}
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

        <div className="relative space-y-2">
          {/* Index + links */}
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 group py-3 border-b border-iron-border/30"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.4s ease ${i * 70 + 100}ms, transform 0.4s ease ${i * 70 + 100}ms`,
              }}
            >
              <span className="font-mono text-[0.5rem] text-ash/40 w-4">0{i + 1}</span>
              <span
                className={clsx(
                  "font-mono text-4xl font-bold tracking-wider transition-all duration-300",
                  pathname === l.href ? "text-metallic-copper" : "text-iron-border-light group-hover:text-off-white"
                )}
              >
                {l.label}
              </span>
            </Link>
          ))}

          {/* Auth */}
          <div
            className="pt-8"
            style={{
              opacity: open ? 1 : 0,
              transition: `opacity 0.4s ease ${links.length * 70 + 200}ms`,
            }}
          >
            {user ? (
              <button onClick={handleSignOut} className="btn btn-ghost text-left">
                Sign out
              </button>
            ) : (
              <Link href="/auth/login" onClick={() => setOpen(false)} className="btn btn-outline-copper">
                Member Login
              </Link>
            )}
          </div>
        </div>

        {/* Bottom info */}
        <div
          className="absolute bottom-10 left-8 right-8 flex items-center justify-between"
          style={{
            opacity: open ? 1 : 0,
            transition: `opacity 0.5s ease 500ms`,
          }}
        >
          <span className="font-mono text-[0.52rem] tracking-[0.2em] uppercase text-ash/40">
            Ramdeobaba University
          </span>
          <span className="font-mono text-[0.52rem] tracking-[0.2em] uppercase text-ash/40">
            Nagpur, India
          </span>
        </div>
      </div>
    </>
  );
}
