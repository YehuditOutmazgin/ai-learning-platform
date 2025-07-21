import { jwtDecode } from "jwt-decode"

interface TokenPayload {
  userId: string
  name: string
  role: string
  exp: number
}

export const setToken = (token: string): void => {
  localStorage.setItem("token", token)
}

export const getToken = (): string | null => {
  return localStorage.getItem("token")
}

export const removeToken = (): void => {
  localStorage.removeItem("token")
}

export const getUserFromToken = (): TokenPayload | null => {
  const token = getToken()
  if (!token) return null

  try {
    const decoded = jwtDecode<TokenPayload>(token)
    if (decoded.exp * 1000 < Date.now()) {
      removeToken()
      return null
    }
    return decoded
  } catch (error) {
    removeToken()
    return null
  }
}

export const isTokenValid = (): boolean => {
  const userData = getUserFromToken()
  return userData !== null
}
