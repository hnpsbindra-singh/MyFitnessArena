import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('fit_token'))

  useEffect(() => {
    const stored = localStorage.getItem('fit_user')
    if (stored && token) {
      try { setUser(JSON.parse(stored)) } catch {}
    }
  }, [])

  const login = (tokenVal, userData) => {
    setToken(tokenVal)
    setUser(userData)
    localStorage.setItem('fit_token', tokenVal)
    localStorage.setItem('fit_user', JSON.stringify(userData))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('fit_token')
    localStorage.removeItem('fit_user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
