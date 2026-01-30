import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/Layout"
import Home from "./pages/Home"
import Schedules from "./pages/Schedules"
import Drivers from "./pages/Drivers"
import Constructors from "./pages/Constructors"
import CircuitDetails from "./pages/CircuitDetails"
import Circuits from "./pages/Circuits"
import RaceResults from "./pages/RaceResults"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/constructors" element={<Constructors />} />
          <Route path="/circuits" element={<Circuits />} />
          <Route path="/circuits/:circuitId" element={<CircuitDetails />} />
          <Route path="/results/:year/:round" element={<RaceResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
