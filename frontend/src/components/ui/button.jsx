import React from "react";
import { cn } from "./utils";

const variants = {
  default: "bg-[#EB455F] text-white hover:opacity-90",
  outline: "border border-gray-400 bg-white text-gray-900 hover:bg-gray-50",
  ghost: "bg-transparent hover:bg-gray-100",
  link: "bg-transparent underline-offset-4 hover:underline",
};

const Button = React.forwardRef(
  ({ className, variant = "default", asChild = false, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50",
      variants[variant] ?? variants.default,
      className,
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(classes, children.props.className),
        children: children.props.children,
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
