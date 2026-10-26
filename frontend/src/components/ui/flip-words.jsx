import React from "react";
import { cn } from "./utils";

/** Word-cycling headline text. */
export function FlipWords({ words = [], className, interval = 2500 }) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!words.length) return undefined;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % words.length),
      interval,
    );
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <span className={cn("inline-block transition-opacity", className)}>
      {words[index] ?? ""}
    </span>
  );
}
