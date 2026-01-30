import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import f1Car from "../../assets/f1_car_hero.png"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden pt-16 md:pt-0">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-f1-black via-f1-black/50 to-f1-black z-0 pointer-events-none" />
      
      <div className="container relative z-10 flex flex-col items-center gap-8 md:flex-row md:justify-between">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center md:items-start md:text-left md:w-1/2"
        >
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-orbitron">
            <span className="text-f1-white">DATA-DRIVEN</span>
            <br />
            <span className="text-f1-red">PERFORMANCE</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-f1-steel sm:text-xl font-inter">
            Advanced telemetry analytics and real-time race predictions powered by machine learning.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" size="lg" className="text-lg px-8">
                Explore Data
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative mt-8 md:mt-0 md:w-1/2 flex justify-center"
        >
          <div className="absolute inset-0 bg-f1-red/20 blur-3xl rounded-full z-0 opacity-20 animate-pulse" />
          <img 
            src={f1Car} 
            alt="Futuristic F1 Car" 
            className="relative z-10 w-full max-w-[600px] object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-f1-steel"
      >
        <span className="text-sm font-light tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}
