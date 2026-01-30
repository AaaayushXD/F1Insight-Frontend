import { HeroSection } from "../components/home/HeroSection"
import { FeaturesSection } from "../components/home/FeaturesSection"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
    </div>
  )
}
