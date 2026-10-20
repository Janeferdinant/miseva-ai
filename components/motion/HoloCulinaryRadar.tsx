"use client";

import React, { useState, useEffect } from "react";
import {
  Compass,
  Zap,
  Activity,
  Flame,
  Volume2,
  Radio,
  Layers,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { playRadarPing, playVoiceWaveform, playSciFiChirp } from "@/lib/audio/sci-fi-audio";
import { useMotion } from "./motion-context";

interface DishTelemetry {
  id: string;
  name: string;
  nameMalayalam: string;
  category: string;
  umamiScore: number;
  spiceQuantum: number;
  thermalTemp: number;
  prepTime: number;
  groceryRadar: string;
  voicePhrase: string;
}

const TELEMETRY_DISHES: DishTelemetry[] = [
  {
    id: "sadya",
    name: "Kerala Traditional Sadya",
    nameMalayalam: "കേരള സദ്യ (Grand Feast)",
    category: "Heritage Plant-Based",
    umamiScore: 9.6,
    spiceQuantum: 7.2,
    thermalTemp: 180,
    prepTime: 45,
    groceryRadar: "Zepto 11m • Instamart 14m",
    voicePhrase: "പരിപ്പും നെയ്യും ചേർത്ത് സ്വാദിഷ്ടമായി ആരംഭിക്കാം.",
  },
  {
    id: "biryani",
    name: "Thalassery Dum Biryani",
    nameMalayalam: "തലശ്ശേരി ബിരിയാണി (Khaima Rice)",
    category: "Slow Dum Aromatics",
    umamiScore: 9.9,
    spiceQuantum: 8.8,
    thermalTemp: 210,
    prepTime: 50,
    groceryRadar: "Blinkit 12m • Flipkart Grocery",
    voicePhrase: "ജീരകശാല അരിയുടെ സുഗന്ധം ആസ്വദിച്ച് ദം ചെയ്യാം.",
  },
  {
    id: "meen",
    name: "Meen Pollichathu",
    nameMalayalam: "മീൻ പൊള്ളിച്ചത് (Banana Leaf Wrap)",
    category: "Coastal Smoked Seafood",
    umamiScore: 9.7,
    spiceQuantum: 9.1,
    thermalTemp: 195,
    prepTime: 30,
    groceryRadar: "Amazon Fresh • Zepto 9m",
    voicePhrase: "വാഴയിലയിൽ മസാല തേച്ച് കനലിൽ ചുട്ടെടുക്കാം.",
  },
  {
    id: "risotto",
    name: "Risotto ai Funghi",
    nameMalayalam: "റിസോട്ടോ ഫംഗി (Wild Porcini)",
    category: "Continental Umami",
    umamiScore: 9.4,
    spiceQuantum: 3.5,
    thermalTemp: 165,
    prepTime: 25,
    groceryRadar: "Nature's Basket • Instamart",
    voicePhrase: "Simmer warm broth slowly into toasted arborio rice.",
  },
];

export function HoloCulinaryRadar() {
  const [activeDishIndex, setActiveDishIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const { soundEnabled } = useMotion();

  const dish = TELEMETRY_DISHES[activeDishIndex];

  const handleSelectDish = (index: number) => {
    setActiveDishIndex(index);
    if (soundEnabled) playSciFiChirp(0.08);
  };

  const handleTriggerScan = () => {
    setIsScanning(true);
    if (soundEnabled) playRadarPing(0.12);
    setTimeout(() => setIsScanning(false), 1400);
  };

  const handleTriggerVoice = () => {
    setVoiceActive(true);
    if (soundEnabled) playVoiceWaveform("malayalam");
    setTimeout(() => setVoiceActive(false), 2200);
  };

  return (
    <div className="relative rounded-3xl glass-panel p-5 sm:p-7 border border-brand-primary/40 cyber-hud-bracket shadow-2xl overflow-hidden bg-gradient-to-br from-brand-primary/5 via-card-bg to-transparent">
      {/* Sci-Fi Scanning Horizontal Laser Line */}
      {isScanning && <div className="cyber-scanner-line" />}

      {/* Header HUD Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-glass-border pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-brand-primary/20 text-brand-primary border border-brand-primary/40">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-widest uppercase text-brand-primary cyber-glow-text">
                QUANTUM CULINARY HUD
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-primary/20 text-brand-primary border border-brand-primary/30">
                SYS.V4
              </span>
            </div>
            <div className="text-[10px] font-mono text-foreground/60">
              TELEMETRY: KOCHI_LAT_9.93°N • BLINKIT/ZEPTO_ONLINE
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTriggerScan}
            disabled={isScanning}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold glass-button text-white shadow-sm flex items-center gap-1.5"
            title="Scan Culinary Resonance"
          >
            <Zap className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
            <span>{isScanning ? "SCANNING..." : "SCAN TELEMETRY"}</span>
          </button>
        </div>
      </div>

      {/* Dish Quick Selector Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        {TELEMETRY_DISHES.map((item, idx) => {
          const isSelected = idx === activeDishIndex;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectDish(idx)}
              className={`p-2.5 rounded-xl text-left transition-all border font-mono text-xs ${
                isSelected
                  ? "bg-brand-primary/15 border-brand-primary text-foreground shadow-sm shadow-brand-primary/20"
                  : "bg-white/5 border-glass-border text-foreground/70 hover:text-foreground hover:bg-white/10"
              }`}
            >
              <div className="truncate font-bold">{item.name}</div>
              <div className="text-[10px] text-brand-primary/80 truncate lang-ml">
                {item.nameMalayalam}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Radar Display & Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Holographic Radar Circle Visualizer (5 Cols) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative py-4">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
            {/* Concentric Radar Rings */}
            <div className="absolute inset-0 rounded-full border border-brand-primary/25 border-dashed" />
            <div className="absolute inset-4 rounded-full border border-brand-primary/30" />
            <div className="absolute inset-10 rounded-full border border-brand-primary/40 border-dotted" />
            <div className="absolute inset-16 rounded-full border border-brand-primary/20" />

            {/* Radar Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-brand-primary/30" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-brand-primary/30" />

            {/* Rotating Holographic Sweep */}
            <div className="absolute inset-0 rounded-full animate-radar-sweep pointer-events-none">
              <div className="w-1/2 h-1/2 bg-gradient-to-br from-brand-primary/30 to-transparent rounded-tl-full origin-bottom-right" />
            </div>

            {/* Pulsing Center Target */}
            <div className="relative z-10 w-12 h-12 rounded-full bg-brand-primary/20 border border-brand-primary flex items-center justify-center text-brand-primary shadow-lg shadow-brand-primary/40">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>

            {/* Floating Coordinate Tags */}
            <div className="absolute top-1 left-2 text-[9px] font-mono text-brand-primary/70">
              SCAN: 360°
            </div>
            <div className="absolute bottom-1 right-2 text-[9px] font-mono text-brand-primary/70">
              FUSION_OK
            </div>
          </div>

          <div className="text-center mt-2">
            <span className="text-xs font-mono font-bold text-foreground">
              {dish.category}
            </span>
            <div className="text-[11px] font-mono text-brand-primary">
              READY IN {dish.prepTime} MINS
            </div>
          </div>
        </div>

        {/* Real-time Telemetry Metrics (7 Cols) */}
        <div className="md:col-span-7 space-y-4">
          {/* Umami & Spice Telemetry Sliders */}
          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-foreground/80 flex items-center gap-1.5 font-bold">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Umami Resonance Vector</span>
                </span>
                <span className="text-emerald-400 font-bold">{dish.umamiScore} / 10.0</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-700 shadow-sm shadow-emerald-500/50"
                  style={{ width: `${dish.umamiScore * 10}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-foreground/80 flex items-center gap-1.5 font-bold">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Spice Quantum Index</span>
                </span>
                <span className="text-amber-400 font-bold">{dish.spiceQuantum} / 10.0</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-700 shadow-sm shadow-amber-500/50"
                  style={{ width: `${dish.spiceQuantum * 10}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-foreground/80 flex items-center gap-1.5 font-bold">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span>Thermal Fusion Chamber</span>
                </span>
                <span className="text-purple-400 font-bold">{dish.thermalTemp}°C</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full transition-all duration-700 shadow-sm shadow-purple-500/50"
                  style={{ width: `${(dish.thermalTemp / 240) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Grocery Price Telemetry Banner */}
          <div className="p-3 rounded-xl bg-white/5 border border-glass-border flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-brand-primary" />
              <div>
                <div className="font-bold text-foreground">Live Delivery Radar</div>
                <div className="text-[11px] text-foreground/70">{dish.groceryRadar}</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              OPTIMIZED
            </span>
          </div>

          {/* Bilingual Voice Audio Waveform Simulator */}
          <div className="p-3.5 rounded-xl bg-brand-primary/10 border border-brand-primary/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-foreground flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-brand-primary" />
                <span>AI Chef Bilingual Speech Synthesizer</span>
              </span>
              <button
                onClick={handleTriggerVoice}
                className="px-2.5 py-1 rounded bg-brand-primary/20 hover:bg-brand-primary/30 text-brand-primary font-mono text-[11px] font-bold transition-colors"
              >
                {voiceActive ? "SYNTHESIZING..." : "SIMULATE VOICE"}
              </button>
            </div>

            <p className="text-xs text-foreground/90 italic lang-ml border-l-2 border-brand-primary pl-2.5">
              "{dish.voicePhrase}"
            </p>

            {/* Audio Waveform Equalizer Bars */}
            <div className="flex items-center gap-1 h-5 pt-1">
              {[40, 75, 20, 90, 60, 30, 85, 45, 95, 50, 70, 35, 80, 65, 40, 90, 55, 30].map(
                (h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-brand-primary rounded-full transition-all duration-300"
                    style={{
                      height: voiceActive ? `${Math.max(20, (h * Math.random()) % 100)}%` : "20%",
                      opacity: voiceActive ? 0.9 : 0.4,
                    }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
