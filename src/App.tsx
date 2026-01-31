import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Schedules from "./pages/Schedules";
import Drivers from "./pages/Drivers";
import DriverDetails from "./pages/DriverDetails";
import Constructors from "./pages/Constructors";
import ConstructorDetails from "./pages/ConstructorDetails";
import CircuitDetails from "./pages/CircuitDetails";
import Circuits from "./pages/Circuits";
import RaceResults from "./pages/RaceResults";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import OTP from "./pages/OTP";
import Dashboard from "./pages/Dashboard";
import Playground from "./pages/Playground";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { ScrollToTop } from "./components/layout/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Legacy routes redirecting to dashboard for SPA consistency */}
        <Route
          path="/schedules"
          element={<Navigate to="/dashboard/schedules" replace />}
        />
        <Route
          path="/drivers"
          element={<Navigate to="/dashboard/drivers" replace />}
        />
        <Route
          path="/constructors"
          element={<Navigate to="/dashboard/constructors" replace />}
        />
        <Route
          path="/results/:year/:round"
          element={<Navigate to="/dashboard/results/:year/:round" replace />}
        />

        {/* Public Utility Layout */}
        <Route element={<Layout />}>
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>

        {/* Premium Dashboard Shell (Persistent SPA Cockpit) */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/playground" element={<Playground />} />
          <Route path="/dashboard/schedules" element={<Schedules />} />
          <Route path="/dashboard/drivers" element={<Drivers />} />
          <Route
            path="/dashboard/drivers/:driverId"
            element={<DriverDetails />}
          />
          <Route path="/dashboard/constructors" element={<Constructors />} />
          <Route
            path="/dashboard/constructors/:constructorId"
            element={<ConstructorDetails />}
          />
          <Route path="/dashboard/circuits" element={<Circuits />} />
          <Route
            path="/dashboard/circuits/:circuitId"
            element={<CircuitDetails />}
          />
          <Route
            path="/dashboard/results/:year/:round"
            element={<RaceResults />}
          />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OTP />} />
      </Routes>
    </Router>
  );
}

export default App;
