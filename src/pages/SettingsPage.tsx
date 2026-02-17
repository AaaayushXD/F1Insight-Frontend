import { useState, useEffect } from "react";
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
import { Card, CardContent } from "../components/ui/card";
import { cn } from "../lib/utils";
import { GlowingButton } from "../components/ui/GlowingButton";
import {
  getProfile,
  updatePreferences,
  changePassword,
  type UserPreferences,
} from "../services/user.service";

const tabs = [
  { id: "appearance", label: "Appearance", icon: Palette, desc: "Interface styling & themes" },
  { id: "notifications", label: "Alerts", icon: Bell, desc: "Telemetry update triggers" },
  { id: "security", label: "Security", icon: Lock, desc: "Encryption & access logs" },
  { id: "system", label: "System", icon: Monitor, desc: "Performance & diagnostics" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("appearance");
  const [prefs, setPrefs] = useState<UserPreferences | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    getProfile()
      .then((p) => setPrefs(p.preferences))
      .catch(() => {});
  }, []);

  const togglePref = (key: keyof UserPreferences) => {
    if (!prefs) return;
    setPrefs({ ...prefs, [key]: !prefs[key] });
  };

  const handleSavePrefs = async () => {
    if (!prefs) return;
    setSaving(true);
    setMessage("");
    try {
      const updated = await updatePreferences(prefs);
      setPrefs(updated);
      setMessage("Preferences saved.");
    } catch {
      setMessage("Failed to save preferences.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) return;
    setSaving(true);
    setMessage("");
    try {
      await changePassword(currentPassword, newPassword);
      setMessage("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Failed to change password.");
    } finally {
      setSaving(false);
    }
  };

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
                  : "bg-f1-black/40 border-f1-graphite text-f1-steel hover:text-white hover:border-f1-graphite/60"
              )}
            >
              <tab.icon
                size={18}
                className={cn(
                  "transition-colors",
                  activeTab === tab.id ? "text-f1-red" : "text-f1-steel group-hover:text-f1-red"
                )}
              />
              <div className="flex flex-col items-start transition-transform group-hover:translate-x-1">
                <span className="text-xs font-bold uppercase tracking-wider">{tab.label}</span>
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
                    <SettingToggle
                      label="Theme"
                      desc="Current UI theme"
                      value={prefs?.theme || "dark"}
                    />
                  </div>

                  <div className="space-y-4 pt-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-f1-steel">
                      Primary Accent Color
                    </h4>
                    <div className="flex gap-4">
                      {["#E10600", "#00D2BE", "#FFD700", "#0600EF", "#FFFFFF"].map((color) => (
                        <button
                          key={color}
                          className={cn(
                            "w-10 h-10 rounded-full border-2 transition-all hover:scale-110",
                            color === "#E10600"
                              ? "border-white ring-2 ring-f1-red ring-offset-2 ring-offset-f1-black"
                              : "border-transparent"
                          )}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && prefs && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-f1-graphite/30 pb-4">
                    <Bell className="text-f1-red" size={20} />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                      Alert Configuration
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: "raceAlerts" as const, label: "Race Alerts", desc: "Get notified when race results are available" },
                      { key: "qualifyingAlerts" as const, label: "Qualifying Alerts", desc: "Get notified for qualifying sessions" },
                      { key: "predictionAlerts" as const, label: "Prediction Alerts", desc: "Notifications for prediction completions" },
                      { key: "driverNewsAlerts" as const, label: "Driver News", desc: "Breaking driver news and updates" },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 rounded-xl bg-f1-graphite/10 border border-f1-graphite/30 group hover:border-f1-red/30 transition-all"
                      >
                        <div>
                          <p className="text-sm font-bold text-white">{item.label}</p>
                          <p className="text-[10px] text-f1-steel">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => togglePref(item.key)}
                          className={cn(
                            "w-12 h-6 rounded-full flex items-center px-1 transition-colors",
                            prefs[item.key] ? "bg-f1-red" : "bg-f1-graphite/30"
                          )}
                        >
                          <div
                            className={cn(
                              "w-4 h-4 bg-white rounded-full transition-transform",
                              prefs[item.key] ? "translate-x-6" : "translate-x-0"
                            )}
                          />
                        </button>
                      </div>
                    ))}
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
                      <h4 className="text-[10px] font-bold uppercase text-white">Two-Factor Auth</h4>
                      <p className="text-[10px] text-f1-steel">
                        {prefs?.twoFactorEnabled ? "Currently enabled" : "Multi-layer encryption via OTP"}
                      </p>
                      <GlowingButton
                        size="sm"
                        className="w-full"
                        onClick={() => prefs && togglePref("twoFactorEnabled")}
                      >
                        {prefs?.twoFactorEnabled ? "Disable MFA" : "Enable MFA"}
                      </GlowingButton>
                    </Card>
                    <Card className="bg-f1-black border-f1-graphite/50 p-6 space-y-4">
                      <div className="flex flex-col items-center text-center space-y-2">
                        <Eye size={32} className="text-f1-steel" />
                        <h4 className="text-[10px] font-bold uppercase text-white">Change Password</h4>
                      </div>
                      <input
                        type="password"
                        placeholder="Current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full bg-f1-black/60 border border-f1-graphite rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-f1-red"
                      />
                      <input
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-f1-black/60 border border-f1-graphite rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-f1-red"
                      />
                      <GlowingButton
                        size="sm"
                        variant="ghost"
                        className="w-full"
                        onClick={handleChangePassword}
                      >
                        Update Password
                      </GlowingButton>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "system" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-f1-graphite/30 pb-4">
                    <Monitor className="text-f1-red" size={20} />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                      System Diagnostics
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <SettingToggle label="Session Timeout" desc={`Auto-logout after ${prefs?.sessionTimeout || 30} minutes of inactivity`} value={`${prefs?.sessionTimeout || 30}m`} />
                    <SettingToggle label="API Backend" desc="Express.js backend with JWT auth" value="Connected" />
                    <SettingToggle label="ML Service" desc="FastAPI prediction engine with ensemble model" value="Port 8000" />
                  </div>
                </div>
              )}

              {message && (
                <p className={`text-sm text-center ${message.includes("Failed") || message.includes("failed") ? "text-f1-red" : "text-green-500"}`}>
                  {message}
                </p>
              )}

              <div className="flex justify-end pt-8 border-t border-f1-graphite/30">
                <GlowingButton className="gap-2 px-10" onClick={handleSavePrefs} disabled={saving}>
                  <CheckCircle2 size={16} />
                  {saving ? "Deploying..." : "Deploy Configuration"}
                </GlowingButton>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SettingToggle({ label, desc, value }: { label: string; desc: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-f1-graphite/10 border border-f1-graphite/30 group hover:border-f1-red/30 transition-all">
      <div>
        <p className="text-sm font-bold text-white group-hover:text-f1-red transition-colors">{label}</p>
        <p className="text-[10px] text-f1-steel">{desc}</p>
      </div>
      <span className="text-[10px] font-bold text-f1-red uppercase font-mono">{value}</span>
    </div>
  );
}
