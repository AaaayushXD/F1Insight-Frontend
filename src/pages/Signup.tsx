import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthCard } from "../components/ui/auth/AuthCard";
import { AuthInput } from "../components/ui/auth/AuthInput";
import { AuthButton } from "../components/ui/auth/AuthButton";
import { StrengthMeter } from "../components/ui/auth/StrengthMeter";
import { useAuth } from "../contexts/AuthContext";

type SignupStep = "identity" | "security" | "confirmation";

export default function Signup() {
  const [step, setStep] = useState<SignupStep>("identity");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    let s = 0;
    if (val.length > 5) s++;
    if (val.length > 8) s++;
    if (/[A-Z]/.test(val)) s++;
    if (/[0-9!@#$%^&*]/.test(val)) s++;
    setStrength(s);
  };

  const nextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (step === "identity") {
      setStep("security");
    } else if (step === "security") {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      // Call real signup API
      setIsLoading(true);
      try {
        const { userId } = await signup(email, password, name);
        setStep("confirmation");
        // Store userId for OTP page navigation
        sessionStorage.setItem("f1insight_pending_userId", userId);
      } catch (err: any) {
        const msg =
          err.response?.data?.message || "Signup failed. Please try again.";
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Confirmation step → go to OTP
      const userId = sessionStorage.getItem("f1insight_pending_userId");
      navigate("/otp", { state: { userId } });
    }
  };

  const variants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <AuthCard
        title="Personnel Onboarding"
        subtitle={
          step === "identity"
            ? "Step 1: Identify your credentials"
            : step === "security"
              ? "Step 2: Establish security protocols"
              : "Step 3: Awaiting biometric handshake"
        }
      >
        <form onSubmit={nextStep}>
          <div className="relative overflow-hidden min-h-[280px]">
            <AnimatePresence mode="wait">
              {step === "identity" && (
                <motion.div
                  key="identity"
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <AuthInput
                    label="Personnel ID / Email"
                    type="email"
                    placeholder="e.g. driver@f1insight.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <AuthInput
                    label="Callsign / Username"
                    placeholder="e.g. Lewis44"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <div className="pt-4">
                    <AuthButton type="submit">Proceed to Security</AuthButton>
                  </div>
                </motion.div>
              )}

              {step === "security" && (
                <motion.div
                  key="security"
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <AuthInput
                    label="Access Code / Password"
                    type="password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder="••••••••"
                    required
                  />

                  <StrengthMeter strength={strength} />

                  <AuthInput
                    label="Verify Access Code"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />

                  {error && (
                    <p className="text-f1-red text-sm text-center">{error}</p>
                  )}

                  <div className="pt-4 flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-f1-white/10 hover:bg-f1-white/5"
                      onClick={() => setStep("identity")}
                    >
                      Back
                    </Button>
                    <AuthButton type="submit" className="flex-2" isLoading={isLoading}>
                      Initialize Secure Link
                    </AuthButton>
                  </div>
                </motion.div>
              )}

              {step === "confirmation" && (
                <motion.div
                  key="confirmation"
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-center space-y-8"
                >
                  <div className="py-4">
                    <motion.div
                      className="w-16 h-16 border-2 border-f1-red rounded-full mx-auto flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-8 h-px bg-f1-red" />
                    </motion.div>
                    <p className="mt-4 text-xs font-orbitron text-f1-red uppercase tracking-widest animate-pulse">
                      Awaiting OTP Handshake...
                    </p>
                  </div>

                  <p className="text-sm text-f1-steel leading-relaxed">
                    A secure verification packet has been dispatched to <br />
                    <span className="text-f1-white font-mono">{email}</span>
                  </p>

                  <div className="pt-4">
                    <AuthButton type="submit">
                      Enter Handshake Code
                    </AuthButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-f1-steel uppercase tracking-widest">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-f1-red hover:underline decoration-f1-red/30 underline-offset-4"
            >
              Access Garage
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
}

// Minimal Button for the "Back" action
function Button({ className, ...props }: any) {
  return (
    <button
      {...props}
      className={`px-4 py-3 text-[10px] font-orbitron uppercase tracking-widest rounded-md transition-colors ${className}`}
    />
  );
}
