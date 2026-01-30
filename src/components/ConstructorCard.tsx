import type { Constructor } from "../services/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { motion } from "framer-motion"
import { Users, Flag } from "lucide-react"

interface ConstructorCardProps {
  constructor: Constructor
  index: number
}

export function ConstructorCard({ constructor, index }: ConstructorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full border-f1-graphite bg-f1-black hover:border-f1-red/50 transition-all hover:bg-f1-graphite/40 group">
        <CardHeader>
           <div className="flex items-center justify-between mb-4">
             <Flag className="h-5 w-5 text-f1-red" />
             <span className="text-sm font-medium text-f1-steel font-orbitron tracking-wider">
               {constructor.nationality.toUpperCase()}
            </span>
           </div>
          <CardTitle className="text-2xl group-hover:text-f1-red transition-colors flex items-center gap-2">
            {constructor.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-f1-steel">
            <Users className="h-4 w-4" />
            <span className="text-sm">Team Data</span>
          </div>
          <div className="mt-4 pt-4 border-t border-f1-graphite/50">
             <a 
               href={constructor.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-sm text-f1-blue hover:text-f1-white underline-offset-4 hover:underline"
             >
               View Wiki Profile
             </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
