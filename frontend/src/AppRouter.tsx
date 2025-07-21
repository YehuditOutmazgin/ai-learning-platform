import type React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "./redux/store"
import AuthPage from "./pages/Auth/AuthPage"
import UserDashboard from "./pages/User/UserDashboard"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import ProtectedRoute from "./components/Common/ProtectedRoute"

const AppRouter: React.FC = () => {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth)

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      <Route element={<ProtectedRoute requiredRole="user" />}>
        <Route path="/user" element={<UserDashboard />} />
      </Route>

      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to={role === "admin" ? "/admin" : "/user"} /> : <Navigate to="/auth" />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default AppRouter
