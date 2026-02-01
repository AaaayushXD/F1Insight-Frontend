import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    // Show loading state while checking auth
    return (
      <div className="flex h-screen items-center justify-center bg-f1-black">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 mx-auto border-4 border-f1-red border-t-transparent rounded-full animate-spin" />
          <p className="text-f1-steel text-sm font-orbitron">Authenticating...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login, preserving the intended destination
    console.log('[ProtectedRoute] Unauthorized access attempt to:', location.pathname)
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <>{children}</>
}
