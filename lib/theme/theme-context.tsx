"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeType =
  | "emerald"
  | "saffron"
  | "ocean"
  | "midnight"
  | "rose"
  | "ivory"
  | "cyber";

export type ModeType = "dark" | "light";

export interface ThemeMeta {
  id: ThemeType;
  name: string;
  nameMalayalam: string;
  accent: string;
  description: string;
  glow: string;
  isFuturistic?: boolean;
}

export const THEMES: Record<ThemeType, ThemeMeta> = {
  emerald: {
    id: "emerald",
    name: "Emerald Kitchen",
    nameMalayalam: "മരതക അടുക്കള (Emerald)",
    accent: "#10b981",
    description: "Fresh coastal green, warm cream & subtle gold accents",
    glow: "rgba(16, 185, 129, 0.4)",
  },
  saffron: {
    id: "saffron",
    name: "Saffron & Spice",
    nameMalayalam: "കുങ്കുമവും സുഗന്ധവ്യഞ്ജനങ്ങളും (Saffron)",
    accent: "#f97316",
    description: "Warm saffron, terracotta & aromatic spice warmth",
    glow: "rgba(249, 115, 22, 0.4)",
  },
  ocean: {
    id: "ocean",
    name: "Ocean Mist",
    nameMalayalam: "സമുദ്ര സാന്ദ്രത (Ocean Mist)",
    accent: "#14b8a6",
    description: "Teal, aqua & translucent blue coastal freshness",
    glow: "rgba(20, 184, 166, 0.4)",
  },
  midnight: {
    id: "midnight",
    name: "Midnight Gourmet",
    nameMalayalam: "അർദ്ധരാത്രി പാചകം (Midnight)",
    accent: "#a855f7",
    description: "Deep navy, burgundy & iridescent dark luxury glass",
    glow: "rgba(168, 85, 247, 0.4)",
  },
  rose: {
    id: "rose",
    name: "Rose Quartz",
    nameMalayalam: "റോസ് ക്വാർട്സ് (Rose Quartz)",
    accent: "#f43f5e",
    description: "Blush, pearl & delicate floral confectionery elegance",
    glow: "rgba(244, 63, 94, 0.4)",
  },
  ivory: {
    id: "ivory",
    name: "Ivory Luxury",
    nameMalayalam: "ഐവറി രാജകീയം (Ivory Luxury)",
    accent: "#eab308",
    description: "Champagne, ivory & imperial golden royalty",
    glow: "rgba(234, 179, 8, 0.4)",
  },
  cyber: {
    id: "cyber",
    name: "Cyber Kitchen 2099",
    nameMalayalam: "ക്വാണ്ടം അടുക്കള (Cyber 2099)",
    accent: "#00f0ff",
    description: "Electric cyan, neon violet & holographic quantum culinary HUD",
    glow: "rgba(0, 240, 255, 0.45)",
    isFuturistic: true,
  },
};

interface ThemeContextType {
  theme: ThemeType;
  mode: ModeType;
  setTheme: (theme: ThemeType) => void;
  setMode: (mode: ModeType) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>("emerald");
  const [mode, setModeState] = useState<ModeType>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("culinaryverse_theme") as ThemeType;
      const savedMode = localStorage.getItem("culinaryverse_mode") as ModeType;
      if (savedTheme && THEMES[savedTheme]) setThemeState(savedTheme);
      if (savedMode && (savedMode === "dark" || savedMode === "light")) {
        setModeState(savedMode);
      }
    } catch {
      // LocalStorage unavailable
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.setAttribute("data-theme", theme);
      root.setAttribute("data-mode", mode);
      if (mode === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
      }
    }
  }, [theme, mode]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("culinaryverse_theme", newTheme);
    } catch {}
  };

  const setMode = (newMode: ModeType) => {
    setModeState(newMode);
    try {
      localStorage.setItem("culinaryverse_mode", newMode);
    } catch {}
  };

  const toggleMode = () => {
    const nextMode = mode === "dark" ? "light" : "dark";
    setMode(nextMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        mode,
        setTheme,
        setMode,
        toggleMode,
      }}
    >
      <div className={!mounted ? "opacity-95" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
