"use client";

import React, { useEffect, useRef } from "react";
import { useMotion } from "./motion-context";
import { useTheme, THEMES } from "@/lib/theme/theme-context";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
}

export function MotionGraphicsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { motionLevel, showParticles, showCyberGrid } = useMotion();
  const { theme, mode } = useTheme();

  useEffect(() => {
    if (!showParticles || motionLevel === "off") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Color choices based on active theme
    const activeAccent = THEMES[theme]?.accent || "#10b981";
    const particleColors =
      theme === "cyber"
        ? ["#00f0ff", "#8b5cf6", "#f43f5e", "#38bdf8", "#ec4899"]
        : [activeAccent, "#f59e0b", "#38bdf8", "rgba(255, 255, 255, 0.8)"];

    const count = motionLevel === "high" ? (width < 768 ? 28 : 55) : 18;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (motionLevel === "high" ? 0.6 : 0.25),
        vy: (Math.random() - 0.5) * (motionLevel === "high" ? 0.6 : 0.25),
        size: Math.random() * 2.8 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = Math.max(0.08, p.alpha + Math.sin(p.pulsePhase) * 0.2);

        // Mouse gentle repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw glowing particle
        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = theme === "cyber" ? 10 : 5;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect nearby particles with subtle holographic laser thread in Cyber mode
        if (theme === "cyber" && motionLevel === "high") {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const pdist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (pdist < 85) {
              ctx.save();
              ctx.globalAlpha = (1 - pdist / 85) * 0.15;
              ctx.strokeStyle = activeAccent;
              ctx.lineWidth = 0.75;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [motionLevel, showParticles, theme, mode]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      {/* Cyber Grid Layer */}
      {(showCyberGrid || theme === "cyber") && (
        <div className="absolute inset-0 cyber-grid opacity-60 transition-opacity duration-700" />
      )}

      {/* HTML5 Canvas for Floating Embers & Cyber Particles */}
      {showParticles && motionLevel !== "off" && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{ willChange: "transform" }}
        />
      )}
    </div>
  );
}
