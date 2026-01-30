import { ChevronDown } from "lucide-react"
import { cn } from "../lib/utils"

interface YearSelectProps {
  year: string
  onYearChange: (year: string) => void
  startYear?: number
}

export function YearSelect({ year, onYearChange, startYear = 1950 }: YearSelectProps) {
  // Actually context says "2026 season". So let's include up to 2026.
  // If "current local time" is 2026-01-30, then 2026 is the current year.
  
  const years = Array.from({ length: 2026 - startYear + 1 }, (_, i) => (2026 - i).toString())

  return (
    <div className="relative w-[120px]">
      <select
        value={year}
        onChange={(e) => onYearChange(e.target.value)}
        className={cn(
          "h-10 w-full appearance-none rounded-md border border-f1-graphite bg-f1-black px-3 py-2 text-sm text-f1-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-f1-red disabled:cursor-not-allowed disabled:opacity-50",
          "hover:bg-f1-graphite/50 transition-colors cursor-pointer"
        )}
      >
        {years.map((y) => (
          <option key={y} value={y} className="bg-f1-black text-f1-white">
            {y}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none text-f1-white" />
    </div>
  )
}
