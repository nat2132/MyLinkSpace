import React from "react";
import { cn } from "./utils";

/** Horizontal floating dock of { title, icon, href } items with hover tooltips. */
export function FloatingDock({ items = [], className, ...props }) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)} {...props}>
      {items.map((item) => (
        <a
          key={item.title}
          href={item.href ?? "#"}
          title={item.title}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 p-3 text-white transition-transform hover:-translate-y-1 hover:bg-gray-700"
        >
          <span className="pointer-events-none absolute top-full mt-2 hidden whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white group-hover:block">
            {item.title}
          </span>
          {item.icon}
        </a>
      ))}
    </div>
  );
}
