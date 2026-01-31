import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { GlowingButton } from "./ui/GlowingButton";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0B0D10]">
      {/* Background Image with Parallax-like feel (static for now, can be enhanced) */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src="/landing/images/main.jpeg"
          alt="F1 Race Car"
          className="h-full w-full object-cover object-center sm:object-[center_top]"
          draggable={false}
        />
        {/* Dark Gradient Overlay - Top to Bottom & Left to Right for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0B0D10]" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.h1
            className="font-inter text-5xl font-bold tracking-tight text-white sm:text-7xl"
            style={{
              textShadow: "0 4px 20px rgba(0,0,0,0.5)",
              letterSpacing: "-0.02em",
            }}
          >
            PRECISION <br />
            <span className="text-[#E10600]">MEETS</span> PACE.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 font-inter text-lg leading-8 text-gray-300 sm:text-xl max-w-lg"
          >
            Unlock elite predictive intelligence and race analytics. Data-driven
            insights for the modern F1 enthusiast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex items-center gap-x-6"
          >
            <Link to="/schedules">
              <GlowingButton size="lg">
                EXPLORE INSIGHTS
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </GlowingButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Grid Pattern Overlay for "Engineered" feel */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </section>
  );
}
