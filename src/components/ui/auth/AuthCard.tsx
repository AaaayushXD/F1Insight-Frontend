import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { GlowingBorder } from "../GlowingBorder";

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, perspective: 1000, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full max-w-md mx-auto"
    >
      <GlowingBorder className="rounded-2xl p-px bg-f1-graphite/20 backdrop-blur-sm shadow-2xl overflow-hidden relative group">
        {/* Technical Line Sweep Animation */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(225, 6, 0, 0.1), transparent)",
            width: "50%",
          }}
        />

        <div className="bg-f1-black/90 p-8 rounded-[15px] relative z-10">
          <div className="mb-8 space-y-2">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold font-orbitron text-f1-white tracking-widest uppercase"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-f1-steel font-inter"
              >
                {subtitle}
              </motion.p>
            )}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "2rem" }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="h-1 bg-f1-red mt-2"
            />
          </div>

          <div className="space-y-6">{children}</div>
        </div>
      </GlowingBorder>
    </motion.div>
  );
}
