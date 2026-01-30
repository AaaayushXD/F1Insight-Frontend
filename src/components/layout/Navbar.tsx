import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Flag, Menu, X } from "lucide-react"
import { useState } from "react"

import { motion } from "framer-motion"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "Schedule", href: "/schedules" },
    { name: "Drivers", href: "/drivers" },
    { name: "Constructors", href: "/constructors" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-f1-graphite bg-f1-black/95 backdrop-blur supports-[backdrop-filter]:bg-f1-black/60"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Flag className="h-6 w-6 text-f1-red" />
            <span className="font-orbitron text-xl font-bold tracking-wider text-f1-white">
              F1<span className="text-f1-red">INSIGHT</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-f1-steel transition-colors hover:text-f1-red uppercase tracking-wide"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="flex items-center justify-center p-2 text-f1-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-f1-graphite bg-f1-black p-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-f1-white hover:text-f1-red"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-f1-graphite">
               <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  )
}
