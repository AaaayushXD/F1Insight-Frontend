import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { AmbientBackground } from "./AmbientBackground";
import { Navbar } from "./Navbar";

/**
 * AuthLayout - Minimal layout for login/signup/otp pages
 * Includes navbar for navigation back to public pages
 */
export function AuthLayout() {
  return (
    <div className="relative flex min-h-screen flex-col font-inter text-f1-white selection:bg-f1-red selection:text-white bg-[#0B0D10]">
      <AmbientBackground />
      <Navbar />
      
      <main className="flex-1 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
