import { Dispatch, SetStateAction } from 'react'

export interface User {
  token: string
  username: string
}

export interface AuthContextType {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>> // Corrigido aqui
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}
