import type React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "./redux/store"
import AuthPage from "./pages/Auth/AuthPage"
import UserDashboard from "./pages/User/UserDashboard"
import AdminDashboard from "./pages/Admin/AdminDashboard"

const AppRouter: React.FC = () => {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth)

  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={!isAuthenticated ? <AuthPage /> : <Navigate to={role === "admin" ? "/admin" : "/user"} />}
        />

        <Route
          path="/user"
          element={isAuthenticated && role === "user" ? <UserDashboard /> : <Navigate to="/auth" />}
        />

        <Route
          path="/admin"
          element={isAuthenticated && role === "admin" ? <AdminDashboard /> : <Navigate to="/auth" />}
        />

        <Route
          path="/"
          element={isAuthenticated ? <Navigate to={role === "admin" ? "/admin" : "/user"} /> : <Navigate to="/auth" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
