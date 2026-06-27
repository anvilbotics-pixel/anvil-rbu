"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) { setErr("Email and password required."); return; }
    setLoading(true); setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setErr(error.message); setLoading(false); }
    else { router.push("/logs"); router.refresh(); }
  };

  return (
    <div className="animate-fade-in max-w-md mx-auto pt-8">
      <p className="eyebrow mb-3">Members only</p>
      <h1 className="font-mono text-2xl font-bold text-off-white mb-2">Sign in to ANVIL</h1>
      <p className="text-ash text-sm mb-8">
        Member accounts are created by the club president. Once you have credentials, sign in here to post project log entries.
      </p>

      <div className="card space-y-4">
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@rbu.ac.in"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </div>
        {err && <p className="text-forge-red font-mono text-xs">{err}</p>}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="btn btn-primary w-full justify-center disabled:opacity-40"
        >
          <LogIn size={14} />
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </div>

      <p className="text-ash text-xs font-mono mt-6 text-center">
        Not a member? Apply during recruitment on{" "}
        <a href="https://instagram.com/anvil_rbu" target="_blank" className="text-gold hover:underline">
          @anvil_rbu
        </a>
      </p>
    </div>
  );
}
