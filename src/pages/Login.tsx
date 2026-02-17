import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthCard } from "../components/ui/auth/AuthCard";
import { AuthInput } from "../components/ui/auth/AuthInput";
import { AuthButton } from "../components/ui/auth/AuthButton";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, setPendingUserId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination or default to dashboard
  const from = (location.state as any)?.from || "/dashboard/overview";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login(email, password);

      if (!result.authenticated && result.requiresOTP) {
        // User needs OTP verification
        setPendingUserId(result.userId);
        navigate("/otp", { state: { userId: result.userId } });
        return;
      }

      navigate(from, { replace: true });
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        "Authentication failed. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
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
    <div className="flex items-center justify-center min-h-screen p-4">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <AuthInput
              label="Access Code / Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>

          {error && (
            <motion.div variants={itemVariants} className="text-f1-red text-sm text-center">
              {error}
            </motion.div>
          )}

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
