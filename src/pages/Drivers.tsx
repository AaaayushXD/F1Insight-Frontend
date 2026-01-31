import { useEffect } from "react"

import { PageHeader } from "../components/PageHeader"
import { DriverCard } from "../components/DriverCard"
import { Skeleton } from "../components/ui/skeleton"
import { useSearchParams } from "react-router-dom"
import { YearSelect } from "../components/YearSelect"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { fetchDrivers } from "../store/slices/driverSlice"

export default function Drivers() {
  const [searchParams, setSearchParams] = useSearchParams()
  const year = searchParams.get("year") || "2026"
  
  const dispatch = useAppDispatch()
  const { drivers, status } = useAppSelector((state) => state.driver)
  const loading = status === 'loading' && drivers.length === 0

  const handleYearChange = (newYear: string) => {
    setSearchParams({ year: newYear })
  }

  useEffect(() => {
    dispatch(fetchDrivers(year))
  }, [dispatch, year])

  return (
    <div className="container py-8">
        <PageHeader 
          title={`${year} Drivers`}
          description="The grid of world-class drivers competing for the championship."
        >
          <YearSelect year={year} onYearChange={handleYearChange} />
        </PageHeader>

      {loading ? (
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
             <Skeleton key={i} className="h-[200px] w-full" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {drivers.map((driver, index) => (
              <DriverCard driver={driver} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
