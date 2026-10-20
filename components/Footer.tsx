import React from "react";
import Link from "next/link";
import { Sparkles, Heart, Shield, Award, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full mt-20 border-t border-glass-border/60 bg-glass-surface/50 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Brand & Academic Supervision */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-primary via-emerald-500 to-amber-500 p-0.5 shadow-md">
                <div className="w-full h-full rounded-[10px] bg-[#062419] flex items-center justify-center backdrop-blur-sm p-1">
                  <img src="/brand/logo-mark.svg" alt="Miseva AI" className="w-full h-full object-contain" />
                </div>
              </div>
              <span className="font-extrabold text-xl bg-gradient-to-r from-emerald-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                Miseva AI
              </span>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed max-w-md font-medium">
              “Miseva AI — Discover cuisines, learn techniques, style your table, and cook with confidence.”
            </p>

            <p className="text-xs text-foreground/60 leading-relaxed max-w-md">
              Your World. Your Kitchen. Your AI Chef. Inspired by the culinary discipline of <em>mise en place</em> and devoted service (<em>seva</em>), Miseva AI combines bilingual English & Malayalam voice guidance, live grocery price intelligence, and holistic tablescaping art.
            </p>

            {/* Academic Credential Card (Mandatory Spec 19) */}
            <div className="p-3.5 rounded-xl glass-card border border-brand-primary/30 max-w-sm flex items-center gap-3.5 bg-brand-primary/5">
              <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-sm shadow-inner flex-shrink-0">
                <Award className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Jane Rose</div>
                <div className="text-xs font-semibold text-brand-primary">Assistant Professor, CSE</div>
                <div className="text-[10px] text-foreground/50">Academic Research & Engineering Direction</div>
              </div>
            </div>
          </div>

          {/* Column 2: Culinary Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/90 mb-3">
              Explore Cuisines
            </h3>
            <ul className="space-y-2 text-xs text-foreground/75">
              <li>
                <Link href="/explore?region=kerala" className="hover:text-brand-primary transition-colors flex items-center gap-1.5">
                  <span>🌴</span> Kerala & South Indian Sadya
                </Link>
              </li>
              <li>
                <Link href="/explore?region=punjab" className="hover:text-brand-primary transition-colors flex items-center gap-1.5">
                  <span>🌾</span> Punjab & Clay Tandoor
                </Link>
              </li>
              <li>
                <Link href="/explore?region=bengal" className="hover:text-brand-primary transition-colors flex items-center gap-1.5">
                  <span>🐟</span> Bengal & Mustard Aromatics
                </Link>
              </li>
              <li>
                <Link href="/explore?region=italy" className="hover:text-brand-primary transition-colors flex items-center gap-1.5">
                  <span>🍝</span> Handcrafted Italian Pasta
                </Link>
              </li>
              <li>
                <Link href="/explore?region=japan" className="hover:text-brand-primary transition-colors flex items-center gap-1.5">
                  <span>🍣</span> Japanese Ramen & Umami
                </Link>
              </li>
              <li>
                <Link href="/explore?region=mexico" className="hover:text-brand-primary transition-colors flex items-center gap-1.5">
                  <span>🌮</span> Mexican Quesatacos & Adobo
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust, Research & Policies */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/90 mb-3">
              Trust & Attribution
            </h3>
            <ul className="space-y-2 text-xs text-foreground/75">
              <li>
                <Link href="/about" className="hover:text-brand-primary transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-brand-primary" /> About CulinaryVerse
                </Link>
              </li>
              <li>
                <Link href="/sources" className="hover:text-brand-primary transition-colors flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-brand-primary" /> Data Sources & Attribution
                </Link>
              </li>
              <li>
                <Link href="/about#ai-policy" className="hover:text-brand-primary transition-colors">
                  AI Content & Safety Disclosure
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about#contact" className="hover:text-brand-primary transition-colors">
                  Contact Research Team
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 pt-6 border-t border-glass-border/40 flex flex-col sm:flex-row items-center justify-between text-xs text-foreground/60 gap-4">
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-0.5 inline" />
            <span>for authentic culinary heritage and multilingual accessibility.</span>
          </div>
          <div>
            © {new Date().getFullYear()} Miseva AI. Academic Supervision: Jane Rose, Assistant Professor, CSE. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
