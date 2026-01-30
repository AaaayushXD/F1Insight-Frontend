import type { Driver } from "../services/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { motion } from "framer-motion"
import { User, Trophy } from "lucide-react"

interface DriverCardProps {
  driver: Driver
  index: number
}

export function DriverCard({ driver, index }: DriverCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full border-f1-graphite bg-f1-black hover:border-f1-red/50 transition-all hover:bg-f1-graphite/40 group overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 font-orbitron text-6xl font-bold text-f1-white select-none">
          {driver.permanentNumber}
        </div>
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-f1-red font-orbitron tracking-wider">
               {driver.nationality.toUpperCase()}
            </span>
             <User className="h-5 w-5 text-f1-steel" />
          </div>
          <CardTitle className="text-2xl pt-2 group-hover:text-f1-red transition-colors">
            {driver.givenName} <span className="text-f1-white font-bold">{driver.familyName.toUpperCase()}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 pt-0">
          <div className="flex items-center gap-2 text-f1-steel mt-2">
            <Trophy className="h-4 w-4 text-f1-amber" />
            <span className="text-sm">Driver #{driver.permanentNumber}</span>
          </div>
          <div className="mt-4 pt-4 border-t border-f1-graphite/50 flex justify-between items-center">
            <span className="text-xs text-f1-steel bg-f1-graphite/50 px-2 py-1 rounded">
               {driver.code}
            </span>
            <span className="text-xs text-f1-steel">
               DOB: {new Date(driver.dateOfBirth).getFullYear()}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
