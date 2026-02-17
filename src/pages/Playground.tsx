/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Zap,
  Play,
  RotateCcw,
  Trophy,
  BarChart3,
  Target,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { YearSelect } from "../components/YearSelect";
import { cn } from "../lib/utils";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchSchedule } from "../store/slices/scheduleSlice";
import { fetchDrivers } from "../store/slices/driverSlice";
import {
  predictRace,
  predictSingle,
  type RacePrediction,
  type SinglePrediction,
} from "../services/prediction.service";
import {
  getStrategyRecommendation,
  type StrategyResult,
} from "../services/strategy.service";

type Step = 1 | 2 | 3 | 4;

export default function PredictionPlayground() {
  const dispatch = useAppDispatch();
  const { races } = useAppSelector((state) => state.schedule);
  const { drivers } = useAppSelector((state) => state.driver);

  const [step, setStep] = useState<Step>(1);
  const [year, setYear] = useState("2025");
  const [selectedRound, setSelectedRound] = useState<string | null>(null);
  const [predictionMode, setPredictionMode] = useState<"race" | "single">("race");
  const [selectedDriverId, setSelectedDriverId] = useState<string>("");
  const [error, setError] = useState("");

  // Results
  const [racePrediction, setRacePrediction] = useState<RacePrediction | null>(null);
  const [singlePrediction, setSinglePrediction] = useState<SinglePrediction | null>(null);
  const [strategy, setStrategy] = useState<StrategyResult | null>(null);
  const [strategyExpanded, setStrategyExpanded] = useState(false);
  const [strategyLoading, setStrategyLoading] = useState(false);

  // Fetch schedule when year changes
  useEffect(() => {
    dispatch(fetchSchedule(year));
    dispatch(fetchDrivers(year));
    setSelectedRound(null);
  }, [year, dispatch]);

  const selectedRace = races.find((r) => r.round === selectedRound);

  const nextStep = () => setStep((prev) => (prev < 4 ? ((prev + 1) as Step) : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));

  const runPrediction = async () => {
    if (!selectedRound) return;
    setStep(3);
    setError("");

    try {
      const season = parseInt(year);
      const round = parseInt(selectedRound);

      if (predictionMode === "race") {
        const result = await predictRace(season, round);
        setRacePrediction(result);
        setSinglePrediction(null);
      } else {
        const result = await predictSingle(season, round, selectedDriverId);
        setSinglePrediction(result);
        setRacePrediction(null);
      }
      setStrategy(null);
      setStep(4);
      } catch (err: unknown) {
      const msg = (err as any).response?.data?.message || (err as any).message || "Prediction failed.";
      setError(msg);
      setStep(2);
    }
  };

  const runStrategy = async () => {
    if (!racePrediction && !singlePrediction) return;
    setStrategyLoading(true);

    try {
      const mean = singlePrediction
        ? singlePrediction.predictedFinishPosition
        : racePrediction!.predictions[0]?.predictedFinishPosition || 5;

      const result = await getStrategyRecommendation({
        predictedPositionMean: mean,
        predictedPositionStd: 2.0,
        circuitId: selectedRace?.Circuit?.circuitId,
      });
      setStrategy(result);
      setStrategyExpanded(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Strategy analysis failed.");
    } finally {
      setStrategyLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setRacePrediction(null);
    setSinglePrediction(null);
    setStrategy(null);
    setStrategyExpanded(false);
    setError("");
  };

  // Sort predictions by position
  const sortedPredictions = racePrediction
    ? [...racePrediction.predictions].sort(
        (a, b) => a.predictedFinishPosition - b.predictedFinishPosition
      )
    : [];

  const podium = sortedPredictions.slice(0, 3);

  // Find driver name by ID
  const driverName = (id: string) => {
    const d = drivers.find((dr) => dr.driverId === id);
    return d ? `${d.givenName} ${d.familyName}` : id;
  };
  const driverLastName = (id: string) => {
    const d = drivers.find((dr) => dr.driverId === id);
    return d ? d.familyName.toUpperCase() : id.toUpperCase();
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
                  : "bg-f1-graphite text-f1-steel opacity-50"
              )}
            >
              {s}
            </div>
            {s < 4 && (
              <div
                className={cn(
                  "w-12 h-[2px] mx-2 transition-all duration-500",
                  step > s ? "bg-f1-red" : "bg-f1-graphite"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Select Event */}
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
                STATION 01: EVENT SELECTION
              </h2>
              <p className="text-f1-steel text-sm uppercase tracking-widest">
                Select target season and race for prediction
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red px-2">
                    SELECT SEASON
                  </h4>
                  <YearSelect year={year} onYearChange={setYear} startYear={2014} endYear={2025} />
                </div>

                <div className="space-y-4 pt-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red px-2">
                    SELECT RACE ({races.length} available)
                  </h4>
                  <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2">
                    {races.map((race) => (
                      <button
                        key={race.round}
                        onClick={() => setSelectedRound(race.round)}
                        className={cn(
                          "p-3 rounded-xl border transition-all text-left group",
                          selectedRound === race.round
                            ? "border-f1-red bg-f1-red/10 text-white"
                            : "border-f1-graphite bg-f1-black hover:border-f1-steel text-f1-steel hover:text-white"
                        )}
                      >
                        <span className="text-[8px] uppercase font-bold tracking-widest block mb-1 opacity-50">
                          R{race.round}
                        </span>
                        <span className="text-[11px] font-orbitron font-bold uppercase tracking-tight block">
                          {race.raceName}
                        </span>
                        <span className="text-[8px] text-f1-steel block mt-1">
                          {race.Circuit?.circuitName || ""}
                        </span>
                      </button>
                    ))}
                    {races.length === 0 && (
                      <p className="col-span-2 text-f1-steel text-sm text-center py-8">
                        No races found for {year}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* <CircuitMapWidget /> */}
            </div>

            <div className="flex justify-end pt-8">
              <button
                onClick={nextStep}
                disabled={!selectedRound}
                className={cn(
                  "group flex items-center gap-3 px-8 py-3 rounded-full font-orbitron font-bold tracking-widest transition-all active:scale-95",
                  selectedRound
                    ? "bg-f1-red text-white hover:shadow-[0_0_20px_rgba(225,6,0,0.6)]"
                    : "bg-f1-graphite text-f1-steel cursor-not-allowed"
                )}
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

        {/* Step 2: Configure */}
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
                STATION 02: PREDICTION CONFIGURATION
              </h2>
              <p className="text-f1-steel text-sm uppercase tracking-widest">
                {selectedRace?.raceName || "Race"} — {selectedRace?.Circuit?.circuitName || ""}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red px-2">
                  PREDICTION MODE
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPredictionMode("race")}
                    className={cn(
                      "p-6 rounded-xl border flex flex-col items-center gap-3 transition-all",
                      predictionMode === "race"
                        ? "border-f1-red bg-f1-red/10 text-f1-red shadow-[0_0_15px_rgba(225,6,0,0.2)]"
                        : "border-f1-graphite bg-f1-black/40 text-f1-steel hover:border-f1-steel hover:text-white"
                    )}
                  >
                    <BarChart3 size={24} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Full Grid
                    </span>
                  </button>
                  <button
                    onClick={() => setPredictionMode("single")}
                    className={cn(
                      "p-6 rounded-xl border flex flex-col items-center gap-3 transition-all",
                      predictionMode === "single"
                        ? "border-f1-red bg-f1-red/10 text-f1-red shadow-[0_0_15px_rgba(225,6,0,0.2)]"
                        : "border-f1-graphite bg-f1-black/40 text-f1-steel hover:border-f1-steel hover:text-white"
                    )}
                  >
                    <Target size={24} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Single Driver
                    </span>
                  </button>
                </div>

                {predictionMode === "single" && (
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red px-2">
                      SELECT DRIVER
                    </h4>
                    <select
                      value={selectedDriverId}
                      onChange={(e) => setSelectedDriverId(e.target.value)}
                      className="w-full bg-f1-graphite/30 border border-f1-graphite rounded-lg px-4 py-3 text-white font-orbitron text-sm focus:outline-none focus:border-f1-red"
                    >
                      <option value="">Choose a driver...</option>
                      {drivers.map((d) => (
                        <option key={d.driverId} value={d.driverId}>
                          {d.givenName} {d.familyName}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red px-2">
                  RACE INFO
                </h4>
                <Card className="border-f1-graphite bg-f1-black/40">
                  <CardContent className="pt-6 space-y-3">
                    <InfoRow label="Season" value={year} />
                    <InfoRow label="Round" value={selectedRound || "-"} />
                    <InfoRow label="Circuit" value={selectedRace?.Circuit?.circuitName || "-"} />
                    <InfoRow label="Location" value={selectedRace?.Circuit?.Location ? `${selectedRace.Circuit.Location.locality}, ${selectedRace.Circuit.Location.country}` : "-"} />
                    <InfoRow label="Date" value={selectedRace?.date || "-"} />
                  </CardContent>
                </Card>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 justify-center text-f1-red text-sm">
                <AlertTriangle size={14} /> {error}
              </div>
            )}

            <div className="flex justify-between pt-8">
              <button
                onClick={prevStep}
                className="flex items-center gap-3 px-8 py-3 rounded-full border border-f1-graphite text-f1-steel font-orbitron font-bold tracking-widest hover:border-f1-steel hover:text-white transition-all"
              >
                <ChevronLeft size={18} /> BACK
              </button>
              <button
                onClick={runPrediction}
                disabled={predictionMode === "single" && !selectedDriverId}
                className={cn(
                  "group flex items-center gap-3 px-10 py-3 rounded-full font-orbitron font-bold tracking-widest transition-all active:scale-95",
                  predictionMode === "single" && !selectedDriverId
                    ? "bg-f1-graphite text-f1-steel cursor-not-allowed"
                    : "bg-f1-red text-white hover:shadow-[0_0_20px_rgba(225,6,0,0.6)]"
                )}
              >
                RUN PREDICTION <Play size={18} fill="currentColor" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Processing */}
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
                  Running Ensemble Prediction Model
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-f1-steel">
                  Ridge + Random Forest + Gradient Boosting + XGBoost
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Results */}
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
                {selectedRace?.raceName || "Race"} {year} — Predictive Outcomes
              </p>
            </div>

            {/* Race prediction results */}
            {racePrediction && sortedPredictions.length > 0 && (
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
                      {podium[1] && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "70%" }}
                          transition={{ delay: 0.3 }}
                          className="w-24 bg-f1-graphite/30 rounded-t-xl flex flex-col items-center justify-end pb-4 border-t border-f1-graphite/50"
                        >
                          <span className="text-2xl font-orbitron font-bold text-f1-steel mb-2">2</span>
                          <div className="text-[8px] font-bold uppercase text-center px-2">
                            {driverLastName(podium[1].driverId)}
                          </div>
                          <div className="text-[7px] text-f1-red mt-1">
                            {(podium[1].podiumProbability * 100).toFixed(0)}% podium
                          </div>
                        </motion.div>
                      )}
                      {/* 1st Place */}
                      {podium[0] && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "100%" }}
                          transition={{ delay: 0.1 }}
                          className="w-28 bg-f1-red/20 rounded-t-xl flex flex-col items-center justify-end pb-6 border-t border-f1-red shadow-[0_0_30px_rgba(225,6,0,0.2)]"
                        >
                          <div className="absolute -top-12">
                            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                              <Trophy size={32} className="text-[#FFD700]" />
                            </motion.div>
                          </div>
                          <span className="text-4xl font-orbitron font-bold text-white mb-2">1</span>
                          <div className="text-[10px] font-bold uppercase text-center px-2 text-f1-red">
                            {driverLastName(podium[0].driverId)}
                          </div>
                          <div className="text-[7px] text-white/70 mt-1">
                            {(podium[0].podiumProbability * 100).toFixed(0)}% podium
                          </div>
                        </motion.div>
                      )}
                      {/* 3rd Place */}
                      {podium[2] && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "50%" }}
                          transition={{ delay: 0.5 }}
                          className="w-24 bg-f1-graphite/20 rounded-t-xl flex flex-col items-center justify-end pb-4 border-t border-f1-graphite/30"
                        >
                          <span className="text-xl font-orbitron font-bold text-f1-steel/80 mb-2">3</span>
                          <div className="text-[8px] font-bold uppercase text-center px-2">
                            {driverLastName(podium[2].driverId)}
                          </div>
                          <div className="text-[7px] text-f1-red mt-1">
                            {(podium[2].podiumProbability * 100).toFixed(0)}% podium
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Full Grid */}
                <Card className="border-f1-graphite bg-f1-black/40 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red flex items-center gap-2">
                      <BarChart3 size={14} /> PREDICTED GRID ORDER
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 max-h-64 overflow-y-auto pr-2">
                      {sortedPredictions.map((p, i) => (
                        <div
                          key={p.driverId}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                            i < 3 ? "bg-f1-red/10" : "hover:bg-f1-graphite/20"
                          )}
                        >
                          <span
                            className={cn(
                              "w-6 text-right font-orbitron font-bold text-xs",
                              i < 3 ? "text-f1-red" : "text-f1-steel"
                            )}
                          >
                            P{i + 1}
                          </span>
                          <span className="flex-1 text-xs font-bold uppercase text-white">
                            {driverName(p.driverId)}
                          </span>
                          <span className="text-[9px] text-f1-steel font-mono">
                            {p.predictedFinishPosition.toFixed(1)}
                          </span>
                          {p.podiumProbability > 0.1 && (
                            <span className="text-[8px] bg-f1-red/20 text-f1-red px-2 py-0.5 rounded-full font-bold">
                              {(p.podiumProbability * 100).toFixed(0)}%
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Single prediction result */}
            {singlePrediction && (
              <Card className="border-f1-graphite bg-f1-black/40 backdrop-blur-md max-w-lg mx-auto">
                <CardHeader>
                  <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red flex items-center gap-2">
                    <Target size={14} /> SINGLE DRIVER PREDICTION
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4 py-8">
                  <div className="text-5xl font-orbitron font-bold text-white">
                    P{Math.round(singlePrediction.predictedFinishPosition)}
                  </div>
                  <div className="text-sm font-bold uppercase text-f1-steel">
                    {driverName(singlePrediction.driverId)}
                  </div>
                  <div className="text-xs text-f1-steel">
                    Predicted position: {singlePrediction.predictedFinishPosition.toFixed(2)}
                  </div>
                  <div className="text-xs">
                    <span className="bg-f1-red/20 text-f1-red px-3 py-1 rounded-full font-bold">
                      {(singlePrediction.podiumProbability * 100).toFixed(0)}% podium probability
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Strategy Section */}
            <div className="space-y-4">
              <button
                onClick={strategy ? () => setStrategyExpanded(!strategyExpanded) : runStrategy}
                disabled={strategyLoading}
                className={cn(
                  "w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl border font-orbitron font-bold text-xs uppercase tracking-widest transition-all",
                  strategy
                    ? "border-f1-graphite bg-f1-black/40 text-white hover:border-f1-steel"
                    : "border-f1-red/50 bg-f1-red/10 text-f1-red hover:bg-f1-red/20",
                  strategyLoading && "opacity-50 cursor-not-allowed"
                )}
              >
                {strategyLoading ? (
                  "Analyzing Strategy..."
                ) : strategy ? (
                  <>
                    Strategy Analysis{" "}
                    {strategyExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </>
                ) : (
                  "Analyze Pit Stop Strategy"
                )}
              </button>

              <AnimatePresence>
                {strategy && strategyExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-f1-graphite bg-f1-black/40">
                        <CardHeader>
                          <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red">
                            Best Strategy
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="text-center py-4">
                            <div className="text-2xl font-orbitron font-bold text-white">
                              {strategy.bestStrategy?.label || "N/A"}
                            </div>
                            <div className="text-sm text-f1-steel mt-2">
                              Expected position: P{typeof strategy.bestStrategy?.expectedPosition === "number" ? strategy.bestStrategy.expectedPosition.toFixed(1) : "-"}
                            </div>
                          </div>
                          {strategy.strategyRanking && strategy.strategyRanking.length > 0 && (
                            <div className="space-y-2">
                              <h5 className="text-[9px] uppercase tracking-widest text-f1-steel font-bold">
                                All Strategies
                              </h5>
                              {strategy.strategyRanking.map((s, i) => (
                                <div
                                  key={s.label}
                                  className={cn(
                                    "flex items-center justify-between px-3 py-2 rounded-lg",
                                    i === 0 ? "bg-f1-red/10" : "bg-f1-graphite/10"
                                  )}
                                >
                                  <span className="text-xs font-bold text-white">{s.label}</span>
                                  <span className="text-xs text-f1-steel font-mono">
                                    P{typeof s.expected_position === "number" ? s.expected_position.toFixed(1) : "-"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="border-f1-graphite bg-f1-black/40">
                        <CardHeader>
                          <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red">
                            Tactical Insights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {strategy.safetyCarAnalysis?.probability !== undefined && (
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-f1-steel uppercase">Safety Car Prob</span>
                              <span className="text-xs font-bold text-white">
                                {(strategy.safetyCarAnalysis.probability * 100).toFixed(0)}%
                              </span>
                            </div>
                          )}
                          {strategy.tacticalRecommendations && strategy.tacticalRecommendations.length > 0 && (
                            <div className="space-y-2">
                              <h5 className="text-[9px] uppercase tracking-widest text-f1-steel font-bold">
                                Recommendations
                              </h5>
                              {strategy.tacticalRecommendations.map((r: any, i: number) => (
                                <div key={i} className="text-xs text-f1-steel pl-3 border-l-2 border-f1-red/30">
                                  {typeof r === "string" ? r : r.action || JSON.stringify(r)}
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-f1-graphite/20 last:border-0">
      <span className="text-[10px] uppercase tracking-widest text-f1-steel font-bold">{label}</span>
      <span className="text-xs text-white font-mono">{value}</span>
    </div>
  );
}
