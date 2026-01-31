import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Button } from "../components/ui/button";
import { Flag, ArrowLeft, Zap, Thermometer, Wind } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCircuit } from "../store/slices/circuitSlice";

export default function CircuitDetails() {
  const { circuitId } = useParams<{ circuitId: string }>();
  const dispatch = useAppDispatch();
  const { selectedCircuit: circuit, status } = useAppSelector(
    (state) => state.circuit,
  );
  const loading =
    status === "loading" && (!circuit || circuit.circuitId !== circuitId);

  useEffect(() => {
    if (circuitId) {
      if (!circuit || circuit.circuitId !== circuitId) {
        dispatch(fetchCircuit(circuitId));
      }
    }
  }, [dispatch, circuitId, circuit]);

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-12 w-64 mb-4" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="h-[400px] rounded-xl" />
          <Skeleton className="h-[400px] rounded-xl" />
        </div>
      </div>
    );
  }

  if (!circuit) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-f1-white">Circuit Not Found</h2>
        <Link to="/dashboard/circuits">
          <Button variant="link" className="text-f1-red">
            Back to Circuits
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <Link
        to="/dashboard/schedules"
        className="group inline-flex items-center text-f1-steel hover:text-f1-red transition-colors mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">
          Back to Schedule
        </span>
      </Link>

      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-orbitron font-black text-white tracking-tighter uppercase">
          {circuit.circuitName}
        </h1>
        <p className="text-[10px] font-bold text-f1-steel tracking-[0.3em] uppercase">
          {circuit.Location.locality}, {circuit.Location.country}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Track Schematic */}
        <Card className="lg:col-span-2 border-f1-graphite bg-f1-black/40 backdrop-blur-sm relative overflow-hidden flex flex-col items-center justify-center p-12 min-h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-f1-red/5 to-transparent opacity-50" />

          {/* Animated SVG Track Placeholder */}
          <div className="relative w-full aspect-video flex items-center justify-center">
            <motion.svg
              viewBox="0 0 800 400"
              className="w-full h-full text-f1-graphite/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <path
                id="circuit-path"
                d="M100,200 Q150,100 250,100 T400,200 T550,300 T700,200 T550,100 T400,200 T250,300 T100,200"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="10 5"
              />

              {/* F1 Car Dot Animation */}
              <motion.circle
                r="6"
                fill="#E10600"
                className="shadow-[0_0_15px_rgba(225,6,0,1)]"
                animate={{
                  offsetDistance: ["0%", "100%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  offsetPath:
                    "path('M100,200 Q150,100 250,100 T400,200 T550,300 T700,200 T550,100 T400,200 T250,300 T100,200')",
                }}
              />
            </motion.svg>

            <div className="absolute top-4 left-4 flex flex-col gap-1">
              <span className="text-[8px] font-bold text-f1-steel uppercase tracking-[0.2em]">
                Live Simulation
              </span>
              <div className="h-0.5 w-12 bg-f1-red animate-pulse" />
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card className="border-f1-graphite bg-f1-black/40 backdrop-blur-sm group hover:border-f1-red transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-f1-steel flex items-center gap-2">
                <Zap size={14} className="text-f1-red" />
                Technial Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Track Length", value: "5.412 km", icon: Wind },
                { label: "Turns", value: "16", icon: Flag },
                { label: "DRS Zones", value: "3", icon: Zap },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex justify-between items-center border-b border-f1-graphite/20 pb-2"
                >
                  <span className="text-[10px] font-bold text-f1-steel uppercase">
                    {stat.label}
                  </span>
                  <span className="text-xs font-bold text-white">
                    {stat.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-f1-graphite bg-f1-black/40 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-f1-steel flex items-center gap-2">
                <Thermometer size={14} className="text-f1-red" />
                Environment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-f1-graphite/10">
                  <p className="text-[8px] text-f1-steel uppercase mb-1">
                    Air Temp
                  </p>
                  <p className="text-lg font-orbitron font-bold text-white">
                    24°C
                  </p>
                </div>
                <div className="text-center p-3 rounded-lg bg-f1-graphite/10">
                  <p className="text-[8px] text-f1-steel uppercase mb-1">
                    Track Temp
                  </p>
                  <p className="text-lg font-orbitron font-bold text-f1-red">
                    38°C
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <a
              href={circuit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button
                variant="outline"
                className="w-full border-f1-red/30 text-f1-red hover:bg-f1-red hover:text-white transition-all text-[10px] font-black uppercase tracking-widest h-12"
              >
                View Wikipedia Telemetry
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
