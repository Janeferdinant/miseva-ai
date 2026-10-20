"use client";

import React, { useState } from "react";
import { useTheme, THEMES, ThemeType } from "@/lib/theme/theme-context";
import { Sun, Moon, Palette, Check } from "lucide-react";

export function ThemeSelector() {
  const { theme, mode, setTheme, toggleMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium glass-card hover:border-brand-primary transition-colors"
          title="Change Liquid-Glass Theme"
          aria-label="Liquid-Glass Theme Selector"
        >
          <span
            className="w-3 h-3 rounded-full border border-white/40 shadow-sm"
            style={{ backgroundColor: THEMES[theme].accent }}
          />
          <span className="hidden sm:inline font-medium">{THEMES[theme].name}</span>
          <Palette className="w-3.5 h-3.5 opacity-70" />
        </button>

        <button
          onClick={toggleMode}
          className="p-1.5 rounded-full glass-card hover:border-brand-primary transition-colors text-foreground/80 hover:text-foreground"
          title={`Switch to ${mode === "dark" ? "Light" : "Dark"} Mode`}
          aria-label="Toggle Light/Dark Mode"
        >
          {mode === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-500" />
          )}
        </button>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 rounded-2xl glass-panel shadow-glass p-3 z-50 border border-glass-border">
            <div className="px-2 py-1.5 mb-2 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider uppercase text-foreground/70">
                Liquid-Glass & Cyber Themes
              </span>
              <span className="text-[10px] text-foreground/50">7 Palettes</span>
            </div>

            <div className="space-y-1">
              {(Object.keys(THEMES) as ThemeType[]).map((key) => {
                const t = THEMES[key];
                const isSelected = theme === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setTheme(key);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all ${
                      isSelected
                        ? "bg-white/15 font-semibold border border-white/20 shadow-sm"
                        : "hover:bg-white/5 opacity-80 hover:opacity-100"
                    } ${t.isFuturistic ? "hover:border-cyan-400/50" : ""}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-4 h-4 rounded-full border border-white/30 shadow-inner flex-shrink-0 ${
                          t.isFuturistic ? "shadow-cyan-400/60 shadow-md ring-1 ring-cyan-300" : ""
                        }`}
                        style={{ backgroundColor: t.accent }}
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-foreground font-medium">{t.name}</span>
                          {t.isFuturistic && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">
                              CYBER
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-foreground/60">{t.nameMalayalam}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-brand-primary" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
