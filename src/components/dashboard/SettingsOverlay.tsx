import { motion } from "framer-motion";
import { X, Bell, Shield, Palette } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

interface SettingsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const tabs = [
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Alerts", icon: Bell },
  { id: "security", label: "Access Control", icon: Shield },
];

export function SettingsOverlay({ isOpen, onClose }: SettingsOverlayProps) {
  const [activeTab, setActiveTab] = useState("appearance");

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-f1-black border-l border-f1-graphite z-60 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] p-0 flex flex-col"
    >
      <div className="p-8 border-b border-f1-graphite flex items-center justify-between">
        <div>
          <h2 className="font-orbitron font-bold text-xl text-white tracking-widest uppercase mb-1">
            System Settings
          </h2>
          <p className="text-[10px] text-f1-steel font-bold uppercase tracking-widest opacity-60">
            Configuration Port 0x7F41
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-f1-graphite/40 text-f1-steel hover:text-f1-red transition-all"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex h-full">
        {/* Sub-navigation */}
        <div className="w-16 md:w-24 border-r border-f1-graphite flex flex-col py-8 items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "p-3 rounded-xl transition-all relative group",
                activeTab === tab.id
                  ? "bg-f1-red text-white"
                  : "text-f1-steel hover:text-white",
              )}
            >
              <tab.icon size={20} />
              <div className="absolute left-full ml-4 px-2 py-1 bg-f1-red text-[8px] font-bold text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none uppercase tracking-widest">
                {tab.label}
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          {activeTab === "appearance" && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red">
                  Visual Interface
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      label: "Reduced Motion",
                      desc: "Optimize for low-latency visual data",
                    },
                    {
                      label: "Ambient Particles",
                      desc: "Enable secondary airflow simulation",
                    },
                    {
                      label: "Glowing Borders",
                      desc: "Highlight active console sectors",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-4 rounded-xl bg-f1-graphite/10 border border-f1-graphite/30"
                    >
                      <div>
                        <p className="text-sm font-bold text-white">
                          {item.label}
                        </p>
                        <p className="text-[10px] text-f1-steel">{item.desc}</p>
                      </div>
                      <div className="w-10 h-5 bg-f1-red rounded-full flex items-center justify-end px-1 shadow-[0_0_10px_rgba(225,6,0,0.3)]">
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-red">
                  Accent Color
                </h4>
                <div className="flex gap-4">
                  {["#E10600", "#0600EF", "#FFD700", "#00D2BE"].map((c) => (
                    <button
                      key={c}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110",
                        c === "#E10600" ? "border-white" : "border-transparent",
                      )}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 border-t border-f1-graphite bg-f1-black/50 backdrop-blur-sm">
        <button className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-f1-white text-f1-black font-orbitron font-bold uppercase tracking-widest hover:bg-f1-red hover:text-white transition-all">
          Apply Global Config
        </button>
      </div>
    </motion.div>
  );
}
