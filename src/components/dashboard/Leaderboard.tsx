import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GlowingBorder } from "../ui/GlowingBorder";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Trophy, TrendingUp } from "lucide-react";

const drivers = [
  {
    rank: 1,
    name: "Max Verstappen",
    team: "Red Bull Racing",
    points: 395,
    color: "#0600EF",
  },
  {
    rank: 2,
    name: "Lando Norris",
    team: "McLaren",
    points: 331,
    color: "#FF8700",
  },
  {
    rank: 3,
    name: "Charles Leclerc",
    team: "Ferrari",
    points: 307,
    color: "#E80020",
  },
  {
    rank: 4,
    name: "Oscar Piastri",
    team: "McLaren",
    points: 262,
    color: "#FF8700",
  },
];

export function Leaderboard() {
  return (
    <GlowingBorder className="h-full rounded-2xl">
      <Card className="h-full border-transparent bg-f1-black/60 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-steel">
            TOP DRIVERS
          </CardTitle>
          <Trophy size={16} className="text-f1-red" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            {drivers.map((driver, i) => (
              <Link
                key={driver.name}
                to={`/dashboard/drivers/${driver.name.toLowerCase().replace(/ /g, "_")}`}
              >
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative flex items-center justify-between p-3 rounded-xl hover:bg-f1-graphite/30 transition-all border border-transparent hover:border-f1-graphite/50"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-orbitron font-bold text-f1-steel/50 transition-colors group-hover:text-f1-red">
                      {driver.rank}
                    </span>
                    <div
                      className="w-1 h-8 rounded-full"
                      style={{ backgroundColor: driver.color }}
                    />
                    <div>
                      <p className="text-sm font-bold text-white tracking-wide">
                        {driver.name}
                      </p>
                      <p className="text-[10px] text-f1-steel uppercase font-bold tracking-tighter">
                        {driver.team}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-orbitron font-bold text-f1-white">
                      {driver.points}
                    </p>
                    <p className="text-[8px] text-green-500 font-bold flex items-center gap-0.5 justify-end">
                      <TrendingUp size={10} /> +12
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <Link to="/dashboard/drivers">
            <button className="w-full py-3 mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-f1-steel hover:text-white transition-colors border-t border-f1-graphite/50 bg-f1-black/20 hover:bg-f1-black/40 rounded-b-xl">
              VIEW FULL STANDINGS
            </button>
          </Link>
        </CardContent>
      </Card>
    </GlowingBorder>
  );
}
