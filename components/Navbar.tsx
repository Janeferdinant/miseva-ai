"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Compass,
  BookOpen,
  Bot,
  ShoppingCart,
  Calendar,
  Menu,
  X,
  Languages,
} from "lucide-react";
import { ThemeSelector } from "./ThemeSelector";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalLang, setGlobalLang] = useState<"en" | "ml">("en");

  const navLinks = [
    { href: "/explore", label: "Explore Cuisines", labelMl: "സംസ്ഥാനങ്ങൾ & വിഭവങ്ങൾ", icon: Compass },
    { href: "/recipes", label: "Recipes", labelMl: "പാചകക്കുറിപ്പുകൾ", icon: BookOpen },
    { href: "/ai-chef", label: "AI Chef Studio", labelMl: "എ.ഐ ഷെഫ് സ്റ്റുഡിയോ", icon: Bot, highlight: true },
    { href: "/shopping", label: "Price Compare", labelMl: "വില താരതമ്യം", icon: ShoppingCart },
    { href: "/meal-planner", label: "Meal Planner", labelMl: "മീൽ പ്ലാനർ", icon: Calendar },
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
      <nav className="max-w-7xl mx-auto glass-panel px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-glass">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-accent p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-[10px] bg-background/80 flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-brand-primary animate-pulse" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary bg-clip-text text-transparent">
              CulinaryVerse
            </span>
            <span className="text-xs font-bold text-brand-primary ml-1 px-1.5 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
              AI
            </span>
            <div className="hidden sm:block text-[10px] text-foreground/50 font-medium tracking-wide">
              {globalLang === "ml" ? "ലോകോത്തര പാചക സഹായി" : "The World's Intelligent Cooking Agent"}
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
