"use client";

import { motion } from "motion/react";

// Soft CMYK glow blobs that drift behind the hero. Heavy blur + low opacity so
// they read as ambient print-color light, not literal shapes.

const blobs = [
  {
    color: "rgba(43, 139, 214, 0.32)", // print-cyan
    size: 720,
    initial: { x: "-10%", y: "12%" },
    drift: { x: ["-10%", "8%", "-10%"], y: ["12%", "0%", "12%"] },
    duration: 22
  },
  {
    color: "rgba(214, 51, 108, 0.22)", // print-magenta
    size: 540,
    initial: { x: "65%", y: "55%" },
    drift: { x: ["65%", "75%", "65%"], y: ["55%", "40%", "55%"] },
    duration: 18
  },
  {
    color: "rgba(244, 185, 66, 0.20)", // print-yellow
    size: 460,
    initial: { x: "85%", y: "8%" },
    drift: { x: ["85%", "70%", "85%"], y: ["8%", "20%", "8%"] },
    duration: 26
  },
  {
    color: "rgba(45, 186, 122, 0.20)", // print-green
    size: 520,
    initial: { x: "12%", y: "75%" },
    drift: { x: ["12%", "25%", "12%"], y: ["75%", "62%", "75%"] },
    duration: 24
  }
];

export function CmykBlobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((b, i) => (
        <motion.span
          key={i}
          initial={{ ...b.initial, scale: 0.95, opacity: 0 }}
          animate={{
            x: b.drift.x,
            y: b.drift.y,
            scale: [0.95, 1.06, 0.95],
            opacity: 1
          }}
          transition={{
            x: { duration: b.duration, repeat: Infinity, ease: "easeInOut" },
            y: {
              duration: b.duration * 0.85,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: {
              duration: b.duration * 0.6,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: { duration: 1.6, ease: "easeOut" }
          }}
          style={{
            position: "absolute",
            width: b.size,
            height: b.size,
            borderRadius: "9999px",
            background: `radial-gradient(closest-side, ${b.color}, transparent 70%)`,
            filter: "blur(60px)",
            mixBlendMode: "screen"
          }}
        />
      ))}
    </div>
  );
}
