import { motion } from "framer-motion";
import { Reveal } from "../components/ui/Reveal";
import { Shield, Lock, Database, Eye, UserCheck } from "lucide-react";
import { GlowingBorder } from "../components/ui/GlowingBorder";

export default function Privacy() {
  const lastUpdated = "February 1, 2026";

  const cards = [
    {
      icon: Database,
      title: "Data Collection",
      content:
        "We ingest technical session data and basic profile information to personalize your analytics experience. We do not track external browsing history or irrelevant personal metrics.",
    },
    {
      icon: Eye,
      title: "Usage Transparency",
      content:
        "Data is utilized to refine predictive models and improve UI performance. We monitor 'airflow' within the platform to ensure high-speed delivery of race statistics.",
    },
    {
      icon: Lock,
      title: "System Security",
      content:
        "All stored data is encrypted at rest and in transit. Our architecture is engineered to minimize attack vectors and ensure the integrity of our telemetry streams.",
    },
    {
      icon: UserCheck,
      title: "User Control",
      content:
        "You maintain total control over your profile. Data can be exported or purged via system settings at any time, respecting your right to digital privacy.",
    },
    {
      icon: Shield,
      title: "Zero Third-Party Sales",
      content:
        "F1Insight is a premium enthusiast platform. We never sell your analytical signatures or personal data to third-party marketing entities.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <Reveal width="100%">
        <h1 className="font-orbitron text-4xl font-black tracking-tighter text-f1-white mb-2">
          PRIVACY <span className="text-f1-red">POLICY</span>
        </h1>
        <p className="text-f1-steel text-sm font-medium mb-12">
          DATA PROTECTION STATUS:{" "}
          <span className="text-f1-white">ACTIVE / SECURE</span>
        </p>
      </Reveal>

      <div className="space-y-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <GlowingBorder className="rounded-xl overflow-hidden">
              <div className="bg-f1-graphite/20 p-8 flex gap-6 items-start">
                <div className="bg-f1-graphite/40 p-4 rounded-lg shrink-0">
                  <card.icon className="h-6 w-6 text-f1-red" />
                </div>
                <div>
                  <h2 className="font-orbitron text-lg font-bold text-f1-white mb-3">
                    {card.title}
                  </h2>
                  <p className="text-f1-steel leading-relaxed">
                    {card.content}
                  </p>
                </div>
              </div>
            </GlowingBorder>
          </motion.div>
        ))}
      </div>

      <Reveal width="100%" delay={0.6}>
        <div className="mt-16 text-center text-xs text-f1-steel leading-relaxed max-w-2xl mx-auto">
          <p>
            F1Insight operates in compliance with global data protection
            standards (GDPR/CCPA framework). Our goal is to provide a secure
            environment for high-speed Formula 1 analysis. Last Protocol Update:{" "}
            {lastUpdated}
          </p>
        </div>
      </Reveal>
    </div>
  );
}
