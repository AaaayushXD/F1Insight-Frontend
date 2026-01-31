import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  Target,
  Zap,
  TrendingUp,
  Flag,
  User as UserIcon,
  Shield,
  Activity,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { cn } from "../lib/utils";

const stats = [
  { label: "Race Wins", value: "54", icon: Trophy, color: "text-amber-500" },
  { label: "Podiums", value: "98", icon: Target, color: "text-f1-red" },
  { label: "Pole Positions", value: "32", icon: Zap, color: "text-yellow-400" },
  { label: "World Titles", value: "3", icon: Shield, color: "text-blue-500" },
];

const abilities = [
  { label: "Aggression", value: 95 },
  { label: "Overtaking", value: 98 },
  { label: "Defending", value: 92 },
  { label: "Wet Pace", value: 89 },
];

export default function DriverDetails() {
  const { driverId: _driverId } = useParams<{ driverId: string }>();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
        <Link
          to="/dashboard/drivers"
          className="group flex items-center gap-2 text-f1-steel hover:text-white transition-colors absolute top-0 -mt-2"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Back to Drivers
          </span>
        </Link>

        <div className="mt-8 flex flex-col md:flex-row gap-8 items-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-48 h-48 rounded-2xl bg-f1-black border border-f1-graphite overflow-hidden group shadow-[0_0_30px_rgba(225,6,0,0.1)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-f1-red/20 to-transparent opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <UserIcon
                size={80}
                className="text-f1-graphite group-hover:text-f1-red transition-colors duration-500"
              />
            </div>
            {/* Number Overlay */}
            <div className="absolute bottom-2 right-2 font-orbitron font-black text-6xl text-f1-red/10 group-hover:text-f1-red/20 transition-colors">
              1
            </div>
          </motion.div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white tracking-tighter uppercase">
                Max{" "}
                <span className="text-f1-red underline decoration-4 underline-offset-8">
                  Verstappen
                </span>
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <span className="px-3 py-1 bg-f1-red/10 border border-f1-red/30 rounded-full text-f1-red text-[10px] font-black uppercase tracking-widest">
                  Oracle Red Bull Racing
                </span>
                <span className="px-3 py-1 bg-f1-graphite/30 border border-f1-graphite/50 rounded-full text-f1-steel text-[10px] font-bold uppercase tracking-widest">
                  Netherlands
                </span>
                <span className="px-3 py-1 bg-f1-graphite/30 border border-f1-graphite/50 rounded-full text-f1-steel text-[10px] font-bold uppercase tracking-widest">
                  Active
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
        {/* Ability Analysis */}
        <Card className="md:col-span-2 bg-f1-black/40 border-f1-graphite backdrop-blur-sm">
          <CardContent className="p-8 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-f1-red" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                  Performance Metrics
                </h3>
              </div>
              <span className="text-[10px] font-bold text-f1-steel uppercase tracking-widest">
                Real-time Telemetry Data
              </span>
            </div>

            <div className="space-y-6">
              {abilities.map((ability, i) => (
                <div key={ability.label} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-f1-steel">{ability.label}</span>
                    <span className="text-f1-red">{ability.value}%</span>
                  </div>
                  <div className="h-2 bg-f1-graphite/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ability.value}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="h-full bg-gradient-to-r from-f1-red to-f1-red shadow-[0_0_10px_rgba(225,6,0,0.5)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Info */}
        <Card className="bg-f1-black/40 border-f1-graphite backdrop-blur-sm">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Flag size={18} className="text-f1-steel" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                Career Profile
              </h3>
            </div>

            <div className="space-y-4">
              {[
                { label: "Date of Birth", value: "30/09/1997" },
                { label: "Place of Birth", value: "Hasselt, Belgium" },
                { label: "Points", value: "2586.5" },
                { label: "Grand Prix Entered", value: "185" },
                { label: "Highest Grid Position", value: "1" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center border-b border-f1-graphite/30 pb-2"
                >
                  <span className="text-[10px] font-bold text-f1-steel uppercase">
                    {item.label}
                  </span>
                  <span className="text-xs font-bold text-white">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <TrendingUp size={16} className="text-green-500 mb-2" />
              <p className="text-[10px] text-f1-steel leading-relaxed">
                Max Verstappen has redefined aggressive racing in the modern
                era, securing three consecutive world titles and holding the
                record for most wins in a single season.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
