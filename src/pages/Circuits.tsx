import { useEffect } from "react"

import { PageHeader } from "../components/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { MapPin, Flag } from "lucide-react"
import { Link, useSearchParams } from "react-router-dom"
import { Skeleton } from "../components/ui/skeleton"
import { motion } from "framer-motion"
import { YearSelect } from "../components/YearSelect"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { fetchCircuits } from "../store/slices/circuitSlice"

export default function Circuits() {
  const [searchParams, setSearchParams] = useSearchParams()
  const year = searchParams.get("year") || "2026"
  
  const dispatch = useAppDispatch()
  const { circuits, status } = useAppSelector((state) => state.circuit)
  const loading = status === 'loading' && circuits.length === 0

  const handleYearChange = (newYear: string) => {
    setSearchParams({ year: newYear })
  }

  useEffect(() => {
    dispatch(fetchCircuits(year))
  }, [dispatch, year])

  return (
    <div className="container py-8">
      <PageHeader 
        title={`${year} Circuits`}
        description="The legendary tracks of the Formula 1 calendar."
      >
        <YearSelect year={year} onYearChange={handleYearChange} />
      </PageHeader>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {circuits.map((circuit, index) => (
            <Link key={circuit.circuitId} to={`/circuits/${circuit.circuitId}`}>
                <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                <Card className="h-full border-f1-graphite bg-f1-black hover:border-f1-red/50 transition-all hover:bg-f1-graphite/40 group overflow-hidden">
                    <div className="h-32 bg-f1-graphite/20 flex items-center justify-center relative group-hover:bg-f1-graphite/30 transition-colors">
                        <MapPin className="h-12 w-12 text-f1-steel/20 absolute" />
                        <span className="font-orbitron text-4xl font-bold text-f1-white/10">{circuit.circuitId.slice(0,3).toUpperCase()}</span>
                    </div>
                    <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg group-hover:text-f1-red transition-colors">
                        <Flag className="h-4 w-4 text-f1-red" />
                        {circuit.circuitName}
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="flex items-center gap-2 text-f1-steel text-sm">
                        <MapPin className="h-3 w-3" />
                        {circuit.Location.locality}, {circuit.Location.country}
                    </div>
                    </CardContent>
                </Card>
                </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
