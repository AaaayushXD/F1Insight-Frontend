import Hero from "../components/Hero"
import { Navbar } from "../components/layout/Navbar"
import { Footer } from "../components/layout/Footer"
import { motion } from "framer-motion"

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0D10] font-inter text-white selection:bg-[#E10600] selection:text-white">
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="flex-1"
      >
        <Hero />
        {/* Additional sections can be added here later */}
      </motion.main>
      <Footer />
    </div>
  )
}
