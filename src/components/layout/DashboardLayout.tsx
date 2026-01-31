import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { AmbientBackground } from "./AmbientBackground";
import { motion, AnimatePresence } from "framer-motion";

export function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#0B0D10] font-inter text-f1-white">
      {/* Background Layer */}
      <AmbientBackground />

      {/* Main Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="relative flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(225, 6, 0, 0.3);
        }
      `}</style>
    </div>
  );
}
