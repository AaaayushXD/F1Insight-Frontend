import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface YearSelectProps {
  year: string;
  onYearChange: (year: string) => void;
  startYear?: number;
  endYear?: number;
}

export function YearSelect({
  year,
  onYearChange,
  startYear = 1950,
  endYear,
}: YearSelectProps) {
  const maxYear = endYear ?? 2026;
  const years = Array.from({ length: maxYear - startYear + 1 }, (_, i) =>
    (maxYear - i).toString(),
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      const selectedElement = scrollRef.current.querySelector(
        `[data-year="${year}"]`,
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [year]);

  return (
    <div className="group/nav relative flex items-center w-full max-w-lg mx-auto px-12">
      {/* Navigation Buttons - Always visible on desktop for usability */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 z-30 p-2 text-f1-white bg-f1-black/60 rounded-full hover:text-f1-red transition-all shadow-lg backdrop-blur-sm active:scale-95"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="relative w-full overflow-hidden rounded-full bg-f1-black/60 border border-f1-graphite p-1 shadow-2xl backdrop-blur-sm">
        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory mask-fade-edges py-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {years.map((y) => {
            const isActive = year === y;
            return (
              <motion.button
                key={y}
                data-year={y}
                onClick={() => onYearChange(y)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "relative shrink-0 snap-center min-w-[85px] h-9 flex items-center justify-center rounded-full transition-all duration-300",
                  "font-orbitron font-bold text-xs tracking-wider z-10",
                  isActive ? "text-white" : "text-white/60 hover:text-white",
                )}
              >
                {y}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-f1-red shadow-[0_0_20px_rgba(225,6,0,0.5)] -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 z-30 p-2 text-f1-white bg-f1-black/60 rounded-full hover:text-f1-red transition-all shadow-lg backdrop-blur-sm active:scale-95"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Visual Indicator: Fade Edges */}
      <style>{`
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 25%, black 75%, transparent);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
