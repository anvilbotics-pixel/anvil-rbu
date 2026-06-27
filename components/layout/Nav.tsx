"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, LogOut, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import clsx from "clsx";

const links = [
  { href: "/",        label: "Home" },
  { href: "/logs",    label: "Logs" },
  { href: "/forge",   label: "Forge" },
  { href: "/arsenal", label: "Arsenal" },
  { href: "/about",   label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => setUser(session?.user ?? null)
    );
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-iron-black/90 backdrop-blur-md border-b border-iron-border">
      <div className="max-w-6xl mx-auto h-full px-5 md:px-10 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-mono text-lg font-bold tracking-wider text-off-white flex items-center gap-2">
          <span className="text-forge-red">▲</span> ANVIL
          <span className="font-mono text-[0.6rem] tracking-[0.15em] text-gold border border-gold px-1.5 py-0.5 ml-1">
            RBU
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* Auth + mobile toggle */}
        <div className="flex items-center gap-3">
          {user ? (
            <button onClick={handleSignOut} className="hidden md:flex btn btn-ghost py-1.5 px-3">
              <LogOut size={13} /> Sign out
            </button>
          ) : (
            <Link href="/auth/login" className="hidden md:flex btn btn-ghost py-1.5 px-3">
              <LogIn size={13} /> Member login
            </Link>
          )}
          <button
            className="md:hidden text-ash hover:text-off-white"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-iron-dark border-b border-iron-border px-5 py-6 flex flex-col gap-5">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={clsx("nav-link text-sm", { active: pathname === l.href })}
            >
              {l.label}
            </Link>
          ))}
          <hr className="border-iron-border" />
          {user ? (
            <button onClick={handleSignOut} className="btn btn-ghost text-left w-fit">
              <LogOut size={13} /> Sign out
            </button>
          ) : (
            <Link href="/auth/login" onClick={() => setOpen(false)} className="btn btn-ghost w-fit">
              <LogIn size={13} /> Member login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
