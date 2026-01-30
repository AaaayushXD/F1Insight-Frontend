import { useEffect } from "react"

import { PageHeader } from "../components/PageHeader"
import { ConstructorCard } from "../components/ConstructorCard"
import { Skeleton } from "../components/ui/skeleton"
import { useSearchParams } from "react-router-dom"
import { YearSelect } from "../components/YearSelect"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { fetchConstructors } from "../store/slices/constructorSlice"

export default function Constructors() {
  const [searchParams, setSearchParams] = useSearchParams()
  const year = searchParams.get("year") || "2026"
  
  const dispatch = useAppDispatch()
  const { constructors, status } = useAppSelector((state) => state.constructors)
  const loading = status === 'loading' && constructors.length === 0

  const handleYearChange = (newYear: string) => {
    setSearchParams({ year: newYear })
  }

  useEffect(() => {
    dispatch(fetchConstructors(year))
  }, [dispatch, year])

  return (
    <div className="container py-8">
      <PageHeader 
        title={`${year} Constructors`}
        description="The engineering powerhouses competing for the Constructor's Championship."
      >
        <YearSelect year={year} onYearChange={handleYearChange} />
      </PageHeader>

      {loading ? (
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
             <Skeleton key={i} className="h-[200px] w-full" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {constructors.map((constructor, index) => (
            <ConstructorCard key={constructor.constructorId} constructor={constructor} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
