import { motion } from "framer-motion";
import { Trophy, Map, Flag, TrendingUp, Timer, Zap } from "lucide-react";
import { StatsCard } from "../components/dashboard/StatsCard";
import { Leaderboard } from "../components/dashboard/Leaderboard";
import { CircuitMapWidget } from "../components/dashboard/CircuitMapWidget";
import { PageHeader } from "../components/PageHeader";
import { useAppDispatch } from "../store/hooks";
import { pushNotification } from "../store/slices/notificationSlice";

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const triggerTestNotif = (type: any) => {
    dispatch(
      pushNotification({
        type,
        title: `${type.toUpperCase()} ALERT`,
        message: `System detecting new telemetry datapoints for ${type} analysis. Efficiency optimized by 12.4%.`,
        autoClose: 5000,
      }),
    );
  };
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <PageHeader
          title="MISSION CONTROL"
          description="Formula 1 Strategic Intelligence & Live Analytics Feed"
        />

        <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-f1-red/10 border border-f1-red/20 backdrop-blur-md">
          <div className="text-right">
            <p className="text-[10px] font-bold text-f1-steel uppercase tracking-[0.2em]">
              NEXT EVENT LIVE IN
            </p>
            <p className="text-2xl font-orbitron font-bold text-f1-red tabular-nums">
              14:22:45:08
            </p>
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-3 rounded-full bg-f1-red shadow-[0_0_15px_#E10600]"
          >
            <Timer className="text-white h-5 w-5" />
          </motion.div>
        </div>
      </div>

      {/* Debug Triggers */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => triggerTestNotif("race")}
          className="px-3 py-1 bg-white/10 border border-white/20 rounded-md text-[8px] font-bold uppercase transition-all hover:bg-white hover:text-black"
        >
          Test Race
        </button>
        <button
          onClick={() => triggerTestNotif("prediction")}
          className="px-3 py-1 bg-f1-red/10 border border-f1-red/20 rounded-md text-[8px] font-bold uppercase transition-all hover:bg-f1-red hover:text-white"
        >
          Test Prediction
        </button>
        <button
          onClick={() => triggerTestNotif("driver")}
          className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-[8px] font-bold uppercase transition-all hover:bg-blue-500 hover:text-white"
        >
          Test Driver
        </button>
        <button
          onClick={() => triggerTestNotif("system")}
          className="px-3 py-1 bg-gray-500/10 border border-gray-500/20 rounded-md text-[8px] font-bold uppercase transition-all hover:bg-gray-500 hover:text-white"
        >
          Test System
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Races Completed"
          value={18}
          suffix="/24"
          icon={Flag}
          delay={0.1}
        />
        <StatsCard
          title="Championship Lead"
          value={64}
          suffix="PTS"
          icon={Trophy}
          trend={{ value: 12, isUp: true }}
          delay={0.2}
        />
        <StatsCard
          title="Fastest Lap Avg"
          value={1.12}
          suffix="s"
          icon={TrendingUp}
          delay={0.3}
        />
        <StatsCard
          title="System Latency"
          value={12}
          suffix="ms"
          icon={Zap}
          delay={0.4}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8 text-white">
          <CircuitMapWidget />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-steel px-2">
                LATEST PERFORMANCE
              </h4>
              <div className="h-64 rounded-2xl border border-f1-graphite bg-f1-black/40 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,6,0,0.1)_0%,transparent_70%)]" />
                <p className="text-f1-steel font-orbitron text-[10px] uppercase tracking-widest animate-pulse">
                  Graphing Telemetry...
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-steel px-2">
                RECENT NOTIFICATIONS
              </h4>
              <div className="space-y-3">
                {[
                  { title: "DRS Enabled", time: "2m ago", type: "system" },
                  {
                    title: "Box this lap - Softs",
                    time: "5m ago",
                    type: "msg",
                  },
                ].map((notif, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-f1-graphite bg-f1-black/20 hover:bg-f1-black/40 transition-colors flex justify-between items-center group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-f1-red" />
                      <span className="text-xs font-bold uppercase tracking-widest">
                        {notif.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-f1-steel">
                      {notif.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <Leaderboard />

          <div className="p-6 rounded-2xl border border-f1-graphite bg-f1-black/40 relative overflow-hidden min-h-[160px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-4">
              <Map className="text-f1-red h-10 w-10 opacity-20" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-steel mb-2">
                QUICK LINK
              </p>
              <h3 className="text-lg font-orbitron font-bold">
                CIRCUIT ANALYSIS
              </h3>
            </div>
            <motion.button
              whileHover={{ x: 5 }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red flex items-center gap-2"
            >
              ENTER PORTAL <span>→</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
