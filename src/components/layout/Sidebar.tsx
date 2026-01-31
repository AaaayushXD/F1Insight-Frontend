import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Component,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Playground", icon: Zap, href: "/dashboard/playground" },
  { name: "Schedule", icon: Calendar, href: "/dashboard/schedules" },
  { name: "Drivers", icon: Users, href: "/dashboard/drivers" },
  { name: "Constructors", icon: Component, href: "/dashboard/constructors" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="relative h-screen border-r border-f1-graphite bg-f1-black flex flex-col transition-all duration-300 ease-in-out z-40"
    >
      <div className="flex h-20 items-center px-6 justify-between border-b border-f1-graphite">
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-orbitron font-bold text-f1-red tracking-widest text-lg"
          >
            F1<span className="text-white">INSIGHT</span>
          </motion.span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-f1-graphite/50 text-f1-steel transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.href ||
            (item.href !== "/dashboard" &&
              location.pathname.startsWith(item.href));
          return (
            <Link key={item.name} to={item.href}>
              <motion.div
                whileHover={{ x: 5 }}
                className={cn(
                  "group relative flex items-center h-12 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-f1-red/10 text-f1-white"
                    : "text-f1-steel hover:text-white",
                )}
              >
                <div className="w-16 flex items-center justify-center">
                  <item.icon
                    size={20}
                    className={cn(
                      "transition-colors",
                      isActive ? "text-f1-red" : "group-hover:text-white",
                    )}
                  />
                </div>

                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-medium tracking-wide"
                  >
                    {item.name}
                  </motion.span>
                )}

                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1 h-6 bg-f1-red rounded-r-full shadow-[0_0_10px_rgba(225,6,0,0.5)]"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-f1-graphite">
        <Link to="/dashboard/profile">
          <div
            className={cn(
              "flex items-center gap-3 p-2 rounded-xl bg-f1-graphite/20 hover:bg-f1-graphite/40 transition-all cursor-pointer group",
              isCollapsed ? "justify-center" : "",
              location.pathname === "/dashboard/profile"
                ? "ring-1 ring-f1-red/50"
                : "",
            )}
          >
            <div className="w-8 h-8 rounded-full bg-f1-red flex items-center justify-center font-bold text-xs text-white shadow-[0_0_10px_rgba(225,6,0,0.3)] group-hover:scale-110 transition-transform">
              <User size={14} />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">
                  Aayush Lamichhane
                </span>
                <span className="text-[10px] text-f1-steel">
                  Telemetry Lead
                </span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
