import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { GlowingBorder } from "../ui/GlowingBorder";
import { Card, CardContent } from "../ui/card";
import { useEffect, useState } from "react";

interface StatsCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  delay?: number;
}

export function StatsCard({
  title,
  value,
  suffix = "",
  icon: Icon,
  trend,
  delay = 0,
}: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <GlowingBorder className="h-full rounded-2xl">
        <Card className="border-transparent bg-f1-black/60 backdrop-blur-sm hover:bg-f1-graphite/20 transition-all group">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-steel mb-2 group-hover:text-f1-red transition-colors">
                  {title}
                </p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl font-orbitron font-bold text-white tracking-tight">
                    {displayValue.toLocaleString()}
                    {suffix}
                  </h3>
                </div>

                {trend && (
                  <div
                    className={`mt-2 flex items-center gap-1 text-[10px] font-bold ${trend.isUp ? "text-green-500" : "text-f1-red"}`}
                  >
                    <span>{trend.isUp ? "↑" : "↓"}</span>
                    <span>{trend.value}% VS LAST SEASON</span>
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-f1-graphite/30 text-f1-steel group-hover:text-f1-red group-hover:bg-f1-red/10 transition-all">
                <Icon size={20} />
              </div>
            </div>

            {/* Micro-sparkline/telemetry bar decoration */}
            <div className="mt-6 h-1 w-full bg-f1-graphite/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ duration: 1.5, delay: delay + 0.2 }}
                className="h-full bg-f1-red shadow-[0_0_8px_rgba(225,6,0,0.5)]"
              />
            </div>
          </CardContent>
        </Card>
      </GlowingBorder>
    </motion.div>
  );
}
