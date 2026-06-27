"use client";
import { useState } from "react";
import { Send, Lightbulb, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ForgeIdea } from "@/lib/types";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

export default function ForgeBoard({ initialIdeas }: { initialIdeas: ForgeIdea[] }) {
  const [ideas] = useState<ForgeIdea[]>(initialIdeas);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [form, setForm] = useState({
    title: "", author: "", affiliation: "",
    tags: "", description: "", contact: "",
  });

  const supabase = createClient();

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.author.trim() || !form.description.trim()) {
      setErr("Title, name, and description are required.");
      return;
    }
    setLoading(true);
    setErr("");
    const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);
    const { error } = await supabase.from("forge_ideas").insert({
      title: form.title.trim(),
      author: form.author.trim(),
      affiliation: form.affiliation.trim() || null,
      tags,
      description: form.description.trim(),
      contact: form.contact.trim() || null,
      approved: false,
    });
    if (error) { setErr(error.message); }
    else { setSubmitted(true); setShowForm(false); }
    setLoading(false);
  };

  const field = (key: keyof typeof form, label: string, placeholder: string, multiline = false) => (
    <div className="field">
      <label>{label}</label>
      {multiline ? (
        <textarea
          rows={4}
          value={form[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          value={form[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          placeholder={placeholder}
        />
      )}
    </div>
  );

  return (
    <div>
      {/* Submit CTA */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <span className="font-mono text-xs text-ash uppercase tracking-widest">
          {ideas.length} {ideas.length === 1 ? "idea" : "ideas"} on the board
        </span>
        {!showForm && !submitted && (
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            <Lightbulb size={14} /> Submit an idea
          </button>
        )}
        {submitted && (
          <div className="flex items-center gap-2 border border-[#5BA85A] px-4 py-2">
            <span className="dot-active" />
            <span className="font-mono text-xs text-[#5BA85A] uppercase tracking-wider">
              Received — under review
            </span>
          </div>
        )}
      </div>

      {/* Submission form */}
      {showForm && (
        <div className="card card-gold mb-8">
          <div className="flex items-center justify-between mb-5">
            <p className="eyebrow">New submission</p>
            <button onClick={() => setShowForm(false)} className="text-ash hover:text-off-white">
              <X size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {field("author", "Your name *", "e.g. Arjun Mehta")}
            {field("affiliation", "Affiliation", "College, company, or 'Independent'")}
          </div>
          {field("title", "Idea / project title *", "Keep it punchy")}
          <div className="field mt-4">
            <label>Description *</label>
            <textarea
              rows={5}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="What is it? What problem does it solve? What tech does it involve? The more specific, the better."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {field("tags", "Tags (comma-separated)", "e.g. autonomy, FPGA, vision")}
            {field("contact", "Contact (optional)", "Email or Instagram handle")}
          </div>
          {err && <p className="text-forge-red font-mono text-xs mt-3">{err}</p>}
          <div className="flex gap-3 mt-5">
            <button onClick={handleSubmit} disabled={loading} className="btn btn-primary disabled:opacity-40">
              <Send size={13} /> {loading ? "Submitting..." : "Submit for review"}
            </button>
            <button onClick={() => setShowForm(false)} className="btn btn-ghost">Cancel</button>
          </div>
          <p className="text-ash text-xs mt-3 font-mono">
            * Submissions are reviewed before going public. Usually within 24–48h.
          </p>
        </div>
      )}

      {/* Ideas board */}
      {ideas.length === 0 ? (
        <div className="card text-center py-16">
          <Lightbulb size={32} className="text-ash mx-auto mb-3" />
          <p className="text-ash text-sm">No approved ideas yet. Be the first to submit one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ideas.map(idea => (
            <div key={idea.id} className="card card-accent hover:border-iron-light transition-colors">
              <div className="flex flex-wrap gap-2 mb-3">
                {idea.tags.map(t => (
                  <span key={t} className="tag tag-ash">{t}</span>
                ))}
              </div>
              <h3 className="font-semibold text-off-white leading-snug mb-2">{idea.title}</h3>
              <p className="text-smoke text-sm leading-relaxed mb-4 line-clamp-4">{idea.description}</p>
              <div className="flex items-center justify-between text-xs font-mono text-ash">
                <span>
                  {idea.author}
                  {idea.affiliation && <span className="text-iron-border"> · {idea.affiliation}</span>}
                </span>
                <span>{fmtDate(idea.created_at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
