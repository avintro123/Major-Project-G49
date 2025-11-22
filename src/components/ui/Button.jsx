import React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(({ className, variant = "primary", size = "md", ...props }, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] border-none",
    secondary: "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20",
    outline: "border border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue",
    ghost: "text-gray-400 hover:text-white hover:bg-white/5",
    danger: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3 text-lg font-semibold",
    icon: "p-2",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none font-medium tracking-wide",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };
