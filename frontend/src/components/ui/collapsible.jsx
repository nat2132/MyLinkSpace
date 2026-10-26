import React, { createContext, useContext, useId } from "react";
import { cn } from "./utils";

/**
 * Minimal controlled-collapsible implementation covering the API the FAQ
 * section relies on: <Collapsible open onOpenChange> with one
 * <CollapsibleTrigger> and one <CollapsibleContent>.
 */
const CollapsibleContext = createContext({ open: false, toggle: () => {} });

const Collapsible = ({ className, open, onOpenChange, children, ...props }) => {
  const toggle = () => onOpenChange?.(!open);
  return (
    <CollapsibleContext.Provider value={{ open, toggle }}>
      <div className={cn(className)} data-state={open ? "open" : "closed"} {...props}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
};

const CollapsibleTrigger = ({ className, children, ...props }) => {
  const { open, toggle } = useContext(CollapsibleContext);
  return (
    <button type="button" aria-expanded={open} className={cn("w-full", className)} onClick={toggle} {...props}>
      {children}
    </button>
  );
};

const CollapsibleContent = ({ className, children, ...props }) => {
  const { open } = useContext(CollapsibleContext);
  if (!open) return null;
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
};

// useId imported for parity with the radix-based API; kept for future needs.
void useId;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
