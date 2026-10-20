"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type MotionLevel = "high" | "subtle" | "off";

interface MotionContextType {
  motionLevel: MotionLevel;
  setMotionLevel: (level: MotionLevel) => void;
  showCyberGrid: boolean;
  toggleCyberGrid: () => void;
  showParticles: boolean;
  toggleParticles: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [motionLevel, setMotionLevelState] = useState<MotionLevel>("high");
  const [showCyberGrid, setShowCyberGrid] = useState<boolean>(true);
  const [showParticles, setShowParticles] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // Check prefers-reduced-motion first
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        setMotionLevelState("off");
        setShowParticles(false);
      } else {
        try {
          const savedMotion = localStorage.getItem("culinaryverse_motion") as MotionLevel;
          const savedGrid = localStorage.getItem("culinaryverse_grid");
          const savedParticles = localStorage.getItem("culinaryverse_particles");
          const savedSound = localStorage.getItem("culinaryverse_sound");

          if (savedMotion && ["high", "subtle", "off"].includes(savedMotion)) {
            setMotionLevelState(savedMotion);
          }
          if (savedGrid !== null) setShowCyberGrid(savedGrid === "true");
          if (savedParticles !== null) setShowParticles(savedParticles === "true");
          if (savedSound !== null) setSoundEnabled(savedSound === "true");
        } catch {}
      }
    }
    setMounted(true);
  }, []);

  const setMotionLevel = (level: MotionLevel) => {
    setMotionLevelState(level);
    if (level === "off") {
      setShowParticles(false);
    } else {
      setShowParticles(true);
    }
    try {
      localStorage.setItem("culinaryverse_motion", level);
    } catch {}
  };

  const toggleCyberGrid = () => {
    setShowCyberGrid((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("culinaryverse_grid", String(next));
      } catch {}
      return next;
    });
  };

  const toggleParticles = () => {
    setShowParticles((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("culinaryverse_particles", String(next));
      } catch {}
      return next;
    });
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("culinaryverse_sound", String(next));
      } catch {}
      return next;
    });
  };

  return (
    <MotionContext.Provider
      value={{
        motionLevel,
        setMotionLevel,
        showCyberGrid,
        toggleCyberGrid,
        showParticles,
        toggleParticles,
        soundEnabled,
        toggleSound,
      }}
    >
      <div className={!mounted ? "opacity-98" : ""}>{children}</div>
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error("useMotion must be used within a MotionProvider");
  }
  return context;
}
