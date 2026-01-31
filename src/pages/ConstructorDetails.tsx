import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  Target,
  Zap,
  Activity,
  Component,
  Cpu,
  Layers,
  Wind,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { cn } from "../lib/utils";

const stats = [
  { label: "Total Wins", value: "113", icon: Trophy, color: "text-amber-500" },
  { label: "Total Podiums", value: "264", icon: Target, color: "text-f1-red" },
  {
    label: "Constructor Titles",
    value: "6",
    icon: Layers,
    color: "text-blue-500",
  },
  { label: "Fastest Laps", value: "95", icon: Zap, color: "text-yellow-400" },
];

const metrics = [
  { label: "Engine Power", value: 98, icon: Cpu },
  { label: "Aero Efficiency", value: 96, icon: Wind },
  { label: "Downforce", value: 97, icon: Activity },
  { label: "Reliability", value: 92, icon: Target },
];

export default function ConstructorDetails() {
  const { constructorId: _constructorId } = useParams<{
    constructorId: string;
  }>();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
        <Link
          to="/dashboard/constructors"
          className="group flex items-center gap-2 text-f1-steel hover:text-white transition-colors absolute top-0 -mt-2"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Back to Teams
          </span>
        </Link>

        <div className="mt-8 flex flex-col md:flex-row gap-8 items-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-48 h-48 rounded-2xl bg-f1-black border border-f1-graphite overflow-hidden group shadow-[0_0_30px_rgba(225,6,0,0.1)] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-f1-red/20 to-transparent opacity-50" />
            <Component
              size={80}
              className="text-f1-graphite group-hover:text-f1-red transition-colors duration-500"
            />
          </motion.div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white tracking-tighter uppercase">
                Red Bull{" "}
                <span className="text-f1-red underline decoration-4 underline-offset-8">
                  Racing
                </span>
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <span className="px-3 py-1 bg-f1-red/10 border border-f1-red/30 rounded-full text-f1-red text-[10px] font-black uppercase tracking-widest">
                  Milton Keynes, UK
                </span>
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-500 text-[10px] font-bold uppercase tracking-widest">
                  Honda Powered
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-f1-black/40 border-f1-graphite backdrop-blur-sm group hover:border-f1-red transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <stat.icon
                  size={24}
                  className={cn(
                    stat.color,
                    "mb-2 group-hover:scale-110 transition-transform",
                  )}
                />
                <p className="text-[8px] font-bold text-f1-steel uppercase tracking-widest">
                  {stat.label}
                </p>
                <p className="text-3xl font-orbitron font-black text-white">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Performance Metrics */}
        <Card className="md:col-span-2 bg-f1-black/40 border-f1-graphite backdrop-blur-sm">
          <CardContent className="p-8 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-f1-red" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                  Engineering Metrics
                </h3>
              </div>
              <span className="text-[10px] font-bold text-f1-steel uppercase tracking-widest">
                Wind Tunnel & Dynamo Data
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {metrics.map((metric, i) => (
                <div key={metric.label} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-f1-graphite/20">
                      <metric.icon size={16} className="text-f1-red" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-f1-steel uppercase tracking-wider">
                        {metric.label}
                      </span>
                      <span className="text-xl font-orbitron font-bold text-white">
                        {metric.value}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1 bg-f1-graphite/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="h-full bg-f1-red"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Lineup */}
        <Card className="bg-f1-black/40 border-f1-graphite backdrop-blur-sm">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <UsersIcon size={18} className="text-f1-steel" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                Driver Lineup
              </h3>
            </div>

            <div className="space-y-4">
              {[
                { name: "Max Verstappen", pos: "1st", color: "bg-f1-red" },
                { name: "Sergio Perez", pos: "8th", color: "bg-f1-steel" },
              ].map((driver) => (
                <div
                  key={driver.name}
                  className="flex items-center gap-4 p-4 rounded-xl bg-f1-graphite/20 border border-f1-graphite/30 hover:border-f1-red/50 transition-colors group"
                >
                  <div className={cn("w-1 h-8 rounded-full", driver.color)} />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white group-hover:text-f1-red transition-colors">
                      {driver.name}
                    </span>
                    <span className="text-[8px] font-bold text-f1-steel uppercase tracking-widest">
                      Position: {driver.pos}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
