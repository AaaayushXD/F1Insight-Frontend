import { motion } from "framer-motion"
import { Activity, Trophy, Zap, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"

const features = [
  {
    title: "Race Predictions",
    description: "AI-powered predictions for race strategy, pit stops, and final standings.",
    icon: Zap,
    color: "text-f1-red",
  },
  {
    title: "Live Telemetry",
    description: "Real-time analysis of vehicle performance, tire degradation, and sector times.",
    icon: Activity,
    color: "text-f1-blue",
  },
  {
    title: "Championship Standings",
    description: "Track driver and constructor standings with historical data comparisons.",
    icon: Trophy,
    color: "text-f1-amber",
  },
  {
    title: "Deep Analysis",
    description: "Comprehensive post-race breakdown and technical analysis of every team.",
    icon: BarChart3,
    color: "text-f1-green",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-f1-graphite/30 py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="font-orbitron text-3xl font-bold tracking-tighter text-f1-white sm:text-5xl">
            Precision Engineering
          </h2>
          <p className="max-w-[900px] text-f1-steel md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Built for fans, data analysts, and race engineers who demand the highest level of detail.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-f1-graphite bg-f1-black/50 transition-all hover:border-f1-red/50 hover:bg-f1-graphite/40">
                <CardHeader>
                  <feature.icon className={`h-10 w-10 ${feature.color} mb-2`} />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
