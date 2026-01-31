import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCard } from "../components/ui/auth/AuthCard";
import { AuthButton } from "../components/ui/auth/AuthButton";

export default function OTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsVerifying(true);

    // Simulate telemetry handshake
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);

      // Navigate after success animation
      setTimeout(() => navigate("/"), 2000);
    }, 2500);
  };

  // Full OTP check
  useEffect(() => {
    if (otp.every((digit) => digit !== "") && !isVerifying && !isSuccess) {
      handleVerify();
    }
  }, [otp]);

  return (
    <div className="flex items-center justify-center min-h-[90vh] p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-f1-red/5 blur-[120px] rounded-full pointer-events-none" />

      <AuthCard
        title="Biometric Handshake"
        subtitle="Verify Personnel Access Token (OTP)"
      >
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              key="otp-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleVerify}
              className="space-y-10"
            >
              <div className="flex justify-between gap-2">
                {otp.map((digit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.5 }}
                    className="relative"
                  >
                    <input
                      ref={(el) => {
                        inputs.current[i] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      className={`
                        w-12 h-16 bg-f1-graphite/30 border-2 rounded-lg text-center text-xl font-orbitron text-f1-white focus:outline-none transition-all
                        ${digit ? "border-f1-red" : "border-f1-white/10 hover:border-f1-white/30"}
                        ${isVerifying ? "animate-pulse opacity-50" : ""}
                      `}
                    />
                    {digit && (
                      <motion.div
                        layoutId="active-dot"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-f1-red rounded-full"
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <AuthButton
                  type="submit"
                  isLoading={isVerifying}
                  disabled={otp.some((d) => !d)}
                >
                  {isVerifying ? "Verifying Telemetry..." : "Validate Token"}
                </AuthButton>

                <p className="text-[10px] text-f1-steel text-center uppercase tracking-widest leading-loose">
                  Packet not received? <br />
                  <button type="button" className="text-f1-red hover:underline">
                    Request Resend
                  </button>
                </p>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="otp-success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 space-y-6"
            >
              <motion.div
                className="w-20 h-20 border-4 border-f1-green rounded-full mx-auto flex items-center justify-center relative shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                animate={{
                  scale: [1, 1.05, 1],
                  borderColor: ["#00C853", "#FFFFFF", "#00C853"],
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-f1-green"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </motion.svg>
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-xl font-orbitron text-f1-white uppercase tracking-[0.2em]">
                  Access Granted
                </h2>
                <p className="text-xs text-f1-steel uppercase tracking-widest">
                  Redirecting to Paddock...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AuthCard>
    </div>
  );
}
