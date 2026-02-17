import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Trophy, Map, Flag, TrendingUp, Timer, Zap } from "lucide-react";
import { StatsCard } from "../components/dashboard/StatsCard";
import { Leaderboard } from "../components/dashboard/Leaderboard";
import { PageHeader } from "../components/PageHeader";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchSchedule } from "../store/slices/scheduleSlice";
import { api } from "../services/api";
import { getNotifications, type Notification } from "../services/notification.service";
import type { DriverStanding } from "../services/types";

const NEXT_RACE_KEY = "f1insight_next_race";

function formatCountdown(diff: number): string {
  if (diff <= 0) return "00:00:00:00";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);
  return `${String(days).padStart(2, "0")}:${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { races } = useAppSelector((state) => state.schedule);
  const year = String(new Date().getFullYear());

  const [leaderPoints, setLeaderPoints] = useState<number>(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [countdown, setCountdown] = useState("00:00:00:00");

  useEffect(() => {
    dispatch(fetchSchedule(year));
  }, [year, dispatch]);

  // Fetch driver standings for leader points
  useEffect(() => {
    api.getDriverStandings(year)
      .then((standings: DriverStanding[]) => {
        if (standings.length > 0) {
          setLeaderPoints(parseInt(standings[0].points));
        }
      })
      .catch(() => {});
  }, [year]);

  // Fetch recent notifications
  useEffect(() => {
    getNotifications(1, 5)
      .then((res) => setNotifications(res.notifications))
      .catch(() => {});
  }, []);

  // Compute next race and cache it
  const nextRace = useMemo(() => {
    const now = new Date();
    const upcoming = races.filter((r) => new Date(r.date) >= now);
    const next = upcoming.length > 0 ? upcoming[0] : null;
    if (next) {
      localStorage.setItem(NEXT_RACE_KEY, JSON.stringify(next));
    }
    return next;
  }, [races]);

  // Fall back to cached next race on first load before API returns
  const cachedNextRace = useMemo(() => {
    if (nextRace) return nextRace;
    try {
      const cached = localStorage.getItem(NEXT_RACE_KEY);
      if (cached) return JSON.parse(cached);
    } catch { /* ignore */ }
    return null;
  }, [nextRace]);

  // Live countdown timer — ticks every second
  useEffect(() => {
    if (!cachedNextRace) return;

    const raceTime = new Date(cachedNextRace.date).getTime();

    const tick = () => {
      const diff = raceTime - Date.now();
      setCountdown(formatCountdown(diff));
    };

    tick(); // immediate first tick
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [cachedNextRace]);

  // Count completed races (past dates)
  const completedRaces = useMemo(() => {
    const now = new Date();
    return races.filter((r) => new Date(r.date) < now).length;
  }, [races]);

  const timeAgo = useCallback((dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }, []);

  const upcomingRaces = useMemo(() => {
    const now = new Date();
    return races.filter((r) => new Date(r.date) >= now).slice(0, 4);
  }, [races]);

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
              {cachedNextRace ? cachedNextRace.raceName : "SEASON COMPLETE"}
            </p>
            <p className="text-2xl font-orbitron font-bold text-f1-red tabular-nums">
              {countdown}
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Races Completed"
          value={completedRaces}
          suffix={`/${races.length}`}
          icon={Flag}
          delay={0.1}
        />
        <StatsCard
          title="Championship Lead"
          value={leaderPoints}
          suffix="PTS"
          icon={Trophy}
          delay={0.2}
        />
        <StatsCard
          title="Season"
          value={parseInt(year)}
          suffix=""
          icon={TrendingUp}
          delay={0.3}
        />
        <StatsCard
          title="ML Model"
          value={3.09}
          suffix="MAE"
          icon={Zap}
          delay={0.4}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-steel px-2">
                UPCOMING RACES
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {upcomingRaces.map((race) => (
                  <div
                    key={race.round}
                    className="p-3 rounded-xl border border-f1-graphite bg-f1-black/20 hover:bg-f1-black/40 transition-colors flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-orbitron font-bold text-f1-red">
                        R{race.round}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wide">
                        {race.raceName}
                      </span>
                    </div>
                    <span className="text-[10px] text-f1-steel font-mono">
                      {race.date}
                    </span>
                  </div>
                ))}
                {upcomingRaces.length === 0 && (
                  <div className="h-64 rounded-2xl border border-f1-graphite bg-f1-black/40 flex items-center justify-center">
                    <p className="text-f1-steel font-orbitron text-[10px] uppercase tracking-widest">
                      No upcoming races
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-steel px-2">
                RECENT NOTIFICATIONS
              </h4>
              <div className="space-y-3">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif._id}
                      className="p-4 rounded-xl border border-f1-graphite bg-f1-black/20 hover:bg-f1-black/40 transition-colors flex justify-between items-center group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-1 h-1 rounded-full ${notif.read ? "bg-f1-steel" : "bg-f1-red"}`} />
                        <div>
                          <span className="text-xs font-bold uppercase tracking-widest block">
                            {notif.title}
                          </span>
                          <span className="text-[9px] text-f1-steel">{notif.message}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-f1-steel whitespace-nowrap">
                        {timeAgo(notif.createdAt)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-xl border border-f1-graphite bg-f1-black/20 text-center">
                    <p className="text-[10px] text-f1-steel uppercase tracking-widest">
                      No notifications yet
                    </p>
                  </div>
                )}
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
                PREDICTION PLAYGROUND
              </h3>
            </div>
            <motion.a
              href="/dashboard/playground"
              whileHover={{ x: 5 }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red flex items-center gap-2"
            >
              RUN PREDICTION <span>→</span>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
