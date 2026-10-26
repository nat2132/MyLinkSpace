import React from "react";
import { cn } from "./utils";

/**
 * Purely decorative fixed backdrop: a dark space gradient with a soft
 * glowing black-hole like vignette in the centre. No canvas/WebGL so the
 * render stays deterministic and cheap.
 */
export function BlackHoleBackground({ className }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-[#04071D]", className)}>
      {/* Base space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(63,86,169,0.35) 0%, rgba(4,7,29,0.9) 45%, #04071D 100%)",
        }}
      />
      {/* Glow ring */}
      <div
        className="absolute left-1/2 top-[45%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(120,140,255,0.25)" }}
      />
      {/* Accretion ring */}
      <div
        className="absolute left-1/2 top-[45%] h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-2 border-white/10 blur-[1px]"
        style={{ transform: "translate(-50%,-50%) rotate(-15deg)" }}
      />
      {/* Scattered stars */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, white 50%, transparent 51%), radial-gradient(1px 1px at 70% 20%, white 50%, transparent 51%), radial-gradient(1px 1px at 40% 70%, white 50%, transparent 51%), radial-gradient(1px 1px at 85% 80%, white 50%, transparent 51%), radial-gradient(1px 1px at 10% 85%, white 50%, transparent 51%)",
        }}
      />
    </div>
  );
}

export default BlackHoleBackground;
