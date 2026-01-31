import { motion } from "framer-motion";
import {
  Bell,
  Shield,
  Palette,
  Monitor,
  Eye,
  Lock,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { cn } from "../lib/utils";
import { GlowingButton } from "../components/ui/GlowingButton";

const tabs = [
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    desc: "Interface styling & themes",
  },
  {
    id: "notifications",
    label: "Alerts",
    icon: Bell,
    desc: "Telemetry update triggers",
  },
  {
    id: "security",
    label: "Security",
    icon: Lock,
    desc: "Encryption & access logs",
  },
  {
    id: "system",
    label: "System",
    icon: Monitor,
    desc: "Performance & diagnostics",
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("appearance");

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-orbitron font-black text-white tracking-widest uppercase">
          System <span className="text-f1-red">Config</span>
        </h1>
        <p className="text-[10px] text-f1-steel font-bold uppercase tracking-[0.2em]">
          Console Orchestration & Platform Parameters
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl transition-all border group relative overflow-hidden",
                activeTab === tab.id
                  ? "bg-f1-red/10 border-f1-red text-white"
                  : "bg-f1-black/40 border-f1-graphite text-f1-steel hover:text-white hover:border-f1-graphite/60",
              )}
            >
              <tab.icon
                size={18}
                className={cn(
                  "transition-colors",
                  activeTab === tab.id
                    ? "text-f1-red"
                    : "text-f1-steel group-hover:text-f1-red",
                )}
              />
              <div className="flex flex-col items-start transition-transform group-hover:translate-x-1">
                <span className="text-xs font-bold uppercase tracking-wider">
                  {tab.label}
                </span>
                <span className="text-[8px] font-bold uppercase opacity-50">
                  {tab.id === activeTab ? "Active Session" : tab.desc}
                </span>
              </div>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab-glow"
                  className="absolute inset-0 bg-f1-red/5 blur-xl pointer-events-none"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <Card className="flex-1 bg-f1-black/40 border-f1-graphite backdrop-blur-sm min-h-[500px]">
          <CardContent className="p-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {activeTab === "appearance" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-f1-graphite/30 pb-4">
                    <Palette className="text-f1-red" size={20} />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                      Visual Interface Config
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        label: "Ambient Particle Speed",
                        desc: "Adjust simulation velocity for speed lines",
                        val: "High",
                      },
                      {
                        label: "Glow Intensity",
                        desc: "Strength of neon border radiation",
                        val: "80%",
                      },
                      {
                        label: "Console Font Scaling",
                        desc: "Adjust Orbitron UI elements",
                        val: "Optimal",
                      },
                    ].map((cfg) => (
                      <div
                        key={cfg.label}
                        className="flex items-center justify-between p-4 rounded-xl bg-f1-graphite/10 border border-f1-graphite/30 group hover:border-f1-red/30 transition-all"
                      >
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-f1-red transition-colors">
                            {cfg.label}
                          </p>
                          <p className="text-[10px] text-f1-steel">
                            {cfg.desc}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-bold text-f1-red uppercase font-mono">
                            {cfg.val}
                          </span>
                          <div className="w-12 h-6 bg-f1-graphite/30 rounded-full flex items-center px-1">
                            <div className="w-4 h-4 bg-f1-red rounded-full" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-f1-steel">
                      Primary Accent Color
                    </h4>
                    <div className="flex gap-4">
                      {[
                        "#E10600",
                        "#00D2BE",
                        "#FFD700",
                        "#0600EF",
                        "#FFFFFF",
                      ].map((color) => (
                        <button
                          key={color}
                          className={cn(
                            "w-10 h-10 rounded-full border-2 transition-all hover:scale-110",
                            color === "#E10600"
                              ? "border-white ring-2 ring-f1-red ring-offset-2 ring-offset-f1-black"
                              : "border-transparent",
                          )}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-f1-graphite/30 pb-4">
                    <Shield className="text-f1-red" size={20} />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                      Access Control & Encryption
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-f1-black border-f1-graphite/50 p-6 flex flex-col items-center text-center space-y-4">
                      <Smartphone size={32} className="text-f1-steel" />
                      <h4 className="text-[10px] font-bold uppercase text-white">
                        Two-Factor Auth
                      </h4>
                      <p className="text-[10px] text-f1-steel">
                        Multi-layer encryption via biometric or OTP channels.
                      </p>
                      <GlowingButton size="sm" className="w-full">
                        Enable MFA
                      </GlowingButton>
                    </Card>
                    <Card className="bg-f1-black border-f1-graphite/50 p-6 flex flex-col items-center text-center space-y-4">
                      <Eye size={32} className="text-f1-steel" />
                      <h4 className="text-[10px] font-bold uppercase text-white">
                        Login History
                      </h4>
                      <p className="text-[10px] text-f1-steel">
                        Review previous telemetry access sessions.
                      </p>
                      <GlowingButton
                        size="sm"
                        variant="ghost"
                        className="w-full"
                      >
                        View Logs
                      </GlowingButton>
                    </Card>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-8 border-t border-f1-graphite/30">
                <GlowingButton className="gap-2 px-10">
                  <CheckCircle2 size={16} />
                  Deploy Configuration
                </GlowingButton>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
