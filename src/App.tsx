import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PublicLayout } from "./components/layout/PublicLayout";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { AuthLayout } from "./components/layout/AuthLayout";
import { Layout } from "./components/layout/Layout";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

// Public Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OTP from "./pages/OTP";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import PublicDrivers from "./pages/public/PublicDrivers";
import PublicConstructors from "./pages/public/PublicConstructors";
import PublicSchedule from "./pages/public/PublicSchedule";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import Schedules from "./pages/Schedules";
import Drivers from "./pages/Drivers";
import DriverDetails from "./pages/DriverDetails";
import Constructors from "./pages/Constructors";
import ConstructorDetails from "./pages/ConstructorDetails";
import Circuits from "./pages/Circuits";
import CircuitDetails from "./pages/CircuitDetails";
import RaceResults from "./pages/RaceResults";
import Playground from "./pages/Playground";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Auth Pages (Minimal Layout) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/otp" element={<OTP />} />
          </Route>

          {/* Public Routes - Unauthenticated Experience */}
          <Route element={<PublicLayout />}>
            <Route path="/drivers" element={<PublicDrivers />} />
            <Route path="/constructors" element={<PublicConstructors />} />
            <Route path="/schedule" element={<PublicSchedule />} />
          </Route>

          {/* Utility Pages (Terms, Privacy) */}
          <Route element={<Layout />}>
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>

          {/* Dashboard Routes - Authenticated Experience */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard/overview" replace />} />
            <Route path="overview" element={<Dashboard />} />
            <Route path="playground" element={<Playground />} />
            <Route path="schedules" element={<Schedules />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="drivers/:driverId" element={<DriverDetails />} />
            <Route path="constructors" element={<Constructors />} />
            <Route path="constructors/:constructorId" element={<ConstructorDetails />} />
            <Route path="circuits" element={<Circuits />} />
            <Route path="circuits/:circuitId" element={<CircuitDetails />} />
            <Route path="results/:year/:round" element={<RaceResults />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
