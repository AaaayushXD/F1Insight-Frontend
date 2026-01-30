import { motion, AnimatePresence } from "framer-motion"
import { Flag } from "lucide-react"
import { useLocation } from "react-router-dom"
import type { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative min-h-screen"
      >
        {/* Transition Overlay Layer */}
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-f1-black pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 0.7,
            times: [0, 0.2, 0.8, 1],
            ease: "easeInOut"
          }}
        >
          {/* Stylized F1 Logo Animation */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ scale: 0.5, rotate: 0 }}
            animate={{ 
              scale: [0.5, 1.2, 1.2, 0.8],
              rotate: [0, 360],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 0.7,
              times: [0, 0.4, 0.8, 1],
              ease: "easeInOut"
            }}
          >
            <Flag className="h-12 w-12 text-f1-red shadow-[0_0_20px_rgba(225,6,0,0.5)]" />
            <span className="font-orbitron text-3xl font-bold tracking-[0.2em] text-white">
              F1<span className="text-f1-red">INSIGHT</span>
            </span>
          </motion.div>
          
          {/* Subtle speed lines background during transition */}
          <motion.div 
            className="absolute inset-0 z-[-1] opacity-10"
            initial={{ backgroundPosition: "0% 0%" }}
            animate={{ backgroundPosition: "100% 100%" }}
            transition={{ duration: 0.7, ease: "linear" }}
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(225, 6, 0, 0.1) 100px, rgba(225, 6, 0, 0.1) 110px)`,
              backgroundSize: "200% 200%"
            }}
          />
        </motion.div>

        {/* Content Layer */}
        <motion.div
          variants={{
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 }
          }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
