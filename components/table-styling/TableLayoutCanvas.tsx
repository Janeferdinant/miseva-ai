"use client";

import React, { useState } from "react";
import { TableItemPlacement, TableShape } from "@/lib/types/table-styling";
import { Info, Sparkles, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface TableLayoutCanvasProps {
  placements: TableItemPlacement[];
  tableShape: TableShape;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
  };
  title?: string;
}

export function TableLayoutCanvas({
  placements,
  tableShape,
  colorPalette,
  title,
}: TableLayoutCanvasProps) {
  const [selectedItem, setSelectedItem] = useState<TableItemPlacement | null>(null);
  const [zoom, setZoom] = useState(1);

  return (
    <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-glass-border shadow-glass overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              {title || "Interactive 2D Top-Down Tablescape Layout"}
            </h3>
          </div>
          <p className="text-xs text-foreground/60">
            Hover or tap any place setting, centerpiece, or floral to view placement coordinates & styling notes.
          </p>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-background/50 backdrop-blur-md p-1 rounded-xl border border-white/10 self-end sm:self-auto">
          <button
            onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
            className="p-1.5 rounded-lg hover:bg-white/10 text-foreground/70 hover:text-foreground transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono px-1.5 text-foreground/70">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.max(0.8, z - 0.1))}
            className="p-1.5 rounded-lg hover:bg-white/10 text-foreground/70 hover:text-foreground transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-foreground/70 hover:text-foreground transition-colors"
            title="Reset Zoom"
            aria-label="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-gradient-to-br from-black/40 via-background/60 to-black/30 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center p-4">
        <div
          className="w-full h-full transition-transform duration-300 origin-center flex items-center justify-center"
          style={{ transform: `scale(${zoom})` }}
        >
          <svg
            viewBox="0 0 1000 600"
            className="w-full h-full max-h-[550px] drop-shadow-2xl select-none"
          >
            <defs>
              {/* Table Cloth Shadow */}
              <filter id="tableShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.45" />
              </filter>
              {/* Centerpiece Glow */}
              <radialGradient id="candleGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFA000" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#FF6F00" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Table Surface Drawing */}
            {tableShape === "round" ? (
              <circle
                cx="500"
                cy="300"
                r="220"
                fill={colorPalette.neutral}
                stroke={colorPalette.secondary}
                strokeWidth="4"
                filter="url(#tableShadow)"
              />
            ) : tableShape === "oval" ? (
              <ellipse
                cx="500"
                cy="300"
                rx="380"
                ry="210"
                fill={colorPalette.neutral}
                stroke={colorPalette.secondary}
                strokeWidth="4"
                filter="url(#tableShadow)"
              />
            ) : tableShape === "square" ? (
              <rect
                x="280"
                y="80"
                width="440"
                height="440"
                rx="36"
                fill={colorPalette.neutral}
                stroke={colorPalette.secondary}
                strokeWidth="4"
                filter="url(#tableShadow)"
              />
            ) : (
              // Rectangular
              <rect
                x="120"
                y="90"
                width="760"
                height="420"
                rx="40"
                fill={colorPalette.neutral}
                stroke={colorPalette.secondary}
                strokeWidth="4"
                filter="url(#tableShadow)"
              />
            )}

            {/* Runner (if rectangular or oval) */}
            {(tableShape === "rectangular" || tableShape === "oval") && (
              <rect
                x="140"
                y="270"
                width="720"
                height="60"
                rx="8"
                fill={colorPalette.secondary}
                opacity="0.28"
                stroke={colorPalette.secondary}
                strokeWidth="1.5"
                strokeDasharray="6,4"
              />
            )}

            {/* Render Placements */}
            {placements.map((p, idx) => {
              const cx = (p.xPercent / 100) * 1000;
              const cy = (p.yPercent / 100) * 600;
              const isSelected = selectedItem?.name === p.name;

              // Banana leaf rendering
              if (p.itemType === "banana-leaf") {
                return (
                  <g
                    key={idx}
                    transform={`translate(${cx}, ${cy}) rotate(${p.rotationDeg || 0})`}
                    onClick={() => setSelectedItem(p)}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    <ellipse
                      cx="0"
                      cy="0"
                      rx="38"
                      ry="24"
                      fill="#2E7D32"
                      stroke="#4CAF50"
                      strokeWidth={isSelected ? 3 : 1.5}
                      opacity="0.9"
                    />
                    {/* Leaf midrib */}
                    <line x1="-34" y1="0" x2="34" y2="0" stroke="#81C784" strokeWidth="2" />
                  </g>
                );
              }

              // Dinner plate / Thali rendering
              if (p.itemType === "plate") {
                return (
                  <g
                    key={idx}
                    transform={`translate(${cx}, ${cy})`}
                    onClick={() => setSelectedItem(p)}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    <circle
                      cx="0"
                      cy="0"
                      r="26"
                      fill="#FFFFFF"
                      stroke={p.colorHex || colorPalette.secondary}
                      strokeWidth={isSelected ? 3.5 : 2}
                    />
                    <circle cx="0" cy="0" r="18" fill="none" stroke="#E0E0E0" strokeWidth="1" />
                  </g>
                );
              }

              // Centerpiece
              if (p.itemType === "centerpiece") {
                return (
                  <g
                    key={idx}
                    transform={`translate(${cx}, ${cy})`}
                    onClick={() => setSelectedItem(p)}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    <circle cx="0" cy="0" r="45" fill="url(#candleGlow)" />
                    <circle
                      cx="0"
                      cy="0"
                      r="22"
                      fill={colorPalette.secondary}
                      stroke="#FFD700"
                      strokeWidth="2.5"
                    />
                    <circle cx="0" cy="0" r="7" fill="#FFF59D" className="animate-pulse" />
                  </g>
                );
              }

              // Candle
              if (p.itemType === "candle") {
                return (
                  <g
                    key={idx}
                    transform={`translate(${cx}, ${cy})`}
                    onClick={() => setSelectedItem(p)}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    <circle cx="0" cy="0" r="18" fill="url(#candleGlow)" />
                    <circle cx="0" cy="0" r="7" fill="#FFA000" />
                    <circle cx="0" cy="0" r="3" fill="#FFF9C4" />
                  </g>
                );
              }

              // Tumbler / Glass
              if (p.itemType === "glass") {
                return (
                  <g
                    key={idx}
                    transform={`translate(${cx}, ${cy})`}
                    onClick={() => setSelectedItem(p)}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    <circle
                      cx="0"
                      cy="0"
                      r="9"
                      fill="#C5A059"
                      stroke="#FFD700"
                      strokeWidth={isSelected ? 2 : 1}
                      opacity="0.9"
                    />
                  </g>
                );
              }

              // Cutlery
              if (p.itemType === "cutlery") {
                return (
                  <g
                    key={idx}
                    transform={`translate(${cx}, ${cy})`}
                    onClick={() => setSelectedItem(p)}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    <rect x="-3" y="-14" width="2" height="28" rx="1" fill="#C0C0C0" />
                    <rect x="2" y="-14" width="2" height="28" rx="1" fill="#C0C0C0" />
                  </g>
                );
              }

              return null;
            })}
          </svg>
        </div>
      </div>

      {/* Selected Item Info Card */}
      {selectedItem ? (
        <div className="mt-3 p-3.5 rounded-2xl bg-brand-primary/10 border border-brand-primary/30 flex items-start justify-between gap-3 animate-fade-in">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-2">
                <span>{selectedItem.name}</span>
                <span className="text-[11px] font-normal text-brand-primary font-serif">
                  ({selectedItem.nameMalayalam})
                </span>
              </div>
              <p className="text-xs text-foreground/75 mt-0.5">{selectedItem.description}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedItem(null)}
            className="text-[10px] text-foreground/50 hover:text-foreground font-semibold px-2 py-1 rounded-lg hover:bg-white/10"
          >
            Dismiss
          </button>
        </div>
      ) : (
        <div className="mt-3 flex items-center justify-between text-xs text-foreground/50 px-1">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]"></span> Banana Leaf / Plate
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-secondary"></span> Centerpiece
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Candle / Votive
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-600"></span> Water Tumbler
            </span>
          </div>
          <span className="hidden sm:inline">Tap any item to inspect</span>
        </div>
      )}
    </div>
  );
}
