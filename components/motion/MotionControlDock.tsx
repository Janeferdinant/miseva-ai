"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  Grid,
  Volume2,
  VolumeX,
  Sliders,
  ChevronUp,
  ChevronDown,
  Cpu,
  Check,
} from "lucide-react";
import { useMotion, MotionLevel } from "./motion-context";
import { useTheme, THEMES } from "@/lib/theme/theme-context";
import { playSciFiChirp } from "@/lib/audio/sci-fi-audio";

export function MotionControlDock() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    motionLevel,
    setMotionLevel,
    showCyberGrid,
    toggleCyberGrid,
    showParticles,
    toggleParticles,
    soundEnabled,
    toggleSound,
  } = useMotion();

  const { theme, setTheme } = useTheme();

  const isCyber = theme === "cyber";

  const handleToggleCyber = () => {
    if (isCyber) {
      setTheme("emerald");
    } else {
      setTheme("cyber");
    }
    if (soundEnabled) playSciFiChirp(0.1);
  };

  const handleSetMotion = (level: MotionLevel) => {
    setMotionLevel(level);
    if (soundEnabled) playSciFiChirp(0.08);
  };

  const handleToggleGrid = () => {
    toggleCyberGrid();
    if (soundEnabled) playSciFiChirp(0.08);
  };

  const handleToggleSound = () => {
    toggleSound();
    playSciFiChirp(0.1);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Expanded HUD Settings Modal */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-2xl glass-panel p-4 shadow-glass border border-brand-primary/40 cyber-hud-bracket animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-glass-border pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-brand-primary animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-foreground">
                CYBER DOCK & FX CONTROLS
              </span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-primary/20 text-brand-primary">
              60 FPS
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Quick 1-Click Cyber Kitchen Toggle */}
            <button
              onClick={handleToggleCyber}
              className={`w-full p-2.5 rounded-xl border flex items-center justify-between font-mono transition-all ${
                isCyber
                  ? "bg-brand-primary/20 border-brand-primary text-foreground shadow-sm shadow-brand-primary/30"
                  : "bg-white/5 border-glass-border text-foreground hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <Zap className={`w-4 h-4 ${isCyber ? "text-brand-primary" : "text-foreground/60"}`} />
                <div className="text-left">
                  <div className="font-bold">Cyber Kitchen 2099 Mode</div>
                  <div className="text-[10px] text-foreground/60">
                    {isCyber ? "Active • Quantum HUD engaged" : "Engage Neon Cyberpunk theme"}
                  </div>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  isCyber ? "bg-brand-primary text-black" : "bg-white/10 text-foreground/70"
                }`}
              >
                {isCyber ? "ONLINE" : "STANDBY"}
              </span>
            </button>

            {/* Motion Dynamics Intensity */}
            <div>
              <div className="text-[11px] font-mono text-foreground/70 mb-1.5 flex items-center justify-between">
                <span>MOTION GRAPHICS INTENSITY</span>
                <span className="text-brand-primary font-bold uppercase">{motionLevel}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(["high", "subtle", "off"] as MotionLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => handleSetMotion(lvl)}
                    className={`py-1.5 rounded-lg text-center font-mono capitalize transition-all border ${
                      motionLevel === lvl
                        ? "bg-brand-primary text-black font-bold border-brand-primary shadow-sm"
                        : "bg-white/5 border-glass-border text-foreground/70 hover:bg-white/10"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Toggles: Cyber Grid & Audio Haptics */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleToggleGrid}
                className={`p-2 rounded-xl border flex items-center justify-between font-mono text-[11px] transition-all ${
                  showCyberGrid || isCyber
                    ? "bg-white/15 border-brand-primary text-foreground"
                    : "bg-white/5 border-glass-border text-foreground/60"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Grid className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Grid Mesh</span>
                </span>
                <span className="text-[10px] font-bold">
                  {showCyberGrid || isCyber ? "ON" : "OFF"}
                </span>
              </button>

              <button
                onClick={handleToggleSound}
                className={`p-2 rounded-xl border flex items-center justify-between font-mono text-[11px] transition-all ${
                  soundEnabled
                    ? "bg-white/15 border-brand-primary text-foreground"
                    : "bg-white/5 border-glass-border text-foreground/60"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {soundEnabled ? (
                    <Volume2 className="w-3.5 h-3.5 text-brand-primary" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-foreground/50" />
                  )}
                  <span>Sci-Fi Audio</span>
                </span>
                <span className="text-[10px] font-bold">{soundEnabled ? "ON" : "OFF"}</span>
              </button>
            </div>

            {/* Telemetry Status Line */}
            <div className="pt-2 border-t border-glass-border text-[10px] font-mono text-foreground/60 flex items-center justify-between">
              <span>MISEVA AI NEURAL ENGINE 3.8</span>
              <span className="text-emerald-400">STATUS: OPTIMAL</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (soundEnabled) playSciFiChirp(0.08);
        }}
        className={`px-3.5 py-2 rounded-full glass-card border flex items-center gap-2.5 shadow-lg transition-all text-xs font-mono font-bold ${
          isCyber
            ? "border-brand-primary bg-brand-primary/20 text-foreground shadow-brand-primary/30"
            : "border-glass-border text-foreground hover:border-brand-primary"
        }`}
        title="Toggle Motion & Futuristic Controls"
        aria-label="Motion Graphics and Futuristic HUD Controls"
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isCyber ? "bg-cyan-400 animate-ping" : "bg-emerald-400"
          }`}
        />
        <Sliders className="w-3.5 h-3.5 text-brand-primary" />
        <span className="hidden sm:inline">HUD FX</span>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 opacity-70" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 opacity-70" />
        )}
      </button>
    </div>
  );
}
