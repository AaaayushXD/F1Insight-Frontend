import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlowingButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export function GlowingButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  size = "md",
  disabled = false,
}: GlowingButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-1.5 text-[10px]",
    md: "px-6 py-2.5 text-xs",
    lg: "px-8 py-3 text-sm",
    xl: "px-10 py-4 text-base",
  };

  const baseStyles =
    "group relative overflow-hidden font-bold uppercase tracking-[0.1em] transition-all duration-300";
  const variantStyles =
    variant === "primary"
      ? "bg-f1-red text-white shadow-[0_0_15px_rgba(225,6,0,0.3)] hover:shadow-[0_0_25px_rgba(225,6,0,0.5)]"
      : "border border-f1-graphite text-f1-steel hover:text-white hover:border-f1-steel bg-transparent";

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`${baseStyles} ${variantStyles} ${sizeClasses[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Energy Pass Glow Effect */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ x: "-100%" }}
        variants={{
          hover: { x: "100%" },
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
        }}
      />

      {/* Subtle border glow for ghost variant */}
      {variant === "ghost" && (
        <motion.div
          className="absolute inset-0 z-0 border border-f1-red opacity-0"
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}
