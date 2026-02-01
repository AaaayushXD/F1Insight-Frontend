import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AmbientBackground } from "./AmbientBackground";

/**
 * PublicLayout - For unauthenticated users
 * Minimal navbar, clean presentation, no persistent app elements
 */
export function PublicLayout() {
  const location = useLocation();

  return (
    <div className="relative flex min-h-screen flex-col font-inter text-f1-white selection:bg-f1-red selection:text-white">
      <AmbientBackground />
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
