import React from "react";
import { cn } from "./utils";

/** Glassy card wrapper with a subtle glare gradient edge. */
export function GlareCard({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.08] p-1 shadow-2xl",
        "before:pointer-events-none before:absolute before:inset-0 before:content-['']",
        "before:bg-[linear-gradient(120deg,rgba(255,255,255,0.25),transparent_40%)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
