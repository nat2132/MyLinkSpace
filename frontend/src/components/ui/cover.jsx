import React from "react";
import { cn } from "./utils";

/**
 * Animated word highlight used inline in headings.
 * Renders the wrapped text with a gradient sweep background.
 */
export function Cover({ className, children, ...props }) {
  return (
    <span
      className={cn(
        "relative inline-block whitespace-nowrap bg-[#3F56A9]/80 bg-[linear-gradient(110deg,#E9C46A,45%,#F4A261,55%,#E76F51)]",
        "bg-clip-text px-2 text-transparent",
        className,
      )}
      style={{
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.1), 0 4px 30px rgba(255,255,255,0.15)",
      }}
      {...props}
    >
      {children}
    </span>
  );
}
