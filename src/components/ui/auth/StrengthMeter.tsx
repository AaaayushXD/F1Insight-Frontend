import { motion } from "framer-motion";

interface StrengthMeterProps {
  strength: number; // 0-4
}

export function StrengthMeter({ strength }: StrengthMeterProps) {
  const labels = ["WEAK", "FAIR", "GOOD", "STRONG", "ELITE"];
  const colors = [
    "bg-f1-steel/30",
    "bg-f1-amber/50",
    "bg-f1-amber",
    "bg-f1-green/50",
    "bg-f1-green",
  ];

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-orbitron text-f1-steel tracking-tighter">
          ENCRYPTION STRENGTH
        </span>
        <span
          className={`text-[9px] font-orbitron tracking-widest ${strength > 0 ? "text-f1-white" : "text-f1-steel"}`}
        >
          {labels[strength]}
        </span>
      </div>
      <div className="flex gap-1 h-1">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={`flex-1 rounded-full transition-colors ${i < strength ? colors[strength] : "bg-f1-graphite"}`}
            initial={false}
            animate={{
              opacity: i < strength ? 1 : 0.3,
              scaleY: i < strength ? 1.2 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
