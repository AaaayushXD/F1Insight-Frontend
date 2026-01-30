import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import { PageHeader } from "../components/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Skeleton } from "../components/ui/skeleton"
import { Button } from "../components/ui/button"
import { MapPin, Flag, ArrowLeft } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { fetchCircuit } from "../store/slices/circuitSlice"

export default function CircuitDetails() {
  const { circuitId } = useParams<{ circuitId: string }>()
  const dispatch = useAppDispatch()
  const { selectedCircuit: circuit, status } = useAppSelector((state) => state.circuit)
  const loading = status === 'loading' && (!circuit || circuit.circuitId !== circuitId)

  useEffect(() => {
    if (circuitId) {
      // Fetch if no circuit or if the selected circuit is different
        if (!circuit || circuit.circuitId !== circuitId) {
            dispatch(fetchCircuit(circuitId))
        }
    }
  }, [dispatch, circuitId, circuit])

  if (loading) {
     return (
       <div className="container py-8">
         <Skeleton className="h-12 w-64 mb-4" />
         <Skeleton className="h-[400px] w-full rounded-xl" />
       </div>
     )
  }

  if (!circuit) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-bold text-f1-white">Circuit Not Found</h2>
        <Link to="/circuits">
          <Button variant="link" className="text-f1-red">Back to Circuits</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-8 space-y-8">
        <Link to="/circuits" className="inline-flex items-center text-f1-steel hover:text-f1-red transition-colors mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Circuits
        </Link>
      <PageHeader 
        title={circuit.circuitName} 
        description={`${circuit.Location.locality}, ${circuit.Location.country}`}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-f1-graphite bg-f1-black">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-f1-red" />
              Location Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between border-b border-f1-graphite pb-2">
              <span className="text-f1-steel">Locality</span>
              <span className="text-f1-white font-mono">{circuit.Location.locality}</span>
            </div>
            <div className="flex justify-between border-b border-f1-graphite pb-2">
              <span className="text-f1-steel">Country</span>
              <span className="text-f1-white font-mono">{circuit.Location.country}</span>
            </div>
            <div className="flex justify-between border-b border-f1-graphite pb-2">
                <span className="text-f1-steel">Coordinates</span>
                <span className="text-f1-white font-mono">{circuit.Location.lat}, {circuit.Location.long}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-f1-graphite bg-f1-black flex items-center justify-center p-8">
            <div className="text-center space-y-4">
                <Flag className="h-16 w-16 text-f1-red mx-auto opacity-50" />
                <p className="text-f1-steel">Map data placeholder</p>
            </div>
        </Card>
      </div>
      
      {/* Wikipedia Link if available */}
      <div className="flex justify-end">
          <a href={circuit.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-f1-red text-f1-red hover:bg-f1-red hover:text-white">
                  Read more on Wikipedia
              </Button>
          </a>
      </div>
    </div>
  )
}
