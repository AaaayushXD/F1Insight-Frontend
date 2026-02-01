import { PageHeader } from "../../components/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Calendar, MapPin, Flag } from "lucide-react"
import { Link, useSearchParams } from "react-router-dom"
import { Skeleton } from "../../components/ui/skeleton"
import { motion } from "framer-motion"
import { YearSelect } from "../../components/YearSelect"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { fetchSchedule } from "../../store/slices/scheduleSlice"
import { useEffect } from "react"
import { Button } from "../../components/ui/button"
import { LogIn } from "lucide-react"

/**
 * PublicSchedule - Read-only race calendar for unauthenticated users
 */
export default function PublicSchedule() {
  const [searchParams, setSearchParams] = useSearchParams()
  const year = searchParams.get("year") || "2026"
  
  const dispatch = useAppDispatch()
  const { races, status } = useAppSelector((state) => state.schedule)
  const loading = status === 'loading' && races.length === 0

  const handleYearChange = (newYear: string) => {
    setSearchParams({ year: newYear })
  }

  useEffect(() => {
    dispatch(fetchSchedule(year))
  }, [dispatch, year])

  return (
    <div className="container py-8 space-y-6">
      <PageHeader 
        title={`${year} Race Calendar`}
        description="The complete Formula 1 season schedule."
      >
        <div className="flex items-center gap-4">
          <YearSelect year={year} onYearChange={handleYearChange} />
          <Link to="/login">
            <Button variant="outline" className="border-f1-red text-f1-red hover:bg-f1-red hover:text-white">
              <LogIn className="mr-2 h-4 w-4" />
              Login for More
            </Button>
          </Link>
        </div>
      </PageHeader>

      {loading ? (
        <div className="grid gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[150px] w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6">
          {races.map((race, index) => (
            <motion.div
              key={race.round}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="border-f1-graphite bg-f1-black hover:border-f1-red/50 transition-all group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2 text-xl group-hover:text-f1-red transition-colors">
                        <Flag className="h-5 w-5 text-f1-red" />
                        {race.raceName}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-f1-steel text-sm">
                        <MapPin className="h-3 w-3" />
                        {race.Circuit.Location.locality}, {race.Circuit.Location.country}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-orbitron text-2xl font-bold text-f1-red">
                        R{race.round}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-f1-steel text-sm">
                    <Calendar className="h-4 w-4" />
                    {new Date(race.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
