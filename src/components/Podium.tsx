import type { RaceResult } from "../services/types"
import { motion } from "framer-motion"
import { Trophy } from "lucide-react"

interface PodiumProps {
  results: RaceResult[]
}

export function Podium({ results }: PodiumProps) {
  const winner = results[0]
  const second = results[1]
  const third = results[2]

  const podiumOrder = [second, winner, third]

  if (!winner || !second || !third) return null

  return (
    <div className="flex items-end justify-center gap-4 py-12 min-h-[400px]">
      {podiumOrder.map((result, index) => {
        const place = result.position
        const isWinner = place === "1"
        const height = isWinner ? "h-64" : place === "2" ? "h-48" : "h-40"
        const color = isWinner ? "bg-f1-red" : "bg-f1-graphite"
        
        return (
          <motion.div
            key={result.number}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="flex flex-col items-center"
          >
             <div className="mb-4 text-center">
                <div className="font-orbitron font-bold text-f1-white text-lg md:text-xl">
                   {result.Driver.givenName} {result.Driver.familyName}
                </div>
                <div className="text-sm text-f1-steel">
                   {result.Constructor.name}
                </div>
                {isWinner && (
                    <Trophy className="h-8 w-8 text-f1-amber mx-auto mt-2" />
                )}
             </div>
             
             <div className={`${height} w-24 md:w-32 ${color} rounded-t-lg flex items-start justify-center pt-4 relative shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
                <span className="font-orbitron font-bold text-4xl text-f1-white/80">
                   {place}
                </span>
             </div>
          </motion.div>
        )
      })}
    </div>
  )
}
