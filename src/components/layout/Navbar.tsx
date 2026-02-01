import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bell, User, Settings as SettingsIcon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowingButton } from "../ui/GlowingButton";
import { cn } from "../../lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  // Breadcrumb logic
  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadcrumbs = pathParts.map((part, i) => ({
    name: part.charAt(0).toUpperCase() + part.slice(1),
    href: "/" + pathParts.slice(0, i + 1).join("/"),
  }));

  const navLinks = isDashboard
    ? [
        { name: "Schedule", href: "/dashboard/schedules" },
        { name: "Drivers", href: "/dashboard/drivers" },
        { name: "Constructors", href: "/dashboard/constructors" },
      ]
    : [
        { name: "Schedule", href: "/schedule" },
        { name: "Drivers", href: "/drivers" },
        { name: "Constructors", href: "/constructors" },
      ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-f1-graphite bg-[#0B0D10]/90 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="group flex items-center gap-2 shrink-0">
            <img
              src="/landing/logos/logo.png"
              alt="F1Insight Logo"
              className="h-16 w-auto object-contain"
            />
          </Link>

          {isDashboard && (
            <div className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-f1-steel">
              <span className="opacity-50">/</span>
              {breadcrumbs.map((crumb, i) => (
                <div key={crumb.href} className="flex items-center gap-2">
                  <Link
                    to={crumb.href}
                    className={cn(
                      "hover:text-f1-white transition-colors",
                      i === breadcrumbs.length - 1 ? "text-f1-red" : "",
                    )}
                  >
                    {crumb.name}
                  </Link>
                  {i < breadcrumbs.length - 1 && (
                    <span className="opacity-50">/</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {!isDashboard ? (
            <>
              <div className="flex items-center gap-8 relative">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`relative text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                        isActive
                          ? "text-f1-white"
                          : "text-f1-steel hover:text-f1-white"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute -bottom-[22px] left-0 h-[2px] w-full bg-f1-red"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="ml-4 flex items-center gap-4 pl-8 border-l border-f1-graphite">
                <Link to="/login">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-f1-steel hover:text-white transition-colors">
                    Login
                  </span>
                </Link>
                <Link to="/signup">
                  <GlowingButton size="sm">Get Started</GlowingButton>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-f1-steel hover:text-f1-red transition-colors relative"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-f1-red rounded-full border-2 border-[#0B0D10]" />
              </motion.button>

              <Link to="/dashboard/settings">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-f1-steel hover:text-white transition-colors"
                >
                  <SettingsIcon size={20} />
                </motion.button>
              </Link>

              <div className="h-8 w-px bg-f1-graphite mx-2" />

              <Link to="/dashboard/profile">
                <div className="flex items-center gap-3 cursor-pointer group">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-full bg-f1-red flex items-center justify-center font-bold text-xs text-white shadow-[0_0_15px_rgba(225,6,0,0.3)] border border-f1-red/50">
                      <User size={16} />
                    </div>
                    <div className="hidden lg:flex flex-col text-right">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider group-hover:text-f1-red transition-colors">
                        Aayush Lamichhane
                      </span>
                      <span className="text-[8px] text-f1-steel font-bold uppercase tracking-tighter">
                        Telemetry Lead
                      </span>
                    </div>
                  </motion.div>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center p-2 text-f1-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-f1-graphite bg-[#0B0D10] overflow-hidden"
          >
            <div className="flex flex-col space-y-4 p-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className="text-sm font-bold uppercase tracking-widest text-f1-white hover:text-f1-red"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="flex flex-col gap-4 pt-6 border-t border-f1-graphite mt-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <span className="text-sm font-bold uppercase tracking-widest text-f1-steel">
                    Login
                  </span>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <GlowingButton className="w-full">Get Started</GlowingButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
