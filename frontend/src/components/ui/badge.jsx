import React from "react";
import { cn } from "./utils";

const variants = {
  default: "bg-[#D2E823] text-gray-900",
  secondary: "bg-gray-900 text-white",
  outline: "border border-gray-400 bg-transparent",
};

const Badge = ({ className, variant = "default", children, ...props }) => (
  <span
    className={cn(
      "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-semibold",
      variants[variant] ?? variants.default,
      className,
    )}
    {...props}
  >
    {children}
  </span>
);

export { Badge };
