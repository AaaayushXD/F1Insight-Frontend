import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import {
  loginApi,
  signupApi,
  verifyOTPApi,
  resendOTPApi,
  refreshTokenApi,
  logoutApi,
  type User,
  type LoginResult,
} from '../services/auth.service'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  pendingUserId: string | null
  login: (email: string, password: string) => Promise<LoginResult>
  signup: (email: string, password: string, name: string) => Promise<{ userId: string }>
  verifyOTP: (userId: string, code: string) => Promise<void>
  resendOTP: (userId: string, purpose?: 'signup' | 'login' | 'password-reset') => Promise<void>
  logout: () => Promise<void>
  setPendingUserId: (id: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USER_STORAGE_KEY = 'f1insight_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [pendingUserId, setPendingUserId] = useState<string | null>(null)

  // On mount: restore session
  useEffect(() => {
    const restore = async () => {
      const stored = localStorage.getItem(USER_STORAGE_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as User
          // Try to refresh the access token
          await refreshTokenApi()
          setUser(parsed)
        } catch {
          localStorage.removeItem(USER_STORAGE_KEY)
        }
      }
      setIsLoading(false)
    }
    restore()
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    const result = await loginApi(email, password)
    if (result.authenticated) {
      setUser(result.user)
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result.user))
    }
    return result
  }, [])

  const signup = useCallback(async (email: string, password: string, name: string) => {
    const result = await signupApi(email, password, name)
    setPendingUserId(result.userId)
    return result
  }, [])

  const verifyOTP = useCallback(async (userId: string, code: string) => {
    const verifiedUser = await verifyOTPApi(userId, code)
    setUser(verifiedUser)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(verifiedUser))
    setPendingUserId(null)
  }, [])

  const resendOTP = useCallback(async (
    userId: string,
    purpose: 'signup' | 'login' | 'password-reset' = 'signup'
  ) => {
    await resendOTPApi(userId, purpose)
  }, [])

  const logout = useCallback(async () => {
    await logoutApi()
    setUser(null)
    localStorage.removeItem(USER_STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        pendingUserId,
        login,
        signup,
        verifyOTP,
        resendOTP,
        logout,
        setPendingUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
