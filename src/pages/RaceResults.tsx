import { useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

import { PageHeader } from "../components/PageHeader"
import { Podium } from "../components/Podium"
import { Skeleton } from "../components/ui/skeleton"
import { Button } from "../components/ui/button"
import { ArrowLeft } from "lucide-react"
import { YearSelect } from "../components/YearSelect"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { fetchResults } from "../store/slices/resultSlice"

export default function RaceResults() {
  const { year = "2026", round } = useParams<{ year: string; round: string }>()
  const navigate = useNavigate()
  
  const dispatch = useAppDispatch()
  const { resultsByRound, status } = useAppSelector((state) => state.result)
  
  // Check if we have results for this year and round
  const race = resultsByRound[year]?.[round!]
  
  const loading = status === 'loading' && !race

  const handleYearChange = (newYear: string) => {
    navigate(`/results/${newYear}/${round}`)
  }

  useEffect(() => {
    if (!round) return
    
    // Only fetch if we don't have the data (cache check)
    if (!race) {
        dispatch(fetchResults({ year, round }))
    }
    // If we have race, we skip fetch! 
    // This satisfies "Skip API calls if persisted data exists"
    
  }, [dispatch, year, round, race])

  if (loading) {
     return (
        <div className="container py-8 space-y-8">
           <Skeleton className="h-12 w-1/3" />
           <div className="flex justify-center gap-4 h-64 items-end">
               <Skeleton className="h-48 w-32" />
               <Skeleton className="h-64 w-32" />
               <Skeleton className="h-40 w-32" />
           </div>
           <Skeleton className="h-[400px] w-full" />
        </div>
     )
  }

  if (!race || !race.Results) {
      return (
          <div className="container py-8 flex flex-col items-center justify-center min-h-[50vh]">
              <h2 className="text-2xl font-orbitron mb-4">Results Not Found</h2>
              <Link to="/schedules">
                  <Button variant="outline">Back to Schedule</Button>
              </Link>
          </div>
      )
  }

  return (
    <div className="container py-8">
      <Link to={`/schedules?year=${year}`} className="inline-flex items-center gap-2 text-f1-steel hover:text-f1-red mb-6 transition-colors">
         <ArrowLeft className="h-4 w-4" />
         Back to Schedule
      </Link>
      
      <PageHeader 
        title={race.raceName} 
        description={`Round ${race.round} • ${race.date} • ${race.Circuit.circuitName}`}
      >
        <YearSelect year={year} onYearChange={handleYearChange} />
      </PageHeader>

      <Podium results={race.Results} />

      <div className="mt-12 overflow-x-auto rounded-lg border border-f1-graphite">
         <table className="w-full text-left text-sm text-f1-steel">
            <thead className="bg-f1-graphite text-f1-white uppercase tracking-wider font-orbitron">
               <tr>
                  <th className="px-6 py-4">Pos</th>
                  <th className="px-6 py-4">Driver</th>
                  <th className="px-6 py-4">Constructor</th>
                  <th className="px-6 py-4">Laps</th>
                  <th className="px-6 py-4">Time/Status</th>
                  <th className="px-6 py-4">Points</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-f1-graphite bg-f1-black">
               {race.Results.map((result) => (
                  <tr key={result.position} className="hover:bg-f1-graphite/30 transition-colors">
                     <td className="px-6 py-4 font-bold text-f1-white">{result.positionText}</td>
                     <td className="px-6 py-4 font-medium text-f1-white flex items-center gap-3">
                        <span className="w-1 h-8 bg-f1-red/50 rounded-full"></span>
                        {result.Driver.givenName} {result.Driver.familyName}
                     </td>
                     <td className="px-6 py-4">{result.Constructor.name}</td>
                     <td className="px-6 py-4">{result.laps}</td>
                     <td className="px-6 py-4">
                        {result.Time ? result.Time.time : result.status}
                     </td>
                     <td className="px-6 py-4 font-bold text-f1-red">{result.points}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  )
}
