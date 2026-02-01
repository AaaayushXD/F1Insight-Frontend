import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Zap,
  Shield,
  Flag,
  X,
  Pin,
  PinOff,
  ChevronRight,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  dismissNotification,
  togglePin,
  type Notification as NotificationType,
} from "../../store/slices/notificationSlice";
import { cn } from "../../lib/utils";

const typeConfigs = {
  race: {
    icon: Flag,
    color: "#FFFFFF",
    glow: "rgba(255, 255, 255, 0.4)",
    bg: "bg-white/10",
  },
  prediction: {
    icon: Zap,
    color: "#E10600",
    glow: "rgba(225, 6, 0, 0.4)",
    bg: "bg-f1-red/10",
  },
  driver: {
    icon: Bell, // Standard notification icon for driver updates
    color: "#00D2BE",
    glow: "rgba(0, 210, 190, 0.4)",
    bg: "bg-[#00D2BE]/10",
  },
  system: {
    icon: Shield,
    color: "#9CA3AF",
    glow: "rgba(156, 163, 175, 0.3)",
    bg: "bg-gray-400/10",
  },
};

const NotificationItem = ({
  notification,
  index,
}: {
  notification: NotificationType;
  index: number;
}) => {
  const dispatch = useAppDispatch();
  const config = typeConfigs[notification.type];
  const Icon = config.icon;

  useEffect(() => {
    if (notification.autoClose && !notification.pinned) {
      const timer = setTimeout(() => {
        dispatch(dismissNotification(notification.id));
      }, notification.autoClose);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9, filter: "blur(4px)" }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        // Depth perspective logic: slight shift and scale for background items
        zIndex: 100 - index,
        y: index * 4,
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
        x: 20,
        filter: "blur(8px)",
        transition: { duration: 0.2 },
      }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative w-80 mb-3 bg-[#1a1a1a]/95 backdrop-blur-md border border-f1-graphite rounded-xl overflow-hidden shadow-2xl group",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:-translate-x-full before:hover:translate-x-full before:transition-transform before:duration-1000",
      )}
      style={{
        boxShadow: `0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px -5px ${config.glow}`,
      }}
    >
      {/* Accent Border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 shadow-[0_0_10px_currentColor]"
        style={{ backgroundColor: config.color, color: config.color }}
      />

      <div className="p-4 pl-5 flex gap-4">
        {/* Icon / Emblem */}
        <div
          className={cn(
            "mt-1 p-2 rounded-lg bg-f1-black/50 border border-f1-graphite/50 text-white shadow-inner",
          )}
        >
          <Icon size={16} style={{ color: config.color }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider truncate">
              {notification.title}
            </h4>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => dispatch(togglePin(notification.id))}
                className={cn(
                  "p-1 rounded-md hover:bg-f1-graphite transition-colors",
                  notification.pinned ? "text-f1-red" : "text-f1-steel",
                )}
              >
                {notification.pinned ? <Pin size={10} /> : <PinOff size={10} />}
              </button>
              <button
                onClick={() => dispatch(dismissNotification(notification.id))}
                className="p-1 rounded-md hover:bg-f1-red/20 text-f1-steel hover:text-f1-red transition-colors"
              >
                <X size={10} />
              </button>
            </div>
          </div>

          <p className="text-[10px] text-f1-steel leading-relaxed line-clamp-2">
            {notification.message}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[8px] font-bold text-f1-steel/50 uppercase tracking-tighter">
              {new Date(notification.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>

            <motion.button
              whileHover={{ x: 3 }}
              className="group/btn flex items-center gap-1 text-[8px] font-black text-f1-red uppercase tracking-widest"
            >
              Analyze{" "}
              <ChevronRight
                size={10}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Ambient Glow Pulse */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 100% 0%, ${config.glow} 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  );
};

export function NotificationSystem() {
  const { queue } = useAppSelector((state) => state.notification);

  // Only show first 5 for visual quality
  const visibleNotifications = queue.slice(0, 5);

  return (
    <div className="fixed bottom-8 right-8 z-100 flex flex-col items-end pointer-events-none">
      <AnimatePresence mode="popLayout">
        {visibleNotifications.map((notification, index) => (
          <div key={notification.id} className="pointer-events-auto">
            <NotificationItem notification={notification} index={index} />
          </div>
        ))}
      </AnimatePresence>

      {queue.length > 5 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[8px] font-bold text-f1-steel uppercase tracking-widest mr-4 bg-f1-black/60 px-2 py-1 rounded-full border border-f1-graphite/50 backdrop-blur-sm"
        >
          +{queue.length - 5} More Telemetry Alerts
        </motion.div>
      )}
    </div>
  );
}
