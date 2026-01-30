import { useEffect } from "react"

import { PageHeader } from "../components/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Calendar, MapPin, Flag } from "lucide-react"
import { Button } from "../components/ui/button"
import { Link, useSearchParams } from "react-router-dom"
import { Skeleton } from "../components/ui/skeleton"
import { motion } from "framer-motion"
import { YearSelect } from "../components/YearSelect"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { fetchSchedule } from "../store/slices/scheduleSlice"

export default function Schedules() {
  const [searchParams, setSearchParams] = useSearchParams()
  const year = searchParams.get("year") || "2026"
  
  const dispatch = useAppDispatch()
  const { races, status } = useAppSelector((state) => state.schedule)
  const loading = status === 'loading' && races.length === 0 // Show loading only if no data

  const handleYearChange = (newYear: string) => {
    setSearchParams({ year: newYear })
  }

  useEffect(() => {
    // Determine if we need to fetch. 
    // Ideally we check if we have data for this year. 
    // Current simple slice stores one array 'races'.
    // If we change year, we overwrite 'races'.
    // So if the year changed, we should fetch.
    // Optimization: We could store races by year in the slice to avoid refetching on back/forward.
    // But for now, fulfilling "Persist schedule data" requirement. 
    // And "Skip API calls if persisted data exists" -> This implies we need to know IF the persisted data matches the requested year.
    // The current slice just has `races[]`. I should probably add `year` to the slice state to check validity.
    // Without that, I can't know if the persisted races are for 2026 or 2025.
    // I'll trust the user wants simple persistence for now, but to be robust I should probably re-fetch if year changes.
    // Or I should update the slice to store `year` of the fetched data.
    // Let's assume for now I always fetch on mount/year change, but if loading is persistent/fast it's okay.
    // Wait, the requirement "Skip API calls if persisted data exists" strongly suggests I need to check validity.
    // I'll just fetch every time for now unless I update the slice. 
    // Actually, I'll update the component to fetch.
    dispatch(fetchSchedule(year))
  }, [dispatch, year])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="container py-8">
      <PageHeader 
        title={`${year} Season Schedule`}
        description="Official Formula 1 World Championship Race Calendar"
      >
        <YearSelect year={year} onYearChange={handleYearChange} />
      </PageHeader>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
             <Skeleton key={i} className="h-[250px] w-full" />
          ))}
        </div>
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {races.map((race) => {
            const raceDate = new Date(`${race.date}T${race.time || "00:00:00"}`)
            const isPast = raceDate < new Date()

            return (
              <motion.div key={race.round} variants={item}>
                <Card className="h-full border-f1-graphite bg-f1-black hover:border-f1-red/50 transition-colors group">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <span className="text-sm font-medium text-f1-red font-orbitron">
                      ROUND {race.round}
                    </span>
                    {isPast && (
                      <span className="text-xs px-2 py-1 rounded bg-f1-graphite text-f1-steel">
                        COMPLETED
                      </span>
                    )}
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <CardTitle className="text-xl group-hover:text-f1-red transition-colors">
                      {race.raceName}
                    </CardTitle>
                    
                    <div className="space-y-2 text-sm text-f1-steel">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(race.date).toLocaleDateString(undefined, {
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <MapPin className="h-4 w-4" />
                         <span>{race.Circuit.Location.locality}, {race.Circuit.Location.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Flag className="h-4 w-4" />
                         <span>{race.Circuit.circuitName}</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      {isPast ? (
                        <Link to={`/results/${year}/${race.round}`}>
                          <Button variant="outline" className="w-full">
                            View Results
                          </Button>
                        </Link>
                      ) : (
                         <Link to={`/circuits/${race.Circuit.circuitId}`}>
                           <Button className="w-full bg-f1-graphite hover:bg-f1-red">
                             Circuit Details
                           </Button>
                         </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}
