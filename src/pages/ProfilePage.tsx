import { motion } from "framer-motion";
import { User, Shield, Zap, Target, Save, Mail, Camera } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { GlowingButton } from "../components/ui/GlowingButton";

export default function ProfilePage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-orbitron font-black text-white tracking-widest uppercase">
          Profile <span className="text-f1-red">Console</span>
        </h1>
        <p className="text-[10px] text-f1-steel font-bold uppercase tracking-[0.2em]">
          User Identification & Performance Metrics
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="bg-f1-black/40 border-f1-graphite backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-f1-red shadow-[0_0_15px_rgba(225,6,0,0.5)]" />
          <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
            <div className="relative group/avatar">
              <div className="w-32 h-32 rounded-full bg-f1-red flex items-center justify-center text-5xl font-bold text-white shadow-[0_0_40px_rgba(225,6,0,0.4)] border-2 border-f1-red/50">
                A
              </div>
              <button className="absolute bottom-0 right-0 p-3 bg-f1-black rounded-full border border-f1-graphite text-f1-steel hover:text-f1-red transition-all shadow-xl group/btn overflow-hidden">
                <Camera size={16} />
                <motion.div className="absolute inset-0 bg-f1-red/10 scale-0 group-hover/btn:scale-100 transition-transform" />
              </button>
            </div>

            <div>
              <h2 className="text-2xl font-orbitron font-bold text-white">
                Aayush Lamichhane
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Zap size={14} className="text-f1-red" />
                <span className="text-[10px] font-bold text-f1-steel uppercase tracking-widest">
                  Telemetry Lead
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-4 pt-4 border-t border-f1-graphite/30">
              <div className="text-center">
                <p className="text-[8px] font-bold text-f1-steel uppercase tracking-widest mb-1">
                  Accuracy
                </p>
                <p className="text-xl font-orbitron font-bold text-f1-red">
                  84.2%
                </p>
              </div>
              <div className="text-center">
                <p className="text-[8px] font-bold text-f1-steel uppercase tracking-widest mb-1">
                  Rank
                </p>
                <p className="text-xl font-orbitron font-bold text-white">
                  #12
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Form */}
        <Card className="md:col-span-2 bg-f1-black/40 border-f1-graphite backdrop-blur-sm">
          <CardContent className="p-8 space-y-8">
            <div className="flex items-center justify-between border-b border-f1-graphite/30 pb-4">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-f1-red" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                  Identity Credentials
                </h3>
              </div>
              <span className="text-[10px] font-bold text-f1-steel uppercase font-mono">
                ID: 0x8A2C
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-f1-steel uppercase tracking-widest">
                  Full Name
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-f1-steel group-focus-within:text-f1-red transition-colors"
                    size={16}
                  />
                  <input
                    type="text"
                    defaultValue="Aayush Lamichhane"
                    className="w-full bg-f1-black/60 border border-f1-graphite rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-f1-red transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-f1-steel uppercase tracking-widest">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-f1-steel group-focus-within:text-f1-red transition-colors"
                    size={16}
                  />
                  <input
                    type="email"
                    defaultValue="aayush@f1insight.com"
                    className="w-full bg-f1-black/60 border border-f1-graphite rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-f1-red transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-f1-red">
                Telemetry Performance
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: "Stability", value: "98%", icon: Activity },
                  { label: "Input Precision", value: "94%", icon: Target },
                  { label: "Sync Latency", value: "12ms", icon: Zap },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl bg-f1-graphite/10 border border-f1-graphite/30 flex flex-col items-center gap-2"
                  >
                    <stat.icon size={16} className="text-f1-red" />
                    <span className="text-[8px] font-bold text-f1-steel uppercase">
                      {stat.label}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <GlowingButton className="gap-2 px-8">
                <Save size={16} />
                Synchronize Profile
              </GlowingButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Activity(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
