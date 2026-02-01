import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('f1insight_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('[Auth] Failed to parse stored user:', error)
        localStorage.removeItem('f1insight_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, _password: string) => {
    setIsLoading(true)
    try {
      // Mock authentication - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate successful login
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
      }
      
      setUser(mockUser)
      localStorage.setItem('f1insight_user', JSON.stringify(mockUser))
      console.log('[Auth] Login successful:', email)
    } catch (error) {
      console.error('[Auth] Login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, _password: string, name: string) => {
    setIsLoading(true)
    try {
      // Mock signup - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser: User = {
        id: '1',
        email,
        name,
      }
      
      setUser(mockUser)
      localStorage.setItem('f1insight_user', JSON.stringify(mockUser))
      console.log('[Auth] Signup successful:', email)
    } catch (error) {
      console.error('[Auth] Signup failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('f1insight_user')
    console.log('[Auth] Logout successful')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
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
