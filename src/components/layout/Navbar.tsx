import { Link, useLocation } from "react-router-dom"
import { Flag, Menu, X } from "lucide-react"
import { useState } from "react"

import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: "Schedule", href: "/schedules" },
    { name: "Drivers", href: "/drivers" },
    { name: "Constructors", href: "/constructors" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-f1-graphite bg-[#0B0D10]/90 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="group flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Flag className="h-6 w-6 text-f1-red" />
            </motion.div>
            <span className="font-orbitron text-xl font-bold tracking-wider text-f1-white">
              F1<span className="text-f1-red">INSIGHT</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8 relative">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                    isActive ? "text-f1-white" : "text-f1-steel hover:text-f1-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-[22px] left-0 h-[2px] w-full bg-f1-red"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
          
          <div className="ml-4 flex items-center gap-4 pl-8 border-l border-f1-graphite">
            <Link to="/login">
              <span className="text-xs font-semibold uppercase tracking-widest text-f1-steel hover:text-white transition-colors">
                Login
              </span>
            </Link>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-f1-red px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_15px_rgba(225,6,0,0.3)] transition-all hover:shadow-[0_0_25px_rgba(225,6,0,0.5)]"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
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
                  <button className="w-full bg-f1-red py-3 text-xs font-bold uppercase tracking-widest text-white">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
