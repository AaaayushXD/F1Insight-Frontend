import { motion } from "framer-motion";
import { GlowingBorder } from "../ui/GlowingBorder";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { MapPin, Navigation } from "lucide-react";

export function CircuitMapWidget() {
  // SVG path for a generic F1-style race track (e.g., Silverstone-esque)
  const trackPath = "M 50 150 Q 100 50 200 80 T 350 150 T 250 250 T 50 150";

  return (
    <GlowingBorder className="h-full rounded-2xl">
      <Card className="h-full border-transparent bg-f1-black/60 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-steel">
            LIVE TRACK LAYOUT
          </CardTitle>
          <div className="flex items-center gap-2 text-[10px] text-f1-red font-orbitron animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-f1-red" />
            LIVE TELEMETRY
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video flex items-center justify-center p-4">
            <svg
              viewBox="0 0 400 300"
              className="w-full h-full drop-shadow-[0_0_20px_rgba(225,6,0,0.15)]"
            >
              {/* Main Track Path */}
              <path
                d={trackPath}
                fill="none"
                stroke="#1F232B"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Inner Track Glow */}
              <motion.path
                d={trackPath}
                fill="none"
                stroke="#E10600"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="1, 15"
                animate={{ strokeDashoffset: [0, -100] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                opacity="0.3"
              />

              {/* Animated F1 Car Dot */}
              <motion.circle
                r="4"
                fill="#E10600"
                className="shadow-[0_0_10px_#E10600]"
              >
                <animateMotion
                  dur="8s"
                  repeatCount="indefinite"
                  path={trackPath}
                  rotate="auto"
                />
              </motion.circle>
            </svg>

            {/* Info Overlay */}
            <div className="absolute top-4 left-4 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-f1-red" />
                <span className="text-xs font-bold font-orbitron">
                  SILVERSTONE, UK
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Navigation size={14} className="text-f1-steel" />
                <span className="text-[10px] text-f1-steel uppercase font-bold tracking-widest">
                  DRY CONDITIONS
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-f1-graphite/20 border border-f1-graphite/30">
              <p className="text-[8px] text-f1-steel uppercase font-bold mb-1">
                TRACK TEMP
              </p>
              <p className="text-lg font-orbitron font-bold">42°C</p>
            </div>
            <div className="p-3 rounded-xl bg-f1-graphite/20 border border-f1-graphite/30">
              <p className="text-[8px] text-f1-steel uppercase font-bold mb-1">
                AIR TEMP
              </p>
              <p className="text-lg font-orbitron font-bold">28°C</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </GlowingBorder>
  );
}
