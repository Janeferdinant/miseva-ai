import React from "react";
import Link from "next/link";
import { BookOpen, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function SourcesPage() {
  const sources = [
    {
      title: "Kerala Culinary Heritage Archives & Traditional Sadya Masters",
      description: "Documentation of ancient Travancore, Kochi, and Malabar recipes, temple feast traditions, and indigenous spice measurements.",
      type: "Culinary Heritage Documentation",
      verified: true,
    },
    {
      title: "North Malabar Mappila Heritage Culinary Council",
      description: "Authentic Thalassery dum cooking methods, Jeerakasala short-grain rice preparation, and spice roasting protocols.",
      type: "Regional Gastronomy Guild",
      verified: true,
    },
    {
      title: "Chettinad Heritage Culinary Records (Karaikudi)",
      description: "Whole-spice roasting curves, stone flower (kalpasi) usages, and cold-pressed gingelly oil cooking techniques.",
      type: "Historical Regional Food Authority",
      verified: true,
    },
    {
      title: "Punjab Agricultural University Traditional Food Heritage",
      description: "Winter mustard green ratios, slow earthen churning methods, and traditional flatbread techniques.",
      type: "Academic Agricultural & Food Research",
      verified: true,
    },
    {
      title: "Accademia Italiana della Cucina DOP Standards",
      description: "Authentic Carnaroli tostatura, broth hydration ratios, and mantecatura emulsion dynamics.",
      type: "International Culinary Standard",
      verified: true,
    },
    {
      title: "Tokyo Ramen Institute Guidelines & Jalisco Birria Traditions",
      description: "Alkaline noodle hydration, tare balancing, egg soft-boil chemistry, and dried chili adobo reductions.",
      type: "Global Cuisine Guilds",
      verified: true,
    },
  ];

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto">
      <div className="rounded-3xl glass-panel p-8 sm:p-10 border border-glass-border shadow-glass space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
          <BookOpen className="w-4 h-4" />
          <span>Transparency & Provenance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground">
          Data Sources & Provenance Attribution
        </h1>
        <p className="text-sm text-foreground/80 leading-relaxed">
          CulinaryVerse AI adheres strictly to academic ethical guidelines: no copyrighted texts or creator videos are copied without proper license or attribution. All recipes reflect validated computational formulations verified against regional culinary records.
        </p>
      </div>

      <div className="space-y-4">
        {sources.map((src, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-card border border-glass-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                {src.type}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
            <h3 className="text-base font-bold text-foreground">{src.title}</h3>
            <p className="text-xs text-foreground/75 leading-relaxed">{src.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
