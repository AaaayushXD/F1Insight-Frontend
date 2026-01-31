import { motion } from "framer-motion";
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

export function AuthButton({ children, isLoading, ...props }: AuthButtonProps) {
  // Destructure event handlers that clash with motion props
  const { onAnimationStart, onDrag, onDragEnd, onDragStart, ...safeProps } =
    props;

  return (
    <motion.button
      {...(safeProps as any)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative w-full overflow-hidden rounded-md bg-f1-red py-3 text-sm font-orbitron uppercase tracking-widest text-f1-white transition-all
        hover:bg-[#ff0700] hover:shadow-[0_0_20px_rgba(225,6,0,0.4)]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isLoading ? "cursor-wait" : ""}
      `}
    >
      {/* Moving Light Streak */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
          width: "30%",
        }}
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <motion.div
            className="h-4 w-4 border-2 border-f1-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          children
        )}
      </span>
    </motion.button>
  );
}
