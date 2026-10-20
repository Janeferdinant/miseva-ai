"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Compass,
  BookOpen,
  Bot,
  Cake,
  GlassWater,
  UtensilsCrossed,
  ShoppingCart,
  Calendar,
  Menu,
  X,
  Languages,
  Smartphone,
} from "lucide-react";
import { ThemeSelector } from "./ThemeSelector";
import { useTheme } from "@/lib/theme/theme-context";

export function Navbar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isCyber = theme === "cyber";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalLang, setGlobalLang] = useState<"en" | "ml">("en");

  const navLinks = [
    { href: "/explore", label: "Cuisines", labelMl: "സംസ്ഥാനങ്ങൾ", icon: Compass },
    { href: "/recipes", label: "Recipes", labelMl: "വിഭവങ്ങൾ", icon: BookOpen },
    { href: "/desserts", label: "Desserts", labelMl: "മധുരങ്ങൾ", icon: Cake },
    { href: "/beverages", label: "Beverages", labelMl: "പാനീയങ്ങൾ", icon: GlassWater },
    { href: "/table-styling", label: "Table Styling", labelMl: "മേശാലങ്കാരം", icon: UtensilsCrossed, highlight: true },
    { href: "/ai-chef", label: "AI Chef", labelMl: "എ.ഐ ഷെഫ്", icon: Bot },
    { href: "/shopping", label: "Prices", labelMl: "വിലകൾ", icon: ShoppingCart },
    { href: "/meal-planner", label: "Meal Plan", labelMl: "പ്ലാനർ", icon: Calendar },
    { href: "/marketing", label: "Marketing", labelMl: "മാർക്കറ്റിംഗ്", icon: Sparkles, highlight: true },
    { href: "/app", label: "Android App", labelMl: "ആപ്പ്", icon: Smartphone },
  ];

  const toggleLanguage = () => {
    const next = globalLang === "en" ? "ml" : "en";
    setGlobalLang(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("culinaryverse_lang", next);
      window.dispatchEvent(new CustomEvent("lang-change", { detail: next }));
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-3 transition-all duration-300">
      <nav
        className={`max-w-7xl mx-auto glass-panel px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-glass transition-all duration-500 ${
          isCyber
            ? "border-cyan-400/50 shadow-cyan-500/15 cyber-hud-bracket bg-[#030712]/80"
            : ""
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className={`w-10 h-10 rounded-xl p-0.5 shadow-md group-hover:scale-105 transition-transform ${
              isCyber
                ? "bg-gradient-to-tr from-cyan-400 via-indigo-500 to-rose-500 shadow-cyan-400/30"
                : "bg-gradient-to-tr from-brand-primary via-emerald-500 to-amber-500"
            }`}
          >
            <div className="w-full h-full rounded-[10px] bg-[#062419] flex items-center justify-center backdrop-blur-sm overflow-hidden p-1">
              <img src="/brand/logo-mark.svg" alt="Miseva AI" className="w-full h-full object-contain" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span
                className={`font-extrabold text-lg sm:text-xl tracking-tight bg-clip-text text-transparent ${
                  isCyber
                    ? "bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400 cyber-glow-text"
                    : "bg-gradient-to-r from-emerald-400 via-amber-400 to-yellow-300"
                }`}
              >
                Miseva
              </span>
              <span
                className={`text-xs font-black text-white px-1.5 py-0.5 rounded-md shadow-sm ${
                  isCyber
                    ? "bg-cyan-500 text-black border border-cyan-300 font-mono"
                    : "bg-emerald-600/90 border border-emerald-400/40"
                }`}
              >
                {isCyber ? "CYBER" : "AI"}
              </span>
            </div>
            <div className="hidden sm:block text-[10px] text-foreground/60 font-semibold tracking-wider uppercase">
              {globalLang === "ml"
                ? "നിങ്ങളുടെ ലോകം. നിങ്ങളുടെ അടുക്കള."
                : isCyber
                ? "QUANTUM CULINARY SYSTEM 2099"
                : "Your World. Your Kitchen. Your AI Chef."}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-brand-primary/20 text-brand-primary border border-brand-primary/30 shadow-sm"
                    : link.highlight
                    ? "bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 text-foreground hover:bg-brand-primary/15 border border-white/10"
                    : "text-foreground/80 hover:text-foreground hover:bg-white/10"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-brand-primary" : "text-foreground/70"}`} />
                <span>{globalLang === "ml" ? link.labelMl : link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Action Controls: Language + Theme + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold glass-card hover:border-brand-primary transition-all text-foreground"
            title="Switch Language (English / മലയാളം)"
          >
            <Languages className="w-3.5 h-3.5 text-brand-primary" />
            <span className="text-xs font-bold">
              {globalLang === "en" ? "മലയാളം" : "English"}
            </span>
          </button>

          {/* Theme Selector Dropdown */}
          <ThemeSelector />

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl glass-card text-foreground"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-2xl glass-panel shadow-glass space-y-2 border border-glass-border">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-brand-primary/20 text-brand-primary border border-brand-primary/30"
                    : "text-foreground/80 hover:bg-white/10 hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5 text-brand-primary" />
                <div>
                  <div className="font-semibold">{link.label}</div>
                  <div className="text-xs text-foreground/60">{link.labelMl}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
