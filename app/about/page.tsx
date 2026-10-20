import React from "react";
import Link from "next/link";
import { Sparkles, Award, Shield, BookOpen, Bot, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-12 py-6 max-w-4xl mx-auto">
      {/* Hero */}
      <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-glass-border shadow-glass space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Miseva AI • The Intelligent Cooking & Lifestyle Platform</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground">
          About Miseva AI
        </h1>
        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-medium">
          “Your World. Your Kitchen. Your AI Chef.”
        </p>
        <p className="text-sm text-foreground/70 leading-relaxed">
          Inspired by the timeless French culinary doctrine of <strong>mise en place</strong> (everything in its place before cooking) and the Indian heritage of <strong>seva</strong> (devoted care and hospitality), Miseva AI reimagines cooking as a seamless, joyful journey of cultural discovery and culinary precision.
        </p>
      </div>

      {/* Academic Branding & Research Supervision */}
      <div className="p-8 rounded-3xl glass-panel border border-emerald-500/40 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-primary via-emerald-500 to-amber-500 p-0.5 shadow-lg flex-shrink-0">
            <div className="w-full h-full rounded-[14px] bg-[#062419] flex items-center justify-center p-2">
              <Award className="w-7 h-7 text-emerald-400" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-foreground">Jane Rose</h2>
            <div className="text-base font-bold text-emerald-400">Assistant Professor, CSE</div>
            <div className="text-xs text-foreground/60">Lead Academic Research & System Architecture</div>
          </div>
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed">
          Miseva AI is engineered as an autonomous, multi-agent AI system exploring the intersection of computer science, natural language processing, multilingual accessibility (focusing on Malayalam and Indian regional languages), automated grocery price analytics, and cultural gastronomy preservation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl glass-card border border-white/10">
            <div className="text-xs font-bold text-emerald-400">Authentic Global & Indian Taxonomy</div>
            <div className="text-xs text-foreground/70 mt-1">14 Regional and world cuisines with $\ge 10$ distinct authentic recipes in every category.</div>
          </div>
          <div className="p-4 rounded-xl glass-card border border-white/10">
            <div className="text-xs font-bold text-emerald-400">Malayalam First-Class Audio</div>
            <div className="text-xs text-foreground/70 mt-1">Synchronized audio narration, native Malayalam script, and voice command parsing.</div>
          </div>
          <div className="p-4 rounded-xl glass-card border border-white/10">
            <div className="text-xs font-bold text-emerald-400">Holistic Table Styling Studio</div>
            <div className="text-xs text-foreground/70 mt-1">Interactive 2D top-down arrangement canvas, moodboards, and decoration budgeting.</div>
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
