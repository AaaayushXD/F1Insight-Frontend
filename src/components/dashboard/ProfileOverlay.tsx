import { motion } from "framer-motion";
import { X, User, Shield, Zap, LogOut, TrendingUp, Target } from "lucide-react";

interface ProfileOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileOverlay({ isOpen, onClose }: ProfileOverlayProps) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-f1-black border-l border-f1-graphite z-60 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] p-8 flex flex-col"
    >
      <div className="flex items-center justify-between mb-12">
        <h2 className="font-orbitron font-bold text-xl text-white tracking-widest uppercase">
          Profile Console
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-f1-graphite/40 text-f1-steel hover:text-f1-red transition-all"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">
        {/* User Identity */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-f1-red flex items-center justify-center text-4xl font-bold text-white shadow-[0_0_30px_rgba(225,6,0,0.4)]">
              A
            </div>
            <div className="absolute -bottom-1 -right-1 p-2 bg-f1-black rounded-full border border-f1-graphite">
              <Zap size={14} className="text-f1-red" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Aayush Lamichhane</h3>
            <p className="text-[10px] font-bold text-f1-steel tracking-[0.3em] uppercase mt-1">
              Telemetry Lead
            </p>
          </div>
        </div>

        {/* Data Points */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-f1-graphite/20 border border-f1-graphite/30">
            <div className="flex items-center gap-2 mb-1">
              <Target size={12} className="text-f1-red" />
              <p className="text-[8px] text-f1-steel font-bold uppercase">
                Predictions Run
              </p>
            </div>
            <p className="text-xl font-orbitron font-bold text-white">482</p>
          </div>
          <div className="p-4 rounded-xl bg-f1-graphite/20 border border-f1-graphite/30">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={12} className="text-green-500" />
              <p className="text-[8px] text-f1-steel font-bold uppercase">
                Accuracy
              </p>
            </div>
            <p className="text-xl font-orbitron font-bold text-f1-red">84.2%</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4 pt-4 border-t border-f1-graphite/50">
          {[
            { label: "Edit Personal Info", icon: User },
            { label: "Security & Privacy", icon: Shield },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-f1-graphite/30 transition-all text-f1-steel hover:text-white group"
            >
              <item.icon
                size={18}
                className="group-hover:text-f1-red transition-colors"
              />
              <span className="text-xs font-bold uppercase tracking-wider">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <button className="w-full mt-auto flex items-center justify-center gap-3 p-4 rounded-xl bg-f1-red/10 border border-f1-red/20 text-f1-red font-orbitron font-bold uppercase tracking-widest hover:bg-f1-red hover:text-white transition-all">
        <LogOut size={18} /> Disconnect Session
      </button>
    </motion.div>
  );
}
