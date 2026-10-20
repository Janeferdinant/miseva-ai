import React from "react";
import Link from "next/link";
import { Sparkles, Award, Shield, BookOpen, Bot, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-12 py-6 max-w-4xl mx-auto">
      {/* Hero */}
      <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-glass-border shadow-glass space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-xs font-bold">
          <Sparkles className="w-4 h-4" />
          <span>Academic Research Project</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground">
          About CulinaryVerse AI
        </h1>
        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-medium">
          “CulinaryVerse AI — Discover cuisines, learn techniques, and cook with confidence.”
        </p>
      </div>

      {/* Academic Branding & Research Supervision */}
      <div className="p-8 rounded-3xl glass-panel border border-brand-primary/40 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-accent p-0.5 shadow-lg flex-shrink-0">
            <div className="w-full h-full rounded-[14px] bg-background/80 flex items-center justify-center">
              <Award className="w-7 h-7 text-brand-primary" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-foreground">Jane Rose</h2>
            <div className="text-base font-bold text-brand-primary">Assistant Professor, CSE</div>
            <div className="text-xs text-foreground/60">Lead Academic Research & System Architecture</div>
          </div>
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed">
          CulinaryVerse AI is conceived as an autonomous, multi-agent AI system exploring the intersection of computer science, natural language processing, multilingual accessibility (focusing on Malayalam and Indian regional languages), and cultural gastronomy preservation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl glass-card">
            <div className="text-xs font-bold text-brand-primary">Authentic Indian Taxonomy</div>
            <div className="text-xs text-foreground/70 mt-1">28 States & 8 Union Territories culinary heritage mapped with indigenous ingredients.</div>
          </div>
          <div className="p-4 rounded-xl glass-card">
            <div className="text-xs font-bold text-brand-primary">Malayalam First-Class Audio</div>
            <div className="text-xs text-foreground/70 mt-1">Synchronized audio narration, transliteration, and voice command parsing.</div>
          </div>
          <div className="p-4 rounded-xl glass-card">
            <div className="text-xs font-bold text-brand-primary">Transparent Cost Intelligence</div>
            <div className="text-xs text-foreground/70 mt-1">Consumption cost vs. checkout pack sizes across 6 major Indian grocery retailers.</div>
          </div>
        </div>
      </div>

      {/* AI Content Policy & Food Safety */}
      <div id="ai-policy" className="p-8 rounded-3xl glass-panel space-y-4 border border-glass-border">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-400">
          <Shield className="w-5 h-5" />
          <span>AI Content, Grounding & Food Safety Policy</span>
        </div>

        <h3 className="text-xl font-bold text-foreground">
          Grounding over Hallucination
        </h3>

        <p className="text-sm text-foreground/80 leading-relaxed">
          Unlike generic conversational chatbots, CulinaryVerse AI employs strict Retrieval-Augmented Generation (RAG) anchored to verified culinary databases. It clearly distinguishes verified heritage instructions from AI-generated suggestions, and never fabricates delivery commitments or live store inventories.
        </p>

        <p className="text-sm text-foreground/80 leading-relaxed">
          <strong>Food Safety Standards:</strong> All recipes highlight common allergens, authoritative internal cooking temperatures (e.g., 74°C for poultry), refrigeration limits, and proper handling of raw ingredients.
        </p>
      </div>

      {/* Contact Section */}
      <div id="contact" className="p-8 rounded-3xl glass-panel space-y-4 border border-glass-border">
        <h3 className="text-xl font-bold text-foreground">Contact & Academic Collaboration</h3>
        <p className="text-sm text-foreground/80">
          For inquiries regarding computational gastronomy research, dataset licensing, or academic partnerships:
        </p>
        <div className="p-4 rounded-xl glass-card text-xs font-mono text-brand-primary">
          Jane Rose, Assistant Professor, Department of Computer Science & Engineering
          <br />
          Email: janeferdinant@gmail.com
        </div>
      </div>
    </div>
  );
}
