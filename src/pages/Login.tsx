import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthCard } from "../components/ui/auth/AuthCard";
import { AuthInput } from "../components/ui/auth/AuthInput";
import { AuthButton } from "../components/ui/auth/AuthButton";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth check
    setTimeout(() => setIsLoading(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] p-4 relative overflow-hidden">
      {/* Ambient background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-f1-red/5 blur-[120px] rounded-full pointer-events-none" />

      <AuthCard
        title="Garage Entry"
        subtitle="Authenticate telemetry access for F1Insight"
      >
        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleLogin}
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <AuthInput
              label="Personnel ID / Email"
              type="email"
              placeholder="e.g. driver@f1insight.com"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <AuthInput
              label="Access Code / Password"
              type="password"
              placeholder="••••••••"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants} className="pt-2">
            <AuthButton type="submit" isLoading={isLoading}>
              Enter the Grid
            </AuthButton>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center space-y-4">
            <p className="text-[10px] text-f1-steel uppercase tracking-widest">
              New to the team?{" "}
              <Link
                to="/signup"
                className="text-f1-red hover:underline decoration-f1-red/30 underline-offset-4"
              >
                Apply for Credentials
              </Link>
            </p>

            <div className="flex items-center gap-4 justify-center opacity-30">
              <div className="h-px w-8 bg-f1-steel" />
              <span className="text-[8px] font-orbitron text-f1-steel uppercase">
                Secure Handshake Protocol v4.2
              </span>
              <div className="h-px w-8 bg-f1-steel" />
            </div>
          </motion.div>
        </motion.form>
      </AuthCard>
    </div>
  );
}
