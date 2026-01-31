import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Zap,
  Settings,
  CloudRain,
  Wind,
  Thermometer,
  Play,
  RotateCcw,
  Trophy,
  PieChart,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { YearSelect } from "../components/YearSelect";
import { CircuitMapWidget } from "../components/dashboard/CircuitMapWidget";
import { cn } from "../lib/utils";

type Step = 1 | 2 | 3 | 4;

export default function PredictionPlayground() {
  const [step, setStep] = useState<Step>(1);
  const [year, setYear] = useState("2026");
  const [selectedCircuit, setSelectedCircuit] = useState("silverstone");

  const nextStep = () =>
    setStep((prev) => (prev < 4 ? ((prev + 1) as Step) : prev));
  const prevStep = () =>
    setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));

  const runSimulation = () => {
    setStep(3);
    setTimeout(() => {
      setStep(4);
    }, 4000);
  };

  const reset = () => {
    setStep(1);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Progress Stepper */}
      <div className="flex items-center justify-center gap-4 py-4">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-orbitron font-bold text-xs transition-all duration-500",
                step >= s
                  ? "bg-f1-red text-white shadow-[0_0_15px_rgba(225,6,0,0.5)]"
                  : "bg-f1-graphite text-f1-steel opacity-50",
              )}
            >
              {s}
            </div>
            {s < 4 && (
              <div
                className={cn(
                  "w-12 h-[2px] mx-2 transition-all duration-500",
                  step > s ? "bg-f1-red" : "bg-f1-graphite",
                )}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-2xl font-orbitron font-bold text-white mb-2 tracking-tight">
                STATION 01: EVENT CONFIGURATION
              </h2>
              <p className="text-f1-steel text-sm uppercase tracking-widest">
                Select target season and circuit for telemetry simulation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red px-2">
                    SELECT SEASON
                  </h4>
                  <YearSelect year={year} onYearChange={setYear} />
                </div>

                <div className="space-y-4 pt-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red px-2">
                    SELECT CIRCUIT
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {["Silverstone", "Monaco", "Spa", "Suzuka"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCircuit(c.toLowerCase())}
                        className={cn(
                          "p-4 rounded-xl border transition-all text-left group",
                          selectedCircuit === c.toLowerCase()
                            ? "border-f1-red bg-f1-red/10 text-white"
                            : "border-f1-graphite bg-f1-black hover:border-f1-steel text-f1-steel hover:text-white",
                        )}
                      >
                        <span className="text-[10px] uppercase font-bold tracking-widest block mb-1 opacity-50 group-hover:opacity-100 italic transition-opacity">
                          CIRCUIT ID
                        </span>
                        <span className="font-orbitron font-bold uppercase tracking-tight">
                          {c}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <CircuitMapWidget />
            </div>

            <div className="flex justify-end pt-8">
              <button
                onClick={nextStep}
                className="group flex items-center gap-3 px-8 py-3 rounded-full bg-f1-red text-white font-orbitron font-bold tracking-widest hover:shadow-[0_0_20px_rgba(225,6,0,0.6)] transition-all active:scale-95"
              >
                STATION 02{" "}
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-2xl font-orbitron font-bold text-white mb-2 tracking-tight">
                STATION 02: PARAMETER INJECTION
              </h2>
              <p className="text-f1-steel text-sm uppercase tracking-widest">
                Adjust driver performance, team efficiency and environmental
                factors
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red px-2">
                    PERFORMANCE SLIDERS
                  </h4>
                  {[
                    { name: "Driver Aggression", val: 75, icon: Zap },
                    { name: "Engine Performance", val: 92, icon: Settings },
                    { name: "Tyre Management", val: 68, icon: RotateCcw },
                  ].map((s) => (
                    <div key={s.name} className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-bold text-f1-steel uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                          <s.icon size={12} className="text-f1-red" />
                          {s.name}
                        </div>
                        <span className="text-white">{s.val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-f1-graphite/30 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${s.val}%` }}
                          className="h-full bg-f1-red shadow-[0_0_8px_rgba(225,6,0,0.5)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red px-2">
                  ENVIRONMENTAL CONDITIONS
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Dry Track", icon: CloudRain, active: true },
                    { name: "High Wind", icon: Wind, active: false },
                    { name: "Track Temp", icon: Thermometer, active: true },
                    { name: "Ambient Temp", icon: Thermometer, active: false },
                  ].map((c) => (
                    <button
                      key={c.name}
                      className={cn(
                        "p-6 rounded-xl border flex flex-col items-center gap-3 transition-all",
                        c.active
                          ? "border-f1-red bg-f1-red/10 text-f1-red shadow-[0_0_15px_rgba(225,6,0,0.2)]"
                          : "border-f1-graphite bg-f1-black/40 text-f1-steel hover:border-f1-steel hover:text-white",
                      )}
                    >
                      <c.icon size={24} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        {c.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-8">
              <button
                onClick={prevStep}
                className="flex items-center gap-3 px-8 py-3 rounded-full border border-f1-graphite text-f1-steel font-orbitron font-bold tracking-widest hover:border-f1-steel hover:text-white transition-all"
              >
                <ChevronLeft size={18} /> BACK
              </button>
              <button
                onClick={runSimulation}
                className="group flex items-center gap-3 px-10 py-3 rounded-full bg-f1-red text-white font-orbitron font-bold tracking-widest hover:shadow-[0_0_20px_rgba(225,6,0,0.6)] transition-all active:scale-95"
              >
                RUN PREDICTION <Play size={18} fill="currentColor" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[400px] space-y-12"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 rounded-full border-t-2 border-f1-red shadow-[0_0_30px_rgba(225,6,0,0.3)]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-12 h-12 text-f1-red animate-pulse" />
              </div>
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-2xl font-orbitron font-bold text-white animate-pulse">
                SYNTHESIZING TELEMETRY...
              </h2>
              <div className="space-y-2 opacity-60">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-f1-steel">
                  Processing 50,000 Datapoints/sec
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-f1-steel">
                  Applying Monte Carlo Predictive Models
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-2xl font-orbitron font-bold text-white mb-2 tracking-tight">
                MISSION SUCCESS: DATA ACCESSIBLE
              </h2>
              <p className="text-f1-steel text-sm uppercase tracking-widest">
                Final predictive outcomes for {selectedCircuit.toUpperCase()}{" "}
                {year}
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Podium Visualization */}
              <Card className="border-f1-graphite bg-f1-black/40 backdrop-blur-md overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red flex items-center gap-2">
                    <Trophy size={14} /> PREDICTED PODIUM
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-around h-64 mt-4">
                    {/* 2nd Place */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "70%" }}
                      transition={{ delay: 0.3 }}
                      className="w-24 bg-f1-graphite/30 rounded-t-xl flex flex-col items-center justify-end pb-4 border-t border-f1-graphite/50 relative group"
                    >
                      <span className="text-2xl font-orbitron font-bold text-f1-steel mb-2">
                        2
                      </span>
                      <div className="text-[8px] font-bold uppercase text-center px-2">
                        NORRIS
                      </div>
                    </motion.div>
                    {/* 1st Place */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ delay: 0.1 }}
                      className="w-28 bg-f1-red/20 rounded-t-xl flex flex-col items-center justify-end pb-6 border-t border-f1-red shadow-[0_0_30px_rgba(225,6,0,0.2)] relative group"
                    >
                      <div className="absolute -top-12">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <Trophy size={32} className="text-[#FFD700]" />
                        </motion.div>
                      </div>
                      <span className="text-4xl font-orbitron font-bold text-white mb-2">
                        1
                      </span>
                      <div className="text-[10px] font-bold uppercase text-center px-2 text-f1-red">
                        VERSTAPPEN
                      </div>
                    </motion.div>
                    {/* 3rd Place */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "50%" }}
                      transition={{ delay: 0.5 }}
                      className="w-24 bg-f1-graphite/20 rounded-t-xl flex flex-col items-center justify-end pb-4 border-t border-f1-graphite/30 relative group"
                    >
                      <span className="text-xl font-orbitron font-bold text-f1-steel/80 mb-2">
                        3
                      </span>
                      <div className="text-[8px] font-bold uppercase text-center px-2">
                        LECLERC
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Widget */}
              <Card className="border-f1-graphite bg-f1-black/40 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red flex items-center gap-2">
                    <PieChart size={14} /> TYRE DEGRADATION IMPACT
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-t border-f1-graphite/30">
                    <div className="text-center space-y-4">
                      <div className="flex gap-2 justify-center">
                        {["SOFT", "MEDIUM", "HARD"].map((t) => (
                          <div
                            key={t}
                            className="px-3 py-1 rounded-full border border-f1-graphite text-[8px] font-bold text-f1-steel"
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                      <p className="text-f1-steel font-orbitron text-[10px] uppercase tracking-widest animate-pulse">
                        Rendering Analytics...
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center pt-8">
              <button
                onClick={reset}
                className="group flex items-center gap-3 px-10 py-4 rounded-full border border-f1-red text-f1-red font-orbitron font-bold tracking-widest hover:bg-f1-red hover:text-white transition-all active:scale-95 shadow-[0_0_20px_rgba(225,6,0,0.1)] hover:shadow-[0_0_20px_rgba(225,6,0,0.4)]"
              >
                <RotateCcw
                  size={18}
                  className="group-hover:-rotate-180 transition-transform duration-500"
                />{" "}
                RESET PLAYGROUND
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
