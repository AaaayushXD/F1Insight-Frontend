import { PageHeader } from "../../components/PageHeader"
import { DriverCard } from "../../components/DriverCard"
import { Skeleton } from "../../components/ui/skeleton"
import { useSearchParams, Link } from "react-router-dom"
import { YearSelect } from "../../components/YearSelect"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { fetchDrivers } from "../../store/slices/driverSlice"
import { useEffect } from "react"
import { Button } from "../../components/ui/button"
import { LogIn } from "lucide-react"

/**
 * PublicDrivers - Read-only driver grid for unauthenticated users
 */
export default function PublicDrivers() {
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
    <div className="container py-8 space-y-6">
      <PageHeader 
        title={`${year} Drivers`}
        description="The elite pilots competing in Formula 1."
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
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
             <Skeleton key={i} className="h-[200px] w-full" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {drivers.map((driver, index) => (
            <DriverCard key={driver.driverId} driver={driver} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
