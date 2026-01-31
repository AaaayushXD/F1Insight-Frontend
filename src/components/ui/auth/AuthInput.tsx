import { motion } from "framer-motion";
import { useState } from "react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function AuthInput({ label, error, ...props }: AuthInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-1.5 w-full group">
      <label className="text-[10px] font-orbitron uppercase tracking-widest text-f1-steel group-focus-within:text-f1-red transition-colors">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className="w-full bg-f1-graphite/30 border border-f1-white/10 rounded-md px-4 py-3 text-f1-white font-inter placeholder:text-f1-steel/30 focus:outline-none transition-all"
        />

        {/* Mechanical Outline Animation */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-f1-red"
          initial={{ width: 0 }}
          animate={{ width: isFocused ? "100%" : 0 }}
          transition={{ duration: 0.3, ease: "circOut" }}
        />

        {/* Input Progress Micro-Indicator (Technical Detail) */}
        {isFocused && (
          <motion.div
            className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-3 bg-f1-red/40 rounded-full"
                animate={{
                  opacity: [0.2, 1, 0.2],
                  height: [8, 12, 8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[10px] text-f1-red font-orbitron uppercase tracking-tight"
        >
          ! {error}
        </motion.p>
      )}
    </div>
  );
}
